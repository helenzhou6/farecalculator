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
/* harmony export (immutable) */ __webpack_exports__["g"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["h"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["a"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* harmony export (immutable) */ __webpack_exports__["f"] = getDifference;
/* harmony export (immutable) */ __webpack_exports__["d"] = flatten;
/* unused harmony export journeyToKey */
/* harmony export (immutable) */ __webpack_exports__["b"] = getDailyCap;
/* harmony export (immutable) */ __webpack_exports__["c"] = getSingleFare;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(4);






//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].stations().then(function (stations) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__["a" /* default */])('1000029', '1000138', stations).then(function (resp) {
		console.log(resp);
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
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(minmaxTravelcard, minmaxJourney, singleFares);

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
		maxZonesofar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(maxZonesofar, dailyCaps);
		var single = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

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
		conSingle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* flatten */])(journeys));
	for (var i = 2; i <= conMaxZone; i++) {
		console.log('for daily cap 1 to ' + i);
		var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(i, dailyCaps);
		for (var x = 0; x < journeys.length; x++) {
			//adding extension fares to cumTotal
			conCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])([1, i], journeys[x], singleFares);
		};
		console.log(conCumTotal);

		conAllFares.push(conCumTotal);
	}

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(conAllFares);
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_utility__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = getSingleJourneyZones;
//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey




function getSingleJourneyZones(from, to, stations) {
	return __WEBPACK_IMPORTED_MODULE_0__utility_getData__["a" /* default */].journey(from, to).then(function (journey) {
		var journey = journey.journeys[0]; // selecting only the first journey from the API
		var legs = journey.legs; //To look at each leg of the journey

		// The array of zones associated with all stations of that journey
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(zonesFromSingleStations);

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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])([singleMin].concat(dualZones));
		}

		return {
			max: {
				zones: finalMaxZone
			},
			min: {
				zones: finalMinZone
			}
		};
	});
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFares;


function extensionFares(minmaxTravelcard, minmaxJourney, singleFares) {
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
		journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

		//if min single within travelcard zones but max single isnt.
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
		var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, maxTravelcard);
		var journey = [minSingle + (y + 1), maxSingle];
		journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

		//if min single less than min travelcard and max single more than max travelcard
	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
		var fares = [];
		var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, minTravelcard);
		var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, maxTravelcard);
		// picks the cheapest: split singles or the full fare without travelcard == should be a global function
		var cost = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);
		fares.push(cost);
		var journey = [minSingle, maxSingle];
		fares.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares));
		journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(fares);
		//both single zones within travelcard zones
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
		journeyFare = 0;
		//both single zones are outside travelcard zones
	} else {
		var journey = [minSingle, maxSingle];
		journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);
	}
	return journeyFare;
	//console.log(journeyFare);
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ4ZGM3MzRjNGQ3YWVjZTJjMDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsImdldERhaWx5Q2FwIiwibWF4Wm9uZXNvZmFyIiwiZGFpbHlDYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwiZ2V0RGF0YSIsInRoZW4iLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJyZXNwIiwiY29uc29sZSIsImxvZyIsImZhcmVzIiwiZmFyZURhdGEiLCJtaW5tYXhUcmF2ZWxjYXJkIiwibWlubWF4Sm91cm5leSIsImV4dGVuc2lvbkZhcmVzIiwiam91cm5leXMiLCJveUN1bVRvdGFsIiwiZm9yRWFjaCIsIm1heFpvbmVEYWlseUNhcCIsInNpbmdsZSIsImNvbkFsbEZhcmVzIiwiY29uRmFyZXMiLCJjb25TaW5nbGUiLCJwdXNoIiwiY29uTWF4Wm9uZSIsImkiLCJjb25DdW1Ub3RhbCIsIngiLCJjb25GaW5hbEZhcmUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImxlZ3MiLCJhbGxab25lcyIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwYXRoIiwic3RvcFBvaW50cyIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6IiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJqb3VybmV5RmFyZSIsInkiLCJjb3N0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUFBOzs7Ozs7OztBQVFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFv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QUFhRixnQkFBZ0IsQ0FBN0IsQ0FBZCxFQUFnRHhELFdBQWhELElBQStELDhGQUFBRCxDQUFjLENBQUUwRCxnQkFBZ0IsQ0FBbEIsRUFBc0JFLFNBQXRCLENBQWQsRUFBZ0QzRCxXQUFoRCxDQUExRTtBQUNBTyxRQUFNYSxJQUFOLENBQVcwQyxJQUFYO0FBQ0QsTUFBSXJFLFVBQVUsQ0FBQ2lFLFNBQUQsRUFBWUMsU0FBWixDQUFkO0FBQ0FwRCxRQUFNYSxJQUFOLENBQVcsOEZBQUFyQixDQUFjTixPQUFkLEVBQXVCTyxXQUF2QixDQUFYO0FBQ0E0RCxnQkFBYyx1RkFBQTNFLENBQU9zQixLQUFQLENBQWQ7QUFDRDtBQUNFLEVBWE0sTUFXQSxJQUFLaUQsaUJBQWlCRSxTQUFqQixJQUE4QkEsYUFBYUQsYUFBNUMsSUFBK0RELGlCQUFpQkcsU0FBakIsSUFBOEJBLGFBQWFGLGFBQTlHLEVBQThIO0FBQ3BJRyxnQkFBYyxDQUFkO0FBQ0Q7QUFDQyxFQUhNLE1BR0E7QUFDTixNQUFJbkUsVUFBVSxDQUFDaUUsU0FBRCxFQUFZQyxTQUFaLENBQWQ7QUFDQUMsZ0JBQWMsOEZBQUE3RCxDQUFjTixPQUFkLEVBQXVCTyxXQUF2QixDQUFkO0FBQ0E7QUFDRCxRQUFPNEQsV0FBUDtBQUNBO0FBQ0QsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDQ4ZGM3MzRjNGQ3YWVjZTJjMDciLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKSB7XG4gIHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2luZ2xlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyB0cmF2ZWxsaW5nIGJldHdlZW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzaW5nbGVGYXJlcyAtIGxvb2tzIGF0IHRoZSBzaW5nbGVGYXJlcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSBiZXR3ZWVuIHRob3NlIHR3byB6b25lc1xuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSB7XG4gIHJldHVybiBzaW5nbGVGYXJlc1tqb3VybmV5VG9LZXkoam91cm5leSldO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiaW1wb3J0IHtcblx0Z2V0Wm9uZXMsIFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0Z2V0RGlmZmVyZW5jZSxcblx0ZmxhdHRlbixcblx0am91cm5leVRvS2V5LFxuXHRnZXREYWlseUNhcCxcblx0Z2V0U2luZ2xlRmFyZVxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG5nZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG5cdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4TnVtIGFuZCBtaW5OdW0gb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XHRcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQHBhcmFtIHthcnJheX0gbWlubWF4VHJhdmVsY2FyZCAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGNvdmVyZWQgem9uZXMsIGluIGFuIGFycmF5XG5cdCAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heEpvdXJuZXkgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgc2luZ2xlIGpvdXJuZXksIGluIGFuIGFycmF5XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZmFyZVxuXHQgKiBAZGVzY3JpcHRpb25cblx0ICovXG5cdFxuXHR2YXIgbWlubWF4VHJhdmVsY2FyZCA9IFszLCA0XTtcblx0dmFyIG1pbm1heEpvdXJuZXkgPSBbMSwgNl07XG5cdGV4dGVuc2lvbkZhcmVzKG1pbm1heFRyYXZlbGNhcmQsIG1pbm1heEpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblxuLy9TSU5HTEUgRkFSRVMgTkVFRCBUTyBCRSBBTFRFUkVEIFRPIE9GRiBQRUFLIE9SIE9OIFBFQUsgJiBwcmVmZXJhYmx5IGEgY291bnRlciBvbiB3aGV0aGVyIGEgY2FwIHdhcyByZWFjaGVkXG4vLyB3aGF0IGFib3V0IHpvbmUgMSB0byB6b25lIDEgZXhjZXB0aW9uIGZvciBvZmYgcGVhaz4/XG5cbi8vIC0gT1lTVEVSIENoZWFwZXN0IEZhcmVcbi8vIGZldGNoRmFyZURhdGEoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG5cdHZhciBkYWlseUNhcHMgPSBmYXJlRGF0YS5kYWlseUNhcHM7XG5cdC8vIHZhciBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuXG4vL0FuIGFycmF5IG9mIGFsbCB0aGUgam91cm5leXMgd2l0aCB0aGVpciBtYXggYW5kIG1pbiB6b25lcyB0cmF2ZWxsZWRcblx0dmFyIGpvdXJuZXlzID0gW1xuXHRcdFsyLCAxXSxcblx0XHRbMSwgMl0sXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgNF0sXG5cdFx0WzEsIDNdLFxuXHRdO1xuXG4vL2N1bVRvdGFsID0gdGhlIHRvdGFsIHRoYXQgdXBkYXRlcyBhbmQgYmVjb21lcyB0aGUgZmluYWwgb3lzdGVyIGZhcmVcblx0dmFyIG95Q3VtVG90YWwgPSBudWxsO1xuLy9tYXhab25lc3NvZmFyIGZvciBlYWNoIGpvdXJuZXkgdXBkYXRlcyBhbmQgaXMgdGhlIGFycmF5IG9mIGFsbCB0aGUgem9uZXMgdHJhdmVsbGVkIGluIHNvIGZhclxuXHR2YXIgbWF4Wm9uZXNvZmFyID0gam91cm5leXNbMF07XG5cblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0Ly9HZXRzIHRoZSBtYXhpbXVtIHpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdHJhdmVsbGVkIGluIHNvIGZhclxuXHRcdG1heFpvbmVzb2ZhciA9IG1heE51bShqb3VybmV5LmNvbmNhdChtYXhab25lc29mYXIpKTtcblxuXHRcdC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG5cdFx0dmFyIG1heFpvbmVEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKTtcblx0XHR2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFxuXHRcdC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcblx0XHRveUN1bVRvdGFsICs9IHNpbmdsZTtcblxuXHRcdC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuXHRcdGlmIChveUN1bVRvdGFsID49IG1heFpvbmVEYWlseUNhcCkge1xuXHRcdFx0b3lDdW1Ub3RhbCA9IG1heFpvbmVEYWlseUNhcDtcblx0XHR9XG5cdH0pO1xuXHQvL1RoaXMgaXMgdGhlIGZpbmFsIG95c3RlciBkYWlseSBmYXJlIGNhbGN1bGF0ZWQ6XG5cdC8vIGNvbnNvbGUubG9nKG95Q3VtVG90YWwpO1xuXG5cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IFxuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0dmFyIGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHR2YXIgY29uRmFyZXMgPSBudWxsO1xuXHR2YXIgY29uU2luZ2xlID0gbnVsbDtcblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0Y29uU2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFx0Y29uRmFyZXMgKz0gY29uU2luZ2xlO1xuXHR9KTtcblx0Y29uQWxsRmFyZXMucHVzaChjb25GYXJlcyk7XG5cblx0Ly8gXHRUaGVuIGZvciBlYWNoIFpvbmUgcmFuZ2UgKGZyb20gWm9uZSAxLTMgdW50aWwgWm9uZSAxIHRvIG1heCkgcmVwZWF0IHNhbWUgY2FsY3VsYXRpb24uXG5cdCB2YXIgY29uTWF4Wm9uZSA9IG1heE51bShmbGF0dGVuKGpvdXJuZXlzKSk7XG5cdCBmb3IgKHZhciBpID0gMjsgaSA8PSBjb25NYXhab25lOyBpKyspIHtcblx0IFx0Y29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG5cdCBcdHZhciBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG5cdCBcdCBmb3IgKHZhciB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG5cdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKFsxLCBpXSwgam91cm5leXNbeF0sIHNpbmdsZUZhcmVzKTtcblx0IFx0IH07XG5cdCBcdGNvbnNvbGUubG9nKGNvbkN1bVRvdGFsKTtcblxuXHQgXHRjb25BbGxGYXJlcy5wdXNoKGNvbkN1bVRvdGFsKTtcblx0IH1cblxuXHQvLyBcdC0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLiBcblx0dmFyIGNvbkZpbmFsRmFyZSA9IG51bGw7XG5cdGNvbkZpbmFsRmFyZSA9IG1pbk51bShjb25BbGxGYXJlcyk7XG5cdC8vIGNvbnNvbGUubG9nKGNvbkZpbmFsRmFyZSk7XG59KTtcblxuLy9DT05UQUNUTEVTUyBXRUVLTFkgQ0FQIC0gbWl4dHVyZSAgb2Ygd2Vla2x5IGNhcCBhbmQgZGFpbHkgY2FwXG5cbi8vVEhJUyBNRVRIT0QgUkVMSUVTIE9OIFRIRSBGQUNUIFRIQVQ6XG4vLy0gem9uZSB4IHRvIHggZmFyZSBpcyB0aGUgc2FtZSBhcyB6b25lIHgtMSB0byB6b25lIHggZmFyZVxuLy8tIEFzc3VtZXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxIChlbHNlIG5lZWQgbWluIHNpbmdsZSA8IGNhcHBlZCB6b25lIElGcylcblxuLy8gTW9zdCBjb21ib3MgKHdpdGhvdXQgYSBnYXAgYmV0d2VlbiB0aGUgMiB0cmF2ZWxjYXJkcykgLSBleHRlbnNpb24gZmFyZSBhcyBqdXN0IGJldHdlZW46XG4vLy0tLS0+IENPVUxEIEpVU1QgVVBEQVRFIFRIRSBNQVggWk9ORSBBTkQgVVNFIFNBTUUgQ0FMVUxDQVRJT05TIEFTIERBSUxZPz8/IG1pbiB0cmF2ZWwgPSAxXG4vLyAtIG1heGltdW0gem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCArIDEgdG8gbWF4aW11bSBzaW5nbGUgem9uZSAoaWYgbWluIHNpbmdsZSA8PSBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCAmIG1heCBzaW5nbGUgPiBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcClcbi8vIC0gT1IgYm90aCB3aXRoaW4gbWluIGFuZCBtYXhjYXBwZWQgPSBmcmVlXG4vLyAtIEVMU0UganVzdCBib3RoIG91dHNpZGUgY2FwcGVkIHpvbmVzID0gZnVsbCBmYXJlXG5cblxuLy8gSE9XRVZFUiBmb3Igem9uZSA0LTUgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGhhdmUgZ2FwIG9mIHpvbmUgMyBhbmQgNiAvIGZvciB6b25lIDQtNiB3ZWVrbHkgYW5kIDEtMiBkYWlseTogZ2FwIG9mIHpvbmUgMyAvIGlmIHdlZWtseSA1LTYgYW5kIDEtMiBkYWlseTogZ2FwIDMgYW5kIDQgLyB3ZWVrbHkgNS02IGFuZCBkYWlseSAxLTM6IGdhcCB6b25lIDRcbi8vSUYgZGlmZmVyZW5jZSBiZXR3ZWVuIG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxXG4vLyB0aGVuIG1pbiBnYXAgem9uZSA9IG1heCBkYWlseSBjYXAgKzEgJiBtYXggZ2FwIHpvbmUgPSBtaW4gd2Vla2x5IGdhcCAtIDFcblxuLy9JRiBtaW4gc2luZ2xlIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID49IG1heCBnYXAgem9uZSBidXQgbWF4IHNpbmdsZSA8PSBtYXggd2Vla2x5IHpvbmVcbi8vIHRoZW4gY2hhcmdlIG1pbiB0byBtYXggZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSB6b25lIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID4gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBjaGVhcGVzdDogZnVsbCBmYXJlIG9yIG1heCB3ZWVrbHkgKyAxIHRvIG1heCBzaW5nbGUgem9uZSYgJiBnYXAgZmFyZVxuLy9JRiBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbi8vIHRoZW4gY2hhcmdlIHNpbmdsZSBtaW4gdG8gc2luZ2xlIG1heCBmYXJlXG4vL0VMU0UgKElGIGJvdGggbWluIGFuZCBtYXggc2luZ2xlcyB3aXRoaW4gbWluIGFuZCBtYXggZGFpbHkgLyBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IHdlZWtseSlcbi8vIHRoZW4gY2hhcmdlIDAgLSBzaG91bGQgc3dhcCB3aXRoIGFib3ZlXG5cbi8vIFJlbWVtYmVyIGNhbGN1bGF0ZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIC0gc2hvdWxkIGJlIHNpbWlsYXIgdG8gZGFpbHkgY2FsY3VsYXRpb25zXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bWF4OiB7XG5cdFx0XHRcdHpvbmVzOiBmaW5hbE1heFpvbmUsXG5cdFx0XHR9LFxuXHRcdFx0bWluOiB7XG5cdFx0XHRcdHpvbmVzOiBmaW5hbE1pblpvbmUsXG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJpbXBvcnQge1xuXHRnZXREaWZmZXJlbmNlLFxuXHRnZXRTaW5nbGVGYXJlLFxuXHQvLyBnZXRab25lcyxcblx0Ly8gZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHQvLyBtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG1pbm1heFRyYXZlbGNhcmQsIG1pbm1heEpvdXJuZXksIHNpbmdsZUZhcmVzKSB7XG5cdHZhciBtaW5UcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFswXTtcblx0dmFyIG1heFRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzFdO1xuXHR2YXIgbWluU2luZ2xlID0gbWlubWF4Sm91cm5leVswXTtcblx0dmFyIG1heFNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMV07XG5cdHZhciBqb3VybmV5RmFyZSA9IG51bGw7XG5cblx0XG5cblx0XG5cdC8vQ09OVEFDVExFU1Mgb25seSB1c2VzIGFkdWx0IGZhcmVzXG5cdC8vRk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuXHQvL0ZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzXG5cdC8vaWYgbWF4IHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWluIHNpbmdsZSBpc250LlxuXHRpZiAoIShtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlIC0gKHkrMSldO1xuXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQuXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgIShtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG4gXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSArICh5KzEpLCBtYXhTaW5nbGVdO1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0dmFyIGZhcmVzID0gW107XG4gXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtaW5TaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuIFx0XHR2YXIgeCA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcbiBcdFx0Ly8gcGlja3MgdGhlIGNoZWFwZXN0OiBzcGxpdCBzaW5nbGVzIG9yIHRoZSBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkID09IHNob3VsZCBiZSBhIGdsb2JhbCBmdW5jdGlvblxuIFx0XHR2YXIgY29zdCA9IGdldFNpbmdsZUZhcmUoW21pblNpbmdsZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcbiBcdFx0ZmFyZXMucHVzaChjb3N0KTtcblx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZV07XG5cdFx0ZmFyZXMucHVzaChnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSk7XG5cdFx0am91cm5leUZhcmUgPSBtaW5OdW0oZmFyZXMpXG5cdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gMDtcbiBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIHtcbiBcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlLCBtYXhTaW5nbGVdO1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuIFx0fVxuIFx0cmV0dXJuIGpvdXJuZXlGYXJlO1xuIFx0Ly9jb25zb2xlLmxvZyhqb3VybmV5RmFyZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiXSwic291cmNlUm9vdCI6IiJ9