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
/* harmony export (immutable) */ __webpack_exports__["l"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["m"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["c"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["b"] = minNum;
/* harmony export (immutable) */ __webpack_exports__["j"] = getDifference;
/* harmony export (immutable) */ __webpack_exports__["k"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["d"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* harmony export (immutable) */ __webpack_exports__["i"] = keyToJourney;
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isWithin; });
/* harmony export (immutable) */ __webpack_exports__["f"] = round;
/* harmony export (immutable) */ __webpack_exports__["g"] = types;
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
 * Determines if a numeric is within two targets (minTarget and maxTarget)
 * @function
 * @param {number} target - target value to compare against
 * @param {number} minTarget - the minTarget (usually the minTravelcard) 
 * @param {number} maxTarget - the minTarget (usually the maxTravelcard) 
 * @description
 */

var isWithin = function isWithin(minTarget, value, maxTarget) {
  return minTarget <= value && value <= maxTarget;
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
/**
 * Calculates the contactless total fare for the day
 // This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
 * @function
  * @param { day object} day object containing all the journey objects (that in turn has zones array, dualzones and type (offpeak or anytime))
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare
 //& capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description Works out if it is cheapest to have no daily caps, an off peak daily cap + peak fares or an anytime cap (taking into account weekly travelcards passed in)
 */





function conDayTotal(day) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	// If weekly minTravelcard or maxTravelcard passed in, then taken into account when working out single fares
	// If not passed in = false
	var minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;

	// JSON

	var dailyCaps = data.dailyCaps,
	    singleFares = data.singleFares;


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(dailyCaps);

	// Sorts out dual to dual zone overlap
	function dualZoneOverlap(journey) {
		return maxTravelcard && journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(journey.zones) + 1 <= maxTravelcard;
	}

	// Filters the days so only the days with journeys inside are passed
	var validDays = day.filter(function (j) {
		return !dualZoneOverlap(j);
	});

	// 1. Calculates the cheapest fare if a daily anytime cap is applied
	// -- returns an array (a fare for each possible daily cap)
	var cheapestAnytime = allDailyCaps.map(function (cap) {
		var total = validDays.map(function (journey) {

			// Uses extension fares (with anytime cap passed) to calculate the single fare for each journey
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* types */])(journey.type)
			}, singleFares);

			// Adds all the single fares for that day together
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		// Adds together the relevant anytime cap fare with the total day fare
		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// 2. Calculates the cheapest fare if a daily offpeak cap is applied with anytime journeys as additional charges
	// -- returns an object (a fare for each possible daily cap and the max zone of each off peak cap)
	var cheapestOffPeak = allDailyCaps.map(function (cap) {

		var offPeakDayTotal = validDays.map(function (journey) {
			// If 'offPeak' journey is made, then can be capped by the current daily offPeak cap
			// -- thus maxDaily is passed in (as the daily off peak cap), else false = single fare w/o daily cap 
			var maxDaily = false;
			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				maxDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: maxDaily,
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* types */])(journey.type)
			}, singleFares);

			// Adds all the single fares for that day together
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		// Adds together the relevant offpeak cap fare with the total day fare
		return {
			offPeakMaxZone: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// 3. Calculates if no daily caps are applied
	// -- returns the single number
	var cheapestNoCap = validDays.map(function (journey) {

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: minTravelcard,
			maxTravelcard: maxTravelcard,
			zones: journey.zones,
			type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* types */])(journey.type)
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	}, 0);

	// From the off peak object: creates an array of the cheapestOffPeak values
	var cheapestOffPeakValues = cheapestOffPeak.map(function (lVal) {
		return lVal.value;
	});

	// Gets the cheapest value/fare from all 3 different calculation results = cheapest day total
	var cheapestDayTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cheapestAnytime.concat([cheapestNoCap], cheapestOffPeakValues));

	// Evaluates to see if any of the cheapestOffPeak values is equal to the cheapest day total
	var isEq = cheapestOffPeak.some(function (entry) {
		return entry.value == cheapestDayTotal;
	});

	// If above is true, then finds the max cap within the object that matches with the cheapest day total number
	var capVal = isEq ? cheapestOffPeak.filter(function (lVal) {
		return lVal.value === cheapestDayTotal;
	}) : null;

	return {
		// Rounds final cheapest day total fare to 2 decimal places
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(cheapestDayTotal, 2),
		// If the offpeak cap was met, return a variable 'capIsMet' + maxZone of that cap
		capIsMet: capVal ? capVal[0].offPeakMaxZone : false
	};
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
//  by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)
// 	FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap) -- unless you add in MaxDaily
//  // this is overly complicated for daily caps (as only deals with zone 1 to x) but still works. RELIES ON THE FACT DAILY ALWAYS STARTS AT 1
//  */




function extensionFares() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var singleFares = arguments[1];

	var maxDaily = options.maxDaily || null;

	var zones = options.zones,
	    type = options.type,
	    minTravelcard = options.minTravelcard,
	    maxTravelcard = options.maxTravelcard;


	var finalCondition = null;
	var minSingle = zones[0];
	var maxSingle = zones[1];
	var minChargedZone = minSingle;

	// If contactless, daily and weekly combo (hence adding in maxDaily as argument)
	if (maxDaily && maxTravelcard) {
		// If there are no gap zones between max daily and min travelcard
		if (maxDaily >= minTravelcard - 1) {
			// Sets minTravelcard to 1 since anytime daily caps always start at zone 1
			minTravelcard = 1;
			// maxTravelcard is whichever is largest max daily or max travelcard
			maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([maxDaily, maxTravelcard]);

			// IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES between max daily and min travelcard
			// -- so have a min charged zone (not charge the daily cap - only charge the front)
		} else {
			minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
			finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
		}
	}
	// If only maxDaily is passed in and no maxTravelcard
	// -- Then maxTravelcard becaomes maxDaily, minTravelcard is 1 (as daily caps start at 1) and maxDaily is not needded
	if (maxDaily && !maxTravelcard) {
		maxTravelcard = maxDaily;
		minTravelcard = 1;
		maxDaily = false;
	}

	// If min single isnt within travelcard zones but max single is - charge front
	if (minSingle < minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, maxSingle, maxTravelcard)) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		// If min single within travelcard zones but max single isnt - charge end
	} else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, minSingle, maxTravelcard) && maxSingle > maxTravelcard) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

		// If min single less than min travelcard and max single more than max travelcard - charge front and end
	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type);

		// Both single zones within travelcard zones - no charge
	} else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, minSingle, maxTravelcard) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, maxSingle, maxTravelcard) || finalCondition) {
		return 0;
	}

	// Journey is made are outside travelcard zones - charge the fare
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
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
 * @returns {object} - object containing {value: returns the total fare
 // & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description is capped by off peak daily cap or peak cap (cumulatively) where necessary
 */





function oysterDayTotal(day) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;

  // JSON

  var dailyCaps = data.dailyCaps,
      singleFares = data.singleFares;


  var dayTotal = day.reduce(function (a, b) {
    var currentTotal = void 0;

    // Types function deals with early/afternoon peak/offpeak handling
    var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* types */])(b.type);
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(b.zones, journeyType, singleFares);

    // Takes the numbers from the previous loop
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;

    // The maximum zone travelled in so far is updated with current zones
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([].concat(a.maxZone, b.zones));

    // In preparation for whether off peak daily cap is met or not (to be passed out within capIsMet)
    var offPeakReachedPre = false;
    var offPeakReached = false;
    var offPeakMaxZone = a.offPeakMaxZone;
    var anytimeReached = false;

    // FOR WEEKLY travelcards - ie if the max travelcard passed in, extension fares is used to calculate single fare
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
        zones: b.zones,
        type: b.type,
        minTravelcard: minTravelcard,
        maxTravelcard: maxTravelcard
      }, singleFares);

      // Dual zone to dual zone journeys dealt with, if travelcard also passed (free if dual zones are within travelcard zones)
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(b.zones) + 1, maxTravelcard) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(b.zones) + 1, maxTravelcard)) {
        singleFare = 0;
      }

      // Removes any overlap between weekly travelcard and maxSingle
      // I.e. Compares total against daily cap of minSingle to minTravelcard - 1 rather than maxSingle
      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* isWithin */])(minTravelcard - 1, maxZone, maxTravelcard)) {
        maxZone = minTravelcard - 1;
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // If the current journey made was OFFPEAK (or afternoon which is covered by offpeak)
    if (b.type === 'offPeak' || b.type === 'afternoon') {
      // Off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps);
      } else {
        offPeakTotal += singleFare;
      }

      // Current total is updated if needed becomes off peak total + previous peak total
      if (offPeakTotal + peakTotal <= currentTotal) {
        // If this condition and the pre conditions are both met
        // - (ie a current or previous offpeak daily cap applied to currenttotal), return the maxZone for off peak cap
        if (offPeakReachedPre) {
          offPeakReached = true;
          offPeakMaxZone = maxZone;
        }
        currentTotal = offPeakTotal + peakTotal;
      }

      // Otherwise for PEAK travel the peak total is updated in preparation for next round
    } else {
      peakTotal += singleFare;
    }

    // If needed current total is totally overridden by anytime daily cap
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      // If anytime daily cap reached, off peak reached will then be set to false
      // (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps);
    }

    return {
      // Object is returned to be compared 
      currentTotal: currentTotal,
      offPeakTotal: offPeakTotal,
      peakTotal: peakTotal,
      maxZone: maxZone,
      offPeakMaxZone: offPeakMaxZone,
      // Ensures that previous off peak caps applies to future loops - if true, stays true
      offPeakReached: a.offPeakReached && !anytimeReached ? true : offPeakReached
    };
  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null
  });

  return {
    // Rounds final total fare to 2 decimal places
    value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(dayTotal.currentTotal, 2),
    // If the offpeak cap is met, return a variable 'capIsMet' + maxZone of that cap
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

//SHOULD MAP OVER JSON TO FIND THE ZONES WITH OFF PEAK DISCOUNT rather than add 4, 5 and 6





function weekTotal(paymentFunction, days, info) {
	// Filters the days by those with journeys
	var validDays = days.filter(function (day) {
		return day.length > -1;
	});

	// Uses the paymentFunction passed in (oyster or contactless) to generate an array
	// -- Array is an object per day (with day total fare and isCapMet)
	var weekAllCaps = validDays.map(function (day) {
		return paymentFunction(day, info.options, info.data);
	});

	// Loops over the object per day to accumulate the number of off peak zone 1-4, 1-5 and 1-6 daily caps met
	var offPeakCaps = weekAllCaps.reduce(function (a, b) {
		if (b.hasOwnProperty('capIsMet') && b.capIsMet !== false) {
			a[b.capIsMet] += 1;
		}
		return a;
	}, { '4': 0, '5': 0, '6': 0 });

	// Adds together the day total fares to = current week total fare
	var weekTotalFare = weekAllCaps.reduce(function (a, b) {
		return a + b.value;
	}, 0);

	// If off peak daily cap between 4-6 met for 2+ a week, applies the discount(s)
	if (offPeakCaps['4'] + offPeakCaps['5'] + offPeakCaps['6'] >= 2) {
		weekTotalFare -= offPeakCaps['4'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + offPeakCaps['6'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + offPeakCaps['5'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
	}

	// Returns the final week total
	return weekTotalFare;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__oysterMonthly__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weekTotal__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = oyster;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} value: - the cheapest weekly charge rounded to 2 dp
 // and cap: the weekly cap applied (if any)
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */







function oyster(days, data) {
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

	// 1. If no weekly cap is passed in
	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: false,
				maxTravelcard: false
			},
			data: data
		})
	};
	// 2. For each possible weekly cap
	var capsResultPre = weeklyCaps.map(function (weekCap) {
		var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
			},
			data: data
		});
		// Returns an object: the weekly cap associated and the week total (with weekly cap added)
		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* journeyToKey */])(weekCap), weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	// Adds noCap and each weekly cap object into one object of all possible weekly total fares
	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	// Loops this object to find the cheapest week total
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	// Returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	var weeklyValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(allCaps[cheapest], 2);

	return {
		cap: cheapest,
		weeklyValue: weeklyValue,
		monthlyValue: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__oysterMonthly__["a" /* default */])(cheapest, weeklyValue, data)
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
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

  // 1. For each possible weekly cap
  // returns the array of each weekly cap total week fare
  var final = weeklyCaps.map(function (weekCap) {
    var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
      },
      data: data
    });
    return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(weekCap, false, data.weeklyCaps);
  });

  // 2. If no weekly cap is passed in
  // Gets the fare for the cheapest daily cap (or no daily cap) when no weekly travelcards are passed in
  // returns a number
  var noWeekly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
    options: {
      minTravelcard: false,
      maxTravelcard: false
    },
    data: data
  });

  // Returns a number: cheapest total weekly fare on contactless (rounded to 2 dp)
  // -- by appending the noWeekly number to the final array and finding the smallest number
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(final.concat([noWeekly])), 2);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["l" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["l" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["m" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["m" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["m" /* filterZonesByNumber */])(1, allZones));

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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterMonthly;
/**
 * Calculates the contactless total fare for the week with week cap from a monthly travelcard
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */



function oysterMonthly(cap, weeklyValue, data) {
	if (cap !== "noCap") {

		// Monthly is based on each calendar month: *12 months / 52 weeks
		// Calculates the cost of the week cap based on the monthly cap
		var weekFromMonthly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* keyToJourney */])(cap), false, data.monthlyCaps) * 12 / 52;

		// Gets the difference between the week cap from weekly caps and the week cap from monthly cap (a discount)
		var discount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["j" /* getDifference */])(weekFromMonthly, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* keyToJourney */])(cap), false, data.weeklyCaps));

		// Applies the discount to the oyster week total of that week
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(weeklyValue - discount, 2);
	} else {
		return false;
	}
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = splitOrFullFare;
/**
 *If min single less than min travelcard and max single more than max travelcard
 (I.e. A journey of e.g. 1-6 but a travel card of 3-4)
 - calculates whichever is cheaper: either two split singles (1-2 + 5-6)
 or full fare without travelcard (1-6).
 * @function
 * @param {numbers} minChargedZone - the min zone that will charge between this min chargable zone to min travelcard - 1 (as single) and  max chargeable zone (to charge beween max travelcard +1 to max chargeable zone)
 * @returns {number} - returns the cheapest fare
 * @description
 */



function splitOrFullFare(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([
	// The full fare (disregarding any travelcards)
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, maxSingle], type, singleFares),

	// The fare between minCharged Zone and minTravelcard + 1 - charges the front
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares)
	// The fare between maxTravelcard + 1 and maxSingle - charges the back
	+ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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












// TO DO
// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// API HANDLING
// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

// SHOULD MAP OVER JSON TO FIND THE ZONES WITH OFF PEAK DISCOUNT rather than add 4, 5 and 6 for weekTotal

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
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__partials_oysterMonthly__["a" /* default */])("3-6", 39.8, data));
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oyster__["a" /* default */])(days, data));

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
  // const journey = [
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: true,
  //     type: "anytime",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: true,
  //     type: "anytime",
  //   },
  // ];

  //   console.log(
  //   conDayTotal(
  //     journey,
  //     {

  //     }, {
  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );
  // console.log(
  //               weekTotal(oysterDayTotal, days, {
  //         options: {
  //           minTravelcard: 1,
  //           maxTravelcard: 2,
  //         },
  //         data,
  //       })
  //               );

  //     console.log(
  //       oysterDayTotal(
  //         journey,
  //       {
  //       minTravelcard: 4,
  //       maxTravelcard: 5,
  //      }, {

  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );

  // console.log(extensionFares({
  //         zones: [1, 4],
  //         minTravelcard: false,
  //         maxTravelcard: false,
  //         maxDaily: 1,
  //         type: 'anytime',
  //       }, singleFares));
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzE5M2YyZmQxOTI0NTkzOGNmNDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpc1dpdGhpbiIsIm1pblRhcmdldCIsInZhbHVlIiwibWF4VGFyZ2V0Iiwicm91bmQiLCJkZWNpbWFscyIsIk51bWJlciIsInR5cGVzIiwiZHVhbFpvbmVzIiwiZHVhbFpvbmVPdmVybGFwIiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJjb25EYXlUb3RhbCIsImRheSIsIm9wdGlvbnMiLCJkYXRhIiwiZGFpbHlDYXBzIiwic2luZ2xlRmFyZXMiLCJhbGxEYWlseUNhcHMiLCJ2YWxpZERheXMiLCJqIiwiY2hlYXBlc3RBbnl0aW1lIiwidG90YWwiLCJleHRlbnNpb25GYXJlcyIsIm1heERhaWx5IiwiY2hlYXBlc3RPZmZQZWFrIiwib2ZmUGVha0RheVRvdGFsIiwib2ZmUGVha01heFpvbmUiLCJjaGVhcGVzdE5vQ2FwIiwiY2hlYXBlc3RPZmZQZWFrVmFsdWVzIiwibFZhbCIsImNoZWFwZXN0RGF5VG90YWwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY2FwSXNNZXQiLCJmaW5hbENvbmRpdGlvbiIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pbkNoYXJnZWRab25lIiwic3BsaXRPckZ1bGxGYXJlIiwib3lzdGVyRGF5VG90YWwiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsImpvdXJuZXlUeXBlIiwic2luZ2xlRmFyZSIsIm9mZlBlYWtUb3RhbCIsInBlYWtUb3RhbCIsIm1heFpvbmUiLCJvZmZQZWFrUmVhY2hlZFByZSIsIm9mZlBlYWtSZWFjaGVkIiwiYW55dGltZVJlYWNoZWQiLCJ3ZWVrVG90YWwiLCJwYXltZW50RnVuY3Rpb24iLCJkYXlzIiwiaW5mbyIsIndlZWtBbGxDYXBzIiwib2ZmUGVha0NhcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIndlZWtUb3RhbEZhcmUiLCJhdXRvT2ZmUGVha1JlZnVuZCIsIm95c3RlciIsIm5vQ2FwUmVzdWx0IiwiY2Fwc1Jlc3VsdFByZSIsIndlZWtDYXAiLCJ3ZWVrVG90bCIsImFsbENhcHMiLCJhc3NpZ24iLCJjaGVhcGVzdCIsIndlZWtseVZhbHVlIiwibW9udGhseVZhbHVlIiwib3lzdGVyTW9udGhseSIsImZldGNoRmFyZURhdGEiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImUiLCJmYXJlcyIsImNvbnRhY3RsZXNzIiwiZmluYWwiLCJub1dlZWtseSIsImdldFNpbmdsZUpvdXJuZXlab25lcyIsImdldERhdGEiLCJqb3VybmV5cyIsImxlZ3MiLCJhbGxab25lcyIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwicGF0aCIsInN0b3BQb2ludHMiLCJmb3JFYWNoIiwic3RvcFBvaW50IiwiaWQiLCJ6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsInNpbmdsZU1heCIsInNpbmdsZU1pbiIsInoiLCJ3ZWVrRnJvbU1vbnRobHkiLCJtb250aGx5Q2FwcyIsImRpc2NvdW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUMsQ0EvakJELEUiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MTkzZjJmZDE5MjQ1OTM4Y2Y0OSIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBQcmVsb2FkcyBzdGFydCB6b25lIGFzIDEgYW5kIGNoYW5nZXMgdG8gMS14IGZvciBKU09OIGZpbGUgcmVhZGluZ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB6b25lIHhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJzEteCdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHpvbmVUb0pvdXJuZXkoem9uZSkge1xuICByZXR1cm4gam91cm5leVRvS2V5KFsxLCB6b25lXSk7XG59XG5cbi8qKlxuICogVHVybnMgXCIxLTJcIiBpbnRvIFsxLCAyXVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gLSBrZXk6IFwiMS0yXCJcbiAqIEByZXR1cm5zIHthcnJheX0gLSBbMSwgMl1cbiAqIEBkZXNjcmlwdGlvbiAtIE9wcG9zaXRlIG9mIGpvdXJuZXlUb0tleVxuICovXG5leHBvcnQgZnVuY3Rpb24ga2V5VG9Kb3VybmV5KGtleSkge1xuICByZXR1cm4ga2V5LnNwbGl0KCctJykuc29ydCgpLm1hcChudW0gPT4gcGFyc2VJbnQobnVtKSk7XG59XG5cbi8qKlxuICogR2V0cyBrZXlzIGZyb20gd2Vla2x5Q2FwcywgbWFwcyBvdmVyIHRoZW0gdG8gZ2VuZXJhdGUgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHt3ZWVrbHlDYXBzfSAtIHRoZSB3ZWVrbHlDYXBzIGRhdGEgZnJvbSBmYXJlcy5qc29uXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gcmV0dXJucyBhcnJheSBvZiBhcnJheXMgW1sxLCAyXSwgWzEsIDNdIGV0Y11cbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9Kb3VybmV5KHdlZWtseUNhcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHdlZWtseUNhcHMpLm1hcCgoY2FwKSA9PiBrZXlUb0pvdXJuZXkoY2FwKSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSAtIGtleSBpcyBhbiBhcnJheSBvZiB0d28gem9uZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGlzIG9mZlBlYWsgb3IgYW55dGltZSwgb3Igbm90aGluZyBpZiBub3QgbmVlZGVkIChlLmcuIGZvciB3ZWVrbHkgY2FwcylcbiAqIEBwYXJhbSB7ZGF0YX0gdGhlIEpTT04gZGF0YSBmaWxlIHdpdGggZmFyZSBvYmplY3RzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIC8gd2Vla2x5IGNhcCAvIGRhaWx5IGNhcCBmcm9tIGZhcmVzLmpzb25cbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmV4cG9ydCBjb25zdCBnZXRGYXJlID0gKGtleSwgdHlwZSwgY2FwcykgPT4ge1xuICBjb25zdCBmYXJlID0gY2Fwc1trZXkuY29uc3RydWN0b3IgPT09IEFycmF5ID8gam91cm5leVRvS2V5KGtleSkgOiB6b25lVG9Kb3VybmV5KGtleSldO1xuXG4gIHJldHVybiB0eXBlID8gZmFyZVt0eXBlXSA6IGZhcmU7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBudW1lcmljIGlzIHdpdGhpbiB0d28gdGFyZ2V0cyAobWluVGFyZ2V0IGFuZCBtYXhUYXJnZXQpXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQgLSB0YXJnZXQgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiBAcGFyYW0ge251bWJlcn0gbWluVGFyZ2V0IC0gdGhlIG1pblRhcmdldCAodXN1YWxseSB0aGUgbWluVHJhdmVsY2FyZCkgXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4VGFyZ2V0IC0gdGhlIG1pblRhcmdldCAodXN1YWxseSB0aGUgbWF4VHJhdmVsY2FyZCkgXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG4gZXhwb3J0IGNvbnN0IGlzV2l0aGluID0gKG1pblRhcmdldCwgdmFsdWUsIG1heFRhcmdldCkgPT4gKG1pblRhcmdldCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSBtYXhUYXJnZXQpXG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGhvd2V2ZXIgbWFueSBkZWNpbWFsIHBsYWNlcyBzcGVjaWZpZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGFyZ2V0IHZhbHVlIHRvIHJvdW5kXG4gKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbHMgLSB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHJlc3VsdCBzaG91bGQgaGF2ZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgZGVjaW1hbHMpIHtcbsKgwqDCoHJldHVybiBOdW1iZXIoYCR7TWF0aC5yb3VuZChgJHt2YWx1ZX1lJHtkZWNpbWFsc31gKX1lLSR7ZGVjaW1hbHN9YCk7XG59XG5cbi8qKlxuICogRGVhbHMgd2l0aCBoYW5kbG5pZyBlYXJseS9hZnRlcm5vb24gdHlwZSBqb3VybmV5cyAoc2VlIGJlbG93KSAtIHNvIGNhbiBhZGp1c3QgdG8gb2ZmcGVhayBvciBhbnl0aW1lIHRvIHdvcmsgb3V0IHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7dHlwZX0gLSB0aGUgam91cm5leSB0eXBlIGZvciB0aGF0OiBlaXRoZXIgdGFyZ2V0ZWQgYnkgYi50eXBlIGluIG95c3RlckRheVRvdGFsIG9yIGpvdXJuZXkudHlwZSBmb3IgY29udGFjdGxlc3NEYXlUb3RhbFxuICogQGRlc2NyaXB0aW9uXG4gLy8gZWFybHkgdHlwZSA9IHNpbmdsZSBmYXJlIGlzIG9mZiBwZWFrIGJ1dCBvbmx5IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgYW55dGltZSBkYWlseSBjYXBcbi8vIGFmdGVybm9vbiB0eXBlID0gc2luZ2xlIGZhcmUgaXMgcGVhayBidXQgbGltaXRlZCBieS9jb3VudHMgdG93YXJkcyBvZmYgcGVhayB0b29cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGVzKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdlYXJseScpIHtcbiAgICByZXR1cm4gJ29mZlBlYWsnO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG4gICAgcmV0dXJuJ2FueXRpbWUnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG59XG5cbi8qKlxuICogRGVhbHMgd2l0aCBoYW5kbG5pZyBlYXJseS9hZnRlcm5vb24gdHlwZSBqb3VybmV5cyAoc2VlIGJlbG93KSAtIHNvIGNhbiBhZGp1c3QgdG8gb2ZmcGVhayBvciBhbnl0aW1lIHRvIHdvcmsgb3V0IHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7dHlwZX0gLSB0aGUgam91cm5leSB0eXBlIGZvciB0aGF0OiBlaXRoZXIgdGFyZ2V0ZWQgYnkgYi50eXBlIGluIG95c3RlckRheVRvdGFsIG9yIGpvdXJuZXkudHlwZSBmb3IgY29udGFjdGxlc3NEYXlUb3RhbFxuICogQGRlc2NyaXB0aW9uXG4gLy8gZWFybHkgdHlwZSA9IHNpbmdsZSBmYXJlIGlzIG9mZiBwZWFrIGJ1dCBvbmx5IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgYW55dGltZSBkYWlseSBjYXBcbi8vIGFmdGVybm9vbiB0eXBlID0gc2luZ2xlIGZhcmUgaXMgcGVhayBidXQgbGltaXRlZCBieS9jb3VudHMgdG93YXJkcyBvZmYgcGVhayB0b29cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGR1YWxab25lcyhkdWFsWm9uZU92ZXJsYXAsIHpvbmVzKSB7XG4gIGlmIChkdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcbiAgICAoKChtaW5OdW0oem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG4gICAgKCgobWF4TnVtKHpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKVxuICAgICkge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbnRhY3RsZXNzIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAvLyBUaGlzIGNhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCBvciBubyBkYWlseSBjYXAgZm9yIGVhY2ggZGF5IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gYW55IHdlZWtseSBjYXBzIHBhc3NlZCBpblxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHsgZGF5IG9iamVjdH0gZGF5IG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgam91cm5leSBvYmplY3RzICh0aGF0IGluIHR1cm4gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSkpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlXG4gLy8mIGNhcElzTWV0OiBpZiBvZmZQZWFrIGNhcCB3YXMgbWV0LCB0aGVuIGRpc3BsYXlzIHRoZSBtYXggem9uZSBmb3IgdGhlIG9mZlBlYWsgZGFpbHkgY2FwLCBlbHNlIGZhbHNlLn1cbiAqIEBkZXNjcmlwdGlvbiBXb3JrcyBvdXQgaWYgaXQgaXMgY2hlYXBlc3QgdG8gaGF2ZSBubyBkYWlseSBjYXBzLCBhbiBvZmYgcGVhayBkYWlseSBjYXAgKyBwZWFrIGZhcmVzIG9yIGFuIGFueXRpbWUgY2FwICh0YWtpbmcgaW50byBhY2NvdW50IHdlZWtseSB0cmF2ZWxjYXJkcyBwYXNzZWQgaW4pXG4gKi9cblxuIGltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIGZsYXR0ZW4sXG4gIHJvdW5kLFxuICB0eXBlcyxcbiAgZHVhbFpvbmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblx0Ly8gSWYgd2Vla2x5IG1pblRyYXZlbGNhcmQgb3IgbWF4VHJhdmVsY2FyZCBwYXNzZWQgaW4sIHRoZW4gdGFrZW4gaW50byBhY2NvdW50IHdoZW4gd29ya2luZyBvdXQgc2luZ2xlIGZhcmVzXG5cdC8vIElmIG5vdCBwYXNzZWQgaW4gPSBmYWxzZVxuXHQgIGNvbnN0IHtcblx0ICAgIG1pblRyYXZlbGNhcmQsXG5cdCAgICBtYXhUcmF2ZWxjYXJkLFxuXHQgIH0gPSBvcHRpb25zO1xuXG5cdCAgLy8gSlNPTlxuXHQgIGNvbnN0IHtcblx0ICAgIGRhaWx5Q2Fwcyxcblx0ICAgIHNpbmdsZUZhcmVzLFxuXHQgIH0gPSBkYXRhO1xuXG5cdGNvbnN0IGFsbERhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGFpbHlDYXBzKTtcblxuXHQvLyBTb3J0cyBvdXQgZHVhbCB0byBkdWFsIHpvbmUgb3ZlcmxhcFxuXHRmdW5jdGlvbiBkdWFsWm9uZU92ZXJsYXAoam91cm5leSkge1xuXHRcdHJldHVybiBtYXhUcmF2ZWxjYXJkICYmIGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdFx0KCgobWluTnVtKGpvdXJuZXkuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG5cdFx0XHRcdFx0KCgobWF4TnVtKGpvdXJuZXkuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpO1xuXHR9XG5cblx0Ly8gRmlsdGVycyB0aGUgZGF5cyBzbyBvbmx5IHRoZSBkYXlzIHdpdGggam91cm5leXMgaW5zaWRlIGFyZSBwYXNzZWRcblx0Y29uc3QgdmFsaWREYXlzID0gZGF5LmZpbHRlcihqID0+ICFkdWFsWm9uZU92ZXJsYXAoaikpO1xuXG5cdC8vIDEuIENhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGZhcmUgaWYgYSBkYWlseSBhbnl0aW1lIGNhcCBpcyBhcHBsaWVkXG5cdC8vIC0tIHJldHVybnMgYW4gYXJyYXkgKGEgZmFyZSBmb3IgZWFjaCBwb3NzaWJsZSBkYWlseSBjYXApXG5cdGNvbnN0IGNoZWFwZXN0QW55dGltZSA9IGFsbERhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdGNvbnN0IHRvdGFsID0gdmFsaWREYXlzLm1hcChqb3VybmV5ID0+IHtcblxuXHRcdFx0Ly8gVXNlcyBleHRlbnNpb24gZmFyZXMgKHdpdGggYW55dGltZSBjYXAgcGFzc2VkKSB0byBjYWxjdWxhdGUgdGhlIHNpbmdsZSBmYXJlIGZvciBlYWNoIGpvdXJuZXlcblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHQgXHRcdG1heERhaWx5OiBtYXhOdW0oY2FwKSxcblx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdCBcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0XHQvLyBBZGRzIGFsbCB0aGUgc2luZ2xlIGZhcmVzIGZvciB0aGF0IGRheSB0b2dldGhlclxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXG5cdFx0Ly8gQWRkcyB0b2dldGhlciB0aGUgcmVsZXZhbnQgYW55dGltZSBjYXAgZmFyZSB3aXRoIHRoZSB0b3RhbCBkYXkgZmFyZVxuXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cdC8vIDIuIENhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGZhcmUgaWYgYSBkYWlseSBvZmZwZWFrIGNhcCBpcyBhcHBsaWVkIHdpdGggYW55dGltZSBqb3VybmV5cyBhcyBhZGRpdGlvbmFsIGNoYXJnZXNcblx0Ly8gLS0gcmV0dXJucyBhbiBvYmplY3QgKGEgZmFyZSBmb3IgZWFjaCBwb3NzaWJsZSBkYWlseSBjYXAgYW5kIHRoZSBtYXggem9uZSBvZiBlYWNoIG9mZiBwZWFrIGNhcClcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XG5cdFx0Y29uc3Qgb2ZmUGVha0RheVRvdGFsID0gdmFsaWREYXlzLm1hcChqb3VybmV5ID0+IHtcblx0XHRcdC8vIElmICdvZmZQZWFrJyBqb3VybmV5IGlzIG1hZGUsIHRoZW4gY2FuIGJlIGNhcHBlZCBieSB0aGUgY3VycmVudCBkYWlseSBvZmZQZWFrIGNhcFxuXHRcdFx0Ly8gLS0gdGh1cyBtYXhEYWlseSBpcyBwYXNzZWQgaW4gKGFzIHRoZSBkYWlseSBvZmYgcGVhayBjYXApLCBlbHNlIGZhbHNlID0gc2luZ2xlIGZhcmUgdy9vIGRhaWx5IGNhcCBcblx0XHQgICAgbGV0IG1heERhaWx5ID0gZmFsc2U7XG5cdFx0XHRpZiAoam91cm5leS50eXBlID09PSAnb2ZmUGVhaycgfHwgam91cm5leS50eXBlID09PSAnYWZ0ZXJub29uJykge1xuXHRcdFx0XHRtYXhEYWlseSA9IG1heE51bShjYXApO1xuXHRcdFx0fSBcblxuXHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdFx0bWluVHJhdmVsY2FyZCxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHRcdFx0bWF4RGFpbHksXG5cdFx0XHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0XHR0eXBlOiB0eXBlcyhqb3VybmV5LnR5cGUpLFxuXHRcdFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0Ly8gQWRkcyBhbGwgdGhlIHNpbmdsZSBmYXJlcyBmb3IgdGhhdCBkYXkgdG9nZXRoZXJcblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblxuXHRcdC8vIEFkZHMgdG9nZXRoZXIgdGhlIHJlbGV2YW50IG9mZnBlYWsgY2FwIGZhcmUgd2l0aCB0aGUgdG90YWwgZGF5IGZhcmVcblx0XHRyZXR1cm4ge1xuXHRcdFx0b2ZmUGVha01heFpvbmU6IG1heE51bShjYXApLFxuXHRcdFx0dmFsdWU6IG9mZlBlYWtEYXlUb3RhbCArIGdldEZhcmUoY2FwLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gMy4gQ2FsY3VsYXRlcyBpZiBubyBkYWlseSBjYXBzIGFyZSBhcHBsaWVkXG5cdC8vIC0tIHJldHVybnMgdGhlIHNpbmdsZSBudW1iZXJcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IHZhbGlkRGF5cy5tYXAoam91cm5leSA9PiB7XG5cblx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHQgXHRcdG1pblRyYXZlbGNhcmQsXG5cdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cblx0Ly8gRnJvbSB0aGUgb2ZmIHBlYWsgb2JqZWN0OiBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzXG5cdGNvbnN0IGNoZWFwZXN0T2ZmUGVha1ZhbHVlcyA9IGNoZWFwZXN0T2ZmUGVhay5tYXAoKGxWYWwpID0+IGxWYWwudmFsdWUpO1xuXG5cdC8vIEdldHMgdGhlIGNoZWFwZXN0IHZhbHVlL2ZhcmUgZnJvbSBhbGwgMyBkaWZmZXJlbnQgY2FsY3VsYXRpb24gcmVzdWx0cyA9IGNoZWFwZXN0IGRheSB0b3RhbFxuXHRjb25zdCBjaGVhcGVzdERheVRvdGFsID0gbWluTnVtKGNoZWFwZXN0QW55dGltZS5jb25jYXQoW2NoZWFwZXN0Tm9DYXBdLCBjaGVhcGVzdE9mZlBlYWtWYWx1ZXMpKTtcblxuXHQvLyBFdmFsdWF0ZXMgdG8gc2VlIGlmIGFueSBvZiB0aGUgY2hlYXBlc3RPZmZQZWFrIHZhbHVlcyBpcyBlcXVhbCB0byB0aGUgY2hlYXBlc3QgZGF5IHRvdGFsXG5cdGNvbnN0IGlzRXEgPSBjaGVhcGVzdE9mZlBlYWsuc29tZShlbnRyeSA9PiBlbnRyeS52YWx1ZSA9PSBjaGVhcGVzdERheVRvdGFsKTtcblxuXHQvLyBJZiBhYm92ZSBpcyB0cnVlLCB0aGVuIGZpbmRzIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCBkYXkgdG90YWwgbnVtYmVyXG5cdGNvbnN0IGNhcFZhbCA9IGlzRXEgPyBjaGVhcGVzdE9mZlBlYWsuZmlsdGVyKChsVmFsKSA9PiBsVmFsLnZhbHVlID09PSBjaGVhcGVzdERheVRvdGFsKSA6IG51bGw7XG5cblx0cmV0dXJuIHtcblx0XHQvLyBSb3VuZHMgZmluYWwgY2hlYXBlc3QgZGF5IHRvdGFsIGZhcmUgdG8gMiBkZWNpbWFsIHBsYWNlc1xuXHRcdHZhbHVlOiByb3VuZChjaGVhcGVzdERheVRvdGFsLCAyKSxcblx0XHQvLyBJZiB0aGUgb2ZmcGVhayBjYXAgd2FzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcblx0XHRjYXBJc01ldDogY2FwVmFsID8gY2FwVmFsWzBdLm9mZlBlYWtNYXhab25lIDogZmFsc2UsXG5cdH07XG59XHRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwuanMiLCIvLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gIGJ5IGRlZmF1bHQ6IGp1c3Qgb25lIHRyYXZlbGNhcmQgKHdlZWtseSB3aXRob3V0IGRhaWx5IG9yIGp1c3QgZGFpbHkgY2FwKSBmb3IgZWl0aGVyIG95c3RlciBvciBjb250YWN0bGVzcywgb3Igb3lzdGVyIHdpdGggd2Vla2x5IGNhcCAoZG9lc24ndCBjdXQgb2ZmIGRhaWx5IHNlY3Rpb24gb2YgdGhlIGpvdXJuZXkpXG4vLyBcdEZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cbmltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1heE51bSxcblx0aXNXaXRoaW4sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG9wdGlvbnMgPSB7fSwgc2luZ2xlRmFyZXMpIHtcbiAgbGV0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuXG5cdGxldCB7XG5cdFx0em9uZXMsXG5cdFx0dHlwZSxcblx0XHQvLyBNaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3RpbmdcbiAgICBcdG1pblRyYXZlbGNhcmQsXG4gICAgXHQvLyBNYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLFxuXHRcdC8vIElmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblxuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuICBsZXQgbWluU2luZ2xlID0gem9uZXNbMF07XG4gIGxldCBtYXhTaW5nbGUgPSB6b25lc1sxXTtcbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXG5cdC8vIElmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvIChoZW5jZSBhZGRpbmcgaW4gbWF4RGFpbHkgYXMgYXJndW1lbnQpXG5cdGlmIChtYXhEYWlseSAmJiBtYXhUcmF2ZWxjYXJkKSB7IFxuXHRcdC8vIElmIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7XG5cdCBcdFx0Ly8gU2V0cyBtaW5UcmF2ZWxjYXJkIHRvIDEgc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0ICBcdFx0bWluVHJhdmVsY2FyZCA9IDE7IFxuXHQgIFx0XHQvLyBtYXhUcmF2ZWxjYXJkIGlzIHdoaWNoZXZlciBpcyBsYXJnZXN0IG1heCBkYWlseSBvciBtYXggdHJhdmVsY2FyZFxuXHQgICBcdFx0bWF4VHJhdmVsY2FyZCA9IG1heE51bShbbWF4RGFpbHksIG1heFRyYXZlbGNhcmRdKTsgXG5cblx0ICAgXHQvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FUyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0XHQvLyAtLSBzbyBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gb25seSBjaGFyZ2UgdGhlIGZyb250KVxuXHRcdH0gZWxzZSB7IFxuXHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0ZmluYWxDb25kaXRpb24gPSAobWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSk7XG5cdFx0fVxuXHR9XG5cdC8vIElmIG9ubHkgbWF4RGFpbHkgaXMgcGFzc2VkIGluIGFuZCBubyBtYXhUcmF2ZWxjYXJkXG5cdC8vIC0tIFRoZW4gbWF4VHJhdmVsY2FyZCBiZWNhb21lcyBtYXhEYWlseSwgbWluVHJhdmVsY2FyZCBpcyAxIChhcyBkYWlseSBjYXBzIHN0YXJ0IGF0IDEpIGFuZCBtYXhEYWlseSBpcyBub3QgbmVlZGRlZFxuXHRpZiAobWF4RGFpbHkgJiYgIW1heFRyYXZlbGNhcmQpIHtcblx0XHRtYXhUcmF2ZWxjYXJkID0gbWF4RGFpbHk7XG5cdFx0bWluVHJhdmVsY2FyZCA9IDE7XG5cdFx0bWF4RGFpbHkgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChpc1dpdGhpbihtaW5UcmF2ZWxjYXJkLCBtYXhTaW5nbGUsIG1heFRyYXZlbGNhcmQpKSkge1xuXHRcdHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuXHQvLyBJZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKGlzV2l0aGluKG1pblRyYXZlbGNhcmQsIG1pblNpbmdsZSwgbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNoYXJnZSBmcm9udCBhbmQgZW5kXG4gXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuXG4gXHRcdHJldHVybiBzcGxpdE9yRnVsbEZhcmUoXG4gICAgICBcdFx0bWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvLyBCb3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyAtIG5vIGNoYXJnZVxuIFx0fSBlbHNlIGlmIChpc1dpdGhpbihtaW5UcmF2ZWxjYXJkLCBtaW5TaW5nbGUsIG1heFRyYXZlbGNhcmQpXG4gXHRcdCYmIGlzV2l0aGluKG1pblRyYXZlbGNhcmQsIG1heFNpbmdsZSwgbWF4VHJhdmVsY2FyZClcbiBcdFx0fHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0cmV0dXJuIDA7XG4gXHRcbiBcdH1cblxuXHQvLyBKb3VybmV5IGlzIG1hZGUgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lcyAtIGNoYXJnZSB0aGUgZmFyZVxuICByZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7Y29tcGxleCBqb3VybmV5cyBvYmplY3R9IGpvdXJuZXlzIC0gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gLSBvYmplY3QgY29udGFpbmluZyB7dmFsdWU6IHJldHVybnMgdGhlIHRvdGFsIGZhcmVcbiAvLyAmIGNhcElzTWV0OiBpZiBvZmZQZWFrIGNhcCB3YXMgbWV0LCB0aGVuIGRpc3BsYXlzIHRoZSBtYXggem9uZSBmb3IgdGhlIG9mZlBlYWsgZGFpbHkgY2FwLCBlbHNlIGZhbHNlLn1cbiAqIEBkZXNjcmlwdGlvbiBpcyBjYXBwZWQgYnkgb2ZmIHBlYWsgZGFpbHkgY2FwIG9yIHBlYWsgY2FwIChjdW11bGF0aXZlbHkpIHdoZXJlIG5lY2Vzc2FyeVxuICovXG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRGYXJlLFxuICB6b25lVG9Kb3VybmV5LFxuICByb3VuZCxcbiAgdHlwZXMsXG4gIGR1YWxab25lLFxuICBpc1dpdGhpbixcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXG4gIGNvbnN0IHtcbiAgICBtaW5UcmF2ZWxjYXJkLFxuICAgIG1heFRyYXZlbGNhcmQsXG4gIH0gPSBvcHRpb25zO1xuXG4gIC8vIEpTT05cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcyxcbiAgICBzaW5nbGVGYXJlcyxcbiAgfSA9IGRhdGE7XG5cbiAgY29uc3QgZGF5VG90YWwgPSBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcblxuICAgIC8vIFR5cGVzIGZ1bmN0aW9uIGRlYWxzIHdpdGggZWFybHkvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuICAgIGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGIudHlwZSk7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGpvdXJuZXlUeXBlLCBzaW5nbGVGYXJlcyk7XG5cbiAgICAvLyBUYWtlcyB0aGUgbnVtYmVycyBmcm9tIHRoZSBwcmV2aW91cyBsb29wXG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcblxuICAgIC8vIFRoZSBtYXhpbXVtIHpvbmUgdHJhdmVsbGVkIGluIHNvIGZhciBpcyB1cGRhdGVkIHdpdGggY3VycmVudCB6b25lc1xuICAgIGxldCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcblxuICAgIC8vIEluIHByZXBhcmF0aW9uIGZvciB3aGV0aGVyIG9mZiBwZWFrIGRhaWx5IGNhcCBpcyBtZXQgb3Igbm90ICh0byBiZSBwYXNzZWQgb3V0IHdpdGhpbiBjYXBJc01ldClcbiAgICBsZXQgb2ZmUGVha1JlYWNoZWRQcmUgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha1JlYWNoZWQgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha01heFpvbmUgPSBhLm9mZlBlYWtNYXhab25lO1xuICAgIGxldCBhbnl0aW1lUmVhY2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gRk9SIFdFRUtMWSB0cmF2ZWxjYXJkcyAtIGllIGlmIHRoZSBtYXggdHJhdmVsY2FyZCBwYXNzZWQgaW4sIGV4dGVuc2lvbiBmYXJlcyBpcyB1c2VkIHRvIGNhbGN1bGF0ZSBzaW5nbGUgZmFyZVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe1xuICAgICAgICB6b25lczogYi56b25lcyxcbiAgICAgICAgdHlwZTogYi50eXBlLFxuICAgICAgICBtaW5UcmF2ZWxjYXJkLFxuICAgICAgICBtYXhUcmF2ZWxjYXJkXG4gICAgICB9LCBzaW5nbGVGYXJlcyk7XG4gICAgICBcbiAgICAgIC8vIER1YWwgem9uZSB0byBkdWFsIHpvbmUgam91cm5leXMgZGVhbHQgd2l0aCwgaWYgdHJhdmVsY2FyZCBhbHNvIHBhc3NlZCAoZnJlZSBpZiBkdWFsIHpvbmVzIGFyZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcylcbiAgICAgIGlmIChiLmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAoaXNXaXRoaW4obWluVHJhdmVsY2FyZCwgKChtaW5OdW0oYi56b25lcykpICsgMSksIG1heFRyYXZlbGNhcmQpKSAmJlxuICAgICAgICAoaXNXaXRoaW4obWluVHJhdmVsY2FyZCwgKChtYXhOdW0oYi56b25lcykpICsgMSksIG1heFRyYXZlbGNhcmQpKVxuICAgICAgICApIHtcbiAgICAgICAgc2luZ2xlRmFyZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZXMgYW55IG92ZXJsYXAgYmV0d2VlbiB3ZWVrbHkgdHJhdmVsY2FyZCBhbmQgbWF4U2luZ2xlXG4gICAgICAvLyBJLmUuIENvbXBhcmVzIHRvdGFsIGFnYWluc3QgZGFpbHkgY2FwIG9mIG1pblNpbmdsZSB0byBtaW5UcmF2ZWxjYXJkIC0gMSByYXRoZXIgdGhhbiBtYXhTaW5nbGVcbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiAoaXNXaXRoaW4oKG1pblRyYXZlbGNhcmQgLSAxKSwgbWF4Wm9uZSwgbWF4VHJhdmVsY2FyZCkpKSB7XG4gICAgICAgIG1heFpvbmUgPSBtaW5UcmF2ZWxjYXJkIC0gMTsgXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgLy8gSWYgdGhlIGN1cnJlbnQgam91cm5leSBtYWRlIHdhcyBPRkZQRUFLIChvciBhZnRlcm5vb24gd2hpY2ggaXMgY292ZXJlZCBieSBvZmZwZWFrKVxuICAgIGlmIChiLnR5cGUgPT09ICdvZmZQZWFrJyB8fCBiLnR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG4gICAgICAvLyBPZmYgcGVhayB0b3RhbCBnZXRzIHVwZGF0ZWQgYW5kIGlmIG5lZWRlZCBvdmVycmlkZGVuIHdpdGggb2ZmcGVhayBkYWlseSBjYXBcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSkgPj0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcykpIHtcbiAgICAgICAgb2ZmUGVha1JlYWNoZWRQcmUgPSB0cnVlO1xuICAgICAgICBvZmZQZWFrVG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZlBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgICAgfVxuXG4gICAgICAvLyBDdXJyZW50IHRvdGFsIGlzIHVwZGF0ZWQgaWYgbmVlZGVkIGJlY29tZXMgb2ZmIHBlYWsgdG90YWwgKyBwcmV2aW91cyBwZWFrIHRvdGFsXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbCkgPD0gY3VycmVudFRvdGFsKSB7XG4gICAgICAgIC8vIElmIHRoaXMgY29uZGl0aW9uIGFuZCB0aGUgcHJlIGNvbmRpdGlvbnMgYXJlIGJvdGggbWV0XG4gICAgICAgIC8vIC0gKGllIGEgY3VycmVudCBvciBwcmV2aW91cyBvZmZwZWFrIGRhaWx5IGNhcCBhcHBsaWVkIHRvIGN1cnJlbnR0b3RhbCksIHJldHVybiB0aGUgbWF4Wm9uZSBmb3Igb2ZmIHBlYWsgY2FwXG4gICAgICAgIGlmIChvZmZQZWFrUmVhY2hlZFByZSkge1xuICAgICAgICAgIG9mZlBlYWtSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICBvZmZQZWFrTWF4Wm9uZSA9IG1heFpvbmU7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFRvdGFsID0gb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsO1xuICAgICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGZvciBQRUFLIHRyYXZlbCB0aGUgcGVhayB0b3RhbCBpcyB1cGRhdGVkIGluIHByZXBhcmF0aW9uIGZvciBuZXh0IHJvdW5kXG4gICAgfSBlbHNlIHtcbiAgICAgIHBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgIH1cblxuICAgIC8vIElmIG5lZWRlZCBjdXJyZW50IHRvdGFsIGlzIHRvdGFsbHkgb3ZlcnJpZGRlbiBieSBhbnl0aW1lIGRhaWx5IGNhcFxuICAgIGlmIChjdXJyZW50VG90YWwgPiAoZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcykpKSB7XG4gICAgICAvLyBJZiBhbnl0aW1lIGRhaWx5IGNhcCByZWFjaGVkLCBvZmYgcGVhayByZWFjaGVkIHdpbGwgdGhlbiBiZSBzZXQgdG8gZmFsc2VcbiAgICAgIC8vIChhcyBhbnl0aW1lIGFwcGxpZWQgbm90IG9mZiBwZWFrIGNhcClcbiAgICAgIGFueXRpbWVSZWFjaGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAvLyBPYmplY3QgaXMgcmV0dXJuZWQgdG8gYmUgY29tcGFyZWQgXG4gICAgICBjdXJyZW50VG90YWwsXG4gICAgICBvZmZQZWFrVG90YWwsXG4gICAgICBwZWFrVG90YWwsXG4gICAgICBtYXhab25lLFxuICAgICAgb2ZmUGVha01heFpvbmUsXG4gICAgICAvLyBFbnN1cmVzIHRoYXQgcHJldmlvdXMgb2ZmIHBlYWsgY2FwcyBhcHBsaWVzIHRvIGZ1dHVyZSBsb29wcyAtIGlmIHRydWUsIHN0YXlzIHRydWVcbiAgICAgIG9mZlBlYWtSZWFjaGVkOiAoYS5vZmZQZWFrUmVhY2hlZCAmJiAhYW55dGltZVJlYWNoZWQpID8gdHJ1ZSA6IG9mZlBlYWtSZWFjaGVkLFxuICAgIH07XG5cbiAgfSwge1xuICAgIGN1cnJlbnRUb3RhbDogMCxcbiAgICBvZmZQZWFrVG90YWw6IDAsXG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG1heFpvbmU6IG51bGwsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLy8gUm91bmRzIGZpbmFsIHRvdGFsIGZhcmUgdG8gMiBkZWNpbWFsIHBsYWNlc1xuICAgIHZhbHVlOiByb3VuZChkYXlUb3RhbC5jdXJyZW50VG90YWwsIDIpLFxuICAgIC8vIElmIHRoZSBvZmZwZWFrIGNhcCBpcyBtZXQsIHJldHVybiBhIHZhcmlhYmxlICdjYXBJc01ldCcgKyBtYXhab25lIG9mIHRoYXQgY2FwXG4gICAgY2FwSXNNZXQ6IGRheVRvdGFsLm9mZlBlYWtSZWFjaGVkID8gZGF5VG90YWwub2ZmUGVha01heFpvbmUgOiBmYWxzZSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHdlZWsgdG90YWwgKGJhc2VkIG9uIHBhcmFtZXRlciBveXN0ZXIgb3IgY29udGFjdGxlc3MgcGFzc2VkIGFzIGFyZ3VtZW50KVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtmdW5jdGlvbiAtIHN0cmluZ30gY29uRGF5VG90YWwgb3Igb3lzdGVyRGF5VG90YWwgLSB0byBjYWxjdWxhdGUgdXNpbmcgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIFxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge29iamVjdH0gaW5mbyAtIGlzIGFuIG9iamVjdCB3aXRoIHtcbiBcdFx0XHRvcHRpb25zOiB7b2JqZWN0IHRoYXQgaGFzIG1pblRyYXZlbGNhcmQ6IG51bSBhbmQgbWF4VHJhdmVsY2FyZDogbnVtfSwgXG4gXHRcdFx0ZGF0YSB9XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRvdGFsIGNoZWFwZXN0IG95c3RlciBvciBjb250YWN0bGVzcyBmYXJlIGZvciB0aGF0IHdlZWtcbiAqIEBkZXNjcmlwdGlvbiBJdCBhbHNvIGRlZHVjdHMgdGhlIGF1dG9tYXRpYyBvZmZwZWFrIHJlZnVuZHMgZm9yIHpvbmVzIDQtNiBpZiBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG1vcmUgdGhhbiBvbmNlIGVhY2ggd2Vla1xuIFx0XHRlLmcuOiBcbiAgICAgICBjb25zdCB5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSk7XG4gKi9cblxuIC8vU0hPVUxEIE1BUCBPVkVSIEpTT04gVE8gRklORCBUSEUgWk9ORVMgV0lUSCBPRkYgUEVBSyBESVNDT1VOVCByYXRoZXIgdGhhbiBhZGQgNCwgNSBhbmQgNlxuIGltcG9ydCB7XG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlZWtUb3RhbChwYXltZW50RnVuY3Rpb24sIGRheXMsIGluZm8pIHtcblx0Ly8gRmlsdGVycyB0aGUgZGF5cyBieSB0aG9zZSB3aXRoIGpvdXJuZXlzXG5cdGNvbnN0IHZhbGlkRGF5cyA9IGRheXMuZmlsdGVyKGRheSA9PiBkYXkubGVuZ3RoID4gLTEpO1xuXG5cdC8vIFVzZXMgdGhlIHBheW1lbnRGdW5jdGlvbiBwYXNzZWQgaW4gKG95c3RlciBvciBjb250YWN0bGVzcykgdG8gZ2VuZXJhdGUgYW4gYXJyYXlcblx0Ly8gLS0gQXJyYXkgaXMgYW4gb2JqZWN0IHBlciBkYXkgKHdpdGggZGF5IHRvdGFsIGZhcmUgYW5kIGlzQ2FwTWV0KVxuXHRjb25zdCB3ZWVrQWxsQ2FwcyA9IHZhbGlkRGF5cy5tYXAoKGRheSkgPT4gcGF5bWVudEZ1bmN0aW9uKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpKTtcblxuXHQvLyBMb29wcyBvdmVyIHRoZSBvYmplY3QgcGVyIGRheSB0byBhY2N1bXVsYXRlIHRoZSBudW1iZXIgb2Ygb2ZmIHBlYWsgem9uZSAxLTQsIDEtNSBhbmQgMS02IGRhaWx5IGNhcHMgbWV0XG5cdGNvbnN0IG9mZlBlYWtDYXBzID0gd2Vla0FsbENhcHMucmVkdWNlKChhLCBiKSA9PiB7XG5cdFx0aWYgKGIuaGFzT3duUHJvcGVydHkoJ2NhcElzTWV0JykgJiYgYi5jYXBJc01ldCAhPT0gZmFsc2UpIHtcblx0XHRcdGFbYi5jYXBJc01ldF0gKz0gMTtcblx0XHR9XG5cdFx0cmV0dXJuIGE7XG5cblx0fSwgeyc0JzogMCwgJzUnOiAwLCAnNic6IDB9KTtcblxuXHQvLyBBZGRzIHRvZ2V0aGVyIHRoZSBkYXkgdG90YWwgZmFyZXMgdG8gPSBjdXJyZW50IHdlZWsgdG90YWwgZmFyZVxuICBcdGxldCB3ZWVrVG90YWxGYXJlID0gd2Vla0FsbENhcHMucmVkdWNlKChhLCBiKSA9PiBhICsgYi52YWx1ZSwgMCk7XG5cbiAgXHQvLyBJZiBvZmYgcGVhayBkYWlseSBjYXAgYmV0d2VlbiA0LTYgbWV0IGZvciAyKyBhIHdlZWssIGFwcGxpZXMgdGhlIGRpc2NvdW50KHMpXG5cdGlmICgob2ZmUGVha0NhcHNbJzQnXSArIG9mZlBlYWtDYXBzWyc1J10gKyBvZmZQZWFrQ2Fwc1snNiddKSA+PSAyKSB7XG5cdCAgd2Vla1RvdGFsRmFyZSAtPVxuXHQgIFx0KFxuXHQgIFx0XHQob2ZmUGVha0NhcHNbJzQnXSAqIChcblx0ICBcdFx0XHRnZXRGYXJlKFsxLCA0XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0ICBcdFx0KSlcblx0XHQgIFx0KyAob2ZmUGVha0NhcHNbJzYnXSAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA2XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0XHQgIFx0KyAob2ZmUGVha0NhcHNbJzUnXSAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA1XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0ICBcdCk7XG5cdH1cblxuXHQvLyBSZXR1cm5zIHRoZSBmaW5hbCB3ZWVrIHRvdGFsXG5cdHJldHVybiB3ZWVrVG90YWxGYXJlO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIHdlZWtcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gdmFsdWU6IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gLy8gYW5kIGNhcDogdGhlIHdlZWtseSBjYXAgYXBwbGllZCAoaWYgYW55KVxuICogQGRlc2NyaXB0aW9uIGNhbGN1bGF0ZXMgd2hldGhlciBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIGEgd2Vla2x5IHRyYXZlbGNhcmQgb3Igbm9uZVxuICovXG5cbiBpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICByb3VuZCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcbmltcG9ydCBveXN0ZXJNb250aGx5IGZyb20gJy4vX295c3Rlck1vbnRobHknO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdC8vIDEuIElmIG5vIHdlZWtseSBjYXAgaXMgcGFzc2VkIGluXG5cdGNvbnN0IG5vQ2FwUmVzdWx0ID0ge1xuXHRcdCdub0NhcCc6IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBmYWxzZSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9O1xuXHQvLyAyLiBGb3IgZWFjaCBwb3NzaWJsZSB3ZWVrbHkgY2FwXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHdlZWtUb3RsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cdFx0Ly8gUmV0dXJucyBhbiBvYmplY3Q6IHRoZSB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSB3ZWVrIHRvdGFsICh3aXRoIHdlZWtseSBjYXAgYWRkZWQpXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkod2Vla0NhcCldOiB3ZWVrVG90bCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gQWRkcyBub0NhcCBhbmQgZWFjaCB3ZWVrbHkgY2FwIG9iamVjdCBpbnRvIG9uZSBvYmplY3Qgb2YgYWxsIHBvc3NpYmxlIHdlZWtseSB0b3RhbCBmYXJlc1xuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHQvLyBMb29wcyB0aGlzIG9iamVjdCB0byBmaW5kIHRoZSBjaGVhcGVzdCB3ZWVrIHRvdGFsXG5cdGNvbnN0IGNoZWFwZXN0ID0gT2JqZWN0LmtleXMoYWxsQ2FwcykucmVkdWNlKChhLCBiKSA9PiBhbGxDYXBzW2FdIDwgYWxsQ2Fwc1tiXSA/IGEgOiBiKTtcblx0XG5cdC8vIFJldHVybnMgb2JqZWN0OiB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNhcCBhc3NvY2lhdGVkIGFuZCB0aGUgY2hlYXBlc3Qgd2Vla2x5IHRvdGFsIChyb3VuZGVkIHRvIDIgZHApXG5cdGNvbnN0IHdlZWtseVZhbHVlID0gcm91bmQoKGFsbENhcHNbY2hlYXBlc3RdKSwgMik7XG5cblx0cmV0dXJuIHtcblx0XHRjYXA6IGNoZWFwZXN0LFxuXHRcdHdlZWtseVZhbHVlLFxuXHRcdG1vbnRobHlWYWx1ZTogb3lzdGVyTW9udGhseShjaGVhcGVzdCwgd2Vla2x5VmFsdWUsIGRhdGEpLFxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgd2Vla1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIHJvdW5kZWQgdG8gMiBkcFxuICogQGRlc2NyaXB0aW9uIGNhbGN1bGF0ZXMgd2hldGhlciBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIGEgd2Vla2x5IHRyYXZlbGNhcmQgb3Igbm9uZVxuICovXG5cbiBpbXBvcnQge1xuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFjdGxlc3MoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG4gIC8vIDEuIEZvciBlYWNoIHBvc3NpYmxlIHdlZWtseSBjYXBcbiAgLy8gcmV0dXJucyB0aGUgYXJyYXkgb2YgZWFjaCB3ZWVrbHkgY2FwIHRvdGFsIHdlZWsgZmFyZVxuIFx0Y29uc3QgZmluYWwgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuICAgICAgY29uc3QgdG90YWwgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0b3RhbCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2Fwcyk7XG4gICAgfSk7XG5cbiAgLy8gMi4gSWYgbm8gd2Vla2x5IGNhcCBpcyBwYXNzZWQgaW5cbiAgLy8gR2V0cyB0aGUgZmFyZSBmb3IgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKSB3aGVuIG5vIHdlZWtseSB0cmF2ZWxjYXJkcyBhcmUgcGFzc2VkIGluXG4gIC8vIHJldHVybnMgYSBudW1iZXJcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICB9LFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyBSZXR1cm5zIGEgbnVtYmVyOiBjaGVhcGVzdCB0b3RhbCB3ZWVrbHkgZmFyZSBvbiBjb250YWN0bGVzcyAocm91bmRlZCB0byAyIGRwKVxuICAvLyAtLSBieSBhcHBlbmRpbmcgdGhlIG5vV2Vla2x5IG51bWJlciB0byB0aGUgZmluYWwgYXJyYXkgYW5kIGZpbmRpbmcgdGhlIHNtYWxsZXN0IG51bWJlclxuICByZXR1cm4gcm91bmQoXG4gIFx0XHQobWluTnVtKGZpbmFsLmNvbmNhdChbbm9XZWVrbHldKSkpLCAyKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2ZpbmFsTWluWm9uZSwgZmluYWxNYXhab25lXTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbnRhY3RsZXNzIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrIHdpdGggd2VlayBjYXAgZnJvbSBhIG1vbnRobHkgdHJhdmVsY2FyZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3R9IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSByb3VuZGVkIHRvIDIgZHBcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7IGdldEZhcmUsXG5cdFx0XHRyb3VuZCxcblx0XHRcdGdldERpZmZlcmVuY2UsXG5cdFx0XHRrZXlUb0pvdXJuZXksXG5cdFx0IH0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyTW9udGhseShjYXAsIHdlZWtseVZhbHVlLCBkYXRhKSB7XG5cdGlmIChjYXAgIT09IFwibm9DYXBcIikge1xuXG5cdFx0Ly8gTW9udGhseSBpcyBiYXNlZCBvbiBlYWNoIGNhbGVuZGFyIG1vbnRoOiAqMTIgbW9udGhzIC8gNTIgd2Vla3Ncblx0XHQvLyBDYWxjdWxhdGVzIHRoZSBjb3N0IG9mIHRoZSB3ZWVrIGNhcCBiYXNlZCBvbiB0aGUgbW9udGhseSBjYXBcblx0XHRjb25zdCB3ZWVrRnJvbU1vbnRobHkgPSAoKGdldEZhcmUoa2V5VG9Kb3VybmV5KGNhcCksIGZhbHNlLCBkYXRhLm1vbnRobHlDYXBzKSkgKiAxMiApIC8gNTI7XG5cblx0XHQvLyBHZXRzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHdlZWsgY2FwIGZyb20gd2Vla2x5IGNhcHMgYW5kIHRoZSB3ZWVrIGNhcCBmcm9tIG1vbnRobHkgY2FwIChhIGRpc2NvdW50KVxuXHRcdGNvbnN0IGRpc2NvdW50ID0gZ2V0RGlmZmVyZW5jZShcblx0XHRcdFx0XHRcdFx0d2Vla0Zyb21Nb250aGx5LFxuXHRcdFx0XHRcdFx0XHQoZ2V0RmFyZShrZXlUb0pvdXJuZXkoY2FwKSwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcykpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0Ly8gQXBwbGllcyB0aGUgZGlzY291bnQgdG8gdGhlIG95c3RlciB3ZWVrIHRvdGFsIG9mIHRoYXQgd2Vla1xuXHRcdHJldHVybiByb3VuZCgod2Vla2x5VmFsdWUgLSBkaXNjb3VudCksIDIpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlck1vbnRobHkuanMiLCIvKipcbiAqSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkXG4gKEkuZS4gQSBqb3VybmV5IG9mIGUuZy4gMS02IGJ1dCBhIHRyYXZlbCBjYXJkIG9mIDMtNClcbiAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6IGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyAoMS0yICsgNS02KVxuIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmQgKDEtNikuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHQvLyBUaGUgZnVsbCBmYXJlIChkaXNyZWdhcmRpbmcgYW55IHRyYXZlbGNhcmRzKVxuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cblx0XHQvLyBUaGUgZmFyZSBiZXR3ZWVuIG1pbkNoYXJnZWQgWm9uZSBhbmQgbWluVHJhdmVsY2FyZCArIDEgLSBjaGFyZ2VzIHRoZSBmcm9udFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKVxuXHRcdC8vIFRoZSBmYXJlIGJldHdlZW4gbWF4VHJhdmVsY2FyZCArIDEgYW5kIG1heFNpbmdsZSAtIGNoYXJnZXMgdGhlIGJhY2tcblx0XHRcdCsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpXG5cdFx0KVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb250YWN0bGVzcyBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzcyc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vcGFydGlhbHMvX3dlZWtUb3RhbCc7XG5pbXBvcnQgb3lzdGVyTW9udGhseSBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJNb250aGx5JztcbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG4vLyBBZGQgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlclxuLy8gQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gQVBJIEhBTkRMSU5HXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG4vLyBTSE9VTEQgTUFQIE9WRVIgSlNPTiBUTyBGSU5EIFRIRSBaT05FUyBXSVRIIE9GRiBQRUFLIERJU0NPVU5UIHJhdGhlciB0aGFuIGFkZCA0LCA1IGFuZCA2IGZvciB3ZWVrVG90YWxcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgc2luZ2xlRmFyZXMgPSBkYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZGF0YS5kYWlseUNhcHM7XG5cbmNvbnN0IGRheXMgPSBbXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICAgICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICAgICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG5dO1xuXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIFwiY29udGFjdGxlc3MgPSBcIiArIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpXG4gIC8vICk7XG5cbiAgLy8gLy8gZmluYWwgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSBvbiBveXN0ZXJcbiAgY29uc29sZS5sb2coXG4gICAgb3lzdGVyTW9udGhseShcIjMtNlwiLCAzOS44LCBkYXRhKVxuICApO1xuICAgY29uc29sZS5sb2coXG4gICAgb3lzdGVyKGRheXMsIGRhdGEpXG4gICk7XG5cblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgLy8gICAgIGZhbHNlLFxuICAvLyAgICAgZGF0YSxcbiAgLy8gICB9KVxuICAvLyApO1xuXG4gIC8vIGNvbnNvbGUubG9nKG95c3Rlck1vbnRobHkoZGF5cywgZGF0YSkpOyBcblxuLy8gY29uc3Qgam91cm5leSA9IFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyBdO1xuICAvLyBjb25zdCBqb3VybmV5ID0gW1xuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gIC8vICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gIC8vICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgLy8gICB9LFxuICAvLyBdO1xuXG4gIC8vICAgY29uc29sZS5sb2coXG4gIC8vICAgY29uRGF5VG90YWwoXG4gIC8vICAgICBqb3VybmV5LFxuICAvLyAgICAge1xuXG4gIC8vICAgICB9LCB7XG4gIC8vICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgLy8gICAgICAgICBzaW5nbGVGYXJlc1xuICAvLyAgICAgICB9KVxuICAvLyApO1xuLy8gY29uc29sZS5sb2coXG4vLyAgICAgICAgICAgICAgIHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuLy8gICAgICAgICBvcHRpb25zOiB7XG4vLyAgICAgICAgICAgbWluVHJhdmVsY2FyZDogMSxcbi8vICAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiAyLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBkYXRhLFxuLy8gICAgICAgfSlcbi8vICAgICAgICAgICAgICAgKTtcblxuICAvLyAgICAgY29uc29sZS5sb2coXG4gIC8vICAgICAgIG95c3RlckRheVRvdGFsKFxuICAvLyAgICAgICAgIGpvdXJuZXksXG4gIC8vICAgICAgIHtcbiAgLy8gICAgICAgbWluVHJhdmVsY2FyZDogNCxcbiAgLy8gICAgICAgbWF4VHJhdmVsY2FyZDogNSxcbiAgLy8gICAgICB9LCB7XG4gICAgICAgICAgXG4gIC8vICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgLy8gICAgICAgICBzaW5nbGVGYXJlc1xuICAvLyAgICAgICB9KVxuICAvLyApO1xuXG4vLyBjb25zb2xlLmxvZyhleHRlbnNpb25GYXJlcyh7XG4vLyAgICAgICAgIHpvbmVzOiBbMSwgNF0sXG4vLyAgICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuLy8gICAgICAgICBtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcbi8vICAgICAgICAgbWF4RGFpbHk6IDEsXG4vLyAgICAgICAgIHR5cGU6ICdhbnl0aW1lJyxcbi8vICAgICAgIH0sIHNpbmdsZUZhcmVzKSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9