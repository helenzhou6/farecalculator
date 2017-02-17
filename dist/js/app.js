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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(1);


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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		// console.log(filterZonesByNumber(1, allZones));
		// debugger;

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));


		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxZone */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])(zonesFromSingleStations);

			//For each zonesFromDualStations: picks the most appropriate zone and appends to dualZones array 
			// --> Going from 2/3 to 2/3 —> charges same single 2, 3 or 2-3 (1.70) but should pick zone based on weekly (could be 3) or cap (always smallest: 2)
			var dualZones = zonesFromDualStations.map(function (z) {
				return z.reduce(function (a, b) {
					if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(a, singleMin) < __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(b, singleMin)) {
						return a;
					}
					return b;
				});
			});

			//Adds dualZones to singleMax into an array and calculates the max and min zone of both
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxZone */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])([singleMin].concat(dualZones));
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
			var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, minTravelcard);
			var journey = [minSingle, maxSingle - (y + 1)];
			journeyFare = getSingleFare(journey, singleFares);
			//if min single within travelcard zones but max single isnt.
		} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
			var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, maxTravelcard);
			var journey = [minSingle + (y + 1), maxSingle];
			journeyFare = getSingleFare(journey, singleFares);
			//if min single less than min travelcard and max single more than max travelcard
		} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
			var fares = [];
			var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, minTravelcard);
			var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, maxTravelcard);
			// picks the cheapest: split singles or the full fare without travelcard == should be a global function
			var cost = getSingleFare([minSingle, minTravelcard - 1], singleFares) + getSingleFare([maxTravelcard + 1, maxSingle], singleFares);
			fares.push(cost);
			var journey = [minSingle, maxSingle];
			fares.push(getSingleFare(journey, singleFares));
			journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])(fares);
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
		maxZonesofar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxZone */])(journey.concat(maxZonesofar));

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
	var conSingle = null;
	journeys.forEach(function (journey) {
		conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxZone */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(journeys));
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
	conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minZone */])(conAllFares);
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["c"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["e"] = maxZone;
/* harmony export (immutable) */ __webpack_exports__["d"] = minZone;
/* harmony export (immutable) */ __webpack_exports__["f"] = getDifference;
/* harmony export (immutable) */ __webpack_exports__["a"] = flatten;
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGE1MzJmMzExYzM4ZmVhZjE0NDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyJdLCJuYW1lcyI6WyJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoIiwidGhlbiIsImUiLCJqc29uIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsInN0YXRpb25zIiwiam91cm5leSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwiZmxhdHRlbiIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwiZ2V0Wm9uZXMiLCJwYXRoIiwic3RvcFBvaW50cyIsImxlbmd0aCIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsIm1pblpvbmUiLCJzaW5nbGVNYXgiLCJtYXhab25lIiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsInJlZHVjZSIsImEiLCJiIiwiZ2V0RGlmZmVyZW5jZSIsImNvbmNhdCIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzcCIsImpvdXJuZXlUb0tleSIsInNvcnQiLCJqb2luIiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRTaW5nbGVGYXJlIiwic2luZ2xlRmFyZXMiLCJmYXJlRGF0YSIsIm1pbm1heFRyYXZlbGNhcmQiLCJtaW5tYXhKb3VybmV5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsImpvdXJuZXlGYXJlIiwieSIsImZhcmVzIiwieCIsImNvc3QiLCJveUN1bVRvdGFsIiwibWF4Wm9uZURhaWx5Q2FwIiwic2luZ2xlIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvblNpbmdsZSIsImNvbk1heFpvbmUiLCJpIiwiY29uQ3VtVG90YWwiLCJjb25GaW5hbEZhcmUiLCJuYXBUYW4iLCJ6b25lcyIsIm51bSIsImZpbHRlciIsInpvbmUiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJhYnMiLCJhcnIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTQSxpQkFBVCxHQUE2QjtBQUM1QixRQUFPQyxNQUFNLHFCQUFOLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFTQyxDQUFULEVBQVk7QUFDcEQsU0FBT0EsRUFBRUMsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0E7O0FBRUQ7QUFDQSxTQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0NDLEVBQWhDLEVBQW9DO0FBQ25DLFFBQU9OLE1BQU0sbURBQW1ESyxJQUFu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QU9nRCxTQUFTakQsQ0FBVCxFQUFZQyxDQUFaLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTTixPQUFULENBQWlCdUQsVUFBakIsRUFBNkI7QUFDbEMsU0FBT0gsZUFBZUcsVUFBZixFQUEyQkMsS0FBS0MsR0FBaEMsQ0FBUDtBQUNEOztBQUVNLFNBQVMzRCxPQUFULENBQWlCeUQsVUFBakIsRUFBNkI7QUFDbEMsU0FBT0gsZUFBZUcsVUFBZixFQUEyQkMsS0FBS0UsR0FBaEMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT08sU0FBU25ELGFBQVQsQ0FBdUJGLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUNsQyxTQUFPa0QsS0FBS0csR0FBTCxDQUFTdEQsSUFBSUMsQ0FBYixDQUFQO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVMzQixPQUFULENBQWlCaUYsR0FBakIsRUFBc0I7QUFDM0IsU0FBT0EsSUFBSXhELE1BQUosQ0FBVyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUMvQixXQUFPRCxFQUFFRyxNQUFGLENBQVNGLENBQVQsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdELEMiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRhNTMyZjMxMWMzOGZlYWYxNDQ1IiwiaW1wb3J0IHtnZXRab25lcywgZmlsdGVyWm9uZXNCeU51bWJlciwgbWF4Wm9uZSwgbWluWm9uZSwgZ2V0RGlmZmVyZW5jZSwgZmxhdHRlbn0gZnJvbSAnLi91dGlsaXR5L191dGlsaXR5JztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbmZ1bmN0aW9uIGZldGNoU3RhdGlvbnNEYXRhKCkge1xuXHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufVxuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbmZ1bmN0aW9uIGZldGNoSm91cm5leURhdGEoZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufVxuXG4vL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcbmZldGNoU3RhdGlvbnNEYXRhKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXG5cdGZldGNoSm91cm5leURhdGEoJzEwMDAwMjknLCAnMTAwMDEzOCcpLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblx0XHQvLyBjb25zb2xlLmxvZyhmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0Ly8gZGVidWdnZXI7XG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblxuXG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5ab25lKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5ab25lKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4Wm9uZSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluWm9uZSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhab25lKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pblpvbmUoW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdC8vIGNvbnNvbGUubG9nKGZpbmFsTWF4Wm9uZSk7XG5cdFx0Ly8gY29uc29sZS5sb2coZmluYWxNaW5ab25lKTtcblx0fSk7XG59KTtcblxuLy8gRm9ybXVsYXRlIGFycmF5PyBKb3VybmV5IDEgb2JqZWN0OiB3aXRoIHpvbmVzIHRyYXZlbGxlZCAoYXJyYXk6IG1pbiBhbmQgbWF4KSwgdGltZSwgb2ZmLXBlYWsgb3Igb24tcGVhaywgc2luZ2xlIHByaWNlLCBmbGFnIGZvciBkdWFsIHRvIGR1YWwgKGFuZCB3aGF0IHpvbmVzKS5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gR2xvYmFsIGZ1bmN0aW9ucyA+IGNvbXBhcmVOdW1iZXJzIChjYW4gcmVkdWNlIHRvIHRoZSBtYXhab25lIGFuZCBtaW5ab25lIG9mIGFuIGFycmF5KSAmIGdldERpZmZlcmVuY2UgYncgMiBudW1iZXJzXG5cbi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5mdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuXHRyZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKSB7XG5cdHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2luZ2xlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyB0cmF2ZWxsaW5nIGJldHdlZW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzaW5nbGVGYXJlcyAtIGxvb2tzIGF0IHRoZSBzaW5nbGVGYXJlcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSBiZXR3ZWVuIHRob3NlIHR3byB6b25lc1xuICogQGRlc2NyaXB0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpIHtcblx0cmV0dXJuIHNpbmdsZUZhcmVzW2pvdXJuZXlUb0tleShqb3VybmV5KV07XG59XG5cbmZldGNoRmFyZURhdGEoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG5cdHZhciBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1x0XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heFRyYXZlbGNhcmQgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjb3ZlcmVkIHpvbmVzLCBpbiBhbiBhcnJheVxuXHQgKiBAcGFyYW0ge2FycmF5fSBtaW5tYXhKb3VybmV5IC0gdGhlIG1pbiBhbmQgbWF4IHpvbmUgb2YgdGhlIHNpbmdsZSBqb3VybmV5LCBpbiBhbiBhcnJheVxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGZhcmVcblx0ICogQGRlc2NyaXB0aW9uXG5cdCAqL1xuXHRcblx0dmFyIG1pbm1heFRyYXZlbGNhcmQgPSBbMywgNF07XG5cdHZhciBtaW5tYXhKb3VybmV5ID0gWzEsIDZdO1xuXHRcblx0ZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMobWlubWF4VHJhdmVsY2FyZCwgbWlubWF4Sm91cm5leSkge1xuXHRcdHZhciBtaW5UcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFswXTtcblx0XHR2YXIgbWF4VHJhdmVsY2FyZCA9IG1pbm1heFRyYXZlbGNhcmRbMV07XG5cdFx0dmFyIG1pblNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMF07XG5cdFx0dmFyIG1heFNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMV07XG5cdFx0dmFyIGpvdXJuZXlGYXJlID0gbnVsbDtcblx0XHRcblx0XHQvL0NPTlRBQ1RMRVNTIG9ubHkgdXNlcyBhZHVsdCBmYXJlc1xuXHRcdC8vRk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuXHRcdC8vRk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHNcblx0XHQvL2lmIG1heCBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1pbiBzaW5nbGUgaXNudC5cblx0XHRpZiAoIShtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1heFNpbmdsZSwgbWluVHJhdmVsY2FyZCk7XG5cdFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZSAtICh5KzEpXTtcblx0XHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQuXG5cdCBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAhKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHQgXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtaW5TaW5nbGUsIG1heFRyYXZlbGNhcmQpO1xuXHQgXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSArICh5KzEpLCBtYXhTaW5nbGVdO1xuXHQgXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdCBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkXG5cdCBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG5cdCBcdFx0dmFyIGZhcmVzID0gW107XG5cdCBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWluVHJhdmVsY2FyZCk7XG5cdCBcdFx0dmFyIHggPSBnZXREaWZmZXJlbmNlKG1heFNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG5cdCBcdFx0Ly8gcGlja3MgdGhlIGNoZWFwZXN0OiBzcGxpdCBzaW5nbGVzIG9yIHRoZSBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkID09IHNob3VsZCBiZSBhIGdsb2JhbCBmdW5jdGlvblxuXHQgXHRcdHZhciBjb3N0ID0gZ2V0U2luZ2xlRmFyZShbbWluU2luZ2xlLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgc2luZ2xlRmFyZXMpICsgZ2V0U2luZ2xlRmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuXHQgXHRcdGZhcmVzLnB1c2goY29zdCk7XG5cdFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZV07XG5cdFx0XHRmYXJlcy5wdXNoKGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpKTtcblx0XHRcdGpvdXJuZXlGYXJlID0gbWluWm9uZShmYXJlcylcblx0XHQvL2JvdGggc2luZ2xlIHpvbmVzIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzXG5cdCBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdCBcdFx0am91cm5leUZhcmUgPSAwO1xuXHQgXHQvL2JvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcblx0IFx0fSBlbHNlIHtcblx0IFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZV07XG5cdCBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0IFx0fVxuXHQgXHRyZXR1cm4gam91cm5leUZhcmU7XG5cdCBcdGNvbnNvbGUubG9nKGpvdXJuZXlGYXJlKTtcblx0fTtcblx0ZXh0ZW5zaW9uRmFyZXMobWlubWF4VHJhdmVsY2FyZCwgbWlubWF4Sm91cm5leSk7XG4vLyB9KTtcblxuLy9TSU5HTEUgRkFSRVMgTkVFRCBUTyBCRSBBTFRFUkVEIFRPIE9GRiBQRUFLIE9SIE9OIFBFQUsgJiBwcmVmZXJhYmx5IGEgY291bnRlciBvbiB3aGV0aGVyIGEgY2FwIHdhcyByZWFjaGVkXG4vLyB3aGF0IGFib3V0IHpvbmUgMSB0byB6b25lIDEgZXhjZXB0aW9uIGZvciBvZmYgcGVhaz4/XG5cbi8vIC0gT1lTVEVSIENoZWFwZXN0IEZhcmVcbi8vIGZldGNoRmFyZURhdGEoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG5cdHZhciBkYWlseUNhcHMgPSBmYXJlRGF0YS5kYWlseUNhcHM7XG5cdC8vIHZhciBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuXG4vL0FuIGFycmF5IG9mIGFsbCB0aGUgam91cm5leXMgd2l0aCB0aGVpciBtYXggYW5kIG1pbiB6b25lcyB0cmF2ZWxsZWRcblx0dmFyIGpvdXJuZXlzID0gW1xuXHRcdFsyLCAxXSxcblx0XHRbMSwgMl0sXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgNF0sXG5cdFx0WzEsIDNdLFxuXHRdO1xuXG4vL2N1bVRvdGFsID0gdGhlIHRvdGFsIHRoYXQgdXBkYXRlcyBhbmQgYmVjb21lcyB0aGUgZmluYWwgb3lzdGVyIGZhcmVcblx0dmFyIG95Q3VtVG90YWwgPSBudWxsO1xuLy9tYXhab25lc3NvZmFyIGZvciBlYWNoIGpvdXJuZXkgdXBkYXRlcyBhbmQgaXMgdGhlIGFycmF5IG9mIGFsbCB0aGUgem9uZXMgdHJhdmVsbGVkIGluIHNvIGZhclxuXHR2YXIgbWF4Wm9uZXNvZmFyID0gam91cm5leXNbMF07XG5cblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0Ly9HZXRzIHRoZSBtYXhpbXVtIHpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdHJhdmVsbGVkIGluIHNvIGZhclxuXHRcdG1heFpvbmVzb2ZhciA9IG1heFpvbmUoam91cm5leS5jb25jYXQobWF4Wm9uZXNvZmFyKSk7XG5cblx0XHQvL0dldHMgdGhlIHJlbGV2YW50IGRhaWx5IGNhcCB0byB0aGF0IG1heCB6b25lICYgc2luZ2xlIGZhcmUgZm9yIHRoYXQgam91cm5leVxuXHRcdHZhciBtYXhab25lRGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcyk7XG5cdFx0dmFyIHNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcblx0XHQvL2FkZHMgdGhlIHNpbmdsZSBmYXJlIHRvIHRoZSBjdW11bGF0aXZlIHRvdGFsXG5cdFx0b3lDdW1Ub3RhbCArPSBzaW5nbGU7XG5cblx0XHQvL2lmIHRoZSBkYWlseSBjYXAgZm9yIHRoZSBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcblx0XHRpZiAob3lDdW1Ub3RhbCA+PSBtYXhab25lRGFpbHlDYXApIHtcblx0XHRcdG95Q3VtVG90YWwgPSBtYXhab25lRGFpbHlDYXA7XG5cdFx0fVxuXHR9KTtcblx0Ly9UaGlzIGlzIHRoZSBmaW5hbCBveXN0ZXIgZGFpbHkgZmFyZSBjYWxjdWxhdGVkOlxuXHQvLyBjb25zb2xlLmxvZyhveUN1bVRvdGFsKTtcblxuXG4vLyAtIENPTlRBQ1RMRVNTIENoZWFwZXN0IEZhcmUgPSBcblx0Ly9UaGUgYXJyYXkgb2YgYWxsIGNvbWJpbmF0aW9uIHByaWNlcyB0byBiZSByZWR1Y2UgdG8gY2hlYXBlc3Qgb25lXG5cdHZhciBjb25BbGxGYXJlcyA9IFtdO1xuXG5cdC8vIGZvciB3aXRob3V0IGFueSBkYWlseSBjYXBzLCBvbmx5IHNpbmdsZXMgYWRkZWQgdG9nZXRoZXJcblx0dmFyIGNvbkZhcmVzID0gbnVsbDtcblx0dmFyIGNvblNpbmdsZSA9IG51bGw7XG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdGNvblNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcdGNvbkZhcmVzICs9IGNvblNpbmdsZTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgdmFyIGNvbk1heFpvbmUgPSBtYXhab25lKGZsYXR0ZW4oam91cm5leXMpKTtcblx0IGZvciAodmFyIGkgPSAyOyBpIDw9IGNvbk1heFpvbmU7IGkrKykge1xuXHQgXHRjb25zb2xlLmxvZygnZm9yIGRhaWx5IGNhcCAxIHRvICcgKyBpKTtcblx0IFx0dmFyIGNvbkN1bVRvdGFsID0gZ2V0RGFpbHlDYXAoaSwgZGFpbHlDYXBzKTtcblx0IFx0IGZvciAodmFyIHggPSAwOyB4IDwgam91cm5leXMubGVuZ3RoOyB4KyspIHtcblx0IFx0IFx0Ly9hZGRpbmcgZXh0ZW5zaW9uIGZhcmVzIHRvIGN1bVRvdGFsXG5cdCBcdFx0Y29uQ3VtVG90YWwgKz0gZXh0ZW5zaW9uRmFyZXMoWzEsIGldLCBqb3VybmV5c1t4XSk7XG5cdCBcdCB9O1xuXHQgXHRjb25zb2xlLmxvZyhjb25DdW1Ub3RhbCk7XG5cblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS4gXG5cdHZhciBjb25GaW5hbEZhcmUgPSBudWxsO1xuXHRjb25GaW5hbEZhcmUgPSBtaW5ab25lKGNvbkFsbEZhcmVzKTtcblx0Ly8gY29uc29sZS5sb2coY29uRmluYWxGYXJlKTtcbn0pO1xuXG4vL0NPTlRBQ1RMRVNTIFdFRUtMWSBDQVAgLSBtaXh0dXJlICBvZiB3ZWVrbHkgY2FwIGFuZCBkYWlseSBjYXBcblxuLy9USElTIE1FVEhPRCBSRUxJRVMgT04gVEhFIEZBQ1QgVEhBVDpcbi8vLSB6b25lIHggdG8geCBmYXJlIGlzIHRoZSBzYW1lIGFzIHpvbmUgeC0xIHRvIHpvbmUgeCBmYXJlXG4vLy0gSWYgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbWluIGFuZCBtYXggZ2FwIHpvbmVzIGFyZSA+IDEsIGJyZWFrcyBzaW5jZSBhc3N1bWluZyBmYXJlIGZvciB4IHRvIHggYW5kIHgtMSB0byB4IGFyZSB0aGUgc2FtZS5cbi8vLSBBc3N1bWVzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMSAoZWxzZSBuZWVkIG1pbiBzaW5nbGUgPCBjYXBwZWQgem9uZSBJRnMpXG5cbi8vIE1vc3QgY29tYm9zICh3aXRob3V0IGEgZ2FwIGJldHdlZW4gdGhlIDIgdHJhdmVsY2FyZHMpIC0gZXh0ZW5zaW9uIGZhcmUgYXMganVzdCBiZXR3ZWVuOlxuLy8tLS0tPiBDT1VMRCBKVVNUIFVQREFURSBUSEUgTUFYIFpPTkUgQU5EIFVTRSBTQU1FIENBTFVMQ0FUSU9OUyBBUyBEQUlMWT8/PyBtaW4gdHJhdmVsID0gMVxuLy8gLSBtYXhpbXVtIHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgKyAxIHRvIG1heGltdW0gc2luZ2xlIHpvbmUgKGlmIG1pbiBzaW5nbGUgPD0gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgJiBtYXggc2luZ2xlID4gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXApXG4vLyAtIE9SIGJvdGggd2l0aGluIG1pbiBhbmQgbWF4Y2FwcGVkID0gZnJlZVxuLy8gLSBFTFNFIGp1c3QgYm90aCBvdXRzaWRlIGNhcHBlZCB6b25lcyA9IGZ1bGwgZmFyZVxuXG5cbi8vIEhPV0VWRVIgZm9yIHpvbmUgNC01IHdlZWtseSBhbmQgMS0yIGRhaWx5OiBoYXZlIGdhcCBvZiB6b25lIDMgYW5kIDYgLyBmb3Igem9uZSA0LTYgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGdhcCBvZiB6b25lIDMgLyBpZiB3ZWVrbHkgNS02IGFuZCAxLTIgZGFpbHk6IGdhcCAzIGFuZCA0IC8gd2Vla2x5IDUtNiBhbmQgZGFpbHkgMS0zOiBnYXAgem9uZSA0XG4vL0lGIGRpZmZlcmVuY2UgYmV0d2VlbiBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMVxuLy8gdGhlbiBtaW4gZ2FwIHpvbmUgPSBtYXggZGFpbHkgY2FwICsxICYgbWF4IGdhcCB6b25lID0gbWluIHdlZWtseSBnYXAgLSAxXG5cbi8vSUYgbWluIHNpbmdsZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+PSBtYXggZ2FwIHpvbmUgYnV0IG1heCBzaW5nbGUgPD0gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBtaW4gdG8gbWF4IGdhcCBmYXJlXG4vL0lGIG1pbiBzaW5nbGUgem9uZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+IG1heCB3ZWVseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBjaGVhcGVzdDogZnVsbCBmYXJlIG9yIG1heCB3ZWVrbHkgKyAxIHRvIG1heCBzaW5nbGUgem9uZSYgJiBnYXAgZmFyZVxuLy9JRiBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpXG4vLyB0aGVuIGNoYXJnZSBzaW5nbGUgbWluIHRvIHNpbmdsZSBtYXggZmFyZVxuLy9FTFNFIChJRiBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IGRhaWx5IC8gYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCB3ZWVrbHkpXG4vLyB0aGVuIGNoYXJnZSAwXG5cbi8vIFJlbWVtYmVyIGNhbGN1bGF0ZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIC0gc2hvdWxkIGJlIHNpbWlsYXIgdG8gZGFpbHkgY2FsY3VsYXRpb25zXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIEZpbHRlcnMgdGhlIFpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge2FycmF5fSB6b25lcyAtIHRoZSBhcnJheSBvZiBudW1iZXJzXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gYXJyYXkgb2YgYWxsIHRoZSB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5ab25lIGFuZCBtYXhab25lOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heFpvbmUoYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluWm9uZShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyJdLCJzb3VyY2VSb290IjoiIn0=