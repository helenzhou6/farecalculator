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
/* harmony export (immutable) */ __webpack_exports__["e"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFare; });
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
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

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

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
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
/* 3 */,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__ = __webpack_require__(7);
/* unused harmony export default */
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// NEED TO:
// Add off peak discount if reached anytime cap twice each week btween 1-4 or 1-6
// DUAL TO DUAL STATION ZONING ALTERATIONS



function oyster(days, data) {
	var caps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__["a" /* default */])(days, {
			false: false,
			data: data
		})
	};

	var capsResultPre = caps.map(function (cap) {
		var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__["a" /* default */])(days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap)
			},
			data: data
		});

		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* journeyToKey */])(cap), total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, false, data.weeklyCaps));
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





function oysterDayTotal(journeys) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;
  var dailyCaps = data.dailyCaps,
      singleFares = data.singleFares;


  return journeys.reduce(function (a, b) {
    var currentTotal = void 0;
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(b.zones, b.type, singleFares);
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
      offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([offPeakTotal + singleFare, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'offPeak', dailyCaps)]);
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, offPeakTotal + peakTotal]);
    } else {
      peakTotal += singleFare;
    }

    currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'anytime', dailyCaps)]);

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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterWeekTotal;


function oysterWeekTotal(days, info) {
  return days.map(function (day) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__["a" /* default */])(day, info.options, info.data);
  }).reduce(function (a, b) {
    return a + b;
  });
}

/***/ }),
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_contactlessDayTotal__ = __webpack_require__(10);








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
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }]];

  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(fareData.weeklyCaps);

  var final = weeklyCaps.map(function (weekCap) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__partials_contactlessDayTotal__["a" /* default */])(days, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(weekCap), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap), fareData).reduce(function (a, b) {
      return a + b;
    });
    return y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(weekCap, false, fareData.weeklyCaps); // 
  });
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(final));

  // console.log(
  //   oyster(days, fareData)
  // );
  //   const y = days.map((day) => {
  //     return conDayTotal(day, fareData);
  //   });

  // console.log(y);
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = conDayTotal;




function conDayTotal(days, minWeekly, maxWeekly, data) {
	var singleFares = data.singleFares;

	// const weeklyCaps = keysToJourney(data.weeklyCaps);

	var dailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.dailyCaps);
	// FOR WEEKLY TRAVELCARD
	if (maxWeekly) {
		return days.map(function (day) {

			// gets cheapest daily anytime cap
			var t = dailyCaps.map(function (cap) {
				var total = day.map(function (journey) {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
						minTravelcard: minWeekly,
						maxTravelcard: maxWeekly,
						maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
						zones: journey.zones,
						type: journey.type
					}, singleFares);
				}).reduce(function (a, b) {
					return a + b;
				});

				return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'anytime', data.dailyCaps);
			});
			// console.log(t);

			// for no daily caps
			var x = day.map(function (journey) {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: minWeekly,
					maxTravelcard: maxWeekly,
					zones: journey.zones,
					type: journey.type
				}, singleFares);
			}).reduce(function (a, b) {
				return a + b;
			});
			// console.log(x);

			// for cheapest mix peak journeys + each daily off peak cap
			var l = dailyCaps.map(function (cap) {
				var c = day.map(function (journey) {
					if (journey.type === 'offPeak') {
						return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
							minTravelcard: minWeekly,
							maxTravelcard: maxWeekly,
							maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
							zones: journey.zones,
							type: 'offPeak'
						}, singleFares);
					} else {
						return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
							minTravelcard: minWeekly,
							maxTravelcard: maxWeekly,
							zones: journey.zones,
							type: 'anytime'
						}, singleFares);
					}
				}).reduce(function (a, b) {
					return a + b;
				});
				return c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'offPeak', data.dailyCaps);
			});

			// console.log(l);
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(t.concat([x], l));
		});
	} else {
		//FOR NO WEEKLY TRAVELCARD: need to split this function
		days.map(function (day) {

			// gets cheapest daily anytime cap
			var t = dailyCaps.map(function (cap) {
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

				return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'anytime', data.dailyCaps);
			});
			// console.log(t);

			// for no caps
			var x = day.map(function (journey) {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(journey.zones, journey.type, data.singleFares);
			}).reduce(function (a, b) {
				return a + b;
			});
			// console.log(x);

			// for cheapest mix peak journeys + each daily off peak cap
			var l = dailyCaps.map(function (cap) {
				var c = day.map(function (journey) {
					if (journey.type === 'offPeak') {
						return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
							minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap),
							maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
							zones: journey.zones,
							type: 'offPeak'
						}, singleFares);
					} else {
						return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(journey.zones, 'anytime', data.singleFares);
					}
				}).reduce(function (a, b) {
					return a + b;
				});
				return c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'offPeak', data.dailyCaps);
			});

			// console.log(l);
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(t.concat([x], l));
		});
	}
}

// FOR EACH WEEKLY: loop over possibility -

// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps // --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)
// import {
//   journeyToKey,
//   keysToJourney,
//   maxNum,
//   minNum,
//   getFare,
//   flatten,
// } from './../utility/_utility';

// import extensionFares from './_extensionFares';

// export default function conDayTotal(day, data) {
// 	const {
// 		singleFares,
// 	} = data;

// 	const weeklyCaps = keysToJourney(data.weeklyCaps);
// 	const dailyCaps = keysToJourney(data.dailyCaps);

// 	// return days.map((day) => { 

// // gets cheapest daily anytime cap
// 	const t = dailyCaps.map((cap) => {
// 		const total = day.map(journey => {
// 			return extensionFares({
// 		 		minTravelcard: minNum(cap),
// 		 		maxTravelcard: maxNum(cap),
// 		 		zones: journey.zones,
// 		 		type: journey.type,
// 		 	}, singleFares);
// 		}).reduce((a, b) => a + b);

// 		return total + getFare(cap, 'anytime', data.dailyCaps);
// 	});
// 	// console.log(t);

// // for no caps
// 	const x = day.map(journey => {
// 		return getFare(journey.zones, journey.type, data.singleFares)
// 	}).reduce((a, b) => a + b);
// 	// console.log(x);

// // for cheapest mix peak journeys + each daily off peak cap
// 	const l = dailyCaps.map((cap) => {
// 		const c = day.map(journey => {
// 			if(journey.type === 'offPeak') {
// 				return extensionFares({
// 			 		minTravelcard: minNum(cap),
// 			 		maxTravelcard: maxNum(cap),
// 			 		zones: journey.zones,
// 			 		type: 'offPeak',
// 			 	}, singleFares);
// 			} else {
// 				return getFare(journey.zones, 'anytime', data.singleFares);
// 			}
// 		}).reduce((a, b) => a + b);
// 		return c + getFare(cap, 'offPeak', data.dailyCaps);
// 	});

// 	// console.log(l);

// 	return minNum(t.concat([x], l));
// 	// });
// }

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTcwYWFjMDk4YWEwMmZhYjhkZmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyV2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsInNpbmdsZUZhcmVzIiwibWF4RGFpbHkiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm95c3RlciIsImRheXMiLCJub0NhcFJlc3VsdCIsIm95c3RlcldlZWtUb3RhbCIsImZhbHNlIiwiY2Fwc1Jlc3VsdFByZSIsInRvdGFsIiwiYWxsQ2FwcyIsImFzc2lnbiIsImNoZWFwZXN0Iiwib3lzdGVyRGF5VG90YWwiLCJkYWlseUNhcHMiLCJjdXJyZW50VG90YWwiLCJzaW5nbGVGYXJlIiwib2ZmUGVha1RvdGFsIiwicGVha1RvdGFsIiwibWF4Wm9uZSIsImluZm8iLCJkYXkiLCJmYXJlRGF0YSIsImR1YWxab25lT3ZlcmxhcCIsImZpbmFsIiwid2Vla0NhcCIsInkiLCJjb25EYXlUb3RhbCIsIm1pbldlZWtseSIsIm1heFdlZWtseSIsInQiLCJ4IiwibCIsImMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7Ozs7Ozs7O0FBUU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ3pDLFNBQU9BLFNBQVNELE1BQVQsRUFBaUJFLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0MsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQWtDRixLQUFsQyxFQUF5QztBQUM5QyxTQUFPQSxNQUFNRyxNQUFOLENBQWEsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDLFdBQU9BLEtBQUtDLE1BQUwsS0FBZ0JILEdBQXZCO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7OztBQVNBLFNBQVNJLGNBQVQsQ0FBd0JDLFlBQXhCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUM5QyxTQUFPRCxhQUFhRSxNQUFiLENBQW9CLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEkiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU3MGFhYzA5OGFhMDJmYWI4ZGZjIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xuICBkZWJ1Z2dlcjtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBQcmVsb2FkcyBzdGFydCB6b25lIGFzIDEgYW5kIGNoYW5nZXMgdG8gMS14IGZvciBKU09OIGZpbGUgcmVhZGluZ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB6b25lIHhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJzEteCdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHpvbmVUb0pvdXJuZXkoem9uZSkge1xuICAvLyBkZWJ1Z2dlcjtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5VG9Kb3VybmV5KGtleSkge1xuICByZXR1cm4ga2V5LnNwbGl0KCctJykuc29ydCgpLm1hcChudW0gPT4gcGFyc2VJbnQobnVtKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9Kb3VybmV5KHdlZWtseUNhcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHdlZWtseUNhcHMpLm1hcCgoY2FwKSA9PiBrZXlUb0pvdXJuZXkoY2FwKSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzLCB0eXBlKSB7XG4vLyAgIHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV1bdHlwZV07XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBnZXRGYXJlID0gKGtleSwgdHlwZSwgY2FwcykgPT4ge1xuICBjb25zdCBmYXJlID0gY2Fwc1trZXkuY29uc3RydWN0b3IgPT09IEFycmF5ID8gam91cm5leVRvS2V5KGtleSkgOiB6b25lVG9Kb3VybmV5KGtleSldO1xuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9ICh2YWx1ZSwgdGFyZ2V0KSA9PiB2YWx1ZSA+PSB0YXJnZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsImltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1heE51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBzcGxpdE9yRnVsbEZhcmUgZnJvbSAnLi9fc3BsaXRPckZ1bGxGYXJlJztcblxuLy8gLyoqXG4vLyAgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7b2JqZWN0fSBzZWUgYmVsb3dcbi8vICAqIEBwYXJhbSB7c2luZ2xlRmFyZXN9IHVzZXMgdGhlIHNpbmdsZUZhcmVzIGpzb24gZGF0YVxuLy8gICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBleHRlbnNpb24gZmFyZSBmb3IgdGhlIGpvdXJuZXlcbi8vICAqIEBkZXNjcmlwdGlvblxuLy9cbi8vIFx0Rk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuLy8gXHRGT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMpIHtcbiAgY29uc3QgbWF4RGFpbHkgPSBvcHRpb25zLm1heERhaWx5IHx8IG51bGw7XG4vLyBieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuXG5cdGxldCB7XG5cdFx0em9uZXMsXG5cdFx0dHlwZSxcbiAgICBcdG1pblRyYXZlbGNhcmQsIC8vIG1pbmltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdG1heFRyYXZlbGNhcmQsIC8vbWF4aW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0Ly8gaWYgbWF4ZGFpbHkgYWxzbyBpbnZvbHZlZCAoZm9yIGNvbnRhY3RsZXNzIHdlZWtseSBhbmQgZGFpbHkgY29tYm8pOiBzbyB0aGF0IGl0IG9ubHkgY2hhcmdlcyB0aGUgZ2FwIHpvbmVzXG5cdH0gPSBvcHRpb25zO1xuXHQvLyBzYW1lIGFzIHZhciBtaW5TaW5nbGUgPSBvcHRpb25zLm1pblNpbmdsZTtcblxuLy8gZGVidWdnZXI7XG4gIGxldCBmaW5hbENvbmRpdGlvbiA9IG51bGw7XG4gIGxldCBtaW5TaW5nbGUgPSB6b25lc1swXTtcbiAgbGV0IG1heFNpbmdsZSA9IHpvbmVzWzFdO1xuICBsZXQgbWluQ2hhcmdlZFpvbmUgPSBtaW5TaW5nbGU7XG5cblx0aWYgKG1heERhaWx5KSB7IC8vIElmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvIChoZW5jZSBhZGRpbmcgaW4gbWF4RGFpbHkgYXMgYXJndW1lbnRfXG5cdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0ICBcdG1pblRyYXZlbGNhcmQgPSAxOyAvLyBzaW5jZSBhbnl0aW1lIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMVxuXHQgICBcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IC8vIG1heCB0cmF2ZWxjYXJkIGlzIHdoaWNoZXZlciBpcyBsYXJnZXN0IG1heCBkYWlseSBvciBtYXggdHJhdmVsY2FyZFxuLy8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdH0gZWxzZSB7IC8vIElGIGRpZmZlcmVuY2UgYncgbWluIHdlZWtseSBhbmQgbWF4IGRhaWx5IGNhcCA+IDEgLS0gVEhFTiBUSEVSRSBBUkUgR0FQIFpPTkVTXG5cdFx0XHRcdG1pbkNoYXJnZWRab25lID0gKChtaW5TaW5nbGUgPD0gbWF4RGFpbHkpID8gbWF4RGFpbHkgKyAxIDogbWluU2luZ2xlKTtcblx0XHRcdFx0ZmluYWxDb25kaXRpb24gPSAobWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaWYgbWluIHNpbmdsZSBpc250IHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnRcblx0aWYgKChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0IC8vIGRlYnVnZ2VyO1xuXHRcdHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udCBhbmQgZW5kXG4gXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBzcGxpdE9yRnVsbEZhcmUoXG4gICAgICBtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuIFx0XHRcdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG4gXHRcdFx0c2luZ2xlRmFyZXMsIHR5cGUpO1xuXG5cdC8vIGJvdGggc2luZ2xlIHpvbmVzIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSB8fCBmaW5hbENvbmRpdGlvbikge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiAwO1xuIFx0Ly8gYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fVxuXG5cbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG4vLyBFTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuLy8gTkVFRCBUTzpcbi8vIEFkZCBvZmYgcGVhayBkaXNjb3VudCBpZiByZWFjaGVkIGFueXRpbWUgY2FwIHR3aWNlIGVhY2ggd2VlayBidHdlZW4gMS00IG9yIDEtNlxuLy8gRFVBTCBUTyBEVUFMIFNUQVRJT04gWk9OSU5HIEFMVEVSQVRJT05TXG5cbmltcG9ydCBveXN0ZXJXZWVrVG90YWwgZnJvbSAnLi9fb3lzdGVyV2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyKGRheXMsIGRhdGEpIHtcblx0Y29uc3QgY2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcblxuXHRjb25zdCBub0NhcFJlc3VsdCA9IHtcblx0XHQnbm9DYXAnOiBveXN0ZXJXZWVrVG90YWwoZGF5cywge1xuXHRcdFx0ZmFsc2UsXG5cdFx0XHRkYXRhLFxuXHRcdH0pXG5cdH07XG5cblx0Y29uc3QgY2Fwc1Jlc3VsdFByZSA9IGNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCB0b3RhbCA9IG95c3RlcldlZWtUb3RhbChkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bShjYXApLFxuXHRcdFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0oY2FwKSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkoY2FwKV06IHRvdGFsICsgZ2V0RmFyZShjYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0IGFsbENhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBub0NhcFJlc3VsdCwgLi4uY2Fwc1Jlc3VsdFByZSk7XG5cdGNvbnN0IGNoZWFwZXN0ID0gT2JqZWN0LmtleXMoYWxsQ2FwcykucmVkdWNlKChhLCBiKSA9PiBhbGxDYXBzW2FdIDwgYWxsQ2Fwc1tiXSA/IGEgOiBiKTtcblxuXHRyZXR1cm4ge1xuXHRcdFtjaGVhcGVzdF06IGFsbENhcHNbY2hlYXBlc3RdXG5cdH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgdG90YWwgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcbiAgbWluTnVtLFxuICBtYXhOdW0sXG4gIGdldEZhcmUsXG4gIG1ldCxcbiAgem9uZVRvSm91cm5leVxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChqb3VybmV5cywgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcbiAgICBcbiAgcmV0dXJuIGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGxldCBjdXJyZW50VG90YWw7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGIudHlwZSwgc2luZ2xlRmFyZXMpO1xuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG4gICAgbGV0IG1heFpvbmUgPSBtYXhOdW0oW10uY29uY2F0KGEubWF4Wm9uZSwgYi56b25lcykpO1xuXG4gICAgLy8gRk9SIFdFRUtMWVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe3pvbmVzOiBiLnpvbmVzLCB0eXBlOiBiLnR5cGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmR9LCBzaW5nbGVGYXJlcyk7XG5cbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiBtZXQobWF4VHJhdmVsY2FyZCwgbWF4Wm9uZSkgJiYgbWV0KG1heFpvbmUsIG1pblRyYXZlbGNhcmQgLSAxKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IC8vKGllIG9ubHkgY29tcGFyZXMgYWdhaW5zdCBkYWlseSBjYXAgb2YgbWluU2luZ2xlIHRvIG1heFpvbmUgLSByZW1vdmVzIG92ZXJsYXAgd2l0aCB3ZWVrbHkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgaWYgKGIudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG4gICAgICBvZmZQZWFrVG90YWwgPSBtaW5OdW0oW29mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUsIGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpXSk7XG4gICAgICBjdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgIH1cbiAgICAgIFxuICAgIGN1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKV0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRUb3RhbCxcbiAgICAgIG9mZlBlYWtUb3RhbCxcbiAgICAgIHBlYWtUb3RhbCxcbiAgICAgIG1heFpvbmUsXG4gICAgfTtcblxuICB9LCB7XG4gICAgY3VycmVudFRvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBwZWFrVG90YWw6IDAsXG4gICAgbWF4Wm9uZTogbnVsbCxcbiAgfSkuY3VycmVudFRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsImltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlcldlZWtUb3RhbChkYXlzLCBpbmZvKSB7XG4gIHJldHVybiBkYXlzLm1hcCgoZGF5KSA9PiBveXN0ZXJEYXlUb3RhbChkYXksIGluZm8ub3B0aW9ucywgaW5mby5kYXRhKSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJXZWVrVG90YWwuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKSArIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcbiAgZ2V0RmFyZSxcblx0bWV0LFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy8gQWRkIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXJcbi8vIENBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuXTtcblxuY29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZmFyZURhdGEud2Vla2x5Q2Fwcyk7XG5cbmNvbnN0IGZpbmFsID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcbiAgICBjb25zdCB5ID0gY29uRGF5VG90YWwoXG4gICAgICBkYXlzLCBtaW5OdW0od2Vla0NhcCksIG1heE51bSh3ZWVrQ2FwKSwgZmFyZURhdGEpLnJlZHVjZSgoYSwgYikgPT4gYSArIGJcbiAgICApO1xuICAgIHJldHVybiB5ICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZmFyZURhdGEud2Vla2x5Q2Fwcyk7Ly8gXG59KVxuICBjb25zb2xlLmxvZyhtaW5OdW0oZmluYWwpKTtcblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBveXN0ZXIoZGF5cywgZmFyZURhdGEpXG4gIC8vICk7XG4gIC8vICAgY29uc3QgeSA9IGRheXMubWFwKChkYXkpID0+IHtcbiAgLy8gICAgIHJldHVybiBjb25EYXlUb3RhbChkYXksIGZhcmVEYXRhKTtcbiAgLy8gICB9KTtcblxuICAvLyBjb25zb2xlLmxvZyh5KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25EYXlUb3RhbChkYXlzLCBtaW5XZWVrbHksIG1heFdlZWtseSwgZGF0YSkge1xuXHRjb25zdCB7XG5cdFx0c2luZ2xlRmFyZXMsXG5cdH0gPSBkYXRhO1xuXG5cdC8vIGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG5cdGNvbnN0IGRhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS5kYWlseUNhcHMpO1xuLy8gRk9SIFdFRUtMWSBUUkFWRUxDQVJEXG5cdGlmIChtYXhXZWVrbHkpIHtcblx0XHRyZXR1cm4gZGF5cy5tYXAoKGRheSkgPT4geyBcblxuXHRcdC8vIGdldHMgY2hlYXBlc3QgZGFpbHkgYW55dGltZSBjYXBcblx0XHRcdGNvbnN0IHQgPSBkYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRcdFx0Y29uc3QgdG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogbWluV2Vla2x5LFxuXHRcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heFdlZWtseSxcblx0XHRcdFx0IFx0XHRtYXhEYWlseTogbWF4TnVtKGNhcCksXG5cdFx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0XHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhdGEuZGFpbHlDYXBzKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gY29uc29sZS5sb2codCk7XG5cblx0XHQvLyBmb3Igbm8gZGFpbHkgY2Fwc1xuXHRcdFx0Y29uc3QgeCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdFx0bWluVHJhdmVsY2FyZDogbWluV2Vla2x5LFxuXHRcdFx0XHRcdG1heFRyYXZlbGNhcmQ6IG1heFdlZWtseSxcblx0XHRcdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0XHR0eXBlOiBqb3VybmV5LnR5cGUsXG5cdFx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coeCk7XG5cblx0XHQvLyBmb3IgY2hlYXBlc3QgbWl4IHBlYWsgam91cm5leXMgKyBlYWNoIGRhaWx5IG9mZiBwZWFrIGNhcFxuXHRcdFx0Y29uc3QgbCA9IGRhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdFx0XHRpZihqb3VybmV5LnR5cGUgPT09ICdvZmZQZWFrJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbldlZWtseSxcblx0XHRcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heFdlZWtseSxcblx0XHRcdFx0XHQgXHRcdG1heERhaWx5OiBtYXhOdW0oY2FwKSxcblx0XHRcdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0XHRcdCBcdFx0dHlwZTogJ29mZlBlYWsnLFxuXHRcdFx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbldlZWtseSxcblx0XHRcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heFdlZWtseSxcblx0XHRcdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0XHRcdCBcdFx0dHlwZTogJ2FueXRpbWUnLFxuXHRcdFx0XHRcdFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdFx0XHRcdHJldHVybiBjICsgZ2V0RmFyZShjYXAsICdvZmZQZWFrJywgZGF0YS5kYWlseUNhcHMpO1xuXHRcdFx0fSk7XG5cblx0XHQvLyBjb25zb2xlLmxvZyhsKTtcblx0XHRyZXR1cm4gbWluTnVtKHQuY29uY2F0KFt4XSwgbCkpO1xuXHRcdH0pO1xuXG5cdH0gZWxzZSB7IC8vRk9SIE5PIFdFRUtMWSBUUkFWRUxDQVJEOiBuZWVkIHRvIHNwbGl0IHRoaXMgZnVuY3Rpb25cbiBcdFx0ZGF5cy5tYXAoKGRheSkgPT4geyBcblxuXHRcdC8vIGdldHMgY2hlYXBlc3QgZGFpbHkgYW55dGltZSBjYXBcblx0XHRcdGNvbnN0IHQgPSBkYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRcdFx0Y29uc3QgdG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKGNhcCksXG5cdFx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKGNhcCksXG5cdFx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0XHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhdGEuZGFpbHlDYXBzKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gY29uc29sZS5sb2codCk7XG5cblx0XHQvLyBmb3Igbm8gY2Fwc1xuXHRcdFx0Y29uc3QgeCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRcdHJldHVybiBnZXRGYXJlKGpvdXJuZXkuem9uZXMsIGpvdXJuZXkudHlwZSwgZGF0YS5zaW5nbGVGYXJlcylcblx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coeCk7XG5cblx0XHQvLyBmb3IgY2hlYXBlc3QgbWl4IHBlYWsgam91cm5leXMgKyBlYWNoIGRhaWx5IG9mZiBwZWFrIGNhcFxuXHRcdFx0Y29uc3QgbCA9IGRhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdFx0XHRpZihqb3VybmV5LnR5cGUgPT09ICdvZmZQZWFrJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bShjYXApLFxuXHRcdFx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKGNhcCksXG5cdFx0XHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0XHQgXHRcdHR5cGU6ICdvZmZQZWFrJyxcblx0XHRcdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBnZXRGYXJlKGpvdXJuZXkuem9uZXMsICdhbnl0aW1lJywgZGF0YS5zaW5nbGVGYXJlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblx0XHRcdFx0cmV0dXJuIGMgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYXRhLmRhaWx5Q2Fwcyk7XG5cdFx0XHR9KTtcblxuXHRcdC8vIGNvbnNvbGUubG9nKGwpO1xuXHRcdHJldHVybiBtaW5OdW0odC5jb25jYXQoW3hdLCBsKSk7XG5cdFx0fSk7XG4gXHR9XG59XHRcblxuLy8gRk9SIEVBQ0ggV0VFS0xZOiBsb29wIG92ZXIgcG9zc2liaWxpdHkgLVxuXG4vLyBPRkYgUEVBSyBEQUlMWSBhbmQgV0VFS0xZOiBGb3Igb2ZmIHBlYWsgZGFpbHkgY2FwIGNvbWJvczogaWYgb2ZmIHBlYWssIHVzZSBleHRlbnNpb24gZmFyZXMgdG8gY2FsY3VsYXRlIHVzaW5nIGJvdGggZGFpbHkgYW5kIHdlZWtseSBjYXBzIC8vIC0tLSB3aGlsc3QgaWYgcGVhayB0cmF2ZWwgdGhlbiB1c2UgZXh0ZW5zaW9uIGZhcmVzIHdpdGggb25seSB3ZWVrbHkgdHJhdmVsIGNhcmQgY2FwcyBhbmQgYWRkIHRvIHRvdGFsXG4vLyBBTllUSU1FIERBSUxZIGFuZCBXRUVLTFk6IHVzZSB0aGUgZXh0ZW5zaW9uIGZhcmUgdG8gY2FsY3VsYXRlIGFsbCBmYXJlcyB3aXRoIGRhaWx5IGFueXRpbWUgY2FwIGFuZCB3ZWVrbHkgY2FwIChjdXJyZW50IHNldCB1cClcbi8vIGltcG9ydCB7XG4vLyAgIGpvdXJuZXlUb0tleSxcbi8vICAga2V5c1RvSm91cm5leSxcbi8vICAgbWF4TnVtLFxuLy8gICBtaW5OdW0sXG4vLyAgIGdldEZhcmUsXG4vLyAgIGZsYXR0ZW4sXG4vLyB9IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbi8vIGltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgZGF0YSkge1xuLy8gXHRjb25zdCB7XG4vLyBcdFx0c2luZ2xlRmFyZXMsXG4vLyBcdH0gPSBkYXRhO1xuXG4vLyBcdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG4vLyBcdGNvbnN0IGRhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS5kYWlseUNhcHMpO1xuXG4vLyBcdC8vIHJldHVybiBkYXlzLm1hcCgoZGF5KSA9PiB7IFxuXG4vLyAvLyBnZXRzIGNoZWFwZXN0IGRhaWx5IGFueXRpbWUgY2FwXG4vLyBcdGNvbnN0IHQgPSBkYWlseUNhcHMubWFwKChjYXApID0+IHtcbi8vIFx0XHRjb25zdCB0b3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG4vLyBcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuLy8gXHRcdCBcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKGNhcCksXG4vLyBcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0oY2FwKSxcbi8vIFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuLy8gXHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuLy8gXHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcbi8vIFx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuLy8gXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhdGEuZGFpbHlDYXBzKTtcbi8vIFx0fSk7XG4vLyBcdC8vIGNvbnNvbGUubG9nKHQpO1xuXG4vLyAvLyBmb3Igbm8gY2Fwc1xuLy8gXHRjb25zdCB4ID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcbi8vIFx0XHRyZXR1cm4gZ2V0RmFyZShqb3VybmV5LnpvbmVzLCBqb3VybmV5LnR5cGUsIGRhdGEuc2luZ2xlRmFyZXMpXG4vLyBcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuLy8gXHQvLyBjb25zb2xlLmxvZyh4KTtcblxuLy8gLy8gZm9yIGNoZWFwZXN0IG1peCBwZWFrIGpvdXJuZXlzICsgZWFjaCBkYWlseSBvZmYgcGVhayBjYXBcbi8vIFx0Y29uc3QgbCA9IGRhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuLy8gXHRcdGNvbnN0IGMgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuLy8gXHRcdFx0aWYoam91cm5leS50eXBlID09PSAnb2ZmUGVhaycpIHtcbi8vIFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcbi8vIFx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKGNhcCksXG4vLyBcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bShjYXApLFxuLy8gXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcbi8vIFx0XHRcdCBcdFx0dHlwZTogJ29mZlBlYWsnLFxuLy8gXHRcdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuLy8gXHRcdFx0fSBlbHNlIHtcbi8vIFx0XHRcdFx0cmV0dXJuIGdldEZhcmUoam91cm5leS56b25lcywgJ2FueXRpbWUnLCBkYXRhLnNpbmdsZUZhcmVzKTtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcbi8vIFx0XHRyZXR1cm4gYyArIGdldEZhcmUoY2FwLCAnb2ZmUGVhaycsIGRhdGEuZGFpbHlDYXBzKTtcbi8vIFx0fSk7XG5cbi8vIFx0Ly8gY29uc29sZS5sb2cobCk7XG5cbi8vIFx0cmV0dXJuIG1pbk51bSh0LmNvbmNhdChbeF0sIGwpKTtcbi8vIFx0Ly8gfSk7XG4vLyB9XHRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwuanMiXSwic291cmNlUm9vdCI6IiJ9