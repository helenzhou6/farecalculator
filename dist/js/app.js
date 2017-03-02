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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["i"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["c"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["b"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["g"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["d"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return met; });
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
  debugger;
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
 * Preloads start zone as 1 and changes to 1-x for JSON file reading
 * @function
 * @param {number} - zone x
 * @returns {string} - '1-x'
 * @description - used to get the fares from the json file
 */
function zoneToJourney(zone) {
  // debugger;
  return journeyToKey([1, zone]);
}

function keyToJourney(key) {
  return key.split('-').sort().map(function (num) {
    return parseInt(num);
  });
}

function keysToJourney(weeklyCaps) {
  return Object.keys(weeklyCaps).map(function (cap) {
    return keyToJourney(cap);
  });
}

/**
 * Gets the daily cap cost
 * @function
 * @param {number} - the (maximum) zone
 * @param {object} dailyCaps - looks at the dailyCaps object in the fares.json file
 * @returns {number} - gets the daily cap between zones 1 and the zone parameter (as daily caps always starts at zone 1)
 * @description
 */
// export function getDailyCap(maxZonesofar, dailyCaps, type) {
//   return dailyCaps[journeyToKey([1, maxZonesofar])][type];
// }

var getFare = function getFare(key, type, caps) {
  var fare = caps[key.constructor === Array ? journeyToKey(key) : zoneToJourney(key)];
  return type ? fare[type] : fare;
};

/**
 * Determines if a numeric target has been met or surpassed
 * @function
 * @param {number} target - target value to compare against
 * @param {number} value - the value to compare against the target
 * @description
 */
var met = function met(value, target) {
  return value >= target;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(8);
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFares;




// /**
//  * Calculates the extension fare (or none) of a journey
//  * @function
//  * @param {object} see below
//  * @param {singleFares} uses the singleFares json data
//  * @returns {number} - returns the extension fare for the journey
//  * @description
//
// 	FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
// 	FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap) -- unless you add in MaxDaily
//  // this is overly complicated for daily caps (as only deals with zone 1 to x) but still works. RELIES ON THE FACT DAILY ALWAYS STARTS AT 1
//  */

function extensionFares() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var singleFares = arguments[1];

	var maxDaily = options.maxDaily || null;
	// by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)

	var zones = options.zones,
	    type = options.type,
	    minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;
	// same as var minSingle = options.minSingle;

	// debugger;

	var finalCondition = null;
	var minSingle = zones[0];
	var maxSingle = zones[1];
	var minChargedZone = minSingle;

	if (maxDaily) {
		// If contactless, daily and weekly combo (hence adding in maxDaily as argument_
		if (maxDaily >= minTravelcard - 1) {
			// if no gap zones between max daily and min travelcard
			minTravelcard = 1; // since anytime daily caps always start at zone 1
			maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([maxDaily, maxTravelcard]); // max travelcard is whichever is largest max daily or max travelcard
			// else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
		} else {
			// IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
			minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
			finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
		}
	}

	// if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
	if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

		//if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type);

		// both single zones within travelcard zones
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard || finalCondition) {
		// debugger;
		return 0;
		// both single zones are outside travelcard zones
	}

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
	// ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
}

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(12);
/* harmony export (immutable) */ __webpack_exports__["a"] = contactless;





function contactless(days, data) {
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
      },
      data: data
    });
    return y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(weekCap, false, data.weeklyCaps);
  });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  var noWeekly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
    false: false,
    data: data
  });

  // final cheapest weekly charge on contactless
  return Math.round(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(final.concat([noWeekly])) * 100) / 100;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_utility__ = __webpack_require__(0);
/* unused harmony export default */
//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey




function getSingleJourneyZones(from, to, stations) {
	return __WEBPACK_IMPORTED_MODULE_0__utility_getData__["a" /* default */].journey(from, to).then(function (journey) {
		var journey = journey.journeys[0]; // selecting only the first journey from the API
		var legs = journey.legs; //To look at each leg of the journey

		// The array of zones associated with all stations of that journey
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* maxNum */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(zonesFromSingleStations);

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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])([singleMin].concat(dualZones));
		}

		return [finalMinZone, finalMaxZone];
	});
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(12);
/* harmony export (immutable) */ __webpack_exports__["a"] = oyster;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




// NEED TO:
// Add off peak discount if reached anytime cap twice each week btween 1-4 or 1-6
// DUAL TO DUAL STATION ZONING ALTERATIONS



function oyster(days, data) {
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			false: false,
			data: data
		})
	};

	var capsResultPre = weeklyCaps.map(function (weekCap) {
		var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
			},
			data: data
		});

		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* journeyToKey */])(weekCap), total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	return _defineProperty({}, cheapest, allCaps[cheapest]);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterDayTotal;
/**
 * Calculates the oyster total fare for the day
 * @function
  * @param {complex journeys object} journeys - has zones array, dualzones and type (offpeak or anytime)
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - returns the total fare
 * @description
 */





function oysterDayTotal(day) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;
  var dailyCaps = data.dailyCaps,
      singleFares = data.singleFares;


  return day.reduce(function (a, b) {
    var currentTotal = void 0;
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(b.zones, b.type, singleFares);
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([].concat(a.maxZone, b.zones));

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({ zones: b.zones, type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([offPeakTotal + singleFare, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps)]);
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, offPeakTotal + peakTotal]);
    } else {
      peakTotal += singleFare;
    }

    currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps)]);

    return {
      currentTotal: currentTotal,
      offPeakTotal: offPeakTotal,
      peakTotal: peakTotal,
      maxZone: maxZone
    };
  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null
  }).currentTotal;
}

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = splitOrFullFare;
/**
 * If min single less than min travelcard and max single more than max travelcard - calculates whichever is cheaper:
 * 	either two split singles or full fare without travelcard
 * @function
 * @param {numbers} minChargedZone - the min zone that will charge between this min chargable zone to min travelcard - 1 (as single) and  max chargeable zone (to charge beween max travelcard +1 to max chargeable zone)
 * @returns {number} - returns the cheapest fare
 * @description
 */



function splitOrFullFare(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_oyster__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_contactless__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__partials_weekTotal__ = __webpack_require__(12);









// TO DO
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].fares().then(function (fareData) {
  var singleFares = fareData.singleFares;
  var dailyCaps = fareData.dailyCaps;

  var days = [[{
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }], [{
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }], [{
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }], [{
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }]];

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__partials_contactless__["a" /* default */])(days, fareData));

  // final cheapest weekly charge on oyster
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oyster__["a" /* default */])(days, fareData));
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = conDayTotal;




// This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
function conDayTotal(day) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;
	var dailyCaps = data.dailyCaps,
	    singleFares = data.singleFares;


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(dailyCaps);
	// FOR WEEKLY TRAVELCARD
	if (maxTravelcard) {
		// gets cheapest daily anytime cap
		var t = allDailyCaps.map(function (cap) {
			var total = day.map(function (journey) {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: minTravelcard,
					maxTravelcard: maxTravelcard,
					maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
					zones: journey.zones,
					type: journey.type
				}, singleFares);
			}).reduce(function (a, b) {
				return a + b;
			});

			return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'anytime', dailyCaps);
		});
		// console.log(t);

		// for no daily caps
		var x = day.map(function (journey) {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				zones: journey.zones,
				type: journey.type
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});
		// console.log(x);

		// for cheapest mix peak journeys + each daily off peak cap
		var l = allDailyCaps.map(function (cap) {
			var c = day.map(function (journey) {
				if (journey.type === 'offPeak') {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
						minTravelcard: minTravelcard,
						maxTravelcard: maxTravelcard,
						maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
						zones: journey.zones,
						type: 'offPeak'
					}, singleFares);
				} else {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
						minTravelcard: minTravelcard,
						maxTravelcard: maxTravelcard,
						zones: journey.zones,
						type: 'anytime'
					}, singleFares);
				}
			}).reduce(function (a, b) {
				return a + b;
			});
			return c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'offPeak', dailyCaps);
		});

		// console.log(l);

		//finally selects cheapest cheapest daily cap option
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(t.concat([x], l));
	} else {
		//FOR NO WEEKLY TRAVELCARD: need to split this function

		// gets cheapest daily anytime cap
		var _t = allDailyCaps.map(function (cap) {
			var total = day.map(function (journey) {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap),
					maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
					zones: journey.zones,
					type: journey.type
				}, singleFares);
			}).reduce(function (a, b) {
				return a + b;
			});

			return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'anytime', dailyCaps);
		});
		// console.log(t);

		// for no caps
		var _x3 = day.map(function (journey) {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(journey.zones, journey.type, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});
		// console.log(x);

		// for cheapest mix peak journeys + each daily off peak cap
		var _l = allDailyCaps.map(function (cap) {
			var c = day.map(function (journey) {
				if (journey.type === 'offPeak') {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
						minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap),
						maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
						zones: journey.zones,
						type: 'offPeak'
					}, singleFares);
				} else {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(journey.zones, 'anytime', singleFares);
				}
			}).reduce(function (a, b) {
				return a + b;
			});
			return c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'offPeak', dailyCaps);
		});

		// console.log(l);
		//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(_t.concat([_x3], _l));
	}
	// adds up each day's cheapest fare to become cheapest week total fare
}

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__ = __webpack_require__(10);
/* harmony export (immutable) */ __webpack_exports__["a"] = weekTotal;



function weekTotal(paymentFunction, days, info) {
  return days.map(function (day) {
    return paymentFunction(day, info.options, info.data);
  }).reduce(function (a, b) {
    return a + b;
  });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2Q2MWJlMmQwODRkNGQzOTlmMDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL193ZWVrVG90YWwuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0IiwiZXh0ZW5zaW9uRmFyZXMiLCJvcHRpb25zIiwic2luZ2xlRmFyZXMiLCJtYXhEYWlseSIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiZmluYWxDb25kaXRpb24iLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJtaW5DaGFyZ2VkWm9uZSIsInNwbGl0T3JGdWxsRmFyZSIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb250YWN0bGVzcyIsImRheXMiLCJmaW5hbCIsIndlZWtDYXAiLCJ5Iiwid2Vla1RvdGFsIiwibm9XZWVrbHkiLCJmYWxzZSIsInJvdW5kIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm95c3RlciIsIm5vQ2FwUmVzdWx0IiwiY2Fwc1Jlc3VsdFByZSIsInRvdGFsIiwiYWxsQ2FwcyIsImFzc2lnbiIsImNoZWFwZXN0Iiwib3lzdGVyRGF5VG90YWwiLCJkYXkiLCJkYWlseUNhcHMiLCJjdXJyZW50VG90YWwiLCJzaW5nbGVGYXJlIiwib2ZmUGVha1RvdGFsIiwicGVha1RvdGFsIiwibWF4Wm9uZSIsImZhcmVEYXRhIiwiZHVhbFpvbmVPdmVybGFwIiwiY29uRGF5VG90YWwiLCJhbGxEYWlseUNhcHMiLCJ0IiwieCIsImwiLCJjIiwicGF5bWVudEZ1bmN0aW9uIiwiaW5mbyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFTQyxJQUFULEVBQWU7QUFDakMsV0FBT0EsS0FBS0MsTUFBTCxLQUFnQkgsR0FBdkI7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU0ksY0FBVCxDQUF3QkMsWUFBeEIs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RSxTQUF4QixDQUFYO0FBQ0EsR0FkUyxDQUFWOztBQWdCRDtBQUNBO0FBQ0MsU0FBTyx1RkFBQW5HLENBQU82RyxHQUFFdkcsTUFBRixDQUFTLENBQUN3RyxHQUFELENBQVQsRUFBY0MsRUFBZCxDQUFQLENBQVA7QUFDQTtBQUNBO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUM5SEQ7QUFDQTs7QUFFZSxTQUFTaEQsU0FBVCxDQUFtQmtELGVBQW5CLEVBQW9DdEQsSUFBcEMsRUFBMEN1RCxJQUExQyxFQUFnRDtBQUM3RCxTQUFPdkQsS0FBSzVDLEdBQUwsQ0FBUyxVQUFDbUYsR0FBRDtBQUFBLFdBQVNlLGdCQUFnQmYsR0FBaEIsRUFBcUJnQixLQUFLbEYsT0FBMUIsRUFBbUNrRixLQUFLdkUsSUFBeEMsQ0FBVDtBQUFBLEdBQVQsRUFBaUVsRCxNQUFqRSxDQUF3RSxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVRCxJQUFJQyxDQUFkO0FBQUEsR0FBeEUsQ0FBUDtBQUNELEMiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkNjFiZTJkMDg0ZDRkMzk5ZjAyIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xuICBkZWJ1Z2dlcjtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBQcmVsb2FkcyBzdGFydCB6b25lIGFzIDEgYW5kIGNoYW5nZXMgdG8gMS14IGZvciBKU09OIGZpbGUgcmVhZGluZ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB6b25lIHhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJzEteCdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHpvbmVUb0pvdXJuZXkoem9uZSkge1xuICAvLyBkZWJ1Z2dlcjtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5VG9Kb3VybmV5KGtleSkge1xuICByZXR1cm4ga2V5LnNwbGl0KCctJykuc29ydCgpLm1hcChudW0gPT4gcGFyc2VJbnQobnVtKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9Kb3VybmV5KHdlZWtseUNhcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHdlZWtseUNhcHMpLm1hcCgoY2FwKSA9PiBrZXlUb0pvdXJuZXkoY2FwKSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzLCB0eXBlKSB7XG4vLyAgIHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV1bdHlwZV07XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBnZXRGYXJlID0gKGtleSwgdHlwZSwgY2FwcykgPT4ge1xuICBjb25zdCBmYXJlID0gY2Fwc1trZXkuY29uc3RydWN0b3IgPT09IEFycmF5ID8gam91cm5leVRvS2V5KGtleSkgOiB6b25lVG9Kb3VybmV5KGtleSldO1xuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9ICh2YWx1ZSwgdGFyZ2V0KSA9PiB2YWx1ZSA+PSB0YXJnZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsImltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1heE51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBzcGxpdE9yRnVsbEZhcmUgZnJvbSAnLi9fc3BsaXRPckZ1bGxGYXJlJztcblxuLy8gLyoqXG4vLyAgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7b2JqZWN0fSBzZWUgYmVsb3dcbi8vICAqIEBwYXJhbSB7c2luZ2xlRmFyZXN9IHVzZXMgdGhlIHNpbmdsZUZhcmVzIGpzb24gZGF0YVxuLy8gICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBleHRlbnNpb24gZmFyZSBmb3IgdGhlIGpvdXJuZXlcbi8vICAqIEBkZXNjcmlwdGlvblxuLy9cbi8vIFx0Rk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuLy8gXHRGT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMpIHtcbiAgY29uc3QgbWF4RGFpbHkgPSBvcHRpb25zLm1heERhaWx5IHx8IG51bGw7XG4vLyBieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuXG5cdGxldCB7XG5cdFx0em9uZXMsXG5cdFx0dHlwZSxcbiAgICBcdG1pblRyYXZlbGNhcmQsIC8vIG1pbmltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdG1heFRyYXZlbGNhcmQsIC8vbWF4aW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0Ly8gaWYgbWF4ZGFpbHkgYWxzbyBpbnZvbHZlZCAoZm9yIGNvbnRhY3RsZXNzIHdlZWtseSBhbmQgZGFpbHkgY29tYm8pOiBzbyB0aGF0IGl0IG9ubHkgY2hhcmdlcyB0aGUgZ2FwIHpvbmVzXG5cdH0gPSBvcHRpb25zO1xuXHQvLyBzYW1lIGFzIHZhciBtaW5TaW5nbGUgPSBvcHRpb25zLm1pblNpbmdsZTtcblxuLy8gZGVidWdnZXI7XG4gIGxldCBmaW5hbENvbmRpdGlvbiA9IG51bGw7XG4gIGxldCBtaW5TaW5nbGUgPSB6b25lc1swXTtcbiAgbGV0IG1heFNpbmdsZSA9IHpvbmVzWzFdO1xuICBsZXQgbWluQ2hhcmdlZFpvbmUgPSBtaW5TaW5nbGU7XG5cblx0aWYgKG1heERhaWx5KSB7IC8vIElmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvIChoZW5jZSBhZGRpbmcgaW4gbWF4RGFpbHkgYXMgYXJndW1lbnRfXG5cdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0ICBcdG1pblRyYXZlbGNhcmQgPSAxOyAvLyBzaW5jZSBhbnl0aW1lIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMVxuXHQgICBcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IC8vIG1heCB0cmF2ZWxjYXJkIGlzIHdoaWNoZXZlciBpcyBsYXJnZXN0IG1heCBkYWlseSBvciBtYXggdHJhdmVsY2FyZFxuLy8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdH0gZWxzZSB7IC8vIElGIGRpZmZlcmVuY2UgYncgbWluIHdlZWtseSBhbmQgbWF4IGRhaWx5IGNhcCA+IDEgLS0gVEhFTiBUSEVSRSBBUkUgR0FQIFpPTkVTXG5cdFx0XHRcdG1pbkNoYXJnZWRab25lID0gKChtaW5TaW5nbGUgPD0gbWF4RGFpbHkpID8gbWF4RGFpbHkgKyAxIDogbWluU2luZ2xlKTtcblx0XHRcdFx0ZmluYWxDb25kaXRpb24gPSAobWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaWYgbWluIHNpbmdsZSBpc250IHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnRcblx0aWYgKChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0IC8vIGRlYnVnZ2VyO1xuXHRcdHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udCBhbmQgZW5kXG4gXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBzcGxpdE9yRnVsbEZhcmUoXG4gICAgICBtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuIFx0XHRcdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG4gXHRcdFx0c2luZ2xlRmFyZXMsIHR5cGUpO1xuXG5cdC8vIGJvdGggc2luZ2xlIHpvbmVzIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSB8fCBmaW5hbENvbmRpdGlvbikge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiAwO1xuIFx0Ly8gYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fVxuXG5cbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG4vLyBFTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsImltcG9ydCB7XG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpIHtcblx0Y29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcbiAgLy8gbWFwcyBvdmVyIGFsbCB0aGUgcG9zc2libGUgd2Vla2x5IGNhcHMgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHdlZWtseSBjYXAgKyBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcClcbiBcdGNvbnN0IGZpbmFsID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcbiAgICAgIGNvbnN0IHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB5ICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKTtcbiAgICB9KTtcblxuICAvLyBnZXRzIHRoZSBmYXJlIGZvciB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApIHdpdGggbm8gd2Vla2x5IHRyYXZlbGNhcnNcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcblx0ICBcdGZhbHNlLFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIGNvbnRhY3RsZXNzXG4gIHJldHVybiBNYXRoLnJvdW5kKFxuICBcdFx0KG1pbk51bShmaW5hbC5jb25jYXQoW25vV2Vla2x5XSkpKVxuICBcdCogMTAwICkvIDEwMDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2ZpbmFsTWluWm9uZSwgZmluYWxNYXhab25lXTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuLy8gTkVFRCBUTzpcbi8vIEFkZCBvZmYgcGVhayBkaXNjb3VudCBpZiByZWFjaGVkIGFueXRpbWUgY2FwIHR3aWNlIGVhY2ggd2VlayBidHdlZW4gMS00IG9yIDEtNlxuLy8gRFVBTCBUTyBEVUFMIFNUQVRJT04gWk9OSU5HIEFMVEVSQVRJT05TXG5cbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyKGRheXMsIGRhdGEpIHtcblx0Y29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcblxuXHRjb25zdCBub0NhcFJlc3VsdCA9IHtcblx0XHQnbm9DYXAnOiB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9O1xuXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHRvdGFsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleSh3ZWVrQ2FwKV06IHRvdGFsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cblx0cmV0dXJuIHtcblx0XHRbY2hlYXBlc3RdOiBhbGxDYXBzW2NoZWFwZXN0XVxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtjb21wbGV4IGpvdXJuZXlzIG9iamVjdH0gam91cm5leXMgLSBoYXMgem9uZXMgYXJyYXksIGR1YWx6b25lcyBhbmQgdHlwZSAob2ZmcGVhayBvciBhbnl0aW1lKVxuICogQHBhcmFtIHtvcHRpb25zIG9iamVjdCBvZiBtaW5UcmF2ZWxjYXJkOiBudW0sIG1heFRyYXZlbGNhcmQ6IG51bX0gY29uc3Qgb2JqZWN0IC0gbWluVHJhdmVsY2FyZCBhbmQgbWF4VHJhdmVsY2FyZCBcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIHRvdGFsIGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRGYXJlLFxuICBtZXQsXG4gIHpvbmVUb0pvdXJuZXlcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXG4gIGNvbnN0IHtcbiAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gICAgbWF4VHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICB9ID0gb3B0aW9ucztcblxuICBjb25zdCB7XG4gICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgICBzaW5nbGVGYXJlcywgLy9KU09OXG4gIH0gPSBkYXRhO1xuICAgIFxuICByZXR1cm4gZGF5LnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGxldCBjdXJyZW50VG90YWw7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGIudHlwZSwgc2luZ2xlRmFyZXMpO1xuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG4gICAgbGV0IG1heFpvbmUgPSBtYXhOdW0oW10uY29uY2F0KGEubWF4Wm9uZSwgYi56b25lcykpO1xuXG4gICAgLy8gRk9SIFdFRUtMWVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe3pvbmVzOiBiLnpvbmVzLCB0eXBlOiBiLnR5cGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmR9LCBzaW5nbGVGYXJlcyk7XG5cbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiBtZXQobWF4VHJhdmVsY2FyZCwgbWF4Wm9uZSkgJiYgbWV0KG1heFpvbmUsIG1pblRyYXZlbGNhcmQgLSAxKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IC8vKGllIG9ubHkgY29tcGFyZXMgYWdhaW5zdCBkYWlseSBjYXAgb2YgbWluU2luZ2xlIHRvIG1heFpvbmUgLSByZW1vdmVzIG92ZXJsYXAgd2l0aCB3ZWVrbHkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgaWYgKGIudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG4gICAgICBvZmZQZWFrVG90YWwgPSBtaW5OdW0oW29mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUsIGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpXSk7XG4gICAgICBjdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgIH1cbiAgICAgIFxuICAgIGN1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKV0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRUb3RhbCxcbiAgICAgIG9mZlBlYWtUb3RhbCxcbiAgICAgIHBlYWtUb3RhbCxcbiAgICAgIG1heFpvbmUsXG4gICAgfTtcblxuICB9LCB7XG4gICAgY3VycmVudFRvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBwZWFrVG90YWw6IDAsXG4gICAgbWF4Wm9uZTogbnVsbCxcbiAgfSkuY3VycmVudFRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzLCB0eXBlKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cdFx0KGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpICsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpKVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuXHRtZXQsXG4gIGtleXNUb0pvdXJuZXksXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IG95c3RlciBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXInO1xuaW1wb3J0IGNvbnRhY3RsZXNzIGZyb20gJy4vcGFydGlhbHMvX2NvbnRhY3RsZXNzJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fd2Vla1RvdGFsJztcblxuLy8gVE8gRE9cbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy8gQWRkIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXJcbi8vIENBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuIFxuXTtcblxuICBjb25zb2xlLmxvZyhcbiAgICBjb250YWN0bGVzcyhkYXlzLCBmYXJlRGF0YSlcbiAgKTtcblxuICAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIG95c3RlclxuICBjb25zb2xlLmxvZyhcbiAgICBveXN0ZXIoZGF5cywgZmFyZURhdGEpXG4gICk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG4vLyBUaGlzIGNhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCBvciBubyBkYWlseSBjYXAgZm9yIGVhY2ggZGF5IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gYW55IHdlZWtseSBjYXBzIHBhc3NlZCBpblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcblxuXHRjb25zdCBhbGxEYWlseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhaWx5Q2Fwcyk7XG4vLyBGT1IgV0VFS0xZIFRSQVZFTENBUkRcblx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0Ly8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXHRcdGNvbnN0IHQgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRcdGNvbnN0IHRvdGFsID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZCxcblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHRcdCBcdFx0bWF4RGFpbHk6IG1heE51bShjYXApLFxuXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdFx0fSk7XG5cdFx0Ly8gY29uc29sZS5sb2codCk7XG5cblx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0XHRjb25zdCB4ID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0XHR0eXBlOiBqb3VybmV5LnR5cGUsXG5cdFx0XHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdFx0Ly8gY29uc29sZS5sb2coeCk7XG5cblx0Ly8gZm9yIGNoZWFwZXN0IG1peCBwZWFrIGpvdXJuZXlzICsgZWFjaCBkYWlseSBvZmYgcGVhayBjYXBcblx0XHRjb25zdCBsID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XHRjb25zdCBjID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdFx0aWYoam91cm5leS50eXBlID09PSAnb2ZmUGVhaycpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQsXG5cdFx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHRcdFx0IFx0XHRtYXhEYWlseTogbWF4TnVtKGNhcCksXG5cdFx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHRcdCBcdFx0dHlwZTogJ29mZlBlYWsnLFxuXHRcdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHRcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHRcdCBcdFx0dHlwZTogJ2FueXRpbWUnLFxuXHRcdFx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdFx0XHRyZXR1cm4gYyArIGdldEZhcmUoY2FwLCAnb2ZmUGVhaycsIGRhaWx5Q2Fwcyk7XG5cdFx0fSk7XG5cblx0Ly8gY29uc29sZS5sb2cobCk7XG5cblx0Ly9maW5hbGx5IHNlbGVjdHMgY2hlYXBlc3QgY2hlYXBlc3QgZGFpbHkgY2FwIG9wdGlvblxuXHRcdHJldHVybiBtaW5OdW0odC5jb25jYXQoW3hdLCBsKSk7XG5cblx0fSBlbHNlIHsgLy9GT1IgTk8gV0VFS0xZIFRSQVZFTENBUkQ6IG5lZWQgdG8gc3BsaXQgdGhpcyBmdW5jdGlvblxuXG5cdC8vIGdldHMgY2hlYXBlc3QgZGFpbHkgYW55dGltZSBjYXBcblx0XHRjb25zdCB0ID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XHRjb25zdCB0b3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bShjYXApLFxuXHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0oY2FwKSxcblx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHQgXHRcdHR5cGU6IGpvdXJuZXkudHlwZSxcblx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuXHRcdH0pO1xuXHRcdC8vIGNvbnNvbGUubG9nKHQpO1xuXG5cdC8vIGZvciBubyBjYXBzXG5cdFx0Y29uc3QgeCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRyZXR1cm4gZ2V0RmFyZShqb3VybmV5LnpvbmVzLCBqb3VybmV5LnR5cGUsIHNpbmdsZUZhcmVzKVxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXHRcdC8vIGNvbnNvbGUubG9nKHgpO1xuXG5cdC8vIGZvciBjaGVhcGVzdCBtaXggcGVhayBqb3VybmV5cyArIGVhY2ggZGFpbHkgb2ZmIHBlYWsgY2FwXG5cdFx0Y29uc3QgbCA9IGFsbERhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdFx0Y29uc3QgYyA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRcdGlmKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5OdW0oY2FwKSxcblx0XHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0oY2FwKSxcblx0XHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0IFx0XHR0eXBlOiAnb2ZmUGVhaycsXG5cdFx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0RmFyZShqb3VybmV5LnpvbmVzLCAnYW55dGltZScsIHNpbmdsZUZhcmVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdFx0XHRyZXR1cm4gYyArIGdldEZhcmUoY2FwLCAnb2ZmUGVhaycsIGRhaWx5Q2Fwcyk7XG5cdFx0fSk7XG5cblx0Ly8gY29uc29sZS5sb2cobCk7XG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxuXHRcdHJldHVybiBtaW5OdW0odC5jb25jYXQoW3hdLCBsKSk7XG5cdH1cbiBcdC8vIGFkZHMgdXAgZWFjaCBkYXkncyBjaGVhcGVzdCBmYXJlIHRvIGJlY29tZSBjaGVhcGVzdCB3ZWVrIHRvdGFsIGZhcmVcbn1cdFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsImltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlZWtUb3RhbChwYXltZW50RnVuY3Rpb24sIGRheXMsIGluZm8pIHtcbiAgcmV0dXJuIGRheXMubWFwKChkYXkpID0+IHBheW1lbnRGdW5jdGlvbihkYXksIGluZm8ub3B0aW9ucywgaW5mby5kYXRhKSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL193ZWVrVG90YWwuanMiXSwic291cmNlUm9vdCI6IiJ9