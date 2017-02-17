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

/**
 * Gets Zones
 * @function
 * @param {string} napTan - The naptan of the station we're looking for.
 * @param {object} stations - An object containing stations with napTans as keys.
 * @returns {array}
 * @description Uses the napTan ID to figure out what zone that station is in via station.json
 */
function getZones(napTan, stations) {
	return stations[napTan].zones;
}

/**
 * Filters the Zones by the number of zones it has (dual zone or single zone)
 * @function
 * @param {number} num - either 1 (for single zone) or 2 (dual zone)
 * @param {array} zones - the array of numbers
 * @returns {array} - array of all the zones from stations that only have one zone associated with it (if num = 1) or...
 * @description - zones refers to global allZones
 */
function filterZonesByNumber(num, zones) {
	return zones.filter(function (zone) {
		return zone.length === num;
	});
}

/**
 * Compares Numbers
 * @function
 * @param {array} numbers - the array of number(s)
 * @param {object} operator - what javascript operator passing through (e.g. Math.max)
 * @returns {number} - the single number after all calculations (reduces to one number)
 * @description Associated with minZone and maxZone: where arrayZones refers to zonesFromSingleStations.
 	 Loops through the array of zones and applies the operator
 */
function compareNumbers(arrayNumbers, operator) {
	return arrayNumbers.reduce(function (a, b) {
		return operator(a, b);
	});
}

function maxZone(arrayZones) {
	return compareNumbers(arrayZones, Math.max);
}

function minZone(arrayZones) {
	return compareNumbers(arrayZones, Math.min);
}

/**
 * Get difference between 2 numbers
 * @function
 * @param {numbers} a,b - the two numbers comparing against
 * @returns {number} - the difference between the 2 numbers (discarding negative numbers)
 * @description 
 */
function getDifference(a, b) {
	return Math.abs(a - b);
	// return a - b;
}

/**
 * Flattens a nested array
 * @function
 * @param {array} array that is an array within another array 
 * @returns {number} - flattens the array so just one array
 * @description 
 */
function flatten(arr) {
	return arr.reduce(function (a, b) {
		return a.concat(b);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjVhNjc0N2I2MDQzM2ZjM2MyY2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoIiwidGhlbiIsImUiLCJqc29uIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4Wm9uZSIsImFycmF5Wm9uZXMiLCJNYXRoIiwibWF4IiwibWluWm9uZSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibWFwIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzcCIsImpvdXJuZXlUb0tleSIsInNvcnQiLCJqb2luIiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRTaW5nbGVGYXJlIiwic2luZ2xlRmFyZXMiLCJmYXJlRGF0YSIsIm1pbm1heFRyYXZlbGNhcmQiLCJtaW5tYXhKb3VybmV5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsImpvdXJuZXlGYXJlIiwieSIsImZhcmVzIiwieCIsImNvc3QiLCJveUN1bVRvdGFsIiwibWF4Wm9uZURhaWx5Q2FwIiwic2luZ2xlIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvblNpbmdsZSIsImNvbk1heFpvbmUiLCJpIiwiY29uQ3VtVG90YWwiLCJjb25GaW5hbEZhcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTQSxpQkFBVCxHQUE2QjtBQUM1QixRQUFPQyxNQUFNLHFCQUFOLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFTQyxDQUFULEVBQVk7QUFDcEQsU0FBT0EsRUFBRUMsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7QUFDQSxTQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0NDLEVBQWhDLEVBQW9DO0FBQ25DLFFBQU9OLE1BQU0sbURBQW1ESyxJQUFuRCxHQUEwRCxNQUExRCxHQUFtRUMsRUFBbkUsR0FBd0UsMkRBQTlFLEVBQTJJTCxJQUEzSSxDQUFnSixVQUFTQyxDQUFULEVBQVk7QUFDbEssU0FBT0EsRUFBRUMsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU0ksUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ25DLFFBQU9BLFNBQVNELE1BQVQsRUFBaUJFLEtBQXhCO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU0MsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQWtDRixLQUFsQyxFQUF5QztBQUN4QyxRQUFPQSxNQUFNRyxNQUFOLENBQWEsVUFBU0MsSUFBVCxFQUFlO0FBQ2xDLFNBQU9BLEtBQUtDLE1BQUwsS0FBZ0JILEdBQXZCO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7Ozs7Ozs7OztBQVNBLFNBQVNJLGNBQVQsQ0FBd0JDLFlBQXhCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUMvQyxRQUFPRCxhQUFhRSxNQUFiLENBQW9CLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3pDLFNBQU9ILFNBQVNFLENBQVQsRUFBWUMsQ0FBWixDQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQsU0FBU0MsT0FBVCxDQUFpQkMsVUFBakIsRUFBNkI7QUFDNUIsUUFBT1AsZUFBZU8sVUFBZixFQUEyQkMsS0FBS0MsR0FBaEMsQ0FBUDtBQUNBOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJILFVBQWpCLEVBQTZCO0FBQzVCLFFBQU9QLGVBQWVPLFVBQWYsRUFBMkJDLEtBQUtHLEdBQWhDLENBQVA7QUFDQTs7QUFFRDs7Ozs7OztBQU9BLFNBQVNDLGFBQVQsQ0FBdUJSLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUM1QixRQUFPRyxLQUFLSyxHQUFMLENBQVNULElBQUlDLENBQWIsQ0FBUDtBQUNBO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTUyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNyQixRQUFPQSxJQUFJWixNQUFKLENBQVcsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDaEMsU0FBT0QsRUFBRVksTUFBRixDQUFTWCxDQUFULENBQVA7QUFDQSxFQUZNLENBQVA7QUFHQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQXRCLG9CQUFvQkUsSUFBcEIsQ0FBeUIsVUFBU1EsUUFBVCxFQUFtQjs7QUFFM0NMLGtCQUFpQixTQUFqQixFQUE0QixTQUE1QixFQUF1Q0gsSUFBdkMsQ0FBNEMsVUFBU2dDLE9BQVQsRUFBa0I7QUFDN0QsTUFBSUEsVUFBVUEsUUFBUUMsUUFBUixDQUFpQixDQUFqQixDQUFkLENBRDZELENBQzFCO0FBQ25DLE1BQUlDLE9BQU9GLFFBQVFFLElBQW5CLENBRjZELENBRXBDOztBQUV6QjtBQUNBLE1BQUlDLFdBQVdOLFFBQVFLLEtBQUtFLEdBQUwsQ0FBUyxVQUFTQyxHQUFULEVBQWM7QUFDN0MsT0FBSUMsWUFBWSxFQUFoQjs7QUFFQTtBQUNBLE9BQUlELElBQUlFLGNBQUosSUFBc0JGLElBQUlFLGNBQUosQ0FBbUJDLFFBQTdDLEVBQXVEO0FBQ3RERixjQUFVRyxJQUFWLENBQWVuQyxTQUFTK0IsSUFBSUUsY0FBSixDQUFtQkMsUUFBNUIsRUFBc0NoQyxRQUF0QyxDQUFmO0FBQ0E7O0FBRUQ7QUFDQSxPQUFJNkIsSUFBSUssSUFBSixDQUFTQyxVQUFULElBQXVCTixJQUFJSyxJQUFKLENBQVNDLFVBQVQsQ0FBb0I3QixNQUFwQixHQUE2QixDQUF4RCxFQUEyRDtBQUMxRHVCLFFBQUlLLElBQUosQ0FBU0MsVUFBVCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBU0MsU0FBVCxFQUFvQjtBQUMvQyxTQUFJQSxVQUFVQyxFQUFkLEVBQWtCO0FBQ2pCUixnQkFBVUcsSUFBVixDQUFlbkMsU0FBU3VDLFVBQVVDLEVBQW5CLEVBQXVCdEMsUUFBdkIsQ0FBZjtBQUNBO0FBQ0QsS0FKRDtBQUtBOztBQUVELFVBQU84QixTQUFQO0FBQ0EsR0FsQnNCLENBQVIsQ0FBZjs7QUFvQkE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxNQUFJUywwQkFBMEJyQyxvQkFBb0IsQ0FBcEIsRUFBdUJ5QixRQUF2QixDQUE5QjtBQUNBLE1BQUlhLHdCQUF3QnRDLG9CQUFvQixDQUFwQixFQUF1QnlCLFFBQXZCLENBQTVCLENBakM2RCxDQWlDQztBQUM5RCxNQUFJYyxlQUFlLElBQW5CO0FBQ0EsTUFBSUMsZUFBZSxJQUFuQjs7QUFFQSxNQUFJSCx3QkFBd0JqQyxNQUF4QixLQUFtQyxDQUF2QyxFQUEwQztBQUFFO0FBQzNDbUMsa0JBQWV4QixRQUFRSSxRQUFRbUIscUJBQVIsQ0FBUixDQUFmO0FBQ0FFLGtCQUFlekIsUUFBUUksUUFBUW1CLHFCQUFSLENBQVIsQ0FBZjtBQUNEO0FBQ0MsR0FKRCxNQUlPO0FBQ05ELDZCQUEwQmxCLFFBQVFuQixvQkFBb0IsQ0FBcEIsRUFBdUJ5QixRQUF2QixDQUFSLENBQTFCOztBQUdBO0FBQ0EsT0FBSWdCLFlBQVk5QixRQUFRMEIsdUJBQVIsQ0FBaEI7QUFDQSxPQUFJSyxZQUFZM0IsUUFBUXNCLHVCQUFSLENBQWhCOztBQUVBO0FBQ0E7QUFDQSxPQUFJTSxZQUFZTCxzQkFBc0JaLEdBQXRCLENBQTBCLFVBQVNrQixDQUFULEVBQVk7QUFDckQsV0FBT0EsRUFBRXBDLE1BQUYsQ0FBUyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUM5QixTQUFJTyxjQUFjUixDQUFkLEVBQWlCaUMsU0FBakIsSUFBOEJ6QixjQUFjUCxDQUFkLEVBQWlCZ0MsU0FBakIsQ0FBbEMsRUFBK0Q7QUFDOUQsYUFBT2pDLENBQVA7QUFDQTtBQUNELFlBQU9DLENBQVA7QUFDQSxLQUxNLENBQVA7QUFNQSxJQVBlLENBQWhCOztBQVNBO0FBQ0E2QixrQkFBZTVCLFFBQVEsQ0FBQzhCLFNBQUQsRUFBWXBCLE1BQVosQ0FBbUJzQixTQUFuQixDQUFSLENBQWY7QUFDQUgsa0JBQWV6QixRQUFRLENBQUMyQixTQUFELEVBQVlyQixNQUFaLENBQW1Cc0IsU0FBbkIsQ0FBUixDQUFmO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBLEVBbkVEO0FBb0VBLENBdEVEOztBQXdFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxJQUFJRSxnQkFBaUIsWUFBWTtBQUNoQyxLQUFJQyxPQUFPLElBQVg7O0FBRUEsUUFBTyxZQUFXO0FBQ2pCLE1BQUlBLElBQUosRUFBVTtBQUNUQyxXQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxVQUFPQyxRQUFRQyxPQUFSLENBQWdCSixJQUFoQixDQUFQO0FBQ0E7O0FBRUQsU0FBT3pELE1BQU0sa0JBQU4sRUFBMEJDLElBQTFCLENBQStCLFVBQVM2RCxJQUFULEVBQWU7QUFDcERMLFVBQU9LLEtBQUszRCxJQUFMLEVBQVA7QUFDQSxVQUFPc0QsSUFBUDtBQUNBLEdBSE0sQ0FBUDtBQUlBLEVBVkQ7QUFXQSxDQWRvQixFQUFyQjs7QUFnQkE7Ozs7Ozs7QUFPQSxTQUFTTSxZQUFULENBQXNCOUIsT0FBdEIsRUFBK0I7QUFDOUIsUUFBT0EsUUFBUStCLElBQVIsR0FBZUMsSUFBZixDQUFvQixHQUFwQixDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU0MsV0FBVCxDQUFxQkMsWUFBckIsRUFBbUNDLFNBQW5DLEVBQThDO0FBQzdDLFFBQU9BLFVBQVVMLGFBQWEsQ0FBQyxDQUFELEVBQUlJLFlBQUosQ0FBYixDQUFWLENBQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTRSxhQUFULENBQXVCcEMsT0FBdkIsRUFBZ0NxQyxXQUFoQyxFQUE2QztBQUM1QyxRQUFPQSxZQUFZUCxhQUFhOUIsT0FBYixDQUFaLENBQVA7QUFDQTs7QUFFRHVCLGdCQUFnQnZELElBQWhCLENBQXFCLFVBQVNzRSxRQUFULEVBQW1CO0FBQ3ZDLEtBQUlELGNBQWNDLFNBQVNELFdBQTNCOztBQUVBOzs7Ozs7Ozs7QUFTQSxLQUFJRSxtQkFBbUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF2QjtBQUNBLEtBQUlDLGdCQUFnQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXBCOztBQUVBLFVBQVNDLGNBQVQsQ0FBd0JGLGdCQUF4QixFQUEwQ0MsYUFBMUMsRUFBeUQ7QUFDeEQsTUFBSUUsZ0JBQWdCSCxpQkFBaUIsQ0FBakIsQ0FBcEI7QUFDQSxNQUFJSSxnQkFBZ0JKLGlCQUFpQixDQUFqQixDQUFwQjtBQUNBLE1BQUlLLFlBQVlKLGNBQWMsQ0FBZCxDQUFoQjtBQUNBLE1BQUlLLFlBQVlMLGNBQWMsQ0FBZCxDQUFoQjtBQUNBLE1BQUlNLGNBQWMsSUFBbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJLEVBQUVKLGlCQUFpQkUsU0FBakIsSUFBOEJBLGFBQWFELGFBQTdDLEtBQWdFRCxpQkFBaUJHLFNBQWpCLElBQThCQSxhQUFhRixhQUEvRyxFQUErSDtBQUM5SCxPQUFJSSxJQUFJcEQsY0FBY2tELFNBQWQsRUFBeUJILGFBQXpCLENBQVI7QUFDQSxPQUFJMUMsVUFBVSxDQUFDNEMsU0FBRCxFQUFZQyxhQUFhRSxJQUFFLENBQWYsQ0FBWixDQUFkO0FBQ0FELGlCQUFjVixjQUFjcEMsT0FBZCxFQUF1QnFDLFdBQXZCLENBQWQ7QUFDRDtBQUNFLEdBTEYsTUFLUSxJQUFLSyxpQkFBaUJFLFNBQWpCLElBQThCQSxhQUFhRCxhQUE1QyxJQUE4RCxFQUFFRCxpQkFBaUJHLFNBQWpCLElBQThCQSxhQUFhRixhQUE3QyxDQUFsRSxFQUErSDtBQUNySSxPQUFJSSxJQUFJcEQsY0FBY2lELFNBQWQsRUFBeUJELGFBQXpCLENBQVI7QUFDQSxPQUFJM0MsVUFBVSxDQUFDNEMsYUFBYUcsSUFBRSxDQUFmLENBQUQsRUFBb0JGLFNBQXBCLENBQWQ7QUFDQUMsaUJBQWNWLGNBQWNwQyxPQUFkLEVBQXVCcUMsV0FBdkIsQ0FBZDtBQUNEO0FBQ0MsR0FMTSxNQUtBLElBQUlPLFlBQVlGLGFBQVosSUFBNkJHLFlBQVlGLGFBQTdDLEVBQTREO0FBQ2xFLE9BQUlLLFFBQVEsRUFBWjtBQUNBLE9BQUlELElBQUlwRCxjQUFjaUQsU0FBZCxFQUF5QkYsYUFBekIsQ0FBUjtBQUNBLE9BQUlPLElBQUl0RCxjQUFja0QsU0FBZCxFQUF5QkYsYUFBekIsQ0FBUjtBQUNBO0FBQ0EsT0FBSU8sT0FBT2QsY0FBYyxDQUFDUSxTQUFELEVBQWFGLGdCQUFnQixDQUE3QixDQUFkLEVBQWdETCxXQUFoRCxJQUErREQsY0FBYyxDQUFFTyxnQkFBZ0IsQ0FBbEIsRUFBc0JFLFNBQXRCLENBQWQsRUFBZ0RSLFdBQWhELENBQTFFO0FBQ0FXLFNBQU12QyxJQUFOLENBQVd5QyxJQUFYO0FBQ0QsT0FBSWxELFVBQVUsQ0FBQzRDLFNBQUQsRUFBWUMsU0FBWixDQUFkO0FBQ0FHLFNBQU12QyxJQUFOLENBQVcyQixjQUFjcEMsT0FBZCxFQUF1QnFDLFdBQXZCLENBQVg7QUFDQVMsaUJBQWNyRCxRQUFRdUQsS0FBUixDQUFkO0FBQ0Q7QUFDRSxHQVhNLE1BV0EsSUFBS04saUJBQWlCRSxTQUFqQixJQUE4QkEsYUFBYUQsYUFBNUMsSUFBK0RELGlCQUFpQkcsU0FBakIsSUFBOEJBLGFBQWFGLGFBQTlHLEVBQThIO0FBQ3BJRyxpQkFBYyxDQUFkO0FBQ0Q7QUFDQyxHQUhNLE1BR0E7QUFDTixPQUFJOUMsVUFBVSxDQUFDNEMsU0FBRCxFQUFZQyxTQUFaLENBQWQ7QUFDQUMsaUJBQWNWLGNBQWNwQyxPQUFkLEVBQXVCcUMsV0FBdkIsQ0FBZDtBQUNBO0FBQ0QsU0FBT1MsV0FBUDtBQUNBckIsVUFBUUMsR0FBUixDQUFZb0IsV0FBWjtBQUNEO0FBQ0RMLGdCQUFlRixnQkFBZixFQUFpQ0MsYUFBakM7QUFDRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQyxLQUFJTCxZQUFZRyxTQUFTSCxTQUF6QjtBQUNBOztBQUVEO0FBQ0MsS0FBSWxDLFdBQVcsQ0FDZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBRGMsRUFFZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBRmMsRUFHZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBSGMsRUFJZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBSmMsRUFLZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBTGMsRUFNZCxDQUFDLENBQUQsRUFBSSxDQUFKLENBTmMsQ0FBZjs7QUFTRDtBQUNDLEtBQUlrRCxhQUFhLElBQWpCO0FBQ0Q7QUFDQyxLQUFJakIsZUFBZWpDLFNBQVMsQ0FBVCxDQUFuQjs7QUFFQUEsVUFBU1csT0FBVCxDQUFpQixVQUFTWixPQUFULEVBQWtCO0FBQ2xDO0FBQ0FrQyxpQkFBZTdDLFFBQVFXLFFBQVFELE1BQVIsQ0FBZW1DLFlBQWYsQ0FBUixDQUFmOztBQUVBO0FBQ0EsTUFBSWtCLGtCQUFrQm5CLFlBQVlDLFlBQVosRUFBMEJDLFNBQTFCLENBQXRCO0FBQ0EsTUFBSWtCLFNBQVNqQixjQUFjcEMsT0FBZCxFQUF1QnFDLFdBQXZCLENBQWI7O0FBRUE7QUFDQWMsZ0JBQWNFLE1BQWQ7O0FBRUE7QUFDQSxNQUFJRixjQUFjQyxlQUFsQixFQUFtQztBQUNsQ0QsZ0JBQWFDLGVBQWI7QUFDQTtBQUNELEVBZkQ7QUFnQkE7QUFDQTs7O0FBR0Q7QUFDQztBQUNBLEtBQUlFLGNBQWMsRUFBbEI7O0FBRUE7QUFDQSxLQUFJQyxXQUFXLElBQWY7QUFDQXRELFVBQVNXLE9BQVQsQ0FBaUIsVUFBU1osT0FBVCxFQUFrQjtBQUNsQ3dELGNBQVlwQixjQUFjcEMsT0FBZCxFQUF1QnFDLFdBQXZCLENBQVo7QUFDQWtCLGNBQVlDLFNBQVo7QUFDQSxFQUhEO0FBSUFGLGFBQVk3QyxJQUFaLENBQWlCOEMsUUFBakI7O0FBRUE7QUFDQyxLQUFJRSxhQUFhcEUsUUFBUVEsUUFBUUksUUFBUixDQUFSLENBQWpCO0FBQ0EsTUFBSyxJQUFJeUQsSUFBSSxDQUFiLEVBQWdCQSxLQUFLRCxVQUFyQixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDckNqQyxVQUFRQyxHQUFSLENBQVksd0JBQXdCZ0MsQ0FBcEM7QUFDQSxNQUFJQyxjQUFjMUIsWUFBWXlCLENBQVosRUFBZXZCLFNBQWYsQ0FBbEI7QUFDQyxPQUFLLElBQUljLElBQUksQ0FBYixFQUFnQkEsSUFBSWhELFNBQVNuQixNQUE3QixFQUFxQ21FLEdBQXJDLEVBQTBDO0FBQ3pDO0FBQ0RVLGtCQUFlbEIsZUFBZSxDQUFDLENBQUQsRUFBSWlCLENBQUosQ0FBZixFQUF1QnpELFNBQVNnRCxDQUFULENBQXZCLENBQWY7QUFDQztBQUNGeEIsVUFBUUMsR0FBUixDQUFZaUMsV0FBWjs7QUFFQUwsY0FBWTdDLElBQVosQ0FBaUJrRCxXQUFqQjtBQUNBOztBQUVGO0FBQ0EsS0FBSUMsZUFBZSxJQUFuQjtBQUNBQSxnQkFBZW5FLFFBQVE2RCxXQUFSLENBQWY7QUFDQTtBQUNBLENBcklEOztBQXVJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzRiIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjVhNjc0N2I2MDQzM2ZjM2MyY2EiLCIvL1RPIERPXG4vL09mZiBwZWFrIHZzIG9uIHBlYWsgc2luZ2xlcyAoZXNwIGluY2x1ZGluZyBvdXQgb2Ygem9uZSAxIHRvIHpvbmUgMSBpbiBldmVuaW5nIGlzIG9mZnBlYWsgZXhjZXB0aW9uKVxuLy9PZmZwZWFrIGRhaWx5IGNhcCBkaXNjb3VudHMgLSBrZWVwIHRyYWNrIHdoZW4gZGFpbHkgY2FwIHJlYWNoZWQgYnV0IG9ubHkgdHJhdmVsbGVkIG9mZiBwZWFrIChpZiBnb2luZyB0byBkbyBvZmYgcGVhayBveXN0ZXIgY3VtIHRvdGFscyB0aGVuIHdvdWxkIGtub3cgdGhpcylcbi8vcG9zc2liaWxpdHkgb2YgYWx0ZXJpbmcgb3lzdGVyIHNvIHJlZmxlY3RzIG9mZiBwZWFrIC0tIHRoZW4gY291bGQgYWRkICB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyIGFuZCAxLTggIHpvbmVzIG9yIHRvIDkgd2l0aG91dCB3YXRmb3JkXG4vL0NBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xuZnVuY3Rpb24gZmV0Y2hTdGF0aW9uc0RhdGEoKSB7XG5cdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxuZnVuY3Rpb24gZmV0Y2hKb3VybmV5RGF0YShmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59XG5cbi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5mdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG5cdHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIEZpbHRlcnMgdGhlIFpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge2FycmF5fSB6b25lcyAtIHRoZSBhcnJheSBvZiBudW1iZXJzXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gYXJyYXkgb2YgYWxsIHRoZSB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXNcbiAqL1xuZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG5cdHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuXHRcdHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pblpvbmUgYW5kIG1heFpvbmU6IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIFx0IExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG5cdHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gb3BlcmF0b3IoYSwgYik7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXhab25lKGFycmF5Wm9uZXMpIHtcdFxuXHRyZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5mdW5jdGlvbiBtaW5ab25lKGFycmF5Wm9uZXMpIHtcblx0cmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvbiBcbiAqL1xuZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG5cdHJldHVybiBNYXRoLmFicyhhIC0gYik7XG5cdC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5IFxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvbiBcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcblx0cmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdHJldHVybiBhLmNvbmNhdChiKTtcblx0fSk7XG59XG5cbi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuZmV0Y2hTdGF0aW9uc0RhdGEoKS50aGVuKGZ1bmN0aW9uKHN0YXRpb25zKSB7XG5cblx0ZmV0Y2hKb3VybmV5RGF0YSgnMTAwMDAyOScsICcxMDAwMTM4JykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXHRcdC8vIGNvbnNvbGUubG9nKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHQvLyBkZWJ1Z2dlcjtcblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXG5cblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pblpvbmUoZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pblpvbmUoZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhab25lKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5ab25lKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heFpvbmUoW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluWm9uZShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0Ly8gY29uc29sZS5sb2coZmluYWxNYXhab25lKTtcblx0XHQvLyBjb25zb2xlLmxvZyhmaW5hbE1pblpvbmUpO1xuXHR9KTtcbn0pO1xuXG4vLyBGb3JtdWxhdGUgYXJyYXk/IEpvdXJuZXkgMSBvYmplY3Q6IHdpdGggem9uZXMgdHJhdmVsbGVkIChhcnJheTogbWluIGFuZCBtYXgpLCB0aW1lLCBvZmYtcGVhayBvciBvbi1wZWFrLCBzaW5nbGUgcHJpY2UsIGZsYWcgZm9yIGR1YWwgdG8gZHVhbCAoYW5kIHdoYXQgem9uZXMpLlxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBHbG9iYWwgZnVuY3Rpb25zID4gY29tcGFyZU51bWJlcnMgKGNhbiByZWR1Y2UgdG8gdGhlIG1heFpvbmUgYW5kIG1pblpvbmUgb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG5cdHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpIHtcblx0cmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIHRyYXZlbGxpbmcgYmV0d2VlblxuICogQHBhcmFtIHtvYmplY3R9IHNpbmdsZUZhcmVzIC0gbG9va3MgYXQgdGhlIHNpbmdsZUZhcmVzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIGJldHdlZW4gdGhvc2UgdHdvIHpvbmVzXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuXHRyZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XHRcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQHBhcmFtIHthcnJheX0gbWlubWF4VHJhdmVsY2FyZCAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGNvdmVyZWQgem9uZXMsIGluIGFuIGFycmF5XG5cdCAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heEpvdXJuZXkgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgc2luZ2xlIGpvdXJuZXksIGluIGFuIGFycmF5XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZmFyZVxuXHQgKiBAZGVzY3JpcHRpb25cblx0ICovXG5cdFxuXHR2YXIgbWlubWF4VHJhdmVsY2FyZCA9IFszLCA0XTtcblx0dmFyIG1pbm1heEpvdXJuZXkgPSBbMSwgNl07XG5cdFxuXHRmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5KSB7XG5cdFx0dmFyIG1pblRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzBdO1xuXHRcdHZhciBtYXhUcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFsxXTtcblx0XHR2YXIgbWluU2luZ2xlID0gbWlubWF4Sm91cm5leVswXTtcblx0XHR2YXIgbWF4U2luZ2xlID0gbWlubWF4Sm91cm5leVsxXTtcblx0XHR2YXIgam91cm5leUZhcmUgPSBudWxsO1xuXHRcdFxuXHRcdC8vQ09OVEFDVExFU1Mgb25seSB1c2VzIGFkdWx0IGZhcmVzXG5cdFx0Ly9GT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG5cdFx0Ly9GT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2Fwc1xuXHRcdC8vaWYgbWF4IHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWluIHNpbmdsZSBpc250LlxuXHRcdGlmICghKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtaW5UcmF2ZWxjYXJkKTtcblx0XHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlIC0gKHkrMSldO1xuXHRcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudC5cblx0IFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmICEobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdCBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG5cdCBcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlICsgKHkrMSksIG1heFNpbmdsZV07XG5cdCBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0IFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmRcblx0IFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcblx0IFx0XHR2YXIgZmFyZXMgPSBbXTtcblx0IFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWluU2luZ2xlLCBtaW5UcmF2ZWxjYXJkKTtcblx0IFx0XHR2YXIgeCA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcblx0IFx0XHQvLyBwaWNrcyB0aGUgY2hlYXBlc3Q6IHNwbGl0IHNpbmdsZXMgb3IgdGhlIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmQgPT0gc2hvdWxkIGJlIGEgZ2xvYmFsIGZ1bmN0aW9uXG5cdCBcdFx0dmFyIGNvc3QgPSBnZXRTaW5nbGVGYXJlKFttaW5TaW5nbGUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcykgKyBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdFx0ZmFyZXMucHVzaChjb3N0KTtcblx0XHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlXTtcblx0XHRcdGZhcmVzLnB1c2goZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykpO1xuXHRcdFx0am91cm5leUZhcmUgPSBtaW5ab25lKGZhcmVzKVxuXHRcdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcblx0IFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0IFx0XHRqb3VybmV5RmFyZSA9IDA7XG5cdCBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuXHQgXHR9IGVsc2Uge1xuXHQgXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlXTtcblx0IFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHQgXHR9XG5cdCBcdHJldHVybiBqb3VybmV5RmFyZTtcblx0IFx0Y29uc29sZS5sb2coam91cm5leUZhcmUpO1xuXHR9O1xuXHRleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5KTtcbi8vIH0pO1xuXG4vL1NJTkdMRSBGQVJFUyBORUVEIFRPIEJFIEFMVEVSRUQgVE8gT0ZGIFBFQUsgT1IgT04gUEVBSyAmIHByZWZlcmFibHkgYSBjb3VudGVyIG9uIHdoZXRoZXIgYSBjYXAgd2FzIHJlYWNoZWRcbi8vIHdoYXQgYWJvdXQgem9uZSAxIHRvIHpvbmUgMSBleGNlcHRpb24gZm9yIG9mZiBwZWFrPj9cblxuLy8gLSBPWVNURVIgQ2hlYXBlc3QgRmFyZVxuLy8gZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2Fwcztcblx0Ly8gdmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cbi8vQW4gYXJyYXkgb2YgYWxsIHRoZSBqb3VybmV5cyB3aXRoIHRoZWlyIG1heCBhbmQgbWluIHpvbmVzIHRyYXZlbGxlZFxuXHR2YXIgam91cm5leXMgPSBbXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCA0XSxcblx0XHRbMSwgM10sXG5cdF07XG5cbi8vY3VtVG90YWwgPSB0aGUgdG90YWwgdGhhdCB1cGRhdGVzIGFuZCBiZWNvbWVzIHRoZSBmaW5hbCBveXN0ZXIgZmFyZVxuXHR2YXIgb3lDdW1Ub3RhbCA9IG51bGw7XG4vL21heFpvbmVzc29mYXIgZm9yIGVhY2ggam91cm5leSB1cGRhdGVzIGFuZCBpcyB0aGUgYXJyYXkgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdHZhciBtYXhab25lc29mYXIgPSBqb3VybmV5c1swXTtcblxuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHQvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdFx0bWF4Wm9uZXNvZmFyID0gbWF4Wm9uZShqb3VybmV5LmNvbmNhdChtYXhab25lc29mYXIpKTtcblxuXHRcdC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG5cdFx0dmFyIG1heFpvbmVEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKTtcblx0XHR2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFxuXHRcdC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcblx0XHRveUN1bVRvdGFsICs9IHNpbmdsZTtcblxuXHRcdC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuXHRcdGlmIChveUN1bVRvdGFsID49IG1heFpvbmVEYWlseUNhcCkge1xuXHRcdFx0b3lDdW1Ub3RhbCA9IG1heFpvbmVEYWlseUNhcDtcblx0XHR9XG5cdH0pO1xuXHQvL1RoaXMgaXMgdGhlIGZpbmFsIG95c3RlciBkYWlseSBmYXJlIGNhbGN1bGF0ZWQ6XG5cdC8vIGNvbnNvbGUubG9nKG95Q3VtVG90YWwpO1xuXG5cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IFxuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0dmFyIGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHR2YXIgY29uRmFyZXMgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHRjb25TaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XHRjb25GYXJlcyArPSBjb25TaW5nbGU7XG5cdH0pO1xuXHRjb25BbGxGYXJlcy5wdXNoKGNvbkZhcmVzKTtcblxuXHQvLyBcdFRoZW4gZm9yIGVhY2ggWm9uZSByYW5nZSAoZnJvbSBab25lIDEtMyB1bnRpbCBab25lIDEgdG8gbWF4KSByZXBlYXQgc2FtZSBjYWxjdWxhdGlvbi5cblx0IHZhciBjb25NYXhab25lID0gbWF4Wm9uZShmbGF0dGVuKGpvdXJuZXlzKSk7XG5cdCBmb3IgKHZhciBpID0gMjsgaSA8PSBjb25NYXhab25lOyBpKyspIHtcblx0IFx0Y29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG5cdCBcdHZhciBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG5cdCBcdCBmb3IgKHZhciB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG5cdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKFsxLCBpXSwgam91cm5leXNbeF0pO1xuXHQgXHQgfTtcblx0IFx0Y29uc29sZS5sb2coY29uQ3VtVG90YWwpO1xuXG5cdCBcdGNvbkFsbEZhcmVzLnB1c2goY29uQ3VtVG90YWwpO1xuXHQgfVxuXG5cdC8vIFx0LS0tPiBDb21wYXJlIGFsbCB0aGUgcG9zc2liaWxpdGllcyBhbmQgc2VsZWN0IHRoZSBjaGVhcGVzdCAoaW5jbHVkaW5nIHRvdGFsIHNpbmdsZSkuIFxuXHR2YXIgY29uRmluYWxGYXJlID0gbnVsbDtcblx0Y29uRmluYWxGYXJlID0gbWluWm9uZShjb25BbGxGYXJlcyk7XG5cdC8vIGNvbnNvbGUubG9nKGNvbkZpbmFsRmFyZSk7XG59KTtcblxuLy9DT05UQUNUTEVTUyBXRUVLTFkgQ0FQIC0gbWl4dHVyZSAgb2Ygd2Vla2x5IGNhcCBhbmQgZGFpbHkgY2FwXG5cbi8vVEhJUyBNRVRIT0QgUkVMSUVTIE9OIFRIRSBGQUNUIFRIQVQ6XG4vLy0gem9uZSB4IHRvIHggZmFyZSBpcyB0aGUgc2FtZSBhcyB6b25lIHgtMSB0byB6b25lIHggZmFyZVxuLy8tIElmIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIG1pbiBhbmQgbWF4IGdhcCB6b25lcyBhcmUgPiAxLCBicmVha3Mgc2luY2UgYXNzdW1pbmcgZmFyZSBmb3IgeCB0byB4IGFuZCB4LTEgdG8geCBhcmUgdGhlIHNhbWUuXG4vLy0gQXNzdW1lcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDEgKGVsc2UgbmVlZCBtaW4gc2luZ2xlIDwgY2FwcGVkIHpvbmUgSUZzKVxuXG4vLyBNb3N0IGNvbWJvcyAod2l0aG91dCBhIGdhcCBiZXR3ZWVuIHRoZSAyIHRyYXZlbGNhcmRzKSAtIGV4dGVuc2lvbiBmYXJlIGFzIGp1c3QgYmV0d2Vlbjpcbi8vLS0tLT4gQ09VTEQgSlVTVCBVUERBVEUgVEhFIE1BWCBaT05FIEFORCBVU0UgU0FNRSBDQUxVTENBVElPTlMgQVMgREFJTFk/Pz8gbWluIHRyYXZlbCA9IDFcbi8vIC0gbWF4aW11bSB6b25lIG9mIGRhaWx5IG9yIHRyYXZlbGNhcmQgY2FwICsgMSB0byBtYXhpbXVtIHNpbmdsZSB6b25lIChpZiBtaW4gc2luZ2xlIDw9IG1heCB6b25lIG9mIGRhaWx5IG9yIHRyYXZlbGNhcmQgY2FwICYgbWF4IHNpbmdsZSA+IG1heCB6b25lIG9mIGRhaWx5IG9yIHRyYXZlbGNhcmQgY2FwKVxuLy8gLSBPUiBib3RoIHdpdGhpbiBtaW4gYW5kIG1heGNhcHBlZCA9IGZyZWVcbi8vIC0gRUxTRSBqdXN0IGJvdGggb3V0c2lkZSBjYXBwZWQgem9uZXMgPSBmdWxsIGZhcmVcblxuXG4vLyBIT1dFVkVSIGZvciB6b25lIDQtNSB3ZWVrbHkgYW5kIDEtMiBkYWlseTogaGF2ZSBnYXAgb2Ygem9uZSAzIGFuZCA2IC8gZm9yIHpvbmUgNC02IHdlZWtseSBhbmQgMS0yIGRhaWx5OiBnYXAgb2Ygem9uZSAzIC8gaWYgd2Vla2x5IDUtNiBhbmQgMS0yIGRhaWx5OiBnYXAgMyBhbmQgNCAvIHdlZWtseSA1LTYgYW5kIGRhaWx5IDEtMzogZ2FwIHpvbmUgNFxuLy9JRiBkaWZmZXJlbmNlIGJldHdlZW4gbWluIHdlZWtseSBhbmQgbWF4IGRhaWx5IGNhcCA+IDFcbi8vIHRoZW4gbWluIGdhcCB6b25lID0gbWF4IGRhaWx5IGNhcCArMSAmIG1heCBnYXAgem9uZSA9IG1pbiB3ZWVrbHkgZ2FwIC0gMVxuXG4vL0lGIG1pbiBzaW5nbGUgPD0gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgPj0gbWF4IGdhcCB6b25lIGJ1dCBtYXggc2luZ2xlIDw9IG1heCB3ZWVrbHkgem9uZVxuLy8gdGhlbiBjaGFyZ2UgbWluIHRvIG1heCBnYXAgZmFyZVxuLy9JRiBtaW4gc2luZ2xlIHpvbmUgPD0gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgPiBtYXggd2VlbHkgem9uZVxuLy8gdGhlbiBjaGFyZ2UgY2hlYXBlc3Q6IGZ1bGwgZmFyZSBvciBtYXggd2Vla2x5ICsgMSB0byBtYXggc2luZ2xlIHpvbmUmICYgZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KVxuLy8gdGhlbiBjaGFyZ2Ugc2luZ2xlIG1pbiB0byBzaW5nbGUgbWF4IGZhcmVcbi8vRUxTRSAoSUYgYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCBkYWlseSAvIGJvdGggbWluIGFuZCBtYXggc2luZ2xlcyB3aXRoaW4gbWluIGFuZCBtYXggd2Vla2x5KVxuLy8gdGhlbiBjaGFyZ2UgMFxuXG4vLyBSZW1lbWJlciBjYWxjdWxhdGUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyAtIHNob3VsZCBiZSBzaW1pbGFyIHRvIGRhaWx5IGNhbGN1bGF0aW9uc1xuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=