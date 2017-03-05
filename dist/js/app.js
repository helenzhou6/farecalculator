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
/* harmony export (immutable) */ __webpack_exports__["i"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["j"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["b"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["c"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["h"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["g"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["e"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return met; });
/* harmony export (immutable) */ __webpack_exports__["f"] = round;
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

/**
 * Rounds a number to however many decimal places specified
 * @function
 * @param {number} value - target value to round
 * @param {number} decimals - the number of decimals result should have
 * @description
 */
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

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
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

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

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
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


  var p = day.reduce(function (a, b) {
    var currentTotal = void 0;
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(b.zones, b.type, singleFares);
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])([].concat(a.maxZone, b.zones));

    var offPeakReachedPre = false;
    var offPeakReached = false;
    var offPeakMaxZone = a.offPeakMaxZone;
    var anytimeReached = false;

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({ zones: b.zones, type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }

      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      //off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'offPeak', dailyCaps);
      } else {
        offPeakTotal += singleFare;
      }

      //offPeakTotal = minNum([offPeakTotal + singleFare, getFare(maxZone, 'offPeak', dailyCaps)]);

      // current total is updated if needed to be off peak total + previous peak total for off peak travel
      if (offPeakTotal + peakTotal <= currentTotal) {
        //if this condition and the above conditions are both met (ie a current or previousoffpeak daily cap applied to currenttotal), set true
        if (offPeakReachedPre) {
          offPeakReached = true;
          offPeakMaxZone = maxZone;
          // return the max zone for off peak cap
        }
        currentTotal = offPeakTotal + peakTotal;
      }

      //currentTotal = minNum([currentTotal, offPeakTotal + peakTotal]);

      //otherwise for peak travel the peak total is updated in preparation for next round
    } else {
      peakTotal += singleFare;
    }

    //if needed current total is totally overridden by anytime daily cap
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      //if this is the case, off peak reached will then be set to false via anytimereached (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'anytime', dailyCaps);
    }

    //currentTotal = minNum([currentTotal, getFare(maxZone, 'anytime', dailyCaps)]);

    return {
      currentTotal: currentTotal,
      offPeakTotal: offPeakTotal,
      peakTotal: peakTotal,
      maxZone: maxZone,
      offPeakMaxZone: offPeakMaxZone,
      //ensures that previous off peak caps applied previous to future loops - if true, stays true
      offPeakReached: a.offPeakReached && !anytimeReached ? true : offPeakReached
    };
  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null
  });

  return {
    value: p.currentTotal,
    capIsMet: p.offPeakReached ? p.offPeakMaxZone : false
  };
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
		// if l is a daily off peak cap between 1-4, 1-5 or 1-6, for > 2x a week, then refund
		// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
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




// If the offpeak cap is met, return a variable 'capIsMet' + maxZone of that cap

// This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
function conDayTotal(day) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;
	var dailyCaps = data.dailyCaps,
	    singleFares = data.singleFares;


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* keysToJourney */])(dailyCaps);
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

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	// need a flag for off peak cap between 1-4, 1-5 or 1-6
	var l = allDailyCaps.map(function (cap) {
		var maxZoneInCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);

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

		return {
			maxZoneInCap: maxZoneInCap,
			value: c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
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

	// creates an array of the l values (out of the object)
	var lToValues = l.map(function (lVal) {
		return lVal.value;
	});

	// cheapest value
	var minAll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(t.concat([x], lToValues));

	// evaluates if any of the l values is equal to the cheapest value
	var isEq = l.some(function (entry) {
		return entry.value == minAll;
	});

	// if above is met, then find the max cap within the object that matches with the cheapest value
	var capVal;
	if (isEq) {
		capVal = l.filter(function (lVal) {
			return lVal.value === minAll;
		});
	}

	// returns an object: the cheapest value, whether off peak cap is met (if so will be the max off peak zone)
	return {
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(minAll, 2),
		capIsMet: isEq ? capVal[0].maxZoneInCap : false
	};

	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
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
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* keysToJourney */])(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(weekCap)
      },
      data: data
    });
    return y + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(weekCap, false, data.weeklyCaps);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* filterZonesByNumber */])(1, allZones));

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
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* keysToJourney */])(data.weeklyCaps);

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

		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* journeyToKey */])(weekCap), total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(weekCap, false, data.weeklyCaps));
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__partials_oysterDayTotal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__partials_contactlessDayTotal__ = __webpack_require__(5);












// TO DO
// do more tests

//MONTHLY - NB is that 4 weeks or 31/30 days or calendar month?

// daily offpeak/anytime capping changes:
// time of travel to be applied as an arugment: early, morning, afternoon, late
//Travel weekday early  doesnt count towards off peak cap, only anytime but is off peak single fares
// travel weekday (peak time) afternoon counts towards and is covered by the off peak/anytime cap, but is peak single fares
// morning is peak & anytime daily cap / late is off peak & off peak/anytime daily cap

//automatic off peak weekly refunds:
// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount

// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// API HANDLING
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
  //       time: "morning",
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

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__partials_contactlessDayTotal__["a" /* default */])(journey, {
    minTravelcard: 3,
    maxTravelcard: 4
  }, {
    dailyCaps: dailyCaps, //JSON
    singleFares: singleFares
  }));

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__partials_oysterDayTotal__["a" /* default */])(journey, {
    minTravelcard: 3,
    maxTravelcard: 4
  }, {

    dailyCaps: dailyCaps, //JSON
    singleFares: singleFares
  }));
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjQyNGIwZDhiYmMwN2I1Y2JiYzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0Iiwicm91bmQiLCJkZWNpbWFscyIsIk51bWJlciIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsInNpbmdsZUZhcmVzIiwibWF4RGFpbHkiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJveXN0ZXJEYXlUb3RhbCIsImRheSIsImRhdGEiLCJkYWlseUNhcHMiLCJwIiwiY3VycmVudFRvdGFsIiwic2luZ2xlRmFyZSIsIm9mZlBlYWtUb3RhbCIsInBlYWtUb3RhbCIsIm1heFpvbmUiLCJvZmZQZWFrUmVhY2hlZFByZSIsIm9mZlBlYWtSZWFjaGVkIiwib2ZmUGVha01heFpvbmUiLCJhbnl0aW1lUmVhY2hlZCIsImR1YWxab25lT3ZlcmxhcCIsImNhcElzTWV0Iiwid2Vla1RvdGFsIiwicGF5bWVudEZ1bmN0aW9uIiwiZGF5cyIsImluZm8iLCJmZXRjaEZhcmVEYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb25EYXlUb3RhbCIsImFsbERhaWx5Q2FwcyIsImNvbk1pbiIsImNvbk1heCIsInQiLCJ0b3RhbCIsImNvbkRhaWx5IiwibCIsIm1heFpvbmVJbkNhcCIsImMiLCJ4IiwibFRvVmFsdWVzIiwibFZhbCIsIm1pbkFsbCIsImlzRXEiLCJzb21lIiwiZW50cnkiLCJjYXBWYWwiLCJjb250YWN0bGVzcyIsImZpbmFsIiwid2Vla0NhcCIsInkiLCJub1dlZWtseSIsImZhbHNlIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm95c3RlciIsIm5vQ2FwUmVzdWx0IiwiY2Fwc1Jlc3VsdFByZSIsImFsbENhcHMiLCJhc3NpZ24iLCJjaGVhcGVzdCIsImZhcmVEYXRhIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFTQyxJQUFULEVBQWU7QUFDakMsV0FBT0EsS0FBS0MsTUFBTCxLQUFnQkgsR0FBdkI7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU0ksY0FBVCxDQUF3QkMsWUFBeEIsRUFBc0NDLFFBQXRDLEVBQWdEO0FBQzlDLFNBQU9ELGFBQWFFLE1BQWIsQ0FBb0IsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDeEMsV0FBT0gsU0FBU0UsQ0FBVCxFQUFZQyxDQUFaLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTQyxNQUFULENBQWdCQyxVQUFoQixFQUE0QjtBQUNqQyxTQUFPUCxlQUFlTyxVQUFmLEVBQTJCQyxLQUFLQyxHQUFoQyxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsTUFBVCxDQUFnQkgsVUFBaEIsRUFBNEI7QUFDakMsU0FBT1AsZUFBZU8sVUFBZixFQUEyQkMsS0FBS0csR0FBaEMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT08sU0FBU0MsYUFBVCxDQUF1QlIsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCO0FBQ2xDLFNBQU9HLEtBQUtLLEdBQUwsQ0FBU1QsSUFBSUMsQ0FBYixDQUFQO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNTLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQzNCLFNBQU9BLElBQUlaLE1BQUosQ0FBVyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUMvQixXQUFPRCxFQUFFWSxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVEOzs7Ozs7O0FBT08sU0FBU1ksWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0I7QUFDcEMsU0FBT0EsUUFBUUMsSUFBUixHQUFlQyxJQUFmLENBQW9CLEdBQXBCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNDLGFBQVQsQ0FBdUJ2QixJQUF2QixFQUE2QjtBQUNsQyxTQUFPbUIsYUFBYSxDQUFDLENBQUQsRUFBSW5CLElBQUosQ0FBYixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTd0IsWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkI7QUFDaEMsU0FBT0EsSUFBSUMsS0FBSixDQUFVLEdBQVYsRUFBZUwsSUFBZixHQUFzQk0sR0FBdEIsQ0FBMEI7QUFBQSxXQUFPQyxTQUFTOUIsR0FBVCxDQUFQO0FBQUEsR0FBMUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFPLFNBQVMrQixhQUFULENBQXVCQyxVQUF2QixFQUFtQztBQUN4QyxTQUFPQyxPQUFPQyxJQUFQLENBQVlGLFVBQVosRUFBd0JILEdBQXhCLENBQTRCLFVBQUNNLEdBQUQ7QUFBQSxXQUFTVCxhQUFhUyxHQUFiLENBQVQ7QUFBQSxHQUE1QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTyxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ1QsR0FBRCxFQUFNVSxJQUFOLEVBQVlDLElBQVosRUFBcUI7QUFDMUMsTUFBTUMsT0FBT0QsS0FBS1gsSUFBSWEsV0FBSixLQUFvQkMsS0FBcEIsR0FBNEJwQixhQUFhTSxHQUFiLENBQTVCLEdBQWdERixjQUFjRSxHQUFkLENBQXJELENBQWI7QUFDQSxTQUFPVSxPQUFPRSxLQUFLRixJQUFMLENBQVAsR0FBb0JFLElBQTNCO0FBQ0QsQ0FITTs7QUFLUDs7Ozs7OztBQU9PLElBQU1HLE1BQU0sU0FBTkEsR0FBTSxDQUFDQyxLQUFELEVBQVFDLE1BQVI7QUFBQSxTQUFtQkQsU0FBU0MsTUFBNUI7QUFBQSxDQUFaOztBQUVQOzs7Ozs7O0FBT08sU0FBU0MsS0FBVCxDQUFlRixLQUFmLEVBQXNCRyxRQUF0QixFQUFnQztBQUNwQyxTQUFPQyxPQUFVbkMsS0FBS2lDLEtBQUwsQ0FBY0YsS0FBZCxTQUF1QkcsUUFBdkIsQ0FBVixVQUFpREEsUUFBakQsQ0FBUDtBQUNGLEM7Ozs7Ozs7Ozs7QUN4SkQ7O0FBS0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLFNBQVNFLGNBQVQsR0FBbUQ7QUFBQSxLQUEzQkMsT0FBMkIsdUVBQWpCLEVBQWlCO0FBQUEsS0FBYkMsV0FBYTs7QUFDaEUsS0FBTUMsV0FBV0YsUUFBUUUsUUFBUixJQUFvQixJQUFyQztBQUNGOztBQUZrRSxLQUtoRXJELEtBTGdFLEdBVTdEbUQsT0FWNkQsQ0FLaEVuRCxLQUxnRTtBQUFBLEtBTWhFdUMsSUFOZ0UsR0FVN0RZLE9BVjZELENBTWhFWixJQU5nRTtBQUFBLEtBTzdEZSxhQVA2RCxHQVU3REgsT0FWNkQsQ0FPN0RHLGFBUDZEO0FBQUEsS0FRaEVDLGFBUmdFLEdBVTdESixPQVY2RCxDQVFoRUksYUFSZ0U7QUFXakU7O0FBRUQ7O0FBQ0UsS0FBSUMsaUJBQWlCLElBQXJCO0FBQ0EsS0FBSUMsWUFBWXpELE1BQU0sQ0FBTixDQUFoQjtBQUNBLEtBQUkwRCxZQUFZMUQsTUFBTSxDQUFOLENBQWhCO0FBQ0EsS0FBSTJELGlCQUFpQkYsU0FBckI7O0FBRUQsS0FBSUosUUFBSixFQUFjO0FBQUU7QUFDZCxNQUFJQSxZQUFhQyxnQkFBZ0IsQ0FBakMsRUFBcUM7QUFBRTtBQUN0Q0EsbUJBQWdCLENBQWhCLENBRG9DLENBQ2pCO0FBQ2xCQyxtQkFBZ0IsdUZBQUEzQyxDQUFPLENBQUN5QyxRQUFELEVBQVdFLGFBQVgsQ0FBUCxDQUFoQixDQUZtQyxDQUVnQjtBQUN4RDtBQUNHLEdBSkEsTUFJTTtBQUFFO0FBQ1BJLG9CQUFtQkYsYUFBYUosUUFBZCxHQUEwQkEsV0FBVyxDQUFyQyxHQUF5Q0ksU0FBM0Q7QUFDQUQsb0JBQWtCQyxhQUFhSixRQUFiLElBQXlCSyxhQUFhTCxRQUF4RDtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQSxLQUFLSSxZQUFZSCxhQUFiLElBQWdDQSxpQkFBaUJJLFNBQWpCLElBQThCQSxhQUFhSCxhQUEvRSxFQUErRjtBQUM3RjtBQUNELFNBQU8sd0ZBQUFqQixDQUFRLENBQUNxQixjQUFELEVBQWtCTCxnQkFBZ0IsQ0FBbEMsQ0FBUixFQUErQ2YsSUFBL0MsRUFBcURhLFdBQXJELENBQVA7O0FBRUQ7QUFDRSxFQUxGLE1BS1EsSUFBS0UsaUJBQWlCRyxTQUFqQixJQUE4QkEsYUFBYUYsYUFBNUMsSUFBK0RHLFlBQVlILGFBQS9FLEVBQStGO0FBQ3BHO0FBQ0QsU0FBTyx3RkFBQWpCLENBQVEsQ0FBRWlCLGdCQUFnQixDQUFsQixFQUFzQkcsU0FBdEIsQ0FBUixFQUEwQ25CLElBQTFDLEVBQWdEYSxXQUFoRCxDQUFQOztBQUVEO0FBQ0MsRUFMTSxNQUtBLElBQUlLLFlBQVlILGFBQVosSUFBNkJJLFlBQVlILGFBQTdDLEVBQTREO0FBQ2pFO0FBQ0QsU0FBTyx3RkFBQUssQ0FDSkQsY0FESSxFQUNZRCxTQURaLEVBRU5KLGFBRk0sRUFFU0MsYUFGVCxFQUdOSCxXQUhNLEVBR09iLElBSFAsQ0FBUDs7QUFLRjtBQUNFLEVBUk0sTUFRQSxJQUFLZSxpQkFBaUJHLFNBQWpCLElBQThCQSxhQUFhRixhQUE1QyxJQUErREQsaUJBQWlCSSxTQUFqQixJQUE4QkEsYUFBYUgsYUFBMUcsSUFBNEhDLGNBQWhJLEVBQWdKO0FBQ3JKO0FBQ0QsU0FBTyxDQUFQO0FBQ0Q7QUFDQzs7QUFHRCxRQUFPLHdGQUFBbEIsQ0FBUSxDQUFDcUIsY0FBRCxFQUFpQkQsU0FBakIsQ0FBUixFQUFxQ25CLElBQXJDLEVBQTJDYSxXQUEzQyxDQUFQO0FBQ0Y7QUFDQyxDOzs7Ozs7Ozs7QUM5RUQ7QUFBQTs7Ozs7Ozs7OztBQVVBOztBQVFBOztBQUVlLFNBQVNTLGNBQVQsQ0FBd0JDLEdBQXhCLEVBQXNEO0FBQUEsTUFBekJYLE9BQXlCLHVFQUFmLEVBQWU7QUFBQSxNQUFYWSxJQUFXLHVFQUFKLEVBQUk7QUFBQSxNQUdqRVQsYUFIaUUsR0FLL0RILE9BTCtELENBR2pFRyxhQUhpRTtBQUFBLE1BSWpFQyxhQUppRSxHQUsvREosT0FMK0QsQ0FJakVJLGFBSmlFO0FBQUEsTUFRakVTLFNBUmlFLEdBVS9ERCxJQVYrRCxDQVFqRUMsU0FSaUU7QUFBQSxNQVNqRVosV0FUaUUsR0FVL0RXLElBVitELENBU2pFWCxXQVRpRTs7O0FBWW5FLE1BQU1hLElBQUlILElBQUlyRCxNQUFKLENBQVcsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ25DLFFBQUl1RCxxQkFBSjtBQUNBLFFBQUlDLGFBQWEsd0ZBQUE3QixDQUFRM0IsRUFBRVgsS0FBVixFQUFpQlcsRUFBRTRCLElBQW5CLEVBQXlCYSxXQUF6QixDQUFqQjtBQUNBLFFBQUlnQixlQUFlMUQsRUFBRTBELFlBQXJCO0FBQ0EsUUFBSUMsWUFBWTNELEVBQUUyRCxTQUFsQjtBQUNBLFFBQUlDLFVBQVUsdUZBQUExRCxDQUFPLEdBQUdVLE1BQUgsQ0FBVVosRUFBRTRELE9BQVosRUFBcUIzRCxFQUFFWCxLQUF2QixDQUFQLENBQWQ7O0FBRUEsUUFBSXVFLG9CQUFvQixLQUF4QjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjtBQUNBLFFBQUlDLGlCQUFpQi9ELEVBQUUrRCxjQUF2QjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjs7QUFFQTtBQUNBLFFBQUluQixhQUFKLEVBQW1CO0FBQ2pCWSxtQkFBYSx1RkFBQWpCLENBQWUsRUFBQ2xELE9BQU9XLEVBQUVYLEtBQVYsRUFBaUJ1QyxNQUFNNUIsRUFBRTRCLElBQXpCLEVBQStCZSw0QkFBL0IsRUFBOENDLDRCQUE5QyxFQUFmLEVBQTZFSCxXQUE3RSxDQUFiOztBQUVBO0FBQ0E7QUFDQSxVQUFJekMsRUFBRWdFLGVBQUYsS0FBc0IsSUFBdEIsSUFDQyx1RkFBQTNELENBQU9MLEVBQUVYLEtBQVQsQ0FBRCxHQUFvQixDQUFyQixJQUEyQnNELGFBRDFCLElBRUMsdUZBQUExQyxDQUFPRCxFQUFFWCxLQUFULENBQUQsR0FBb0IsQ0FBckIsSUFBMkJ1RCxhQUY5QixFQUdJO0FBQ0ZZLHFCQUFhLENBQWI7QUFDRDs7QUFFRCxVQUFJYixnQkFBZ0IsQ0FBaEIsSUFBcUIsb0ZBQUFWLENBQUlXLGFBQUosRUFBbUJlLE9BQW5CLENBQXJCLElBQW9ELG9GQUFBMUIsQ0FBSTBCLE9BQUosRUFBYWhCLGdCQUFnQixDQUE3QixDQUF4RCxFQUF5RjtBQUN2RmdCLGtCQUFVaEIsZ0JBQWdCLENBQTFCLENBRHVGLENBQzFEO0FBQzlCO0FBQ0Y7O0FBRURZLG1CQUFleEQsRUFBRXdELFlBQUYsR0FBaUJDLFVBQWhDOztBQUVBLFFBQUl4RCxFQUFFNEIsSUFBRixLQUFXLFNBQWYsRUFBMEI7QUFDeEI7QUFDQSxVQUFLNkIsZUFBZUQsVUFBaEIsSUFBK0Isd0ZBQUE3QixDQUFRZ0MsT0FBUixFQUFpQixTQUFqQixFQUE0Qk4sU0FBNUIsQ0FBbkMsRUFBMkU7QUFDekVPLDRCQUFvQixJQUFwQjtBQUNBSCx1QkFBZSx3RkFBQTlCLENBQVFnQyxPQUFSLEVBQWlCLFNBQWpCLEVBQTRCTixTQUE1QixDQUFmO0FBQ0QsT0FIRCxNQUdPO0FBQ0xJLHdCQUFnQkQsVUFBaEI7QUFDRDs7QUFFRDs7QUFFQTtBQUNBLFVBQUtDLGVBQWVDLFNBQWhCLElBQThCSCxZQUFsQyxFQUFnRDtBQUM5QztBQUNBLFlBQUlLLGlCQUFKLEVBQXVCO0FBQ3JCQywyQkFBaUIsSUFBakI7QUFDQUMsMkJBQWlCSCxPQUFqQjtBQUNBO0FBQ0Q7QUFDREosdUJBQWVFLGVBQWVDLFNBQTlCO0FBQ0Q7O0FBRUQ7O0FBRUE7QUFDRCxLQXpCRCxNQXlCTztBQUNMQSxtQkFBYUYsVUFBYjtBQUNEOztBQUVEO0FBQ0EsUUFBSUQsZUFBZ0Isd0ZBQUE1QixDQUFRZ0MsT0FBUixFQUFpQixTQUFqQixFQUE0Qk4sU0FBNUIsQ0FBcEIsRUFBNkQ7QUFDM0Q7QUFDQVUsdUJBQWlCLElBQWpCO0FBQ0FSLHFCQUFlLHdGQUFBNUIsQ0FBUWdDLE9BQVIsRUFBaUIsU0FBakIsRUFBNEJOLFNBQTVCLENBQWY7QUFDRDs7QUFFRDs7QUFFQSxXQUFPO0FBQ0xFLGdDQURLO0FBRUxFLGdDQUZLO0FBR0xDLDBCQUhLO0FBSUxDLHNCQUpLO0FBS0xHLG9DQUxLO0FBTUw7QUFDQUQsc0JBQWlCOUQsRUFBRThELGNBQUYsSUFBb0IsQ0FBQ0UsY0FBdEIsR0FBd0MsSUFBeEMsR0FBK0NGO0FBUDFELEtBQVA7QUFVRCxHQWhGUyxFQWdGUDtBQUNETixrQkFBYyxDQURiO0FBRURFLGtCQUFjLENBRmI7QUFHREMsZUFBVyxDQUhWO0FBSURDLGFBQVM7QUFKUixHQWhGTyxDQUFWOztBQXVGQSxTQUFPO0FBQ0x6QixXQUFPb0IsRUFBRUMsWUFESjtBQUVMVSxjQUFVWCxFQUFFTyxjQUFGLEdBQW1CUCxFQUFFUSxjQUFyQixHQUFzQztBQUYzQyxHQUFQO0FBSUQsQzs7Ozs7Ozs7OztBQzNIRDtBQUNBOztBQUVlLFNBQVNJLFNBQVQsQ0FBbUJDLGVBQW5CLEVBQW9DQyxJQUFwQyxFQUEwQ0MsSUFBMUMsRUFBZ0Q7QUFDN0QsU0FBT0QsS0FBS2hELEdBQUwsQ0FBUyxVQUFDK0IsR0FBRDtBQUFBLFdBQVNnQixnQkFBZ0JoQixHQUFoQixFQUFxQmtCLEtBQUs3QixPQUExQixFQUFtQzZCLEtBQUtqQixJQUF4QyxDQUFUO0FBQUEsR0FBVCxFQUFpRXRELE1BQWpFLENBQXdFLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVVELElBQUlDLENBQWQ7QUFBQSxHQUF4RSxDQUFQO0FBQ0Q7QUFDRTtBQUNGLEM7Ozs7Ozs7QUNQRDs7O0FBR0EsSUFBSXNFLGdCQUFpQixZQUFZO0FBQ2hDLEtBQUlsQixPQUFPLElBQVg7O0FBRUEsUUFBTyxZQUFXO0FBQ2pCLE1BQUlBLElBQUosRUFBVTtBQUNUbUIsV0FBUUMsR0FBUixDQUFZLHFDQUFaO0FBQ0EsVUFBT0MsUUFBUUMsT0FBUixDQUFnQnRCLElBQWhCLENBQVA7QUFDQTs7QUFFRCxTQUFPdUIsTUFBTSxrQkFBTixFQUEwQkMsSUFBMUIsQ0FBK0IsVUFBU0MsSUFBVCxFQUFlO0FBQ3BEekIsVUFBT3lCLEtBQUtDLElBQUwsRUFBUDtBQUNBLFVBQU8xQixJQUFQO0FBQ0EsR0FITSxDQUFQO0FBSUEsRUFWRDtBQVdBLENBZG9CLEVBQXJCOztBQWdCQTtBQUNBLElBQUkyQixvQkFBcUIsWUFBVztBQUNuQyxLQUFJM0IsT0FBTyxJQUFYOztBQUVBLFFBQU8sWUFBVztBQUNqQixNQUFJQSxJQUFKLEVBQVU7QUFDVG1CLFdBQVFDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBLFVBQU9DLFFBQVFDLE9BQVIsQ0FBZ0J0QixJQUFoQixDQUFQO0FBQ0E7O0FBRUQsU0FBT3VCLE1BQU0scUJBQU4sRUFBNkJDLElBQTdCLENBQWtDLFVBQVNDLElBQVQsRUFBZTtBQUN2RHpCLFVBQU95QixLQUFLQyxJQUFMLEVBQVA7QUFDQSxVQUFPMUIsSUFBUDtBQUNBLEdBSE0sQ0FBUDtBQUlBLEVBVkQ7QUFXQSxDQWR3QixFQUF6Qjs7QUFnQkE7QUFDQSxJQUFJNEIsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsSUFBVCxFQUFlQyxFQUFmLEVBQW1CO0FBQ3pDLFFBQU9QLE1BQU0sbURBQW1ETSxJQUFuRCxHQUEwRCxNQUExRCxHQUFtRUMsRUFBbkUsR0FBd0UsMkRBQTlFLEVBQTJJTixJQUEzSSxDQUFnSixVQUFTTyxDQUFULEVBQVk7QUFDbEssU0FBT0EsRUFBRUwsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0EsQ0FKRDs7QUFNQSx3REFBZTtBQUNkTSxRQUFPZCxhQURPO0FBRWRsRixXQUFVMkYsaUJBRkk7QUFHZGxFLFVBQVNtRTtBQUhLLENBQWYsQzs7Ozs7Ozs7OztBQzNDQTs7QUFVQTs7QUFFQTs7QUFFQTtBQUNlLFNBQVNLLFdBQVQsQ0FBcUJsQyxHQUFyQixFQUFtRDtBQUFBLEtBQXpCWCxPQUF5Qix1RUFBZixFQUFlO0FBQUEsS0FBWFksSUFBVyx1RUFBSixFQUFJO0FBQUEsS0FFN0RULGFBRjZELEdBSTNESCxPQUoyRCxDQUU3REcsYUFGNkQ7QUFBQSxLQUc3REMsYUFINkQsR0FJM0RKLE9BSjJELENBRzdESSxhQUg2RDtBQUFBLEtBTzdEUyxTQVA2RCxHQVMzREQsSUFUMkQsQ0FPN0RDLFNBUDZEO0FBQUEsS0FRN0RaLFdBUjZELEdBUzNEVyxJQVQyRCxDQVE3RFgsV0FSNkQ7OztBQVdqRSxLQUFNNkMsZUFBZSw4RkFBQWhFLENBQWMrQixTQUFkLENBQXJCO0FBQ0E7O0FBRUEsS0FBSWtDLFNBQVM1QyxhQUFiO0FBQ0EsS0FBSTZDLFNBQVM1QyxhQUFiOztBQUVBLEtBQU02QyxJQUFJSCxhQUFhbEUsR0FBYixDQUFpQixVQUFDTSxHQUFELEVBQVM7O0FBRW5DLE1BQU1nRSxRQUFRdkMsSUFBSS9CLEdBQUosQ0FBUSxtQkFBVzs7QUFFaEMsT0FBSXVFLFdBQVcsdUZBQUExRixDQUFPeUIsR0FBUCxDQUFmO0FBQ0EsT0FBSWtCLGFBQUosRUFBbUI7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsUUFBSS9CLFFBQVFtRCxlQUFSLEtBQTRCLElBQTVCLElBQ0EsdUZBQUEzRCxDQUFPUSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDc0QsYUFEL0IsSUFFQSx1RkFBQTFDLENBQU9ZLFFBQVF4QixLQUFmLENBQUQsR0FBMEIsQ0FBM0IsSUFBaUN1RCxhQUZuQyxFQUdHO0FBQ0YsWUFBTyxDQUFQO0FBQ0E7QUFDRCxJQVZELE1BVU87QUFDTixRQUFJMkMsVUFBUyx1RkFBQWxGLENBQU9xQixHQUFQLENBQWI7QUFDQSxRQUFJOEQsVUFBUyx1RkFBQXZGLENBQU95QixHQUFQLENBQWI7QUFDQSxRQUFJaUUsWUFBVyxLQUFmO0FBQ0E7O0FBRUQsVUFBTyx1RkFBQXBELENBQWU7QUFDcEJJLG1CQUFlNEMsTUFESztBQUVwQjNDLG1CQUFlNEMsTUFGSztBQUdwQjlDLGNBQVVpRCxRQUhVO0FBSXBCdEcsV0FBT3dCLFFBQVF4QixLQUpLO0FBS3BCdUMsVUFBTWYsUUFBUWU7QUFMTSxJQUFmLEVBTUhhLFdBTkcsQ0FBUDtBQVFBLEdBM0JhLEVBMkJYM0MsTUEzQlcsQ0EyQkosVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsVUFBVUQsSUFBSUMsQ0FBZDtBQUFBLEdBM0JJLENBQWQ7O0FBNkJBLFNBQU8wRixRQUFRLHdGQUFBL0QsQ0FBUUQsR0FBUixFQUFhLFNBQWIsRUFBd0IyQixTQUF4QixDQUFmO0FBQ0EsRUFoQ1MsQ0FBVjs7QUFrQ0E7QUFDQTtBQUNBLEtBQU11QyxJQUFJTixhQUFhbEUsR0FBYixDQUFpQixVQUFDTSxHQUFELEVBQVM7QUFDbkMsTUFBTW1FLGVBQWUsdUZBQUE1RixDQUFPeUIsR0FBUCxDQUFyQjs7QUFFQSxNQUFNb0UsSUFBSTNDLElBQUkvQixHQUFKLENBQVEsbUJBQVc7QUFDNUIsT0FBSXVFLFdBQVcsdUZBQUExRixDQUFPeUIsR0FBUCxDQUFmOztBQUVBLE9BQUlrQixhQUFKLEVBQW1CO0FBQ2xCLFFBQUkvQixRQUFRbUQsZUFBUixLQUE0QixJQUE1QixJQUNBLHVGQUFBM0QsQ0FBT1EsUUFBUXhCLEtBQWYsQ0FBRCxHQUEwQixDQUEzQixJQUFpQ3NELGFBRC9CLElBRUEsdUZBQUExQyxDQUFPWSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDdUQsYUFGbkMsRUFHRztBQUNGLFlBQU8sQ0FBUDtBQUNBO0FBQ0QsSUFQRCxNQU9PO0FBQ04sUUFBSTJDLFdBQVMsdUZBQUFsRixDQUFPcUIsR0FBUCxDQUFiO0FBQ0EsUUFBSThELFdBQVMsdUZBQUF2RixDQUFPeUIsR0FBUCxDQUFiO0FBQ0EsUUFBSWlFLGFBQVcsS0FBZjtBQUNBO0FBQ0QsT0FBRzlFLFFBQVFlLElBQVIsS0FBaUIsU0FBcEIsRUFBK0I7QUFDOUIsV0FBTyx1RkFBQVcsQ0FBZTtBQUNwQkksb0JBQWU0QyxNQURLO0FBRXBCM0Msb0JBQWU0QyxNQUZLO0FBR3BCOUMsZUFBVWlELFFBSFU7QUFJcEJ0RyxZQUFPd0IsUUFBUXhCLEtBSks7QUFLcEJ1QyxXQUFNO0FBTGMsS0FBZixFQU1IYSxXQU5HLENBQVA7QUFPQSxJQVJELE1BUU87QUFDTixXQUFPLHVGQUFBRixDQUFlO0FBQ3BCSSxvQkFBZTRDLE1BREs7QUFFcEIzQyxvQkFBZTRDLE1BRks7QUFHcEJuRyxZQUFPd0IsUUFBUXhCLEtBSEs7QUFJcEJ1QyxXQUFNO0FBSmMsS0FBZixFQUtKYSxXQUxJLENBQVA7QUFNQTtBQUNELEdBL0JTLEVBK0JQM0MsTUEvQk8sQ0ErQkEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsVUFBVUQsSUFBSUMsQ0FBZDtBQUFBLEdBL0JBLENBQVY7O0FBaUNBLFNBQU87QUFDTjZGLDZCQURNO0FBRU4zRCxVQUFPNEQsSUFBSSx3RkFBQW5FLENBQVFELEdBQVIsRUFBYSxTQUFiLEVBQXdCMkIsU0FBeEI7QUFGTCxHQUFQO0FBSUEsRUF4Q1MsQ0FBVjs7QUEwQ0M7QUFDRCxLQUFNMEMsSUFBSTVDLElBQUkvQixHQUFKLENBQVEsbUJBQVc7O0FBRTVCLE1BQUl3QixhQUFKLEVBQW1CO0FBQ2xCLE9BQUkvQixRQUFRbUQsZUFBUixLQUE0QixJQUE1QixJQUNBLHVGQUFBM0QsQ0FBT1EsUUFBUXhCLEtBQWYsQ0FBRCxHQUEwQixDQUEzQixJQUFpQ3NELGFBRC9CLElBRUEsdUZBQUExQyxDQUFPWSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDdUQsYUFGbkMsRUFHRztBQUNGLFdBQU8sQ0FBUDtBQUNBO0FBQ0QsR0FQRCxNQU9PO0FBQ04sT0FBSTJDLFdBQVMsS0FBYjtBQUNBLE9BQUlDLFdBQVMsS0FBYjtBQUNBO0FBQ0QsU0FBTyx1RkFBQWpELENBQWU7QUFDcEJJLGtCQUFlNEMsTUFESztBQUVwQjNDLGtCQUFlNEMsTUFGSztBQUdyQm5HLFVBQU93QixRQUFReEIsS0FITTtBQUlyQnVDLFNBQU1mLFFBQVFlO0FBSk8sR0FBZixFQUtKYSxXQUxJLENBQVA7QUFPQSxFQXBCUyxFQW9CUDNDLE1BcEJPLENBb0JBLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQVVELElBQUlDLENBQWQ7QUFBQSxFQXBCQSxDQUFWOztBQXNCQTtBQUNBLEtBQU1nRyxZQUFZSixFQUFFeEUsR0FBRixDQUFNLFVBQUM2RSxJQUFEO0FBQUEsU0FBVUEsS0FBSy9ELEtBQWY7QUFBQSxFQUFOLENBQWxCOztBQUVBO0FBQ0EsS0FBTWdFLFNBQVMsdUZBQUE3RixDQUFPb0YsRUFBRTlFLE1BQUYsQ0FBUyxDQUFDb0YsQ0FBRCxDQUFULEVBQWNDLFNBQWQsQ0FBUCxDQUFmOztBQUVBO0FBQ0EsS0FBTUcsT0FBT1AsRUFBRVEsSUFBRixDQUFPLGlCQUFTO0FBQzVCLFNBQU9DLE1BQU1uRSxLQUFOLElBQWVnRSxNQUF0QjtBQUNBLEVBRlksQ0FBYjs7QUFJQTtBQUNBLEtBQUlJLE1BQUo7QUFDQSxLQUFJSCxJQUFKLEVBQVU7QUFDVEcsV0FBU1YsRUFBRXBHLE1BQUYsQ0FBUyxVQUFDeUcsSUFBRDtBQUFBLFVBQVVBLEtBQUsvRCxLQUFMLEtBQWVnRSxNQUF6QjtBQUFBLEdBQVQsQ0FBVDtBQUNBOztBQUVEO0FBQ0EsUUFBTztBQUNOaEUsU0FBTyxzRkFBQUUsQ0FBTThELE1BQU4sRUFBYyxDQUFkLENBREQ7QUFFTmpDLFlBQVVrQyxPQUFPRyxPQUFPLENBQVAsRUFBVVQsWUFBakIsR0FBZ0M7QUFGcEMsRUFBUDs7QUFLQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDN0pEOztBQU9BO0FBQ0E7O0FBRWUsU0FBU1UsV0FBVCxDQUFxQm5DLElBQXJCLEVBQTJCaEIsSUFBM0IsRUFBaUM7QUFDL0MsTUFBTTdCLGFBQWEsOEZBQUFELENBQWM4QixLQUFLN0IsVUFBbkIsQ0FBbkI7QUFDQztBQUNBLE1BQU1pRixRQUFRakYsV0FBV0gsR0FBWCxDQUFlLFVBQUNxRixPQUFELEVBQWE7QUFDdEMsUUFBTUMsSUFBSSxrRkFBQXhDLENBQVUscUVBQVYsRUFBdUJFLElBQXZCLEVBQTZCO0FBQ3JDNUIsZUFBUztBQUNQRyx1QkFBZSx1RkFBQXRDLENBQU9vRyxPQUFQLENBRFI7QUFFUDdELHVCQUFlLHVGQUFBM0MsQ0FBT3dHLE9BQVA7QUFGUixPQUQ0QjtBQUtyQ3JEO0FBTHFDLEtBQTdCLENBQVY7QUFPQSxXQUFPc0QsSUFBSSx3RkFBQS9FLENBQVE4RSxPQUFSLEVBQWlCLEtBQWpCLEVBQXdCckQsS0FBSzdCLFVBQTdCLENBQVg7QUFDRCxHQVRXLENBQWQ7O0FBV0E7QUFDQSxNQUFNb0YsV0FBVyxrRkFBQXpDLENBQVUscUVBQVYsRUFBdUJFLElBQXZCLEVBQTZCO0FBQzVDd0MsZ0JBRDRDO0FBRTVDeEQ7QUFGNEMsR0FBN0IsQ0FBakI7O0FBS0E7QUFDQSxTQUFPakQsS0FBS2lDLEtBQUwsQ0FDSix1RkFBQS9CLENBQU9tRyxNQUFNN0YsTUFBTixDQUFhLENBQUNnRyxRQUFELENBQWIsQ0FBUCxDQUFELEdBQ0MsR0FGSSxJQUVHLEdBRlY7QUFHRCxDOzs7Ozs7Ozs7QUNsQ0Q7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFRZSxTQUFTRSxxQkFBVCxDQUErQjVCLElBQS9CLEVBQXFDQyxFQUFyQyxFQUF5QzlGLFFBQXpDLEVBQW1EO0FBQ2pFLFFBQU8saUVBQUEwSCxDQUFRakcsT0FBUixDQUFnQm9FLElBQWhCLEVBQXNCQyxFQUF0QixFQUEwQk4sSUFBMUIsQ0FBK0IsVUFBUy9ELE9BQVQsRUFBa0I7QUFDdkQsTUFBSUEsVUFBVUEsUUFBUWtHLFFBQVIsQ0FBaUIsQ0FBakIsQ0FBZCxDQUR1RCxDQUNwQjtBQUNuQyxNQUFJQyxPQUFPbkcsUUFBUW1HLElBQW5CLENBRnVELENBRTlCOztBQUV6QjtBQUNBLE1BQUlDLFdBQVcsd0ZBQUF4RyxDQUFRdUcsS0FBSzVGLEdBQUwsQ0FBUyxVQUFTOEYsR0FBVCxFQUFjO0FBQzdDLE9BQUlDLFlBQVksRUFBaEI7O0FBRUE7QUFDQSxPQUFJRCxJQUFJRSxjQUFKLElBQXNCRixJQUFJRSxjQUFKLENBQW1CQyxRQUE3QyxFQUF1RDtBQUN0REYsY0FBVUcsSUFBVixDQUFlLHlGQUFBcEksQ0FBU2dJLElBQUlFLGNBQUosQ0FBbUJDLFFBQTVCLEVBQXNDakksUUFBdEMsQ0FBZjtBQUNBOztBQUVEO0FBQ0EsT0FBSThILElBQUlLLElBQUosQ0FBU0MsVUFBVCxJQUF1Qk4sSUFBSUssSUFBSixDQUFTQyxVQUFULENBQW9COUgsTUFBcEIsR0FBNkIsQ0FBeEQsRUFBMkQ7QUFDMUR3SCxRQUFJSyxJQUFKLENBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQVNDLFNBQVQsRUFBb0I7QUFDL0MsU0FBSUEsVUFBVUMsRUFBZCxFQUFrQjtBQUNqQlIsZ0JBQVVHLElBQVYsQ0FBZSx5RkFBQXBJLENBQVN3SSxVQUFVQyxFQUFuQixFQUF1QnZJLFFBQXZCLENBQWY7QUFDQTtBQUNELEtBSkQ7QUFLQTs7QUFFRCxVQUFPK0gsU0FBUDtBQUNBLEdBbEJzQixDQUFSLENBQWY7O0FBcUJBO0FBQ0E7QUFDQSxNQUFJUywwQkFBMEIsb0dBQUF0SSxDQUFvQixDQUFwQixFQUF1QjJILFFBQXZCLENBQTlCO0FBQ0EsTUFBSVksd0JBQXdCLG9HQUFBdkksQ0FBb0IsQ0FBcEIsRUFBdUIySCxRQUF2QixDQUE1QixDQTdCdUQsQ0E2Qk87QUFDOUQsTUFBSWEsZUFBZSxJQUFuQjtBQUNBLE1BQUlDLGVBQWUsSUFBbkI7O0FBRUEsTUFBSUgsd0JBQXdCbEksTUFBeEIsS0FBbUMsQ0FBdkMsRUFBMEM7QUFBRTtBQUMzQ29JLGtCQUFlLHVGQUFBekgsQ0FBTyx3RkFBQUksQ0FBUW9ILHFCQUFSLENBQVAsQ0FBZjtBQUNBRSxrQkFBZSx1RkFBQTFILENBQU8sd0ZBQUFJLENBQVFvSCxxQkFBUixDQUFQLENBQWY7QUFDRDtBQUNDLEdBSkQsTUFJTztBQUNORCw2QkFBMEIsd0ZBQUFuSCxDQUFRLG9HQUFBbkIsQ0FBb0IsQ0FBcEIsRUFBdUIySCxRQUF2QixDQUFSLENBQTFCOztBQUdBO0FBQ0EsT0FBSWUsWUFBWSx1RkFBQS9ILENBQU8ySCx1QkFBUCxDQUFoQjtBQUNBLE9BQUlLLFlBQVksdUZBQUE1SCxDQUFPdUgsdUJBQVAsQ0FBaEI7O0FBRUE7QUFDQTtBQUNBLE9BQUlNLFlBQVlMLHNCQUFzQnpHLEdBQXRCLENBQTBCLFVBQVMrRyxDQUFULEVBQVk7QUFDckQsV0FBT0EsRUFBRXJJLE1BQUYsQ0FBUyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUM5QixTQUFJTyxjQUFjUixDQUFkLEVBQWlCa0ksU0FBakIsSUFBOEIxSCxjQUFjUCxDQUFkLEVBQWlCaUksU0FBakIsQ0FBbEMsRUFBK0Q7QUFDOUQsYUFBT2xJLENBQVA7QUFDQTtBQUNELFlBQU9DLENBQVA7QUFDQSxLQUxNLENBQVA7QUFNQSxJQVBlLENBQWhCOztBQVNBO0FBQ0E4SCxrQkFBZSx1RkFBQTdILENBQU8sQ0FBQytILFNBQUQsRUFBWXJILE1BQVosQ0FBbUJ1SCxTQUFuQixDQUFQLENBQWY7QUFDQUgsa0JBQWUsdUZBQUExSCxDQUFPLENBQUM0SCxTQUFELEVBQVl0SCxNQUFaLENBQW1CdUgsU0FBbkIsQ0FBUCxDQUFmO0FBQ0E7O0FBRUQsU0FBTyxDQUFDSCxZQUFELEVBQWVELFlBQWYsQ0FBUDtBQUNBLEVBOURNLENBQVA7QUErREEsQzs7Ozs7Ozs7Ozs7Ozs7O0FDN0VEOztBQVFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLFNBQVNNLE1BQVQsQ0FBZ0JoRSxJQUFoQixFQUFzQmhCLElBQXRCLEVBQTRCO0FBQzFDLEtBQU03QixhQUFhLDhGQUFBRCxDQUFjOEIsS0FBSzdCLFVBQW5CLENBQW5COztBQUVBLEtBQU04RyxjQUFjO0FBQ25CLFdBQVMsa0ZBQUFuRSxDQUFVLGdFQUFWLEVBQTBCRSxJQUExQixFQUFnQztBQUN4Q3dDLGVBRHdDO0FBRXhDeEQ7QUFGd0MsR0FBaEM7QUFEVSxFQUFwQjs7QUFPQSxLQUFNa0YsZ0JBQWdCL0csV0FBV0gsR0FBWCxDQUFlLFVBQUNxRixPQUFELEVBQWE7QUFDakQsTUFBTWYsUUFBUSxrRkFBQXhCLENBQVUsZ0VBQVYsRUFBMEJFLElBQTFCLEVBQWdDO0FBQzdDNUIsWUFBUztBQUNSRyxtQkFBZSx1RkFBQXRDLENBQU9vRyxPQUFQLENBRFA7QUFFUjdELG1CQUFlLHVGQUFBM0MsQ0FBT3dHLE9BQVA7QUFGUCxJQURvQztBQUs3Q3JEO0FBTDZDLEdBQWhDLENBQWQ7O0FBUUEsNkJBQ0UsNkZBQUF4QyxDQUFhNkYsT0FBYixDQURGLEVBQzBCZixRQUFRLHdGQUFBL0QsQ0FBUThFLE9BQVIsRUFBaUIsS0FBakIsRUFBd0JyRCxLQUFLN0IsVUFBN0IsQ0FEbEM7QUFHQSxFQVpxQixDQUF0Qjs7QUFlQSxLQUFNZ0gsVUFBVS9HLE9BQU9nSCxNQUFQLGdCQUFjLEVBQWQsRUFBa0JILFdBQWxCLDRCQUFrQ0MsYUFBbEMsR0FBaEI7QUFDQSxLQUFNRyxXQUFXakgsT0FBT0MsSUFBUCxDQUFZOEcsT0FBWixFQUFxQnpJLE1BQXJCLENBQTRCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQVV1SSxRQUFReEksQ0FBUixJQUFhd0ksUUFBUXZJLENBQVIsQ0FBYixHQUEwQkQsQ0FBMUIsR0FBOEJDLENBQXhDO0FBQUEsRUFBNUIsQ0FBakI7O0FBRUEsNEJBQ0V5SSxRQURGLEVBQ2FGLFFBQVFFLFFBQVIsQ0FEYjtBQUdBLEM7Ozs7Ozs7O0FDOUNEO0FBQUE7Ozs7Ozs7OztBQVNBOztBQUtlLFNBQVN4RixlQUFULENBQ2RELGNBRGMsRUFDRUQsU0FERixFQUVkSixhQUZjLEVBRUNDLGFBRkQsRUFHZEgsV0FIYyxFQUdEYixJQUhDLEVBR0s7QUFDbkIsUUFBTyx1RkFBQXZCLENBQU8sQ0FDYix3RkFBQXNCLENBQVEsQ0FBQ3FCLGNBQUQsRUFBaUJELFNBQWpCLENBQVIsRUFBcUNuQixJQUFyQyxFQUEyQ2EsV0FBM0MsQ0FEYSxFQUVaLHdGQUFBZCxDQUFRLENBQUNxQixjQUFELEVBQWtCTCxnQkFBZ0IsQ0FBbEMsQ0FBUixFQUErQ2YsSUFBL0MsRUFBcURhLFdBQXJELElBQW9FLHdGQUFBZCxDQUFRLENBQUVpQixnQkFBZ0IsQ0FBbEIsRUFBc0JHLFNBQXRCLENBQVIsRUFBMENuQixJQUExQyxFQUFnRGEsV0FBaEQsQ0FGeEQsQ0FBUCxDQUFQO0FBSUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkQ7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0U7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQUFxRSxDQUFRMUIsS0FBUixHQUFnQlIsSUFBaEIsQ0FBcUIsVUFBUzhELFFBQVQsRUFBbUI7QUFDdEMsTUFBSWpHLGNBQWNpRyxTQUFTakcsV0FBM0I7QUFDQSxNQUFJWSxZQUFZcUYsU0FBU3JGLFNBQXpCOztBQUlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUYsTUFBTXhDLFVBQVUsQ0FDWjtBQUNFeEIsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRTJFLHFCQUFpQixJQUZuQjtBQUdFcEMsVUFBTTtBQUhSLEdBRFksRUFNWjtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRTJFLHFCQUFpQixLQUZuQjtBQUdFcEMsVUFBTTtBQUhSLEdBTlksQ0FBaEI7O0FBYUkyQyxVQUFRQyxHQUFSLENBQ0EscUdBQUFhLENBQ0V4RSxPQURGLEVBRUU7QUFDRThCLG1CQUFlLENBRGpCO0FBRUVDLG1CQUFlO0FBRmpCLEdBRkYsRUFLSztBQUNDUyx3QkFERCxFQUNZO0FBQ1haO0FBRkQsR0FMTCxDQURBOztBQVlFOEIsVUFBUUMsR0FBUixDQUNOLGdHQUFBdEIsQ0FDVXJDLE9BRFYsRUFFUTtBQUNBOEIsbUJBQWUsQ0FEZjtBQUVBQyxtQkFBZTtBQUZmLEdBRlIsRUFLVTs7QUFFQVMsd0JBRkEsRUFFVztBQUNYWjtBQUhBLEdBTFYsQ0FETTtBQWVMLENBblFELEUiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NDI0YjBkOGJiYzA3YjVjYmJjMCIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBQcmVsb2FkcyBzdGFydCB6b25lIGFzIDEgYW5kIGNoYW5nZXMgdG8gMS14IGZvciBKU09OIGZpbGUgcmVhZGluZ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB6b25lIHhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJzEteCdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHpvbmVUb0pvdXJuZXkoem9uZSkge1xuICByZXR1cm4gam91cm5leVRvS2V5KFsxLCB6b25lXSk7XG59XG5cbi8qKlxuICogVHVybnMgXCIxLTJcIiBpbnRvIFsxLCAyXVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gLSBrZXk6IFwiMS0yXCJcbiAqIEByZXR1cm5zIHthcnJheX0gLSBbMSwgMl1cbiAqIEBkZXNjcmlwdGlvbiAtIE9wcG9zaXRlIG9mIGpvdXJuZXlUb0tleVxuICovXG5leHBvcnQgZnVuY3Rpb24ga2V5VG9Kb3VybmV5KGtleSkge1xuICByZXR1cm4ga2V5LnNwbGl0KCctJykuc29ydCgpLm1hcChudW0gPT4gcGFyc2VJbnQobnVtKSk7XG59XG5cbi8qKlxuICogR2V0cyBrZXlzIGZyb20gd2Vla2x5Q2FwcywgbWFwcyBvdmVyIHRoZW0gdG8gZ2VuZXJhdGUgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHt3ZWVrbHlDYXBzfSAtIHRoZSB3ZWVrbHlDYXBzIGRhdGEgZnJvbSBmYXJlcy5qc29uXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhcnJheSBvZiBhcnJheXMgW1sxLCAyXSwgWzEsIDNdIGV0Y11cbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9Kb3VybmV5KHdlZWtseUNhcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHdlZWtseUNhcHMpLm1hcCgoY2FwKSA9PiBrZXlUb0pvdXJuZXkoY2FwKSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSAtIGtleSBpcyBhbiBhcnJheSBvZiB0d28gem9uZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGlzIG9mZlBlYWsgb3IgYW55dGltZSwgb3Igbm90aGluZyBpZiBub3QgbmVlZGVkIChlLmcuIGZvciB3ZWVrbHkgY2FwcylcbiAqIEBwYXJhbSB7ZGF0YX0gdGhlIEpTT04gZGF0YSBmaWxlIHdpdGggZmFyZSBvYmplY3RzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIC8gd2Vla2x5IGNhcCAvIGRhaWx5IGNhcCBmcm9tIGZhcmVzLmpzb25cbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmV4cG9ydCBjb25zdCBnZXRGYXJlID0gKGtleSwgdHlwZSwgY2FwcykgPT4ge1xuICBjb25zdCBmYXJlID0gY2Fwc1trZXkuY29uc3RydWN0b3IgPT09IEFycmF5ID8gam91cm5leVRvS2V5KGtleSkgOiB6b25lVG9Kb3VybmV5KGtleSldO1xuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9ICh2YWx1ZSwgdGFyZ2V0KSA9PiB2YWx1ZSA+PSB0YXJnZXQ7XG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGhvd2V2ZXIgbWFueSBkZWNpbWFsIHBsYWNlcyBzcGVjaWZpZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGFyZ2V0IHZhbHVlIHRvIHJvdW5kXG4gKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbHMgLSB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHJlc3VsdCBzaG91bGQgaGF2ZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgZGVjaW1hbHMpIHtcbsKgwqDCoHJldHVybiBOdW1iZXIoYCR7TWF0aC5yb3VuZChgJHt2YWx1ZX1lJHtkZWNpbWFsc31gKX1lLSR7ZGVjaW1hbHN9YCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdEZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Rk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcCkgLS0gdW5sZXNzIHlvdSBhZGQgaW4gTWF4RGFpbHlcbi8vICAvLyB0aGlzIGlzIG92ZXJseSBjb21wbGljYXRlZCBmb3IgZGFpbHkgY2FwcyAoYXMgb25seSBkZWFscyB3aXRoIHpvbmUgMSB0byB4KSBidXQgc3RpbGwgd29ya3MuIFJFTElFUyBPTiBUSEUgRkFDVCBEQUlMWSBBTFdBWVMgU1RBUlRTIEFUIDFcbi8vICAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuLy8gYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbi8vIGRlYnVnZ2VyO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuICBsZXQgbWluU2luZ2xlID0gem9uZXNbMF07XG4gIGxldCBtYXhTaW5nbGUgPSB6b25lc1sxXTtcbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXG5cdGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuXHQgXHRpZiAobWF4RGFpbHkgPj0gKG1pblRyYXZlbGNhcmQgLSAxKSkgeyAvLyBpZiBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdCAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy8gc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcbi8vIGVsc2UgaWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8sIGFuZCB0aGVyZSBhcmUgZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZCwgaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyAvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGlmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdCAvLyBkZWJ1Z2dlcjtcblx0XHRyZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gc3BsaXRPckZ1bGxGYXJlKFxuICAgICAgbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvLyBib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gMDtcbiBcdC8vIGJvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH1cblxuXG4gIHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuLy8gRUxTRSBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgdG90YWwgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcbiAgbWluTnVtLFxuICBtYXhOdW0sXG4gIGdldEZhcmUsXG4gIG1ldCxcbiAgem9uZVRvSm91cm5leVxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cbiAgY29uc3Qge1xuICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHtcbiAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgIHNpbmdsZUZhcmVzLCAvL0pTT05cbiAgfSA9IGRhdGE7XG4gICAgXG4gIGNvbnN0IHAgPSBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcbiAgICBsZXQgc2luZ2xlRmFyZSA9IGdldEZhcmUoYi56b25lcywgYi50eXBlLCBzaW5nbGVGYXJlcyk7XG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcbiAgICBsZXQgbWF4Wm9uZSA9IG1heE51bShbXS5jb25jYXQoYS5tYXhab25lLCBiLnpvbmVzKSk7XG5cbiAgICBsZXQgb2ZmUGVha1JlYWNoZWRQcmUgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha1JlYWNoZWQgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha01heFpvbmUgPSBhLm9mZlBlYWtNYXhab25lO1xuICAgIGxldCBhbnl0aW1lUmVhY2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gRk9SIFdFRUtMWVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe3pvbmVzOiBiLnpvbmVzLCB0eXBlOiBiLnR5cGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmR9LCBzaW5nbGVGYXJlcyk7XG4gICAgICBcbiAgICAgIC8vIGR1YWwgdG8gZHVhbCBzdGF0aW9uczogaWYgbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmUgPTwgbWF4IGR1YWwgem9uZSB6b25lXG4gICAgICAvLyA9ID4gdGhlbiBjaGFuZ2VzIGR1YWwgdG8gZHVhbCAgc3RhdGlvbnMgdG8gbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmVcbiAgICAgIGlmIChiLmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAoKChtaW5OdW0oYi56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcbiAgICAgICAgKCgobWF4TnVtKGIuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG4gICAgICAgICkge1xuICAgICAgICBzaW5nbGVGYXJlID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKG1pblRyYXZlbGNhcmQgPiAxICYmIG1ldChtYXhUcmF2ZWxjYXJkLCBtYXhab25lKSAmJiBtZXQobWF4Wm9uZSwgbWluVHJhdmVsY2FyZCAtIDEpKSB7XG4gICAgICAgIG1heFpvbmUgPSBtaW5UcmF2ZWxjYXJkIC0gMTsgLy8oaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gbWF4Wm9uZSAtIHJlbW92ZXMgb3ZlcmxhcCB3aXRoIHdlZWtseSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJyZW50VG90YWwgPSBhLmN1cnJlbnRUb3RhbCArIHNpbmdsZUZhcmU7XG5cbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycpIHtcbiAgICAgIC8vb2ZmIHBlYWsgdG90YWwgZ2V0cyB1cGRhdGVkIGFuZCBpZiBuZWVkZWQgb3ZlcnJpZGRlbiB3aXRoIG9mZnBlYWsgZGFpbHkgY2FwXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUpID49IGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpKSB7XG4gICAgICAgIG9mZlBlYWtSZWFjaGVkUHJlID0gdHJ1ZTtcbiAgICAgICAgb2ZmUGVha1RvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2Fwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZQZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICAgIH1cblxuICAgICAgLy9vZmZQZWFrVG90YWwgPSBtaW5OdW0oW29mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUsIGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpXSk7XG5cbiAgICAgIC8vIGN1cnJlbnQgdG90YWwgaXMgdXBkYXRlZCBpZiBuZWVkZWQgdG8gYmUgb2ZmIHBlYWsgdG90YWwgKyBwcmV2aW91cyBwZWFrIHRvdGFsIGZvciBvZmYgcGVhayB0cmF2ZWxcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgcGVha1RvdGFsKSA8PSBjdXJyZW50VG90YWwpIHtcbiAgICAgICAgLy9pZiB0aGlzIGNvbmRpdGlvbiBhbmQgdGhlIGFib3ZlIGNvbmRpdGlvbnMgYXJlIGJvdGggbWV0IChpZSBhIGN1cnJlbnQgb3IgcHJldmlvdXNvZmZwZWFrIGRhaWx5IGNhcCBhcHBsaWVkIHRvIGN1cnJlbnR0b3RhbCksIHNldCB0cnVlXG4gICAgICAgIGlmIChvZmZQZWFrUmVhY2hlZFByZSkge1xuICAgICAgICAgIG9mZlBlYWtSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICBvZmZQZWFrTWF4Wm9uZSA9IG1heFpvbmU7XG4gICAgICAgICAgLy8gcmV0dXJuIHRoZSBtYXggem9uZSBmb3Igb2ZmIHBlYWsgY2FwXG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFRvdGFsID0gb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsO1xuICAgICAgfVxuXG4gICAgICAvL2N1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWxdKTtcblxuICAgICAgLy9vdGhlcndpc2UgZm9yIHBlYWsgdHJhdmVsIHRoZSBwZWFrIHRvdGFsIGlzIHVwZGF0ZWQgaW4gcHJlcGFyYXRpb24gZm9yIG5leHQgcm91bmRcbiAgICB9IGVsc2Uge1xuICAgICAgcGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgfVxuXG4gICAgLy9pZiBuZWVkZWQgY3VycmVudCB0b3RhbCBpcyB0b3RhbGx5IG92ZXJyaWRkZW4gYnkgYW55dGltZSBkYWlseSBjYXBcbiAgICBpZiAoY3VycmVudFRvdGFsID4gKGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpKSkge1xuICAgICAgLy9pZiB0aGlzIGlzIHRoZSBjYXNlLCBvZmYgcGVhayByZWFjaGVkIHdpbGwgdGhlbiBiZSBzZXQgdG8gZmFsc2UgdmlhIGFueXRpbWVyZWFjaGVkIChhcyBhbnl0aW1lIGFwcGxpZWQgbm90IG9mZiBwZWFrIGNhcClcbiAgICAgIGFueXRpbWVSZWFjaGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuICAgIH1cblxuICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFRvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgcGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICAgIG9mZlBlYWtNYXhab25lLFxuICAgICAgLy9lbnN1cmVzIHRoYXQgcHJldmlvdXMgb2ZmIHBlYWsgY2FwcyBhcHBsaWVkIHByZXZpb3VzIHRvIGZ1dHVyZSBsb29wcyAtIGlmIHRydWUsIHN0YXlzIHRydWVcbiAgICAgIG9mZlBlYWtSZWFjaGVkOiAoYS5vZmZQZWFrUmVhY2hlZCAmJiAhYW55dGltZVJlYWNoZWQpID8gdHJ1ZSA6IG9mZlBlYWtSZWFjaGVkLFxuICAgIH07XG5cbiAgfSwge1xuICAgIGN1cnJlbnRUb3RhbDogMCxcbiAgICBvZmZQZWFrVG90YWw6IDAsXG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG1heFpvbmU6IG51bGwsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgdmFsdWU6IHAuY3VycmVudFRvdGFsLFxuICAgIGNhcElzTWV0OiBwLm9mZlBlYWtSZWFjaGVkID8gcC5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsImltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlZWtUb3RhbChwYXltZW50RnVuY3Rpb24sIGRheXMsIGluZm8pIHtcbiAgcmV0dXJuIGRheXMubWFwKChkYXkpID0+IHBheW1lbnRGdW5jdGlvbihkYXksIGluZm8ub3B0aW9ucywgaW5mby5kYXRhKSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdC8vIGlmIGwgaXMgYSBkYWlseSBvZmYgcGVhayBjYXAgYmV0d2VlbiAxLTQsIDEtNSBvciAxLTYsIGZvciA+IDJ4IGEgd2VlaywgdGhlbiByZWZ1bmRcblx0ICAvLyB3ZWVrIGZ1bmN0aW9uIHRvIHNlZSBpZiBvZmYgcGVhayBjYXAgbWV0IGFuZCBtYXggem9uZSBiZXR3ZWVuIDQtNjogaWYgdHJ1ZSBmb3IgMisgYSB3ZWVrLCBhcHBseSBhIGRpc2NvdW50XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL193ZWVrVG90YWwuanMiLCIvKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xudmFyIGZldGNoU3RhdGlvbnNEYXRhID0gKGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG52YXIgZmV0Y2hKb3VybmV5RGF0YSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZmFyZXM6IGZldGNoRmFyZURhdGEsXG5cdHN0YXRpb25zOiBmZXRjaFN0YXRpb25zRGF0YSxcblx0am91cm5leTogZmV0Y2hKb3VybmV5RGF0YSxcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxuICByb3VuZCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gSWYgdGhlIG9mZnBlYWsgY2FwIGlzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcblxuLy8gVGhpcyBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgb3Igbm8gZGFpbHkgY2FwIGZvciBlYWNoIGRheSB0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGFueSB3ZWVrbHkgY2FwcyBwYXNzZWQgaW5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblx0ICBjb25zdCB7XG5cdCAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgfSA9IG9wdGlvbnM7XG5cblx0ICBjb25zdCB7XG5cdCAgICBkYWlseUNhcHMsIC8vSlNPTlxuXHQgICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuXHQgIH0gPSBkYXRhO1xuXG5cdGNvbnN0IGFsbERhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGFpbHlDYXBzKTtcblx0Ly8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXG5cdGxldCBjb25NaW4gPSBtaW5UcmF2ZWxjYXJkO1xuXHRsZXQgY29uTWF4ID0gbWF4VHJhdmVsY2FyZDtcblxuXHRjb25zdCB0ID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cblx0XHRjb25zdCB0b3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHRcdGxldCBjb25EYWlseSA9IG1heE51bShjYXApO1xuXHRcdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdFx0Ly8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcblx0XHRcdFx0Ly8gPSA+IHRoZW4gY2hhbmdlcyBkdWFsIHRvIGR1YWwgIHN0YXRpb25zIHRvIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lXG5cdFx0XHRcdC8vIFRISVMgSVMgRFVQTElDQVRFRCB4MyAtLSByZWZhY3RvclxuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGNvbk1pbiA9IG1pbk51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uTWF4ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25EYWlseSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdCBcdFx0bWF4RGFpbHk6IGNvbkRhaWx5LFxuXHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0IFx0XHR0eXBlOiBqb3VybmV5LnR5cGUsXG5cdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuXHR9KTtcblxuXHQvLyBmb3IgY2hlYXBlc3QgbWl4IHBlYWsgam91cm5leXMgKyBlYWNoIGRhaWx5IG9mZiBwZWFrIGNhcFxuXHQvLyBuZWVkIGEgZmxhZyBmb3Igb2ZmIHBlYWsgY2FwIGJldHdlZW4gMS00LCAxLTUgb3IgMS02XG5cdGNvbnN0IGwgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCBtYXhab25lSW5DYXAgPSBtYXhOdW0oY2FwKTtcblx0XHRcblx0XHRjb25zdCBjID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHRcdGxldCBjb25EYWlseSA9IG1heE51bShjYXApO1xuXG5cdFx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGNvbk1pbiA9IG1pbk51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uTWF4ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25EYWlseSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoam91cm5leS50eXBlID09PSAnb2ZmUGVhaycpIHtcblx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHQgXHRcdG1heERhaWx5OiBjb25EYWlseSxcblx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHQgXHRcdHR5cGU6ICdvZmZQZWFrJyxcblx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdCBcdFx0dHlwZTogJ2FueXRpbWUnLFxuXHRcdFx0XHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHR9XG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bWF4Wm9uZUluQ2FwLFxuXHRcdFx0dmFsdWU6IGMgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgeCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29uTWluID0gZmFsc2U7XG5cdFx0XHRsZXQgY29uTWF4ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHQvLyBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBsIHZhbHVlcyAob3V0IG9mIHRoZSBvYmplY3QpXG5cdGNvbnN0IGxUb1ZhbHVlcyA9IGwubWFwKChsVmFsKSA9PiBsVmFsLnZhbHVlKTtcblxuXHQvLyBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBtaW5BbGwgPSBtaW5OdW0odC5jb25jYXQoW3hdLCBsVG9WYWx1ZXMpKTtcblxuXHQvLyBldmFsdWF0ZXMgaWYgYW55IG9mIHRoZSBsIHZhbHVlcyBpcyBlcXVhbCB0byB0aGUgY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgaXNFcSA9IGwuc29tZShlbnRyeSA9PiB7XG5cdFx0cmV0dXJuIGVudHJ5LnZhbHVlID09IG1pbkFsbDtcblx0fSk7XG5cblx0Ly8gaWYgYWJvdmUgaXMgbWV0LCB0aGVuIGZpbmQgdGhlIG1heCBjYXAgd2l0aGluIHRoZSBvYmplY3QgdGhhdCBtYXRjaGVzIHdpdGggdGhlIGNoZWFwZXN0IHZhbHVlXG5cdHZhciBjYXBWYWw7XG5cdGlmIChpc0VxKSB7XG5cdFx0Y2FwVmFsID0gbC5maWx0ZXIoKGxWYWwpID0+IGxWYWwudmFsdWUgPT09IG1pbkFsbCk7XG5cdH1cblxuXHQvLyByZXR1cm5zIGFuIG9iamVjdDogdGhlIGNoZWFwZXN0IHZhbHVlLCB3aGV0aGVyIG9mZiBwZWFrIGNhcCBpcyBtZXQgKGlmIHNvIHdpbGwgYmUgdGhlIG1heCBvZmYgcGVhayB6b25lKVxuXHRyZXR1cm4ge1xuXHRcdHZhbHVlOiByb3VuZChtaW5BbGwsIDIpLFxuXHRcdGNhcElzTWV0OiBpc0VxID8gY2FwVmFsWzBdLm1heFpvbmVJbkNhcCA6IGZhbHNlLFxuXHR9O1xuXG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiaW1wb3J0IHtcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFjdGxlc3MoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuICAvLyBtYXBzIG92ZXIgYWxsIHRoZSBwb3NzaWJsZSB3ZWVrbHkgY2FwcyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2Ygd2Vla2x5IGNhcCArIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKVxuIFx0Y29uc3QgZmluYWwgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuICAgICAgY29uc3QgeSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHkgKyBnZXRGYXJlKHdlZWtDYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpO1xuICAgIH0pO1xuXG4gIC8vIGdldHMgdGhlIGZhcmUgZm9yIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcCkgd2l0aCBubyB3ZWVrbHkgdHJhdmVsY2Fyc1xuICBjb25zdCBub1dlZWtseSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuXHQgIFx0ZmFsc2UsXG5cdCAgXHRkYXRhLFxuXHQgIH0pO1xuXG4gIC8vIGZpbmFsIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gY29udGFjdGxlc3NcbiAgcmV0dXJuIE1hdGgucm91bmQoXG4gIFx0XHQobWluTnVtKGZpbmFsLmNvbmNhdChbbm9XZWVrbHldKSkpXG4gIFx0KiAxMDAgKS8gMTAwO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3MuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsImltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG4vLyBORUVEIFRPOlxuLy8gQWRkIG9mZiBwZWFrIGRpc2NvdW50IGlmIHJlYWNoZWQgYW55dGltZSBjYXAgdHdpY2UgZWFjaCB3ZWVrIGJ0d2VlbiAxLTQgb3IgMS02XG4vLyBEVUFMIFRPIERVQUwgU1RBVElPTiBaT05JTkcgQUxURVJBVElPTlNcblxuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdGNvbnN0IG5vQ2FwUmVzdWx0ID0ge1xuXHRcdCdub0NhcCc6IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0ZmFsc2UsXG5cdFx0XHRkYXRhLFxuXHRcdH0pXG5cdH07XG5cblx0Y29uc3QgY2Fwc1Jlc3VsdFByZSA9IHdlZWtseUNhcHMubWFwKCh3ZWVrQ2FwKSA9PiB7XG5cdFx0Y29uc3QgdG90YWwgPSB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuXHRcdFx0XHRtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YSxcblx0XHR9KTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRbam91cm5leVRvS2V5KHdlZWtDYXApXTogdG90YWwgKyBnZXRGYXJlKHdlZWtDYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cblx0Y29uc3QgYWxsQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIG5vQ2FwUmVzdWx0LCAuLi5jYXBzUmVzdWx0UHJlKTtcblx0Y29uc3QgY2hlYXBlc3QgPSBPYmplY3Qua2V5cyhhbGxDYXBzKS5yZWR1Y2UoKGEsIGIpID0+IGFsbENhcHNbYV0gPCBhbGxDYXBzW2JdID8gYSA6IGIpO1xuXG5cdHJldHVybiB7XG5cdFx0W2NoZWFwZXN0XTogYWxsQ2Fwc1tjaGVhcGVzdF1cblx0fTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzLCB0eXBlKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cdFx0KGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpICsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpKVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuXHRtZXQsXG4gIGtleXNUb0pvdXJuZXksXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IG95c3RlciBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXInO1xuaW1wb3J0IGNvbnRhY3RsZXNzIGZyb20gJy4vcGFydGlhbHMvX2NvbnRhY3RsZXNzJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fd2Vla1RvdGFsJztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vcGFydGlhbHMvX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIGRvIG1vcmUgdGVzdHNcblxuLy9NT05USExZIC0gTkIgaXMgdGhhdCA0IHdlZWtzIG9yIDMxLzMwIGRheXMgb3IgY2FsZW5kYXIgbW9udGg/XG5cbi8vIGRhaWx5IG9mZnBlYWsvYW55dGltZSBjYXBwaW5nIGNoYW5nZXM6XG4vLyB0aW1lIG9mIHRyYXZlbCB0byBiZSBhcHBsaWVkIGFzIGFuIGFydWdtZW50OiBlYXJseSwgbW9ybmluZywgYWZ0ZXJub29uLCBsYXRlXG4vL1RyYXZlbCB3ZWVrZGF5IGVhcmx5ICBkb2VzbnQgY291bnQgdG93YXJkcyBvZmYgcGVhayBjYXAsIG9ubHkgYW55dGltZSBidXQgaXMgb2ZmIHBlYWsgc2luZ2xlIGZhcmVzXG4vLyB0cmF2ZWwgd2Vla2RheSAocGVhayB0aW1lKSBhZnRlcm5vb24gY291bnRzIHRvd2FyZHMgYW5kIGlzIGNvdmVyZWQgYnkgdGhlIG9mZiBwZWFrL2FueXRpbWUgY2FwLCBidXQgaXMgcGVhayBzaW5nbGUgZmFyZXNcbi8vIG1vcm5pbmcgaXMgcGVhayAmIGFueXRpbWUgZGFpbHkgY2FwIC8gbGF0ZSBpcyBvZmYgcGVhayAmIG9mZiBwZWFrL2FueXRpbWUgZGFpbHkgY2FwXG5cbi8vYXV0b21hdGljIG9mZiBwZWFrIHdlZWtseSByZWZ1bmRzOlxuICAvLyB3ZWVrIGZ1bmN0aW9uIHRvIHNlZSBpZiBvZmYgcGVhayBjYXAgbWV0IGFuZCBtYXggem9uZSBiZXR3ZWVuIDQtNjogaWYgdHJ1ZSBmb3IgMisgYSB3ZWVrLCBhcHBseSBhIGRpc2NvdW50XG5cbi8vIEFkZCB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyXG4vLyBDQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vLyBBUEkgSEFORExJTkdcbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG5cblxuLy8gY29uc3QgZGF5cyA9IFtcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdGltZTogXCJtb3JuaW5nXCIsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyAgICAgW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICBdLFxuLy8gICBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyAgIFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyAgIFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICBdLFxuLy8gICAgIFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgIF0sXG4gXG4vLyBdO1xuXG4vLyAgIGNvbnNvbGUubG9nKFxuLy8gICAgIGNvbnRhY3RsZXNzKGRheXMsIGZhcmVEYXRhKVxuLy8gICApO1xuXG4gIC8vIGZpbmFsIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gb3lzdGVyXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIG95c3RlcihkYXlzLCBmYXJlRGF0YSlcbiAgLy8gKTtcblxuY29uc3Qgam91cm5leSA9IFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF07XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICBjb25EYXlUb3RhbChcbiAgICAgIGpvdXJuZXksXG4gICAgICB7XG4gICAgICAgIG1pblRyYXZlbGNhcmQ6IDMsXG4gICAgICAgIG1heFRyYXZlbGNhcmQ6IDQsXG4gICAgICB9LCB7XG4gICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgICAgICAgICBzaW5nbGVGYXJlc1xuICAgICAgICB9KVxuICApO1xuXG4gICAgICBjb25zb2xlLmxvZyhcbm95c3RlckRheVRvdGFsKFxuICAgICAgICAgIGpvdXJuZXksXG4gICAgICAgIHtcbiAgICAgICAgbWluVHJhdmVsY2FyZDogMyxcbiAgICAgICAgbWF4VHJhdmVsY2FyZDogNCxcbiAgICAgICB9LCB7XG4gICAgICAgICBcbiAgICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgICAgICAgIHNpbmdsZUZhcmVzXG4gICAgICAgIH0pXG4gICk7XG5cblxuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==