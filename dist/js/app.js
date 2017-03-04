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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["i"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["b"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["c"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["g"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["f"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return met; });
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
 * Preloads start zone as 1 and changes to 1-x for JSON file reading
 * @function
 * @param {number} - zone x
 * @returns {string} - '1-x'
 * @description - used to get the fares from the json file
 */
function zoneToJourney(zone) {
  return journeyToKey([1, zone]);
}

/**
 * Turns "1-2" into [1, 2]
 * @function
 * @param {string} - key: "1-2"
 * @returns {array} - [1, 2]
 * @description - Opposite of journeyToKey
 */
function keyToJourney(key) {
  return key.split('-').sort().map(function (num) {
    return parseInt(num);
  });
}

/**
 * Gets keys from weeklyCaps, maps over them to generate array
 * @function
 * @param {weeklyCaps} - the weeklyCaps data from fares.json
 * @returns {array} - returns array of arrays [[1, 2], [1, 3] etc]
 * @description
 */

function keysToJourney(weeklyCaps) {
  return Object.keys(weeklyCaps).map(function (cap) {
    return keyToJourney(cap);
  });
}

/**
 * Gets the fare
 * @function
 * @param {array} - key is an array of two zones
 * @param {string} type is offPeak or anytime, or nothing if not needed (e.g. for weekly caps)
 * @param {data} the JSON data file with fare objects
 * @returns {number} - gets the single fare / weekly cap / daily cap from fares.json
 * @description
 */

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(9);
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
			maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])([maxDaily, maxTravelcard]); // max travelcard is whichever is largest max daily or max travelcard
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
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(b.zones, b.type, singleFares);
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])([].concat(a.maxZone, b.zones));

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({ zones: b.zones, type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }

      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([offPeakTotal + singleFare, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'offPeak', dailyCaps)]);
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([currentTotal, offPeakTotal + peakTotal]);
    } else {
      peakTotal += singleFare;
    }

    currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([currentTotal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'anytime', dailyCaps)]);

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = weekTotal;



function weekTotal(paymentFunction, days, info) {
  return days.map(function (day) {
    return paymentFunction(day, info.options, info.data);
  }).reduce(function (a, b) {
    return a + b;
  });
}

/***/ }),
/* 4 */
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
/* 5 */
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
	// gets cheapest daily anytime cap

	var conMin = minTravelcard;
	var conMax = maxTravelcard;

	var t = allDailyCaps.map(function (cap) {

		var total = day.map(function (journey) {

			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);
			if (maxTravelcard) {
				// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
				// = > then changes dual to dual  stations to min weekly travelcard zone
				// THIS IS DUPLICATED x3 -- refactor
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cap);
				var _conMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);
				var _conDaily = false;
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: conMin,
				maxTravelcard: conMax,
				maxDaily: conDaily,
				zones: journey.zones,
				type: journey.type
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	var l = allDailyCaps.map(function (cap) {

		var c = day.map(function (journey) {
			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cap);
				var _conMax2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);
				var _conDaily2 = false;
			}
			if (journey.type === 'offPeak') {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: conMin,
					maxTravelcard: conMax,
					maxDaily: conDaily,
					zones: journey.zones,
					type: 'offPeak'
				}, singleFares);
			} else {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: conMin,
					maxTravelcard: conMax,
					zones: journey.zones,
					type: 'anytime'
				}, singleFares);
			}
		}).reduce(function (a, b) {
			return a + b;
		});

		return c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'offPeak', dailyCaps);
	});

	// for no daily caps
	var x = day.map(function (journey) {

		if (maxTravelcard) {
			if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
				return 0;
			}
		} else {
			var _conMin3 = false;
			var _conMax3 = false;
		}
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: conMin,
			maxTravelcard: conMax,
			zones: journey.zones,
			type: journey.type
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	});

	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(t.concat([x], l));
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(3);
/* unused harmony export default */





function contactless(days, data) {
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(weekCap)
      },
      data: data
    });
    return y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(weekCap, false, data.weeklyCaps);
  });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  var noWeekly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
    false: false,
    data: data
  });

  // final cheapest weekly charge on contactless
  return Math.round(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(final.concat([noWeekly])) * 100) / 100;
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(4);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* maxNum */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(zonesFromSingleStations);

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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])([singleMin].concat(dualZones));
		}

		return [finalMinZone, finalMaxZone];
	});
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(3);
/* unused harmony export default */
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
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(weekCap)
			},
			data: data
		});

		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* journeyToKey */])(weekCap), total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	return _defineProperty({}, cheapest, allCaps[cheapest]);
}

/***/ }),
/* 9 */
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_oyster__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_contactless__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__partials_weekTotal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__partials_contactlessDayTotal__ = __webpack_require__(5);











// TO DO
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak 

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

  // const days = [
  //   [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],
  //     [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],
  //   [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],
  //   [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],
  //   [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     ],
  //     [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],
  //   [
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: true,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [1, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ],

  // ];

  //   console.log(
  //     contactless(days, fareData)
  //   );

  // final cheapest weekly charge on oyster
  // console.log(
  //   oyster(days, fareData)
  // );

  var journey = [{
    zones: [2, 2],
    dualZoneOverlap: true,
    type: "anytime"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }];

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__partials_contactlessDayTotal__["a" /* default */])(journey, {
    minTravelcard: 3,
    maxTravelcard: 4
  }, {
    dailyCaps: dailyCaps, //JSON
    singleFares: singleFares
  }));
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjljODliMjAyNzVmNmE2OTI0MDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0IiwiZXh0ZW5zaW9uRmFyZXMiLCJvcHRpb25zIiwic2luZ2xlRmFyZXMiLCJtYXhEYWlseSIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiZmluYWxDb25kaXRpb24iLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJtaW5DaGFyZ2VkWm9uZSIsInNwbGl0T3JGdWxsRmFyZSIsIm95c3RlckRheVRvdGFsIiwiZGF5IiwiZGF0YSIsImRhaWx5Q2FwcyIsImN1cnJlbnRUb3RhbCIsInNpbmdsZUZhcmUiLCJvZmZQZWFrVG90YWwiLCJwZWFrVG90YWwiLCJtYXhab25lIiwiZHVhbFpvbmVPdmVybGFwIiwid2Vla1RvdGFsIiwicGF5bWVudEZ1bmN0aW9uIiwiZGF5cyIsImluZm8iLCJmZXRjaEZhcmVEYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb25EYXlUb3RhbCIsImFsbERhaWx5Q2FwcyIsImNvbk1pbiIsImNvbk1heCIsInQiLCJ0b3RhbCIsImNvbkRhaWx5IiwibCIsImMiLCJ4IiwiY29udGFjdGxlc3MiLCJmaW5hbCIsIndlZWtDYXAiLCJ5Iiwibm9XZWVrbHkiLCJmYWxzZSIsInJvdW5kIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm95c3RlciIsIm5vQ2FwUmVzdWx0IiwiY2Fwc1Jlc3VsdFByZSIsImFsbENhcHMiLCJhc3NpZ24iLCJjaGVhcGVzdCIsImZhcmVEYXRhIiwiY29udGFjdGxlc3NEYXlUb3RhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFTQyxJQUFULEVBQWU7QUFDakMsV0FBT0EsS0FBS0MsTUFBTCxLQUFnQkgsR0FBdkI7QUFDRCxHQUZNLENB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dC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjljODliMjAyNzVmNmE2OTI0MDIiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogUHJlbG9hZHMgc3RhcnQgem9uZSBhcyAxIGFuZCBjaGFuZ2VzIHRvIDEteCBmb3IgSlNPTiBmaWxlIHJlYWRpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gem9uZSB4XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICcxLXgnXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6b25lVG9Kb3VybmV5KHpvbmUpIHtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG4vKipcbiAqIFR1cm5zIFwiMS0yXCIgaW50byBbMSwgMl1cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IC0ga2V5OiBcIjEtMlwiXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gWzEsIDJdXG4gKiBAZGVzY3JpcHRpb24gLSBPcHBvc2l0ZSBvZiBqb3VybmV5VG9LZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleVRvSm91cm5leShrZXkpIHtcbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLnNvcnQoKS5tYXAobnVtID0+IHBhcnNlSW50KG51bSkpO1xufVxuXG4vKipcbiAqIEdldHMga2V5cyBmcm9tIHdlZWtseUNhcHMsIG1hcHMgb3ZlciB0aGVtIHRvIGdlbmVyYXRlIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7d2Vla2x5Q2Fwc30gLSB0aGUgd2Vla2x5Q2FwcyBkYXRhIGZyb20gZmFyZXMuanNvblxuICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYXJyYXkgb2YgYXJyYXlzIFtbMSwgMl0sIFsxLCAzXSBldGNdXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvSm91cm5leSh3ZWVrbHlDYXBzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3ZWVrbHlDYXBzKS5tYXAoKGNhcCkgPT4ga2V5VG9Kb3VybmV5KGNhcCkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gLSBrZXkgaXMgYW4gYXJyYXkgb2YgdHdvIHpvbmVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBpcyBvZmZQZWFrIG9yIGFueXRpbWUsIG9yIG5vdGhpbmcgaWYgbm90IG5lZWRlZCAoZS5nLiBmb3Igd2Vla2x5IGNhcHMpXG4gKiBAcGFyYW0ge2RhdGF9IHRoZSBKU09OIGRhdGEgZmlsZSB3aXRoIGZhcmUgb2JqZWN0c1xuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSAvIHdlZWtseSBjYXAgLyBkYWlseSBjYXAgZnJvbSBmYXJlcy5qc29uXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmFyZSA9IChrZXksIHR5cGUsIGNhcHMpID0+IHtcbiAgY29uc3QgZmFyZSA9IGNhcHNba2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGpvdXJuZXlUb0tleShrZXkpIDogem9uZVRvSm91cm5leShrZXkpXTtcbiAgcmV0dXJuIHR5cGUgPyBmYXJlW3R5cGVdIDogZmFyZTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSAodmFsdWUsIHRhcmdldCkgPT4gdmFsdWUgPj0gdGFyZ2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdEZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Rk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcCkgLS0gdW5sZXNzIHlvdSBhZGQgaW4gTWF4RGFpbHlcbi8vICAvLyB0aGlzIGlzIG92ZXJseSBjb21wbGljYXRlZCBmb3IgZGFpbHkgY2FwcyAoYXMgb25seSBkZWFscyB3aXRoIHpvbmUgMSB0byB4KSBidXQgc3RpbGwgd29ya3MuIFJFTElFUyBPTiBUSEUgRkFDVCBEQUlMWSBBTFdBWVMgU1RBUlRTIEFUIDFcbi8vICAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuLy8gYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbi8vIGRlYnVnZ2VyO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuICBsZXQgbWluU2luZ2xlID0gem9uZXNbMF07XG4gIGxldCBtYXhTaW5nbGUgPSB6b25lc1sxXTtcbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXG5cdGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuXHQgXHRpZiAobWF4RGFpbHkgPj0gKG1pblRyYXZlbGNhcmQgLSAxKSkgeyAvLyBpZiBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdCAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy8gc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcbi8vIGVsc2UgaWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8sIGFuZCB0aGVyZSBhcmUgZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZCwgaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyAvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGlmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdCAvLyBkZWJ1Z2dlcjtcblx0XHRyZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gc3BsaXRPckZ1bGxGYXJlKFxuICAgICAgbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvLyBib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gMDtcbiBcdC8vIGJvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH1cblxuXG4gIHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuLy8gRUxTRSBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgdG90YWwgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcbiAgbWluTnVtLFxuICBtYXhOdW0sXG4gIGdldEZhcmUsXG4gIG1ldCxcbiAgem9uZVRvSm91cm5leVxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cbiAgY29uc3Qge1xuICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHtcbiAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgIHNpbmdsZUZhcmVzLCAvL0pTT05cbiAgfSA9IGRhdGE7XG4gICAgXG4gIHJldHVybiBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcbiAgICBsZXQgc2luZ2xlRmFyZSA9IGdldEZhcmUoYi56b25lcywgYi50eXBlLCBzaW5nbGVGYXJlcyk7XG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcbiAgICBsZXQgbWF4Wm9uZSA9IG1heE51bShbXS5jb25jYXQoYS5tYXhab25lLCBiLnpvbmVzKSk7XG5cbiAgICAvLyBGT1IgV0VFS0xZXG4gICAgaWYgKG1heFRyYXZlbGNhcmQpIHtcbiAgICAgIHNpbmdsZUZhcmUgPSBleHRlbnNpb25GYXJlcyh7em9uZXM6IGIuem9uZXMsIHR5cGU6IGIudHlwZSwgbWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZH0sIHNpbmdsZUZhcmVzKTtcbiAgICAgIFxuICAgICAgLy8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcbiAgICAgIC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuICAgICAgaWYgKGIuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgICAgICgoKG1pbk51bShiLnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICAgICAoKChtYXhOdW0oYi56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICAgICAgKSB7XG4gICAgICAgIHNpbmdsZUZhcmUgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAobWluVHJhdmVsY2FyZCA+IDEgJiYgbWV0KG1heFRyYXZlbGNhcmQsIG1heFpvbmUpICYmIG1ldChtYXhab25lLCBtaW5UcmF2ZWxjYXJkIC0gMSkpIHtcbiAgICAgICAgbWF4Wm9uZSA9IG1pblRyYXZlbGNhcmQgLSAxOyAvLyhpZSBvbmx5IGNvbXBhcmVzIGFnYWluc3QgZGFpbHkgY2FwIG9mIG1pblNpbmdsZSB0byBtYXhab25lIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRUb3RhbCA9IGEuY3VycmVudFRvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIGlmIChiLnR5cGUgPT09ICdvZmZQZWFrJykge1xuICAgICAgb2ZmUGVha1RvdGFsID0gbWluTnVtKFtvZmZQZWFrVG90YWwgKyBzaW5nbGVGYXJlLCBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKV0pO1xuICAgICAgY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICB9XG4gICAgICBcbiAgICBjdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcyldKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VG90YWwsXG4gICAgICBvZmZQZWFrVG90YWwsXG4gICAgICBwZWFrVG90YWwsXG4gICAgICBtYXhab25lLFxuICAgIH07XG5cbiAgfSwge1xuICAgIGN1cnJlbnRUb3RhbDogMCxcbiAgICBvZmZQZWFrVG90YWw6IDAsXG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG1heFpvbmU6IG51bGwsXG4gIH0pLmN1cnJlbnRUb3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwuanMiLCJpbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWVrVG90YWwocGF5bWVudEZ1bmN0aW9uLCBkYXlzLCBpbmZvKSB7XG4gIHJldHVybiBkYXlzLm1hcCgoZGF5KSA9PiBwYXltZW50RnVuY3Rpb24oZGF5LCBpbmZvLm9wdGlvbnMsIGluZm8uZGF0YSkpLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgZmxhdHRlbixcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gVGhpcyBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgb3Igbm8gZGFpbHkgY2FwIGZvciBlYWNoIGRheSB0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGFueSB3ZWVrbHkgY2FwcyBwYXNzZWQgaW5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblx0ICBjb25zdCB7XG5cdCAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgfSA9IG9wdGlvbnM7XG5cblx0ICBjb25zdCB7XG5cdCAgICBkYWlseUNhcHMsIC8vSlNPTlxuXHQgICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuXHQgIH0gPSBkYXRhO1xuXG5cdGNvbnN0IGFsbERhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGFpbHlDYXBzKTtcblx0Ly8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXG5cdGxldCBjb25NaW4gPSBtaW5UcmF2ZWxjYXJkO1xuXHRsZXQgY29uTWF4ID0gbWF4VHJhdmVsY2FyZDtcblxuXHRjb25zdCB0ID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cblx0XHRjb25zdCB0b3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHRcdGxldCBjb25EYWlseSA9IG1heE51bShjYXApO1xuXHRcdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdFx0Ly8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcblx0XHRcdFx0Ly8gPSA+IHRoZW4gY2hhbmdlcyBkdWFsIHRvIGR1YWwgIHN0YXRpb25zIHRvIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lXG5cdFx0XHRcdC8vIFRISVMgSVMgRFVQTElDQVRFRCB4MyAtLSByZWZhY3RvclxuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGNvbk1pbiA9IG1pbk51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uTWF4ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25EYWlseSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdCBcdFx0bWF4RGFpbHk6IGNvbkRhaWx5LFxuXHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0IFx0XHR0eXBlOiBqb3VybmV5LnR5cGUsXG5cdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuXHR9KTtcblxuXHQvLyBmb3IgY2hlYXBlc3QgbWl4IHBlYWsgam91cm5leXMgKyBlYWNoIGRhaWx5IG9mZiBwZWFrIGNhcFxuXHRjb25zdCBsID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XG5cdFx0Y29uc3QgYyA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRsZXQgY29uRGFpbHkgPSBtYXhOdW0oY2FwKTtcblxuXHRcdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdFx0KCgobWluTnVtKGpvdXJuZXkuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG5cdFx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCBjb25NaW4gPSBtaW5OdW0oY2FwKTtcblx0XHRcdFx0bGV0IGNvbk1heCA9IG1heE51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uRGFpbHkgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdFx0IFx0XHRtYXhEYWlseTogY29uRGFpbHksXG5cdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0IFx0XHR0eXBlOiAnb2ZmUGVhaycsXG5cdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBjb25NaW4sXG5cdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHQgXHRcdHR5cGU6ICdhbnl0aW1lJyxcblx0XHRcdFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0fVxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0cmV0dXJuIGMgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpO1xuXHR9KTtcblxuXHRcdC8vIGZvciBubyBkYWlseSBjYXBzXG5cdGNvbnN0IHggPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXG5cdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbk1pbiA9IGZhbHNlO1xuXHRcdFx0bGV0IGNvbk1heCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IGpvdXJuZXkudHlwZSxcblx0XHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0Ly9maW5hbGx5IHNlbGVjdHMgY2hlYXBlc3QgY2hlYXBlc3QgZGFpbHkgY2FwIG9wdGlvbiBmb3IgZWFjaCBkYXkgKGluIGEgNyBkYXkgYXJyYXkpXG5cdHJldHVybiBtaW5OdW0odC5jb25jYXQoW3hdLCBsKSk7XG59XHRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwuanMiLCJpbXBvcnQge1xuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWN0bGVzcyhkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG4gIC8vIG1hcHMgb3ZlciBhbGwgdGhlIHBvc3NpYmxlIHdlZWtseSBjYXBzIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB3ZWVrbHkgY2FwICsgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApXG4gXHRjb25zdCBmaW5hbCA9IHdlZWtseUNhcHMubWFwKCh3ZWVrQ2FwKSA9PiB7XG4gICAgICBjb25zdCB5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4geSArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2Fwcyk7XG4gICAgfSk7XG5cbiAgLy8gZ2V0cyB0aGUgZmFyZSBmb3IgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKSB3aXRoIG5vIHdlZWtseSB0cmF2ZWxjYXJzXG4gIGNvbnN0IG5vV2Vla2x5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG5cdCAgXHRmYWxzZSxcblx0ICBcdGRhdGEsXG5cdCAgfSk7XG5cbiAgLy8gZmluYWwgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSBvbiBjb250YWN0bGVzc1xuICByZXR1cm4gTWF0aC5yb3VuZChcbiAgXHRcdChtaW5OdW0oZmluYWwuY29uY2F0KFtub1dlZWtseV0pKSlcbiAgXHQqIDEwMCApLyAxMDA7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcbi8vIE5FRUQgVE86XG4vLyBBZGQgb2ZmIHBlYWsgZGlzY291bnQgaWYgcmVhY2hlZCBhbnl0aW1lIGNhcCB0d2ljZSBlYWNoIHdlZWsgYnR3ZWVuIDEtNCBvciAxLTZcbi8vIERVQUwgVE8gRFVBTCBTVEFUSU9OIFpPTklORyBBTFRFUkFUSU9OU1xuXG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlcihkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG5cblx0Y29uc3Qgbm9DYXBSZXN1bHQgPSB7XG5cdFx0J25vQ2FwJzogd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRmYWxzZSxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fTtcblxuXHRjb25zdCBjYXBzUmVzdWx0UHJlID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcblx0XHRjb25zdCB0b3RhbCA9IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkod2Vla0NhcCldOiB0b3RhbCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cblx0cmV0dXJuIHtcblx0XHRbY2hlYXBlc3RdOiBhbGxDYXBzW2NoZWFwZXN0XVxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwiLyoqXG4gKiBJZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgLSBjYWxjdWxhdGVzIHdoaWNoZXZlciBpcyBjaGVhcGVyOlxuICogXHRlaXRoZXIgdHdvIHNwbGl0IHNpbmdsZXMgb3IgZnVsbCBmYXJlIHdpdGhvdXQgdHJhdmVsY2FyZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IG1pbkNoYXJnZWRab25lIC0gdGhlIG1pbiB6b25lIHRoYXQgd2lsbCBjaGFyZ2UgYmV0d2VlbiB0aGlzIG1pbiBjaGFyZ2FibGUgem9uZSB0byBtaW4gdHJhdmVsY2FyZCAtIDEgKGFzIHNpbmdsZSkgYW5kICBtYXggY2hhcmdlYWJsZSB6b25lICh0byBjaGFyZ2UgYmV3ZWVuIG1heCB0cmF2ZWxjYXJkICsxIHRvIG1heCBjaGFyZ2VhYmxlIHpvbmUpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGNoZWFwZXN0IGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1pbk51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0T3JGdWxsRmFyZShcblx0bWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcblx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcblx0c2luZ2xlRmFyZXMsIHR5cGUpIHtcblx0cmV0dXJuIG1pbk51bShbXG5cdFx0Z2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSxcblx0XHQoZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcykgKyBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcykpXG5cdF0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwiaW1wb3J0IHtcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGZsYXR0ZW4sXG4gIGdldEZhcmUsXG5cdG1ldCxcbiAga2V5c1RvSm91cm5leSxcbn0gZnJvbSAnLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCBnZXRTaW5nbGVKb3VybmV5Wm9uZXMgZnJvbSAnLi9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzJztcbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcyc7XG5pbXBvcnQgb3lzdGVyIGZyb20gJy4vcGFydGlhbHMvX295c3Rlcic7XG5pbXBvcnQgY29udGFjdGxlc3MgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3MnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL3BhcnRpYWxzL193ZWVrVG90YWwnO1xuXG5pbXBvcnQgY29udGFjdGxlc3NEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgXG5cbi8vIEFkZCB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyXG4vLyBDQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuICBsZXQgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcbiAgbGV0IGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2FwcztcblxuLy8gY29uc3QgZGF5cyA9IFtcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gICAgIFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gICBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gICBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAgXSxcbi8vICAgICBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyAgIFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICBdLFxuIFxuLy8gXTtcblxuLy8gICBjb25zb2xlLmxvZyhcbi8vICAgICBjb250YWN0bGVzcyhkYXlzLCBmYXJlRGF0YSlcbi8vICAgKTtcblxuICAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIG95c3RlclxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBveXN0ZXIoZGF5cywgZmFyZURhdGEpXG4gIC8vICk7XG5cbiAgY29uc3Qgam91cm5leSA9IFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF07XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICBjb250YWN0bGVzc0RheVRvdGFsKFxuICAgICAgam91cm5leSxcbiAgICAgIHtcbiAgICAgICAgbWluVHJhdmVsY2FyZDogMyxcbiAgICAgICAgbWF4VHJhdmVsY2FyZDogNCxcbiAgICAgIH0sIHtcbiAgICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgICAgICAgIHNpbmdsZUZhcmVzXG4gICAgICAgIH0pXG4gICk7XG5cbiAgICBcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9