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
/* harmony export (immutable) */ __webpack_exports__["h"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["i"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["b"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["c"] = flatten;
/* unused harmony export journeyToKey */
/* harmony export (immutable) */ __webpack_exports__["d"] = getDailyCap;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getCap; });
/* harmony export (immutable) */ __webpack_exports__["a"] = getSingleFare;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return met; });


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
function getDailyCap(maxZonesofar, dailyCaps) {
  return dailyCaps[journeyToKey([1, maxZonesofar])];
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
function getSingleFare(journey, singleFares) {
  return singleFares[journeyToKey(journey)];
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
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFares;




// /**
//  * Calculates the extension fare (or none) of a journey
//  * @function
//  * @param {object} see below
//  * @param {singleFares} uses the singleFares json data
//  * @returns {number} - returns the extension fare for the journey
//  * @description
//
// 	//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
// 	//FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap) -- unless you add in MaxDaily
//  // this is overly complicated for daily caps (as only deals with zone 1 to x) but still works. RELIES ON THE FACT DAILY ALWAYS STARTS AT 1
//  */

function extensionFares() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var singleFares = arguments[1];

  var maxDaily = options.maxDaily || null;
  //by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)

  var minSingle = options.minSingle,
      maxSingle = options.maxSingle,
      minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;
  //same as var minSingle = options.minSingle;

  var minChargedZone = minSingle;
  var finalCondition = null;

  if (maxDaily) {
    // If contactless, daily and weekly combo (hence adding in maxDaily as argument_
    if (maxDaily >= minTravelcard - 1) {
      //if no gap zones between max daily and min travelcard
      minTravelcard = 1; //since anytime daily caps always start at zone 1
      maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])([maxDaily, maxTravelcard]); //max travelcard is whichever is largest max daily or max travelcard
      //else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
    } else {
      //IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
      minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
      finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
    }
  }

  //if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
  if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares);

    //if min single within travelcard zones but max single isnt - charge end
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);

    //if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares);

    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard || finalCondition) {
    return 0;

    //both single zones are outside travelcard zones
  }
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([minChargedZone, maxSingle], singleFares);
  //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(1);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* flatten */])(legs.map(function (leg) {
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* maxNum */])([singleMax].concat(dualZones));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterDayTotal;




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

  var getDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* getCap */])(__WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a, dailyCaps);
  var capMet = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.compose(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* met */], getDailyCap);

  var totals = journeys.reduce(function (a, b) {
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* getSingleFare */])(b.zones, singleFares);
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* maxNum */])([].concat(a.maxZone, b.zones));
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



function splitOrFullFare(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([minChargedZone, maxSingle], singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares)]);
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







//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
//NB Weekly capping is always anytime & daily capping always starts at zone 1

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].stations().then(function (stations) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__["a" /* default */])('1000029', '1000138', stations).then(function (resp) {
    // console.log(resp);
  });
});

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].fares().then(function (fareData) {
  var singleFares = fareData.singleFares;
  var dailyCaps = fareData.dailyCaps;

  var journeys = [{
    zones: [1, 6],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 2],
    dualZoneOverlap: false,
    peak: false
  }];

  // Object.keys(response.dailyCaps).forEach((key) => {
  //   key.split('-');
  //
  //   [1, 2]
  // });

  // minTravelCard
  // maxTravelCard

  //OYSTER DAILY CAPS
  //Need to be semi global to update
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oysterDayTotal__["a" /* default */])({ journeys: journeys, singleFares: singleFares, dailyCaps: dailyCaps }));
  // console.log(oysterDayTotals(journeys, singleFares, dailyCaps));

  //oyCumTotal is the final oyster daily fare calculated:


  // OYSTER WEEKLY
  // Oyster deals with whole journeys when mixing daily cap and weekly - cuts off weekly part but not daily & cum total calc

  // For each possible weekly cap:

  // To generate possible weekly caps (! remember to do without any weekly caps too)
  // var possWeeklyCombos =[];
  // for (m = 1, m < 7, m++) {
  //   for (x = 2, x < 7, x++) {
  //    possWeeklyCombos.push([m, x]);
  //   }
  // };

  // [[1,3], [1,2]]

  //
  //
  //
  //
  //   let maxZoneSoFar = null;
  //   let oyCumTotal = 0;
  //   journeys.forEach(function(journey) { //AND FOR EACH DAY
  //     let singleFare = extensionFare({minSingle, maxSingle, minTravelcard, maxTravelcard}, singleFares); //OFF PEAK OR ON PEAK
  //     //adds the single fare to the cumulative total
  //     oyCumPeakTotal += singleFare;
  //     oyCumOffTotal += singleFare;
  //     //SINGLE FARE
  // //Gets the maximum zones of all zones travelled in so far
  //     maxZoneSoFar = maxNum([].concat(journey.zones, maxZoneSoFar));
  //     if ((maxZoneSoFar <= maxTravelcard) && (maxZoneSoFar >= (minTravelcard – 1))) {
  //       let zoneDaily = minTravelcard -1; //(ie only compares against daily cap of minSingle to zoneDaily - removes overlap with weekly)
  //     } else
  //     let zoneDaily = maxZoneSoFar;
  //     }
  //
  // THE REST OF THIS IS BASICALLY A DUPLICATE OF THE DAILY FORMULA
  //   if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (!journey.peak && oyCumOffTotal >= getDailyCap(zoneDaily, dailyCaps)) {
  //     oyCumOffTotal = getDailyCap(zoneDaily, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
  //   }
  //   //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (oyCumPeakTotal >= getDailyCap(zoneDaily, dailyCaps)) {
  //     oyCumPeakTotal = getDailyCap(zoneDaily, dailyCaps);
  //   }
  //   oyCumTotal += minNum([oyCumPeakTotal, oyCumOffTotal]);
  // });
  // oyCumTotal is the final oyster daily fare calculated for each day with a weekly cap.


  // OYSTER
  // For daily capping: use the formula above for the daily capping.
  // Oyster deals with whole journeys when mixing daily cap and weekly - cuts off weekly part but not daily & cum total calc

  // For each possible weekly cap:
  // for each journey, use extension fares to calculate the single fare (off peak or on peak).
  // If max zone travelled so far <= max weekly cap && max zone so far => min weekly -1 , then set zone X to min weekly - 1
  // --> (ie only compares against daily cap of minSingle to zone X - removes overlap with weekly)
  //  -----> ELSE (IF max zone so far < min weekly - 1 or max zone so fare > max weekly), set zone X as max zone so far
  // Then use similar to daily capping: add this single fare to cum total peak or off peak, compare to daily anytime or off peak cap of max zone X and cap where needed
  //Need set an alert for when reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times.

  // To generate possible weekly caps (! remember to do without any weekly caps too)
  // var possWeeklyCombos =[];
  // for (m = 1, m < 7, m++) {
  // 	for (x = 2, x < 7, x++) {
  //    possWeeklyCombos.push([m, x]);
  // 	}
  // };


  //---------------------------------
  // - CONTACTLESS Cheapest Fare = with daily caps
  //The array of all combination prices to be reduce to cheapest one
  var conAllFares = [];

  // for without any daily caps, only singles added together
  var conFares = null;
  journeys.forEach(function (journey) {
    conFares += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getSingleFare */])(journey.zones, singleFares);
  });
  conAllFares.push(conFares);

  // 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
  var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* flatten */])(journeys.map(function (j) {
    return j.zones;
  })));
  for (var i = 2; i <= conMaxZone; i++) {
    //console.log('for daily cap 1 to ' + i);
    var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getDailyCap */])(i, dailyCaps);
    for (var x = 0; x < journeys.length; x++) {
      //adding extension fares to cumTotal
      conCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(1, i, journeys[x][0], journeys[x][1], singleFares);
    };
    conAllFares.push(conCumTotal);
  }

  // 	---> Compare all the possibilities and select the cheapest (including total single).
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(conAllFares);
  //this returns the final contactless daily fare
});

//CONTACTLESS
//For just daily caps OR weekly cap without daily cap: use extension fares without max daily
//For combo of daily cap and weekly cap: use extension fares with max daily cap
//
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU0Y2QxZDNmNDY3MTE0YTE5OTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9mcC9fYmFzZUNvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAvX21hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvbG9kYXNoLm1pbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyJnZXRab25lcyIsIm5hcFRhbiIsInN0YXRpb25zIiwiem9uZXMiLCJmaWx0ZXJab25lc0J5TnVtYmVyIiwibnVtIiwiZmlsdGVyIiwiem9uZSIsImxlbmd0aCIsImNvbXBhcmVOdW1iZXJzIiwiYXJyYXlOdW1iZXJzIiwib3BlcmF0b3IiLCJyZWR1Y2UiLCJhIiwiYiIsIm1heE51bSIsImFycmF5Wm9uZXMiLCJNYXRoIiwibWF4IiwibWluTnVtIiwibWluIiwiZ2V0RGlmZmVyZW5jZSIsImFicyIsImZsYXR0ZW4iLCJhcnIiLCJjb25jYXQiLCJqb3VybmV5VG9LZXkiLCJqb3VybmV5Iiwic29ydCIsImpvaW4iLCJ6b25lVG9Kb3VybmV5IiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRDYXAiLCJfIiwiY3VycnkiLCJjYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwibWV0IiwidGFyZ2V0IiwidmFsdWUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwicmVxdWlyZSIsInJ1bkluQ29udGV4dCIsIm1vZHVsZSIsImV4cG9ydHMiLCJleHRlbnNpb25GYXJlcyIsIm9wdGlvbnMiLCJtYXhEYWlseSIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwibWluQ2hhcmdlZFpvbmUiLCJmaW5hbENvbmRpdGlvbiIsInNwbGl0T3JGdWxsRmFyZSIsImdldFNpbmdsZUpvdXJuZXlab25lcyIsImdldERhdGEiLCJqb3VybmV5cyIsImxlZ3MiLCJhbGxab25lcyIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwicGF0aCIsInN0b3BQb2ludHMiLCJmb3JFYWNoIiwic3RvcFBvaW50IiwiaWQiLCJ6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsInNpbmdsZU1heCIsInNpbmdsZU1pbiIsImR1YWxab25lcyIsInoiLCJveXN0ZXJEYXlUb3RhbCIsInBlYWtUb3RhbCIsIm9mZlBlYWtUb3RhbCIsIm1heFpvbmVTb0ZhciIsImNhcE1ldCIsImNvbXBvc2UiLCJ0b3RhbHMiLCJzaW5nbGVGYXJlIiwibWF4Wm9uZSIsIm1ldERhaWx5Q2FwIiwicGVhayIsIm1hcHBpbmciLCJmYWxsYmFja0hvbGRlciIsIkFycmF5IiwicHJvdG90eXBlIiwiYmFzZUFyaXR5IiwiZnVuYyIsIm4iLCJhcHBseSIsInVuZGVmaW5lZCIsImFyZ3VtZW50cyIsImJhc2VBcnkiLCJjbG9uZUFycmF5IiwiYXJyYXkiLCJyZXN1bHQiLCJjcmVhdGVDbG9uZXIiLCJvYmplY3QiLCJmbGF0U3ByZWFkIiwic3RhcnQiLCJsYXN0SW5kZXgiLCJhcmdzIiwib3RoZXJBcmdzIiwic2xpY2UiLCJ3cmFwSW1tdXRhYmxlIiwiY2xvbmVyIiwiYmFzZUNvbnZlcnQiLCJ1dGlsIiwibmFtZSIsInNldFBsYWNlaG9sZGVyIiwiaXNMaWIiLCJpc09iaiIsIk9iamVjdCIsIlR5cGVFcnJvciIsImNvbmZpZyIsImNhcCIsImZpeGVkIiwiaW1tdXRhYmxlIiwicmVhcmciLCJmb3JjZUN1cnJ5IiwiZm9yY2VGaXhlZCIsImZvcmNlUmVhcmciLCJwbGFjZWhvbGRlciIsInByaXN0aW5lIiwiaGVscGVycyIsImFyeSIsImFzc2lnbiIsImNsb25lIiwiaXNBcnJheSIsImlzRnVuY3Rpb24iLCJpdGVyYXRlZSIsImtleXMiLCJ0b0ludGVnZXIiLCJ0b1BhdGgiLCJlYWNoIiwiYXJ5TWV0aG9kS2V5cyIsImFyeU1ldGhvZCIsIndyYXBwZXJzIiwiY2FzdEFycmF5IiwiYXJpdHkiLCJtaXhpbiIsInNvdXJjZSIsInBhaXJzIiwia2V5IiwicGFpciIsIm50aEFyZyIsImluZGV4ZXMiLCJjb250ZXh0IiwiY2FzdENhcCIsIml0ZXJhdGVlUmVhcmciLCJpdGVyYXRlZUFyeSIsImNhc3RDdXJyeSIsImNhc3RGaXhlZCIsInNraXBGaXhlZCIsIm1ldGhvZFNwcmVhZCIsImNhc3RSZWFyZyIsInNraXBSZWFyZyIsIm1ldGhvZFJlYXJnIiwiYXJ5UmVhcmciLCJjbG9uZUJ5UGF0aCIsImluZGV4IiwibmVzdGVkIiwiY29udmVydExpYiIsImNvbnZlcnQiLCJjcmVhdGVDb252ZXJ0ZXIiLCJyZWFsTmFtZSIsImFsaWFzVG9SZWFsIiwibWV0aG9kTmFtZSIsInJlbWFwIiwib2xkT3B0aW9ucyIsIm5ld1V0aWwiLCJuZXdGdW5jIiwibmV3T3B0aW9ucyIsIm92ZXJBcmciLCJ0cmFuc2Zvcm0iLCJ3cmFwIiwid3JhcHBlZCIsIndyYXBwZXIiLCJtdXRhdGUiLCJzZXQiLCJhcnlLZXkiLCJvdGhlck5hbWUiLCJhZnRlclJlYXJnIiwicmVhbFRvQWxpYXMiLCJhbGlhcyIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInQiLCJhZGQiLCJyIiwidSIsImkiLCJvIiwiZiIsImMiLCJkIiwibCIsInMiLCJoIiwicCIsInYiLCJnIiwieSIsIngiLCJrIiwiUCIsImoiLCJGIiwidyIsIm0iLCJBIiwiRSIsIk8iLCJTIiwiSSIsIlIiLCJoYXMiLCJXIiwiQiIsIlRuIiwiTCIsInNpemUiLCJVIiwiQyIsIkQiLCJNIiwiVCIsIkJuIiwidGVzdCIsInpuIiwidHQiLCIkIiwibWF0Y2giLCJzcGxpdCIsIk4iLCJOYU4iLCJaIiwicSIsIlYiLCJLIiwiRyIsIkgiLCJKIiwiUmVnRXhwIiwiWSIsIlEiLCJYIiwibm4iLCJ0biIsInJuIiwiZW4iLCJ1biIsIm9uIiwiZm4iLCJjbiIsImFuIiwibG4iLCJzbiIsImhuIiwicG4iLCJfbiIsInZuIiwiZ24iLCJkbiIsInluIiwiYm4iLCJ4biIsImpuIiwid24iLCJtbiIsIkFuIiwia24iLCJFbiIsIk9uIiwiU24iLCJJbiIsIlJuIiwiV24iLCJMbiIsIlVuIiwiQ24iLCJEbiIsIk1uIiwiJG4iLCJwYXJzZUZsb2F0IiwiRm4iLCJwYXJzZUludCIsIk5uIiwiZ2xvYmFsIiwiUG4iLCJzZWxmIiwiWm4iLCJGdW5jdGlvbiIsInFuIiwibm9kZVR5cGUiLCJWbiIsIktuIiwiR24iLCJwcm9jZXNzIiwiYmluZGluZyIsIkhuIiwiaXNBcnJheUJ1ZmZlciIsIkpuIiwiaXNEYXRlIiwiWW4iLCJpc01hcCIsIlFuIiwiaXNSZWdFeHAiLCJYbiIsImlzU2V0IiwibnQiLCJpc1R5cGVkQXJyYXkiLCJydCIsImV0IiwidXQiLCJpdCIsInh1IiwiYWYiLCJjaSIsIlBlIiwiX193cmFwcGVkX18iLCJfX2FjdGlvbnNfXyIsIl9fY2hhaW5fXyIsIl9faW5kZXhfXyIsIl9fdmFsdWVzX18iLCJfX2Rpcl9fIiwiX19maWx0ZXJlZF9fIiwiX19pdGVyYXRlZXNfXyIsIl9fdGFrZUNvdW50X18iLCJfX3ZpZXdzX18iLCJjbGVhciIsIl9fZGF0YV9fIiwiY2YiLCJzZiIsImdmIiwicmkiLCJSZSIsImNyIiwib3QiLCJUZSIsIk1yIiwiZ3QiLCJmdCIsImN0IiwiaHUiLCJfdCIsImF0IiwibHQiLCJzdCIsIm9vIiwiaHQiLCJUciIsIkx1IiwicHQiLCJVdSIsIkVpIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwidnQiLCJIdSIsIld1IiwiZHQiLCJidSIsIkVlIiwieW8iLCJXciIsIk9lIiwiRnIiLCIkciIsIlNlIiwiZ2V0IiwieWUiLCJkZSIsInl0IiwiYnQiLCJuaSIsInh0IiwiZWkiLCJqbyIsImp0Iiwid3QiLCJtdCIsIkF1IiwiQXQiLCJrdCIsIkllIiwiRXQiLCJjbyIsIk90IiwiYW8iLCJTdCIsImd1IiwiSXQiLCJSciIsIiRlIiwiUnQiLCJ6dCIsImtpIiwic2kiLCJXdCIsIkJ0IiwiTHQiLCJVdCIsIk1pIiwiQ3QiLCJEdCIsInZyIiwiR2UiLCJNdCIsIlR0IiwiJHQiLCJGdCIsIl9lIiwidmUiLCJjb25zdHJ1Y3RvciIsImRlbGV0ZSIsIk50IiwiUHQiLCJadCIsImxpIiwiX2kiLCJGZSIsInF0IiwiVnQiLCJLdCIsInl1IiwiR3QiLCJOdSIsIlh0IiwiUXQiLCJWdSIsIkh0IiwiTGUiLCJDaSIsIkp0IiwiWXQiLCJwdSIsIm1lIiwiVWUiLCJXZSIsIkJ1IiwibnIiLCJfdSIsIkxyIiwid3UiLCJSdSIsInRyIiwicnIiLCJqZSIsIlVyIiwiZXIiLCJ1ciIsInByIiwiaXIiLCJvciIsIndpIiwiZnIiLCJtciIsInppIiwiRmkiLCJhciIsImxyIiwid28iLCJDZSIsInNyIiwiRHUiLCJociIsIl9yIiwiZ3IiLCJkciIsInlyIiwiYnIiLCJ4ciIsImpyIiwidW8iLCJ3ciIsInBvIiwiQXIiLCJrciIsInRoaXNBcmciLCJFciIsIk9yIiwiU3IiLCJJciIsIm1vIiwienUiLCJ6ciIsInlpIiwiY29weSIsIkJyIiwiYnl0ZUxlbmd0aCIsImRpIiwiYnVmZmVyIiwiYnl0ZU9mZnNldCIsIkNyIiwiRGkiLCJEciIsInZvIiwiZ28iLCJOciIsIlByIiwiemUiLCJaciIsInFyIiwiVnIiLCJIciIsIktyIiwiY2hhckF0IiwiR3IiLCIkdSIsIlR1IiwicmVwbGFjZSIsImlvIiwiSnIiLCJ4ZSIsImZlIiwiWHIiLCJZciIsIlFyIiwiZ2UiLCJ0aHJ1IiwicmV2ZXJzZSIsImJlIiwiX28iLCJCZSIsInBsYW50IiwibmUiLCJ0ZSIsInJlIiwiZWUiLCJSaSIsInVlIiwiaWUiLCJFdSIsIm9lIiwiSXUiLCJ4byIsIkRlIiwiY2UiLCJYdSIsIk91IiwiYWUiLCJsZSIsImxvIiwic2UiLCJpaSIsImhlIiwicGUiLCJtZXNzYWdlIiwiZW8iLCJWZSIsIkppIiwiUHUiLCJ3ZSIsIkFlIiwia2UiLCJpbnB1dCIsImJpIiwiZXhlYyIsIm1pIiwiTmUiLCJNZSIsIlRpIiwiZmkiLCJaZSIsInFlIiwiS2UiLCJIZSIsIkplIiwiTmkiLCJZZSIsIlFlIiwiWGUiLCJudSIsInR1IiwicnUiLCJldSIsImZvIiwidXUiLCJpdSIsIm91IiwiZnUiLCJjdSIsImF1IiwiSm8iLCJsZWFkaW5nIiwibWF4V2FpdCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiaG8iLCJmbHVzaCIsImx1IiwiY2FjaGUiLCJDYWNoZSIsInN1IiwidnUiLCJkdSIsImp1IiwiaGkiLCJtdSIsImt1IiwiQWkiLCJuZXh0IiwiZG9uZSIsIlN1IiwidmFsdWVPZiIsIkN1IiwiTXUiLCJOZiIsInRvTG93ZXJDYXNlIiwiRnUiLCJadSIsImNoYWluIiwicXUiLCJLdSIsIkd1IiwiZGVmYXVsdHMiLCJwaWNrIiwiSnUiLCJEYXRlIiwiWXUiLCJFcnJvciIsIlF1IiwidGkiLCJTdHJpbmciLCJ1aSIsIm9pIiwidG9TdHJpbmciLCJhaSIsIklFX1BST1RPIiwicGkiLCJ2aSIsIkJ1ZmZlciIsImdpIiwiU3ltYm9sIiwiVWludDhBcnJheSIsImdldFByb3RvdHlwZU9mIiwieGkiLCJjcmVhdGUiLCJqaSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwic3BsaWNlIiwiaXNDb25jYXRTcHJlYWRhYmxlIiwiaXRlcmF0b3IiLCJ0b1N0cmluZ1RhZyIsIk9pIiwiY2xlYXJUaW1lb3V0IiwiU2kiLCJub3ciLCJJaSIsInNldFRpbWVvdXQiLCJjZWlsIiwiZmxvb3IiLCJXaSIsImdldE93blByb3BlcnR5U3ltYm9scyIsIkJpIiwiaXNCdWZmZXIiLCJMaSIsImlzRmluaXRlIiwiVWkiLCIkaSIsInJhbmRvbSIsIlBpIiwiWmkiLCJxaSIsIlZpIiwiS2kiLCJHaSIsIkhpIiwiWWkiLCJRaSIsIlhpIiwibm8iLCJybyIsInRlbXBsYXRlU2V0dGluZ3MiLCJlc2NhcGUiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwidmFyaWFibGUiLCJpbXBvcnRzIiwicG9wIiwiaGFzaCIsInN0cmluZyIsInNvIiwiQXJyYXlCdWZmZXIiLCJibyIsIkFvIiwia28iLCJFbyIsIk9vIiwiU28iLCJJbyIsIlJvIiwiem8iLCJXbyIsIkJvIiwiTG8iLCJVbyIsIkNvIiwiRG8iLCJNbyIsIlRvIiwiJG8iLCJGbyIsIk5vIiwiUG8iLCJabyIsInFvIiwiVm8iLCJLbyIsIkdvIiwiSG8iLCJZbyIsIlFvIiwiWG8iLCJuZiIsInRmIiwicmYiLCJlZiIsInVmIiwib2YiLCJmZiIsImxmIiwiaGYiLCJwZiIsIl9mIiwidmYiLCJkZiIsInlmIiwiYmYiLCJ4ZiIsImpmIiwid2YiLCJtZiIsIkFmIiwia2YiLCJSZiIsIkVmIiwiT2YiLCJTZiIsIklmIiwiemYiLCJXZiIsIkJmIiwiTGYiLCJVZiIsIkNmIiwiRGYiLCJNZiIsIlRmIiwiJGYiLCJGZiIsInRvVXBwZXJDYXNlIiwiUGYiLCJaZiIsInFmIiwiVmYiLCJLZiIsIkdmIiwiSGYiLCJKZiIsIllmIiwiUWYiLCJYZiIsIm5jIiwidGMiLCJyYyIsImVjIiwidWMiLCJpYyIsIm9jIiwiYWZ0ZXIiLCJhc3NpZ25JbiIsImFzc2lnbkluV2l0aCIsImFzc2lnbldpdGgiLCJiZWZvcmUiLCJiaW5kIiwiYmluZEFsbCIsImJpbmRLZXkiLCJjaHVuayIsImNvbXBhY3QiLCJjb25kIiwiY29uZm9ybXMiLCJjb25zdGFudCIsImNvdW50QnkiLCJjdXJyeVJpZ2h0IiwiZGVib3VuY2UiLCJkZWZhdWx0c0RlZXAiLCJkZWZlciIsImRlbGF5IiwiZGlmZmVyZW5jZSIsImRpZmZlcmVuY2VCeSIsImRpZmZlcmVuY2VXaXRoIiwiZHJvcCIsImRyb3BSaWdodCIsImRyb3BSaWdodFdoaWxlIiwiZHJvcFdoaWxlIiwiZmlsbCIsImZsYXRNYXAiLCJmbGF0TWFwRGVlcCIsImZsYXRNYXBEZXB0aCIsImZsYXR0ZW5EZWVwIiwiZmxhdHRlbkRlcHRoIiwiZmxpcCIsImZsb3ciLCJmbG93UmlnaHQiLCJmcm9tUGFpcnMiLCJmdW5jdGlvbnMiLCJmdW5jdGlvbnNJbiIsImdyb3VwQnkiLCJpbml0aWFsIiwiaW50ZXJzZWN0aW9uIiwiaW50ZXJzZWN0aW9uQnkiLCJpbnRlcnNlY3Rpb25XaXRoIiwiaW52ZXJ0IiwiaW52ZXJ0QnkiLCJpbnZva2VNYXAiLCJrZXlCeSIsImtleXNJbiIsIm1hcEtleXMiLCJtYXBWYWx1ZXMiLCJtYXRjaGVzIiwibWF0Y2hlc1Byb3BlcnR5IiwibWVtb2l6ZSIsIm1lcmdlIiwibWVyZ2VXaXRoIiwibWV0aG9kIiwibWV0aG9kT2YiLCJuZWdhdGUiLCJvbWl0Iiwib21pdEJ5Iiwib25jZSIsIm9yZGVyQnkiLCJvdmVyIiwib3ZlckFyZ3MiLCJvdmVyRXZlcnkiLCJvdmVyU29tZSIsInBhcnRpYWwiLCJwYXJ0aWFsUmlnaHQiLCJwYXJ0aXRpb24iLCJwaWNrQnkiLCJwcm9wZXJ0eSIsInByb3BlcnR5T2YiLCJwdWxsIiwicHVsbEFsbCIsInB1bGxBbGxCeSIsInB1bGxBbGxXaXRoIiwicHVsbEF0IiwicmFuZ2UiLCJyYW5nZVJpZ2h0IiwicmVqZWN0IiwicmVtb3ZlIiwicmVzdCIsInNhbXBsZVNpemUiLCJzZXRXaXRoIiwic2h1ZmZsZSIsInNvcnRCeSIsInNvcnRlZFVuaXEiLCJzb3J0ZWRVbmlxQnkiLCJzcHJlYWQiLCJ0YWlsIiwidGFrZSIsInRha2VSaWdodCIsInRha2VSaWdodFdoaWxlIiwidGFrZVdoaWxlIiwidGFwIiwidGhyb3R0bGUiLCJ0b0FycmF5IiwidG9QYWlycyIsInRvUGFpcnNJbiIsInRvUGxhaW5PYmplY3QiLCJ1bmFyeSIsInVuaW9uIiwidW5pb25CeSIsInVuaW9uV2l0aCIsInVuaXEiLCJ1bmlxQnkiLCJ1bmlxV2l0aCIsInVuc2V0IiwidW56aXAiLCJ1bnppcFdpdGgiLCJ1cGRhdGUiLCJ1cGRhdGVXaXRoIiwidmFsdWVzIiwidmFsdWVzSW4iLCJ3aXRob3V0Iiwid29yZHMiLCJ4b3IiLCJ4b3JCeSIsInhvcldpdGgiLCJ6aXAiLCJ6aXBPYmplY3QiLCJ6aXBPYmplY3REZWVwIiwiemlwV2l0aCIsImVudHJpZXMiLCJlbnRyaWVzSW4iLCJleHRlbmQiLCJleHRlbmRXaXRoIiwiYXR0ZW1wdCIsImNhbWVsQ2FzZSIsImNhcGl0YWxpemUiLCJjbGFtcCIsImNsb25lRGVlcCIsImNsb25lRGVlcFdpdGgiLCJjbG9uZVdpdGgiLCJjb25mb3Jtc1RvIiwiZGVidXJyIiwiZGVmYXVsdFRvIiwiZGl2aWRlIiwiZW5kc1dpdGgiLCJlcSIsImVzY2FwZVJlZ0V4cCIsImV2ZXJ5IiwiZmluZCIsImZpbmRJbmRleCIsImZpbmRLZXkiLCJmaW5kTGFzdCIsImZpbmRMYXN0SW5kZXgiLCJmaW5kTGFzdEtleSIsImZvckVhY2hSaWdodCIsImZvckluIiwiZm9ySW5SaWdodCIsImZvck93biIsImZvck93blJpZ2h0IiwiZ3RlIiwiaGFzSW4iLCJoZWFkIiwiaWRlbnRpdHkiLCJpbmNsdWRlcyIsImluZGV4T2YiLCJpblJhbmdlIiwiaW52b2tlIiwiaXNBcmd1bWVudHMiLCJpc0FycmF5TGlrZSIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNCb29sZWFuIiwiaXNFbGVtZW50IiwiaXNFbXB0eSIsImlzRXF1YWwiLCJpc0VxdWFsV2l0aCIsImlzRXJyb3IiLCJpc0ludGVnZXIiLCJpc0xlbmd0aCIsImlzTWF0Y2giLCJpc01hdGNoV2l0aCIsImlzTmFOIiwiaXNOYXRpdmUiLCJpc05pbCIsImlzTnVsbCIsImlzTnVtYmVyIiwiaXNPYmplY3QiLCJpc09iamVjdExpa2UiLCJpc1BsYWluT2JqZWN0IiwiaXNTYWZlSW50ZWdlciIsImlzU3RyaW5nIiwiaXNTeW1ib2wiLCJpc1VuZGVmaW5lZCIsImlzV2Vha01hcCIsImlzV2Vha1NldCIsImtlYmFiQ2FzZSIsImxhc3QiLCJsYXN0SW5kZXhPZiIsImxvd2VyQ2FzZSIsImxvd2VyRmlyc3QiLCJsdGUiLCJtYXhCeSIsIm1lYW4iLCJtZWFuQnkiLCJtaW5CeSIsInN0dWJBcnJheSIsInN0dWJGYWxzZSIsInN0dWJPYmplY3QiLCJzdHViU3RyaW5nIiwic3R1YlRydWUiLCJtdWx0aXBseSIsIm50aCIsIm5vQ29uZmxpY3QiLCJub29wIiwicGFkIiwicGFkRW5kIiwicGFkU3RhcnQiLCJyZWR1Y2VSaWdodCIsInJlcGVhdCIsInJvdW5kIiwic2FtcGxlIiwic25ha2VDYXNlIiwic29tZSIsInNvcnRlZEluZGV4Iiwic29ydGVkSW5kZXhCeSIsInNvcnRlZEluZGV4T2YiLCJzb3J0ZWRMYXN0SW5kZXgiLCJzb3J0ZWRMYXN0SW5kZXhCeSIsInNvcnRlZExhc3RJbmRleE9mIiwic3RhcnRDYXNlIiwic3RhcnRzV2l0aCIsInN1YnRyYWN0Iiwic3VtIiwic3VtQnkiLCJ0ZW1wbGF0ZSIsInNvdXJjZVVSTCIsInRpbWVzIiwidG9GaW5pdGUiLCJ0b0xlbmd0aCIsInRvTG93ZXIiLCJ0b051bWJlciIsInRvU2FmZUludGVnZXIiLCJ0b1VwcGVyIiwidHJpbSIsInRyaW1FbmQiLCJ0cmltU3RhcnQiLCJ0cnVuY2F0ZSIsInNlcGFyYXRvciIsIm9taXNzaW9uIiwic2VhcmNoIiwidW5lc2NhcGUiLCJ1bmlxdWVJZCIsInVwcGVyQ2FzZSIsInVwcGVyRmlyc3QiLCJlYWNoUmlnaHQiLCJmaXJzdCIsIlZFUlNJT04iLCJ0eXBlIiwiZW5kIiwiY29tbWl0IiwidG9KU09OIiwiZXZhbCIsIndpbmRvdyIsIndlYnBhY2tQb2x5ZmlsbCIsImRlcHJlY2F0ZSIsInBhdGhzIiwiY2hpbGRyZW4iLCJkZWZpbmVQcm9wZXJ0eSIsImZhcmVEYXRhIiwiZHVhbFpvbmVPdmVybGFwIiwib3lzdGVyRGF5VG90YWxzIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvbk1heFpvbmUiLCJjb25DdW1Ub3RhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7QUFFQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7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LE1BQUlDLFdBQVcsSUFBZjtBQUNBNTlCLFdBQVNXLE9BQVQsQ0FBaUIsVUFBUzNELE9BQVQsRUFBa0I7QUFDbEM0Z0MsZ0JBQVksOEZBQUFqZ0MsQ0FBY1gsUUFBUXhCLEtBQXRCLEVBQTZCb0MsV0FBN0IsQ0FBWjtBQUNBLEdBRkQ7QUFHQSsvQixjQUFZbjlCLElBQVosQ0FBaUJvOUIsUUFBakI7O0FBRUE7QUFDQyxNQUFJQyxhQUFhLHVGQUFBemhDLENBQU8sd0ZBQUFRLENBQVFvRCxTQUFTRyxHQUFULENBQWE7QUFBQSxXQUFLMEosRUFBRXJPLEtBQVA7QUFBQSxHQUFiLENBQVIsQ0FBUCxDQUFqQjtBQUNBLE9BQUssSUFBSXNOLElBQUksQ0FBYixFQUFnQkEsS0FBSyswQixVQUFyQixFQUFpQy8wQixHQUFqQyxFQUFzQztBQUNyQztBQUNBLFFBQUlnMUIsY0FBYyw0RkFBQTFnQyxDQUFZMEwsQ0FBWixFQUFleEwsU0FBZixDQUFsQjtBQUNDLFNBQUssSUFBSW9NLElBQUksQ0FBYixFQUFnQkEsSUFBSTFKLFNBQVNuRSxNQUE3QixFQUFxQzZOLEdBQXJDLEVBQTBDO0FBQ3pDO0FBQ0RvMEIscUJBQWUsZ0dBQUExK0IsQ0FBZSxDQUFmLEVBQWtCMEosQ0FBbEIsRUFBcUI5SSxTQUFTMEosQ0FBVCxFQUFZLENBQVosQ0FBckIsRUFBcUMxSixTQUFTMEosQ0FBVCxFQUFZLENBQVosQ0FBckMsRUFBcUQ5TCxXQUFyRCxDQUFmO0FBQ0M7QUFDRisvQixnQkFBWW45QixJQUFaLENBQWlCczlCLFdBQWpCO0FBQ0E7O0FBRUY7QUFDQSxTQUFPLHVGQUFBdGhDLENBQU9taEMsV0FBUCxDQUFQO0FBQ0E7QUFDQSxDQWhLRDs7QUFrS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUkiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZTRjZDFkM2Y0NjcxMTRhMTk5MiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaC9mcCc7XG5cbi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYWlseSBjYXAgY29zdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB0aGUgKG1heGltdW0pIHpvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYWlseUNhcHMgLSBsb29rcyBhdCB0aGUgZGFpbHlDYXBzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIGRhaWx5IGNhcCBiZXR3ZWVuIHpvbmVzIDEgYW5kIHRoZSB6b25lIHBhcmFtZXRlciAoYXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnRzIGF0IHpvbmUgMSlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpIHtcbiAgcmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENhcCA9IF8uY3VycnkoKHpvbmUsIGNhcHMpID0+IGNhcHNbem9uZVRvSm91cm5leSh6b25lKV0pO1xuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuICByZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9IF8uY3VycnkoKHRhcmdldCwgdmFsdWUpID0+IHZhbHVlID49IHRhcmdldCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsInZhciBfID0gcmVxdWlyZSgnLi9sb2Rhc2gubWluJykucnVuSW5Db250ZXh0KCk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZnAvX2Jhc2VDb252ZXJ0JykoXywgXyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2xvZGFzaC9mcC5qcyIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWF4TnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gXHQvL0ZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Ly9GT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMpIHtcbiAgY29uc3QgbWF4RGFpbHkgPSBvcHRpb25zLm1heERhaWx5IHx8IG51bGw7XG4gIC8vYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdG1pblNpbmdsZSwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHNpbmdsZSBqb3VybmV5XG5cdFx0bWF4U2luZ2xlLCAvL21pbmltdW0gc2luZ2xlIHpvbmUgb2YgdGhlIGpvdXJuZXlcbiAgICBtaW5UcmF2ZWxjYXJkLCAvL21pbmltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdG1heFRyYXZlbGNhcmQsIC8vbWF4aW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0Ly9pZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cdC8vc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuXG4gIGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuICBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vaWYgbm8gZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZFxuICAgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcbiAgICBcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IC8vbWF4IHRyYXZlbGNhcmQgaXMgd2hpY2hldmVyIGlzIGxhcmdlc3QgbWF4IGRhaWx5IG9yIG1heCB0cmF2ZWxjYXJkXG4gICAgLy9lbHNlIGlmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvLCBhbmQgdGhlcmUgYXJlIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmQsIGhhdmUgYSBtaW4gY2hhcmdlZCB6b25lIChub3QgY2hhcmdlIHRoZSBkYWlseSBjYXAgLSB0aGUgZnJvbnQpXG5cdFx0fSBlbHNlIHsgLy9JRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0ZmluYWxDb25kaXRpb24gPSAobWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSk7XG5cdFx0fVxuXHR9XG5cblx0Ly9pZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHRyZXR1cm4gZ2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdHJldHVybiBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdHJldHVybiBzcGxpdE9yRnVsbEZhcmUoXG4gICAgICBtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuIFx0XHRcdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG4gXHRcdFx0c2luZ2xlRmFyZXMpO1xuXG5cdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdHJldHVybiAwO1xuXG4gXHQvL2JvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH1cbiAgcmV0dXJuIGdldFNpbmdsZUZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG4gXHQgLy9FTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsImltcG9ydCBfIGZyb20gJ2xvZGFzaC9mcCc7XG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRDYXAsXG4gIGdldFNpbmdsZUZhcmUsXG4gIG1ldCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyRGF5VG90YWwoZGF0YSkge1xuICBsZXQge1xuICAgIGpvdXJuZXlzLFxuICAgIHNpbmdsZUZhcmVzLFxuICAgIGRhaWx5Q2FwcyxcbiAgfSA9IGRhdGE7XG5cbiAgbGV0IHBlYWtUb3RhbCA9IDA7XG4gIGxldCBvZmZQZWFrVG90YWwgPSAwO1xuICBsZXQgbWF4Wm9uZVNvRmFyID0gbnVsbDtcblxuICAvLyBqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uIChqb3VybmV5KSB7XG4gIC8vICAgLy9HZXRzIHRoZSBtYXhpbXVtIHpvbmVzIG9mIGFsbHMgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcbiAgLy8gICBtYXhab25lU29GYXIgPSBtYXhOdW0oW10uY29uY2F0KGpvdXJuZXkuem9uZXMsIG1heFpvbmVTb0ZhcikpO1xuICAvL1xuICAvLyAgIC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcbiAgLy8gICBwZWFrVG90YWwgKz0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIFBFQUsgUEFZRyBSQVRFUztcbiAgLy8gICBvZmZQZWFrVG90YWwgKz0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIFBFQUsgUEFZRyBSQVRFU1xuICAvL1xuICAvLyAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoIWpvdXJuZXkucGVhayAmJiBvZmZQZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBvZmZQZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7IC8vYW5kIHNldCBhbiBhbGVydCB0byBzYXkgb2ZmIGRhaWx5IGNhcCByZWFjaGVkPz8/PyEhISAoYnV0IGNvdWxkIGJlIG92ZXJyaWRkZW4gYWZ0ZXIpXG4gIC8vICAgfVxuICAvL1xuICAvLyAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAvLyAgIGlmIChwZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBwZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7XG4gIC8vICAgfVxuICAvLyB9KTtcblxuICAvLyByZXR1cm4gbWluTnVtKFtwZWFrVG90YWwsIG9mZlBlYWtUb3RhbF0pO1xuXG4gIC8vIGNvbnN0IHRvdGFscyA9IGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gIC8vICAgY29uc3Qgc2luZ2xlRmFyZUEgPSBnZXRTaW5nbGVGYXJlKGEuem9uZXMsIHNpbmdsZUZhcmVzKTtcbiAgLy8gICBjb25zdCBzaW5nbGVGYXJlQiA9IGdldFNpbmdsZUZhcmUoYi56b25lcywgc2luZ2xlRmFyZXMpO1xuICAvL1xuICAvLyAgIGNvbnN0IHJ1bm5pbmcgPSAoYS5ydW5uaW5nID8gYSA6IHtcbiAgLy8gICAgICAgcGVha1RvdGFsOiBzaW5nbGVGYXJlQSxcbiAgLy8gICAgICAgb2ZmUGVha1RvdGFsOiBzaW5nbGVGYXJlQSxcbiAgLy8gICAgICAgbWF4Wm9uZTogYS56b25lcyxcbiAgLy8gICB9KTtcbiAgLy9cbiAgLy8gICBjb25zdCBjdXJyZW50ID0ge1xuICAvLyAgICAgcnVubmluZzogdHJ1ZSxcbiAgLy8gICAgIHBlYWtUb3RhbDogcnVubmluZy5wZWFrVG90YWwgKyBzaW5nbGVGYXJlQixcbiAgLy8gICAgIG9mZlBlYWtUb3RhbDogcnVubmluZy5wZWFrVG90YWwgKyBzaW5nbGVGYXJlQixcbiAgLy8gICAgIG1heFpvbmU6IG1heE51bShbXS5jb25jYXQocnVubmluZy5tYXhab25lLCBiLnpvbmVzKSksXG4gIC8vICAgICB6b25lczogYi56b25lcyxcbiAgLy8gICB9O1xuICAvL1xuICAvLyAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoIWEucGVhayAmJiBjdXJyZW50Lm9mZlBlYWtUb3RhbCA+PSBnZXREYWlseUNhcChjdXJyZW50Lm1heFpvbmUsIGRhaWx5Q2FwcykpIHtcbiAgLy8gICAgIGN1cnJlbnQub2ZmUGVha1RvdGFsID0gZ2V0RGFpbHlDYXAoY3VycmVudC5tYXhab25lLCBkYWlseUNhcHMpOyAvL2FuZCBzZXQgYW4gYWxlcnQgdG8gc2F5IG9mZiBkYWlseSBjYXAgcmVhY2hlZD8/Pz8hISEgKGJ1dCBjb3VsZCBiZSBvdmVycmlkZGVuIGFmdGVyKVxuICAvLyAgIH1cbiAgLy9cbiAgLy8gICAvL2lmIHRoZSBkYWlseSBjYXAgZm9yIHRoZSBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgLy8gICBpZiAoY3VycmVudC5wZWFrVG90YWwgPj0gZ2V0RGFpbHlDYXAoY3VycmVudC5tYXhab25lLCBkYWlseUNhcHMpKSB7XG4gIC8vICAgICBjdXJyZW50LnBlYWtUb3RhbCA9IGdldERhaWx5Q2FwKGN1cnJlbnQubWF4Wm9uZSwgZGFpbHlDYXBzKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmV0dXJuIGN1cnJlbnQ7XG4vLyB9XG5cbiAgLy8gdmFyIHQgPSBnZXREYWlseUNhcCgyKTtcbiAgLy9cbiAgLy8gZGVidWdnZXI7XG5cbiAgY29uc3QgZ2V0RGFpbHlDYXAgPSBnZXRDYXAoXywgZGFpbHlDYXBzKTtcbiAgY29uc3QgY2FwTWV0ID0gXy5jb21wb3NlKG1ldCwgZ2V0RGFpbHlDYXApO1xuXG4gIGNvbnN0IHRvdGFscyA9IGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGNvbnN0IHNpbmdsZUZhcmUgPSBnZXRTaW5nbGVGYXJlKGIuem9uZXMsIHNpbmdsZUZhcmVzKTtcbiAgICBjb25zdCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcbiAgICBjb25zdCBtZXREYWlseUNhcCA9IGNhcE1ldChtYXhab25lKTtcblxuICAgIGNvbnNvbGUubG9nKG1ldERhaWx5Q2FwKTtcbiAgICBkZWJ1Z2dlcjtcblxuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbCArIHNpbmdsZUZhcmU7XG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIC8vaWYgT0ZGIHBlYWsgdHJhdmVsIGFuZCB0aGUgT0ZGIFBFQUsgZGFpbHkgY2FwIGZvciBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcbiAgICBpZiAoIWEucGVhayAmJiBtZXREYWlseUNhcChvZmZQZWFrVG90YWwpKSB7XG4gICAgICBvZmZQZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lKTsgLy9hbmQgc2V0IGFuIGFsZXJ0IHRvIHNheSBvZmYgZGFpbHkgY2FwIHJlYWNoZWQ/Pz8/ISEhIChidXQgY291bGQgYmUgb3ZlcnJpZGRlbiBhZnRlcilcbiAgICB9XG5cblxuICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgIGlmIChtZXREYWlseUNhcChwZWFrVG90YWwpKSB7XG4gICAgICBwZWFrVG90YWwgPSBnZXREYWlseUNhcChtYXhab25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGVha1RvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICB9O1xuICB9LCB7XG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KTtcblxuICByZXR1cm4gbWluTnVtKFt0b3RhbHMucGVha1RvdGFsLCB0b3RhbHMub2ZmUGVha1RvdGFsXSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwidmFyIG1hcHBpbmcgPSByZXF1aXJlKCcuL19tYXBwaW5nJyksXG4gICAgZmFsbGJhY2tIb2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2UuICovXG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiwgd2l0aCBhbiBhcml0eSBvZiBgbmAsIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGVcbiAqIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBcml0eShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpOyB9XG4gICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTsgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB1cCB0byBgbmAgYXJndW1lbnRzLCBpZ25vcmluZ1xuICogYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBjYXAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFyeShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMoYSwgYik7IH1cbiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZ1bmMoYSk7IH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHJlc3VsdFtsZW5ndGhdID0gYXJyYXlbbGVuZ3RoXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGdpdmVuIG9iamVjdCB1c2luZyB0aGUgYXNzaWdubWVudCBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGFzc2lnbm1lbnQgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjbG9uZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNsb25lcihmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gZnVuYyh7fSwgb2JqZWN0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc3ByZWFkYCB3aGljaCBmbGF0dGVucyB0aGUgc3ByZWFkIGFycmF5IGludG9cbiAqIHRoZSBhcmd1bWVudHMgb2YgdGhlIGludm9rZWQgYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBzcHJlYWQgYXJndW1lbnRzIG92ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzcHJlYWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmxhdFNwcmVhZChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGFycmF5ID0gYXJnc1tzdGFydF0sXG4gICAgICAgIG90aGVyQXJncyA9IGFyZ3Muc2xpY2UoMCwgc3RhcnQpO1xuXG4gICAgaWYgKGFycmF5KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgIT0gbGFzdEluZGV4KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJncy5zbGljZShzdGFydCArIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgYW5kIHVzZXMgYGNsb25lcmAgdG8gY2xvbmUgdGhlIGZpcnN0XG4gKiBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lciBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgYXJndW1lbnRzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgaW1tdXRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgYXJnc1tsZW5ndGhdID0gYXJndW1lbnRzW2xlbmd0aF07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBhcmdzWzBdID0gY2xvbmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGNvbnZlcnRgIHdoaWNoIGFjY2VwdHMgYSBgdXRpbGAgb2JqZWN0IG9mIG1ldGhvZHNcbiAqIHJlcXVpcmVkIHRvIHBlcmZvcm0gY29udmVyc2lvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHV0aWwgVGhlIHV0aWwgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNhcD10cnVlXSBTcGVjaWZ5IGNhcHBpbmcgaXRlcmF0ZWUgYXJndW1lbnRzLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jdXJyeT10cnVlXSBTcGVjaWZ5IGN1cnJ5aW5nLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5maXhlZD10cnVlXSBTcGVjaWZ5IGZpeGVkIGFyaXR5LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbW11dGFibGU9dHJ1ZV0gU3BlY2lmeSBpbW11dGFibGUgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVhcmc9dHJ1ZV0gU3BlY2lmeSByZWFycmFuZ2luZyBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgZnVuY3Rpb24gb3Igb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ29udmVydCh1dGlsLCBuYW1lLCBmdW5jLCBvcHRpb25zKSB7XG4gIHZhciBzZXRQbGFjZWhvbGRlcixcbiAgICAgIGlzTGliID0gdHlwZW9mIG5hbWUgPT0gJ2Z1bmN0aW9uJyxcbiAgICAgIGlzT2JqID0gbmFtZSA9PT0gT2JqZWN0KG5hbWUpO1xuXG4gIGlmIChpc09iaikge1xuICAgIG9wdGlvbnMgPSBmdW5jO1xuICAgIGZ1bmMgPSBuYW1lO1xuICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICB2YXIgY29uZmlnID0ge1xuICAgICdjYXAnOiAnY2FwJyBpbiBvcHRpb25zID8gb3B0aW9ucy5jYXAgOiB0cnVlLFxuICAgICdjdXJyeSc6ICdjdXJyeScgaW4gb3B0aW9ucyA/IG9wdGlvbnMuY3VycnkgOiB0cnVlLFxuICAgICdmaXhlZCc6ICdmaXhlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZml4ZWQgOiB0cnVlLFxuICAgICdpbW11dGFibGUnOiAnaW1tdXRhYmxlJyBpbiBvcHRpb25zID8gb3B0aW9ucy5pbW11dGFibGUgOiB0cnVlLFxuICAgICdyZWFyZyc6ICdyZWFyZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucmVhcmcgOiB0cnVlXG4gIH07XG5cbiAgdmFyIGZvcmNlQ3VycnkgPSAoJ2N1cnJ5JyBpbiBvcHRpb25zKSAmJiBvcHRpb25zLmN1cnJ5LFxuICAgICAgZm9yY2VGaXhlZCA9ICgnZml4ZWQnIGluIG9wdGlvbnMpICYmIG9wdGlvbnMuZml4ZWQsXG4gICAgICBmb3JjZVJlYXJnID0gKCdyZWFyZycgaW4gb3B0aW9ucykgJiYgb3B0aW9ucy5yZWFyZyxcbiAgICAgIHBsYWNlaG9sZGVyID0gaXNMaWIgPyBmdW5jIDogZmFsbGJhY2tIb2xkZXIsXG4gICAgICBwcmlzdGluZSA9IGlzTGliID8gZnVuYy5ydW5JbkNvbnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICB2YXIgaGVscGVycyA9IGlzTGliID8gZnVuYyA6IHtcbiAgICAnYXJ5JzogdXRpbC5hcnksXG4gICAgJ2Fzc2lnbic6IHV0aWwuYXNzaWduLFxuICAgICdjbG9uZSc6IHV0aWwuY2xvbmUsXG4gICAgJ2N1cnJ5JzogdXRpbC5jdXJyeSxcbiAgICAnZm9yRWFjaCc6IHV0aWwuZm9yRWFjaCxcbiAgICAnaXNBcnJheSc6IHV0aWwuaXNBcnJheSxcbiAgICAnaXNGdW5jdGlvbic6IHV0aWwuaXNGdW5jdGlvbixcbiAgICAnaXRlcmF0ZWUnOiB1dGlsLml0ZXJhdGVlLFxuICAgICdrZXlzJzogdXRpbC5rZXlzLFxuICAgICdyZWFyZyc6IHV0aWwucmVhcmcsXG4gICAgJ3RvSW50ZWdlcic6IHV0aWwudG9JbnRlZ2VyLFxuICAgICd0b1BhdGgnOiB1dGlsLnRvUGF0aFxuICB9O1xuXG4gIHZhciBhcnkgPSBoZWxwZXJzLmFyeSxcbiAgICAgIGFzc2lnbiA9IGhlbHBlcnMuYXNzaWduLFxuICAgICAgY2xvbmUgPSBoZWxwZXJzLmNsb25lLFxuICAgICAgY3VycnkgPSBoZWxwZXJzLmN1cnJ5LFxuICAgICAgZWFjaCA9IGhlbHBlcnMuZm9yRWFjaCxcbiAgICAgIGlzQXJyYXkgPSBoZWxwZXJzLmlzQXJyYXksXG4gICAgICBpc0Z1bmN0aW9uID0gaGVscGVycy5pc0Z1bmN0aW9uLFxuICAgICAga2V5cyA9IGhlbHBlcnMua2V5cyxcbiAgICAgIHJlYXJnID0gaGVscGVycy5yZWFyZyxcbiAgICAgIHRvSW50ZWdlciA9IGhlbHBlcnMudG9JbnRlZ2VyLFxuICAgICAgdG9QYXRoID0gaGVscGVycy50b1BhdGg7XG5cbiAgdmFyIGFyeU1ldGhvZEtleXMgPSBrZXlzKG1hcHBpbmcuYXJ5TWV0aG9kKTtcblxuICB2YXIgd3JhcHBlcnMgPSB7XG4gICAgJ2Nhc3RBcnJheSc6IGZ1bmN0aW9uKGNhc3RBcnJheSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICAgID8gY2FzdEFycmF5KGNsb25lQXJyYXkodmFsdWUpKVxuICAgICAgICAgIDogY2FzdEFycmF5LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAnaXRlcmF0ZWUnOiBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnVuYyA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgIGFyaXR5ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlcmF0ZWUoZnVuYywgYXJpdHkpLFxuICAgICAgICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoY29uZmlnLmNhcCAmJiB0eXBlb2YgYXJpdHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICBhcml0eSA9IGFyaXR5ID4gMiA/IChhcml0eSAtIDIpIDogMTtcbiAgICAgICAgICByZXR1cm4gKGxlbmd0aCAmJiBsZW5ndGggPD0gYXJpdHkpID8gcmVzdWx0IDogYmFzZUFyeShyZXN1bHQsIGFyaXR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9LFxuICAgICdtaXhpbic6IGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHZhciBmdW5jID0gdGhpcztcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgICAgICAgcmV0dXJuIG1peGluKGZ1bmMsIE9iamVjdChzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFpcnMgPSBbXTtcbiAgICAgICAgZWFjaChrZXlzKHNvdXJjZSksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgcGFpcnMucHVzaChba2V5LCBmdW5jLnByb3RvdHlwZVtrZXldXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtaXhpbihmdW5jLCBPYmplY3Qoc291cmNlKSk7XG5cbiAgICAgICAgZWFjaChwYWlycywgZnVuY3Rpb24ocGFpcikge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHBhaXJbMV07XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICBmdW5jLnByb3RvdHlwZVtwYWlyWzBdXSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZnVuYy5wcm90b3R5cGVbcGFpclswXV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ250aEFyZyc6IGZ1bmN0aW9uKG50aEFyZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIGFyaXR5ID0gbiA8IDAgPyAxIDogKHRvSW50ZWdlcihuKSArIDEpO1xuICAgICAgICByZXR1cm4gY3VycnkobnRoQXJnKG4pLCBhcml0eSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ3JlYXJnJzogZnVuY3Rpb24ocmVhcmcpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihmdW5jLCBpbmRleGVzKSB7XG4gICAgICAgIHZhciBhcml0eSA9IGluZGV4ZXMgPyBpbmRleGVzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBjdXJyeShyZWFyZyhmdW5jLCBpbmRleGVzKSwgYXJpdHkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdydW5JbkNvbnRleHQnOiBmdW5jdGlvbihydW5JbkNvbnRleHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBiYXNlQ29udmVydCh1dGlsLCBydW5JbkNvbnRleHQoY29udGV4dCksIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhIGZ1bmN0aW9uIHdpdGggYW4gYXJpdHkgY2FwcGVkIGl0ZXJhdGVlIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RDYXAobmFtZSwgZnVuYykge1xuICAgIGlmIChjb25maWcuY2FwKSB7XG4gICAgICB2YXIgaW5kZXhlcyA9IG1hcHBpbmcuaXRlcmF0ZWVSZWFyZ1tuYW1lXTtcbiAgICAgIGlmIChpbmRleGVzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZVJlYXJnKGZ1bmMsIGluZGV4ZXMpO1xuICAgICAgfVxuICAgICAgdmFyIG4gPSAhaXNMaWIgJiYgbWFwcGluZy5pdGVyYXRlZUFyeVtuYW1lXTtcbiAgICAgIGlmIChuKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZUFyeShmdW5jLCBuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGEgY3VycmllZCBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Q3VycnkobmFtZSwgZnVuYywgbikge1xuICAgIHJldHVybiAoZm9yY2VDdXJyeSB8fCAoY29uZmlnLmN1cnJ5ICYmIG4gPiAxKSlcbiAgICAgID8gY3VycnkoZnVuYywgbilcbiAgICAgIDogZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYSBmaXhlZCBhcml0eSBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgY2FwLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Rml4ZWQobmFtZSwgZnVuYywgbikge1xuICAgIGlmIChjb25maWcuZml4ZWQgJiYgKGZvcmNlRml4ZWQgfHwgIW1hcHBpbmcuc2tpcEZpeGVkW25hbWVdKSkge1xuICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtuYW1lXSxcbiAgICAgICAgICBzdGFydCA9IGRhdGEgJiYgZGF0YS5zdGFydDtcblxuICAgICAgcmV0dXJuIHN0YXJ0ICA9PT0gdW5kZWZpbmVkID8gYXJ5KGZ1bmMsIG4pIDogZmxhdFNwcmVhZChmdW5jLCBzdGFydCk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhbiByZWFyZ2VkIGZ1bmN0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RSZWFyZyhuYW1lLCBmdW5jLCBuKSB7XG4gICAgcmV0dXJuIChjb25maWcucmVhcmcgJiYgbiA+IDEgJiYgKGZvcmNlUmVhcmcgfHwgIW1hcHBpbmcuc2tpcFJlYXJnW25hbWVdKSlcbiAgICAgID8gcmVhcmcoZnVuYywgbWFwcGluZy5tZXRob2RSZWFyZ1tuYW1lXSB8fCBtYXBwaW5nLmFyeVJlYXJnW25dKVxuICAgICAgOiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgb2JqZWN0YCBieSBgcGF0aGAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2xvbmUgYnkuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZUJ5UGF0aChvYmplY3QsIHBhdGgpIHtcbiAgICBwYXRoID0gdG9QYXRoKHBhdGgpO1xuXG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgICByZXN1bHQgPSBjbG9uZShPYmplY3Qob2JqZWN0KSksXG4gICAgICAgIG5lc3RlZCA9IHJlc3VsdDtcblxuICAgIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0gcGF0aFtpbmRleF0sXG4gICAgICAgICAgdmFsdWUgPSBuZXN0ZWRba2V5XTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgbmVzdGVkW3BhdGhbaW5kZXhdXSA9IGNsb25lKGluZGV4ID09IGxhc3RJbmRleCA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBuZXN0ZWQgPSBuZXN0ZWRba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBgbG9kYXNoYCB0byBhbiBpbW11dGFibGUgYXV0by1jdXJyaWVkIGl0ZXJhdGVlLWZpcnN0IGRhdGEtbGFzdFxuICAgKiB2ZXJzaW9uIHdpdGggY29udmVyc2lvbiBgb3B0aW9uc2AgYXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuIFNlZSBgYmFzZUNvbnZlcnRgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGBsb2Rhc2hgLlxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydExpYihvcHRpb25zKSB7XG4gICAgcmV0dXJuIF8ucnVuSW5Db250ZXh0LmNvbnZlcnQob3B0aW9ucykodW5kZWZpbmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb252ZXJ0ZXIgZnVuY3Rpb24gZm9yIGBmdW5jYCBvZiBgbmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb252ZXJ0ZXIgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDb252ZXJ0ZXIobmFtZSwgZnVuYykge1xuICAgIHZhciByZWFsTmFtZSA9IG1hcHBpbmcuYWxpYXNUb1JlYWxbbmFtZV0gfHwgbmFtZSxcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1hcHBpbmcucmVtYXBbcmVhbE5hbWVdIHx8IHJlYWxOYW1lLFxuICAgICAgICBvbGRPcHRpb25zID0gb3B0aW9ucztcblxuICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbmV3VXRpbCA9IGlzTGliID8gcHJpc3RpbmUgOiBoZWxwZXJzLFxuICAgICAgICAgIG5ld0Z1bmMgPSBpc0xpYiA/IHByaXN0aW5lW21ldGhvZE5hbWVdIDogZnVuYyxcbiAgICAgICAgICBuZXdPcHRpb25zID0gYXNzaWduKGFzc2lnbih7fSwgb2xkT3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gYmFzZUNvbnZlcnQobmV3VXRpbCwgcmVhbE5hbWUsIG5ld0Z1bmMsIG5ld09wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdHMgaXRlcmF0ZWUsIHdpdGggdXAgdG8gYG5gXG4gICAqIGFyZ3VtZW50cywgaWdub3JpbmcgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgaXRlcmF0ZWUgYXJndW1lbnRzIGZvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBpdGVyYXRlZUFyeShmdW5jLCBuKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicgPyBiYXNlQXJ5KGZ1bmMsIG4pIDogZnVuYztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0cyBpdGVyYXRlZSB3aXRoIGFyZ3VtZW50c1xuICAgKiBhcnJhbmdlZCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBgaW5kZXhlc2Agd2hlcmUgdGhlIGFyZ3VtZW50IHZhbHVlIGF0XG4gICAqIHRoZSBmaXJzdCBpbmRleCBpcyBwcm92aWRlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIHRoZSBhcmd1bWVudCB2YWx1ZSBhdFxuICAgKiB0aGUgc2Vjb25kIGluZGV4IGlzIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQsIGFuZCBzbyBvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVhcnJhbmdlIGl0ZXJhdGVlIGFyZ3VtZW50cyBmb3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGFycmFuZ2VkIGFyZ3VtZW50IGluZGV4ZXMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gaXRlcmF0ZWVSZWFyZyhmdW5jLCBpbmRleGVzKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgdmFyIG4gPSBpbmRleGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiBiYXNlQXJpdHkocmVhcmcoYmFzZUFyeShmdW5jLCBuKSwgaW5kZXhlcyksIG4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGZpcnN0IGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMoKTtcbiAgICAgIH1cbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGNvbmZpZy5yZWFyZyA/IDAgOiAobGVuZ3RoIC0gMSk7XG4gICAgICBhcmdzW2luZGV4XSA9IHRyYW5zZm9ybShhcmdzW2luZGV4XSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIGFuZCBhcHBseXMgdGhlIGNvbnZlcnNpb25zXG4gICAqIHJ1bGVzIGJ5IGBuYW1lYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcChuYW1lLCBmdW5jKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgcmVhbE5hbWUgPSBtYXBwaW5nLmFsaWFzVG9SZWFsW25hbWVdIHx8IG5hbWUsXG4gICAgICAgIHdyYXBwZWQgPSBmdW5jLFxuICAgICAgICB3cmFwcGVyID0gd3JhcHBlcnNbcmVhbE5hbWVdO1xuXG4gICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgIHdyYXBwZWQgPSB3cmFwcGVyKGZ1bmMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcuaW1tdXRhYmxlKSB7XG4gICAgICBpZiAobWFwcGluZy5tdXRhdGUuYXJyYXlbcmVhbE5hbWVdKSB7XG4gICAgICAgIHdyYXBwZWQgPSB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lQXJyYXkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUub2JqZWN0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjcmVhdGVDbG9uZXIoZnVuYykpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUuc2V0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjbG9uZUJ5UGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgICBlYWNoKG1hcHBpbmcuYXJ5TWV0aG9kW2FyeUtleV0sIGZ1bmN0aW9uKG90aGVyTmFtZSkge1xuICAgICAgICBpZiAocmVhbE5hbWUgPT0gb3RoZXJOYW1lKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtyZWFsTmFtZV0sXG4gICAgICAgICAgICAgIGFmdGVyUmVhcmcgPSBkYXRhICYmIGRhdGEuYWZ0ZXJSZWFyZztcblxuICAgICAgICAgIHJlc3VsdCA9IGFmdGVyUmVhcmdcbiAgICAgICAgICAgID8gY2FzdEZpeGVkKHJlYWxOYW1lLCBjYXN0UmVhcmcocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSlcbiAgICAgICAgICAgIDogY2FzdFJlYXJnKHJlYWxOYW1lLCBjYXN0Rml4ZWQocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSk7XG5cbiAgICAgICAgICByZXN1bHQgPSBjYXN0Q2FwKHJlYWxOYW1lLCByZXN1bHQpO1xuICAgICAgICAgIHJlc3VsdCA9IGNhc3RDdXJyeShyZWFsTmFtZSwgcmVzdWx0LCBhcnlLZXkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICB9KTtcblxuICAgIHJlc3VsdCB8fCAocmVzdWx0ID0gd3JhcHBlZCk7XG4gICAgaWYgKHJlc3VsdCA9PSBmdW5jKSB7XG4gICAgICByZXN1bHQgPSBmb3JjZUN1cnJ5ID8gY3VycnkocmVzdWx0LCAxKSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmVzdWx0LmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIocmVhbE5hbWUsIGZ1bmMpO1xuICAgIGlmIChtYXBwaW5nLnBsYWNlaG9sZGVyW3JlYWxOYW1lXSkge1xuICAgICAgc2V0UGxhY2Vob2xkZXIgPSB0cnVlO1xuICAgICAgcmVzdWx0LnBsYWNlaG9sZGVyID0gZnVuYy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgaWYgKCFpc09iaikge1xuICAgIHJldHVybiB3cmFwKG5hbWUsIGZ1bmMpO1xuICB9XG4gIHZhciBfID0gZnVuYztcblxuICAvLyBDb252ZXJ0IG1ldGhvZHMgYnkgYXJ5IGNhcC5cbiAgdmFyIHBhaXJzID0gW107XG4gIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgZWFjaChtYXBwaW5nLmFyeU1ldGhvZFthcnlLZXldLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBmdW5jID0gX1ttYXBwaW5nLnJlbWFwW2tleV0gfHwga2V5XTtcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHBhaXJzLnB1c2goW2tleSwgd3JhcChrZXksIGZ1bmMpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbnZlcnQgcmVtYWluaW5nIG1ldGhvZHMuXG4gIGVhY2goa2V5cyhfKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGZ1bmMgPSBfW2tleV07XG4gICAgaWYgKHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKHBhaXJzW2xlbmd0aF1bMF0gPT0ga2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jLmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIoa2V5LCBmdW5jKTtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgZnVuY10pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQXNzaWduIHRvIGBfYCBsZWF2aW5nIGBfLnByb3RvdHlwZWAgdW5jaGFuZ2VkIHRvIGFsbG93IGNoYWluaW5nLlxuICBlYWNoKHBhaXJzLCBmdW5jdGlvbihwYWlyKSB7XG4gICAgX1twYWlyWzBdXSA9IHBhaXJbMV07XG4gIH0pO1xuXG4gIF8uY29udmVydCA9IGNvbnZlcnRMaWI7XG4gIGlmIChzZXRQbGFjZWhvbGRlcikge1xuICAgIF8ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgfVxuICAvLyBBc3NpZ24gYWxpYXNlcy5cbiAgZWFjaChrZXlzKF8pLCBmdW5jdGlvbihrZXkpIHtcbiAgICBlYWNoKG1hcHBpbmcucmVhbFRvQWxpYXNba2V5XSB8fCBbXSwgZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgIF9bYWxpYXNdID0gX1trZXldO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29udmVydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbG9kYXNoL2ZwL19iYXNlQ29udmVydC5qcyIsIi8qKiBVc2VkIHRvIG1hcCBhbGlhc2VzIHRvIHRoZWlyIHJlYWwgbmFtZXMuICovXG5leHBvcnRzLmFsaWFzVG9SZWFsID0ge1xuXG4gIC8vIExvZGFzaCBhbGlhc2VzLlxuICAnZWFjaCc6ICdmb3JFYWNoJyxcbiAgJ2VhY2hSaWdodCc6ICdmb3JFYWNoUmlnaHQnLFxuICAnZW50cmllcyc6ICd0b1BhaXJzJyxcbiAgJ2VudHJpZXNJbic6ICd0b1BhaXJzSW4nLFxuICAnZXh0ZW5kJzogJ2Fzc2lnbkluJyxcbiAgJ2V4dGVuZEFsbCc6ICdhc3NpZ25JbkFsbCcsXG4gICdleHRlbmRBbGxXaXRoJzogJ2Fzc2lnbkluQWxsV2l0aCcsXG4gICdleHRlbmRXaXRoJzogJ2Fzc2lnbkluV2l0aCcsXG4gICdmaXJzdCc6ICdoZWFkJyxcblxuICAvLyBNZXRob2RzIHRoYXQgYXJlIGN1cnJpZWQgdmFyaWFudHMgb2Ygb3RoZXJzLlxuICAnY29uZm9ybXMnOiAnY29uZm9ybXNUbycsXG4gICdtYXRjaGVzJzogJ2lzTWF0Y2gnLFxuICAncHJvcGVydHknOiAnZ2V0JyxcblxuICAvLyBSYW1kYSBhbGlhc2VzLlxuICAnX18nOiAncGxhY2Vob2xkZXInLFxuICAnRic6ICdzdHViRmFsc2UnLFxuICAnVCc6ICdzdHViVHJ1ZScsXG4gICdhbGwnOiAnZXZlcnknLFxuICAnYWxsUGFzcyc6ICdvdmVyRXZlcnknLFxuICAnYWx3YXlzJzogJ2NvbnN0YW50JyxcbiAgJ2FueSc6ICdzb21lJyxcbiAgJ2FueVBhc3MnOiAnb3ZlclNvbWUnLFxuICAnYXBwbHknOiAnc3ByZWFkJyxcbiAgJ2Fzc29jJzogJ3NldCcsXG4gICdhc3NvY1BhdGgnOiAnc2V0JyxcbiAgJ2NvbXBsZW1lbnQnOiAnbmVnYXRlJyxcbiAgJ2NvbXBvc2UnOiAnZmxvd1JpZ2h0JyxcbiAgJ2NvbnRhaW5zJzogJ2luY2x1ZGVzJyxcbiAgJ2Rpc3NvYyc6ICd1bnNldCcsXG4gICdkaXNzb2NQYXRoJzogJ3Vuc2V0JyxcbiAgJ2Ryb3BMYXN0JzogJ2Ryb3BSaWdodCcsXG4gICdkcm9wTGFzdFdoaWxlJzogJ2Ryb3BSaWdodFdoaWxlJyxcbiAgJ2VxdWFscyc6ICdpc0VxdWFsJyxcbiAgJ2lkZW50aWNhbCc6ICdlcScsXG4gICdpbmRleEJ5JzogJ2tleUJ5JyxcbiAgJ2luaXQnOiAnaW5pdGlhbCcsXG4gICdpbnZlcnRPYmonOiAnaW52ZXJ0JyxcbiAgJ2p1eHQnOiAnb3ZlcicsXG4gICdvbWl0QWxsJzogJ29taXQnLFxuICAnbkFyeSc6ICdhcnknLFxuICAncGF0aCc6ICdnZXQnLFxuICAncGF0aEVxJzogJ21hdGNoZXNQcm9wZXJ0eScsXG4gICdwYXRoT3InOiAnZ2V0T3InLFxuICAncGF0aHMnOiAnYXQnLFxuICAncGlja0FsbCc6ICdwaWNrJyxcbiAgJ3BpcGUnOiAnZmxvdycsXG4gICdwbHVjayc6ICdtYXAnLFxuICAncHJvcCc6ICdnZXQnLFxuICAncHJvcEVxJzogJ21hdGNoZXNQcm9wZXJ0eScsXG4gICdwcm9wT3InOiAnZ2V0T3InLFxuICAncHJvcHMnOiAnYXQnLFxuICAnc3ltbWV0cmljRGlmZmVyZW5jZSc6ICd4b3InLFxuICAnc3ltbWV0cmljRGlmZmVyZW5jZUJ5JzogJ3hvckJ5JyxcbiAgJ3N5bW1ldHJpY0RpZmZlcmVuY2VXaXRoJzogJ3hvcldpdGgnLFxuICAndGFrZUxhc3QnOiAndGFrZVJpZ2h0JyxcbiAgJ3Rha2VMYXN0V2hpbGUnOiAndGFrZVJpZ2h0V2hpbGUnLFxuICAndW5hcHBseSc6ICdyZXN0JyxcbiAgJ3VubmVzdCc6ICdmbGF0dGVuJyxcbiAgJ3VzZVdpdGgnOiAnb3ZlckFyZ3MnLFxuICAnd2hlcmUnOiAnY29uZm9ybXNUbycsXG4gICd3aGVyZUVxJzogJ2lzTWF0Y2gnLFxuICAnemlwT2JqJzogJ3ppcE9iamVjdCdcbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBhcnkgdG8gbWV0aG9kIG5hbWVzLiAqL1xuZXhwb3J0cy5hcnlNZXRob2QgPSB7XG4gICcxJzogW1xuICAgICdhc3NpZ25BbGwnLCAnYXNzaWduSW5BbGwnLCAnYXR0ZW1wdCcsICdjYXN0QXJyYXknLCAnY2VpbCcsICdjcmVhdGUnLFxuICAgICdjdXJyeScsICdjdXJyeVJpZ2h0JywgJ2RlZmF1bHRzQWxsJywgJ2RlZmF1bHRzRGVlcEFsbCcsICdmbG9vcicsICdmbG93JyxcbiAgICAnZmxvd1JpZ2h0JywgJ2Zyb21QYWlycycsICdpbnZlcnQnLCAnaXRlcmF0ZWUnLCAnbWVtb2l6ZScsICdtZXRob2QnLCAnbWVyZ2VBbGwnLFxuICAgICdtZXRob2RPZicsICdtaXhpbicsICdudGhBcmcnLCAnb3ZlcicsICdvdmVyRXZlcnknLCAnb3ZlclNvbWUnLCdyZXN0JywgJ3JldmVyc2UnLFxuICAgICdyb3VuZCcsICdydW5JbkNvbnRleHQnLCAnc3ByZWFkJywgJ3RlbXBsYXRlJywgJ3RyaW0nLCAndHJpbUVuZCcsICd0cmltU3RhcnQnLFxuICAgICd1bmlxdWVJZCcsICd3b3JkcycsICd6aXBBbGwnXG4gIF0sXG4gICcyJzogW1xuICAgICdhZGQnLCAnYWZ0ZXInLCAnYXJ5JywgJ2Fzc2lnbicsICdhc3NpZ25BbGxXaXRoJywgJ2Fzc2lnbkluJywgJ2Fzc2lnbkluQWxsV2l0aCcsXG4gICAgJ2F0JywgJ2JlZm9yZScsICdiaW5kJywgJ2JpbmRBbGwnLCAnYmluZEtleScsICdjaHVuaycsICdjbG9uZURlZXBXaXRoJyxcbiAgICAnY2xvbmVXaXRoJywgJ2NvbmNhdCcsICdjb25mb3Jtc1RvJywgJ2NvdW50QnknLCAnY3VycnlOJywgJ2N1cnJ5UmlnaHROJyxcbiAgICAnZGVib3VuY2UnLCAnZGVmYXVsdHMnLCAnZGVmYXVsdHNEZWVwJywgJ2RlZmF1bHRUbycsICdkZWxheScsICdkaWZmZXJlbmNlJyxcbiAgICAnZGl2aWRlJywgJ2Ryb3AnLCAnZHJvcFJpZ2h0JywgJ2Ryb3BSaWdodFdoaWxlJywgJ2Ryb3BXaGlsZScsICdlbmRzV2l0aCcsICdlcScsXG4gICAgJ2V2ZXJ5JywgJ2ZpbHRlcicsICdmaW5kJywgJ2ZpbmRJbmRleCcsICdmaW5kS2V5JywgJ2ZpbmRMYXN0JywgJ2ZpbmRMYXN0SW5kZXgnLFxuICAgICdmaW5kTGFzdEtleScsICdmbGF0TWFwJywgJ2ZsYXRNYXBEZWVwJywgJ2ZsYXR0ZW5EZXB0aCcsICdmb3JFYWNoJyxcbiAgICAnZm9yRWFjaFJpZ2h0JywgJ2ZvckluJywgJ2ZvckluUmlnaHQnLCAnZm9yT3duJywgJ2Zvck93blJpZ2h0JywgJ2dldCcsXG4gICAgJ2dyb3VwQnknLCAnZ3QnLCAnZ3RlJywgJ2hhcycsICdoYXNJbicsICdpbmNsdWRlcycsICdpbmRleE9mJywgJ2ludGVyc2VjdGlvbicsXG4gICAgJ2ludmVydEJ5JywgJ2ludm9rZScsICdpbnZva2VNYXAnLCAnaXNFcXVhbCcsICdpc01hdGNoJywgJ2pvaW4nLCAna2V5QnknLFxuICAgICdsYXN0SW5kZXhPZicsICdsdCcsICdsdGUnLCAnbWFwJywgJ21hcEtleXMnLCAnbWFwVmFsdWVzJywgJ21hdGNoZXNQcm9wZXJ0eScsXG4gICAgJ21heEJ5JywgJ21lYW5CeScsICdtZXJnZScsICdtZXJnZUFsbFdpdGgnLCAnbWluQnknLCAnbXVsdGlwbHknLCAnbnRoJywgJ29taXQnLFxuICAgICdvbWl0QnknLCAnb3ZlckFyZ3MnLCAncGFkJywgJ3BhZEVuZCcsICdwYWRTdGFydCcsICdwYXJzZUludCcsICdwYXJ0aWFsJyxcbiAgICAncGFydGlhbFJpZ2h0JywgJ3BhcnRpdGlvbicsICdwaWNrJywgJ3BpY2tCeScsICdwcm9wZXJ0eU9mJywgJ3B1bGwnLCAncHVsbEFsbCcsXG4gICAgJ3B1bGxBdCcsICdyYW5kb20nLCAncmFuZ2UnLCAncmFuZ2VSaWdodCcsICdyZWFyZycsICdyZWplY3QnLCAncmVtb3ZlJyxcbiAgICAncmVwZWF0JywgJ3Jlc3RGcm9tJywgJ3Jlc3VsdCcsICdzYW1wbGVTaXplJywgJ3NvbWUnLCAnc29ydEJ5JywgJ3NvcnRlZEluZGV4JyxcbiAgICAnc29ydGVkSW5kZXhPZicsICdzb3J0ZWRMYXN0SW5kZXgnLCAnc29ydGVkTGFzdEluZGV4T2YnLCAnc29ydGVkVW5pcUJ5JyxcbiAgICAnc3BsaXQnLCAnc3ByZWFkRnJvbScsICdzdGFydHNXaXRoJywgJ3N1YnRyYWN0JywgJ3N1bUJ5JywgJ3Rha2UnLCAndGFrZVJpZ2h0JyxcbiAgICAndGFrZVJpZ2h0V2hpbGUnLCAndGFrZVdoaWxlJywgJ3RhcCcsICd0aHJvdHRsZScsICd0aHJ1JywgJ3RpbWVzJywgJ3RyaW1DaGFycycsXG4gICAgJ3RyaW1DaGFyc0VuZCcsICd0cmltQ2hhcnNTdGFydCcsICd0cnVuY2F0ZScsICd1bmlvbicsICd1bmlxQnknLCAndW5pcVdpdGgnLFxuICAgICd1bnNldCcsICd1bnppcFdpdGgnLCAnd2l0aG91dCcsICd3cmFwJywgJ3hvcicsICd6aXAnLCAnemlwT2JqZWN0JyxcbiAgICAnemlwT2JqZWN0RGVlcCdcbiAgXSxcbiAgJzMnOiBbXG4gICAgJ2Fzc2lnbkluV2l0aCcsICdhc3NpZ25XaXRoJywgJ2NsYW1wJywgJ2RpZmZlcmVuY2VCeScsICdkaWZmZXJlbmNlV2l0aCcsXG4gICAgJ2ZpbmRGcm9tJywgJ2ZpbmRJbmRleEZyb20nLCAnZmluZExhc3RGcm9tJywgJ2ZpbmRMYXN0SW5kZXhGcm9tJywgJ2dldE9yJyxcbiAgICAnaW5jbHVkZXNGcm9tJywgJ2luZGV4T2ZGcm9tJywgJ2luUmFuZ2UnLCAnaW50ZXJzZWN0aW9uQnknLCAnaW50ZXJzZWN0aW9uV2l0aCcsXG4gICAgJ2ludm9rZUFyZ3MnLCAnaW52b2tlQXJnc01hcCcsICdpc0VxdWFsV2l0aCcsICdpc01hdGNoV2l0aCcsICdmbGF0TWFwRGVwdGgnLFxuICAgICdsYXN0SW5kZXhPZkZyb20nLCAnbWVyZ2VXaXRoJywgJ29yZGVyQnknLCAncGFkQ2hhcnMnLCAncGFkQ2hhcnNFbmQnLFxuICAgICdwYWRDaGFyc1N0YXJ0JywgJ3B1bGxBbGxCeScsICdwdWxsQWxsV2l0aCcsICdyYW5nZVN0ZXAnLCAncmFuZ2VTdGVwUmlnaHQnLFxuICAgICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAncmVwbGFjZScsICdzZXQnLCAnc2xpY2UnLCAnc29ydGVkSW5kZXhCeScsXG4gICAgJ3NvcnRlZExhc3RJbmRleEJ5JywgJ3RyYW5zZm9ybScsICd1bmlvbkJ5JywgJ3VuaW9uV2l0aCcsICd1cGRhdGUnLCAneG9yQnknLFxuICAgICd4b3JXaXRoJywgJ3ppcFdpdGgnXG4gIF0sXG4gICc0JzogW1xuICAgICdmaWxsJywgJ3NldFdpdGgnLCAndXBkYXRlV2l0aCdcbiAgXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIGFyeSB0byByZWFyZyBjb25maWdzLiAqL1xuZXhwb3J0cy5hcnlSZWFyZyA9IHtcbiAgJzInOiBbMSwgMF0sXG4gICczJzogWzIsIDAsIDFdLFxuICAnNCc6IFszLCAyLCAwLCAxXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byB0aGVpciBpdGVyYXRlZSBhcnkuICovXG5leHBvcnRzLml0ZXJhdGVlQXJ5ID0ge1xuICAnZHJvcFJpZ2h0V2hpbGUnOiAxLFxuICAnZHJvcFdoaWxlJzogMSxcbiAgJ2V2ZXJ5JzogMSxcbiAgJ2ZpbHRlcic6IDEsXG4gICdmaW5kJzogMSxcbiAgJ2ZpbmRGcm9tJzogMSxcbiAgJ2ZpbmRJbmRleCc6IDEsXG4gICdmaW5kSW5kZXhGcm9tJzogMSxcbiAgJ2ZpbmRLZXknOiAxLFxuICAnZmluZExhc3QnOiAxLFxuICAnZmluZExhc3RGcm9tJzogMSxcbiAgJ2ZpbmRMYXN0SW5kZXgnOiAxLFxuICAnZmluZExhc3RJbmRleEZyb20nOiAxLFxuICAnZmluZExhc3RLZXknOiAxLFxuICAnZmxhdE1hcCc6IDEsXG4gICdmbGF0TWFwRGVlcCc6IDEsXG4gICdmbGF0TWFwRGVwdGgnOiAxLFxuICAnZm9yRWFjaCc6IDEsXG4gICdmb3JFYWNoUmlnaHQnOiAxLFxuICAnZm9ySW4nOiAxLFxuICAnZm9ySW5SaWdodCc6IDEsXG4gICdmb3JPd24nOiAxLFxuICAnZm9yT3duUmlnaHQnOiAxLFxuICAnbWFwJzogMSxcbiAgJ21hcEtleXMnOiAxLFxuICAnbWFwVmFsdWVzJzogMSxcbiAgJ3BhcnRpdGlvbic6IDEsXG4gICdyZWR1Y2UnOiAyLFxuICAncmVkdWNlUmlnaHQnOiAyLFxuICAncmVqZWN0JzogMSxcbiAgJ3JlbW92ZSc6IDEsXG4gICdzb21lJzogMSxcbiAgJ3Rha2VSaWdodFdoaWxlJzogMSxcbiAgJ3Rha2VXaGlsZSc6IDEsXG4gICd0aW1lcyc6IDEsXG4gICd0cmFuc2Zvcm0nOiAyXG59O1xuXG4vKiogVXNlZCB0byBtYXAgbWV0aG9kIG5hbWVzIHRvIGl0ZXJhdGVlIHJlYXJnIGNvbmZpZ3MuICovXG5leHBvcnRzLml0ZXJhdGVlUmVhcmcgPSB7XG4gICdtYXBLZXlzJzogWzFdLFxuICAncmVkdWNlUmlnaHQnOiBbMSwgMF1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gcmVhcmcgY29uZmlncy4gKi9cbmV4cG9ydHMubWV0aG9kUmVhcmcgPSB7XG4gICdhc3NpZ25JbkFsbFdpdGgnOiBbMSwgMF0sXG4gICdhc3NpZ25JbldpdGgnOiBbMSwgMiwgMF0sXG4gICdhc3NpZ25BbGxXaXRoJzogWzEsIDBdLFxuICAnYXNzaWduV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2RpZmZlcmVuY2VCeSc6IFsxLCAyLCAwXSxcbiAgJ2RpZmZlcmVuY2VXaXRoJzogWzEsIDIsIDBdLFxuICAnZ2V0T3InOiBbMiwgMSwgMF0sXG4gICdpbnRlcnNlY3Rpb25CeSc6IFsxLCAyLCAwXSxcbiAgJ2ludGVyc2VjdGlvbldpdGgnOiBbMSwgMiwgMF0sXG4gICdpc0VxdWFsV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2lzTWF0Y2hXaXRoJzogWzIsIDEsIDBdLFxuICAnbWVyZ2VBbGxXaXRoJzogWzEsIDBdLFxuICAnbWVyZ2VXaXRoJzogWzEsIDIsIDBdLFxuICAncGFkQ2hhcnMnOiBbMiwgMSwgMF0sXG4gICdwYWRDaGFyc0VuZCc6IFsyLCAxLCAwXSxcbiAgJ3BhZENoYXJzU3RhcnQnOiBbMiwgMSwgMF0sXG4gICdwdWxsQWxsQnknOiBbMiwgMSwgMF0sXG4gICdwdWxsQWxsV2l0aCc6IFsyLCAxLCAwXSxcbiAgJ3JhbmdlU3RlcCc6IFsxLCAyLCAwXSxcbiAgJ3JhbmdlU3RlcFJpZ2h0JzogWzEsIDIsIDBdLFxuICAnc2V0V2l0aCc6IFszLCAxLCAyLCAwXSxcbiAgJ3NvcnRlZEluZGV4QnknOiBbMiwgMSwgMF0sXG4gICdzb3J0ZWRMYXN0SW5kZXhCeSc6IFsyLCAxLCAwXSxcbiAgJ3VuaW9uQnknOiBbMSwgMiwgMF0sXG4gICd1bmlvbldpdGgnOiBbMSwgMiwgMF0sXG4gICd1cGRhdGVXaXRoJzogWzMsIDEsIDIsIDBdLFxuICAneG9yQnknOiBbMSwgMiwgMF0sXG4gICd4b3JXaXRoJzogWzEsIDIsIDBdLFxuICAnemlwV2l0aCc6IFsxLCAyLCAwXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byBzcHJlYWQgY29uZmlncy4gKi9cbmV4cG9ydHMubWV0aG9kU3ByZWFkID0ge1xuICAnYXNzaWduQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdhc3NpZ25BbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdhc3NpZ25JbkFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnYXNzaWduSW5BbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdkZWZhdWx0c0FsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnZGVmYXVsdHNEZWVwQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdpbnZva2VBcmdzJzogeyAnc3RhcnQnOiAyIH0sXG4gICdpbnZva2VBcmdzTWFwJzogeyAnc3RhcnQnOiAyIH0sXG4gICdtZXJnZUFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnbWVyZ2VBbGxXaXRoJzogeyAnc3RhcnQnOiAwIH0sXG4gICdwYXJ0aWFsJzogeyAnc3RhcnQnOiAxIH0sXG4gICdwYXJ0aWFsUmlnaHQnOiB7ICdzdGFydCc6IDEgfSxcbiAgJ3dpdGhvdXQnOiB7ICdzdGFydCc6IDEgfSxcbiAgJ3ppcEFsbCc6IHsgJ3N0YXJ0JzogMCB9XG59O1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBtZXRob2RzIHdoaWNoIG11dGF0ZSBhcnJheXMgb3Igb2JqZWN0cy4gKi9cbmV4cG9ydHMubXV0YXRlID0ge1xuICAnYXJyYXknOiB7XG4gICAgJ2ZpbGwnOiB0cnVlLFxuICAgICdwdWxsJzogdHJ1ZSxcbiAgICAncHVsbEFsbCc6IHRydWUsXG4gICAgJ3B1bGxBbGxCeSc6IHRydWUsXG4gICAgJ3B1bGxBbGxXaXRoJzogdHJ1ZSxcbiAgICAncHVsbEF0JzogdHJ1ZSxcbiAgICAncmVtb3ZlJzogdHJ1ZSxcbiAgICAncmV2ZXJzZSc6IHRydWVcbiAgfSxcbiAgJ29iamVjdCc6IHtcbiAgICAnYXNzaWduJzogdHJ1ZSxcbiAgICAnYXNzaWduQWxsJzogdHJ1ZSxcbiAgICAnYXNzaWduQWxsV2l0aCc6IHRydWUsXG4gICAgJ2Fzc2lnbkluJzogdHJ1ZSxcbiAgICAnYXNzaWduSW5BbGwnOiB0cnVlLFxuICAgICdhc3NpZ25JbkFsbFdpdGgnOiB0cnVlLFxuICAgICdhc3NpZ25JbldpdGgnOiB0cnVlLFxuICAgICdhc3NpZ25XaXRoJzogdHJ1ZSxcbiAgICAnZGVmYXVsdHMnOiB0cnVlLFxuICAgICdkZWZhdWx0c0FsbCc6IHRydWUsXG4gICAgJ2RlZmF1bHRzRGVlcCc6IHRydWUsXG4gICAgJ2RlZmF1bHRzRGVlcEFsbCc6IHRydWUsXG4gICAgJ21lcmdlJzogdHJ1ZSxcbiAgICAnbWVyZ2VBbGwnOiB0cnVlLFxuICAgICdtZXJnZUFsbFdpdGgnOiB0cnVlLFxuICAgICdtZXJnZVdpdGgnOiB0cnVlLFxuICB9LFxuICAnc2V0Jzoge1xuICAgICdzZXQnOiB0cnVlLFxuICAgICdzZXRXaXRoJzogdHJ1ZSxcbiAgICAndW5zZXQnOiB0cnVlLFxuICAgICd1cGRhdGUnOiB0cnVlLFxuICAgICd1cGRhdGVXaXRoJzogdHJ1ZVxuICB9XG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHdpdGggcGxhY2Vob2xkZXIgc3VwcG9ydCAqL1xuZXhwb3J0cy5wbGFjZWhvbGRlciA9IHtcbiAgJ2JpbmQnOiB0cnVlLFxuICAnYmluZEtleSc6IHRydWUsXG4gICdjdXJyeSc6IHRydWUsXG4gICdjdXJyeVJpZ2h0JzogdHJ1ZSxcbiAgJ3BhcnRpYWwnOiB0cnVlLFxuICAncGFydGlhbFJpZ2h0JzogdHJ1ZVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIHJlYWwgbmFtZXMgdG8gdGhlaXIgYWxpYXNlcy4gKi9cbmV4cG9ydHMucmVhbFRvQWxpYXMgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBvYmplY3QgPSBleHBvcnRzLmFsaWFzVG9SZWFsLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICByZXN1bHRbdmFsdWVdLnB1c2goa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3ZhbHVlXSA9IFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSgpKTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byBvdGhlciBuYW1lcy4gKi9cbmV4cG9ydHMucmVtYXAgPSB7XG4gICdhc3NpZ25BbGwnOiAnYXNzaWduJyxcbiAgJ2Fzc2lnbkFsbFdpdGgnOiAnYXNzaWduV2l0aCcsXG4gICdhc3NpZ25JbkFsbCc6ICdhc3NpZ25JbicsXG4gICdhc3NpZ25JbkFsbFdpdGgnOiAnYXNzaWduSW5XaXRoJyxcbiAgJ2N1cnJ5Tic6ICdjdXJyeScsXG4gICdjdXJyeVJpZ2h0Tic6ICdjdXJyeVJpZ2h0JyxcbiAgJ2RlZmF1bHRzQWxsJzogJ2RlZmF1bHRzJyxcbiAgJ2RlZmF1bHRzRGVlcEFsbCc6ICdkZWZhdWx0c0RlZXAnLFxuICAnZmluZEZyb20nOiAnZmluZCcsXG4gICdmaW5kSW5kZXhGcm9tJzogJ2ZpbmRJbmRleCcsXG4gICdmaW5kTGFzdEZyb20nOiAnZmluZExhc3QnLFxuICAnZmluZExhc3RJbmRleEZyb20nOiAnZmluZExhc3RJbmRleCcsXG4gICdnZXRPcic6ICdnZXQnLFxuICAnaW5jbHVkZXNGcm9tJzogJ2luY2x1ZGVzJyxcbiAgJ2luZGV4T2ZGcm9tJzogJ2luZGV4T2YnLFxuICAnaW52b2tlQXJncyc6ICdpbnZva2UnLFxuICAnaW52b2tlQXJnc01hcCc6ICdpbnZva2VNYXAnLFxuICAnbGFzdEluZGV4T2ZGcm9tJzogJ2xhc3RJbmRleE9mJyxcbiAgJ21lcmdlQWxsJzogJ21lcmdlJyxcbiAgJ21lcmdlQWxsV2l0aCc6ICdtZXJnZVdpdGgnLFxuICAncGFkQ2hhcnMnOiAncGFkJyxcbiAgJ3BhZENoYXJzRW5kJzogJ3BhZEVuZCcsXG4gICdwYWRDaGFyc1N0YXJ0JzogJ3BhZFN0YXJ0JyxcbiAgJ3Byb3BlcnR5T2YnOiAnZ2V0JyxcbiAgJ3JhbmdlU3RlcCc6ICdyYW5nZScsXG4gICdyYW5nZVN0ZXBSaWdodCc6ICdyYW5nZVJpZ2h0JyxcbiAgJ3Jlc3RGcm9tJzogJ3Jlc3QnLFxuICAnc3ByZWFkRnJvbSc6ICdzcHJlYWQnLFxuICAndHJpbUNoYXJzJzogJ3RyaW0nLFxuICAndHJpbUNoYXJzRW5kJzogJ3RyaW1FbmQnLFxuICAndHJpbUNoYXJzU3RhcnQnOiAndHJpbVN0YXJ0JyxcbiAgJ3ppcEFsbCc6ICd6aXAnXG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHRoYXQgc2tpcCBmaXhpbmcgdGhlaXIgYXJpdHkuICovXG5leHBvcnRzLnNraXBGaXhlZCA9IHtcbiAgJ2Nhc3RBcnJheSc6IHRydWUsXG4gICdmbG93JzogdHJ1ZSxcbiAgJ2Zsb3dSaWdodCc6IHRydWUsXG4gICdpdGVyYXRlZSc6IHRydWUsXG4gICdtaXhpbic6IHRydWUsXG4gICdyZWFyZyc6IHRydWUsXG4gICdydW5JbkNvbnRleHQnOiB0cnVlXG59O1xuXG4vKiogVXNlZCB0byB0cmFjayBtZXRob2RzIHRoYXQgc2tpcCByZWFycmFuZ2luZyBhcmd1bWVudHMuICovXG5leHBvcnRzLnNraXBSZWFyZyA9IHtcbiAgJ2FkZCc6IHRydWUsXG4gICdhc3NpZ24nOiB0cnVlLFxuICAnYXNzaWduSW4nOiB0cnVlLFxuICAnYmluZCc6IHRydWUsXG4gICdiaW5kS2V5JzogdHJ1ZSxcbiAgJ2NvbmNhdCc6IHRydWUsXG4gICdkaWZmZXJlbmNlJzogdHJ1ZSxcbiAgJ2RpdmlkZSc6IHRydWUsXG4gICdlcSc6IHRydWUsXG4gICdndCc6IHRydWUsXG4gICdndGUnOiB0cnVlLFxuICAnaXNFcXVhbCc6IHRydWUsXG4gICdsdCc6IHRydWUsXG4gICdsdGUnOiB0cnVlLFxuICAnbWF0Y2hlc1Byb3BlcnR5JzogdHJ1ZSxcbiAgJ21lcmdlJzogdHJ1ZSxcbiAgJ211bHRpcGx5JzogdHJ1ZSxcbiAgJ292ZXJBcmdzJzogdHJ1ZSxcbiAgJ3BhcnRpYWwnOiB0cnVlLFxuICAncGFydGlhbFJpZ2h0JzogdHJ1ZSxcbiAgJ3Byb3BlcnR5T2YnOiB0cnVlLFxuICAncmFuZG9tJzogdHJ1ZSxcbiAgJ3JhbmdlJzogdHJ1ZSxcbiAgJ3JhbmdlUmlnaHQnOiB0cnVlLFxuICAnc3VidHJhY3QnOiB0cnVlLFxuICAnemlwJzogdHJ1ZSxcbiAgJ3ppcE9iamVjdCc6IHRydWUsXG4gICd6aXBPYmplY3REZWVwJzogdHJ1ZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbG9kYXNoL2ZwL19tYXBwaW5nLmpzIiwiLyoqXG4gKiBUaGUgZGVmYXVsdCBhcmd1bWVudCBwbGFjZWhvbGRlciB2YWx1ZSBmb3IgbWV0aG9kcy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanMiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBMb2Rhc2ggbG9kYXNoLmNvbS9saWNlbnNlIHwgVW5kZXJzY29yZS5qcyAxLjguMyB1bmRlcnNjb3JlanMub3JnL0xJQ0VOU0VcbiAqL1xuOyhmdW5jdGlvbigpe2Z1bmN0aW9uIG4obix0KXtyZXR1cm4gbi5zZXQodFswXSx0WzFdKSxufWZ1bmN0aW9uIHQobix0KXtyZXR1cm4gbi5hZGQodCksbn1mdW5jdGlvbiByKG4sdCxyKXtzd2l0Y2goci5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gbi5jYWxsKHQpO2Nhc2UgMTpyZXR1cm4gbi5jYWxsKHQsclswXSk7Y2FzZSAyOnJldHVybiBuLmNhbGwodCxyWzBdLHJbMV0pO2Nhc2UgMzpyZXR1cm4gbi5jYWxsKHQsclswXSxyWzFdLHJbMl0pfXJldHVybiBuLmFwcGx5KHQscil9ZnVuY3Rpb24gZShuLHQscixlKXtmb3IodmFyIHU9LTEsaT1udWxsPT1uPzA6bi5sZW5ndGg7Kyt1PGk7KXt2YXIgbz1uW3VdO3QoZSxvLHIobyksbil9cmV0dXJuIGV9ZnVuY3Rpb24gdShuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZSYmZmFsc2UhPT10KG5bcl0scixuKTspO3JldHVybiBufWZ1bmN0aW9uIGkobix0KXtmb3IodmFyIHI9bnVsbD09bj8wOm4ubGVuZ3RoO3ItLSYmZmFsc2UhPT10KG5bcl0scixuKTspO1xucmV0dXJuIG59ZnVuY3Rpb24gbyhuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZTspaWYoIXQobltyXSxyLG4pKXJldHVybiBmYWxzZTtyZXR1cm4gdHJ1ZX1mdW5jdGlvbiBmKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXTt0KG8scixuKSYmKGlbdSsrXT1vKX1yZXR1cm4gaX1mdW5jdGlvbiBjKG4sdCl7cmV0dXJuIShudWxsPT1ufHwhbi5sZW5ndGgpJiYtMTxkKG4sdCwwKX1mdW5jdGlvbiBhKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1udWxsPT1uPzA6bi5sZW5ndGg7KytlPHU7KWlmKHIodCxuW2VdKSlyZXR1cm4gdHJ1ZTtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24gbChuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aCx1PUFycmF5KGUpOysrcjxlOyl1W3JdPXQobltyXSxyLG4pO3JldHVybiB1fWZ1bmN0aW9uIHMobix0KXtmb3IodmFyIHI9LTEsZT10Lmxlbmd0aCx1PW4ubGVuZ3RoOysrcjxlOyluW3Urcl09dFtyXTtcbnJldHVybiBufWZ1bmN0aW9uIGgobix0LHIsZSl7dmFyIHU9LTEsaT1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKGUmJmkmJihyPW5bKyt1XSk7Kyt1PGk7KXI9dChyLG5bdV0sdSxuKTtyZXR1cm4gcn1mdW5jdGlvbiBwKG4sdCxyLGUpe3ZhciB1PW51bGw9PW4/MDpuLmxlbmd0aDtmb3IoZSYmdSYmKHI9blstLXVdKTt1LS07KXI9dChyLG5bdV0sdSxuKTtyZXR1cm4gcn1mdW5jdGlvbiBfKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoOysrcjxlOylpZih0KG5bcl0scixuKSlyZXR1cm4gdHJ1ZTtyZXR1cm4gZmFsc2V9ZnVuY3Rpb24gdihuLHQscil7dmFyIGU7cmV0dXJuIHIobixmdW5jdGlvbihuLHIsdSl7aWYodChuLHIsdSkpcmV0dXJuIGU9cixmYWxzZX0pLGV9ZnVuY3Rpb24gZyhuLHQscixlKXt2YXIgdT1uLmxlbmd0aDtmb3Iocis9ZT8xOi0xO2U/ci0tOisrcjx1OylpZih0KG5bcl0scixuKSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBkKG4sdCxyKXtpZih0PT09dCluOntcbi0tcjtmb3IodmFyIGU9bi5sZW5ndGg7KytyPGU7KWlmKG5bcl09PT10KXtuPXI7YnJlYWsgbn1uPS0xfWVsc2Ugbj1nKG4sYixyKTtyZXR1cm4gbn1mdW5jdGlvbiB5KG4sdCxyLGUpey0tcjtmb3IodmFyIHU9bi5sZW5ndGg7KytyPHU7KWlmKGUobltyXSx0KSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBiKG4pe3JldHVybiBuIT09bn1mdW5jdGlvbiB4KG4sdCl7dmFyIHI9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiByP2sobix0KS9yOlB9ZnVuY3Rpb24gaihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/Rjp0W25dfX1mdW5jdGlvbiB3KG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09bj9GOm5bdF19fWZ1bmN0aW9uIG0obix0LHIsZSx1KXtyZXR1cm4gdShuLGZ1bmN0aW9uKG4sdSxpKXtyPWU/KGU9ZmFsc2Usbik6dChyLG4sdSxpKX0pLHJ9ZnVuY3Rpb24gQShuLHQpe3ZhciByPW4ubGVuZ3RoO2ZvcihuLnNvcnQodCk7ci0tOyluW3JdPW5bcl0uYztcbnJldHVybiBufWZ1bmN0aW9uIGsobix0KXtmb3IodmFyIHIsZT0tMSx1PW4ubGVuZ3RoOysrZTx1Oyl7dmFyIGk9dChuW2VdKTtpIT09RiYmKHI9cj09PUY/aTpyK2kpfXJldHVybiByfWZ1bmN0aW9uIEUobix0KXtmb3IodmFyIHI9LTEsZT1BcnJheShuKTsrK3I8bjspZVtyXT10KHIpO3JldHVybiBlfWZ1bmN0aW9uIE8obix0KXtyZXR1cm4gbCh0LGZ1bmN0aW9uKHQpe3JldHVyblt0LG5bdF1dfSl9ZnVuY3Rpb24gUyhuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9fWZ1bmN0aW9uIEkobix0KXtyZXR1cm4gbCh0LGZ1bmN0aW9uKHQpe3JldHVybiBuW3RdfSl9ZnVuY3Rpb24gUihuLHQpe3JldHVybiBuLmhhcyh0KX1mdW5jdGlvbiB6KG4sdCl7Zm9yKHZhciByPS0xLGU9bi5sZW5ndGg7KytyPGUmJi0xPGQodCxuW3JdLDApOyk7cmV0dXJuIHJ9ZnVuY3Rpb24gVyhuLHQpe2Zvcih2YXIgcj1uLmxlbmd0aDtyLS0mJi0xPGQodCxuW3JdLDApOyk7cmV0dXJuIHJ9ZnVuY3Rpb24gQihuKXtcbnJldHVyblwiXFxcXFwiK1RuW25dfWZ1bmN0aW9uIEwobil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obixlKXtyWysrdF09W2Usbl19KSxyfWZ1bmN0aW9uIFUobix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG4odChyKSl9fWZ1bmN0aW9uIEMobix0KXtmb3IodmFyIHI9LTEsZT1uLmxlbmd0aCx1PTAsaT1bXTsrK3I8ZTspe3ZhciBvPW5bcl07byE9PXQmJlwiX19sb2Rhc2hfcGxhY2Vob2xkZXJfX1wiIT09b3x8KG5bcl09XCJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fXCIsaVt1KytdPXIpfXJldHVybiBpfWZ1bmN0aW9uIEQobil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7clsrK3RdPW59KSxyfWZ1bmN0aW9uIE0obil7dmFyIHQ9LTEscj1BcnJheShuLnNpemUpO3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7clsrK3RdPVtuLG5dfSkscn1mdW5jdGlvbiBUKG4pe2lmKEJuLnRlc3Qobikpe1xuZm9yKHZhciB0PXpuLmxhc3RJbmRleD0wO3puLnRlc3Qobik7KSsrdDtuPXR9ZWxzZSBuPXR0KG4pO3JldHVybiBufWZ1bmN0aW9uICQobil7cmV0dXJuIEJuLnRlc3Qobik/bi5tYXRjaCh6bil8fFtdOm4uc3BsaXQoXCJcIil9dmFyIEYsTj0xLzAsUD1OYU4sWj1bW1wiYXJ5XCIsMTI4XSxbXCJiaW5kXCIsMV0sW1wiYmluZEtleVwiLDJdLFtcImN1cnJ5XCIsOF0sW1wiY3VycnlSaWdodFwiLDE2XSxbXCJmbGlwXCIsNTEyXSxbXCJwYXJ0aWFsXCIsMzJdLFtcInBhcnRpYWxSaWdodFwiLDY0XSxbXCJyZWFyZ1wiLDI1Nl1dLHE9L1xcYl9fcFxcKz0nJzsvZyxWPS9cXGIoX19wXFwrPSknJ1xcKy9nLEs9LyhfX2VcXCguKj9cXCl8XFxiX190XFwpKVxcKycnOy9nLEc9LyYoPzphbXB8bHR8Z3R8cXVvdHwjMzkpOy9nLEg9L1smPD5cIiddL2csSj1SZWdFeHAoRy5zb3VyY2UpLFk9UmVnRXhwKEguc291cmNlKSxRPS88JS0oW1xcc1xcU10rPyklPi9nLFg9LzwlKFtcXHNcXFNdKz8pJT4vZyxubj0vPCU9KFtcXHNcXFNdKz8pJT4vZyx0bj0vXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLHJuPS9eXFx3KiQvLGVuPS9eXFwuLyx1bj0vW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2csb249L1tcXFxcXiQuKis/KClbXFxde318XS9nLGZuPVJlZ0V4cChvbi5zb3VyY2UpLGNuPS9eXFxzK3xcXHMrJC9nLGFuPS9eXFxzKy8sbG49L1xccyskLyxzbj0vXFx7KD86XFxuXFwvXFwqIFxcW3dyYXBwZWQgd2l0aCAuK1xcXSBcXCpcXC8pP1xcbj8vLGhuPS9cXHtcXG5cXC9cXCogXFxbd3JhcHBlZCB3aXRoICguKylcXF0gXFwqLyxwbj0vLD8gJiAvLF9uPS9bXlxceDAwLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdmXSsvZyx2bj0vXFxcXChcXFxcKT8vZyxnbj0vXFwkXFx7KFteXFxcXH1dKig/OlxcXFwuW15cXFxcfV0qKSopXFx9L2csZG49L1xcdyokLyx5bj0vXlstK10weFswLTlhLWZdKyQvaSxibj0vXjBiWzAxXSskL2kseG49L15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLyxqbj0vXjBvWzAtN10rJC9pLHduPS9eKD86MHxbMS05XVxcZCopJC8sbW49L1tcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx4ZmZcXHUwMTAwLVxcdTAxN2ZdL2csQW49LygkXikvLGtuPS9bJ1xcblxcclxcdTIwMjhcXHUyMDI5XFxcXF0vZyxFbj1cIltcXFxcdWZlMGVcXFxcdWZlMGZdPyg/OltcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdfFxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSk/KD86XFxcXHUyMDBkKD86W15cXFxcdWQ4MDAtXFxcXHVkZmZmXXwoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9fFtcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXSlbXFxcXHVmZTBlXFxcXHVmZTBmXT8oPzpbXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMmZcXFxcdTIwZDAtXFxcXHUyMGZmXXxcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0pPykqXCIsT249XCIoPzpbXFxcXHUyNzAwLVxcXFx1MjdiZl18KD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfXxbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0pXCIrRW4sU249XCIoPzpbXlxcXFx1ZDgwMC1cXFxcdWRmZmZdW1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZl0/fFtcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdfCg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn18W1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdfFtcXFxcdWQ4MDAtXFxcXHVkZmZmXSlcIixJbj1SZWdFeHAoXCJbJ1xcdTIwMTldXCIsXCJnXCIpLFJuPVJlZ0V4cChcIltcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdXCIsXCJnXCIpLHpuPVJlZ0V4cChcIlxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSg/PVxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSl8XCIrU24rRW4sXCJnXCIpLFduPVJlZ0V4cChbXCJbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXT9bYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmXSsoPzpbJ1xcdTIwMTldKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPyg/PVtcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXXxbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXXwkKXwoPzpbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXXxbXlxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXFxcXGQrXFxcXHUyNzAwLVxcXFx1MjdiZmEtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0pKyg/OlsnXFx1MjAxOV0oPzpEfExMfE18UkV8U3xUfFZFKSk/KD89W1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmZcXFxcdTIwMDAtXFxcXHUyMDZmIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBdfFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKD86W2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZl18W15cXFxcdWQ4MDAtXFxcXHVkZmZmXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmN1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZlxcXFx1MjAwMC1cXFxcdTIwNmYgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMFxcXFxkK1xcXFx1MjcwMC1cXFxcdTI3YmZhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmZBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKXwkKXxbQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXT8oPzpbYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmXXxbXlxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXFxcXGQrXFxcXHUyNzAwLVxcXFx1MjdiZmEtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0pKyg/OlsnXFx1MjAxOV0oPzpkfGxsfG18cmV8c3x0fHZlKSk/fFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdKyg/OlsnXFx1MjAxOV0oPzpEfExMfE18UkV8U3xUfFZFKSk/fFxcXFxkKig/Oig/OjFTVHwyTkR8M1JEfCg/IVsxMjNdKVxcXFxkVEgpXFxcXGIpfFxcXFxkKig/Oig/OjFzdHwybmR8M3JkfCg/IVsxMjNdKVxcXFxkdGgpXFxcXGIpfFxcXFxkK1wiLE9uXS5qb2luKFwifFwiKSxcImdcIiksQm49UmVnRXhwKFwiW1xcXFx1MjAwZFxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZcXFxcdWZlMGVcXFxcdWZlMGZdXCIpLExuPS9bYS16XVtBLVpdfFtBLVpdezIsfVthLXpdfFswLTldW2EtekEtWl18W2EtekEtWl1bMC05XXxbXmEtekEtWjAtOSBdLyxVbj1cIkFycmF5IEJ1ZmZlciBEYXRhVmlldyBEYXRlIEVycm9yIEZsb2F0MzJBcnJheSBGbG9hdDY0QXJyYXkgRnVuY3Rpb24gSW50OEFycmF5IEludDE2QXJyYXkgSW50MzJBcnJheSBNYXAgTWF0aCBPYmplY3QgUHJvbWlzZSBSZWdFeHAgU2V0IFN0cmluZyBTeW1ib2wgVHlwZUVycm9yIFVpbnQ4QXJyYXkgVWludDhDbGFtcGVkQXJyYXkgVWludDE2QXJyYXkgVWludDMyQXJyYXkgV2Vha01hcCBfIGNsZWFyVGltZW91dCBpc0Zpbml0ZSBwYXJzZUludCBzZXRUaW1lb3V0XCIuc3BsaXQoXCIgXCIpLENuPXt9O1xuQ25bXCJbb2JqZWN0IEZsb2F0MzJBcnJheV1cIl09Q25bXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIl09Q25bXCJbb2JqZWN0IEludDhBcnJheV1cIl09Q25bXCJbb2JqZWN0IEludDE2QXJyYXldXCJdPUNuW1wiW29iamVjdCBJbnQzMkFycmF5XVwiXT1DbltcIltvYmplY3QgVWludDhBcnJheV1cIl09Q25bXCJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XVwiXT1DbltcIltvYmplY3QgVWludDE2QXJyYXldXCJdPUNuW1wiW29iamVjdCBVaW50MzJBcnJheV1cIl09dHJ1ZSxDbltcIltvYmplY3QgQXJndW1lbnRzXVwiXT1DbltcIltvYmplY3QgQXJyYXldXCJdPUNuW1wiW29iamVjdCBBcnJheUJ1ZmZlcl1cIl09Q25bXCJbb2JqZWN0IEJvb2xlYW5dXCJdPUNuW1wiW29iamVjdCBEYXRhVmlld11cIl09Q25bXCJbb2JqZWN0IERhdGVdXCJdPUNuW1wiW29iamVjdCBFcnJvcl1cIl09Q25bXCJbb2JqZWN0IEZ1bmN0aW9uXVwiXT1DbltcIltvYmplY3QgTWFwXVwiXT1DbltcIltvYmplY3QgTnVtYmVyXVwiXT1DbltcIltvYmplY3QgT2JqZWN0XVwiXT1DbltcIltvYmplY3QgUmVnRXhwXVwiXT1DbltcIltvYmplY3QgU2V0XVwiXT1DbltcIltvYmplY3QgU3RyaW5nXVwiXT1DbltcIltvYmplY3QgV2Vha01hcF1cIl09ZmFsc2U7XG52YXIgRG49e307RG5bXCJbb2JqZWN0IEFyZ3VtZW50c11cIl09RG5bXCJbb2JqZWN0IEFycmF5XVwiXT1EbltcIltvYmplY3QgQXJyYXlCdWZmZXJdXCJdPURuW1wiW29iamVjdCBEYXRhVmlld11cIl09RG5bXCJbb2JqZWN0IEJvb2xlYW5dXCJdPURuW1wiW29iamVjdCBEYXRlXVwiXT1EbltcIltvYmplY3QgRmxvYXQzMkFycmF5XVwiXT1EbltcIltvYmplY3QgRmxvYXQ2NEFycmF5XVwiXT1EbltcIltvYmplY3QgSW50OEFycmF5XVwiXT1EbltcIltvYmplY3QgSW50MTZBcnJheV1cIl09RG5bXCJbb2JqZWN0IEludDMyQXJyYXldXCJdPURuW1wiW29iamVjdCBNYXBdXCJdPURuW1wiW29iamVjdCBOdW1iZXJdXCJdPURuW1wiW29iamVjdCBPYmplY3RdXCJdPURuW1wiW29iamVjdCBSZWdFeHBdXCJdPURuW1wiW29iamVjdCBTZXRdXCJdPURuW1wiW29iamVjdCBTdHJpbmddXCJdPURuW1wiW29iamVjdCBTeW1ib2xdXCJdPURuW1wiW29iamVjdCBVaW50OEFycmF5XVwiXT1EbltcIltvYmplY3QgVWludDhDbGFtcGVkQXJyYXldXCJdPURuW1wiW29iamVjdCBVaW50MTZBcnJheV1cIl09RG5bXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiXT10cnVlLFxuRG5bXCJbb2JqZWN0IEVycm9yXVwiXT1EbltcIltvYmplY3QgRnVuY3Rpb25dXCJdPURuW1wiW29iamVjdCBXZWFrTWFwXVwiXT1mYWxzZTt2YXIgTW4sVG49e1wiXFxcXFwiOlwiXFxcXFwiLFwiJ1wiOlwiJ1wiLFwiXFxuXCI6XCJuXCIsXCJcXHJcIjpcInJcIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSwkbj1wYXJzZUZsb2F0LEZuPXBhcnNlSW50LE5uPXR5cGVvZiBnbG9iYWw9PVwib2JqZWN0XCImJmdsb2JhbCYmZ2xvYmFsLk9iamVjdD09PU9iamVjdCYmZ2xvYmFsLFBuPXR5cGVvZiBzZWxmPT1cIm9iamVjdFwiJiZzZWxmJiZzZWxmLk9iamVjdD09PU9iamVjdCYmc2VsZixabj1Obnx8UG58fEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSxxbj10eXBlb2YgZXhwb3J0cz09XCJvYmplY3RcIiYmZXhwb3J0cyYmIWV4cG9ydHMubm9kZVR5cGUmJmV4cG9ydHMsVm49cW4mJnR5cGVvZiBtb2R1bGU9PVwib2JqZWN0XCImJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLEtuPVZuJiZWbi5leHBvcnRzPT09cW4sR249S24mJk5uLnByb2Nlc3M7XG5uOnt0cnl7TW49R24mJkduLmJpbmRpbmcmJkduLmJpbmRpbmcoXCJ1dGlsXCIpO2JyZWFrIG59Y2F0Y2gobil7fU1uPXZvaWQgMH12YXIgSG49TW4mJk1uLmlzQXJyYXlCdWZmZXIsSm49TW4mJk1uLmlzRGF0ZSxZbj1NbiYmTW4uaXNNYXAsUW49TW4mJk1uLmlzUmVnRXhwLFhuPU1uJiZNbi5pc1NldCxudD1NbiYmTW4uaXNUeXBlZEFycmF5LHR0PWooXCJsZW5ndGhcIikscnQ9dyh7XCJcXHhjMFwiOlwiQVwiLFwiXFx4YzFcIjpcIkFcIixcIlxceGMyXCI6XCJBXCIsXCJcXHhjM1wiOlwiQVwiLFwiXFx4YzRcIjpcIkFcIixcIlxceGM1XCI6XCJBXCIsXCJcXHhlMFwiOlwiYVwiLFwiXFx4ZTFcIjpcImFcIixcIlxceGUyXCI6XCJhXCIsXCJcXHhlM1wiOlwiYVwiLFwiXFx4ZTRcIjpcImFcIixcIlxceGU1XCI6XCJhXCIsXCJcXHhjN1wiOlwiQ1wiLFwiXFx4ZTdcIjpcImNcIixcIlxceGQwXCI6XCJEXCIsXCJcXHhmMFwiOlwiZFwiLFwiXFx4YzhcIjpcIkVcIixcIlxceGM5XCI6XCJFXCIsXCJcXHhjYVwiOlwiRVwiLFwiXFx4Y2JcIjpcIkVcIixcIlxceGU4XCI6XCJlXCIsXCJcXHhlOVwiOlwiZVwiLFwiXFx4ZWFcIjpcImVcIixcIlxceGViXCI6XCJlXCIsXCJcXHhjY1wiOlwiSVwiLFwiXFx4Y2RcIjpcIklcIixcIlxceGNlXCI6XCJJXCIsXG5cIlxceGNmXCI6XCJJXCIsXCJcXHhlY1wiOlwiaVwiLFwiXFx4ZWRcIjpcImlcIixcIlxceGVlXCI6XCJpXCIsXCJcXHhlZlwiOlwiaVwiLFwiXFx4ZDFcIjpcIk5cIixcIlxceGYxXCI6XCJuXCIsXCJcXHhkMlwiOlwiT1wiLFwiXFx4ZDNcIjpcIk9cIixcIlxceGQ0XCI6XCJPXCIsXCJcXHhkNVwiOlwiT1wiLFwiXFx4ZDZcIjpcIk9cIixcIlxceGQ4XCI6XCJPXCIsXCJcXHhmMlwiOlwib1wiLFwiXFx4ZjNcIjpcIm9cIixcIlxceGY0XCI6XCJvXCIsXCJcXHhmNVwiOlwib1wiLFwiXFx4ZjZcIjpcIm9cIixcIlxceGY4XCI6XCJvXCIsXCJcXHhkOVwiOlwiVVwiLFwiXFx4ZGFcIjpcIlVcIixcIlxceGRiXCI6XCJVXCIsXCJcXHhkY1wiOlwiVVwiLFwiXFx4ZjlcIjpcInVcIixcIlxceGZhXCI6XCJ1XCIsXCJcXHhmYlwiOlwidVwiLFwiXFx4ZmNcIjpcInVcIixcIlxceGRkXCI6XCJZXCIsXCJcXHhmZFwiOlwieVwiLFwiXFx4ZmZcIjpcInlcIixcIlxceGM2XCI6XCJBZVwiLFwiXFx4ZTZcIjpcImFlXCIsXCJcXHhkZVwiOlwiVGhcIixcIlxceGZlXCI6XCJ0aFwiLFwiXFx4ZGZcIjpcInNzXCIsXCJcXHUwMTAwXCI6XCJBXCIsXCJcXHUwMTAyXCI6XCJBXCIsXCJcXHUwMTA0XCI6XCJBXCIsXCJcXHUwMTAxXCI6XCJhXCIsXCJcXHUwMTAzXCI6XCJhXCIsXCJcXHUwMTA1XCI6XCJhXCIsXCJcXHUwMTA2XCI6XCJDXCIsXCJcXHUwMTA4XCI6XCJDXCIsXCJcXHUwMTBhXCI6XCJDXCIsXG5cIlxcdTAxMGNcIjpcIkNcIixcIlxcdTAxMDdcIjpcImNcIixcIlxcdTAxMDlcIjpcImNcIixcIlxcdTAxMGJcIjpcImNcIixcIlxcdTAxMGRcIjpcImNcIixcIlxcdTAxMGVcIjpcIkRcIixcIlxcdTAxMTBcIjpcIkRcIixcIlxcdTAxMGZcIjpcImRcIixcIlxcdTAxMTFcIjpcImRcIixcIlxcdTAxMTJcIjpcIkVcIixcIlxcdTAxMTRcIjpcIkVcIixcIlxcdTAxMTZcIjpcIkVcIixcIlxcdTAxMThcIjpcIkVcIixcIlxcdTAxMWFcIjpcIkVcIixcIlxcdTAxMTNcIjpcImVcIixcIlxcdTAxMTVcIjpcImVcIixcIlxcdTAxMTdcIjpcImVcIixcIlxcdTAxMTlcIjpcImVcIixcIlxcdTAxMWJcIjpcImVcIixcIlxcdTAxMWNcIjpcIkdcIixcIlxcdTAxMWVcIjpcIkdcIixcIlxcdTAxMjBcIjpcIkdcIixcIlxcdTAxMjJcIjpcIkdcIixcIlxcdTAxMWRcIjpcImdcIixcIlxcdTAxMWZcIjpcImdcIixcIlxcdTAxMjFcIjpcImdcIixcIlxcdTAxMjNcIjpcImdcIixcIlxcdTAxMjRcIjpcIkhcIixcIlxcdTAxMjZcIjpcIkhcIixcIlxcdTAxMjVcIjpcImhcIixcIlxcdTAxMjdcIjpcImhcIixcIlxcdTAxMjhcIjpcIklcIixcIlxcdTAxMmFcIjpcIklcIixcIlxcdTAxMmNcIjpcIklcIixcIlxcdTAxMmVcIjpcIklcIixcIlxcdTAxMzBcIjpcIklcIixcIlxcdTAxMjlcIjpcImlcIixcIlxcdTAxMmJcIjpcImlcIixcIlxcdTAxMmRcIjpcImlcIixcblwiXFx1MDEyZlwiOlwiaVwiLFwiXFx1MDEzMVwiOlwiaVwiLFwiXFx1MDEzNFwiOlwiSlwiLFwiXFx1MDEzNVwiOlwialwiLFwiXFx1MDEzNlwiOlwiS1wiLFwiXFx1MDEzN1wiOlwia1wiLFwiXFx1MDEzOFwiOlwia1wiLFwiXFx1MDEzOVwiOlwiTFwiLFwiXFx1MDEzYlwiOlwiTFwiLFwiXFx1MDEzZFwiOlwiTFwiLFwiXFx1MDEzZlwiOlwiTFwiLFwiXFx1MDE0MVwiOlwiTFwiLFwiXFx1MDEzYVwiOlwibFwiLFwiXFx1MDEzY1wiOlwibFwiLFwiXFx1MDEzZVwiOlwibFwiLFwiXFx1MDE0MFwiOlwibFwiLFwiXFx1MDE0MlwiOlwibFwiLFwiXFx1MDE0M1wiOlwiTlwiLFwiXFx1MDE0NVwiOlwiTlwiLFwiXFx1MDE0N1wiOlwiTlwiLFwiXFx1MDE0YVwiOlwiTlwiLFwiXFx1MDE0NFwiOlwiblwiLFwiXFx1MDE0NlwiOlwiblwiLFwiXFx1MDE0OFwiOlwiblwiLFwiXFx1MDE0YlwiOlwiblwiLFwiXFx1MDE0Y1wiOlwiT1wiLFwiXFx1MDE0ZVwiOlwiT1wiLFwiXFx1MDE1MFwiOlwiT1wiLFwiXFx1MDE0ZFwiOlwib1wiLFwiXFx1MDE0ZlwiOlwib1wiLFwiXFx1MDE1MVwiOlwib1wiLFwiXFx1MDE1NFwiOlwiUlwiLFwiXFx1MDE1NlwiOlwiUlwiLFwiXFx1MDE1OFwiOlwiUlwiLFwiXFx1MDE1NVwiOlwiclwiLFwiXFx1MDE1N1wiOlwiclwiLFwiXFx1MDE1OVwiOlwiclwiLFwiXFx1MDE1YVwiOlwiU1wiLFwiXFx1MDE1Y1wiOlwiU1wiLFxuXCJcXHUwMTVlXCI6XCJTXCIsXCJcXHUwMTYwXCI6XCJTXCIsXCJcXHUwMTViXCI6XCJzXCIsXCJcXHUwMTVkXCI6XCJzXCIsXCJcXHUwMTVmXCI6XCJzXCIsXCJcXHUwMTYxXCI6XCJzXCIsXCJcXHUwMTYyXCI6XCJUXCIsXCJcXHUwMTY0XCI6XCJUXCIsXCJcXHUwMTY2XCI6XCJUXCIsXCJcXHUwMTYzXCI6XCJ0XCIsXCJcXHUwMTY1XCI6XCJ0XCIsXCJcXHUwMTY3XCI6XCJ0XCIsXCJcXHUwMTY4XCI6XCJVXCIsXCJcXHUwMTZhXCI6XCJVXCIsXCJcXHUwMTZjXCI6XCJVXCIsXCJcXHUwMTZlXCI6XCJVXCIsXCJcXHUwMTcwXCI6XCJVXCIsXCJcXHUwMTcyXCI6XCJVXCIsXCJcXHUwMTY5XCI6XCJ1XCIsXCJcXHUwMTZiXCI6XCJ1XCIsXCJcXHUwMTZkXCI6XCJ1XCIsXCJcXHUwMTZmXCI6XCJ1XCIsXCJcXHUwMTcxXCI6XCJ1XCIsXCJcXHUwMTczXCI6XCJ1XCIsXCJcXHUwMTc0XCI6XCJXXCIsXCJcXHUwMTc1XCI6XCJ3XCIsXCJcXHUwMTc2XCI6XCJZXCIsXCJcXHUwMTc3XCI6XCJ5XCIsXCJcXHUwMTc4XCI6XCJZXCIsXCJcXHUwMTc5XCI6XCJaXCIsXCJcXHUwMTdiXCI6XCJaXCIsXCJcXHUwMTdkXCI6XCJaXCIsXCJcXHUwMTdhXCI6XCJ6XCIsXCJcXHUwMTdjXCI6XCJ6XCIsXCJcXHUwMTdlXCI6XCJ6XCIsXCJcXHUwMTMyXCI6XCJJSlwiLFwiXFx1MDEzM1wiOlwiaWpcIixcIlxcdTAxNTJcIjpcIk9lXCIsXCJcXHUwMTUzXCI6XCJvZVwiLFxuXCJcXHUwMTQ5XCI6XCInblwiLFwiXFx1MDE3ZlwiOlwic1wifSksZXQ9dyh7XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCJ9KSx1dD13KHtcIiZhbXA7XCI6XCImXCIsXCImbHQ7XCI6XCI8XCIsXCImZ3Q7XCI6XCI+XCIsXCImcXVvdDtcIjonXCInLFwiJiMzOTtcIjpcIidcIn0pLGl0PWZ1bmN0aW9uIHcoRW4pe2Z1bmN0aW9uIE9uKG4pe2lmKHh1KG4pJiYhYWYobikmJiEobiBpbnN0YW5jZW9mIE1uKSl7aWYobiBpbnN0YW5jZW9mIHpuKXJldHVybiBuO2lmKGNpLmNhbGwobixcIl9fd3JhcHBlZF9fXCIpKXJldHVybiBQZShuKX1yZXR1cm4gbmV3IHpuKG4pfWZ1bmN0aW9uIFNuKCl7fWZ1bmN0aW9uIHpuKG4sdCl7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2NoYWluX189ISF0LHRoaXMuX19pbmRleF9fPTAsdGhpcy5fX3ZhbHVlc19fPUZ9ZnVuY3Rpb24gTW4obil7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2Rpcl9fPTEsXG50aGlzLl9fZmlsdGVyZWRfXz1mYWxzZSx0aGlzLl9faXRlcmF0ZWVzX189W10sdGhpcy5fX3Rha2VDb3VudF9fPTQyOTQ5NjcyOTUsdGhpcy5fX3ZpZXdzX189W119ZnVuY3Rpb24gVG4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gTm4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gUG4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gcW4obil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuX19kYXRhX189bmV3IFBuOysrdDxyOyl0aGlzLmFkZChuW3RdKX1mdW5jdGlvbiBWbihuKXtcbnRoaXMuc2l6ZT0odGhpcy5fX2RhdGFfXz1uZXcgTm4obikpLnNpemV9ZnVuY3Rpb24gR24obix0KXt2YXIgcixlPWFmKG4pLHU9IWUmJmNmKG4pLGk9IWUmJiF1JiZzZihuKSxvPSFlJiYhdSYmIWkmJmdmKG4pLHU9KGU9ZXx8dXx8aXx8byk/RShuLmxlbmd0aCxyaSk6W10sZj11Lmxlbmd0aDtmb3IociBpbiBuKSF0JiYhY2kuY2FsbChuLHIpfHxlJiYoXCJsZW5ndGhcIj09cnx8aSYmKFwib2Zmc2V0XCI9PXJ8fFwicGFyZW50XCI9PXIpfHxvJiYoXCJidWZmZXJcIj09cnx8XCJieXRlTGVuZ3RoXCI9PXJ8fFwiYnl0ZU9mZnNldFwiPT1yKXx8UmUocixmKSl8fHUucHVzaChyKTtyZXR1cm4gdX1mdW5jdGlvbiB0dChuKXt2YXIgdD1uLmxlbmd0aDtyZXR1cm4gdD9uW2NyKDAsdC0xKV06Rn1mdW5jdGlvbiBvdChuLHQpe3JldHVybiBUZShNcihuKSxndCh0LDAsbi5sZW5ndGgpKX1mdW5jdGlvbiBmdChuKXtyZXR1cm4gVGUoTXIobikpfWZ1bmN0aW9uIGN0KG4sdCxyKXsocj09PUZ8fGh1KG5bdF0scikpJiYociE9PUZ8fHQgaW4gbil8fF90KG4sdCxyKTtcbn1mdW5jdGlvbiBhdChuLHQscil7dmFyIGU9blt0XTtjaS5jYWxsKG4sdCkmJmh1KGUscikmJihyIT09Rnx8dCBpbiBuKXx8X3Qobix0LHIpfWZ1bmN0aW9uIGx0KG4sdCl7Zm9yKHZhciByPW4ubGVuZ3RoO3ItLTspaWYoaHUobltyXVswXSx0KSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBzdChuLHQscixlKXtyZXR1cm4gb28obixmdW5jdGlvbihuLHUsaSl7dChlLG4scihuKSxpKX0pLGV9ZnVuY3Rpb24gaHQobix0KXtyZXR1cm4gbiYmVHIodCxMdSh0KSxuKX1mdW5jdGlvbiBwdChuLHQpe3JldHVybiBuJiZUcih0LFV1KHQpLG4pfWZ1bmN0aW9uIF90KG4sdCxyKXtcIl9fcHJvdG9fX1wiPT10JiZFaT9FaShuLHQse2NvbmZpZ3VyYWJsZTp0cnVlLGVudW1lcmFibGU6dHJ1ZSx2YWx1ZTpyLHdyaXRhYmxlOnRydWV9KTpuW3RdPXJ9ZnVuY3Rpb24gdnQobix0KXtmb3IodmFyIHI9LTEsZT10Lmxlbmd0aCx1PUh1KGUpLGk9bnVsbD09bjsrK3I8ZTspdVtyXT1pP0Y6V3Uobix0W3JdKTtyZXR1cm4gdTtcbn1mdW5jdGlvbiBndChuLHQscil7cmV0dXJuIG49PT1uJiYociE9PUYmJihuPW48PXI/bjpyKSx0IT09RiYmKG49bj49dD9uOnQpKSxufWZ1bmN0aW9uIGR0KG4sdCxyLGUsaSxvKXt2YXIgZixjPTEmdCxhPTImdCxsPTQmdDtpZihyJiYoZj1pP3IobixlLGksbyk6cihuKSksZiE9PUYpcmV0dXJuIGY7aWYoIWJ1KG4pKXJldHVybiBuO2lmKGU9YWYobikpe2lmKGY9RWUobiksIWMpcmV0dXJuIE1yKG4sZil9ZWxzZXt2YXIgcz15byhuKSxoPVwiW29iamVjdCBGdW5jdGlvbl1cIj09c3x8XCJbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXVwiPT1zO2lmKHNmKG4pKXJldHVybiBXcihuLGMpO2lmKFwiW29iamVjdCBPYmplY3RdXCI9PXN8fFwiW29iamVjdCBBcmd1bWVudHNdXCI9PXN8fGgmJiFpKXtpZihmPWF8fGg/e306T2UobiksIWMpcmV0dXJuIGE/RnIobixwdChmLG4pKTokcihuLGh0KGYsbikpfWVsc2V7aWYoIURuW3NdKXJldHVybiBpP246e307Zj1TZShuLHMsZHQsYyl9fWlmKG98fChvPW5ldyBWbiksXG5pPW8uZ2V0KG4pKXJldHVybiBpO28uc2V0KG4sZik7dmFyIGE9bD9hP3llOmRlOmE/VXU6THUscD1lP0Y6YShuKTtyZXR1cm4gdShwfHxuLGZ1bmN0aW9uKGUsdSl7cCYmKHU9ZSxlPW5bdV0pLGF0KGYsdSxkdChlLHQscix1LG4sbykpfSksZn1mdW5jdGlvbiB5dChuKXt2YXIgdD1MdShuKTtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIGJ0KHIsbix0KX19ZnVuY3Rpb24gYnQobix0LHIpe3ZhciBlPXIubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKG49bmkobik7ZS0tOyl7dmFyIHU9cltlXSxpPXRbdV0sbz1uW3VdO2lmKG89PT1GJiYhKHUgaW4gbil8fCFpKG8pKXJldHVybiBmYWxzZX1yZXR1cm4gdHJ1ZX1mdW5jdGlvbiB4dChuLHQscil7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBqbyhmdW5jdGlvbigpe24uYXBwbHkoRixyKX0sdCl9ZnVuY3Rpb24ganQobix0LHIsZSl7dmFyIHU9LTEsaT1jLG89dHJ1ZSxmPW4ubGVuZ3RoLHM9W10saD10Lmxlbmd0aDtcbmlmKCFmKXJldHVybiBzO3ImJih0PWwodCxTKHIpKSksZT8oaT1hLG89ZmFsc2UpOjIwMDw9dC5sZW5ndGgmJihpPVIsbz1mYWxzZSx0PW5ldyBxbih0KSk7bjpmb3IoOysrdTxmOyl7dmFyIHA9blt1XSxfPW51bGw9PXI/cDpyKHApLHA9ZXx8MCE9PXA/cDowO2lmKG8mJl89PT1fKXtmb3IodmFyIHY9aDt2LS07KWlmKHRbdl09PT1fKWNvbnRpbnVlIG47cy5wdXNoKHApfWVsc2UgaSh0LF8sZSl8fHMucHVzaChwKX1yZXR1cm4gc31mdW5jdGlvbiB3dChuLHQpe3ZhciByPXRydWU7cmV0dXJuIG9vKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiByPSEhdChuLGUsdSl9KSxyfWZ1bmN0aW9uIG10KG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aDsrK2U8dTspe3ZhciBpPW5bZV0sbz10KGkpO2lmKG51bGwhPW8mJihmPT09Rj9vPT09byYmIUF1KG8pOnIobyxmKSkpdmFyIGY9byxjPWl9cmV0dXJuIGN9ZnVuY3Rpb24gQXQobix0KXt2YXIgcj1bXTtyZXR1cm4gb28obixmdW5jdGlvbihuLGUsdSl7XG50KG4sZSx1KSYmci5wdXNoKG4pfSkscn1mdW5jdGlvbiBrdChuLHQscixlLHUpe3ZhciBpPS0xLG89bi5sZW5ndGg7Zm9yKHJ8fChyPUllKSx1fHwodT1bXSk7KytpPG87KXt2YXIgZj1uW2ldOzA8dCYmcihmKT8xPHQ/a3QoZix0LTEscixlLHUpOnModSxmKTplfHwodVt1Lmxlbmd0aF09Zil9cmV0dXJuIHV9ZnVuY3Rpb24gRXQobix0KXtyZXR1cm4gbiYmY28obix0LEx1KX1mdW5jdGlvbiBPdChuLHQpe3JldHVybiBuJiZhbyhuLHQsTHUpfWZ1bmN0aW9uIFN0KG4sdCl7cmV0dXJuIGYodCxmdW5jdGlvbih0KXtyZXR1cm4gZ3Uoblt0XSl9KX1mdW5jdGlvbiBJdChuLHQpe3Q9UnIodCxuKTtmb3IodmFyIHI9MCxlPXQubGVuZ3RoO251bGwhPW4mJnI8ZTspbj1uWyRlKHRbcisrXSldO3JldHVybiByJiZyPT1lP246Rn1mdW5jdGlvbiBSdChuLHQscil7cmV0dXJuIHQ9dChuKSxhZihuKT90OnModCxyKG4pKX1mdW5jdGlvbiB6dChuKXtpZihudWxsPT1uKW49bj09PUY/XCJbb2JqZWN0IFVuZGVmaW5lZF1cIjpcIltvYmplY3QgTnVsbF1cIjtlbHNlIGlmKGtpJiZraSBpbiBuaShuKSl7XG52YXIgdD1jaS5jYWxsKG4sa2kpLHI9bltraV07dHJ5e25ba2ldPUY7dmFyIGU9dHJ1ZX1jYXRjaChuKXt9dmFyIHU9c2kuY2FsbChuKTtlJiYodD9uW2tpXT1yOmRlbGV0ZSBuW2tpXSksbj11fWVsc2Ugbj1zaS5jYWxsKG4pO3JldHVybiBufWZ1bmN0aW9uIFd0KG4sdCl7cmV0dXJuIG4+dH1mdW5jdGlvbiBCdChuLHQpe3JldHVybiBudWxsIT1uJiZjaS5jYWxsKG4sdCl9ZnVuY3Rpb24gTHQobix0KXtyZXR1cm4gbnVsbCE9biYmdCBpbiBuaShuKX1mdW5jdGlvbiBVdChuLHQscil7Zm9yKHZhciBlPXI/YTpjLHU9blswXS5sZW5ndGgsaT1uLmxlbmd0aCxvPWksZj1IdShpKSxzPTEvMCxoPVtdO28tLTspe3ZhciBwPW5bb107byYmdCYmKHA9bChwLFModCkpKSxzPU1pKHAubGVuZ3RoLHMpLGZbb109IXImJih0fHwxMjA8PXUmJjEyMDw9cC5sZW5ndGgpP25ldyBxbihvJiZwKTpGfXZhciBwPW5bMF0sXz0tMSx2PWZbMF07bjpmb3IoOysrXzx1JiZoLmxlbmd0aDxzOyl7dmFyIGc9cFtfXSxkPXQ/dChnKTpnLGc9cnx8MCE9PWc/ZzowO1xuaWYodj8hUih2LGQpOiFlKGgsZCxyKSl7Zm9yKG89aTstLW87KXt2YXIgeT1mW29dO2lmKHk/IVIoeSxkKTohZShuW29dLGQscikpY29udGludWUgbn12JiZ2LnB1c2goZCksaC5wdXNoKGcpfX1yZXR1cm4gaH1mdW5jdGlvbiBDdChuLHQscil7dmFyIGU9e307cmV0dXJuIEV0KG4sZnVuY3Rpb24obix1LGkpe3QoZSxyKG4pLHUsaSl9KSxlfWZ1bmN0aW9uIER0KG4sdCxlKXtyZXR1cm4gdD1Scih0LG4pLG49Mj50Lmxlbmd0aD9uOkl0KG4sdnIodCwwLC0xKSksdD1udWxsPT1uP246blskZShHZSh0KSldLG51bGw9PXQ/RjpyKHQsbixlKX1mdW5jdGlvbiBNdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBBcmd1bWVudHNdXCI9PXp0KG4pfWZ1bmN0aW9uIFR0KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT16dChuKX1mdW5jdGlvbiAkdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBEYXRlXVwiPT16dChuKX1mdW5jdGlvbiBGdChuLHQscixlLHUpe2lmKG49PT10KXQ9dHJ1ZTtlbHNlIGlmKG51bGw9PW58fG51bGw9PXR8fCF4dShuKSYmIXh1KHQpKXQ9biE9PW4mJnQhPT10O2Vsc2Ugbjp7XG52YXIgaT1hZihuKSxvPWFmKHQpLGY9aT9cIltvYmplY3QgQXJyYXldXCI6eW8obiksYz1vP1wiW29iamVjdCBBcnJheV1cIjp5byh0KSxmPVwiW29iamVjdCBBcmd1bWVudHNdXCI9PWY/XCJbb2JqZWN0IE9iamVjdF1cIjpmLGM9XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09Yz9cIltvYmplY3QgT2JqZWN0XVwiOmMsYT1cIltvYmplY3QgT2JqZWN0XVwiPT1mLG89XCJbb2JqZWN0IE9iamVjdF1cIj09YztpZigoYz1mPT1jKSYmc2Yobikpe2lmKCFzZih0KSl7dD1mYWxzZTticmVhayBufWk9dHJ1ZSxhPWZhbHNlfWlmKGMmJiFhKXV8fCh1PW5ldyBWbiksdD1pfHxnZihuKT9fZShuLHQscixlLEZ0LHUpOnZlKG4sdCxmLHIsZSxGdCx1KTtlbHNle2lmKCEoMSZyKSYmKGk9YSYmY2kuY2FsbChuLFwiX193cmFwcGVkX19cIiksZj1vJiZjaS5jYWxsKHQsXCJfX3dyYXBwZWRfX1wiKSxpfHxmKSl7bj1pP24udmFsdWUoKTpuLHQ9Zj90LnZhbHVlKCk6dCx1fHwodT1uZXcgVm4pLHQ9RnQobix0LHIsZSx1KTticmVhayBufWlmKGMpdDppZih1fHwodT1uZXcgVm4pLFxuaT0xJnIsZj1kZShuKSxvPWYubGVuZ3RoLGM9ZGUodCkubGVuZ3RoLG89PWN8fGkpe2ZvcihhPW87YS0tOyl7dmFyIGw9ZlthXTtpZighKGk/bCBpbiB0OmNpLmNhbGwodCxsKSkpe3Q9ZmFsc2U7YnJlYWsgdH19aWYoKGM9dS5nZXQobikpJiZ1LmdldCh0KSl0PWM9PXQ7ZWxzZXtjPXRydWUsdS5zZXQobix0KSx1LnNldCh0LG4pO2Zvcih2YXIgcz1pOysrYTxvOyl7dmFyIGw9ZlthXSxoPW5bbF0scD10W2xdO2lmKGUpdmFyIF89aT9lKHAsaCxsLHQsbix1KTplKGgscCxsLG4sdCx1KTtpZihfPT09Rj9oIT09cCYmIUZ0KGgscCxyLGUsdSk6IV8pe2M9ZmFsc2U7YnJlYWt9c3x8KHM9XCJjb25zdHJ1Y3RvclwiPT1sKX1jJiYhcyYmKHI9bi5jb25zdHJ1Y3RvcixlPXQuY29uc3RydWN0b3IsciE9ZSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gdCYmISh0eXBlb2Ygcj09XCJmdW5jdGlvblwiJiZyIGluc3RhbmNlb2YgciYmdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmZSBpbnN0YW5jZW9mIGUpJiYoYz1mYWxzZSkpLFxudS5kZWxldGUobiksdS5kZWxldGUodCksdD1jfX1lbHNlIHQ9ZmFsc2U7ZWxzZSB0PWZhbHNlfX1yZXR1cm4gdH1mdW5jdGlvbiBOdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBNYXBdXCI9PXlvKG4pfWZ1bmN0aW9uIFB0KG4sdCxyLGUpe3ZhciB1PXIubGVuZ3RoLGk9dSxvPSFlO2lmKG51bGw9PW4pcmV0dXJuIWk7Zm9yKG49bmkobik7dS0tOyl7dmFyIGY9clt1XTtpZihvJiZmWzJdP2ZbMV0hPT1uW2ZbMF1dOiEoZlswXWluIG4pKXJldHVybiBmYWxzZX1mb3IoOysrdTxpOyl7dmFyIGY9clt1XSxjPWZbMF0sYT1uW2NdLGw9ZlsxXTtpZihvJiZmWzJdKXtpZihhPT09RiYmIShjIGluIG4pKXJldHVybiBmYWxzZX1lbHNle2lmKGY9bmV3IFZuLGUpdmFyIHM9ZShhLGwsYyxuLHQsZik7aWYocz09PUY/IUZ0KGwsYSwzLGUsZik6IXMpcmV0dXJuIGZhbHNlfX1yZXR1cm4gdHJ1ZX1mdW5jdGlvbiBadChuKXtyZXR1cm4hKCFidShuKXx8bGkmJmxpIGluIG4pJiYoZ3Uobik/X2k6eG4pLnRlc3QoRmUobikpfWZ1bmN0aW9uIHF0KG4pe1xucmV0dXJuIHh1KG4pJiZcIltvYmplY3QgUmVnRXhwXVwiPT16dChuKX1mdW5jdGlvbiBWdChuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBTZXRdXCI9PXlvKG4pfWZ1bmN0aW9uIEt0KG4pe3JldHVybiB4dShuKSYmeXUobi5sZW5ndGgpJiYhIUNuW3p0KG4pXX1mdW5jdGlvbiBHdChuKXtyZXR1cm4gdHlwZW9mIG49PVwiZnVuY3Rpb25cIj9uOm51bGw9PW4/TnU6dHlwZW9mIG49PVwib2JqZWN0XCI/YWYobik/WHQoblswXSxuWzFdKTpRdChuKTpWdShuKX1mdW5jdGlvbiBIdChuKXtpZighTGUobikpcmV0dXJuIENpKG4pO3ZhciB0LHI9W107Zm9yKHQgaW4gbmkobikpY2kuY2FsbChuLHQpJiZcImNvbnN0cnVjdG9yXCIhPXQmJnIucHVzaCh0KTtyZXR1cm4gcn1mdW5jdGlvbiBKdChuLHQpe3JldHVybiBuPHR9ZnVuY3Rpb24gWXQobix0KXt2YXIgcj0tMSxlPXB1KG4pP0h1KG4ubGVuZ3RoKTpbXTtyZXR1cm4gb28obixmdW5jdGlvbihuLHUsaSl7ZVsrK3JdPXQobix1LGkpfSksZX1mdW5jdGlvbiBRdChuKXtcbnZhciB0PW1lKG4pO3JldHVybiAxPT10Lmxlbmd0aCYmdFswXVsyXT9VZSh0WzBdWzBdLHRbMF1bMV0pOmZ1bmN0aW9uKHIpe3JldHVybiByPT09bnx8UHQocixuLHQpfX1mdW5jdGlvbiBYdChuLHQpe3JldHVybiBXZShuKSYmdD09PXQmJiFidSh0KT9VZSgkZShuKSx0KTpmdW5jdGlvbihyKXt2YXIgZT1XdShyLG4pO3JldHVybiBlPT09RiYmZT09PXQ/QnUocixuKTpGdCh0LGUsMyl9fWZ1bmN0aW9uIG5yKG4sdCxyLGUsdSl7biE9PXQmJmNvKHQsZnVuY3Rpb24oaSxvKXtpZihidShpKSl7dXx8KHU9bmV3IFZuKTt2YXIgZj11LGM9bltvXSxhPXRbb10sbD1mLmdldChhKTtpZihsKWN0KG4sbyxsKTtlbHNle3ZhciBsPWU/ZShjLGEsbytcIlwiLG4sdCxmKTpGLHM9bD09PUY7aWYocyl7dmFyIGg9YWYoYSkscD0haCYmc2YoYSksXz0haCYmIXAmJmdmKGEpLGw9YTtofHxwfHxfP2FmKGMpP2w9YzpfdShjKT9sPU1yKGMpOnA/KHM9ZmFsc2UsbD1XcihhLHRydWUpKTpfPyhzPWZhbHNlLGw9THIoYSx0cnVlKSk6bD1bXTp3dShhKXx8Y2YoYSk/KGw9YyxcbmNmKGMpP2w9UnUoYyk6KCFidShjKXx8ciYmZ3UoYykpJiYobD1PZShhKSkpOnM9ZmFsc2V9cyYmKGYuc2V0KGEsbCksbnIobCxhLHIsZSxmKSxmLmRlbGV0ZShhKSksY3QobixvLGwpfX1lbHNlIGY9ZT9lKG5bb10saSxvK1wiXCIsbix0LHUpOkYsZj09PUYmJihmPWkpLGN0KG4sbyxmKX0sVXUpfWZ1bmN0aW9uIHRyKG4sdCl7dmFyIHI9bi5sZW5ndGg7aWYocilyZXR1cm4gdCs9MD50P3I6MCxSZSh0LHIpP25bdF06Rn1mdW5jdGlvbiBycihuLHQscil7dmFyIGU9LTE7cmV0dXJuIHQ9bCh0Lmxlbmd0aD90OltOdV0sUyhqZSgpKSksbj1ZdChuLGZ1bmN0aW9uKG4pe3JldHVybnthOmwodCxmdW5jdGlvbih0KXtyZXR1cm4gdChuKX0pLGI6KytlLGM6bn19KSxBKG4sZnVuY3Rpb24obix0KXt2YXIgZTtuOntlPS0xO2Zvcih2YXIgdT1uLmEsaT10LmEsbz11Lmxlbmd0aCxmPXIubGVuZ3RoOysrZTxvOyl7dmFyIGM9VXIodVtlXSxpW2VdKTtpZihjKXtlPWU+PWY/YzpjKihcImRlc2NcIj09cltlXT8tMToxKTtcbmJyZWFrIG59fWU9bi5iLXQuYn1yZXR1cm4gZX0pfWZ1bmN0aW9uIGVyKG4sdCl7cmV0dXJuIHVyKG4sdCxmdW5jdGlvbih0LHIpe3JldHVybiBCdShuLHIpfSl9ZnVuY3Rpb24gdXIobix0LHIpe2Zvcih2YXIgZT0tMSx1PXQubGVuZ3RoLGk9e307KytlPHU7KXt2YXIgbz10W2VdLGY9SXQobixvKTtyKGYsbykmJnByKGksUnIobyxuKSxmKX1yZXR1cm4gaX1mdW5jdGlvbiBpcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIEl0KHQsbil9fWZ1bmN0aW9uIG9yKG4sdCxyLGUpe3ZhciB1PWU/eTpkLGk9LTEsbz10Lmxlbmd0aCxmPW47Zm9yKG49PT10JiYodD1Ncih0KSksciYmKGY9bChuLFMocikpKTsrK2k8bzspZm9yKHZhciBjPTAsYT10W2ldLGE9cj9yKGEpOmE7LTE8KGM9dShmLGEsYyxlKSk7KWYhPT1uJiZ3aS5jYWxsKGYsYywxKSx3aS5jYWxsKG4sYywxKTtyZXR1cm4gbn1mdW5jdGlvbiBmcihuLHQpe2Zvcih2YXIgcj1uP3QubGVuZ3RoOjAsZT1yLTE7ci0tOyl7dmFyIHU9dFtyXTtcbmlmKHI9PWV8fHUhPT1pKXt2YXIgaT11O1JlKHUpP3dpLmNhbGwobix1LDEpOm1yKG4sdSl9fX1mdW5jdGlvbiBjcihuLHQpe3JldHVybiBuK3ppKEZpKCkqKHQtbisxKSl9ZnVuY3Rpb24gYXIobix0KXt2YXIgcj1cIlwiO2lmKCFufHwxPnR8fDkwMDcxOTkyNTQ3NDA5OTE8dClyZXR1cm4gcjtkbyB0JTImJihyKz1uKSwodD16aSh0LzIpKSYmKG4rPW4pO3doaWxlKHQpO3JldHVybiByfWZ1bmN0aW9uIGxyKG4sdCl7cmV0dXJuIHdvKENlKG4sdCxOdSksbitcIlwiKX1mdW5jdGlvbiBzcihuKXtyZXR1cm4gdHQoRHUobikpfWZ1bmN0aW9uIGhyKG4sdCl7dmFyIHI9RHUobik7cmV0dXJuIFRlKHIsZ3QodCwwLHIubGVuZ3RoKSl9ZnVuY3Rpb24gcHIobix0LHIsZSl7aWYoIWJ1KG4pKXJldHVybiBuO3Q9UnIodCxuKTtmb3IodmFyIHU9LTEsaT10Lmxlbmd0aCxvPWktMSxmPW47bnVsbCE9ZiYmKyt1PGk7KXt2YXIgYz0kZSh0W3VdKSxhPXI7aWYodSE9byl7dmFyIGw9ZltjXSxhPWU/ZShsLGMsZik6RjtcbmE9PT1GJiYoYT1idShsKT9sOlJlKHRbdSsxXSk/W106e30pfWF0KGYsYyxhKSxmPWZbY119cmV0dXJuIG59ZnVuY3Rpb24gX3Iobil7cmV0dXJuIFRlKER1KG4pKX1mdW5jdGlvbiB2cihuLHQscil7dmFyIGU9LTEsdT1uLmxlbmd0aDtmb3IoMD50JiYodD0tdD51PzA6dSt0KSxyPXI+dT91OnIsMD5yJiYocis9dSksdT10PnI/MDpyLXQ+Pj4wLHQ+Pj49MCxyPUh1KHUpOysrZTx1OylyW2VdPW5bZSt0XTtyZXR1cm4gcn1mdW5jdGlvbiBncihuLHQpe3ZhciByO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj10KG4sZSx1KSwhcn0pLCEhcn1mdW5jdGlvbiBkcihuLHQscil7dmFyIGU9MCx1PW51bGw9PW4/ZTpuLmxlbmd0aDtpZih0eXBlb2YgdD09XCJudW1iZXJcIiYmdD09PXQmJjIxNDc0ODM2NDc+PXUpe2Zvcig7ZTx1Oyl7dmFyIGk9ZSt1Pj4+MSxvPW5baV07bnVsbCE9PW8mJiFBdShvKSYmKHI/bzw9dDpvPHQpP2U9aSsxOnU9aX1yZXR1cm4gdX1yZXR1cm4geXIobix0LE51LHIpO1xufWZ1bmN0aW9uIHlyKG4sdCxyLGUpe3Q9cih0KTtmb3IodmFyIHU9MCxpPW51bGw9PW4/MDpuLmxlbmd0aCxvPXQhPT10LGY9bnVsbD09PXQsYz1BdSh0KSxhPXQ9PT1GO3U8aTspe3ZhciBsPXppKCh1K2kpLzIpLHM9cihuW2xdKSxoPXMhPT1GLHA9bnVsbD09PXMsXz1zPT09cyx2PUF1KHMpOyhvP2V8fF86YT9fJiYoZXx8aCk6Zj9fJiZoJiYoZXx8IXApOmM/XyYmaCYmIXAmJihlfHwhdik6cHx8dj8wOmU/czw9dDpzPHQpP3U9bCsxOmk9bH1yZXR1cm4gTWkoaSw0Mjk0OTY3Mjk0KX1mdW5jdGlvbiBicihuLHQpe2Zvcih2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXSxmPXQ/dChvKTpvO2lmKCFyfHwhaHUoZixjKSl7dmFyIGM9ZjtpW3UrK109MD09PW8/MDpvfX1yZXR1cm4gaX1mdW5jdGlvbiB4cihuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCI/bjpBdShuKT9QOitufWZ1bmN0aW9uIGpyKG4pe2lmKHR5cGVvZiBuPT1cInN0cmluZ1wiKXJldHVybiBuO1xuaWYoYWYobikpcmV0dXJuIGwobixqcikrXCJcIjtpZihBdShuKSlyZXR1cm4gdW8/dW8uY2FsbChuKTpcIlwiO3ZhciB0PW4rXCJcIjtyZXR1cm5cIjBcIj09dCYmMS9uPT0tTj9cIi0wXCI6dH1mdW5jdGlvbiB3cihuLHQscil7dmFyIGU9LTEsdT1jLGk9bi5sZW5ndGgsbz10cnVlLGY9W10sbD1mO2lmKHIpbz1mYWxzZSx1PWE7ZWxzZSBpZigyMDA8PWkpe2lmKHU9dD9udWxsOnBvKG4pKXJldHVybiBEKHUpO289ZmFsc2UsdT1SLGw9bmV3IHFufWVsc2UgbD10P1tdOmY7bjpmb3IoOysrZTxpOyl7dmFyIHM9bltlXSxoPXQ/dChzKTpzLHM9cnx8MCE9PXM/czowO2lmKG8mJmg9PT1oKXtmb3IodmFyIHA9bC5sZW5ndGg7cC0tOylpZihsW3BdPT09aCljb250aW51ZSBuO3QmJmwucHVzaChoKSxmLnB1c2gocyl9ZWxzZSB1KGwsaCxyKXx8KGwhPT1mJiZsLnB1c2goaCksZi5wdXNoKHMpKX1yZXR1cm4gZn1mdW5jdGlvbiBtcihuLHQpe3JldHVybiB0PVJyKHQsbiksbj0yPnQubGVuZ3RoP246SXQobix2cih0LDAsLTEpKSxcbm51bGw9PW58fGRlbGV0ZSBuWyRlKEdlKHQpKV19ZnVuY3Rpb24gQXIobix0LHIsZSl7Zm9yKHZhciB1PW4ubGVuZ3RoLGk9ZT91Oi0xOyhlP2ktLTorK2k8dSkmJnQobltpXSxpLG4pOyk7cmV0dXJuIHI/dnIobixlPzA6aSxlP2krMTp1KTp2cihuLGU/aSsxOjAsZT91OmkpfWZ1bmN0aW9uIGtyKG4sdCl7dmFyIHI9bjtyZXR1cm4gciBpbnN0YW5jZW9mIE1uJiYocj1yLnZhbHVlKCkpLGgodCxmdW5jdGlvbihuLHQpe3JldHVybiB0LmZ1bmMuYXBwbHkodC50aGlzQXJnLHMoW25dLHQuYXJncykpfSxyKX1mdW5jdGlvbiBFcihuLHQscil7dmFyIGU9bi5sZW5ndGg7aWYoMj5lKXJldHVybiBlP3dyKG5bMF0pOltdO2Zvcih2YXIgdT0tMSxpPUh1KGUpOysrdTxlOylmb3IodmFyIG89blt1XSxmPS0xOysrZjxlOylmIT11JiYoaVt1XT1qdChpW3VdfHxvLG5bZl0sdCxyKSk7cmV0dXJuIHdyKGt0KGksMSksdCxyKX1mdW5jdGlvbiBPcihuLHQscil7Zm9yKHZhciBlPS0xLHU9bi5sZW5ndGgsaT10Lmxlbmd0aCxvPXt9OysrZTx1OylyKG8sbltlXSxlPGk/dFtlXTpGKTtcbnJldHVybiBvfWZ1bmN0aW9uIFNyKG4pe3JldHVybiBfdShuKT9uOltdfWZ1bmN0aW9uIElyKG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP246TnV9ZnVuY3Rpb24gUnIobix0KXtyZXR1cm4gYWYobik/bjpXZShuLHQpP1tuXTptbyh6dShuKSl9ZnVuY3Rpb24genIobix0LHIpe3ZhciBlPW4ubGVuZ3RoO3JldHVybiByPXI9PT1GP2U6ciwhdCYmcj49ZT9uOnZyKG4sdCxyKX1mdW5jdGlvbiBXcihuLHQpe2lmKHQpcmV0dXJuIG4uc2xpY2UoKTt2YXIgcj1uLmxlbmd0aCxyPXlpP3lpKHIpOm5ldyBuLmNvbnN0cnVjdG9yKHIpO3JldHVybiBuLmNvcHkocikscn1mdW5jdGlvbiBCcihuKXt2YXIgdD1uZXcgbi5jb25zdHJ1Y3RvcihuLmJ5dGVMZW5ndGgpO3JldHVybiBuZXcgZGkodCkuc2V0KG5ldyBkaShuKSksdH1mdW5jdGlvbiBMcihuLHQpe3JldHVybiBuZXcgbi5jb25zdHJ1Y3Rvcih0P0JyKG4uYnVmZmVyKTpuLmJ1ZmZlcixuLmJ5dGVPZmZzZXQsbi5sZW5ndGgpfWZ1bmN0aW9uIFVyKG4sdCl7XG5pZihuIT09dCl7dmFyIHI9biE9PUYsZT1udWxsPT09bix1PW49PT1uLGk9QXUobiksbz10IT09RixmPW51bGw9PT10LGM9dD09PXQsYT1BdSh0KTtpZighZiYmIWEmJiFpJiZuPnR8fGkmJm8mJmMmJiFmJiYhYXx8ZSYmbyYmY3x8IXImJmN8fCF1KXJldHVybiAxO2lmKCFlJiYhaSYmIWEmJm48dHx8YSYmciYmdSYmIWUmJiFpfHxmJiZyJiZ1fHwhbyYmdXx8IWMpcmV0dXJuLTF9cmV0dXJuIDB9ZnVuY3Rpb24gQ3Iobix0LHIsZSl7dmFyIHU9LTEsaT1uLmxlbmd0aCxvPXIubGVuZ3RoLGY9LTEsYz10Lmxlbmd0aCxhPURpKGktbywwKSxsPUh1KGMrYSk7Zm9yKGU9IWU7KytmPGM7KWxbZl09dFtmXTtmb3IoOysrdTxvOykoZXx8dTxpKSYmKGxbclt1XV09blt1XSk7Zm9yKDthLS07KWxbZisrXT1uW3UrK107cmV0dXJuIGx9ZnVuY3Rpb24gRHIobix0LHIsZSl7dmFyIHU9LTEsaT1uLmxlbmd0aCxvPS0xLGY9ci5sZW5ndGgsYz0tMSxhPXQubGVuZ3RoLGw9RGkoaS1mLDApLHM9SHUobCthKTtcbmZvcihlPSFlOysrdTxsOylzW3VdPW5bdV07Zm9yKGw9dTsrK2M8YTspc1tsK2NdPXRbY107Zm9yKDsrK288ZjspKGV8fHU8aSkmJihzW2wrcltvXV09blt1KytdKTtyZXR1cm4gc31mdW5jdGlvbiBNcihuLHQpe3ZhciByPS0xLGU9bi5sZW5ndGg7Zm9yKHR8fCh0PUh1KGUpKTsrK3I8ZTspdFtyXT1uW3JdO3JldHVybiB0fWZ1bmN0aW9uIFRyKG4sdCxyLGUpe3ZhciB1PSFyO3J8fChyPXt9KTtmb3IodmFyIGk9LTEsbz10Lmxlbmd0aDsrK2k8bzspe3ZhciBmPXRbaV0sYz1lP2UocltmXSxuW2ZdLGYscixuKTpGO2M9PT1GJiYoYz1uW2ZdKSx1P190KHIsZixjKTphdChyLGYsYyl9cmV0dXJuIHJ9ZnVuY3Rpb24gJHIobix0KXtyZXR1cm4gVHIobix2byhuKSx0KX1mdW5jdGlvbiBGcihuLHQpe3JldHVybiBUcihuLGdvKG4pLHQpfWZ1bmN0aW9uIE5yKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsdSl7dmFyIGk9YWYocik/ZTpzdCxvPXQ/dCgpOnt9O3JldHVybiBpKHIsbixqZSh1LDIpLG8pO1xufX1mdW5jdGlvbiBQcihuKXtyZXR1cm4gbHIoZnVuY3Rpb24odCxyKXt2YXIgZT0tMSx1PXIubGVuZ3RoLGk9MTx1P3JbdS0xXTpGLG89Mjx1P3JbMl06RixpPTM8bi5sZW5ndGgmJnR5cGVvZiBpPT1cImZ1bmN0aW9uXCI/KHUtLSxpKTpGO2ZvcihvJiZ6ZShyWzBdLHJbMV0sbykmJihpPTM+dT9GOmksdT0xKSx0PW5pKHQpOysrZTx1Oykobz1yW2VdKSYmbih0LG8sZSxpKTtyZXR1cm4gdH0pfWZ1bmN0aW9uIFpyKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7aWYobnVsbD09cilyZXR1cm4gcjtpZighcHUocikpcmV0dXJuIG4ocixlKTtmb3IodmFyIHU9ci5sZW5ndGgsaT10P3U6LTEsbz1uaShyKTsodD9pLS06KytpPHUpJiZmYWxzZSE9PWUob1tpXSxpLG8pOyk7cmV0dXJuIHJ9fWZ1bmN0aW9uIHFyKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9LTEsaT1uaSh0KTtlPWUodCk7Zm9yKHZhciBvPWUubGVuZ3RoO28tLTspe3ZhciBmPWVbbj9vOisrdV07aWYoZmFsc2U9PT1yKGlbZl0sZixpKSlicmVhaztcbn1yZXR1cm4gdH19ZnVuY3Rpb24gVnIobix0LHIpe2Z1bmN0aW9uIGUoKXtyZXR1cm4odGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgZT9pOm4pLmFwcGx5KHU/cjp0aGlzLGFyZ3VtZW50cyl9dmFyIHU9MSZ0LGk9SHIobik7cmV0dXJuIGV9ZnVuY3Rpb24gS3Iobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3Q9enUodCk7dmFyIHI9Qm4udGVzdCh0KT8kKHQpOkYsZT1yP3JbMF06dC5jaGFyQXQoMCk7cmV0dXJuIHQ9cj96cihyLDEpLmpvaW4oXCJcIik6dC5zbGljZSgxKSxlW25dKCkrdH19ZnVuY3Rpb24gR3Iobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBoKCR1KFR1KHQpLnJlcGxhY2UoSW4sXCJcIikpLG4sXCJcIil9fWZ1bmN0aW9uIEhyKG4pe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cztzd2l0Y2godC5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gbmV3IG47Y2FzZSAxOnJldHVybiBuZXcgbih0WzBdKTtjYXNlIDI6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSk7Y2FzZSAzOlxucmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdKTtjYXNlIDQ6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10pO2Nhc2UgNTpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSx0WzRdKTtjYXNlIDY6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdKTtjYXNlIDc6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdLHRbNl0pfXZhciByPWlvKG4ucHJvdG90eXBlKSx0PW4uYXBwbHkocix0KTtyZXR1cm4gYnUodCk/dDpyfX1mdW5jdGlvbiBKcihuLHQsZSl7ZnVuY3Rpb24gdSgpe2Zvcih2YXIgbz1hcmd1bWVudHMubGVuZ3RoLGY9SHUobyksYz1vLGE9eGUodSk7Yy0tOylmW2NdPWFyZ3VtZW50c1tjXTtyZXR1cm4gYz0zPm8mJmZbMF0hPT1hJiZmW28tMV0hPT1hP1tdOkMoZixhKSxvLT1jLmxlbmd0aCxvPGU/ZmUobix0LFhyLHUucGxhY2Vob2xkZXIsRixmLGMsRixGLGUtbyk6cih0aGlzJiZ0aGlzIT09Wm4mJnRoaXMgaW5zdGFuY2VvZiB1P2k6bix0aGlzLGYpO1xufXZhciBpPUhyKG4pO3JldHVybiB1fWZ1bmN0aW9uIFlyKG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9bmkodCk7aWYoIXB1KHQpKXt2YXIgaT1qZShyLDMpO3Q9THUodCkscj1mdW5jdGlvbihuKXtyZXR1cm4gaSh1W25dLG4sdSl9fXJldHVybiByPW4odCxyLGUpLC0xPHI/dVtpP3Rbcl06cl06Rn19ZnVuY3Rpb24gUXIobil7cmV0dXJuIGdlKGZ1bmN0aW9uKHQpe3ZhciByPXQubGVuZ3RoLGU9cix1PXpuLnByb3RvdHlwZS50aHJ1O2ZvcihuJiZ0LnJldmVyc2UoKTtlLS07KXt2YXIgaT10W2VdO2lmKHR5cGVvZiBpIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtpZih1JiYhbyYmXCJ3cmFwcGVyXCI9PWJlKGkpKXZhciBvPW5ldyB6bihbXSx0cnVlKX1mb3IoZT1vP2U6cjsrK2U8cjspdmFyIGk9dFtlXSx1PWJlKGkpLGY9XCJ3cmFwcGVyXCI9PXU/X28oaSk6RixvPWYmJkJlKGZbMF0pJiY0MjQ9PWZbMV0mJiFmWzRdLmxlbmd0aCYmMT09Zls5XT9vW2JlKGZbMF0pXS5hcHBseShvLGZbM10pOjE9PWkubGVuZ3RoJiZCZShpKT9vW3VdKCk6by50aHJ1KGkpO1xucmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLGU9blswXTtpZihvJiYxPT1uLmxlbmd0aCYmYWYoZSkpcmV0dXJuIG8ucGxhbnQoZSkudmFsdWUoKTtmb3IodmFyIHU9MCxuPXI/dFt1XS5hcHBseSh0aGlzLG4pOmU7Kyt1PHI7KW49dFt1XS5jYWxsKHRoaXMsbik7cmV0dXJuIG59fSl9ZnVuY3Rpb24gWHIobix0LHIsZSx1LGksbyxmLGMsYSl7ZnVuY3Rpb24gbCgpe2Zvcih2YXIgZD1hcmd1bWVudHMubGVuZ3RoLHk9SHUoZCksYj1kO2ItLTspeVtiXT1hcmd1bWVudHNbYl07aWYoXyl7dmFyIHgsaj14ZShsKSxiPXkubGVuZ3RoO2Zvcih4PTA7Yi0tOyl5W2JdPT09aiYmKyt4fWlmKGUmJih5PUNyKHksZSx1LF8pKSxpJiYoeT1Ecih5LGksbyxfKSksZC09eCxfJiZkPGEpcmV0dXJuIGo9Qyh5LGopLGZlKG4sdCxYcixsLnBsYWNlaG9sZGVyLHIseSxqLGYsYyxhLWQpO2lmKGo9aD9yOnRoaXMsYj1wP2pbbl06bixkPXkubGVuZ3RoLGYpe3g9eS5sZW5ndGg7Zm9yKHZhciB3PU1pKGYubGVuZ3RoLHgpLG09TXIoeSk7dy0tOyl7XG52YXIgQT1mW3ddO3lbd109UmUoQSx4KT9tW0FdOkZ9fWVsc2UgdiYmMTxkJiZ5LnJldmVyc2UoKTtyZXR1cm4gcyYmYzxkJiYoeS5sZW5ndGg9YyksdGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgbCYmKGI9Z3x8SHIoYikpLGIuYXBwbHkoaix5KX12YXIgcz0xMjgmdCxoPTEmdCxwPTImdCxfPTI0JnQsdj01MTImdCxnPXA/RjpIcihuKTtyZXR1cm4gbH1mdW5jdGlvbiBuZShuLHQpe3JldHVybiBmdW5jdGlvbihyLGUpe3JldHVybiBDdChyLG4sdChlKSl9fWZ1bmN0aW9uIHRlKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7dmFyIHU7aWYocj09PUYmJmU9PT1GKXJldHVybiB0O2lmKHIhPT1GJiYodT1yKSxlIT09Ril7aWYodT09PUYpcmV0dXJuIGU7dHlwZW9mIHI9PVwic3RyaW5nXCJ8fHR5cGVvZiBlPT1cInN0cmluZ1wiPyhyPWpyKHIpLGU9anIoZSkpOihyPXhyKHIpLGU9eHIoZSkpLHU9bihyLGUpfXJldHVybiB1fX1mdW5jdGlvbiByZShuKXtyZXR1cm4gZ2UoZnVuY3Rpb24odCl7XG5yZXR1cm4gdD1sKHQsUyhqZSgpKSksbHIoZnVuY3Rpb24oZSl7dmFyIHU9dGhpcztyZXR1cm4gbih0LGZ1bmN0aW9uKG4pe3JldHVybiByKG4sdSxlKX0pfSl9KX1mdW5jdGlvbiBlZShuLHQpe3Q9dD09PUY/XCIgXCI6anIodCk7dmFyIHI9dC5sZW5ndGg7cmV0dXJuIDI+cj9yP2FyKHQsbik6dDoocj1hcih0LFJpKG4vVCh0KSkpLEJuLnRlc3QodCk/enIoJChyKSwwLG4pLmpvaW4oXCJcIik6ci5zbGljZSgwLG4pKX1mdW5jdGlvbiB1ZShuLHQsZSx1KXtmdW5jdGlvbiBpKCl7Zm9yKHZhciB0PS0xLGM9YXJndW1lbnRzLmxlbmd0aCxhPS0xLGw9dS5sZW5ndGgscz1IdShsK2MpLGg9dGhpcyYmdGhpcyE9PVpuJiZ0aGlzIGluc3RhbmNlb2YgaT9mOm47KythPGw7KXNbYV09dVthXTtmb3IoO2MtLTspc1thKytdPWFyZ3VtZW50c1srK3RdO3JldHVybiByKGgsbz9lOnRoaXMscyl9dmFyIG89MSZ0LGY9SHIobik7cmV0dXJuIGl9ZnVuY3Rpb24gaWUobil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXtcbmUmJnR5cGVvZiBlIT1cIm51bWJlclwiJiZ6ZSh0LHIsZSkmJihyPWU9RiksdD1FdSh0KSxyPT09Rj8ocj10LHQ9MCk6cj1FdShyKSxlPWU9PT1GP3Q8cj8xOi0xOkV1KGUpO3ZhciB1PS0xO3I9RGkoUmkoKHItdCkvKGV8fDEpKSwwKTtmb3IodmFyIGk9SHUocik7ci0tOylpW24/cjorK3VdPXQsdCs9ZTtyZXR1cm4gaX19ZnVuY3Rpb24gb2Uobil7cmV0dXJuIGZ1bmN0aW9uKHQscil7cmV0dXJuIHR5cGVvZiB0PT1cInN0cmluZ1wiJiZ0eXBlb2Ygcj09XCJzdHJpbmdcInx8KHQ9SXUodCkscj1JdShyKSksbih0LHIpfX1mdW5jdGlvbiBmZShuLHQscixlLHUsaSxvLGYsYyxhKXt2YXIgbD04JnQscz1sP286RjtvPWw/RjpvO3ZhciBoPWw/aTpGO3JldHVybiBpPWw/RjppLHQ9KHR8KGw/MzI6NjQpKSZ+KGw/NjQ6MzIpLDQmdHx8KHQmPS00KSx1PVtuLHQsdSxoLHMsaSxvLGYsYyxhXSxyPXIuYXBwbHkoRix1KSxCZShuKSYmeG8ocix1KSxyLnBsYWNlaG9sZGVyPWUsRGUocixuLHQpfWZ1bmN0aW9uIGNlKG4pe1xudmFyIHQ9WHVbbl07cmV0dXJuIGZ1bmN0aW9uKG4scil7aWYobj1JdShuKSxyPW51bGw9PXI/MDpNaShPdShyKSwyOTIpKXt2YXIgZT0oenUobikrXCJlXCIpLnNwbGl0KFwiZVwiKSxlPXQoZVswXStcImVcIisoK2VbMV0rcikpLGU9KHp1KGUpK1wiZVwiKS5zcGxpdChcImVcIik7cmV0dXJuKyhlWzBdK1wiZVwiKygrZVsxXS1yKSl9cmV0dXJuIHQobil9fWZ1bmN0aW9uIGFlKG4pe3JldHVybiBmdW5jdGlvbih0KXt2YXIgcj15byh0KTtyZXR1cm5cIltvYmplY3QgTWFwXVwiPT1yP0wodCk6XCJbb2JqZWN0IFNldF1cIj09cj9NKHQpOk8odCxuKHQpKX19ZnVuY3Rpb24gbGUobix0LHIsZSx1LGksbyxmKXt2YXIgYz0yJnQ7aWYoIWMmJnR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTt2YXIgYT1lP2UubGVuZ3RoOjA7aWYoYXx8KHQmPS05NyxlPXU9Riksbz1vPT09Rj9vOkRpKE91KG8pLDApLGY9Zj09PUY/ZjpPdShmKSxhLT11P3UubGVuZ3RoOjAsNjQmdCl7XG52YXIgbD1lLHM9dTtlPXU9Rn12YXIgaD1jP0Y6X28obik7cmV0dXJuIGk9W24sdCxyLGUsdSxsLHMsaSxvLGZdLGgmJihyPWlbMV0sbj1oWzFdLHQ9cnxuLGU9MTI4PT1uJiY4PT1yfHwxMjg9PW4mJjI1Nj09ciYmaVs3XS5sZW5ndGg8PWhbOF18fDM4ND09biYmaFs3XS5sZW5ndGg8PWhbOF0mJjg9PXIsMTMxPnR8fGUpJiYoMSZuJiYoaVsyXT1oWzJdLHR8PTEmcj8wOjQpLChyPWhbM10pJiYoZT1pWzNdLGlbM109ZT9DcihlLHIsaFs0XSk6cixpWzRdPWU/QyhpWzNdLFwiX19sb2Rhc2hfcGxhY2Vob2xkZXJfX1wiKTpoWzRdKSwocj1oWzVdKSYmKGU9aVs1XSxpWzVdPWU/RHIoZSxyLGhbNl0pOnIsaVs2XT1lP0MoaVs1XSxcIl9fbG9kYXNoX3BsYWNlaG9sZGVyX19cIik6aFs2XSksKHI9aFs3XSkmJihpWzddPXIpLDEyOCZuJiYoaVs4XT1udWxsPT1pWzhdP2hbOF06TWkoaVs4XSxoWzhdKSksbnVsbD09aVs5XSYmKGlbOV09aFs5XSksaVswXT1oWzBdLGlbMV09dCksbj1pWzBdLHQ9aVsxXSxcbnI9aVsyXSxlPWlbM10sdT1pWzRdLGY9aVs5XT1pWzldPT09Rj9jPzA6bi5sZW5ndGg6RGkoaVs5XS1hLDApLCFmJiYyNCZ0JiYodCY9LTI1KSxEZSgoaD9sbzp4bykodCYmMSE9dD84PT10fHwxNj09dD9KcihuLHQsZik6MzIhPXQmJjMzIT10fHx1Lmxlbmd0aD9Yci5hcHBseShGLGkpOnVlKG4sdCxyLGUpOlZyKG4sdCxyKSxpKSxuLHQpfWZ1bmN0aW9uIHNlKG4sdCxyLGUpe3JldHVybiBuPT09Rnx8aHUobixpaVtyXSkmJiFjaS5jYWxsKGUscik/dDpufWZ1bmN0aW9uIGhlKG4sdCxyLGUsdSxpKXtyZXR1cm4gYnUobikmJmJ1KHQpJiYoaS5zZXQodCxuKSxucihuLHQsRixoZSxpKSxpLmRlbGV0ZSh0KSksbn1mdW5jdGlvbiBwZShuKXtyZXR1cm4gd3Uobik/RjpufWZ1bmN0aW9uIF9lKG4sdCxyLGUsdSxpKXt2YXIgbz0xJnIsZj1uLmxlbmd0aCxjPXQubGVuZ3RoO2lmKGYhPWMmJiEobyYmYz5mKSlyZXR1cm4gZmFsc2U7aWYoKGM9aS5nZXQobikpJiZpLmdldCh0KSlyZXR1cm4gYz09dDt2YXIgYz0tMSxhPXRydWUsbD0yJnI/bmV3IHFuOkY7XG5mb3IoaS5zZXQobix0KSxpLnNldCh0LG4pOysrYzxmOyl7dmFyIHM9bltjXSxoPXRbY107aWYoZSl2YXIgcD1vP2UoaCxzLGMsdCxuLGkpOmUocyxoLGMsbix0LGkpO2lmKHAhPT1GKXtpZihwKWNvbnRpbnVlO2E9ZmFsc2U7YnJlYWt9aWYobCl7aWYoIV8odCxmdW5jdGlvbihuLHQpe2lmKCFSKGwsdCkmJihzPT09bnx8dShzLG4scixlLGkpKSlyZXR1cm4gbC5wdXNoKHQpfSkpe2E9ZmFsc2U7YnJlYWt9fWVsc2UgaWYocyE9PWgmJiF1KHMsaCxyLGUsaSkpe2E9ZmFsc2U7YnJlYWt9fXJldHVybiBpLmRlbGV0ZShuKSxpLmRlbGV0ZSh0KSxhfWZ1bmN0aW9uIHZlKG4sdCxyLGUsdSxpLG8pe3N3aXRjaChyKXtjYXNlXCJbb2JqZWN0IERhdGFWaWV3XVwiOmlmKG4uYnl0ZUxlbmd0aCE9dC5ieXRlTGVuZ3RofHxuLmJ5dGVPZmZzZXQhPXQuYnl0ZU9mZnNldClicmVhaztuPW4uYnVmZmVyLHQ9dC5idWZmZXI7Y2FzZVwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIjppZihuLmJ5dGVMZW5ndGghPXQuYnl0ZUxlbmd0aHx8IWkobmV3IGRpKG4pLG5ldyBkaSh0KSkpYnJlYWs7XG5yZXR1cm4gdHJ1ZTtjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybiBodSgrbiwrdCk7Y2FzZVwiW29iamVjdCBFcnJvcl1cIjpyZXR1cm4gbi5uYW1lPT10Lm5hbWUmJm4ubWVzc2FnZT09dC5tZXNzYWdlO2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVybiBuPT10K1wiXCI7Y2FzZVwiW29iamVjdCBNYXBdXCI6dmFyIGY9TDtjYXNlXCJbb2JqZWN0IFNldF1cIjppZihmfHwoZj1EKSxuLnNpemUhPXQuc2l6ZSYmISgxJmUpKWJyZWFrO3JldHVybihyPW8uZ2V0KG4pKT9yPT10OihlfD0yLG8uc2V0KG4sdCksdD1fZShmKG4pLGYodCksZSx1LGksbyksby5kZWxldGUobiksdCk7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6aWYoZW8pcmV0dXJuIGVvLmNhbGwobik9PWVvLmNhbGwodCl9cmV0dXJuIGZhbHNlfWZ1bmN0aW9uIGdlKG4pe3JldHVybiB3byhDZShuLEYsVmUpLG4rXCJcIil9ZnVuY3Rpb24gZGUobil7XG5yZXR1cm4gUnQobixMdSx2byl9ZnVuY3Rpb24geWUobil7cmV0dXJuIFJ0KG4sVXUsZ28pfWZ1bmN0aW9uIGJlKG4pe2Zvcih2YXIgdD1uLm5hbWUrXCJcIixyPUppW3RdLGU9Y2kuY2FsbChKaSx0KT9yLmxlbmd0aDowO2UtLTspe3ZhciB1PXJbZV0saT11LmZ1bmM7aWYobnVsbD09aXx8aT09bilyZXR1cm4gdS5uYW1lfXJldHVybiB0fWZ1bmN0aW9uIHhlKG4pe3JldHVybihjaS5jYWxsKE9uLFwicGxhY2Vob2xkZXJcIik/T246bikucGxhY2Vob2xkZXJ9ZnVuY3Rpb24gamUoKXt2YXIgbj1Pbi5pdGVyYXRlZXx8UHUsbj1uPT09UHU/R3Q6bjtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD9uKGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0pOm59ZnVuY3Rpb24gd2Uobix0KXt2YXIgcj1uLl9fZGF0YV9fLGU9dHlwZW9mIHQ7cmV0dXJuKFwic3RyaW5nXCI9PWV8fFwibnVtYmVyXCI9PWV8fFwic3ltYm9sXCI9PWV8fFwiYm9vbGVhblwiPT1lP1wiX19wcm90b19fXCIhPT10Om51bGw9PT10KT9yW3R5cGVvZiB0PT1cInN0cmluZ1wiP1wic3RyaW5nXCI6XCJoYXNoXCJdOnIubWFwO1xufWZ1bmN0aW9uIG1lKG4pe2Zvcih2YXIgdD1MdShuKSxyPXQubGVuZ3RoO3ItLTspe3ZhciBlPXRbcl0sdT1uW2VdO3Rbcl09W2UsdSx1PT09dSYmIWJ1KHUpXX1yZXR1cm4gdH1mdW5jdGlvbiBBZShuLHQpe3ZhciByPW51bGw9PW4/RjpuW3RdO3JldHVybiBadChyKT9yOkZ9ZnVuY3Rpb24ga2Uobix0LHIpe3Q9UnIodCxuKTtmb3IodmFyIGU9LTEsdT10Lmxlbmd0aCxpPWZhbHNlOysrZTx1Oyl7dmFyIG89JGUodFtlXSk7aWYoIShpPW51bGwhPW4mJnIobixvKSkpYnJlYWs7bj1uW29dfXJldHVybiBpfHwrK2UhPXU/aToodT1udWxsPT1uPzA6bi5sZW5ndGgsISF1JiZ5dSh1KSYmUmUobyx1KSYmKGFmKG4pfHxjZihuKSkpfWZ1bmN0aW9uIEVlKG4pe3ZhciB0PW4ubGVuZ3RoLHI9bi5jb25zdHJ1Y3Rvcih0KTtyZXR1cm4gdCYmXCJzdHJpbmdcIj09dHlwZW9mIG5bMF0mJmNpLmNhbGwobixcImluZGV4XCIpJiYoci5pbmRleD1uLmluZGV4LHIuaW5wdXQ9bi5pbnB1dCkscn1mdW5jdGlvbiBPZShuKXtcbnJldHVybiB0eXBlb2Ygbi5jb25zdHJ1Y3RvciE9XCJmdW5jdGlvblwifHxMZShuKT97fTppbyhiaShuKSl9ZnVuY3Rpb24gU2UocixlLHUsaSl7dmFyIG89ci5jb25zdHJ1Y3Rvcjtzd2l0Y2goZSl7Y2FzZVwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIjpyZXR1cm4gQnIocik7Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOmNhc2VcIltvYmplY3QgRGF0ZV1cIjpyZXR1cm4gbmV3IG8oK3IpO2Nhc2VcIltvYmplY3QgRGF0YVZpZXddXCI6cmV0dXJuIGU9aT9CcihyLmJ1ZmZlcik6ci5idWZmZXIsbmV3IHIuY29uc3RydWN0b3IoZSxyLmJ5dGVPZmZzZXQsci5ieXRlTGVuZ3RoKTtjYXNlXCJbb2JqZWN0IEZsb2F0MzJBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEludDhBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEludDE2QXJyYXldXCI6Y2FzZVwiW29iamVjdCBJbnQzMkFycmF5XVwiOmNhc2VcIltvYmplY3QgVWludDhBcnJheV1cIjpjYXNlXCJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XVwiOlxuY2FzZVwiW29iamVjdCBVaW50MTZBcnJheV1cIjpjYXNlXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiOnJldHVybiBMcihyLGkpO2Nhc2VcIltvYmplY3QgTWFwXVwiOnJldHVybiBlPWk/dShMKHIpLDEpOkwociksaChlLG4sbmV3IHIuY29uc3RydWN0b3IpO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVybiBuZXcgbyhyKTtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpyZXR1cm4gZT1uZXcgci5jb25zdHJ1Y3RvcihyLnNvdXJjZSxkbi5leGVjKHIpKSxlLmxhc3RJbmRleD1yLmxhc3RJbmRleCxlO2Nhc2VcIltvYmplY3QgU2V0XVwiOnJldHVybiBlPWk/dShEKHIpLDEpOkQociksaChlLHQsbmV3IHIuY29uc3RydWN0b3IpO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBlbz9uaShlby5jYWxsKHIpKTp7fX19ZnVuY3Rpb24gSWUobil7cmV0dXJuIGFmKG4pfHxjZihuKXx8ISEobWkmJm4mJm5bbWldKX1mdW5jdGlvbiBSZShuLHQpe3JldHVybiB0PW51bGw9PXQ/OTAwNzE5OTI1NDc0MDk5MTp0LFxuISF0JiYodHlwZW9mIG49PVwibnVtYmVyXCJ8fHduLnRlc3QobikpJiYtMTxuJiYwPT1uJTEmJm48dH1mdW5jdGlvbiB6ZShuLHQscil7aWYoIWJ1KHIpKXJldHVybiBmYWxzZTt2YXIgZT10eXBlb2YgdDtyZXR1cm4hIShcIm51bWJlclwiPT1lP3B1KHIpJiZSZSh0LHIubGVuZ3RoKTpcInN0cmluZ1wiPT1lJiZ0IGluIHIpJiZodShyW3RdLG4pfWZ1bmN0aW9uIFdlKG4sdCl7aWYoYWYobikpcmV0dXJuIGZhbHNlO3ZhciByPXR5cGVvZiBuO3JldHVybiEoXCJudW1iZXJcIiE9ciYmXCJzeW1ib2xcIiE9ciYmXCJib29sZWFuXCIhPXImJm51bGwhPW4mJiFBdShuKSl8fChybi50ZXN0KG4pfHwhdG4udGVzdChuKXx8bnVsbCE9dCYmbiBpbiBuaSh0KSl9ZnVuY3Rpb24gQmUobil7dmFyIHQ9YmUobikscj1Pblt0XTtyZXR1cm4gdHlwZW9mIHI9PVwiZnVuY3Rpb25cIiYmdCBpbiBNbi5wcm90b3R5cGUmJihuPT09cnx8KHQ9X28ociksISF0JiZuPT09dFswXSkpfWZ1bmN0aW9uIExlKG4pe3ZhciB0PW4mJm4uY29uc3RydWN0b3I7XG5yZXR1cm4gbj09PSh0eXBlb2YgdD09XCJmdW5jdGlvblwiJiZ0LnByb3RvdHlwZXx8aWkpfWZ1bmN0aW9uIFVlKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBudWxsIT1yJiYocltuXT09PXQmJih0IT09Rnx8biBpbiBuaShyKSkpfX1mdW5jdGlvbiBDZShuLHQsZSl7cmV0dXJuIHQ9RGkodD09PUY/bi5sZW5ndGgtMTp0LDApLGZ1bmN0aW9uKCl7Zm9yKHZhciB1PWFyZ3VtZW50cyxpPS0xLG89RGkodS5sZW5ndGgtdCwwKSxmPUh1KG8pOysraTxvOylmW2ldPXVbdCtpXTtmb3IoaT0tMSxvPUh1KHQrMSk7KytpPHQ7KW9baV09dVtpXTtyZXR1cm4gb1t0XT1lKGYpLHIobix0aGlzLG8pfX1mdW5jdGlvbiBEZShuLHQscil7dmFyIGU9dCtcIlwiO3Q9d287dmFyIHUsaT1OZTtyZXR1cm4gdT0odT1lLm1hdGNoKGhuKSk/dVsxXS5zcGxpdChwbik6W10scj1pKHUsciksKGk9ci5sZW5ndGgpJiYodT1pLTEsclt1XT0oMTxpP1wiJiBcIjpcIlwiKStyW3VdLHI9ci5qb2luKDI8aT9cIiwgXCI6XCIgXCIpLFxuZT1lLnJlcGxhY2Uoc24sXCJ7XFxuLyogW3dyYXBwZWQgd2l0aCBcIityK1wiXSAqL1xcblwiKSksdChuLGUpfWZ1bmN0aW9uIE1lKG4pe3ZhciB0PTAscj0wO3JldHVybiBmdW5jdGlvbigpe3ZhciBlPVRpKCksdT0xNi0oZS1yKTtpZihyPWUsMDx1KXtpZig4MDA8PSsrdClyZXR1cm4gYXJndW1lbnRzWzBdfWVsc2UgdD0wO3JldHVybiBuLmFwcGx5KEYsYXJndW1lbnRzKX19ZnVuY3Rpb24gVGUobix0KXt2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9ZS0xO2Zvcih0PXQ9PT1GP2U6dDsrK3I8dDspe3ZhciBlPWNyKHIsdSksaT1uW2VdO25bZV09bltyXSxuW3JdPWl9cmV0dXJuIG4ubGVuZ3RoPXQsbn1mdW5jdGlvbiAkZShuKXtpZih0eXBlb2Ygbj09XCJzdHJpbmdcInx8QXUobikpcmV0dXJuIG47dmFyIHQ9bitcIlwiO3JldHVyblwiMFwiPT10JiYxL249PS1OP1wiLTBcIjp0fWZ1bmN0aW9uIEZlKG4pe2lmKG51bGwhPW4pe3RyeXtyZXR1cm4gZmkuY2FsbChuKX1jYXRjaChuKXt9cmV0dXJuIG4rXCJcIn1yZXR1cm5cIlwiO1xufWZ1bmN0aW9uIE5lKG4sdCl7cmV0dXJuIHUoWixmdW5jdGlvbihyKXt2YXIgZT1cIl8uXCIrclswXTt0JnJbMV0mJiFjKG4sZSkmJm4ucHVzaChlKX0pLG4uc29ydCgpfWZ1bmN0aW9uIFBlKG4pe2lmKG4gaW5zdGFuY2VvZiBNbilyZXR1cm4gbi5jbG9uZSgpO3ZhciB0PW5ldyB6bihuLl9fd3JhcHBlZF9fLG4uX19jaGFpbl9fKTtyZXR1cm4gdC5fX2FjdGlvbnNfXz1NcihuLl9fYWN0aW9uc19fKSx0Ll9faW5kZXhfXz1uLl9faW5kZXhfXyx0Ll9fdmFsdWVzX189bi5fX3ZhbHVlc19fLHR9ZnVuY3Rpb24gWmUobix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8ocj1udWxsPT1yPzA6T3UociksMD5yJiYocj1EaShlK3IsMCkpLGcobixqZSh0LDMpLHIpKTotMX1mdW5jdGlvbiBxZShuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCFlKXJldHVybi0xO3ZhciB1PWUtMTtyZXR1cm4gciE9PUYmJih1PU91KHIpLHU9MD5yP0RpKGUrdSwwKTpNaSh1LGUtMSkpLFxuZyhuLGplKHQsMyksdSx0cnVlKX1mdW5jdGlvbiBWZShuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9rdChuLDEpOltdfWZ1bmN0aW9uIEtlKG4pe3JldHVybiBuJiZuLmxlbmd0aD9uWzBdOkZ9ZnVuY3Rpb24gR2Uobil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P25bdC0xXTpGfWZ1bmN0aW9uIEhlKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoJiZ0JiZ0Lmxlbmd0aD9vcihuLHQpOm59ZnVuY3Rpb24gSmUobil7cmV0dXJuIG51bGw9PW4/bjpOaS5jYWxsKG4pfWZ1bmN0aW9uIFllKG4pe2lmKCFufHwhbi5sZW5ndGgpcmV0dXJuW107dmFyIHQ9MDtyZXR1cm4gbj1mKG4sZnVuY3Rpb24obil7aWYoX3UobikpcmV0dXJuIHQ9RGkobi5sZW5ndGgsdCksdHJ1ZX0pLEUodCxmdW5jdGlvbih0KXtyZXR1cm4gbChuLGoodCkpfSl9ZnVuY3Rpb24gUWUobix0KXtpZighbnx8IW4ubGVuZ3RoKXJldHVybltdO3ZhciBlPVllKG4pO3JldHVybiBudWxsPT10P2U6bChlLGZ1bmN0aW9uKG4pe1xucmV0dXJuIHIodCxGLG4pfSl9ZnVuY3Rpb24gWGUobil7cmV0dXJuIG49T24obiksbi5fX2NoYWluX189dHJ1ZSxufWZ1bmN0aW9uIG51KG4sdCl7cmV0dXJuIHQobil9ZnVuY3Rpb24gdHUoKXtyZXR1cm4gdGhpc31mdW5jdGlvbiBydShuLHQpe3JldHVybihhZihuKT91Om9vKShuLGplKHQsMykpfWZ1bmN0aW9uIGV1KG4sdCl7cmV0dXJuKGFmKG4pP2k6Zm8pKG4samUodCwzKSl9ZnVuY3Rpb24gdXUobix0KXtyZXR1cm4oYWYobik/bDpZdCkobixqZSh0LDMpKX1mdW5jdGlvbiBpdShuLHQscil7cmV0dXJuIHQ9cj9GOnQsdD1uJiZudWxsPT10P24ubGVuZ3RoOnQsbGUobiwxMjgsRixGLEYsRix0KX1mdW5jdGlvbiBvdShuLHQpe3ZhciByO2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gbj1PdShuKSxmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHI9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLDE+PW4mJih0PUYpLFxucn19ZnVuY3Rpb24gZnUobix0LHIpe3JldHVybiB0PXI/Rjp0LG49bGUobiw4LEYsRixGLEYsRix0KSxuLnBsYWNlaG9sZGVyPWZ1LnBsYWNlaG9sZGVyLG59ZnVuY3Rpb24gY3Uobix0LHIpe3JldHVybiB0PXI/Rjp0LG49bGUobiwxNixGLEYsRixGLEYsdCksbi5wbGFjZWhvbGRlcj1jdS5wbGFjZWhvbGRlcixufWZ1bmN0aW9uIGF1KG4sdCxyKXtmdW5jdGlvbiBlKHQpe3ZhciByPWMsZT1hO3JldHVybiBjPWE9RixfPXQscz1uLmFwcGx5KGUscil9ZnVuY3Rpb24gdShuKXt2YXIgcj1uLXA7cmV0dXJuIG4tPV8scD09PUZ8fHI+PXR8fDA+cnx8ZyYmbj49bH1mdW5jdGlvbiBpKCl7dmFyIG49Sm8oKTtpZih1KG4pKXJldHVybiBvKG4pO3ZhciByLGU9am87cj1uLV8sbj10LShuLXApLHI9Zz9NaShuLGwtcik6bixoPWUoaSxyKX1mdW5jdGlvbiBvKG4pe3JldHVybiBoPUYsZCYmYz9lKG4pOihjPWE9RixzKX1mdW5jdGlvbiBmKCl7dmFyIG49Sm8oKSxyPXUobik7aWYoYz1hcmd1bWVudHMsXG5hPXRoaXMscD1uLHIpe2lmKGg9PT1GKXJldHVybiBfPW49cCxoPWpvKGksdCksdj9lKG4pOnM7aWYoZylyZXR1cm4gaD1qbyhpLHQpLGUocCl9cmV0dXJuIGg9PT1GJiYoaD1qbyhpLHQpKSxzfXZhciBjLGEsbCxzLGgscCxfPTAsdj1mYWxzZSxnPWZhbHNlLGQ9dHJ1ZTtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9SXUodCl8fDAsYnUocikmJih2PSEhci5sZWFkaW5nLGw9KGc9XCJtYXhXYWl0XCJpbiByKT9EaShJdShyLm1heFdhaXQpfHwwLHQpOmwsZD1cInRyYWlsaW5nXCJpbiByPyEhci50cmFpbGluZzpkKSxmLmNhbmNlbD1mdW5jdGlvbigpe2ghPT1GJiZobyhoKSxfPTAsYz1wPWE9aD1GfSxmLmZsdXNoPWZ1bmN0aW9uKCl7cmV0dXJuIGg9PT1GP3M6byhKbygpKX0sZn1mdW5jdGlvbiBsdShuLHQpe2Z1bmN0aW9uIHIoKXt2YXIgZT1hcmd1bWVudHMsdT10P3QuYXBwbHkodGhpcyxlKTplWzBdLGk9ci5jYWNoZTtyZXR1cm4gaS5oYXModSk/aS5nZXQodSk6KGU9bi5hcHBseSh0aGlzLGUpLFxuci5jYWNoZT1pLnNldCh1LGUpfHxpLGUpfWlmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCJ8fG51bGwhPXQmJnR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gci5jYWNoZT1uZXcobHUuQ2FjaGV8fFBuKSxyfWZ1bmN0aW9uIHN1KG4pe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHM7c3dpdGNoKHQubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIW4uY2FsbCh0aGlzKTtjYXNlIDE6cmV0dXJuIW4uY2FsbCh0aGlzLHRbMF0pO2Nhc2UgMjpyZXR1cm4hbi5jYWxsKHRoaXMsdFswXSx0WzFdKTtjYXNlIDM6cmV0dXJuIW4uY2FsbCh0aGlzLHRbMF0sdFsxXSx0WzJdKX1yZXR1cm4hbi5hcHBseSh0aGlzLHQpfX1mdW5jdGlvbiBodShuLHQpe3JldHVybiBuPT09dHx8biE9PW4mJnQhPT10fWZ1bmN0aW9uIHB1KG4pe3JldHVybiBudWxsIT1uJiZ5dShuLmxlbmd0aCkmJiFndShuKTtcbn1mdW5jdGlvbiBfdShuKXtyZXR1cm4geHUobikmJnB1KG4pfWZ1bmN0aW9uIHZ1KG4pe2lmKCF4dShuKSlyZXR1cm4gZmFsc2U7dmFyIHQ9enQobik7cmV0dXJuXCJbb2JqZWN0IEVycm9yXVwiPT10fHxcIltvYmplY3QgRE9NRXhjZXB0aW9uXVwiPT10fHx0eXBlb2Ygbi5tZXNzYWdlPT1cInN0cmluZ1wiJiZ0eXBlb2Ygbi5uYW1lPT1cInN0cmluZ1wiJiYhd3Uobil9ZnVuY3Rpb24gZ3Uobil7cmV0dXJuISFidShuKSYmKG49enQobiksXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBBc3luY0Z1bmN0aW9uXVwiPT1ufHxcIltvYmplY3QgUHJveHldXCI9PW4pfWZ1bmN0aW9uIGR1KG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcIiYmbj09T3Uobil9ZnVuY3Rpb24geXUobil7cmV0dXJuIHR5cGVvZiBuPT1cIm51bWJlclwiJiYtMTxuJiYwPT1uJTEmJjkwMDcxOTkyNTQ3NDA5OTE+PW59ZnVuY3Rpb24gYnUobil7dmFyIHQ9dHlwZW9mIG47cmV0dXJuIG51bGwhPW4mJihcIm9iamVjdFwiPT10fHxcImZ1bmN0aW9uXCI9PXQpO1xufWZ1bmN0aW9uIHh1KG4pe3JldHVybiBudWxsIT1uJiZ0eXBlb2Ygbj09XCJvYmplY3RcIn1mdW5jdGlvbiBqdShuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCJ8fHh1KG4pJiZcIltvYmplY3QgTnVtYmVyXVwiPT16dChuKX1mdW5jdGlvbiB3dShuKXtyZXR1cm4hKCF4dShuKXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9enQobikpJiYobj1iaShuKSxudWxsPT09bnx8KG49Y2kuY2FsbChuLFwiY29uc3RydWN0b3JcIikmJm4uY29uc3RydWN0b3IsdHlwZW9mIG49PVwiZnVuY3Rpb25cIiYmbiBpbnN0YW5jZW9mIG4mJmZpLmNhbGwobik9PWhpKSl9ZnVuY3Rpb24gbXUobil7cmV0dXJuIHR5cGVvZiBuPT1cInN0cmluZ1wifHwhYWYobikmJnh1KG4pJiZcIltvYmplY3QgU3RyaW5nXVwiPT16dChuKX1mdW5jdGlvbiBBdShuKXtyZXR1cm4gdHlwZW9mIG49PVwic3ltYm9sXCJ8fHh1KG4pJiZcIltvYmplY3QgU3ltYm9sXVwiPT16dChuKX1mdW5jdGlvbiBrdShuKXtpZighbilyZXR1cm5bXTtpZihwdShuKSlyZXR1cm4gbXUobik/JChuKTpNcihuKTtcbmlmKEFpJiZuW0FpXSl7bj1uW0FpXSgpO2Zvcih2YXIgdCxyPVtdOyEodD1uLm5leHQoKSkuZG9uZTspci5wdXNoKHQudmFsdWUpO3JldHVybiByfXJldHVybiB0PXlvKG4pLChcIltvYmplY3QgTWFwXVwiPT10P0w6XCJbb2JqZWN0IFNldF1cIj09dD9EOkR1KShuKX1mdW5jdGlvbiBFdShuKXtyZXR1cm4gbj8obj1JdShuKSxuPT09Tnx8bj09PS1OPzEuNzk3NjkzMTM0ODYyMzE1N2UzMDgqKDA+bj8tMToxKTpuPT09bj9uOjApOjA9PT1uP246MH1mdW5jdGlvbiBPdShuKXtuPUV1KG4pO3ZhciB0PW4lMTtyZXR1cm4gbj09PW4/dD9uLXQ6bjowfWZ1bmN0aW9uIFN1KG4pe3JldHVybiBuP2d0KE91KG4pLDAsNDI5NDk2NzI5NSk6MH1mdW5jdGlvbiBJdShuKXtpZih0eXBlb2Ygbj09XCJudW1iZXJcIilyZXR1cm4gbjtpZihBdShuKSlyZXR1cm4gUDtpZihidShuKSYmKG49dHlwZW9mIG4udmFsdWVPZj09XCJmdW5jdGlvblwiP24udmFsdWVPZigpOm4sbj1idShuKT9uK1wiXCI6biksdHlwZW9mIG4hPVwic3RyaW5nXCIpcmV0dXJuIDA9PT1uP246K247XG5uPW4ucmVwbGFjZShjbixcIlwiKTt2YXIgdD1ibi50ZXN0KG4pO3JldHVybiB0fHxqbi50ZXN0KG4pP0ZuKG4uc2xpY2UoMiksdD8yOjgpOnluLnRlc3Qobik/UDorbn1mdW5jdGlvbiBSdShuKXtyZXR1cm4gVHIobixVdShuKSl9ZnVuY3Rpb24genUobil7cmV0dXJuIG51bGw9PW4/XCJcIjpqcihuKX1mdW5jdGlvbiBXdShuLHQscil7cmV0dXJuIG49bnVsbD09bj9GOkl0KG4sdCksbj09PUY/cjpufWZ1bmN0aW9uIEJ1KG4sdCl7cmV0dXJuIG51bGwhPW4mJmtlKG4sdCxMdCl9ZnVuY3Rpb24gTHUobil7cmV0dXJuIHB1KG4pP0duKG4pOkh0KG4pfWZ1bmN0aW9uIFV1KG4pe2lmKHB1KG4pKW49R24obix0cnVlKTtlbHNlIGlmKGJ1KG4pKXt2YXIgdCxyPUxlKG4pLGU9W107Zm9yKHQgaW4gbikoXCJjb25zdHJ1Y3RvclwiIT10fHwhciYmY2kuY2FsbChuLHQpKSYmZS5wdXNoKHQpO249ZX1lbHNle2lmKHQ9W10sbnVsbCE9bilmb3IociBpbiBuaShuKSl0LnB1c2gocik7bj10fXJldHVybiBufWZ1bmN0aW9uIEN1KG4sdCl7XG5pZihudWxsPT1uKXJldHVybnt9O3ZhciByPWwoeWUobiksZnVuY3Rpb24obil7cmV0dXJuW25dfSk7cmV0dXJuIHQ9amUodCksdXIobixyLGZ1bmN0aW9uKG4scil7cmV0dXJuIHQobixyWzBdKX0pfWZ1bmN0aW9uIER1KG4pe3JldHVybiBudWxsPT1uP1tdOkkobixMdShuKSl9ZnVuY3Rpb24gTXUobil7cmV0dXJuIE5mKHp1KG4pLnRvTG93ZXJDYXNlKCkpfWZ1bmN0aW9uIFR1KG4pe3JldHVybihuPXp1KG4pKSYmbi5yZXBsYWNlKG1uLHJ0KS5yZXBsYWNlKFJuLFwiXCIpfWZ1bmN0aW9uICR1KG4sdCxyKXtyZXR1cm4gbj16dShuKSx0PXI/Rjp0LHQ9PT1GP0xuLnRlc3Qobik/bi5tYXRjaChXbil8fFtdOm4ubWF0Y2goX24pfHxbXTpuLm1hdGNoKHQpfHxbXX1mdW5jdGlvbiBGdShuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19ZnVuY3Rpb24gTnUobil7cmV0dXJuIG59ZnVuY3Rpb24gUHUobil7cmV0dXJuIEd0KHR5cGVvZiBuPT1cImZ1bmN0aW9uXCI/bjpkdChuLDEpKX1mdW5jdGlvbiBadShuLHQscil7XG52YXIgZT1MdSh0KSxpPVN0KHQsZSk7bnVsbCE9cnx8YnUodCkmJihpLmxlbmd0aHx8IWUubGVuZ3RoKXx8KHI9dCx0PW4sbj10aGlzLGk9U3QodCxMdSh0KSkpO3ZhciBvPSEoYnUocikmJlwiY2hhaW5cImluIHImJiFyLmNoYWluKSxmPWd1KG4pO3JldHVybiB1KGksZnVuY3Rpb24ocil7dmFyIGU9dFtyXTtuW3JdPWUsZiYmKG4ucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2NoYWluX187aWYob3x8dCl7dmFyIHI9bih0aGlzLl9fd3JhcHBlZF9fKTtyZXR1cm4oci5fX2FjdGlvbnNfXz1Ncih0aGlzLl9fYWN0aW9uc19fKSkucHVzaCh7ZnVuYzplLGFyZ3M6YXJndW1lbnRzLHRoaXNBcmc6bn0pLHIuX19jaGFpbl9fPXQscn1yZXR1cm4gZS5hcHBseShuLHMoW3RoaXMudmFsdWUoKV0sYXJndW1lbnRzKSl9KX0pLG59ZnVuY3Rpb24gcXUoKXt9ZnVuY3Rpb24gVnUobil7cmV0dXJuIFdlKG4pP2ooJGUobikpOmlyKG4pfWZ1bmN0aW9uIEt1KCl7cmV0dXJuW119ZnVuY3Rpb24gR3UoKXtcbnJldHVybiBmYWxzZX1Fbj1udWxsPT1Fbj9abjppdC5kZWZhdWx0cyhabi5PYmplY3QoKSxFbixpdC5waWNrKFpuLFVuKSk7dmFyIEh1PUVuLkFycmF5LEp1PUVuLkRhdGUsWXU9RW4uRXJyb3IsUXU9RW4uRnVuY3Rpb24sWHU9RW4uTWF0aCxuaT1Fbi5PYmplY3QsdGk9RW4uUmVnRXhwLHJpPUVuLlN0cmluZyxlaT1Fbi5UeXBlRXJyb3IsdWk9SHUucHJvdG90eXBlLGlpPW5pLnByb3RvdHlwZSxvaT1FbltcIl9fY29yZS1qc19zaGFyZWRfX1wiXSxmaT1RdS5wcm90b3R5cGUudG9TdHJpbmcsY2k9aWkuaGFzT3duUHJvcGVydHksYWk9MCxsaT1mdW5jdGlvbigpe3ZhciBuPS9bXi5dKyQvLmV4ZWMob2kmJm9pLmtleXMmJm9pLmtleXMuSUVfUFJPVE98fFwiXCIpO3JldHVybiBuP1wiU3ltYm9sKHNyYylfMS5cIituOlwiXCJ9KCksc2k9aWkudG9TdHJpbmcsaGk9ZmkuY2FsbChuaSkscGk9Wm4uXyxfaT10aShcIl5cIitmaS5jYWxsKGNpKS5yZXBsYWNlKG9uLFwiXFxcXCQmXCIpLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csXCIkMS4qP1wiKStcIiRcIiksdmk9S24/RW4uQnVmZmVyOkYsZ2k9RW4uU3ltYm9sLGRpPUVuLlVpbnQ4QXJyYXkseWk9dmk/dmkuZjpGLGJpPVUobmkuZ2V0UHJvdG90eXBlT2YsbmkpLHhpPW5pLmNyZWF0ZSxqaT1paS5wcm9wZXJ0eUlzRW51bWVyYWJsZSx3aT11aS5zcGxpY2UsbWk9Z2k/Z2kuaXNDb25jYXRTcHJlYWRhYmxlOkYsQWk9Z2k/Z2kuaXRlcmF0b3I6RixraT1naT9naS50b1N0cmluZ1RhZzpGLEVpPWZ1bmN0aW9uKCl7XG50cnl7dmFyIG49QWUobmksXCJkZWZpbmVQcm9wZXJ0eVwiKTtyZXR1cm4gbih7fSxcIlwiLHt9KSxufWNhdGNoKG4pe319KCksT2k9RW4uY2xlYXJUaW1lb3V0IT09Wm4uY2xlYXJUaW1lb3V0JiZFbi5jbGVhclRpbWVvdXQsU2k9SnUmJkp1Lm5vdyE9PVpuLkRhdGUubm93JiZKdS5ub3csSWk9RW4uc2V0VGltZW91dCE9PVpuLnNldFRpbWVvdXQmJkVuLnNldFRpbWVvdXQsUmk9WHUuY2VpbCx6aT1YdS5mbG9vcixXaT1uaS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsQmk9dmk/dmkuaXNCdWZmZXI6RixMaT1Fbi5pc0Zpbml0ZSxVaT11aS5qb2luLENpPVUobmkua2V5cyxuaSksRGk9WHUubWF4LE1pPVh1Lm1pbixUaT1KdS5ub3csJGk9RW4ucGFyc2VJbnQsRmk9WHUucmFuZG9tLE5pPXVpLnJldmVyc2UsUGk9QWUoRW4sXCJEYXRhVmlld1wiKSxaaT1BZShFbixcIk1hcFwiKSxxaT1BZShFbixcIlByb21pc2VcIiksVmk9QWUoRW4sXCJTZXRcIiksS2k9QWUoRW4sXCJXZWFrTWFwXCIpLEdpPUFlKG5pLFwiY3JlYXRlXCIpLEhpPUtpJiZuZXcgS2ksSmk9e30sWWk9RmUoUGkpLFFpPUZlKFppKSxYaT1GZShxaSksbm89RmUoVmkpLHRvPUZlKEtpKSxybz1naT9naS5wcm90b3R5cGU6Rixlbz1ybz9yby52YWx1ZU9mOkYsdW89cm8/cm8udG9TdHJpbmc6Rixpbz1mdW5jdGlvbigpe1xuZnVuY3Rpb24gbigpe31yZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGJ1KHQpP3hpP3hpKHQpOihuLnByb3RvdHlwZT10LHQ9bmV3IG4sbi5wcm90b3R5cGU9Rix0KTp7fX19KCk7T24udGVtcGxhdGVTZXR0aW5ncz17ZXNjYXBlOlEsZXZhbHVhdGU6WCxpbnRlcnBvbGF0ZTpubix2YXJpYWJsZTpcIlwiLGltcG9ydHM6e186T259fSxPbi5wcm90b3R5cGU9U24ucHJvdG90eXBlLE9uLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Pbix6bi5wcm90b3R5cGU9aW8oU24ucHJvdG90eXBlKSx6bi5wcm90b3R5cGUuY29uc3RydWN0b3I9em4sTW4ucHJvdG90eXBlPWlvKFNuLnByb3RvdHlwZSksTW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1uLFRuLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189R2k/R2kobnVsbCk6e30sdGhpcy5zaXplPTB9LFRuLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7cmV0dXJuIG49dGhpcy5oYXMobikmJmRlbGV0ZSB0aGlzLl9fZGF0YV9fW25dLFxudGhpcy5zaXplLT1uPzE6MCxufSxUbi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIEdpPyhuPXRbbl0sXCJfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fXCI9PT1uP0Y6bik6Y2kuY2FsbCh0LG4pP3Rbbl06Rn0sVG4ucHJvdG90eXBlLmhhcz1mdW5jdGlvbihuKXt2YXIgdD10aGlzLl9fZGF0YV9fO3JldHVybiBHaT90W25dIT09RjpjaS5jYWxsKHQsbil9LFRuLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24obix0KXt2YXIgcj10aGlzLl9fZGF0YV9fO3JldHVybiB0aGlzLnNpemUrPXRoaXMuaGFzKG4pPzA6MSxyW25dPUdpJiZ0PT09Rj9cIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIjp0LHRoaXN9LE5uLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189W10sdGhpcy5zaXplPTB9LE5uLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gbj1sdCh0LG4pLCEoMD5uKSYmKG49PXQubGVuZ3RoLTE/dC5wb3AoKTp3aS5jYWxsKHQsbiwxKSxcbi0tdGhpcy5zaXplLHRydWUpfSxObi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIG49bHQodCxuKSwwPm4/Rjp0W25dWzFdfSxObi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3JldHVybi0xPGx0KHRoaXMuX19kYXRhX18sbil9LE5uLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24obix0KXt2YXIgcj10aGlzLl9fZGF0YV9fLGU9bHQocixuKTtyZXR1cm4gMD5lPygrK3RoaXMuc2l6ZSxyLnB1c2goW24sdF0pKTpyW2VdWzFdPXQsdGhpc30sUG4ucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5zaXplPTAsdGhpcy5fX2RhdGFfXz17aGFzaDpuZXcgVG4sbWFwOm5ldyhaaXx8Tm4pLHN0cmluZzpuZXcgVG59fSxQbi5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKG4pe3JldHVybiBuPXdlKHRoaXMsbikuZGVsZXRlKG4pLHRoaXMuc2l6ZS09bj8xOjAsbn0sUG4ucHJvdG90eXBlLmdldD1mdW5jdGlvbihuKXtyZXR1cm4gd2UodGhpcyxuKS5nZXQobik7XG59LFBuLnByb3RvdHlwZS5oYXM9ZnVuY3Rpb24obil7cmV0dXJuIHdlKHRoaXMsbikuaGFzKG4pfSxQbi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKG4sdCl7dmFyIHI9d2UodGhpcyxuKSxlPXIuc2l6ZTtyZXR1cm4gci5zZXQobix0KSx0aGlzLnNpemUrPXIuc2l6ZT09ZT8wOjEsdGhpc30scW4ucHJvdG90eXBlLmFkZD1xbi5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5zZXQobixcIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIiksdGhpc30scW4ucHJvdG90eXBlLmhhcz1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMobil9LFZuLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX19kYXRhX189bmV3IE5uLHRoaXMuc2l6ZT0wfSxWbi5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIG49dC5kZWxldGUobiksdGhpcy5zaXplPXQuc2l6ZSxufSxWbi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe1xucmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KG4pfSxWbi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhuKX0sVm4ucHJvdG90eXBlLnNldD1mdW5jdGlvbihuLHQpe3ZhciByPXRoaXMuX19kYXRhX187aWYociBpbnN0YW5jZW9mIE5uKXt2YXIgZT1yLl9fZGF0YV9fO2lmKCFaaXx8MTk5PmUubGVuZ3RoKXJldHVybiBlLnB1c2goW24sdF0pLHRoaXMuc2l6ZT0rK3Iuc2l6ZSx0aGlzO3I9dGhpcy5fX2RhdGFfXz1uZXcgUG4oZSl9cmV0dXJuIHIuc2V0KG4sdCksdGhpcy5zaXplPXIuc2l6ZSx0aGlzfTt2YXIgb289WnIoRXQpLGZvPVpyKE90LHRydWUpLGNvPXFyKCksYW89cXIodHJ1ZSksbG89SGk/ZnVuY3Rpb24obix0KXtyZXR1cm4gSGkuc2V0KG4sdCksbn06TnUsc289RWk/ZnVuY3Rpb24obix0KXtyZXR1cm4gRWkobixcInRvU3RyaW5nXCIse2NvbmZpZ3VyYWJsZTp0cnVlLGVudW1lcmFibGU6ZmFsc2UsdmFsdWU6RnUodCksd3JpdGFibGU6dHJ1ZX0pfTpOdSxobz1PaXx8ZnVuY3Rpb24obil7XG5yZXR1cm4gWm4uY2xlYXJUaW1lb3V0KG4pfSxwbz1WaSYmMS9EKG5ldyBWaShbLC0wXSkpWzFdPT1OP2Z1bmN0aW9uKG4pe3JldHVybiBuZXcgVmkobil9OnF1LF9vPUhpP2Z1bmN0aW9uKG4pe3JldHVybiBIaS5nZXQobil9OnF1LHZvPVdpP2Z1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1tdOihuPW5pKG4pLGYoV2kobiksZnVuY3Rpb24odCl7cmV0dXJuIGppLmNhbGwobix0KX0pKX06S3UsZ289V2k/ZnVuY3Rpb24obil7Zm9yKHZhciB0PVtdO247KXModCx2byhuKSksbj1iaShuKTtyZXR1cm4gdH06S3UseW89enQ7KFBpJiZcIltvYmplY3QgRGF0YVZpZXddXCIhPXlvKG5ldyBQaShuZXcgQXJyYXlCdWZmZXIoMSkpKXx8WmkmJlwiW29iamVjdCBNYXBdXCIhPXlvKG5ldyBaaSl8fHFpJiZcIltvYmplY3QgUHJvbWlzZV1cIiE9eW8ocWkucmVzb2x2ZSgpKXx8VmkmJlwiW29iamVjdCBTZXRdXCIhPXlvKG5ldyBWaSl8fEtpJiZcIltvYmplY3QgV2Vha01hcF1cIiE9eW8obmV3IEtpKSkmJih5bz1mdW5jdGlvbihuKXtcbnZhciB0PXp0KG4pO2lmKG49KG49XCJbb2JqZWN0IE9iamVjdF1cIj09dD9uLmNvbnN0cnVjdG9yOkYpP0ZlKG4pOlwiXCIpc3dpdGNoKG4pe2Nhc2UgWWk6cmV0dXJuXCJbb2JqZWN0IERhdGFWaWV3XVwiO2Nhc2UgUWk6cmV0dXJuXCJbb2JqZWN0IE1hcF1cIjtjYXNlIFhpOnJldHVyblwiW29iamVjdCBQcm9taXNlXVwiO2Nhc2Ugbm86cmV0dXJuXCJbb2JqZWN0IFNldF1cIjtjYXNlIHRvOnJldHVyblwiW29iamVjdCBXZWFrTWFwXVwifXJldHVybiB0fSk7dmFyIGJvPW9pP2d1Okd1LHhvPU1lKGxvKSxqbz1JaXx8ZnVuY3Rpb24obix0KXtyZXR1cm4gWm4uc2V0VGltZW91dChuLHQpfSx3bz1NZShzbyksbW89ZnVuY3Rpb24obil7bj1sdShuLGZ1bmN0aW9uKG4pe3JldHVybiA1MDA9PT10LnNpemUmJnQuY2xlYXIoKSxufSk7dmFyIHQ9bi5jYWNoZTtyZXR1cm4gbn0oZnVuY3Rpb24obil7dmFyIHQ9W107cmV0dXJuIGVuLnRlc3QobikmJnQucHVzaChcIlwiKSxuLnJlcGxhY2UodW4sZnVuY3Rpb24obixyLGUsdSl7XG50LnB1c2goZT91LnJlcGxhY2Uodm4sXCIkMVwiKTpyfHxuKX0pLHR9KSxBbz1scihmdW5jdGlvbihuLHQpe3JldHVybiBfdShuKT9qdChuLGt0KHQsMSxfdSx0cnVlKSk6W119KSxrbz1scihmdW5jdGlvbihuLHQpe3ZhciByPUdlKHQpO3JldHVybiBfdShyKSYmKHI9RiksX3Uobik/anQobixrdCh0LDEsX3UsdHJ1ZSksamUociwyKSk6W119KSxFbz1scihmdW5jdGlvbihuLHQpe3ZhciByPUdlKHQpO3JldHVybiBfdShyKSYmKHI9RiksX3Uobik/anQobixrdCh0LDEsX3UsdHJ1ZSksRixyKTpbXX0pLE9vPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PWwobixTcik7cmV0dXJuIHQubGVuZ3RoJiZ0WzBdPT09blswXT9VdCh0KTpbXX0pLFNvPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PUdlKG4pLHI9bChuLFNyKTtyZXR1cm4gdD09PUdlKHIpP3Q9RjpyLnBvcCgpLHIubGVuZ3RoJiZyWzBdPT09blswXT9VdChyLGplKHQsMikpOltdfSksSW89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobikscj1sKG4sU3IpO3JldHVybih0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGKSYmci5wb3AoKSxcbnIubGVuZ3RoJiZyWzBdPT09blswXT9VdChyLEYsdCk6W119KSxSbz1scihIZSksem89Z2UoZnVuY3Rpb24obix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGgsZT12dChuLHQpO3JldHVybiBmcihuLGwodCxmdW5jdGlvbihuKXtyZXR1cm4gUmUobixyKT8rbjpufSkuc29ydChVcikpLGV9KSxXbz1scihmdW5jdGlvbihuKXtyZXR1cm4gd3Ioa3QobiwxLF91LHRydWUpKX0pLEJvPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PUdlKG4pO3JldHVybiBfdSh0KSYmKHQ9Riksd3Ioa3QobiwxLF91LHRydWUpLGplKHQsMikpfSksTG89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2UobiksdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RjtyZXR1cm4gd3Ioa3QobiwxLF91LHRydWUpLEYsdCl9KSxVbz1scihmdW5jdGlvbihuLHQpe3JldHVybiBfdShuKT9qdChuLHQpOltdfSksQ289bHIoZnVuY3Rpb24obil7cmV0dXJuIEVyKGYobixfdSkpfSksRG89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobik7cmV0dXJuIF91KHQpJiYodD1GKSxcbkVyKGYobixfdSksamUodCwyKSl9KSxNbz1scihmdW5jdGlvbihuKXt2YXIgdD1HZShuKSx0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGO3JldHVybiBFcihmKG4sX3UpLEYsdCl9KSxUbz1scihZZSksJG89bHIoZnVuY3Rpb24obil7dmFyIHQ9bi5sZW5ndGgsdD0xPHQ/blt0LTFdOkYsdD10eXBlb2YgdD09XCJmdW5jdGlvblwiPyhuLnBvcCgpLHQpOkY7cmV0dXJuIFFlKG4sdCl9KSxGbz1nZShmdW5jdGlvbihuKXtmdW5jdGlvbiB0KHQpe3JldHVybiB2dCh0LG4pfXZhciByPW4ubGVuZ3RoLGU9cj9uWzBdOjAsdT10aGlzLl9fd3JhcHBlZF9fO3JldHVybiEoMTxyfHx0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCkmJnUgaW5zdGFuY2VvZiBNbiYmUmUoZSk/KHU9dS5zbGljZShlLCtlKyhyPzE6MCkpLHUuX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpudSxhcmdzOlt0XSx0aGlzQXJnOkZ9KSxuZXcgem4odSx0aGlzLl9fY2hhaW5fXykudGhydShmdW5jdGlvbihuKXtyZXR1cm4gciYmIW4ubGVuZ3RoJiZuLnB1c2goRiksXG5ufSkpOnRoaXMudGhydSh0KX0pLE5vPU5yKGZ1bmN0aW9uKG4sdCxyKXtjaS5jYWxsKG4scik/KytuW3JdOl90KG4sciwxKX0pLFBvPVlyKFplKSxabz1ZcihxZSkscW89TnIoZnVuY3Rpb24obix0LHIpe2NpLmNhbGwobixyKT9uW3JdLnB1c2godCk6X3QobixyLFt0XSl9KSxWbz1scihmdW5jdGlvbihuLHQsZSl7dmFyIHU9LTEsaT10eXBlb2YgdD09XCJmdW5jdGlvblwiLG89cHUobik/SHUobi5sZW5ndGgpOltdO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4pe29bKyt1XT1pP3IodCxuLGUpOkR0KG4sdCxlKX0pLG99KSxLbz1OcihmdW5jdGlvbihuLHQscil7X3QobixyLHQpfSksR289TnIoZnVuY3Rpb24obix0LHIpe25bcj8wOjFdLnB1c2godCl9LGZ1bmN0aW9uKCl7cmV0dXJuW1tdLFtdXX0pLEhvPWxyKGZ1bmN0aW9uKG4sdCl7aWYobnVsbD09bilyZXR1cm5bXTt2YXIgcj10Lmxlbmd0aDtyZXR1cm4gMTxyJiZ6ZShuLHRbMF0sdFsxXSk/dD1bXToyPHImJnplKHRbMF0sdFsxXSx0WzJdKSYmKHQ9W3RbMF1dKSxcbnJyKG4sa3QodCwxKSxbXSl9KSxKbz1TaXx8ZnVuY3Rpb24oKXtyZXR1cm4gWm4uRGF0ZS5ub3coKX0sWW89bHIoZnVuY3Rpb24obix0LHIpe3ZhciBlPTE7aWYoci5sZW5ndGgpdmFyIHU9QyhyLHhlKFlvKSksZT0zMnxlO3JldHVybiBsZShuLGUsdCxyLHUpfSksUW89bHIoZnVuY3Rpb24obix0LHIpe3ZhciBlPTM7aWYoci5sZW5ndGgpdmFyIHU9QyhyLHhlKFFvKSksZT0zMnxlO3JldHVybiBsZSh0LGUsbixyLHUpfSksWG89bHIoZnVuY3Rpb24obix0KXtyZXR1cm4geHQobiwxLHQpfSksbmY9bHIoZnVuY3Rpb24obix0LHIpe3JldHVybiB4dChuLEl1KHQpfHwwLHIpfSk7bHUuQ2FjaGU9UG47dmFyIHRmPWxyKGZ1bmN0aW9uKG4sdCl7dD0xPT10Lmxlbmd0aCYmYWYodFswXSk/bCh0WzBdLFMoamUoKSkpOmwoa3QodCwxKSxTKGplKCkpKTt2YXIgZT10Lmxlbmd0aDtyZXR1cm4gbHIoZnVuY3Rpb24odSl7Zm9yKHZhciBpPS0xLG89TWkodS5sZW5ndGgsZSk7KytpPG87KXVbaV09dFtpXS5jYWxsKHRoaXMsdVtpXSk7XG5yZXR1cm4gcihuLHRoaXMsdSl9KX0pLHJmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sMzIsRix0LEModCx4ZShyZikpKX0pLGVmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sNjQsRix0LEModCx4ZShlZikpKX0pLHVmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGxlKG4sMjU2LEYsRixGLHQpfSksb2Y9b2UoV3QpLGZmPW9lKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4+PXR9KSxjZj1NdChmdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHN9KCkpP010OmZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmY2kuY2FsbChuLFwiY2FsbGVlXCIpJiYhamkuY2FsbChuLFwiY2FsbGVlXCIpfSxhZj1IdS5pc0FycmF5LGxmPUhuP1MoSG4pOlR0LHNmPUJpfHxHdSxoZj1Kbj9TKEpuKTokdCxwZj1Zbj9TKFluKTpOdCxfZj1Rbj9TKFFuKTpxdCx2Zj1Ybj9TKFhuKTpWdCxnZj1udD9TKG50KTpLdCxkZj1vZShKdCkseWY9b2UoZnVuY3Rpb24obix0KXtyZXR1cm4gbjw9dH0pLGJmPVByKGZ1bmN0aW9uKG4sdCl7XG5pZihMZSh0KXx8cHUodCkpVHIodCxMdSh0KSxuKTtlbHNlIGZvcih2YXIgciBpbiB0KWNpLmNhbGwodCxyKSYmYXQobixyLHRbcl0pfSkseGY9UHIoZnVuY3Rpb24obix0KXtUcih0LFV1KHQpLG4pfSksamY9UHIoZnVuY3Rpb24obix0LHIsZSl7VHIodCxVdSh0KSxuLGUpfSksd2Y9UHIoZnVuY3Rpb24obix0LHIsZSl7VHIodCxMdSh0KSxuLGUpfSksbWY9Z2UodnQpLEFmPWxyKGZ1bmN0aW9uKG4pe3JldHVybiBuLnB1c2goRixzZSkscihqZixGLG4pfSksa2Y9bHIoZnVuY3Rpb24obil7cmV0dXJuIG4ucHVzaChGLGhlKSxyKFJmLEYsbil9KSxFZj1uZShmdW5jdGlvbihuLHQscil7blt0XT1yfSxGdShOdSkpLE9mPW5lKGZ1bmN0aW9uKG4sdCxyKXtjaS5jYWxsKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSxqZSksU2Y9bHIoRHQpLElmPVByKGZ1bmN0aW9uKG4sdCxyKXtucihuLHQscil9KSxSZj1QcihmdW5jdGlvbihuLHQscixlKXtucihuLHQscixlKX0pLHpmPWdlKGZ1bmN0aW9uKG4sdCl7XG52YXIgcj17fTtpZihudWxsPT1uKXJldHVybiByO3ZhciBlPWZhbHNlO3Q9bCh0LGZ1bmN0aW9uKHQpe3JldHVybiB0PVJyKHQsbiksZXx8KGU9MTx0Lmxlbmd0aCksdH0pLFRyKG4seWUobiksciksZSYmKHI9ZHQociw3LHBlKSk7Zm9yKHZhciB1PXQubGVuZ3RoO3UtLTspbXIocix0W3VdKTtyZXR1cm4gcn0pLFdmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/e306ZXIobix0KX0pLEJmPWFlKEx1KSxMZj1hZShVdSksVWY9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiB0PXQudG9Mb3dlckNhc2UoKSxuKyhyP011KHQpOnQpfSksQ2Y9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiBuKyhyP1wiLVwiOlwiXCIpK3QudG9Mb3dlckNhc2UoKX0pLERmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIiBcIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCl9KSxNZj1LcihcInRvTG93ZXJDYXNlXCIpLFRmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIl9cIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCk7XG59KSwkZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrTmYodCl9KSxGZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrdC50b1VwcGVyQ2FzZSgpfSksTmY9S3IoXCJ0b1VwcGVyQ2FzZVwiKSxQZj1scihmdW5jdGlvbihuLHQpe3RyeXtyZXR1cm4gcihuLEYsdCl9Y2F0Y2gobil7cmV0dXJuIHZ1KG4pP246bmV3IFl1KG4pfX0pLFpmPWdlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIHUodCxmdW5jdGlvbih0KXt0PSRlKHQpLF90KG4sdCxZbyhuW3RdLG4pKX0pLG59KSxxZj1RcigpLFZmPVFyKHRydWUpLEtmPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBEdChyLG4sdCl9fSksR2Y9bHIoZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIER0KG4scix0KX19KSxIZj1yZShsKSxKZj1yZShvKSxZZj1yZShfKSxRZj1pZSgpLFhmPWllKHRydWUpLG5jPXRlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4rdH0sMCksdGM9Y2UoXCJjZWlsXCIpLHJjPXRlKGZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4gbi90fSwxKSxlYz1jZShcImZsb29yXCIpLHVjPXRlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4qdH0sMSksaWM9Y2UoXCJyb3VuZFwiKSxvYz10ZShmdW5jdGlvbihuLHQpe3JldHVybiBuLXR9LDApO3JldHVybiBPbi5hZnRlcj1mdW5jdGlvbihuLHQpe2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gbj1PdShuKSxmdW5jdGlvbigpe2lmKDE+LS1uKXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LE9uLmFyeT1pdSxPbi5hc3NpZ249YmYsT24uYXNzaWduSW49eGYsT24uYXNzaWduSW5XaXRoPWpmLE9uLmFzc2lnbldpdGg9d2YsT24uYXQ9bWYsT24uYmVmb3JlPW91LE9uLmJpbmQ9WW8sT24uYmluZEFsbD1aZixPbi5iaW5kS2V5PVFvLE9uLmNhc3RBcnJheT1mdW5jdGlvbigpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybltdO3ZhciBuPWFyZ3VtZW50c1swXTtyZXR1cm4gYWYobik/bjpbbl19LFxuT24uY2hhaW49WGUsT24uY2h1bms9ZnVuY3Rpb24obix0LHIpe2lmKHQ9KHI/emUobix0LHIpOnQ9PT1GKT8xOkRpKE91KHQpLDApLHI9bnVsbD09bj8wOm4ubGVuZ3RoLCFyfHwxPnQpcmV0dXJuW107Zm9yKHZhciBlPTAsdT0wLGk9SHUoUmkoci90KSk7ZTxyOylpW3UrK109dnIobixlLGUrPXQpO3JldHVybiBpfSxPbi5jb21wYWN0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aCxlPTAsdT1bXTsrK3Q8cjspe3ZhciBpPW5bdF07aSYmKHVbZSsrXT1pKX1yZXR1cm4gdX0sT24uY29uY2F0PWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aDtpZighbilyZXR1cm5bXTtmb3IodmFyIHQ9SHUobi0xKSxyPWFyZ3VtZW50c1swXTtuLS07KXRbbi0xXT1hcmd1bWVudHNbbl07cmV0dXJuIHMoYWYocik/TXIocik6W3JdLGt0KHQsMSkpfSxPbi5jb25kPWZ1bmN0aW9uKG4pe3ZhciB0PW51bGw9PW4/MDpuLmxlbmd0aCxlPWplKCk7cmV0dXJuIG49dD9sKG4sZnVuY3Rpb24obil7XG5pZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuWzFdKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuW2UoblswXSksblsxXV19KTpbXSxscihmdW5jdGlvbihlKXtmb3IodmFyIHU9LTE7Kyt1PHQ7KXt2YXIgaT1uW3VdO2lmKHIoaVswXSx0aGlzLGUpKXJldHVybiByKGlbMV0sdGhpcyxlKX19KX0sT24uY29uZm9ybXM9ZnVuY3Rpb24obil7cmV0dXJuIHl0KGR0KG4sMSkpfSxPbi5jb25zdGFudD1GdSxPbi5jb3VudEJ5PU5vLE9uLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWlvKG4pO3JldHVybiBudWxsPT10P3I6aHQocix0KX0sT24uY3Vycnk9ZnUsT24uY3VycnlSaWdodD1jdSxPbi5kZWJvdW5jZT1hdSxPbi5kZWZhdWx0cz1BZixPbi5kZWZhdWx0c0RlZXA9a2YsT24uZGVmZXI9WG8sT24uZGVsYXk9bmYsT24uZGlmZmVyZW5jZT1BbyxPbi5kaWZmZXJlbmNlQnk9a28sT24uZGlmZmVyZW5jZVdpdGg9RW8sT24uZHJvcD1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO1xucmV0dXJuIGU/KHQ9cnx8dD09PUY/MTpPdSh0KSx2cihuLDA+dD8wOnQsZSkpOltdfSxPbi5kcm9wUmlnaHQ9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8odD1yfHx0PT09Rj8xOk91KHQpLHQ9ZS10LHZyKG4sMCwwPnQ/MDp0KSk6W119LE9uLmRyb3BSaWdodFdoaWxlPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP0FyKG4samUodCwzKSx0cnVlLHRydWUpOltdfSxPbi5kcm9wV2hpbGU9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/QXIobixqZSh0LDMpLHRydWUpOltdfSxPbi5maWxsPWZ1bmN0aW9uKG4sdCxyLGUpe3ZhciB1PW51bGw9PW4/MDpuLmxlbmd0aDtpZighdSlyZXR1cm5bXTtmb3IociYmdHlwZW9mIHIhPVwibnVtYmVyXCImJnplKG4sdCxyKSYmKHI9MCxlPXUpLHU9bi5sZW5ndGgscj1PdShyKSwwPnImJihyPS1yPnU/MDp1K3IpLGU9ZT09PUZ8fGU+dT91Ok91KGUpLDA+ZSYmKGUrPXUpLGU9cj5lPzA6U3UoZSk7cjxlOyluW3IrK109dDtcbnJldHVybiBufSxPbi5maWx0ZXI9ZnVuY3Rpb24obix0KXtyZXR1cm4oYWYobik/ZjpBdCkobixqZSh0LDMpKX0sT24uZmxhdE1hcD1mdW5jdGlvbihuLHQpe3JldHVybiBrdCh1dShuLHQpLDEpfSxPbi5mbGF0TWFwRGVlcD1mdW5jdGlvbihuLHQpe3JldHVybiBrdCh1dShuLHQpLE4pfSxPbi5mbGF0TWFwRGVwdGg9ZnVuY3Rpb24obix0LHIpe3JldHVybiByPXI9PT1GPzE6T3Uociksa3QodXUobix0KSxyKX0sT24uZmxhdHRlbj1WZSxPbi5mbGF0dGVuRGVlcD1mdW5jdGlvbihuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT9rdChuLE4pOltdfSxPbi5mbGF0dGVuRGVwdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbCE9biYmbi5sZW5ndGg/KHQ9dD09PUY/MTpPdSh0KSxrdChuLHQpKTpbXX0sT24uZmxpcD1mdW5jdGlvbihuKXtyZXR1cm4gbGUobiw1MTIpfSxPbi5mbG93PXFmLE9uLmZsb3dSaWdodD1WZixPbi5mcm9tUGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciB0PS0xLHI9bnVsbD09bj8wOm4ubGVuZ3RoLGU9e307Kyt0PHI7KXtcbnZhciB1PW5bdF07ZVt1WzBdXT11WzFdfXJldHVybiBlfSxPbi5mdW5jdGlvbnM9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106U3QobixMdShuKSl9LE9uLmZ1bmN0aW9uc0luPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1tdOlN0KG4sVXUobikpfSxPbi5ncm91cEJ5PXFvLE9uLmluaXRpYWw9ZnVuY3Rpb24obil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/dnIobiwwLC0xKTpbXX0sT24uaW50ZXJzZWN0aW9uPU9vLE9uLmludGVyc2VjdGlvbkJ5PVNvLE9uLmludGVyc2VjdGlvbldpdGg9SW8sT24uaW52ZXJ0PUVmLE9uLmludmVydEJ5PU9mLE9uLmludm9rZU1hcD1WbyxPbi5pdGVyYXRlZT1QdSxPbi5rZXlCeT1LbyxPbi5rZXlzPUx1LE9uLmtleXNJbj1VdSxPbi5tYXA9dXUsT24ubWFwS2V5cz1mdW5jdGlvbihuLHQpe3ZhciByPXt9O3JldHVybiB0PWplKHQsMyksRXQobixmdW5jdGlvbihuLGUsdSl7X3Qocix0KG4sZSx1KSxuKX0pLHJ9LE9uLm1hcFZhbHVlcz1mdW5jdGlvbihuLHQpe1xudmFyIHI9e307cmV0dXJuIHQ9amUodCwzKSxFdChuLGZ1bmN0aW9uKG4sZSx1KXtfdChyLGUsdChuLGUsdSkpfSkscn0sT24ubWF0Y2hlcz1mdW5jdGlvbihuKXtyZXR1cm4gUXQoZHQobiwxKSl9LE9uLm1hdGNoZXNQcm9wZXJ0eT1mdW5jdGlvbihuLHQpe3JldHVybiBYdChuLGR0KHQsMSkpfSxPbi5tZW1vaXplPWx1LE9uLm1lcmdlPUlmLE9uLm1lcmdlV2l0aD1SZixPbi5tZXRob2Q9S2YsT24ubWV0aG9kT2Y9R2YsT24ubWl4aW49WnUsT24ubmVnYXRlPXN1LE9uLm50aEFyZz1mdW5jdGlvbihuKXtyZXR1cm4gbj1PdShuKSxscihmdW5jdGlvbih0KXtyZXR1cm4gdHIodCxuKX0pfSxPbi5vbWl0PXpmLE9uLm9taXRCeT1mdW5jdGlvbihuLHQpe3JldHVybiBDdShuLHN1KGplKHQpKSl9LE9uLm9uY2U9ZnVuY3Rpb24obil7cmV0dXJuIG91KDIsbil9LE9uLm9yZGVyQnk9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIG51bGw9PW4/W106KGFmKHQpfHwodD1udWxsPT10P1tdOlt0XSksXG5yPWU/RjpyLGFmKHIpfHwocj1udWxsPT1yP1tdOltyXSkscnIobix0LHIpKX0sT24ub3Zlcj1IZixPbi5vdmVyQXJncz10ZixPbi5vdmVyRXZlcnk9SmYsT24ub3ZlclNvbWU9WWYsT24ucGFydGlhbD1yZixPbi5wYXJ0aWFsUmlnaHQ9ZWYsT24ucGFydGl0aW9uPUdvLE9uLnBpY2s9V2YsT24ucGlja0J5PUN1LE9uLnByb3BlcnR5PVZ1LE9uLnByb3BlcnR5T2Y9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT1uP0Y6SXQobix0KX19LE9uLnB1bGw9Um8sT24ucHVsbEFsbD1IZSxPbi5wdWxsQWxsQnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aCYmdCYmdC5sZW5ndGg/b3Iobix0LGplKHIsMikpOm59LE9uLnB1bGxBbGxXaXRoPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbiYmbi5sZW5ndGgmJnQmJnQubGVuZ3RoP29yKG4sdCxGLHIpOm59LE9uLnB1bGxBdD16byxPbi5yYW5nZT1RZixPbi5yYW5nZVJpZ2h0PVhmLE9uLnJlYXJnPXVmLE9uLnJlamVjdD1mdW5jdGlvbihuLHQpe1xucmV0dXJuKGFmKG4pP2Y6QXQpKG4sc3UoamUodCwzKSkpfSxPbi5yZW1vdmU9ZnVuY3Rpb24obix0KXt2YXIgcj1bXTtpZighbnx8IW4ubGVuZ3RoKXJldHVybiByO3ZhciBlPS0xLHU9W10saT1uLmxlbmd0aDtmb3IodD1qZSh0LDMpOysrZTxpOyl7dmFyIG89bltlXTt0KG8sZSxuKSYmKHIucHVzaChvKSx1LnB1c2goZSkpfXJldHVybiBmcihuLHUpLHJ9LE9uLnJlc3Q9ZnVuY3Rpb24obix0KXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9dD09PUY/dDpPdSh0KSxscihuLHQpfSxPbi5yZXZlcnNlPUplLE9uLnNhbXBsZVNpemU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PShyP3plKG4sdCxyKTp0PT09Rik/MTpPdSh0KSwoYWYobik/b3Q6aHIpKG4sdCl9LE9uLnNldD1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PW4/bjpwcihuLHQscil9LE9uLnNldFdpdGg9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIGU9dHlwZW9mIGU9PVwiZnVuY3Rpb25cIj9lOkYsXG5udWxsPT1uP246cHIobix0LHIsZSl9LE9uLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuKGFmKG4pP2Z0Ol9yKShuKX0sT24uc2xpY2U9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8ociYmdHlwZW9mIHIhPVwibnVtYmVyXCImJnplKG4sdCxyKT8odD0wLHI9ZSk6KHQ9bnVsbD09dD8wOk91KHQpLHI9cj09PUY/ZTpPdShyKSksdnIobix0LHIpKTpbXX0sT24uc29ydEJ5PUhvLE9uLnNvcnRlZFVuaXE9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP2JyKG4pOltdfSxPbi5zb3J0ZWRVbmlxQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/YnIobixqZSh0LDIpKTpbXX0sT24uc3BsaXQ9ZnVuY3Rpb24obix0LHIpe3JldHVybiByJiZ0eXBlb2YgciE9XCJudW1iZXJcIiYmemUobix0LHIpJiYodD1yPUYpLHI9cj09PUY/NDI5NDk2NzI5NTpyPj4+MCxyPyhuPXp1KG4pKSYmKHR5cGVvZiB0PT1cInN0cmluZ1wifHxudWxsIT10JiYhX2YodCkpJiYodD1qcih0KSxcbiF0JiZCbi50ZXN0KG4pKT96cigkKG4pLDAscik6bi5zcGxpdCh0LHIpOltdfSxPbi5zcHJlYWQ9ZnVuY3Rpb24obix0KXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIHQ9bnVsbD09dD8wOkRpKE91KHQpLDApLGxyKGZ1bmN0aW9uKGUpe3ZhciB1PWVbdF07cmV0dXJuIGU9enIoZSwwLHQpLHUmJnMoZSx1KSxyKG4sdGhpcyxlKX0pfSxPbi50YWlsPWZ1bmN0aW9uKG4pe3ZhciB0PW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gdD92cihuLDEsdCk6W119LE9uLnRha2U9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aD8odD1yfHx0PT09Rj8xOk91KHQpLHZyKG4sMCwwPnQ/MDp0KSk6W119LE9uLnRha2VSaWdodD1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyh0PXJ8fHQ9PT1GPzE6T3UodCksdD1lLXQsdnIobiwwPnQ/MDp0LGUpKTpbXX0sT24udGFrZVJpZ2h0V2hpbGU9ZnVuY3Rpb24obix0KXtcbnJldHVybiBuJiZuLmxlbmd0aD9BcihuLGplKHQsMyksZmFsc2UsdHJ1ZSk6W119LE9uLnRha2VXaGlsZT1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD9BcihuLGplKHQsMykpOltdfSxPbi50YXA9ZnVuY3Rpb24obix0KXtyZXR1cm4gdChuKSxufSxPbi50aHJvdHRsZT1mdW5jdGlvbihuLHQscil7dmFyIGU9dHJ1ZSx1PXRydWU7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBidShyKSYmKGU9XCJsZWFkaW5nXCJpbiByPyEhci5sZWFkaW5nOmUsdT1cInRyYWlsaW5nXCJpbiByPyEhci50cmFpbGluZzp1KSxhdShuLHQse2xlYWRpbmc6ZSxtYXhXYWl0OnQsdHJhaWxpbmc6dX0pfSxPbi50aHJ1PW51LE9uLnRvQXJyYXk9a3UsT24udG9QYWlycz1CZixPbi50b1BhaXJzSW49TGYsT24udG9QYXRoPWZ1bmN0aW9uKG4pe3JldHVybiBhZihuKT9sKG4sJGUpOkF1KG4pP1tuXTpNcihtbyh6dShuKSkpfSxPbi50b1BsYWluT2JqZWN0PVJ1LFxuT24udHJhbnNmb3JtPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKSxpPWV8fHNmKG4pfHxnZihuKTtpZih0PWplKHQsNCksbnVsbD09cil7dmFyIG89biYmbi5jb25zdHJ1Y3RvcjtyPWk/ZT9uZXcgbzpbXTpidShuKSYmZ3Uobyk/aW8oYmkobikpOnt9fXJldHVybihpP3U6RXQpKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiB0KHIsbixlLHUpfSkscn0sT24udW5hcnk9ZnVuY3Rpb24obil7cmV0dXJuIGl1KG4sMSl9LE9uLnVuaW9uPVdvLE9uLnVuaW9uQnk9Qm8sT24udW5pb25XaXRoPUxvLE9uLnVuaXE9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP3dyKG4pOltdfSxPbi51bmlxQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/d3IobixqZSh0LDIpKTpbXX0sT24udW5pcVdpdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RixuJiZuLmxlbmd0aD93cihuLEYsdCk6W119LE9uLnVuc2V0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW58fG1yKG4sdCk7XG59LE9uLnVuemlwPVllLE9uLnVuemlwV2l0aD1RZSxPbi51cGRhdGU9ZnVuY3Rpb24obix0LHIpe3JldHVybiBudWxsPT1uP246cHIobix0LElyKHIpKEl0KG4sdCkpLHZvaWQgMCl9LE9uLnVwZGF0ZVdpdGg9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIGU9dHlwZW9mIGU9PVwiZnVuY3Rpb25cIj9lOkYsbnVsbCE9biYmKG49cHIobix0LElyKHIpKEl0KG4sdCkpLGUpKSxufSxPbi52YWx1ZXM9RHUsT24udmFsdWVzSW49ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106SShuLFV1KG4pKX0sT24ud2l0aG91dD1VbyxPbi53b3Jkcz0kdSxPbi53cmFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHJmKElyKHQpLG4pfSxPbi54b3I9Q28sT24ueG9yQnk9RG8sT24ueG9yV2l0aD1NbyxPbi56aXA9VG8sT24uemlwT2JqZWN0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIE9yKG58fFtdLHR8fFtdLGF0KX0sT24uemlwT2JqZWN0RGVlcD1mdW5jdGlvbihuLHQpe3JldHVybiBPcihufHxbXSx0fHxbXSxwcik7XG59LE9uLnppcFdpdGg9JG8sT24uZW50cmllcz1CZixPbi5lbnRyaWVzSW49TGYsT24uZXh0ZW5kPXhmLE9uLmV4dGVuZFdpdGg9amYsWnUoT24sT24pLE9uLmFkZD1uYyxPbi5hdHRlbXB0PVBmLE9uLmNhbWVsQ2FzZT1VZixPbi5jYXBpdGFsaXplPU11LE9uLmNlaWw9dGMsT24uY2xhbXA9ZnVuY3Rpb24obix0LHIpe3JldHVybiByPT09RiYmKHI9dCx0PUYpLHIhPT1GJiYocj1JdShyKSxyPXI9PT1yP3I6MCksdCE9PUYmJih0PUl1KHQpLHQ9dD09PXQ/dDowKSxndChJdShuKSx0LHIpfSxPbi5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gZHQobiw0KX0sT24uY2xvbmVEZWVwPWZ1bmN0aW9uKG4pe3JldHVybiBkdChuLDUpfSxPbi5jbG9uZURlZXBXaXRoPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQ9dHlwZW9mIHQ9PVwiZnVuY3Rpb25cIj90OkYsZHQobiw1LHQpfSxPbi5jbG9uZVdpdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RixkdChuLDQsdCl9LFxuT24uY29uZm9ybXNUbz1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT10fHxidChuLHQsTHUodCkpfSxPbi5kZWJ1cnI9VHUsT24uZGVmYXVsdFRvPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW58fG4hPT1uP3Q6bn0sT24uZGl2aWRlPXJjLE9uLmVuZHNXaXRoPWZ1bmN0aW9uKG4sdCxyKXtuPXp1KG4pLHQ9anIodCk7dmFyIGU9bi5sZW5ndGgsZT1yPXI9PT1GP2U6Z3QoT3UociksMCxlKTtyZXR1cm4gci09dC5sZW5ndGgsMDw9ciYmbi5zbGljZShyLGUpPT10fSxPbi5lcT1odSxPbi5lc2NhcGU9ZnVuY3Rpb24obil7cmV0dXJuKG49enUobikpJiZZLnRlc3Qobik/bi5yZXBsYWNlKEgsZXQpOm59LE9uLmVzY2FwZVJlZ0V4cD1mdW5jdGlvbihuKXtyZXR1cm4obj16dShuKSkmJmZuLnRlc3Qobik/bi5yZXBsYWNlKG9uLFwiXFxcXCQmXCIpOm59LE9uLmV2ZXJ5PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKT9vOnd0O3JldHVybiByJiZ6ZShuLHQscikmJih0PUYpLGUobixqZSh0LDMpKTtcbn0sT24uZmluZD1QbyxPbi5maW5kSW5kZXg9WmUsT24uZmluZEtleT1mdW5jdGlvbihuLHQpe3JldHVybiB2KG4samUodCwzKSxFdCl9LE9uLmZpbmRMYXN0PVpvLE9uLmZpbmRMYXN0SW5kZXg9cWUsT24uZmluZExhc3RLZXk9ZnVuY3Rpb24obix0KXtyZXR1cm4gdihuLGplKHQsMyksT3QpfSxPbi5mbG9vcj1lYyxPbi5mb3JFYWNoPXJ1LE9uLmZvckVhY2hSaWdodD1ldSxPbi5mb3JJbj1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP246Y28obixqZSh0LDMpLFV1KX0sT24uZm9ySW5SaWdodD1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP246YW8obixqZSh0LDMpLFV1KX0sT24uZm9yT3duPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJkV0KG4samUodCwzKSl9LE9uLmZvck93blJpZ2h0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJk90KG4samUodCwzKSl9LE9uLmdldD1XdSxPbi5ndD1vZixPbi5ndGU9ZmYsT24uaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGwhPW4mJmtlKG4sdCxCdCk7XG59LE9uLmhhc0luPUJ1LE9uLmhlYWQ9S2UsT24uaWRlbnRpdHk9TnUsT24uaW5jbHVkZXM9ZnVuY3Rpb24obix0LHIsZSl7cmV0dXJuIG49cHUobik/bjpEdShuKSxyPXImJiFlP091KHIpOjAsZT1uLmxlbmd0aCwwPnImJihyPURpKGUrciwwKSksbXUobik/cjw9ZSYmLTE8bi5pbmRleE9mKHQscik6ISFlJiYtMTxkKG4sdCxyKX0sT24uaW5kZXhPZj1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyhyPW51bGw9PXI/MDpPdShyKSwwPnImJihyPURpKGUrciwwKSksZChuLHQscikpOi0xfSxPbi5pblJhbmdlPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD1FdSh0KSxyPT09Rj8ocj10LHQ9MCk6cj1FdShyKSxuPUl1KG4pLG4+PU1pKHQscikmJm48RGkodCxyKX0sT24uaW52b2tlPVNmLE9uLmlzQXJndW1lbnRzPWNmLE9uLmlzQXJyYXk9YWYsT24uaXNBcnJheUJ1ZmZlcj1sZixPbi5pc0FycmF5TGlrZT1wdSxPbi5pc0FycmF5TGlrZU9iamVjdD1fdSxcbk9uLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4gdHJ1ZT09PW58fGZhbHNlPT09bnx8eHUobikmJlwiW29iamVjdCBCb29sZWFuXVwiPT16dChuKX0sT24uaXNCdWZmZXI9c2YsT24uaXNEYXRlPWhmLE9uLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4geHUobikmJjE9PT1uLm5vZGVUeXBlJiYhd3Uobil9LE9uLmlzRW1wdHk9ZnVuY3Rpb24obil7aWYobnVsbD09bilyZXR1cm4gdHJ1ZTtpZihwdShuKSYmKGFmKG4pfHx0eXBlb2Ygbj09XCJzdHJpbmdcInx8dHlwZW9mIG4uc3BsaWNlPT1cImZ1bmN0aW9uXCJ8fHNmKG4pfHxnZihuKXx8Y2YobikpKXJldHVybiFuLmxlbmd0aDt2YXIgdD15byhuKTtpZihcIltvYmplY3QgTWFwXVwiPT10fHxcIltvYmplY3QgU2V0XVwiPT10KXJldHVybiFuLnNpemU7aWYoTGUobikpcmV0dXJuIUh0KG4pLmxlbmd0aDtmb3IodmFyIHIgaW4gbilpZihjaS5jYWxsKG4scikpcmV0dXJuIGZhbHNlO3JldHVybiB0cnVlfSxPbi5pc0VxdWFsPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIEZ0KG4sdCk7XG59LE9uLmlzRXF1YWxXaXRoPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT0ocj10eXBlb2Ygcj09XCJmdW5jdGlvblwiP3I6Rik/cihuLHQpOkY7cmV0dXJuIGU9PT1GP0Z0KG4sdCxGLHIpOiEhZX0sT24uaXNFcnJvcj12dSxPbi5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCImJkxpKG4pfSxPbi5pc0Z1bmN0aW9uPWd1LE9uLmlzSW50ZWdlcj1kdSxPbi5pc0xlbmd0aD15dSxPbi5pc01hcD1wZixPbi5pc01hdGNoPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG49PT10fHxQdChuLHQsbWUodCkpfSxPbi5pc01hdGNoV2l0aD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHI9dHlwZW9mIHI9PVwiZnVuY3Rpb25cIj9yOkYsUHQobix0LG1lKHQpLHIpfSxPbi5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4ganUobikmJm4hPStufSxPbi5pc05hdGl2ZT1mdW5jdGlvbihuKXtpZihibyhuKSl0aHJvdyBuZXcgWXUoXCJVbnN1cHBvcnRlZCBjb3JlLWpzIHVzZS4gVHJ5IGh0dHBzOi8vbnBtcy5pby9zZWFyY2g/cT1wb255ZmlsbC5cIik7XG5yZXR1cm4gWnQobil9LE9uLmlzTmlsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufSxPbi5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxPbi5pc051bWJlcj1qdSxPbi5pc09iamVjdD1idSxPbi5pc09iamVjdExpa2U9eHUsT24uaXNQbGFpbk9iamVjdD13dSxPbi5pc1JlZ0V4cD1fZixPbi5pc1NhZmVJbnRlZ2VyPWZ1bmN0aW9uKG4pe3JldHVybiBkdShuKSYmLTkwMDcxOTkyNTQ3NDA5OTE8PW4mJjkwMDcxOTkyNTQ3NDA5OTE+PW59LE9uLmlzU2V0PXZmLE9uLmlzU3RyaW5nPW11LE9uLmlzU3ltYm9sPUF1LE9uLmlzVHlwZWRBcnJheT1nZixPbi5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gbj09PUZ9LE9uLmlzV2Vha01hcD1mdW5jdGlvbihuKXtyZXR1cm4geHUobikmJlwiW29iamVjdCBXZWFrTWFwXVwiPT15byhuKX0sT24uaXNXZWFrU2V0PWZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IFdlYWtTZXRdXCI9PXp0KG4pfSxPbi5qb2luPWZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4gbnVsbD09bj9cIlwiOlVpLmNhbGwobix0KX0sT24ua2ViYWJDYXNlPUNmLE9uLmxhc3Q9R2UsT24ubGFzdEluZGV4T2Y9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtpZighZSlyZXR1cm4tMTt2YXIgdT1lO2lmKHIhPT1GJiYodT1PdShyKSx1PTA+dT9EaShlK3UsMCk6TWkodSxlLTEpKSx0PT09dCl7Zm9yKHI9dSsxO3ItLSYmbltyXSE9PXQ7KTtuPXJ9ZWxzZSBuPWcobixiLHUsdHJ1ZSk7cmV0dXJuIG59LE9uLmxvd2VyQ2FzZT1EZixPbi5sb3dlckZpcnN0PU1mLE9uLmx0PWRmLE9uLmx0ZT15ZixPbi5tYXg9ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4sTnUsV3QpOkZ9LE9uLm1heEJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4samUodCwyKSxXdCk6Rn0sT24ubWVhbj1mdW5jdGlvbihuKXtyZXR1cm4geChuLE51KX0sT24ubWVhbkJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHgobixqZSh0LDIpKX0sT24ubWluPWZ1bmN0aW9uKG4pe1xucmV0dXJuIG4mJm4ubGVuZ3RoP210KG4sTnUsSnQpOkZ9LE9uLm1pbkJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP210KG4samUodCwyKSxKdCk6Rn0sT24uc3R1YkFycmF5PUt1LE9uLnN0dWJGYWxzZT1HdSxPbi5zdHViT2JqZWN0PWZ1bmN0aW9uKCl7cmV0dXJue319LE9uLnN0dWJTdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIlwifSxPbi5zdHViVHJ1ZT1mdW5jdGlvbigpe3JldHVybiB0cnVlfSxPbi5tdWx0aXBseT11YyxPbi5udGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/dHIobixPdSh0KSk6Rn0sT24ubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBabi5fPT09dGhpcyYmKFpuLl89cGkpLHRoaXN9LE9uLm5vb3A9cXUsT24ubm93PUpvLE9uLnBhZD1mdW5jdGlvbihuLHQscil7bj16dShuKTt2YXIgZT0odD1PdSh0KSk/VChuKTowO3JldHVybiF0fHxlPj10P246KHQ9KHQtZSkvMixlZSh6aSh0KSxyKStuK2VlKFJpKHQpLHIpKX0sT24ucGFkRW5kPWZ1bmN0aW9uKG4sdCxyKXtcbm49enUobik7dmFyIGU9KHQ9T3UodCkpP1Qobik6MDtyZXR1cm4gdCYmZTx0P24rZWUodC1lLHIpOm59LE9uLnBhZFN0YXJ0PWZ1bmN0aW9uKG4sdCxyKXtuPXp1KG4pO3ZhciBlPSh0PU91KHQpKT9UKG4pOjA7cmV0dXJuIHQmJmU8dD9lZSh0LWUscikrbjpufSxPbi5wYXJzZUludD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHJ8fG51bGw9PXQ/dD0wOnQmJih0PSt0KSwkaSh6dShuKS5yZXBsYWNlKGFuLFwiXCIpLHR8fDApfSxPbi5yYW5kb209ZnVuY3Rpb24obix0LHIpe2lmKHImJnR5cGVvZiByIT1cImJvb2xlYW5cIiYmemUobix0LHIpJiYodD1yPUYpLHI9PT1GJiYodHlwZW9mIHQ9PVwiYm9vbGVhblwiPyhyPXQsdD1GKTp0eXBlb2Ygbj09XCJib29sZWFuXCImJihyPW4sbj1GKSksbj09PUYmJnQ9PT1GPyhuPTAsdD0xKToobj1FdShuKSx0PT09Rj8odD1uLG49MCk6dD1FdSh0KSksbj50KXt2YXIgZT1uO249dCx0PWV9cmV0dXJuIHJ8fG4lMXx8dCUxPyhyPUZpKCksTWkobityKih0LW4rJG4oXCIxZS1cIisoKHIrXCJcIikubGVuZ3RoLTEpKSksdCkpOmNyKG4sdCk7XG59LE9uLnJlZHVjZT1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/aDptLHU9Mz5hcmd1bWVudHMubGVuZ3RoO3JldHVybiBlKG4samUodCw0KSxyLHUsb28pfSxPbi5yZWR1Y2VSaWdodD1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/cDptLHU9Mz5hcmd1bWVudHMubGVuZ3RoO3JldHVybiBlKG4samUodCw0KSxyLHUsZm8pfSxPbi5yZXBlYXQ9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PShyP3plKG4sdCxyKTp0PT09Rik/MTpPdSh0KSxhcih6dShuKSx0KX0sT24ucmVwbGFjZT1mdW5jdGlvbigpe3ZhciBuPWFyZ3VtZW50cyx0PXp1KG5bMF0pO3JldHVybiAzPm4ubGVuZ3RoP3Q6dC5yZXBsYWNlKG5bMV0sblsyXSl9LE9uLnJlc3VsdD1mdW5jdGlvbihuLHQscil7dD1Scih0LG4pO3ZhciBlPS0xLHU9dC5sZW5ndGg7Zm9yKHV8fCh1PTEsbj1GKTsrK2U8dTspe3ZhciBpPW51bGw9PW4/RjpuWyRlKHRbZV0pXTtpPT09RiYmKGU9dSxpPXIpLG49Z3UoaSk/aS5jYWxsKG4pOmk7XG59cmV0dXJuIG59LE9uLnJvdW5kPWljLE9uLnJ1bkluQ29udGV4dD13LE9uLnNhbXBsZT1mdW5jdGlvbihuKXtyZXR1cm4oYWYobik/dHQ6c3IpKG4pfSxPbi5zaXplPWZ1bmN0aW9uKG4pe2lmKG51bGw9PW4pcmV0dXJuIDA7aWYocHUobikpcmV0dXJuIG11KG4pP1Qobik6bi5sZW5ndGg7dmFyIHQ9eW8obik7cmV0dXJuXCJbb2JqZWN0IE1hcF1cIj09dHx8XCJbb2JqZWN0IFNldF1cIj09dD9uLnNpemU6SHQobikubGVuZ3RofSxPbi5zbmFrZUNhc2U9VGYsT24uc29tZT1mdW5jdGlvbihuLHQscil7dmFyIGU9YWYobik/XzpncjtyZXR1cm4gciYmemUobix0LHIpJiYodD1GKSxlKG4samUodCwzKSl9LE9uLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGRyKG4sdCl9LE9uLnNvcnRlZEluZGV4Qnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB5cihuLHQsamUociwyKSl9LE9uLnNvcnRlZEluZGV4T2Y9ZnVuY3Rpb24obix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7aWYocil7XG52YXIgZT1kcihuLHQpO2lmKGU8ciYmaHUobltlXSx0KSlyZXR1cm4gZX1yZXR1cm4tMX0sT24uc29ydGVkTGFzdEluZGV4PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGRyKG4sdCx0cnVlKX0sT24uc29ydGVkTGFzdEluZGV4Qnk9ZnVuY3Rpb24obix0LHIpe3JldHVybiB5cihuLHQsamUociwyKSx0cnVlKX0sT24uc29ydGVkTGFzdEluZGV4T2Y9ZnVuY3Rpb24obix0KXtpZihudWxsPT1uPzA6bi5sZW5ndGgpe3ZhciByPWRyKG4sdCx0cnVlKS0xO2lmKGh1KG5bcl0sdCkpcmV0dXJuIHJ9cmV0dXJuLTF9LE9uLnN0YXJ0Q2FzZT0kZixPbi5zdGFydHNXaXRoPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbj16dShuKSxyPW51bGw9PXI/MDpndChPdShyKSwwLG4ubGVuZ3RoKSx0PWpyKHQpLG4uc2xpY2UocixyK3QubGVuZ3RoKT09dH0sT24uc3VidHJhY3Q9b2MsT24uc3VtPWZ1bmN0aW9uKG4pe3JldHVybiBuJiZuLmxlbmd0aD9rKG4sTnUpOjB9LE9uLnN1bUJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP2sobixqZSh0LDIpKTowO1xufSxPbi50ZW1wbGF0ZT1mdW5jdGlvbihuLHQscil7dmFyIGU9T24udGVtcGxhdGVTZXR0aW5ncztyJiZ6ZShuLHQscikmJih0PUYpLG49enUobiksdD1qZih7fSx0LGUsc2UpLHI9amYoe30sdC5pbXBvcnRzLGUuaW1wb3J0cyxzZSk7dmFyIHUsaSxvPUx1KHIpLGY9SShyLG8pLGM9MDtyPXQuaW50ZXJwb2xhdGV8fEFuO3ZhciBhPVwiX19wKz0nXCI7cj10aSgodC5lc2NhcGV8fEFuKS5zb3VyY2UrXCJ8XCIrci5zb3VyY2UrXCJ8XCIrKHI9PT1ubj9nbjpBbikuc291cmNlK1wifFwiKyh0LmV2YWx1YXRlfHxBbikuc291cmNlK1wifCRcIixcImdcIik7dmFyIGw9XCJzb3VyY2VVUkxcImluIHQ/XCIvLyMgc291cmNlVVJMPVwiK3Quc291cmNlVVJMK1wiXFxuXCI6XCJcIjtpZihuLnJlcGxhY2UocixmdW5jdGlvbih0LHIsZSxvLGYsbCl7cmV0dXJuIGV8fChlPW8pLGErPW4uc2xpY2UoYyxsKS5yZXBsYWNlKGtuLEIpLHImJih1PXRydWUsYSs9XCInK19fZShcIityK1wiKSsnXCIpLGYmJihpPXRydWUsYSs9XCInO1wiK2YrXCI7XFxuX19wKz0nXCIpLFxuZSYmKGErPVwiJysoKF9fdD0oXCIrZStcIikpPT1udWxsPycnOl9fdCkrJ1wiKSxjPWwrdC5sZW5ndGgsdH0pLGErPVwiJztcIiwodD10LnZhcmlhYmxlKXx8KGE9XCJ3aXRoKG9iail7XCIrYStcIn1cIiksYT0oaT9hLnJlcGxhY2UocSxcIlwiKTphKS5yZXBsYWNlKFYsXCIkMVwiKS5yZXBsYWNlKEssXCIkMTtcIiksYT1cImZ1bmN0aW9uKFwiKyh0fHxcIm9ialwiKStcIil7XCIrKHQ/XCJcIjpcIm9ianx8KG9iaj17fSk7XCIpK1widmFyIF9fdCxfX3A9JydcIisodT9cIixfX2U9Xy5lc2NhcGVcIjpcIlwiKSsoaT9cIixfX2o9QXJyYXkucHJvdG90eXBlLmpvaW47ZnVuY3Rpb24gcHJpbnQoKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyl9XCI6XCI7XCIpK2ErXCJyZXR1cm4gX19wfVwiLHQ9UGYoZnVuY3Rpb24oKXtyZXR1cm4gUXUobyxsK1wicmV0dXJuIFwiK2EpLmFwcGx5KEYsZil9KSx0LnNvdXJjZT1hLHZ1KHQpKXRocm93IHQ7cmV0dXJuIHR9LE9uLnRpbWVzPWZ1bmN0aW9uKG4sdCl7aWYobj1PdShuKSwxPm58fDkwMDcxOTkyNTQ3NDA5OTE8bilyZXR1cm5bXTtcbnZhciByPTQyOTQ5NjcyOTUsZT1NaShuLDQyOTQ5NjcyOTUpO2Zvcih0PWplKHQpLG4tPTQyOTQ5NjcyOTUsZT1FKGUsdCk7KytyPG47KXQocik7cmV0dXJuIGV9LE9uLnRvRmluaXRlPUV1LE9uLnRvSW50ZWdlcj1PdSxPbi50b0xlbmd0aD1TdSxPbi50b0xvd2VyPWZ1bmN0aW9uKG4pe3JldHVybiB6dShuKS50b0xvd2VyQ2FzZSgpfSxPbi50b051bWJlcj1JdSxPbi50b1NhZmVJbnRlZ2VyPWZ1bmN0aW9uKG4pe3JldHVybiBuP2d0KE91KG4pLC05MDA3MTk5MjU0NzQwOTkxLDkwMDcxOTkyNTQ3NDA5OTEpOjA9PT1uP246MH0sT24udG9TdHJpbmc9enUsT24udG9VcHBlcj1mdW5jdGlvbihuKXtyZXR1cm4genUobikudG9VcHBlckNhc2UoKX0sT24udHJpbT1mdW5jdGlvbihuLHQscil7cmV0dXJuKG49enUobikpJiYocnx8dD09PUYpP24ucmVwbGFjZShjbixcIlwiKTpuJiYodD1qcih0KSk/KG49JChuKSxyPSQodCksdD16KG4scikscj1XKG4scikrMSx6cihuLHQscikuam9pbihcIlwiKSk6bjtcbn0sT24udHJpbUVuZD1mdW5jdGlvbihuLHQscil7cmV0dXJuKG49enUobikpJiYocnx8dD09PUYpP24ucmVwbGFjZShsbixcIlwiKTpuJiYodD1qcih0KSk/KG49JChuKSx0PVcobiwkKHQpKSsxLHpyKG4sMCx0KS5qb2luKFwiXCIpKTpufSxPbi50cmltU3RhcnQ9ZnVuY3Rpb24obix0LHIpe3JldHVybihuPXp1KG4pKSYmKHJ8fHQ9PT1GKT9uLnJlcGxhY2UoYW4sXCJcIik6biYmKHQ9anIodCkpPyhuPSQobiksdD16KG4sJCh0KSksenIobix0KS5qb2luKFwiXCIpKTpufSxPbi50cnVuY2F0ZT1mdW5jdGlvbihuLHQpe3ZhciByPTMwLGU9XCIuLi5cIjtpZihidSh0KSl2YXIgdT1cInNlcGFyYXRvclwiaW4gdD90LnNlcGFyYXRvcjp1LHI9XCJsZW5ndGhcImluIHQ/T3UodC5sZW5ndGgpOnIsZT1cIm9taXNzaW9uXCJpbiB0P2pyKHQub21pc3Npb24pOmU7bj16dShuKTt2YXIgaT1uLmxlbmd0aDtpZihCbi50ZXN0KG4pKXZhciBvPSQobiksaT1vLmxlbmd0aDtpZihyPj1pKXJldHVybiBuO2lmKGk9ci1UKGUpLDE+aSlyZXR1cm4gZTtcbmlmKHI9bz96cihvLDAsaSkuam9pbihcIlwiKTpuLnNsaWNlKDAsaSksdT09PUYpcmV0dXJuIHIrZTtpZihvJiYoaSs9ci5sZW5ndGgtaSksX2YodSkpe2lmKG4uc2xpY2UoaSkuc2VhcmNoKHUpKXt2YXIgZj1yO2Zvcih1Lmdsb2JhbHx8KHU9dGkodS5zb3VyY2UsenUoZG4uZXhlYyh1KSkrXCJnXCIpKSx1Lmxhc3RJbmRleD0wO289dS5leGVjKGYpOyl2YXIgYz1vLmluZGV4O3I9ci5zbGljZSgwLGM9PT1GP2k6Yyl9fWVsc2Ugbi5pbmRleE9mKGpyKHUpLGkpIT1pJiYodT1yLmxhc3RJbmRleE9mKHUpLC0xPHUmJihyPXIuc2xpY2UoMCx1KSkpO3JldHVybiByK2V9LE9uLnVuZXNjYXBlPWZ1bmN0aW9uKG4pe3JldHVybihuPXp1KG4pKSYmSi50ZXN0KG4pP24ucmVwbGFjZShHLHV0KTpufSxPbi51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgdD0rK2FpO3JldHVybiB6dShuKSt0fSxPbi51cHBlckNhc2U9RmYsT24udXBwZXJGaXJzdD1OZixPbi5lYWNoPXJ1LE9uLmVhY2hSaWdodD1ldSxPbi5maXJzdD1LZSxcblp1KE9uLGZ1bmN0aW9uKCl7dmFyIG49e307cmV0dXJuIEV0KE9uLGZ1bmN0aW9uKHQscil7Y2kuY2FsbChPbi5wcm90b3R5cGUscil8fChuW3JdPXQpfSksbn0oKSx7Y2hhaW46ZmFsc2V9KSxPbi5WRVJTSU9OPVwiNC4xNy40XCIsdShcImJpbmQgYmluZEtleSBjdXJyeSBjdXJyeVJpZ2h0IHBhcnRpYWwgcGFydGlhbFJpZ2h0XCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKG4pe09uW25dLnBsYWNlaG9sZGVyPU9ufSksdShbXCJkcm9wXCIsXCJ0YWtlXCJdLGZ1bmN0aW9uKG4sdCl7TW4ucHJvdG90eXBlW25dPWZ1bmN0aW9uKHIpe3I9cj09PUY/MTpEaShPdShyKSwwKTt2YXIgZT10aGlzLl9fZmlsdGVyZWRfXyYmIXQ/bmV3IE1uKHRoaXMpOnRoaXMuY2xvbmUoKTtyZXR1cm4gZS5fX2ZpbHRlcmVkX18/ZS5fX3Rha2VDb3VudF9fPU1pKHIsZS5fX3Rha2VDb3VudF9fKTplLl9fdmlld3NfXy5wdXNoKHtzaXplOk1pKHIsNDI5NDk2NzI5NSksdHlwZTpuKygwPmUuX19kaXJfXz9cIlJpZ2h0XCI6XCJcIil9KSxlfSxNbi5wcm90b3R5cGVbbitcIlJpZ2h0XCJdPWZ1bmN0aW9uKHQpe1xucmV0dXJuIHRoaXMucmV2ZXJzZSgpW25dKHQpLnJldmVyc2UoKX19KSx1KFtcImZpbHRlclwiLFwibWFwXCIsXCJ0YWtlV2hpbGVcIl0sZnVuY3Rpb24obix0KXt2YXIgcj10KzEsZT0xPT1yfHwzPT1yO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbihuKXt2YXIgdD10aGlzLmNsb25lKCk7cmV0dXJuIHQuX19pdGVyYXRlZXNfXy5wdXNoKHtpdGVyYXRlZTpqZShuLDMpLHR5cGU6cn0pLHQuX19maWx0ZXJlZF9fPXQuX19maWx0ZXJlZF9ffHxlLHR9fSksdShbXCJoZWFkXCIsXCJsYXN0XCJdLGZ1bmN0aW9uKG4sdCl7dmFyIHI9XCJ0YWtlXCIrKHQ/XCJSaWdodFwiOlwiXCIpO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiB0aGlzW3JdKDEpLnZhbHVlKClbMF19fSksdShbXCJpbml0aWFsXCIsXCJ0YWlsXCJdLGZ1bmN0aW9uKG4sdCl7dmFyIHI9XCJkcm9wXCIrKHQ/XCJcIjpcIlJpZ2h0XCIpO01uLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9fZmlsdGVyZWRfXz9uZXcgTW4odGhpcyk6dGhpc1tyXSgxKTtcbn19KSxNbi5wcm90b3R5cGUuY29tcGFjdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmZpbHRlcihOdSl9LE1uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmZpbHRlcihuKS5oZWFkKCl9LE1uLnByb3RvdHlwZS5maW5kTGFzdD1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5yZXZlcnNlKCkuZmluZChuKX0sTW4ucHJvdG90eXBlLmludm9rZU1hcD1scihmdW5jdGlvbihuLHQpe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP25ldyBNbih0aGlzKTp0aGlzLm1hcChmdW5jdGlvbihyKXtyZXR1cm4gRHQocixuLHQpfSl9KSxNbi5wcm90b3R5cGUucmVqZWN0PWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmZpbHRlcihzdShqZShuKSkpfSxNbi5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24obix0KXtuPU91KG4pO3ZhciByPXRoaXM7cmV0dXJuIHIuX19maWx0ZXJlZF9fJiYoMDxufHwwPnQpP25ldyBNbihyKTooMD5uP3I9ci50YWtlUmlnaHQoLW4pOm4mJihyPXIuZHJvcChuKSksXG50IT09RiYmKHQ9T3UodCkscj0wPnQ/ci5kcm9wUmlnaHQoLXQpOnIudGFrZSh0LW4pKSxyKX0sTW4ucHJvdG90eXBlLnRha2VSaWdodFdoaWxlPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLnJldmVyc2UoKS50YWtlV2hpbGUobikucmV2ZXJzZSgpfSxNbi5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRha2UoNDI5NDk2NzI5NSl9LEV0KE1uLnByb3RvdHlwZSxmdW5jdGlvbihuLHQpe3ZhciByPS9eKD86ZmlsdGVyfGZpbmR8bWFwfHJlamVjdCl8V2hpbGUkLy50ZXN0KHQpLGU9L14oPzpoZWFkfGxhc3QpJC8udGVzdCh0KSx1PU9uW2U/XCJ0YWtlXCIrKFwibGFzdFwiPT10P1wiUmlnaHRcIjpcIlwiKTp0XSxpPWV8fC9eZmluZC8udGVzdCh0KTt1JiYoT24ucHJvdG90eXBlW3RdPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChuKXtyZXR1cm4gbj11LmFwcGx5KE9uLHMoW25dLGYpKSxlJiZoP25bMF06bn12YXIgbz10aGlzLl9fd3JhcHBlZF9fLGY9ZT9bMV06YXJndW1lbnRzLGM9byBpbnN0YW5jZW9mIE1uLGE9ZlswXSxsPWN8fGFmKG8pO1xubCYmciYmdHlwZW9mIGE9PVwiZnVuY3Rpb25cIiYmMSE9YS5sZW5ndGgmJihjPWw9ZmFsc2UpO3ZhciBoPXRoaXMuX19jaGFpbl9fLHA9ISF0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCxhPWkmJiFoLGM9YyYmIXA7cmV0dXJuIWkmJmw/KG89Yz9vOm5ldyBNbih0aGlzKSxvPW4uYXBwbHkobyxmKSxvLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6bnUsYXJnczpbdF0sdGhpc0FyZzpGfSksbmV3IHpuKG8saCkpOmEmJmM/bi5hcHBseSh0aGlzLGYpOihvPXRoaXMudGhydSh0KSxhP2U/by52YWx1ZSgpWzBdOm8udmFsdWUoKTpvKX0pfSksdShcInBvcCBwdXNoIHNoaWZ0IHNvcnQgc3BsaWNlIHVuc2hpZnRcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24obil7dmFyIHQ9dWlbbl0scj0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3Qobik/XCJ0YXBcIjpcInRocnVcIixlPS9eKD86cG9wfHNoaWZ0KSQvLnRlc3Qobik7T24ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO2lmKGUmJiF0aGlzLl9fY2hhaW5fXyl7XG52YXIgdT10aGlzLnZhbHVlKCk7cmV0dXJuIHQuYXBwbHkoYWYodSk/dTpbXSxuKX1yZXR1cm4gdGhpc1tyXShmdW5jdGlvbihyKXtyZXR1cm4gdC5hcHBseShhZihyKT9yOltdLG4pfSl9fSksRXQoTW4ucHJvdG90eXBlLGZ1bmN0aW9uKG4sdCl7dmFyIHI9T25bdF07aWYocil7dmFyIGU9ci5uYW1lK1wiXCI7KEppW2VdfHwoSmlbZV09W10pKS5wdXNoKHtuYW1lOnQsZnVuYzpyfSl9fSksSmlbWHIoRiwyKS5uYW1lXT1be25hbWU6XCJ3cmFwcGVyXCIsZnVuYzpGfV0sTW4ucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7dmFyIG49bmV3IE1uKHRoaXMuX193cmFwcGVkX18pO3JldHVybiBuLl9fYWN0aW9uc19fPU1yKHRoaXMuX19hY3Rpb25zX18pLG4uX19kaXJfXz10aGlzLl9fZGlyX18sbi5fX2ZpbHRlcmVkX189dGhpcy5fX2ZpbHRlcmVkX18sbi5fX2l0ZXJhdGVlc19fPU1yKHRoaXMuX19pdGVyYXRlZXNfXyksbi5fX3Rha2VDb3VudF9fPXRoaXMuX190YWtlQ291bnRfXyxuLl9fdmlld3NfXz1Ncih0aGlzLl9fdmlld3NfXyksXG5ufSxNbi5wcm90b3R5cGUucmV2ZXJzZT1mdW5jdGlvbigpe2lmKHRoaXMuX19maWx0ZXJlZF9fKXt2YXIgbj1uZXcgTW4odGhpcyk7bi5fX2Rpcl9fPS0xLG4uX19maWx0ZXJlZF9fPXRydWV9ZWxzZSBuPXRoaXMuY2xvbmUoKSxuLl9fZGlyX18qPS0xO3JldHVybiBufSxNbi5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXt2YXIgbix0PXRoaXMuX193cmFwcGVkX18udmFsdWUoKSxyPXRoaXMuX19kaXJfXyxlPWFmKHQpLHU9MD5yLGk9ZT90Lmxlbmd0aDowO249aTtmb3IodmFyIG89dGhpcy5fX3ZpZXdzX18sZj0wLGM9LTEsYT1vLmxlbmd0aDsrK2M8YTspe3ZhciBsPW9bY10scz1sLnNpemU7c3dpdGNoKGwudHlwZSl7Y2FzZVwiZHJvcFwiOmYrPXM7YnJlYWs7Y2FzZVwiZHJvcFJpZ2h0XCI6bi09czticmVhaztjYXNlXCJ0YWtlXCI6bj1NaShuLGYrcyk7YnJlYWs7Y2FzZVwidGFrZVJpZ2h0XCI6Zj1EaShmLG4tcyl9fWlmKG49e3N0YXJ0OmYsZW5kOm59LG89bi5zdGFydCxmPW4uZW5kLG49Zi1vLFxubz11P2Y6by0xLGY9dGhpcy5fX2l0ZXJhdGVlc19fLGM9Zi5sZW5ndGgsYT0wLGw9TWkobix0aGlzLl9fdGFrZUNvdW50X18pLCFlfHwhdSYmaT09biYmbD09bilyZXR1cm4ga3IodCx0aGlzLl9fYWN0aW9uc19fKTtlPVtdO246Zm9yKDtuLS0mJmE8bDspe2ZvcihvKz1yLHU9LTEsaT10W29dOysrdTxjOyl7dmFyIGg9Zlt1XSxzPWgudHlwZSxoPSgwLGguaXRlcmF0ZWUpKGkpO2lmKDI9PXMpaT1oO2Vsc2UgaWYoIWgpe2lmKDE9PXMpY29udGludWUgbjticmVhayBufX1lW2ErK109aX1yZXR1cm4gZX0sT24ucHJvdG90eXBlLmF0PUZvLE9uLnByb3RvdHlwZS5jaGFpbj1mdW5jdGlvbigpe3JldHVybiBYZSh0aGlzKX0sT24ucHJvdG90eXBlLmNvbW1pdD1mdW5jdGlvbigpe3JldHVybiBuZXcgem4odGhpcy52YWx1ZSgpLHRoaXMuX19jaGFpbl9fKX0sT24ucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXt0aGlzLl9fdmFsdWVzX189PT1GJiYodGhpcy5fX3ZhbHVlc19fPWt1KHRoaXMudmFsdWUoKSkpO1xudmFyIG49dGhpcy5fX2luZGV4X18+PXRoaXMuX192YWx1ZXNfXy5sZW5ndGg7cmV0dXJue2RvbmU6bix2YWx1ZTpuP0Y6dGhpcy5fX3ZhbHVlc19fW3RoaXMuX19pbmRleF9fKytdfX0sT24ucHJvdG90eXBlLnBsYW50PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxyPXRoaXM7ciBpbnN0YW5jZW9mIFNuOyl7dmFyIGU9UGUocik7ZS5fX2luZGV4X189MCxlLl9fdmFsdWVzX189Rix0P3UuX193cmFwcGVkX189ZTp0PWU7dmFyIHU9ZSxyPXIuX193cmFwcGVkX199cmV0dXJuIHUuX193cmFwcGVkX189bix0fSxPbi5wcm90b3R5cGUucmV2ZXJzZT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX193cmFwcGVkX187cmV0dXJuIG4gaW5zdGFuY2VvZiBNbj8odGhpcy5fX2FjdGlvbnNfXy5sZW5ndGgmJihuPW5ldyBNbih0aGlzKSksbj1uLnJldmVyc2UoKSxuLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6bnUsYXJnczpbSmVdLHRoaXNBcmc6Rn0pLG5ldyB6bihuLHRoaXMuX19jaGFpbl9fKSk6dGhpcy50aHJ1KEplKTtcbn0sT24ucHJvdG90eXBlLnRvSlNPTj1Pbi5wcm90b3R5cGUudmFsdWVPZj1Pbi5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4ga3IodGhpcy5fX3dyYXBwZWRfXyx0aGlzLl9fYWN0aW9uc19fKX0sT24ucHJvdG90eXBlLmZpcnN0PU9uLnByb3RvdHlwZS5oZWFkLEFpJiYoT24ucHJvdG90eXBlW0FpXT10dSksT259KCk7dHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgZGVmaW5lLmFtZD09XCJvYmplY3RcIiYmZGVmaW5lLmFtZD8oWm4uXz1pdCwgZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGl0fSkpOlZuPygoVm4uZXhwb3J0cz1pdCkuXz1pdCxxbi5fPWl0KTpabi5fPWl0fSkuY2FsbCh0aGlzKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2xvZGFzaC9sb2Rhc2gubWluLmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcykge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcblx0Z2V0RGFpbHlDYXAsXG5cdGdldFNpbmdsZUZhcmUsXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IG95c3RlckRheVRvdGFscyBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5cbi8vVE8gRE9cbi8vT2ZmIHBlYWsgdnMgb24gcGVhayBzaW5nbGVzIChlc3AgaW5jbHVkaW5nIG91dCBvZiB6b25lIDEgdG8gem9uZSAxIGluIGV2ZW5pbmcgaXMgb2ZmcGVhayBleGNlcHRpb24pXG4vL09mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy9wb3NzaWJpbGl0eSBvZiBhbHRlcmluZyBveXN0ZXIgc28gcmVmbGVjdHMgb2ZmIHBlYWsgLS0gdGhlbiBjb3VsZCBhZGQgIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXIgYW5kIDEtOCAgem9uZXMgb3IgdG8gOSB3aXRob3V0IHdhdGZvcmRcbi8vQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcbi8vTkIgV2Vla2x5IGNhcHBpbmcgaXMgYWx3YXlzIGFueXRpbWUgJiBkYWlseSBjYXBwaW5nIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxXG5cbmdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHN0YXRpb25zKSB7XG5cdGdldFNpbmdsZUpvdXJuZXlab25lcygnMTAwMDAyOScsICcxMDAwMTM4Jywgc3RhdGlvbnMpLnRoZW4oKHJlc3ApID0+IHtcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwKTtcblx0fSk7XG59KTtcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcbiAgbGV0IHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG4gIGxldCBkYWlseUNhcHMgPSBmYXJlRGF0YS5kYWlseUNhcHM7XG5cbiAgY29uc3Qgam91cm5leXMgPSBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH1cbiAgXTtcblxuICAvLyBPYmplY3Qua2V5cyhyZXNwb25zZS5kYWlseUNhcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAvLyAgIGtleS5zcGxpdCgnLScpO1xuICAvL1xuICAvLyAgIFsxLCAyXVxuICAvLyB9KTtcblxuICAvLyBtaW5UcmF2ZWxDYXJkXG4gIC8vIG1heFRyYXZlbENhcmRcblxuXHQvL09ZU1RFUiBEQUlMWSBDQVBTXG4gIC8vTmVlZCB0byBiZSBzZW1pIGdsb2JhbCB0byB1cGRhdGVcbiAgY29uc29sZS5sb2cob3lzdGVyRGF5VG90YWxzKHtqb3VybmV5cywgc2luZ2xlRmFyZXMsIGRhaWx5Q2Fwc30pKTtcbiAgLy8gY29uc29sZS5sb2cob3lzdGVyRGF5VG90YWxzKGpvdXJuZXlzLCBzaW5nbGVGYXJlcywgZGFpbHlDYXBzKSk7XG5cblx0Ly9veUN1bVRvdGFsIGlzIHRoZSBmaW5hbCBveXN0ZXIgZGFpbHkgZmFyZSBjYWxjdWxhdGVkOlxuXG5cbiAgLy8gT1lTVEVSIFdFRUtMWVxuLy8gT3lzdGVyIGRlYWxzIHdpdGggd2hvbGUgam91cm5leXMgd2hlbiBtaXhpbmcgZGFpbHkgY2FwIGFuZCB3ZWVrbHkgLSBjdXRzIG9mZiB3ZWVrbHkgcGFydCBidXQgbm90IGRhaWx5ICYgY3VtIHRvdGFsIGNhbGNcblxuLy8gRm9yIGVhY2ggcG9zc2libGUgd2Vla2x5IGNhcDpcblxuLy8gVG8gZ2VuZXJhdGUgcG9zc2libGUgd2Vla2x5IGNhcHMgKCEgcmVtZW1iZXIgdG8gZG8gd2l0aG91dCBhbnkgd2Vla2x5IGNhcHMgdG9vKVxuLy8gdmFyIHBvc3NXZWVrbHlDb21ib3MgPVtdO1xuLy8gZm9yIChtID0gMSwgbSA8IDcsIG0rKykge1xuLy8gICBmb3IgKHggPSAyLCB4IDwgNywgeCsrKSB7XG4gIC8vICAgIHBvc3NXZWVrbHlDb21ib3MucHVzaChbbSwgeF0pO1xuLy8gICB9XG4gIC8vIH07XG5cbiAgLy8gW1sxLDNdLCBbMSwyXV1cblxuLy9cbi8vXG4vL1xuLy9cbi8vICAgbGV0IG1heFpvbmVTb0ZhciA9IG51bGw7XG4vLyAgIGxldCBveUN1bVRvdGFsID0gMDtcbi8vICAgam91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7IC8vQU5EIEZPUiBFQUNIIERBWVxuLy8gICAgIGxldCBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZSh7bWluU2luZ2xlLCBtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmR9LCBzaW5nbGVGYXJlcyk7IC8vT0ZGIFBFQUsgT1IgT04gUEVBS1xuLy8gICAgIC8vYWRkcyB0aGUgc2luZ2xlIGZhcmUgdG8gdGhlIGN1bXVsYXRpdmUgdG90YWxcbi8vICAgICBveUN1bVBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuLy8gICAgIG95Q3VtT2ZmVG90YWwgKz0gc2luZ2xlRmFyZTtcbi8vICAgICAvL1NJTkdMRSBGQVJFXG4vLyAvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxsIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcbi8vICAgICBtYXhab25lU29GYXIgPSBtYXhOdW0oW10uY29uY2F0KGpvdXJuZXkuem9uZXMsIG1heFpvbmVTb0ZhcikpO1xuLy8gICAgIGlmICgobWF4Wm9uZVNvRmFyIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhab25lU29GYXIgPj0gKG1pblRyYXZlbGNhcmQg4oCTIDEpKSkge1xuLy8gICAgICAgbGV0IHpvbmVEYWlseSA9IG1pblRyYXZlbGNhcmQgLTE7IC8vKGllIG9ubHkgY29tcGFyZXMgYWdhaW5zdCBkYWlseSBjYXAgb2YgbWluU2luZ2xlIHRvIHpvbmVEYWlseSAtIHJlbW92ZXMgb3ZlcmxhcCB3aXRoIHdlZWtseSlcbi8vICAgICB9IGVsc2Vcbi8vICAgICBsZXQgem9uZURhaWx5ID0gbWF4Wm9uZVNvRmFyO1xuLy8gICAgIH1cbi8vXG4vLyBUSEUgUkVTVCBPRiBUSElTIElTIEJBU0lDQUxMWSBBIERVUExJQ0FURSBPRiBUSEUgREFJTFkgRk9STVVMQVxuLy8gICBpZiBPRkYgcGVhayB0cmF2ZWwgYW5kIHRoZSBPRkYgUEVBSyBkYWlseSBjYXAgZm9yIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuLy8gICBpZiAoIWpvdXJuZXkucGVhayAmJiBveUN1bU9mZlRvdGFsID49IGdldERhaWx5Q2FwKHpvbmVEYWlseSwgZGFpbHlDYXBzKSkge1xuLy8gICAgIG95Q3VtT2ZmVG90YWwgPSBnZXREYWlseUNhcCh6b25lRGFpbHksIGRhaWx5Q2Fwcyk7IC8vYW5kIHNldCBhbiBhbGVydCB0byBzYXkgb2ZmIGRhaWx5IGNhcCByZWFjaGVkPz8/PyEhISAoYnV0IGNvdWxkIGJlIG92ZXJyaWRkZW4gYWZ0ZXIpXG4vLyAgIH1cbi8vICAgLy9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG4vLyAgIGlmIChveUN1bVBlYWtUb3RhbCA+PSBnZXREYWlseUNhcCh6b25lRGFpbHksIGRhaWx5Q2FwcykpIHtcbi8vICAgICBveUN1bVBlYWtUb3RhbCA9IGdldERhaWx5Q2FwKHpvbmVEYWlseSwgZGFpbHlDYXBzKTtcbi8vICAgfVxuLy8gICBveUN1bVRvdGFsICs9IG1pbk51bShbb3lDdW1QZWFrVG90YWwsIG95Q3VtT2ZmVG90YWxdKTtcbi8vIH0pO1xuLy8gb3lDdW1Ub3RhbCBpcyB0aGUgZmluYWwgb3lzdGVyIGRhaWx5IGZhcmUgY2FsY3VsYXRlZCBmb3IgZWFjaCBkYXkgd2l0aCBhIHdlZWtseSBjYXAuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vIE9ZU1RFUlxuICAvLyBGb3IgZGFpbHkgY2FwcGluZzogdXNlIHRoZSBmb3JtdWxhIGFib3ZlIGZvciB0aGUgZGFpbHkgY2FwcGluZy5cblx0Ly8gT3lzdGVyIGRlYWxzIHdpdGggd2hvbGUgam91cm5leXMgd2hlbiBtaXhpbmcgZGFpbHkgY2FwIGFuZCB3ZWVrbHkgLSBjdXRzIG9mZiB3ZWVrbHkgcGFydCBidXQgbm90IGRhaWx5ICYgY3VtIHRvdGFsIGNhbGNcblxuXHQvLyBGb3IgZWFjaCBwb3NzaWJsZSB3ZWVrbHkgY2FwOlxuXHQvLyBmb3IgZWFjaCBqb3VybmV5LCB1c2UgZXh0ZW5zaW9uIGZhcmVzIHRvIGNhbGN1bGF0ZSB0aGUgc2luZ2xlIGZhcmUgKG9mZiBwZWFrIG9yIG9uIHBlYWspLlxuXHQvLyBJZiBtYXggem9uZSB0cmF2ZWxsZWQgc28gZmFyIDw9IG1heCB3ZWVrbHkgY2FwICYmIG1heCB6b25lIHNvIGZhciA9PiBtaW4gd2Vla2x5IC0xICwgdGhlbiBzZXQgem9uZSBYIHRvIG1pbiB3ZWVrbHkgLSAxXG4gIC8vIC0tPiAoaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gem9uZSBYIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAvLyAgLS0tLS0+IEVMU0UgKElGIG1heCB6b25lIHNvIGZhciA8IG1pbiB3ZWVrbHkgLSAxIG9yIG1heCB6b25lIHNvIGZhcmUgPiBtYXggd2Vla2x5KSwgc2V0IHpvbmUgWCBhcyBtYXggem9uZSBzbyBmYXJcblx0Ly8gVGhlbiB1c2Ugc2ltaWxhciB0byBkYWlseSBjYXBwaW5nOiBhZGQgdGhpcyBzaW5nbGUgZmFyZSB0byBjdW0gdG90YWwgcGVhayBvciBvZmYgcGVhaywgY29tcGFyZSB0byBkYWlseSBhbnl0aW1lIG9yIG9mZiBwZWFrIGNhcCBvZiBtYXggem9uZSBYIGFuZCBjYXAgd2hlcmUgbmVlZGVkXG5cdC8vTmVlZCBzZXQgYW4gYWxlcnQgZm9yIHdoZW4gcmVhY2ggYSBab25lcyAxLTQgb3IgWm9uZXMgMS02IGRhaWx5IGNhcCwgYnV0IG9ubHkgdHJhdmVsIGF0IG9mZi1wZWFrIHRpbWVzLlxuXG5cdC8vIFRvIGdlbmVyYXRlIHBvc3NpYmxlIHdlZWtseSBjYXBzICghIHJlbWVtYmVyIHRvIGRvIHdpdGhvdXQgYW55IHdlZWtseSBjYXBzIHRvbylcblx0Ly8gdmFyIHBvc3NXZWVrbHlDb21ib3MgPVtdO1xuXHQvLyBmb3IgKG0gPSAxLCBtIDwgNywgbSsrKSB7XG5cdC8vIFx0Zm9yICh4ID0gMiwgeCA8IDcsIHgrKykge1xuICAgLy8gICAgcG9zc1dlZWtseUNvbWJvcy5wdXNoKFttLCB4XSk7XG5cdC8vIFx0fVxuICAvLyB9O1xuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IHdpdGggZGFpbHkgY2Fwc1xuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0bGV0IGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHRsZXQgY29uRmFyZXMgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHRjb25GYXJlcyArPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXkuem9uZXMsIHNpbmdsZUZhcmVzKTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgbGV0IGNvbk1heFpvbmUgPSBtYXhOdW0oZmxhdHRlbihqb3VybmV5cy5tYXAoaiA9PiBqLnpvbmVzKSkpO1xuXHQgZm9yIChsZXQgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG5cdCBcdC8vY29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG5cdCBcdGxldCBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG5cdCBcdCBmb3IgKGxldCB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG5cdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKDEsIGksIGpvdXJuZXlzW3hdWzBdLCBqb3VybmV5c1t4XVsxXSwgc2luZ2xlRmFyZXMpO1xuXHQgXHQgfTtcblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS5cblx0cmV0dXJuIG1pbk51bShjb25BbGxGYXJlcyk7XG5cdC8vdGhpcyByZXR1cm5zIHRoZSBmaW5hbCBjb250YWN0bGVzcyBkYWlseSBmYXJlXG59KTtcblxuLy9DT05UQUNUTEVTU1xuLy9Gb3IganVzdCBkYWlseSBjYXBzIE9SIHdlZWtseSBjYXAgd2l0aG91dCBkYWlseSBjYXA6IHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aG91dCBtYXggZGFpbHlcbi8vRm9yIGNvbWJvIG9mIGRhaWx5IGNhcCBhbmQgd2Vla2x5IGNhcDogdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG1heCBkYWlseSBjYXBcbi8vXG4vLyBPRkYgUEVBSyBEQUlMWSBhbmQgV0VFS0xZOiBGb3Igb2ZmIHBlYWsgZGFpbHkgY2FwIGNvbWJvczogaWYgb2ZmIHBlYWssIHVzZSBleHRlbnNpb24gZmFyZXMgdG8gY2FsY3VsYXRlIHVzaW5nIGJvdGggZGFpbHkgYW5kIHdlZWtseSBjYXBzXG4vLyAtLS0gd2hpbHN0IGlmIHBlYWsgdHJhdmVsIHRoZW4gdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG9ubHkgd2Vla2x5IHRyYXZlbCBjYXJkIGNhcHMgYW5kIGFkZCB0byB0b3RhbFxuLy8gQU5ZVElNRSBEQUlMWSBhbmQgV0VFS0xZOiB1c2UgdGhlIGV4dGVuc2lvbiBmYXJlIHRvIGNhbGN1bGF0ZSBhbGwgZmFyZXMgd2l0aCBkYWlseSBhbnl0aW1lIGNhcCBhbmQgd2Vla2x5IGNhcCAoY3VycmVudCBzZXQgdXApXG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=