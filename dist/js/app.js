/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// Gets station.json - listing what zones each station is
function fetchStationsData() {
	return fetch('/data/stations.json').then(function (e) {
		return e.json();
	});
}

//Fetches the json file from TFL API
function fetchJourneyData(from, to) {
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to + '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b').then(function (e) {
		return e.json();
	});
}

//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey
fetchStationsData().then(function (stations) {

	fetchJourneyData('1000029', '1000138').then(function (journey) {
		var journey = journey.journeys[0]; // selecting only the first journey from the API
		var legs = journey.legs; //To look at each leg of the journey

		// The array of zones associated with all stations of that journey
		var allZones = flatten(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(getZones(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(getZones(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		// console.log(filterZonesByNumber(1, allZones));
		// debugger;

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));


		var zonesFromSingleStations = filterZonesByNumber(1, allZones);
		var zonesFromDualStations = filterZonesByNumber(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = minZone(flatten(zonesFromDualStations));
			finalMinZone = minZone(flatten(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = maxZone(zonesFromSingleStations);
			var singleMin = minZone(zonesFromSingleStations);

			//For each zonesFromDualStations: picks the most appropriate zone and appends to dualZones array 
			// --> Going from 2/3 to 2/3 —> charges same single 2, 3 or 2-3 (1.70) but should pick zone based on weekly (could be 3) or cap (always smallest: 2)
			var dualZones = zonesFromDualStations.map(function (z) {
				return z.reduce(function (a, b) {
					if (getDifference(a, singleMin) < getDifference(b, singleMin)) {
						return a;
					}
					return b;
				});
			});

			//Adds dualZones to singleMax into an array and calculates the max and min zone of both
			finalMaxZone = maxZone([singleMax].concat(dualZones));
			finalMinZone = minZone([singleMin].concat(dualZones));
		}

		// console.log(finalMaxZone);
		// console.log(finalMinZone);
	});
});

// Formulate array? Journey 1 object: with zones travelled (array: min and max), time, off-peak or on-peak, single price, flag for dual to dual (and what zones).

//--------------------------------------------
// Global functions > compareNumbers (can reduce to the maxZone and minZone of an array) & getDifference bw 2 numbers

/**
 * Gets fares.json file
 */
var fetchFareData = function () {
	var data = null;

	return function () {
		if (data) {
			console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('/data/fares.json').then(function (resp) {
			data = resp.json();
			return data;
		});
	};
}();

/**
 * Sort an array of 2 zones chronologically and adds '-'
 * @function
 * @param {array} journey - the array of the 2 zones of that journey
 * @returns {string} - 'x-y'
 * @description - used to get the fares from the json file
 */
function journeyToKey(journey) {
	return journey.sort().join('-');
}

/**
 * Gets the daily cap cost
 * @function
 * @param {number} - the (maximum) zone
 * @param {object} dailyCaps - looks at the dailyCaps object in the fares.json file
 * @returns {number} - gets the daily cap between zones 1 and the zone parameter (as daily caps always starts at zone 1)
 * @description
 */
function getDailyCap(maxZonesofar, dailyCaps) {
	return dailyCaps[journeyToKey([1, maxZonesofar])];
}

/**
 * Gets the single fare
 * @function
 * @param {array} journey - the array of the 2 zones travelling between
 * @param {object} singleFares - looks at the singleFares object in the fares.json file
 * @returns {number} - gets the single fare between those two zones
 * @description
 */
function getSingleFare(journey, singleFares) {
	return singleFares[journeyToKey(journey)];
}

fetchFareData().then(function (fareData) {
	var singleFares = fareData.singleFares;

	/**
  * Calculates the extension fare (or none) of a journey
  * @function
  * @param {array} minmaxTravelcard - the min and max zone of the travelcard covered zones, in an array
  * @param {array} minmaxJourney - the min and max zone of the single journey, in an array
  * @returns {number} - returns the fare
  * @description
  */

	var minmaxTravelcard = [3, 4];
	var minmaxJourney = [1, 6];

	function extensionFares(minmaxTravelcard, minmaxJourney) {
		var minTravelcard = minmaxTravelcard[0];
		var maxTravelcard = minmaxTravelcard[1];
		var minSingle = minmaxJourney[0];
		var maxSingle = minmaxJourney[1];
		var journeyFare = null;

		//CONTACTLESS only uses adult fares
		//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
		//FOR WEEKLY CAPS: this works out fare without any daily caps
		//if max single within travelcard zones but min single isnt.
		if (!(minTravelcard <= minSingle && minSingle <= maxTravelcard) && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
			var y = getDifference(maxSingle, minTravelcard);
			var journey = [minSingle, maxSingle - (y + 1)];
			journeyFare = getSingleFare(journey, singleFares);
			//if min single within travelcard zones but max single isnt.
		} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
			var y = getDifference(minSingle, maxTravelcard);
			var journey = [minSingle + (y + 1), maxSingle];
			journeyFare = getSingleFare(journey, singleFares);
			//if min single less than min travelcard and max single more than max travelcard
		} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
			var fares = [];
			var y = getDifference(minSingle, minTravelcard);
			var x = getDifference(maxSingle, maxTravelcard);
			// picks the cheapest: split singles or the full fare without travelcard == should be a global function
			var cost = getSingleFare([minSingle, minTravelcard - 1], singleFares) + getSingleFare([maxTravelcard + 1, maxSingle], singleFares);
			fares.push(cost);
			var journey = [minSingle, maxSingle];
			fares.push(getSingleFare(journey, singleFares));
			journeyFare = minZone(fares);
			//both single zones within travelcard zones
		} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
			journeyFare = 0;
			//both single zones are outside travelcard zones
		} else {
			var journey = [minSingle, maxSingle];
			journeyFare = getSingleFare(journey, singleFares);
		}
		return journeyFare;
		console.log(journeyFare);
	};
	extensionFares(minmaxTravelcard, minmaxJourney);
	// });

	//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
	// what about zone 1 to zone 1 exception for off peak>?

	// - OYSTER Cheapest Fare
	// fetchFareData().then(function(fareData) {
	var dailyCaps = fareData.dailyCaps;
	// var singleFares = fareData.singleFares;

	//An array of all the journeys with their max and min zones travelled
	var journeys = [[2, 1], [1, 2], [2, 1], [1, 2], [2, 4], [1, 3]];

	//cumTotal = the total that updates and becomes the final oyster fare
	var oyCumTotal = null;
	//maxZonessofar for each journey updates and is the array of all the zones travelled in so far
	var maxZonesofar = journeys[0];

	journeys.forEach(function (journey) {
		//Gets the maximum zones of all the zones travelled in so far
		maxZonesofar = maxZone(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = getDailyCap(maxZonesofar, dailyCaps);
		var single = getSingleFare(journey, singleFares);

		//adds the single fare to the cumulative total
		oyCumTotal += single;

		//if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
		if (oyCumTotal >= maxZoneDailyCap) {
			oyCumTotal = maxZoneDailyCap;
		}
	});
	//This is the final oyster daily fare calculated:
	// console.log(oyCumTotal);


	// - CONTACTLESS Cheapest Fare = 
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	journeys.forEach(function (journey) {
		conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = maxZone(flatten(journeys));
	for (var i = 2; i <= conMaxZone; i++) {
		console.log('for daily cap 1 to ' + i);
		var conCumTotal = getDailyCap(i, dailyCaps);
		for (var x = 0; x < journeys.length; x++) {
			//adding extension fares to cumTotal
			conCumTotal += extensionFares([1, i], journeys[x]);
		};
		console.log(conCumTotal);

		conAllFares.push(conCumTotal);
	}

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = minZone(conAllFares);
	// console.log(conFinalFare);
});

//CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap

//THIS METHOD RELIES ON THE FACT THAT:
//- zone x to x fare is the same as zone x-1 to zone x fare
//- If the difference between the min and max gap zones are > 1, breaks since assuming fare for x to x and x-1 to x are the same.
//- Assumes daily caps always start at zone 1 (else need min single < capped zone IFs)

// Most combos (without a gap between the 2 travelcards) - extension fare as just between:
//----> COULD JUST UPDATE THE MAX ZONE AND USE SAME CALULCATIONS AS DAILY??? min travel = 1
// - maximum zone of daily or travelcard cap + 1 to maximum single zone (if min single <= max zone of daily or travelcard cap & max single > max zone of daily or travelcard cap)
// - OR both within min and maxcapped = free
// - ELSE just both outside capped zones = full fare


// HOWEVER for zone 4-5 weekly and 1-2 daily: have gap of zone 3 and 6 / for zone 4-6 weekly and 1-2 daily: gap of zone 3 / if weekly 5-6 and 1-2 daily: gap 3 and 4 / weekly 5-6 and daily 1-3: gap zone 4
//IF difference between min weekly and max daily cap > 1
// then min gap zone = max daily cap +1 & max gap zone = min weekly gap - 1

//IF min single <= min gap zone && max single >= max gap zone but max single <= max weekly zone
// then charge min to max gap fare
//IF min single zone <= min gap zone && max single > max weely zone
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare
//IF min single and max single both > max weekly zone (or both < min daily)
// then charge single min to single max fare
//ELSE (IF both min and max singles within min and max daily / both min and max singles within min and max weekly)
// then charge 0

// Remember calculate without any daily caps - should be similar to daily calculations

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2E0NWU4OGE4MTFiYjkxOGJmOTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoIiwidGhlbiIsImUiLCJqc29uIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsInN0YXRpb25zIiwiam91cm5leSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwiZmxhdHRlbiIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwiZ2V0Wm9uZXMiLCJwYXRoIiwic3RvcFBvaW50cyIsImxlbmd0aCIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsIm1pblpvbmUiLCJzaW5nbGVNYXgiLCJtYXhab25lIiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsInJlZHVjZSIsImEiLCJiIiwiZ2V0RGlmZmVyZW5jZSIsImNvbmNhdCIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzcCIsImpvdXJuZXlUb0tleSIsInNvcnQiLCJqb2luIiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRTaW5nbGVGYXJlIiwic2luZ2xlRmFyZXMiLCJmYXJlRGF0YSIsIm1pbm1heFRyYXZlbGNhcmQiLCJtaW5tYXhKb3VybmV5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsImpvdXJuZXlGYXJlIiwieSIsImZhcmVzIiwieCIsImNvc3QiLCJveUN1bVRvdGFsIiwibWF4Wm9uZURhaWx5Q2FwIiwic2luZ2xlIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvblNpbmdsZSIsImNvbk1heFpvbmUiLCJpIiwiY29uQ3VtVG90YWwiLCJjb25GaW5hbEZhcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTQSxpQkFBVCxHQUE2QjtBQUM1QixRQUFPQyxNQUFNLHFCQUFOLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFTQyxDQUFULEVBQVk7QUFDcEQsU0FBT0EsRUFBRUMsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7QUFDQSxTQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0NDLEVBQWhDLEVBQW9DO0FBQ25DLFFBQU9OLE1BQU0sbURBQW1ESyxJQUFuRCxHQUEwRCxNQUExRCxHQUFtRUMsRUFBbkUsR0FBd0UsMkRBQTlFLEVBQTJJTCxJQUEzSSxDQUFnSixVQUFTQyxDQUFULEVBQVk7QUFDbEssU0FBT0EsRUFBRUMsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0FKLG9CQUFvQkUsSUFBcEIsQ0FBeUIsVUFBU00sUUFBVCxF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O0FBQ0EsQ0FySUQ7O0FBdUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNGIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YTQ1ZTg4YTgxMWJiOTE4YmY5MCIsIi8vVE8gRE9cbi8vT2ZmIHBlYWsgdnMgb24gcGVhayBzaW5nbGVzIChlc3AgaW5jbHVkaW5nIG91dCBvZiB6b25lIDEgdG8gem9uZSAxIGluIGV2ZW5pbmcgaXMgb2ZmcGVhayBleGNlcHRpb24pXG4vL09mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy9wb3NzaWJpbGl0eSBvZiBhbHRlcmluZyBveXN0ZXIgc28gcmVmbGVjdHMgb2ZmIHBlYWsgLS0gdGhlbiBjb3VsZCBhZGQgIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXIgYW5kIDEtOCAgem9uZXMgb3IgdG8gOSB3aXRob3V0IHdhdGZvcmRcbi8vQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG5mdW5jdGlvbiBmZXRjaFN0YXRpb25zRGF0YSgpIHtcblx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn1cblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG5mdW5jdGlvbiBmZXRjaEpvdXJuZXlEYXRhKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn1cblxuLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5mZXRjaFN0YXRpb25zRGF0YSgpLnRoZW4oZnVuY3Rpb24oc3RhdGlvbnMpIHtcblxuXHRmZXRjaEpvdXJuZXlEYXRhKCcxMDAwMDI5JywgJzEwMDAxMzgnKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cdFx0Ly8gY29uc29sZS5sb2coZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdC8vIGRlYnVnZ2VyO1xuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cblxuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluWm9uZShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluWm9uZShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heFpvbmUoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pblpvbmUoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4Wm9uZShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5ab25lKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHQvLyBjb25zb2xlLmxvZyhmaW5hbE1heFpvbmUpO1xuXHRcdC8vIGNvbnNvbGUubG9nKGZpbmFsTWluWm9uZSk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4Wm9uZSBhbmQgbWluWm9uZSBvZiBhbiBhcnJheSkgJiBnZXREaWZmZXJlbmNlIGJ3IDIgbnVtYmVyc1xuXG4vKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcblx0cmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYWlseSBjYXAgY29zdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB0aGUgKG1heGltdW0pIHpvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYWlseUNhcHMgLSBsb29rcyBhdCB0aGUgZGFpbHlDYXBzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIGRhaWx5IGNhcCBiZXR3ZWVuIHpvbmVzIDEgYW5kIHRoZSB6b25lIHBhcmFtZXRlciAoYXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnRzIGF0IHpvbmUgMSlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5mdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcykge1xuXHRyZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5mdW5jdGlvbiBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSB7XG5cdHJldHVybiBzaW5nbGVGYXJlc1tqb3VybmV5VG9LZXkoam91cm5leSldO1xufVxuXG5mZXRjaEZhcmVEYXRhKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuXHR2YXIgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcdFxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAcGFyYW0ge2FycmF5fSBtaW5tYXhUcmF2ZWxjYXJkIC0gdGhlIG1pbiBhbmQgbWF4IHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY292ZXJlZCB6b25lcywgaW4gYW4gYXJyYXlcblx0ICogQHBhcmFtIHthcnJheX0gbWlubWF4Sm91cm5leSAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSBzaW5nbGUgam91cm5leSwgaW4gYW4gYXJyYXlcblx0ICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBmYXJlXG5cdCAqIEBkZXNjcmlwdGlvblxuXHQgKi9cblx0XG5cdHZhciBtaW5tYXhUcmF2ZWxjYXJkID0gWzMsIDRdO1xuXHR2YXIgbWlubWF4Sm91cm5leSA9IFsxLCA2XTtcblx0XG5cdGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG1pbm1heFRyYXZlbGNhcmQsIG1pbm1heEpvdXJuZXkpIHtcblx0XHR2YXIgbWluVHJhdmVsY2FyZCA9IG1pbm1heFRyYXZlbGNhcmRbMF07XG5cdFx0dmFyIG1heFRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzFdO1xuXHRcdHZhciBtaW5TaW5nbGUgPSBtaW5tYXhKb3VybmV5WzBdO1xuXHRcdHZhciBtYXhTaW5nbGUgPSBtaW5tYXhKb3VybmV5WzFdO1xuXHRcdHZhciBqb3VybmV5RmFyZSA9IG51bGw7XG5cdFx0XG5cdFx0Ly9DT05UQUNUTEVTUyBvbmx5IHVzZXMgYWR1bHQgZmFyZXNcblx0XHQvL0ZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcblx0XHQvL0ZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzXG5cdFx0Ly9pZiBtYXggc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtaW4gc2luZ2xlIGlzbnQuXG5cdFx0aWYgKCEobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuXHRcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlLCBtYXhTaW5nbGUgLSAoeSsxKV07XG5cdFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250LlxuXHQgXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgIShtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0IFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWluU2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcblx0IFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUgKyAoeSsxKSwgbWF4U2luZ2xlXTtcblx0IFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHQgXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZFxuXHQgXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuXHQgXHRcdHZhciBmYXJlcyA9IFtdO1xuXHQgXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtaW5TaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuXHQgXHRcdHZhciB4ID0gZ2V0RGlmZmVyZW5jZShtYXhTaW5nbGUsIG1heFRyYXZlbGNhcmQpO1xuXHQgXHRcdC8vIHBpY2tzIHRoZSBjaGVhcGVzdDogc3BsaXQgc2luZ2xlcyBvciB0aGUgZnVsbCBmYXJlIHdpdGhvdXQgdHJhdmVsY2FyZCA9PSBzaG91bGQgYmUgYSBnbG9iYWwgZnVuY3Rpb25cblx0IFx0XHR2YXIgY29zdCA9IGdldFNpbmdsZUZhcmUoW21pblNpbmdsZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcblx0IFx0XHRmYXJlcy5wdXNoKGNvc3QpO1xuXHRcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlLCBtYXhTaW5nbGVdO1xuXHRcdFx0ZmFyZXMucHVzaChnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSk7XG5cdFx0XHRqb3VybmV5RmFyZSA9IG1pblpvbmUoZmFyZXMpXG5cdFx0Ly9ib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuXHQgXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHQgXHRcdGpvdXJuZXlGYXJlID0gMDtcblx0IFx0Ly9ib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG5cdCBcdH0gZWxzZSB7XG5cdCBcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlLCBtYXhTaW5nbGVdO1xuXHQgXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdCBcdH1cblx0IFx0cmV0dXJuIGpvdXJuZXlGYXJlO1xuXHQgXHRjb25zb2xlLmxvZyhqb3VybmV5RmFyZSk7XG5cdH07XG5cdGV4dGVuc2lvbkZhcmVzKG1pbm1heFRyYXZlbGNhcmQsIG1pbm1heEpvdXJuZXkpO1xuLy8gfSk7XG5cbi8vU0lOR0xFIEZBUkVTIE5FRUQgVE8gQkUgQUxURVJFRCBUTyBPRkYgUEVBSyBPUiBPTiBQRUFLICYgcHJlZmVyYWJseSBhIGNvdW50ZXIgb24gd2hldGhlciBhIGNhcCB3YXMgcmVhY2hlZFxuLy8gd2hhdCBhYm91dCB6b25lIDEgdG8gem9uZSAxIGV4Y2VwdGlvbiBmb3Igb2ZmIHBlYWs+P1xuXG4vLyAtIE9ZU1RFUiBDaGVhcGVzdCBGYXJlXG4vLyBmZXRjaEZhcmVEYXRhKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuXHR2YXIgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXHQvLyB2YXIgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcblxuLy9BbiBhcnJheSBvZiBhbGwgdGhlIGpvdXJuZXlzIHdpdGggdGhlaXIgbWF4IGFuZCBtaW4gem9uZXMgdHJhdmVsbGVkXG5cdHZhciBqb3VybmV5cyA9IFtcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCAxXSxcblx0XHRbMSwgMl0sXG5cdFx0WzIsIDRdLFxuXHRcdFsxLCAzXSxcblx0XTtcblxuLy9jdW1Ub3RhbCA9IHRoZSB0b3RhbCB0aGF0IHVwZGF0ZXMgYW5kIGJlY29tZXMgdGhlIGZpbmFsIG95c3RlciBmYXJlXG5cdHZhciBveUN1bVRvdGFsID0gbnVsbDtcbi8vbWF4Wm9uZXNzb2ZhciBmb3IgZWFjaCBqb3VybmV5IHVwZGF0ZXMgYW5kIGlzIHRoZSBhcnJheSBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0dmFyIG1heFpvbmVzb2ZhciA9IGpvdXJuZXlzWzBdO1xuXG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdC8vR2V0cyB0aGUgbWF4aW11bSB6b25lcyBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0XHRtYXhab25lc29mYXIgPSBtYXhab25lKGpvdXJuZXkuY29uY2F0KG1heFpvbmVzb2ZhcikpO1xuXG5cdFx0Ly9HZXRzIHRoZSByZWxldmFudCBkYWlseSBjYXAgdG8gdGhhdCBtYXggem9uZSAmIHNpbmdsZSBmYXJlIGZvciB0aGF0IGpvdXJuZXlcblx0XHR2YXIgbWF4Wm9uZURhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpO1xuXHRcdHZhciBzaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XG5cdFx0Ly9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuXHRcdG95Q3VtVG90YWwgKz0gc2luZ2xlO1xuXG5cdFx0Ly9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG5cdFx0aWYgKG95Q3VtVG90YWwgPj0gbWF4Wm9uZURhaWx5Q2FwKSB7XG5cdFx0XHRveUN1bVRvdGFsID0gbWF4Wm9uZURhaWx5Q2FwO1xuXHRcdH1cblx0fSk7XG5cdC8vVGhpcyBpcyB0aGUgZmluYWwgb3lzdGVyIGRhaWx5IGZhcmUgY2FsY3VsYXRlZDpcblx0Ly8gY29uc29sZS5sb2cob3lDdW1Ub3RhbCk7XG5cblxuLy8gLSBDT05UQUNUTEVTUyBDaGVhcGVzdCBGYXJlID0gXG5cdC8vVGhlIGFycmF5IG9mIGFsbCBjb21iaW5hdGlvbiBwcmljZXMgdG8gYmUgcmVkdWNlIHRvIGNoZWFwZXN0IG9uZVxuXHR2YXIgY29uQWxsRmFyZXMgPSBbXTtcblxuXHQvLyBmb3Igd2l0aG91dCBhbnkgZGFpbHkgY2Fwcywgb25seSBzaW5nbGVzIGFkZGVkIHRvZ2V0aGVyXG5cdHZhciBjb25GYXJlcyA9IG51bGw7XG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdGNvblNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcdGNvbkZhcmVzICs9IGNvblNpbmdsZTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgdmFyIGNvbk1heFpvbmUgPSBtYXhab25lKGZsYXR0ZW4oam91cm5leXMpKTtcblx0IGZvciAodmFyIGkgPSAyOyBpIDw9IGNvbk1heFpvbmU7IGkrKykge1xuXHQgXHRjb25zb2xlLmxvZygnZm9yIGRhaWx5IGNhcCAxIHRvICcgKyBpKTtcblx0IFx0dmFyIGNvbkN1bVRvdGFsID0gZ2V0RGFpbHlDYXAoaSwgZGFpbHlDYXBzKTtcblx0IFx0IGZvciAodmFyIHggPSAwOyB4IDwgam91cm5leXMubGVuZ3RoOyB4KyspIHtcblx0IFx0IFx0Ly9hZGRpbmcgZXh0ZW5zaW9uIGZhcmVzIHRvIGN1bVRvdGFsXG5cdCBcdFx0Y29uQ3VtVG90YWwgKz0gZXh0ZW5zaW9uRmFyZXMoWzEsIGldLCBqb3VybmV5c1t4XSk7XG5cdCBcdCB9O1xuXHQgXHRjb25zb2xlLmxvZyhjb25DdW1Ub3RhbCk7XG5cblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS4gXG5cdHZhciBjb25GaW5hbEZhcmUgPSBudWxsO1xuXHRjb25GaW5hbEZhcmUgPSBtaW5ab25lKGNvbkFsbEZhcmVzKTtcblx0Ly8gY29uc29sZS5sb2coY29uRmluYWxGYXJlKTtcbn0pO1xuXG4vL0NPTlRBQ1RMRVNTIFdFRUtMWSBDQVAgLSBtaXh0dXJlICBvZiB3ZWVrbHkgY2FwIGFuZCBkYWlseSBjYXBcblxuLy9USElTIE1FVEhPRCBSRUxJRVMgT04gVEhFIEZBQ1QgVEhBVDpcbi8vLSB6b25lIHggdG8geCBmYXJlIGlzIHRoZSBzYW1lIGFzIHpvbmUgeC0xIHRvIHpvbmUgeCBmYXJlXG4vLy0gSWYgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbWluIGFuZCBtYXggZ2FwIHpvbmVzIGFyZSA+IDEsIGJyZWFrcyBzaW5jZSBhc3N1bWluZyBmYXJlIGZvciB4IHRvIHggYW5kIHgtMSB0byB4IGFyZSB0aGUgc2FtZS5cbi8vLSBBc3N1bWVzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMSAoZWxzZSBuZWVkIG1pbiBzaW5nbGUgPCBjYXBwZWQgem9uZSBJRnMpXG5cbi8vIE1vc3QgY29tYm9zICh3aXRob3V0IGEgZ2FwIGJldHdlZW4gdGhlIDIgdHJhdmVsY2FyZHMpIC0gZXh0ZW5zaW9uIGZhcmUgYXMganVzdCBiZXR3ZWVuOlxuLy8tLS0tPiBDT1VMRCBKVVNUIFVQREFURSBUSEUgTUFYIFpPTkUgQU5EIFVTRSBTQU1FIENBTFVMQ0FUSU9OUyBBUyBEQUlMWT8/PyBtaW4gdHJhdmVsID0gMVxuLy8gLSBtYXhpbXVtIHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgKyAxIHRvIG1heGltdW0gc2luZ2xlIHpvbmUgKGlmIG1pbiBzaW5nbGUgPD0gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgJiBtYXggc2luZ2xlID4gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXApXG4vLyAtIE9SIGJvdGggd2l0aGluIG1pbiBhbmQgbWF4Y2FwcGVkID0gZnJlZVxuLy8gLSBFTFNFIGp1c3QgYm90aCBvdXRzaWRlIGNhcHBlZCB6b25lcyA9IGZ1bGwgZmFyZVxuXG5cbi8vIEhPV0VWRVIgZm9yIHpvbmUgNC01IHdlZWtseSBhbmQgMS0yIGRhaWx5OiBoYXZlIGdhcCBvZiB6b25lIDMgYW5kIDYgLyBmb3Igem9uZSA0LTYgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGdhcCBvZiB6b25lIDMgLyBpZiB3ZWVrbHkgNS02IGFuZCAxLTIgZGFpbHk6IGdhcCAzIGFuZCA0IC8gd2Vla2x5IDUtNiBhbmQgZGFpbHkgMS0zOiBnYXAgem9uZSA0XG4vL0lGIGRpZmZlcmVuY2UgYmV0d2VlbiBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMVxuLy8gdGhlbiBtaW4gZ2FwIHpvbmUgPSBtYXggZGFpbHkgY2FwICsxICYgbWF4IGdhcCB6b25lID0gbWluIHdlZWtseSBnYXAgLSAxXG5cbi8vSUYgbWluIHNpbmdsZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+PSBtYXggZ2FwIHpvbmUgYnV0IG1heCBzaW5nbGUgPD0gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBtaW4gdG8gbWF4IGdhcCBmYXJlXG4vL0lGIG1pbiBzaW5nbGUgem9uZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+IG1heCB3ZWVseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBjaGVhcGVzdDogZnVsbCBmYXJlIG9yIG1heCB3ZWVrbHkgKyAxIHRvIG1heCBzaW5nbGUgem9uZSYgJiBnYXAgZmFyZVxuLy9JRiBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpXG4vLyB0aGVuIGNoYXJnZSBzaW5nbGUgbWluIHRvIHNpbmdsZSBtYXggZmFyZVxuLy9FTFNFIChJRiBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IGRhaWx5IC8gYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCB3ZWVrbHkpXG4vLyB0aGVuIGNoYXJnZSAwXG5cbi8vIFJlbWVtYmVyIGNhbGN1bGF0ZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIC0gc2hvdWxkIGJlIHNpbWlsYXIgdG8gZGFpbHkgY2FsY3VsYXRpb25zXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==