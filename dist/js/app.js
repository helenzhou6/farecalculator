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
/* harmony export (immutable) */ __webpack_exports__["e"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["d"] = minNum;
/* harmony export (immutable) */ __webpack_exports__["f"] = getDifference;
/* harmony export (immutable) */ __webpack_exports__["a"] = flatten;
/* unused harmony export journeyToKey */
/* harmony export (immutable) */ __webpack_exports__["h"] = getDailyCap;
/* harmony export (immutable) */ __webpack_exports__["g"] = getSingleFare;
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
 * filters a nested array based on its length 
 * @function
 * @param {number} num - either 1 (for single zone) or 2 (dual zone)
 * @param {nested array} zones - the nested array of arrays (of zones)
 * @returns {nested array} - nested array of all array of zones from stations that only have one zone associated with it (if num = 1) or...
 * @description - zones refers to global allZones / used to filter the station zones by the number of zones it has (dual zone or single zone)
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
 * @description Associated with minNum and maxNum: where arrayZones refers to zonesFromSingleStations.
 Loops through the array of zones and applies the operator
 */
function compareNumbers(arrayNumbers, operator) {
  return arrayNumbers.reduce(function (a, b) {
    return operator(a, b);
  });
}

function maxNum(arrayZones) {
  return compareNumbers(arrayZones, Math.max);
}

function minNum(arrayZones) {
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(2);




//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey
__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].stations().then(function (stations) {

	__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].journey('1000029', '1000138').then(function (journey) {
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

		//console.log('ALL ZONES:', allZones);

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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxNum */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(zonesFromSingleStations);

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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])([singleMin].concat(dualZones));
		}

		// console.log(finalMaxZone);
		// console.log(finalMinZone);
	});
});

// Formulate array? Journey 1 object: with zones travelled (array: min and max), time, off-peak or on-peak, single price, flag for dual to dual (and what zones).

//--------------------------------------------
// Global functions > compareNumbers (can reduce to the maxNum and minNum of an array) & getDifference bw 2 numbers

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].fares().then(function (fareData) {
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
			journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares);
			//if min single within travelcard zones but max single isnt.
		} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
			var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, maxTravelcard);
			var journey = [minSingle + (y + 1), maxSingle];
			journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares);
			//if min single less than min travelcard and max single more than max travelcard
		} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
			var fares = [];
			var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, minTravelcard);
			var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, maxTravelcard);
			// picks the cheapest: split singles or the full fare without travelcard == should be a global function
			var cost = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])([minSingle, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);
			fares.push(cost);
			var journey = [minSingle, maxSingle];
			fares.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares));
			journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(fares);
			//both single zones within travelcard zones
		} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
			journeyFare = 0;
			//both single zones are outside travelcard zones
		} else {
			var journey = [minSingle, maxSingle];
			journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares);
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
		maxZonesofar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxNum */])(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* getDailyCap */])(maxZonesofar, dailyCaps);
		var single = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares);

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
		conSingle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* getSingleFare */])(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* flatten */])(journeys));
	for (var i = 2; i <= conMaxZone; i++) {
		console.log('for daily cap 1 to ' + i);
		var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* getDailyCap */])(i, dailyCaps);
		for (var x = 0; x < journeys.length; x++) {
			//adding extension fares to cumTotal
			conCumTotal += extensionFares([1, i], journeys[x]);
		};
		console.log(conCumTotal);

		conAllFares.push(conCumTotal);
	}

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(conAllFares);
	// console.log(conFinalFare);
});

//CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap

//THIS METHOD RELIES ON THE FACT THAT:
//- zone x to x fare is the same as zone x-1 to zone x fare
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
//IF min single zone <= min gap zone && max single > max weekly zone
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare
//IF min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
// then charge single min to single max fare
//ELSE (IF both min and max singles within min and max daily / both min and max singles within min and max weekly)
// then charge 0 - should swap with above

// Remember calculate without any daily caps - should be similar to daily calculations

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

// Gets station.json - listing what zones each station is
var fetchStationsData = function () {
	var data = null;

	return function () {
		if (data) {
			console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('/data/stations.json').then(function (resp) {
			data = resp.json();
			return data;
		});
	};
}();

//Fetches the json file from TFL API
var fetchJourneyData = function fetchJourneyData(from, to) {
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to + '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b').then(function (e) {
		return e.json();
	});
};

/* harmony default export */ __webpack_exports__["a"] = {
	fares: fetchFareData,
	stations: fetchStationsData,
	journey: fetchJourneyData
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2ZhZWI5ZGU3ODRjYWNiNDllMWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyJdLCJuYW1lcyI6WyJnZXRab25lcyIsIm5hcFRhbiIsInN0YXRpb25zIiwiem9uZXMiLCJmaWx0ZXJab25lc0J5TnVtYmVyIiwibnVtIiwiZmlsdGVyIiwiem9uZSIsImxlbmd0aCIsImNvbXBhcmVOdW1iZXJzIiwiYXJyYXlOdW1iZXJzIiwib3BlcmF0b3IiLCJyZWR1Y2UiLCJhIiwiYiIsIm1heE51bSIsImFycmF5Wm9uZXMiLCJNYXRoIiwibWF4IiwibWluTnVtIiwibWluIiwiZ2V0RGlmZmVyZW5jZSIsImFicyIsImZsYXR0ZW4iLCJhcnIiLCJjb25jYXQiLCJqb3VybmV5VG9LZXkiLCJqb3VybmV5Iiwic29ydCIsImpvaW4iLCJnZXREYWlseUNhcCIsIm1heFpvbmVzb2ZhciIsImRhaWx5Q2FwcyIsImdldFNpbmdsZUZhcmUiLCJzaW5nbGVGYXJlcyIsImdldERhdGEiLCJ0aGVuIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJtYXAiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6IiwiZmFyZXMiLCJmYXJlRGF0YSIsIm1pbm1heFRyYXZlbGNhcmQiLCJtaW5tYXhKb3VybmV5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsImpvdXJuZXlGYXJlIiwieSIsIngiLCJjb3N0IiwiY29uc29sZSIsImxvZyIsIm95Q3VtVG90YWwiLCJtYXhab25lRGFpbHlDYXAiLCJzaW5nbGUiLCJjb25BbGxGYXJlcyIsImNvbkZhcmVzIiwiY29uU2luZ2xlIiwiY29uTWF4Wm9uZSIsImkiLCJjb25DdW1Ub3RhbCIsImNvbkZpbmFsRmFyZSIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FB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QU1BLHdEQUFlO0FBQ2QvQixRQUFPeUIsYUFETztBQUVkbEYsV0FBVXlGLGlCQUZJO0FBR2RoRSxVQUFTaUU7QUFISyxDQUFmLEMiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNmYWViOWRlNzg0Y2FjYjQ5ZTFlIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcykge1xuICByZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuICByZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsImltcG9ydCB7XG5cdGdldFpvbmVzLCBcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGdldERpZmZlcmVuY2UsXG5cdGZsYXR0ZW4sXG5cdGpvdXJuZXlUb0tleSxcblx0Z2V0RGFpbHlDYXAsXG5cdGdldFNpbmdsZUZhcmVcbn0gZnJvbSAnLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi91dGlsaXR5L19nZXREYXRhJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcbmdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHN0YXRpb25zKSB7XG5cblx0Z2V0RGF0YS5qb3VybmV5KCcxMDAwMDI5JywgJzEwMDAxMzgnKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cdFx0Ly9jb25zb2xlLmxvZygnQUxMIFpPTkVTOicsIGFsbFpvbmVzKTtcblxuXHRcdC8vIGNvbnNvbGUubG9nKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHQvLyBkZWJ1Z2dlcjtcblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXG5cblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0Ly8gY29uc29sZS5sb2coZmluYWxNYXhab25lKTtcblx0XHQvLyBjb25zb2xlLmxvZyhmaW5hbE1pblpvbmUpO1xuXHR9KTtcbn0pO1xuXG4vLyBGb3JtdWxhdGUgYXJyYXk/IEpvdXJuZXkgMSBvYmplY3Q6IHdpdGggem9uZXMgdHJhdmVsbGVkIChhcnJheTogbWluIGFuZCBtYXgpLCB0aW1lLCBvZmYtcGVhayBvciBvbi1wZWFrLCBzaW5nbGUgcHJpY2UsIGZsYWcgZm9yIGR1YWwgdG8gZHVhbCAoYW5kIHdoYXQgem9uZXMpLlxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBHbG9iYWwgZnVuY3Rpb25zID4gY29tcGFyZU51bWJlcnMgKGNhbiByZWR1Y2UgdG8gdGhlIG1heE51bSBhbmQgbWluTnVtIG9mIGFuIGFycmF5KSAmIGdldERpZmZlcmVuY2UgYncgMiBudW1iZXJzXG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG5cdHZhciBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1x0XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heFRyYXZlbGNhcmQgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjb3ZlcmVkIHpvbmVzLCBpbiBhbiBhcnJheVxuXHQgKiBAcGFyYW0ge2FycmF5fSBtaW5tYXhKb3VybmV5IC0gdGhlIG1pbiBhbmQgbWF4IHpvbmUgb2YgdGhlIHNpbmdsZSBqb3VybmV5LCBpbiBhbiBhcnJheVxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGZhcmVcblx0ICogQGRlc2NyaXB0aW9uXG5cdCAqL1xuXHRcblx0dmFyIG1pbm1heFRyYXZlbGNhcmQgPSBbMywgNF07XG5cdHZhciBtaW5tYXhKb3VybmV5ID0gWzEsIDZdO1xuXHRcblx0ZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMobWlubWF4VHJhdmVsY2FyZCwgbWlubWF4Sm91cm5leSkge1xuXHRcdHZhciBtaW5UcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFswXTtcblx0XHR2YXIgbWF4VHJhdmVsY2FyZCA9IG1pbm1heFRyYXZlbGNhcmRbMV07XG5cdFx0dmFyIG1pblNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMF07XG5cdFx0dmFyIG1heFNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMV07XG5cdFx0dmFyIGpvdXJuZXlGYXJlID0gbnVsbDtcblx0XHRcblx0XHQvL0NPTlRBQ1RMRVNTIG9ubHkgdXNlcyBhZHVsdCBmYXJlc1xuXHRcdC8vRk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuXHRcdC8vRk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHNcblx0XHQvL2lmIG1heCBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1pbiBzaW5nbGUgaXNudC5cblx0XHRpZiAoIShtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1heFNpbmdsZSwgbWluVHJhdmVsY2FyZCk7XG5cdFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZSAtICh5KzEpXTtcblx0XHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQuXG5cdCBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAhKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHQgXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtaW5TaW5nbGUsIG1heFRyYXZlbGNhcmQpO1xuXHQgXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSArICh5KzEpLCBtYXhTaW5nbGVdO1xuXHQgXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdCBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkXG5cdCBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG5cdCBcdFx0dmFyIGZhcmVzID0gW107XG5cdCBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWluVHJhdmVsY2FyZCk7XG5cdCBcdFx0dmFyIHggPSBnZXREaWZmZXJlbmNlKG1heFNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG5cdCBcdFx0Ly8gcGlja3MgdGhlIGNoZWFwZXN0OiBzcGxpdCBzaW5nbGVzIG9yIHRoZSBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkID09IHNob3VsZCBiZSBhIGdsb2JhbCBmdW5jdGlvblxuXHQgXHRcdHZhciBjb3N0ID0gZ2V0U2luZ2xlRmFyZShbbWluU2luZ2xlLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgc2luZ2xlRmFyZXMpICsgZ2V0U2luZ2xlRmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuXHQgXHRcdGZhcmVzLnB1c2goY29zdCk7XG5cdFx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZV07XG5cdFx0XHRmYXJlcy5wdXNoKGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpKTtcblx0XHRcdGpvdXJuZXlGYXJlID0gbWluTnVtKGZhcmVzKVxuXHRcdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcblx0IFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0IFx0XHRqb3VybmV5RmFyZSA9IDA7XG5cdCBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuXHQgXHR9IGVsc2Uge1xuXHQgXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlXTtcblx0IFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHQgXHR9XG5cdCBcdHJldHVybiBqb3VybmV5RmFyZTtcblx0IFx0Y29uc29sZS5sb2coam91cm5leUZhcmUpO1xuXHR9O1xuXHRleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5KTtcbi8vIH0pO1xuXG4vL1NJTkdMRSBGQVJFUyBORUVEIFRPIEJFIEFMVEVSRUQgVE8gT0ZGIFBFQUsgT1IgT04gUEVBSyAmIHByZWZlcmFibHkgYSBjb3VudGVyIG9uIHdoZXRoZXIgYSBjYXAgd2FzIHJlYWNoZWRcbi8vIHdoYXQgYWJvdXQgem9uZSAxIHRvIHpvbmUgMSBleGNlcHRpb24gZm9yIG9mZiBwZWFrPj9cblxuLy8gLSBPWVNURVIgQ2hlYXBlc3QgRmFyZVxuLy8gZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2Fwcztcblx0Ly8gdmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cbi8vQW4gYXJyYXkgb2YgYWxsIHRoZSBqb3VybmV5cyB3aXRoIHRoZWlyIG1heCBhbmQgbWluIHpvbmVzIHRyYXZlbGxlZFxuXHR2YXIgam91cm5leXMgPSBbXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCA0XSxcblx0XHRbMSwgM10sXG5cdF07XG5cbi8vY3VtVG90YWwgPSB0aGUgdG90YWwgdGhhdCB1cGRhdGVzIGFuZCBiZWNvbWVzIHRoZSBmaW5hbCBveXN0ZXIgZmFyZVxuXHR2YXIgb3lDdW1Ub3RhbCA9IG51bGw7XG4vL21heFpvbmVzc29mYXIgZm9yIGVhY2ggam91cm5leSB1cGRhdGVzIGFuZCBpcyB0aGUgYXJyYXkgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdHZhciBtYXhab25lc29mYXIgPSBqb3VybmV5c1swXTtcblxuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHQvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdFx0bWF4Wm9uZXNvZmFyID0gbWF4TnVtKGpvdXJuZXkuY29uY2F0KG1heFpvbmVzb2ZhcikpO1xuXG5cdFx0Ly9HZXRzIHRoZSByZWxldmFudCBkYWlseSBjYXAgdG8gdGhhdCBtYXggem9uZSAmIHNpbmdsZSBmYXJlIGZvciB0aGF0IGpvdXJuZXlcblx0XHR2YXIgbWF4Wm9uZURhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpO1xuXHRcdHZhciBzaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XG5cdFx0Ly9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuXHRcdG95Q3VtVG90YWwgKz0gc2luZ2xlO1xuXG5cdFx0Ly9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG5cdFx0aWYgKG95Q3VtVG90YWwgPj0gbWF4Wm9uZURhaWx5Q2FwKSB7XG5cdFx0XHRveUN1bVRvdGFsID0gbWF4Wm9uZURhaWx5Q2FwO1xuXHRcdH1cblx0fSk7XG5cdC8vVGhpcyBpcyB0aGUgZmluYWwgb3lzdGVyIGRhaWx5IGZhcmUgY2FsY3VsYXRlZDpcblx0Ly8gY29uc29sZS5sb2cob3lDdW1Ub3RhbCk7XG5cblxuLy8gLSBDT05UQUNUTEVTUyBDaGVhcGVzdCBGYXJlID0gXG5cdC8vVGhlIGFycmF5IG9mIGFsbCBjb21iaW5hdGlvbiBwcmljZXMgdG8gYmUgcmVkdWNlIHRvIGNoZWFwZXN0IG9uZVxuXHR2YXIgY29uQWxsRmFyZXMgPSBbXTtcblxuXHQvLyBmb3Igd2l0aG91dCBhbnkgZGFpbHkgY2Fwcywgb25seSBzaW5nbGVzIGFkZGVkIHRvZ2V0aGVyXG5cdHZhciBjb25GYXJlcyA9IG51bGw7XG5cdHZhciBjb25TaW5nbGUgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHRjb25TaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XHRjb25GYXJlcyArPSBjb25TaW5nbGU7XG5cdH0pO1xuXHRjb25BbGxGYXJlcy5wdXNoKGNvbkZhcmVzKTtcblxuXHQvLyBcdFRoZW4gZm9yIGVhY2ggWm9uZSByYW5nZSAoZnJvbSBab25lIDEtMyB1bnRpbCBab25lIDEgdG8gbWF4KSByZXBlYXQgc2FtZSBjYWxjdWxhdGlvbi5cblx0IHZhciBjb25NYXhab25lID0gbWF4TnVtKGZsYXR0ZW4oam91cm5leXMpKTtcblx0IGZvciAodmFyIGkgPSAyOyBpIDw9IGNvbk1heFpvbmU7IGkrKykge1xuXHQgXHRjb25zb2xlLmxvZygnZm9yIGRhaWx5IGNhcCAxIHRvICcgKyBpKTtcblx0IFx0dmFyIGNvbkN1bVRvdGFsID0gZ2V0RGFpbHlDYXAoaSwgZGFpbHlDYXBzKTtcblx0IFx0IGZvciAodmFyIHggPSAwOyB4IDwgam91cm5leXMubGVuZ3RoOyB4KyspIHtcblx0IFx0IFx0Ly9hZGRpbmcgZXh0ZW5zaW9uIGZhcmVzIHRvIGN1bVRvdGFsXG5cdCBcdFx0Y29uQ3VtVG90YWwgKz0gZXh0ZW5zaW9uRmFyZXMoWzEsIGldLCBqb3VybmV5c1t4XSk7XG5cdCBcdCB9O1xuXHQgXHRjb25zb2xlLmxvZyhjb25DdW1Ub3RhbCk7XG5cblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS4gXG5cdHZhciBjb25GaW5hbEZhcmUgPSBudWxsO1xuXHRjb25GaW5hbEZhcmUgPSBtaW5OdW0oY29uQWxsRmFyZXMpO1xuXHQvLyBjb25zb2xlLmxvZyhjb25GaW5hbEZhcmUpO1xufSk7XG5cbi8vQ09OVEFDVExFU1MgV0VFS0xZIENBUCAtIG1peHR1cmUgIG9mIHdlZWtseSBjYXAgYW5kIGRhaWx5IGNhcFxuXG4vL1RISVMgTUVUSE9EIFJFTElFUyBPTiBUSEUgRkFDVCBUSEFUOlxuLy8tIHpvbmUgeCB0byB4IGZhcmUgaXMgdGhlIHNhbWUgYXMgem9uZSB4LTEgdG8gem9uZSB4IGZhcmVcbi8vLSBBc3N1bWVzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMSAoZWxzZSBuZWVkIG1pbiBzaW5nbGUgPCBjYXBwZWQgem9uZSBJRnMpXG5cbi8vIE1vc3QgY29tYm9zICh3aXRob3V0IGEgZ2FwIGJldHdlZW4gdGhlIDIgdHJhdmVsY2FyZHMpIC0gZXh0ZW5zaW9uIGZhcmUgYXMganVzdCBiZXR3ZWVuOlxuLy8tLS0tPiBDT1VMRCBKVVNUIFVQREFURSBUSEUgTUFYIFpPTkUgQU5EIFVTRSBTQU1FIENBTFVMQ0FUSU9OUyBBUyBEQUlMWT8/PyBtaW4gdHJhdmVsID0gMVxuLy8gLSBtYXhpbXVtIHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgKyAxIHRvIG1heGltdW0gc2luZ2xlIHpvbmUgKGlmIG1pbiBzaW5nbGUgPD0gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgJiBtYXggc2luZ2xlID4gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXApXG4vLyAtIE9SIGJvdGggd2l0aGluIG1pbiBhbmQgbWF4Y2FwcGVkID0gZnJlZVxuLy8gLSBFTFNFIGp1c3QgYm90aCBvdXRzaWRlIGNhcHBlZCB6b25lcyA9IGZ1bGwgZmFyZVxuXG5cbi8vIEhPV0VWRVIgZm9yIHpvbmUgNC01IHdlZWtseSBhbmQgMS0yIGRhaWx5OiBoYXZlIGdhcCBvZiB6b25lIDMgYW5kIDYgLyBmb3Igem9uZSA0LTYgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGdhcCBvZiB6b25lIDMgLyBpZiB3ZWVrbHkgNS02IGFuZCAxLTIgZGFpbHk6IGdhcCAzIGFuZCA0IC8gd2Vla2x5IDUtNiBhbmQgZGFpbHkgMS0zOiBnYXAgem9uZSA0XG4vL0lGIGRpZmZlcmVuY2UgYmV0d2VlbiBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMVxuLy8gdGhlbiBtaW4gZ2FwIHpvbmUgPSBtYXggZGFpbHkgY2FwICsxICYgbWF4IGdhcCB6b25lID0gbWluIHdlZWtseSBnYXAgLSAxXG5cbi8vSUYgbWluIHNpbmdsZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+PSBtYXggZ2FwIHpvbmUgYnV0IG1heCBzaW5nbGUgPD0gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBtaW4gdG8gbWF4IGdhcCBmYXJlXG4vL0lGIG1pbiBzaW5nbGUgem9uZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+IG1heCB3ZWVrbHkgem9uZVxuLy8gdGhlbiBjaGFyZ2UgY2hlYXBlc3Q6IGZ1bGwgZmFyZSBvciBtYXggd2Vla2x5ICsgMSB0byBtYXggc2luZ2xlIHpvbmUmICYgZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG4vLyB0aGVuIGNoYXJnZSBzaW5nbGUgbWluIHRvIHNpbmdsZSBtYXggZmFyZVxuLy9FTFNFIChJRiBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IGRhaWx5IC8gYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCB3ZWVrbHkpXG4vLyB0aGVuIGNoYXJnZSAwIC0gc2hvdWxkIHN3YXAgd2l0aCBhYm92ZVxuXG4vLyBSZW1lbWJlciBjYWxjdWxhdGUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyAtIHNob3VsZCBiZSBzaW1pbGFyIHRvIGRhaWx5IGNhbGN1bGF0aW9uc1xuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyJdLCJzb3VyY2VSb290IjoiIn0=