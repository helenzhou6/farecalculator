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

  // console.log(
  //   oyster(days, fareData)
  // );
  var y = days.map(function (day) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__partials_contactlessDayTotal__["a" /* default */])(day, fareData);
  });

  console.log(y);
});

//---------------------------------
// - CONTACTLESS Cheapest Fare = with daily caps
//The array of all combination prices to be reduce to cheapest one

// FOR EACH WEEKLY: loop over possibility -
// use extension Fares (using travelcards (and) max daily)
// select cheapest out of no daily cap, or combo of each daily cap
//---> Compare all the possibilities and select the cheapest (including total single).
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak,
// use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares
// with daily anytime cap and weekly cap (current set up)

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = conDayTotal;




function conDayTotal(day, data) {
	var singleFares = data.singleFares;


	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);
	var dailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.dailyCaps);

	// return days.map((day) => { 

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
	// });
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
// } from './../utility/_utility';

// import extensionFares from './_extensionFares';


// export default function contactless(days, data) {
// 	const {
// 		singleFares,
// 	} = data;

// 	// const weeklyCaps = keysToJourney(data.weeklyCaps);
// 	const dailyCaps = keysToJourney(data.dailyCaps);

// 	//FOR EACH DAY -- 

// 	return days.map((day) => {
// 		const t = dailyCaps.map((cap) => {
// 			// debugger;
// 			const total = day.map(journey => {

// 				return extensionFares({
// 			 		minTravelcard: minNum(cap),
// 			 		maxTravelcard: maxNum(cap),
// 			 		zones: journey.zones,
// 			 		type: journey.type,
// 			 	}, singleFares);


// 			}).reduce((a, b) => a + b);

// 			return total + getFare(cap, 'anytime', data.dailyCaps);
// 		});
// 		return minNum(t);
// 	});
// }

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDIxMDMwOGQ2M2M4YTkzMjEyNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyV2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsInNpbmdsZUZhcmVzIiwibWF4RGFpbHkiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm95c3RlciIsImRheXMiLCJub0NhcFJlc3VsdCIsIm95c3RlcldlZWtUb3RhbCIsImZhbHNlIiwiY2Fwc1Jlc3VsdFByZSIsInRvdGFsIiwiYWxsQ2FwcyIsImFzc2lnbiIsImNoZWFwZXN0Iiwib3lzdGVyRGF5VG90YWwiLCJkYWlseUNhcHMiLCJjdXJyZW50VG90YWwiLCJzaW5nbGVGYXJlIiwib2ZmUGVha1RvdGFsIiwicGVha1RvdGFsIiwibWF4Wm9uZSIsImluZm8iLCJkYXkiLCJmYXJlRGF0YSIsImR1YWxab25lT3ZlcmxhcCIsInkiLCJjb25EYXlUb3RhbCIsInQiLCJ4IiwibCIsImMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7Ozs7Ozs7O0FBUU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ3pDLFNBQU9BLFNBQVNELE1BQVQsRUFBaUJFLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0MsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQWtDRixLQUFsQyxFQUF5QztBQUM5QyxTQUFPQSxNQUFNRyxNQUFOLENBQWEsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDLFdBQU9BLEtBQUtDLE1BQUwsS0FBZ0JILEdBQXZCO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7OztBQVNBLFNBQVNJLGNBQVQsQ0FBd0JDLFlBQXhCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUM5QyxTQUFPRCxhQUFhRSxNQUFiLENBQW9CLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3hDLFdBQU9ILFNBQVNFLENBQVQsRUFBWUMsQ0FBWixDQUFQO0FBQ0Qs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SVIsSUFBSXBGLEdBQUosQ0FBUSxtQkFBVztBQUM1QixPQUFHUCxRQUFRZSxJQUFSLEtBQWlCLFNBQXBCLEVBQStCO0FBQzlCLFdBQU8sdUZBQUFRLENBQWU7QUFDcEJJLG9CQUFlLHVGQUFBbkMsQ0FBT3FCLEdBQVAsQ0FESztBQUVwQmUsb0JBQWUsdUZBQUF4QyxDQUFPeUIsR0FBUCxDQUZLO0FBR3BCckMsWUFBT3dCLFFBQVF4QixLQUhLO0FBSXBCdUMsV0FBTTtBQUpjLEtBQWYsRUFLSFUsV0FMRyxDQUFQO0FBTUEsSUFQRCxNQU9PO0FBQ04sV0FBTyx3RkFBQVgsQ0FBUWQsUUFBUXhCLEtBQWhCLEVBQXVCLFNBQXZCLEVBQWtDMkQsS0FBS1YsV0FBdkMsQ0FBUDtBQUNBO0FBQ0QsR0FYUyxFQVdQeEMsTUFYTyxDQVdBLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFVBQVVELElBQUlDLENBQWQ7QUFBQSxHQVhBLENBQVY7QUFZQSxTQUFPZ0gsSUFBSSx3RkFBQXJGLENBQVFELEdBQVIsRUFBYSxTQUFiLEVBQXdCc0IsS0FBS2lELFNBQTdCLENBQVg7QUFDQSxFQWRTLENBQVY7O0FBZ0JBOztBQUVBLFFBQU8sdUZBQUE1RixDQUFPd0csRUFBRWxHLE1BQUYsQ0FBUyxDQUFDbUcsQ0FBRCxDQUFULEVBQWNDLENBQWQsQ0FBUCxDQUFQO0FBQ0E7QUFDQTs7QUFFRDs7QUFFQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDIxMDMwOGQ2M2M4YTkzMjEyNWUiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG4gIGRlYnVnZ2VyO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIFByZWxvYWRzIHN0YXJ0IHpvbmUgYXMgMSBhbmQgY2hhbmdlcyB0byAxLXggZm9yIEpTT04gZmlsZSByZWFkaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHpvbmUgeFxuICogQHJldHVybnMge3N0cmluZ30gLSAnMS14J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIC8vIGRlYnVnZ2VyO1xuICByZXR1cm4gam91cm5leVRvS2V5KFsxLCB6b25lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlUb0pvdXJuZXkoa2V5KSB7XG4gIHJldHVybiBrZXkuc3BsaXQoJy0nKS5zb3J0KCkubWFwKG51bSA9PiBwYXJzZUludChudW0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0pvdXJuZXkod2Vla2x5Q2Fwcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMod2Vla2x5Q2FwcykubWFwKChjYXApID0+IGtleVRvSm91cm5leShjYXApKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYWlseSBjYXAgY29zdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB0aGUgKG1heGltdW0pIHpvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYWlseUNhcHMgLSBsb29rcyBhdCB0aGUgZGFpbHlDYXBzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIGRhaWx5IGNhcCBiZXR3ZWVuIHpvbmVzIDEgYW5kIHRoZSB6b25lIHBhcmFtZXRlciAoYXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnRzIGF0IHpvbmUgMSlcbiAqIEBkZXNjcmlwdGlvblxuICovXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMsIHR5cGUpIHtcbi8vICAgcmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXVt0eXBlXTtcbi8vIH1cblxuZXhwb3J0IGNvbnN0IGdldEZhcmUgPSAoa2V5LCB0eXBlLCBjYXBzKSA9PiB7XG4gIGNvbnN0IGZhcmUgPSBjYXBzW2tleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBqb3VybmV5VG9LZXkoa2V5KSA6IHpvbmVUb0pvdXJuZXkoa2V5KV07XG4gIHJldHVybiB0eXBlID8gZmFyZVt0eXBlXSA6IGZhcmU7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBudW1lcmljIHRhcmdldCBoYXMgYmVlbiBtZXQgb3Igc3VycGFzc2VkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQgLSB0YXJnZXQgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0IHRoZSB0YXJnZXRcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgY29uc3QgbWV0ID0gKHZhbHVlLCB0YXJnZXQpID0+IHZhbHVlID49IHRhcmdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWF4TnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gXHRGT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG4vLyBcdEZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMob3B0aW9ucyA9IHt9LCBzaW5nbGVGYXJlcykge1xuICBjb25zdCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcbi8vIGJ5IGRlZmF1bHQ6IGp1c3Qgb25lIHRyYXZlbGNhcmQgKHdlZWtseSB3aXRob3V0IGRhaWx5IG9yIGp1c3QgZGFpbHkgY2FwKSBmb3IgZWl0aGVyIG95c3RlciBvciBjb250YWN0bGVzcywgb3Igb3lzdGVyIHdpdGggd2Vla2x5IGNhcCAoZG9lc24ndCBjdXQgb2ZmIGRhaWx5IHNlY3Rpb24gb2YgdGhlIGpvdXJuZXkpXG5cblx0bGV0IHtcblx0XHR6b25lcyxcblx0XHR0eXBlLFxuICAgIFx0bWluVHJhdmVsY2FyZCwgLy8gbWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHQvLyBpZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cdC8vIHNhbWUgYXMgdmFyIG1pblNpbmdsZSA9IG9wdGlvbnMubWluU2luZ2xlO1xuXG4vLyBkZWJ1Z2dlcjtcbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHRpZiAobWF4RGFpbHkpIHsgLy8gSWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8gKGhlbmNlIGFkZGluZyBpbiBtYXhEYWlseSBhcyBhcmd1bWVudF9cblx0IFx0aWYgKG1heERhaWx5ID49IChtaW5UcmF2ZWxjYXJkIC0gMSkpIHsgLy8gaWYgbm8gZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZFxuXHQgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdCAgIFx0bWF4VHJhdmVsY2FyZCA9IG1heE51bShbbWF4RGFpbHksIG1heFRyYXZlbGNhcmRdKTsgLy8gbWF4IHRyYXZlbGNhcmQgaXMgd2hpY2hldmVyIGlzIGxhcmdlc3QgbWF4IGRhaWx5IG9yIG1heCB0cmF2ZWxjYXJkXG4vLyBlbHNlIGlmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvLCBhbmQgdGhlcmUgYXJlIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmQsIGhhdmUgYSBtaW4gY2hhcmdlZCB6b25lIChub3QgY2hhcmdlIHRoZSBkYWlseSBjYXAgLSB0aGUgZnJvbnQpXG5cdFx0fSBlbHNlIHsgLy8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVNcblx0XHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHR9XG5cdH1cblxuXHQvLyBpZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHQgLy8gZGVidWdnZXI7XG5cdFx0cmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG5cdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIDA7XG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG5cblxuICByZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcbi8vIEVMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2ZpbmFsTWluWm9uZSwgZmluYWxNYXhab25lXTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG4vLyBORUVEIFRPOlxuLy8gQWRkIG9mZiBwZWFrIGRpc2NvdW50IGlmIHJlYWNoZWQgYW55dGltZSBjYXAgdHdpY2UgZWFjaCB3ZWVrIGJ0d2VlbiAxLTQgb3IgMS02XG4vLyBEVUFMIFRPIERVQUwgU1RBVElPTiBaT05JTkcgQUxURVJBVElPTlNcblxuaW1wb3J0IG95c3RlcldlZWtUb3RhbCBmcm9tICcuL19veXN0ZXJXZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCBjYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdGNvbnN0IG5vQ2FwUmVzdWx0ID0ge1xuXHRcdCdub0NhcCc6IG95c3RlcldlZWtUb3RhbChkYXlzLCB7XG5cdFx0XHRmYWxzZSxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fTtcblxuXHRjb25zdCBjYXBzUmVzdWx0UHJlID0gY2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdGNvbnN0IHRvdGFsID0gb3lzdGVyV2Vla1RvdGFsKGRheXMsIHtcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKGNhcCksXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bShjYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleShjYXApXTogdG90YWwgKyBnZXRGYXJlKGNhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Y29uc3QgYWxsQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIG5vQ2FwUmVzdWx0LCAuLi5jYXBzUmVzdWx0UHJlKTtcblx0Y29uc3QgY2hlYXBlc3QgPSBPYmplY3Qua2V5cyhhbGxDYXBzKS5yZWR1Y2UoKGEsIGIpID0+IGFsbENhcHNbYV0gPCBhbGxDYXBzW2JdID8gYSA6IGIpO1xuXG5cdHJldHVybiB7XG5cdFx0W2NoZWFwZXN0XTogYWxsQ2Fwc1tjaGVhcGVzdF1cblx0fTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7Y29tcGxleCBqb3VybmV5cyBvYmplY3R9IGpvdXJuZXlzIC0gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSB0b3RhbCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuICBtaW5OdW0sXG4gIG1heE51bSxcbiAgZ2V0RmFyZSxcbiAgbWV0LFxuICB6b25lVG9Kb3VybmV5XG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGpvdXJuZXlzLCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXG4gIGNvbnN0IHtcbiAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gICAgbWF4VHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICB9ID0gb3B0aW9ucztcblxuICBjb25zdCB7XG4gICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgICBzaW5nbGVGYXJlcywgLy9KU09OXG4gIH0gPSBkYXRhO1xuICAgIFxuICByZXR1cm4gam91cm5leXMucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcbiAgICBsZXQgc2luZ2xlRmFyZSA9IGdldEZhcmUoYi56b25lcywgYi50eXBlLCBzaW5nbGVGYXJlcyk7XG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcbiAgICBsZXQgbWF4Wm9uZSA9IG1heE51bShbXS5jb25jYXQoYS5tYXhab25lLCBiLnpvbmVzKSk7XG5cbiAgICAvLyBGT1IgV0VFS0xZXG4gICAgaWYgKG1heFRyYXZlbGNhcmQpIHtcbiAgICAgIHNpbmdsZUZhcmUgPSBleHRlbnNpb25GYXJlcyh7em9uZXM6IGIuem9uZXMsIHR5cGU6IGIudHlwZSwgbWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZH0sIHNpbmdsZUZhcmVzKTtcblxuICAgICAgaWYgKG1pblRyYXZlbGNhcmQgPiAxICYmIG1ldChtYXhUcmF2ZWxjYXJkLCBtYXhab25lKSAmJiBtZXQobWF4Wm9uZSwgbWluVHJhdmVsY2FyZCAtIDEpKSB7XG4gICAgICAgIG1heFpvbmUgPSBtaW5UcmF2ZWxjYXJkIC0gMTsgLy8oaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gbWF4Wm9uZSAtIHJlbW92ZXMgb3ZlcmxhcCB3aXRoIHdlZWtseSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJyZW50VG90YWwgPSBhLmN1cnJlbnRUb3RhbCArIHNpbmdsZUZhcmU7XG5cbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycpIHtcbiAgICAgIG9mZlBlYWtUb3RhbCA9IG1pbk51bShbb2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSwgZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcyldKTtcbiAgICAgIGN1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWxdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgfVxuICAgICAgXG4gICAgY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFRvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgcGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICB9O1xuXG4gIH0sIHtcbiAgICBjdXJyZW50VG90YWw6IDAsXG4gICAgb2ZmUGVha1RvdGFsOiAwLFxuICAgIHBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KS5jdXJyZW50VG90YWw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwiaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyV2Vla1RvdGFsKGRheXMsIGluZm8pIHtcbiAgcmV0dXJuIGRheXMubWFwKChkYXkpID0+IG95c3RlckRheVRvdGFsKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlcldlZWtUb3RhbC5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzLCB0eXBlKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cdFx0KGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpICsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpKVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuXHRtZXQsXG4gIGtleVRvSm91cm5leVxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy8gQWRkIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXJcbi8vIENBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuXTtcblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBveXN0ZXIoZGF5cywgZmFyZURhdGEpXG4gIC8vICk7XG4gICAgY29uc3QgeSA9IGRheXMubWFwKChkYXkpID0+IHtcbiAgICAgIHJldHVybiBjb25EYXlUb3RhbChkYXksIGZhcmVEYXRhKTtcbiAgICB9KTtcbiAgICBcbiAgY29uc29sZS5sb2coeSk7XG59KTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IHdpdGggZGFpbHkgY2Fwc1xuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblxuLy8gRk9SIEVBQ0ggV0VFS0xZOiBsb29wIG92ZXIgcG9zc2liaWxpdHkgLVxuLy8gdXNlIGV4dGVuc2lvbiBGYXJlcyAodXNpbmcgdHJhdmVsY2FyZHMgKGFuZCkgbWF4IGRhaWx5KVxuLy8gc2VsZWN0IGNoZWFwZXN0IG91dCBvZiBubyBkYWlseSBjYXAsIG9yIGNvbWJvIG9mIGVhY2ggZGFpbHkgY2FwXG4vLy0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLlxuLy8gT0ZGIFBFQUsgREFJTFkgYW5kIFdFRUtMWTogRm9yIG9mZiBwZWFrIGRhaWx5IGNhcCBjb21ib3M6IGlmIG9mZiBwZWFrLFxuLy8gdXNlIGV4dGVuc2lvbiBmYXJlcyB0byBjYWxjdWxhdGUgdXNpbmcgYm90aCBkYWlseSBhbmQgd2Vla2x5IGNhcHNcbi8vIC0tLSB3aGlsc3QgaWYgcGVhayB0cmF2ZWwgdGhlbiB1c2UgZXh0ZW5zaW9uIGZhcmVzIHdpdGggb25seSB3ZWVrbHkgdHJhdmVsIGNhcmQgY2FwcyBhbmQgYWRkIHRvIHRvdGFsXG4vLyBBTllUSU1FIERBSUxZIGFuZCBXRUVLTFk6IHVzZSB0aGUgZXh0ZW5zaW9uIGZhcmUgdG8gY2FsY3VsYXRlIGFsbCBmYXJlc1xuLy8gd2l0aCBkYWlseSBhbnl0aW1lIGNhcCBhbmQgd2Vla2x5IGNhcCAoY3VycmVudCBzZXQgdXApXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25EYXlUb3RhbChkYXksIGRhdGEpIHtcblx0Y29uc3Qge1xuXHRcdHNpbmdsZUZhcmVzLFxuXHR9ID0gZGF0YTtcblxuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXHRjb25zdCBkYWlseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEuZGFpbHlDYXBzKTtcblxuXHQvLyByZXR1cm4gZGF5cy5tYXAoKGRheSkgPT4geyBcblxuLy8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXHRjb25zdCB0ID0gZGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0Y29uc3QgdG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bShjYXApLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKGNhcCksXG5cdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHQgXHRcdHR5cGU6IGpvdXJuZXkudHlwZSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYXRhLmRhaWx5Q2Fwcyk7XG5cdH0pO1xuXHQvLyBjb25zb2xlLmxvZyh0KTtcblxuLy8gZm9yIG5vIGNhcHNcblx0Y29uc3QgeCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0cmV0dXJuIGdldEZhcmUoam91cm5leS56b25lcywgam91cm5leS50eXBlLCBkYXRhLnNpbmdsZUZhcmVzKVxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblx0Ly8gY29uc29sZS5sb2coeCk7XG5cbi8vIGZvciBjaGVhcGVzdCBtaXggcGVhayBqb3VybmV5cyArIGVhY2ggZGFpbHkgb2ZmIHBlYWsgY2FwXG5cdGNvbnN0IGwgPSBkYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCBjID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdGlmKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bShjYXApLFxuXHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0oY2FwKSxcblx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHQgXHRcdHR5cGU6ICdvZmZQZWFrJyxcblx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBnZXRGYXJlKGpvdXJuZXkuem9uZXMsICdhbnl0aW1lJywgZGF0YS5zaW5nbGVGYXJlcyk7XG5cdFx0XHR9XG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdFx0cmV0dXJuIGMgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYXRhLmRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cdC8vIGNvbnNvbGUubG9nKGwpO1xuXG5cdHJldHVybiBtaW5OdW0odC5jb25jYXQoW3hdLCBsKSk7XG5cdC8vIH0pO1xufVx0XG5cbi8vIEZPUiBFQUNIIFdFRUtMWTogbG9vcCBvdmVyIHBvc3NpYmlsaXR5IC1cblxuLy8gT0ZGIFBFQUsgREFJTFkgYW5kIFdFRUtMWTogRm9yIG9mZiBwZWFrIGRhaWx5IGNhcCBjb21ib3M6IGlmIG9mZiBwZWFrLCB1c2UgZXh0ZW5zaW9uIGZhcmVzIHRvIGNhbGN1bGF0ZSB1c2luZyBib3RoIGRhaWx5IGFuZCB3ZWVrbHkgY2FwcyAvLyAtLS0gd2hpbHN0IGlmIHBlYWsgdHJhdmVsIHRoZW4gdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG9ubHkgd2Vla2x5IHRyYXZlbCBjYXJkIGNhcHMgYW5kIGFkZCB0byB0b3RhbFxuLy8gQU5ZVElNRSBEQUlMWSBhbmQgV0VFS0xZOiB1c2UgdGhlIGV4dGVuc2lvbiBmYXJlIHRvIGNhbGN1bGF0ZSBhbGwgZmFyZXMgd2l0aCBkYWlseSBhbnl0aW1lIGNhcCBhbmQgd2Vla2x5IGNhcCAoY3VycmVudCBzZXQgdXApXG5cblxuXG4vLyBpbXBvcnQge1xuLy8gICBqb3VybmV5VG9LZXksXG4vLyAgIGtleXNUb0pvdXJuZXksXG4vLyAgIG1heE51bSxcbi8vICAgbWluTnVtLFxuLy8gICBnZXRGYXJlLFxuLy8gfSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG4vLyBpbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpIHtcbi8vIFx0Y29uc3Qge1xuLy8gXHRcdHNpbmdsZUZhcmVzLFxuLy8gXHR9ID0gZGF0YTtcblxuLy8gXHQvLyBjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuLy8gXHRjb25zdCBkYWlseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEuZGFpbHlDYXBzKTtcblxuLy8gXHQvL0ZPUiBFQUNIIERBWSAtLSBcblxuLy8gXHRyZXR1cm4gZGF5cy5tYXAoKGRheSkgPT4ge1xuLy8gXHRcdGNvbnN0IHQgPSBkYWlseUNhcHMubWFwKChjYXApID0+IHtcbi8vIFx0XHRcdC8vIGRlYnVnZ2VyO1xuLy8gXHRcdFx0Y29uc3QgdG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0XHRcbi8vIFx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcbi8vIFx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKGNhcCksXG4vLyBcdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bShjYXApLFxuLy8gXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcbi8vIFx0XHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuLy8gXHRcdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0XHRcdFxuLy8gXHRcdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cbi8vIFx0XHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhdGEuZGFpbHlDYXBzKTtcbi8vIFx0XHR9KTtcbi8vIFx0XHRyZXR1cm4gbWluTnVtKHQpO1xuLy8gXHR9KTtcbi8vIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=