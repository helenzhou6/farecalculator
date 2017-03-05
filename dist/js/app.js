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
/* harmony export (immutable) */ __webpack_exports__["c"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["b"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["h"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["d"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return met; });
/* harmony export (immutable) */ __webpack_exports__["g"] = round;
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
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(b.zones, b.type, singleFares);
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([].concat(a.maxZone, b.zones));

    var offPeakReachedPre = false;
    var offPeakReached = false;
    var offPeakMaxZone = a.offPeakMaxZone;
    var anytimeReached = false;

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({ zones: b.zones, type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }

      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      //off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps);
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
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      //if this is the case, off peak reached will then be set to false via anytimereached (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps);
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
	var numOffPeakCapZ4 = 0;
	var numOffPeakCapZ6 = 0;

	var weekTotalFare = days.map(function (day) {

		//for each day add together the total day total
		var dayObject = paymentFunction(day, info.options, info.data);

		if (dayObject.capIsMet == 4) {
			numOffPeakCapZ4 += 1;
			// What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
		} else if (dayObject.capIsMet == 6) {
			numOffPeakCapZ6 += 1;
		}
		return dayObject.value;

		//returns the current week total
	}).reduce(function (a, b) {
		return a + b;
	});

	// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if (numOffPeakCapZ4 + numOffPeakCapZ6 >= 2) {
		weekTotalFare -= numOffPeakCapZ4 * 0.4 + numOffPeakCapZ6 * 2.1;
	}

	return weekTotalFare;
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


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(dailyCaps);
	// gets cheapest daily anytime cap

	var conMin = minTravelcard;
	var conMax = maxTravelcard;

	var t = allDailyCaps.map(function (cap) {

		var total = day.map(function (journey) {

			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);
			if (maxTravelcard) {
				// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
				// = > then changes dual to dual  stations to min weekly travelcard zone
				// THIS IS DUPLICATED x3 -- refactor
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap);
				var _conMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);
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

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	// need a flag for off peak cap between 1-4, 1-5 or 1-6
	var l = allDailyCaps.map(function (cap) {
		var maxZoneInCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);

		var c = day.map(function (journey) {
			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap);
				var _conMax2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);
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
			value: c + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// for no daily caps
	var x = day.map(function (journey) {

		if (maxTravelcard) {
			if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
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
	var minAll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(t.concat([x], lToValues));

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
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* round */])(minAll, 2),
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* filterZonesByNumber */])(1, allZones));

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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(3);
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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

  var days = [[{
    zones: [1, 2],
    dualZoneOverlap: false,
    time: "morning",
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
    dualZoneOverlap: true,
    type: "offPeak"
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }]];

  var offPeakRefund4 = [{
    zones: [2, 4],
    dualZoneOverlap: true,
    type: "anytime"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "anytime"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 2],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }];

  console.log("contactless = " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__partials_contactless__["a" /* default */])(days, fareData));

  // final cheapest weekly charge on oyster
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oyster__["a" /* default */])(days, fareData));

  // const journey = [
  //     {
  //       zones: [2, 2],
  //       dualZoneOverlap: true,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [2, 2],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //   ];

  //     console.log(
  //     conDayTotal(
  //       journey,
  //       {
  //         minTravelcard: 3,
  //         maxTravelcard: 4,
  //       }, {
  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

  //       console.log(
  // oysterDayTotal(
  //           journey,
  //         {
  //         minTravelcard: 3,
  //         maxTravelcard: 4,
  //        }, {

  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDE0NWUzM2ViZjk0YzgyODJkNzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0Iiwicm91bmQiLCJkZWNpbWFscyIsIk51bWJlciIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsInNpbmdsZUZhcmVzIiwibWF4RGFpbHkiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJveXN0ZXJEYXlUb3RhbCIsImRheSIsImRhdGEiLCJkYWlseUNhcHMiLCJwIiwiY3VycmVudFRvdGFsIiwic2luZ2xlRmFyZSIsIm9mZlBlYWtUb3RhbCIsInBlYWtUb3RhbCIsIm1heFpvbmUiLCJvZmZQZWFrUmVhY2hlZFByZSIsIm9mZlBlYWtSZWFjaGVkIiwib2ZmUGVha01heFpvbmUiLCJhbnl0aW1lUmVhY2hlZCIsImR1YWxab25lT3ZlcmxhcCIsImNhcElzTWV0Iiwid2Vla1RvdGFsIiwicGF5bWVudEZ1bmN0aW9uIiwiZGF5cyIsImluZm8iLCJudW1PZmZQZWFrQ2FwWjQiLCJudW1PZmZQZWFrQ2FwWjYiLCJ3ZWVrVG90YWxGYXJlIiwiZGF5T2JqZWN0IiwiZmV0Y2hGYXJlRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiY29uRGF5VG90YWwiLCJhbGxEYWlseUNhcHMiLCJjb25NaW4iLCJjb25NYXgiLCJ0IiwidG90YWwiLCJjb25EYWlseSIsImwiLCJtYXhab25lSW5DYXAiLCJjIiwieCIsImxUb1ZhbHVlcyIsImxWYWwiLCJtaW5BbGwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY29udGFjdGxlc3MiLCJmaW5hbCIsIndlZWtDYXAiLCJ5Iiwibm9XZWVrbHkiLCJmYWxzZSIsImdldFNpbmdsZUpvdXJuZXlab25lcyIsImdldERhdGEiLCJqb3VybmV5cyIsImxlZ3MiLCJhbGxab25lcyIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwicGF0aCIsInN0b3BQb2ludHMiLCJmb3JFYWNoIiwic3RvcFBvaW50IiwiaWQiLCJ6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsInNpbmdsZU1heCIsInNpbmdsZU1pbiIsImR1YWxab25lcyIsInoiLCJveXN0ZXIiLCJub0NhcFJlc3VsdCIsImNhcHNSZXN1bHRQcmUiLCJhbGxDYXBzIiwiYXNzaWduIiwiY2hlYXBlc3QiLCJmYXJlRGF0YSIsInRpbWUiLCJvZmZQZWFrUmVmdW5kNCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7Ozs7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LENBQVl2QyxJQUFaLEVBQWtCMEUsUUFBbEIsQ0FEckI7O0FBSUE7QUFDQW5FLFVBQVFDLEdBQVIsQ0FDRSx3RkFBQTRELENBQU9wRSxJQUFQLEVBQWEwRSxRQUFiLENBREY7O0FBSUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBSUMsQ0ExU0QsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAxNDVlMzNlYmY5NGM4MjgyZDc3IiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIFByZWxvYWRzIHN0YXJ0IHpvbmUgYXMgMSBhbmQgY2hhbmdlcyB0byAxLXggZm9yIEpTT04gZmlsZSByZWFkaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHpvbmUgeFxuICogQHJldHVybnMge3N0cmluZ30gLSAnMS14J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuLyoqXG4gKiBUdXJucyBcIjEtMlwiIGludG8gWzEsIDJdXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSAtIGtleTogXCIxLTJcIlxuICogQHJldHVybnMge2FycmF5fSAtIFsxLCAyXVxuICogQGRlc2NyaXB0aW9uIC0gT3Bwb3NpdGUgb2Ygam91cm5leVRvS2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlUb0pvdXJuZXkoa2V5KSB7XG4gIHJldHVybiBrZXkuc3BsaXQoJy0nKS5zb3J0KCkubWFwKG51bSA9PiBwYXJzZUludChudW0pKTtcbn1cblxuLyoqXG4gKiBHZXRzIGtleXMgZnJvbSB3ZWVrbHlDYXBzLCBtYXBzIG92ZXIgdGhlbSB0byBnZW5lcmF0ZSBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3dlZWtseUNhcHN9IC0gdGhlIHdlZWtseUNhcHMgZGF0YSBmcm9tIGZhcmVzLmpzb25cbiAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFycmF5IG9mIGFycmF5cyBbWzEsIDJdLCBbMSwgM10gZXRjXVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0pvdXJuZXkod2Vla2x5Q2Fwcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMod2Vla2x5Q2FwcykubWFwKChjYXApID0+IGtleVRvSm91cm5leShjYXApKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IC0ga2V5IGlzIGFuIGFycmF5IG9mIHR3byB6b25lc1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgaXMgb2ZmUGVhayBvciBhbnl0aW1lLCBvciBub3RoaW5nIGlmIG5vdCBuZWVkZWQgKGUuZy4gZm9yIHdlZWtseSBjYXBzKVxuICogQHBhcmFtIHtkYXRhfSB0aGUgSlNPTiBkYXRhIGZpbGUgd2l0aCBmYXJlIG9iamVjdHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgLyB3ZWVrbHkgY2FwIC8gZGFpbHkgY2FwIGZyb20gZmFyZXMuanNvblxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEZhcmUgPSAoa2V5LCB0eXBlLCBjYXBzKSA9PiB7XG4gIGNvbnN0IGZhcmUgPSBjYXBzW2tleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBqb3VybmV5VG9LZXkoa2V5KSA6IHpvbmVUb0pvdXJuZXkoa2V5KV07XG4gIHJldHVybiB0eXBlID8gZmFyZVt0eXBlXSA6IGZhcmU7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBudW1lcmljIHRhcmdldCBoYXMgYmVlbiBtZXQgb3Igc3VycGFzc2VkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQgLSB0YXJnZXQgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0IHRoZSB0YXJnZXRcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgY29uc3QgbWV0ID0gKHZhbHVlLCB0YXJnZXQpID0+IHZhbHVlID49IHRhcmdldDtcblxuLyoqXG4gKiBSb3VuZHMgYSBudW1iZXIgdG8gaG93ZXZlciBtYW55IGRlY2ltYWwgcGxhY2VzIHNwZWNpZmllZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0YXJnZXQgdmFsdWUgdG8gcm91bmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFscyAtIHRoZSBudW1iZXIgb2YgZGVjaW1hbHMgcmVzdWx0IHNob3VsZCBoYXZlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKHZhbHVlLCBkZWNpbWFscykge1xuwqDCoMKgcmV0dXJuIE51bWJlcihgJHtNYXRoLnJvdW5kKGAke3ZhbHVlfWUke2RlY2ltYWxzfWApfWUtJHtkZWNpbWFsc31gKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsImltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1heE51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBzcGxpdE9yRnVsbEZhcmUgZnJvbSAnLi9fc3BsaXRPckZ1bGxGYXJlJztcblxuLy8gLyoqXG4vLyAgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7b2JqZWN0fSBzZWUgYmVsb3dcbi8vICAqIEBwYXJhbSB7c2luZ2xlRmFyZXN9IHVzZXMgdGhlIHNpbmdsZUZhcmVzIGpzb24gZGF0YVxuLy8gICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBleHRlbnNpb24gZmFyZSBmb3IgdGhlIGpvdXJuZXlcbi8vICAqIEBkZXNjcmlwdGlvblxuLy9cbi8vIFx0Rk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuLy8gXHRGT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMpIHtcbiAgY29uc3QgbWF4RGFpbHkgPSBvcHRpb25zLm1heERhaWx5IHx8IG51bGw7XG4vLyBieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuXG5cdGxldCB7XG5cdFx0em9uZXMsXG5cdFx0dHlwZSxcbiAgICBcdG1pblRyYXZlbGNhcmQsIC8vIG1pbmltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdG1heFRyYXZlbGNhcmQsIC8vbWF4aW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0Ly8gaWYgbWF4ZGFpbHkgYWxzbyBpbnZvbHZlZCAoZm9yIGNvbnRhY3RsZXNzIHdlZWtseSBhbmQgZGFpbHkgY29tYm8pOiBzbyB0aGF0IGl0IG9ubHkgY2hhcmdlcyB0aGUgZ2FwIHpvbmVzXG5cdH0gPSBvcHRpb25zO1xuXHQvLyBzYW1lIGFzIHZhciBtaW5TaW5nbGUgPSBvcHRpb25zLm1pblNpbmdsZTtcblxuLy8gZGVidWdnZXI7XG4gIGxldCBmaW5hbENvbmRpdGlvbiA9IG51bGw7XG4gIGxldCBtaW5TaW5nbGUgPSB6b25lc1swXTtcbiAgbGV0IG1heFNpbmdsZSA9IHpvbmVzWzFdO1xuICBsZXQgbWluQ2hhcmdlZFpvbmUgPSBtaW5TaW5nbGU7XG5cblx0aWYgKG1heERhaWx5KSB7IC8vIElmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvIChoZW5jZSBhZGRpbmcgaW4gbWF4RGFpbHkgYXMgYXJndW1lbnRfXG5cdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0ICBcdG1pblRyYXZlbGNhcmQgPSAxOyAvLyBzaW5jZSBhbnl0aW1lIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMVxuXHQgICBcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IC8vIG1heCB0cmF2ZWxjYXJkIGlzIHdoaWNoZXZlciBpcyBsYXJnZXN0IG1heCBkYWlseSBvciBtYXggdHJhdmVsY2FyZFxuLy8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdH0gZWxzZSB7IC8vIElGIGRpZmZlcmVuY2UgYncgbWluIHdlZWtseSBhbmQgbWF4IGRhaWx5IGNhcCA+IDEgLS0gVEhFTiBUSEVSRSBBUkUgR0FQIFpPTkVTXG5cdFx0XHRcdG1pbkNoYXJnZWRab25lID0gKChtaW5TaW5nbGUgPD0gbWF4RGFpbHkpID8gbWF4RGFpbHkgKyAxIDogbWluU2luZ2xlKTtcblx0XHRcdFx0ZmluYWxDb25kaXRpb24gPSAobWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaWYgbWluIHNpbmdsZSBpc250IHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnRcblx0aWYgKChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0IC8vIGRlYnVnZ2VyO1xuXHRcdHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udCBhbmQgZW5kXG4gXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBzcGxpdE9yRnVsbEZhcmUoXG4gICAgICBtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuIFx0XHRcdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG4gXHRcdFx0c2luZ2xlRmFyZXMsIHR5cGUpO1xuXG5cdC8vIGJvdGggc2luZ2xlIHpvbmVzIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSB8fCBmaW5hbENvbmRpdGlvbikge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiAwO1xuIFx0Ly8gYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fVxuXG5cbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG4vLyBFTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7Y29tcGxleCBqb3VybmV5cyBvYmplY3R9IGpvdXJuZXlzIC0gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSB0b3RhbCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuICBtaW5OdW0sXG4gIG1heE51bSxcbiAgZ2V0RmFyZSxcbiAgbWV0LFxuICB6b25lVG9Kb3VybmV5XG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcbiAgICBcbiAgY29uc3QgcCA9IGRheS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBsZXQgY3VycmVudFRvdGFsO1xuICAgIGxldCBzaW5nbGVGYXJlID0gZ2V0RmFyZShiLnpvbmVzLCBiLnR5cGUsIHNpbmdsZUZhcmVzKTtcbiAgICBsZXQgb2ZmUGVha1RvdGFsID0gYS5vZmZQZWFrVG90YWw7XG4gICAgbGV0IHBlYWtUb3RhbCA9IGEucGVha1RvdGFsO1xuICAgIGxldCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcblxuICAgIGxldCBvZmZQZWFrUmVhY2hlZFByZSA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrUmVhY2hlZCA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrTWF4Wm9uZSA9IGEub2ZmUGVha01heFpvbmU7XG4gICAgbGV0IGFueXRpbWVSZWFjaGVkID0gZmFsc2U7XG5cbiAgICAvLyBGT1IgV0VFS0xZXG4gICAgaWYgKG1heFRyYXZlbGNhcmQpIHtcbiAgICAgIHNpbmdsZUZhcmUgPSBleHRlbnNpb25GYXJlcyh7em9uZXM6IGIuem9uZXMsIHR5cGU6IGIudHlwZSwgbWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZH0sIHNpbmdsZUZhcmVzKTtcbiAgICAgIFxuICAgICAgLy8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcbiAgICAgIC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuICAgICAgaWYgKGIuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgICAgICgoKG1pbk51bShiLnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICAgICAoKChtYXhOdW0oYi56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICAgICAgKSB7XG4gICAgICAgIHNpbmdsZUZhcmUgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAobWluVHJhdmVsY2FyZCA+IDEgJiYgbWV0KG1heFRyYXZlbGNhcmQsIG1heFpvbmUpICYmIG1ldChtYXhab25lLCBtaW5UcmF2ZWxjYXJkIC0gMSkpIHtcbiAgICAgICAgbWF4Wm9uZSA9IG1pblRyYXZlbGNhcmQgLSAxOyAvLyhpZSBvbmx5IGNvbXBhcmVzIGFnYWluc3QgZGFpbHkgY2FwIG9mIG1pblNpbmdsZSB0byBtYXhab25lIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRUb3RhbCA9IGEuY3VycmVudFRvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIGlmIChiLnR5cGUgPT09ICdvZmZQZWFrJykge1xuICAgICAgLy9vZmYgcGVhayB0b3RhbCBnZXRzIHVwZGF0ZWQgYW5kIGlmIG5lZWRlZCBvdmVycmlkZGVuIHdpdGggb2ZmcGVhayBkYWlseSBjYXBcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSkgPj0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcykpIHtcbiAgICAgICAgb2ZmUGVha1JlYWNoZWRQcmUgPSB0cnVlO1xuICAgICAgICBvZmZQZWFrVG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZlBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgICAgfVxuXG4gICAgICAvL29mZlBlYWtUb3RhbCA9IG1pbk51bShbb2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSwgZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcyldKTtcblxuICAgICAgLy8gY3VycmVudCB0b3RhbCBpcyB1cGRhdGVkIGlmIG5lZWRlZCB0byBiZSBvZmYgcGVhayB0b3RhbCArIHByZXZpb3VzIHBlYWsgdG90YWwgZm9yIG9mZiBwZWFrIHRyYXZlbFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBwZWFrVG90YWwpIDw9IGN1cnJlbnRUb3RhbCkge1xuICAgICAgICAvL2lmIHRoaXMgY29uZGl0aW9uIGFuZCB0aGUgYWJvdmUgY29uZGl0aW9ucyBhcmUgYm90aCBtZXQgKGllIGEgY3VycmVudCBvciBwcmV2aW91c29mZnBlYWsgZGFpbHkgY2FwIGFwcGxpZWQgdG8gY3VycmVudHRvdGFsKSwgc2V0IHRydWVcbiAgICAgICAgaWYgKG9mZlBlYWtSZWFjaGVkUHJlKSB7XG4gICAgICAgICAgb2ZmUGVha1JlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIG9mZlBlYWtNYXhab25lID0gbWF4Wm9uZTtcbiAgICAgICAgICAvLyByZXR1cm4gdGhlIG1heCB6b25lIGZvciBvZmYgcGVhayBjYXBcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VG90YWwgPSBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWw7XG4gICAgICB9XG5cbiAgICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbF0pO1xuXG4gICAgICAvL290aGVyd2lzZSBmb3IgcGVhayB0cmF2ZWwgdGhlIHBlYWsgdG90YWwgaXMgdXBkYXRlZCBpbiBwcmVwYXJhdGlvbiBmb3IgbmV4dCByb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICBwZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICB9XG5cbiAgICAvL2lmIG5lZWRlZCBjdXJyZW50IHRvdGFsIGlzIHRvdGFsbHkgb3ZlcnJpZGRlbiBieSBhbnl0aW1lIGRhaWx5IGNhcFxuICAgIGlmIChjdXJyZW50VG90YWwgPiAoZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcykpKSB7XG4gICAgICAvL2lmIHRoaXMgaXMgdGhlIGNhc2UsIG9mZiBwZWFrIHJlYWNoZWQgd2lsbCB0aGVuIGJlIHNldCB0byBmYWxzZSB2aWEgYW55dGltZXJlYWNoZWQgKGFzIGFueXRpbWUgYXBwbGllZCBub3Qgb2ZmIHBlYWsgY2FwKVxuICAgICAgYW55dGltZVJlYWNoZWQgPSB0cnVlO1xuICAgICAgY3VycmVudFRvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG4gICAgfVxuXG4gICAgLy9jdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcyldKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VG90YWwsXG4gICAgICBvZmZQZWFrVG90YWwsXG4gICAgICBwZWFrVG90YWwsXG4gICAgICBtYXhab25lLFxuICAgICAgb2ZmUGVha01heFpvbmUsXG4gICAgICAvL2Vuc3VyZXMgdGhhdCBwcmV2aW91cyBvZmYgcGVhayBjYXBzIGFwcGxpZWQgcHJldmlvdXMgdG8gZnV0dXJlIGxvb3BzIC0gaWYgdHJ1ZSwgc3RheXMgdHJ1ZVxuICAgICAgb2ZmUGVha1JlYWNoZWQ6IChhLm9mZlBlYWtSZWFjaGVkICYmICFhbnl0aW1lUmVhY2hlZCkgPyB0cnVlIDogb2ZmUGVha1JlYWNoZWQsXG4gICAgfTtcblxuICB9LCB7XG4gICAgY3VycmVudFRvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBwZWFrVG90YWw6IDAsXG4gICAgbWF4Wm9uZTogbnVsbCxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICB2YWx1ZTogcC5jdXJyZW50VG90YWwsXG4gICAgY2FwSXNNZXQ6IHAub2ZmUGVha1JlYWNoZWQgPyBwLm9mZlBlYWtNYXhab25lIDogZmFsc2UsXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwiaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Vla1RvdGFsKHBheW1lbnRGdW5jdGlvbiwgZGF5cywgaW5mbykge1xuXHRsZXQgbnVtT2ZmUGVha0NhcFo0ID0gMDtcblx0bGV0IG51bU9mZlBlYWtDYXBaNiA9IDA7XG5cblx0bGV0IHdlZWtUb3RhbEZhcmUgPSBkYXlzLm1hcChmdW5jdGlvbiAoZGF5KSB7IFxuXG5cdCAgXHQvL2ZvciBlYWNoIGRheSBhZGQgdG9nZXRoZXIgdGhlIHRvdGFsIGRheSB0b3RhbFxuXHQgIFx0Y29uc3QgZGF5T2JqZWN0ID0gcGF5bWVudEZ1bmN0aW9uKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpO1xuXG5cdCAgXHRpZiAoZGF5T2JqZWN0LmNhcElzTWV0ID09IDQpIHtcblx0ICBcdFx0bnVtT2ZmUGVha0NhcFo0ICs9IDE7XG5cdCAgXHQvLyBXaGF0IGFib3V0IHJlZnVuZHMgaWYgdGhlIGNhcCBpcyBiZXR3ZWVuIHpvbmVzIDEtNT8/IGFuZCBpZiBkb2VzIG5vdCBhcHBseSAtIHRoZW4gY2hlYXBlciB0byBkbyBkaXNjb3VudGVkIHpvbmUgMS00IHBsdXMgZXh0ZW5zaW9uIGZhcmVzIHRvIDU/XG5cdCAgXHR9IGVsc2UgaWYgKGRheU9iamVjdC5jYXBJc01ldCA9PSA2KSB7XG5cdCAgXHRcdG51bU9mZlBlYWtDYXBaNiArPSAxO1xuXHQgIFx0fVxuXHQgXHRyZXR1cm4gZGF5T2JqZWN0LnZhbHVlO1xuXG5cdCAvL3JldHVybnMgdGhlIGN1cnJlbnQgd2VlayB0b3RhbFxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXG4gIC8vIHdlZWsgZnVuY3Rpb24gdG8gc2VlIGlmIG9mZiBwZWFrIGNhcCBtZXQgYW5kIG1heCB6b25lIGJldHdlZW4gNC02OiBpZiB0cnVlIGZvciAyKyBhIHdlZWssIGFwcGx5IGEgZGlzY291bnRcblx0aWYgKChudW1PZmZQZWFrQ2FwWjQgKyBudW1PZmZQZWFrQ2FwWjYpID49IDIpIHtcblx0ICB3ZWVrVG90YWxGYXJlIC09ICgobnVtT2ZmUGVha0NhcFo0ICogMC40KSArIChudW1PZmZQZWFrQ2FwWjYgKiAyLjEpKTtcblx0fVxuXG5cdHJldHVybiB3ZWVrVG90YWxGYXJlO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgZmxhdHRlbixcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbi8vIElmIHRoZSBvZmZwZWFrIGNhcCBpcyBtZXQsIHJldHVybiBhIHZhcmlhYmxlICdjYXBJc01ldCcgKyBtYXhab25lIG9mIHRoYXQgY2FwXG5cbi8vIFRoaXMgY2FsY3VsYXRlcyB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIG9yIG5vIGRhaWx5IGNhcCBmb3IgZWFjaCBkYXkgdGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBhbnkgd2Vla2x5IGNhcHMgcGFzc2VkIGluXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25EYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cdCAgY29uc3Qge1xuXHQgICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuXHQgICAgbWF4VHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuXHQgIH0gPSBvcHRpb25zO1xuXG5cdCAgY29uc3Qge1xuXHQgICAgZGFpbHlDYXBzLCAvL0pTT05cblx0ICAgIHNpbmdsZUZhcmVzLCAvL0pTT05cblx0ICB9ID0gZGF0YTtcblxuXHRjb25zdCBhbGxEYWlseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhaWx5Q2Fwcyk7XG5cdC8vIGdldHMgY2hlYXBlc3QgZGFpbHkgYW55dGltZSBjYXBcblxuXHRsZXQgY29uTWluID0gbWluVHJhdmVsY2FyZDtcblx0bGV0IGNvbk1heCA9IG1heFRyYXZlbGNhcmQ7XG5cblx0Y29uc3QgdCA9IGFsbERhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXG5cdFx0Y29uc3QgdG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXG5cdFx0XHRsZXQgY29uRGFpbHkgPSBtYXhOdW0oY2FwKTtcblx0XHRcdGlmIChtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0XHRcdC8vIGR1YWwgdG8gZHVhbCBzdGF0aW9uczogaWYgbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmUgPTwgbWF4IGR1YWwgem9uZSB6b25lXG5cdFx0XHRcdC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuXHRcdFx0XHQvLyBUSElTIElTIERVUExJQ0FURUQgeDMgLS0gcmVmYWN0b3Jcblx0XHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdFx0KCgobWluTnVtKGpvdXJuZXkuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG5cdFx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCBjb25NaW4gPSBtaW5OdW0oY2FwKTtcblx0XHRcdFx0bGV0IGNvbk1heCA9IG1heE51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uRGFpbHkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHQgXHRcdG1heERhaWx5OiBjb25EYWlseSxcblx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdCBcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0cmV0dXJuIHRvdGFsICsgZ2V0RmFyZShjYXAsICdhbnl0aW1lJywgZGFpbHlDYXBzKTtcblx0fSk7XG5cblx0Ly8gZm9yIGNoZWFwZXN0IG1peCBwZWFrIGpvdXJuZXlzICsgZWFjaCBkYWlseSBvZmYgcGVhayBjYXBcblx0Ly8gbmVlZCBhIGZsYWcgZm9yIG9mZiBwZWFrIGNhcCBiZXR3ZWVuIDEtNCwgMS01IG9yIDEtNlxuXHRjb25zdCBsID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0Y29uc3QgbWF4Wm9uZUluQ2FwID0gbWF4TnVtKGNhcCk7XG5cdFx0XG5cdFx0Y29uc3QgYyA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0XHRsZXQgY29uRGFpbHkgPSBtYXhOdW0oY2FwKTtcblxuXHRcdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdFx0KCgobWluTnVtKGpvdXJuZXkuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG5cdFx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCBjb25NaW4gPSBtaW5OdW0oY2FwKTtcblx0XHRcdFx0bGV0IGNvbk1heCA9IG1heE51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uRGFpbHkgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdFx0IFx0XHRtYXhEYWlseTogY29uRGFpbHksXG5cdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0IFx0XHR0eXBlOiAnb2ZmUGVhaycsXG5cdFx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBjb25NaW4sXG5cdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHQgXHRcdHR5cGU6ICdhbnl0aW1lJyxcblx0XHRcdFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0fVxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG1heFpvbmVJbkNhcCxcblx0XHRcdHZhbHVlOiBjICsgZ2V0RmFyZShjYXAsICdvZmZQZWFrJywgZGFpbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHRcdC8vIGZvciBubyBkYWlseSBjYXBzXG5cdGNvbnN0IHggPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXG5cdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbk1pbiA9IGZhbHNlO1xuXHRcdFx0bGV0IGNvbk1heCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IGpvdXJuZXkudHlwZSxcblx0XHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0Ly8gY3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgbCB2YWx1ZXMgKG91dCBvZiB0aGUgb2JqZWN0KVxuXHRjb25zdCBsVG9WYWx1ZXMgPSBsLm1hcCgobFZhbCkgPT4gbFZhbC52YWx1ZSk7XG5cblx0Ly8gY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgbWluQWxsID0gbWluTnVtKHQuY29uY2F0KFt4XSwgbFRvVmFsdWVzKSk7XG5cblx0Ly8gZXZhbHVhdGVzIGlmIGFueSBvZiB0aGUgbCB2YWx1ZXMgaXMgZXF1YWwgdG8gdGhlIGNoZWFwZXN0IHZhbHVlXG5cdGNvbnN0IGlzRXEgPSBsLnNvbWUoZW50cnkgPT4ge1xuXHRcdHJldHVybiBlbnRyeS52YWx1ZSA9PSBtaW5BbGw7XG5cdH0pO1xuXG5cdC8vIGlmIGFib3ZlIGlzIG1ldCwgdGhlbiBmaW5kIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHR2YXIgY2FwVmFsO1xuXHRpZiAoaXNFcSkge1xuXHRcdGNhcFZhbCA9IGwuZmlsdGVyKChsVmFsKSA9PiBsVmFsLnZhbHVlID09PSBtaW5BbGwpO1xuXHR9XG5cblx0Ly8gcmV0dXJucyBhbiBvYmplY3Q6IHRoZSBjaGVhcGVzdCB2YWx1ZSwgd2hldGhlciBvZmYgcGVhayBjYXAgaXMgbWV0IChpZiBzbyB3aWxsIGJlIHRoZSBtYXggb2ZmIHBlYWsgem9uZSlcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogcm91bmQobWluQWxsLCAyKSxcblx0XHRjYXBJc01ldDogaXNFcSA/IGNhcFZhbFswXS5tYXhab25lSW5DYXAgOiBmYWxzZSxcblx0fTtcblxuXHQvL2ZpbmFsbHkgc2VsZWN0cyBjaGVhcGVzdCBjaGVhcGVzdCBkYWlseSBjYXAgb3B0aW9uIGZvciBlYWNoIGRheSAoaW4gYSA3IGRheSBhcnJheSlcbn1cdFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsImltcG9ydCB7XG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpIHtcblx0Y29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcbiAgLy8gbWFwcyBvdmVyIGFsbCB0aGUgcG9zc2libGUgd2Vla2x5IGNhcHMgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHdlZWtseSBjYXAgKyBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcClcbiBcdGNvbnN0IGZpbmFsID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcbiAgICAgIGNvbnN0IHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB5ICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKTtcbiAgICB9KTtcblxuICAvLyBnZXRzIHRoZSBmYXJlIGZvciB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApIHdpdGggbm8gd2Vla2x5IHRyYXZlbGNhcnNcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcblx0ICBcdGZhbHNlLFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIGNvbnRhY3RsZXNzXG4gIHJldHVybiBNYXRoLnJvdW5kKFxuICBcdFx0KG1pbk51bShmaW5hbC5jb25jYXQoW25vV2Vla2x5XSkpKVxuICBcdCogMTAwICkvIDEwMDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2ZpbmFsTWluWm9uZSwgZmluYWxNYXhab25lXTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuLy8gTkVFRCBUTzpcbi8vIEFkZCBvZmYgcGVhayBkaXNjb3VudCBpZiByZWFjaGVkIGFueXRpbWUgY2FwIHR3aWNlIGVhY2ggd2VlayBidHdlZW4gMS00IG9yIDEtNlxuLy8gRFVBTCBUTyBEVUFMIFNUQVRJT04gWk9OSU5HIEFMVEVSQVRJT05TXG5cbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyKGRheXMsIGRhdGEpIHtcblx0Y29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcblxuXHRjb25zdCBub0NhcFJlc3VsdCA9IHtcblx0XHQnbm9DYXAnOiB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9O1xuXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHRvdGFsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleSh3ZWVrQ2FwKV06IHRvdGFsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXG5cdGNvbnN0IGFsbENhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBub0NhcFJlc3VsdCwgLi4uY2Fwc1Jlc3VsdFByZSk7XG5cdGNvbnN0IGNoZWFwZXN0ID0gT2JqZWN0LmtleXMoYWxsQ2FwcykucmVkdWNlKChhLCBiKSA9PiBhbGxDYXBzW2FdIDwgYWxsQ2Fwc1tiXSA/IGEgOiBiKTtcblxuXHRyZXR1cm4ge1xuXHRcdFtjaGVhcGVzdF06IGFsbENhcHNbY2hlYXBlc3RdXG5cdH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKSArIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcbiAgZ2V0RmFyZSxcblx0bWV0LFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb250YWN0bGVzcyBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzcyc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vcGFydGlhbHMvX3dlZWtUb3RhbCc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG4vLyBkbyBtb3JlIHRlc3RzXG5cbi8vTU9OVEhMWSAtIE5CIGlzIHRoYXQgNCB3ZWVrcyBvciAzMS8zMCBkYXlzIG9yIGNhbGVuZGFyIG1vbnRoP1xuXG4vLyBkYWlseSBvZmZwZWFrL2FueXRpbWUgY2FwcGluZyBjaGFuZ2VzOlxuLy8gdGltZSBvZiB0cmF2ZWwgdG8gYmUgYXBwbGllZCBhcyBhbiBhcnVnbWVudDogZWFybHksIG1vcm5pbmcsIGFmdGVybm9vbiwgbGF0ZVxuLy9UcmF2ZWwgd2Vla2RheSBlYXJseSAgZG9lc250IGNvdW50IHRvd2FyZHMgb2ZmIHBlYWsgY2FwLCBvbmx5IGFueXRpbWUgYnV0IGlzIG9mZiBwZWFrIHNpbmdsZSBmYXJlc1xuLy8gdHJhdmVsIHdlZWtkYXkgKHBlYWsgdGltZSkgYWZ0ZXJub29uIGNvdW50cyB0b3dhcmRzIGFuZCBpcyBjb3ZlcmVkIGJ5IHRoZSBvZmYgcGVhay9hbnl0aW1lIGNhcCwgYnV0IGlzIHBlYWsgc2luZ2xlIGZhcmVzXG4vLyBtb3JuaW5nIGlzIHBlYWsgJiBhbnl0aW1lIGRhaWx5IGNhcCAvIGxhdGUgaXMgb2ZmIHBlYWsgJiBvZmYgcGVhay9hbnl0aW1lIGRhaWx5IGNhcFxuXG4vL2F1dG9tYXRpYyBvZmYgcGVhayB3ZWVrbHkgcmVmdW5kczpcbiAgLy8gd2VlayBmdW5jdGlvbiB0byBzZWUgaWYgb2ZmIHBlYWsgY2FwIG1ldCBhbmQgbWF4IHpvbmUgYmV0d2VlbiA0LTY6IGlmIHRydWUgZm9yIDIrIGEgd2VlaywgYXBwbHkgYSBkaXNjb3VudFxuXG4vLyBBZGQgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlclxuLy8gQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gQVBJIEhBTkRMSU5HXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuICBsZXQgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcbiAgbGV0IGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2FwcztcblxuXG5cbmNvbnN0IGRheXMgPSBbXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHRpbWU6IFwibW9ybmluZ1wiLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICAgIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAgXSxcbiAgICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuIFxuXTtcblxuY29uc3Qgb2ZmUGVha1JlZnVuZDQgPSBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4vL2Fsc28gdGVzdHMgZm9yIGFsbCBvZmZwZWFrLCBhbGwgYW55dGltZSwgbW9zdCBhbnl0aW1lIDEgb2ZmcGVhayAmIHZpY2UgdmVyc2EsIDItNCB6b25lIGZpcnN0IGFuZCBsYXN0XG4gIF07XG5cbiAgY29uc29sZS5sb2coXG4gICAgXCJjb250YWN0bGVzcyA9IFwiICsgY29udGFjdGxlc3MoZGF5cywgZmFyZURhdGEpXG4gICk7XG5cbiAgLy8gZmluYWwgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSBvbiBveXN0ZXJcbiAgY29uc29sZS5sb2coXG4gICAgb3lzdGVyKGRheXMsIGZhcmVEYXRhKVxuICApO1xuXG4vLyBjb25zdCBqb3VybmV5ID0gW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMiwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMiwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgXTtcblxuLy8gICAgIGNvbnNvbGUubG9nKFxuLy8gICAgIGNvbkRheVRvdGFsKFxuLy8gICAgICAgam91cm5leSxcbi8vICAgICAgIHtcbi8vICAgICAgICAgbWluVHJhdmVsY2FyZDogMyxcbi8vICAgICAgICAgbWF4VHJhdmVsY2FyZDogNCxcbi8vICAgICAgIH0sIHtcbi8vICAgICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuLy8gICAgICAgICAgIHNpbmdsZUZhcmVzXG4vLyAgICAgICAgIH0pXG4vLyAgICk7XG5cbi8vICAgICAgIGNvbnNvbGUubG9nKFxuLy8gb3lzdGVyRGF5VG90YWwoXG4vLyAgICAgICAgICAgam91cm5leSxcbi8vICAgICAgICAge1xuLy8gICAgICAgICBtaW5UcmF2ZWxjYXJkOiAzLFxuLy8gICAgICAgICBtYXhUcmF2ZWxjYXJkOiA0LFxuLy8gICAgICAgIH0sIHtcbiAgICAgICAgIFxuLy8gICAgICAgICAgIGRhaWx5Q2FwcywgLy9KU09OXG4vLyAgICAgICAgICAgc2luZ2xlRmFyZXNcbi8vICAgICAgICAgfSlcbi8vICAgKTtcblxuXG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9