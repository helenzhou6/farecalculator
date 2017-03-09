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
			}
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
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
	var cheapestOffPeak = allDailyCaps.map(function (cap) {
		var offPeakMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);

		var offPeakDayTotal = day.map(function (journey) {

			//types function deals with early  /afternoon peak/offpeak handling
			var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.zones) + 1 <= maxTravelcard) {
					return 0;
				}
			}

			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: minTravelcard, // false if nothing passed in
					maxTravelcard: maxTravelcard, // false if nothing passed in
					maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap),
					zones: journey.zones,
					type: journeyType
				}, singleFares);
			} else {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
					minTravelcard: minTravelcard, // false if nothing passed in
					maxTravelcard: maxTravelcard, // false if nothing passed in
					zones: journey.zones,
					type: journeyType
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
		}
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: minTravelcard,
			maxTravelcard: maxTravelcard,
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
	// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if (numOffPeakCapZ4 + numOffPeakCapZ6 + numOffPeakCapZ5 >= 2) {
		weekTotalFare -= numOffPeakCapZ4 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + numOffPeakCapZ6 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + numOffPeakCapZ5 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTZjNzE2NDYyNjUwYTFlOTUxMzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsInJvdW5kIiwiZGVjaW1hbHMiLCJOdW1iZXIiLCJ0eXBlcyIsImR1YWxab25lcyIsImR1YWxab25lT3ZlcmxhcCIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiY29uRGF5VG90YWwiLCJkYXkiLCJvcHRpb25zIiwiZGF0YSIsImRhaWx5Q2FwcyIsInNpbmdsZUZhcmVzIiwiYWxsRGFpbHlDYXBzIiwiY2hlYXBlc3RBbnl0aW1lIiwidG90YWwiLCJqb3VybmV5VHlwZSIsImNvbkRhaWx5IiwiZXh0ZW5zaW9uRmFyZXMiLCJtYXhEYWlseSIsImNoZWFwZXN0T2ZmUGVhayIsIm9mZlBlYWtNYXhab25lIiwib2ZmUGVha0RheVRvdGFsIiwiY2hlYXBlc3ROb0NhcCIsImxUb1ZhbHVlcyIsImxWYWwiLCJtaW5BbGwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY2FwSXNNZXQiLCJmaW5hbENvbmRpdGlvbiIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pbkNoYXJnZWRab25lIiwic3BsaXRPckZ1bGxGYXJlIiwib3lzdGVyRGF5VG90YWwiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsInNpbmdsZUZhcmUiLCJvZmZQZWFrVG90YWwiLCJwZWFrVG90YWwiLCJtYXhab25lIiwib2ZmUGVha1JlYWNoZWRQcmUiLCJvZmZQZWFrUmVhY2hlZCIsImFueXRpbWVSZWFjaGVkIiwid2Vla1RvdGFsIiwicGF5bWVudEZ1bmN0aW9uIiwiZGF5cyIsImluZm8iLCJudW1PZmZQZWFrQ2FwWjQiLCJudW1PZmZQZWFrQ2FwWjYiLCJudW1PZmZQZWFrQ2FwWjUiLCJ3ZWVrVG90YWxGYXJlIiwidW5kZWZpbmVkIiwiZGF5T2JqZWN0IiwiZGF5Q2FwTWV0IiwiYXV0b09mZlBlYWtSZWZ1bmQiLCJveXN0ZXIiLCJub0NhcFJlc3VsdCIsImNhcHNSZXN1bHRQcmUiLCJ3ZWVrQ2FwIiwid2Vla1RvdGwiLCJhbGxDYXBzIiwiYXNzaWduIiwiY2hlYXBlc3QiLCJmZXRjaEZhcmVEYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb250YWN0bGVzcyIsImZpbmFsIiwibm9XZWVrbHkiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJ6Iiwib3lzdGVyTW9udGhseSIsIm1vbnRobHkiLCJtb250aGx5Q2FwcyIsIndlZWtseSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0QsTUFBVCxFQUFpQkUsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFTQyxJQUFULEVBQWU7QUFDakMsV0FBT0EsS0FBS0MsTUFBTCxLQUFnQkgsR0FBdkI7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU0ksY0FBVCxDQUF3QkMsWUFBeEIsRUFBc0NDLFFBQXRDLEVBQWdEO0FBQzlDLFNBQU9ELGFBQWFFLE1BQWIsQ0FBb0IsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDeEMsV0FBT0gsU0FBU0UsQ0FBVCxFQUFZQyxDQUFaLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTQyxNQUFULENBQWdCQyxVQUFoQixFQUE0QjtBQUNqQyxTQUFPUCxlQUFlTyxVQUFmLEVBQTJCQyxLQUFLQyxHQUFoQyxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsTUFBVCxDQUFnQkgsVUFBaEIsRUFBNEI7QUFDakMsU0FBT1AsZUFBZU8sVUFBZixFQUEyQkMsS0FBS0csR0FBaEMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT08sU0FBU0MsYUFBVCxDQUF1QlIsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCO0FBQ2xDLFNBQU9HLEtBQUtLLEdBQUwsQ0FBU1QsSUFBSUMsQ0FBYixDQUFQO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNTLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQzNCLFNBQU9BLElBQUlaLE1BQUosQ0FBVyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUMvQixXQUFPRCxFQUFFWSxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVEOzs7Ozs7O0FBT08sU0FBU1ksWUFBVCxDQUFzQkMsT0FBdEIsRUFBK0I7QUFDcEMsU0FBT0EsUUFBUUMsSUFBUixHQUFlQyxJQUFmLENBQW9CLEdBQXBCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNDLGFBQVQsQ0FBdUJ2QixJQUF2QixFQUE2QjtBQUNsQyxTQUFPbUIsYUFBYSxDQUFDLENBQUQsRUFBSW5CLElBQUosQ0FBYixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTd0IsWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkI7QUFDaEMsU0FBT0EsSUFBSUMsS0FBSixDQUFVLEdBQVYsRUFBZUwsSUFBZixHQUFzQk0sR0FBdEIsQ0FBMEI7QUFBQSxXQUFPQyxTQUFTOUIsR0FBVCxDQUFQO0FBQUEsR0FBMUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFPLFNBQVMrQixhQUFULENBQXVCQyxVQUF2QixFQUFtQztBQUN4QyxTQUFPQyxPQUFPQyxJQUFQLENBQVlGLFVBQVosRUFBd0JILEdBQXhCLENBQTRCLFVBQUNNLEdBQUQ7QUFBQSxXQUFTVCxhQUFhUyxHQUFiLENBQVQ7QUFBQSxHQUE1QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTyxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ1QsR0FBRCxFQUFNVSxJQUFOLEVBQVlDLElBQVosRUFBcUI7QUFDMUMsTUFBTUMsT0FBT0QsS0FBS1gsSUFBSWEsV0FBSixLQUFvQkMsS0FBcEIsR0FBNEJwQixhQUFhTSxHQUFiLENBQTVCLEdBQWdERixjQUFjRSxHQUFkLENBQXJELENBQWI7O0FBRUEsU0FBT1UsT0FBT0UsS0FBS0YsSUFBTCxDQUFQLEdBQW9CRSxJQUEzQjtBQUNELENBSk07O0FBTVA7Ozs7Ozs7QUFPTyxJQUFNRyxNQUFNLFNBQU5BLEdBQU0sQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSO0FBQUEsU0FBbUJELFNBQVNDLE1BQTVCO0FBQUEsQ0FBWjs7QUFFUDs7Ozs7OztBQU9PLFNBQVNDLEtBQVQsQ0FBZUYsS0FBZixFQUFzQkcsUUFBdEIsRUFBZ0M7QUFDcEMsU0FBT0MsT0FBVW5DLEtBQUtpQyxLQUFMLENBQWNGLEtBQWQsU0FBdUJHLFFBQXZCLENBQVYsVUFBaURBLFFBQWpELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTRSxLQUFULENBQWVYLElBQWYsRUFBcUI7QUFDMUIsTUFBSUEsU0FBUyxPQUFiLEVBQXNCO0FBQ3BCLFdBQU8sU0FBUDtBQUNELEdBRkQsTUFFTyxJQUFJQSxTQUFTLFdBQWIsRUFBMEI7QUFDL0IsV0FBTSxTQUFOO0FBQ0QsR0FGTSxNQUVBO0FBQ0wsV0FBT0EsSUFBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU1ksU0FBVCxDQUFtQkMsZUFBbkIsRUFBb0NwRCxLQUFwQyxFQUEyQztBQUNoRCxNQUFJb0Qsb0JBQW9CLElBQXBCLElBQ0NwQyxPQUFPaEIsS0FBUCxDQUFELEdBQWtCLENBQW5CLElBQXlCcUQsYUFEeEIsSUFFQ3pDLE9BQU9aLEtBQVAsQ0FBRCxHQUFrQixDQUFuQixJQUF5QnNELGFBRjVCLEVBR0k7QUFDRixXQUFPLENBQVA7QUFDRDtBQUNGLEM7Ozs7Ozs7OztBQzVMRDtBQUFBOztBQUVBOzs7Ozs7Ozs7O0FBVUM7O0FBWUQ7O0FBRUE7O0FBRUE7QUFDZSxTQUFTQyxXQUFULENBQXFCQyxHQUFyQixFQUFtRDtBQUFBLEtBQXpCQyxPQUF5Qix1RUFBZixFQUFlO0FBQUEsS0FBWEMsSUFBVyx1RUFBSixFQUFJO0FBQUEsS0FFN0RMLGFBRjZELEdBSTNESSxPQUoyRCxDQUU3REosYUFGNkQ7QUFBQSxLQUc3REMsYUFINkQsR0FJM0RHLE9BSjJELENBRzdESCxhQUg2RDtBQUFBLEtBTzdESyxTQVA2RCxHQVMzREQsSUFUMkQsQ0FPN0RDLFNBUDZEO0FBQUEsS0FRN0RDLFdBUjZELEdBUzNERixJQVQyRCxDQVE3REUsV0FSNkQ7OztBQVdqRSxLQUFNQyxlQUFlLDhGQUFBNUIsQ0FBYzBCLFNBQWQsQ0FBckI7QUFDQTs7QUFFQSxLQUFNRyxrQkFBa0JELGFBQWE5QixHQUFiLENBQWlCLFVBQUNNLEdBQUQsRUFBUzs7QUFFakQsTUFBTTBCLFFBQVFQLElBQUl6QixHQUFKLENBQVEsbUJBQVc7O0FBRTdCO0FBQ0EsT0FBSWlDLGNBQWMsc0ZBQUFkLENBQU0xQixRQUFRZSxJQUFkLENBQWxCOztBQUVILE9BQUkwQixXQUFXLHVGQUFBckQsQ0FBT3lCLEdBQVAsQ0FBZjtBQUNBLE9BQUlpQixhQUFKLEVBQW1CO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFFBQUk5QixRQUFRNEIsZUFBUixLQUE0QixJQUE1QixJQUNBLHVGQUFBcEMsQ0FBT1EsUUFBUXhCLEtBQWYsQ0FBRCxHQUEwQixDQUEzQixJQUFpQ3FELGFBRC9CLElBRUEsdUZBQUF6QyxDQUFPWSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDc0QsYUFGbkMsRUFHRztBQUNGLFlBQU8sQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxVQUFPLHVGQUFBWSxDQUFlO0FBQ3BCYixtQkFBZUEsYUFESztBQUVwQkMsbUJBQWVBLGFBRks7QUFHcEJhLGNBQVVGLFFBSFU7QUFJcEJqRSxXQUFPd0IsUUFBUXhCLEtBSks7QUFLcEJ1QyxVQUFNeUI7QUFMYyxJQUFmLEVBTUhKLFdBTkcsQ0FBUDtBQVFBLEdBekJhLEVBeUJYbkQsTUF6QlcsQ0F5QkosVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsVUFBVUQsSUFBSUMsQ0FBZDtBQUFBLEdBekJJLENBQWQ7O0FBMkJBLFNBQU9vRCxRQUFRLHdGQUFBekIsQ0FBUUQsR0FBUixFQUFhLFNBQWIsRUFBd0JzQixTQUF4QixDQUFmO0FBQ0EsRUE5QnVCLENBQXhCOztBQWdDQTtBQUNBLEtBQU1TLGtCQUFrQlAsYUFBYTlCLEdBQWIsQ0FBaUIsVUFBQ00sR0FBRCxFQUFTO0FBQ2pELE1BQU1nQyxpQkFBaUIsdUZBQUF6RCxDQUFPeUIsR0FBUCxDQUF2Qjs7QUFFQSxNQUFNaUMsa0JBQWtCZCxJQUFJekIsR0FBSixDQUFRLG1CQUFXOztBQUV2QztBQUNBLE9BQUlpQyxjQUFjLHNGQUFBZCxDQUFNMUIsUUFBUWUsSUFBZCxDQUFsQjs7QUFFSCxPQUFJZSxhQUFKLEVBQW1CO0FBQ2xCLFFBQUk5QixRQUFRNEIsZUFBUixLQUE0QixJQUE1QixJQUNBLHVGQUFBcEMsQ0FBT1EsUUFBUXhCLEtBQWYsQ0FBRCxHQUEwQixDQUEzQixJQUFpQ3FELGFBRC9CLElBRUEsdUZBQUF6QyxDQUFPWSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDc0QsYUFGbkMsRUFHRztBQUNGLFlBQU8sQ0FBUDtBQUNBO0FBRUQ7O0FBRUQsT0FBSTlCLFFBQVFlLElBQVIsS0FBaUIsU0FBakIsSUFBOEJmLFFBQVFlLElBQVIsS0FBaUIsV0FBbkQsRUFBZ0U7QUFDL0QsV0FBTyx1RkFBQTJCLENBQWU7QUFDcEJiLG9CQUFlQSxhQURLLEVBQ1M7QUFDN0JDLG9CQUFlQSxhQUZLLEVBRVM7QUFDN0JhLGVBQVUsdUZBQUF2RCxDQUFPeUIsR0FBUCxDQUhVO0FBSXBCckMsWUFBT3dCLFFBQVF4QixLQUpLO0FBS3BCdUMsV0FBTXlCO0FBTGMsS0FBZixFQU1ISixXQU5HLENBQVA7QUFPQSxJQVJELE1BUU87QUFDTixXQUFPLHVGQUFBTSxDQUFlO0FBQ3BCYixvQkFBZUEsYUFESyxFQUNTO0FBQzdCQyxvQkFBZUEsYUFGSyxFQUVTO0FBQzdCdEQsWUFBT3dCLFFBQVF4QixLQUhLO0FBSXBCdUMsV0FBTXlCO0FBSmMsS0FBZixFQUtKSixXQUxJLENBQVA7QUFNQTtBQUNELEdBL0J1QixFQStCckJuRCxNQS9CcUIsQ0ErQmQsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsVUFBVUQsSUFBSUMsQ0FBZDtBQUFBLEdBL0JjLENBQXhCOztBQWlDQSxTQUFPO0FBQ04wRCxpQ0FETTtBQUVOeEIsVUFBT3lCLGtCQUFrQix3RkFBQWhDLENBQVFELEdBQVIsRUFBYSxTQUFiLEVBQXdCc0IsU0FBeEI7QUFGbkIsR0FBUDtBQUlBLEVBeEN1QixDQUF4Qjs7QUEwQ0M7QUFDRCxLQUFNWSxnQkFBZ0JmLElBQUl6QixHQUFKLENBQVEsbUJBQVc7QUFDeEM7QUFDRztBQUNBLE1BQUlpQyxjQUFjLHNGQUFBZCxDQUFNMUIsUUFBUWUsSUFBZCxDQUFsQjs7QUFFSDtBQUNBLE1BQUllLGFBQUosRUFBbUI7QUFDbEIsT0FBSTlCLFFBQVE0QixlQUFSLEtBQTRCLElBQTVCLElBQ0EsdUZBQUFwQyxDQUFPUSxRQUFReEIsS0FBZixDQUFELEdBQTBCLENBQTNCLElBQWlDcUQsYUFEL0IsSUFFQSx1RkFBQXpDLENBQU9ZLFFBQVF4QixLQUFmLENBQUQsR0FBMEIsQ0FBM0IsSUFBaUNzRCxhQUZuQyxFQUdHO0FBQ0YsV0FBTyxDQUFQO0FBQ0E7QUFDRDtBQUNELFNBQU8sdUZBQUFZLENBQWU7QUFDcEJiLGtCQUFlQSxhQURLO0FBRXBCQyxrQkFBZUEsYUFGSztBQUdyQnRELFVBQU93QixRQUFReEIsS0FITTtBQUlyQnVDLFNBQU15QjtBQUplLEdBQWYsRUFLSkosV0FMSSxDQUFQO0FBT0EsRUFyQnFCLEVBcUJuQm5ELE1BckJtQixDQXFCWixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxTQUFVRCxJQUFJQyxDQUFkO0FBQUEsRUFyQlksQ0FBdEI7O0FBdUJBO0FBQ0EsS0FBTTZELFlBQVlKLGdCQUFnQnJDLEdBQWhCLENBQW9CLFVBQUMwQyxJQUFEO0FBQUEsU0FBVUEsS0FBSzVCLEtBQWY7QUFBQSxFQUFwQixDQUFsQjs7QUFFQTtBQUNBLEtBQU02QixTQUFTLHVGQUFBMUQsQ0FBTzhDLGdCQUFnQnhDLE1BQWhCLENBQXVCLENBQUNpRCxhQUFELENBQXZCLEVBQXdDQyxTQUF4QyxDQUFQLENBQWY7O0FBRUE7QUFDQSxLQUFNRyxPQUFPUCxnQkFBZ0JRLElBQWhCLENBQXFCLGlCQUFTO0FBQzFDLFNBQU9DLE1BQU1oQyxLQUFOLElBQWU2QixNQUF0QjtBQUNBLEVBRlksQ0FBYjs7QUFJQTtBQUNBLEtBQUlJLE1BQUo7QUFDQSxLQUFJSCxJQUFKLEVBQVU7QUFDVEcsV0FBU1YsZ0JBQWdCakUsTUFBaEIsQ0FBdUIsVUFBQ3NFLElBQUQ7QUFBQSxVQUFVQSxLQUFLNUIsS0FBTCxLQUFlNkIsTUFBekI7QUFBQSxHQUF2QixDQUFUO0FBQ0E7QUFDRDtBQUNBLFFBQU87QUFDTjdCLFNBQU8sc0ZBQUFFLENBQU0yQixNQUFOLEVBQWMsQ0FBZCxDQUREO0FBRU5LLFlBQVVKLE9BQU9HLE9BQU8sQ0FBUCxFQUFVVCxjQUFqQixHQUFrQztBQUZ0QyxFQUFQOztBQUtBO0FBQ0EsQzs7Ozs7Ozs7OztBQ3JLRDs7QUFLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsU0FBU0gsY0FBVCxHQUFtRDtBQUFBLEtBQTNCVCxPQUEyQix1RUFBakIsRUFBaUI7QUFBQSxLQUFiRyxXQUFhOztBQUNoRSxLQUFNTyxXQUFXVixRQUFRVSxRQUFSLElBQW9CLElBQXJDO0FBQ0Y7O0FBRmtFLEtBS2hFbkUsS0FMZ0UsR0FVN0R5RCxPQVY2RCxDQUtoRXpELEtBTGdFO0FBQUEsS0FNaEV1QyxJQU5nRSxHQVU3RGtCLE9BVjZELENBTWhFbEIsSUFOZ0U7QUFBQSxLQU83RGMsYUFQNkQsR0FVN0RJLE9BVjZELENBTzdESixhQVA2RDtBQUFBLEtBUWhFQyxhQVJnRSxHQVU3REcsT0FWNkQsQ0FRaEVILGFBUmdFO0FBV2pFOztBQUVEOztBQUNFLEtBQUkwQixpQkFBaUIsSUFBckI7QUFDQSxLQUFJQyxZQUFZakYsTUFBTSxDQUFOLENBQWhCO0FBQ0EsS0FBSWtGLFlBQVlsRixNQUFNLENBQU4sQ0FBaEI7QUFDQSxLQUFJbUYsaUJBQWlCRixTQUFyQjs7QUFFRCxLQUFJZCxRQUFKLEVBQWM7QUFBRTtBQUNmLE1BQUliLGFBQUosRUFBbUI7QUFDakIsT0FBSWEsWUFBYWQsZ0JBQWdCLENBQWpDLEVBQXFDO0FBQUU7QUFDdENBLG9CQUFnQixDQUFoQixDQURvQyxDQUNqQjtBQUNsQkMsb0JBQWdCLHVGQUFBMUMsQ0FBTyxDQUFDdUQsUUFBRCxFQUFXYixhQUFYLENBQVAsQ0FBaEIsQ0FGbUMsQ0FFZ0I7QUFDeEQ7QUFDRyxJQUpBLE1BSU07QUFBRTtBQUNSNkIscUJBQW1CRixhQUFhZCxRQUFkLEdBQTBCQSxXQUFXLENBQXJDLEdBQXlDYyxTQUEzRDtBQUNBRCxxQkFBa0JDLGFBQWFkLFFBQWIsSUFBeUJlLGFBQWFmLFFBQXhEO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsS0FBSUEsWUFBWSxDQUFDYixhQUFqQixFQUFnQztBQUMvQkEsa0JBQWdCYSxRQUFoQjtBQUNBZCxrQkFBZ0IsQ0FBaEI7QUFDQTs7QUFHRDtBQUNBLEtBQUs0QixZQUFZNUIsYUFBYixJQUFnQ0EsaUJBQWlCNkIsU0FBakIsSUFBOEJBLGFBQWE1QixhQUEvRSxFQUErRjtBQUM3RjtBQUNELFNBQU8sd0ZBQUFoQixDQUFRLENBQUM2QyxjQUFELEVBQWtCOUIsZ0JBQWdCLENBQWxDLENBQVIsRUFBK0NkLElBQS9DLEVBQXFEcUIsV0FBckQsQ0FBUDs7QUFFRDtBQUNFLEVBTEYsTUFLUSxJQUFLUCxpQkFBaUI0QixTQUFqQixJQUE4QkEsYUFBYTNCLGFBQTVDLElBQStENEIsWUFBWTVCLGFBQS9FLEVBQStGO0FBQ3BHO0FBQ0QsU0FBTyx3RkFBQWhCLENBQVEsQ0FBRWdCLGdCQUFnQixDQUFsQixFQUFzQjRCLFNBQXRCLENBQVIsRUFBMEMzQyxJQUExQyxFQUFnRHFCLFdBQWhELENBQVA7O0FBRUQ7QUFDQyxFQUxNLE1BS0EsSUFBSXFCLFlBQVk1QixhQUFaLElBQTZCNkIsWUFBWTVCLGFBQTdDLEVBQTREO0FBQ2pFO0FBQ0QsU0FBTyx3RkFBQThCLENBQ0pELGNBREksRUFDWUQsU0FEWixFQUVON0IsYUFGTSxFQUVTQyxhQUZULEVBR05NLFdBSE0sRUFHT3JCLElBSFAsQ0FBUDs7QUFLRjtBQUNFLEVBUk0sTUFRQSxJQUFLYyxpQkFBaUI0QixTQUFqQixJQUE4QkEsYUFBYTNCLGFBQTVDLElBQStERCxpQkFBaUI2QixTQUFqQixJQUE4QkEsYUFBYTVCLGFBQTFHLElBQTRIMEIsY0FBaEksRUFBZ0o7QUFDcko7QUFDRCxTQUFPLENBQVA7QUFDRDtBQUNDOztBQUVELFFBQU8sd0ZBQUExQyxDQUFRLENBQUM2QyxjQUFELEVBQWlCRCxTQUFqQixDQUFSLEVBQXFDM0MsSUFBckMsRUFBMkNxQixXQUEzQyxDQUFQO0FBQ0Y7QUFDQyxDOzs7Ozs7Ozs7QUNwRkQ7QUFBQTs7Ozs7Ozs7OztBQVVBOztBQVdBOztBQUVlLFNBQVN5QixjQUFULENBQXdCN0IsR0FBeEIsRUFBc0Q7QUFBQSxNQUF6QkMsT0FBeUIsdUVBQWYsRUFBZTtBQUFBLE1BQVhDLElBQVcsdUVBQUosRUFBSTtBQUFBLE1BR2pFTCxhQUhpRSxHQUsvREksT0FMK0QsQ0FHakVKLGFBSGlFO0FBQUEsTUFJakVDLGFBSmlFLEdBSy9ERyxPQUwrRCxDQUlqRUgsYUFKaUU7QUFBQSxNQVFqRUssU0FSaUUsR0FVL0RELElBVitELENBUWpFQyxTQVJpRTtBQUFBLE1BU2pFQyxXQVRpRSxHQVUvREYsSUFWK0QsQ0FTakVFLFdBVGlFOzs7QUFZbkUsTUFBTTBCLFdBQVc5QixJQUFJL0MsTUFBSixDQUFXLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUMxQyxRQUFJNEUscUJBQUo7O0FBRUE7QUFDQSxRQUFJdkIsY0FBYyxzRkFBQWQsQ0FBTXZDLEVBQUU0QixJQUFSLENBQWxCO0FBQ0EsUUFBSWlELGFBQWEsd0ZBQUFsRCxDQUFRM0IsRUFBRVgsS0FBVixFQUFpQmdFLFdBQWpCLEVBQThCSixXQUE5QixDQUFqQjs7QUFFQTtBQUNBLFFBQUk2QixlQUFlL0UsRUFBRStFLFlBQXJCO0FBQ0EsUUFBSUMsWUFBWWhGLEVBQUVnRixTQUFsQjs7QUFFQTtBQUNBLFFBQUlDLFVBQVUsdUZBQUEvRSxDQUFPLEdBQUdVLE1BQUgsQ0FBVVosRUFBRWlGLE9BQVosRUFBcUJoRixFQUFFWCxLQUF2QixDQUFQLENBQWQ7O0FBRUE7QUFDQSxRQUFJNEYsb0JBQW9CLEtBQXhCO0FBQ0EsUUFBSUMsaUJBQWlCLEtBQXJCO0FBQ0EsUUFBSXhCLGlCQUFpQjNELEVBQUUyRCxjQUF2QjtBQUNBLFFBQUl5QixpQkFBaUIsS0FBckI7O0FBRUE7QUFDQSxRQUFJeEMsYUFBSixFQUFtQjtBQUNqQmtDLG1CQUFhLHVGQUFBdEIsQ0FBZTtBQUMxQmxFLGVBQU9XLEVBQUVYLEtBRGlCO0FBRTFCdUMsY0FBTTVCLEVBQUU0QixJQUZrQjtBQUcxQmMsb0NBSDBCO0FBSTFCQyxvQ0FKMEIsRUFBZixFQUtYTSxXQUxXLENBQWI7O0FBT0E7QUFDQTtBQUNBLFVBQUlqRCxFQUFFeUMsZUFBRixLQUFzQixJQUF0QixJQUNDLHVGQUFBcEMsQ0FBT0wsRUFBRVgsS0FBVCxDQUFELEdBQW9CLENBQXJCLElBQTJCcUQsYUFEMUIsSUFFQyx1RkFBQXpDLENBQU9ELEVBQUVYLEtBQVQsQ0FBRCxHQUFvQixDQUFyQixJQUEyQnNELGFBRjlCLEVBR0k7QUFDRmtDLHFCQUFhLENBQWI7QUFDRDtBQUNDO0FBQ0YsVUFBSW5DLGdCQUFnQixDQUFoQixJQUFxQixvRkFBQVQsQ0FBSVUsYUFBSixFQUFtQnFDLE9BQW5CLENBQXJCLElBQW9ELG9GQUFBL0MsQ0FBSStDLE9BQUosRUFBYXRDLGdCQUFnQixDQUE3QixDQUF4RCxFQUF5RjtBQUN2RnNDLGtCQUFVdEMsZ0JBQWdCLENBQTFCO0FBQ0Q7QUFDRjs7QUFFRGtDLG1CQUFlN0UsRUFBRTZFLFlBQUYsR0FBaUJDLFVBQWhDOztBQUVBO0FBQ0EsUUFBSTdFLEVBQUU0QixJQUFGLEtBQVcsU0FBWCxJQUF3QjVCLEVBQUU0QixJQUFGLEtBQVcsV0FBdkMsRUFBb0Q7QUFDbEQ7QUFDQSxVQUFLa0QsZUFBZUQsVUFBaEIsSUFBK0Isd0ZBQUFsRCxDQUFRcUQsT0FBUixFQUFpQixTQUFqQixFQUE0QmhDLFNBQTVCLENBQW5DLEVBQTJFO0FBQ3pFaUMsNEJBQW9CLElBQXBCO0FBQ0FILHVCQUFlLHdGQUFBbkQsQ0FBUXFELE9BQVIsRUFBaUIsU0FBakIsRUFBNEJoQyxTQUE1QixDQUFmO0FBQ0QsT0FIRCxNQUdPO0FBQ0w4Qix3QkFBZ0JELFVBQWhCO0FBQ0Q7O0FBRUQ7O0FBRUE7QUFDQSxVQUFLQyxlQUFlQyxTQUFoQixJQUE4QkgsWUFBbEMsRUFBZ0Q7QUFDOUM7QUFDQSxZQUFJSyxpQkFBSixFQUF1QjtBQUNyQkMsMkJBQWlCLElBQWpCO0FBQ0F4QiwyQkFBaUJzQixPQUFqQjtBQUNBO0FBQ0Q7QUFDREosdUJBQWVFLGVBQWVDLFNBQTlCO0FBQ0Q7O0FBRUQ7O0FBRUY7QUFDQyxLQXpCRCxNQXlCTztBQUNMQSxtQkFBYUYsVUFBYjtBQUNEOztBQUVEO0FBQ0EsUUFBSUQsZUFBZ0Isd0ZBQUFqRCxDQUFRcUQsT0FBUixFQUFpQixTQUFqQixFQUE0QmhDLFNBQTVCLENBQXBCLEVBQTZEO0FBQzNEO0FBQ0FtQyx1QkFBaUIsSUFBakI7QUFDQVAscUJBQWUsd0ZBQUFqRCxDQUFRcUQsT0FBUixFQUFpQixTQUFqQixFQUE0QmhDLFNBQTVCLENBQWY7QUFDRDs7QUFFRDtBQUNBLFdBQU87QUFDTDtBQUNBNEIsZ0NBRks7QUFHTEUsZ0NBSEs7QUFJTEMsMEJBSks7QUFLTEMsc0JBTEs7QUFNTHRCLG9DQU5LO0FBT0w7QUFDQXdCLHNCQUFpQm5GLEVBQUVtRixjQUFGLElBQW9CLENBQUNDLGNBQXRCLEdBQXdDLElBQXhDLEdBQStDRDtBQVIxRCxLQUFQO0FBV0QsR0E5RmdCLEVBOEZkO0FBQ0ROLGtCQUFjLENBRGI7QUFFREUsa0JBQWMsQ0FGYjtBQUdEQyxlQUFXLENBSFY7QUFJREMsYUFBUztBQUpSLEdBOUZjLENBQWpCOztBQXFHQSxTQUFPO0FBQ0w7QUFDQTlDLFdBQU8sc0ZBQUFFLENBQU11QyxTQUFTQyxZQUFmLEVBQTZCLENBQTdCLENBRkY7QUFHTFIsY0FBVU8sU0FBU08sY0FBVCxHQUEwQlAsU0FBU2pCLGNBQW5DLEdBQW9EO0FBSHpELEdBQVA7QUFLRCxDOzs7Ozs7Ozs7O0FDN0lEO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkM7O0FBSUQ7QUFDQTs7QUFFQTtBQUNlLFNBQVMwQixTQUFULENBQW1CQyxlQUFuQixFQUFvQ0MsSUFBcEMsRUFBMENDLElBQTFDLEVBQWdEO0FBQzlELEtBQUlDLGtCQUFrQixDQUF0QjtBQUNBLEtBQUlDLGtCQUFrQixDQUF0QjtBQUNBLEtBQUlDLGtCQUFrQixDQUF0Qjs7QUFFQSxLQUFJQyxnQkFBZ0JMLEtBQUtsRSxHQUFMLENBQVMsVUFBVXlCLEdBQVYsRUFBZTtBQUMzQztBQUNBLE1BQUlBLFFBQVErQyxTQUFSLElBQXFCL0MsSUFBSW5ELE1BQUosS0FBZSxDQUF4QyxFQUEyQztBQUMxQyxVQUFPLENBQVA7QUFDQTtBQUNDO0FBQ0EsTUFBTW1HLFlBQVlSLGdCQUFnQnhDLEdBQWhCLEVBQXFCMEMsS0FBS3pDLE9BQTFCLEVBQW1DeUMsS0FBS3hDLElBQXhDLENBQWxCO0FBQ0EsTUFBTStDLFlBQVlELFVBQVV6QixRQUE1Qjs7QUFFQSxNQUFJMEIsY0FBYyxDQUFsQixFQUFxQjtBQUNwQk4sc0JBQW1CLENBQW5CO0FBQ0Q7QUFDQyxHQUhELE1BR08sSUFBSU0sY0FBYyxDQUFsQixFQUFxQjtBQUMzQkwsc0JBQW1CLENBQW5CO0FBQ0EsR0FGTSxNQUVBLElBQUlLLGNBQWMsQ0FBbEIsRUFBcUI7QUFDM0JKLHNCQUFtQixDQUFuQjtBQUNBOztBQUVGLFNBQU9HLFVBQVUzRCxLQUFqQjtBQUNEO0FBQ0EsRUFwQm1CLEVBb0JqQnBDLE1BcEJpQixDQW9CVixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxTQUFVRCxJQUFJQyxDQUFkO0FBQUEsRUFwQlUsQ0FBcEI7QUFxQkM7QUFDRCxLQUFLd0Ysa0JBQWtCQyxlQUFsQixHQUFvQ0MsZUFBckMsSUFBeUQsQ0FBN0QsRUFBZ0U7QUFDOURDLG1CQUVHSCxrQkFDQSx3RkFBQTdELENBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFSLEVBQWdCLEtBQWhCLEVBQXVCNEQsS0FBS3hDLElBQUwsQ0FBVWdELGlCQUFqQyxDQURELEdBR0dOLGtCQUNGLHdGQUFBOUQsQ0FBUSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVIsRUFBZ0IsS0FBaEIsRUFBdUI0RCxLQUFLeEMsSUFBTCxDQUFVZ0QsaUJBQWpDLENBSkQsR0FNR0wsa0JBQ0Ysd0ZBQUEvRCxDQUFRLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBUixFQUFnQixLQUFoQixFQUF1QjRELEtBQUt4QyxJQUFMLENBQVVnRCxpQkFBakMsQ0FUSDtBQVlEOztBQUVELFFBQU9KLGFBQVA7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN0RUQ7Ozs7Ozs7OztBQVNDOztBQVNEO0FBQ0E7O0FBRWUsU0FBU0ssTUFBVCxDQUFnQlYsSUFBaEIsRUFBc0J2QyxJQUF0QixFQUE0QjtBQUMxQyxLQUFNeEIsYUFBYSw4RkFBQUQsQ0FBY3lCLEtBQUt4QixVQUFuQixDQUFuQjs7QUFFQTtBQUNBLEtBQU0wRSxjQUFjO0FBQ25CLFdBQVMsa0ZBQUFiLENBQVUsZ0VBQVYsRUFBMEJFLElBQTFCLEVBQWdDO0FBQ3hDeEMsWUFBUztBQUNSSixtQkFBZSxLQURQO0FBRVJDLG1CQUFlO0FBRlAsSUFEK0I7QUFLeENJO0FBTHdDLEdBQWhDO0FBRFUsRUFBcEI7QUFTQTtBQUNBLEtBQU1tRCxnQkFBZ0IzRSxXQUFXSCxHQUFYLENBQWUsVUFBQytFLE9BQUQsRUFBYTtBQUNqRCxNQUFNQyxXQUFXLGtGQUFBaEIsQ0FBVSxnRUFBVixFQUEwQkUsSUFBMUIsRUFBZ0M7QUFDaER4QyxZQUFTO0FBQ1JKLG1CQUFlLHVGQUFBckMsQ0FBTzhGLE9BQVAsQ0FEUDtBQUVSeEQsbUJBQWUsdUZBQUExQyxDQUFPa0csT0FBUDtBQUZQLElBRHVDO0FBS2hEcEQ7QUFMZ0QsR0FBaEMsQ0FBakI7QUFPQTtBQUNBLDZCQUNFLDZGQUFBbkMsQ0FBYXVGLE9BQWIsQ0FERixFQUMwQkMsV0FBVyx3RkFBQXpFLENBQVF3RSxPQUFSLEVBQWlCLEtBQWpCLEVBQXdCcEQsS0FBS3hCLFVBQTdCLENBRHJDO0FBR0EsRUFacUIsQ0FBdEI7O0FBY0E7QUFDQSxLQUFNOEUsVUFBVTdFLE9BQU84RSxNQUFQLGdCQUFjLEVBQWQsRUFBa0JMLFdBQWxCLDRCQUFrQ0MsYUFBbEMsR0FBaEI7QUFDQSxLQUFNSyxXQUFXL0UsT0FBT0MsSUFBUCxDQUFZNEUsT0FBWixFQUFxQnZHLE1BQXJCLENBQTRCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFNBQVVxRyxRQUFRdEcsQ0FBUixJQUFhc0csUUFBUXJHLENBQVIsQ0FBYixHQUEwQkQsQ0FBMUIsR0FBOEJDLENBQXhDO0FBQUEsRUFBNUIsQ0FBakI7O0FBRUEsUUFBTztBQUNOMEIsT0FBSzZFLFFBREM7QUFFTnJFLFNBQU8sc0ZBQUFFLENBQU9pRSxRQUFRRSxRQUFSLENBQVAsRUFBMkIsQ0FBM0I7QUFGRCxFQUFQO0FBSUEsQzs7Ozs7OztBQ3pERDs7O0FBR0EsSUFBSUMsZ0JBQWlCLFlBQVk7QUFDaEMsS0FBSXpELE9BQU8sSUFBWDs7QUFFQSxRQUFPLFlBQVc7QUFDakIsTUFBSUEsSUFBSixFQUFVO0FBQ1QwRCxXQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxVQUFPQyxRQUFRQyxPQUFSLENBQWdCN0QsSUFBaEIsQ0FBUDtBQUNBOztBQUVELFNBQU84RCxNQUFNLGtCQUFOLEVBQTBCQyxJQUExQixDQUErQixVQUFTQyxJQUFULEVBQWU7QUFDcERoRSxVQUFPZ0UsS0FBS0MsSUFBTCxFQUFQO0FBQ0EsVUFBT2pFLElBQVA7QUFDQSxHQUhNLENBQVA7QUFJQSxFQVZEO0FBV0EsQ0Fkb0IsRUFBckI7O0FBZ0JBO0FBQ0EsSUFBSWtFLG9CQUFxQixZQUFXO0FBQ25DLEtBQUlsRSxPQUFPLElBQVg7O0FBRUEsUUFBTyxZQUFXO0FBQ2pCLE1BQUlBLElBQUosRUFBVTtBQUNUMEQsV0FBUUMsR0FBUixDQUFZLHFDQUFaO0FBQ0EsVUFBT0MsUUFBUUMsT0FBUixDQUFnQjdELElBQWhCLENBQVA7QUFDQTs7QUFFRCxTQUFPOEQsTUFBTSxxQkFBTixFQUE2QkMsSUFBN0IsQ0FBa0MsVUFBU0MsSUFBVCxFQUFlO0FBQ3ZEaEUsVUFBT2dFLEtBQUtDLElBQUwsRUFBUDtBQUNBLFVBQU9qRSxJQUFQO0FBQ0EsR0FITSxDQUFQO0FBSUEsRUFWRDtBQVdBLENBZHdCLEVBQXpCOztBQWdCQTtBQUNBLElBQUltRSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFTQyxJQUFULEVBQWVDLEVBQWYsRUFBbUI7QUFDekMsUUFBT1AsTUFBTSxtREFBbURNLElBQW5ELEdBQTBELE1BQTFELEdBQW1FQyxFQUFuRSxHQUF3RSwyREFBOUUsRUFBMklOLElBQTNJLENBQWdKLFVBQVNPLENBQVQsRUFBWTtBQUNsSyxTQUFPQSxFQUFFTCxJQUFGLEVBQVA7QUFDQSxFQUZNLENBQVA7QUFHQSxDQUpEOztBQU1BLHdEQUFlO0FBQ2RNLFFBQU9kLGFBRE87QUFFZHBILFdBQVU2SCxpQkFGSTtBQUdkcEcsVUFBU3FHO0FBSEssQ0FBZixDOzs7Ozs7Ozs7O0FDM0NBO0FBQUE7Ozs7Ozs7OztBQVNDOztBQVFEO0FBQ0E7O0FBRWUsU0FBU0ssV0FBVCxDQUFxQmpDLElBQXJCLEVBQTJCdkMsSUFBM0IsRUFBaUM7QUFDL0MsTUFBTXhCLGFBQWEsOEZBQUFELENBQWN5QixLQUFLeEIsVUFBbkIsQ0FBbkI7QUFDQztBQUNBLE1BQU1pRyxRQUFRakcsV0FBV0gsR0FBWCxDQUFlLFVBQUMrRSxPQUFELEVBQWE7QUFDdEMsUUFBTUMsV0FBVyxrRkFBQWhCLENBQVUscUVBQVYsRUFBdUJFLElBQXZCLEVBQTZCO0FBQzVDeEMsZUFBUztBQUNQSix1QkFBZSx1RkFBQXJDLENBQU84RixPQUFQLENBRFI7QUFFUHhELHVCQUFlLHVGQUFBMUMsQ0FBT2tHLE9BQVA7QUFGUixPQURtQztBQUs1Q3BEO0FBTDRDLEtBQTdCLENBQWpCO0FBT0E7QUFDQSxXQUFPcUQsV0FBVyx3RkFBQXpFLENBQVF3RSxPQUFSLEVBQWlCLEtBQWpCLEVBQXdCcEQsS0FBS3hCLFVBQTdCLENBQWxCO0FBQ0QsR0FWVyxDQUFkOztBQVlBO0FBQ0EsTUFBTWtHLFdBQVcsa0ZBQUFyQyxDQUFVLHFFQUFWLEVBQXVCRSxJQUF2QixFQUE2QjtBQUN4Q3hDLGFBQVM7QUFDUEoscUJBQWUsS0FEUjtBQUVQQyxxQkFBZTtBQUZSLEtBRCtCO0FBSzVDSTtBQUw0QyxHQUE3QixDQUFqQjs7QUFRQTtBQUNBLFNBQU8sc0ZBQUFYLENBQ0osdUZBQUEvQixDQUFPbUgsTUFBTTdHLE1BQU4sQ0FBYSxDQUFDOEcsUUFBRCxDQUFiLENBQVAsQ0FESSxFQUMrQixDQUQvQixDQUFQO0FBRUQsQzs7Ozs7Ozs7O0FDL0NEO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBUWUsU0FBU0MscUJBQVQsQ0FBK0JQLElBQS9CLEVBQXFDQyxFQUFyQyxFQUF5Q2hJLFFBQXpDLEVBQW1EO0FBQ2pFLFFBQU8saUVBQUF1SSxDQUFROUcsT0FBUixDQUFnQnNHLElBQWhCLEVBQXNCQyxFQUF0QixFQUEwQk4sSUFBMUIsQ0FBK0IsVUFBU2pHLE9BQVQsRUFBa0I7QUFDdkQsTUFBSUEsVUFBVUEsUUFBUStHLFFBQVIsQ0FBaUIsQ0FBakIsQ0FBZCxDQUR1RCxDQUNwQjtBQUNuQyxNQUFJQyxPQUFPaEgsUUFBUWdILElBQW5CLENBRnVELENBRTlCOztBQUV6QjtBQUNBLE1BQUlDLFdBQVcsd0ZBQUFySCxDQUFRb0gsS0FBS3pHLEdBQUwsQ0FBUyxVQUFTMkcsR0FBVCxFQUFjO0FBQzdDLE9BQUlDLFlBQVksRUFBaEI7O0FBRUE7QUFDQSxPQUFJRCxJQUFJRSxjQUFKLElBQXNCRixJQUFJRSxjQUFKLENBQW1CQyxRQUE3QyxFQUF1RDtBQUN0REYsY0FBVUcsSUFBVixDQUFlLHlGQUFBakosQ0FBUzZJLElBQUlFLGNBQUosQ0FBbUJDLFFBQTVCLEVBQXNDOUksUUFBdEMsQ0FBZjtBQUNBOztBQUVEO0FBQ0EsT0FBSTJJLElBQUlLLElBQUosQ0FBU0MsVUFBVCxJQUF1Qk4sSUFBSUssSUFBSixDQUFTQyxVQUFULENBQW9CM0ksTUFBcEIsR0FBNkIsQ0FBeEQsRUFBMkQ7QUFDMURxSSxRQUFJSyxJQUFKLENBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQVNDLFNBQVQsRUFBb0I7QUFDL0MsU0FBSUEsVUFBVUMsRUFBZCxFQUFrQjtBQUNqQlIsZ0JBQVVHLElBQVYsQ0FBZSx5RkFBQWpKLENBQVNxSixVQUFVQyxFQUFuQixFQUF1QnBKLFFBQXZCLENBQWY7QUFDQTtBQUNELEtBSkQ7QUFLQTs7QUFFRCxVQUFPNEksU0FBUDtBQUNBLEdBbEJzQixDQUFSLENBQWY7O0FBcUJBO0FBQ0E7QUFDQSxNQUFJUywwQkFBMEIsb0dBQUFuSixDQUFvQixDQUFwQixFQUF1QndJLFFBQXZCLENBQTlCO0FBQ0EsTUFBSVksd0JBQXdCLG9HQUFBcEosQ0FBb0IsQ0FBcEIsRUFBdUJ3SSxRQUF2QixDQUE1QixDQTdCdUQsQ0E2Qk87QUFDOUQsTUFBSWEsZUFBZSxJQUFuQjtBQUNBLE1BQUlDLGVBQWUsSUFBbkI7O0FBRUEsTUFBSUgsd0JBQXdCL0ksTUFBeEIsS0FBbUMsQ0FBdkMsRUFBMEM7QUFBRTtBQUMzQ2lKLGtCQUFlLHVGQUFBdEksQ0FBTyx3RkFBQUksQ0FBUWlJLHFCQUFSLENBQVAsQ0FBZjtBQUNBRSxrQkFBZSx1RkFBQXZJLENBQU8sd0ZBQUFJLENBQVFpSSxxQkFBUixDQUFQLENBQWY7QUFDRDtBQUNDLEdBSkQsTUFJTztBQUNORCw2QkFBMEIsd0ZBQUFoSSxDQUFRLG9HQUFBbkIsQ0FBb0IsQ0FBcEIsRUFBdUJ3SSxRQUF2QixDQUFSLENBQTFCOztBQUdBO0FBQ0EsT0FBSWUsWUFBWSx1RkFBQTVJLENBQU93SSx1QkFBUCxDQUFoQjtBQUNBLE9BQUlLLFlBQVksdUZBQUF6SSxDQUFPb0ksdUJBQVAsQ0FBaEI7O0FBRUE7QUFDQTtBQUNBLE9BQUlqRyxZQUFZa0csc0JBQXNCdEgsR0FBdEIsQ0FBMEIsVUFBUzJILENBQVQsRUFBWTtBQUNyRCxXQUFPQSxFQUFFakosTUFBRixDQUFTLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQzlCLFNBQUlPLGNBQWNSLENBQWQsRUFBaUIrSSxTQUFqQixJQUE4QnZJLGNBQWNQLENBQWQsRUFBaUI4SSxTQUFqQixDQUFsQyxFQUErRDtBQUM5RCxhQUFPL0ksQ0FBUDtBQUNBO0FBQ0QsWUFBT0MsQ0FBUDtBQUNBLEtBTE0sQ0FBUDtBQU1BLElBUGUsQ0FBaEI7O0FBU0E7QUFDQTJJLGtCQUFlLHVGQUFBMUksQ0FBTyxDQUFDNEksU0FBRCxFQUFZbEksTUFBWixDQUFtQjZCLFNBQW5CLENBQVAsQ0FBZjtBQUNBb0csa0JBQWUsdUZBQUF2SSxDQUFPLENBQUN5SSxTQUFELEVBQVluSSxNQUFaLENBQW1CNkIsU0FBbkIsQ0FBUCxDQUFmO0FBQ0E7O0FBRUQsU0FBTyxDQUFDb0csWUFBRCxFQUFlRCxZQUFmLENBQVA7QUFDQSxFQTlETSxDQUFQO0FBK0RBLEM7Ozs7Ozs7Ozs7QUM3RUQ7QUFDQzs7QUFHYyxTQUFTSyxhQUFULENBQXVCMUQsSUFBdkIsRUFBNkJ2QyxJQUE3QixFQUFtQztBQUNqRCxLQUFJLCtFQUFBaUQsQ0FBT1YsSUFBUCxFQUFhdkMsSUFBYixFQUFtQnJCLEdBQW5CLEtBQTJCLE9BQS9CLEVBQXdDO0FBQ3ZDLE1BQU11SCxVQUFVLHdGQUFBdEgsQ0FBUSxDQUFDLCtFQUFBcUUsQ0FBT1YsSUFBUCxFQUFhdkMsSUFBYixFQUFtQnJCLEdBQXBCLENBQVIsRUFBa0MsS0FBbEMsRUFBeUNxQixLQUFLbUcsV0FBOUMsQ0FBaEI7QUFDQSxNQUFNQyxTQUFVRixVQUFVLEVBQVgsR0FBZSxFQUE5QjtBQUNBLFNBQU8sc0ZBQUE3RyxDQUFNK0csTUFBTixFQUFjLENBQWQsQ0FBUDtBQUNBO0FBQ0QsRTs7Ozs7Ozs7QUNWRDtBQUFBOzs7Ozs7Ozs7QUFTQTs7QUFLZSxTQUFTMUUsZUFBVCxDQUNkRCxjQURjLEVBQ0VELFNBREYsRUFFZDdCLGFBRmMsRUFFQ0MsYUFGRCxFQUdkTSxXQUhjLEVBR0RyQixJQUhDLEVBR0s7QUFDbkIsUUFBTyx1RkFBQXZCLENBQU8sQ0FDYix3RkFBQXNCLENBQVEsQ0FBQzZDLGNBQUQsRUFBaUJELFNBQWpCLENBQVIsRUFBcUMzQyxJQUFyQyxFQUEyQ3FCLFdBQTNDLENBRGEsRUFFWix3RkFBQXRCLENBQVEsQ0FBQzZDLGNBQUQsRUFBa0I5QixnQkFBZ0IsQ0FBbEMsQ0FBUixFQUErQ2QsSUFBL0MsRUFBcURxQixXQUFyRCxJQUFvRSx3RkFBQXRCLENBQVEsQ0FBRWdCLGdCQUFnQixDQUFsQixFQUFzQjRCLFNBQXRCLENBQVIsRUFBMEMzQyxJQUExQyxFQUFnRHFCLFdBQWhELENBRnhELENBQVAsQ0FBUDtBQUlBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkQ7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFBMEUsQ0FBUUwsS0FBUixHQUFnQlIsSUFBaEIsQ0FBcUIsVUFBUy9ELElBQVQsRUFBZTtBQUNsQyxNQUFJRSxjQUFjRixLQUFLRSxXQUF2QjtBQUNBLE1BQUlELFlBQVlELEtBQUtDLFNBQXJCOztBQUVGLE1BQU1zQyxPQUFPLENBQ1gsQ0FDRTtBQUNFakcsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixJQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FERixFQU1FO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQU5GLEVBV0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBWEYsRUFnQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBaEJGLEVBcUJFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQXJCRixFQTBCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0ExQkYsRUErQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBL0JGLEVBb0NNO0FBQ0Z2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FETDtBQUVGb0QscUJBQWlCLEtBRmY7QUFHRmIsVUFBTTtBQUhKLEdBcENOLEVBeUNFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQXpDRixDQURXLEVBZ0RYLENBQ0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsSUFGbkI7QUFHRWIsVUFBTTtBQUhSLEdBREYsRUFNRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FORixFQVdFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQVhGLEVBZ0JFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQWhCRixFQXFCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FyQkYsRUEwQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBMUJGLEVBK0JFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQS9CRixFQW9DRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FwQ0YsRUF5Q0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBekNGLEVBOENFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQTlDRixFQW1ERTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FuREYsRUF3REU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBeERGLEVBNkRFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQTdERixDQWhEVyxFQW1IWCxDQUNHO0FBQ0N2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEUjtBQUVDb0QscUJBQWlCLElBRmxCO0FBR0NiLFVBQU07QUFIUCxHQURILEVBTUU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBTkYsRUFXRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FYRixFQWdCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FoQkYsRUFxQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBckJGLEVBMEJFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQTFCRixFQStCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0EvQkYsQ0FuSFcsRUF3SlgsQ0FDRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixJQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FERixFQU1FO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQU5GLEVBV0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBWEYsRUFnQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBaEJGLEVBcUJFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQXJCRixFQTBCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0ExQkYsRUErQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBL0JGLENBeEpXLEVBNkxYLENBQ0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsSUFGbkI7QUFHRWIsVUFBTTtBQUhSLEdBREYsRUFNRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FORixFQVdFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQVhGLEVBZ0JFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQWhCRixFQXFCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FyQkYsRUEwQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBMUJGLEVBK0JFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQS9CRixDQTdMVyxFQWtPWCxDQUNFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLElBRm5CO0FBR0ViLFVBQU07QUFIUixHQURGLEVBTUU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBTkYsRUFXRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FYRixFQWdCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FoQkYsRUFxQkU7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBckJGLEVBMEJFO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQTFCRixFQStCRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0EvQkYsQ0FsT1csRUF1UVQsQ0FDQTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixJQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FEQSxFQU1BO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQU5BLEVBV0E7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBWEEsRUFnQkE7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBaEJBLEVBcUJBO0FBQ0V2QyxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLEtBRm5CO0FBR0ViLFVBQU07QUFIUixHQXJCQSxFQTBCQTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixLQUZuQjtBQUdFYixVQUFNO0FBSFIsR0ExQkEsRUErQkE7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsS0FGbkI7QUFHRWIsVUFBTTtBQUhSLEdBL0JBLENBdlFTLENBQWI7O0FBK1NFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1mLFVBQVUsQ0FDWjtBQUNFeEIsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFpQixJQUZuQjtBQUdFYixVQUFNO0FBSFIsR0FEWSxDQUFoQjtBQU9BO0FBQ0E7QUFDRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBNkUsVUFBUUMsR0FBUixDQUFZLGdHQUFBbkQsQ0FBZTtBQUNuQmxFLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURZO0FBRW5CcUQsbUJBQWUsS0FGSTtBQUduQkMsbUJBQWUsS0FISTtBQUluQmEsY0FBVSxDQUpTO0FBS25CNUIsVUFBTTtBQUxhLEdBQWYsRUFNSHFCLFdBTkcsQ0FBWjtBQVFDLENBbmtCRCxFIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTZjNzE2NDYyNjUwYTFlOTUxMzEiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogUHJlbG9hZHMgc3RhcnQgem9uZSBhcyAxIGFuZCBjaGFuZ2VzIHRvIDEteCBmb3IgSlNPTiBmaWxlIHJlYWRpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gem9uZSB4XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICcxLXgnXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6b25lVG9Kb3VybmV5KHpvbmUpIHtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG4vKipcbiAqIFR1cm5zIFwiMS0yXCIgaW50byBbMSwgMl1cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IC0ga2V5OiBcIjEtMlwiXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gWzEsIDJdXG4gKiBAZGVzY3JpcHRpb24gLSBPcHBvc2l0ZSBvZiBqb3VybmV5VG9LZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleVRvSm91cm5leShrZXkpIHtcbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLnNvcnQoKS5tYXAobnVtID0+IHBhcnNlSW50KG51bSkpO1xufVxuXG4vKipcbiAqIEdldHMga2V5cyBmcm9tIHdlZWtseUNhcHMsIG1hcHMgb3ZlciB0aGVtIHRvIGdlbmVyYXRlIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7d2Vla2x5Q2Fwc30gLSB0aGUgd2Vla2x5Q2FwcyBkYXRhIGZyb20gZmFyZXMuanNvblxuICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYXJyYXkgb2YgYXJyYXlzIFtbMSwgMl0sIFsxLCAzXSBldGNdXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvSm91cm5leSh3ZWVrbHlDYXBzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3ZWVrbHlDYXBzKS5tYXAoKGNhcCkgPT4ga2V5VG9Kb3VybmV5KGNhcCkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gLSBrZXkgaXMgYW4gYXJyYXkgb2YgdHdvIHpvbmVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBpcyBvZmZQZWFrIG9yIGFueXRpbWUsIG9yIG5vdGhpbmcgaWYgbm90IG5lZWRlZCAoZS5nLiBmb3Igd2Vla2x5IGNhcHMpXG4gKiBAcGFyYW0ge2RhdGF9IHRoZSBKU09OIGRhdGEgZmlsZSB3aXRoIGZhcmUgb2JqZWN0c1xuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSAvIHdlZWtseSBjYXAgLyBkYWlseSBjYXAgZnJvbSBmYXJlcy5qc29uXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmFyZSA9IChrZXksIHR5cGUsIGNhcHMpID0+IHtcbiAgY29uc3QgZmFyZSA9IGNhcHNba2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGpvdXJuZXlUb0tleShrZXkpIDogem9uZVRvSm91cm5leShrZXkpXTtcblxuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9ICh2YWx1ZSwgdGFyZ2V0KSA9PiB2YWx1ZSA+PSB0YXJnZXQ7XG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGhvd2V2ZXIgbWFueSBkZWNpbWFsIHBsYWNlcyBzcGVjaWZpZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGFyZ2V0IHZhbHVlIHRvIHJvdW5kXG4gKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbHMgLSB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHJlc3VsdCBzaG91bGQgaGF2ZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgZGVjaW1hbHMpIHtcbsKgwqDCoHJldHVybiBOdW1iZXIoYCR7TWF0aC5yb3VuZChgJHt2YWx1ZX1lJHtkZWNpbWFsc31gKX1lLSR7ZGVjaW1hbHN9YCk7XG59XG5cbi8qKlxuICogRGVhbHMgd2l0aCBoYW5kbG5pZyBlYXJseS9hZnRlcm5vb24gdHlwZSBqb3VybmV5cyAoc2VlIGJlbG93KSAtIHNvIGNhbiBhZGp1c3QgdG8gb2ZmcGVhayBvciBhbnl0aW1lIHRvIHdvcmsgb3V0IHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7dHlwZX0gLSB0aGUgam91cm5leSB0eXBlIGZvciB0aGF0OiBlaXRoZXIgdGFyZ2V0ZWQgYnkgYi50eXBlIGluIG95c3RlckRheVRvdGFsIG9yIGpvdXJuZXkudHlwZSBmb3IgY29udGFjdGxlc3NEYXlUb3RhbFxuICogQGRlc2NyaXB0aW9uXG4gLy8gZWFybHkgdHlwZSA9IHNpbmdsZSBmYXJlIGlzIG9mZiBwZWFrIGJ1dCBvbmx5IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgYW55dGltZSBkYWlseSBjYXBcbi8vIGFmdGVybm9vbiB0eXBlID0gc2luZ2xlIGZhcmUgaXMgcGVhayBidXQgbGltaXRlZCBieS9jb3VudHMgdG93YXJkcyBvZmYgcGVhayB0b29cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGVzKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdlYXJseScpIHtcbiAgICByZXR1cm4gJ29mZlBlYWsnO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG4gICAgcmV0dXJuJ2FueXRpbWUnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG59XG5cbi8qKlxuICogRGVhbHMgd2l0aCBoYW5kbG5pZyBlYXJseS9hZnRlcm5vb24gdHlwZSBqb3VybmV5cyAoc2VlIGJlbG93KSAtIHNvIGNhbiBhZGp1c3QgdG8gb2ZmcGVhayBvciBhbnl0aW1lIHRvIHdvcmsgb3V0IHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7dHlwZX0gLSB0aGUgam91cm5leSB0eXBlIGZvciB0aGF0OiBlaXRoZXIgdGFyZ2V0ZWQgYnkgYi50eXBlIGluIG95c3RlckRheVRvdGFsIG9yIGpvdXJuZXkudHlwZSBmb3IgY29udGFjdGxlc3NEYXlUb3RhbFxuICogQGRlc2NyaXB0aW9uXG4gLy8gZWFybHkgdHlwZSA9IHNpbmdsZSBmYXJlIGlzIG9mZiBwZWFrIGJ1dCBvbmx5IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgYW55dGltZSBkYWlseSBjYXBcbi8vIGFmdGVybm9vbiB0eXBlID0gc2luZ2xlIGZhcmUgaXMgcGVhayBidXQgbGltaXRlZCBieS9jb3VudHMgdG93YXJkcyBvZmYgcGVhayB0b29cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGR1YWxab25lcyhkdWFsWm9uZU92ZXJsYXAsIHpvbmVzKSB7XG4gIGlmIChkdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcbiAgICAoKChtaW5OdW0oem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG4gICAgKCgobWF4TnVtKHpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKVxuICAgICkge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCIvLyBvbGRcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0geyBkYXkgb2JqZWN0fSBkYXkgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBqb3VybmV5IG9iamVjdHMgKHRoYXQgaW4gdHVybiBoYXMgem9uZXMgYXJyYXksIGR1YWx6b25lcyBhbmQgdHlwZSAob2ZmcGVhayBvciBhbnl0aW1lKSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gLSBvYmplY3QgY29udGFpbmluZyB7dmFsdWU6IHJldHVybnMgdGhlIHRvdGFsIGZhcmUgJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gV29ya3Mgb3V0IGlmIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgbm8gZGFpbHkgY2FwcywgYW4gb2ZmIHBlYWsgZGFpbHkgY2FwICsgcGVhayBmYXJlcyBvciBhbiBhbnl0aW1lIGNhcCAodGFraW5nIGludG8gYWNjb3VudCB3ZWVrbHkgdHJhdmVsY2FyZHMgcGFzc2VkIGluKVxuICovXG5cbiBpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxuICByb3VuZCxcbiAgdHlwZXMsXG4gIGR1YWxab25lLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG4vLyBJZiB0aGUgb2ZmcGVhayBjYXAgaXMgbWV0LCByZXR1cm4gYSB2YXJpYWJsZSAnY2FwSXNNZXQnICsgbWF4Wm9uZSBvZiB0aGF0IGNhcFxuXG4vLyBUaGlzIGNhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCBvciBubyBkYWlseSBjYXAgZm9yIGVhY2ggZGF5IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gYW55IHdlZWtseSBjYXBzIHBhc3NlZCBpblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXHQgIGNvbnN0IHtcblx0ICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICB9ID0gb3B0aW9ucztcblxuXHQgIGNvbnN0IHtcblx0ICAgIGRhaWx5Q2FwcywgLy9KU09OXG5cdCAgICBzaW5nbGVGYXJlcywgLy9KU09OXG5cdCAgfSA9IGRhdGE7XG5cblx0Y29uc3QgYWxsRGFpbHlDYXBzID0ga2V5c1RvSm91cm5leShkYWlseUNhcHMpO1xuXHQvLyBnZXRzIGNoZWFwZXN0IGRhaWx5IGFueXRpbWUgY2FwXG5cblx0Y29uc3QgY2hlYXBlc3RBbnl0aW1lID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cblx0XHRjb25zdCB0b3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXHRcdCAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhqb3VybmV5LnR5cGUpO1xuXG5cdFx0XHRsZXQgY29uRGFpbHkgPSBtYXhOdW0oY2FwKTtcblx0XHRcdGlmIChtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0XHRcdC8vIGR1YWwgdG8gZHVhbCBzdGF0aW9uczogaWYgbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmUgPTwgbWF4IGR1YWwgem9uZSB6b25lXG5cdFx0XHRcdC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuXHRcdFx0XHQvLyBUSElTIElTIERVUExJQ0FURUQgeDMgLS0gcmVmYWN0b3Jcblx0XHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdFx0KCgobWluTnVtKGpvdXJuZXkuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG5cdFx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5UcmF2ZWxjYXJkLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4VHJhdmVsY2FyZCxcblx0XHQgXHRcdG1heERhaWx5OiBjb25EYWlseSxcblx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdCBcdFx0dHlwZTogam91cm5leVR5cGUsXG5cdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cblx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuXHR9KTtcblxuXHQvLyBmb3IgY2hlYXBlc3QgbWl4IHBlYWsgam91cm5leXMgKyBlYWNoIGRhaWx5IG9mZiBwZWFrIGNhcFxuXHRjb25zdCBjaGVhcGVzdE9mZlBlYWsgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCBvZmZQZWFrTWF4Wm9uZSA9IG1heE51bShjYXApO1xuXHRcdFxuXHRcdGNvbnN0IG9mZlBlYWtEYXlUb3RhbCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXHRcdCAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhqb3VybmV5LnR5cGUpO1xuXG5cdFx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0XHRpZiAoam91cm5leS5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcblx0XHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmIChqb3VybmV5LnR5cGUgPT09ICdvZmZQZWFrJyB8fCBqb3VybmV5LnR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pblRyYXZlbGNhcmQsLy8gZmFsc2UgaWYgbm90aGluZyBwYXNzZWQgaW5cblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4VHJhdmVsY2FyZCwvLyBmYWxzZSBpZiBub3RoaW5nIHBhc3NlZCBpblxuXHRcdFx0IFx0XHRtYXhEYWlseTogbWF4TnVtKGNhcCksXG5cdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0IFx0XHR0eXBlOiBqb3VybmV5VHlwZSxcblx0XHRcdCBcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHQgXHRcdG1pblRyYXZlbGNhcmQ6IG1pblRyYXZlbGNhcmQsLy8gZmFsc2UgaWYgbm90aGluZyBwYXNzZWQgaW5cblx0XHRcdCBcdFx0bWF4VHJhdmVsY2FyZDogbWF4VHJhdmVsY2FyZCwvLyBmYWxzZSBpZiBub3RoaW5nIHBhc3NlZCBpblxuXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdCBcdFx0dHlwZTogam91cm5leVR5cGUsXG5cdFx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH1cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvZmZQZWFrTWF4Wm9uZSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0Ly93ZWlyZCBvZmYgcGVha1xuXHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuICAgXHRcdGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGpvdXJuZXkudHlwZSk7XG5cblx0XHQvLyBmaXhlcyBkdWFsIG92ZXJsYXAgXG5cdFx0aWYgKG1heFRyYXZlbGNhcmQpIHtcblx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHQoKChtaW5OdW0oam91cm5leS56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcblx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5UcmF2ZWxjYXJkLFxuXHQgXHRcdG1heFRyYXZlbGNhcmQ6IG1heFRyYXZlbGNhcmQsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IGpvdXJuZXlUeXBlLFxuXHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHQvLyBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIChvdXQgb2YgdGhlIG9iamVjdClcblx0Y29uc3QgbFRvVmFsdWVzID0gY2hlYXBlc3RPZmZQZWFrLm1hcCgobFZhbCkgPT4gbFZhbC52YWx1ZSk7XG5cblx0Ly8gY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgbWluQWxsID0gbWluTnVtKGNoZWFwZXN0QW55dGltZS5jb25jYXQoW2NoZWFwZXN0Tm9DYXBdLCBsVG9WYWx1ZXMpKTtcblxuXHQvLyBldmFsdWF0ZXMgaWYgYW55IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIGlzIGVxdWFsIHRvIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBpc0VxID0gY2hlYXBlc3RPZmZQZWFrLnNvbWUoZW50cnkgPT4ge1xuXHRcdHJldHVybiBlbnRyeS52YWx1ZSA9PSBtaW5BbGw7XG5cdH0pO1xuXG5cdC8vIGlmIGFib3ZlIGlzIG1ldCwgdGhlbiBmaW5kIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHR2YXIgY2FwVmFsO1xuXHRpZiAoaXNFcSkge1xuXHRcdGNhcFZhbCA9IGNoZWFwZXN0T2ZmUGVhay5maWx0ZXIoKGxWYWwpID0+IGxWYWwudmFsdWUgPT09IG1pbkFsbCk7XG5cdH1cblx0Ly8gcmV0dXJucyBhbiBvYmplY3Q6IHRoZSBjaGVhcGVzdCB2YWx1ZSwgd2hldGhlciBvZmYgcGVhayBjYXAgaXMgbWV0IChpZiBzbyB3aWxsIGJlIHRoZSBtYXggb2ZmIHBlYWsgem9uZSlcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogcm91bmQobWluQWxsLCAyKSxcblx0XHRjYXBJc01ldDogaXNFcSA/IGNhcFZhbFswXS5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuXHR9O1xuXG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWF4TnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gXHRGT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG4vLyBcdEZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMob3B0aW9ucyA9IHt9LCBzaW5nbGVGYXJlcykge1xuICBjb25zdCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcbi8vIGJ5IGRlZmF1bHQ6IGp1c3Qgb25lIHRyYXZlbGNhcmQgKHdlZWtseSB3aXRob3V0IGRhaWx5IG9yIGp1c3QgZGFpbHkgY2FwKSBmb3IgZWl0aGVyIG95c3RlciBvciBjb250YWN0bGVzcywgb3Igb3lzdGVyIHdpdGggd2Vla2x5IGNhcCAoZG9lc24ndCBjdXQgb2ZmIGRhaWx5IHNlY3Rpb24gb2YgdGhlIGpvdXJuZXkpXG5cblx0bGV0IHtcblx0XHR6b25lcyxcblx0XHR0eXBlLFxuICAgIFx0bWluVHJhdmVsY2FyZCwgLy8gbWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHQvLyBpZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cdC8vIHNhbWUgYXMgdmFyIG1pblNpbmdsZSA9IG9wdGlvbnMubWluU2luZ2xlO1xuXG4vLyBkZWJ1Z2dlcjtcbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHRpZiAobWF4RGFpbHkpIHsgLy8gSWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8gKGhlbmNlIGFkZGluZyBpbiBtYXhEYWlseSBhcyBhcmd1bWVudF9cblx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0XHQgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdFx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcblx0Ly8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdFx0fSBlbHNlIHsgLy8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVNcblx0XHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKG1heERhaWx5ICYmICFtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0bWF4VHJhdmVsY2FyZCA9IG1heERhaWx5O1xuXHRcdG1pblRyYXZlbGNhcmQgPSAxO1xuXHR9XG5cblxuXHQvLyBpZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHQgLy8gZGVidWdnZXI7XG5cdFx0cmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG5cdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIDA7XG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG5cbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG4vLyBFTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7Y29tcGxleCBqb3VybmV5cyBvYmplY3R9IGpvdXJuZXlzIC0gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gLSBvYmplY3QgY29udGFpbmluZyB7dmFsdWU6IHJldHVybnMgdGhlIHRvdGFsIGZhcmUgJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gaXMgY2FwcGVkIGJ5IG9mZiBwZWFrIGRhaWx5IGNhcCBvciBwZWFrIGNhcCAoY3VtdWxhdGl2ZWx5KSB3aGVyZSBuZWNlc3NhcnlcbiAqL1xuXG5pbXBvcnQge1xuICBtaW5OdW0sXG4gIG1heE51bSxcbiAgZ2V0RmFyZSxcbiAgbWV0LFxuICB6b25lVG9Kb3VybmV5LFxuICByb3VuZCxcbiAgdHlwZXMsXG4gIGR1YWxab25lLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cbiAgY29uc3Qge1xuICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHtcbiAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgIHNpbmdsZUZhcmVzLCAvL0pTT05cbiAgfSA9IGRhdGE7XG5cbiAgY29uc3QgZGF5VG90YWwgPSBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcblxuICAgIC8vdHlwZXMgZnVuY3Rpb24gZGVhbHMgd2l0aCBlYXJseSAgL2FmdGVybm9vbiBwZWFrL29mZnBlYWsgaGFuZGxpbmdcbiAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhiLnR5cGUpO1xuICAgIGxldCBzaW5nbGVGYXJlID0gZ2V0RmFyZShiLnpvbmVzLCBqb3VybmV5VHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gICAgLy8gdGFrZXMgdGhlIG51bWJlcnMgZnJvbSB0aGUgcHJldmlvdXMgbG9vcFxuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG5cbiAgICAvL3RoZSBtYXhpbXVtIHpvbmUgdHJhdmVsbGVkIGluIHNvIGZhciBpcyB1cGRhdGVkIHdpdGggY3VycmVudCB6b25lc1xuICAgIGxldCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcblxuICAgIC8vaW4gcHJlcGFyYXRpb24gZm9yIHdoZXRoZXIgb2ZmIHBlYWsgZGFpbHkgY2FwIGlzIG1ldCBvciBub3QgKHRvIGJlIHBhc3NlZCBvdXQgd2l0aGluIGNhcElzTWV0KVxuICAgIGxldCBvZmZQZWFrUmVhY2hlZFByZSA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrUmVhY2hlZCA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrTWF4Wm9uZSA9IGEub2ZmUGVha01heFpvbmU7XG4gICAgbGV0IGFueXRpbWVSZWFjaGVkID0gZmFsc2U7XG5cbiAgICAvLyBGT1IgV0VFS0xZIHRyYXZlbGNhcmRzIC0gaWUgaWYgdGhlIG1heCB0cmF2ZWxjYXJkIGhhcyBiZWVuIHBhc3NlZCBpbiwgc28gdXNlcyBleHRlbnNpb24gZmFyZXMgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHNpbmdsZSBmYXJlXG4gICAgaWYgKG1heFRyYXZlbGNhcmQpIHtcbiAgICAgIHNpbmdsZUZhcmUgPSBleHRlbnNpb25GYXJlcyh7XG4gICAgICAgIHpvbmVzOiBiLnpvbmVzLFxuICAgICAgICB0eXBlOiBiLnR5cGUsXG4gICAgICAgIG1pblRyYXZlbGNhcmQsXG4gICAgICAgIG1heFRyYXZlbGNhcmR9LFxuICAgICAgICBzaW5nbGVGYXJlcyk7XG4gICAgICBcbiAgICAgIC8vIGR1YWwgdG8gZHVhbCBzdGF0aW9uczogaWYgbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmUgPTwgbWF4IGR1YWwgem9uZSB6b25lXG4gICAgICAvLyA9ID4gdGhlbiBjaGFuZ2VzIGR1YWwgdG8gZHVhbCAgc3RhdGlvbnMgdG8gbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmVcbiAgICAgIGlmIChiLmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAoKChtaW5OdW0oYi56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcbiAgICAgICAgKCgobWF4TnVtKGIuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG4gICAgICAgICkge1xuICAgICAgICBzaW5nbGVGYXJlID0gMDtcbiAgICAgIH1cbiAgICAgICAgLy8oaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gbWF4Wm9uZSAtIHJlbW92ZXMgb3ZlcmxhcCB3aXRoIHdlZWtseSlcbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiBtZXQobWF4VHJhdmVsY2FyZCwgbWF4Wm9uZSkgJiYgbWV0KG1heFpvbmUsIG1pblRyYXZlbGNhcmQgLSAxKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IFxuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRUb3RhbCA9IGEuY3VycmVudFRvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50IGpvdXJuZXkgbWFkZSB3YXMgT0ZGUEVBSyAob3IgYWZ0ZXJub29uIHdoaWNoIGlzIGNvdmVyZWQgYnkgb2ZmcGVhaylcbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycgfHwgYi50eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgICAgLy9vZmYgcGVhayB0b3RhbCBnZXRzIHVwZGF0ZWQgYW5kIGlmIG5lZWRlZCBvdmVycmlkZGVuIHdpdGggb2ZmcGVhayBkYWlseSBjYXBcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSkgPj0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcykpIHtcbiAgICAgICAgb2ZmUGVha1JlYWNoZWRQcmUgPSB0cnVlO1xuICAgICAgICBvZmZQZWFrVG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZlBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgICAgfVxuXG4gICAgICAvL29mZlBlYWtUb3RhbCA9IG1pbk51bShbb2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSwgZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcyldKTtcblxuICAgICAgLy8gY3VycmVudCB0b3RhbCBpcyB1cGRhdGVkIGlmIG5lZWRlZCB0byBiZSBvZmYgcGVhayB0b3RhbCArIHByZXZpb3VzIHBlYWsgdG90YWwgZm9yIG9mZiBwZWFrIHRyYXZlbFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBwZWFrVG90YWwpIDw9IGN1cnJlbnRUb3RhbCkge1xuICAgICAgICAvL2lmIHRoaXMgY29uZGl0aW9uIGFuZCB0aGUgYWJvdmUgY29uZGl0aW9ucyBhcmUgYm90aCBtZXQgKGllIGEgY3VycmVudCBvciBwcmV2aW91c29mZnBlYWsgZGFpbHkgY2FwIGFwcGxpZWQgdG8gY3VycmVudHRvdGFsKSwgc2V0IHRydWVcbiAgICAgICAgaWYgKG9mZlBlYWtSZWFjaGVkUHJlKSB7XG4gICAgICAgICAgb2ZmUGVha1JlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIG9mZlBlYWtNYXhab25lID0gbWF4Wm9uZTtcbiAgICAgICAgICAvLyByZXR1cm4gdGhlIG1heCB6b25lIGZvciBvZmYgcGVhayBjYXBcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VG90YWwgPSBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWw7XG4gICAgICB9XG5cbiAgICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbF0pO1xuXG4gICAgLy9vdGhlcndpc2UgZm9yIFBFQUsgdHJhdmVsIHRoZSBwZWFrIHRvdGFsIGlzIHVwZGF0ZWQgaW4gcHJlcGFyYXRpb24gZm9yIG5leHQgcm91bmRcbiAgICB9IGVsc2Uge1xuICAgICAgcGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgfVxuXG4gICAgLy9pZiBuZWVkZWQgY3VycmVudCB0b3RhbCBpcyB0b3RhbGx5IG92ZXJyaWRkZW4gYnkgYW55dGltZSBkYWlseSBjYXBcbiAgICBpZiAoY3VycmVudFRvdGFsID4gKGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpKSkge1xuICAgICAgLy9pZiBhbnl0aW1lIGRhaWx5IGNhcCByZWFjaGVkLCBvZmYgcGVhayByZWFjaGVkIHdpbGwgdGhlbiBiZSBzZXQgdG8gZmFsc2UgdmlhIGFueXRpbWVyZWFjaGVkIChhcyBhbnl0aW1lIGFwcGxpZWQgbm90IG9mZiBwZWFrIGNhcClcbiAgICAgIGFueXRpbWVSZWFjaGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuICAgIH1cblxuICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIG9iamVjdCBpcyByZXR1cm5lZCB0byBiZSBjb21wYXJlZCBcbiAgICAgIGN1cnJlbnRUb3RhbCxcbiAgICAgIG9mZlBlYWtUb3RhbCxcbiAgICAgIHBlYWtUb3RhbCxcbiAgICAgIG1heFpvbmUsXG4gICAgICBvZmZQZWFrTWF4Wm9uZSxcbiAgICAgIC8vZW5zdXJlcyB0aGF0IHByZXZpb3VzIG9mZiBwZWFrIGNhcHMgYXBwbGllZCBwcmV2aW91cyB0byBmdXR1cmUgbG9vcHMgLSBpZiB0cnVlLCBzdGF5cyB0cnVlXG4gICAgICBvZmZQZWFrUmVhY2hlZDogKGEub2ZmUGVha1JlYWNoZWQgJiYgIWFueXRpbWVSZWFjaGVkKSA/IHRydWUgOiBvZmZQZWFrUmVhY2hlZCxcbiAgICB9O1xuXG4gIH0sIHtcbiAgICBjdXJyZW50VG90YWw6IDAsXG4gICAgb2ZmUGVha1RvdGFsOiAwLFxuICAgIHBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC8vIHJvdW5kcyB0byAyIGRwXG4gICAgdmFsdWU6IHJvdW5kKGRheVRvdGFsLmN1cnJlbnRUb3RhbCwgMiksXG4gICAgY2FwSXNNZXQ6IGRheVRvdGFsLm9mZlBlYWtSZWFjaGVkID8gZGF5VG90YWwub2ZmUGVha01heFpvbmUgOiBmYWxzZSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHdlZWsgdG90YWwgKGJhc2VkIG9uIHBhcmFtZXRlciBveXN0ZXIgb3IgY29udGFjdGxlc3MgcGFzc2VkIGFzIGFyZ3VtZW50KVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtmdW5jdGlvbiAtIHN0cmluZ30gY29uRGF5VG90YWwgb3Igb3lzdGVyRGF5VG90YWwgLSB0byBjYWxjdWxhdGUgdXNpbmcgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIFxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge29iamVjdH0gaW5mbyAtIGlzIGFuIG9iamVjdCB3aXRoIHtcbiBcdFx0XHRvcHRpb25zOiB7b2JqZWN0IHRoYXQgaGFzIG1pblRyYXZlbGNhcmQ6IG51bSBhbmQgbWF4VHJhdmVsY2FyZDogbnVtfSwgXG4gXHRcdFx0ZGF0YSB9XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRvdGFsIGNoZWFwZXN0IG95c3RlciBvciBjb250YWN0bGVzcyBmYXJlIGZvciB0aGF0IHdlZWtcbiAqIEBkZXNjcmlwdGlvbiBJdCBhbHNvIGRlZHVjdHMgdGhlIGF1dG9tYXRpYyBvZmZwZWFrIHJlZnVuZHMgZm9yIHpvbmVzIDQtNiBpZiBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG1vcmUgdGhhbiBvbmNlIGVhY2ggd2Vla1xuIFx0XHRlLmcuOiBcbiAgICAgICBjb25zdCB5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSk7XG4gKi9cbiBpbXBvcnQge1xuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuXG4vL3dvcmtzIG91dCB0aGUgZXF1aXZhbGVudCBvZiBubyBjYXBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlZWtUb3RhbChwYXltZW50RnVuY3Rpb24sIGRheXMsIGluZm8pIHtcblx0bGV0IG51bU9mZlBlYWtDYXBaNCA9IDA7XG5cdGxldCBudW1PZmZQZWFrQ2FwWjYgPSAwO1xuXHRsZXQgbnVtT2ZmUGVha0NhcFo1ID0gMDtcblxuXHRsZXQgd2Vla1RvdGFsRmFyZSA9IGRheXMubWFwKGZ1bmN0aW9uIChkYXkpIHsgXG5cdFx0Ly9pZiBkYXkgaXMgZW1wdHkgd2l0aCBubyBqb3VybmV5c1xuXHRcdGlmIChkYXkgPT09IHVuZGVmaW5lZCB8fCBkYXkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdCAgXHQvL2ZvciBlYWNoIGRheSBhZGQgdG9nZXRoZXIgdGhlIHRvdGFsIGRheSB0b3RhbFxuXHQgIFx0Y29uc3QgZGF5T2JqZWN0ID0gcGF5bWVudEZ1bmN0aW9uKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpO1xuXHQgIFx0Y29uc3QgZGF5Q2FwTWV0ID0gZGF5T2JqZWN0LmNhcElzTWV0O1xuXG5cdCAgXHRpZiAoZGF5Q2FwTWV0ID09PSA0KSB7XG5cdCAgXHRcdG51bU9mZlBlYWtDYXBaNCArPSAxO1xuXHQgIFx0Ly8gV2hhdCBhYm91dCByZWZ1bmRzIGlmIHRoZSBjYXAgaXMgYmV0d2VlbiB6b25lcyAxLTU/PyBhbmQgaWYgZG9lcyBub3QgYXBwbHkgLSB0aGVuIGNoZWFwZXIgdG8gZG8gZGlzY291bnRlZCB6b25lIDEtNCBwbHVzIGV4dGVuc2lvbiBmYXJlcyB0byA1P1xuXHQgIFx0fSBlbHNlIGlmIChkYXlDYXBNZXQgPT09IDYpIHtcblx0ICBcdFx0bnVtT2ZmUGVha0NhcFo2ICs9IDE7XG5cdCAgXHR9IGVsc2UgaWYgKGRheUNhcE1ldCA9PT0gNSkge1xuXHQgIFx0XHRudW1PZmZQZWFrQ2FwWjUgKz0gMTtcblx0ICBcdH1cblxuXHQgXHRyZXR1cm4gZGF5T2JqZWN0LnZhbHVlO1xuXHQgLy9yZXR1cm5zIHRoZSBjdXJyZW50IHdlZWsgdG90YWxcblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG4gIC8vIHdlZWsgZnVuY3Rpb24gdG8gc2VlIGlmIG9mZiBwZWFrIGNhcCBtZXQgYW5kIG1heCB6b25lIGJldHdlZW4gNC02OiBpZiB0cnVlIGZvciAyKyBhIHdlZWssIGFwcGx5IGEgZGlzY291bnRcblx0aWYgKChudW1PZmZQZWFrQ2FwWjQgKyBudW1PZmZQZWFrQ2FwWjYgKyBudW1PZmZQZWFrQ2FwWjUpID49IDIpIHtcblx0ICB3ZWVrVG90YWxGYXJlIC09XG5cdCAgXHQoXG5cdCAgXHRcdChudW1PZmZQZWFrQ2FwWjQgKiAoXG5cdCAgXHRcdFx0Z2V0RmFyZShbMSwgNF0sIGZhbHNlLCBpbmZvLmRhdGEuYXV0b09mZlBlYWtSZWZ1bmQpXG5cdCAgXHRcdCkpXG5cdFx0ICBcdCsgKG51bU9mZlBlYWtDYXBaNiAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA2XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0XHQgIFx0KyAobnVtT2ZmUGVha0NhcFo1ICogKFxuXHRcdCAgXHRcdGdldEZhcmUoWzEsIDVdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHRcdCAgXHQpKVxuXHQgIFx0KTtcblx0fVxuXG5cdHJldHVybiB3ZWVrVG90YWxGYXJlO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIHdlZWtcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSByb3VuZGVkIHRvIDIgZHBcbiAqIEBkZXNjcmlwdGlvbiBjYWxjdWxhdGVzIHdoZXRoZXIgaXQgaXMgY2hlYXBlc3QgdG8gaGF2ZSBhIHdlZWtseSB0cmF2ZWxjYXJkIG9yIG5vbmVcbiAqL1xuXG4gaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlcihkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG5cblx0Ly8gaWYgbm8gd2Vla2x5IGNhcFxuXHRjb25zdCBub0NhcFJlc3VsdCA9IHtcblx0XHQnbm9DYXAnOiB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWluVHJhdmVsY2FyZDogZmFsc2UsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fTtcblx0Ly8gZm9yIGVhY2ggd2Vla3kgY2FwXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHdlZWtUb3RsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cdFx0Ly9yZXR1cm5zIG9iamVjdDogdGhlIHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIHdlZWsgdG90YWwgKHdpdGggd2Vla2x5IGNhcCBhZGRlZClcblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleSh3ZWVrQ2FwKV06IHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHQvLyByZXR1cm5zIG9iamVjdDogdGhlIGNoZWFwZXN0IHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIGNoZWFwZXN0IHdlZWtseSB0b3RhbCAocm91bmRlZCB0byAyIGRwKVxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdGNhcDogY2hlYXBlc3QsXG5cdFx0dmFsdWU6IHJvdW5kKChhbGxDYXBzW2NoZWFwZXN0XSksIDIpXG5cdH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiLCIvKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xudmFyIGZldGNoU3RhdGlvbnNEYXRhID0gKGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG52YXIgZmV0Y2hKb3VybmV5RGF0YSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZmFyZXM6IGZldGNoRmFyZURhdGEsXG5cdHN0YXRpb25zOiBmZXRjaFN0YXRpb25zRGF0YSxcblx0am91cm5leTogZmV0Y2hKb3VybmV5RGF0YSxcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbnRhY3RsZXNzIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICByb3VuZCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWN0bGVzcyhkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG4gIC8vIG1hcHMgb3ZlciBhbGwgdGhlIHBvc3NpYmxlIHdlZWtseSBjYXBzIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB3ZWVrbHkgY2FwICsgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApXG4gXHRjb25zdCBmaW5hbCA9IHdlZWtseUNhcHMubWFwKCh3ZWVrQ2FwKSA9PiB7XG4gICAgICBjb25zdCB3ZWVrVG90bCA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICAgICAgLy9hZGRzIHRoZSB3ZWVrbHkgY2FwIHRvIHRoZSB3ZWVrIHRvdGFsXG4gICAgICByZXR1cm4gd2Vla1RvdGwgKyBnZXRGYXJlKHdlZWtDYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpO1xuICAgIH0pO1xuXG4gIC8vIGdldHMgdGhlIGZhcmUgZm9yIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcCkgd2l0aCBubyB3ZWVrbHkgdHJhdmVsY2Fyc1xuICBjb25zdCBub1dlZWtseSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogZmFsc2UsXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogZmFsc2UsXG4gICAgICAgIH0sXG5cdCAgXHRkYXRhLFxuXHQgIH0pO1xuXG4gIC8vIHJldHVybnMgdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gY29udGFjdGxlc3MgKHJvdW5kZWQgdG8gMiBkcClcbiAgcmV0dXJuIHJvdW5kKFxuICBcdFx0KG1pbk51bShmaW5hbC5jb25jYXQoW25vV2Vla2x5XSkpKSwgMik7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IG95c3RlciBmcm9tICcuL19veXN0ZXInO1xuIGltcG9ydCB7IGdldEZhcmUsXG4gXHRcdFx0cm91bmQsIH0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyTW9udGhseShkYXlzLCBkYXRhKSB7XG5cdGlmIChveXN0ZXIoZGF5cywgZGF0YSkuY2FwICE9PSBcIm5vQ2FwXCIpIHtcblx0XHRjb25zdCBtb250aGx5ID0gZ2V0RmFyZShbb3lzdGVyKGRheXMsIGRhdGEpLmNhcF0sIGZhbHNlLCBkYXRhLm1vbnRobHlDYXBzKTtcblx0XHRjb25zdCB3ZWVrbHkgPSAobW9udGhseSAqIDEyKS81Mjtcblx0XHRyZXR1cm4gcm91bmQod2Vla2x5LCAyKTtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlck1vbnRobHkuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKSArIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcbiAgZ2V0RmFyZSxcblx0bWV0LFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb250YWN0bGVzcyBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzcyc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vcGFydGlhbHMvX3dlZWtUb3RhbCc7XG5pbXBvcnQgb3lzdGVyTW9udGhseSBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJNb250aGx5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vcGFydGlhbHMvX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIEFkZCB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyXG4vLyBDQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vLyBBUEkgSEFORExJTkdcbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgbGV0IHNpbmdsZUZhcmVzID0gZGF0YS5zaW5nbGVGYXJlcztcbiAgbGV0IGRhaWx5Q2FwcyA9IGRhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAgICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gXG5dO1xuXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIFwiY29udGFjdGxlc3MgPSBcIiArIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpXG4gIC8vICk7XG5cbiAgLy8gLy8gZmluYWwgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSBvbiBveXN0ZXJcbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgb3lzdGVyKGRheXMsIGRhdGEpXG4gIC8vICk7XG5cblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgLy8gICAgIGZhbHNlLFxuICAvLyAgICAgZGF0YSxcbiAgLy8gICB9KVxuICAvLyApO1xuXG4gIC8vIGNvbnNvbGUubG9nKG95c3Rlck1vbnRobHkoZGF5cywgZGF0YSkpOyBcblxuLy8gY29uc3Qgam91cm5leSA9IFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyBdO1xuY29uc3Qgam91cm5leSA9IFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDNdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbl07XG4vL3Rlc3RzIGZvciBmYWxzZSBuZWdhdGl2ZXMgaWYgYW55dGltZSBpcyBtZXQgZmlyc3QgYW5kIHRoZW4gb2ZmIHBlYWsgLS0gYWRkIHRvIHRlc3Rcbi8vYnV0IGNoZWNrIHRoZSBjYWxjdWxhdGlvbnMgd29yayBvdXRcbiAgLy8gICBjb25zb2xlLmxvZyhcbiAgLy8gICBjb25EYXlUb3RhbChcbiAgLy8gICAgIGpvdXJuZXksXG4gIC8vICAgICB7XG5cbiAgLy8gICAgIH0sIHtcbiAgLy8gICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAvLyAgICAgICAgIHNpbmdsZUZhcmVzXG4gIC8vICAgICAgIH0pXG4gIC8vICk7XG5cbi8vICAgICAgIGNvbnNvbGUubG9nKFxuLy8gb3lzdGVyRGF5VG90YWwoXG4vLyAgICAgICAgICAgam91cm5leSxcbi8vICAgICAgICAge1xuXG4vLyAgICAgICAgfSwge1xuICAgICAgICAgXG4vLyAgICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbi8vICAgICAgICAgICBzaW5nbGVGYXJlc1xuLy8gICAgICAgICB9KVxuLy8gICApO1xuXG5jb25zb2xlLmxvZyhleHRlbnNpb25GYXJlcyh7XG4gICAgICAgIHpvbmVzOiBbMSwgNF0sXG4gICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICBtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcbiAgICAgICAgbWF4RGFpbHk6IDEsXG4gICAgICAgIHR5cGU6ICdhbnl0aW1lJyxcbiAgICAgIH0sIHNpbmdsZUZhcmVzKSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9