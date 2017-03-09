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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["k"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["a"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["c"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["i"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["h"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["d"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return met; });
/* harmony export (immutable) */ __webpack_exports__["f"] = round;
/* harmony export (immutable) */ __webpack_exports__["e"] = types;
/* unused harmony export dualZones */
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

/**
 * Deals with handlnig early/afternoon type journeys (see below) - so can adjust to offpeak or anytime to work out single fare
 * @function
 * @param {type} - the journey type for that: either targeted by b.type in oysterDayTotal or journey.type for contactlessDayTotal
 * @description
 // early type = single fare is off peak but only limited by/counts towards anytime daily cap
// afternoon type = single fare is peak but limited by/counts towards off peak too
 */
function types(type) {
  if (type === 'early') {
    return 'offPeak';
  } else if (type === 'afternoon') {
    return 'anytime';
  } else {
    return type;
  }
}

/**
 * Deals with handlnig early/afternoon type journeys (see below) - so can adjust to offpeak or anytime to work out single fare
 * @function
 * @param {type} - the journey type for that: either targeted by b.type in oysterDayTotal or journey.type for contactlessDayTotal
 * @description
 // early type = single fare is off peak but only limited by/counts towards anytime daily cap
// afternoon type = single fare is peak but limited by/counts towards off peak too
 */
function dualZones(dualZoneOverlap, zones) {
  if (dualZoneOverlap === true && minNum(zones) + 1 >= minTravelcard && maxNum(zones) + 1 <= maxTravelcard) {
    return 0;
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = conDayTotal;
// old

/**
 * Calculates the contactless total fare for the day
 * @function
  * @param { day object} day object containing all the journey objects (that in turn has zones array, dualzones and type (offpeak or anytime))
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description Works out if it is cheapest to have no daily caps, an off peak daily cap + peak fares or an anytime cap (taking into account weekly travelcards passed in)
 */





// If the offpeak cap is met, return a variable 'capIsMet' + maxZone of that cap

// This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
function conDayTotal(day) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;
	var dailyCaps = data.dailyCaps,
	    singleFares = data.singleFares;


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* keysToJourney */])(dailyCaps);
	// gets cheapest daily anytime cap

	var conMin = minTravelcard;
	var conMax = maxTravelcard;

	var cheapestAnytime = allDailyCaps.map(function (cap) {

		var total = day.map(function (journey) {

			//types function deals with early  /afternoon peak/offpeak handling
			var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type);

			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);
			if (maxTravelcard) {
				// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
				// = > then changes dual to dual  stations to min weekly travelcard zone
				// THIS IS DUPLICATED x3 -- refactor
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cap);
				var _conMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);
				var _conDaily = false;
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: conMin,
				maxTravelcard: conMax,
				maxDaily: conDaily,
				zones: journey.zones,
				type: journeyType
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	// need a flag for off peak cap between 1-4, 1-5 or 1-6
	var cheapestOffPeak = allDailyCaps.map(function (cap) {
		var offPeakMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);

		var offPeakDayTotal = day.map(function (journey) {
			var conDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);

			//types function deals with early  /afternoon peak/offpeak handling
			var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			} else {
				var _conMin2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cap);
				var _conMax2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);
				var _conDaily2 = false;
			}
			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
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
			offPeakMaxZone: offPeakMaxZone,
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// for no daily caps
	var cheapestNoCap = day.map(function (journey) {
		//weird off peak
		//types function deals with early  /afternoon peak/offpeak handling
		var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type);

		// fixes dual overlap 
		if (maxTravelcard) {
			if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
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
			type: journeyType
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	});

	// creates an array of the cheapestOffPeak values (out of the object)
	var lToValues = cheapestOffPeak.map(function (lVal) {
		return lVal.value;
	});

	// cheapest value
	var minAll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cheapestAnytime.concat([cheapestNoCap], lToValues));

	// evaluates if any of the cheapestOffPeak values is equal to the cheapest value
	var isEq = cheapestOffPeak.some(function (entry) {
		return entry.value == minAll;
	});

	// if above is met, then find the max cap within the object that matches with the cheapest value
	var capVal;
	if (isEq) {
		capVal = cheapestOffPeak.filter(function (lVal) {
			return lVal.value === minAll;
		});
	}
	// returns an object: the cheapest value, whether off peak cap is met (if so will be the max off peak zone)
	return {
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(minAll, 2),
		capIsMet: isEq ? capVal[0].offPeakMaxZone : false
	};

	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(10);
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
		if (maxTravelcard) {
			if (maxDaily >= minTravelcard - 1) {
				// if no gap zones between max daily and min travelcard
				minTravelcard = 1; // since anytime daily caps always start at zone 1
				maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])([maxDaily, maxTravelcard]); // max travelcard is whichever is largest max daily or max travelcard
				// else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
			} else {
				// IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
				minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
				finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
			}
		}
		debugger;
	}
	if (maxDaily && !maxTravelcard) {
		maxTravelcard = maxDaily;
		minTravelcard = 1;
	}

	// if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
	if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

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

	debugger;
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
	// ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extensionFares__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterDayTotal;
/**
 * Calculates the oyster total fare for the day
 * @function
  * @param {complex journeys object} journeys - has zones array, dualzones and type (offpeak or anytime)
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description is capped by off peak daily cap or peak cap (cumulatively) where necessary
 */





function oysterDayTotal(day) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;
  var dailyCaps = data.dailyCaps,
      singleFares = data.singleFares;


  var dayTotal = day.reduce(function (a, b) {
    var currentTotal = void 0;

    //types function deals with early  /afternoon peak/offpeak handling
    var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(b.type);
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(b.zones, journeyType, singleFares);

    // takes the numbers from the previous loop
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;

    //the maximum zone travelled in so far is updated with current zones
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])([].concat(a.maxZone, b.zones));

    //in preparation for whether off peak daily cap is met or not (to be passed out within capIsMet)
    var offPeakReachedPre = false;
    var offPeakReached = false;
    var offPeakMaxZone = a.offPeakMaxZone;
    var anytimeReached = false;

    // FOR WEEKLY travelcards - ie if the max travelcard has been passed in, so uses extension fares function to calculate single fare
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
        zones: b.zones,
        type: b.type,
        minTravelcard: minTravelcard,
        maxTravelcard: maxTravelcard }, singleFares);

      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }
      //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1;
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // if the current journey made was OFFPEAK (or afternoon which is covered by offpeak)
    if (b.type === 'offPeak' || b.type === 'afternoon') {
      //off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(maxZone, 'offPeak', dailyCaps);
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

      //otherwise for PEAK travel the peak total is updated in preparation for next round
    } else {
      peakTotal += singleFare;
    }

    //if needed current total is totally overridden by anytime daily cap
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      //if anytime daily cap reached, off peak reached will then be set to false via anytimereached (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(maxZone, 'anytime', dailyCaps);
    }

    //currentTotal = minNum([currentTotal, getFare(maxZone, 'anytime', dailyCaps)]);
    return {
      // object is returned to be compared 
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
    // rounds to 2 dp
    value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(dayTotal.currentTotal, 2),
    capIsMet: dayTotal.offPeakReached ? dayTotal.offPeakMaxZone : false
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contactlessDayTotal__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = weekTotal;
/**
 * Calculates the week total (based on parameter oyster or contactless passed as argument)
 * @function
  * @param {function - string} conDayTotal or oysterDayTotal - to calculate using oyster or contactless 
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {object} info - is an object with {
 			options: {object that has minTravelcard: num and maxTravelcard: num}, 
 			data }
 * @returns {number} - total cheapest oyster or contactless fare for that week
 * @description It also deducts the automatic offpeak refunds for zones 4-6 if off peak daily cap is met more than once each week
 		e.g.: 
       const y = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: minNum(weekCap),
          maxTravelcard: maxNum(weekCap),
        },
        data,
      });
 */





//works out the equivalent of no cap
function weekTotal(paymentFunction, days, info) {
	var numOffPeakCapZ4 = 0;
	var numOffPeakCapZ6 = 0;
	var numOffPeakCapZ5 = 0;

	var weekTotalFare = days.map(function (day) {
		//if day is empty with no journeys
		if (day === undefined || day.length === 0) {
			return 0;
		}
		//for each day add together the total day total
		var dayObject = paymentFunction(day, info.options, info.data);
		var dayCapMet = dayObject.capIsMet;

		if (dayCapMet === 4) {
			numOffPeakCapZ4 += 1;
			// What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
		} else if (dayCapMet === 6) {
			numOffPeakCapZ6 += 1;
		} else if (dayCapMet === 5) {
			numOffPeakCapZ5 += 1;
		}

		return dayObject.value;
		//returns the current week total
	}).reduce(function (a, b) {
		return a + b;
	});
	debugger;
	// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if (numOffPeakCapZ4 + numOffPeakCapZ6 + numOffPeakCapZ5 >= 2) {
		weekTotalFare -= numOffPeakCapZ4 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + numOffPeakCapZ6 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + numOffPeakCapZ5 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
		debugger;
	}

	return weekTotalFare;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = oyster;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */






function oyster(days, data) {
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* keysToJourney */])(data.weeklyCaps);

	// if no weekly cap
	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: false,
				maxTravelcard: false
			},
			data: data
		})
	};
	// for each weeky cap
	var capsResultPre = weeklyCaps.map(function (weekCap) {
		var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(weekCap)
			},
			data: data
		});
		//returns object: the weekly cap associated and the week total (with weekly cap added)
		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* journeyToKey */])(weekCap), weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	// returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	return {
		cap: cheapest,
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(allCaps[cheapest], 2)
	};
}

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(4);
/* unused harmony export default */
/**
 * Calculates the contactless total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */






function contactless(days, data) {
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* keysToJourney */])(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(weekCap)
      },
      data: data
    });
    //adds the weekly cap to the week total
    return weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(weekCap, false, data.weeklyCaps);
  });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  var noWeekly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
    options: {
      minTravelcard: false,
      maxTravelcard: false
    },
    data: data
  });

  // returns the cheapest weekly charge on contactless (rounded to 2 dp)
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(final.concat([noWeekly])), 2);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(6);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* minNum */])([singleMin].concat(dualZones));
		}

		return [finalMinZone, finalMaxZone];
	});
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oyster__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_utility__ = __webpack_require__(0);
/* unused harmony export default */



function oysterMonthly(days, data) {
	if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oyster__["a" /* default */])(days, data).cap !== "noCap") {
		var monthly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* getFare */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oyster__["a" /* default */])(days, data).cap], false, data.monthlyCaps);
		var weekly = monthly * 12 / 52;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* round */])(weekly, 2);
	}
};

/***/ }),
/* 10 */
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_oyster__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_contactless__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__partials_weekTotal__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__partials_oysterMonthly__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__partials_oysterDayTotal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__partials_contactlessDayTotal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__partials_contactlessDayTotal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__partials_contactlessDayTotal__);













// TO DO
// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// API HANDLING
// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].fares().then(function (data) {
  var singleFares = data.singleFares;
  var dailyCaps = data.dailyCaps;

  var days = [[{
    zones: [2, 6],
    dualZoneOverlap: true,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 6],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }], [{
    zones: [2, 4],
    dualZoneOverlap: true,
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
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }, {
    zones: [2, 4],
    dualZoneOverlap: false,
    type: "offPeak"
  }]];

  // console.log(
  //   "contactless = " + contactless(days, data)
  // );

  // // final cheapest weekly charge on oyster
  // console.log(
  //   oyster(days, data)
  // );


  // console.log(
  //   weekTotal(conDayTotal, days, {
  //     false,
  //     data,
  //   })
  // );

  // console.log(oysterMonthly(days, data)); 

  // const journey = [
  //     {
  //       zones: [3, 3],
  //       dualZoneOverlap: true,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [3, 3],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [3, 3],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [3, 3],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //         {
  //       zones: [3, 3],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [3, 3],
  //       dualZoneOverlap: false,
  //       type: "anytime",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //      {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },

  //         {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [3, 6],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  // ];
  var journey = [{
    zones: [1, 3],
    dualZoneOverlap: true,
    type: "anytime"
  }];
  //tests for false negatives if anytime is met first and then off peak -- add to test
  //but check the calculations work out
  //   console.log(
  //   conDayTotal(
  //     journey,
  //     {

  //     }, {
  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );

  //       console.log(
  // oysterDayTotal(
  //           journey,
  //         {

  //        }, {

  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])({
    zones: [1, 4],
    minTravelcard: false,
    maxTravelcard: false,
    maxDaily: 1,
    type: 'anytime'
  }, singleFares));
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWE4NDE5NmRkYjE1N2ZlZmEzYmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsInJvdW5kIiwiZGVjaW1hbHMiLCJOdW1iZXIiLCJ0eXBlcyIsImR1YWxab25lcyIsImR1YWxab25lT3ZlcmxhcCIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiY29uRGF5VG90YWwiLCJkYXkiLCJvcHRpb25zIiwiZGF0YSIsImRhaWx5Q2FwcyIsInNpbmdsZUZhcmVzIiwiYWxsRGFpbHlDYXBzIiwiY29uTWluIiwiY29uTWF4IiwiY2hlYXBlc3RBbnl0aW1lIiwidG90YWwiLCJqb3VybmV5VHlwZSIsImNvbkRhaWx5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtYXhEYWlseSIsImNoZWFwZXN0T2ZmUGVhayIsIm9mZlBlYWtNYXhab25lIiwib2ZmUGVha0RheVRvdGFsIiwiY2hlYXBlc3ROb0NhcCIsImxUb1ZhbHVlcyIsImxWYWwiLCJtaW5BbGwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY2FwSXNNZXQiLCJmaW5hbENvbmRpdGlvbiIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pbkNoYXJnZWRab25lIiwic3BsaXRPckZ1bGxGYXJlIiwib3lzdGVyRGF5VG90YWwiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsInNpbmdsZUZhcmUiLCJvZmZQZWFrVG90YWwiLCJwZWFrVG90YWwiLCJtYXhab25lIiwib2ZmUGVha1JlYWNoZWRQcmUiLCJvZmZQZWFrUmVhY2hlZCIsImFueXRpbWVSZWFjaGVkIiwid2Vla1RvdGFsIiwicGF5bWVudEZ1bmN0aW9uIiwiZGF5cyIsImluZm8iLCJudW1PZmZQZWFrQ2FwWjQiLCJudW1PZmZQZWFrQ2FwWjYiLCJudW1PZmZQZWFrQ2FwWjUiLCJ3ZWVrVG90YWxGYXJlIiwidW5kZWZpbmVkIiwiZGF5T2JqZWN0IiwiZGF5Q2FwTWV0IiwiYXV0b09mZlBlYWtSZWZ1bmQiLCJveXN0ZXIiLCJub0NhcFJlc3VsdCIsImNhcHNSZXN1bHRQcmUiLCJ3ZWVrQ2FwIiwid2Vla1RvdGwiLCJhbGxDYXBzIiwiYXNzaWduIiwiY2hlYXBlc3QiLCJmZXRjaEZhcmVEYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb250YWN0bGVzcyIsImZpbmFsIiwibm9XZWVrbHkiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJ6Iiwib3lzdGVyTW9udGhseSIsIm1vbnRobHkiLCJtb250aGx5Q2FwcyIsIndlZWtseSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFD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QUFlLEtBRkk7QUFHbkJDLG1CQUFlLEtBSEk7QUFJbkJlLGNBQVUsQ0FKUztBQUtuQjlCLFVBQU07QUFMYSxHQUFmLEVBTUhxQixXQU5HLENBQVo7QUFRQyxDQW5rQkQsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVhODQxOTZkZGIxNTdmZWZhM2JkIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIFByZWxvYWRzIHN0YXJ0IHpvbmUgYXMgMSBhbmQgY2hhbmdlcyB0byAxLXggZm9yIEpTT04gZmlsZSByZWFkaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHpvbmUgeFxuICogQHJldHVybnMge3N0cmluZ30gLSAnMS14J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuLyoqXG4gKiBUdXJucyBcIjEtMlwiIGludG8gWzEsIDJdXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSAtIGtleTogXCIxLTJcIlxuICogQHJldHVybnMge2FycmF5fSAtIFsxLCAyXVxuICogQGRlc2NyaXB0aW9uIC0gT3Bwb3NpdGUgb2Ygam91cm5leVRvS2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlUb0pvdXJuZXkoa2V5KSB7XG4gIHJldHVybiBrZXkuc3BsaXQoJy0nKS5zb3J0KCkubWFwKG51bSA9PiBwYXJzZUludChudW0pKTtcbn1cblxuLyoqXG4gKiBHZXRzIGtleXMgZnJvbSB3ZWVrbHlDYXBzLCBtYXBzIG92ZXIgdGhlbSB0byBnZW5lcmF0ZSBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3dlZWtseUNhcHN9IC0gdGhlIHdlZWtseUNhcHMgZGF0YSBmcm9tIGZhcmVzLmpzb25cbiAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFycmF5IG9mIGFycmF5cyBbWzEsIDJdLCBbMSwgM10gZXRjXVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0pvdXJuZXkod2Vla2x5Q2Fwcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMod2Vla2x5Q2FwcykubWFwKChjYXApID0+IGtleVRvSm91cm5leShjYXApKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IC0ga2V5IGlzIGFuIGFycmF5IG9mIHR3byB6b25lc1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgaXMgb2ZmUGVhayBvciBhbnl0aW1lLCBvciBub3RoaW5nIGlmIG5vdCBuZWVkZWQgKGUuZy4gZm9yIHdlZWtseSBjYXBzKVxuICogQHBhcmFtIHtkYXRhfSB0aGUgSlNPTiBkYXRhIGZpbGUgd2l0aCBmYXJlIG9iamVjdHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgLyB3ZWVrbHkgY2FwIC8gZGFpbHkgY2FwIGZyb20gZmFyZXMuanNvblxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEZhcmUgPSAoa2V5LCB0eXBlLCBjYXBzKSA9PiB7XG4gIGNvbnN0IGZhcmUgPSBjYXBzW2tleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBqb3VybmV5VG9LZXkoa2V5KSA6IHpvbmVUb0pvdXJuZXkoa2V5KV07XG5cbiAgcmV0dXJuIHR5cGUgPyBmYXJlW3R5cGVdIDogZmFyZTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSAodmFsdWUsIHRhcmdldCkgPT4gdmFsdWUgPj0gdGFyZ2V0O1xuXG4vKipcbiAqIFJvdW5kcyBhIG51bWJlciB0byBob3dldmVyIG1hbnkgZGVjaW1hbCBwbGFjZXMgc3BlY2lmaWVkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRhcmdldCB2YWx1ZSB0byByb3VuZFxuICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxzIC0gdGhlIG51bWJlciBvZiBkZWNpbWFscyByZXN1bHQgc2hvdWxkIGhhdmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIGRlY2ltYWxzKSB7XG7CoMKgwqByZXR1cm4gTnVtYmVyKGAke01hdGgucm91bmQoYCR7dmFsdWV9ZSR7ZGVjaW1hbHN9YCl9ZS0ke2RlY2ltYWxzfWApO1xufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0eXBlcyh0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnZWFybHknKSB7XG4gICAgcmV0dXJuICdvZmZQZWFrJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgIHJldHVybidhbnl0aW1lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdWFsWm9uZXMoZHVhbFpvbmVPdmVybGFwLCB6b25lcykge1xuICBpZiAoZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgKCgobWluTnVtKHpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICgoKG1heE51bSh6b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiLy8gb2xkXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29udGFjdGxlc3MgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHsgZGF5IG9iamVjdH0gZGF5IG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgam91cm5leSBvYmplY3RzICh0aGF0IGluIHR1cm4gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSkpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlICYgY2FwSXNNZXQ6IGlmIG9mZlBlYWsgY2FwIHdhcyBtZXQsIHRoZW4gZGlzcGxheXMgdGhlIG1heCB6b25lIGZvciB0aGUgb2ZmUGVhayBkYWlseSBjYXAsIGVsc2UgZmFsc2UufVxuICogQGRlc2NyaXB0aW9uIFdvcmtzIG91dCBpZiBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIG5vIGRhaWx5IGNhcHMsIGFuIG9mZiBwZWFrIGRhaWx5IGNhcCArIHBlYWsgZmFyZXMgb3IgYW4gYW55dGltZSBjYXAgKHRha2luZyBpbnRvIGFjY291bnQgd2Vla2x5IHRyYXZlbGNhcmRzIHBhc3NlZCBpbilcbiAqL1xuXG4gaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgZmxhdHRlbixcbiAgcm91bmQsXG4gIHR5cGVzLFxuICBkdWFsWm9uZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gSWYgdGhlIG9mZnBlYWsgY2FwIGlzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcblxuLy8gVGhpcyBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgb3Igbm8gZGFpbHkgY2FwIGZvciBlYWNoIGRheSB0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGFueSB3ZWVrbHkgY2FwcyBwYXNzZWQgaW5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblx0ICBjb25zdCB7XG5cdCAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgfSA9IG9wdGlvbnM7XG5cblx0ICBjb25zdCB7XG5cdCAgICBkYWlseUNhcHMsIC8vSlNPTlxuXHQgICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuXHQgIH0gPSBkYXRhO1xuXG5cdGNvbnN0IGFsbERhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGFpbHlDYXBzKTtcblx0Ly8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXG5cdGxldCBjb25NaW4gPSBtaW5UcmF2ZWxjYXJkO1xuXHRsZXQgY29uTWF4ID0gbWF4VHJhdmVsY2FyZDtcblxuXHRjb25zdCBjaGVhcGVzdEFueXRpbWUgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblxuXHRcdGNvbnN0IHRvdGFsID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblxuXHRcdCAgICAvL3R5cGVzIGZ1bmN0aW9uIGRlYWxzIHdpdGggZWFybHkgIC9hZnRlcm5vb24gcGVhay9vZmZwZWFrIGhhbmRsaW5nXG5cdFx0ICAgIGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGpvdXJuZXkudHlwZSk7XG5cblx0XHRcdGxldCBjb25EYWlseSA9IG1heE51bShjYXApO1xuXHRcdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdFx0Ly8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcblx0XHRcdFx0Ly8gPSA+IHRoZW4gY2hhbmdlcyBkdWFsIHRvIGR1YWwgIHN0YXRpb25zIHRvIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lXG5cdFx0XHRcdC8vIFRISVMgSVMgRFVQTElDQVRFRCB4MyAtLSByZWZhY3RvclxuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGNvbk1pbiA9IG1pbk51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uTWF4ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25EYWlseSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogY29uTWF4LFxuXHRcdCBcdFx0bWF4RGFpbHk6IGNvbkRhaWx5LFxuXHRcdCBcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0IFx0XHR0eXBlOiBqb3VybmV5VHlwZSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cdC8vIGZvciBjaGVhcGVzdCBtaXggcGVhayBqb3VybmV5cyArIGVhY2ggZGFpbHkgb2ZmIHBlYWsgY2FwXG5cdC8vIG5lZWQgYSBmbGFnIGZvciBvZmYgcGVhayBjYXAgYmV0d2VlbiAxLTQsIDEtNSBvciAxLTZcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0Y29uc3Qgb2ZmUGVha01heFpvbmUgPSBtYXhOdW0oY2FwKTtcblx0XHRcblx0XHRjb25zdCBvZmZQZWFrRGF5VG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0bGV0IGNvbkRhaWx5ID0gbWF4TnVtKGNhcCk7XG5cblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXHRcdCAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhqb3VybmV5LnR5cGUpO1xuXG5cdFx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGNvbk1pbiA9IG1pbk51bShjYXApO1xuXHRcdFx0XHRsZXQgY29uTWF4ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25EYWlseSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoam91cm5leS50eXBlID09PSAnb2ZmUGVhaycgfHwgam91cm5leS50eXBlID09PSAnYWZ0ZXJub29uJykge1xuXHRcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBjb25NaW4sXG5cdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdCBcdFx0bWF4RGFpbHk6IGNvbkRhaWx5LFxuXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdCBcdFx0dHlwZTogJ29mZlBlYWsnLFxuXHRcdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0IFx0XHR0eXBlOiAnYW55dGltZScsXG5cdFx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH1cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvZmZQZWFrTWF4Wm9uZSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0Ly93ZWlyZCBvZmYgcGVha1xuXHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuICAgXHRcdGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGpvdXJuZXkudHlwZSk7XG5cblx0XHQvLyBmaXhlcyBkdWFsIG92ZXJsYXAgXG5cdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbk1pbiA9IGZhbHNlO1xuXHRcdFx0bGV0IGNvbk1heCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHQgXHRcdG1pblRyYXZlbGNhcmQ6IGNvbk1pbixcblx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IGpvdXJuZXlUeXBlLFxuXHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHQvLyBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIChvdXQgb2YgdGhlIG9iamVjdClcblx0Y29uc3QgbFRvVmFsdWVzID0gY2hlYXBlc3RPZmZQZWFrLm1hcCgobFZhbCkgPT4gbFZhbC52YWx1ZSk7XG5cblx0Ly8gY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgbWluQWxsID0gbWluTnVtKGNoZWFwZXN0QW55dGltZS5jb25jYXQoW2NoZWFwZXN0Tm9DYXBdLCBsVG9WYWx1ZXMpKTtcblxuXHQvLyBldmFsdWF0ZXMgaWYgYW55IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIGlzIGVxdWFsIHRvIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBpc0VxID0gY2hlYXBlc3RPZmZQZWFrLnNvbWUoZW50cnkgPT4ge1xuXHRcdHJldHVybiBlbnRyeS52YWx1ZSA9PSBtaW5BbGw7XG5cdH0pO1xuXG5cdC8vIGlmIGFib3ZlIGlzIG1ldCwgdGhlbiBmaW5kIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHR2YXIgY2FwVmFsO1xuXHRpZiAoaXNFcSkge1xuXHRcdGNhcFZhbCA9IGNoZWFwZXN0T2ZmUGVhay5maWx0ZXIoKGxWYWwpID0+IGxWYWwudmFsdWUgPT09IG1pbkFsbCk7XG5cdH1cblx0Ly8gcmV0dXJucyBhbiBvYmplY3Q6IHRoZSBjaGVhcGVzdCB2YWx1ZSwgd2hldGhlciBvZmYgcGVhayBjYXAgaXMgbWV0IChpZiBzbyB3aWxsIGJlIHRoZSBtYXggb2ZmIHBlYWsgem9uZSlcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogcm91bmQobWluQWxsLCAyKSxcblx0XHRjYXBJc01ldDogaXNFcSA/IGNhcFZhbFswXS5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuXHR9O1xuXG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWF4TnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gXHRGT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG4vLyBcdEZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMob3B0aW9ucyA9IHt9LCBzaW5nbGVGYXJlcykge1xuICBjb25zdCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcbi8vIGJ5IGRlZmF1bHQ6IGp1c3Qgb25lIHRyYXZlbGNhcmQgKHdlZWtseSB3aXRob3V0IGRhaWx5IG9yIGp1c3QgZGFpbHkgY2FwKSBmb3IgZWl0aGVyIG95c3RlciBvciBjb250YWN0bGVzcywgb3Igb3lzdGVyIHdpdGggd2Vla2x5IGNhcCAoZG9lc24ndCBjdXQgb2ZmIGRhaWx5IHNlY3Rpb24gb2YgdGhlIGpvdXJuZXkpXG5cblx0bGV0IHtcblx0XHR6b25lcyxcblx0XHR0eXBlLFxuICAgIFx0bWluVHJhdmVsY2FyZCwgLy8gbWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHQvLyBpZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cdC8vIHNhbWUgYXMgdmFyIG1pblNpbmdsZSA9IG9wdGlvbnMubWluU2luZ2xlO1xuXG4vLyBkZWJ1Z2dlcjtcbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHRpZiAobWF4RGFpbHkpIHsgLy8gSWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8gKGhlbmNlIGFkZGluZyBpbiBtYXhEYWlseSBhcyBhcmd1bWVudF9cblx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0XHQgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdFx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcblx0Ly8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdFx0fSBlbHNlIHsgLy8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVNcblx0XHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZGVidWdnZXI7XG5cdH1cblx0aWYgKG1heERhaWx5ICYmICFtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0bWF4VHJhdmVsY2FyZCA9IG1heERhaWx5O1xuXHRcdG1pblRyYXZlbGNhcmQgPSAxO1xuXHR9XG5cblxuXHQvLyBpZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHQgLy8gZGVidWdnZXI7XG5cdFx0cmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG5cdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIDA7XG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG5cbmRlYnVnZ2VyO1xuICByZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcbi8vIEVMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtjb21wbGV4IGpvdXJuZXlzIG9iamVjdH0gam91cm5leXMgLSBoYXMgem9uZXMgYXJyYXksIGR1YWx6b25lcyBhbmQgdHlwZSAob2ZmcGVhayBvciBhbnl0aW1lKVxuICogQHBhcmFtIHtvcHRpb25zIG9iamVjdCBvZiBtaW5UcmF2ZWxjYXJkOiBudW0sIG1heFRyYXZlbGNhcmQ6IG51bX0gY29uc3Qgb2JqZWN0IC0gbWluVHJhdmVsY2FyZCBhbmQgbWF4VHJhdmVsY2FyZCBcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7b2JqZWN0fSAtIG9iamVjdCBjb250YWluaW5nIHt2YWx1ZTogcmV0dXJucyB0aGUgdG90YWwgZmFyZSAmIGNhcElzTWV0OiBpZiBvZmZQZWFrIGNhcCB3YXMgbWV0LCB0aGVuIGRpc3BsYXlzIHRoZSBtYXggem9uZSBmb3IgdGhlIG9mZlBlYWsgZGFpbHkgY2FwLCBlbHNlIGZhbHNlLn1cbiAqIEBkZXNjcmlwdGlvbiBpcyBjYXBwZWQgYnkgb2ZmIHBlYWsgZGFpbHkgY2FwIG9yIHBlYWsgY2FwIChjdW11bGF0aXZlbHkpIHdoZXJlIG5lY2Vzc2FyeVxuICovXG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRGYXJlLFxuICBtZXQsXG4gIHpvbmVUb0pvdXJuZXksXG4gIHJvdW5kLFxuICB0eXBlcyxcbiAgZHVhbFpvbmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcblxuICBjb25zdCBkYXlUb3RhbCA9IGRheS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBsZXQgY3VycmVudFRvdGFsO1xuXG4gICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuICAgIGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGIudHlwZSk7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGpvdXJuZXlUeXBlLCBzaW5nbGVGYXJlcyk7XG5cbiAgICAvLyB0YWtlcyB0aGUgbnVtYmVycyBmcm9tIHRoZSBwcmV2aW91cyBsb29wXG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcblxuICAgIC8vdGhlIG1heGltdW0gem9uZSB0cmF2ZWxsZWQgaW4gc28gZmFyIGlzIHVwZGF0ZWQgd2l0aCBjdXJyZW50IHpvbmVzXG4gICAgbGV0IG1heFpvbmUgPSBtYXhOdW0oW10uY29uY2F0KGEubWF4Wm9uZSwgYi56b25lcykpO1xuXG4gICAgLy9pbiBwcmVwYXJhdGlvbiBmb3Igd2hldGhlciBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG9yIG5vdCAodG8gYmUgcGFzc2VkIG91dCB3aXRoaW4gY2FwSXNNZXQpXG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkUHJlID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtNYXhab25lID0gYS5vZmZQZWFrTWF4Wm9uZTtcbiAgICBsZXQgYW55dGltZVJlYWNoZWQgPSBmYWxzZTtcblxuICAgIC8vIEZPUiBXRUVLTFkgdHJhdmVsY2FyZHMgLSBpZSBpZiB0aGUgbWF4IHRyYXZlbGNhcmQgaGFzIGJlZW4gcGFzc2VkIGluLCBzbyB1c2VzIGV4dGVuc2lvbiBmYXJlcyBmdW5jdGlvbiB0byBjYWxjdWxhdGUgc2luZ2xlIGZhcmVcbiAgICBpZiAobWF4VHJhdmVsY2FyZCkge1xuICAgICAgc2luZ2xlRmFyZSA9IGV4dGVuc2lvbkZhcmVzKHtcbiAgICAgICAgem9uZXM6IGIuem9uZXMsXG4gICAgICAgIHR5cGU6IGIudHlwZSxcbiAgICAgICAgbWluVHJhdmVsY2FyZCxcbiAgICAgICAgbWF4VHJhdmVsY2FyZH0sXG4gICAgICAgIHNpbmdsZUZhcmVzKTtcbiAgICAgIFxuICAgICAgLy8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcbiAgICAgIC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuICAgICAgaWYgKGIuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgICAgICgoKG1pbk51bShiLnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICAgICAoKChtYXhOdW0oYi56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICAgICAgKSB7XG4gICAgICAgIHNpbmdsZUZhcmUgPSAwO1xuICAgICAgfVxuICAgICAgICAvLyhpZSBvbmx5IGNvbXBhcmVzIGFnYWluc3QgZGFpbHkgY2FwIG9mIG1pblNpbmdsZSB0byBtYXhab25lIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAgICAgaWYgKG1pblRyYXZlbGNhcmQgPiAxICYmIG1ldChtYXhUcmF2ZWxjYXJkLCBtYXhab25lKSAmJiBtZXQobWF4Wm9uZSwgbWluVHJhdmVsY2FyZCAtIDEpKSB7XG4gICAgICAgIG1heFpvbmUgPSBtaW5UcmF2ZWxjYXJkIC0gMTsgXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnQgam91cm5leSBtYWRlIHdhcyBPRkZQRUFLIChvciBhZnRlcm5vb24gd2hpY2ggaXMgY292ZXJlZCBieSBvZmZwZWFrKVxuICAgIGlmIChiLnR5cGUgPT09ICdvZmZQZWFrJyB8fCBiLnR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG4gICAgICAvL29mZiBwZWFrIHRvdGFsIGdldHMgdXBkYXRlZCBhbmQgaWYgbmVlZGVkIG92ZXJyaWRkZW4gd2l0aCBvZmZwZWFrIGRhaWx5IGNhcFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBzaW5nbGVGYXJlKSA+PSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKSkge1xuICAgICAgICBvZmZQZWFrUmVhY2hlZFByZSA9IHRydWU7XG4gICAgICAgIG9mZlBlYWtUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2ZmUGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgICB9XG5cbiAgICAgIC8vb2ZmUGVha1RvdGFsID0gbWluTnVtKFtvZmZQZWFrVG90YWwgKyBzaW5nbGVGYXJlLCBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKV0pO1xuXG4gICAgICAvLyBjdXJyZW50IHRvdGFsIGlzIHVwZGF0ZWQgaWYgbmVlZGVkIHRvIGJlIG9mZiBwZWFrIHRvdGFsICsgcHJldmlvdXMgcGVhayB0b3RhbCBmb3Igb2ZmIHBlYWsgdHJhdmVsXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbCkgPD0gY3VycmVudFRvdGFsKSB7XG4gICAgICAgIC8vaWYgdGhpcyBjb25kaXRpb24gYW5kIHRoZSBhYm92ZSBjb25kaXRpb25zIGFyZSBib3RoIG1ldCAoaWUgYSBjdXJyZW50IG9yIHByZXZpb3Vzb2ZmcGVhayBkYWlseSBjYXAgYXBwbGllZCB0byBjdXJyZW50dG90YWwpLCBzZXQgdHJ1ZVxuICAgICAgICBpZiAob2ZmUGVha1JlYWNoZWRQcmUpIHtcbiAgICAgICAgICBvZmZQZWFrUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgb2ZmUGVha01heFpvbmUgPSBtYXhab25lO1xuICAgICAgICAgIC8vIHJldHVybiB0aGUgbWF4IHpvbmUgZm9yIG9mZiBwZWFrIGNhcFxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRUb3RhbCA9IG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbDtcbiAgICAgIH1cblxuICAgICAgLy9jdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsXSk7XG5cbiAgICAvL290aGVyd2lzZSBmb3IgUEVBSyB0cmF2ZWwgdGhlIHBlYWsgdG90YWwgaXMgdXBkYXRlZCBpbiBwcmVwYXJhdGlvbiBmb3IgbmV4dCByb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICBwZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICB9XG5cbiAgICAvL2lmIG5lZWRlZCBjdXJyZW50IHRvdGFsIGlzIHRvdGFsbHkgb3ZlcnJpZGRlbiBieSBhbnl0aW1lIGRhaWx5IGNhcFxuICAgIGlmIChjdXJyZW50VG90YWwgPiAoZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcykpKSB7XG4gICAgICAvL2lmIGFueXRpbWUgZGFpbHkgY2FwIHJlYWNoZWQsIG9mZiBwZWFrIHJlYWNoZWQgd2lsbCB0aGVuIGJlIHNldCB0byBmYWxzZSB2aWEgYW55dGltZXJlYWNoZWQgKGFzIGFueXRpbWUgYXBwbGllZCBub3Qgb2ZmIHBlYWsgY2FwKVxuICAgICAgYW55dGltZVJlYWNoZWQgPSB0cnVlO1xuICAgICAgY3VycmVudFRvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG4gICAgfVxuXG4gICAgLy9jdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcyldKTtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gb2JqZWN0IGlzIHJldHVybmVkIHRvIGJlIGNvbXBhcmVkIFxuICAgICAgY3VycmVudFRvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgcGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICAgIG9mZlBlYWtNYXhab25lLFxuICAgICAgLy9lbnN1cmVzIHRoYXQgcHJldmlvdXMgb2ZmIHBlYWsgY2FwcyBhcHBsaWVkIHByZXZpb3VzIHRvIGZ1dHVyZSBsb29wcyAtIGlmIHRydWUsIHN0YXlzIHRydWVcbiAgICAgIG9mZlBlYWtSZWFjaGVkOiAoYS5vZmZQZWFrUmVhY2hlZCAmJiAhYW55dGltZVJlYWNoZWQpID8gdHJ1ZSA6IG9mZlBlYWtSZWFjaGVkLFxuICAgIH07XG5cbiAgfSwge1xuICAgIGN1cnJlbnRUb3RhbDogMCxcbiAgICBvZmZQZWFrVG90YWw6IDAsXG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG1heFpvbmU6IG51bGwsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLy8gcm91bmRzIHRvIDIgZHBcbiAgICB2YWx1ZTogcm91bmQoZGF5VG90YWwuY3VycmVudFRvdGFsLCAyKSxcbiAgICBjYXBJc01ldDogZGF5VG90YWwub2ZmUGVha1JlYWNoZWQgPyBkYXlUb3RhbC5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgd2VlayB0b3RhbCAoYmFzZWQgb24gcGFyYW1ldGVyIG95c3RlciBvciBjb250YWN0bGVzcyBwYXNzZWQgYXMgYXJndW1lbnQpXG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2Z1bmN0aW9uIC0gc3RyaW5nfSBjb25EYXlUb3RhbCBvciBveXN0ZXJEYXlUb3RhbCAtIHRvIGNhbGN1bGF0ZSB1c2luZyBveXN0ZXIgb3IgY29udGFjdGxlc3MgXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbmZvIC0gaXMgYW4gb2JqZWN0IHdpdGgge1xuIFx0XHRcdG9wdGlvbnM6IHtvYmplY3QgdGhhdCBoYXMgbWluVHJhdmVsY2FyZDogbnVtIGFuZCBtYXhUcmF2ZWxjYXJkOiBudW19LCBcbiBcdFx0XHRkYXRhIH1cbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdG90YWwgY2hlYXBlc3Qgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIGZhcmUgZm9yIHRoYXQgd2Vla1xuICogQGRlc2NyaXB0aW9uIEl0IGFsc28gZGVkdWN0cyB0aGUgYXV0b21hdGljIG9mZnBlYWsgcmVmdW5kcyBmb3Igem9uZXMgNC02IGlmIG9mZiBwZWFrIGRhaWx5IGNhcCBpcyBtZXQgbW9yZSB0aGFuIG9uY2UgZWFjaCB3ZWVrXG4gXHRcdGUuZy46IFxuICAgICAgIGNvbnN0IHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAqL1xuIGltcG9ydCB7XG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vd29ya3Mgb3V0IHRoZSBlcXVpdmFsZW50IG9mIG5vIGNhcFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Vla1RvdGFsKHBheW1lbnRGdW5jdGlvbiwgZGF5cywgaW5mbykge1xuXHRsZXQgbnVtT2ZmUGVha0NhcFo0ID0gMDtcblx0bGV0IG51bU9mZlBlYWtDYXBaNiA9IDA7XG5cdGxldCBudW1PZmZQZWFrQ2FwWjUgPSAwO1xuXG5cdGxldCB3ZWVrVG90YWxGYXJlID0gZGF5cy5tYXAoZnVuY3Rpb24gKGRheSkgeyBcblx0XHQvL2lmIGRheSBpcyBlbXB0eSB3aXRoIG5vIGpvdXJuZXlzXG5cdFx0aWYgKGRheSA9PT0gdW5kZWZpbmVkIHx8IGRheS5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0ICBcdC8vZm9yIGVhY2ggZGF5IGFkZCB0b2dldGhlciB0aGUgdG90YWwgZGF5IHRvdGFsXG5cdCAgXHRjb25zdCBkYXlPYmplY3QgPSBwYXltZW50RnVuY3Rpb24oZGF5LCBpbmZvLm9wdGlvbnMsIGluZm8uZGF0YSk7XG5cdCAgXHRjb25zdCBkYXlDYXBNZXQgPSBkYXlPYmplY3QuY2FwSXNNZXQ7XG5cblx0ICBcdGlmIChkYXlDYXBNZXQgPT09IDQpIHtcblx0ICBcdFx0bnVtT2ZmUGVha0NhcFo0ICs9IDE7XG5cdCAgXHQvLyBXaGF0IGFib3V0IHJlZnVuZHMgaWYgdGhlIGNhcCBpcyBiZXR3ZWVuIHpvbmVzIDEtNT8/IGFuZCBpZiBkb2VzIG5vdCBhcHBseSAtIHRoZW4gY2hlYXBlciB0byBkbyBkaXNjb3VudGVkIHpvbmUgMS00IHBsdXMgZXh0ZW5zaW9uIGZhcmVzIHRvIDU/XG5cdCAgXHR9IGVsc2UgaWYgKGRheUNhcE1ldCA9PT0gNikge1xuXHQgIFx0XHRudW1PZmZQZWFrQ2FwWjYgKz0gMTtcblx0ICBcdH0gZWxzZSBpZiAoZGF5Q2FwTWV0ID09PSA1KSB7XG5cdCAgXHRcdG51bU9mZlBlYWtDYXBaNSArPSAxO1xuXHQgIFx0fVxuXG5cblx0IFx0cmV0dXJuIGRheU9iamVjdC52YWx1ZTtcblx0IC8vcmV0dXJucyB0aGUgY3VycmVudCB3ZWVrIHRvdGFsXG5cdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXHRkZWJ1Z2dlcjtcbiAgLy8gd2VlayBmdW5jdGlvbiB0byBzZWUgaWYgb2ZmIHBlYWsgY2FwIG1ldCBhbmQgbWF4IHpvbmUgYmV0d2VlbiA0LTY6IGlmIHRydWUgZm9yIDIrIGEgd2VlaywgYXBwbHkgYSBkaXNjb3VudFxuXHRpZiAoKG51bU9mZlBlYWtDYXBaNCArIG51bU9mZlBlYWtDYXBaNiArIG51bU9mZlBlYWtDYXBaNSkgPj0gMikge1xuXHQgIHdlZWtUb3RhbEZhcmUgLT1cblx0ICBcdChcblx0ICBcdFx0KG51bU9mZlBlYWtDYXBaNCAqIChcblx0ICBcdFx0XHRnZXRGYXJlKFsxLCA0XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0ICBcdFx0KSlcblx0XHQgIFx0KyAobnVtT2ZmUGVha0NhcFo2ICogKFxuXHRcdCAgXHRcdGdldEZhcmUoWzEsIDZdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHRcdCAgXHQpKVxuXHRcdCAgXHQrIChudW1PZmZQZWFrQ2FwWjUgKiAoXG5cdFx0ICBcdFx0Z2V0RmFyZShbMSwgNV0sIGZhbHNlLCBpbmZvLmRhdGEuYXV0b09mZlBlYWtSZWZ1bmQpXG5cdFx0ICBcdCkpXG5cdCAgXHQpO1xuXHQgIFx0ZGVidWdnZXI7XG5cdH1cblxuXHRyZXR1cm4gd2Vla1RvdGFsRmFyZTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIHJvdW5kLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdC8vIGlmIG5vIHdlZWtseSBjYXBcblx0Y29uc3Qgbm9DYXBSZXN1bHQgPSB7XG5cdFx0J25vQ2FwJzogd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuXHRcdFx0XHRtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pXG5cdH07XG5cdC8vIGZvciBlYWNoIHdlZWt5IGNhcFxuXHRjb25zdCBjYXBzUmVzdWx0UHJlID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcblx0XHRjb25zdCB3ZWVrVG90bCA9IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pO1xuXHRcdC8vcmV0dXJucyBvYmplY3Q6IHRoZSB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSB3ZWVrIHRvdGFsICh3aXRoIHdlZWtseSBjYXAgYWRkZWQpXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkod2Vla0NhcCldOiB3ZWVrVG90bCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gcmV0dXJucyBvYmplY3Q6IHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSBjaGVhcGVzdCB3ZWVrbHkgdG90YWwgKHJvdW5kZWQgdG8gMiBkcClcblx0Y29uc3QgYWxsQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIG5vQ2FwUmVzdWx0LCAuLi5jYXBzUmVzdWx0UHJlKTtcblx0Y29uc3QgY2hlYXBlc3QgPSBPYmplY3Qua2V5cyhhbGxDYXBzKS5yZWR1Y2UoKGEsIGIpID0+IGFsbENhcHNbYV0gPCBhbGxDYXBzW2JdID8gYSA6IGIpO1xuXHRcblx0cmV0dXJuIHtcblx0XHRjYXA6IGNoZWFwZXN0LFxuXHRcdHZhbHVlOiByb3VuZCgoYWxsQ2Fwc1tjaGVhcGVzdF0pLCAyKVxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgd2Vla1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIHJvdW5kZWQgdG8gMiBkcFxuICogQGRlc2NyaXB0aW9uIGNhbGN1bGF0ZXMgd2hldGhlciBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIGEgd2Vla2x5IHRyYXZlbGNhcmQgb3Igbm9uZVxuICovXG5cbiBpbXBvcnQge1xuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFjdGxlc3MoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuICAvLyBtYXBzIG92ZXIgYWxsIHRoZSBwb3NzaWJsZSB3ZWVrbHkgY2FwcyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2Ygd2Vla2x5IGNhcCArIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKVxuIFx0Y29uc3QgZmluYWwgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuICAgICAgY29uc3Qgd2Vla1RvdGwgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIC8vYWRkcyB0aGUgd2Vla2x5IGNhcCB0byB0aGUgd2VlayB0b3RhbFxuICAgICAgcmV0dXJuIHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKTtcbiAgICB9KTtcblxuICAvLyBnZXRzIHRoZSBmYXJlIGZvciB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApIHdpdGggbm8gd2Vla2x5IHRyYXZlbGNhcnNcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICB9LFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyByZXR1cm5zIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIGNvbnRhY3RsZXNzIChyb3VuZGVkIHRvIDIgZHApXG4gIHJldHVybiByb3VuZChcbiAgXHRcdChtaW5OdW0oZmluYWwuY29uY2F0KFtub1dlZWtseV0pKSksIDIpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3MuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsImltcG9ydCBveXN0ZXIgZnJvbSAnLi9fb3lzdGVyJztcbiBpbXBvcnQgeyBnZXRGYXJlLFxuIFx0XHRcdHJvdW5kLCB9IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3Rlck1vbnRobHkoZGF5cywgZGF0YSkge1xuXHRpZiAob3lzdGVyKGRheXMsIGRhdGEpLmNhcCAhPT0gXCJub0NhcFwiKSB7XG5cdFx0Y29uc3QgbW9udGhseSA9IGdldEZhcmUoW295c3RlcihkYXlzLCBkYXRhKS5jYXBdLCBmYWxzZSwgZGF0YS5tb250aGx5Q2Fwcyk7XG5cdFx0Y29uc3Qgd2Vla2x5ID0gKG1vbnRobHkgKiAxMikvNTI7XG5cdFx0cmV0dXJuIHJvdW5kKHdlZWtseSwgMik7XG5cdH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJNb250aGx5LmpzIiwiLyoqXG4gKiBJZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgLSBjYWxjdWxhdGVzIHdoaWNoZXZlciBpcyBjaGVhcGVyOlxuICogXHRlaXRoZXIgdHdvIHNwbGl0IHNpbmdsZXMgb3IgZnVsbCBmYXJlIHdpdGhvdXQgdHJhdmVsY2FyZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IG1pbkNoYXJnZWRab25lIC0gdGhlIG1pbiB6b25lIHRoYXQgd2lsbCBjaGFyZ2UgYmV0d2VlbiB0aGlzIG1pbiBjaGFyZ2FibGUgem9uZSB0byBtaW4gdHJhdmVsY2FyZCAtIDEgKGFzIHNpbmdsZSkgYW5kICBtYXggY2hhcmdlYWJsZSB6b25lICh0byBjaGFyZ2UgYmV3ZWVuIG1heCB0cmF2ZWxjYXJkICsxIHRvIG1heCBjaGFyZ2VhYmxlIHpvbmUpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGNoZWFwZXN0IGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1pbk51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0T3JGdWxsRmFyZShcblx0bWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcblx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcblx0c2luZ2xlRmFyZXMsIHR5cGUpIHtcblx0cmV0dXJuIG1pbk51bShbXG5cdFx0Z2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSxcblx0XHQoZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcykgKyBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcykpXG5cdF0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwiaW1wb3J0IHtcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGZsYXR0ZW4sXG4gIGdldEZhcmUsXG5cdG1ldCxcbiAga2V5c1RvSm91cm5leSxcbn0gZnJvbSAnLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCBnZXRTaW5nbGVKb3VybmV5Wm9uZXMgZnJvbSAnLi9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzJztcbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcyc7XG5pbXBvcnQgb3lzdGVyIGZyb20gJy4vcGFydGlhbHMvX295c3Rlcic7XG5pbXBvcnQgY29udGFjdGxlc3MgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3MnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL3BhcnRpYWxzL193ZWVrVG90YWwnO1xuaW1wb3J0IG95c3Rlck1vbnRobHkgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyTW9udGhseSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG4vLyBBZGQgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlclxuLy8gQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gQVBJIEhBTkRMSU5HXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGRhdGEuc2luZ2xlRmFyZXM7XG4gIGxldCBkYWlseUNhcHMgPSBkYXRhLmRhaWx5Q2FwcztcblxuY29uc3QgZGF5cyA9IFtcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgICAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gICAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuIFxuXTtcblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBcImNvbnRhY3RsZXNzID0gXCIgKyBjb250YWN0bGVzcyhkYXlzLCBkYXRhKVxuICAvLyApO1xuXG4gIC8vIC8vIGZpbmFsIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gb3lzdGVyXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIG95c3RlcihkYXlzLCBkYXRhKVxuICAvLyApO1xuXG5cbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gIC8vICAgICBmYWxzZSxcbiAgLy8gICAgIGRhdGEsXG4gIC8vICAgfSlcbiAgLy8gKTtcblxuICAvLyBjb25zb2xlLmxvZyhveXN0ZXJNb250aGx5KGRheXMsIGRhdGEpKTsgXG5cbi8vIGNvbnN0IGpvdXJuZXkgPSBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gXTtcbmNvbnN0IGpvdXJuZXkgPSBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAzXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG5dO1xuLy90ZXN0cyBmb3IgZmFsc2UgbmVnYXRpdmVzIGlmIGFueXRpbWUgaXMgbWV0IGZpcnN0IGFuZCB0aGVuIG9mZiBwZWFrIC0tIGFkZCB0byB0ZXN0XG4vL2J1dCBjaGVjayB0aGUgY2FsY3VsYXRpb25zIHdvcmsgb3V0XG4gIC8vICAgY29uc29sZS5sb2coXG4gIC8vICAgY29uRGF5VG90YWwoXG4gIC8vICAgICBqb3VybmV5LFxuICAvLyAgICAge1xuXG4gIC8vICAgICB9LCB7XG4gIC8vICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgLy8gICAgICAgICBzaW5nbGVGYXJlc1xuICAvLyAgICAgICB9KVxuICAvLyApO1xuXG4vLyAgICAgICBjb25zb2xlLmxvZyhcbi8vIG95c3RlckRheVRvdGFsKFxuLy8gICAgICAgICAgIGpvdXJuZXksXG4vLyAgICAgICAgIHtcblxuLy8gICAgICAgIH0sIHtcbiAgICAgICAgIFxuLy8gICAgICAgICAgIGRhaWx5Q2FwcywgLy9KU09OXG4vLyAgICAgICAgICAgc2luZ2xlRmFyZXNcbi8vICAgICAgICAgfSlcbi8vICAgKTtcblxuY29uc29sZS5sb2coZXh0ZW5zaW9uRmFyZXMoe1xuICAgICAgICB6b25lczogWzEsIDRdLFxuICAgICAgICBtaW5UcmF2ZWxjYXJkOiBmYWxzZSxcbiAgICAgICAgbWF4VHJhdmVsY2FyZDogZmFsc2UsXG4gICAgICAgIG1heERhaWx5OiAxLFxuICAgICAgICB0eXBlOiAnYW55dGltZScsXG4gICAgICB9LCBzaW5nbGVGYXJlcykpO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==