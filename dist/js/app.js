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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);


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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTI0ZmUyNzgyN2ZmN2IzYTBlNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyJnZXRab25lcyIsIm5hcFRhbiIsInN0YXRpb25zIiwiem9uZXMiLCJmaWx0ZXJab25lc0J5TnVtYmVyIiwibnVtIiwiZmlsdGVyIiwiem9uZSIsImxlbmd0aCIsImNvbXBhcmVOdW1iZXJzIiwiYXJyYXlOdW1iZXJzIiwib3BlcmF0b3IiLCJyZWR1Y2UiLCJhIiwiYiIsIm1heFpvbmUiLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pblpvbmUiLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2giLCJ0aGVuIiwiZSIsImpzb24iLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiam91cm5leSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibWFwIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzcCIsImpvdXJuZXlUb0tleSIsInNvcnQiLCJqb2luIiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRTaW5nbGVGYXJlIiwic2luZ2xlRmFyZXMiLCJmYXJlRGF0YSIsIm1pbm1heFRyYXZlbGNhcmQiLCJtaW5tYXhKb3VybmV5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsImpvdXJuZXlGYXJlIiwieSIsImZhcmVzIiwieCIsImNvc3QiLCJveUN1bVRvdGFsIiwibWF4Wm9uZURhaWx5Q2FwIiwic2luZ2xlIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvblNpbmdsZSIsImNvbk1heFpvbmUiLCJpIiwiY29uQ3VtVG90YWwiLCJjb25GaW5hbEZhcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7Ozs7Ozs7O0FBUU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ3pDLFNBQU9BLFNBQVNELE1BQVQsRUFBaUJFLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0MsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQWtDRixLQUFsQyxFQUF5QztBQUM5QyxTQUFPQSxNQUFNRyxNQUFOLENBQWEsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDLFdBQU9BLEtBQUtDLE1BQUwsS0FBZ0JILEdBQXZC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QUFqQyxFQUFzQztBQUNyQ2pDLFVBQVFDLEdBQVIsQ0FBWSx3QkFBd0JnQyxDQUFwQztBQUNBLE1BQUlDLGNBQWMxQixZQUFZeUIsQ0FBWixFQUFldkIsU0FBZixDQUFsQjtBQUNDLE9BQUssSUFBSWMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaEQsU0FBUzNCLE1BQTdCLEVBQXFDMkUsR0FBckMsRUFBMEM7QUFDekM7QUFDRFUsa0JBQWVsQixlQUFlLENBQUMsQ0FBRCxFQUFJaUIsQ0FBSixDQUFmLEVBQXVCekQsU0FBU2dELENBQVQsQ0FBdkIsQ0FBZjtBQUNDO0FBQ0Z4QixVQUFRQyxHQUFSLENBQVlpQyxXQUFaOztBQUVBTCxjQUFZN0MsSUFBWixDQUFpQmtELFdBQWpCO0FBQ0E7O0FBRUY7QUFDQSxLQUFJQyxlQUFlLElBQW5CO0FBQ0FBLGdCQUFlLHdGQUFBM0UsQ0FBUXFFLFdBQVIsQ0FBZjtBQUNBO0FBQ0EsQ0F0SUQ7O0FBd0lBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNGIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjRmZTI3ODI3ZmY3YjNhMGU1ZSIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBGaWx0ZXJzIHRoZSBab25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHthcnJheX0gem9uZXMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyc1xuICogQHJldHVybnMge2FycmF5fSAtIGFycmF5IG9mIGFsbCB0aGUgem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluWm9uZSBhbmQgbWF4Wm9uZTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhab25lKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pblpvbmUoYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge2dldFpvbmVzLCBmaWx0ZXJab25lc0J5TnVtYmVyLCBtYXhab25lLCBtaW5ab25lLCBnZXREaWZmZXJlbmNlLCBmbGF0dGVufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG4vL1RPIERPXG4vL09mZiBwZWFrIHZzIG9uIHBlYWsgc2luZ2xlcyAoZXNwIGluY2x1ZGluZyBvdXQgb2Ygem9uZSAxIHRvIHpvbmUgMSBpbiBldmVuaW5nIGlzIG9mZnBlYWsgZXhjZXB0aW9uKVxuLy9PZmZwZWFrIGRhaWx5IGNhcCBkaXNjb3VudHMgLSBrZWVwIHRyYWNrIHdoZW4gZGFpbHkgY2FwIHJlYWNoZWQgYnV0IG9ubHkgdHJhdmVsbGVkIG9mZiBwZWFrIChpZiBnb2luZyB0byBkbyBvZmYgcGVhayBveXN0ZXIgY3VtIHRvdGFscyB0aGVuIHdvdWxkIGtub3cgdGhpcylcbi8vcG9zc2liaWxpdHkgb2YgYWx0ZXJpbmcgb3lzdGVyIHNvIHJlZmxlY3RzIG9mZiBwZWFrIC0tIHRoZW4gY291bGQgYWRkICB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyIGFuZCAxLTggIHpvbmVzIG9yIHRvIDkgd2l0aG91dCB3YXRmb3JkXG4vL0NBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xuZnVuY3Rpb24gZmV0Y2hTdGF0aW9uc0RhdGEoKSB7XG5cdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxuZnVuY3Rpb24gZmV0Y2hKb3VybmV5RGF0YShmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59XG5cbi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuZmV0Y2hTdGF0aW9uc0RhdGEoKS50aGVuKGZ1bmN0aW9uKHN0YXRpb25zKSB7XG5cblx0ZmV0Y2hKb3VybmV5RGF0YSgnMTAwMDAyOScsICcxMDAwMTM4JykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXHRcdC8vIGNvbnNvbGUubG9nKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHQvLyBkZWJ1Z2dlcjtcblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXG5cblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pblpvbmUoZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pblpvbmUoZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhab25lKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5ab25lKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heFpvbmUoW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluWm9uZShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0Ly8gY29uc29sZS5sb2coZmluYWxNYXhab25lKTtcblx0XHQvLyBjb25zb2xlLmxvZyhmaW5hbE1pblpvbmUpO1xuXHR9KTtcbn0pO1xuXG4vLyBGb3JtdWxhdGUgYXJyYXk/IEpvdXJuZXkgMSBvYmplY3Q6IHdpdGggem9uZXMgdHJhdmVsbGVkIChhcnJheTogbWluIGFuZCBtYXgpLCB0aW1lLCBvZmYtcGVhayBvciBvbi1wZWFrLCBzaW5nbGUgcHJpY2UsIGZsYWcgZm9yIGR1YWwgdG8gZHVhbCAoYW5kIHdoYXQgem9uZXMpLlxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBHbG9iYWwgZnVuY3Rpb25zID4gY29tcGFyZU51bWJlcnMgKGNhbiByZWR1Y2UgdG8gdGhlIG1heFpvbmUgYW5kIG1pblpvbmUgb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG5cdHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpIHtcblx0cmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIHRyYXZlbGxpbmcgYmV0d2VlblxuICogQHBhcmFtIHtvYmplY3R9IHNpbmdsZUZhcmVzIC0gbG9va3MgYXQgdGhlIHNpbmdsZUZhcmVzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIGJldHdlZW4gdGhvc2UgdHdvIHpvbmVzXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuXHRyZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XHRcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQHBhcmFtIHthcnJheX0gbWlubWF4VHJhdmVsY2FyZCAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGNvdmVyZWQgem9uZXMsIGluIGFuIGFycmF5XG5cdCAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heEpvdXJuZXkgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgc2luZ2xlIGpvdXJuZXksIGluIGFuIGFycmF5XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZmFyZVxuXHQgKiBAZGVzY3JpcHRpb25cblx0ICovXG5cdFxuXHR2YXIgbWlubWF4VHJhdmVsY2FyZCA9IFszLCA0XTtcblx0dmFyIG1pbm1heEpvdXJuZXkgPSBbMSwgNl07XG5cdFxuXHRmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5KSB7XG5cdFx0dmFyIG1pblRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzBdO1xuXHRcdHZhciBtYXhUcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFsxXTtcblx0XHR2YXIgbWluU2luZ2xlID0gbWlubWF4Sm91cm5leVswXTtcblx0XHR2YXIgbWF4U2luZ2xlID0gbWlubWF4Sm91cm5leVsxXTtcblx0XHR2YXIgam91cm5leUZhcmUgPSBudWxsO1xuXHRcdFxuXHRcdC8vQ09OVEFDVExFU1Mgb25seSB1c2VzIGFkdWx0IGZhcmVzXG5cdFx0Ly9GT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG5cdFx0Ly9GT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2Fwc1xuXHRcdC8vaWYgbWF4IHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWluIHNpbmdsZSBpc250LlxuXHRcdGlmICghKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtaW5UcmF2ZWxjYXJkKTtcblx0XHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlIC0gKHkrMSldO1xuXHRcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudC5cblx0IFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmICEobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdCBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG5cdCBcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlICsgKHkrMSksIG1heFNpbmdsZV07XG5cdCBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0IFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmRcblx0IFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcblx0IFx0XHR2YXIgZmFyZXMgPSBbXTtcblx0IFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWluU2luZ2xlLCBtaW5UcmF2ZWxjYXJkKTtcblx0IFx0XHR2YXIgeCA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcblx0IFx0XHQvLyBwaWNrcyB0aGUgY2hlYXBlc3Q6IHNwbGl0IHNpbmdsZXMgb3IgdGhlIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmQgPT0gc2hvdWxkIGJlIGEgZ2xvYmFsIGZ1bmN0aW9uXG5cdCBcdFx0dmFyIGNvc3QgPSBnZXRTaW5nbGVGYXJlKFttaW5TaW5nbGUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcykgKyBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdFx0ZmFyZXMucHVzaChjb3N0KTtcblx0XHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlXTtcblx0XHRcdGZhcmVzLnB1c2goZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykpO1xuXHRcdFx0am91cm5leUZhcmUgPSBtaW5ab25lKGZhcmVzKVxuXHRcdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcblx0IFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0IFx0XHRqb3VybmV5RmFyZSA9IDA7XG5cdCBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuXHQgXHR9IGVsc2Uge1xuXHQgXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlXTtcblx0IFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHQgXHR9XG5cdCBcdHJldHVybiBqb3VybmV5RmFyZTtcblx0IFx0Y29uc29sZS5sb2coam91cm5leUZhcmUpO1xuXHR9O1xuXHRleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5KTtcbi8vIH0pO1xuXG4vL1NJTkdMRSBGQVJFUyBORUVEIFRPIEJFIEFMVEVSRUQgVE8gT0ZGIFBFQUsgT1IgT04gUEVBSyAmIHByZWZlcmFibHkgYSBjb3VudGVyIG9uIHdoZXRoZXIgYSBjYXAgd2FzIHJlYWNoZWRcbi8vIHdoYXQgYWJvdXQgem9uZSAxIHRvIHpvbmUgMSBleGNlcHRpb24gZm9yIG9mZiBwZWFrPj9cblxuLy8gLSBPWVNURVIgQ2hlYXBlc3QgRmFyZVxuLy8gZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2Fwcztcblx0Ly8gdmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cbi8vQW4gYXJyYXkgb2YgYWxsIHRoZSBqb3VybmV5cyB3aXRoIHRoZWlyIG1heCBhbmQgbWluIHpvbmVzIHRyYXZlbGxlZFxuXHR2YXIgam91cm5leXMgPSBbXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCA0XSxcblx0XHRbMSwgM10sXG5cdF07XG5cbi8vY3VtVG90YWwgPSB0aGUgdG90YWwgdGhhdCB1cGRhdGVzIGFuZCBiZWNvbWVzIHRoZSBmaW5hbCBveXN0ZXIgZmFyZVxuXHR2YXIgb3lDdW1Ub3RhbCA9IG51bGw7XG4vL21heFpvbmVzc29mYXIgZm9yIGVhY2ggam91cm5leSB1cGRhdGVzIGFuZCBpcyB0aGUgYXJyYXkgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdHZhciBtYXhab25lc29mYXIgPSBqb3VybmV5c1swXTtcblxuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHQvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdFx0bWF4Wm9uZXNvZmFyID0gbWF4Wm9uZShqb3VybmV5LmNvbmNhdChtYXhab25lc29mYXIpKTtcblxuXHRcdC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG5cdFx0dmFyIG1heFpvbmVEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKTtcblx0XHR2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFxuXHRcdC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcblx0XHRveUN1bVRvdGFsICs9IHNpbmdsZTtcblxuXHRcdC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuXHRcdGlmIChveUN1bVRvdGFsID49IG1heFpvbmVEYWlseUNhcCkge1xuXHRcdFx0b3lDdW1Ub3RhbCA9IG1heFpvbmVEYWlseUNhcDtcblx0XHR9XG5cdH0pO1xuXHQvL1RoaXMgaXMgdGhlIGZpbmFsIG95c3RlciBkYWlseSBmYXJlIGNhbGN1bGF0ZWQ6XG5cdC8vIGNvbnNvbGUubG9nKG95Q3VtVG90YWwpO1xuXG5cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IFxuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0dmFyIGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHR2YXIgY29uRmFyZXMgPSBudWxsO1xuXHR2YXIgY29uU2luZ2xlID0gbnVsbDtcblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0Y29uU2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFx0Y29uRmFyZXMgKz0gY29uU2luZ2xlO1xuXHR9KTtcblx0Y29uQWxsRmFyZXMucHVzaChjb25GYXJlcyk7XG5cblx0Ly8gXHRUaGVuIGZvciBlYWNoIFpvbmUgcmFuZ2UgKGZyb20gWm9uZSAxLTMgdW50aWwgWm9uZSAxIHRvIG1heCkgcmVwZWF0IHNhbWUgY2FsY3VsYXRpb24uXG5cdCB2YXIgY29uTWF4Wm9uZSA9IG1heFpvbmUoZmxhdHRlbihqb3VybmV5cykpO1xuXHQgZm9yICh2YXIgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG5cdCBcdGNvbnNvbGUubG9nKCdmb3IgZGFpbHkgY2FwIDEgdG8gJyArIGkpO1xuXHQgXHR2YXIgY29uQ3VtVG90YWwgPSBnZXREYWlseUNhcChpLCBkYWlseUNhcHMpO1xuXHQgXHQgZm9yICh2YXIgeCA9IDA7IHggPCBqb3VybmV5cy5sZW5ndGg7IHgrKykge1xuXHQgXHQgXHQvL2FkZGluZyBleHRlbnNpb24gZmFyZXMgdG8gY3VtVG90YWxcblx0IFx0XHRjb25DdW1Ub3RhbCArPSBleHRlbnNpb25GYXJlcyhbMSwgaV0sIGpvdXJuZXlzW3hdKTtcblx0IFx0IH07XG5cdCBcdGNvbnNvbGUubG9nKGNvbkN1bVRvdGFsKTtcblxuXHQgXHRjb25BbGxGYXJlcy5wdXNoKGNvbkN1bVRvdGFsKTtcblx0IH1cblxuXHQvLyBcdC0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLiBcblx0dmFyIGNvbkZpbmFsRmFyZSA9IG51bGw7XG5cdGNvbkZpbmFsRmFyZSA9IG1pblpvbmUoY29uQWxsRmFyZXMpO1xuXHQvLyBjb25zb2xlLmxvZyhjb25GaW5hbEZhcmUpO1xufSk7XG5cbi8vQ09OVEFDVExFU1MgV0VFS0xZIENBUCAtIG1peHR1cmUgIG9mIHdlZWtseSBjYXAgYW5kIGRhaWx5IGNhcFxuXG4vL1RISVMgTUVUSE9EIFJFTElFUyBPTiBUSEUgRkFDVCBUSEFUOlxuLy8tIHpvbmUgeCB0byB4IGZhcmUgaXMgdGhlIHNhbWUgYXMgem9uZSB4LTEgdG8gem9uZSB4IGZhcmVcbi8vLSBJZiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBtaW4gYW5kIG1heCBnYXAgem9uZXMgYXJlID4gMSwgYnJlYWtzIHNpbmNlIGFzc3VtaW5nIGZhcmUgZm9yIHggdG8geCBhbmQgeC0xIHRvIHggYXJlIHRoZSBzYW1lLlxuLy8tIEFzc3VtZXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxIChlbHNlIG5lZWQgbWluIHNpbmdsZSA8IGNhcHBlZCB6b25lIElGcylcblxuLy8gTW9zdCBjb21ib3MgKHdpdGhvdXQgYSBnYXAgYmV0d2VlbiB0aGUgMiB0cmF2ZWxjYXJkcykgLSBleHRlbnNpb24gZmFyZSBhcyBqdXN0IGJldHdlZW46XG4vLy0tLS0+IENPVUxEIEpVU1QgVVBEQVRFIFRIRSBNQVggWk9ORSBBTkQgVVNFIFNBTUUgQ0FMVUxDQVRJT05TIEFTIERBSUxZPz8/IG1pbiB0cmF2ZWwgPSAxXG4vLyAtIG1heGltdW0gem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCArIDEgdG8gbWF4aW11bSBzaW5nbGUgem9uZSAoaWYgbWluIHNpbmdsZSA8PSBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCAmIG1heCBzaW5nbGUgPiBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcClcbi8vIC0gT1IgYm90aCB3aXRoaW4gbWluIGFuZCBtYXhjYXBwZWQgPSBmcmVlXG4vLyAtIEVMU0UganVzdCBib3RoIG91dHNpZGUgY2FwcGVkIHpvbmVzID0gZnVsbCBmYXJlXG5cblxuLy8gSE9XRVZFUiBmb3Igem9uZSA0LTUgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGhhdmUgZ2FwIG9mIHpvbmUgMyBhbmQgNiAvIGZvciB6b25lIDQtNiB3ZWVrbHkgYW5kIDEtMiBkYWlseTogZ2FwIG9mIHpvbmUgMyAvIGlmIHdlZWtseSA1LTYgYW5kIDEtMiBkYWlseTogZ2FwIDMgYW5kIDQgLyB3ZWVrbHkgNS02IGFuZCBkYWlseSAxLTM6IGdhcCB6b25lIDRcbi8vSUYgZGlmZmVyZW5jZSBiZXR3ZWVuIG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxXG4vLyB0aGVuIG1pbiBnYXAgem9uZSA9IG1heCBkYWlseSBjYXAgKzEgJiBtYXggZ2FwIHpvbmUgPSBtaW4gd2Vla2x5IGdhcCAtIDFcblxuLy9JRiBtaW4gc2luZ2xlIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID49IG1heCBnYXAgem9uZSBidXQgbWF4IHNpbmdsZSA8PSBtYXggd2Vla2x5IHpvbmVcbi8vIHRoZW4gY2hhcmdlIG1pbiB0byBtYXggZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSB6b25lIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID4gbWF4IHdlZWx5IHpvbmVcbi8vIHRoZW4gY2hhcmdlIGNoZWFwZXN0OiBmdWxsIGZhcmUgb3IgbWF4IHdlZWtseSArIDEgdG8gbWF4IHNpbmdsZSB6b25lJiAmIGdhcCBmYXJlXG4vL0lGIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSlcbi8vIHRoZW4gY2hhcmdlIHNpbmdsZSBtaW4gdG8gc2luZ2xlIG1heCBmYXJlXG4vL0VMU0UgKElGIGJvdGggbWluIGFuZCBtYXggc2luZ2xlcyB3aXRoaW4gbWluIGFuZCBtYXggZGFpbHkgLyBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IHdlZWtseSlcbi8vIHRoZW4gY2hhcmdlIDBcblxuLy8gUmVtZW1iZXIgY2FsY3VsYXRlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgLSBzaG91bGQgYmUgc2ltaWxhciB0byBkYWlseSBjYWxjdWxhdGlvbnNcblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9