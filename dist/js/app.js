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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony export (immutable) */ __webpack_exports__["g"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["h"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["d"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["f"] = flatten;
/* unused harmony export journeyToKey */
/* unused harmony export getDailyCap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCap; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getSingleFare;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return met; });


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

function zoneToJourney(zone) {
  return journeyToKey([1, zone]);
}

/**
 * Gets the daily cap cost
 * @function
 * @param {number} - the (maximum) zone
 * @param {object} dailyCaps - looks at the dailyCaps object in the fares.json file
 * @returns {number} - gets the daily cap between zones 1 and the zone parameter (as daily caps always starts at zone 1)
 * @description
 */
function getDailyCap(maxZonesofar, dailyCaps, type) {
  return dailyCaps[journeyToKey([1, maxZonesofar])][type];
}

var getCap = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.curry(function (zone, caps) {
  return caps[zoneToJourney(zone)];
});

/**
 * Gets the single fare
 * @function
 * @param {array} journey - the array of the 2 zones travelling between
 * @param {object} singleFares - looks at the singleFares object in the fares.json file
 * @returns {number} - gets the single fare between those two zones
 * @description
 */
function getSingleFare(journey, singleFares, type) {
  //debugger;
  return singleFares[journeyToKey(journey)][type];
}

/**
 * Determines if a numeric target has been met or surpassed
 * @function
 * @param {number} target - target value to compare against
 * @param {number} value - the value to compare against the target
 * @description
 */
var met = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.curry(function (target, value) {
  return value >= target;
});

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(10).runInContext();
module.exports = __webpack_require__(7)(_, _);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(13);
/* unused harmony export default */




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
	var type = arguments[2];

	var maxDaily = options.maxDaily || null;
	// by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)

	var minSingle = options.minSingle,
	    maxSingle = options.maxSingle,
	    minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;
	// same as var minSingle = options.minSingle;

	var minChargedZone = minSingle;
	var finalCondition = null;

	if (maxDaily) {
		// If contactless, daily and weekly combo (hence adding in maxDaily as argument_
		if (maxDaily >= minTravelcard - 1) {
			// if no gap zones between max daily and min travelcard
			minTravelcard = 1; // since anytime daily caps always start at zone 1
			maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* maxNum */])([maxDaily, maxTravelcard]); // max travelcard is whichever is largest max daily or max travelcard
			// else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
		} else {
			// IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
			minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
			finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
		}
	}

	// if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
	if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares, type);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares, type);

		//if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type);

		// both single zones within travelcard zones
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard || finalCondition) {
		return 0;

		// both single zones are outside travelcard zones
	}
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares, type);
	// ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(1);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* flatten */])(legs.map(function (leg) {
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])([singleMin].concat(dualZones));
		}

		return [finalMinZone, finalMaxZone];
	});
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_utility__ = __webpack_require__(0);
/* unused harmony export default */




function oysterDayTotal(data) {
  var journeys = data.journeys,
      singleFares = data.singleFares,
      dailyCaps = data.dailyCaps;


  var peakTotal = 0;
  var offPeakTotal = 0;
  var maxZoneSoFar = null;

  // journeys.forEach(function (journey) {
  //   //Gets the maximum zones of alls the zones travelled in so far
  //   maxZoneSoFar = maxNum([].concat(journey.zones, maxZoneSoFar));
  //
  //   //adds the single fare to the cumulative total
  //   peakTotal += getSingleFare(journey.zones, singleFares); //FOR PEAK PAYG RATES;
  //   offPeakTotal += getSingleFare(journey.zones, singleFares); //FOR PEAK PAYG RATES
  //
  //   //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (!journey.peak && offPeakTotal >= getDailyCap(maxZoneSoFar, dailyCaps)) {
  //     offPeakTotal = getDailyCap(maxZoneSoFar, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
  //   }
  //
  //   //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (peakTotal >= getDailyCap(maxZoneSoFar, dailyCaps)) {
  //     peakTotal = getDailyCap(maxZoneSoFar, dailyCaps);
  //   }
  // });

  // return minNum([peakTotal, offPeakTotal]);

  // const totals = journeys.reduce(function(a, b) {
  //   const singleFareA = getSingleFare(a.zones, singleFares);
  //   const singleFareB = getSingleFare(b.zones, singleFares);
  //
  //   const running = (a.running ? a : {
  //       peakTotal: singleFareA,
  //       offPeakTotal: singleFareA,
  //       maxZone: a.zones,
  //   });
  //
  //   const current = {
  //     running: true,
  //     peakTotal: running.peakTotal + singleFareB,
  //     offPeakTotal: running.peakTotal + singleFareB,
  //     maxZone: maxNum([].concat(running.maxZone, b.zones)),
  //     zones: b.zones,
  //   };
  //
  //   //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (!a.peak && current.offPeakTotal >= getDailyCap(current.maxZone, dailyCaps)) {
  //     current.offPeakTotal = getDailyCap(current.maxZone, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
  //   }
  //
  //   //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (current.peakTotal >= getDailyCap(current.maxZone, dailyCaps)) {
  //     current.peakTotal = getDailyCap(current.maxZone, dailyCaps);
  //   }
  //
  //   return current;
  // }

  // var t = getDailyCap(2);
  //
  // debugger;

  var getDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* getCap */])(__WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a, dailyCaps);
  var capMet = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.compose(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* met */], getDailyCap);

  var totals = journeys.reduce(function (a, b) {
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* getSingleFare */])(b.zones, singleFares);
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* maxNum */])([].concat(a.maxZone, b.zones));
    var metDailyCap = capMet(maxZone);

    console.log(metDailyCap);
    debugger;

    var peakTotal = a.peakTotal + singleFare;
    var offPeakTotal = a.offPeakTotal + singleFare;

    //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
    if (!a.peak && metDailyCap(offPeakTotal)) {
      offPeakTotal = getDailyCap(maxZone); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
    }

    //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
    if (metDailyCap(peakTotal)) {
      peakTotal = getDailyCap(maxZone);
    }

    return {
      peakTotal: peakTotal,
      offPeakTotal: offPeakTotal,
      maxZone: maxZone
    };
  }, {
    peakTotal: 0,
    offPeakTotal: 0,
    maxZone: null
  });

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])([totals.peakTotal, totals.offPeakTotal]);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var mapping = __webpack_require__(8),
    fallbackHolder = __webpack_require__(9);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2 ? function (a, b) {
    return func.apply(undefined, arguments);
  } : function (a) {
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2 ? function (a, b) {
    return func(a, b);
  } : function (a) {
    return func(a);
  };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function (object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function () {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function () {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError();
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = 'curry' in options && options.curry,
      forceFixed = 'fixed' in options && options.fixed,
      forceRearg = 'rearg' in options && options.rearg,
      placeholder = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isFunction = helpers.isFunction,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function castArray(_castArray) {
      return function () {
        var value = arguments[0];
        return isArray(value) ? _castArray(cloneArray(value)) : _castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function iteratee(_iteratee) {
      return function () {
        var func = arguments[0],
            arity = arguments[1],
            result = _iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? arity - 2 : 1;
          return length && length <= arity ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function mixin(_mixin) {
      return function (source) {
        var func = this;
        if (!isFunction(func)) {
          return _mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function (key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        _mixin(func, Object(source));

        each(pairs, function (pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function nthArg(_nthArg) {
      return function (n) {
        var arity = n < 0 ? 1 : toInteger(n) + 1;
        return curry(_nthArg(n), arity);
      };
    },
    'rearg': function rearg(_rearg) {
      return function (func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(_rearg(func, indexes), arity);
      };
    },
    'runInContext': function runInContext(_runInContext) {
      return function (context) {
        return baseConvert(util, _runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return forceCurry || config.curry && n > 1 ? curry(func, n) : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]) ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n]) : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null) {
        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function (options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function (func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function (func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function () {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : length - 1;
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    } else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      } else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      } else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function (aryKey) {
      each(mapping.aryMethod[aryKey], function (otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey) : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function () {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function (aryKey) {
    each(mapping.aryMethod[aryKey], function (key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function (key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function (pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder;
  }
  // Assign aliases.
  each(keys(_), function (key) {
    each(mapping.realToAlias[key] || [], function (alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': ['assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create', 'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow', 'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll', 'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome', 'rest', 'reverse', 'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart', 'uniqueId', 'words', 'zipAll'],
  '2': ['add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith', 'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith', 'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN', 'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference', 'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq', 'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex', 'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get', 'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection', 'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy', 'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty', 'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit', 'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial', 'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll', 'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove', 'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex', 'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy', 'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight', 'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars', 'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith', 'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject', 'zipObjectDeep'],
  '3': ['assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith', 'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr', 'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith', 'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth', 'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd', 'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight', 'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy', 'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy', 'xorWith', 'zipWith'],
  '4': ['fill', 'setWith', 'updateWith']
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to track methods with placeholder support */
exports.placeholder = {
  'bind': true,
  'bindKey': true,
  'curry': true,
  'curryRight': true,
  'partial': true,
  'partialRight': true
};

/** Used to map real names to their aliases. */
exports.realToAlias = function () {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}();

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * Lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function () {
  function n(n, t) {
    return n.set(t[0], t[1]), n;
  }function t(n, t) {
    return n.add(t), n;
  }function r(n, t, r) {
    switch (r.length) {case 0:
        return n.call(t);case 1:
        return n.call(t, r[0]);case 2:
        return n.call(t, r[0], r[1]);case 3:
        return n.call(t, r[0], r[1], r[2]);}return n.apply(t, r);
  }function e(n, t, r, e) {
    for (var u = -1, i = null == n ? 0 : n.length; ++u < i;) {
      var o = n[u];t(e, o, r(o), n);
    }return e;
  }function u(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e && false !== t(n[r], r, n);) {}return n;
  }function i(n, t) {
    for (var r = null == n ? 0 : n.length; r-- && false !== t(n[r], r, n);) {}
    return n;
  }function o(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e;) {
      if (!t(n[r], r, n)) return false;
    }return true;
  }function f(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e;) {
      var o = n[r];t(o, r, n) && (i[u++] = o);
    }return i;
  }function c(n, t) {
    return !(null == n || !n.length) && -1 < d(n, t, 0);
  }function a(n, t, r) {
    for (var e = -1, u = null == n ? 0 : n.length; ++e < u;) {
      if (r(t, n[e])) return true;
    }return false;
  }function l(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e;) {
      u[r] = t(n[r], r, n);
    }return u;
  }function s(n, t) {
    for (var r = -1, e = t.length, u = n.length; ++r < e;) {
      n[u + r] = t[r];
    }return n;
  }function h(n, t, r, e) {
    var u = -1,
        i = null == n ? 0 : n.length;for (e && i && (r = n[++u]); ++u < i;) {
      r = t(r, n[u], u, n);
    }return r;
  }function p(n, t, r, e) {
    var u = null == n ? 0 : n.length;for (e && u && (r = n[--u]); u--;) {
      r = t(r, n[u], u, n);
    }return r;
  }function _(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e;) {
      if (t(n[r], r, n)) return true;
    }return false;
  }function v(n, t, r) {
    var e;return r(n, function (n, r, u) {
      if (t(n, r, u)) return e = r, false;
    }), e;
  }function g(n, t, r, e) {
    var u = n.length;for (r += e ? 1 : -1; e ? r-- : ++r < u;) {
      if (t(n[r], r, n)) return r;
    }return -1;
  }function d(n, t, r) {
    if (t === t) n: {
      --r;for (var e = n.length; ++r < e;) {
        if (n[r] === t) {
          n = r;break n;
        }
      }n = -1;
    } else n = g(n, b, r);return n;
  }function y(n, t, r, e) {
    --r;for (var u = n.length; ++r < u;) {
      if (e(n[r], t)) return r;
    }return -1;
  }function b(n) {
    return n !== n;
  }function x(n, t) {
    var r = null == n ? 0 : n.length;return r ? k(n, t) / r : P;
  }function j(n) {
    return function (t) {
      return null == t ? F : t[n];
    };
  }function w(n) {
    return function (t) {
      return null == n ? F : n[t];
    };
  }function m(n, t, r, e, u) {
    return u(n, function (n, u, i) {
      r = e ? (e = false, n) : t(r, n, u, i);
    }), r;
  }function A(n, t) {
    var r = n.length;for (n.sort(t); r--;) {
      n[r] = n[r].c;
    }return n;
  }function k(n, t) {
    for (var r, e = -1, u = n.length; ++e < u;) {
      var i = t(n[e]);i !== F && (r = r === F ? i : r + i);
    }return r;
  }function E(n, t) {
    for (var r = -1, e = Array(n); ++r < n;) {
      e[r] = t(r);
    }return e;
  }function O(n, t) {
    return l(t, function (t) {
      return [t, n[t]];
    });
  }function S(n) {
    return function (t) {
      return n(t);
    };
  }function I(n, t) {
    return l(t, function (t) {
      return n[t];
    });
  }function R(n, t) {
    return n.has(t);
  }function z(n, t) {
    for (var r = -1, e = n.length; ++r < e && -1 < d(t, n[r], 0);) {}return r;
  }function W(n, t) {
    for (var r = n.length; r-- && -1 < d(t, n[r], 0);) {}return r;
  }function B(n) {
    return "\\" + Tn[n];
  }function L(n) {
    var t = -1,
        r = Array(n.size);return n.forEach(function (n, e) {
      r[++t] = [e, n];
    }), r;
  }function U(n, t) {
    return function (r) {
      return n(t(r));
    };
  }function C(n, t) {
    for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
      var o = n[r];o !== t && "__lodash_placeholder__" !== o || (n[r] = "__lodash_placeholder__", i[u++] = r);
    }return i;
  }function D(n) {
    var t = -1,
        r = Array(n.size);return n.forEach(function (n) {
      r[++t] = n;
    }), r;
  }function M(n) {
    var t = -1,
        r = Array(n.size);return n.forEach(function (n) {
      r[++t] = [n, n];
    }), r;
  }function T(n) {
    if (Bn.test(n)) {
      for (var t = zn.lastIndex = 0; zn.test(n);) {
        ++t;
      }n = t;
    } else n = tt(n);return n;
  }function $(n) {
    return Bn.test(n) ? n.match(zn) || [] : n.split("");
  }var F,
      N = 1 / 0,
      P = NaN,
      Z = [["ary", 128], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]],
      q = /\b__p\+='';/g,
      V = /\b(__p\+=)''\+/g,
      K = /(__e\(.*?\)|\b__t\))\+'';/g,
      G = /&(?:amp|lt|gt|quot|#39);/g,
      H = /[&<>"']/g,
      J = RegExp(G.source),
      Y = RegExp(H.source),
      Q = /<%-([\s\S]+?)%>/g,
      X = /<%([\s\S]+?)%>/g,
      nn = /<%=([\s\S]+?)%>/g,
      tn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      rn = /^\w*$/,
      en = /^\./,
      un = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      on = /[\\^$.*+?()[\]{}|]/g,
      fn = RegExp(on.source),
      cn = /^\s+|\s+$/g,
      an = /^\s+/,
      ln = /\s+$/,
      sn = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      hn = /\{\n\/\* \[wrapped with (.+)\] \*/,
      pn = /,? & /,
      _n = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      vn = /\\(\\)?/g,
      gn = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      dn = /\w*$/,
      yn = /^[-+]0x[0-9a-f]+$/i,
      bn = /^0b[01]+$/i,
      xn = /^\[object .+?Constructor\]$/,
      jn = /^0o[0-7]+$/i,
      wn = /^(?:0|[1-9]\d*)$/,
      mn = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      An = /($^)/,
      kn = /['\n\r\u2028\u2029\\]/g,
      En = "[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*",
      On = "(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])" + En,
      Sn = "(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",
      In = RegExp("['\u2019]", "g"),
      Rn = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g"),
      zn = RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|" + Sn + En, "g"),
      Wn = RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)|\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)|\\d+", On].join("|"), "g"),
      Bn = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"),
      Ln = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Un = "Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),
      Cn = {};
  Cn["[object Float32Array]"] = Cn["[object Float64Array]"] = Cn["[object Int8Array]"] = Cn["[object Int16Array]"] = Cn["[object Int32Array]"] = Cn["[object Uint8Array]"] = Cn["[object Uint8ClampedArray]"] = Cn["[object Uint16Array]"] = Cn["[object Uint32Array]"] = true, Cn["[object Arguments]"] = Cn["[object Array]"] = Cn["[object ArrayBuffer]"] = Cn["[object Boolean]"] = Cn["[object DataView]"] = Cn["[object Date]"] = Cn["[object Error]"] = Cn["[object Function]"] = Cn["[object Map]"] = Cn["[object Number]"] = Cn["[object Object]"] = Cn["[object RegExp]"] = Cn["[object Set]"] = Cn["[object String]"] = Cn["[object WeakMap]"] = false;
  var Dn = {};Dn["[object Arguments]"] = Dn["[object Array]"] = Dn["[object ArrayBuffer]"] = Dn["[object DataView]"] = Dn["[object Boolean]"] = Dn["[object Date]"] = Dn["[object Float32Array]"] = Dn["[object Float64Array]"] = Dn["[object Int8Array]"] = Dn["[object Int16Array]"] = Dn["[object Int32Array]"] = Dn["[object Map]"] = Dn["[object Number]"] = Dn["[object Object]"] = Dn["[object RegExp]"] = Dn["[object Set]"] = Dn["[object String]"] = Dn["[object Symbol]"] = Dn["[object Uint8Array]"] = Dn["[object Uint8ClampedArray]"] = Dn["[object Uint16Array]"] = Dn["[object Uint32Array]"] = true, Dn["[object Error]"] = Dn["[object Function]"] = Dn["[object WeakMap]"] = false;var Mn,
      Tn = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" },
      $n = parseFloat,
      Fn = parseInt,
      Nn = (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global && global.Object === Object && global,
      Pn = (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self && self.Object === Object && self,
      Zn = Nn || Pn || Function("return this")(),
      qn = ( false ? "undefined" : _typeof(exports)) == "object" && exports && !exports.nodeType && exports,
      Vn = qn && ( false ? "undefined" : _typeof(module)) == "object" && module && !module.nodeType && module,
      Kn = Vn && Vn.exports === qn,
      Gn = Kn && Nn.process;
  n: {
    try {
      Mn = Gn && Gn.binding && Gn.binding("util");break n;
    } catch (n) {}Mn = void 0;
  }var Hn = Mn && Mn.isArrayBuffer,
      Jn = Mn && Mn.isDate,
      Yn = Mn && Mn.isMap,
      Qn = Mn && Mn.isRegExp,
      Xn = Mn && Mn.isSet,
      nt = Mn && Mn.isTypedArray,
      tt = j("length"),
      rt = w({ "\xc0": "A", "\xc1": "A", "\xc2": "A", "\xc3": "A", "\xc4": "A", "\xc5": "A", "\xe0": "a", "\xe1": "a", "\xe2": "a", "\xe3": "a", "\xe4": "a", "\xe5": "a", "\xc7": "C", "\xe7": "c", "\xd0": "D", "\xf0": "d", "\xc8": "E", "\xc9": "E", "\xca": "E", "\xcb": "E", "\xe8": "e", "\xe9": "e", "\xea": "e", "\xeb": "e", "\xcc": "I", "\xcd": "I", "\xce": "I",
    "\xcf": "I", "\xec": "i", "\xed": "i", "\xee": "i", "\xef": "i", "\xd1": "N", "\xf1": "n", "\xd2": "O", "\xd3": "O", "\xd4": "O", "\xd5": "O", "\xd6": "O", "\xd8": "O", "\xf2": "o", "\xf3": "o", "\xf4": "o", "\xf5": "o", "\xf6": "o", "\xf8": "o", "\xd9": "U", "\xda": "U", "\xdb": "U", "\xdc": "U", "\xf9": "u", "\xfa": "u", "\xfb": "u", "\xfc": "u", "\xdd": "Y", "\xfd": "y", "\xff": "y", "\xc6": "Ae", "\xe6": "ae", "\xde": "Th", "\xfe": "th", "\xdf": "ss", "\u0100": "A", "\u0102": "A", "\u0104": "A", "\u0101": "a", "\u0103": "a", "\u0105": "a", "\u0106": "C", "\u0108": "C", "\u010A": "C",
    "\u010C": "C", "\u0107": "c", "\u0109": "c", "\u010B": "c", "\u010D": "c", "\u010E": "D", "\u0110": "D", "\u010F": "d", "\u0111": "d", "\u0112": "E", "\u0114": "E", "\u0116": "E", "\u0118": "E", "\u011A": "E", "\u0113": "e", "\u0115": "e", "\u0117": "e", "\u0119": "e", "\u011B": "e", "\u011C": "G", "\u011E": "G", "\u0120": "G", "\u0122": "G", "\u011D": "g", "\u011F": "g", "\u0121": "g", "\u0123": "g", "\u0124": "H", "\u0126": "H", "\u0125": "h", "\u0127": "h", "\u0128": "I", "\u012A": "I", "\u012C": "I", "\u012E": "I", "\u0130": "I", "\u0129": "i", "\u012B": "i", "\u012D": "i",
    "\u012F": "i", "\u0131": "i", "\u0134": "J", "\u0135": "j", "\u0136": "K", "\u0137": "k", "\u0138": "k", "\u0139": "L", "\u013B": "L", "\u013D": "L", "\u013F": "L", "\u0141": "L", "\u013A": "l", "\u013C": "l", "\u013E": "l", "\u0140": "l", "\u0142": "l", "\u0143": "N", "\u0145": "N", "\u0147": "N", "\u014A": "N", "\u0144": "n", "\u0146": "n", "\u0148": "n", "\u014B": "n", "\u014C": "O", "\u014E": "O", "\u0150": "O", "\u014D": "o", "\u014F": "o", "\u0151": "o", "\u0154": "R", "\u0156": "R", "\u0158": "R", "\u0155": "r", "\u0157": "r", "\u0159": "r", "\u015A": "S", "\u015C": "S",
    "\u015E": "S", "\u0160": "S", "\u015B": "s", "\u015D": "s", "\u015F": "s", "\u0161": "s", "\u0162": "T", "\u0164": "T", "\u0166": "T", "\u0163": "t", "\u0165": "t", "\u0167": "t", "\u0168": "U", "\u016A": "U", "\u016C": "U", "\u016E": "U", "\u0170": "U", "\u0172": "U", "\u0169": "u", "\u016B": "u", "\u016D": "u", "\u016F": "u", "\u0171": "u", "\u0173": "u", "\u0174": "W", "\u0175": "w", "\u0176": "Y", "\u0177": "y", "\u0178": "Y", "\u0179": "Z", "\u017B": "Z", "\u017D": "Z", "\u017A": "z", "\u017C": "z", "\u017E": "z", "\u0132": "IJ", "\u0133": "ij", "\u0152": "Oe", "\u0153": "oe",
    "\u0149": "'n", "\u017F": "s" }),
      et = w({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }),
      ut = w({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }),
      it = function w(En) {
    function On(n) {
      if (xu(n) && !af(n) && !(n instanceof Mn)) {
        if (n instanceof zn) return n;if (ci.call(n, "__wrapped__")) return Pe(n);
      }return new zn(n);
    }function Sn() {}function zn(n, t) {
      this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = F;
    }function Mn(n) {
      this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = 4294967295, this.__views__ = [];
    }function Tn(n) {
      var t = -1,
          r = null == n ? 0 : n.length;for (this.clear(); ++t < r;) {
        var e = n[t];this.set(e[0], e[1]);
      }
    }function Nn(n) {
      var t = -1,
          r = null == n ? 0 : n.length;for (this.clear(); ++t < r;) {
        var e = n[t];this.set(e[0], e[1]);
      }
    }function Pn(n) {
      var t = -1,
          r = null == n ? 0 : n.length;for (this.clear(); ++t < r;) {
        var e = n[t];this.set(e[0], e[1]);
      }
    }function qn(n) {
      var t = -1,
          r = null == n ? 0 : n.length;for (this.__data__ = new Pn(); ++t < r;) {
        this.add(n[t]);
      }
    }function Vn(n) {
      this.size = (this.__data__ = new Nn(n)).size;
    }function Gn(n, t) {
      var r,
          e = af(n),
          u = !e && cf(n),
          i = !e && !u && sf(n),
          o = !e && !u && !i && gf(n),
          u = (e = e || u || i || o) ? E(n.length, ri) : [],
          f = u.length;for (r in n) {
        !t && !ci.call(n, r) || e && ("length" == r || i && ("offset" == r || "parent" == r) || o && ("buffer" == r || "byteLength" == r || "byteOffset" == r) || Re(r, f)) || u.push(r);
      }return u;
    }function tt(n) {
      var t = n.length;return t ? n[cr(0, t - 1)] : F;
    }function ot(n, t) {
      return Te(Mr(n), gt(t, 0, n.length));
    }function ft(n) {
      return Te(Mr(n));
    }function ct(n, t, r) {
      (r === F || hu(n[t], r)) && (r !== F || t in n) || _t(n, t, r);
    }function at(n, t, r) {
      var e = n[t];ci.call(n, t) && hu(e, r) && (r !== F || t in n) || _t(n, t, r);
    }function lt(n, t) {
      for (var r = n.length; r--;) {
        if (hu(n[r][0], t)) return r;
      }return -1;
    }function st(n, t, r, e) {
      return oo(n, function (n, u, i) {
        t(e, n, r(n), i);
      }), e;
    }function ht(n, t) {
      return n && Tr(t, Lu(t), n);
    }function pt(n, t) {
      return n && Tr(t, Uu(t), n);
    }function _t(n, t, r) {
      "__proto__" == t && Ei ? Ei(n, t, { configurable: true, enumerable: true, value: r, writable: true }) : n[t] = r;
    }function vt(n, t) {
      for (var r = -1, e = t.length, u = Hu(e), i = null == n; ++r < e;) {
        u[r] = i ? F : Wu(n, t[r]);
      }return u;
    }function gt(n, t, r) {
      return n === n && (r !== F && (n = n <= r ? n : r), t !== F && (n = n >= t ? n : t)), n;
    }function dt(n, t, r, e, i, o) {
      var f,
          c = 1 & t,
          a = 2 & t,
          l = 4 & t;if (r && (f = i ? r(n, e, i, o) : r(n)), f !== F) return f;if (!bu(n)) return n;if (e = af(n)) {
        if (f = Ee(n), !c) return Mr(n, f);
      } else {
        var s = yo(n),
            h = "[object Function]" == s || "[object GeneratorFunction]" == s;if (sf(n)) return Wr(n, c);if ("[object Object]" == s || "[object Arguments]" == s || h && !i) {
          if (f = a || h ? {} : Oe(n), !c) return a ? Fr(n, pt(f, n)) : $r(n, ht(f, n));
        } else {
          if (!Dn[s]) return i ? n : {};f = Se(n, s, dt, c);
        }
      }if (o || (o = new Vn()), i = o.get(n)) return i;o.set(n, f);var a = l ? a ? ye : de : a ? Uu : Lu,
          p = e ? F : a(n);return u(p || n, function (e, u) {
        p && (u = e, e = n[u]), at(f, u, dt(e, t, r, u, n, o));
      }), f;
    }function yt(n) {
      var t = Lu(n);return function (r) {
        return bt(r, n, t);
      };
    }function bt(n, t, r) {
      var e = r.length;if (null == n) return !e;for (n = ni(n); e--;) {
        var u = r[e],
            i = t[u],
            o = n[u];if (o === F && !(u in n) || !i(o)) return false;
      }return true;
    }function xt(n, t, r) {
      if (typeof n != "function") throw new ei("Expected a function");return jo(function () {
        n.apply(F, r);
      }, t);
    }function jt(n, t, r, e) {
      var u = -1,
          i = c,
          o = true,
          f = n.length,
          s = [],
          h = t.length;
      if (!f) return s;r && (t = l(t, S(r))), e ? (i = a, o = false) : 200 <= t.length && (i = R, o = false, t = new qn(t));n: for (; ++u < f;) {
        var p = n[u],
            _ = null == r ? p : r(p),
            p = e || 0 !== p ? p : 0;if (o && _ === _) {
          for (var v = h; v--;) {
            if (t[v] === _) continue n;
          }s.push(p);
        } else i(t, _, e) || s.push(p);
      }return s;
    }function wt(n, t) {
      var r = true;return oo(n, function (n, e, u) {
        return r = !!t(n, e, u);
      }), r;
    }function mt(n, t, r) {
      for (var e = -1, u = n.length; ++e < u;) {
        var i = n[e],
            o = t(i);if (null != o && (f === F ? o === o && !Au(o) : r(o, f))) var f = o,
            c = i;
      }return c;
    }function At(n, t) {
      var r = [];return oo(n, function (n, e, u) {
        t(n, e, u) && r.push(n);
      }), r;
    }function kt(n, t, r, e, u) {
      var i = -1,
          o = n.length;for (r || (r = Ie), u || (u = []); ++i < o;) {
        var f = n[i];0 < t && r(f) ? 1 < t ? kt(f, t - 1, r, e, u) : s(u, f) : e || (u[u.length] = f);
      }return u;
    }function Et(n, t) {
      return n && co(n, t, Lu);
    }function Ot(n, t) {
      return n && ao(n, t, Lu);
    }function St(n, t) {
      return f(t, function (t) {
        return gu(n[t]);
      });
    }function It(n, t) {
      t = Rr(t, n);for (var r = 0, e = t.length; null != n && r < e;) {
        n = n[$e(t[r++])];
      }return r && r == e ? n : F;
    }function Rt(n, t, r) {
      return t = t(n), af(n) ? t : s(t, r(n));
    }function zt(n) {
      if (null == n) n = n === F ? "[object Undefined]" : "[object Null]";else if (ki && ki in ni(n)) {
        var t = ci.call(n, ki),
            r = n[ki];try {
          n[ki] = F;var e = true;
        } catch (n) {}var u = si.call(n);e && (t ? n[ki] = r : delete n[ki]), n = u;
      } else n = si.call(n);return n;
    }function Wt(n, t) {
      return n > t;
    }function Bt(n, t) {
      return null != n && ci.call(n, t);
    }function Lt(n, t) {
      return null != n && t in ni(n);
    }function Ut(n, t, r) {
      for (var e = r ? a : c, u = n[0].length, i = n.length, o = i, f = Hu(i), s = 1 / 0, h = []; o--;) {
        var p = n[o];o && t && (p = l(p, S(t))), s = Mi(p.length, s), f[o] = !r && (t || 120 <= u && 120 <= p.length) ? new qn(o && p) : F;
      }var p = n[0],
          _ = -1,
          v = f[0];n: for (; ++_ < u && h.length < s;) {
        var g = p[_],
            d = t ? t(g) : g,
            g = r || 0 !== g ? g : 0;
        if (v ? !R(v, d) : !e(h, d, r)) {
          for (o = i; --o;) {
            var y = f[o];if (y ? !R(y, d) : !e(n[o], d, r)) continue n;
          }v && v.push(d), h.push(g);
        }
      }return h;
    }function Ct(n, t, r) {
      var e = {};return Et(n, function (n, u, i) {
        t(e, r(n), u, i);
      }), e;
    }function Dt(n, t, e) {
      return t = Rr(t, n), n = 2 > t.length ? n : It(n, vr(t, 0, -1)), t = null == n ? n : n[$e(Ge(t))], null == t ? F : r(t, n, e);
    }function Mt(n) {
      return xu(n) && "[object Arguments]" == zt(n);
    }function Tt(n) {
      return xu(n) && "[object ArrayBuffer]" == zt(n);
    }function $t(n) {
      return xu(n) && "[object Date]" == zt(n);
    }function Ft(n, t, r, e, u) {
      if (n === t) t = true;else if (null == n || null == t || !xu(n) && !xu(t)) t = n !== n && t !== t;else n: {
        var i = af(n),
            o = af(t),
            f = i ? "[object Array]" : yo(n),
            c = o ? "[object Array]" : yo(t),
            f = "[object Arguments]" == f ? "[object Object]" : f,
            c = "[object Arguments]" == c ? "[object Object]" : c,
            a = "[object Object]" == f,
            o = "[object Object]" == c;if ((c = f == c) && sf(n)) {
          if (!sf(t)) {
            t = false;break n;
          }i = true, a = false;
        }if (c && !a) u || (u = new Vn()), t = i || gf(n) ? _e(n, t, r, e, Ft, u) : ve(n, t, f, r, e, Ft, u);else {
          if (!(1 & r) && (i = a && ci.call(n, "__wrapped__"), f = o && ci.call(t, "__wrapped__"), i || f)) {
            n = i ? n.value() : n, t = f ? t.value() : t, u || (u = new Vn()), t = Ft(n, t, r, e, u);break n;
          }if (c) {
            t: if (u || (u = new Vn()), i = 1 & r, f = de(n), o = f.length, c = de(t).length, o == c || i) {
              for (a = o; a--;) {
                var l = f[a];if (!(i ? l in t : ci.call(t, l))) {
                  t = false;break t;
                }
              }if ((c = u.get(n)) && u.get(t)) t = c == t;else {
                c = true, u.set(n, t), u.set(t, n);for (var s = i; ++a < o;) {
                  var l = f[a],
                      h = n[l],
                      p = t[l];if (e) var _ = i ? e(p, h, l, t, n, u) : e(h, p, l, n, t, u);if (_ === F ? h !== p && !Ft(h, p, r, e, u) : !_) {
                    c = false;break;
                  }s || (s = "constructor" == l);
                }c && !s && (r = n.constructor, e = t.constructor, r != e && "constructor" in n && "constructor" in t && !(typeof r == "function" && r instanceof r && typeof e == "function" && e instanceof e) && (c = false)), u.delete(n), u.delete(t), t = c;
              }
            } else t = false;
          } else t = false;
        }
      }return t;
    }function Nt(n) {
      return xu(n) && "[object Map]" == yo(n);
    }function Pt(n, t, r, e) {
      var u = r.length,
          i = u,
          o = !e;if (null == n) return !i;for (n = ni(n); u--;) {
        var f = r[u];if (o && f[2] ? f[1] !== n[f[0]] : !(f[0] in n)) return false;
      }for (; ++u < i;) {
        var f = r[u],
            c = f[0],
            a = n[c],
            l = f[1];if (o && f[2]) {
          if (a === F && !(c in n)) return false;
        } else {
          if (f = new Vn(), e) var s = e(a, l, c, n, t, f);if (s === F ? !Ft(l, a, 3, e, f) : !s) return false;
        }
      }return true;
    }function Zt(n) {
      return !(!bu(n) || li && li in n) && (gu(n) ? _i : xn).test(Fe(n));
    }function qt(n) {
      return xu(n) && "[object RegExp]" == zt(n);
    }function Vt(n) {
      return xu(n) && "[object Set]" == yo(n);
    }function Kt(n) {
      return xu(n) && yu(n.length) && !!Cn[zt(n)];
    }function Gt(n) {
      return typeof n == "function" ? n : null == n ? Nu : (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" ? af(n) ? Xt(n[0], n[1]) : Qt(n) : Vu(n);
    }function Ht(n) {
      if (!Le(n)) return Ci(n);var t,
          r = [];for (t in ni(n)) {
        ci.call(n, t) && "constructor" != t && r.push(t);
      }return r;
    }function Jt(n, t) {
      return n < t;
    }function Yt(n, t) {
      var r = -1,
          e = pu(n) ? Hu(n.length) : [];return oo(n, function (n, u, i) {
        e[++r] = t(n, u, i);
      }), e;
    }function Qt(n) {
      var t = me(n);return 1 == t.length && t[0][2] ? Ue(t[0][0], t[0][1]) : function (r) {
        return r === n || Pt(r, n, t);
      };
    }function Xt(n, t) {
      return We(n) && t === t && !bu(t) ? Ue($e(n), t) : function (r) {
        var e = Wu(r, n);return e === F && e === t ? Bu(r, n) : Ft(t, e, 3);
      };
    }function nr(n, t, r, e, u) {
      n !== t && co(t, function (i, o) {
        if (bu(i)) {
          u || (u = new Vn());var f = u,
              c = n[o],
              a = t[o],
              l = f.get(a);if (l) ct(n, o, l);else {
            var l = e ? e(c, a, o + "", n, t, f) : F,
                s = l === F;if (s) {
              var h = af(a),
                  p = !h && sf(a),
                  _ = !h && !p && gf(a),
                  l = a;h || p || _ ? af(c) ? l = c : _u(c) ? l = Mr(c) : p ? (s = false, l = Wr(a, true)) : _ ? (s = false, l = Lr(a, true)) : l = [] : wu(a) || cf(a) ? (l = c, cf(c) ? l = Ru(c) : (!bu(c) || r && gu(c)) && (l = Oe(a))) : s = false;
            }s && (f.set(a, l), nr(l, a, r, e, f), f.delete(a)), ct(n, o, l);
          }
        } else f = e ? e(n[o], i, o + "", n, t, u) : F, f === F && (f = i), ct(n, o, f);
      }, Uu);
    }function tr(n, t) {
      var r = n.length;if (r) return t += 0 > t ? r : 0, Re(t, r) ? n[t] : F;
    }function rr(n, t, r) {
      var e = -1;return t = l(t.length ? t : [Nu], S(je())), n = Yt(n, function (n) {
        return { a: l(t, function (t) {
            return t(n);
          }), b: ++e, c: n };
      }), A(n, function (n, t) {
        var e;n: {
          e = -1;for (var u = n.a, i = t.a, o = u.length, f = r.length; ++e < o;) {
            var c = Ur(u[e], i[e]);if (c) {
              e = e >= f ? c : c * ("desc" == r[e] ? -1 : 1);
              break n;
            }
          }e = n.b - t.b;
        }return e;
      });
    }function er(n, t) {
      return ur(n, t, function (t, r) {
        return Bu(n, r);
      });
    }function ur(n, t, r) {
      for (var e = -1, u = t.length, i = {}; ++e < u;) {
        var o = t[e],
            f = It(n, o);r(f, o) && pr(i, Rr(o, n), f);
      }return i;
    }function ir(n) {
      return function (t) {
        return It(t, n);
      };
    }function or(n, t, r, e) {
      var u = e ? y : d,
          i = -1,
          o = t.length,
          f = n;for (n === t && (t = Mr(t)), r && (f = l(n, S(r))); ++i < o;) {
        for (var c = 0, a = t[i], a = r ? r(a) : a; -1 < (c = u(f, a, c, e));) {
          f !== n && wi.call(f, c, 1), wi.call(n, c, 1);
        }
      }return n;
    }function fr(n, t) {
      for (var r = n ? t.length : 0, e = r - 1; r--;) {
        var u = t[r];
        if (r == e || u !== i) {
          var i = u;Re(u) ? wi.call(n, u, 1) : mr(n, u);
        }
      }
    }function cr(n, t) {
      return n + zi(Fi() * (t - n + 1));
    }function ar(n, t) {
      var r = "";if (!n || 1 > t || 9007199254740991 < t) return r;do {
        t % 2 && (r += n), (t = zi(t / 2)) && (n += n);
      } while (t);return r;
    }function lr(n, t) {
      return wo(Ce(n, t, Nu), n + "");
    }function sr(n) {
      return tt(Du(n));
    }function hr(n, t) {
      var r = Du(n);return Te(r, gt(t, 0, r.length));
    }function pr(n, t, r, e) {
      if (!bu(n)) return n;t = Rr(t, n);for (var u = -1, i = t.length, o = i - 1, f = n; null != f && ++u < i;) {
        var c = $e(t[u]),
            a = r;if (u != o) {
          var l = f[c],
              a = e ? e(l, c, f) : F;
          a === F && (a = bu(l) ? l : Re(t[u + 1]) ? [] : {});
        }at(f, c, a), f = f[c];
      }return n;
    }function _r(n) {
      return Te(Du(n));
    }function vr(n, t, r) {
      var e = -1,
          u = n.length;for (0 > t && (t = -t > u ? 0 : u + t), r = r > u ? u : r, 0 > r && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0, r = Hu(u); ++e < u;) {
        r[e] = n[e + t];
      }return r;
    }function gr(n, t) {
      var r;return oo(n, function (n, e, u) {
        return r = t(n, e, u), !r;
      }), !!r;
    }function dr(n, t, r) {
      var e = 0,
          u = null == n ? e : n.length;if (typeof t == "number" && t === t && 2147483647 >= u) {
        for (; e < u;) {
          var i = e + u >>> 1,
              o = n[i];null !== o && !Au(o) && (r ? o <= t : o < t) ? e = i + 1 : u = i;
        }return u;
      }return yr(n, t, Nu, r);
    }function yr(n, t, r, e) {
      t = r(t);for (var u = 0, i = null == n ? 0 : n.length, o = t !== t, f = null === t, c = Au(t), a = t === F; u < i;) {
        var l = zi((u + i) / 2),
            s = r(n[l]),
            h = s !== F,
            p = null === s,
            _ = s === s,
            v = Au(s);(o ? e || _ : a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : p || v ? 0 : e ? s <= t : s < t) ? u = l + 1 : i = l;
      }return Mi(i, 4294967294);
    }function br(n, t) {
      for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
        var o = n[r],
            f = t ? t(o) : o;if (!r || !hu(f, c)) {
          var c = f;i[u++] = 0 === o ? 0 : o;
        }
      }return i;
    }function xr(n) {
      return typeof n == "number" ? n : Au(n) ? P : +n;
    }function jr(n) {
      if (typeof n == "string") return n;
      if (af(n)) return l(n, jr) + "";if (Au(n)) return uo ? uo.call(n) : "";var t = n + "";return "0" == t && 1 / n == -N ? "-0" : t;
    }function wr(n, t, r) {
      var e = -1,
          u = c,
          i = n.length,
          o = true,
          f = [],
          l = f;if (r) o = false, u = a;else if (200 <= i) {
        if (u = t ? null : po(n)) return D(u);o = false, u = R, l = new qn();
      } else l = t ? [] : f;n: for (; ++e < i;) {
        var s = n[e],
            h = t ? t(s) : s,
            s = r || 0 !== s ? s : 0;if (o && h === h) {
          for (var p = l.length; p--;) {
            if (l[p] === h) continue n;
          }t && l.push(h), f.push(s);
        } else u(l, h, r) || (l !== f && l.push(h), f.push(s));
      }return f;
    }function mr(n, t) {
      return t = Rr(t, n), n = 2 > t.length ? n : It(n, vr(t, 0, -1)), null == n || delete n[$e(Ge(t))];
    }function Ar(n, t, r, e) {
      for (var u = n.length, i = e ? u : -1; (e ? i-- : ++i < u) && t(n[i], i, n);) {}return r ? vr(n, e ? 0 : i, e ? i + 1 : u) : vr(n, e ? i + 1 : 0, e ? u : i);
    }function kr(n, t) {
      var r = n;return r instanceof Mn && (r = r.value()), h(t, function (n, t) {
        return t.func.apply(t.thisArg, s([n], t.args));
      }, r);
    }function Er(n, t, r) {
      var e = n.length;if (2 > e) return e ? wr(n[0]) : [];for (var u = -1, i = Hu(e); ++u < e;) {
        for (var o = n[u], f = -1; ++f < e;) {
          f != u && (i[u] = jt(i[u] || o, n[f], t, r));
        }
      }return wr(kt(i, 1), t, r);
    }function Or(n, t, r) {
      for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u;) {
        r(o, n[e], e < i ? t[e] : F);
      }return o;
    }function Sr(n) {
      return _u(n) ? n : [];
    }function Ir(n) {
      return typeof n == "function" ? n : Nu;
    }function Rr(n, t) {
      return af(n) ? n : We(n, t) ? [n] : mo(zu(n));
    }function zr(n, t, r) {
      var e = n.length;return r = r === F ? e : r, !t && r >= e ? n : vr(n, t, r);
    }function Wr(n, t) {
      if (t) return n.slice();var r = n.length,
          r = yi ? yi(r) : new n.constructor(r);return n.copy(r), r;
    }function Br(n) {
      var t = new n.constructor(n.byteLength);return new di(t).set(new di(n)), t;
    }function Lr(n, t) {
      return new n.constructor(t ? Br(n.buffer) : n.buffer, n.byteOffset, n.length);
    }function Ur(n, t) {
      if (n !== t) {
        var r = n !== F,
            e = null === n,
            u = n === n,
            i = Au(n),
            o = t !== F,
            f = null === t,
            c = t === t,
            a = Au(t);if (!f && !a && !i && n > t || i && o && c && !f && !a || e && o && c || !r && c || !u) return 1;if (!e && !i && !a && n < t || a && r && u && !e && !i || f && r && u || !o && u || !c) return -1;
      }return 0;
    }function Cr(n, t, r, e) {
      var u = -1,
          i = n.length,
          o = r.length,
          f = -1,
          c = t.length,
          a = Di(i - o, 0),
          l = Hu(c + a);for (e = !e; ++f < c;) {
        l[f] = t[f];
      }for (; ++u < o;) {
        (e || u < i) && (l[r[u]] = n[u]);
      }for (; a--;) {
        l[f++] = n[u++];
      }return l;
    }function Dr(n, t, r, e) {
      var u = -1,
          i = n.length,
          o = -1,
          f = r.length,
          c = -1,
          a = t.length,
          l = Di(i - f, 0),
          s = Hu(l + a);
      for (e = !e; ++u < l;) {
        s[u] = n[u];
      }for (l = u; ++c < a;) {
        s[l + c] = t[c];
      }for (; ++o < f;) {
        (e || u < i) && (s[l + r[o]] = n[u++]);
      }return s;
    }function Mr(n, t) {
      var r = -1,
          e = n.length;for (t || (t = Hu(e)); ++r < e;) {
        t[r] = n[r];
      }return t;
    }function Tr(n, t, r, e) {
      var u = !r;r || (r = {});for (var i = -1, o = t.length; ++i < o;) {
        var f = t[i],
            c = e ? e(r[f], n[f], f, r, n) : F;c === F && (c = n[f]), u ? _t(r, f, c) : at(r, f, c);
      }return r;
    }function $r(n, t) {
      return Tr(n, vo(n), t);
    }function Fr(n, t) {
      return Tr(n, go(n), t);
    }function Nr(n, t) {
      return function (r, u) {
        var i = af(r) ? e : st,
            o = t ? t() : {};return i(r, n, je(u, 2), o);
      };
    }function Pr(n) {
      return lr(function (t, r) {
        var e = -1,
            u = r.length,
            i = 1 < u ? r[u - 1] : F,
            o = 2 < u ? r[2] : F,
            i = 3 < n.length && typeof i == "function" ? (u--, i) : F;for (o && ze(r[0], r[1], o) && (i = 3 > u ? F : i, u = 1), t = ni(t); ++e < u;) {
          (o = r[e]) && n(t, o, e, i);
        }return t;
      });
    }function Zr(n, t) {
      return function (r, e) {
        if (null == r) return r;if (!pu(r)) return n(r, e);for (var u = r.length, i = t ? u : -1, o = ni(r); (t ? i-- : ++i < u) && false !== e(o[i], i, o);) {}return r;
      };
    }function qr(n) {
      return function (t, r, e) {
        var u = -1,
            i = ni(t);e = e(t);for (var o = e.length; o--;) {
          var f = e[n ? o : ++u];if (false === r(i[f], f, i)) break;
        }return t;
      };
    }function Vr(n, t, r) {
      function e() {
        return (this && this !== Zn && this instanceof e ? i : n).apply(u ? r : this, arguments);
      }var u = 1 & t,
          i = Hr(n);return e;
    }function Kr(n) {
      return function (t) {
        t = zu(t);var r = Bn.test(t) ? $(t) : F,
            e = r ? r[0] : t.charAt(0);return t = r ? zr(r, 1).join("") : t.slice(1), e[n]() + t;
      };
    }function Gr(n) {
      return function (t) {
        return h($u(Tu(t).replace(In, "")), n, "");
      };
    }function Hr(n) {
      return function () {
        var t = arguments;switch (t.length) {case 0:
            return new n();case 1:
            return new n(t[0]);case 2:
            return new n(t[0], t[1]);case 3:
            return new n(t[0], t[1], t[2]);case 4:
            return new n(t[0], t[1], t[2], t[3]);case 5:
            return new n(t[0], t[1], t[2], t[3], t[4]);case 6:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5]);case 7:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);}var r = io(n.prototype),
            t = n.apply(r, t);return bu(t) ? t : r;
      };
    }function Jr(n, t, e) {
      function u() {
        for (var o = arguments.length, f = Hu(o), c = o, a = xe(u); c--;) {
          f[c] = arguments[c];
        }return c = 3 > o && f[0] !== a && f[o - 1] !== a ? [] : C(f, a), o -= c.length, o < e ? fe(n, t, Xr, u.placeholder, F, f, c, F, F, e - o) : r(this && this !== Zn && this instanceof u ? i : n, this, f);
      }var i = Hr(n);return u;
    }function Yr(n) {
      return function (t, r, e) {
        var u = ni(t);if (!pu(t)) {
          var i = je(r, 3);t = Lu(t), r = function r(n) {
            return i(u[n], n, u);
          };
        }return r = n(t, r, e), -1 < r ? u[i ? t[r] : r] : F;
      };
    }function Qr(n) {
      return ge(function (t) {
        var r = t.length,
            e = r,
            u = zn.prototype.thru;for (n && t.reverse(); e--;) {
          var i = t[e];if (typeof i != "function") throw new ei("Expected a function");if (u && !o && "wrapper" == be(i)) var o = new zn([], true);
        }for (e = o ? e : r; ++e < r;) {
          var i = t[e],
              u = be(i),
              f = "wrapper" == u ? _o(i) : F,
              o = f && Be(f[0]) && 424 == f[1] && !f[4].length && 1 == f[9] ? o[be(f[0])].apply(o, f[3]) : 1 == i.length && Be(i) ? o[u]() : o.thru(i);
        }return function () {
          var n = arguments,
              e = n[0];if (o && 1 == n.length && af(e)) return o.plant(e).value();for (var u = 0, n = r ? t[u].apply(this, n) : e; ++u < r;) {
            n = t[u].call(this, n);
          }return n;
        };
      });
    }function Xr(n, t, r, e, u, i, o, f, c, a) {
      function l() {
        for (var d = arguments.length, y = Hu(d), b = d; b--;) {
          y[b] = arguments[b];
        }if (_) {
          var x,
              j = xe(l),
              b = y.length;for (x = 0; b--;) {
            y[b] === j && ++x;
          }
        }if (e && (y = Cr(y, e, u, _)), i && (y = Dr(y, i, o, _)), d -= x, _ && d < a) return j = C(y, j), fe(n, t, Xr, l.placeholder, r, y, j, f, c, a - d);if (j = h ? r : this, b = p ? j[n] : n, d = y.length, f) {
          x = y.length;for (var w = Mi(f.length, x), m = Mr(y); w--;) {
            var A = f[w];y[w] = Re(A, x) ? m[A] : F;
          }
        } else v && 1 < d && y.reverse();return s && c < d && (y.length = c), this && this !== Zn && this instanceof l && (b = g || Hr(b)), b.apply(j, y);
      }var s = 128 & t,
          h = 1 & t,
          p = 2 & t,
          _ = 24 & t,
          v = 512 & t,
          g = p ? F : Hr(n);return l;
    }function ne(n, t) {
      return function (r, e) {
        return Ct(r, n, t(e));
      };
    }function te(n, t) {
      return function (r, e) {
        var u;if (r === F && e === F) return t;if (r !== F && (u = r), e !== F) {
          if (u === F) return e;typeof r == "string" || typeof e == "string" ? (r = jr(r), e = jr(e)) : (r = xr(r), e = xr(e)), u = n(r, e);
        }return u;
      };
    }function re(n) {
      return ge(function (t) {
        return t = l(t, S(je())), lr(function (e) {
          var u = this;return n(t, function (n) {
            return r(n, u, e);
          });
        });
      });
    }function ee(n, t) {
      t = t === F ? " " : jr(t);var r = t.length;return 2 > r ? r ? ar(t, n) : t : (r = ar(t, Ri(n / T(t))), Bn.test(t) ? zr($(r), 0, n).join("") : r.slice(0, n));
    }function ue(n, t, e, u) {
      function i() {
        for (var t = -1, c = arguments.length, a = -1, l = u.length, s = Hu(l + c), h = this && this !== Zn && this instanceof i ? f : n; ++a < l;) {
          s[a] = u[a];
        }for (; c--;) {
          s[a++] = arguments[++t];
        }return r(h, o ? e : this, s);
      }var o = 1 & t,
          f = Hr(n);return i;
    }function ie(n) {
      return function (t, r, e) {
        e && typeof e != "number" && ze(t, r, e) && (r = e = F), t = Eu(t), r === F ? (r = t, t = 0) : r = Eu(r), e = e === F ? t < r ? 1 : -1 : Eu(e);var u = -1;r = Di(Ri((r - t) / (e || 1)), 0);for (var i = Hu(r); r--;) {
          i[n ? r : ++u] = t, t += e;
        }return i;
      };
    }function oe(n) {
      return function (t, r) {
        return typeof t == "string" && typeof r == "string" || (t = Iu(t), r = Iu(r)), n(t, r);
      };
    }function fe(n, t, r, e, u, i, o, f, c, a) {
      var l = 8 & t,
          s = l ? o : F;o = l ? F : o;var h = l ? i : F;return i = l ? F : i, t = (t | (l ? 32 : 64)) & ~(l ? 64 : 32), 4 & t || (t &= -4), u = [n, t, u, h, s, i, o, f, c, a], r = r.apply(F, u), Be(n) && xo(r, u), r.placeholder = e, De(r, n, t);
    }function ce(n) {
      var t = Xu[n];return function (n, r) {
        if (n = Iu(n), r = null == r ? 0 : Mi(Ou(r), 292)) {
          var e = (zu(n) + "e").split("e"),
              e = t(e[0] + "e" + (+e[1] + r)),
              e = (zu(e) + "e").split("e");return +(e[0] + "e" + (+e[1] - r));
        }return t(n);
      };
    }function ae(n) {
      return function (t) {
        var r = yo(t);return "[object Map]" == r ? L(t) : "[object Set]" == r ? M(t) : O(t, n(t));
      };
    }function le(n, t, r, e, u, i, o, f) {
      var c = 2 & t;if (!c && typeof n != "function") throw new ei("Expected a function");var a = e ? e.length : 0;if (a || (t &= -97, e = u = F), o = o === F ? o : Di(Ou(o), 0), f = f === F ? f : Ou(f), a -= u ? u.length : 0, 64 & t) {
        var l = e,
            s = u;e = u = F;
      }var h = c ? F : _o(n);return i = [n, t, r, e, u, l, s, i, o, f], h && (r = i[1], n = h[1], t = r | n, e = 128 == n && 8 == r || 128 == n && 256 == r && i[7].length <= h[8] || 384 == n && h[7].length <= h[8] && 8 == r, 131 > t || e) && (1 & n && (i[2] = h[2], t |= 1 & r ? 0 : 4), (r = h[3]) && (e = i[3], i[3] = e ? Cr(e, r, h[4]) : r, i[4] = e ? C(i[3], "__lodash_placeholder__") : h[4]), (r = h[5]) && (e = i[5], i[5] = e ? Dr(e, r, h[6]) : r, i[6] = e ? C(i[5], "__lodash_placeholder__") : h[6]), (r = h[7]) && (i[7] = r), 128 & n && (i[8] = null == i[8] ? h[8] : Mi(i[8], h[8])), null == i[9] && (i[9] = h[9]), i[0] = h[0], i[1] = t), n = i[0], t = i[1], r = i[2], e = i[3], u = i[4], f = i[9] = i[9] === F ? c ? 0 : n.length : Di(i[9] - a, 0), !f && 24 & t && (t &= -25), De((h ? lo : xo)(t && 1 != t ? 8 == t || 16 == t ? Jr(n, t, f) : 32 != t && 33 != t || u.length ? Xr.apply(F, i) : ue(n, t, r, e) : Vr(n, t, r), i), n, t);
    }function se(n, t, r, e) {
      return n === F || hu(n, ii[r]) && !ci.call(e, r) ? t : n;
    }function he(n, t, r, e, u, i) {
      return bu(n) && bu(t) && (i.set(t, n), nr(n, t, F, he, i), i.delete(t)), n;
    }function pe(n) {
      return wu(n) ? F : n;
    }function _e(n, t, r, e, u, i) {
      var o = 1 & r,
          f = n.length,
          c = t.length;if (f != c && !(o && c > f)) return false;if ((c = i.get(n)) && i.get(t)) return c == t;var c = -1,
          a = true,
          l = 2 & r ? new qn() : F;
      for (i.set(n, t), i.set(t, n); ++c < f;) {
        var s = n[c],
            h = t[c];if (e) var p = o ? e(h, s, c, t, n, i) : e(s, h, c, n, t, i);if (p !== F) {
          if (p) continue;a = false;break;
        }if (l) {
          if (!_(t, function (n, t) {
            if (!R(l, t) && (s === n || u(s, n, r, e, i))) return l.push(t);
          })) {
            a = false;break;
          }
        } else if (s !== h && !u(s, h, r, e, i)) {
          a = false;break;
        }
      }return i.delete(n), i.delete(t), a;
    }function ve(n, t, r, e, u, i, o) {
      switch (r) {case "[object DataView]":
          if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) break;n = n.buffer, t = t.buffer;case "[object ArrayBuffer]":
          if (n.byteLength != t.byteLength || !i(new di(n), new di(t))) break;
          return true;case "[object Boolean]":case "[object Date]":case "[object Number]":
          return hu(+n, +t);case "[object Error]":
          return n.name == t.name && n.message == t.message;case "[object RegExp]":case "[object String]":
          return n == t + "";case "[object Map]":
          var f = L;case "[object Set]":
          if (f || (f = D), n.size != t.size && !(1 & e)) break;return (r = o.get(n)) ? r == t : (e |= 2, o.set(n, t), t = _e(f(n), f(t), e, u, i, o), o.delete(n), t);case "[object Symbol]":
          if (eo) return eo.call(n) == eo.call(t);}return false;
    }function ge(n) {
      return wo(Ce(n, F, Ve), n + "");
    }function de(n) {
      return Rt(n, Lu, vo);
    }function ye(n) {
      return Rt(n, Uu, go);
    }function be(n) {
      for (var t = n.name + "", r = Ji[t], e = ci.call(Ji, t) ? r.length : 0; e--;) {
        var u = r[e],
            i = u.func;if (null == i || i == n) return u.name;
      }return t;
    }function xe(n) {
      return (ci.call(On, "placeholder") ? On : n).placeholder;
    }function je() {
      var n = On.iteratee || Pu,
          n = n === Pu ? Gt : n;return arguments.length ? n(arguments[0], arguments[1]) : n;
    }function we(n, t) {
      var r = n.__data__,
          e = typeof t === "undefined" ? "undefined" : _typeof(t);return ("string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }function me(n) {
      for (var t = Lu(n), r = t.length; r--;) {
        var e = t[r],
            u = n[e];t[r] = [e, u, u === u && !bu(u)];
      }return t;
    }function Ae(n, t) {
      var r = null == n ? F : n[t];return Zt(r) ? r : F;
    }function ke(n, t, r) {
      t = Rr(t, n);for (var e = -1, u = t.length, i = false; ++e < u;) {
        var o = $e(t[e]);if (!(i = null != n && r(n, o))) break;n = n[o];
      }return i || ++e != u ? i : (u = null == n ? 0 : n.length, !!u && yu(u) && Re(o, u) && (af(n) || cf(n)));
    }function Ee(n) {
      var t = n.length,
          r = n.constructor(t);return t && "string" == typeof n[0] && ci.call(n, "index") && (r.index = n.index, r.input = n.input), r;
    }function Oe(n) {
      return typeof n.constructor != "function" || Le(n) ? {} : io(bi(n));
    }function Se(r, e, u, i) {
      var o = r.constructor;switch (e) {case "[object ArrayBuffer]":
          return Br(r);case "[object Boolean]":case "[object Date]":
          return new o(+r);case "[object DataView]":
          return e = i ? Br(r.buffer) : r.buffer, new r.constructor(e, r.byteOffset, r.byteLength);case "[object Float32Array]":case "[object Float64Array]":case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":
        case "[object Uint16Array]":case "[object Uint32Array]":
          return Lr(r, i);case "[object Map]":
          return e = i ? u(L(r), 1) : L(r), h(e, n, new r.constructor());case "[object Number]":case "[object String]":
          return new o(r);case "[object RegExp]":
          return e = new r.constructor(r.source, dn.exec(r)), e.lastIndex = r.lastIndex, e;case "[object Set]":
          return e = i ? u(D(r), 1) : D(r), h(e, t, new r.constructor());case "[object Symbol]":
          return eo ? ni(eo.call(r)) : {};}
    }function Ie(n) {
      return af(n) || cf(n) || !!(mi && n && n[mi]);
    }function Re(n, t) {
      return t = null == t ? 9007199254740991 : t, !!t && (typeof n == "number" || wn.test(n)) && -1 < n && 0 == n % 1 && n < t;
    }function ze(n, t, r) {
      if (!bu(r)) return false;var e = typeof t === "undefined" ? "undefined" : _typeof(t);return !!("number" == e ? pu(r) && Re(t, r.length) : "string" == e && t in r) && hu(r[t], n);
    }function We(n, t) {
      if (af(n)) return false;var r = typeof n === "undefined" ? "undefined" : _typeof(n);return !("number" != r && "symbol" != r && "boolean" != r && null != n && !Au(n)) || rn.test(n) || !tn.test(n) || null != t && n in ni(t);
    }function Be(n) {
      var t = be(n),
          r = On[t];return typeof r == "function" && t in Mn.prototype && (n === r || (t = _o(r), !!t && n === t[0]));
    }function Le(n) {
      var t = n && n.constructor;
      return n === (typeof t == "function" && t.prototype || ii);
    }function Ue(n, t) {
      return function (r) {
        return null != r && r[n] === t && (t !== F || n in ni(r));
      };
    }function Ce(n, t, e) {
      return t = Di(t === F ? n.length - 1 : t, 0), function () {
        for (var u = arguments, i = -1, o = Di(u.length - t, 0), f = Hu(o); ++i < o;) {
          f[i] = u[t + i];
        }for (i = -1, o = Hu(t + 1); ++i < t;) {
          o[i] = u[i];
        }return o[t] = e(f), r(n, this, o);
      };
    }function De(n, t, r) {
      var e = t + "";t = wo;var u,
          i = Ne;return u = (u = e.match(hn)) ? u[1].split(pn) : [], r = i(u, r), (i = r.length) && (u = i - 1, r[u] = (1 < i ? "& " : "") + r[u], r = r.join(2 < i ? ", " : " "), e = e.replace(sn, "{\n/* [wrapped with " + r + "] */\n")), t(n, e);
    }function Me(n) {
      var t = 0,
          r = 0;return function () {
        var e = Ti(),
            u = 16 - (e - r);if (r = e, 0 < u) {
          if (800 <= ++t) return arguments[0];
        } else t = 0;return n.apply(F, arguments);
      };
    }function Te(n, t) {
      var r = -1,
          e = n.length,
          u = e - 1;for (t = t === F ? e : t; ++r < t;) {
        var e = cr(r, u),
            i = n[e];n[e] = n[r], n[r] = i;
      }return n.length = t, n;
    }function $e(n) {
      if (typeof n == "string" || Au(n)) return n;var t = n + "";return "0" == t && 1 / n == -N ? "-0" : t;
    }function Fe(n) {
      if (null != n) {
        try {
          return fi.call(n);
        } catch (n) {}return n + "";
      }return "";
    }function Ne(n, t) {
      return u(Z, function (r) {
        var e = "_." + r[0];t & r[1] && !c(n, e) && n.push(e);
      }), n.sort();
    }function Pe(n) {
      if (n instanceof Mn) return n.clone();var t = new zn(n.__wrapped__, n.__chain__);return t.__actions__ = Mr(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t;
    }function Ze(n, t, r) {
      var e = null == n ? 0 : n.length;return e ? (r = null == r ? 0 : Ou(r), 0 > r && (r = Di(e + r, 0)), g(n, je(t, 3), r)) : -1;
    }function qe(n, t, r) {
      var e = null == n ? 0 : n.length;if (!e) return -1;var u = e - 1;return r !== F && (u = Ou(r), u = 0 > r ? Di(e + u, 0) : Mi(u, e - 1)), g(n, je(t, 3), u, true);
    }function Ve(n) {
      return (null == n ? 0 : n.length) ? kt(n, 1) : [];
    }function Ke(n) {
      return n && n.length ? n[0] : F;
    }function Ge(n) {
      var t = null == n ? 0 : n.length;return t ? n[t - 1] : F;
    }function He(n, t) {
      return n && n.length && t && t.length ? or(n, t) : n;
    }function Je(n) {
      return null == n ? n : Ni.call(n);
    }function Ye(n) {
      if (!n || !n.length) return [];var t = 0;return n = f(n, function (n) {
        if (_u(n)) return t = Di(n.length, t), true;
      }), E(t, function (t) {
        return l(n, j(t));
      });
    }function Qe(n, t) {
      if (!n || !n.length) return [];var e = Ye(n);return null == t ? e : l(e, function (n) {
        return r(t, F, n);
      });
    }function Xe(n) {
      return n = On(n), n.__chain__ = true, n;
    }function nu(n, t) {
      return t(n);
    }function tu() {
      return this;
    }function ru(n, t) {
      return (af(n) ? u : oo)(n, je(t, 3));
    }function eu(n, t) {
      return (af(n) ? i : fo)(n, je(t, 3));
    }function uu(n, t) {
      return (af(n) ? l : Yt)(n, je(t, 3));
    }function iu(n, t, r) {
      return t = r ? F : t, t = n && null == t ? n.length : t, le(n, 128, F, F, F, F, t);
    }function ou(n, t) {
      var r;if (typeof t != "function") throw new ei("Expected a function");return n = Ou(n), function () {
        return 0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = F), r;
      };
    }function fu(n, t, r) {
      return t = r ? F : t, n = le(n, 8, F, F, F, F, F, t), n.placeholder = fu.placeholder, n;
    }function cu(n, t, r) {
      return t = r ? F : t, n = le(n, 16, F, F, F, F, F, t), n.placeholder = cu.placeholder, n;
    }function au(n, t, r) {
      function e(t) {
        var r = c,
            e = a;return c = a = F, _ = t, s = n.apply(e, r);
      }function u(n) {
        var r = n - p;return n -= _, p === F || r >= t || 0 > r || g && n >= l;
      }function i() {
        var n = Jo();if (u(n)) return o(n);var r,
            e = jo;r = n - _, n = t - (n - p), r = g ? Mi(n, l - r) : n, h = e(i, r);
      }function o(n) {
        return h = F, d && c ? e(n) : (c = a = F, s);
      }function f() {
        var n = Jo(),
            r = u(n);if (c = arguments, a = this, p = n, r) {
          if (h === F) return _ = n = p, h = jo(i, t), v ? e(n) : s;if (g) return h = jo(i, t), e(p);
        }return h === F && (h = jo(i, t)), s;
      }var c,
          a,
          l,
          s,
          h,
          p,
          _ = 0,
          v = false,
          g = false,
          d = true;if (typeof n != "function") throw new ei("Expected a function");return t = Iu(t) || 0, bu(r) && (v = !!r.leading, l = (g = "maxWait" in r) ? Di(Iu(r.maxWait) || 0, t) : l, d = "trailing" in r ? !!r.trailing : d), f.cancel = function () {
        h !== F && ho(h), _ = 0, c = p = a = h = F;
      }, f.flush = function () {
        return h === F ? s : o(Jo());
      }, f;
    }function lu(n, t) {
      function r() {
        var e = arguments,
            u = t ? t.apply(this, e) : e[0],
            i = r.cache;return i.has(u) ? i.get(u) : (e = n.apply(this, e), r.cache = i.set(u, e) || i, e);
      }if (typeof n != "function" || null != t && typeof t != "function") throw new ei("Expected a function");return r.cache = new (lu.Cache || Pn)(), r;
    }function su(n) {
      if (typeof n != "function") throw new ei("Expected a function");return function () {
        var t = arguments;switch (t.length) {case 0:
            return !n.call(this);case 1:
            return !n.call(this, t[0]);case 2:
            return !n.call(this, t[0], t[1]);case 3:
            return !n.call(this, t[0], t[1], t[2]);}return !n.apply(this, t);
      };
    }function hu(n, t) {
      return n === t || n !== n && t !== t;
    }function pu(n) {
      return null != n && yu(n.length) && !gu(n);
    }function _u(n) {
      return xu(n) && pu(n);
    }function vu(n) {
      if (!xu(n)) return false;var t = zt(n);return "[object Error]" == t || "[object DOMException]" == t || typeof n.message == "string" && typeof n.name == "string" && !wu(n);
    }function gu(n) {
      return !!bu(n) && (n = zt(n), "[object Function]" == n || "[object GeneratorFunction]" == n || "[object AsyncFunction]" == n || "[object Proxy]" == n);
    }function du(n) {
      return typeof n == "number" && n == Ou(n);
    }function yu(n) {
      return typeof n == "number" && -1 < n && 0 == n % 1 && 9007199254740991 >= n;
    }function bu(n) {
      var t = typeof n === "undefined" ? "undefined" : _typeof(n);return null != n && ("object" == t || "function" == t);
    }function xu(n) {
      return null != n && (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object";
    }function ju(n) {
      return typeof n == "number" || xu(n) && "[object Number]" == zt(n);
    }function wu(n) {
      return !(!xu(n) || "[object Object]" != zt(n)) && (n = bi(n), null === n || (n = ci.call(n, "constructor") && n.constructor, typeof n == "function" && n instanceof n && fi.call(n) == hi));
    }function mu(n) {
      return typeof n == "string" || !af(n) && xu(n) && "[object String]" == zt(n);
    }function Au(n) {
      return (typeof n === "undefined" ? "undefined" : _typeof(n)) == "symbol" || xu(n) && "[object Symbol]" == zt(n);
    }function ku(n) {
      if (!n) return [];if (pu(n)) return mu(n) ? $(n) : Mr(n);
      if (Ai && n[Ai]) {
        n = n[Ai]();for (var t, r = []; !(t = n.next()).done;) {
          r.push(t.value);
        }return r;
      }return t = yo(n), ("[object Map]" == t ? L : "[object Set]" == t ? D : Du)(n);
    }function Eu(n) {
      return n ? (n = Iu(n), n === N || n === -N ? 1.7976931348623157e308 * (0 > n ? -1 : 1) : n === n ? n : 0) : 0 === n ? n : 0;
    }function Ou(n) {
      n = Eu(n);var t = n % 1;return n === n ? t ? n - t : n : 0;
    }function Su(n) {
      return n ? gt(Ou(n), 0, 4294967295) : 0;
    }function Iu(n) {
      if (typeof n == "number") return n;if (Au(n)) return P;if (bu(n) && (n = typeof n.valueOf == "function" ? n.valueOf() : n, n = bu(n) ? n + "" : n), typeof n != "string") return 0 === n ? n : +n;
      n = n.replace(cn, "");var t = bn.test(n);return t || jn.test(n) ? Fn(n.slice(2), t ? 2 : 8) : yn.test(n) ? P : +n;
    }function Ru(n) {
      return Tr(n, Uu(n));
    }function zu(n) {
      return null == n ? "" : jr(n);
    }function Wu(n, t, r) {
      return n = null == n ? F : It(n, t), n === F ? r : n;
    }function Bu(n, t) {
      return null != n && ke(n, t, Lt);
    }function Lu(n) {
      return pu(n) ? Gn(n) : Ht(n);
    }function Uu(n) {
      if (pu(n)) n = Gn(n, true);else if (bu(n)) {
        var t,
            r = Le(n),
            e = [];for (t in n) {
          ("constructor" != t || !r && ci.call(n, t)) && e.push(t);
        }n = e;
      } else {
        if (t = [], null != n) for (r in ni(n)) {
          t.push(r);
        }n = t;
      }return n;
    }function Cu(n, t) {
      if (null == n) return {};var r = l(ye(n), function (n) {
        return [n];
      });return t = je(t), ur(n, r, function (n, r) {
        return t(n, r[0]);
      });
    }function Du(n) {
      return null == n ? [] : I(n, Lu(n));
    }function Mu(n) {
      return Nf(zu(n).toLowerCase());
    }function Tu(n) {
      return (n = zu(n)) && n.replace(mn, rt).replace(Rn, "");
    }function $u(n, t, r) {
      return n = zu(n), t = r ? F : t, t === F ? Ln.test(n) ? n.match(Wn) || [] : n.match(_n) || [] : n.match(t) || [];
    }function Fu(n) {
      return function () {
        return n;
      };
    }function Nu(n) {
      return n;
    }function Pu(n) {
      return Gt(typeof n == "function" ? n : dt(n, 1));
    }function Zu(n, t, r) {
      var e = Lu(t),
          i = St(t, e);null != r || bu(t) && (i.length || !e.length) || (r = t, t = n, n = this, i = St(t, Lu(t)));var o = !(bu(r) && "chain" in r && !r.chain),
          f = gu(n);return u(i, function (r) {
        var e = t[r];n[r] = e, f && (n.prototype[r] = function () {
          var t = this.__chain__;if (o || t) {
            var r = n(this.__wrapped__);return (r.__actions__ = Mr(this.__actions__)).push({ func: e, args: arguments, thisArg: n }), r.__chain__ = t, r;
          }return e.apply(n, s([this.value()], arguments));
        });
      }), n;
    }function qu() {}function Vu(n) {
      return We(n) ? j($e(n)) : ir(n);
    }function Ku() {
      return [];
    }function Gu() {
      return false;
    }En = null == En ? Zn : it.defaults(Zn.Object(), En, it.pick(Zn, Un));var Hu = En.Array,
        Ju = En.Date,
        Yu = En.Error,
        Qu = En.Function,
        Xu = En.Math,
        ni = En.Object,
        ti = En.RegExp,
        ri = En.String,
        ei = En.TypeError,
        ui = Hu.prototype,
        ii = ni.prototype,
        oi = En["__core-js_shared__"],
        fi = Qu.prototype.toString,
        ci = ii.hasOwnProperty,
        ai = 0,
        li = function () {
      var n = /[^.]+$/.exec(oi && oi.keys && oi.keys.IE_PROTO || "");return n ? "Symbol(src)_1." + n : "";
    }(),
        si = ii.toString,
        hi = fi.call(ni),
        pi = Zn._,
        _i = ti("^" + fi.call(ci).replace(on, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        vi = Kn ? En.Buffer : F,
        gi = En.Symbol,
        di = En.Uint8Array,
        yi = vi ? vi.f : F,
        bi = U(ni.getPrototypeOf, ni),
        xi = ni.create,
        ji = ii.propertyIsEnumerable,
        wi = ui.splice,
        mi = gi ? gi.isConcatSpreadable : F,
        Ai = gi ? gi.iterator : F,
        ki = gi ? gi.toStringTag : F,
        Ei = function () {
      try {
        var n = Ae(ni, "defineProperty");return n({}, "", {}), n;
      } catch (n) {}
    }(),
        Oi = En.clearTimeout !== Zn.clearTimeout && En.clearTimeout,
        Si = Ju && Ju.now !== Zn.Date.now && Ju.now,
        Ii = En.setTimeout !== Zn.setTimeout && En.setTimeout,
        Ri = Xu.ceil,
        zi = Xu.floor,
        Wi = ni.getOwnPropertySymbols,
        Bi = vi ? vi.isBuffer : F,
        Li = En.isFinite,
        Ui = ui.join,
        Ci = U(ni.keys, ni),
        Di = Xu.max,
        Mi = Xu.min,
        Ti = Ju.now,
        $i = En.parseInt,
        Fi = Xu.random,
        Ni = ui.reverse,
        Pi = Ae(En, "DataView"),
        Zi = Ae(En, "Map"),
        qi = Ae(En, "Promise"),
        Vi = Ae(En, "Set"),
        Ki = Ae(En, "WeakMap"),
        Gi = Ae(ni, "create"),
        Hi = Ki && new Ki(),
        Ji = {},
        Yi = Fe(Pi),
        Qi = Fe(Zi),
        Xi = Fe(qi),
        no = Fe(Vi),
        to = Fe(Ki),
        ro = gi ? gi.prototype : F,
        eo = ro ? ro.valueOf : F,
        uo = ro ? ro.toString : F,
        io = function () {
      function n() {}return function (t) {
        return bu(t) ? xi ? xi(t) : (n.prototype = t, t = new n(), n.prototype = F, t) : {};
      };
    }();On.templateSettings = { escape: Q, evaluate: X, interpolate: nn, variable: "", imports: { _: On } }, On.prototype = Sn.prototype, On.prototype.constructor = On, zn.prototype = io(Sn.prototype), zn.prototype.constructor = zn, Mn.prototype = io(Sn.prototype), Mn.prototype.constructor = Mn, Tn.prototype.clear = function () {
      this.__data__ = Gi ? Gi(null) : {}, this.size = 0;
    }, Tn.prototype.delete = function (n) {
      return n = this.has(n) && delete this.__data__[n], this.size -= n ? 1 : 0, n;
    }, Tn.prototype.get = function (n) {
      var t = this.__data__;return Gi ? (n = t[n], "__lodash_hash_undefined__" === n ? F : n) : ci.call(t, n) ? t[n] : F;
    }, Tn.prototype.has = function (n) {
      var t = this.__data__;return Gi ? t[n] !== F : ci.call(t, n);
    }, Tn.prototype.set = function (n, t) {
      var r = this.__data__;return this.size += this.has(n) ? 0 : 1, r[n] = Gi && t === F ? "__lodash_hash_undefined__" : t, this;
    }, Nn.prototype.clear = function () {
      this.__data__ = [], this.size = 0;
    }, Nn.prototype.delete = function (n) {
      var t = this.__data__;return n = lt(t, n), !(0 > n) && (n == t.length - 1 ? t.pop() : wi.call(t, n, 1), --this.size, true);
    }, Nn.prototype.get = function (n) {
      var t = this.__data__;return n = lt(t, n), 0 > n ? F : t[n][1];
    }, Nn.prototype.has = function (n) {
      return -1 < lt(this.__data__, n);
    }, Nn.prototype.set = function (n, t) {
      var r = this.__data__,
          e = lt(r, n);return 0 > e ? (++this.size, r.push([n, t])) : r[e][1] = t, this;
    }, Pn.prototype.clear = function () {
      this.size = 0, this.__data__ = { hash: new Tn(), map: new (Zi || Nn)(), string: new Tn() };
    }, Pn.prototype.delete = function (n) {
      return n = we(this, n).delete(n), this.size -= n ? 1 : 0, n;
    }, Pn.prototype.get = function (n) {
      return we(this, n).get(n);
    }, Pn.prototype.has = function (n) {
      return we(this, n).has(n);
    }, Pn.prototype.set = function (n, t) {
      var r = we(this, n),
          e = r.size;return r.set(n, t), this.size += r.size == e ? 0 : 1, this;
    }, qn.prototype.add = qn.prototype.push = function (n) {
      return this.__data__.set(n, "__lodash_hash_undefined__"), this;
    }, qn.prototype.has = function (n) {
      return this.__data__.has(n);
    }, Vn.prototype.clear = function () {
      this.__data__ = new Nn(), this.size = 0;
    }, Vn.prototype.delete = function (n) {
      var t = this.__data__;return n = t.delete(n), this.size = t.size, n;
    }, Vn.prototype.get = function (n) {
      return this.__data__.get(n);
    }, Vn.prototype.has = function (n) {
      return this.__data__.has(n);
    }, Vn.prototype.set = function (n, t) {
      var r = this.__data__;if (r instanceof Nn) {
        var e = r.__data__;if (!Zi || 199 > e.length) return e.push([n, t]), this.size = ++r.size, this;r = this.__data__ = new Pn(e);
      }return r.set(n, t), this.size = r.size, this;
    };var oo = Zr(Et),
        fo = Zr(Ot, true),
        co = qr(),
        ao = qr(true),
        lo = Hi ? function (n, t) {
      return Hi.set(n, t), n;
    } : Nu,
        so = Ei ? function (n, t) {
      return Ei(n, "toString", { configurable: true, enumerable: false, value: Fu(t), writable: true });
    } : Nu,
        ho = Oi || function (n) {
      return Zn.clearTimeout(n);
    },
        po = Vi && 1 / D(new Vi([, -0]))[1] == N ? function (n) {
      return new Vi(n);
    } : qu,
        _o = Hi ? function (n) {
      return Hi.get(n);
    } : qu,
        vo = Wi ? function (n) {
      return null == n ? [] : (n = ni(n), f(Wi(n), function (t) {
        return ji.call(n, t);
      }));
    } : Ku,
        go = Wi ? function (n) {
      for (var t = []; n;) {
        s(t, vo(n)), n = bi(n);
      }return t;
    } : Ku,
        yo = zt;(Pi && "[object DataView]" != yo(new Pi(new ArrayBuffer(1))) || Zi && "[object Map]" != yo(new Zi()) || qi && "[object Promise]" != yo(qi.resolve()) || Vi && "[object Set]" != yo(new Vi()) || Ki && "[object WeakMap]" != yo(new Ki())) && (yo = function yo(n) {
      var t = zt(n);if (n = (n = "[object Object]" == t ? n.constructor : F) ? Fe(n) : "") switch (n) {case Yi:
          return "[object DataView]";case Qi:
          return "[object Map]";case Xi:
          return "[object Promise]";case no:
          return "[object Set]";case to:
          return "[object WeakMap]";}return t;
    });var bo = oi ? gu : Gu,
        xo = Me(lo),
        jo = Ii || function (n, t) {
      return Zn.setTimeout(n, t);
    },
        wo = Me(so),
        mo = function (n) {
      n = lu(n, function (n) {
        return 500 === t.size && t.clear(), n;
      });var t = n.cache;return n;
    }(function (n) {
      var t = [];return en.test(n) && t.push(""), n.replace(un, function (n, r, e, u) {
        t.push(e ? u.replace(vn, "$1") : r || n);
      }), t;
    }),
        Ao = lr(function (n, t) {
      return _u(n) ? jt(n, kt(t, 1, _u, true)) : [];
    }),
        ko = lr(function (n, t) {
      var r = Ge(t);return _u(r) && (r = F), _u(n) ? jt(n, kt(t, 1, _u, true), je(r, 2)) : [];
    }),
        Eo = lr(function (n, t) {
      var r = Ge(t);return _u(r) && (r = F), _u(n) ? jt(n, kt(t, 1, _u, true), F, r) : [];
    }),
        Oo = lr(function (n) {
      var t = l(n, Sr);return t.length && t[0] === n[0] ? Ut(t) : [];
    }),
        So = lr(function (n) {
      var t = Ge(n),
          r = l(n, Sr);return t === Ge(r) ? t = F : r.pop(), r.length && r[0] === n[0] ? Ut(r, je(t, 2)) : [];
    }),
        Io = lr(function (n) {
      var t = Ge(n),
          r = l(n, Sr);return (t = typeof t == "function" ? t : F) && r.pop(), r.length && r[0] === n[0] ? Ut(r, F, t) : [];
    }),
        Ro = lr(He),
        zo = ge(function (n, t) {
      var r = null == n ? 0 : n.length,
          e = vt(n, t);return fr(n, l(t, function (n) {
        return Re(n, r) ? +n : n;
      }).sort(Ur)), e;
    }),
        Wo = lr(function (n) {
      return wr(kt(n, 1, _u, true));
    }),
        Bo = lr(function (n) {
      var t = Ge(n);return _u(t) && (t = F), wr(kt(n, 1, _u, true), je(t, 2));
    }),
        Lo = lr(function (n) {
      var t = Ge(n),
          t = typeof t == "function" ? t : F;return wr(kt(n, 1, _u, true), F, t);
    }),
        Uo = lr(function (n, t) {
      return _u(n) ? jt(n, t) : [];
    }),
        Co = lr(function (n) {
      return Er(f(n, _u));
    }),
        Do = lr(function (n) {
      var t = Ge(n);return _u(t) && (t = F), Er(f(n, _u), je(t, 2));
    }),
        Mo = lr(function (n) {
      var t = Ge(n),
          t = typeof t == "function" ? t : F;return Er(f(n, _u), F, t);
    }),
        To = lr(Ye),
        $o = lr(function (n) {
      var t = n.length,
          t = 1 < t ? n[t - 1] : F,
          t = typeof t == "function" ? (n.pop(), t) : F;return Qe(n, t);
    }),
        Fo = ge(function (n) {
      function t(t) {
        return vt(t, n);
      }var r = n.length,
          e = r ? n[0] : 0,
          u = this.__wrapped__;return !(1 < r || this.__actions__.length) && u instanceof Mn && Re(e) ? (u = u.slice(e, +e + (r ? 1 : 0)), u.__actions__.push({ func: nu, args: [t], thisArg: F }), new zn(u, this.__chain__).thru(function (n) {
        return r && !n.length && n.push(F), n;
      })) : this.thru(t);
    }),
        No = Nr(function (n, t, r) {
      ci.call(n, r) ? ++n[r] : _t(n, r, 1);
    }),
        Po = Yr(Ze),
        Zo = Yr(qe),
        qo = Nr(function (n, t, r) {
      ci.call(n, r) ? n[r].push(t) : _t(n, r, [t]);
    }),
        Vo = lr(function (n, t, e) {
      var u = -1,
          i = typeof t == "function",
          o = pu(n) ? Hu(n.length) : [];return oo(n, function (n) {
        o[++u] = i ? r(t, n, e) : Dt(n, t, e);
      }), o;
    }),
        Ko = Nr(function (n, t, r) {
      _t(n, r, t);
    }),
        Go = Nr(function (n, t, r) {
      n[r ? 0 : 1].push(t);
    }, function () {
      return [[], []];
    }),
        Ho = lr(function (n, t) {
      if (null == n) return [];var r = t.length;return 1 < r && ze(n, t[0], t[1]) ? t = [] : 2 < r && ze(t[0], t[1], t[2]) && (t = [t[0]]), rr(n, kt(t, 1), []);
    }),
        Jo = Si || function () {
      return Zn.Date.now();
    },
        Yo = lr(function (n, t, r) {
      var e = 1;if (r.length) var u = C(r, xe(Yo)),
          e = 32 | e;return le(n, e, t, r, u);
    }),
        Qo = lr(function (n, t, r) {
      var e = 3;if (r.length) var u = C(r, xe(Qo)),
          e = 32 | e;return le(t, e, n, r, u);
    }),
        Xo = lr(function (n, t) {
      return xt(n, 1, t);
    }),
        nf = lr(function (n, t, r) {
      return xt(n, Iu(t) || 0, r);
    });lu.Cache = Pn;var tf = lr(function (n, t) {
      t = 1 == t.length && af(t[0]) ? l(t[0], S(je())) : l(kt(t, 1), S(je()));var e = t.length;return lr(function (u) {
        for (var i = -1, o = Mi(u.length, e); ++i < o;) {
          u[i] = t[i].call(this, u[i]);
        }return r(n, this, u);
      });
    }),
        rf = lr(function (n, t) {
      return le(n, 32, F, t, C(t, xe(rf)));
    }),
        ef = lr(function (n, t) {
      return le(n, 64, F, t, C(t, xe(ef)));
    }),
        uf = ge(function (n, t) {
      return le(n, 256, F, F, F, t);
    }),
        of = oe(Wt),
        ff = oe(function (n, t) {
      return n >= t;
    }),
        cf = Mt(function () {
      return arguments;
    }()) ? Mt : function (n) {
      return xu(n) && ci.call(n, "callee") && !ji.call(n, "callee");
    },
        af = Hu.isArray,
        lf = Hn ? S(Hn) : Tt,
        sf = Bi || Gu,
        hf = Jn ? S(Jn) : $t,
        pf = Yn ? S(Yn) : Nt,
        _f = Qn ? S(Qn) : qt,
        vf = Xn ? S(Xn) : Vt,
        gf = nt ? S(nt) : Kt,
        df = oe(Jt),
        yf = oe(function (n, t) {
      return n <= t;
    }),
        bf = Pr(function (n, t) {
      if (Le(t) || pu(t)) Tr(t, Lu(t), n);else for (var r in t) {
        ci.call(t, r) && at(n, r, t[r]);
      }
    }),
        xf = Pr(function (n, t) {
      Tr(t, Uu(t), n);
    }),
        jf = Pr(function (n, t, r, e) {
      Tr(t, Uu(t), n, e);
    }),
        wf = Pr(function (n, t, r, e) {
      Tr(t, Lu(t), n, e);
    }),
        mf = ge(vt),
        Af = lr(function (n) {
      return n.push(F, se), r(jf, F, n);
    }),
        kf = lr(function (n) {
      return n.push(F, he), r(Rf, F, n);
    }),
        Ef = ne(function (n, t, r) {
      n[t] = r;
    }, Fu(Nu)),
        Of = ne(function (n, t, r) {
      ci.call(n, t) ? n[t].push(r) : n[t] = [r];
    }, je),
        Sf = lr(Dt),
        If = Pr(function (n, t, r) {
      nr(n, t, r);
    }),
        Rf = Pr(function (n, t, r, e) {
      nr(n, t, r, e);
    }),
        zf = ge(function (n, t) {
      var r = {};if (null == n) return r;var e = false;t = l(t, function (t) {
        return t = Rr(t, n), e || (e = 1 < t.length), t;
      }), Tr(n, ye(n), r), e && (r = dt(r, 7, pe));for (var u = t.length; u--;) {
        mr(r, t[u]);
      }return r;
    }),
        Wf = ge(function (n, t) {
      return null == n ? {} : er(n, t);
    }),
        Bf = ae(Lu),
        Lf = ae(Uu),
        Uf = Gr(function (n, t, r) {
      return t = t.toLowerCase(), n + (r ? Mu(t) : t);
    }),
        Cf = Gr(function (n, t, r) {
      return n + (r ? "-" : "") + t.toLowerCase();
    }),
        Df = Gr(function (n, t, r) {
      return n + (r ? " " : "") + t.toLowerCase();
    }),
        Mf = Kr("toLowerCase"),
        Tf = Gr(function (n, t, r) {
      return n + (r ? "_" : "") + t.toLowerCase();
    }),
        $f = Gr(function (n, t, r) {
      return n + (r ? " " : "") + Nf(t);
    }),
        Ff = Gr(function (n, t, r) {
      return n + (r ? " " : "") + t.toUpperCase();
    }),
        Nf = Kr("toUpperCase"),
        Pf = lr(function (n, t) {
      try {
        return r(n, F, t);
      } catch (n) {
        return vu(n) ? n : new Yu(n);
      }
    }),
        Zf = ge(function (n, t) {
      return u(t, function (t) {
        t = $e(t), _t(n, t, Yo(n[t], n));
      }), n;
    }),
        qf = Qr(),
        Vf = Qr(true),
        Kf = lr(function (n, t) {
      return function (r) {
        return Dt(r, n, t);
      };
    }),
        Gf = lr(function (n, t) {
      return function (r) {
        return Dt(n, r, t);
      };
    }),
        Hf = re(l),
        Jf = re(o),
        Yf = re(_),
        Qf = ie(),
        Xf = ie(true),
        nc = te(function (n, t) {
      return n + t;
    }, 0),
        tc = ce("ceil"),
        rc = te(function (n, t) {
      return n / t;
    }, 1),
        ec = ce("floor"),
        uc = te(function (n, t) {
      return n * t;
    }, 1),
        ic = ce("round"),
        oc = te(function (n, t) {
      return n - t;
    }, 0);return On.after = function (n, t) {
      if (typeof t != "function") throw new ei("Expected a function");return n = Ou(n), function () {
        if (1 > --n) return t.apply(this, arguments);
      };
    }, On.ary = iu, On.assign = bf, On.assignIn = xf, On.assignInWith = jf, On.assignWith = wf, On.at = mf, On.before = ou, On.bind = Yo, On.bindAll = Zf, On.bindKey = Qo, On.castArray = function () {
      if (!arguments.length) return [];var n = arguments[0];return af(n) ? n : [n];
    }, On.chain = Xe, On.chunk = function (n, t, r) {
      if (t = (r ? ze(n, t, r) : t === F) ? 1 : Di(Ou(t), 0), r = null == n ? 0 : n.length, !r || 1 > t) return [];for (var e = 0, u = 0, i = Hu(Ri(r / t)); e < r;) {
        i[u++] = vr(n, e, e += t);
      }return i;
    }, On.compact = function (n) {
      for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r;) {
        var i = n[t];i && (u[e++] = i);
      }return u;
    }, On.concat = function () {
      var n = arguments.length;if (!n) return [];for (var t = Hu(n - 1), r = arguments[0]; n--;) {
        t[n - 1] = arguments[n];
      }return s(af(r) ? Mr(r) : [r], kt(t, 1));
    }, On.cond = function (n) {
      var t = null == n ? 0 : n.length,
          e = je();return n = t ? l(n, function (n) {
        if ("function" != typeof n[1]) throw new ei("Expected a function");return [e(n[0]), n[1]];
      }) : [], lr(function (e) {
        for (var u = -1; ++u < t;) {
          var i = n[u];if (r(i[0], this, e)) return r(i[1], this, e);
        }
      });
    }, On.conforms = function (n) {
      return yt(dt(n, 1));
    }, On.constant = Fu, On.countBy = No, On.create = function (n, t) {
      var r = io(n);return null == t ? r : ht(r, t);
    }, On.curry = fu, On.curryRight = cu, On.debounce = au, On.defaults = Af, On.defaultsDeep = kf, On.defer = Xo, On.delay = nf, On.difference = Ao, On.differenceBy = ko, On.differenceWith = Eo, On.drop = function (n, t, r) {
      var e = null == n ? 0 : n.length;
      return e ? (t = r || t === F ? 1 : Ou(t), vr(n, 0 > t ? 0 : t, e)) : [];
    }, On.dropRight = function (n, t, r) {
      var e = null == n ? 0 : n.length;return e ? (t = r || t === F ? 1 : Ou(t), t = e - t, vr(n, 0, 0 > t ? 0 : t)) : [];
    }, On.dropRightWhile = function (n, t) {
      return n && n.length ? Ar(n, je(t, 3), true, true) : [];
    }, On.dropWhile = function (n, t) {
      return n && n.length ? Ar(n, je(t, 3), true) : [];
    }, On.fill = function (n, t, r, e) {
      var u = null == n ? 0 : n.length;if (!u) return [];for (r && typeof r != "number" && ze(n, t, r) && (r = 0, e = u), u = n.length, r = Ou(r), 0 > r && (r = -r > u ? 0 : u + r), e = e === F || e > u ? u : Ou(e), 0 > e && (e += u), e = r > e ? 0 : Su(e); r < e;) {
        n[r++] = t;
      }return n;
    }, On.filter = function (n, t) {
      return (af(n) ? f : At)(n, je(t, 3));
    }, On.flatMap = function (n, t) {
      return kt(uu(n, t), 1);
    }, On.flatMapDeep = function (n, t) {
      return kt(uu(n, t), N);
    }, On.flatMapDepth = function (n, t, r) {
      return r = r === F ? 1 : Ou(r), kt(uu(n, t), r);
    }, On.flatten = Ve, On.flattenDeep = function (n) {
      return (null == n ? 0 : n.length) ? kt(n, N) : [];
    }, On.flattenDepth = function (n, t) {
      return null != n && n.length ? (t = t === F ? 1 : Ou(t), kt(n, t)) : [];
    }, On.flip = function (n) {
      return le(n, 512);
    }, On.flow = qf, On.flowRight = Vf, On.fromPairs = function (n) {
      for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r;) {
        var u = n[t];e[u[0]] = u[1];
      }return e;
    }, On.functions = function (n) {
      return null == n ? [] : St(n, Lu(n));
    }, On.functionsIn = function (n) {
      return null == n ? [] : St(n, Uu(n));
    }, On.groupBy = qo, On.initial = function (n) {
      return (null == n ? 0 : n.length) ? vr(n, 0, -1) : [];
    }, On.intersection = Oo, On.intersectionBy = So, On.intersectionWith = Io, On.invert = Ef, On.invertBy = Of, On.invokeMap = Vo, On.iteratee = Pu, On.keyBy = Ko, On.keys = Lu, On.keysIn = Uu, On.map = uu, On.mapKeys = function (n, t) {
      var r = {};return t = je(t, 3), Et(n, function (n, e, u) {
        _t(r, t(n, e, u), n);
      }), r;
    }, On.mapValues = function (n, t) {
      var r = {};return t = je(t, 3), Et(n, function (n, e, u) {
        _t(r, e, t(n, e, u));
      }), r;
    }, On.matches = function (n) {
      return Qt(dt(n, 1));
    }, On.matchesProperty = function (n, t) {
      return Xt(n, dt(t, 1));
    }, On.memoize = lu, On.merge = If, On.mergeWith = Rf, On.method = Kf, On.methodOf = Gf, On.mixin = Zu, On.negate = su, On.nthArg = function (n) {
      return n = Ou(n), lr(function (t) {
        return tr(t, n);
      });
    }, On.omit = zf, On.omitBy = function (n, t) {
      return Cu(n, su(je(t)));
    }, On.once = function (n) {
      return ou(2, n);
    }, On.orderBy = function (n, t, r, e) {
      return null == n ? [] : (af(t) || (t = null == t ? [] : [t]), r = e ? F : r, af(r) || (r = null == r ? [] : [r]), rr(n, t, r));
    }, On.over = Hf, On.overArgs = tf, On.overEvery = Jf, On.overSome = Yf, On.partial = rf, On.partialRight = ef, On.partition = Go, On.pick = Wf, On.pickBy = Cu, On.property = Vu, On.propertyOf = function (n) {
      return function (t) {
        return null == n ? F : It(n, t);
      };
    }, On.pull = Ro, On.pullAll = He, On.pullAllBy = function (n, t, r) {
      return n && n.length && t && t.length ? or(n, t, je(r, 2)) : n;
    }, On.pullAllWith = function (n, t, r) {
      return n && n.length && t && t.length ? or(n, t, F, r) : n;
    }, On.pullAt = zo, On.range = Qf, On.rangeRight = Xf, On.rearg = uf, On.reject = function (n, t) {
      return (af(n) ? f : At)(n, su(je(t, 3)));
    }, On.remove = function (n, t) {
      var r = [];if (!n || !n.length) return r;var e = -1,
          u = [],
          i = n.length;for (t = je(t, 3); ++e < i;) {
        var o = n[e];t(o, e, n) && (r.push(o), u.push(e));
      }return fr(n, u), r;
    }, On.rest = function (n, t) {
      if (typeof n != "function") throw new ei("Expected a function");return t = t === F ? t : Ou(t), lr(n, t);
    }, On.reverse = Je, On.sampleSize = function (n, t, r) {
      return t = (r ? ze(n, t, r) : t === F) ? 1 : Ou(t), (af(n) ? ot : hr)(n, t);
    }, On.set = function (n, t, r) {
      return null == n ? n : pr(n, t, r);
    }, On.setWith = function (n, t, r, e) {
      return e = typeof e == "function" ? e : F, null == n ? n : pr(n, t, r, e);
    }, On.shuffle = function (n) {
      return (af(n) ? ft : _r)(n);
    }, On.slice = function (n, t, r) {
      var e = null == n ? 0 : n.length;return e ? (r && typeof r != "number" && ze(n, t, r) ? (t = 0, r = e) : (t = null == t ? 0 : Ou(t), r = r === F ? e : Ou(r)), vr(n, t, r)) : [];
    }, On.sortBy = Ho, On.sortedUniq = function (n) {
      return n && n.length ? br(n) : [];
    }, On.sortedUniqBy = function (n, t) {
      return n && n.length ? br(n, je(t, 2)) : [];
    }, On.split = function (n, t, r) {
      return r && typeof r != "number" && ze(n, t, r) && (t = r = F), r = r === F ? 4294967295 : r >>> 0, r ? (n = zu(n)) && (typeof t == "string" || null != t && !_f(t)) && (t = jr(t), !t && Bn.test(n)) ? zr($(n), 0, r) : n.split(t, r) : [];
    }, On.spread = function (n, t) {
      if (typeof n != "function") throw new ei("Expected a function");return t = null == t ? 0 : Di(Ou(t), 0), lr(function (e) {
        var u = e[t];return e = zr(e, 0, t), u && s(e, u), r(n, this, e);
      });
    }, On.tail = function (n) {
      var t = null == n ? 0 : n.length;return t ? vr(n, 1, t) : [];
    }, On.take = function (n, t, r) {
      return n && n.length ? (t = r || t === F ? 1 : Ou(t), vr(n, 0, 0 > t ? 0 : t)) : [];
    }, On.takeRight = function (n, t, r) {
      var e = null == n ? 0 : n.length;return e ? (t = r || t === F ? 1 : Ou(t), t = e - t, vr(n, 0 > t ? 0 : t, e)) : [];
    }, On.takeRightWhile = function (n, t) {
      return n && n.length ? Ar(n, je(t, 3), false, true) : [];
    }, On.takeWhile = function (n, t) {
      return n && n.length ? Ar(n, je(t, 3)) : [];
    }, On.tap = function (n, t) {
      return t(n), n;
    }, On.throttle = function (n, t, r) {
      var e = true,
          u = true;if (typeof n != "function") throw new ei("Expected a function");return bu(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), au(n, t, { leading: e, maxWait: t, trailing: u });
    }, On.thru = nu, On.toArray = ku, On.toPairs = Bf, On.toPairsIn = Lf, On.toPath = function (n) {
      return af(n) ? l(n, $e) : Au(n) ? [n] : Mr(mo(zu(n)));
    }, On.toPlainObject = Ru, On.transform = function (n, t, r) {
      var e = af(n),
          i = e || sf(n) || gf(n);if (t = je(t, 4), null == r) {
        var o = n && n.constructor;r = i ? e ? new o() : [] : bu(n) && gu(o) ? io(bi(n)) : {};
      }return (i ? u : Et)(n, function (n, e, u) {
        return t(r, n, e, u);
      }), r;
    }, On.unary = function (n) {
      return iu(n, 1);
    }, On.union = Wo, On.unionBy = Bo, On.unionWith = Lo, On.uniq = function (n) {
      return n && n.length ? wr(n) : [];
    }, On.uniqBy = function (n, t) {
      return n && n.length ? wr(n, je(t, 2)) : [];
    }, On.uniqWith = function (n, t) {
      return t = typeof t == "function" ? t : F, n && n.length ? wr(n, F, t) : [];
    }, On.unset = function (n, t) {
      return null == n || mr(n, t);
    }, On.unzip = Ye, On.unzipWith = Qe, On.update = function (n, t, r) {
      return null == n ? n : pr(n, t, Ir(r)(It(n, t)), void 0);
    }, On.updateWith = function (n, t, r, e) {
      return e = typeof e == "function" ? e : F, null != n && (n = pr(n, t, Ir(r)(It(n, t)), e)), n;
    }, On.values = Du, On.valuesIn = function (n) {
      return null == n ? [] : I(n, Uu(n));
    }, On.without = Uo, On.words = $u, On.wrap = function (n, t) {
      return rf(Ir(t), n);
    }, On.xor = Co, On.xorBy = Do, On.xorWith = Mo, On.zip = To, On.zipObject = function (n, t) {
      return Or(n || [], t || [], at);
    }, On.zipObjectDeep = function (n, t) {
      return Or(n || [], t || [], pr);
    }, On.zipWith = $o, On.entries = Bf, On.entriesIn = Lf, On.extend = xf, On.extendWith = jf, Zu(On, On), On.add = nc, On.attempt = Pf, On.camelCase = Uf, On.capitalize = Mu, On.ceil = tc, On.clamp = function (n, t, r) {
      return r === F && (r = t, t = F), r !== F && (r = Iu(r), r = r === r ? r : 0), t !== F && (t = Iu(t), t = t === t ? t : 0), gt(Iu(n), t, r);
    }, On.clone = function (n) {
      return dt(n, 4);
    }, On.cloneDeep = function (n) {
      return dt(n, 5);
    }, On.cloneDeepWith = function (n, t) {
      return t = typeof t == "function" ? t : F, dt(n, 5, t);
    }, On.cloneWith = function (n, t) {
      return t = typeof t == "function" ? t : F, dt(n, 4, t);
    }, On.conformsTo = function (n, t) {
      return null == t || bt(n, t, Lu(t));
    }, On.deburr = Tu, On.defaultTo = function (n, t) {
      return null == n || n !== n ? t : n;
    }, On.divide = rc, On.endsWith = function (n, t, r) {
      n = zu(n), t = jr(t);var e = n.length,
          e = r = r === F ? e : gt(Ou(r), 0, e);return r -= t.length, 0 <= r && n.slice(r, e) == t;
    }, On.eq = hu, On.escape = function (n) {
      return (n = zu(n)) && Y.test(n) ? n.replace(H, et) : n;
    }, On.escapeRegExp = function (n) {
      return (n = zu(n)) && fn.test(n) ? n.replace(on, "\\$&") : n;
    }, On.every = function (n, t, r) {
      var e = af(n) ? o : wt;return r && ze(n, t, r) && (t = F), e(n, je(t, 3));
    }, On.find = Po, On.findIndex = Ze, On.findKey = function (n, t) {
      return v(n, je(t, 3), Et);
    }, On.findLast = Zo, On.findLastIndex = qe, On.findLastKey = function (n, t) {
      return v(n, je(t, 3), Ot);
    }, On.floor = ec, On.forEach = ru, On.forEachRight = eu, On.forIn = function (n, t) {
      return null == n ? n : co(n, je(t, 3), Uu);
    }, On.forInRight = function (n, t) {
      return null == n ? n : ao(n, je(t, 3), Uu);
    }, On.forOwn = function (n, t) {
      return n && Et(n, je(t, 3));
    }, On.forOwnRight = function (n, t) {
      return n && Ot(n, je(t, 3));
    }, On.get = Wu, On.gt = of, On.gte = ff, On.has = function (n, t) {
      return null != n && ke(n, t, Bt);
    }, On.hasIn = Bu, On.head = Ke, On.identity = Nu, On.includes = function (n, t, r, e) {
      return n = pu(n) ? n : Du(n), r = r && !e ? Ou(r) : 0, e = n.length, 0 > r && (r = Di(e + r, 0)), mu(n) ? r <= e && -1 < n.indexOf(t, r) : !!e && -1 < d(n, t, r);
    }, On.indexOf = function (n, t, r) {
      var e = null == n ? 0 : n.length;return e ? (r = null == r ? 0 : Ou(r), 0 > r && (r = Di(e + r, 0)), d(n, t, r)) : -1;
    }, On.inRange = function (n, t, r) {
      return t = Eu(t), r === F ? (r = t, t = 0) : r = Eu(r), n = Iu(n), n >= Mi(t, r) && n < Di(t, r);
    }, On.invoke = Sf, On.isArguments = cf, On.isArray = af, On.isArrayBuffer = lf, On.isArrayLike = pu, On.isArrayLikeObject = _u, On.isBoolean = function (n) {
      return true === n || false === n || xu(n) && "[object Boolean]" == zt(n);
    }, On.isBuffer = sf, On.isDate = hf, On.isElement = function (n) {
      return xu(n) && 1 === n.nodeType && !wu(n);
    }, On.isEmpty = function (n) {
      if (null == n) return true;if (pu(n) && (af(n) || typeof n == "string" || typeof n.splice == "function" || sf(n) || gf(n) || cf(n))) return !n.length;var t = yo(n);if ("[object Map]" == t || "[object Set]" == t) return !n.size;if (Le(n)) return !Ht(n).length;for (var r in n) {
        if (ci.call(n, r)) return false;
      }return true;
    }, On.isEqual = function (n, t) {
      return Ft(n, t);
    }, On.isEqualWith = function (n, t, r) {
      var e = (r = typeof r == "function" ? r : F) ? r(n, t) : F;return e === F ? Ft(n, t, F, r) : !!e;
    }, On.isError = vu, On.isFinite = function (n) {
      return typeof n == "number" && Li(n);
    }, On.isFunction = gu, On.isInteger = du, On.isLength = yu, On.isMap = pf, On.isMatch = function (n, t) {
      return n === t || Pt(n, t, me(t));
    }, On.isMatchWith = function (n, t, r) {
      return r = typeof r == "function" ? r : F, Pt(n, t, me(t), r);
    }, On.isNaN = function (n) {
      return ju(n) && n != +n;
    }, On.isNative = function (n) {
      if (bo(n)) throw new Yu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
      return Zt(n);
    }, On.isNil = function (n) {
      return null == n;
    }, On.isNull = function (n) {
      return null === n;
    }, On.isNumber = ju, On.isObject = bu, On.isObjectLike = xu, On.isPlainObject = wu, On.isRegExp = _f, On.isSafeInteger = function (n) {
      return du(n) && -9007199254740991 <= n && 9007199254740991 >= n;
    }, On.isSet = vf, On.isString = mu, On.isSymbol = Au, On.isTypedArray = gf, On.isUndefined = function (n) {
      return n === F;
    }, On.isWeakMap = function (n) {
      return xu(n) && "[object WeakMap]" == yo(n);
    }, On.isWeakSet = function (n) {
      return xu(n) && "[object WeakSet]" == zt(n);
    }, On.join = function (n, t) {
      return null == n ? "" : Ui.call(n, t);
    }, On.kebabCase = Cf, On.last = Ge, On.lastIndexOf = function (n, t, r) {
      var e = null == n ? 0 : n.length;if (!e) return -1;var u = e;if (r !== F && (u = Ou(r), u = 0 > u ? Di(e + u, 0) : Mi(u, e - 1)), t === t) {
        for (r = u + 1; r-- && n[r] !== t;) {}n = r;
      } else n = g(n, b, u, true);return n;
    }, On.lowerCase = Df, On.lowerFirst = Mf, On.lt = df, On.lte = yf, On.max = function (n) {
      return n && n.length ? mt(n, Nu, Wt) : F;
    }, On.maxBy = function (n, t) {
      return n && n.length ? mt(n, je(t, 2), Wt) : F;
    }, On.mean = function (n) {
      return x(n, Nu);
    }, On.meanBy = function (n, t) {
      return x(n, je(t, 2));
    }, On.min = function (n) {
      return n && n.length ? mt(n, Nu, Jt) : F;
    }, On.minBy = function (n, t) {
      return n && n.length ? mt(n, je(t, 2), Jt) : F;
    }, On.stubArray = Ku, On.stubFalse = Gu, On.stubObject = function () {
      return {};
    }, On.stubString = function () {
      return "";
    }, On.stubTrue = function () {
      return true;
    }, On.multiply = uc, On.nth = function (n, t) {
      return n && n.length ? tr(n, Ou(t)) : F;
    }, On.noConflict = function () {
      return Zn._ === this && (Zn._ = pi), this;
    }, On.noop = qu, On.now = Jo, On.pad = function (n, t, r) {
      n = zu(n);var e = (t = Ou(t)) ? T(n) : 0;return !t || e >= t ? n : (t = (t - e) / 2, ee(zi(t), r) + n + ee(Ri(t), r));
    }, On.padEnd = function (n, t, r) {
      n = zu(n);var e = (t = Ou(t)) ? T(n) : 0;return t && e < t ? n + ee(t - e, r) : n;
    }, On.padStart = function (n, t, r) {
      n = zu(n);var e = (t = Ou(t)) ? T(n) : 0;return t && e < t ? ee(t - e, r) + n : n;
    }, On.parseInt = function (n, t, r) {
      return r || null == t ? t = 0 : t && (t = +t), $i(zu(n).replace(an, ""), t || 0);
    }, On.random = function (n, t, r) {
      if (r && typeof r != "boolean" && ze(n, t, r) && (t = r = F), r === F && (typeof t == "boolean" ? (r = t, t = F) : typeof n == "boolean" && (r = n, n = F)), n === F && t === F ? (n = 0, t = 1) : (n = Eu(n), t === F ? (t = n, n = 0) : t = Eu(t)), n > t) {
        var e = n;n = t, t = e;
      }return r || n % 1 || t % 1 ? (r = Fi(), Mi(n + r * (t - n + $n("1e-" + ((r + "").length - 1))), t)) : cr(n, t);
    }, On.reduce = function (n, t, r) {
      var e = af(n) ? h : m,
          u = 3 > arguments.length;return e(n, je(t, 4), r, u, oo);
    }, On.reduceRight = function (n, t, r) {
      var e = af(n) ? p : m,
          u = 3 > arguments.length;return e(n, je(t, 4), r, u, fo);
    }, On.repeat = function (n, t, r) {
      return t = (r ? ze(n, t, r) : t === F) ? 1 : Ou(t), ar(zu(n), t);
    }, On.replace = function () {
      var n = arguments,
          t = zu(n[0]);return 3 > n.length ? t : t.replace(n[1], n[2]);
    }, On.result = function (n, t, r) {
      t = Rr(t, n);var e = -1,
          u = t.length;for (u || (u = 1, n = F); ++e < u;) {
        var i = null == n ? F : n[$e(t[e])];i === F && (e = u, i = r), n = gu(i) ? i.call(n) : i;
      }return n;
    }, On.round = ic, On.runInContext = w, On.sample = function (n) {
      return (af(n) ? tt : sr)(n);
    }, On.size = function (n) {
      if (null == n) return 0;if (pu(n)) return mu(n) ? T(n) : n.length;var t = yo(n);return "[object Map]" == t || "[object Set]" == t ? n.size : Ht(n).length;
    }, On.snakeCase = Tf, On.some = function (n, t, r) {
      var e = af(n) ? _ : gr;return r && ze(n, t, r) && (t = F), e(n, je(t, 3));
    }, On.sortedIndex = function (n, t) {
      return dr(n, t);
    }, On.sortedIndexBy = function (n, t, r) {
      return yr(n, t, je(r, 2));
    }, On.sortedIndexOf = function (n, t) {
      var r = null == n ? 0 : n.length;if (r) {
        var e = dr(n, t);if (e < r && hu(n[e], t)) return e;
      }return -1;
    }, On.sortedLastIndex = function (n, t) {
      return dr(n, t, true);
    }, On.sortedLastIndexBy = function (n, t, r) {
      return yr(n, t, je(r, 2), true);
    }, On.sortedLastIndexOf = function (n, t) {
      if (null == n ? 0 : n.length) {
        var r = dr(n, t, true) - 1;if (hu(n[r], t)) return r;
      }return -1;
    }, On.startCase = $f, On.startsWith = function (n, t, r) {
      return n = zu(n), r = null == r ? 0 : gt(Ou(r), 0, n.length), t = jr(t), n.slice(r, r + t.length) == t;
    }, On.subtract = oc, On.sum = function (n) {
      return n && n.length ? k(n, Nu) : 0;
    }, On.sumBy = function (n, t) {
      return n && n.length ? k(n, je(t, 2)) : 0;
    }, On.template = function (n, t, r) {
      var e = On.templateSettings;r && ze(n, t, r) && (t = F), n = zu(n), t = jf({}, t, e, se), r = jf({}, t.imports, e.imports, se);var u,
          i,
          o = Lu(r),
          f = I(r, o),
          c = 0;r = t.interpolate || An;var a = "__p+='";r = ti((t.escape || An).source + "|" + r.source + "|" + (r === nn ? gn : An).source + "|" + (t.evaluate || An).source + "|$", "g");var l = "sourceURL" in t ? "//# sourceURL=" + t.sourceURL + "\n" : "";if (n.replace(r, function (t, r, e, o, f, l) {
        return e || (e = o), a += n.slice(c, l).replace(kn, B), r && (u = true, a += "'+__e(" + r + ")+'"), f && (i = true, a += "';" + f + ";\n__p+='"), e && (a += "'+((__t=(" + e + "))==null?'':__t)+'"), c = l + t.length, t;
      }), a += "';", (t = t.variable) || (a = "with(obj){" + a + "}"), a = (i ? a.replace(q, "") : a).replace(V, "$1").replace(K, "$1;"), a = "function(" + (t || "obj") + "){" + (t ? "" : "obj||(obj={});") + "var __t,__p=''" + (u ? ",__e=_.escape" : "") + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + a + "return __p}", t = Pf(function () {
        return Qu(o, l + "return " + a).apply(F, f);
      }), t.source = a, vu(t)) throw t;return t;
    }, On.times = function (n, t) {
      if (n = Ou(n), 1 > n || 9007199254740991 < n) return [];
      var r = 4294967295,
          e = Mi(n, 4294967295);for (t = je(t), n -= 4294967295, e = E(e, t); ++r < n;) {
        t(r);
      }return e;
    }, On.toFinite = Eu, On.toInteger = Ou, On.toLength = Su, On.toLower = function (n) {
      return zu(n).toLowerCase();
    }, On.toNumber = Iu, On.toSafeInteger = function (n) {
      return n ? gt(Ou(n), -9007199254740991, 9007199254740991) : 0 === n ? n : 0;
    }, On.toString = zu, On.toUpper = function (n) {
      return zu(n).toUpperCase();
    }, On.trim = function (n, t, r) {
      return (n = zu(n)) && (r || t === F) ? n.replace(cn, "") : n && (t = jr(t)) ? (n = $(n), r = $(t), t = z(n, r), r = W(n, r) + 1, zr(n, t, r).join("")) : n;
    }, On.trimEnd = function (n, t, r) {
      return (n = zu(n)) && (r || t === F) ? n.replace(ln, "") : n && (t = jr(t)) ? (n = $(n), t = W(n, $(t)) + 1, zr(n, 0, t).join("")) : n;
    }, On.trimStart = function (n, t, r) {
      return (n = zu(n)) && (r || t === F) ? n.replace(an, "") : n && (t = jr(t)) ? (n = $(n), t = z(n, $(t)), zr(n, t).join("")) : n;
    }, On.truncate = function (n, t) {
      var r = 30,
          e = "...";if (bu(t)) var u = "separator" in t ? t.separator : u,
          r = "length" in t ? Ou(t.length) : r,
          e = "omission" in t ? jr(t.omission) : e;n = zu(n);var i = n.length;if (Bn.test(n)) var o = $(n),
          i = o.length;if (r >= i) return n;if (i = r - T(e), 1 > i) return e;
      if (r = o ? zr(o, 0, i).join("") : n.slice(0, i), u === F) return r + e;if (o && (i += r.length - i), _f(u)) {
        if (n.slice(i).search(u)) {
          var f = r;for (u.global || (u = ti(u.source, zu(dn.exec(u)) + "g")), u.lastIndex = 0; o = u.exec(f);) {
            var c = o.index;
          }r = r.slice(0, c === F ? i : c);
        }
      } else n.indexOf(jr(u), i) != i && (u = r.lastIndexOf(u), -1 < u && (r = r.slice(0, u)));return r + e;
    }, On.unescape = function (n) {
      return (n = zu(n)) && J.test(n) ? n.replace(G, ut) : n;
    }, On.uniqueId = function (n) {
      var t = ++ai;return zu(n) + t;
    }, On.upperCase = Ff, On.upperFirst = Nf, On.each = ru, On.eachRight = eu, On.first = Ke, Zu(On, function () {
      var n = {};return Et(On, function (t, r) {
        ci.call(On.prototype, r) || (n[r] = t);
      }), n;
    }(), { chain: false }), On.VERSION = "4.17.4", u("bind bindKey curry curryRight partial partialRight".split(" "), function (n) {
      On[n].placeholder = On;
    }), u(["drop", "take"], function (n, t) {
      Mn.prototype[n] = function (r) {
        r = r === F ? 1 : Di(Ou(r), 0);var e = this.__filtered__ && !t ? new Mn(this) : this.clone();return e.__filtered__ ? e.__takeCount__ = Mi(r, e.__takeCount__) : e.__views__.push({ size: Mi(r, 4294967295), type: n + (0 > e.__dir__ ? "Right" : "") }), e;
      }, Mn.prototype[n + "Right"] = function (t) {
        return this.reverse()[n](t).reverse();
      };
    }), u(["filter", "map", "takeWhile"], function (n, t) {
      var r = t + 1,
          e = 1 == r || 3 == r;Mn.prototype[n] = function (n) {
        var t = this.clone();return t.__iteratees__.push({ iteratee: je(n, 3), type: r }), t.__filtered__ = t.__filtered__ || e, t;
      };
    }), u(["head", "last"], function (n, t) {
      var r = "take" + (t ? "Right" : "");Mn.prototype[n] = function () {
        return this[r](1).value()[0];
      };
    }), u(["initial", "tail"], function (n, t) {
      var r = "drop" + (t ? "" : "Right");Mn.prototype[n] = function () {
        return this.__filtered__ ? new Mn(this) : this[r](1);
      };
    }), Mn.prototype.compact = function () {
      return this.filter(Nu);
    }, Mn.prototype.find = function (n) {
      return this.filter(n).head();
    }, Mn.prototype.findLast = function (n) {
      return this.reverse().find(n);
    }, Mn.prototype.invokeMap = lr(function (n, t) {
      return typeof n == "function" ? new Mn(this) : this.map(function (r) {
        return Dt(r, n, t);
      });
    }), Mn.prototype.reject = function (n) {
      return this.filter(su(je(n)));
    }, Mn.prototype.slice = function (n, t) {
      n = Ou(n);var r = this;return r.__filtered__ && (0 < n || 0 > t) ? new Mn(r) : (0 > n ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== F && (t = Ou(t), r = 0 > t ? r.dropRight(-t) : r.take(t - n)), r);
    }, Mn.prototype.takeRightWhile = function (n) {
      return this.reverse().takeWhile(n).reverse();
    }, Mn.prototype.toArray = function () {
      return this.take(4294967295);
    }, Et(Mn.prototype, function (n, t) {
      var r = /^(?:filter|find|map|reject)|While$/.test(t),
          e = /^(?:head|last)$/.test(t),
          u = On[e ? "take" + ("last" == t ? "Right" : "") : t],
          i = e || /^find/.test(t);u && (On.prototype[t] = function () {
        function t(n) {
          return n = u.apply(On, s([n], f)), e && h ? n[0] : n;
        }var o = this.__wrapped__,
            f = e ? [1] : arguments,
            c = o instanceof Mn,
            a = f[0],
            l = c || af(o);
        l && r && typeof a == "function" && 1 != a.length && (c = l = false);var h = this.__chain__,
            p = !!this.__actions__.length,
            a = i && !h,
            c = c && !p;return !i && l ? (o = c ? o : new Mn(this), o = n.apply(o, f), o.__actions__.push({ func: nu, args: [t], thisArg: F }), new zn(o, h)) : a && c ? n.apply(this, f) : (o = this.thru(t), a ? e ? o.value()[0] : o.value() : o);
      });
    }), u("pop push shift sort splice unshift".split(" "), function (n) {
      var t = ui[n],
          r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
          e = /^(?:pop|shift)$/.test(n);On.prototype[n] = function () {
        var n = arguments;if (e && !this.__chain__) {
          var u = this.value();return t.apply(af(u) ? u : [], n);
        }return this[r](function (r) {
          return t.apply(af(r) ? r : [], n);
        });
      };
    }), Et(Mn.prototype, function (n, t) {
      var r = On[t];if (r) {
        var e = r.name + "";(Ji[e] || (Ji[e] = [])).push({ name: t, func: r });
      }
    }), Ji[Xr(F, 2).name] = [{ name: "wrapper", func: F }], Mn.prototype.clone = function () {
      var n = new Mn(this.__wrapped__);return n.__actions__ = Mr(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Mr(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Mr(this.__views__), n;
    }, Mn.prototype.reverse = function () {
      if (this.__filtered__) {
        var n = new Mn(this);n.__dir__ = -1, n.__filtered__ = true;
      } else n = this.clone(), n.__dir__ *= -1;return n;
    }, Mn.prototype.value = function () {
      var n,
          t = this.__wrapped__.value(),
          r = this.__dir__,
          e = af(t),
          u = 0 > r,
          i = e ? t.length : 0;n = i;for (var o = this.__views__, f = 0, c = -1, a = o.length; ++c < a;) {
        var l = o[c],
            s = l.size;switch (l.type) {case "drop":
            f += s;break;case "dropRight":
            n -= s;break;case "take":
            n = Mi(n, f + s);break;case "takeRight":
            f = Di(f, n - s);}
      }if (n = { start: f, end: n }, o = n.start, f = n.end, n = f - o, o = u ? f : o - 1, f = this.__iteratees__, c = f.length, a = 0, l = Mi(n, this.__takeCount__), !e || !u && i == n && l == n) return kr(t, this.__actions__);e = [];n: for (; n-- && a < l;) {
        for (o += r, u = -1, i = t[o]; ++u < c;) {
          var h = f[u],
              s = h.type,
              h = (0, h.iteratee)(i);if (2 == s) i = h;else if (!h) {
            if (1 == s) continue n;break n;
          }
        }e[a++] = i;
      }return e;
    }, On.prototype.at = Fo, On.prototype.chain = function () {
      return Xe(this);
    }, On.prototype.commit = function () {
      return new zn(this.value(), this.__chain__);
    }, On.prototype.next = function () {
      this.__values__ === F && (this.__values__ = ku(this.value()));
      var n = this.__index__ >= this.__values__.length;return { done: n, value: n ? F : this.__values__[this.__index__++] };
    }, On.prototype.plant = function (n) {
      for (var t, r = this; r instanceof Sn;) {
        var e = Pe(r);e.__index__ = 0, e.__values__ = F, t ? u.__wrapped__ = e : t = e;var u = e,
            r = r.__wrapped__;
      }return u.__wrapped__ = n, t;
    }, On.prototype.reverse = function () {
      var n = this.__wrapped__;return n instanceof Mn ? (this.__actions__.length && (n = new Mn(this)), n = n.reverse(), n.__actions__.push({ func: nu, args: [Je], thisArg: F }), new zn(n, this.__chain__)) : this.thru(Je);
    }, On.prototype.toJSON = On.prototype.valueOf = On.prototype.value = function () {
      return kr(this.__wrapped__, this.__actions__);
    }, On.prototype.first = On.prototype.head, Ai && (On.prototype[Ai] = tu), On;
  }();"function" == "function" && _typeof(__webpack_require__(3)) == "object" && __webpack_require__(3) ? (Zn._ = it, !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return it;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : Vn ? ((Vn.exports = it)._ = it, qn._ = it) : Zn._ = it;
}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(12)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 13 */
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares, type), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares, type) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares, type)]);
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_oysterDayTotal__ = __webpack_require__(6);







// TO DO
// Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
// possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
// NB Weekly capping is always anytime & daily capping always starts at zone 1

// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

// getData.fares().then(function(fareData) {
//   let singleFares = fareData.singleFares;
//   let dailyCaps = fareData.dailyCaps;

//   const journeys = [
//     {
//       zones: [1, 6],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//   ];
// });


// //---------------------------------
// // - CONTACTLESS Cheapest Fare = with daily caps
// 	//The array of all combination prices to be reduce to cheapest one
// 	let conAllFares = [];

// 	// for without any daily caps, only singles added together
// 	let conFares = null;
// 	journeys.forEach(function(journey) {
// 		conFares += getSingleFare(journey.zones, singleFares);
// 	});
// 	conAllFares.push(conFares);

// 	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
// 	 let conMaxZone = maxNum(flatten(journeys.map(j => j.zones)));
// 	 for (let i = 2; i <= conMaxZone; i++) {
// 	 	//console.log('for daily cap 1 to ' + i);
// 	 	let conCumTotal = getDailyCap(i, dailyCaps);
// 	 	 for (let x = 0; x < journeys.length; x++) {
// 	 	 	//adding extension fares to cumTotal
// 	 		conCumTotal += extensionFares(1, i, journeys[x][0], journeys[x][1], singleFares);
// 	 	 };
// 	 	conAllFares.push(conCumTotal);
// 	 }

// 	// 	---> Compare all the possibilities and select the cheapest (including total single).
// 	return minNum(conAllFares);
// 	//this returns the final contactless daily fare
// });

//CONTACTLESS
//For just daily caps OR weekly cap without daily cap: use extension fares without max daily
//For combo of daily cap and weekly cap: use extension fares with max daily cap
//
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWRmOTk5YzA1MGFjOThhNjcxOTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mcC9fYmFzZUNvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAvX21hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbG9kYXNoLm1pbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyJnZXRab25lcyIsIm5hcFRhbiIsInN0YXRpb25zIiwiem9uZXMiLCJmaWx0ZXJab25lc0J5TnVtYmVyIiwibnVtIiwiZmlsdGVyIiwiem9uZSIsImxlbmd0aCIsImNvbXBhcmVOdW1iZXJzIiwiYXJyYXlOdW1iZXJzIiwib3BlcmF0b3IiLCJyZWR1Y2UiLCJhIiwiYiIsIm1heE51bSIsImFycmF5Wm9uZXMiLCJNYXRoIiwibWF4IiwibWluTnVtIiwibWluIiwiZ2V0RGlmZmVyZW5jZSIsImFicyIsImZsYXR0ZW4iLCJhcnIiLCJjb25jYXQiLCJqb3VybmV5VG9LZXkiLCJqb3VybmV5Iiwic29ydCIsImpvaW4iLCJ6b25lVG9Kb3VybmV5IiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJ0eXBlIiwiZ2V0Q2FwIiwiXyIsImN1cnJ5IiwiY2FwcyIsImdldFNpbmdsZUZhcmUiLCJzaW5nbGVGYXJlcyIsIm1ldCIsInRhcmdldCIsInZhbHVlIiwiZmV0Y2hGYXJlRGF0YSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImUiLCJmYXJlcyIsInJlcXVpcmUiLCJydW5JbkNvbnRleHQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXh0ZW5zaW9uRmFyZXMiLCJvcHRpb25zIiwibWF4RGFpbHkiLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsIm1pbkNoYXJnZWRab25lIiwiZmluYWxDb25kaXRpb24iLCJzcGxpdE9yRnVsbEZhcmUiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJtYXAiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6Iiwib3lzdGVyRGF5VG90YWwiLCJwZWFrVG90YWwiLCJvZmZQZWFrVG90YWwiLCJtYXhab25lU29GYXIiLCJjYXBNZXQiLCJjb21wb3NlIiwidG90YWxzIiwic2luZ2xlRmFyZSIsIm1heFpvbmUiLCJtZXREYWlseUNhcCIsInBlYWsiLCJtYXBwaW5nIiwiZmFsbGJhY2tIb2xkZXIiLCJBcnJheSIsInByb3RvdHlwZSIsImJhc2VBcml0eSIsImZ1bmMiLCJuIiwiYXBwbHkiLCJ1bmRlZmluZWQiLCJhcmd1bWVudHMiLCJiYXNlQXJ5IiwiY2xvbmVBcnJheSIsImFycmF5IiwicmVzdWx0IiwiY3JlYXRlQ2xvbmVyIiwib2JqZWN0IiwiZmxhdFNwcmVhZCIsInN0YXJ0IiwibGFzdEluZGV4IiwiYXJncyIsIm90aGVyQXJncyIsInNsaWNlIiwid3JhcEltbXV0YWJsZSIsImNsb25lciIsImJhc2VDb252ZXJ0IiwidXRpbCIsIm5hbWUiLCJzZXRQbGFjZWhvbGRlciIsImlzTGliIiwiaXNPYmoiLCJPYmplY3QiLCJUeXBlRXJyb3IiLCJjb25maWciLCJjYXAiLCJmaXhlZCIsImltbXV0YWJsZSIsInJlYXJnIiwiZm9yY2VDdXJyeSIsImZvcmNlRml4ZWQiLCJmb3JjZVJlYXJnIiwicGxhY2Vob2xkZXIiLCJwcmlzdGluZSIsImhlbHBlcnMiLCJhcnkiLCJhc3NpZ24iLCJjbG9uZSIsImlzQXJyYXkiLCJpc0Z1bmN0aW9uIiwiaXRlcmF0ZWUiLCJrZXlzIiwidG9JbnRlZ2VyIiwidG9QYXRoIiwiZWFjaCIsImFyeU1ldGhvZEtleXMiLCJhcnlNZXRob2QiLCJ3cmFwcGVycyIsImNhc3RBcnJheSIsImFyaXR5IiwibWl4aW4iLCJzb3VyY2UiLCJwYWlycyIsImtleSIsInBhaXIiLCJudGhBcmciLCJpbmRleGVzIiwiY29udGV4dCIsImNhc3RDYXAiLCJpdGVyYXRlZVJlYXJnIiwiaXRlcmF0ZWVBcnkiLCJjYXN0Q3VycnkiLCJjYXN0Rml4ZWQiLCJza2lwRml4ZWQiLCJtZXRob2RTcHJlYWQiLCJjYXN0UmVhcmciLCJza2lwUmVhcmciLCJtZXRob2RSZWFyZyIsImFyeVJlYXJnIiwiY2xvbmVCeVBhdGgiLCJpbmRleCIsIm5lc3RlZCIsImNvbnZlcnRMaWIiLCJjb252ZXJ0IiwiY3JlYXRlQ29udmVydGVyIiwicmVhbE5hbWUiLCJhbGlhc1RvUmVhbCIsIm1ldGhvZE5hbWUiLCJyZW1hcCIsIm9sZE9wdGlvbnMiLCJuZXdVdGlsIiwibmV3RnVuYyIsIm5ld09wdGlvbnMiLCJvdmVyQXJnIiwidHJhbnNmb3JtIiwid3JhcCIsIndyYXBwZWQiLCJ3cmFwcGVyIiwibXV0YXRlIiwic2V0IiwiYXJ5S2V5Iiwib3RoZXJOYW1lIiwiYWZ0ZXJSZWFyZyIsInJlYWxUb0FsaWFzIiwiYWxpYXMiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJ0IiwiYWRkIiwiciIsInUiLCJpIiwibyIsImYiLCJjIiwiZCIsImwiLCJzIiwiaCIsInAiLCJ2IiwiZyIsInkiLCJ4IiwiayIsIlAiLCJqIiwiRiIsInciLCJtIiwiQSIsIkUiLCJPIiwiUyIsIkkiLCJSIiwiaGFzIiwiVyIsIkIiLCJUbiIsIkwiLCJzaXplIiwiVSIsIkMiLCJEIiwiTSIsIlQiLCJCbiIsInRlc3QiLCJ6biIsInR0IiwiJCIsIm1hdGNoIiwic3BsaXQiLCJOIiwiTmFOIiwiWiIsInEiLCJWIiwiSyIsIkciLCJIIiwiSiIsIlJlZ0V4cCIsIlkiLCJRIiwiWCIsIm5uIiwidG4iLCJybiIsImVuIiwidW4iLCJvbiIsImZuIiwiY24iLCJhbiIsImxuIiwic24iLCJobiIsInBuIiwiX24iLCJ2biIsImduIiwiZG4iLCJ5biIsImJuIiwieG4iLCJqbiIsInduIiwibW4iLCJBbiIsImtuIiwiRW4iLCJPbiIsIlNuIiwiSW4iLCJSbiIsIlduIiwiTG4iLCJVbiIsIkNuIiwiRG4iLCJNbiIsIiRuIiwicGFyc2VGbG9hdCIsIkZuIiwicGFyc2VJbnQiLCJObiIsImdsb2JhbCIsIlBuIiwic2VsZiIsIlpuIiwiRnVuY3Rpb24iLCJxbiIsIm5vZGVUeXBlIiwiVm4iLCJLbiIsIkduIiwicHJvY2VzcyIsImJpbmRpbmciLCJIbiIsImlzQXJyYXlCdWZmZXIiLCJKbiIsImlzRGF0ZSIsIlluIiwiaXNNYXAiLCJRbiIsImlzUmVnRXhwIiwiWG4iLCJpc1NldCIsIm50IiwiaXNUeXBlZEFycmF5IiwicnQiLCJldCIsInV0IiwiaXQiLCJ4dSIsImFmIiwiY2kiLCJQZSIsIl9fd3JhcHBlZF9fIiwiX19hY3Rpb25zX18iLCJfX2NoYWluX18iLCJfX2luZGV4X18iLCJfX3ZhbHVlc19fIiwiX19kaXJfXyIsIl9fZmlsdGVyZWRfXyIsIl9faXRlcmF0ZWVzX18iLCJfX3Rha2VDb3VudF9fIiwiX192aWV3c19fIiwiY2xlYXIiLCJfX2RhdGFfXyIsImNmIiwic2YiLCJnZiIsInJpIiwiUmUiLCJjciIsIm90IiwiVGUiLCJNciIsImd0IiwiZnQiLCJjdCIsImh1IiwiX3QiLCJhdCIsImx0Iiwic3QiLCJvbyIsImh0IiwiVHIiLCJMdSIsInB0IiwiVXUiLCJFaSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsInZ0IiwiSHUiLCJXdSIsImR0IiwiYnUiLCJFZSIsInlvIiwiV3IiLCJPZSIsIkZyIiwiJHIiLCJTZSIsImdldCIsInllIiwiZGUiLCJ5dCIsImJ0IiwibmkiLCJ4dCIsImVpIiwiam8iLCJqdCIsInd0IiwibXQiLCJBdSIsIkF0Iiwia3QiLCJJZSIsIkV0IiwiY28iLCJPdCIsImFvIiwiU3QiLCJndSIsIkl0IiwiUnIiLCIkZSIsIlJ0IiwienQiLCJraSIsInNpIiwiV3QiLCJCdCIsIkx0IiwiVXQiLCJNaSIsIkN0IiwiRHQiLCJ2ciIsIkdlIiwiTXQiLCJUdCIsIiR0IiwiRnQiLCJfZSIsInZlIiwiY29uc3RydWN0b3IiLCJkZWxldGUiLCJOdCIsIlB0IiwiWnQiLCJsaSIsIl9pIiwiRmUiLCJxdCIsIlZ0IiwiS3QiLCJ5dSIsIkd0IiwiTnUiLCJYdCIsIlF0IiwiVnUiLCJIdCIsIkxlIiwiQ2kiLCJKdCIsIll0IiwicHUiLCJtZSIsIlVlIiwiV2UiLCJCdSIsIm5yIiwiX3UiLCJMciIsInd1IiwiUnUiLCJ0ciIsInJyIiwiamUiLCJVciIsImVyIiwidXIiLCJwciIsImlyIiwib3IiLCJ3aSIsImZyIiwibXIiLCJ6aSIsIkZpIiwiYXIiLCJsciIsIndvIiwiQ2UiLCJzciIsIkR1IiwiaHIiLCJfciIsImdyIiwiZHIiLCJ5ciIsImJyIiwieHIiLCJqciIsInVvIiwid3IiLCJwbyIsIkFyIiwia3IiLCJ0aGlzQXJnIiwiRXIiLCJPciIsIlNyIiwiSXIiLCJtbyIsInp1IiwienIiLCJ5aSIsImNvcHkiLCJCciIsImJ5dGVMZW5ndGgiLCJkaSIsImJ1ZmZlciIsImJ5dGVPZmZzZXQiLCJDciIsIkRpIiwiRHIiLCJ2byIsImdvIiwiTnIiLCJQciIsInplIiwiWnIiLCJxciIsIlZyIiwiSHIiLCJLciIsImNoYXJBdCIsIkdyIiwiJHUiLCJUdSIsInJlcGxhY2UiLCJpbyIsIkpyIiwieGUiLCJmZSIsIlhyIiwiWXIiLCJRciIsImdlIiwidGhydSIsInJldmVyc2UiLCJiZSIsIl9vIiwiQmUiLCJwbGFudCIsIm5lIiwidGUiLCJyZSIsImVlIiwiUmkiLCJ1ZSIsImllIiwiRXUiLCJvZSIsIkl1IiwieG8iLCJEZSIsImNlIiwiWHUiLCJPdSIsImFlIiwibGUiLCJsbyIsInNlIiwiaWkiLCJoZSIsInBlIiwibWVzc2FnZSIsImVvIiwiVmUiLCJKaSIsIlB1Iiwid2UiLCJBZSIsImtlIiwiaW5wdXQiLCJiaSIsImV4ZWMiLCJtaSIsIk5lIiwiTWUiLCJUaSIsImZpIiwiWmUiLCJxZSIsIktlIiwiSGUiLCJKZSIsIk5pIiwiWWUiLCJRZSIsIlhlIiwibnUiLCJ0dSIsInJ1IiwiZXUiLCJmbyIsInV1IiwiaXUiLCJvdSIsImZ1IiwiY3UiLCJhdSIsIkpvIiwibGVhZGluZyIsIm1heFdhaXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImhvIiwiZmx1c2giLCJsdSIsImNhY2hlIiwiQ2FjaGUiLCJzdSIsInZ1IiwiZHUiLCJqdSIsImhpIiwibXUiLCJrdSIsIkFpIiwibmV4dCIsImRvbmUiLCJTdSIsInZhbHVlT2YiLCJDdSIsIk11IiwiTmYiLCJ0b0xvd2VyQ2FzZSIsIkZ1IiwiWnUiLCJjaGFpbiIsInF1IiwiS3UiLCJHdSIsImRlZmF1bHRzIiwicGljayIsIkp1IiwiRGF0ZSIsIll1IiwiRXJyb3IiLCJRdSIsInRpIiwiU3RyaW5nIiwidWkiLCJvaSIsInRvU3RyaW5nIiwiYWkiLCJJRV9QUk9UTyIsInBpIiwidmkiLCJCdWZmZXIiLCJnaSIsIlN5bWJvbCIsIlVpbnQ4QXJyYXkiLCJnZXRQcm90b3R5cGVPZiIsInhpIiwiY3JlYXRlIiwiamkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInNwbGljZSIsImlzQ29uY2F0U3ByZWFkYWJsZSIsIml0ZXJhdG9yIiwidG9TdHJpbmdUYWciLCJPaSIsImNsZWFyVGltZW91dCIsIlNpIiwibm93IiwiSWkiLCJzZXRUaW1lb3V0IiwiY2VpbCIsImZsb29yIiwiV2kiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJCaSIsImlzQnVmZmVyIiwiTGkiLCJpc0Zpbml0ZSIsIlVpIiwiJGkiLCJyYW5kb20iLCJQaSIsIlppIiwicWkiLCJWaSIsIktpIiwiR2kiLCJIaSIsIllpIiwiUWkiLCJYaSIsIm5vIiwicm8iLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXNjYXBlIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsInZhcmlhYmxlIiwiaW1wb3J0cyIsInBvcCIsImhhc2giLCJzdHJpbmciLCJzbyIsIkFycmF5QnVmZmVyIiwiYm8iLCJBbyIsImtvIiwiRW8iLCJPbyIsIlNvIiwiSW8iLCJSbyIsInpvIiwiV28iLCJCbyIsIkxvIiwiVW8iLCJDbyIsIkRvIiwiTW8iLCJUbyIsIiRvIiwiRm8iLCJObyIsIlBvIiwiWm8iLCJxbyIsIlZvIiwiS28iLCJHbyIsIkhvIiwiWW8iLCJRbyIsIlhvIiwibmYiLCJ0ZiIsInJmIiwiZWYiLCJ1ZiIsIm9mIiwiZmYiLCJsZiIsImhmIiwicGYiLCJfZiIsInZmIiwiZGYiLCJ5ZiIsImJmIiwieGYiLCJqZiIsIndmIiwibWYiLCJBZiIsImtmIiwiUmYiLCJFZiIsIk9mIiwiU2YiLCJJZiIsInpmIiwiV2YiLCJCZiIsIkxmIiwiVWYiLCJDZiIsIkRmIiwiTWYiLCJUZiIsIiRmIiwiRmYiLCJ0b1VwcGVyQ2FzZSIsIlBmIiwiWmYiLCJxZiIsIlZmIiwiS2YiLCJHZiIsIkhmIiwiSmYiLCJZZiIsIlFmIiwiWGYiLCJuYyIsInRjIiwicmMiLCJlYyIsInVjIiwiaWMiLCJvYyIsImFmdGVyIiwiYXNzaWduSW4iLCJhc3NpZ25JbldpdGgiLCJhc3NpZ25XaXRoIiwiYmVmb3JlIiwiYmluZCIsImJpbmRBbGwiLCJiaW5kS2V5IiwiY2h1bmsiLCJjb21wYWN0IiwiY29uZCIsImNvbmZvcm1zIiwiY29uc3RhbnQiLCJjb3VudEJ5IiwiY3VycnlSaWdodCIsImRlYm91bmNlIiwiZGVmYXVsdHNEZWVwIiwiZGVmZXIiLCJkZWxheSIsImRpZmZlcmVuY2UiLCJkaWZmZXJlbmNlQnkiLCJkaWZmZXJlbmNlV2l0aCIsImRyb3AiLCJkcm9wUmlnaHQiLCJkcm9wUmlnaHRXaGlsZSIsImRyb3BXaGlsZSIsImZpbGwiLCJmbGF0TWFwIiwiZmxhdE1hcERlZXAiLCJmbGF0TWFwRGVwdGgiLCJmbGF0dGVuRGVlcCIsImZsYXR0ZW5EZXB0aCIsImZsaXAiLCJmbG93IiwiZmxvd1JpZ2h0IiwiZnJvbVBhaXJzIiwiZnVuY3Rpb25zIiwiZnVuY3Rpb25zSW4iLCJncm91cEJ5IiwiaW5pdGlhbCIsImludGVyc2VjdGlvbiIsImludGVyc2VjdGlvbkJ5IiwiaW50ZXJzZWN0aW9uV2l0aCIsImludmVydCIsImludmVydEJ5IiwiaW52b2tlTWFwIiwia2V5QnkiLCJrZXlzSW4iLCJtYXBLZXlzIiwibWFwVmFsdWVzIiwibWF0Y2hlcyIsIm1hdGNoZXNQcm9wZXJ0eSIsIm1lbW9pemUiLCJtZXJnZSIsIm1lcmdlV2l0aCIsIm1ldGhvZCIsIm1ldGhvZE9mIiwibmVnYXRlIiwib21pdCIsIm9taXRCeSIsIm9uY2UiLCJvcmRlckJ5Iiwib3ZlciIsIm92ZXJBcmdzIiwib3ZlckV2ZXJ5Iiwib3ZlclNvbWUiLCJwYXJ0aWFsIiwicGFydGlhbFJpZ2h0IiwicGFydGl0aW9uIiwicGlja0J5IiwicHJvcGVydHkiLCJwcm9wZXJ0eU9mIiwicHVsbCIsInB1bGxBbGwiLCJwdWxsQWxsQnkiLCJwdWxsQWxsV2l0aCIsInB1bGxBdCIsInJhbmdlIiwicmFuZ2VSaWdodCIsInJlamVjdCIsInJlbW92ZSIsInJlc3QiLCJzYW1wbGVTaXplIiwic2V0V2l0aCIsInNodWZmbGUiLCJzb3J0QnkiLCJzb3J0ZWRVbmlxIiwic29ydGVkVW5pcUJ5Iiwic3ByZWFkIiwidGFpbCIsInRha2UiLCJ0YWtlUmlnaHQiLCJ0YWtlUmlnaHRXaGlsZSIsInRha2VXaGlsZSIsInRhcCIsInRocm90dGxlIiwidG9BcnJheSIsInRvUGFpcnMiLCJ0b1BhaXJzSW4iLCJ0b1BsYWluT2JqZWN0IiwidW5hcnkiLCJ1bmlvbiIsInVuaW9uQnkiLCJ1bmlvbldpdGgiLCJ1bmlxIiwidW5pcUJ5IiwidW5pcVdpdGgiLCJ1bnNldCIsInVuemlwIiwidW56aXBXaXRoIiwidXBkYXRlIiwidXBkYXRlV2l0aCIsInZhbHVlcyIsInZhbHVlc0luIiwid2l0aG91dCIsIndvcmRzIiwieG9yIiwieG9yQnkiLCJ4b3JXaXRoIiwiemlwIiwiemlwT2JqZWN0IiwiemlwT2JqZWN0RGVlcCIsInppcFdpdGgiLCJlbnRyaWVzIiwiZW50cmllc0luIiwiZXh0ZW5kIiwiZXh0ZW5kV2l0aCIsImF0dGVtcHQiLCJjYW1lbENhc2UiLCJjYXBpdGFsaXplIiwiY2xhbXAiLCJjbG9uZURlZXAiLCJjbG9uZURlZXBXaXRoIiwiY2xvbmVXaXRoIiwiY29uZm9ybXNUbyIsImRlYnVyciIsImRlZmF1bHRUbyIsImRpdmlkZSIsImVuZHNXaXRoIiwiZXEiLCJlc2NhcGVSZWdFeHAiLCJldmVyeSIsImZpbmQiLCJmaW5kSW5kZXgiLCJmaW5kS2V5IiwiZmluZExhc3QiLCJmaW5kTGFzdEluZGV4IiwiZmluZExhc3RLZXkiLCJmb3JFYWNoUmlnaHQiLCJmb3JJbiIsImZvckluUmlnaHQiLCJmb3JPd24iLCJmb3JPd25SaWdodCIsImd0ZSIsImhhc0luIiwiaGVhZCIsImlkZW50aXR5IiwiaW5jbHVkZXMiLCJpbmRleE9mIiwiaW5SYW5nZSIsImludm9rZSIsImlzQXJndW1lbnRzIiwiaXNBcnJheUxpa2UiLCJpc0FycmF5TGlrZU9iamVjdCIsImlzQm9vbGVhbiIsImlzRWxlbWVudCIsImlzRW1wdHkiLCJpc0VxdWFsIiwiaXNFcXVhbFdpdGgiLCJpc0Vycm9yIiwiaXNJbnRlZ2VyIiwiaXNMZW5ndGgiLCJpc01hdGNoIiwiaXNNYXRjaFdpdGgiLCJpc05hTiIsImlzTmF0aXZlIiwiaXNOaWwiLCJpc051bGwiLCJpc051bWJlciIsImlzT2JqZWN0IiwiaXNPYmplY3RMaWtlIiwiaXNQbGFpbk9iamVjdCIsImlzU2FmZUludGVnZXIiLCJpc1N0cmluZyIsImlzU3ltYm9sIiwiaXNVbmRlZmluZWQiLCJpc1dlYWtNYXAiLCJpc1dlYWtTZXQiLCJrZWJhYkNhc2UiLCJsYXN0IiwibGFzdEluZGV4T2YiLCJsb3dlckNhc2UiLCJsb3dlckZpcnN0IiwibHRlIiwibWF4QnkiLCJtZWFuIiwibWVhbkJ5IiwibWluQnkiLCJzdHViQXJyYXkiLCJzdHViRmFsc2UiLCJzdHViT2JqZWN0Iiwic3R1YlN0cmluZyIsInN0dWJUcnVlIiwibXVsdGlwbHkiLCJudGgiLCJub0NvbmZsaWN0Iiwibm9vcCIsInBhZCIsInBhZEVuZCIsInBhZFN0YXJ0IiwicmVkdWNlUmlnaHQiLCJyZXBlYXQiLCJyb3VuZCIsInNhbXBsZSIsInNuYWtlQ2FzZSIsInNvbWUiLCJzb3J0ZWRJbmRleCIsInNvcnRlZEluZGV4QnkiLCJzb3J0ZWRJbmRleE9mIiwic29ydGVkTGFzdEluZGV4Iiwic29ydGVkTGFzdEluZGV4QnkiLCJzb3J0ZWRMYXN0SW5kZXhPZiIsInN0YXJ0Q2FzZSIsInN0YXJ0c1dpdGgiLCJzdWJ0cmFjdCIsInN1bSIsInN1bUJ5IiwidGVtcGxhdGUiLCJzb3VyY2VVUkwiLCJ0aW1lcyIsInRvRmluaXRlIiwidG9MZW5ndGgiLCJ0b0xvd2VyIiwidG9OdW1iZXIiLCJ0b1NhZmVJbnRlZ2VyIiwidG9VcHBlciIsInRyaW0iLCJ0cmltRW5kIiwidHJpbVN0YXJ0IiwidHJ1bmNhdGUiLCJzZXBhcmF0b3IiLCJvbWlzc2lvbiIsInNlYXJjaCIsInVuZXNjYXBlIiwidW5pcXVlSWQiLCJ1cHBlckNhc2UiLCJ1cHBlckZpcnN0IiwiZWFjaFJpZ2h0IiwiZmlyc3QiLCJWRVJTSU9OIiwiZW5kIiwiY29tbWl0IiwidG9KU09OIiwiZXZhbCIsIndpbmRvdyIsIndlYnBhY2tQb2x5ZmlsbCIsImRlcHJlY2F0ZSIsInBhdGhzIiwiY2hpbGRyZW4iLCJkZWZpbmVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7QUFFQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFT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b3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWRmOTk5YzA1MGFjOThhNjcxOTciLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gvZnAnO1xuXG4vKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbmZ1bmN0aW9uIHpvbmVUb0pvdXJuZXkoem9uZSkge1xuICByZXR1cm4gam91cm5leVRvS2V5KFsxLCB6b25lXSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzLCB0eXBlKSB7XG4gIHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV1bdHlwZV07XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDYXAgPSBfLmN1cnJ5KCh6b25lLCBjYXBzKSA9PiBjYXBzW3pvbmVUb0pvdXJuZXkoem9uZSldKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIHRyYXZlbGxpbmcgYmV0d2VlblxuICogQHBhcmFtIHtvYmplY3R9IHNpbmdsZUZhcmVzIC0gbG9va3MgYXQgdGhlIHNpbmdsZUZhcmVzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIGJldHdlZW4gdGhvc2UgdHdvIHpvbmVzXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMsIHR5cGUpIHtcbiAgLy9kZWJ1Z2dlcjtcbiAgcmV0dXJuIHNpbmdsZUZhcmVzW2pvdXJuZXlUb0tleShqb3VybmV5KV1bdHlwZV07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSBfLmN1cnJ5KCh0YXJnZXQsIHZhbHVlKSA9PiB2YWx1ZSA+PSB0YXJnZXQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCIvKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xudmFyIGZldGNoU3RhdGlvbnNEYXRhID0gKGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG52YXIgZmV0Y2hKb3VybmV5RGF0YSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZmFyZXM6IGZldGNoRmFyZURhdGEsXG5cdHN0YXRpb25zOiBmZXRjaFN0YXRpb25zRGF0YSxcblx0am91cm5leTogZmV0Y2hKb3VybmV5RGF0YSxcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ2YXIgXyA9IHJlcXVpcmUoJy4vbG9kYXNoLm1pbicpLnJ1bkluQ29udGV4dCgpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZwL19iYXNlQ29udmVydCcpKF8sIF8pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sb2Rhc2gvZnAuanMiLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG5cdGdldFNpbmdsZUZhcmUsXG5cdG1heE51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBzcGxpdE9yRnVsbEZhcmUgZnJvbSAnLi9fc3BsaXRPckZ1bGxGYXJlJztcblxuLy8gLyoqXG4vLyAgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7b2JqZWN0fSBzZWUgYmVsb3dcbi8vICAqIEBwYXJhbSB7c2luZ2xlRmFyZXN9IHVzZXMgdGhlIHNpbmdsZUZhcmVzIGpzb24gZGF0YVxuLy8gICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBleHRlbnNpb24gZmFyZSBmb3IgdGhlIGpvdXJuZXlcbi8vICAqIEBkZXNjcmlwdGlvblxuLy9cbi8vIFx0Rk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuLy8gXHRGT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMsIHR5cGUpIHtcbiAgY29uc3QgbWF4RGFpbHkgPSBvcHRpb25zLm1heERhaWx5IHx8IG51bGw7XG4vLyBieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuXG5cdGxldCB7XG5cdFx0bWluU2luZ2xlLCAvLyBtYXhpbXVtIHpvbmUgb2YgdGhlIHNpbmdsZSBqb3VybmV5XG5cdFx0bWF4U2luZ2xlLCAvLyBtaW5pbXVtIHNpbmdsZSB6b25lIG9mIHRoZSBqb3VybmV5XG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuXG5cdGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuXHQgXHRpZiAobWF4RGFpbHkgPj0gKG1pblRyYXZlbGNhcmQgLSAxKSkgeyAvLyBpZiBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdCAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy8gc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcbi8vIGVsc2UgaWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8sIGFuZCB0aGVyZSBhcmUgZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZCwgaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyAvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGlmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHJldHVybiBnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0cmV0dXJuIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdHJldHVybiAwO1xuXG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG4gIHJldHVybiBnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMsIHR5cGUpO1xuLy8gRUxTRSBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsImltcG9ydCBfIGZyb20gJ2xvZGFzaC9mcCc7XG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRDYXAsXG4gIGdldFNpbmdsZUZhcmUsXG4gIG1ldCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyRGF5VG90YWwoZGF0YSkge1xuICBsZXQge1xuICAgIGpvdXJuZXlzLFxuICAgIHNpbmdsZUZhcmVzLFxuICAgIGRhaWx5Q2FwcyxcbiAgfSA9IGRhdGE7XG5cbiAgbGV0IHBlYWtUb3RhbCA9IDA7XG4gIGxldCBvZmZQZWFrVG90YWwgPSAwO1xuICBsZXQgbWF4Wm9uZVNvRmFyID0gbnVsbDtcblxuICAvLyBqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uIChqb3VybmV5KSB7XG4gIC8vICAgLy9HZXRzIHRoZSBtYXhpbXVtIHpvbmVzIG9mIGFsbHMgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcbiAgLy8gICBtYXhab25lU29GYXIgPSBtYXhOdW0oW10uY29uY2F0KGpvdXJuZXkuem9uZXMsIG1heFpvbmVTb0ZhcikpO1xuICAvL1xuICAvLyAgIC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcbiAgLy8gICBwZWFrVG90YWwgKz0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIFBFQUsgUEFZRyBSQVRFUztcbiAgLy8gICBvZmZQZWFrVG90YWwgKz0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIFBFQUsgUEFZRyBSQVRFU1xuICAvL1xuICAvLyAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoIWpvdXJuZXkucGVhayAmJiBvZmZQZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBvZmZQZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7IC8vYW5kIHNldCBhbiBhbGVydCB0byBzYXkgb2ZmIGRhaWx5IGNhcCByZWFjaGVkPz8/PyEhISAoYnV0IGNvdWxkIGJlIG92ZXJyaWRkZW4gYWZ0ZXIpXG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAvLyAgIGlmIChwZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBwZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7XG4gIC8vICAgfVxuICAvLyB9KTtcblxuICAvLyByZXR1cm4gbWluTnVtKFtwZWFrVG90YWwsIG9mZlBlYWtUb3RhbF0pO1xuXG4gIC8vIGNvbnN0IHRvdGFscyA9IGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gIC8vICAgY29uc3Qgc2luZ2xlRmFyZUEgPSBnZXRTaW5nbGVGYXJlKGEuem9uZXMsIHNpbmdsZUZhcmVzKTtcbiAgLy8gICBjb25zdCBzaW5nbGVGYXJlQiA9IGdldFNpbmdsZUZhcmUoYi56b25lcywgc2luZ2xlRmFyZXMpO1xuICAvL1xuICAvLyAgIGNvbnN0IHJ1bm5pbmcgPSAoYS5ydW5uaW5nID8gYSA6IHtcbiAgLy8gICAgICAgcGVha1RvdGFsOiBzaW5nbGVGYXJlQSxcbiAgLy8gICAgICAgb2ZmUGVha1RvdGFsOiBzaW5nbGVGYXJlQSxcbiAgLy8gICAgICAgbWF4Wm9uZTogYS56b25lcyxcbiAgLy8gICB9KTtcbiAgLy9cbiAgLy8gICBjb25zdCBjdXJyZW50ID0ge1xuICAvLyAgICAgcnVubmluZzogdHJ1ZSxcbiAgLy8gICAgIHBlYWtUb3RhbDogcnVubmluZy5wZWFrVG90YWwgKyBzaW5nbGVGYXJlQixcbiAgLy8gICAgIG9mZlBlYWtUb3RhbDogcnVubmluZy5wZWFrVG90YWwgKyBzaW5nbGVGYXJlQixcbiAgLy8gICAgIG1heFpvbmU6IG1heE51bShbXS5jb25jYXQocnVubmluZy5tYXhab25lLCBiLnpvbmVzKSksXG4gIC8vICAgICB6b25lczogYi56b25lcyxcbiAgLy8gICB9O1xuICAvL1xuICAvLyAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoIWEucGVhayAmJiBjdXJyZW50Lm9mZlBlYWtUb3RhbCA+PSBnZXREYWlseUNhcChjdXJyZW50Lm1heFpvbmUsIGRhaWx5Q2FwcykpIHtcbiAgLy8gICAgIGN1cnJlbnQub2ZmUGVha1RvdGFsID0gZ2V0RGFpbHlDYXAoY3VycmVudC5tYXhab25lLCBkYWlseUNhcHMpOyAvL2FuZCBzZXQgYW4gYWxlcnQgdG8gc2F5IG9mZiBkYWlseSBjYXAgcmVhY2hlZD8/Pz8hISEgKGJ1dCBjb3VsZCBiZSBvdmVycmlkZGVuIGFmdGVyKVxuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvL2lmIHRoZSBkYWlseSBjYXAgZm9yIHRoZSBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoY3VycmVudC5wZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAoY3VycmVudC5tYXhab25lLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBjdXJyZW50LnBlYWtUb3RhbCA9IGdldERhaWx5Q2FwKGN1cnJlbnQubWF4Wm9uZSwgZGFpbHlDYXBzKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmV0dXJuIGN1cnJlbnQ7XG4vLyB9XG5cbiAgLy8gdmFyIHQgPSBnZXREYWlseUNhcCgyKTtcbiAgLy9cbiAgLy8gZGVidWdnZXI7XG5cbiAgY29uc3QgZ2V0RGFpbHlDYXAgPSBnZXRDYXAoXywgZGFpbHlDYXBzKTtcbiAgY29uc3QgY2FwTWV0ID0gXy5jb21wb3NlKG1ldCwgZ2V0RGFpbHlDYXApO1xuXG4gIGNvbnN0IHRvdGFscyA9IGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGNvbnN0IHNpbmdsZUZhcmUgPSBnZXRTaW5nbGVGYXJlKGIuem9uZXMsIHNpbmdsZUZhcmVzKTtcbiAgICBjb25zdCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcbiAgICBjb25zdCBtZXREYWlseUNhcCA9IGNhcE1ldChtYXhab25lKTtcblxuICAgIGNvbnNvbGUubG9nKG1ldERhaWx5Q2FwKTtcbiAgICBkZWJ1Z2dlcjtcblxuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbCArIHNpbmdsZUZhcmU7XG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgICBpZiAoIWEucGVhayAmJiBtZXREYWlseUNhcChvZmZQZWFrVG90YWwpKSB7XG4gICAgICBvZmZQZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lKTsgLy9hbmQgc2V0IGFuIGFsZXJ0IHRvIHNheSBvZmYgZGFpbHkgY2FwIHJlYWNoZWQ/Pz8/ISEhIChidXQgY291bGQgYmUgb3ZlcnJpZGRlbiBhZnRlcilcbiAgICB9XG5cblxuICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgIGlmIChtZXREYWlseUNhcChwZWFrVG90YWwpKSB7XG4gICAgICBwZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGVha1RvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICB9O1xuICB9LCB7XG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KTtcblxuICByZXR1cm4gbWluTnVtKFt0b3RhbHMucGVha1RvdGFsLCB0b3RhbHMub2ZmUGVha1RvdGFsXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwidmFyIG1hcHBpbmcgPSByZXF1aXJlKCcuL19tYXBwaW5nJyksXG4gICAgZmFsbGJhY2tIb2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2UuICovXG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiwgd2l0aCBhbiBhcml0eSBvZiBgbmAsIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGVcbiAqIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBcml0eShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpOyB9XG4gICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTsgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB1cCB0byBgbmAgYXJndW1lbnRzLCBpZ25vcmluZ1xuICogYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBjYXAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFyeShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMoYSwgYik7IH1cbiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZ1bmMoYSk7IH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHJlc3VsdFtsZW5ndGhdID0gYXJyYXlbbGVuZ3RoXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGdpdmVuIG9iamVjdCB1c2luZyB0aGUgYXNzaWdubWVudCBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGFzc2lnbm1lbnQgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjbG9uZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNsb25lcihmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gZnVuYyh7fSwgb2JqZWN0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc3ByZWFkYCB3aGljaCBmbGF0dGVucyB0aGUgc3ByZWFkIGFycmF5IGludG9cbiAqIHRoZSBhcmd1bWVudHMgb2YgdGhlIGludm9rZWQgYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBzcHJlYWQgYXJndW1lbnRzIG92ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzcHJlYWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmxhdFNwcmVhZChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGFycmF5ID0gYXJnc1tzdGFydF0sXG4gICAgICAgIG90aGVyQXJncyA9IGFyZ3Muc2xpY2UoMCwgc3RhcnQpO1xuXG4gICAgaWYgKGFycmF5KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgIT0gbGFzdEluZGV4KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJncy5zbGljZShzdGFydCArIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgYW5kIHVzZXMgYGNsb25lcmAgdG8gY2xvbmUgdGhlIGZpcnN0XG4gKiBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lciBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgYXJndW1lbnRzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgaW1tdXRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgYXJnc1tsZW5ndGhdID0gYXJndW1lbnRzW2xlbmd0aF07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBhcmdzWzBdID0gY2xvbmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGNvbnZlcnRgIHdoaWNoIGFjY2VwdHMgYSBgdXRpbGAgb2JqZWN0IG9mIG1ldGhvZHNcbiAqIHJlcXVpcmVkIHRvIHBlcmZvcm0gY29udmVyc2lvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHV0aWwgVGhlIHV0aWwgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNhcD10cnVlXSBTcGVjaWZ5IGNhcHBpbmcgaXRlcmF0ZWUgYXJndW1lbnRzLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jdXJyeT10cnVlXSBTcGVjaWZ5IGN1cnJ5aW5nLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5maXhlZD10cnVlXSBTcGVjaWZ5IGZpeGVkIGFyaXR5LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbW11dGFibGU9dHJ1ZV0gU3BlY2lmeSBpbW11dGFibGUgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVhcmc9dHJ1ZV0gU3BlY2lmeSByZWFycmFuZ2luZyBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgZnVuY3Rpb24gb3Igb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ29udmVydCh1dGlsLCBuYW1lLCBmdW5jLCBvcHRpb25zKSB7XG4gIHZhciBzZXRQbGFjZWhvbGRlcixcbiAgICAgIGlzTGliID0gdHlwZW9mIG5hbWUgPT0gJ2Z1bmN0aW9uJyxcbiAgICAgIGlzT2JqID0gbmFtZSA9PT0gT2JqZWN0KG5hbWUpO1xuXG4gIGlmIChpc09iaikge1xuICAgIG9wdGlvbnMgPSBmdW5jO1xuICAgIGZ1bmMgPSBuYW1lO1xuICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICB2YXIgY29uZmlnID0ge1xuICAgICdjYXAnOiAnY2FwJyBpbiBvcHRpb25zID8gb3B0aW9ucy5jYXAgOiB0cnVlLFxuICAgICdjdXJyeSc6ICdjdXJyeScgaW4gb3B0aW9ucyA/IG9wdGlvbnMuY3VycnkgOiB0cnVlLFxuICAgICdmaXhlZCc6ICdmaXhlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZml4ZWQgOiB0cnVlLFxuICAgICdpbW11dGFibGUnOiAnaW1tdXRhYmxlJyBpbiBvcHRpb25zID8gb3B0aW9ucy5pbW11dGFibGUgOiB0cnVlLFxuICAgICdyZWFyZyc6ICdyZWFyZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucmVhcmcgOiB0cnVlXG4gIH07XG5cbiAgdmFyIGZvcmNlQ3VycnkgPSAoJ2N1cnJ5JyBpbiBvcHRpb25zKSAmJiBvcHRpb25zLmN1cnJ5LFxuICAgICAgZm9yY2VGaXhlZCA9ICgnZml4ZWQnIGluIG9wdGlvbnMpICYmIG9wdGlvbnMuZml4ZWQsXG4gICAgICBmb3JjZVJlYXJnID0gKCdyZWFyZycgaW4gb3B0aW9ucykgJiYgb3B0aW9ucy5yZWFyZyxcbiAgICAgIHBsYWNlaG9sZGVyID0gaXNMaWIgPyBmdW5jIDogZmFsbGJhY2tIb2xkZXIsXG4gICAgICBwcmlzdGluZSA9IGlzTGliID8gZnVuYy5ydW5JbkNvbnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICB2YXIgaGVscGVycyA9IGlzTGliID8gZnVuYyA6IHtcbiAgICAnYXJ5JzogdXRpbC5hcnksXG4gICAgJ2Fzc2lnbic6IHV0aWwuYXNzaWduLFxuICAgICdjbG9uZSc6IHV0aWwuY2xvbmUsXG4gICAgJ2N1cnJ5JzogdXRpbC5jdXJyeSxcbiAgICAnZm9yRWFjaCc6IHV0aWwuZm9yRWFjaCxcbiAgICAnaXNBcnJheSc6IHV0aWwuaXNBcnJheSxcbiAgICAnaXNGdW5jdGlvbic6IHV0aWwuaXNGdW5jdGlvbixcbiAgICAnaXRlcmF0ZWUnOiB1dGlsLml0ZXJhdGVlLFxuICAgICdrZXlzJzogdXRpbC5rZXlzLFxuICAgICdyZWFyZyc6IHV0aWwucmVhcmcsXG4gICAgJ3RvSW50ZWdlcic6IHV0aWwudG9JbnRlZ2VyLFxuICAgICd0b1BhdGgnOiB1dGlsLnRvUGF0aFxuICB9O1xuXG4gIHZhciBhcnkgPSBoZWxwZXJzLmFyeSxcbiAgICAgIGFzc2lnbiA9IGhlbHBlcnMuYXNzaWduLFxuICAgICAgY2xvbmUgPSBoZWxwZXJzLmNsb25lLFxuICAgICAgY3VycnkgPSBoZWxwZXJzLmN1cnJ5LFxuICAgICAgZWFjaCA9IGhlbHBlcnMuZm9yRWFjaCxcbiAgICAgIGlzQXJyYXkgPSBoZWxwZXJzLmlzQXJyYXksXG4gICAgICBpc0Z1bmN0aW9uID0gaGVscGVycy5pc0Z1bmN0aW9uLFxuICAgICAga2V5cyA9IGhlbHBlcnMua2V5cyxcbiAgICAgIHJlYXJnID0gaGVscGVycy5yZWFyZyxcbiAgICAgIHRvSW50ZWdlciA9IGhlbHBlcnMudG9JbnRlZ2VyLFxuICAgICAgdG9QYXRoID0gaGVscGVycy50b1BhdGg7XG5cbiAgdmFyIGFyeU1ldGhvZEtleXMgPSBrZXlzKG1hcHBpbmcuYXJ5TWV0aG9kKTtcblxuICB2YXIgd3JhcHBlcnMgPSB7XG4gICAgJ2Nhc3RBcnJheSc6IGZ1bmN0aW9uKGNhc3RBcnJheSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICAgID8gY2FzdEFycmF5KGNsb25lQXJyYXkodmFsdWUpKVxuICAgICAgICAgIDogY2FzdEFycmF5LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAnaXRlcmF0ZWUnOiBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnVuYyA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgIGFyaXR5ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlcmF0ZWUoZnVuYywgYXJpdHkpLFxuICAgICAgICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoY29uZmlnLmNhcCAmJiB0eXBlb2YgYXJpdHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICBhcml0eSA9IGFyaXR5ID4gMiA/IChhcml0eSAtIDIpIDogMTtcbiAgICAgICAgICByZXR1cm4gKGxlbmd0aCAmJiBsZW5ndGggPD0gYXJpdHkpID8gcmVzdWx0IDogYmFzZUFyeShyZXN1bHQsIGFyaXR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9LFxuICAgICdtaXhpbic6IGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHZhciBmdW5jID0gdGhpcztcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgICAgICAgcmV0dXJuIG1peGluKGZ1bmMsIE9iamVjdChzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFpcnMgPSBbXTtcbiAgICAgICAgZWFjaChrZXlzKHNvdXJjZSksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgcGFpcnMucHVzaChba2V5LCBmdW5jLnByb3RvdHlwZVtrZXldXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtaXhpbihmdW5jLCBPYmplY3Qoc291cmNlKSk7XG5cbiAgICAgICAgZWFjaChwYWlycywgZnVuY3Rpb24ocGFpcikge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHBhaXJbMV07XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICBmdW5jLnByb3RvdHlwZVtwYWlyWzBdXSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZnVuYy5wcm90b3R5cGVbcGFpclswXV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ250aEFyZyc6IGZ1bmN0aW9uKG50aEFyZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIGFyaXR5ID0gbiA8IDAgPyAxIDogKHRvSW50ZWdlcihuKSArIDEpO1xuICAgICAgICByZXR1cm4gY3VycnkobnRoQXJnKG4pLCBhcml0eSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ3JlYXJnJzogZnVuY3Rpb24ocmVhcmcpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihmdW5jLCBpbmRleGVzKSB7XG4gICAgICAgIHZhciBhcml0eSA9IGluZGV4ZXMgPyBpbmRleGVzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBjdXJyeShyZWFyZyhmdW5jLCBpbmRleGVzKSwgYXJpdHkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdydW5JbkNvbnRleHQnOiBmdW5jdGlvbihydW5JbkNvbnRleHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBiYXNlQ29udmVydCh1dGlsLCBydW5JbkNvbnRleHQoY29udGV4dCksIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhIGZ1bmN0aW9uIHdpdGggYW4gYXJpdHkgY2FwcGVkIGl0ZXJhdGVlIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RDYXAobmFtZSwgZnVuYykge1xuICAgIGlmIChjb25maWcuY2FwKSB7XG4gICAgICB2YXIgaW5kZXhlcyA9IG1hcHBpbmcuaXRlcmF0ZWVSZWFyZ1tuYW1lXTtcbiAgICAgIGlmIChpbmRleGVzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZVJlYXJnKGZ1bmMsIGluZGV4ZXMpO1xuICAgICAgfVxuICAgICAgdmFyIG4gPSAhaXNMaWIgJiYgbWFwcGluZy5pdGVyYXRlZUFyeVtuYW1lXTtcbiAgICAgIGlmIChuKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZUFyeShmdW5jLCBuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGEgY3VycmllZCBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Q3VycnkobmFtZSwgZnVuYywgbikge1xuICAgIHJldHVybiAoZm9yY2VDdXJyeSB8fCAoY29uZmlnLmN1cnJ5ICYmIG4gPiAxKSlcbiAgICAgID8gY3VycnkoZnVuYywgbilcbiAgICAgIDogZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYSBmaXhlZCBhcml0eSBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgY2FwLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Rml4ZWQobmFtZSwgZnVuYywgbikge1xuICAgIGlmIChjb25maWcuZml4ZWQgJiYgKGZvcmNlRml4ZWQgfHwgIW1hcHBpbmcuc2tpcEZpeGVkW25hbWVdKSkge1xuICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtuYW1lXSxcbiAgICAgICAgICBzdGFydCA9IGRhdGEgJiYgZGF0YS5zdGFydDtcblxuICAgICAgcmV0dXJuIHN0YXJ0ICA9PT0gdW5kZWZpbmVkID8gYXJ5KGZ1bmMsIG4pIDogZmxhdFNwcmVhZChmdW5jLCBzdGFydCk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhbiByZWFyZ2VkIGZ1bmN0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RSZWFyZyhuYW1lLCBmdW5jLCBuKSB7XG4gICAgcmV0dXJuIChjb25maWcucmVhcmcgJiYgbiA+IDEgJiYgKGZvcmNlUmVhcmcgfHwgIW1hcHBpbmcuc2tpcFJlYXJnW25hbWVdKSlcbiAgICAgID8gcmVhcmcoZnVuYywgbWFwcGluZy5tZXRob2RSZWFyZ1tuYW1lXSB8fCBtYXBwaW5nLmFyeVJlYXJnW25dKVxuICAgICAgOiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgb2JqZWN0YCBieSBgcGF0aGAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2xvbmUgYnkuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZUJ5UGF0aChvYmplY3QsIHBhdGgpIHtcbiAgICBwYXRoID0gdG9QYXRoKHBhdGgpO1xuXG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgICByZXN1bHQgPSBjbG9uZShPYmplY3Qob2JqZWN0KSksXG4gICAgICAgIG5lc3RlZCA9IHJlc3VsdDtcblxuICAgIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0gcGF0aFtpbmRleF0sXG4gICAgICAgICAgdmFsdWUgPSBuZXN0ZWRba2V5XTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgbmVzdGVkW3BhdGhbaW5kZXhdXSA9IGNsb25lKGluZGV4ID09IGxhc3RJbmRleCA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBuZXN0ZWQgPSBuZXN0ZWRba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBgbG9kYXNoYCB0byBhbiBpbW11dGFibGUgYXV0by1jdXJyaWVkIGl0ZXJhdGVlLWZpcnN0IGRhdGEtbGFzdFxuICAgKiB2ZXJzaW9uIHdpdGggY29udmVyc2lvbiBgb3B0aW9uc2AgYXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuIFNlZSBgYmFzZUNvbnZlcnRgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGBsb2Rhc2hgLlxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydExpYihvcHRpb25zKSB7XG4gICAgcmV0dXJuIF8ucnVuSW5Db250ZXh0LmNvbnZlcnQob3B0aW9ucykodW5kZWZpbmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb252ZXJ0ZXIgZnVuY3Rpb24gZm9yIGBmdW5jYCBvZiBgbmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb252ZXJ0ZXIgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDb252ZXJ0ZXIobmFtZSwgZnVuYykge1xuICAgIHZhciByZWFsTmFtZSA9IG1hcHBpbmcuYWxpYXNUb1JlYWxbbmFtZV0gfHwgbmFtZSxcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1hcHBpbmcucmVtYXBbcmVhbE5hbWVdIHx8IHJlYWxOYW1lLFxuICAgICAgICBvbGRPcHRpb25zID0gb3B0aW9ucztcblxuICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbmV3VXRpbCA9IGlzTGliID8gcHJpc3RpbmUgOiBoZWxwZXJzLFxuICAgICAgICAgIG5ld0Z1bmMgPSBpc0xpYiA/IHByaXN0aW5lW21ldGhvZE5hbWVdIDogZnVuYyxcbiAgICAgICAgICBuZXdPcHRpb25zID0gYXNzaWduKGFzc2lnbih7fSwgb2xkT3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gYmFzZUNvbnZlcnQobmV3VXRpbCwgcmVhbE5hbWUsIG5ld0Z1bmMsIG5ld09wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdHMgaXRlcmF0ZWUsIHdpdGggdXAgdG8gYG5gXG4gICAqIGFyZ3VtZW50cywgaWdub3JpbmcgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgaXRlcmF0ZWUgYXJndW1lbnRzIGZvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBpdGVyYXRlZUFyeShmdW5jLCBuKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicgPyBiYXNlQXJ5KGZ1bmMsIG4pIDogZnVuYztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0cyBpdGVyYXRlZSB3aXRoIGFyZ3VtZW50c1xuICAgKiBhcnJhbmdlZCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBgaW5kZXhlc2Agd2hlcmUgdGhlIGFyZ3VtZW50IHZhbHVlIGF0XG4gICAqIHRoZSBmaXJzdCBpbmRleCBpcyBwcm92aWRlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIHRoZSBhcmd1bWVudCB2YWx1ZSBhdFxuICAgKiB0aGUgc2Vjb25kIGluZGV4IGlzIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQsIGFuZCBzbyBvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVhcnJhbmdlIGl0ZXJhdGVlIGFyZ3VtZW50cyBmb3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGFycmFuZ2VkIGFyZ3VtZW50IGluZGV4ZXMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gaXRlcmF0ZWVSZWFyZyhmdW5jLCBpbmRleGVzKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgdmFyIG4gPSBpbmRleGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiBiYXNlQXJpdHkocmVhcmcoYmFzZUFyeShmdW5jLCBuKSwgaW5kZXhlcyksIG4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGZpcnN0IGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMoKTtcbiAgICAgIH1cbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGNvbmZpZy5yZWFyZyA/IDAgOiAobGVuZ3RoIC0gMSk7XG4gICAgICBhcmdzW2luZGV4XSA9IHRyYW5zZm9ybShhcmdzW2luZGV4XSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIGFuZCBhcHBseXMgdGhlIGNvbnZlcnNpb25zXG4gICAqIHJ1bGVzIGJ5IGBuYW1lYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcChuYW1lLCBmdW5jKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgcmVhbE5hbWUgPSBtYXBwaW5nLmFsaWFzVG9SZWFsW25hbWVdIHx8IG5hbWUsXG4gICAgICAgIHdyYXBwZWQgPSBmdW5jLFxuICAgICAgICB3cmFwcGVyID0gd3JhcHBlcnNbcmVhbE5hbWVdO1xuXG4gICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgIHdyYXBwZWQgPSB3cmFwcGVyKGZ1bmMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcuaW1tdXRhYmxlKSB7XG4gICAgICBpZiAobWFwcGluZy5tdXRhdGUuYXJyYXlbcmVhbE5hbWVdKSB7XG4gICAgICAgIHdyYXBwZWQgPSB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lQXJyYXkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUub2JqZWN0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjcmVhdGVDbG9uZXIoZnVuYykpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUuc2V0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjbG9uZUJ5UGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgICBlYWNoKG1hcHBpbmcuYXJ5TWV0aG9kW2FyeUtleV0sIGZ1bmN0aW9uKG90aGVyTmFtZSkge1xuICAgICAgICBpZiAocmVhbE5hbWUgPT0gb3RoZXJOYW1lKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtyZWFsTmFtZV0sXG4gICAgICAgICAgICAgIGFmdGVyUmVhcmcgPSBkYXRhICYmIGRhdGEuYWZ0ZXJSZWFyZztcblxuICAgICAgICAgIHJlc3VsdCA9IGFmdGVyUmVhcmdcbiAgICAgICAgICAgID8gY2FzdEZpeGVkKHJlYWxOYW1lLCBjYXN0UmVhcmcocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSlcbiAgICAgICAgICAgIDogY2FzdFJlYXJnKHJlYWxOYW1lLCBjYXN0Rml4ZWQocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSk7XG5cbiAgICAgICAgICByZXN1bHQgPSBjYXN0Q2FwKHJlYWxOYW1lLCByZXN1bHQpO1xuICAgICAgICAgIHJlc3VsdCA9IGNhc3RDdXJyeShyZWFsTmFtZSwgcmVzdWx0LCBhcnlLZXkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICB9KTtcblxuICAgIHJlc3VsdCB8fCAocmVzdWx0ID0gd3JhcHBlZCk7XG4gICAgaWYgKHJlc3VsdCA9PSBmdW5jKSB7XG4gICAgICByZXN1bHQgPSBmb3JjZUN1cnJ5ID8gY3VycnkocmVzdWx0LCAxKSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmVzdWx0LmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIocmVhbE5hbWUsIGZ1bmMpO1xuICAgIGlmIChtYXBwaW5nLnBsYWNlaG9sZGVyW3JlYWxOYW1lXSkge1xuICAgICAgc2V0UGxhY2Vob2xkZXIgPSB0cnVlO1xuICAgICAgcmVzdWx0LnBsYWNlaG9sZGVyID0gZnVuYy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgaWYgKCFpc09iaikge1xuICAgIHJldHVybiB3cmFwKG5hbWUsIGZ1bmMpO1xuICB9XG4gIHZhciBfID0gZnVuYztcblxuICAvLyBDb252ZXJ0IG1ldGhvZHMgYnkgYXJ5IGNhcC5cbiAgdmFyIHBhaXJzID0gW107XG4gIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgZWFjaChtYXBwaW5nLmFyeU1ldGhvZFthcnlLZXldLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBmdW5jID0gX1ttYXBwaW5nLnJlbWFwW2tleV0gfHwga2V5XTtcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHBhaXJzLnB1c2goW2tleSwgd3JhcChrZXksIGZ1bmMpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbnZlcnQgcmVtYWluaW5nIG1ldGhvZHMuXG4gIGVhY2goa2V5cyhfKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGZ1bmMgPSBfW2tleV07XG4gICAgaWYgKHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKHBhaXJzW2xlbmd0aF1bMF0gPT0ga2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jLmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIoa2V5LCBmdW5jKTtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgZnVuY10pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQXNzaWduIHRvIGBfYCBsZWF2aW5nIGBfLnByb3RvdHlwZWAgdW5jaGFuZ2VkIHRvIGFsbG93IGNoYWluaW5nLlxuICBlYWNoKHBhaXJzLCBmdW5jdGlvbihwYWlyKSB7XG4gICAgX1twYWlyWzBdXSA9IHBhaXJbMV07XG4gIH0pO1xuXG4gIF8uY29udmVydCA9IGNvbnZlcnRMaWI7XG4gIGlmIChzZXRQbGFjZWhvbGRlcikge1xuICAgIF8ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgfVxuICAvLyBBc3NpZ24gYWxpYXNlcy5cbiAgZWFjaChrZXlzKF8pLCBmdW5jdGlvbihrZXkpIHtcbiAgICBlYWNoKG1hcHBpbmcucmVhbFRvQWxpYXNba2V5XSB8fCBbXSwgZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgIF9bYWxpYXNdID0gX1trZXldO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29udmVydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbG9kYXNoL2ZwL19iYXNlQ29udmVydC5qcyIsIi8qKiBVc2VkIHRvIG1hcCBhbGlhc2VzIHRvIHRoZWlyIHJlYWwgbmFtZXMuICovXG5leHBvcnRzLmFsaWFzVG9SZWFsID0ge1xuXG4gIC8vIExvZGFzaCBhbGlhc2VzLlxuICAnZWFjaCc6ICdmb3JFYWNoJyxcbiAgJ2VhY2hSaWdodCc6ICdmb3JFYWNoUmlnaHQnLFxuICAnZW50cmllcyc6ICd0b1BhaXJzJyxcbiAgJ2VudHJpZXNJbic6ICd0b1BhaXJzSW4nLFxuICAnZXh0ZW5kJzogJ2Fzc2lnbkluJyxcbiAgJ2V4dGVuZEFsbCc6ICdhc3NpZ25JbkFsbCcsXG4gICdleHRlbmRBbGxXaXRoJzogJ2Fzc2lnbkluQWxsV2l0aCcsXG4gICdleHRlbmRXaXRoJzogJ2Fzc2lnbkluV2l0aCcsXG4gICdmaXJzdCc6ICdoZWFkJyxcblxuICAvLyBNZXRob2RzIHRoYXQgYXJlIGN1cnJpZWQgdmFyaWFudHMgb2Ygb3RoZXJzLlxuICAnY29uZm9ybXMnOiAnY29uZm9ybXNUbycsXG4gICdtYXRjaGVzJzogJ2lzTWF0Y2gnLFxuICAncHJvcGVydHknOiAnZ2V0JyxcblxuICAvLyBSYW1kYSBhbGlhc2VzLlxuICAnX18nOiAncGxhY2Vob2xkZXInLFxuICAnRic6ICdzdHViRmFsc2UnLFxuICAnVCc6ICdzdHViVHJ1ZScsXG4gICdhbGwnOiAnZXZlcnknLFxuICAnYWxsUGFzcyc6ICdvdmVyRXZlcnknLFxuICAnYWx3YXlzJzogJ2NvbnN0YW50JyxcbiAgJ2FueSc6ICdzb21lJyxcbiAgJ2FueVBhc3MnOiAnb3ZlclNvbWUnLFxuICAnYXBwbHknOiAnc3ByZWFkJyxcbiAgJ2Fzc29jJzogJ3NldCcsXG4gICdhc3NvY1BhdGgnOiAnc2V0JyxcbiAgJ2NvbXBsZW1lbnQnOiAnbmVnYXRlJyxcbiAgJ2NvbXBvc2UnOiAnZmxvd1JpZ2h0JyxcbiAgJ2NvbnRhaW5zJzogJ2luY2x1ZGVzJyxcbiAgJ2Rpc3NvYyc6ICd1bnNldCcsXG4gICdkaXNzb2NQYXRoJzogJ3Vuc2V0JyxcbiAgJ2Ryb3BMYXN0JzogJ2Ryb3BSaWdodCcsXG4gICdkcm9wTGFzdFdoaWxlJzogJ2Ryb3BSaWdodFdoaWxlJyxcbiAgJ2VxdWFscyc6ICdpc0VxdWFsJyxcbiAgJ2lkZW50aWNhbCc6ICdlcScsXG4gICdpbmRleEJ5JzogJ2tleUJ5JyxcbiAgJ2luaXQnOiAnaW5pdGlhbCcsXG4gICdpbnZlcnRPYmonOiAnaW52ZXJ0JyxcbiAgJ2p1eHQnOiAnb3ZlcicsXG4gICdvbWl0QWxsJzogJ29taXQnLFxuICAnbkFyeSc6ICdhcnknLFxuICAncGF0aCc6ICdnZXQnLFxuICAncGF0aEVxJzogJ21hdGNoZXNQcm9wZXJ0eScsXG4gICdwYXRoT3InOiAnZ2V0T3InLFxuICAncGF0aHMnOiAnYXQnLFxuICAncGlja0FsbCc6ICdwaWNrJyxcbiAgJ3BpcGUnOiAnZmxvdycsXG4gICdwbHVjayc6ICdtYXAnLFxuICAncHJvcCc6ICdnZXQnLFxuICAncHJvcEVxJzogJ21hdGNoZXNQcm9wZXJ0eScsXG4gICdwcm9wT3InOiAnZ2V0T3InLFxuICAncHJvcHMnOiAnYXQnLFxuICAnc3ltbWV0cmljRGlmZmVyZW5jZSc6ICd4b3InLFxuICAnc3ltbWV0cmljRGlmZmVyZW5jZUJ5JzogJ3hvckJ5JyxcbiAgJ3N5bW1ldHJpY0RpZmZlcmVuY2VXaXRoJzogJ3hvcldpdGgnLFxuICAndGFrZUxhc3QnOiAndGFrZVJpZ2h0JyxcbiAgJ3Rha2VMYXN0V2hpbGUnOiAndGFrZVJpZ2h0V2hpbGUnLFxuICAndW5hcHBseSc6ICdyZXN0JyxcbiAgJ3VubmVzdCc6ICdmbGF0dGVuJyxcbiAgJ3VzZVdpdGgnOiAnb3ZlckFyZ3MnLFxuICAnd2hlcmUnOiAnY29uZm9ybXNUbycsXG4gICd3aGVyZUVxJzogJ2lzTWF0Y2gnLFxuICAnemlwT2JqJzogJ3ppcE9iamVjdCdcbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBhcnkgdG8gbWV0aG9kIG5hbWVzLiAqL1xuZXhwb3J0cy5hcnlNZXRob2QgPSB7XG4gICcxJzogW1xuICAgICdhc3NpZ25BbGwnLCAnYXNzaWduSW5BbGwnLCAnYXR0ZW1wdCcsICdjYXN0QXJyYXknLCAnY2VpbCcsICdjcmVhdGUnLFxuICAgICdjdXJyeScsICdjdXJyeVJpZ2h0JywgJ2RlZmF1bHRzQWxsJywgJ2RlZmF1bHRzRGVlcEFsbCcsICdmbG9vcicsICdmbG93JyxcbiAgICAnZmxvd1JpZ2h0JywgJ2Zyb21QYWlycycsICdpbnZlcnQnLCAnaXRlcmF0ZWUnLCAnbWVtb2l6ZScsICdtZXRob2QnLCAnbWVyZ2VBbGwnLFxuICAgICdtZXRob2RPZicsICdtaXhpbicsICdudGhBcmcnLCAnb3ZlcicsICdvdmVyRXZlcnknLCAnb3ZlclNvbWUnLCdyZXN0JywgJ3JldmVyc2UnLFxuICAgICdyb3VuZCcsICdydW5JbkNvbnRleHQnLCAnc3ByZWFkJywgJ3RlbXBsYXRlJywgJ3RyaW0nLCAndHJpbUVuZCcsICd0cmltU3RhcnQnLFxuICAgICd1bmlxdWVJZCcsICd3b3JkcycsICd6aXBBbGwnXG4gIF0sXG4gICcyJzogW1xuICAgICdhZGQnLCAnYWZ0ZXInLCAnYXJ5JywgJ2Fzc2lnbicsICdhc3NpZ25BbGxXaXRoJywgJ2Fzc2lnbkluJywgJ2Fzc2lnbkluQWxsV2l0aCcsXG4gICAgJ2F0JywgJ2JlZm9yZScsICdiaW5kJywgJ2JpbmRBbGwnLCAnYmluZEtleScsICdjaHVuaycsICdjbG9uZURlZXBXaXRoJyxcbiAgICAnY2xvbmVXaXRoJywgJ2NvbmNhdCcsICdjb25mb3Jtc1RvJywgJ2NvdW50QnknLCAnY3VycnlOJywgJ2N1cnJ5UmlnaHROJyxcbiAgICAnZGVib3VuY2UnLCAnZGVmYXVsdHMnLCAnZGVmYXVsdHNEZWVwJywgJ2RlZmF1bHRUbycsICdkZWxheScsICdkaWZmZXJlbmNlJyxcbiAgICAnZGl2aWRlJywgJ2Ryb3AnLCAnZHJvcFJpZ2h0JywgJ2Ryb3BSaWdodFdoaWxlJywgJ2Ryb3BXaGlsZScsICdlbmRzV2l0aCcsICdlcScsXG4gICAgJ2V2ZXJ5JywgJ2ZpbHRlcicsICdmaW5kJywgJ2ZpbmRJbmRleCcsICdmaW5kS2V5JywgJ2ZpbmRMYXN0JywgJ2ZpbmRMYXN0SW5kZXgnLFxuICAgICdmaW5kTGFzdEtleScsICdmbGF0TWFwJywgJ2ZsYXRNYXBEZWVwJywgJ2ZsYXR0ZW5EZXB0aCcsICdmb3JFYWNoJyxcbiAgICAnZm9yRWFjaFJpZ2h0JywgJ2ZvckluJywgJ2ZvckluUmlnaHQnLCAnZm9yT3duJywgJ2Zvck93blJpZ2h0JywgJ2dldCcsXG4gICAgJ2dyb3VwQnknLCAnZ3QnLCAnZ3RlJywgJ2hhcycsICdoYXNJbicsICdpbmNsdWRlcycsICdpbmRleE9mJywgJ2ludGVyc2VjdGlvbicsXG4gICAgJ2ludmVydEJ5JywgJ2ludm9rZScsICdpbnZva2VNYXAnLCAnaXNFcXVhbCcsICdpc01hdGNoJywgJ2pvaW4nLCAna2V5QnknLFxuICAgICdsYXN0SW5kZXhPZicsICdsdCcsICdsdGUnLCAnbWFwJywgJ21hcEtleXMnLCAnbWFwVmFsdWVzJywgJ21hdGNoZXNQcm9wZXJ0eScsXG4gICAgJ21heEJ5JywgJ21lYW5CeScsICdtZXJnZScsICdtZXJnZUFsbFdpdGgnLCAnbWluQnknLCAnbXVsdGlwbHknLCAnbnRoJywgJ29taXQnLFxuICAgICdvbWl0QnknLCAnb3ZlckFyZ3MnLCAncGFkJywgJ3BhZEVuZCcsICdwYWRTdGFydCcsICdwYXJzZUludCcsICdwYXJ0aWFsJyxcbiAgICAncGFydGlhbFJpZ2h0JywgJ3BhcnRpdGlvbicsICdwaWNrJywgJ3BpY2tCeScsICdwcm9wZXJ0eU9mJywgJ3B1bGwnLCAncHVsbEFsbCcsXG4gICAgJ3B1bGxBdCcsICdyYW5kb20nLCAncmFuZ2UnLCAncmFuZ2VSaWdodCcsICdyZWFyZycsICdyZWplY3QnLCAncmVtb3ZlJyxcbiAgICAncmVwZWF0JywgJ3Jlc3RGcm9tJywgJ3Jlc3VsdCcsICdzYW1wbGVTaXplJywgJ3NvbWUnLCAnc29ydEJ5JywgJ3NvcnRlZEluZGV4JyxcbiAgICAnc29ydGVkSW5kZXhPZicsICdzb3J0ZWRMYXN0SW5kZXgnLCAnc29ydGVkTGFzdEluZGV4T2YnLCAnc29ydGVkVW5pcUJ5JyxcbiAgICAnc3BsaXQnLCAnc3ByZWFkRnJvbScsICdzdGFydHNXaXRoJywgJ3N1YnRyYWN0JywgJ3N1bUJ5JywgJ3Rha2UnLCAndGFrZVJpZ2h0JyxcbiAgICAndGFrZVJpZ2h0V2hpbGUnLCAndGFrZVdoaWxlJywgJ3RhcCcsICd0aHJvdHRsZScsICd0aHJ1JywgJ3RpbWVzJywgJ3RyaW1DaGFycycsXG4gICAgJ3RyaW1DaGFyc0VuZCcsICd0cmltQ2hhcnNTdGFydCcsICd0cnVuY2F0ZScsICd1bmlvbicsICd1bmlxQnknLCAndW5pcVdpdGgnLFxuICAgICd1bnNldCcsICd1bnppcFdpdGgnLCAnd2l0aG91dCcsICd3cmFwJywgJ3hvcicsICd6aXAnLCAnemlwT2JqZWN0JyxcbiAgICAnemlwT2JqZWN0RGVlcCdcbiAgXSxcbiAgJzMnOiBbXG4gICAgJ2Fzc2lnbkluV2l0aCcsICdhc3NpZ25XaXRoJywgJ2NsYW1wJywgJ2RpZmZlcmVuY2VCeScsICdkaWZmZXJlbmNlV2l0aCcsXG4gICAgJ2ZpbmRGcm9tJywgJ2ZpbmRJbmRleEZyb20nLCAnZmluZExhc3RGcm9tJywgJ2ZpbmRMYXN0SW5kZXhGcm9tJywgJ2dldE9yJyxcbiAgICAnaW5jbHVkZXNGcm9tJywgJ2luZGV4T2ZGcm9tJywgJ2luUmFuZ2UnLCAnaW50ZXJzZWN0aW9uQnknLCAnaW50ZXJzZWN0aW9uV2l0aCcsXG4gICAgJ2ludm9rZUFyZ3MnLCAnaW52b2tlQXJnc01hcCcsICdpc0VxdWFsV2l0aCcsICdpc01hdGNoV2l0aCcsICdmbGF0TWFwRGVwdGgnLFxuICAgICdsYXN0SW5kZXhPZkZyb20nLCAnbWVyZ2VXaXRoJywgJ29yZGVyQnknLCAncGFkQ2hhcnMnLCAncGFkQ2hhcnNFbmQnLFxuICAgICdwYWRDaGFyc1N0YXJ0JywgJ3B1bGxBbGxCeScsICdwdWxsQWxsV2l0aCcsICdyYW5nZVN0ZXAnLCAncmFuZ2VTdGVwUmlnaHQnLFxuICAgICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAncmVwbGFjZScsICdzZXQnLCAnc2xpY2UnLCAnc29ydGVkSW5kZXhCeScsXG4gICAgJ3NvcnRlZExhc3RJbmRleEJ5JywgJ3RyYW5zZm9ybScsICd1bmlvbkJ5JywgJ3VuaW9uV2l0aCcsICd1cGRhdGUnLCAneG9yQnknLFxuICAgICd4b3JXaXRoJywgJ3ppcFdpdGgnXG4gIF0sXG4gICc0JzogW1xuICAgICdmaWxsJywgJ3NldFdpdGgnLCAndXBkYXRlV2l0aCdcbiAgXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIGFyeSB0byByZWFyZyBjb25maWdzLiAqL1xuZXhwb3J0cy5hcnlSZWFyZyA9IHtcbiAgJzInOiBbMSwgMF0sXG4gICczJzogWzIsIDAsIDFdLFxuICAnNCc6IFszLCAyLCAwLCAxXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byB0aGVpciBpdGVyYXRlZSBhcnkuICovXG5leHBvcnRzLml0ZXJhdGVlQXJ5ID0ge1xuICAnZHJvcFJpZ2h0V2hpbGUnOiAxLFxuICAnZHJvcFdoaWxlJzogMSxcbiAgJ2V2ZXJ5JzogMSxcbiAgJ2ZpbHRlcic6IDEsXG4gICdmaW5kJzogMSxcbiAgJ2ZpbmRGcm9tJzogMSxcbiAgJ2ZpbmRJbmRleCc6IDEsXG4gICdmaW5kSW5kZXhGcm9tJzogMSxcbiAgJ2ZpbmRLZXknOiAxLFxuICAnZmluZExhc3QnOiAxLFxuICAnZmluZExhc3RGcm9tJzogMSxcbiAgJ2ZpbmRMYXN0SW5kZXgnOiAxLFxuICAnZmluZExhc3RJbmRleEZyb20nOiAxLFxuICAnZmluZExhc3RLZXknOiAxLFxuICAnZmxhdE1hcCc6IDEsXG4gICdmbGF0TWFwRGVlcCc6IDEsXG4gICdmbGF0TWFwRGVwdGgnOiAxLFxuICAnZm9yRWFjaCc6IDEsXG4gICdmb3JFYWNoUmlnaHQnOiAxLFxuICAnZm9ySW4nOiAxLFxuICAnZm9ySW5SaWdodCc6IDEsXG4gICdmb3JPd24nOiAxLFxuICAnZm9yT3duUmlnaHQnOiAxLFxuICAnbWFwJzogMSxcbiAgJ21hcEtleXMnOiAxLFxuICAnbWFwVmFsdWVzJzogMSxcbiAgJ3BhcnRpdGlvbic6IDEsXG4gICdyZWR1Y2UnOiAyLFxuICAncmVkdWNlUmlnaHQnOiAyLFxuICAncmVqZWN0JzogMSxcbiAgJ3JlbW92ZSc6IDEsXG4gICdzb21lJzogMSxcbiAgJ3Rha2VSaWdodFdoaWxlJzogMSxcbiAgJ3Rha2VXaGlsZSc6IDEsXG4gICd0aW1lcyc6IDEsXG4gICd0cmFuc2Zvcm0nOiAyXG59O1xuXG4vKiogVXNlZCB0byBtYXAgbWV0aG9kIG5hbWVzIHRvIGl0ZXJhdGVlIHJlYXJnIGNvbmZpZ3MuICovXG5leHBvcnRzLml0ZXJhdGVlUmVhcmcgPSB7XG4gICdtYXBLZXlzJzogWzFdLFxuICAncmVkdWNlUmlnaHQnOiBbMSwgMF1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gcmVhcmcgY29uZmlncy4gKi9cbmV4cG9ydHMubWV0aG9kUmVhcmcgPSB7XG4gICdhc3NpZ25JbkFsbFdpdGgnOiBbMSwgMF0sXG4gICdhc3NpZ25JbldpdGgnOiBbMSwgMiwgMF0sXG4gICdhc3NpZ25BbGxXaXRoJzogWzEsIDBdLFxuICAnYXNzaWduV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2RpZmZlcmVuY2VCeSc6IFsxLCAyLCAwXSxcbiAgJ2RpZmZlcmVuY2VXaXRoJzogWzEsIDIsIDBdLFxuICAnZ2V0T3InOiBbMiwgMSwgMF0sXG4gICdpbnRlcnNlY3Rpb25CeSc6IFsxLCAyLCAwXSxcbiAgJ2ludGVyc2VjdGlvbldpdGgnOiBbMSwgMiwgMF0sXG4gICdpc0VxdWFsV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2lzTWF0Y2hXaXRoJzogWzIsIDEsIDBdLFxuICAnbWVyZ2VBbGxXaXRoJzogWzEsIDBdLFxuICAnbWVyZ2VXaXRoJzogWzEsIDIsIDBdLFxuICAncGFkQ2hhcnMnOiBbMiwgMSwgMF0sXG4gICdwYWRDaGFyc0VuZCc6IFsyLCAxLCAwXSxcbiAgJ3BhZENoYXJzU3RhcnQnOiBbMiwgMSwgMF0sXG4gICdwdWxsQWxsQnknOiBbMiwgMSwgMF0sXG4gICdwdWxsQWxsV2l0aCc6IFsyLCAxLCAwXSxcbiAgJ3JhbmdlU3RlcCc6IFsxLCAyLCAwXSxcbiAgJ3JhbmdlU3RlcFJpZ2h0JzogWzEsIDIsIDBdLFxuICAnc2V0V2l0aCc6IFszLCAxLCAyLCAwXSxcbiAgJ3NvcnRlZEluZGV4QnknOiBbMiwgMSwgMF0sXG4gICdzb3J0ZWRMYXN0SW5kZXhCeSc6IFsyLCAxLCAwXSxcbiAgJ3VuaW9uQnknOiBbMSwgMiwgMF0sXG4gICd1bmlvbldpdGgnOiBbMSwgMiwgMF0sXG4gICd1cGRhdGVXaXRoJzogWzMsIDEsIDIsIDBdLFxuICAneG9yQnknOiBbMSwgMiwgMF0sXG4gICd4b3JXaXRoJzogWzEsIDIsIDBdLFxuICAnemlwV2l0aCc6IFsxLCAyLCAwXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byBzcHJlYWQgY29uZmlncy4gKi9cbmV4cG9ydHMubWV0aG9kU3ByZWFkID0ge1xuICAnYXNzaWduQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdhc3NpZ25BbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdhc3NpZ25JbkFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnYXNzaWduSW5BbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdkZWZhdWx0c0FsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnZGVmYXVsdHNEZWVwQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdpbnZva2VBcmdzJzogeyAnc3RhcnQnOiAyIH0sXG4gICdpbnZva2VBcmdzTWFwJzogeyAnc3RhcnQnOiAyIH0sXG4gICdtZXJnZUFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnbWVyZ2VBbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdwYXJ0aWFsJzogeyAnc3RhcnQnOiAxIH0sXG4gICdwYXJ0aWFsUmlnaHQnOiB7ICdzdGFydCc6IDEgfSxcbiAgJ3dpdGhvdXQnOiB7ICdzdGFydCc6IDEgfSxcbiAgJ3ppcEFsbCc6IHsgJ3N0YXJ0JzogMCB9XG59O1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBtZXRob2RzIHdoaWNoIG11dGF0ZSBhcnJheXMgb3Igb2JqZWN0cy4gKi9cbmV4cG9ydHMubXV0YXRlID0ge1xuICAnYXJyYXknOiB7XG4gICAgJ2ZpbGwnOiB0cnVlLFxuICAgICdwdWxsJzogdHJ1ZSxcbiAgICAncHVsbEFsbCc6IHRydWUsXG4gICAgJ3B1bGxBbGxCeSc6IHRydWUsXG4gICAgJ3B1bGxBbGxXaXRoJzogdHJ1ZSxcbiAgICAncHVsbEF0JzogdHJ1ZSxcbiAgICAncmVtb3ZlJzogdHJ1ZSxcbiAgICAncmV2ZXJzZSc6IHRydWVcbiAgfSxcbiAgJ29iamVjdCc6IHtcbiAgICAnYXNzaWduJzogdHJ1ZSxcbiAgICAnYXNzaWduQWxsJzogdHJ1ZSxcbiAgICAnYXNzaWduQWxsV2l0aCc6IHRydWUsXG4gICAgJ2Fzc2lnbkluJzogdHJ1ZSxcbiAgICAnYXNzaWduSW5BbGwnOiB0cnVlLFxuICAgICdhc3NpZ25JbkFsbFdpdGgnOiB0cnVlLFxuICAgICdhc3NpZ25JbldpdGgnOiB0cnVlLFxuICAgICdhc3NpZ25XaXRoJzogdHJ1ZSxcbiAgICAnZGVmYXVsdHMnOiB0cnVlLFxuICAgICdkZWZhdWx0c0FsbCc6IHRydWUsXG4gICAgJ2RlZmF1bHRzRGVlcCc6IHRydWUsXG4gICAgJ2RlZmF1bHRzRGVlcEFsbCc6IHRydWUsXG4gICAgJ21lcmdlJzogdHJ1ZSxcbiAgICAnbWVyZ2VBbGwnOiB0cnVlLFxuICAgICdtZXJnZUFsbFdpdGgnOiB0cnVlLFxuICAgICdtZXJnZVdpdGgnOiB0cnVlLFxuICB9LFxuICAnc2V0Jzoge1xuICAgICdzZXQnOiB0cnVlLFxuICAgICdzZXRXaXRoJzogdHJ1ZSxcbiAgICAndW5zZXQnOiB0cnVlLFxuICAgICd1cGRhdGUnOiB0cnVlLFxuICAgICd1cGRhdGVXaXRoJzogdHJ1ZVxuICB9XG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCAqL1xuZXhwb3J0cy5wbGFjZWhvbGRlciA9IHtcbiAgJ2JpbmQnOiB0cnVlLFxuICAnYmluZEtleSc6IHRydWUsXG4gICdjdXJyeSc6IHRydWUsXG4gICdjdXJyeVJpZ2h0JzogdHJ1ZSxcbiAgJ3BhcnRpYWwnOiB0cnVlLFxuICAncGFydGlhbFJpZ2h0JzogdHJ1ZVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIHJlYWwgbmFtZXMgdG8gdGhlaXIgYWxpYXNlcy4gKi9cbmV4cG9ydHMucmVhbFRvQWxpYXMgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBvYmplY3QgPSBleHBvcnRzLmFsaWFzVG9SZWFsLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICByZXN1bHRbdmFsdWVdLnB1c2goa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3ZhbHVlXSA9IFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSgpKTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byBvdGhlciBuYW1lcy4gKi9cbmV4cG9ydHMucmVtYXAgPSB7XG4gICdhc3NpZ25BbGwnOiAnYXNzaWduJyxcbiAgJ2Fzc2lnbkFsbFdpdGgnOiAnYXNzaWduV2l0aCcsXG4gICdhc3NpZ25JbkFsbCc6ICdhc3NpZ25JbicsXG4gICdhc3NpZ25JbkFsbFdpdGgnOiAnYXNzaWduSW5XaXRoJyxcbiAgJ2N1cnJ5Tic6ICdjdXJyeScsXG4gICdjdXJyeVJpZ2h0Tic6ICdjdXJyeVJpZ2h0JyxcbiAgJ2RlZmF1bHRzQWxsJzogJ2RlZmF1bHRzJyxcbiAgJ2RlZmF1bHRzRGVlcEFsbCc6ICdkZWZhdWx0c0RlZXAnLFxuICAnZmluZEZyb20nOiAnZmluZCcsXG4gICdmaW5kSW5kZXhGcm9tJzogJ2ZpbmRJbmRleCcsXG4gICdmaW5kTGFzdEZyb20nOiAnZmluZExhc3QnLFxuICAnZmluZExhc3RJbmRleEZyb20nOiAnZmluZExhc3RJbmRleCcsXG4gICdnZXRPcic6ICdnZXQnLFxuICAnaW5jbHVkZXNGcm9tJzogJ2luY2x1ZGVzJyxcbiAgJ2luZGV4T2ZGcm9tJzogJ2luZGV4T2YnLFxuICAnaW52b2tlQXJncyc6ICdpbnZva2UnLFxuICAnaW52b2tlQXJnc01hcCc6ICdpbnZva2VNYXAnLFxuICAnbGFzdEluZGV4T2ZGcm9tJzogJ2xhc3RJbmRleE9mJyxcbiAgJ21lcmdlQWxsJzogJ21lcmdlJyxcbiAgJ21lcmdlQWxsV2l0aCc6ICdtZXJnZVdpdGgnLFxuICAncGFkQ2hhcnMnOiAncGFkJyxcbiAgJ3BhZENoYXJzRW5kJzogJ3BhZEVuZCcsXG4gICdwYWRDaGFyc1N0YXJ0JzogJ3BhZFN0YXJ0JyxcbiAgJ3Byb3BlcnR5T2YnOiAnZ2V0JyxcbiAgJ3JhbmdlU3RlcCc6ICdyYW5nZScsXG4gICdyYW5nZVN0ZXBSaWdodCc6ICdyYW5nZVJpZ2h0JyxcbiAgJ3Jlc3RGcm9tJzogJ3Jlc3QnLFxuICAnc3ByZWFkRnJvbSc6ICdzcHJlYWQnLFxuICAndHJpbUNoYXJzJzogJ3RyaW0nLFxuICAndHJpbUNoYXJzRW5kJzogJ3RyaW1FbmQnLFxuICAndHJpbUNoYXJzU3RhcnQnOiAndHJpbVN0YXJ0JyxcbiAgJ3ppcEFsbCc6ICd6aXAnXG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHRoYXQgc2tpcCBmaXhpbmcgdGhlaXIgYXJpdHkuICovXG5leHBvcnRzLnNraXBGaXhlZCA9IHtcbiAgJ2Nhc3RBcnJheSc6IHRydWUsXG4gICdmbG93JzogdHJ1ZSxcbiAgJ2Zsb3dSaWdodCc6IHRydWUsXG4gICdpdGVyYXRlZSc6IHRydWUsXG4gICdtaXhpbic6IHRydWUsXG4gICdyZWFyZyc6IHRydWUsXG4gICdydW5JbkNvbnRleHQnOiB0cnVlXG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHRoYXQgc2tpcCByZWFycmFuZ2luZyBhcmd1bWVudHMuICovXG5leHBvcnRzLnNraXBSZWFyZyA9IHtcbiAgJ2FkZCc6IHRydWUsXG4gICdhc3NpZ24nOiB0cnVlLFxuICAnYXNzaWduSW4nOiB0cnVlLFxuICAnYmluZCc6IHRydWUsXG4gICdiaW5kS2V5JzogdHJ1ZSxcbiAgJ2NvbmNhdCc6IHRydWUsXG4gICdkaWZmZXJlbmNlJzogdHJ1ZSxcbiAgJ2RpdmlkZSc6IHRydWUsXG4gICdlcSc6IHRydWUsXG4gICdndCc6IHRydWUsXG4gICdndGUnOiB0cnVlLFxuICAnaXNFcXVhbCc6IHRydWUsXG4gICdsdCc6IHRydWUsXG4gICdsdGUnOiB0cnVlLFxuICAnbWF0Y2hlc1Byb3BlcnR5JzogdHJ1ZSxcbiAgJ21lcmdlJzogdHJ1ZSxcbiAgJ211bHRpcGx5JzogdHJ1ZSxcbiAgJ292ZXJBcmdzJzogdHJ1ZSxcbiAgJ3BhcnRpYWwnOiB0cnVlLFxuICAncGFydGlhbFJpZ2h0JzogdHJ1ZSxcbiAgJ3Byb3BlcnR5T2YnOiB0cnVlLFxuICAncmFuZG9tJzogdHJ1ZSxcbiAgJ3JhbmdlJzogdHJ1ZSxcbiAgJ3JhbmdlUmlnaHQnOiB0cnVlLFxuICAnc3VidHJhY3QnOiB0cnVlLFxuICAnemlwJzogdHJ1ZSxcbiAgJ3ppcE9iamVjdCc6IHRydWUsXG4gICd6aXBPYmplY3REZWVwJzogdHJ1ZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbG9kYXNoL2ZwL19tYXBwaW5nLmpzIiwiLyoqXG4gKiBUaGUgZGVmYXVsdCBhcmd1bWVudCBwbGFjZWhvbGRlciB2YWx1ZSBmb3IgbWV0aG9kcy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanMiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBMb2Rhc2ggbG9kYXNoLmNvbS9saWNlbnNlIHwgVW5kZXJzY29yZS5qcyAxLjguMyB1bmRlcnNjb3JlanMub3JnL0xJQ0VOU0VcbiAqL1xuOyhmdW5jdGlvbigpe2Z1bmN0aW9uIG4obix0KXtyZXR1cm4gbi5zZXQodFswXSx0WzFdKSxufWZ1bmN0aW9uIHQobix0KXtyZXR1cm4gbi5hZGQodCksbn1mdW5jdGlvbiByKG4sdCxyKXtzd2l0Y2goci5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gbi5jYWxsKHQpO2Nhc2UgMTpyZXR1cm4gbi5jYWxsKHQsclswXSk7Y2FzZSAyOnJldHVybiBuLmNhbGwodCxyWzBdLHJbMV0pO2Nhc2UgMzpyZXR1cm4gbi5jYWxsKHQsclswXSxyWzFdLHJbMl0pfXJldHVybiBuLmFwcGx5KHQscil9ZnVuY3Rpb24gZShuLHQscixlKXtmb3IodmFyIHU9LTEsaT1udWxsPT1uPzA6bi5sZW5ndGg7Kyt1PGk7KXt2YXIgbz1uW3VdO3QoZSxvLHIobyksbil9cmV0dXJuIGV9ZnVuY3Rpb24gdShuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZSYmZmFsc2UhPT10KG5bcl0scixuKTspO3JldHVybiBufWZ1bmN0aW9uIGkobix0KXtmb3IodmFyIHI9bnVsbD09bj8wOm4ubGVuZ3RoO3ItLSYmZmFsc2UhPT10KG5bcl0scixuKTspO1xucmV0dXJuIG59ZnVuY3Rpb24gbyhuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZTspaWYoIXQobltyXSxyLG4pKXJldHVybiBmYWxzZTtyZXR1cm4gdHJ1ZX1mdW5jdGlvbiBmKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXTt0KG8scixuKSYmKGlbdSsrXT1vKX1yZXR1cm4gaX1mdW5jdGlvbiBjKG4sdCl7cmV0dXJuIShudWxsPT1ufHwhbi5sZW5ndGgpJiYtMTxkKG4sdCwwKX1mdW5jdGlvbiBhKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1udWxsPT1uPzA6bi5sZW5ndGg7KytlPHU7KWlmKHIodCxuW2VdKSlyZXR1cm4gdHJ1ZTtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24gbChuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aCx1PUFycmF5KGUpOysrcjxlOyl1W3JdPXQobltyXSxyLG4pO3JldHVybiB1fWZ1bmN0aW9uIHMobix0KXtmb3IodmFyIHI9LTEsZT10Lmxlbmd0aCx1PW4ubGVuZ3RoOysrcjxlOyluW3Urcl09dFtyXTtcbnJldHVybiBufWZ1bmN0aW9uIGgobix0LHIsZSl7dmFyIHU9LTEsaT1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKGUmJmkmJihyPW5bKyt1XSk7Kyt1PGk7KXI9dChyLG5bdV0sdSxuKTtyZXR1cm4gcn1mdW5jdGlvbiBwKG4sdCxyLGUpe3ZhciB1PW51bGw9PW4/MDpuLmxlbmd0aDtmb3IoZSYmdSYmKHI9blstLXVdKTt1LS07KXI9dChyLG5bdV0sdSxuKTtyZXR1cm4gcn1mdW5jdGlvbiBfKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoOysrcjxlOylpZih0KG5bcl0scixuKSlyZXR1cm4gdHJ1ZTtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24gdihuLHQscil7dmFyIGU7cmV0dXJuIHIobixmdW5jdGlvbihuLHIsdSl7aWYodChuLHIsdSkpcmV0dXJuIGU9cixmYWxzZX0pLGV9ZnVuY3Rpb24gZyhuLHQscixlKXt2YXIgdT1uLmxlbmd0aDtmb3Iocis9ZT8xOi0xO2U/ci0tOisrcjx1OylpZih0KG5bcl0scixuKSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBkKG4sdCxyKXtpZih0PT09dCluOntcbi0tcjtmb3IodmFyIGU9bi5sZW5ndGg7KytyPGU7KWlmKG5bcl09PT10KXtuPXI7YnJlYWsgbn1uPS0xfWVsc2Ugbj1nKG4sYixyKTtyZXR1cm4gbn1mdW5jdGlvbiB5KG4sdCxyLGUpey0tcjtmb3IodmFyIHU9bi5sZW5ndGg7KytyPHU7KWlmKGUobltyXSx0KSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBiKG4pe3JldHVybiBuIT09bn1mdW5jdGlvbiB4KG4sdCl7dmFyIHI9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiByP2sobix0KS9yOlB9ZnVuY3Rpb24gaihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/Rjp0W25dfX1mdW5jdGlvbiB3KG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09bj9GOm5bdF19fWZ1bmN0aW9uIG0obix0LHIsZSx1KXtyZXR1cm4gdShuLGZ1bmN0aW9uKG4sdSxpKXtyPWU/KGU9ZmFsc2Usbik6dChyLG4sdSxpKX0pLHJ9ZnVuY3Rpb24gQShuLHQpe3ZhciByPW4ubGVuZ3RoO2ZvcihuLnNvcnQodCk7ci0tOyluW3JdPW5bcl0uYztcbnJldHVybiBufWZ1bmN0aW9uIGsobix0KXtmb3IodmFyIHIsZT0tMSx1PW4ubGVuZ3RoOysrZTx1Oyl7dmFyIGk9dChuW2VdKTtpIT09RiYmKHI9cj09PUY/aTpyK2kpfXJldHVybiByfWZ1bmN0aW9uIEUobix0KXtmb3IodmFyIHI9LTEsZT1BcnJheShuKTsrK3I8bjspZVtyXT10KHIpO3JldHVybiBlfWZ1bmN0aW9uIE8obix0KXtyZXR1cm4gbCh0LGZ1bmN0aW9uKHQpe3JldHVyblt0LG5bdF1dfSl9ZnVuY3Rpb24gUyhuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9fWZ1bmN0aW9uIEkobix0KXtyZXR1cm4gbCh0LGZ1bmN0aW9uKHQpe3JldHVybiBuW3RdfSl9ZnVuY3Rpb24gUihuLHQpe3JldHVybiBuLmhhcyh0KX1mdW5jdGlvbiB6KG4sdCl7Zm9yKHZhciByPS0xLGU9bi5sZW5ndGg7KytyPGUmJi0xPGQodCxuW3JdLDApOyk7cmV0dXJuIHJ9ZnVuY3Rpb24gVyhuLHQpe2Zvcih2YXIgcj1uLmxlbmd0aDtyLS0mJi0xPGQodCxuW3JdLDApOyk7cmV0dXJuIHJ9ZnVuY3Rpb24gQihuKXtcbnJldHVyblwiXFxcXFwiK1RuW25dfWZ1bmN0aW9uIEwobil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obixlKXtyWysrdF09W2Usbl19KSxyfWZ1bmN0aW9uIFUobix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG4odChyKSl9fWZ1bmN0aW9uIEMobix0KXtmb3IodmFyIHI9LTEsZT1uLmxlbmd0aCx1PTAsaT1bXTsrK3I8ZTspe3ZhciBvPW5bcl07byE9PXQmJlwiX19sb2Rhc2hfcGxhY2Vob2xkZXJfX1wiIT09b3x8KG5bcl09XCJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fXCIsaVt1KytdPXIpfXJldHVybiBpfWZ1bmN0aW9uIEQobil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7clsrK3RdPW59KSxyfWZ1bmN0aW9uIE0obil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7clsrK3RdPVtuLG5dfSkscn1mdW5jdGlvbiBUKG4pe2lmKEJuLnRlc3Qobikpe1xuZm9yKHZhciB0PXpuLmxhc3RJbmRleD0wO3puLnRlc3Qobik7KSsrdDtuPXR9ZWxzZSBuPXR0KG4pO3JldHVybiBufWZ1bmN0aW9uICQobil7cmV0dXJuIEJuLnRlc3Qobik/bi5tYXRjaCh6bil8fFtdOm4uc3BsaXQoXCJcIil9dmFyIEYsTj0xLzAsUD1OYU4sWj1bW1wiYXJ5XCIsMTI4XSxbXCJiaW5kXCIsMV0sW1wiYmluZEtleVwiLDJdLFtcImN1cnJ5XCIsOF0sW1wiY3VycnlSaWdodFwiLDE2XSxbXCJmbGlwXCIsNTEyXSxbXCJwYXJ0aWFsXCIsMzJdLFtcInBhcnRpYWxSaWdodFwiLDY0XSxbXCJyZWFyZ1wiLDI1Nl1dLHE9L1xcYl9fcFxcKz0nJzsvZyxWPS9cXGIoX19wXFwrPSknJ1xcKy9nLEs9LyhfX2VcXCguKj9cXCl8XFxiX190XFwpKVxcKycnOy9nLEc9LyYoPzphbXB8bHR8Z3R8cXVvdHwjMzkpOy9nLEg9L1smPD5cIiddL2csSj1SZWdFeHAoRy5zb3VyY2UpLFk9UmVnRXhwKEguc291cmNlKSxRPS88JS0oW1xcc1xcU10rPyklPi9nLFg9LzwlKFtcXHNcXFNdKz8pJT4vZyxubj0vPCU9KFtcXHNcXFNdKz8pJT4vZyx0bj0vXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLHJuPS9eXFx3KiQvLGVuPS9eXFwuLyx1bj0vW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2csb249L1tcXFxcXiQuKis/KClbXFxde318XS9nLGZuPVJlZ0V4cChvbi5zb3VyY2UpLGNuPS9eXFxzK3xcXHMrJC9nLGFuPS9eXFxzKy8sbG49L1xccyskLyxzbj0vXFx7KD86XFxuXFwvXFwqIFxcW3dyYXBwZWQgd2l0aCAuK1xcXSBcXCpcXC8pP1xcbj8vLGhuPS9cXHtcXG5cXC9cXCogXFxbd3JhcHBlZCB3aXRoICguKylcXF0gXFwqLyxwbj0vLD8gJiAvLF9uPS9bXlxceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdmXSsvZyx2bj0vXFxcXChcXFxcKT8vZyxnbj0vXFwkXFx7KFteXFxcXH1dKig/OlxcXFwuW15cXFxcfV0qKSopXFx9L2csZG49L1xcdyokLyx5bj0vXlstK10weFswLTlhLWZdKyQvaSxibj0vXjBiWzAxXSskL2kseG49L15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLyxqbj0vXjBvWzAtN10rJC9pLHduPS9eKD86MHxbMS05XVxcZCopJC8sbW49L1tcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx4ZmZcXHUwMTAwLVxcdTAxN2ZdL2csQW49LygkXikvLGtuPS9bJ1xcblxcclxcdTIwMjhcXHUyMDI5XFxcXF0vZyxFbj1cIltcXFxcdWZlMGVcXFxcdWZlMGZdPyg/OltcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdfFxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSk/KD86XFxcXHUyMDBkKD86W15cXFxcdWQ4MDAtXFxcXHVkZmZmXXwoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9fFtcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXSlbXFxcXHVmZTBlXFxcXHVmZTBmXT8oPzpbXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMmZcXFxcdTIwZDAtXFxcXHUyMGZmXXxcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0pPykqXCIsT249XCIoPzpbXFxcXHUyNzAwLVxcXFx1MjdiZl18KD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfXxbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0pXCIrRW4sU249XCIoPzpbXlxcXFx1ZDgwMC1cXFxcdWRmZmZdW1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZl0/fFtcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdfCg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn18W1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdfFtcXFxcdWQ4MDAtXFxcXHVkZmZmXSlcIixJbj1SZWdFeHAoXCJbJ1xcdTIwMTldXCIsXCJnXCIpLFJuPVJlZ0V4cChcIltcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdXCIsXCJnXCIpLHpuPVJlZ0V4cChcIlxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSg/PVxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSl8XCIrU24rRW4sXCJnXCIpLFduPVJlZ0V4cChbXCJbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXT9bYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmXSsoPzpbJ1xcdTIwMTldKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPyg/PVtcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXXxbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXXwkKXwoPzpbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXXxbXlxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXFxcXGQrXFxcXHUyNzAwLVxcXFx1MjdiZmEtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0pKyg/OlsnXFx1MjAxOV0oPzpEfExMfE18UkV8U3xUfFZFKSk/KD89W1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmZcXFxcdTIwMDAtXFxcXHUyMDZmIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBdfFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKD86W2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZl18W15cXFxcdWQ4MDAtXFxcXHVkZmZmXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmN1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZlxcXFx1MjAwMC1cXFxcdTIwNmYgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMFxcXFxkK1xcXFx1MjcwMC1cXFxcdTI3YmZhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmZBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKXwkKXxbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXT8oPzpbYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmXXxbXlxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXFxcXGQrXFxcXHUyNzAwLVxcXFx1MjdiZmEtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0pKyg/OlsnXFx1MjAxOV0oPzpkfGxsfG18cmV8c3x0fHZlKSk/fFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKyg/OlsnXFx1MjAxOV0oPzpEfExMfE18UkV8U3xUfFZFKSk/fFxcXFxkKig/Oig/OjFTVHwyTkR8M1JEfCg/IVsxMjNdKVxcXFxkVEgpXFxcXGIpfFxcXFxkKig/Oig/OjFzdHwybmR8M3JkfCg/IVsxMjNdKVxcXFxkdGgpXFxcXGIpfFxcXFxkK1wiLE9uXS5qb2luKFwifFwiKSxcImdcIiksQm49UmVnRXhwKFwiW1xcXFx1MjAwZFxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZcXFxcdWZlMGVcXFxcdWZlMGZdXCIpLExuPS9bYS16XVtBLVpdfFtBLVpdezIsfVthLXpdfFswLTldW2EtekEtWl18W2EtekEtWl1bMC05XXxbXmEtekEtWjAtOSBdLyxVbj1cIkFycmF5IEJ1ZmZlciBEYXRhVmlldyBEYXRlIEVycm9yIEZsb2F0MzJBcnJheSBGbG9hdDY0QXJyYXkgRnVuY3Rpb24gSW50OEFycmF5IEludDE2QXJyYXkgSW50MzJBcnJheSBNYXAgTWF0aCBPYmplY3QgUHJvbWlzZSBSZWdFeHAgU2V0IFN0cmluZyBTeW1ib2wgVHlwZUVycm9yIFVpbnQ4QXJyYXkgVWludDhDbGFtcGVkQXJyYXkgVWludDE2QXJyYXkgVWludDMyQXJyYXkgV2Vha01hcCBfIGNsZWFyVGltZW91dCBpc0Zpbml0ZSBwYXJzZUludCBzZXRUaW1lb3V0XCIuc3BsaXQoXCIgXCIpLENuPXt9O1xuQ25bXCJbb2JqZWN0IEZsb2F0MzJBcnJheV1cIl09Q25bXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIl09Q25bXCJbb2JqZWN0IEludDhBcnJheV1cIl09Q25bXCJbb2JqZWN0IEludDE2QXJyYXldXCJdPUNuW1wiW29iamVjdCBJbnQzMkFycmF5XVwiXT1DbltcIltvYmplY3QgVWludDhBcnJheV1cIl09Q25bXCJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XVwiXT1DbltcIltvYmplY3QgVWludDE2QXJyYXldXCJdPUNuW1wiW29iamVjdCBVaW50MzJBcnJheV1cIl09dHJ1ZSxDbltcIltvYmplY3QgQXJndW1lbnRzXVwiXT1DbltcIltvYmplY3QgQXJyYXldXCJdPUNuW1wiW29iamVjdCBBcnJheUJ1ZmZlcl1cIl09Q25bXCJbb2JqZWN0IEJvb2xlYW5dXCJdPUNuW1wiW29iamVjdCBEYXRhVmlld11cIl09Q25bXCJbb2JqZWN0IERhdGVdXCJdPUNuW1wiW29iamVjdCBFcnJvcl1cIl09Q25bXCJbb2JqZWN0IEZ1bmN0aW9uXVwiXT1DbltcIltvYmplY3QgTWFwXVwiXT1DbltcIltvYmplY3QgTnVtYmVyXVwiXT1DbltcIltvYmplY3QgT2JqZWN0XVwiXT1DbltcIltvYmplY3QgUmVnRXhwXVwiXT1DbltcIltvYmplY3QgU2V0XVwiXT1DbltcIltvYmplY3QgU3RyaW5nXVwiXT1DbltcIltvYmplY3QgV2Vha01hcF1cIl09ZmFsc2U7XG52YXIgRG49e307RG5bXCJbb2JqZWN0IEFyZ3VtZW50c11cIl09RG5bXCJbb2JqZWN0IEFycmF5XVwiXT1EbltcIltvYmplY3QgQXJyYXlCdWZmZXJdXCJdPURuW1wiW29iamVjdCBEYXRhVmlld11cIl09RG5bXCJbb2JqZWN0IEJvb2xlYW5dXCJdPURuW1wiW29iamVjdCBEYXRlXVwiXT1EbltcIltvYmplY3QgRmxvYXQzMkFycmF5XVwiXT1EbltcIltvYmplY3QgRmxvYXQ2NEFycmF5XVwiXT1EbltcIltvYmplY3QgSW50OEFycmF5XVwiXT1EbltcIltvYmplY3QgSW50MTZBcnJheV1cIl09RG5bXCJbb2JqZWN0IEludDMyQXJyYXldXCJdPURuW1wiW29iamVjdCBNYXBdXCJdPURuW1wiW29iamVjdCBOdW1iZXJdXCJdPURuW1wiW29iamVjdCBPYmplY3RdXCJdPURuW1wiW29iamVjdCBSZWdFeHBdXCJdPURuW1wiW29iamVjdCBTZXRdXCJdPURuW1wiW29iamVjdCBTdHJpbmddXCJdPURuW1wiW29iamVjdCBTeW1ib2xdXCJdPURuW1wiW29iamVjdCBVaW50OEFycmF5XVwiXT1EbltcIltvYmplY3QgVWludDhDbGFtcGVkQXJyYXldXCJdPURuW1wiW29iamVjdCBVaW50MTZBcnJheV1cIl09RG5bXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiXT10cnVlLFxuRG5bXCJbb2JqZWN0IEVycm9yXVwiXT1EbltcIltvYmplY3QgRnVuY3Rpb25dXCJdPURuW1wiW29iamVjdCBXZWFrTWFwXVwiXT1mYWxzZTt2YXIgTW4sVG49e1wiXFxcXFwiOlwiXFxcXFwiLFwiJ1wiOlwiJ1wiLFwiXFxuXCI6XCJuXCIsXCJcXHJcIjpcInJcIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSwkbj1wYXJzZUZsb2F0LEZuPXBhcnNlSW50LE5uPXR5cGVvZiBnbG9iYWw9PVwib2JqZWN0XCImJmdsb2JhbCYmZ2xvYmFsLk9iamVjdD09PU9iamVjdCYmZ2xvYmFsLFBuPXR5cGVvZiBzZWxmPT1cIm9iamVjdFwiJiZzZWxmJiZzZWxmLk9iamVjdD09PU9iamVjdCYmc2VsZixabj1Obnx8UG58fEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSxxbj10eXBlb2YgZXhwb3J0cz09XCJvYmplY3RcIiYmZXhwb3J0cyYmIWV4cG9ydHMubm9kZVR5cGUmJmV4cG9ydHMsVm49cW4mJnR5cGVvZiBtb2R1bGU9PVwib2JqZWN0XCImJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLEtuPVZuJiZWbi5leHBvcnRzPT09cW4sR249S24mJk5uLnByb2Nlc3M7XG5uOnt0cnl7TW49R24mJkduLmJpbmRpbmcmJkduLmJpbmRpbmcoXCJ1dGlsXCIpO2JyZWFrIG59Y2F0Y2gobil7fU1uPXZvaWQgMH12YXIgSG49TW4mJk1uLmlzQXJyYXlCdWZmZXIsSm49TW4mJk1uLmlzRGF0ZSxZbj1NbiYmTW4uaXNNYXAsUW49TW4mJk1uLmlzUmVnRXhwLFhuPU1uJiZNbi5pc1NldCxudD1NbiYmTW4uaXNUeXBlZEFycmF5LHR0PWooXCJsZW5ndGhcIikscnQ9dyh7XCJcXHhjMFwiOlwiQVwiLFwiXFx4YzFcIjpcIkFcIixcIlxceGMyXCI6XCJBXCIsXCJcXHhjM1wiOlwiQVwiLFwiXFx4YzRcIjpcIkFcIixcIlxceGM1XCI6XCJBXCIsXCJcXHhlMFwiOlwiYVwiLFwiXFx4ZTFcIjpcImFcIixcIlxceGUyXCI6XCJhXCIsXCJcXHhlM1wiOlwiYVwiLFwiXFx4ZTRcIjpcImFcIixcIlxceGU1XCI6XCJhXCIsXCJcXHhjN1wiOlwiQ1wiLFwiXFx4ZTdcIjpcImNcIixcIlxceGQwXCI6XCJEXCIsXCJcXHhmMFwiOlwiZFwiLFwiXFx4YzhcIjpcIkVcIixcIlxceGM5XCI6XCJFXCIsXCJcXHhjYVwiOlwiRVwiLFwiXFx4Y2JcIjpcIkVcIixcIlxceGU4XCI6XCJlXCIsXCJcXHhlOVwiOlwiZVwiLFwiXFx4ZWFcIjpcImVcIixcIlxceGViXCI6XCJlXCIsXCJcXHhjY1wiOlwiSVwiLFwiXFx4Y2RcIjpcIklcIixcIlxceGNlXCI6XCJJXCIsXG5cIlxceGNmXCI6XCJJXCIsXCJcXHhlY1wiOlwiaVwiLFwiXFx4ZWRcIjpcImlcIixcIlxceGVlXCI6XCJpXCIsXCJcXHhlZlwiOlwiaVwiLFwiXFx4ZDFcIjpcIk5cIixcIlxceGYxXCI6XCJuXCIsXCJcXHhkMlwiOlwiT1wiLFwiXFx4ZDNcIjpcIk9cIixcIlxceGQ0XCI6XCJPXCIsXCJcXHhkNVwiOlwiT1wiLFwiXFx4ZDZcIjpcIk9cIixcIlxceGQ4XCI6XCJPXCIsXCJcXHhmMlwiOlwib1wiLFwiXFx4ZjNcIjpcIm9cIixcIlxceGY0XCI6XCJvXCIsXCJcXHhmNVwiOlwib1wiLFwiXFx4ZjZcIjpcIm9cIixcIlxceGY4XCI6XCJvXCIsXCJcXHhkOVwiOlwiVVwiLFwiXFx4ZGFcIjpcIlVcIixcIlxceGRiXCI6XCJVXCIsXCJcXHhkY1wiOlwiVVwiLFwiXFx4ZjlcIjpcInVcIixcIlxceGZhXCI6XCJ1XCIsXCJcXHhmYlwiOlwidVwiLFwiXFx4ZmNcIjpcInVcIixcIlxceGRkXCI6XCJZXCIsXCJcXHhmZFwiOlwieVwiLFwiXFx4ZmZcIjpcInlcIixcIlxceGM2XCI6XCJBZVwiLFwiXFx4ZTZcIjpcImFlXCIsXCJcXHhkZVwiOlwiVGhcIixcIlxceGZlXCI6XCJ0aFwiLFwiXFx4ZGZcIjpcInNzXCIsXCJcXHUwMTAwXCI6XCJBXCIsXCJcXHUwMTAyXCI6XCJBXCIsXCJcXHUwMTA0XCI6XCJBXCIsXCJcXHUwMTAxXCI6XCJhXCIsXCJcXHUwMTAzXCI6XCJhXCIsXCJcXHUwMTA1XCI6XCJhXCIsXCJcXHUwMTA2XCI6XCJDXCIsXCJcXHUwMTA4XCI6XCJDXCIsXCJcXHUwMTBhXCI6XCJDXCIsXG5cIlxcdTAxMGNcIjpcIkNcIixcIlxcdTAxMDdcIjpcImNcIixcIlxcdTAxMDlcIjpcImNcIixcIlxcdTAxMGJcIjpcImNcIixcIlxcdTAxMGRcIjpcImNcIixcIlxcdTAxMGVcIjpcIkRcIixcIlxcdTAxMTBcIjpcIkRcIixcIlxcdTAxMGZcIjpcImRcIixcIlxcdTAxMTFcIjpcImRcIixcIlxcdTAxMTJcIjpcIkVcIixcIlxcdTAxMTRcIjpcIkVcIixcIlxcdTAxMTZcIjpcIkVcIixcIlxcdTAxMThcIjpcIkVcIixcIlxcdTAxMWFcIjpcIkVcIixcIlxcdTAxMTNcIjpcImVcIixcIlxcdTAxMTVcIjpcImVcIixcIlxcdTAxMTdcIjpcImVcIixcIlxcdTAxMTlcIjpcImVcIixcIlxcdTAxMWJcIjpcImVcIixcIlxcdTAxMWNcIjpcIkdcIixcIlxcdTAxMWVcIjpcIkdcIixcIlxcdTAxMjBcIjpcIkdcIixcIlxcdTAxMjJcIjpcIkdcIixcIlxcdTAxMWRcIjpcImdcIixcIlxcdTAxMWZcIjpcImdcIixcIlxcdTAxMjFcIjpcImdcIixcIlxcdTAxMjNcIjpcImdcIixcIlxcdTAxMjRcIjpcIkhcIixcIlxcdTAxMjZcIjpcIkhcIixcIlxcdTAxMjVcIjpcImhcIixcIlxcdTAxMjdcIjpcImhcIixcIlxcdTAxMjhcIjpcIklcIixcIlxcdTAxMmFcIjpcIklcIixcIlxcdTAxMmNcIjpcIklcIixcIlxcdTAxMmVcIjpcIklcIixcIlxcdTAxMzBcIjpcIklcIixcIlxcdTAxMjlcIjpcImlcIixcIlxcdTAxMmJcIjpcImlcIixcIlxcdTAxMmRcIjpcImlcIixcblwiXFx1MDEyZlwiOlwiaVwiLFwiXFx1MDEzMVwiOlwiaVwiLFwiXFx1MDEzNFwiOlwiSlwiLFwiXFx1MDEzNVwiOlwialwiLFwiXFx1MDEzNlwiOlwiS1wiLFwiXFx1MDEzN1wiOlwia1wiLFwiXFx1MDEzOFwiOlwia1wiLFwiXFx1MDEzOVwiOlwiTFwiLFwiXFx1MDEzYlwiOlwiTFwiLFwiXFx1MDEzZFwiOlwiTFwiLFwiXFx1MDEzZlwiOlwiTFwiLFwiXFx1MDE0MVwiOlwiTFwiLFwiXFx1MDEzYVwiOlwibFwiLFwiXFx1MDEzY1wiOlwibFwiLFwiXFx1MDEzZVwiOlwibFwiLFwiXFx1MDE0MFwiOlwibFwiLFwiXFx1MDE0MlwiOlwibFwiLFwiXFx1MDE0M1wiOlwiTlwiLFwiXFx1MDE0NVwiOlwiTlwiLFwiXFx1MDE0N1wiOlwiTlwiLFwiXFx1MDE0YVwiOlwiTlwiLFwiXFx1MDE0NFwiOlwiblwiLFwiXFx1MDE0NlwiOlwiblwiLFwiXFx1MDE0OFwiOlwiblwiLFwiXFx1MDE0YlwiOlwiblwiLFwiXFx1MDE0Y1wiOlwiT1wiLFwiXFx1MDE0ZVwiOlwiT1wiLFwiXFx1MDE1MFwiOlwiT1wiLFwiXFx1MDE0ZFwiOlwib1wiLFwiXFx1MDE0ZlwiOlwib1wiLFwiXFx1MDE1MVwiOlwib1wiLFwiXFx1MDE1NFwiOlwiUlwiLFwiXFx1MDE1NlwiOlwiUlwiLFwiXFx1MDE1OFwiOlwiUlwiLFwiXFx1MDE1NVwiOlwiclwiLFwiXFx1MDE1N1wiOlwiclwiLFwiXFx1MDE1OVwiOlwiclwiLFwiXFx1MDE1YVwiOlwiU1wiLFwiXFx1MDE1Y1wiOlwiU1wiLFxuXCJcXHUwMTVlXCI6XCJTXCIsXCJcXHUwMTYwXCI6XCJTXCIsXCJcXHUwMTViXCI6XCJzXCIsXCJcXHUwMTVkXCI6XCJzXCIsXCJcXHUwMTVmXCI6XCJzXCIsXCJcXHUwMTYxXCI6XCJzXCIsXCJcXHUwMTYyXCI6XCJUXCIsXCJcXHUwMTY0XCI6XCJUXCIsXCJcXHUwMTY2XCI6XCJUXCIsXCJcXHUwMTYzXCI6XCJ0XCIsXCJcXHUwMTY1XCI6XCJ0XCIsXCJcXHUwMTY3XCI6XCJ0XCIsXCJcXHUwMTY4XCI6XCJVXCIsXCJcXHUwMTZhXCI6XCJVXCIsXCJcXHUwMTZjXCI6XCJVXCIsXCJcXHUwMTZlXCI6XCJVXCIsXCJcXHUwMTcwXCI6XCJVXCIsXCJcXHUwMTcyXCI6XCJVXCIsXCJcXHUwMTY5XCI6XCJ1XCIsXCJcXHUwMTZiXCI6XCJ1XCIsXCJcXHUwMTZkXCI6XCJ1XCIsXCJcXHUwMTZmXCI6XCJ1XCIsXCJcXHUwMTcxXCI6XCJ1XCIsXCJcXHUwMTczXCI6XCJ1XCIsXCJcXHUwMTc0XCI6XCJXXCIsXCJcXHUwMTc1XCI6XCJ3XCIsXCJcXHUwMTc2XCI6XCJZXCIsXCJcXHUwMTc3XCI6XCJ5XCIsXCJcXHUwMTc4XCI6XCJZXCIsXCJcXHUwMTc5XCI6XCJaXCIsXCJcXHUwMTdiXCI6XCJaXCIsXCJcXHUwMTdkXCI6XCJaXCIsXCJcXHUwMTdhXCI6XCJ6XCIsXCJcXHUwMTdjXCI6XCJ6XCIsXCJcXHUwMTdlXCI6XCJ6XCIsXCJcXHUwMTMyXCI6XCJJSlwiLFwiXFx1MDEzM1wiOlwiaWpcIixcIlxcdTAxNTJcIjpcIk9lXCIsXCJcXHUwMTUzXCI6XCJvZVwiLFxuXCJcXHUwMTQ5XCI6XCInblwiLFwiXFx1MDE3ZlwiOlwic1wifSksZXQ9dyh7XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCJ9KSx1dD13KHtcIiZhbXA7XCI6XCImXCIsXCImbHQ7XCI6XCI8XCIsXCImZ3Q7XCI6XCI+XCIsXCImcXVvdDtcIjonXCInLFwiJiMzOTtcIjpcIidcIn0pLGl0PWZ1bmN0aW9uIHcoRW4pe2Z1bmN0aW9uIE9uKG4pe2lmKHh1KG4pJiYhYWYobikmJiEobiBpbnN0YW5jZW9mIE1uKSl7aWYobiBpbnN0YW5jZW9mIHpuKXJldHVybiBuO2lmKGNpLmNhbGwobixcIl9fd3JhcHBlZF9fXCIpKXJldHVybiBQZShuKX1yZXR1cm4gbmV3IHpuKG4pfWZ1bmN0aW9uIFNuKCl7fWZ1bmN0aW9uIHpuKG4sdCl7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2NoYWluX189ISF0LHRoaXMuX19pbmRleF9fPTAsdGhpcy5fX3ZhbHVlc19fPUZ9ZnVuY3Rpb24gTW4obil7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2Rpcl9fPTEsXG50aGlzLl9fZmlsdGVyZWRfXz1mYWxzZSx0aGlzLl9faXRlcmF0ZWVzX189W10sdGhpcy5fX3Rha2VDb3VudF9fPTQyOTQ5NjcyOTUsdGhpcy5fX3ZpZXdzX189W119ZnVuY3Rpb24gVG4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gTm4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gUG4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gcW4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuX19kYXRhX189bmV3IFBuOysrdDxyOyl0aGlzLmFkZChuW3RdKX1mdW5jdGlvbiBWbihuKXtcbnRoaXMuc2l6ZT0odGhpcy5fX2RhdGFfXz1uZXcgTm4obikpLnNpemV9ZnVuY3Rpb24gR24obix0KXt2YXIgcixlPWFmKG4pLHU9IWUmJmNmKG4pLGk9IWUmJiF1JiZzZihuKSxvPSFlJiYhdSYmIWkmJmdmKG4pLHU9KGU9ZXx8dXx8aXx8byk/RShuLmxlbmd0aCxyaSk6W10sZj11Lmxlbmd0aDtmb3IociBpbiBuKSF0JiYhY2kuY2FsbChuLHIpfHxlJiYoXCJsZW5ndGhcIj09cnx8aSYmKFwib2Zmc2V0XCI9PXJ8fFwicGFyZW50XCI9PXIpfHxvJiYoXCJidWZmZXJcIj09cnx8XCJieXRlTGVuZ3RoXCI9PXJ8fFwiYnl0ZU9mZnNldFwiPT1yKXx8UmUocixmKSl8fHUucHVzaChyKTtyZXR1cm4gdX1mdW5jdGlvbiB0dChuKXt2YXIgdD1uLmxlbmd0aDtyZXR1cm4gdD9uW2NyKDAsdC0xKV06Rn1mdW5jdGlvbiBvdChuLHQpe3JldHVybiBUZShNcihuKSxndCh0LDAsbi5sZW5ndGgpKX1mdW5jdGlvbiBmdChuKXtyZXR1cm4gVGUoTXIobikpfWZ1bmN0aW9uIGN0KG4sdCxyKXsocj09PUZ8fGh1KG5bdF0scikpJiYociE9PUZ8fHQgaW4gbil8fF90KG4sdCxyKTtcbn1mdW5jdGlvbiBhdChuLHQscil7dmFyIGU9blt0XTtjaS5jYWxsKG4sdCkmJmh1KGUscikmJihyIT09Rnx8dCBpbiBuKXx8X3Qobix0LHIpfWZ1bmN0aW9uIGx0KG4sdCl7Zm9yKHZhciByPW4ubGVuZ3RoO3ItLTspaWYoaHUobltyXVswXSx0KSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBzdChuLHQscixlKXtyZXR1cm4gb28obixmdW5jdGlvbihuLHUsaSl7dChlLG4scihuKSxpKX0pLGV9ZnVuY3Rpb24gaHQobix0KXtyZXR1cm4gbiYmVHIodCxMdSh0KSxuKX1mdW5jdGlvbiBwdChuLHQpe3JldHVybiBuJiZUcih0LFV1KHQpLG4pfWZ1bmN0aW9uIF90KG4sdCxyKXtcIl9fcHJvdG9fX1wiPT10JiZFaT9FaShuLHQse2NvbmZpZ3VyYWJsZTp0cnVlLGVudW1lcmFibGU6dHJ1ZSx2YWx1ZTpyLHdyaXRhYmxlOnRydWV9KTpuW3RdPXJ9ZnVuY3Rpb24gdnQobix0KXtmb3IodmFyIHI9LTEsZT10Lmxlbmd0aCx1PUh1KGUpLGk9bnVsbD09bjsrK3I8ZTspdVtyXT1pP0Y6V3Uobix0W3JdKTtyZXR1cm4gdTtcbn1mdW5jdGlvbiBndChuLHQscil7cmV0dXJuIG49PT1uJiYociE9PUYmJihuPW48PXI/bjpyKSx0IT09RiYmKG49bj49dD9uOnQpKSxufWZ1bmN0aW9uIGR0KG4sdCxyLGUsaSxvKXt2YXIgZixjPTEmdCxhPTImdCxsPTQmdDtpZihyJiYoZj1pP3IobixlLGksbyk6cihuKSksZiE9PUYpcmV0dXJuIGY7aWYoIWJ1KG4pKXJldHVybiBuO2lmKGU9YWYobikpe2lmKGY9RWUobiksIWMpcmV0dXJuIE1yKG4sZil9ZWxzZXt2YXIgcz15byhuKSxoPVwiW29iamVjdCBGdW5jdGlvbl1cIj09c3x8XCJbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXVwiPT1zO2lmKHNmKG4pKXJldHVybiBXcihuLGMpO2lmKFwiW29iamVjdCBPYmplY3RdXCI9PXN8fFwiW29iamVjdCBBcmd1bWVudHNdXCI9PXN8fGgmJiFpKXtpZihmPWF8fGg/e306T2UobiksIWMpcmV0dXJuIGE/RnIobixwdChmLG4pKTokcihuLGh0KGYsbikpfWVsc2V7aWYoIURuW3NdKXJldHVybiBpP246e307Zj1TZShuLHMsZHQsYyl9fWlmKG98fChvPW5ldyBWbiksXG5pPW8uZ2V0KG4pKXJldHVybiBpO28uc2V0KG4sZik7dmFyIGE9bD9hP3llOmRlOmE/VXU6THUscD1lP0Y6YShuKTtyZXR1cm4gdShwfHxuLGZ1bmN0aW9uKGUsdSl7cCYmKHU9ZSxlPW5bdV0pLGF0KGYsdSxkdChlLHQscix1LG4sbykpfSksZn1mdW5jdGlvbiB5dChuKXt2YXIgdD1MdShuKTtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIGJ0KHIsbix0KX19ZnVuY3Rpb24gYnQobix0LHIpe3ZhciBlPXIubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKG49bmkobik7ZS0tOyl7dmFyIHU9cltlXSxpPXRbdV0sbz1uW3VdO2lmKG89PT1GJiYhKHUgaW4gbil8fCFpKG8pKXJldHVybiBmYWxzZX1yZXR1cm4gdHJ1ZX1mdW5jdGlvbiB4dChuLHQscil7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBqbyhmdW5jdGlvbigpe24uYXBwbHkoRixyKX0sdCl9ZnVuY3Rpb24ganQobix0LHIsZSl7dmFyIHU9LTEsaT1jLG89dHJ1ZSxmPW4ubGVuZ3RoLHM9W10saD10Lmxlbmd0aDtcbmlmKCFmKXJldHVybiBzO3ImJih0PWwodCxTKHIpKSksZT8oaT1hLG89ZmFsc2UpOjIwMDw9dC5sZW5ndGgmJihpPVIsbz1mYWxzZSx0PW5ldyBxbih0KSk7bjpmb3IoOysrdTxmOyl7dmFyIHA9blt1XSxfPW51bGw9PXI/cDpyKHApLHA9ZXx8MCE9PXA/cDowO2lmKG8mJl89PT1fKXtmb3IodmFyIHY9aDt2LS07KWlmKHRbdl09PT1fKWNvbnRpbnVlIG47cy5wdXNoKHApfWVsc2UgaSh0LF8sZSl8fHMucHVzaChwKX1yZXR1cm4gc31mdW5jdGlvbiB3dChuLHQpe3ZhciByPXRydWU7cmV0dXJuIG9vKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiByPSEhdChuLGUsdSl9KSxyfWZ1bmN0aW9uIG10KG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aDsrK2U8dTspe3ZhciBpPW5bZV0sbz10KGkpO2lmKG51bGwhPW8mJihmPT09Rj9vPT09byYmIUF1KG8pOnIobyxmKSkpdmFyIGY9byxjPWl9cmV0dXJuIGN9ZnVuY3Rpb24gQXQobix0KXt2YXIgcj1bXTtyZXR1cm4gb28obixmdW5jdGlvbihuLGUsdSl7XG50KG4sZSx1KSYmci5wdXNoKG4pfSkscn1mdW5jdGlvbiBrdChuLHQscixlLHUpe3ZhciBpPS0xLG89bi5sZW5ndGg7Zm9yKHJ8fChyPUllKSx1fHwodT1bXSk7KytpPG87KXt2YXIgZj1uW2ldOzA8dCYmcihmKT8xPHQ/a3QoZix0LTEscixlLHUpOnModSxmKTplfHwodVt1Lmxlbmd0aF09Zil9cmV0dXJuIHV9ZnVuY3Rpb24gRXQobix0KXtyZXR1cm4gbiYmY28obix0LEx1KX1mdW5jdGlvbiBPdChuLHQpe3JldHVybiBuJiZhbyhuLHQsTHUpfWZ1bmN0aW9uIFN0KG4sdCl7cmV0dXJuIGYodCxmdW5jdGlvbih0KXtyZXR1cm4gZ3Uoblt0XSl9KX1mdW5jdGlvbiBJdChuLHQpe3Q9UnIodCxuKTtmb3IodmFyIHI9MCxlPXQubGVuZ3RoO251bGwhPW4mJnI8ZTspbj1uWyRlKHRbcisrXSldO3JldHVybiByJiZyPT1lP246Rn1mdW5jdGlvbiBSdChuLHQscil7cmV0dXJuIHQ9dChuKSxhZihuKT90OnModCxyKG4pKX1mdW5jdGlvbiB6dChuKXtpZihudWxsPT1uKW49bj09PUY/XCJbb2JqZWN0IFVuZGVmaW5lZF1cIjpcIltvYmplY3QgTnVsbF1cIjtlbHNlIGlmKGtpJiZraSBpbiBuaShuKSl7XG52YXIgdD1jaS5jYWxsKG4sa2kpLHI9bltraV07dHJ5e25ba2ldPUY7dmFyIGU9dHJ1ZX1jYXRjaChuKXt9dmFyIHU9c2kuY2FsbChuKTtlJiYodD9uW2tpXT1yOmRlbGV0ZSBuW2tpXSksbj11fWVsc2Ugbj1zaS5jYWxsKG4pO3JldHVybiBufWZ1bmN0aW9uIFd0KG4sdCl7cmV0dXJuIG4+dH1mdW5jdGlvbiBCdChuLHQpe3JldHVybiBudWxsIT1uJiZjaS5jYWxsKG4sdCl9ZnVuY3Rpb24gTHQobix0KXtyZXR1cm4gbnVsbCE9biYmdCBpbiBuaShuKX1mdW5jdGlvbiBVdChuLHQscil7Zm9yKHZhciBlPXI/YTpjLHU9blswXS5sZW5ndGgsaT1uLmxlbmd0aCxvPWksZj1IdShpKSxzPTEvMCxoPVtdO28tLTspe3ZhciBwPW5bb107byYmdCYmKHA9bChwLFModCkpKSxzPU1pKHAubGVuZ3RoLHMpLGZbb109IXImJih0fHwxMjA8PXUmJjEyMDw9cC5sZW5ndGgpP25ldyBxbihvJiZwKTpGfXZhciBwPW5bMF0sXz0tMSx2PWZbMF07bjpmb3IoOysrXzx1JiZoLmxlbmd0aDxzOyl7dmFyIGc9cFtfXSxkPXQ/dChnKTpnLGc9cnx8MCE9PWc/ZzowO1xuaWYodj8hUih2LGQpOiFlKGgsZCxyKSl7Zm9yKG89aTstLW87KXt2YXIgeT1mW29dO2lmKHk/IVIoeSxkKTohZShuW29dLGQscikpY29udGludWUgbn12JiZ2LnB1c2goZCksaC5wdXNoKGcpfX1yZXR1cm4gaH1mdW5jdGlvbiBDdChuLHQscil7dmFyIGU9e307cmV0dXJuIEV0KG4sZnVuY3Rpb24obix1LGkpe3QoZSxyKG4pLHUsaSl9KSxlfWZ1bmN0aW9uIER0KG4sdCxlKXtyZXR1cm4gdD1Scih0LG4pLG49Mj50Lmxlbmd0aD9uOkl0KG4sdnIodCwwLC0xKSksdD1udWxsPT1uP246blskZShHZSh0KSldLG51bGw9PXQ/RjpyKHQsbixlKX1mdW5jdGlvbiBNdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBBcmd1bWVudHNdXCI9PXp0KG4pfWZ1bmN0aW9uIFR0KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT16dChuKX1mdW5jdGlvbiAkdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBEYXRlXVwiPT16dChuKX1mdW5jdGlvbiBGdChuLHQscixlLHUpe2lmKG49PT10KXQ9dHJ1ZTtlbHNlIGlmKG51bGw9PW58fG51bGw9PXR8fCF4dShuKSYmIXh1KHQpKXQ9biE9PW4mJnQhPT10O2Vsc2Ugbjp7XG52YXIgaT1hZihuKSxvPWFmKHQpLGY9aT9cIltvYmplY3QgQXJyYXldXCI6eW8obiksYz1vP1wiW29iamVjdCBBcnJheV1cIjp5byh0KSxmPVwiW29iamVjdCBBcmd1bWVudHNdXCI9PWY/XCJbb2JqZWN0IE9iamVjdF1cIjpmLGM9XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09Yz9cIltvYmplY3QgT2JqZWN0XVwiOmMsYT1cIltvYmplY3QgT2JqZWN0XVwiPT1mLG89XCJbb2JqZWN0IE9iamVjdF1cIj09YztpZigoYz1mPT1jKSYmc2Yobikpe2lmKCFzZih0KSl7dD1mYWxzZTticmVhayBufWk9dHJ1ZSxhPWZhbHNlfWlmKGMmJiFhKXV8fCh1PW5ldyBWbiksdD1pfHxnZihuKT9fZShuLHQscixlLEZ0LHUpOnZlKG4sdCxmLHIsZSxGdCx1KTtlbHNle2lmKCEoMSZyKSYmKGk9YSYmY2kuY2FsbChuLFwiX193cmFwcGVkX19cIiksZj1vJiZjaS5jYWxsKHQsXCJfX3dyYXBwZWRfX1wiKSxpfHxmKSl7bj1pP24udmFsdWUoKTpuLHQ9Zj90LnZhbHVlKCk6dCx1fHwodT1uZXcgVm4pLHQ9RnQobix0LHIsZSx1KTticmVhayBufWlmKGMpdDppZih1fHwodT1uZXcgVm4pLFxuaT0xJnIsZj1kZShuKSxvPWYubGVuZ3RoLGM9ZGUodCkubGVuZ3RoLG89PWN8fGkpe2ZvcihhPW87YS0tOyl7dmFyIGw9ZlthXTtpZighKGk/bCBpbiB0OmNpLmNhbGwodCxsKSkpe3Q9ZmFsc2U7YnJlYWsgdH19aWYoKGM9dS5nZXQobikpJiZ1LmdldCh0KSl0PWM9PXQ7ZWxzZXtjPXRydWUsdS5zZXQobix0KSx1LnNldCh0LG4pO2Zvcih2YXIgcz1pOysrYTxvOyl7dmFyIGw9ZlthXSxoPW5bbF0scD10W2xdO2lmKGUpdmFyIF89aT9lKHAsaCxsLHQsbix1KTplKGgscCxsLG4sdCx1KTtpZihfPT09Rj9oIT09cCYmIUZ0KGgscCxyLGUsdSk6IV8pe2M9ZmFsc2U7YnJlYWt9c3x8KHM9XCJjb25zdHJ1Y3RvclwiPT1sKX1jJiYhcyYmKHI9bi5jb25zdHJ1Y3RvcixlPXQuY29uc3RydWN0b3IsciE9ZSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gdCYmISh0eXBlb2Ygcj09XCJmdW5jdGlvblwiJiZyIGluc3RhbmNlb2YgciYmdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmZSBpbnN0YW5jZW9mIGUpJiYoYz1mYWxzZSkpLFxudS5kZWxldGUobiksdS5kZWxldGUodCksdD1jfX1lbHNlIHQ9ZmFsc2U7ZWxzZSB0PWZhbHNlfX1yZXR1cm4gdH1mdW5jdGlvbiBOdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBNYXBdXCI9PXlvKG4pfWZ1bmN0aW9uIFB0KG4sdCxyLGUpe3ZhciB1PXIubGVuZ3RoLGk9dSxvPSFlO2lmKG51bGw9PW4pcmV0dXJuIWk7Zm9yKG49bmkobik7dS0tOyl7dmFyIGY9clt1XTtpZihvJiZmWzJdP2ZbMV0hPT1uW2ZbMF1dOiEoZlswXWluIG4pKXJldHVybiBmYWxzZX1mb3IoOysrdTxpOyl7dmFyIGY9clt1XSxjPWZbMF0sYT1uW2NdLGw9ZlsxXTtpZihvJiZmWzJdKXtpZihhPT09RiYmIShjIGluIG4pKXJldHVybiBmYWxzZX1lbHNle2lmKGY9bmV3IFZuLGUpdmFyIHM9ZShhLGwsYyxuLHQsZik7aWYocz09PUY/IUZ0KGwsYSwzLGUsZik6IXMpcmV0dXJuIGZhbHNlfX1yZXR1cm4gdHJ1ZX1mdW5jdGlvbiBadChuKXtyZXR1cm4hKCFidShuKXx8bGkmJmxpIGluIG4pJiYoZ3Uobik/X2k6eG4pLnRlc3QoRmUobikpfWZ1bmN0aW9uIHF0KG4pe1xucmV0dXJuIHh1KG4pJiZcIltvYmplY3QgUmVnRXhwXVwiPT16dChuKX1mdW5jdGlvbiBWdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBTZXRdXCI9PXlvKG4pfWZ1bmN0aW9uIEt0KG4pe3JldHVybiB4dShuKSYmeXUobi5sZW5ndGgpJiYhIUNuW3p0KG4pXX1mdW5jdGlvbiBHdChuKXtyZXR1cm4gdHlwZW9mIG49PVwiZnVuY3Rpb25cIj9uOm51bGw9PW4/TnU6dHlwZW9mIG49PVwib2JqZWN0XCI/YWYobik/WHQoblswXSxuWzFdKTpRdChuKTpWdShuKX1mdW5jdGlvbiBIdChuKXtpZighTGUobikpcmV0dXJuIENpKG4pO3ZhciB0LHI9W107Zm9yKHQgaW4gbmkobikpY2kuY2FsbChuLHQpJiZcImNvbnN0cnVjdG9yXCIhPXQmJnIucHVzaCh0KTtyZXR1cm4gcn1mdW5jdGlvbiBKdChuLHQpe3JldHVybiBuPHR9ZnVuY3Rpb24gWXQobix0KXt2YXIgcj0tMSxlPXB1KG4pP0h1KG4ubGVuZ3RoKTpbXTtyZXR1cm4gb28obixmdW5jdGlvbihuLHUsaSl7ZVsrK3JdPXQobix1LGkpfSksZX1mdW5jdGlvbiBRdChuKXtcbnZhciB0PW1lKG4pO3JldHVybiAxPT10Lmxlbmd0aCYmdFswXVsyXT9VZSh0WzBdWzBdLHRbMF1bMV0pOmZ1bmN0aW9uKHIpe3JldHVybiByPT09bnx8UHQocixuLHQpfX1mdW5jdGlvbiBYdChuLHQpe3JldHVybiBXZShuKSYmdD09PXQmJiFidSh0KT9VZSgkZShuKSx0KTpmdW5jdGlvbihyKXt2YXIgZT1XdShyLG4pO3JldHVybiBlPT09RiYmZT09PXQ/QnUocixuKTpGdCh0LGUsMyl9fWZ1bmN0aW9uIG5yKG4sdCxyLGUsdSl7biE9PXQmJmNvKHQsZnVuY3Rpb24oaSxvKXtpZihidShpKSl7dXx8KHU9bmV3IFZuKTt2YXIgZj11LGM9bltvXSxhPXRbb10sbD1mLmdldChhKTtpZihsKWN0KG4sbyxsKTtlbHNle3ZhciBsPWU/ZShjLGEsbytcIlwiLG4sdCxmKTpGLHM9bD09PUY7aWYocyl7dmFyIGg9YWYoYSkscD0haCYmc2YoYSksXz0haCYmIXAmJmdmKGEpLGw9YTtofHxwfHxfP2FmKGMpP2w9YzpfdShjKT9sPU1yKGMpOnA/KHM9ZmFsc2UsbD1XcihhLHRydWUpKTpfPyhzPWZhbHNlLGw9THIoYSx0cnVlKSk6bD1bXTp3dShhKXx8Y2YoYSk/KGw9YyxcbmNmKGMpP2w9UnUoYyk6KCFidShjKXx8ciYmZ3UoYykpJiYobD1PZShhKSkpOnM9ZmFsc2V9cyYmKGYuc2V0KGEsbCksbnIobCxhLHIsZSxmKSxmLmRlbGV0ZShhKSksY3QobixvLGwpfX1lbHNlIGY9ZT9lKG5bb10saSxvK1wiXCIsbix0LHUpOkYsZj09PUYmJihmPWkpLGN0KG4sbyxmKX0sVXUpfWZ1bmN0aW9uIHRyKG4sdCl7dmFyIHI9bi5sZW5ndGg7aWYocilyZXR1cm4gdCs9MD50P3I6MCxSZSh0LHIpP25bdF06Rn1mdW5jdGlvbiBycihuLHQscil7dmFyIGU9LTE7cmV0dXJuIHQ9bCh0Lmxlbmd0aD90OltOdV0sUyhqZSgpKSksbj1ZdChuLGZ1bmN0aW9uKG4pe3JldHVybnthOmwodCxmdW5jdGlvbih0KXtyZXR1cm4gdChuKX0pLGI6KytlLGM6bn19KSxBKG4sZnVuY3Rpb24obix0KXt2YXIgZTtuOntlPS0xO2Zvcih2YXIgdT1uLmEsaT10LmEsbz11Lmxlbmd0aCxmPXIubGVuZ3RoOysrZTxvOyl7dmFyIGM9VXIodVtlXSxpW2VdKTtpZihjKXtlPWU+PWY/YzpjKihcImRlc2NcIj09cltlXT8tMToxKTtcbmJyZWFrIG59fWU9bi5iLXQuYn1yZXR1cm4gZX0pfWZ1bmN0aW9uIGVyKG4sdCl7cmV0dXJuIHVyKG4sdCxmdW5jdGlvbih0LHIpe3JldHVybiBCdShuLHIpfSl9ZnVuY3Rpb24gdXIobix0LHIpe2Zvcih2YXIgZT0tMSx1PXQubGVuZ3RoLGk9e307KytlPHU7KXt2YXIgbz10W2VdLGY9SXQobixvKTtyKGYsbykmJnByKGksUnIobyxuKSxmKX1yZXR1cm4gaX1mdW5jdGlvbiBpcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIEl0KHQsbil9fWZ1bmN0aW9uIG9yKG4sdCxyLGUpe3ZhciB1PWU/eTpkLGk9LTEsbz10Lmxlbmd0aCxmPW47Zm9yKG49PT10JiYodD1Ncih0KSksciYmKGY9bChuLFMocikpKTsrK2k8bzspZm9yKHZhciBjPTAsYT10W2ldLGE9cj9yKGEpOmE7LTE8KGM9dShmLGEsYyxlKSk7KWYhPT1uJiZ3aS5jYWxsKGYsYywxKSx3aS5jYWxsKG4sYywxKTtyZXR1cm4gbn1mdW5jdGlvbiBmcihuLHQpe2Zvcih2YXIgcj1uP3QubGVuZ3RoOjAsZT1yLTE7ci0tOyl7dmFyIHU9dFtyXTtcbmlmKHI9PWV8fHUhPT1pKXt2YXIgaT11O1JlKHUpP3dpLmNhbGwobix1LDEpOm1yKG4sdSl9fX1mdW5jdGlvbiBjcihuLHQpe3JldHVybiBuK3ppKEZpKCkqKHQtbisxKSl9ZnVuY3Rpb24gYXIobix0KXt2YXIgcj1cIlwiO2lmKCFufHwxPnR8fDkwMDcxOTkyNTQ3NDA5OTE8dClyZXR1cm4gcjtkbyB0JTImJihyKz1uKSwodD16aSh0LzIpKSYmKG4rPW4pO3doaWxlKHQpO3JldHVybiByfWZ1bmN0aW9uIGxyKG4sdCl7cmV0dXJuIHdvKENlKG4sdCxOdSksbitcIlwiKX1mdW5jdGlvbiBzcihuKXtyZXR1cm4gdHQoRHUobikpfWZ1bmN0aW9uIGhyKG4sdCl7dmFyIHI9RHUobik7cmV0dXJuIFRlKHIsZ3QodCwwLHIubGVuZ3RoKSl9ZnVuY3Rpb24gcHIobix0LHIsZSl7aWYoIWJ1KG4pKXJldHVybiBuO3Q9UnIodCxuKTtmb3IodmFyIHU9LTEsaT10Lmxlbmd0aCxvPWktMSxmPW47bnVsbCE9ZiYmKyt1PGk7KXt2YXIgYz0kZSh0W3VdKSxhPXI7aWYodSE9byl7dmFyIGw9ZltjXSxhPWU/ZShsLGMsZik6RjtcbmE9PT1GJiYoYT1idShsKT9sOlJlKHRbdSsxXSk/W106e30pfWF0KGYsYyxhKSxmPWZbY119cmV0dXJuIG59ZnVuY3Rpb24gX3Iobil7cmV0dXJuIFRlKER1KG4pKX1mdW5jdGlvbiB2cihuLHQscil7dmFyIGU9LTEsdT1uLmxlbmd0aDtmb3IoMD50JiYodD0tdD51PzA6dSt0KSxyPXI+dT91OnIsMD5yJiYocis9dSksdT10PnI/MDpyLXQ+Pj4wLHQ+Pj49MCxyPUh1KHUpOysrZTx1OylyW2VdPW5bZSt0XTtyZXR1cm4gcn1mdW5jdGlvbiBncihuLHQpe3ZhciByO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj10KG4sZSx1KSwhcn0pLCEhcn1mdW5jdGlvbiBkcihuLHQscil7dmFyIGU9MCx1PW51bGw9PW4/ZTpuLmxlbmd0aDtpZih0eXBlb2YgdD09XCJudW1iZXJcIiYmdD09PXQmJjIxNDc0ODM2NDc+PXUpe2Zvcig7ZTx1Oyl7dmFyIGk9ZSt1Pj4+MSxvPW5baV07bnVsbCE9PW8mJiFBdShvKSYmKHI/bzw9dDpvPHQpP2U9aSsxOnU9aX1yZXR1cm4gdX1yZXR1cm4geXIobix0LE51LHIpO1xufWZ1bmN0aW9uIHlyKG4sdCxyLGUpe3Q9cih0KTtmb3IodmFyIHU9MCxpPW51bGw9PW4/MDpuLmxlbmd0aCxvPXQhPT10LGY9bnVsbD09PXQsYz1BdSh0KSxhPXQ9PT1GO3U8aTspe3ZhciBsPXppKCh1K2kpLzIpLHM9cihuW2xdKSxoPXMhPT1GLHA9bnVsbD09PXMsXz1zPT09cyx2PUF1KHMpOyhvP2V8fF86YT9fJiYoZXx8aCk6Zj9fJiZoJiYoZXx8IXApOmM/XyYmaCYmIXAmJihlfHwhdik6cHx8dj8wOmU/czw9dDpzPHQpP3U9bCsxOmk9bH1yZXR1cm4gTWkoaSw0Mjk0OTY3Mjk0KX1mdW5jdGlvbiBicihuLHQpe2Zvcih2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXSxmPXQ/dChvKTpvO2lmKCFyfHwhaHUoZixjKSl7dmFyIGM9ZjtpW3UrK109MD09PW8/MDpvfX1yZXR1cm4gaX1mdW5jdGlvbiB4cihuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCI/bjpBdShuKT9QOitufWZ1bmN0aW9uIGpyKG4pe2lmKHR5cGVvZiBuPT1cInN0cmluZ1wiKXJldHVybiBuO1xuaWYoYWYobikpcmV0dXJuIGwobixqcikrXCJcIjtpZihBdShuKSlyZXR1cm4gdW8/dW8uY2FsbChuKTpcIlwiO3ZhciB0PW4rXCJcIjtyZXR1cm5cIjBcIj09dCYmMS9uPT0tTj9cIi0wXCI6dH1mdW5jdGlvbiB3cihuLHQscil7dmFyIGU9LTEsdT1jLGk9bi5sZW5ndGgsbz10cnVlLGY9W10sbD1mO2lmKHIpbz1mYWxzZSx1PWE7ZWxzZSBpZigyMDA8PWkpe2lmKHU9dD9udWxsOnBvKG4pKXJldHVybiBEKHUpO289ZmFsc2UsdT1SLGw9bmV3IHFufWVsc2UgbD10P1tdOmY7bjpmb3IoOysrZTxpOyl7dmFyIHM9bltlXSxoPXQ/dChzKTpzLHM9cnx8MCE9PXM/czowO2lmKG8mJmg9PT1oKXtmb3IodmFyIHA9bC5sZW5ndGg7cC0tOylpZihsW3BdPT09aCljb250aW51ZSBuO3QmJmwucHVzaChoKSxmLnB1c2gocyl9ZWxzZSB1KGwsaCxyKXx8KGwhPT1mJiZsLnB1c2goaCksZi5wdXNoKHMpKX1yZXR1cm4gZn1mdW5jdGlvbiBtcihuLHQpe3JldHVybiB0PVJyKHQsbiksbj0yPnQubGVuZ3RoP246SXQobix2cih0LDAsLTEpKSxcbm51bGw9PW58fGRlbGV0ZSBuWyRlKEdlKHQpKV19ZnVuY3Rpb24gQXIobix0LHIsZSl7Zm9yKHZhciB1PW4ubGVuZ3RoLGk9ZT91Oi0xOyhlP2ktLTorK2k8dSkmJnQobltpXSxpLG4pOyk7cmV0dXJuIHI/dnIobixlPzA6aSxlP2krMTp1KTp2cihuLGU/aSsxOjAsZT91OmkpfWZ1bmN0aW9uIGtyKG4sdCl7dmFyIHI9bjtyZXR1cm4gciBpbnN0YW5jZW9mIE1uJiYocj1yLnZhbHVlKCkpLGgodCxmdW5jdGlvbihuLHQpe3JldHVybiB0LmZ1bmMuYXBwbHkodC50aGlzQXJnLHMoW25dLHQuYXJncykpfSxyKX1mdW5jdGlvbiBFcihuLHQscil7dmFyIGU9bi5sZW5ndGg7aWYoMj5lKXJldHVybiBlP3dyKG5bMF0pOltdO2Zvcih2YXIgdT0tMSxpPUh1KGUpOysrdTxlOylmb3IodmFyIG89blt1XSxmPS0xOysrZjxlOylmIT11JiYoaVt1XT1qdChpW3VdfHxvLG5bZl0sdCxyKSk7cmV0dXJuIHdyKGt0KGksMSksdCxyKX1mdW5jdGlvbiBPcihuLHQscil7Zm9yKHZhciBlPS0xLHU9bi5sZW5ndGgsaT10Lmxlbmd0aCxvPXt9OysrZTx1OylyKG8sbltlXSxlPGk/dFtlXTpGKTtcbnJldHVybiBvfWZ1bmN0aW9uIFNyKG4pe3JldHVybiBfdShuKT9uOltdfWZ1bmN0aW9uIElyKG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP246TnV9ZnVuY3Rpb24gUnIobix0KXtyZXR1cm4gYWYobik/bjpXZShuLHQpP1tuXTptbyh6dShuKSl9ZnVuY3Rpb24genIobix0LHIpe3ZhciBlPW4ubGVuZ3RoO3JldHVybiByPXI9PT1GP2U6ciwhdCYmcj49ZT9uOnZyKG4sdCxyKX1mdW5jdGlvbiBXcihuLHQpe2lmKHQpcmV0dXJuIG4uc2xpY2UoKTt2YXIgcj1uLmxlbmd0aCxyPXlpP3lpKHIpOm5ldyBuLmNvbnN0cnVjdG9yKHIpO3JldHVybiBuLmNvcHkocikscn1mdW5jdGlvbiBCcihuKXt2YXIgdD1uZXcgbi5jb25zdHJ1Y3RvcihuLmJ5dGVMZW5ndGgpO3JldHVybiBuZXcgZGkodCkuc2V0KG5ldyBkaShuKSksdH1mdW5jdGlvbiBMcihuLHQpe3JldHVybiBuZXcgbi5jb25zdHJ1Y3Rvcih0P0JyKG4uYnVmZmVyKTpuLmJ1ZmZlcixuLmJ5dGVPZmZzZXQsbi5sZW5ndGgpfWZ1bmN0aW9uIFVyKG4sdCl7XG5pZihuIT09dCl7dmFyIHI9biE9PUYsZT1udWxsPT09bix1PW49PT1uLGk9QXUobiksbz10IT09RixmPW51bGw9PT10LGM9dD09PXQsYT1BdSh0KTtpZighZiYmIWEmJiFpJiZuPnR8fGkmJm8mJmMmJiFmJiYhYXx8ZSYmbyYmY3x8IXImJmN8fCF1KXJldHVybiAxO2lmKCFlJiYhaSYmIWEmJm48dHx8YSYmciYmdSYmIWUmJiFpfHxmJiZyJiZ1fHwhbyYmdXx8IWMpcmV0dXJuLTF9cmV0dXJuIDB9ZnVuY3Rpb24gQ3Iobix0LHIsZSl7dmFyIHU9LTEsaT1uLmxlbmd0aCxvPXIubGVuZ3RoLGY9LTEsYz10Lmxlbmd0aCxhPURpKGktbywwKSxsPUh1KGMrYSk7Zm9yKGU9IWU7KytmPGM7KWxbZl09dFtmXTtmb3IoOysrdTxvOykoZXx8dTxpKSYmKGxbclt1XV09blt1XSk7Zm9yKDthLS07KWxbZisrXT1uW3UrK107cmV0dXJuIGx9ZnVuY3Rpb24gRHIobix0LHIsZSl7dmFyIHU9LTEsaT1uLmxlbmd0aCxvPS0xLGY9ci5sZW5ndGgsYz0tMSxhPXQubGVuZ3RoLGw9RGkoaS1mLDApLHM9SHUobCthKTtcbmZvcihlPSFlOysrdTxsOylzW3VdPW5bdV07Zm9yKGw9dTsrK2M8YTspc1tsK2NdPXRbY107Zm9yKDsrK288ZjspKGV8fHU8aSkmJihzW2wrcltvXV09blt1KytdKTtyZXR1cm4gc31mdW5jdGlvbiBNcihuLHQpe3ZhciByPS0xLGU9bi5sZW5ndGg7Zm9yKHR8fCh0PUh1KGUpKTsrK3I8ZTspdFtyXT1uW3JdO3JldHVybiB0fWZ1bmN0aW9uIFRyKG4sdCxyLGUpe3ZhciB1PSFyO3J8fChyPXt9KTtmb3IodmFyIGk9LTEsbz10Lmxlbmd0aDsrK2k8bzspe3ZhciBmPXRbaV0sYz1lP2UocltmXSxuW2ZdLGYscixuKTpGO2M9PT1GJiYoYz1uW2ZdKSx1P190KHIsZixjKTphdChyLGYsYyl9cmV0dXJuIHJ9ZnVuY3Rpb24gJHIobix0KXtyZXR1cm4gVHIobix2byhuKSx0KX1mdW5jdGlvbiBGcihuLHQpe3JldHVybiBUcihuLGdvKG4pLHQpfWZ1bmN0aW9uIE5yKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsdSl7dmFyIGk9YWYocik/ZTpzdCxvPXQ/dCgpOnt9O3JldHVybiBpKHIsbixqZSh1LDIpLG8pO1xufX1mdW5jdGlvbiBQcihuKXtyZXR1cm4gbHIoZnVuY3Rpb24odCxyKXt2YXIgZT0tMSx1PXIubGVuZ3RoLGk9MTx1P3JbdS0xXTpGLG89Mjx1P3JbMl06RixpPTM8bi5sZW5ndGgmJnR5cGVvZiBpPT1cImZ1bmN0aW9uXCI/KHUtLSxpKTpGO2ZvcihvJiZ6ZShyWzBdLHJbMV0sbykmJihpPTM+dT9GOmksdT0xKSx0PW5pKHQpOysrZTx1Oykobz1yW2VdKSYmbih0LG8sZSxpKTtyZXR1cm4gdH0pfWZ1bmN0aW9uIFpyKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7aWYobnVsbD09cilyZXR1cm4gcjtpZighcHUocikpcmV0dXJuIG4ocixlKTtmb3IodmFyIHU9ci5sZW5ndGgsaT10P3U6LTEsbz1uaShyKTsodD9pLS06KytpPHUpJiZmYWxzZSE9PWUob1tpXSxpLG8pOyk7cmV0dXJuIHJ9fWZ1bmN0aW9uIHFyKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9LTEsaT1uaSh0KTtlPWUodCk7Zm9yKHZhciBvPWUubGVuZ3RoO28tLTspe3ZhciBmPWVbbj9vOisrdV07aWYoZmFsc2U9PT1yKGlbZl0sZixpKSlicmVhaztcbn1yZXR1cm4gdH19ZnVuY3Rpb24gVnIobix0LHIpe2Z1bmN0aW9uIGUoKXtyZXR1cm4odGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgZT9pOm4pLmFwcGx5KHU/cjp0aGlzLGFyZ3VtZW50cyl9dmFyIHU9MSZ0LGk9SHIobik7cmV0dXJuIGV9ZnVuY3Rpb24gS3Iobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3Q9enUodCk7dmFyIHI9Qm4udGVzdCh0KT8kKHQpOkYsZT1yP3JbMF06dC5jaGFyQXQoMCk7cmV0dXJuIHQ9cj96cihyLDEpLmpvaW4oXCJcIik6dC5zbGljZSgxKSxlW25dKCkrdH19ZnVuY3Rpb24gR3Iobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBoKCR1KFR1KHQpLnJlcGxhY2UoSW4sXCJcIikpLG4sXCJcIil9fWZ1bmN0aW9uIEhyKG4pe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cztzd2l0Y2godC5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gbmV3IG47Y2FzZSAxOnJldHVybiBuZXcgbih0WzBdKTtjYXNlIDI6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSk7Y2FzZSAzOlxucmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdKTtjYXNlIDQ6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10pO2Nhc2UgNTpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSx0WzRdKTtjYXNlIDY6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdKTtjYXNlIDc6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdLHRbNl0pfXZhciByPWlvKG4ucHJvdG90eXBlKSx0PW4uYXBwbHkocix0KTtyZXR1cm4gYnUodCk/dDpyfX1mdW5jdGlvbiBKcihuLHQsZSl7ZnVuY3Rpb24gdSgpe2Zvcih2YXIgbz1hcmd1bWVudHMubGVuZ3RoLGY9SHUobyksYz1vLGE9eGUodSk7Yy0tOylmW2NdPWFyZ3VtZW50c1tjXTtyZXR1cm4gYz0zPm8mJmZbMF0hPT1hJiZmW28tMV0hPT1hP1tdOkMoZixhKSxvLT1jLmxlbmd0aCxvPGU/ZmUobix0LFhyLHUucGxhY2Vob2xkZXIsRixmLGMsRixGLGUtbyk6cih0aGlzJiZ0aGlzIT09Wm4mJnRoaXMgaW5zdGFuY2VvZiB1P2k6bix0aGlzLGYpO1xufXZhciBpPUhyKG4pO3JldHVybiB1fWZ1bmN0aW9uIFlyKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9bmkodCk7aWYoIXB1KHQpKXt2YXIgaT1qZShyLDMpO3Q9THUodCkscj1mdW5jdGlvbihuKXtyZXR1cm4gaSh1W25dLG4sdSl9fXJldHVybiByPW4odCxyLGUpLC0xPHI/dVtpP3Rbcl06cl06Rn19ZnVuY3Rpb24gUXIobil7cmV0dXJuIGdlKGZ1bmN0aW9uKHQpe3ZhciByPXQubGVuZ3RoLGU9cix1PXpuLnByb3RvdHlwZS50aHJ1O2ZvcihuJiZ0LnJldmVyc2UoKTtlLS07KXt2YXIgaT10W2VdO2lmKHR5cGVvZiBpIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtpZih1JiYhbyYmXCJ3cmFwcGVyXCI9PWJlKGkpKXZhciBvPW5ldyB6bihbXSx0cnVlKX1mb3IoZT1vP2U6cjsrK2U8cjspdmFyIGk9dFtlXSx1PWJlKGkpLGY9XCJ3cmFwcGVyXCI9PXU/X28oaSk6RixvPWYmJkJlKGZbMF0pJiY0MjQ9PWZbMV0mJiFmWzRdLmxlbmd0aCYmMT09Zls5XT9vW2JlKGZbMF0pXS5hcHBseShvLGZbM10pOjE9PWkubGVuZ3RoJiZCZShpKT9vW3VdKCk6by50aHJ1KGkpO1xucmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLGU9blswXTtpZihvJiYxPT1uLmxlbmd0aCYmYWYoZSkpcmV0dXJuIG8ucGxhbnQoZSkudmFsdWUoKTtmb3IodmFyIHU9MCxuPXI/dFt1XS5hcHBseSh0aGlzLG4pOmU7Kyt1PHI7KW49dFt1XS5jYWxsKHRoaXMsbik7cmV0dXJuIG59fSl9ZnVuY3Rpb24gWHIobix0LHIsZSx1LGksbyxmLGMsYSl7ZnVuY3Rpb24gbCgpe2Zvcih2YXIgZD1hcmd1bWVudHMubGVuZ3RoLHk9SHUoZCksYj1kO2ItLTspeVtiXT1hcmd1bWVudHNbYl07aWYoXyl7dmFyIHgsaj14ZShsKSxiPXkubGVuZ3RoO2Zvcih4PTA7Yi0tOyl5W2JdPT09aiYmKyt4fWlmKGUmJih5PUNyKHksZSx1LF8pKSxpJiYoeT1Ecih5LGksbyxfKSksZC09eCxfJiZkPGEpcmV0dXJuIGo9Qyh5LGopLGZlKG4sdCxYcixsLnBsYWNlaG9sZGVyLHIseSxqLGYsYyxhLWQpO2lmKGo9aD9yOnRoaXMsYj1wP2pbbl06bixkPXkubGVuZ3RoLGYpe3g9eS5sZW5ndGg7Zm9yKHZhciB3PU1pKGYubGVuZ3RoLHgpLG09TXIoeSk7dy0tOyl7XG52YXIgQT1mW3ddO3lbd109UmUoQSx4KT9tW0FdOkZ9fWVsc2UgdiYmMTxkJiZ5LnJldmVyc2UoKTtyZXR1cm4gcyYmYzxkJiYoeS5sZW5ndGg9YyksdGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgbCYmKGI9Z3x8SHIoYikpLGIuYXBwbHkoaix5KX12YXIgcz0xMjgmdCxoPTEmdCxwPTImdCxfPTI0JnQsdj01MTImdCxnPXA/RjpIcihuKTtyZXR1cm4gbH1mdW5jdGlvbiBuZShuLHQpe3JldHVybiBmdW5jdGlvbihyLGUpe3JldHVybiBDdChyLG4sdChlKSl9fWZ1bmN0aW9uIHRlKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7dmFyIHU7aWYocj09PUYmJmU9PT1GKXJldHVybiB0O2lmKHIhPT1GJiYodT1yKSxlIT09Ril7aWYodT09PUYpcmV0dXJuIGU7dHlwZW9mIHI9PVwic3RyaW5nXCJ8fHR5cGVvZiBlPT1cInN0cmluZ1wiPyhyPWpyKHIpLGU9anIoZSkpOihyPXhyKHIpLGU9eHIoZSkpLHU9bihyLGUpfXJldHVybiB1fX1mdW5jdGlvbiByZShuKXtyZXR1cm4gZ2UoZnVuY3Rpb24odCl7XG5yZXR1cm4gdD1sKHQsUyhqZSgpKSksbHIoZnVuY3Rpb24oZSl7dmFyIHU9dGhpcztyZXR1cm4gbih0LGZ1bmN0aW9uKG4pe3JldHVybiByKG4sdSxlKX0pfSl9KX1mdW5jdGlvbiBlZShuLHQpe3Q9dD09PUY/XCIgXCI6anIodCk7dmFyIHI9dC5sZW5ndGg7cmV0dXJuIDI+cj9yP2FyKHQsbik6dDoocj1hcih0LFJpKG4vVCh0KSkpLEJuLnRlc3QodCk/enIoJChyKSwwLG4pLmpvaW4oXCJcIik6ci5zbGljZSgwLG4pKX1mdW5jdGlvbiB1ZShuLHQsZSx1KXtmdW5jdGlvbiBpKCl7Zm9yKHZhciB0PS0xLGM9YXJndW1lbnRzLmxlbmd0aCxhPS0xLGw9dS5sZW5ndGgscz1IdShsK2MpLGg9dGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgaT9mOm47KythPGw7KXNbYV09dVthXTtmb3IoO2MtLTspc1thKytdPWFyZ3VtZW50c1srK3RdO3JldHVybiByKGgsbz9lOnRoaXMscyl9dmFyIG89MSZ0LGY9SHIobik7cmV0dXJuIGl9ZnVuY3Rpb24gaWUobil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXtcbmUmJnR5cGVvZiBlIT1cIm51bWJlclwiJiZ6ZSh0LHIsZSkmJihyPWU9RiksdD1FdSh0KSxyPT09Rj8ocj10LHQ9MCk6cj1FdShyKSxlPWU9PT1GP3Q8cj8xOi0xOkV1KGUpO3ZhciB1PS0xO3I9RGkoUmkoKHItdCkvKGV8fDEpKSwwKTtmb3IodmFyIGk9SHUocik7ci0tOylpW24/cjorK3VdPXQsdCs9ZTtyZXR1cm4gaX19ZnVuY3Rpb24gb2Uobil7cmV0dXJuIGZ1bmN0aW9uKHQscil7cmV0dXJuIHR5cGVvZiB0PT1cInN0cmluZ1wiJiZ0eXBlb2Ygcj09XCJzdHJpbmdcInx8KHQ9SXUodCkscj1JdShyKSksbih0LHIpfX1mdW5jdGlvbiBmZShuLHQscixlLHUsaSxvLGYsYyxhKXt2YXIgbD04JnQscz1sP286RjtvPWw/RjpvO3ZhciBoPWw/aTpGO3JldHVybiBpPWw/RjppLHQ9KHR8KGw/MzI6NjQpKSZ+KGw/NjQ6MzIpLDQmdHx8KHQmPS00KSx1PVtuLHQsdSxoLHMsaSxvLGYsYyxhXSxyPXIuYXBwbHkoRix1KSxCZShuKSYmeG8ocix1KSxyLnBsYWNlaG9sZGVyPWUsRGUocixuLHQpfWZ1bmN0aW9uIGNlKG4pe1xudmFyIHQ9WHVbbl07cmV0dXJuIGZ1bmN0aW9uKG4scil7aWYobj1JdShuKSxyPW51bGw9PXI/MDpNaShPdShyKSwyOTIpKXt2YXIgZT0oenUobikrXCJlXCIpLnNwbGl0KFwiZVwiKSxlPXQoZVswXStcImVcIisoK2VbMV0rcikpLGU9KHp1KGUpK1wiZVwiKS5zcGxpdChcImVcIik7cmV0dXJuKyhlWzBdK1wiZVwiKygrZVsxXS1yKSl9cmV0dXJuIHQobil9fWZ1bmN0aW9uIGFlKG4pe3JldHVybiBmdW5jdGlvbih0KXt2YXIgcj15byh0KTtyZXR1cm5cIltvYmplY3QgTWFwXVwiPT1yP0wodCk6XCJbb2JqZWN0IFNldF1cIj09cj9NKHQpOk8odCxuKHQpKX19ZnVuY3Rpb24gbGUobix0LHIsZSx1LGksbyxmKXt2YXIgYz0yJnQ7aWYoIWMmJnR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTt2YXIgYT1lP2UubGVuZ3RoOjA7aWYoYXx8KHQmPS05NyxlPXU9Riksbz1vPT09Rj9vOkRpKE91KG8pLDApLGY9Zj09PUY/ZjpPdShmKSxhLT11P3UubGVuZ3RoOjAsNjQmdCl7XG52YXIgbD1lLHM9dTtlPXU9Rn12YXIgaD1jP0Y6X28obik7cmV0dXJuIGk9W24sdCxyLGUsdSxsLHMsaSxvLGZdLGgmJihyPWlbMV0sbj1oWzFdLHQ9cnxuLGU9MTI4PT1uJiY4PT1yfHwxMjg9PW4mJjI1Nj09ciYmaVs3XS5sZW5ndGg8PWhbOF18fDM4ND09biYmaFs3XS5sZW5ndGg8PWhbOF0mJjg9PXIsMTMxPnR8fGUpJiYoMSZuJiYoaVsyXT1oWzJdLHR8PTEmcj8wOjQpLChyPWhbM10pJiYoZT1pWzNdLGlbM109ZT9DcihlLHIsaFs0XSk6cixpWzRdPWU/QyhpWzNdLFwiX19sb2Rhc2hfcGxhY2Vob2xkZXJfX1wiKTpoWzRdKSwocj1oWzVdKSYmKGU9aVs1XSxpWzVdPWU/RHIoZSxyLGhbNl0pOnIsaVs2XT1lP0MoaVs1XSxcIl9fbG9kYXNoX3BsYWNlaG9sZGVyX19cIik6aFs2XSksKHI9aFs3XSkmJihpWzddPXIpLDEyOCZuJiYoaVs4XT1udWxsPT1pWzhdP2hbOF06TWkoaVs4XSxoWzhdKSksbnVsbD09aVs5XSYmKGlbOV09aFs5XSksaVswXT1oWzBdLGlbMV09dCksbj1pWzBdLHQ9aVsxXSxcbnI9aVsyXSxlPWlbM10sdT1pWzRdLGY9aVs5XT1pWzldPT09Rj9jPzA6bi5sZW5ndGg6RGkoaVs5XS1hLDApLCFmJiYyNCZ0JiYodCY9LTI1KSxEZSgoaD9sbzp4bykodCYmMSE9dD84PT10fHwxNj09dD9KcihuLHQsZik6MzIhPXQmJjMzIT10fHx1Lmxlbmd0aD9Yci5hcHBseShGLGkpOnVlKG4sdCxyLGUpOlZyKG4sdCxyKSxpKSxuLHQpfWZ1bmN0aW9uIHNlKG4sdCxyLGUpe3JldHVybiBuPT09Rnx8aHUobixpaVtyXSkmJiFjaS5jYWxsKGUscik/dDpufWZ1bmN0aW9uIGhlKG4sdCxyLGUsdSxpKXtyZXR1cm4gYnUobikmJmJ1KHQpJiYoaS5zZXQodCxuKSxucihuLHQsRixoZSxpKSxpLmRlbGV0ZSh0KSksbn1mdW5jdGlvbiBwZShuKXtyZXR1cm4gd3Uobik/RjpufWZ1bmN0aW9uIF9lKG4sdCxyLGUsdSxpKXt2YXIgbz0xJnIsZj1uLmxlbmd0aCxjPXQubGVuZ3RoO2lmKGYhPWMmJiEobyYmYz5mKSlyZXR1cm4gZmFsc2U7aWYoKGM9aS5nZXQobikpJiZpLmdldCh0KSlyZXR1cm4gYz09dDt2YXIgYz0tMSxhPXRydWUsbD0yJnI/bmV3IHFuOkY7XG5mb3IoaS5zZXQobix0KSxpLnNldCh0LG4pOysrYzxmOyl7dmFyIHM9bltjXSxoPXRbY107aWYoZSl2YXIgcD1vP2UoaCxzLGMsdCxuLGkpOmUocyxoLGMsbix0LGkpO2lmKHAhPT1GKXtpZihwKWNvbnRpbnVlO2E9ZmFsc2U7YnJlYWt9aWYobCl7aWYoIV8odCxmdW5jdGlvbihuLHQpe2lmKCFSKGwsdCkmJihzPT09bnx8dShzLG4scixlLGkpKSlyZXR1cm4gbC5wdXNoKHQpfSkpe2E9ZmFsc2U7YnJlYWt9fWVsc2UgaWYocyE9PWgmJiF1KHMsaCxyLGUsaSkpe2E9ZmFsc2U7YnJlYWt9fXJldHVybiBpLmRlbGV0ZShuKSxpLmRlbGV0ZSh0KSxhfWZ1bmN0aW9uIHZlKG4sdCxyLGUsdSxpLG8pe3N3aXRjaChyKXtjYXNlXCJbb2JqZWN0IERhdGFWaWV3XVwiOmlmKG4uYnl0ZUxlbmd0aCE9dC5ieXRlTGVuZ3RofHxuLmJ5dGVPZmZzZXQhPXQuYnl0ZU9mZnNldClicmVhaztuPW4uYnVmZmVyLHQ9dC5idWZmZXI7Y2FzZVwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIjppZihuLmJ5dGVMZW5ndGghPXQuYnl0ZUxlbmd0aHx8IWkobmV3IGRpKG4pLG5ldyBkaSh0KSkpYnJlYWs7XG5yZXR1cm4gdHJ1ZTtjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybiBodSgrbiwrdCk7Y2FzZVwiW29iamVjdCBFcnJvcl1cIjpyZXR1cm4gbi5uYW1lPT10Lm5hbWUmJm4ubWVzc2FnZT09dC5tZXNzYWdlO2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVybiBuPT10K1wiXCI7Y2FzZVwiW29iamVjdCBNYXBdXCI6dmFyIGY9TDtjYXNlXCJbb2JqZWN0IFNldF1cIjppZihmfHwoZj1EKSxuLnNpemUhPXQuc2l6ZSYmISgxJmUpKWJyZWFrO3JldHVybihyPW8uZ2V0KG4pKT9yPT10OihlfD0yLG8uc2V0KG4sdCksdD1fZShmKG4pLGYodCksZSx1LGksbyksby5kZWxldGUobiksdCk7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6aWYoZW8pcmV0dXJuIGVvLmNhbGwobik9PWVvLmNhbGwodCl9cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIGdlKG4pe3JldHVybiB3byhDZShuLEYsVmUpLG4rXCJcIil9ZnVuY3Rpb24gZGUobil7XG5yZXR1cm4gUnQobixMdSx2byl9ZnVuY3Rpb24geWUobil7cmV0dXJuIFJ0KG4sVXUsZ28pfWZ1bmN0aW9uIGJlKG4pe2Zvcih2YXIgdD1uLm5hbWUrXCJcIixyPUppW3RdLGU9Y2kuY2FsbChKaSx0KT9yLmxlbmd0aDowO2UtLTspe3ZhciB1PXJbZV0saT11LmZ1bmM7aWYobnVsbD09aXx8aT09bilyZXR1cm4gdS5uYW1lfXJldHVybiB0fWZ1bmN0aW9uIHhlKG4pe3JldHVybihjaS5jYWxsKE9uLFwicGxhY2Vob2xkZXJcIik/T246bikucGxhY2Vob2xkZXJ9ZnVuY3Rpb24gamUoKXt2YXIgbj1Pbi5pdGVyYXRlZXx8UHUsbj1uPT09UHU/R3Q6bjtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD9uKGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0pOm59ZnVuY3Rpb24gd2Uobix0KXt2YXIgcj1uLl9fZGF0YV9fLGU9dHlwZW9mIHQ7cmV0dXJuKFwic3RyaW5nXCI9PWV8fFwibnVtYmVyXCI9PWV8fFwic3ltYm9sXCI9PWV8fFwiYm9vbGVhblwiPT1lP1wiX19wcm90b19fXCIhPT10Om51bGw9PT10KT9yW3R5cGVvZiB0PT1cInN0cmluZ1wiP1wic3RyaW5nXCI6XCJoYXNoXCJdOnIubWFwO1xufWZ1bmN0aW9uIG1lKG4pe2Zvcih2YXIgdD1MdShuKSxyPXQubGVuZ3RoO3ItLTspe3ZhciBlPXRbcl0sdT1uW2VdO3Rbcl09W2UsdSx1PT09dSYmIWJ1KHUpXX1yZXR1cm4gdH1mdW5jdGlvbiBBZShuLHQpe3ZhciByPW51bGw9PW4/RjpuW3RdO3JldHVybiBadChyKT9yOkZ9ZnVuY3Rpb24ga2Uobix0LHIpe3Q9UnIodCxuKTtmb3IodmFyIGU9LTEsdT10Lmxlbmd0aCxpPWZhbHNlOysrZTx1Oyl7dmFyIG89JGUodFtlXSk7aWYoIShpPW51bGwhPW4mJnIobixvKSkpYnJlYWs7bj1uW29dfXJldHVybiBpfHwrK2UhPXU/aToodT1udWxsPT1uPzA6bi5sZW5ndGgsISF1JiZ5dSh1KSYmUmUobyx1KSYmKGFmKG4pfHxjZihuKSkpfWZ1bmN0aW9uIEVlKG4pe3ZhciB0PW4ubGVuZ3RoLHI9bi5jb25zdHJ1Y3Rvcih0KTtyZXR1cm4gdCYmXCJzdHJpbmdcIj09dHlwZW9mIG5bMF0mJmNpLmNhbGwobixcImluZGV4XCIpJiYoci5pbmRleD1uLmluZGV4LHIuaW5wdXQ9bi5pbnB1dCkscn1mdW5jdGlvbiBPZShuKXtcbnJldHVybiB0eXBlb2Ygbi5jb25zdHJ1Y3RvciE9XCJmdW5jdGlvblwifHxMZShuKT97fTppbyhiaShuKSl9ZnVuY3Rpb24gU2UocixlLHUsaSl7dmFyIG89ci5jb25zdHJ1Y3Rvcjtzd2l0Y2goZSl7Y2FzZVwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIjpyZXR1cm4gQnIocik7Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOmNhc2VcIltvYmplY3QgRGF0ZV1cIjpyZXR1cm4gbmV3IG8oK3IpO2Nhc2VcIltvYmplY3QgRGF0YVZpZXddXCI6cmV0dXJuIGU9aT9CcihyLmJ1ZmZlcik6ci5idWZmZXIsbmV3IHIuY29uc3RydWN0b3IoZSxyLmJ5dGVPZmZzZXQsci5ieXRlTGVuZ3RoKTtjYXNlXCJbb2JqZWN0IEZsb2F0MzJBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEludDhBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEludDE2QXJyYXldXCI6Y2FzZVwiW29iamVjdCBJbnQzMkFycmF5XVwiOmNhc2VcIltvYmplY3QgVWludDhBcnJheV1cIjpjYXNlXCJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XVwiOlxuY2FzZVwiW29iamVjdCBVaW50MTZBcnJheV1cIjpjYXNlXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiOnJldHVybiBMcihyLGkpO2Nhc2VcIltvYmplY3QgTWFwXVwiOnJldHVybiBlPWk/dShMKHIpLDEpOkwociksaChlLG4sbmV3IHIuY29uc3RydWN0b3IpO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVybiBuZXcgbyhyKTtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpyZXR1cm4gZT1uZXcgci5jb25zdHJ1Y3RvcihyLnNvdXJjZSxkbi5leGVjKHIpKSxlLmxhc3RJbmRleD1yLmxhc3RJbmRleCxlO2Nhc2VcIltvYmplY3QgU2V0XVwiOnJldHVybiBlPWk/dShEKHIpLDEpOkQociksaChlLHQsbmV3IHIuY29uc3RydWN0b3IpO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBlbz9uaShlby5jYWxsKHIpKTp7fX19ZnVuY3Rpb24gSWUobil7cmV0dXJuIGFmKG4pfHxjZihuKXx8ISEobWkmJm4mJm5bbWldKX1mdW5jdGlvbiBSZShuLHQpe3JldHVybiB0PW51bGw9PXQ/OTAwNzE5OTI1NDc0MDk5MTp0LFxuISF0JiYodHlwZW9mIG49PVwibnVtYmVyXCJ8fHduLnRlc3QobikpJiYtMTxuJiYwPT1uJTEmJm48dH1mdW5jdGlvbiB6ZShuLHQscil7aWYoIWJ1KHIpKXJldHVybiBmYWxzZTt2YXIgZT10eXBlb2YgdDtyZXR1cm4hIShcIm51bWJlclwiPT1lP3B1KHIpJiZSZSh0LHIubGVuZ3RoKTpcInN0cmluZ1wiPT1lJiZ0IGluIHIpJiZodShyW3RdLG4pfWZ1bmN0aW9uIFdlKG4sdCl7aWYoYWYobikpcmV0dXJuIGZhbHNlO3ZhciByPXR5cGVvZiBuO3JldHVybiEoXCJudW1iZXJcIiE9ciYmXCJzeW1ib2xcIiE9ciYmXCJib29sZWFuXCIhPXImJm51bGwhPW4mJiFBdShuKSl8fChybi50ZXN0KG4pfHwhdG4udGVzdChuKXx8bnVsbCE9dCYmbiBpbiBuaSh0KSl9ZnVuY3Rpb24gQmUobil7dmFyIHQ9YmUobikscj1Pblt0XTtyZXR1cm4gdHlwZW9mIHI9PVwiZnVuY3Rpb25cIiYmdCBpbiBNbi5wcm90b3R5cGUmJihuPT09cnx8KHQ9X28ociksISF0JiZuPT09dFswXSkpfWZ1bmN0aW9uIExlKG4pe3ZhciB0PW4mJm4uY29uc3RydWN0b3I7XG5yZXR1cm4gbj09PSh0eXBlb2YgdD09XCJmdW5jdGlvblwiJiZ0LnByb3RvdHlwZXx8aWkpfWZ1bmN0aW9uIFVlKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT1yJiYocltuXT09PXQmJih0IT09Rnx8biBpbiBuaShyKSkpfX1mdW5jdGlvbiBDZShuLHQsZSl7cmV0dXJuIHQ9RGkodD09PUY/bi5sZW5ndGgtMTp0LDApLGZ1bmN0aW9uKCl7Zm9yKHZhciB1PWFyZ3VtZW50cyxpPS0xLG89RGkodS5sZW5ndGgtdCwwKSxmPUh1KG8pOysraTxvOylmW2ldPXVbdCtpXTtmb3IoaT0tMSxvPUh1KHQrMSk7KytpPHQ7KW9baV09dVtpXTtyZXR1cm4gb1t0XT1lKGYpLHIobix0aGlzLG8pfX1mdW5jdGlvbiBEZShuLHQscil7dmFyIGU9dCtcIlwiO3Q9d287dmFyIHUsaT1OZTtyZXR1cm4gdT0odT1lLm1hdGNoKGhuKSk/dVsxXS5zcGxpdChwbik6W10scj1pKHUsciksKGk9ci5sZW5ndGgpJiYodT1pLTEsclt1XT0oMTxpP1wiJiBcIjpcIlwiKStyW3VdLHI9ci5qb2luKDI8aT9cIiwgXCI6XCIgXCIpLFxuZT1lLnJlcGxhY2Uoc24sXCJ7XFxuLyogW3dyYXBwZWQgd2l0aCBcIityK1wiXSAqL1xcblwiKSksdChuLGUpfWZ1bmN0aW9uIE1lKG4pe3ZhciB0PTAscj0wO3JldHVybiBmdW5jdGlvbigpe3ZhciBlPVRpKCksdT0xNi0oZS1yKTtpZihyPWUsMDx1KXtpZig4MDA8PSsrdClyZXR1cm4gYXJndW1lbnRzWzBdfWVsc2UgdD0wO3JldHVybiBuLmFwcGx5KEYsYXJndW1lbnRzKX19ZnVuY3Rpb24gVGUobix0KXt2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9ZS0xO2Zvcih0PXQ9PT1GP2U6dDsrK3I8dDspe3ZhciBlPWNyKHIsdSksaT1uW2VdO25bZV09bltyXSxuW3JdPWl9cmV0dXJuIG4ubGVuZ3RoPXQsbn1mdW5jdGlvbiAkZShuKXtpZih0eXBlb2Ygbj09XCJzdHJpbmdcInx8QXUobikpcmV0dXJuIG47dmFyIHQ9bitcIlwiO3JldHVyblwiMFwiPT10JiYxL249PS1OP1wiLTBcIjp0fWZ1bmN0aW9uIEZlKG4pe2lmKG51bGwhPW4pe3RyeXtyZXR1cm4gZmkuY2FsbChuKX1jYXRjaChuKXt9cmV0dXJuIG4rXCJcIn1yZXR1cm5cIlwiO1xufWZ1bmN0aW9uIE5lKG4sdCl7cmV0dXJuIHUoWixmdW5jdGlvbihyKXt2YXIgZT1cIl8uXCIrclswXTt0JnJbMV0mJiFjKG4sZSkmJm4ucHVzaChlKX0pLG4uc29ydCgpfWZ1bmN0aW9uIFBlKG4pe2lmKG4gaW5zdGFuY2VvZiBNbilyZXR1cm4gbi5jbG9uZSgpO3ZhciB0PW5ldyB6bihuLl9fd3JhcHBlZF9fLG4uX19jaGFpbl9fKTtyZXR1cm4gdC5fX2FjdGlvbnNfXz1NcihuLl9fYWN0aW9uc19fKSx0Ll9faW5kZXhfXz1uLl9faW5kZXhfXyx0Ll9fdmFsdWVzX189bi5fX3ZhbHVlc19fLHR9ZnVuY3Rpb24gWmUobix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8ocj1udWxsPT1yPzA6T3UociksMD5yJiYocj1EaShlK3IsMCkpLGcobixqZSh0LDMpLHIpKTotMX1mdW5jdGlvbiBxZShuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCFlKXJldHVybi0xO3ZhciB1PWUtMTtyZXR1cm4gciE9PUYmJih1PU91KHIpLHU9MD5yP0RpKGUrdSwwKTpNaSh1LGUtMSkpLFxuZyhuLGplKHQsMyksdSx0cnVlKX1mdW5jdGlvbiBWZShuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9rdChuLDEpOltdfWZ1bmN0aW9uIEtlKG4pe3JldHVybiBuJiZuLmxlbmd0aD9uWzBdOkZ9ZnVuY3Rpb24gR2Uobil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P25bdC0xXTpGfWZ1bmN0aW9uIEhlKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoJiZ0JiZ0Lmxlbmd0aD9vcihuLHQpOm59ZnVuY3Rpb24gSmUobil7cmV0dXJuIG51bGw9PW4/bjpOaS5jYWxsKG4pfWZ1bmN0aW9uIFllKG4pe2lmKCFufHwhbi5sZW5ndGgpcmV0dXJuW107dmFyIHQ9MDtyZXR1cm4gbj1mKG4sZnVuY3Rpb24obil7aWYoX3UobikpcmV0dXJuIHQ9RGkobi5sZW5ndGgsdCksdHJ1ZX0pLEUodCxmdW5jdGlvbih0KXtyZXR1cm4gbChuLGoodCkpfSl9ZnVuY3Rpb24gUWUobix0KXtpZighbnx8IW4ubGVuZ3RoKXJldHVybltdO3ZhciBlPVllKG4pO3JldHVybiBudWxsPT10P2U6bChlLGZ1bmN0aW9uKG4pe1xucmV0dXJuIHIodCxGLG4pfSl9ZnVuY3Rpb24gWGUobil7cmV0dXJuIG49T24obiksbi5fX2NoYWluX189dHJ1ZSxufWZ1bmN0aW9uIG51KG4sdCl7cmV0dXJuIHQobil9ZnVuY3Rpb24gdHUoKXtyZXR1cm4gdGhpc31mdW5jdGlvbiBydShuLHQpe3JldHVybihhZihuKT91Om9vKShuLGplKHQsMykpfWZ1bmN0aW9uIGV1KG4sdCl7cmV0dXJuKGFmKG4pP2k6Zm8pKG4samUodCwzKSl9ZnVuY3Rpb24gdXUobix0KXtyZXR1cm4oYWYobik/bDpZdCkobixqZSh0LDMpKX1mdW5jdGlvbiBpdShuLHQscil7cmV0dXJuIHQ9cj9GOnQsdD1uJiZudWxsPT10P24ubGVuZ3RoOnQsbGUobiwxMjgsRixGLEYsRix0KX1mdW5jdGlvbiBvdShuLHQpe3ZhciByO2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gbj1PdShuKSxmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHI9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLDE+PW4mJih0PUYpLFxucn19ZnVuY3Rpb24gZnUobix0LHIpe3JldHVybiB0PXI/Rjp0LG49bGUobiw4LEYsRixGLEYsRix0KSxuLnBsYWNlaG9sZGVyPWZ1LnBsYWNlaG9sZGVyLG59ZnVuY3Rpb24gY3Uobix0LHIpe3JldHVybiB0PXI/Rjp0LG49bGUobiwxNixGLEYsRixGLEYsdCksbi5wbGFjZWhvbGRlcj1jdS5wbGFjZWhvbGRlcixufWZ1bmN0aW9uIGF1KG4sdCxyKXtmdW5jdGlvbiBlKHQpe3ZhciByPWMsZT1hO3JldHVybiBjPWE9RixfPXQscz1uLmFwcGx5KGUscil9ZnVuY3Rpb24gdShuKXt2YXIgcj1uLXA7cmV0dXJuIG4tPV8scD09PUZ8fHI+PXR8fDA+cnx8ZyYmbj49bH1mdW5jdGlvbiBpKCl7dmFyIG49Sm8oKTtpZih1KG4pKXJldHVybiBvKG4pO3ZhciByLGU9am87cj1uLV8sbj10LShuLXApLHI9Zz9NaShuLGwtcik6bixoPWUoaSxyKX1mdW5jdGlvbiBvKG4pe3JldHVybiBoPUYsZCYmYz9lKG4pOihjPWE9RixzKX1mdW5jdGlvbiBmKCl7dmFyIG49Sm8oKSxyPXUobik7aWYoYz1hcmd1bWVudHMsXG5hPXRoaXMscD1uLHIpe2lmKGg9PT1GKXJldHVybiBfPW49cCxoPWpvKGksdCksdj9lKG4pOnM7aWYoZylyZXR1cm4gaD1qbyhpLHQpLGUocCl9cmV0dXJuIGg9PT1GJiYoaD1qbyhpLHQpKSxzfXZhciBjLGEsbCxzLGgscCxfPTAsdj1mYWxzZSxnPWZhbHNlLGQ9dHJ1ZTtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9SXUodCl8fDAsYnUocikmJih2PSEhci5sZWFkaW5nLGw9KGc9XCJtYXhXYWl0XCJpbiByKT9EaShJdShyLm1heFdhaXQpfHwwLHQpOmwsZD1cInRyYWlsaW5nXCJpbiByPyEhci50cmFpbGluZzpkKSxmLmNhbmNlbD1mdW5jdGlvbigpe2ghPT1GJiZobyhoKSxfPTAsYz1wPWE9aD1GfSxmLmZsdXNoPWZ1bmN0aW9uKCl7cmV0dXJuIGg9PT1GP3M6byhKbygpKX0sZn1mdW5jdGlvbiBsdShuLHQpe2Z1bmN0aW9uIHIoKXt2YXIgZT1hcmd1bWVudHMsdT10P3QuYXBwbHkodGhpcyxlKTplWzBdLGk9ci5jYWNoZTtyZXR1cm4gaS5oYXModSk/aS5nZXQodSk6KGU9bi5hcHBseSh0aGlzLGUpLFxuci5jYWNoZT1pLnNldCh1LGUpfHxpLGUpfWlmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCJ8fG51bGwhPXQmJnR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gci5jYWNoZT1uZXcobHUuQ2FjaGV8fFBuKSxyfWZ1bmN0aW9uIHN1KG4pe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHM7c3dpdGNoKHQubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIW4uY2FsbCh0aGlzKTtjYXNlIDE6cmV0dXJuIW4uY2FsbCh0aGlzLHRbMF0pO2Nhc2UgMjpyZXR1cm4hbi5jYWxsKHRoaXMsdFswXSx0WzFdKTtjYXNlIDM6cmV0dXJuIW4uY2FsbCh0aGlzLHRbMF0sdFsxXSx0WzJdKX1yZXR1cm4hbi5hcHBseSh0aGlzLHQpfX1mdW5jdGlvbiBodShuLHQpe3JldHVybiBuPT09dHx8biE9PW4mJnQhPT10fWZ1bmN0aW9uIHB1KG4pe3JldHVybiBudWxsIT1uJiZ5dShuLmxlbmd0aCkmJiFndShuKTtcbn1mdW5jdGlvbiBfdShuKXtyZXR1cm4geHUobikmJnB1KG4pfWZ1bmN0aW9uIHZ1KG4pe2lmKCF4dShuKSlyZXR1cm4gZmFsc2U7dmFyIHQ9enQobik7cmV0dXJuXCJbb2JqZWN0IEVycm9yXVwiPT10fHxcIltvYmplY3QgRE9NRXhjZXB0aW9uXVwiPT10fHx0eXBlb2Ygbi5tZXNzYWdlPT1cInN0cmluZ1wiJiZ0eXBlb2Ygbi5uYW1lPT1cInN0cmluZ1wiJiYhd3Uobil9ZnVuY3Rpb24gZ3Uobil7cmV0dXJuISFidShuKSYmKG49enQobiksXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBBc3luY0Z1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgUHJveHldXCI9PW4pfWZ1bmN0aW9uIGR1KG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcIiYmbj09T3Uobil9ZnVuY3Rpb24geXUobil7cmV0dXJuIHR5cGVvZiBuPT1cIm51bWJlclwiJiYtMTxuJiYwPT1uJTEmJjkwMDcxOTkyNTQ3NDA5OTE+PW59ZnVuY3Rpb24gYnUobil7dmFyIHQ9dHlwZW9mIG47cmV0dXJuIG51bGwhPW4mJihcIm9iamVjdFwiPT10fHxcImZ1bmN0aW9uXCI9PXQpO1xufWZ1bmN0aW9uIHh1KG4pe3JldHVybiBudWxsIT1uJiZ0eXBlb2Ygbj09XCJvYmplY3RcIn1mdW5jdGlvbiBqdShuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCJ8fHh1KG4pJiZcIltvYmplY3QgTnVtYmVyXVwiPT16dChuKX1mdW5jdGlvbiB3dShuKXtyZXR1cm4hKCF4dShuKXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9enQobikpJiYobj1iaShuKSxudWxsPT09bnx8KG49Y2kuY2FsbChuLFwiY29uc3RydWN0b3JcIikmJm4uY29uc3RydWN0b3IsdHlwZW9mIG49PVwiZnVuY3Rpb25cIiYmbiBpbnN0YW5jZW9mIG4mJmZpLmNhbGwobik9PWhpKSl9ZnVuY3Rpb24gbXUobil7cmV0dXJuIHR5cGVvZiBuPT1cInN0cmluZ1wifHwhYWYobikmJnh1KG4pJiZcIltvYmplY3QgU3RyaW5nXVwiPT16dChuKX1mdW5jdGlvbiBBdShuKXtyZXR1cm4gdHlwZW9mIG49PVwic3ltYm9sXCJ8fHh1KG4pJiZcIltvYmplY3QgU3ltYm9sXVwiPT16dChuKX1mdW5jdGlvbiBrdShuKXtpZighbilyZXR1cm5bXTtpZihwdShuKSlyZXR1cm4gbXUobik/JChuKTpNcihuKTtcbmlmKEFpJiZuW0FpXSl7bj1uW0FpXSgpO2Zvcih2YXIgdCxyPVtdOyEodD1uLm5leHQoKSkuZG9uZTspci5wdXNoKHQudmFsdWUpO3JldHVybiByfXJldHVybiB0PXlvKG4pLChcIltvYmplY3QgTWFwXVwiPT10P0w6XCJbb2JqZWN0IFNldF1cIj09dD9EOkR1KShuKX1mdW5jdGlvbiBFdShuKXtyZXR1cm4gbj8obj1JdShuKSxuPT09Tnx8bj09PS1OPzEuNzk3NjkzMTM0ODYyMzE1N2UzMDgqKDA+bj8tMToxKTpuPT09bj9uOjApOjA9PT1uP246MH1mdW5jdGlvbiBPdShuKXtuPUV1KG4pO3ZhciB0PW4lMTtyZXR1cm4gbj09PW4/dD9uLXQ6bjowfWZ1bmN0aW9uIFN1KG4pe3JldHVybiBuP2d0KE91KG4pLDAsNDI5NDk2NzI5NSk6MH1mdW5jdGlvbiBJdShuKXtpZih0eXBlb2Ygbj09XCJudW1iZXJcIilyZXR1cm4gbjtpZihBdShuKSlyZXR1cm4gUDtpZihidShuKSYmKG49dHlwZW9mIG4udmFsdWVPZj09XCJmdW5jdGlvblwiP24udmFsdWVPZigpOm4sbj1idShuKT9uK1wiXCI6biksdHlwZW9mIG4hPVwic3RyaW5nXCIpcmV0dXJuIDA9PT1uP246K247XG5uPW4ucmVwbGFjZShjbixcIlwiKTt2YXIgdD1ibi50ZXN0KG4pO3JldHVybiB0fHxqbi50ZXN0KG4pP0ZuKG4uc2xpY2UoMiksdD8yOjgpOnluLnRlc3Qobik/UDorbn1mdW5jdGlvbiBSdShuKXtyZXR1cm4gVHIobixVdShuKSl9ZnVuY3Rpb24genUobil7cmV0dXJuIG51bGw9PW4/XCJcIjpqcihuKX1mdW5jdGlvbiBXdShuLHQscil7cmV0dXJuIG49bnVsbD09bj9GOkl0KG4sdCksbj09PUY/cjpufWZ1bmN0aW9uIEJ1KG4sdCl7cmV0dXJuIG51bGwhPW4mJmtlKG4sdCxMdCl9ZnVuY3Rpb24gTHUobil7cmV0dXJuIHB1KG4pP0duKG4pOkh0KG4pfWZ1bmN0aW9uIFV1KG4pe2lmKHB1KG4pKW49R24obix0cnVlKTtlbHNlIGlmKGJ1KG4pKXt2YXIgdCxyPUxlKG4pLGU9W107Zm9yKHQgaW4gbikoXCJjb25zdHJ1Y3RvclwiIT10fHwhciYmY2kuY2FsbChuLHQpKSYmZS5wdXNoKHQpO249ZX1lbHNle2lmKHQ9W10sbnVsbCE9bilmb3IociBpbiBuaShuKSl0LnB1c2gocik7bj10fXJldHVybiBufWZ1bmN0aW9uIEN1KG4sdCl7XG5pZihudWxsPT1uKXJldHVybnt9O3ZhciByPWwoeWUobiksZnVuY3Rpb24obil7cmV0dXJuW25dfSk7cmV0dXJuIHQ9amUodCksdXIobixyLGZ1bmN0aW9uKG4scil7cmV0dXJuIHQobixyWzBdKX0pfWZ1bmN0aW9uIER1KG4pe3JldHVybiBudWxsPT1uP1tdOkkobixMdShuKSl9ZnVuY3Rpb24gTXUobil7cmV0dXJuIE5mKHp1KG4pLnRvTG93ZXJDYXNlKCkpfWZ1bmN0aW9uIFR1KG4pe3JldHVybihuPXp1KG4pKSYmbi5yZXBsYWNlKG1uLHJ0KS5yZXBsYWNlKFJuLFwiXCIpfWZ1bmN0aW9uICR1KG4sdCxyKXtyZXR1cm4gbj16dShuKSx0PXI/Rjp0LHQ9PT1GP0xuLnRlc3Qobik/bi5tYXRjaChXbil8fFtdOm4ubWF0Y2goX24pfHxbXTpuLm1hdGNoKHQpfHxbXX1mdW5jdGlvbiBGdShuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19ZnVuY3Rpb24gTnUobil7cmV0dXJuIG59ZnVuY3Rpb24gUHUobil7cmV0dXJuIEd0KHR5cGVvZiBuPT1cImZ1bmN0aW9uXCI/bjpkdChuLDEpKX1mdW5jdGlvbiBadShuLHQscil7XG52YXIgZT1MdSh0KSxpPVN0KHQsZSk7bnVsbCE9cnx8YnUodCkmJihpLmxlbmd0aHx8IWUubGVuZ3RoKXx8KHI9dCx0PW4sbj10aGlzLGk9U3QodCxMdSh0KSkpO3ZhciBvPSEoYnUocikmJlwiY2hhaW5cImluIHImJiFyLmNoYWluKSxmPWd1KG4pO3JldHVybiB1KGksZnVuY3Rpb24ocil7dmFyIGU9dFtyXTtuW3JdPWUsZiYmKG4ucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2NoYWluX187aWYob3x8dCl7dmFyIHI9bih0aGlzLl9fd3JhcHBlZF9fKTtyZXR1cm4oci5fX2FjdGlvbnNfXz1Ncih0aGlzLl9fYWN0aW9uc19fKSkucHVzaCh7ZnVuYzplLGFyZ3M6YXJndW1lbnRzLHRoaXNBcmc6bn0pLHIuX19jaGFpbl9fPXQscn1yZXR1cm4gZS5hcHBseShuLHMoW3RoaXMudmFsdWUoKV0sYXJndW1lbnRzKSl9KX0pLG59ZnVuY3Rpb24gcXUoKXt9ZnVuY3Rpb24gVnUobil7cmV0dXJuIFdlKG4pP2ooJGUobikpOmlyKG4pfWZ1bmN0aW9uIEt1KCl7cmV0dXJuW119ZnVuY3Rpb24gR3UoKXtcbnJldHVybiBmYWxzZX1Fbj1udWxsPT1Fbj9abjppdC5kZWZhdWx0cyhabi5PYmplY3QoKSxFbixpdC5waWNrKFpuLFVuKSk7dmFyIEh1PUVuLkFycmF5LEp1PUVuLkRhdGUsWXU9RW4uRXJyb3IsUXU9RW4uRnVuY3Rpb24sWHU9RW4uTWF0aCxuaT1Fbi5PYmplY3QsdGk9RW4uUmVnRXhwLHJpPUVuLlN0cmluZyxlaT1Fbi5UeXBlRXJyb3IsdWk9SHUucHJvdG90eXBlLGlpPW5pLnByb3RvdHlwZSxvaT1FbltcIl9fY29yZS1qc19zaGFyZWRfX1wiXSxmaT1RdS5wcm90b3R5cGUudG9TdHJpbmcsY2k9aWkuaGFzT3duUHJvcGVydHksYWk9MCxsaT1mdW5jdGlvbigpe3ZhciBuPS9bXi5dKyQvLmV4ZWMob2kmJm9pLmtleXMmJm9pLmtleXMuSUVfUFJPVE98fFwiXCIpO3JldHVybiBuP1wiU3ltYm9sKHNyYylfMS5cIituOlwiXCJ9KCksc2k9aWkudG9TdHJpbmcsaGk9ZmkuY2FsbChuaSkscGk9Wm4uXyxfaT10aShcIl5cIitmaS5jYWxsKGNpKS5yZXBsYWNlKG9uLFwiXFxcXCQmXCIpLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csXCIkMS4qP1wiKStcIiRcIiksdmk9S24/RW4uQnVmZmVyOkYsZ2k9RW4uU3ltYm9sLGRpPUVuLlVpbnQ4QXJyYXkseWk9dmk/dmkuZjpGLGJpPVUobmkuZ2V0UHJvdG90eXBlT2YsbmkpLHhpPW5pLmNyZWF0ZSxqaT1paS5wcm9wZXJ0eUlzRW51bWVyYWJsZSx3aT11aS5zcGxpY2UsbWk9Z2k/Z2kuaXNDb25jYXRTcHJlYWRhYmxlOkYsQWk9Z2k/Z2kuaXRlcmF0b3I6RixraT1naT9naS50b1N0cmluZ1RhZzpGLEVpPWZ1bmN0aW9uKCl7XG50cnl7dmFyIG49QWUobmksXCJkZWZpbmVQcm9wZXJ0eVwiKTtyZXR1cm4gbih7fSxcIlwiLHt9KSxufWNhdGNoKG4pe319KCksT2k9RW4uY2xlYXJUaW1lb3V0IT09Wm4uY2xlYXJUaW1lb3V0JiZFbi5jbGVhclRpbWVvdXQsU2k9SnUmJkp1Lm5vdyE9PVpuLkRhdGUubm93JiZKdS5ub3csSWk9RW4uc2V0VGltZW91dCE9PVpuLnNldFRpbWVvdXQmJkVuLnNldFRpbWVvdXQsUmk9WHUuY2VpbCx6aT1YdS5mbG9vcixXaT1uaS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsQmk9dmk/dmkuaXNCdWZmZXI6RixMaT1Fbi5pc0Zpbml0ZSxVaT11aS5qb2luLENpPVUobmkua2V5cyxuaSksRGk9WHUubWF4LE1pPVh1Lm1pbixUaT1KdS5ub3csJGk9RW4ucGFyc2VJbnQsRmk9WHUucmFuZG9tLE5pPXVpLnJldmVyc2UsUGk9QWUoRW4sXCJEYXRhVmlld1wiKSxaaT1BZShFbixcIk1hcFwiKSxxaT1BZShFbixcIlByb21pc2VcIiksVmk9QWUoRW4sXCJTZXRcIiksS2k9QWUoRW4sXCJXZWFrTWFwXCIpLEdpPUFlKG5pLFwiY3JlYXRlXCIpLEhpPUtpJiZuZXcgS2ksSmk9e30sWWk9RmUoUGkpLFFpPUZlKFppKSxYaT1GZShxaSksbm89RmUoVmkpLHRvPUZlKEtpKSxybz1naT9naS5wcm90b3R5cGU6Rixlbz1ybz9yby52YWx1ZU9mOkYsdW89cm8/cm8udG9TdHJpbmc6Rixpbz1mdW5jdGlvbigpe1xuZnVuY3Rpb24gbigpe31yZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGJ1KHQpP3hpP3hpKHQpOihuLnByb3RvdHlwZT10LHQ9bmV3IG4sbi5wcm90b3R5cGU9Rix0KTp7fX19KCk7T24udGVtcGxhdGVTZXR0aW5ncz17ZXNjYXBlOlEsZXZhbHVhdGU6WCxpbnRlcnBvbGF0ZTpubix2YXJpYWJsZTpcIlwiLGltcG9ydHM6e186T259fSxPbi5wcm90b3R5cGU9U24ucHJvdG90eXBlLE9uLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Pbix6bi5wcm90b3R5cGU9aW8oU24ucHJvdG90eXBlKSx6bi5wcm90b3R5cGUuY29uc3RydWN0b3I9em4sTW4ucHJvdG90eXBlPWlvKFNuLnByb3RvdHlwZSksTW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1uLFRuLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189R2k/R2kobnVsbCk6e30sdGhpcy5zaXplPTB9LFRuLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7cmV0dXJuIG49dGhpcy5oYXMobikmJmRlbGV0ZSB0aGlzLl9fZGF0YV9fW25dLFxudGhpcy5zaXplLT1uPzE6MCxufSxUbi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIEdpPyhuPXRbbl0sXCJfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fXCI9PT1uP0Y6bik6Y2kuY2FsbCh0LG4pP3Rbbl06Rn0sVG4ucHJvdG90eXBlLmhhcz1mdW5jdGlvbihuKXt2YXIgdD10aGlzLl9fZGF0YV9fO3JldHVybiBHaT90W25dIT09RjpjaS5jYWxsKHQsbil9LFRuLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24obix0KXt2YXIgcj10aGlzLl9fZGF0YV9fO3JldHVybiB0aGlzLnNpemUrPXRoaXMuaGFzKG4pPzA6MSxyW25dPUdpJiZ0PT09Rj9cIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIjp0LHRoaXN9LE5uLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189W10sdGhpcy5zaXplPTB9LE5uLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gbj1sdCh0LG4pLCEoMD5uKSYmKG49PXQubGVuZ3RoLTE/dC5wb3AoKTp3aS5jYWxsKHQsbiwxKSxcbi0tdGhpcy5zaXplLHRydWUpfSxObi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIG49bHQodCxuKSwwPm4/Rjp0W25dWzFdfSxObi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3JldHVybi0xPGx0KHRoaXMuX19kYXRhX18sbil9LE5uLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24obix0KXt2YXIgcj10aGlzLl9fZGF0YV9fLGU9bHQocixuKTtyZXR1cm4gMD5lPygrK3RoaXMuc2l6ZSxyLnB1c2goW24sdF0pKTpyW2VdWzFdPXQsdGhpc30sUG4ucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5zaXplPTAsdGhpcy5fX2RhdGFfXz17aGFzaDpuZXcgVG4sbWFwOm5ldyhaaXx8Tm4pLHN0cmluZzpuZXcgVG59fSxQbi5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKG4pe3JldHVybiBuPXdlKHRoaXMsbikuZGVsZXRlKG4pLHRoaXMuc2l6ZS09bj8xOjAsbn0sUG4ucHJvdG90eXBlLmdldD1mdW5jdGlvbihuKXtyZXR1cm4gd2UodGhpcyxuKS5nZXQobik7XG59LFBuLnByb3RvdHlwZS5oYXM9ZnVuY3Rpb24obil7cmV0dXJuIHdlKHRoaXMsbikuaGFzKG4pfSxQbi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKG4sdCl7dmFyIHI9d2UodGhpcyxuKSxlPXIuc2l6ZTtyZXR1cm4gci5zZXQobix0KSx0aGlzLnNpemUrPXIuc2l6ZT09ZT8wOjEsdGhpc30scW4ucHJvdG90eXBlLmFkZD1xbi5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5zZXQobixcIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIiksdGhpc30scW4ucHJvdG90eXBlLmhhcz1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMobil9LFZuLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189bmV3IE5uLHRoaXMuc2l6ZT0wfSxWbi5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIG49dC5kZWxldGUobiksdGhpcy5zaXplPXQuc2l6ZSxufSxWbi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe1xucmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KG4pfSxWbi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhuKX0sVm4ucHJvdG90eXBlLnNldD1mdW5jdGlvbihuLHQpe3ZhciByPXRoaXMuX19kYXRhX187aWYociBpbnN0YW5jZW9mIE5uKXt2YXIgZT1yLl9fZGF0YV9fO2lmKCFaaXx8MTk5PmUubGVuZ3RoKXJldHVybiBlLnB1c2goW24sdF0pLHRoaXMuc2l6ZT0rK3Iuc2l6ZSx0aGlzO3I9dGhpcy5fX2RhdGFfXz1uZXcgUG4oZSl9cmV0dXJuIHIuc2V0KG4sdCksdGhpcy5zaXplPXIuc2l6ZSx0aGlzfTt2YXIgb289WnIoRXQpLGZvPVpyKE90LHRydWUpLGNvPXFyKCksYW89cXIodHJ1ZSksbG89SGk/ZnVuY3Rpb24obix0KXtyZXR1cm4gSGkuc2V0KG4sdCksbn06TnUsc289RWk/ZnVuY3Rpb24obix0KXtyZXR1cm4gRWkobixcInRvU3RyaW5nXCIse2NvbmZpZ3VyYWJsZTp0cnVlLGVudW1lcmFibGU6ZmFsc2UsdmFsdWU6RnUodCksd3JpdGFibGU6dHJ1ZX0pfTpOdSxobz1PaXx8ZnVuY3Rpb24obil7XG5yZXR1cm4gWm4uY2xlYXJUaW1lb3V0KG4pfSxwbz1WaSYmMS9EKG5ldyBWaShbLC0wXSkpWzFdPT1OP2Z1bmN0aW9uKG4pe3JldHVybiBuZXcgVmkobil9OnF1LF9vPUhpP2Z1bmN0aW9uKG4pe3JldHVybiBIaS5nZXQobil9OnF1LHZvPVdpP2Z1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1tdOihuPW5pKG4pLGYoV2kobiksZnVuY3Rpb24odCl7cmV0dXJuIGppLmNhbGwobix0KX0pKX06S3UsZ289V2k/ZnVuY3Rpb24obil7Zm9yKHZhciB0PVtdO247KXModCx2byhuKSksbj1iaShuKTtyZXR1cm4gdH06S3UseW89enQ7KFBpJiZcIltvYmplY3QgRGF0YVZpZXddXCIhPXlvKG5ldyBQaShuZXcgQXJyYXlCdWZmZXIoMSkpKXx8WmkmJlwiW29iamVjdCBNYXBdXCIhPXlvKG5ldyBaaSl8fHFpJiZcIltvYmplY3QgUHJvbWlzZV1cIiE9eW8ocWkucmVzb2x2ZSgpKXx8VmkmJlwiW29iamVjdCBTZXRdXCIhPXlvKG5ldyBWaSl8fEtpJiZcIltvYmplY3QgV2Vha01hcF1cIiE9eW8obmV3IEtpKSkmJih5bz1mdW5jdGlvbihuKXtcbnZhciB0PXp0KG4pO2lmKG49KG49XCJbb2JqZWN0IE9iamVjdF1cIj09dD9uLmNvbnN0cnVjdG9yOkYpP0ZlKG4pOlwiXCIpc3dpdGNoKG4pe2Nhc2UgWWk6cmV0dXJuXCJbb2JqZWN0IERhdGFWaWV3XVwiO2Nhc2UgUWk6cmV0dXJuXCJbb2JqZWN0IE1hcF1cIjtjYXNlIFhpOnJldHVyblwiW29iamVjdCBQcm9taXNlXVwiO2Nhc2Ugbm86cmV0dXJuXCJbb2JqZWN0IFNldF1cIjtjYXNlIHRvOnJldHVyblwiW29iamVjdCBXZWFrTWFwXVwifXJldHVybiB0fSk7dmFyIGJvPW9pP2d1Okd1LHhvPU1lKGxvKSxqbz1JaXx8ZnVuY3Rpb24obix0KXtyZXR1cm4gWm4uc2V0VGltZW91dChuLHQpfSx3bz1NZShzbyksbW89ZnVuY3Rpb24obil7bj1sdShuLGZ1bmN0aW9uKG4pe3JldHVybiA1MDA9PT10LnNpemUmJnQuY2xlYXIoKSxufSk7dmFyIHQ9bi5jYWNoZTtyZXR1cm4gbn0oZnVuY3Rpb24obil7dmFyIHQ9W107cmV0dXJuIGVuLnRlc3QobikmJnQucHVzaChcIlwiKSxuLnJlcGxhY2UodW4sZnVuY3Rpb24obixyLGUsdSl7XG50LnB1c2goZT91LnJlcGxhY2Uodm4sXCIkMVwiKTpyfHxuKX0pLHR9KSxBbz1scihmdW5jdGlvbihuLHQpe3JldHVybiBfdShuKT9qdChuLGt0KHQsMSxfdSx0cnVlKSk6W119KSxrbz1scihmdW5jdGlvbihuLHQpe3ZhciByPUdlKHQpO3JldHVybiBfdShyKSYmKHI9RiksX3Uobik/anQobixrdCh0LDEsX3UsdHJ1ZSksamUociwyKSk6W119KSxFbz1scihmdW5jdGlvbihuLHQpe3ZhciByPUdlKHQpO3JldHVybiBfdShyKSYmKHI9RiksX3Uobik/anQobixrdCh0LDEsX3UsdHJ1ZSksRixyKTpbXX0pLE9vPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PWwobixTcik7cmV0dXJuIHQubGVuZ3RoJiZ0WzBdPT09blswXT9VdCh0KTpbXX0pLFNvPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PUdlKG4pLHI9bChuLFNyKTtyZXR1cm4gdD09PUdlKHIpP3Q9RjpyLnBvcCgpLHIubGVuZ3RoJiZyWzBdPT09blswXT9VdChyLGplKHQsMikpOltdfSksSW89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobikscj1sKG4sU3IpO3JldHVybih0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGKSYmci5wb3AoKSxcbnIubGVuZ3RoJiZyWzBdPT09blswXT9VdChyLEYsdCk6W119KSxSbz1scihIZSksem89Z2UoZnVuY3Rpb24obix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGgsZT12dChuLHQpO3JldHVybiBmcihuLGwodCxmdW5jdGlvbihuKXtyZXR1cm4gUmUobixyKT8rbjpufSkuc29ydChVcikpLGV9KSxXbz1scihmdW5jdGlvbihuKXtyZXR1cm4gd3Ioa3QobiwxLF91LHRydWUpKX0pLEJvPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PUdlKG4pO3JldHVybiBfdSh0KSYmKHQ9Riksd3Ioa3QobiwxLF91LHRydWUpLGplKHQsMikpfSksTG89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2UobiksdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RjtyZXR1cm4gd3Ioa3QobiwxLF91LHRydWUpLEYsdCl9KSxVbz1scihmdW5jdGlvbihuLHQpe3JldHVybiBfdShuKT9qdChuLHQpOltdfSksQ289bHIoZnVuY3Rpb24obil7cmV0dXJuIEVyKGYobixfdSkpfSksRG89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobik7cmV0dXJuIF91KHQpJiYodD1GKSxcbkVyKGYobixfdSksamUodCwyKSl9KSxNbz1scihmdW5jdGlvbihuKXt2YXIgdD1HZShuKSx0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGO3JldHVybiBFcihmKG4sX3UpLEYsdCl9KSxUbz1scihZZSksJG89bHIoZnVuY3Rpb24obil7dmFyIHQ9bi5sZW5ndGgsdD0xPHQ/blt0LTFdOkYsdD10eXBlb2YgdD09XCJmdW5jdGlvblwiPyhuLnBvcCgpLHQpOkY7cmV0dXJuIFFlKG4sdCl9KSxGbz1nZShmdW5jdGlvbihuKXtmdW5jdGlvbiB0KHQpe3JldHVybiB2dCh0LG4pfXZhciByPW4ubGVuZ3RoLGU9cj9uWzBdOjAsdT10aGlzLl9fd3JhcHBlZF9fO3JldHVybiEoMTxyfHx0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCkmJnUgaW5zdGFuY2VvZiBNbiYmUmUoZSk/KHU9dS5zbGljZShlLCtlKyhyPzE6MCkpLHUuX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpudSxhcmdzOlt0XSx0aGlzQXJnOkZ9KSxuZXcgem4odSx0aGlzLl9fY2hhaW5fXykudGhydShmdW5jdGlvbihuKXtyZXR1cm4gciYmIW4ubGVuZ3RoJiZuLnB1c2goRiksXG5ufSkpOnRoaXMudGhydSh0KX0pLE5vPU5yKGZ1bmN0aW9uKG4sdCxyKXtjaS5jYWxsKG4scik/KytuW3JdOl90KG4sciwxKX0pLFBvPVlyKFplKSxabz1ZcihxZSkscW89TnIoZnVuY3Rpb24obix0LHIpe2NpLmNhbGwobixyKT9uW3JdLnB1c2godCk6X3QobixyLFt0XSl9KSxWbz1scihmdW5jdGlvbihuLHQsZSl7dmFyIHU9LTEsaT10eXBlb2YgdD09XCJmdW5jdGlvblwiLG89cHUobik/SHUobi5sZW5ndGgpOltdO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4pe29bKyt1XT1pP3IodCxuLGUpOkR0KG4sdCxlKX0pLG99KSxLbz1OcihmdW5jdGlvbihuLHQscil7X3QobixyLHQpfSksR289TnIoZnVuY3Rpb24obix0LHIpe25bcj8wOjFdLnB1c2godCl9LGZ1bmN0aW9uKCl7cmV0dXJuW1tdLFtdXX0pLEhvPWxyKGZ1bmN0aW9uKG4sdCl7aWYobnVsbD09bilyZXR1cm5bXTt2YXIgcj10Lmxlbmd0aDtyZXR1cm4gMTxyJiZ6ZShuLHRbMF0sdFsxXSk/dD1bXToyPHImJnplKHRbMF0sdFsxXSx0WzJdKSYmKHQ9W3RbMF1dKSxcbnJyKG4sa3QodCwxKSxbXSl9KSxKbz1TaXx8ZnVuY3Rpb24oKXtyZXR1cm4gWm4uRGF0ZS5ub3coKX0sWW89bHIoZnVuY3Rpb24obix0LHIpe3ZhciBlPTE7aWYoci5sZW5ndGgpdmFyIHU9QyhyLHhlKFlvKSksZT0zMnxlO3JldHVybiBsZShuLGUsdCxyLHUpfSksUW89bHIoZnVuY3Rpb24obix0LHIpe3ZhciBlPTM7aWYoci5sZW5ndGgpdmFyIHU9QyhyLHhlKFFvKSksZT0zMnxlO3JldHVybiBsZSh0LGUsbixyLHUpfSksWG89bHIoZnVuY3Rpb24obix0KXtyZXR1cm4geHQobiwxLHQpfSksbmY9bHIoZnVuY3Rpb24obix0LHIpe3JldHVybiB4dChuLEl1KHQpfHwwLHIpfSk7bHUuQ2FjaGU9UG47dmFyIHRmPWxyKGZ1bmN0aW9uKG4sdCl7dD0xPT10Lmxlbmd0aCYmYWYodFswXSk/bCh0WzBdLFMoamUoKSkpOmwoa3QodCwxKSxTKGplKCkpKTt2YXIgZT10Lmxlbmd0aDtyZXR1cm4gbHIoZnVuY3Rpb24odSl7Zm9yKHZhciBpPS0xLG89TWkodS5sZW5ndGgsZSk7KytpPG87KXVbaV09dFtpXS5jYWxsKHRoaXMsdVtpXSk7XG5yZXR1cm4gcihuLHRoaXMsdSl9KX0pLHJmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sMzIsRix0LEModCx4ZShyZikpKX0pLGVmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sNjQsRix0LEModCx4ZShlZikpKX0pLHVmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sMjU2LEYsRixGLHQpfSksb2Y9b2UoV3QpLGZmPW9lKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4+PXR9KSxjZj1NdChmdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHN9KCkpP010OmZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmY2kuY2FsbChuLFwiY2FsbGVlXCIpJiYhamkuY2FsbChuLFwiY2FsbGVlXCIpfSxhZj1IdS5pc0FycmF5LGxmPUhuP1MoSG4pOlR0LHNmPUJpfHxHdSxoZj1Kbj9TKEpuKTokdCxwZj1Zbj9TKFluKTpOdCxfZj1Rbj9TKFFuKTpxdCx2Zj1Ybj9TKFhuKTpWdCxnZj1udD9TKG50KTpLdCxkZj1vZShKdCkseWY9b2UoZnVuY3Rpb24obix0KXtyZXR1cm4gbjw9dH0pLGJmPVByKGZ1bmN0aW9uKG4sdCl7XG5pZihMZSh0KXx8cHUodCkpVHIodCxMdSh0KSxuKTtlbHNlIGZvcih2YXIgciBpbiB0KWNpLmNhbGwodCxyKSYmYXQobixyLHRbcl0pfSkseGY9UHIoZnVuY3Rpb24obix0KXtUcih0LFV1KHQpLG4pfSksamY9UHIoZnVuY3Rpb24obix0LHIsZSl7VHIodCxVdSh0KSxuLGUpfSksd2Y9UHIoZnVuY3Rpb24obix0LHIsZSl7VHIodCxMdSh0KSxuLGUpfSksbWY9Z2UodnQpLEFmPWxyKGZ1bmN0aW9uKG4pe3JldHVybiBuLnB1c2goRixzZSkscihqZixGLG4pfSksa2Y9bHIoZnVuY3Rpb24obil7cmV0dXJuIG4ucHVzaChGLGhlKSxyKFJmLEYsbil9KSxFZj1uZShmdW5jdGlvbihuLHQscil7blt0XT1yfSxGdShOdSkpLE9mPW5lKGZ1bmN0aW9uKG4sdCxyKXtjaS5jYWxsKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSxqZSksU2Y9bHIoRHQpLElmPVByKGZ1bmN0aW9uKG4sdCxyKXtucihuLHQscil9KSxSZj1QcihmdW5jdGlvbihuLHQscixlKXtucihuLHQscixlKX0pLHpmPWdlKGZ1bmN0aW9uKG4sdCl7XG52YXIgcj17fTtpZihudWxsPT1uKXJldHVybiByO3ZhciBlPWZhbHNlO3Q9bCh0LGZ1bmN0aW9uKHQpe3JldHVybiB0PVJyKHQsbiksZXx8KGU9MTx0Lmxlbmd0aCksdH0pLFRyKG4seWUobiksciksZSYmKHI9ZHQociw3LHBlKSk7Zm9yKHZhciB1PXQubGVuZ3RoO3UtLTspbXIocix0W3VdKTtyZXR1cm4gcn0pLFdmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/e306ZXIobix0KX0pLEJmPWFlKEx1KSxMZj1hZShVdSksVWY9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXQudG9Mb3dlckNhc2UoKSxuKyhyP011KHQpOnQpfSksQ2Y9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiBuKyhyP1wiLVwiOlwiXCIpK3QudG9Mb3dlckNhc2UoKX0pLERmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIiBcIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCl9KSxNZj1LcihcInRvTG93ZXJDYXNlXCIpLFRmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIl9cIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCk7XG59KSwkZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrTmYodCl9KSxGZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrdC50b1VwcGVyQ2FzZSgpfSksTmY9S3IoXCJ0b1VwcGVyQ2FzZVwiKSxQZj1scihmdW5jdGlvbihuLHQpe3RyeXtyZXR1cm4gcihuLEYsdCl9Y2F0Y2gobil7cmV0dXJuIHZ1KG4pP246bmV3IFl1KG4pfX0pLFpmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIHUodCxmdW5jdGlvbih0KXt0PSRlKHQpLF90KG4sdCxZbyhuW3RdLG4pKX0pLG59KSxxZj1RcigpLFZmPVFyKHRydWUpLEtmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBEdChyLG4sdCl9fSksR2Y9bHIoZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIER0KG4scix0KX19KSxIZj1yZShsKSxKZj1yZShvKSxZZj1yZShfKSxRZj1pZSgpLFhmPWllKHRydWUpLG5jPXRlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4rdH0sMCksdGM9Y2UoXCJjZWlsXCIpLHJjPXRlKGZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4gbi90fSwxKSxlYz1jZShcImZsb29yXCIpLHVjPXRlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4qdH0sMSksaWM9Y2UoXCJyb3VuZFwiKSxvYz10ZShmdW5jdGlvbihuLHQpe3JldHVybiBuLXR9LDApO3JldHVybiBPbi5hZnRlcj1mdW5jdGlvbihuLHQpe2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gbj1PdShuKSxmdW5jdGlvbigpe2lmKDE+LS1uKXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LE9uLmFyeT1pdSxPbi5hc3NpZ249YmYsT24uYXNzaWduSW49eGYsT24uYXNzaWduSW5XaXRoPWpmLE9uLmFzc2lnbldpdGg9d2YsT24uYXQ9bWYsT24uYmVmb3JlPW91LE9uLmJpbmQ9WW8sT24uYmluZEFsbD1aZixPbi5iaW5kS2V5PVFvLE9uLmNhc3RBcnJheT1mdW5jdGlvbigpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybltdO3ZhciBuPWFyZ3VtZW50c1swXTtyZXR1cm4gYWYobik/bjpbbl19LFxuT24uY2hhaW49WGUsT24uY2h1bms9ZnVuY3Rpb24obix0LHIpe2lmKHQ9KHI/emUobix0LHIpOnQ9PT1GKT8xOkRpKE91KHQpLDApLHI9bnVsbD09bj8wOm4ubGVuZ3RoLCFyfHwxPnQpcmV0dXJuW107Zm9yKHZhciBlPTAsdT0wLGk9SHUoUmkoci90KSk7ZTxyOylpW3UrK109dnIobixlLGUrPXQpO3JldHVybiBpfSxPbi5jb21wYWN0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aCxlPTAsdT1bXTsrK3Q8cjspe3ZhciBpPW5bdF07aSYmKHVbZSsrXT1pKX1yZXR1cm4gdX0sT24uY29uY2F0PWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aDtpZighbilyZXR1cm5bXTtmb3IodmFyIHQ9SHUobi0xKSxyPWFyZ3VtZW50c1swXTtuLS07KXRbbi0xXT1hcmd1bWVudHNbbl07cmV0dXJuIHMoYWYocik/TXIocik6W3JdLGt0KHQsMSkpfSxPbi5jb25kPWZ1bmN0aW9uKG4pe3ZhciB0PW51bGw9PW4/MDpuLmxlbmd0aCxlPWplKCk7cmV0dXJuIG49dD9sKG4sZnVuY3Rpb24obil7XG5pZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuWzFdKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuW2UoblswXSksblsxXV19KTpbXSxscihmdW5jdGlvbihlKXtmb3IodmFyIHU9LTE7Kyt1PHQ7KXt2YXIgaT1uW3VdO2lmKHIoaVswXSx0aGlzLGUpKXJldHVybiByKGlbMV0sdGhpcyxlKX19KX0sT24uY29uZm9ybXM9ZnVuY3Rpb24obil7cmV0dXJuIHl0KGR0KG4sMSkpfSxPbi5jb25zdGFudD1GdSxPbi5jb3VudEJ5PU5vLE9uLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWlvKG4pO3JldHVybiBudWxsPT10P3I6aHQocix0KX0sT24uY3Vycnk9ZnUsT24uY3VycnlSaWdodD1jdSxPbi5kZWJvdW5jZT1hdSxPbi5kZWZhdWx0cz1BZixPbi5kZWZhdWx0c0RlZXA9a2YsT24uZGVmZXI9WG8sT24uZGVsYXk9bmYsT24uZGlmZmVyZW5jZT1BbyxPbi5kaWZmZXJlbmNlQnk9a28sT24uZGlmZmVyZW5jZVdpdGg9RW8sT24uZHJvcD1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO1xucmV0dXJuIGU/KHQ9cnx8dD09PUY/MTpPdSh0KSx2cihuLDA+dD8wOnQsZSkpOltdfSxPbi5kcm9wUmlnaHQ9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8odD1yfHx0PT09Rj8xOk91KHQpLHQ9ZS10LHZyKG4sMCwwPnQ/MDp0KSk6W119LE9uLmRyb3BSaWdodFdoaWxlPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP0FyKG4samUodCwzKSx0cnVlLHRydWUpOltdfSxPbi5kcm9wV2hpbGU9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/QXIobixqZSh0LDMpLHRydWUpOltdfSxPbi5maWxsPWZ1bmN0aW9uKG4sdCxyLGUpe3ZhciB1PW51bGw9PW4/MDpuLmxlbmd0aDtpZighdSlyZXR1cm5bXTtmb3IociYmdHlwZW9mIHIhPVwibnVtYmVyXCImJnplKG4sdCxyKSYmKHI9MCxlPXUpLHU9bi5sZW5ndGgscj1PdShyKSwwPnImJihyPS1yPnU/MDp1K3IpLGU9ZT09PUZ8fGU+dT91Ok91KGUpLDA+ZSYmKGUrPXUpLGU9cj5lPzA6U3UoZSk7cjxlOyluW3IrK109dDtcbnJldHVybiBufSxPbi5maWx0ZXI9ZnVuY3Rpb24obix0KXtyZXR1cm4oYWYobik/ZjpBdCkobixqZSh0LDMpKX0sT24uZmxhdE1hcD1mdW5jdGlvbihuLHQpe3JldHVybiBrdCh1dShuLHQpLDEpfSxPbi5mbGF0TWFwRGVlcD1mdW5jdGlvbihuLHQpe3JldHVybiBrdCh1dShuLHQpLE4pfSxPbi5mbGF0TWFwRGVwdGg9ZnVuY3Rpb24obix0LHIpe3JldHVybiByPXI9PT1GPzE6T3Uociksa3QodXUobix0KSxyKX0sT24uZmxhdHRlbj1WZSxPbi5mbGF0dGVuRGVlcD1mdW5jdGlvbihuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9rdChuLE4pOltdfSxPbi5mbGF0dGVuRGVwdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbCE9biYmbi5sZW5ndGg/KHQ9dD09PUY/MTpPdSh0KSxrdChuLHQpKTpbXX0sT24uZmxpcD1mdW5jdGlvbihuKXtyZXR1cm4gbGUobiw1MTIpfSxPbi5mbG93PXFmLE9uLmZsb3dSaWdodD1WZixPbi5mcm9tUGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciB0PS0xLHI9bnVsbD09bj8wOm4ubGVuZ3RoLGU9e307Kyt0PHI7KXtcbnZhciB1PW5bdF07ZVt1WzBdXT11WzFdfXJldHVybiBlfSxPbi5mdW5jdGlvbnM9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106U3QobixMdShuKSl9LE9uLmZ1bmN0aW9uc0luPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1tdOlN0KG4sVXUobikpfSxPbi5ncm91cEJ5PXFvLE9uLmluaXRpYWw9ZnVuY3Rpb24obil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/dnIobiwwLC0xKTpbXX0sT24uaW50ZXJzZWN0aW9uPU9vLE9uLmludGVyc2VjdGlvbkJ5PVNvLE9uLmludGVyc2VjdGlvbldpdGg9SW8sT24uaW52ZXJ0PUVmLE9uLmludmVydEJ5PU9mLE9uLmludm9rZU1hcD1WbyxPbi5pdGVyYXRlZT1QdSxPbi5rZXlCeT1LbyxPbi5rZXlzPUx1LE9uLmtleXNJbj1VdSxPbi5tYXA9dXUsT24ubWFwS2V5cz1mdW5jdGlvbihuLHQpe3ZhciByPXt9O3JldHVybiB0PWplKHQsMyksRXQobixmdW5jdGlvbihuLGUsdSl7X3Qocix0KG4sZSx1KSxuKX0pLHJ9LE9uLm1hcFZhbHVlcz1mdW5jdGlvbihuLHQpe1xudmFyIHI9e307cmV0dXJuIHQ9amUodCwzKSxFdChuLGZ1bmN0aW9uKG4sZSx1KXtfdChyLGUsdChuLGUsdSkpfSkscn0sT24ubWF0Y2hlcz1mdW5jdGlvbihuKXtyZXR1cm4gUXQoZHQobiwxKSl9LE9uLm1hdGNoZXNQcm9wZXJ0eT1mdW5jdGlvbihuLHQpe3JldHVybiBYdChuLGR0KHQsMSkpfSxPbi5tZW1vaXplPWx1LE9uLm1lcmdlPUlmLE9uLm1lcmdlV2l0aD1SZixPbi5tZXRob2Q9S2YsT24ubWV0aG9kT2Y9R2YsT24ubWl4aW49WnUsT24ubmVnYXRlPXN1LE9uLm50aEFyZz1mdW5jdGlvbihuKXtyZXR1cm4gbj1PdShuKSxscihmdW5jdGlvbih0KXtyZXR1cm4gdHIodCxuKX0pfSxPbi5vbWl0PXpmLE9uLm9taXRCeT1mdW5jdGlvbihuLHQpe3JldHVybiBDdShuLHN1KGplKHQpKSl9LE9uLm9uY2U9ZnVuY3Rpb24obil7cmV0dXJuIG91KDIsbil9LE9uLm9yZGVyQnk9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIG51bGw9PW4/W106KGFmKHQpfHwodD1udWxsPT10P1tdOlt0XSksXG5yPWU/RjpyLGFmKHIpfHwocj1udWxsPT1yP1tdOltyXSkscnIobix0LHIpKX0sT24ub3Zlcj1IZixPbi5vdmVyQXJncz10ZixPbi5vdmVyRXZlcnk9SmYsT24ub3ZlclNvbWU9WWYsT24ucGFydGlhbD1yZixPbi5wYXJ0aWFsUmlnaHQ9ZWYsT24ucGFydGl0aW9uPUdvLE9uLnBpY2s9V2YsT24ucGlja0J5PUN1LE9uLnByb3BlcnR5PVZ1LE9uLnByb3BlcnR5T2Y9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT1uP0Y6SXQobix0KX19LE9uLnB1bGw9Um8sT24ucHVsbEFsbD1IZSxPbi5wdWxsQWxsQnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aCYmdCYmdC5sZW5ndGg/b3Iobix0LGplKHIsMikpOm59LE9uLnB1bGxBbGxXaXRoPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbiYmbi5sZW5ndGgmJnQmJnQubGVuZ3RoP29yKG4sdCxGLHIpOm59LE9uLnB1bGxBdD16byxPbi5yYW5nZT1RZixPbi5yYW5nZVJpZ2h0PVhmLE9uLnJlYXJnPXVmLE9uLnJlamVjdD1mdW5jdGlvbihuLHQpe1xucmV0dXJuKGFmKG4pP2Y6QXQpKG4sc3UoamUodCwzKSkpfSxPbi5yZW1vdmU9ZnVuY3Rpb24obix0KXt2YXIgcj1bXTtpZighbnx8IW4ubGVuZ3RoKXJldHVybiByO3ZhciBlPS0xLHU9W10saT1uLmxlbmd0aDtmb3IodD1qZSh0LDMpOysrZTxpOyl7dmFyIG89bltlXTt0KG8sZSxuKSYmKHIucHVzaChvKSx1LnB1c2goZSkpfXJldHVybiBmcihuLHUpLHJ9LE9uLnJlc3Q9ZnVuY3Rpb24obix0KXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9dD09PUY/dDpPdSh0KSxscihuLHQpfSxPbi5yZXZlcnNlPUplLE9uLnNhbXBsZVNpemU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PShyP3plKG4sdCxyKTp0PT09Rik/MTpPdSh0KSwoYWYobik/b3Q6aHIpKG4sdCl9LE9uLnNldD1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PW4/bjpwcihuLHQscil9LE9uLnNldFdpdGg9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIGU9dHlwZW9mIGU9PVwiZnVuY3Rpb25cIj9lOkYsXG5udWxsPT1uP246cHIobix0LHIsZSl9LE9uLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuKGFmKG4pP2Z0Ol9yKShuKX0sT24uc2xpY2U9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8ociYmdHlwZW9mIHIhPVwibnVtYmVyXCImJnplKG4sdCxyKT8odD0wLHI9ZSk6KHQ9bnVsbD09dD8wOk91KHQpLHI9cj09PUY/ZTpPdShyKSksdnIobix0LHIpKTpbXX0sT24uc29ydEJ5PUhvLE9uLnNvcnRlZFVuaXE9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP2JyKG4pOltdfSxPbi5zb3J0ZWRVbmlxQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/YnIobixqZSh0LDIpKTpbXX0sT24uc3BsaXQ9ZnVuY3Rpb24obix0LHIpe3JldHVybiByJiZ0eXBlb2YgciE9XCJudW1iZXJcIiYmemUobix0LHIpJiYodD1yPUYpLHI9cj09PUY/NDI5NDk2NzI5NTpyPj4+MCxyPyhuPXp1KG4pKSYmKHR5cGVvZiB0PT1cInN0cmluZ1wifHxudWxsIT10JiYhX2YodCkpJiYodD1qcih0KSxcbiF0JiZCbi50ZXN0KG4pKT96cigkKG4pLDAscik6bi5zcGxpdCh0LHIpOltdfSxPbi5zcHJlYWQ9ZnVuY3Rpb24obix0KXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9bnVsbD09dD8wOkRpKE91KHQpLDApLGxyKGZ1bmN0aW9uKGUpe3ZhciB1PWVbdF07cmV0dXJuIGU9enIoZSwwLHQpLHUmJnMoZSx1KSxyKG4sdGhpcyxlKX0pfSxPbi50YWlsPWZ1bmN0aW9uKG4pe3ZhciB0PW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gdD92cihuLDEsdCk6W119LE9uLnRha2U9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aD8odD1yfHx0PT09Rj8xOk91KHQpLHZyKG4sMCwwPnQ/MDp0KSk6W119LE9uLnRha2VSaWdodD1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyh0PXJ8fHQ9PT1GPzE6T3UodCksdD1lLXQsdnIobiwwPnQ/MDp0LGUpKTpbXX0sT24udGFrZVJpZ2h0V2hpbGU9ZnVuY3Rpb24obix0KXtcbnJldHVybiBuJiZuLmxlbmd0aD9BcihuLGplKHQsMyksZmFsc2UsdHJ1ZSk6W119LE9uLnRha2VXaGlsZT1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD9BcihuLGplKHQsMykpOltdfSxPbi50YXA9ZnVuY3Rpb24obix0KXtyZXR1cm4gdChuKSxufSxPbi50aHJvdHRsZT1mdW5jdGlvbihuLHQscil7dmFyIGU9dHJ1ZSx1PXRydWU7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBidShyKSYmKGU9XCJsZWFkaW5nXCJpbiByPyEhci5sZWFkaW5nOmUsdT1cInRyYWlsaW5nXCJpbiByPyEhci50cmFpbGluZzp1KSxhdShuLHQse2xlYWRpbmc6ZSxtYXhXYWl0OnQsdHJhaWxpbmc6dX0pfSxPbi50aHJ1PW51LE9uLnRvQXJyYXk9a3UsT24udG9QYWlycz1CZixPbi50b1BhaXJzSW49TGYsT24udG9QYXRoPWZ1bmN0aW9uKG4pe3JldHVybiBhZihuKT9sKG4sJGUpOkF1KG4pP1tuXTpNcihtbyh6dShuKSkpfSxPbi50b1BsYWluT2JqZWN0PVJ1LFxuT24udHJhbnNmb3JtPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKSxpPWV8fHNmKG4pfHxnZihuKTtpZih0PWplKHQsNCksbnVsbD09cil7dmFyIG89biYmbi5jb25zdHJ1Y3RvcjtyPWk/ZT9uZXcgbzpbXTpidShuKSYmZ3Uobyk/aW8oYmkobikpOnt9fXJldHVybihpP3U6RXQpKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiB0KHIsbixlLHUpfSkscn0sT24udW5hcnk9ZnVuY3Rpb24obil7cmV0dXJuIGl1KG4sMSl9LE9uLnVuaW9uPVdvLE9uLnVuaW9uQnk9Qm8sT24udW5pb25XaXRoPUxvLE9uLnVuaXE9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP3dyKG4pOltdfSxPbi51bmlxQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/d3IobixqZSh0LDIpKTpbXX0sT24udW5pcVdpdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RixuJiZuLmxlbmd0aD93cihuLEYsdCk6W119LE9uLnVuc2V0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW58fG1yKG4sdCk7XG59LE9uLnVuemlwPVllLE9uLnVuemlwV2l0aD1RZSxPbi51cGRhdGU9ZnVuY3Rpb24obix0LHIpe3JldHVybiBudWxsPT1uP246cHIobix0LElyKHIpKEl0KG4sdCkpLHZvaWQgMCl9LE9uLnVwZGF0ZVdpdGg9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIGU9dHlwZW9mIGU9PVwiZnVuY3Rpb25cIj9lOkYsbnVsbCE9biYmKG49cHIobix0LElyKHIpKEl0KG4sdCkpLGUpKSxufSxPbi52YWx1ZXM9RHUsT24udmFsdWVzSW49ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106SShuLFV1KG4pKX0sT24ud2l0aG91dD1VbyxPbi53b3Jkcz0kdSxPbi53cmFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHJmKElyKHQpLG4pfSxPbi54b3I9Q28sT24ueG9yQnk9RG8sT24ueG9yV2l0aD1NbyxPbi56aXA9VG8sT24uemlwT2JqZWN0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIE9yKG58fFtdLHR8fFtdLGF0KX0sT24uemlwT2JqZWN0RGVlcD1mdW5jdGlvbihuLHQpe3JldHVybiBPcihufHxbXSx0fHxbXSxwcik7XG59LE9uLnppcFdpdGg9JG8sT24uZW50cmllcz1CZixPbi5lbnRyaWVzSW49TGYsT24uZXh0ZW5kPXhmLE9uLmV4dGVuZFdpdGg9amYsWnUoT24sT24pLE9uLmFkZD1uYyxPbi5hdHRlbXB0PVBmLE9uLmNhbWVsQ2FzZT1VZixPbi5jYXBpdGFsaXplPU11LE9uLmNlaWw9dGMsT24uY2xhbXA9ZnVuY3Rpb24obix0LHIpe3JldHVybiByPT09RiYmKHI9dCx0PUYpLHIhPT1GJiYocj1JdShyKSxyPXI9PT1yP3I6MCksdCE9PUYmJih0PUl1KHQpLHQ9dD09PXQ/dDowKSxndChJdShuKSx0LHIpfSxPbi5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gZHQobiw0KX0sT24uY2xvbmVEZWVwPWZ1bmN0aW9uKG4pe3JldHVybiBkdChuLDUpfSxPbi5jbG9uZURlZXBXaXRoPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQ9dHlwZW9mIHQ9PVwiZnVuY3Rpb25cIj90OkYsZHQobiw1LHQpfSxPbi5jbG9uZVdpdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RixkdChuLDQsdCl9LFxuT24uY29uZm9ybXNUbz1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT10fHxidChuLHQsTHUodCkpfSxPbi5kZWJ1cnI9VHUsT24uZGVmYXVsdFRvPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW58fG4hPT1uP3Q6bn0sT24uZGl2aWRlPXJjLE9uLmVuZHNXaXRoPWZ1bmN0aW9uKG4sdCxyKXtuPXp1KG4pLHQ9anIodCk7dmFyIGU9bi5sZW5ndGgsZT1yPXI9PT1GP2U6Z3QoT3UociksMCxlKTtyZXR1cm4gci09dC5sZW5ndGgsMDw9ciYmbi5zbGljZShyLGUpPT10fSxPbi5lcT1odSxPbi5lc2NhcGU9ZnVuY3Rpb24obil7cmV0dXJuKG49enUobikpJiZZLnRlc3Qobik/bi5yZXBsYWNlKEgsZXQpOm59LE9uLmVzY2FwZVJlZ0V4cD1mdW5jdGlvbihuKXtyZXR1cm4obj16dShuKSkmJmZuLnRlc3Qobik/bi5yZXBsYWNlKG9uLFwiXFxcXCQmXCIpOm59LE9uLmV2ZXJ5PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKT9vOnd0O3JldHVybiByJiZ6ZShuLHQscikmJih0PUYpLGUobixqZSh0LDMpKTtcbn0sT24uZmluZD1QbyxPbi5maW5kSW5kZXg9WmUsT24uZmluZEtleT1mdW5jdGlvbihuLHQpe3JldHVybiB2KG4samUodCwzKSxFdCl9LE9uLmZpbmRMYXN0PVpvLE9uLmZpbmRMYXN0SW5kZXg9cWUsT24uZmluZExhc3RLZXk9ZnVuY3Rpb24obix0KXtyZXR1cm4gdihuLGplKHQsMyksT3QpfSxPbi5mbG9vcj1lYyxPbi5mb3JFYWNoPXJ1LE9uLmZvckVhY2hSaWdodD1ldSxPbi5mb3JJbj1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP246Y28obixqZSh0LDMpLFV1KX0sT24uZm9ySW5SaWdodD1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP246YW8obixqZSh0LDMpLFV1KX0sT24uZm9yT3duPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJkV0KG4samUodCwzKSl9LE9uLmZvck93blJpZ2h0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJk90KG4samUodCwzKSl9LE9uLmdldD1XdSxPbi5ndD1vZixPbi5ndGU9ZmYsT24uaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGwhPW4mJmtlKG4sdCxCdCk7XG59LE9uLmhhc0luPUJ1LE9uLmhlYWQ9S2UsT24uaWRlbnRpdHk9TnUsT24uaW5jbHVkZXM9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIG49cHUobik/bjpEdShuKSxyPXImJiFlP091KHIpOjAsZT1uLmxlbmd0aCwwPnImJihyPURpKGUrciwwKSksbXUobik/cjw9ZSYmLTE8bi5pbmRleE9mKHQscik6ISFlJiYtMTxkKG4sdCxyKX0sT24uaW5kZXhPZj1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyhyPW51bGw9PXI/MDpPdShyKSwwPnImJihyPURpKGUrciwwKSksZChuLHQscikpOi0xfSxPbi5pblJhbmdlPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD1FdSh0KSxyPT09Rj8ocj10LHQ9MCk6cj1FdShyKSxuPUl1KG4pLG4+PU1pKHQscikmJm48RGkodCxyKX0sT24uaW52b2tlPVNmLE9uLmlzQXJndW1lbnRzPWNmLE9uLmlzQXJyYXk9YWYsT24uaXNBcnJheUJ1ZmZlcj1sZixPbi5pc0FycmF5TGlrZT1wdSxPbi5pc0FycmF5TGlrZU9iamVjdD1fdSxcbk9uLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4gdHJ1ZT09PW58fGZhbHNlPT09bnx8eHUobikmJlwiW29iamVjdCBCb29sZWFuXVwiPT16dChuKX0sT24uaXNCdWZmZXI9c2YsT24uaXNEYXRlPWhmLE9uLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4geHUobikmJjE9PT1uLm5vZGVUeXBlJiYhd3Uobil9LE9uLmlzRW1wdHk9ZnVuY3Rpb24obil7aWYobnVsbD09bilyZXR1cm4gdHJ1ZTtpZihwdShuKSYmKGFmKG4pfHx0eXBlb2Ygbj09XCJzdHJpbmdcInx8dHlwZW9mIG4uc3BsaWNlPT1cImZ1bmN0aW9uXCJ8fHNmKG4pfHxnZihuKXx8Y2YobikpKXJldHVybiFuLmxlbmd0aDt2YXIgdD15byhuKTtpZihcIltvYmplY3QgTWFwXVwiPT10fHxcIltvYmplY3QgU2V0XVwiPT10KXJldHVybiFuLnNpemU7aWYoTGUobikpcmV0dXJuIUh0KG4pLmxlbmd0aDtmb3IodmFyIHIgaW4gbilpZihjaS5jYWxsKG4scikpcmV0dXJuIGZhbHNlO3JldHVybiB0cnVlfSxPbi5pc0VxdWFsPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIEZ0KG4sdCk7XG59LE9uLmlzRXF1YWxXaXRoPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT0ocj10eXBlb2Ygcj09XCJmdW5jdGlvblwiP3I6Rik/cihuLHQpOkY7cmV0dXJuIGU9PT1GP0Z0KG4sdCxGLHIpOiEhZX0sT24uaXNFcnJvcj12dSxPbi5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCImJkxpKG4pfSxPbi5pc0Z1bmN0aW9uPWd1LE9uLmlzSW50ZWdlcj1kdSxPbi5pc0xlbmd0aD15dSxPbi5pc01hcD1wZixPbi5pc01hdGNoPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG49PT10fHxQdChuLHQsbWUodCkpfSxPbi5pc01hdGNoV2l0aD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHI9dHlwZW9mIHI9PVwiZnVuY3Rpb25cIj9yOkYsUHQobix0LG1lKHQpLHIpfSxPbi5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4ganUobikmJm4hPStufSxPbi5pc05hdGl2ZT1mdW5jdGlvbihuKXtpZihibyhuKSl0aHJvdyBuZXcgWXUoXCJVbnN1cHBvcnRlZCBjb3JlLWpzIHVzZS4gVHJ5IGh0dHBzOi8vbnBtcy5pby9zZWFyY2g/cT1wb255ZmlsbC5cIik7XG5yZXR1cm4gWnQobil9LE9uLmlzTmlsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufSxPbi5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxPbi5pc051bWJlcj1qdSxPbi5pc09iamVjdD1idSxPbi5pc09iamVjdExpa2U9eHUsT24uaXNQbGFpbk9iamVjdD13dSxPbi5pc1JlZ0V4cD1fZixPbi5pc1NhZmVJbnRlZ2VyPWZ1bmN0aW9uKG4pe3JldHVybiBkdShuKSYmLTkwMDcxOTkyNTQ3NDA5OTE8PW4mJjkwMDcxOTkyNTQ3NDA5OTE+PW59LE9uLmlzU2V0PXZmLE9uLmlzU3RyaW5nPW11LE9uLmlzU3ltYm9sPUF1LE9uLmlzVHlwZWRBcnJheT1nZixPbi5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gbj09PUZ9LE9uLmlzV2Vha01hcD1mdW5jdGlvbihuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBXZWFrTWFwXVwiPT15byhuKX0sT24uaXNXZWFrU2V0PWZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IFdlYWtTZXRdXCI9PXp0KG4pfSxPbi5qb2luPWZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4gbnVsbD09bj9cIlwiOlVpLmNhbGwobix0KX0sT24ua2ViYWJDYXNlPUNmLE9uLmxhc3Q9R2UsT24ubGFzdEluZGV4T2Y9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtpZighZSlyZXR1cm4tMTt2YXIgdT1lO2lmKHIhPT1GJiYodT1PdShyKSx1PTA+dT9EaShlK3UsMCk6TWkodSxlLTEpKSx0PT09dCl7Zm9yKHI9dSsxO3ItLSYmbltyXSE9PXQ7KTtuPXJ9ZWxzZSBuPWcobixiLHUsdHJ1ZSk7cmV0dXJuIG59LE9uLmxvd2VyQ2FzZT1EZixPbi5sb3dlckZpcnN0PU1mLE9uLmx0PWRmLE9uLmx0ZT15ZixPbi5tYXg9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4sTnUsV3QpOkZ9LE9uLm1heEJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4samUodCwyKSxXdCk6Rn0sT24ubWVhbj1mdW5jdGlvbihuKXtyZXR1cm4geChuLE51KX0sT24ubWVhbkJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHgobixqZSh0LDIpKX0sT24ubWluPWZ1bmN0aW9uKG4pe1xucmV0dXJuIG4mJm4ubGVuZ3RoP210KG4sTnUsSnQpOkZ9LE9uLm1pbkJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4samUodCwyKSxKdCk6Rn0sT24uc3R1YkFycmF5PUt1LE9uLnN0dWJGYWxzZT1HdSxPbi5zdHViT2JqZWN0PWZ1bmN0aW9uKCl7cmV0dXJue319LE9uLnN0dWJTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIlwifSxPbi5zdHViVHJ1ZT1mdW5jdGlvbigpe3JldHVybiB0cnVlfSxPbi5tdWx0aXBseT11YyxPbi5udGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/dHIobixPdSh0KSk6Rn0sT24ubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBabi5fPT09dGhpcyYmKFpuLl89cGkpLHRoaXN9LE9uLm5vb3A9cXUsT24ubm93PUpvLE9uLnBhZD1mdW5jdGlvbihuLHQscil7bj16dShuKTt2YXIgZT0odD1PdSh0KSk/VChuKTowO3JldHVybiF0fHxlPj10P246KHQ9KHQtZSkvMixlZSh6aSh0KSxyKStuK2VlKFJpKHQpLHIpKX0sT24ucGFkRW5kPWZ1bmN0aW9uKG4sdCxyKXtcbm49enUobik7dmFyIGU9KHQ9T3UodCkpP1Qobik6MDtyZXR1cm4gdCYmZTx0P24rZWUodC1lLHIpOm59LE9uLnBhZFN0YXJ0PWZ1bmN0aW9uKG4sdCxyKXtuPXp1KG4pO3ZhciBlPSh0PU91KHQpKT9UKG4pOjA7cmV0dXJuIHQmJmU8dD9lZSh0LWUscikrbjpufSxPbi5wYXJzZUludD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHJ8fG51bGw9PXQ/dD0wOnQmJih0PSt0KSwkaSh6dShuKS5yZXBsYWNlKGFuLFwiXCIpLHR8fDApfSxPbi5yYW5kb209ZnVuY3Rpb24obix0LHIpe2lmKHImJnR5cGVvZiByIT1cImJvb2xlYW5cIiYmemUobix0LHIpJiYodD1yPUYpLHI9PT1GJiYodHlwZW9mIHQ9PVwiYm9vbGVhblwiPyhyPXQsdD1GKTp0eXBlb2Ygbj09XCJib29sZWFuXCImJihyPW4sbj1GKSksbj09PUYmJnQ9PT1GPyhuPTAsdD0xKToobj1FdShuKSx0PT09Rj8odD1uLG49MCk6dD1FdSh0KSksbj50KXt2YXIgZT1uO249dCx0PWV9cmV0dXJuIHJ8fG4lMXx8dCUxPyhyPUZpKCksTWkobityKih0LW4rJG4oXCIxZS1cIisoKHIrXCJcIikubGVuZ3RoLTEpKSksdCkpOmNyKG4sdCk7XG59LE9uLnJlZHVjZT1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/aDptLHU9Mz5hcmd1bWVudHMubGVuZ3RoO3JldHVybiBlKG4samUodCw0KSxyLHUsb28pfSxPbi5yZWR1Y2VSaWdodD1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/cDptLHU9Mz5hcmd1bWVudHMubGVuZ3RoO3JldHVybiBlKG4samUodCw0KSxyLHUsZm8pfSxPbi5yZXBlYXQ9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PShyP3plKG4sdCxyKTp0PT09Rik/MTpPdSh0KSxhcih6dShuKSx0KX0sT24ucmVwbGFjZT1mdW5jdGlvbigpe3ZhciBuPWFyZ3VtZW50cyx0PXp1KG5bMF0pO3JldHVybiAzPm4ubGVuZ3RoP3Q6dC5yZXBsYWNlKG5bMV0sblsyXSl9LE9uLnJlc3VsdD1mdW5jdGlvbihuLHQscil7dD1Scih0LG4pO3ZhciBlPS0xLHU9dC5sZW5ndGg7Zm9yKHV8fCh1PTEsbj1GKTsrK2U8dTspe3ZhciBpPW51bGw9PW4/RjpuWyRlKHRbZV0pXTtpPT09RiYmKGU9dSxpPXIpLG49Z3UoaSk/aS5jYWxsKG4pOmk7XG59cmV0dXJuIG59LE9uLnJvdW5kPWljLE9uLnJ1bkluQ29udGV4dD13LE9uLnNhbXBsZT1mdW5jdGlvbihuKXtyZXR1cm4oYWYobik/dHQ6c3IpKG4pfSxPbi5zaXplPWZ1bmN0aW9uKG4pe2lmKG51bGw9PW4pcmV0dXJuIDA7aWYocHUobikpcmV0dXJuIG11KG4pP1Qobik6bi5sZW5ndGg7dmFyIHQ9eW8obik7cmV0dXJuXCJbb2JqZWN0IE1hcF1cIj09dHx8XCJbb2JqZWN0IFNldF1cIj09dD9uLnNpemU6SHQobikubGVuZ3RofSxPbi5zbmFrZUNhc2U9VGYsT24uc29tZT1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/XzpncjtyZXR1cm4gciYmemUobix0LHIpJiYodD1GKSxlKG4samUodCwzKSl9LE9uLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGRyKG4sdCl9LE9uLnNvcnRlZEluZGV4Qnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB5cihuLHQsamUociwyKSl9LE9uLnNvcnRlZEluZGV4T2Y9ZnVuY3Rpb24obix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7aWYocil7XG52YXIgZT1kcihuLHQpO2lmKGU8ciYmaHUobltlXSx0KSlyZXR1cm4gZX1yZXR1cm4tMX0sT24uc29ydGVkTGFzdEluZGV4PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGRyKG4sdCx0cnVlKX0sT24uc29ydGVkTGFzdEluZGV4Qnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB5cihuLHQsamUociwyKSx0cnVlKX0sT24uc29ydGVkTGFzdEluZGV4T2Y9ZnVuY3Rpb24obix0KXtpZihudWxsPT1uPzA6bi5sZW5ndGgpe3ZhciByPWRyKG4sdCx0cnVlKS0xO2lmKGh1KG5bcl0sdCkpcmV0dXJuIHJ9cmV0dXJuLTF9LE9uLnN0YXJ0Q2FzZT0kZixPbi5zdGFydHNXaXRoPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbj16dShuKSxyPW51bGw9PXI/MDpndChPdShyKSwwLG4ubGVuZ3RoKSx0PWpyKHQpLG4uc2xpY2UocixyK3QubGVuZ3RoKT09dH0sT24uc3VidHJhY3Q9b2MsT24uc3VtPWZ1bmN0aW9uKG4pe3JldHVybiBuJiZuLmxlbmd0aD9rKG4sTnUpOjB9LE9uLnN1bUJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP2sobixqZSh0LDIpKTowO1xufSxPbi50ZW1wbGF0ZT1mdW5jdGlvbihuLHQscil7dmFyIGU9T24udGVtcGxhdGVTZXR0aW5ncztyJiZ6ZShuLHQscikmJih0PUYpLG49enUobiksdD1qZih7fSx0LGUsc2UpLHI9amYoe30sdC5pbXBvcnRzLGUuaW1wb3J0cyxzZSk7dmFyIHUsaSxvPUx1KHIpLGY9SShyLG8pLGM9MDtyPXQuaW50ZXJwb2xhdGV8fEFuO3ZhciBhPVwiX19wKz0nXCI7cj10aSgodC5lc2NhcGV8fEFuKS5zb3VyY2UrXCJ8XCIrci5zb3VyY2UrXCJ8XCIrKHI9PT1ubj9nbjpBbikuc291cmNlK1wifFwiKyh0LmV2YWx1YXRlfHxBbikuc291cmNlK1wifCRcIixcImdcIik7dmFyIGw9XCJzb3VyY2VVUkxcImluIHQ/XCIvLyMgc291cmNlVVJMPVwiK3Quc291cmNlVVJMK1wiXFxuXCI6XCJcIjtpZihuLnJlcGxhY2UocixmdW5jdGlvbih0LHIsZSxvLGYsbCl7cmV0dXJuIGV8fChlPW8pLGErPW4uc2xpY2UoYyxsKS5yZXBsYWNlKGtuLEIpLHImJih1PXRydWUsYSs9XCInK19fZShcIityK1wiKSsnXCIpLGYmJihpPXRydWUsYSs9XCInO1wiK2YrXCI7XFxuX19wKz0nXCIpLFxuZSYmKGErPVwiJysoKF9fdD0oXCIrZStcIikpPT1udWxsPycnOl9fdCkrJ1wiKSxjPWwrdC5sZW5ndGgsdH0pLGErPVwiJztcIiwodD10LnZhcmlhYmxlKXx8KGE9XCJ3aXRoKG9iail7XCIrYStcIn1cIiksYT0oaT9hLnJlcGxhY2UocSxcIlwiKTphKS5yZXBsYWNlKFYsXCIkMVwiKS5yZXBsYWNlKEssXCIkMTtcIiksYT1cImZ1bmN0aW9uKFwiKyh0fHxcIm9ialwiKStcIil7XCIrKHQ/XCJcIjpcIm9ianx8KG9iaj17fSk7XCIpK1widmFyIF9fdCxfX3A9JydcIisodT9cIixfX2U9Xy5lc2NhcGVcIjpcIlwiKSsoaT9cIixfX2o9QXJyYXkucHJvdG90eXBlLmpvaW47ZnVuY3Rpb24gcHJpbnQoKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyl9XCI6XCI7XCIpK2ErXCJyZXR1cm4gX19wfVwiLHQ9UGYoZnVuY3Rpb24oKXtyZXR1cm4gUXUobyxsK1wicmV0dXJuIFwiK2EpLmFwcGx5KEYsZil9KSx0LnNvdXJjZT1hLHZ1KHQpKXRocm93IHQ7cmV0dXJuIHR9LE9uLnRpbWVzPWZ1bmN0aW9uKG4sdCl7aWYobj1PdShuKSwxPm58fDkwMDcxOTkyNTQ3NDA5OTE8bilyZXR1cm5bXTtcbnZhciByPTQyOTQ5NjcyOTUsZT1NaShuLDQyOTQ5NjcyOTUpO2Zvcih0PWplKHQpLG4tPTQyOTQ5NjcyOTUsZT1FKGUsdCk7KytyPG47KXQocik7cmV0dXJuIGV9LE9uLnRvRmluaXRlPUV1LE9uLnRvSW50ZWdlcj1PdSxPbi50b0xlbmd0aD1TdSxPbi50b0xvd2VyPWZ1bmN0aW9uKG4pe3JldHVybiB6dShuKS50b0xvd2VyQ2FzZSgpfSxPbi50b051bWJlcj1JdSxPbi50b1NhZmVJbnRlZ2VyPWZ1bmN0aW9uKG4pe3JldHVybiBuP2d0KE91KG4pLC05MDA3MTk5MjU0NzQwOTkxLDkwMDcxOTkyNTQ3NDA5OTEpOjA9PT1uP246MH0sT24udG9TdHJpbmc9enUsT24udG9VcHBlcj1mdW5jdGlvbihuKXtyZXR1cm4genUobikudG9VcHBlckNhc2UoKX0sT24udHJpbT1mdW5jdGlvbihuLHQscil7cmV0dXJuKG49enUobikpJiYocnx8dD09PUYpP24ucmVwbGFjZShjbixcIlwiKTpuJiYodD1qcih0KSk/KG49JChuKSxyPSQodCksdD16KG4scikscj1XKG4scikrMSx6cihuLHQscikuam9pbihcIlwiKSk6bjtcbn0sT24udHJpbUVuZD1mdW5jdGlvbihuLHQscil7cmV0dXJuKG49enUobikpJiYocnx8dD09PUYpP24ucmVwbGFjZShsbixcIlwiKTpuJiYodD1qcih0KSk/KG49JChuKSx0PVcobiwkKHQpKSsxLHpyKG4sMCx0KS5qb2luKFwiXCIpKTpufSxPbi50cmltU3RhcnQ9ZnVuY3Rpb24obix0LHIpe3JldHVybihuPXp1KG4pKSYmKHJ8fHQ9PT1GKT9uLnJlcGxhY2UoYW4sXCJcIik6biYmKHQ9anIodCkpPyhuPSQobiksdD16KG4sJCh0KSksenIobix0KS5qb2luKFwiXCIpKTpufSxPbi50cnVuY2F0ZT1mdW5jdGlvbihuLHQpe3ZhciByPTMwLGU9XCIuLi5cIjtpZihidSh0KSl2YXIgdT1cInNlcGFyYXRvclwiaW4gdD90LnNlcGFyYXRvcjp1LHI9XCJsZW5ndGhcImluIHQ/T3UodC5sZW5ndGgpOnIsZT1cIm9taXNzaW9uXCJpbiB0P2pyKHQub21pc3Npb24pOmU7bj16dShuKTt2YXIgaT1uLmxlbmd0aDtpZihCbi50ZXN0KG4pKXZhciBvPSQobiksaT1vLmxlbmd0aDtpZihyPj1pKXJldHVybiBuO2lmKGk9ci1UKGUpLDE+aSlyZXR1cm4gZTtcbmlmKHI9bz96cihvLDAsaSkuam9pbihcIlwiKTpuLnNsaWNlKDAsaSksdT09PUYpcmV0dXJuIHIrZTtpZihvJiYoaSs9ci5sZW5ndGgtaSksX2YodSkpe2lmKG4uc2xpY2UoaSkuc2VhcmNoKHUpKXt2YXIgZj1yO2Zvcih1Lmdsb2JhbHx8KHU9dGkodS5zb3VyY2UsenUoZG4uZXhlYyh1KSkrXCJnXCIpKSx1Lmxhc3RJbmRleD0wO289dS5leGVjKGYpOyl2YXIgYz1vLmluZGV4O3I9ci5zbGljZSgwLGM9PT1GP2k6Yyl9fWVsc2Ugbi5pbmRleE9mKGpyKHUpLGkpIT1pJiYodT1yLmxhc3RJbmRleE9mKHUpLC0xPHUmJihyPXIuc2xpY2UoMCx1KSkpO3JldHVybiByK2V9LE9uLnVuZXNjYXBlPWZ1bmN0aW9uKG4pe3JldHVybihuPXp1KG4pKSYmSi50ZXN0KG4pP24ucmVwbGFjZShHLHV0KTpufSxPbi51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgdD0rK2FpO3JldHVybiB6dShuKSt0fSxPbi51cHBlckNhc2U9RmYsT24udXBwZXJGaXJzdD1OZixPbi5lYWNoPXJ1LE9uLmVhY2hSaWdodD1ldSxPbi5maXJzdD1LZSxcblp1KE9uLGZ1bmN0aW9uKCl7dmFyIG49e307cmV0dXJuIEV0KE9uLGZ1bmN0aW9uKHQscil7Y2kuY2FsbChPbi5wcm90b3R5cGUscil8fChuW3JdPXQpfSksbn0oKSx7Y2hhaW46ZmFsc2V9KSxPbi5WRVJTSU9OPVwiNC4xNy40XCIsdShcImJpbmQgYmluZEtleSBjdXJyeSBjdXJyeVJpZ2h0IHBhcnRpYWwgcGFydGlhbFJpZ2h0XCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKG4pe09uW25dLnBsYWNlaG9sZGVyPU9ufSksdShbXCJkcm9wXCIsXCJ0YWtlXCJdLGZ1bmN0aW9uKG4sdCl7TW4ucHJvdG90eXBlW25dPWZ1bmN0aW9uKHIpe3I9cj09PUY/MTpEaShPdShyKSwwKTt2YXIgZT10aGlzLl9fZmlsdGVyZWRfXyYmIXQ/bmV3IE1uKHRoaXMpOnRoaXMuY2xvbmUoKTtyZXR1cm4gZS5fX2ZpbHRlcmVkX18/ZS5fX3Rha2VDb3VudF9fPU1pKHIsZS5fX3Rha2VDb3VudF9fKTplLl9fdmlld3NfXy5wdXNoKHtzaXplOk1pKHIsNDI5NDk2NzI5NSksdHlwZTpuKygwPmUuX19kaXJfXz9cIlJpZ2h0XCI6XCJcIil9KSxlfSxNbi5wcm90b3R5cGVbbitcIlJpZ2h0XCJdPWZ1bmN0aW9uKHQpe1xucmV0dXJuIHRoaXMucmV2ZXJzZSgpW25dKHQpLnJldmVyc2UoKX19KSx1KFtcImZpbHRlclwiLFwibWFwXCIsXCJ0YWtlV2hpbGVcIl0sZnVuY3Rpb24obix0KXt2YXIgcj10KzEsZT0xPT1yfHwzPT1yO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbihuKXt2YXIgdD10aGlzLmNsb25lKCk7cmV0dXJuIHQuX19pdGVyYXRlZXNfXy5wdXNoKHtpdGVyYXRlZTpqZShuLDMpLHR5cGU6cn0pLHQuX19maWx0ZXJlZF9fPXQuX19maWx0ZXJlZF9ffHxlLHR9fSksdShbXCJoZWFkXCIsXCJsYXN0XCJdLGZ1bmN0aW9uKG4sdCl7dmFyIHI9XCJ0YWtlXCIrKHQ/XCJSaWdodFwiOlwiXCIpO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiB0aGlzW3JdKDEpLnZhbHVlKClbMF19fSksdShbXCJpbml0aWFsXCIsXCJ0YWlsXCJdLGZ1bmN0aW9uKG4sdCl7dmFyIHI9XCJkcm9wXCIrKHQ/XCJcIjpcIlJpZ2h0XCIpO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9fZmlsdGVyZWRfXz9uZXcgTW4odGhpcyk6dGhpc1tyXSgxKTtcbn19KSxNbi5wcm90b3R5cGUuY29tcGFjdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmZpbHRlcihOdSl9LE1uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmZpbHRlcihuKS5oZWFkKCl9LE1uLnByb3RvdHlwZS5maW5kTGFzdD1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5yZXZlcnNlKCkuZmluZChuKX0sTW4ucHJvdG90eXBlLmludm9rZU1hcD1scihmdW5jdGlvbihuLHQpe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP25ldyBNbih0aGlzKTp0aGlzLm1hcChmdW5jdGlvbihyKXtyZXR1cm4gRHQocixuLHQpfSl9KSxNbi5wcm90b3R5cGUucmVqZWN0PWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmZpbHRlcihzdShqZShuKSkpfSxNbi5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24obix0KXtuPU91KG4pO3ZhciByPXRoaXM7cmV0dXJuIHIuX19maWx0ZXJlZF9fJiYoMDxufHwwPnQpP25ldyBNbihyKTooMD5uP3I9ci50YWtlUmlnaHQoLW4pOm4mJihyPXIuZHJvcChuKSksXG50IT09RiYmKHQ9T3UodCkscj0wPnQ/ci5kcm9wUmlnaHQoLXQpOnIudGFrZSh0LW4pKSxyKX0sTW4ucHJvdG90eXBlLnRha2VSaWdodFdoaWxlPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLnJldmVyc2UoKS50YWtlV2hpbGUobikucmV2ZXJzZSgpfSxNbi5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRha2UoNDI5NDk2NzI5NSl9LEV0KE1uLnByb3RvdHlwZSxmdW5jdGlvbihuLHQpe3ZhciByPS9eKD86ZmlsdGVyfGZpbmR8bWFwfHJlamVjdCl8V2hpbGUkLy50ZXN0KHQpLGU9L14oPzpoZWFkfGxhc3QpJC8udGVzdCh0KSx1PU9uW2U/XCJ0YWtlXCIrKFwibGFzdFwiPT10P1wiUmlnaHRcIjpcIlwiKTp0XSxpPWV8fC9eZmluZC8udGVzdCh0KTt1JiYoT24ucHJvdG90eXBlW3RdPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChuKXtyZXR1cm4gbj11LmFwcGx5KE9uLHMoW25dLGYpKSxlJiZoP25bMF06bn12YXIgbz10aGlzLl9fd3JhcHBlZF9fLGY9ZT9bMV06YXJndW1lbnRzLGM9byBpbnN0YW5jZW9mIE1uLGE9ZlswXSxsPWN8fGFmKG8pO1xubCYmciYmdHlwZW9mIGE9PVwiZnVuY3Rpb25cIiYmMSE9YS5sZW5ndGgmJihjPWw9ZmFsc2UpO3ZhciBoPXRoaXMuX19jaGFpbl9fLHA9ISF0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCxhPWkmJiFoLGM9YyYmIXA7cmV0dXJuIWkmJmw/KG89Yz9vOm5ldyBNbih0aGlzKSxvPW4uYXBwbHkobyxmKSxvLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6bnUsYXJnczpbdF0sdGhpc0FyZzpGfSksbmV3IHpuKG8saCkpOmEmJmM/bi5hcHBseSh0aGlzLGYpOihvPXRoaXMudGhydSh0KSxhP2U/by52YWx1ZSgpWzBdOm8udmFsdWUoKTpvKX0pfSksdShcInBvcCBwdXNoIHNoaWZ0IHNvcnQgc3BsaWNlIHVuc2hpZnRcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24obil7dmFyIHQ9dWlbbl0scj0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3Qobik/XCJ0YXBcIjpcInRocnVcIixlPS9eKD86cG9wfHNoaWZ0KSQvLnRlc3Qobik7T24ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO2lmKGUmJiF0aGlzLl9fY2hhaW5fXyl7XG52YXIgdT10aGlzLnZhbHVlKCk7cmV0dXJuIHQuYXBwbHkoYWYodSk/dTpbXSxuKX1yZXR1cm4gdGhpc1tyXShmdW5jdGlvbihyKXtyZXR1cm4gdC5hcHBseShhZihyKT9yOltdLG4pfSl9fSksRXQoTW4ucHJvdG90eXBlLGZ1bmN0aW9uKG4sdCl7dmFyIHI9T25bdF07aWYocil7dmFyIGU9ci5uYW1lK1wiXCI7KEppW2VdfHwoSmlbZV09W10pKS5wdXNoKHtuYW1lOnQsZnVuYzpyfSl9fSksSmlbWHIoRiwyKS5uYW1lXT1be25hbWU6XCJ3cmFwcGVyXCIsZnVuYzpGfV0sTW4ucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7dmFyIG49bmV3IE1uKHRoaXMuX193cmFwcGVkX18pO3JldHVybiBuLl9fYWN0aW9uc19fPU1yKHRoaXMuX19hY3Rpb25zX18pLG4uX19kaXJfXz10aGlzLl9fZGlyX18sbi5fX2ZpbHRlcmVkX189dGhpcy5fX2ZpbHRlcmVkX18sbi5fX2l0ZXJhdGVlc19fPU1yKHRoaXMuX19pdGVyYXRlZXNfXyksbi5fX3Rha2VDb3VudF9fPXRoaXMuX190YWtlQ291bnRfXyxuLl9fdmlld3NfXz1Ncih0aGlzLl9fdmlld3NfXyksXG5ufSxNbi5wcm90b3R5cGUucmV2ZXJzZT1mdW5jdGlvbigpe2lmKHRoaXMuX19maWx0ZXJlZF9fKXt2YXIgbj1uZXcgTW4odGhpcyk7bi5fX2Rpcl9fPS0xLG4uX19maWx0ZXJlZF9fPXRydWV9ZWxzZSBuPXRoaXMuY2xvbmUoKSxuLl9fZGlyX18qPS0xO3JldHVybiBufSxNbi5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXt2YXIgbix0PXRoaXMuX193cmFwcGVkX18udmFsdWUoKSxyPXRoaXMuX19kaXJfXyxlPWFmKHQpLHU9MD5yLGk9ZT90Lmxlbmd0aDowO249aTtmb3IodmFyIG89dGhpcy5fX3ZpZXdzX18sZj0wLGM9LTEsYT1vLmxlbmd0aDsrK2M8YTspe3ZhciBsPW9bY10scz1sLnNpemU7c3dpdGNoKGwudHlwZSl7Y2FzZVwiZHJvcFwiOmYrPXM7YnJlYWs7Y2FzZVwiZHJvcFJpZ2h0XCI6bi09czticmVhaztjYXNlXCJ0YWtlXCI6bj1NaShuLGYrcyk7YnJlYWs7Y2FzZVwidGFrZVJpZ2h0XCI6Zj1EaShmLG4tcyl9fWlmKG49e3N0YXJ0OmYsZW5kOm59LG89bi5zdGFydCxmPW4uZW5kLG49Zi1vLFxubz11P2Y6by0xLGY9dGhpcy5fX2l0ZXJhdGVlc19fLGM9Zi5sZW5ndGgsYT0wLGw9TWkobix0aGlzLl9fdGFrZUNvdW50X18pLCFlfHwhdSYmaT09biYmbD09bilyZXR1cm4ga3IodCx0aGlzLl9fYWN0aW9uc19fKTtlPVtdO246Zm9yKDtuLS0mJmE8bDspe2ZvcihvKz1yLHU9LTEsaT10W29dOysrdTxjOyl7dmFyIGg9Zlt1XSxzPWgudHlwZSxoPSgwLGguaXRlcmF0ZWUpKGkpO2lmKDI9PXMpaT1oO2Vsc2UgaWYoIWgpe2lmKDE9PXMpY29udGludWUgbjticmVhayBufX1lW2ErK109aX1yZXR1cm4gZX0sT24ucHJvdG90eXBlLmF0PUZvLE9uLnByb3RvdHlwZS5jaGFpbj1mdW5jdGlvbigpe3JldHVybiBYZSh0aGlzKX0sT24ucHJvdG90eXBlLmNvbW1pdD1mdW5jdGlvbigpe3JldHVybiBuZXcgem4odGhpcy52YWx1ZSgpLHRoaXMuX19jaGFpbl9fKX0sT24ucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXt0aGlzLl9fdmFsdWVzX189PT1GJiYodGhpcy5fX3ZhbHVlc19fPWt1KHRoaXMudmFsdWUoKSkpO1xudmFyIG49dGhpcy5fX2luZGV4X18+PXRoaXMuX192YWx1ZXNfXy5sZW5ndGg7cmV0dXJue2RvbmU6bix2YWx1ZTpuP0Y6dGhpcy5fX3ZhbHVlc19fW3RoaXMuX19pbmRleF9fKytdfX0sT24ucHJvdG90eXBlLnBsYW50PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxyPXRoaXM7ciBpbnN0YW5jZW9mIFNuOyl7dmFyIGU9UGUocik7ZS5fX2luZGV4X189MCxlLl9fdmFsdWVzX189Rix0P3UuX193cmFwcGVkX189ZTp0PWU7dmFyIHU9ZSxyPXIuX193cmFwcGVkX199cmV0dXJuIHUuX193cmFwcGVkX189bix0fSxPbi5wcm90b3R5cGUucmV2ZXJzZT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX193cmFwcGVkX187cmV0dXJuIG4gaW5zdGFuY2VvZiBNbj8odGhpcy5fX2FjdGlvbnNfXy5sZW5ndGgmJihuPW5ldyBNbih0aGlzKSksbj1uLnJldmVyc2UoKSxuLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6bnUsYXJnczpbSmVdLHRoaXNBcmc6Rn0pLG5ldyB6bihuLHRoaXMuX19jaGFpbl9fKSk6dGhpcy50aHJ1KEplKTtcbn0sT24ucHJvdG90eXBlLnRvSlNPTj1Pbi5wcm90b3R5cGUudmFsdWVPZj1Pbi5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4ga3IodGhpcy5fX3dyYXBwZWRfXyx0aGlzLl9fYWN0aW9uc19fKX0sT24ucHJvdG90eXBlLmZpcnN0PU9uLnByb3RvdHlwZS5oZWFkLEFpJiYoT24ucHJvdG90eXBlW0FpXT10dSksT259KCk7dHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgZGVmaW5lLmFtZD09XCJvYmplY3RcIiYmZGVmaW5lLmFtZD8oWm4uXz1pdCwgZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGl0fSkpOlZuPygoVm4uZXhwb3J0cz1pdCkuXz1pdCxxbi5fPWl0KTpabi5fPWl0fSkuY2FsbCh0aGlzKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2xvZGFzaC9sb2Rhc2gubWluLmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMsIHR5cGUpLFxuXHRcdChnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzLCB0eXBlKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzLCB0eXBlKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcblx0Z2V0RGFpbHlDYXAsXG5cdGdldFNpbmdsZUZhcmUsXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IG95c3RlckRheVRvdGFscyBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG4vLyBPZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy8gcG9zc2liaWxpdHkgb2YgYWx0ZXJpbmcgb3lzdGVyIHNvIHJlZmxlY3RzIG9mZiBwZWFrIC0tIHRoZW4gY291bGQgYWRkICB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyIGFuZCAxLTggIHpvbmVzIG9yIHRvIDkgd2l0aG91dCB3YXRmb3JkXG4vLyBDQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuLy8gTkIgV2Vla2x5IGNhcHBpbmcgaXMgYWx3YXlzIGFueXRpbWUgJiBkYWlseSBjYXBwaW5nIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxXG5cbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbi8vIGdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4vLyAgIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuLy8gICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG4vLyAgIGNvbnN0IGpvdXJuZXlzID0gW1xuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgcGVhazogZmFsc2UsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHBlYWs6IGZhbHNlLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICBwZWFrOiBmYWxzZSxcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMSwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgcGVhazogZmFsc2UsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzEsIDJdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHBlYWs6IGZhbHNlLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsxLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICBwZWFrOiBmYWxzZSxcbi8vICAgICB9LFxuLy8gICBdO1xuLy8gfSk7XG5cblxuLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIC8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IHdpdGggZGFpbHkgY2Fwc1xuLy8gXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcbi8vIFx0bGV0IGNvbkFsbEZhcmVzID0gW107XG5cbi8vIFx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuLy8gXHRsZXQgY29uRmFyZXMgPSBudWxsO1xuLy8gXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcbi8vIFx0XHRjb25GYXJlcyArPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXkuem9uZXMsIHNpbmdsZUZhcmVzKTtcbi8vIFx0fSk7XG4vLyBcdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG4vLyBcdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuLy8gXHQgbGV0IGNvbk1heFpvbmUgPSBtYXhOdW0oZmxhdHRlbihqb3VybmV5cy5tYXAoaiA9PiBqLnpvbmVzKSkpO1xuLy8gXHQgZm9yIChsZXQgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG4vLyBcdCBcdC8vY29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG4vLyBcdCBcdGxldCBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG4vLyBcdCBcdCBmb3IgKGxldCB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG4vLyBcdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuLy8gXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKDEsIGksIGpvdXJuZXlzW3hdWzBdLCBqb3VybmV5c1t4XVsxXSwgc2luZ2xlRmFyZXMpO1xuLy8gXHQgXHQgfTtcbi8vIFx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG4vLyBcdCB9XG5cbi8vIFx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS5cbi8vIFx0cmV0dXJuIG1pbk51bShjb25BbGxGYXJlcyk7XG4vLyBcdC8vdGhpcyByZXR1cm5zIHRoZSBmaW5hbCBjb250YWN0bGVzcyBkYWlseSBmYXJlXG4vLyB9KTtcblxuLy9DT05UQUNUTEVTU1xuLy9Gb3IganVzdCBkYWlseSBjYXBzIE9SIHdlZWtseSBjYXAgd2l0aG91dCBkYWlseSBjYXA6IHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aG91dCBtYXggZGFpbHlcbi8vRm9yIGNvbWJvIG9mIGRhaWx5IGNhcCBhbmQgd2Vla2x5IGNhcDogdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG1heCBkYWlseSBjYXBcbi8vXG4vLyBPRkYgUEVBSyBEQUlMWSBhbmQgV0VFS0xZOiBGb3Igb2ZmIHBlYWsgZGFpbHkgY2FwIGNvbWJvczogaWYgb2ZmIHBlYWssIHVzZSBleHRlbnNpb24gZmFyZXMgdG8gY2FsY3VsYXRlIHVzaW5nIGJvdGggZGFpbHkgYW5kIHdlZWtseSBjYXBzXG4vLyAtLS0gd2hpbHN0IGlmIHBlYWsgdHJhdmVsIHRoZW4gdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG9ubHkgd2Vla2x5IHRyYXZlbCBjYXJkIGNhcHMgYW5kIGFkZCB0byB0b3RhbFxuLy8gQU5ZVElNRSBEQUlMWSBhbmQgV0VFS0xZOiB1c2UgdGhlIGV4dGVuc2lvbiBmYXJlIHRvIGNhbGN1bGF0ZSBhbGwgZmFyZXMgd2l0aCBkYWlseSBhbnl0aW1lIGNhcCBhbmQgd2Vla2x5IGNhcCAoY3VycmVudCBzZXQgdXApXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9