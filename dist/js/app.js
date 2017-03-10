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
/* harmony export (immutable) */ __webpack_exports__["k"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["l"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["f"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* harmony export (immutable) */ __webpack_exports__["b"] = getDifference;
/* harmony export (immutable) */ __webpack_exports__["j"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["g"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["d"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isWithin; });
/* harmony export (immutable) */ __webpack_exports__["c"] = round;
/* harmony export (immutable) */ __webpack_exports__["h"] = types;
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


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* keysToJourney */])(dailyCaps);

	// Sorts out dual to dual zone overlap
	function dualZoneOverlap(journey) {
		return maxTravelcard && journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(journey.zones) + 1 <= maxTravelcard;
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
				maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(cap),
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* types */])(journey.type)
			}, singleFares);

			// Adds all the single fares for that day together
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		// Adds together the relevant anytime cap fare with the total day fare
		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// 2. Calculates the cheapest fare if a daily offpeak cap is applied with anytime journeys as additional charges
	// -- returns an object (a fare for each possible daily cap and the max zone of each off peak cap)
	var cheapestOffPeak = allDailyCaps.map(function (cap) {

		var offPeakDayTotal = validDays.map(function (journey) {
			// If 'offPeak' journey is made, then can be capped by the current daily offPeak cap
			// -- thus maxDaily is passed in (as the daily off peak cap), else false = single fare w/o daily cap 
			var maxDaily = false;
			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				maxDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(cap);
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: maxDaily,
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* types */])(journey.type)
			}, singleFares);

			// Adds all the single fares for that day together
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		// Adds together the relevant offpeak cap fare with the total day fare
		return {
			offPeakMaxZone: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(cap),
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// 3. Calculates if no daily caps are applied
	// -- returns the single number
	var cheapestNoCap = validDays.map(function (journey) {

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: minTravelcard,
			maxTravelcard: maxTravelcard,
			zones: journey.zones,
			type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* types */])(journey.type)
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	}, 0);

	// From the off peak object: creates an array of the cheapestOffPeak values
	var cheapestOffPeakValues = cheapestOffPeak.map(function (lVal) {
		return lVal.value;
	});

	// Gets the cheapest value/fare from all 3 different calculation results = cheapest day total
	var cheapestDayTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(cheapestAnytime.concat([cheapestNoCap], cheapestOffPeakValues));

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
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* round */])(cheapestDayTotal, 2),
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
			maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])([maxDaily, maxTravelcard]);

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
	if (minSingle < minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, maxSingle, maxTravelcard)) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		// If min single within travelcard zones but max single isnt - charge end
	} else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, minSingle, maxTravelcard) && maxSingle > maxTravelcard) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

		// If min single less than min travelcard and max single more than max travelcard - charge front and end
	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares, type);

		// Both single zones within travelcard zones - no charge
	} else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, minSingle, maxTravelcard) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, maxSingle, maxTravelcard) || finalCondition) {
		return 0;
	}

	// Journey is made are outside travelcard zones - charge the fare
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
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
    var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["h" /* types */])(b.type);
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(b.zones, journeyType, singleFares);

    // Takes the numbers from the previous loop
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;

    // The maximum zone travelled in so far is updated with current zones
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])([].concat(a.maxZone, b.zones));

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
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(b.zones) + 1, maxTravelcard) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(b.zones) + 1, maxTravelcard)) {
        singleFare = 0;
      }

      // Removes any overlap between weekly travelcard and maxSingle
      // I.e. Compares total against daily cap of minSingle to minTravelcard - 1 rather than maxSingle
      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["i" /* isWithin */])(minTravelcard - 1, maxZone, maxTravelcard)) {
        maxZone = minTravelcard - 1;
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // If the current journey made was OFFPEAK (or afternoon which is covered by offpeak)
    if (b.type === 'offPeak' || b.type === 'afternoon') {
      // Off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'offPeak', dailyCaps);
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
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      // If anytime daily cap reached, off peak reached will then be set to false
      // (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(maxZone, 'anytime', dailyCaps);
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
    value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* round */])(dayTotal.currentTotal, 2),
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
		weekTotalFare -= offPeakCaps['4'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + offPeakCaps['6'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + offPeakCaps['5'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__weekTotal__ = __webpack_require__(4);
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
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* keysToJourney */])(data.weeklyCaps);

	// 1. If no weekly cap is passed in
	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: false,
				maxTravelcard: false
			},
			data: data
		})
	};
	// 2. For each possible weekly cap
	var capsResultPre = weeklyCaps.map(function (weekCap) {
		var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(weekCap)
			},
			data: data
		});
		// Returns an object: the weekly cap associated and the week total (with weekly cap added)
		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* journeyToKey */])(weekCap), weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	// Adds noCap and each weekly cap object into one object of all possible weekly total fares
	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	// Loops this object to find the cheapest week total
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	// Returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	return {
		cap: cheapest,
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* round */])(allCaps[cheapest], 2)
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

  // 1. For each possible weekly cap
  // returns the array of each weekly cap total week fare
  var final = weeklyCaps.map(function (weekCap) {
    var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* maxNum */])(weekCap)
      },
      data: data
    });
    return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])(weekCap, false, data.weeklyCaps);
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
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(final.concat([noWeekly])), 2);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["l" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["l" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["j" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["l" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])([singleMin].concat(dualZones));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterMonthly;
/**
 * Calculates the contactless total fare for the week with week cap from a monthly travelcard
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */

// SHOULD THIS BE MERGED WITH OYSTER?



function oysterMonthly(days, data) {
	var oysterCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oyster__["a" /* default */])(days, data).cap;
	if (oysterCap !== "noCap") {

		// Monthly is based on each calendar month: *12 months / 52 weeks
		// Calculates the cost of the week cap based on the monthly cap
		var weekFromMonthly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* getFare */])([oysterCap], false, data.monthlyCaps) * 12 / 52;

		// Gets the difference between the week cap from weekly caps or week cap from monthly cap
		var discount = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* getDifference */])(weekFromMonthly, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* getFare */])([oysterCap], false, data.weeklyCaps));

		// Applies the discount to the oyster week total
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oyster__["a" /* default */])(days, data).value - discount, 2);
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])([
	// The full fare (disregarding any travelcards)
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, maxSingle], type, singleFares),

	// The fare between minCharged Zone and minTravelcard + 1 - charges the front
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares)
	// The fare between maxTravelcard + 1 and maxSingle - charges the back
	+ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oyster__["a" /* default */])(days, data));
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__partials_oysterMonthly__["a" /* default */])(days, data));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjkwYTUyMWViZTAzYzNhOGJiOWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJpc1dpdGhpbiIsIm1pblRhcmdldCIsInZhbHVlIiwibWF4VGFyZ2V0Iiwicm91bmQiLCJkZWNpbWFscyIsIk51bWJlciIsInR5cGVzIiwiZHVhbFpvbmVzIiwiZHVhbFpvbmVPdmVybGFwIiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJjb25EYXlUb3RhbCIsImRheSIsIm9wdGlvbnMiLCJkYXRhIiwiZGFpbHlDYXBzIiwic2luZ2xlRmFyZXMiLCJhbGxEYWlseUNhcHMiLCJ2YWxpZERheXMiLCJqIiwiY2hlYXBlc3RBbnl0aW1lIiwidG90YWwiLCJleHRlbnNpb25GYXJlcyIsIm1heERhaWx5IiwiY2hlYXBlc3RPZmZQZWFrIiwib2ZmUGVha0RheVRvdGFsIiwib2ZmUGVha01heFpvbmUiLCJjaGVhcGVzdE5vQ2FwIiwiY2hlYXBlc3RPZmZQZWFrVmFsdWVzIiwibFZhbCIsImNoZWFwZXN0RGF5VG90YWwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY2FwSXNNZXQiLCJmaW5hbENvbmRpdGlvbiIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pbkNoYXJnZWRab25lIiwic3BsaXRPckZ1bGxGYXJlIiwib3lzdGVyRGF5VG90YWwiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsImpvdXJuZXlUeXBlIiwic2luZ2xlRmFyZSIsIm9mZlBlYWtUb3RhbCIsInBlYWtUb3RhbCIsIm1heFpvbmUiLCJvZmZQZWFrUmVhY2hlZFByZSIsIm9mZlBlYWtSZWFjaGVkIiwiYW55dGltZVJlYWNoZWQiLCJ3ZWVrVG90YWwiLCJwYXltZW50RnVuY3Rpb24iLCJkYXlzIiwiaW5mbyIsIndlZWtBbGxDYXBzIiwib2ZmUGVha0NhcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIndlZWtUb3RhbEZhcmUiLCJhdXRvT2ZmUGVha1JlZnVuZCIsIm95c3RlciIsIm5vQ2FwUmVzdWx0IiwiY2Fwc1Jlc3VsdFByZSIsIndlZWtDYXAiLCJ3ZWVrVG90bCIsImFsbENhcHMiLCJhc3NpZ24iLCJjaGVhcGVzdCIsImZldGNoRmFyZURhdGEiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImUiLCJmYXJlcyIsImNvbnRhY3RsZXNzIiwiZmluYWwiLCJub1dlZWtseSIsImdldFNpbmdsZUpvdXJuZXlab25lcyIsImdldERhdGEiLCJqb3VybmV5cyIsImxlZ3MiLCJhbGxab25lcyIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwicGF0aCIsInN0b3BQb2ludHMiLCJmb3JFYWNoIiwic3RvcFBvaW50IiwiaWQiLCJ6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsInNpbmdsZU1heCIsInNpbmdsZU1pbiIsInoiLCJveXN0ZXJNb250aGx5Iiwib3lzdGVyQ2FwIiwid2Vla0Zyb21Nb250aGx5IiwibW9udGhseUNhcHMiLCJkaXNjb3VudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVDLENBcGxCRCxFIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjkwYTUyMWViZTAzYzNhOGJiOWQiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogUHJlbG9hZHMgc3RhcnQgem9uZSBhcyAxIGFuZCBjaGFuZ2VzIHRvIDEteCBmb3IgSlNPTiBmaWxlIHJlYWRpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gem9uZSB4XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICcxLXgnXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6b25lVG9Kb3VybmV5KHpvbmUpIHtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG4vKipcbiAqIFR1cm5zIFwiMS0yXCIgaW50byBbMSwgMl1cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IC0ga2V5OiBcIjEtMlwiXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gWzEsIDJdXG4gKiBAZGVzY3JpcHRpb24gLSBPcHBvc2l0ZSBvZiBqb3VybmV5VG9LZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleVRvSm91cm5leShrZXkpIHtcbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLnNvcnQoKS5tYXAobnVtID0+IHBhcnNlSW50KG51bSkpO1xufVxuXG4vKipcbiAqIEdldHMga2V5cyBmcm9tIHdlZWtseUNhcHMsIG1hcHMgb3ZlciB0aGVtIHRvIGdlbmVyYXRlIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7d2Vla2x5Q2Fwc30gLSB0aGUgd2Vla2x5Q2FwcyBkYXRhIGZyb20gZmFyZXMuanNvblxuICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYXJyYXkgb2YgYXJyYXlzIFtbMSwgMl0sIFsxLCAzXSBldGNdXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvSm91cm5leSh3ZWVrbHlDYXBzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3ZWVrbHlDYXBzKS5tYXAoKGNhcCkgPT4ga2V5VG9Kb3VybmV5KGNhcCkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gLSBrZXkgaXMgYW4gYXJyYXkgb2YgdHdvIHpvbmVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBpcyBvZmZQZWFrIG9yIGFueXRpbWUsIG9yIG5vdGhpbmcgaWYgbm90IG5lZWRlZCAoZS5nLiBmb3Igd2Vla2x5IGNhcHMpXG4gKiBAcGFyYW0ge2RhdGF9IHRoZSBKU09OIGRhdGEgZmlsZSB3aXRoIGZhcmUgb2JqZWN0c1xuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSAvIHdlZWtseSBjYXAgLyBkYWlseSBjYXAgZnJvbSBmYXJlcy5qc29uXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmFyZSA9IChrZXksIHR5cGUsIGNhcHMpID0+IHtcbiAgY29uc3QgZmFyZSA9IGNhcHNba2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGpvdXJuZXlUb0tleShrZXkpIDogem9uZVRvSm91cm5leShrZXkpXTtcblxuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyBpcyB3aXRoaW4gdHdvIHRhcmdldHMgKG1pblRhcmdldCBhbmQgbWF4VGFyZ2V0KVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IG1pblRhcmdldCAtIHRoZSBtaW5UYXJnZXQgKHVzdWFsbHkgdGhlIG1pblRyYXZlbGNhcmQpIFxuICogQHBhcmFtIHtudW1iZXJ9IG1heFRhcmdldCAtIHRoZSBtaW5UYXJnZXQgKHVzdWFsbHkgdGhlIG1heFRyYXZlbGNhcmQpIFxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuIGV4cG9ydCBjb25zdCBpc1dpdGhpbiA9IChtaW5UYXJnZXQsIHZhbHVlLCBtYXhUYXJnZXQpID0+IChtaW5UYXJnZXQgPD0gdmFsdWUgJiYgdmFsdWUgPD0gbWF4VGFyZ2V0KVxuXG4vKipcbiAqIFJvdW5kcyBhIG51bWJlciB0byBob3dldmVyIG1hbnkgZGVjaW1hbCBwbGFjZXMgc3BlY2lmaWVkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRhcmdldCB2YWx1ZSB0byByb3VuZFxuICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxzIC0gdGhlIG51bWJlciBvZiBkZWNpbWFscyByZXN1bHQgc2hvdWxkIGhhdmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIGRlY2ltYWxzKSB7XG7CoMKgwqByZXR1cm4gTnVtYmVyKGAke01hdGgucm91bmQoYCR7dmFsdWV9ZSR7ZGVjaW1hbHN9YCl9ZS0ke2RlY2ltYWxzfWApO1xufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0eXBlcyh0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnZWFybHknKSB7XG4gICAgcmV0dXJuICdvZmZQZWFrJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgIHJldHVybidhbnl0aW1lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdWFsWm9uZXMoZHVhbFpvbmVPdmVybGFwLCB6b25lcykge1xuICBpZiAoZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgKCgobWluTnVtKHpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICgoKG1heE51bSh6b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gLy8gVGhpcyBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgb3Igbm8gZGFpbHkgY2FwIGZvciBlYWNoIGRheSB0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGFueSB3ZWVrbHkgY2FwcyBwYXNzZWQgaW5cbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7IGRheSBvYmplY3R9IGRheSBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIGpvdXJuZXkgb2JqZWN0cyAodGhhdCBpbiB0dXJuIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpKVxuICogQHBhcmFtIHtvcHRpb25zIG9iamVjdCBvZiBtaW5UcmF2ZWxjYXJkOiBudW0sIG1heFRyYXZlbGNhcmQ6IG51bX0gY29uc3Qgb2JqZWN0IC0gbWluVHJhdmVsY2FyZCBhbmQgbWF4VHJhdmVsY2FyZCBcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7b2JqZWN0fSAtIG9iamVjdCBjb250YWluaW5nIHt2YWx1ZTogcmV0dXJucyB0aGUgdG90YWwgZmFyZVxuIC8vJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gV29ya3Mgb3V0IGlmIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgbm8gZGFpbHkgY2FwcywgYW4gb2ZmIHBlYWsgZGFpbHkgY2FwICsgcGVhayBmYXJlcyBvciBhbiBhbnl0aW1lIGNhcCAodGFraW5nIGludG8gYWNjb3VudCB3ZWVrbHkgdHJhdmVsY2FyZHMgcGFzc2VkIGluKVxuICovXG5cbiBpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxuICByb3VuZCxcbiAgdHlwZXMsXG4gIGR1YWxab25lLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25EYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cdC8vIElmIHdlZWtseSBtaW5UcmF2ZWxjYXJkIG9yIG1heFRyYXZlbGNhcmQgcGFzc2VkIGluLCB0aGVuIHRha2VuIGludG8gYWNjb3VudCB3aGVuIHdvcmtpbmcgb3V0IHNpbmdsZSBmYXJlc1xuXHQvLyBJZiBub3QgcGFzc2VkIGluID0gZmFsc2Vcblx0ICBjb25zdCB7XG5cdCAgICBtaW5UcmF2ZWxjYXJkLFxuXHQgICAgbWF4VHJhdmVsY2FyZCxcblx0ICB9ID0gb3B0aW9ucztcblxuXHQgIC8vIEpTT05cblx0ICBjb25zdCB7XG5cdCAgICBkYWlseUNhcHMsXG5cdCAgICBzaW5nbGVGYXJlcyxcblx0ICB9ID0gZGF0YTtcblxuXHRjb25zdCBhbGxEYWlseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhaWx5Q2Fwcyk7XG5cblx0Ly8gU29ydHMgb3V0IGR1YWwgdG8gZHVhbCB6b25lIG92ZXJsYXBcblx0ZnVuY3Rpb24gZHVhbFpvbmVPdmVybGFwKGpvdXJuZXkpIHtcblx0XHRyZXR1cm4gbWF4VHJhdmVsY2FyZCAmJiBqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHRcdCgoKG1heE51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKTtcblx0fVxuXG5cdC8vIEZpbHRlcnMgdGhlIGRheXMgc28gb25seSB0aGUgZGF5cyB3aXRoIGpvdXJuZXlzIGluc2lkZSBhcmUgcGFzc2VkXG5cdGNvbnN0IHZhbGlkRGF5cyA9IGRheS5maWx0ZXIoaiA9PiAhZHVhbFpvbmVPdmVybGFwKGopKTtcblxuXHQvLyAxLiBDYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBmYXJlIGlmIGEgZGFpbHkgYW55dGltZSBjYXAgaXMgYXBwbGllZFxuXHQvLyAtLSByZXR1cm5zIGFuIGFycmF5IChhIGZhcmUgZm9yIGVhY2ggcG9zc2libGUgZGFpbHkgY2FwKVxuXHRjb25zdCBjaGVhcGVzdEFueXRpbWUgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCB0b3RhbCA9IHZhbGlkRGF5cy5tYXAoam91cm5leSA9PiB7XG5cblx0XHRcdC8vIFVzZXMgZXh0ZW5zaW9uIGZhcmVzICh3aXRoIGFueXRpbWUgY2FwIHBhc3NlZCkgdG8gY2FsY3VsYXRlIHRoZSBzaW5nbGUgZmFyZSBmb3IgZWFjaCBqb3VybmV5XG5cdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdCBcdFx0bWluVHJhdmVsY2FyZCxcblx0XHQgXHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0IFx0XHRtYXhEYWlseTogbWF4TnVtKGNhcCksXG5cdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHQgXHRcdHR5cGU6IHR5cGVzKGpvdXJuZXkudHlwZSksXG5cdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdFx0Ly8gQWRkcyBhbGwgdGhlIHNpbmdsZSBmYXJlcyBmb3IgdGhhdCBkYXkgdG9nZXRoZXJcblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblxuXHRcdC8vIEFkZHMgdG9nZXRoZXIgdGhlIHJlbGV2YW50IGFueXRpbWUgY2FwIGZhcmUgd2l0aCB0aGUgdG90YWwgZGF5IGZhcmVcblx0XHRyZXR1cm4gdG90YWwgKyBnZXRGYXJlKGNhcCwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuXHR9KTtcblxuXHQvLyAyLiBDYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBmYXJlIGlmIGEgZGFpbHkgb2ZmcGVhayBjYXAgaXMgYXBwbGllZCB3aXRoIGFueXRpbWUgam91cm5leXMgYXMgYWRkaXRpb25hbCBjaGFyZ2VzXG5cdC8vIC0tIHJldHVybnMgYW4gb2JqZWN0IChhIGZhcmUgZm9yIGVhY2ggcG9zc2libGUgZGFpbHkgY2FwIGFuZCB0aGUgbWF4IHpvbmUgb2YgZWFjaCBvZmYgcGVhayBjYXApXG5cdGNvbnN0IGNoZWFwZXN0T2ZmUGVhayA9IGFsbERhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdFxuXHRcdGNvbnN0IG9mZlBlYWtEYXlUb3RhbCA9IHZhbGlkRGF5cy5tYXAoam91cm5leSA9PiB7XG5cdFx0XHQvLyBJZiAnb2ZmUGVhaycgam91cm5leSBpcyBtYWRlLCB0aGVuIGNhbiBiZSBjYXBwZWQgYnkgdGhlIGN1cnJlbnQgZGFpbHkgb2ZmUGVhayBjYXBcblx0XHRcdC8vIC0tIHRodXMgbWF4RGFpbHkgaXMgcGFzc2VkIGluIChhcyB0aGUgZGFpbHkgb2ZmIHBlYWsgY2FwKSwgZWxzZSBmYWxzZSA9IHNpbmdsZSBmYXJlIHcvbyBkYWlseSBjYXAgXG5cdFx0ICAgIGxldCBtYXhEYWlseSA9IGZhbHNlO1xuXHRcdFx0aWYgKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnIHx8IGpvdXJuZXkudHlwZSA9PT0gJ2FmdGVybm9vbicpIHtcblx0XHRcdFx0bWF4RGFpbHkgPSBtYXhOdW0oY2FwKTtcblx0XHRcdH0gXG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heERhaWx5LFxuXHRcdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHRcdC8vIEFkZHMgYWxsIHRoZSBzaW5nbGUgZmFyZXMgZm9yIHRoYXQgZGF5IHRvZ2V0aGVyXG5cdFx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cblx0XHQvLyBBZGRzIHRvZ2V0aGVyIHRoZSByZWxldmFudCBvZmZwZWFrIGNhcCBmYXJlIHdpdGggdGhlIHRvdGFsIGRheSBmYXJlXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9mZlBlYWtNYXhab25lOiBtYXhOdW0oY2FwKSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdC8vIDMuIENhbGN1bGF0ZXMgaWYgbm8gZGFpbHkgY2FwcyBhcmUgYXBwbGllZFxuXHQvLyAtLSByZXR1cm5zIHRoZSBzaW5nbGUgbnVtYmVyXG5cdGNvbnN0IGNoZWFwZXN0Tm9DYXAgPSB2YWxpZERheXMubWFwKGpvdXJuZXkgPT4ge1xuXG5cdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHQgXHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IHR5cGVzKGpvdXJuZXkudHlwZSksXG5cdFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXG5cdC8vIEZyb20gdGhlIG9mZiBwZWFrIG9iamVjdDogY3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgY2hlYXBlc3RPZmZQZWFrIHZhbHVlc1xuXHRjb25zdCBjaGVhcGVzdE9mZlBlYWtWYWx1ZXMgPSBjaGVhcGVzdE9mZlBlYWsubWFwKChsVmFsKSA9PiBsVmFsLnZhbHVlKTtcblxuXHQvLyBHZXRzIHRoZSBjaGVhcGVzdCB2YWx1ZS9mYXJlIGZyb20gYWxsIDMgZGlmZmVyZW50IGNhbGN1bGF0aW9uIHJlc3VsdHMgPSBjaGVhcGVzdCBkYXkgdG90YWxcblx0Y29uc3QgY2hlYXBlc3REYXlUb3RhbCA9IG1pbk51bShjaGVhcGVzdEFueXRpbWUuY29uY2F0KFtjaGVhcGVzdE5vQ2FwXSwgY2hlYXBlc3RPZmZQZWFrVmFsdWVzKSk7XG5cblx0Ly8gRXZhbHVhdGVzIHRvIHNlZSBpZiBhbnkgb2YgdGhlIGNoZWFwZXN0T2ZmUGVhayB2YWx1ZXMgaXMgZXF1YWwgdG8gdGhlIGNoZWFwZXN0IGRheSB0b3RhbFxuXHRjb25zdCBpc0VxID0gY2hlYXBlc3RPZmZQZWFrLnNvbWUoZW50cnkgPT4gZW50cnkudmFsdWUgPT0gY2hlYXBlc3REYXlUb3RhbCk7XG5cblx0Ly8gSWYgYWJvdmUgaXMgdHJ1ZSwgdGhlbiBmaW5kcyB0aGUgbWF4IGNhcCB3aXRoaW4gdGhlIG9iamVjdCB0aGF0IG1hdGNoZXMgd2l0aCB0aGUgY2hlYXBlc3QgZGF5IHRvdGFsIG51bWJlclxuXHRjb25zdCBjYXBWYWwgPSBpc0VxID8gY2hlYXBlc3RPZmZQZWFrLmZpbHRlcigobFZhbCkgPT4gbFZhbC52YWx1ZSA9PT0gY2hlYXBlc3REYXlUb3RhbCkgOiBudWxsO1xuXG5cdHJldHVybiB7XG5cdFx0Ly8gUm91bmRzIGZpbmFsIGNoZWFwZXN0IGRheSB0b3RhbCBmYXJlIHRvIDIgZGVjaW1hbCBwbGFjZXNcblx0XHR2YWx1ZTogcm91bmQoY2hlYXBlc3REYXlUb3RhbCwgMiksXG5cdFx0Ly8gSWYgdGhlIG9mZnBlYWsgY2FwIHdhcyBtZXQsIHJldHVybiBhIHZhcmlhYmxlICdjYXBJc01ldCcgKyBtYXhab25lIG9mIHRoYXQgY2FwXG5cdFx0Y2FwSXNNZXQ6IGNhcFZhbCA/IGNhcFZhbFswXS5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuXHR9O1xufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiLy8gLyoqXG4vLyAgKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7b2JqZWN0fSBzZWUgYmVsb3dcbi8vICAqIEBwYXJhbSB7c2luZ2xlRmFyZXN9IHVzZXMgdGhlIHNpbmdsZUZhcmVzIGpzb24gZGF0YVxuLy8gICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBleHRlbnNpb24gZmFyZSBmb3IgdGhlIGpvdXJuZXlcbi8vICAqIEBkZXNjcmlwdGlvblxuLy9cbi8vICBieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuLy8gXHRGT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKSAtLSB1bmxlc3MgeW91IGFkZCBpbiBNYXhEYWlseVxuLy8gIC8vIHRoaXMgaXMgb3Zlcmx5IGNvbXBsaWNhdGVkIGZvciBkYWlseSBjYXBzIChhcyBvbmx5IGRlYWxzIHdpdGggem9uZSAxIHRvIHgpIGJ1dCBzdGlsbCB3b3Jrcy4gUkVMSUVTIE9OIFRIRSBGQUNUIERBSUxZIEFMV0FZUyBTVEFSVFMgQVQgMVxuLy8gICovXG5pbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG5cdGlzV2l0aGluLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGxldCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG5cdFx0Ly8gTWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG4gICAgXHRtaW5UcmF2ZWxjYXJkLFxuICAgIFx0Ly8gTWF4aW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCxcblx0XHQvLyBJZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHQvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50KVxuXHRpZiAobWF4RGFpbHkgJiYgbWF4VHJhdmVsY2FyZCkgeyBcblx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZFxuXHQgXHRpZiAobWF4RGFpbHkgPj0gKG1pblRyYXZlbGNhcmQgLSAxKSkge1xuXHQgXHRcdC8vIFNldHMgbWluVHJhdmVsY2FyZCB0byAxIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdCAgXHRcdG1pblRyYXZlbGNhcmQgPSAxOyBcblx0ICBcdFx0Ly8gbWF4VHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcblx0ICAgXHRcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IFxuXG5cdCAgIFx0Ly8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdFx0Ly8gLS0gc28gaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIG9ubHkgY2hhcmdlIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyBcblx0XHRcdG1pbkNoYXJnZWRab25lID0gKChtaW5TaW5nbGUgPD0gbWF4RGFpbHkpID8gbWF4RGFpbHkgKyAxIDogbWluU2luZ2xlKTtcblx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdH1cblx0fVxuXHQvLyBJZiBvbmx5IG1heERhaWx5IGlzIHBhc3NlZCBpbiBhbmQgbm8gbWF4VHJhdmVsY2FyZFxuXHQvLyAtLSBUaGVuIG1heFRyYXZlbGNhcmQgYmVjYW9tZXMgbWF4RGFpbHksIG1pblRyYXZlbGNhcmQgaXMgMSAoYXMgZGFpbHkgY2FwcyBzdGFydCBhdCAxKSBhbmQgbWF4RGFpbHkgaXMgbm90IG5lZWRkZWRcblx0aWYgKG1heERhaWx5ICYmICFtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0bWF4VHJhdmVsY2FyZCA9IG1heERhaWx5O1xuXHRcdG1pblRyYXZlbGNhcmQgPSAxO1xuXHRcdG1heERhaWx5ID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMgLSBjaGFyZ2UgZnJvbnRcblx0aWYgKChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkKSAmJiAoaXNXaXRoaW4obWluVHJhdmVsY2FyZCwgbWF4U2luZ2xlLCBtYXhUcmF2ZWxjYXJkKSkpIHtcblx0XHRyZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly8gSWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmIChpc1dpdGhpbihtaW5UcmF2ZWxjYXJkLCBtaW5TaW5nbGUsIG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHRyZXR1cm4gZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvLyBJZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcblxuIFx0XHRyZXR1cm4gc3BsaXRPckZ1bGxGYXJlKFxuICAgICAgXHRcdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gQm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgLSBubyBjaGFyZ2VcbiBcdH0gZWxzZSBpZiAoaXNXaXRoaW4obWluVHJhdmVsY2FyZCwgbWluU2luZ2xlLCBtYXhUcmF2ZWxjYXJkKVxuIFx0XHQmJiBpc1dpdGhpbihtaW5UcmF2ZWxjYXJkLCBtYXhTaW5nbGUsIG1heFRyYXZlbGNhcmQpXG4gXHRcdHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdHJldHVybiAwO1xuIFx0XG4gXHR9XG5cblx0Ly8gSm91cm5leSBpcyBtYWRlIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXMgLSBjaGFyZ2UgdGhlIGZhcmVcbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlXG4gLy8gJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gaXMgY2FwcGVkIGJ5IG9mZiBwZWFrIGRhaWx5IGNhcCBvciBwZWFrIGNhcCAoY3VtdWxhdGl2ZWx5KSB3aGVyZSBuZWNlc3NhcnlcbiAqL1xuXG5pbXBvcnQge1xuICBtaW5OdW0sXG4gIG1heE51bSxcbiAgZ2V0RmFyZSxcbiAgem9uZVRvSm91cm5leSxcbiAgcm91bmQsXG4gIHR5cGVzLFxuICBkdWFsWm9uZSxcbiAgaXNXaXRoaW4sXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCxcbiAgICBtYXhUcmF2ZWxjYXJkLFxuICB9ID0gb3B0aW9ucztcblxuICAvLyBKU09OXG4gIGNvbnN0IHtcbiAgICBkYWlseUNhcHMsXG4gICAgc2luZ2xlRmFyZXMsXG4gIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGRheVRvdGFsID0gZGF5LnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGxldCBjdXJyZW50VG90YWw7XG5cbiAgICAvLyBUeXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5L2FmdGVybm9vbiBwZWFrL29mZnBlYWsgaGFuZGxpbmdcbiAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhiLnR5cGUpO1xuICAgIGxldCBzaW5nbGVGYXJlID0gZ2V0RmFyZShiLnpvbmVzLCBqb3VybmV5VHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gICAgLy8gVGFrZXMgdGhlIG51bWJlcnMgZnJvbSB0aGUgcHJldmlvdXMgbG9vcFxuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG5cbiAgICAvLyBUaGUgbWF4aW11bSB6b25lIHRyYXZlbGxlZCBpbiBzbyBmYXIgaXMgdXBkYXRlZCB3aXRoIGN1cnJlbnQgem9uZXNcbiAgICBsZXQgbWF4Wm9uZSA9IG1heE51bShbXS5jb25jYXQoYS5tYXhab25lLCBiLnpvbmVzKSk7XG5cbiAgICAvLyBJbiBwcmVwYXJhdGlvbiBmb3Igd2hldGhlciBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG9yIG5vdCAodG8gYmUgcGFzc2VkIG91dCB3aXRoaW4gY2FwSXNNZXQpXG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkUHJlID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtNYXhab25lID0gYS5vZmZQZWFrTWF4Wm9uZTtcbiAgICBsZXQgYW55dGltZVJlYWNoZWQgPSBmYWxzZTtcblxuICAgIC8vIEZPUiBXRUVLTFkgdHJhdmVsY2FyZHMgLSBpZSBpZiB0aGUgbWF4IHRyYXZlbGNhcmQgcGFzc2VkIGluLCBleHRlbnNpb24gZmFyZXMgaXMgdXNlZCB0byBjYWxjdWxhdGUgc2luZ2xlIGZhcmVcbiAgICBpZiAobWF4VHJhdmVsY2FyZCkge1xuICAgICAgc2luZ2xlRmFyZSA9IGV4dGVuc2lvbkZhcmVzKHtcbiAgICAgICAgem9uZXM6IGIuem9uZXMsXG4gICAgICAgIHR5cGU6IGIudHlwZSxcbiAgICAgICAgbWluVHJhdmVsY2FyZCxcbiAgICAgICAgbWF4VHJhdmVsY2FyZFxuICAgICAgfSwgc2luZ2xlRmFyZXMpO1xuICAgICAgXG4gICAgICAvLyBEdWFsIHpvbmUgdG8gZHVhbCB6b25lIGpvdXJuZXlzIGRlYWx0IHdpdGgsIGlmIHRyYXZlbGNhcmQgYWxzbyBwYXNzZWQgKGZyZWUgaWYgZHVhbCB6b25lcyBhcmUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMpXG4gICAgICBpZiAoYi5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcbiAgICAgICAgKGlzV2l0aGluKG1pblRyYXZlbGNhcmQsICgobWluTnVtKGIuem9uZXMpKSArIDEpLCBtYXhUcmF2ZWxjYXJkKSkgJiZcbiAgICAgICAgKGlzV2l0aGluKG1pblRyYXZlbGNhcmQsICgobWF4TnVtKGIuem9uZXMpKSArIDEpLCBtYXhUcmF2ZWxjYXJkKSlcbiAgICAgICAgKSB7XG4gICAgICAgIHNpbmdsZUZhcmUgPSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmVzIGFueSBvdmVybGFwIGJldHdlZW4gd2Vla2x5IHRyYXZlbGNhcmQgYW5kIG1heFNpbmdsZVxuICAgICAgLy8gSS5lLiBDb21wYXJlcyB0b3RhbCBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gbWluVHJhdmVsY2FyZCAtIDEgcmF0aGVyIHRoYW4gbWF4U2luZ2xlXG4gICAgICBpZiAobWluVHJhdmVsY2FyZCA+IDEgJiYgKGlzV2l0aGluKChtaW5UcmF2ZWxjYXJkIC0gMSksIG1heFpvbmUsIG1heFRyYXZlbGNhcmQpKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IFxuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRUb3RhbCA9IGEuY3VycmVudFRvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIC8vIElmIHRoZSBjdXJyZW50IGpvdXJuZXkgbWFkZSB3YXMgT0ZGUEVBSyAob3IgYWZ0ZXJub29uIHdoaWNoIGlzIGNvdmVyZWQgYnkgb2ZmcGVhaylcbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycgfHwgYi50eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgICAgLy8gT2ZmIHBlYWsgdG90YWwgZ2V0cyB1cGRhdGVkIGFuZCBpZiBuZWVkZWQgb3ZlcnJpZGRlbiB3aXRoIG9mZnBlYWsgZGFpbHkgY2FwXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUpID49IGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpKSB7XG4gICAgICAgIG9mZlBlYWtSZWFjaGVkUHJlID0gdHJ1ZTtcbiAgICAgICAgb2ZmUGVha1RvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2Fwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZQZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ3VycmVudCB0b3RhbCBpcyB1cGRhdGVkIGlmIG5lZWRlZCBiZWNvbWVzIG9mZiBwZWFrIHRvdGFsICsgcHJldmlvdXMgcGVhayB0b3RhbFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBwZWFrVG90YWwpIDw9IGN1cnJlbnRUb3RhbCkge1xuICAgICAgICAvLyBJZiB0aGlzIGNvbmRpdGlvbiBhbmQgdGhlIHByZSBjb25kaXRpb25zIGFyZSBib3RoIG1ldFxuICAgICAgICAvLyAtIChpZSBhIGN1cnJlbnQgb3IgcHJldmlvdXMgb2ZmcGVhayBkYWlseSBjYXAgYXBwbGllZCB0byBjdXJyZW50dG90YWwpLCByZXR1cm4gdGhlIG1heFpvbmUgZm9yIG9mZiBwZWFrIGNhcFxuICAgICAgICBpZiAob2ZmUGVha1JlYWNoZWRQcmUpIHtcbiAgICAgICAgICBvZmZQZWFrUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgb2ZmUGVha01heFpvbmUgPSBtYXhab25lO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRUb3RhbCA9IG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbDtcbiAgICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSBmb3IgUEVBSyB0cmF2ZWwgdGhlIHBlYWsgdG90YWwgaXMgdXBkYXRlZCBpbiBwcmVwYXJhdGlvbiBmb3IgbmV4dCByb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICBwZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICB9XG5cbiAgICAvLyBJZiBuZWVkZWQgY3VycmVudCB0b3RhbCBpcyB0b3RhbGx5IG92ZXJyaWRkZW4gYnkgYW55dGltZSBkYWlseSBjYXBcbiAgICBpZiAoY3VycmVudFRvdGFsID4gKGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpKSkge1xuICAgICAgLy8gSWYgYW55dGltZSBkYWlseSBjYXAgcmVhY2hlZCwgb2ZmIHBlYWsgcmVhY2hlZCB3aWxsIHRoZW4gYmUgc2V0IHRvIGZhbHNlXG4gICAgICAvLyAoYXMgYW55dGltZSBhcHBsaWVkIG5vdCBvZmYgcGVhayBjYXApXG4gICAgICBhbnl0aW1lUmVhY2hlZCA9IHRydWU7XG4gICAgICBjdXJyZW50VG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gT2JqZWN0IGlzIHJldHVybmVkIHRvIGJlIGNvbXBhcmVkIFxuICAgICAgY3VycmVudFRvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgcGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICAgIG9mZlBlYWtNYXhab25lLFxuICAgICAgLy8gRW5zdXJlcyB0aGF0IHByZXZpb3VzIG9mZiBwZWFrIGNhcHMgYXBwbGllcyB0byBmdXR1cmUgbG9vcHMgLSBpZiB0cnVlLCBzdGF5cyB0cnVlXG4gICAgICBvZmZQZWFrUmVhY2hlZDogKGEub2ZmUGVha1JlYWNoZWQgJiYgIWFueXRpbWVSZWFjaGVkKSA/IHRydWUgOiBvZmZQZWFrUmVhY2hlZCxcbiAgICB9O1xuXG4gIH0sIHtcbiAgICBjdXJyZW50VG90YWw6IDAsXG4gICAgb2ZmUGVha1RvdGFsOiAwLFxuICAgIHBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC8vIFJvdW5kcyBmaW5hbCB0b3RhbCBmYXJlIHRvIDIgZGVjaW1hbCBwbGFjZXNcbiAgICB2YWx1ZTogcm91bmQoZGF5VG90YWwuY3VycmVudFRvdGFsLCAyKSxcbiAgICAvLyBJZiB0aGUgb2ZmcGVhayBjYXAgaXMgbWV0LCByZXR1cm4gYSB2YXJpYWJsZSAnY2FwSXNNZXQnICsgbWF4Wm9uZSBvZiB0aGF0IGNhcFxuICAgIGNhcElzTWV0OiBkYXlUb3RhbC5vZmZQZWFrUmVhY2hlZCA/IGRheVRvdGFsLm9mZlBlYWtNYXhab25lIDogZmFsc2UsXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSB3ZWVrIHRvdGFsIChiYXNlZCBvbiBwYXJhbWV0ZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIHBhc3NlZCBhcyBhcmd1bWVudClcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7ZnVuY3Rpb24gLSBzdHJpbmd9IGNvbkRheVRvdGFsIG9yIG95c3RlckRheVRvdGFsIC0gdG8gY2FsY3VsYXRlIHVzaW5nIG95c3RlciBvciBjb250YWN0bGVzcyBcbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtvYmplY3R9IGluZm8gLSBpcyBhbiBvYmplY3Qgd2l0aCB7XG4gXHRcdFx0b3B0aW9uczoge29iamVjdCB0aGF0IGhhcyBtaW5UcmF2ZWxjYXJkOiBudW0gYW5kIG1heFRyYXZlbGNhcmQ6IG51bX0sIFxuIFx0XHRcdGRhdGEgfVxuICogQHJldHVybnMge251bWJlcn0gLSB0b3RhbCBjaGVhcGVzdCBveXN0ZXIgb3IgY29udGFjdGxlc3MgZmFyZSBmb3IgdGhhdCB3ZWVrXG4gKiBAZGVzY3JpcHRpb24gSXQgYWxzbyBkZWR1Y3RzIHRoZSBhdXRvbWF0aWMgb2ZmcGVhayByZWZ1bmRzIGZvciB6b25lcyA0LTYgaWYgb2ZmIHBlYWsgZGFpbHkgY2FwIGlzIG1ldCBtb3JlIHRoYW4gb25jZSBlYWNoIHdlZWtcbiBcdFx0ZS5nLjogXG4gICAgICAgY29uc3QgeSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICovXG4gaW1wb3J0IHtcbiAgZ2V0RmFyZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Vla1RvdGFsKHBheW1lbnRGdW5jdGlvbiwgZGF5cywgaW5mbykge1xuXHQvLyBGaWx0ZXJzIHRoZSBkYXlzIGJ5IHRob3NlIHdpdGggam91cm5leXNcblx0Y29uc3QgdmFsaWREYXlzID0gZGF5cy5maWx0ZXIoZGF5ID0+IGRheS5sZW5ndGggPiAtMSk7XG5cblx0Ly8gVXNlcyB0aGUgcGF5bWVudEZ1bmN0aW9uIHBhc3NlZCBpbiAob3lzdGVyIG9yIGNvbnRhY3RsZXNzKSB0byBnZW5lcmF0ZSBhbiBhcnJheVxuXHQvLyAtLSBBcnJheSBpcyBhbiBvYmplY3QgcGVyIGRheSAod2l0aCBkYXkgdG90YWwgZmFyZSBhbmQgaXNDYXBNZXQpXG5cdGNvbnN0IHdlZWtBbGxDYXBzID0gdmFsaWREYXlzLm1hcCgoZGF5KSA9PiBwYXltZW50RnVuY3Rpb24oZGF5LCBpbmZvLm9wdGlvbnMsIGluZm8uZGF0YSkpO1xuXG5cdC8vIExvb3BzIG92ZXIgdGhlIG9iamVjdCBwZXIgZGF5IHRvIGFjY3VtdWxhdGUgdGhlIG51bWJlciBvZiBvZmYgcGVhayB6b25lIDEtNCwgMS01IGFuZCAxLTYgZGFpbHkgY2FwcyBtZXRcblx0Y29uc3Qgb2ZmUGVha0NhcHMgPSB3ZWVrQWxsQ2Fwcy5yZWR1Y2UoKGEsIGIpID0+IHtcblx0XHRpZiAoYi5oYXNPd25Qcm9wZXJ0eSgnY2FwSXNNZXQnKSAmJiBiLmNhcElzTWV0ICE9PSBmYWxzZSkge1xuXHRcdFx0YVtiLmNhcElzTWV0XSArPSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gYTtcblxuXHR9LCB7JzQnOiAwLCAnNSc6IDAsICc2JzogMH0pO1xuXG5cdC8vIEFkZHMgdG9nZXRoZXIgdGhlIGRheSB0b3RhbCBmYXJlcyB0byA9IGN1cnJlbnQgd2VlayB0b3RhbCBmYXJlXG4gIFx0bGV0IHdlZWtUb3RhbEZhcmUgPSB3ZWVrQWxsQ2Fwcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLnZhbHVlLCAwKTtcblxuICBcdC8vIElmIG9mZiBwZWFrIGRhaWx5IGNhcCBiZXR3ZWVuIDQtNiBtZXQgZm9yIDIrIGEgd2VlaywgYXBwbGllcyB0aGUgZGlzY291bnQocylcblx0aWYgKChvZmZQZWFrQ2Fwc1snNCddICsgb2ZmUGVha0NhcHNbJzUnXSArIG9mZlBlYWtDYXBzWyc2J10pID49IDIpIHtcblx0ICB3ZWVrVG90YWxGYXJlIC09XG5cdCAgXHQoXG5cdCAgXHRcdChvZmZQZWFrQ2Fwc1snNCddICogKFxuXHQgIFx0XHRcdGdldEZhcmUoWzEsIDRdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHQgIFx0XHQpKVxuXHRcdCAgXHQrIChvZmZQZWFrQ2Fwc1snNiddICogKFxuXHRcdCAgXHRcdGdldEZhcmUoWzEsIDZdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHRcdCAgXHQpKVxuXHRcdCAgXHQrIChvZmZQZWFrQ2Fwc1snNSddICogKFxuXHRcdCAgXHRcdGdldEZhcmUoWzEsIDVdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHRcdCAgXHQpKVxuXHQgIFx0KTtcblx0fVxuXG5cdC8vIFJldHVybnMgdGhlIGZpbmFsIHdlZWsgdG90YWxcblx0cmV0dXJuIHdlZWtUb3RhbEZhcmU7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL193ZWVrVG90YWwuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgd2Vla1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7b2JqZWN0fSB2YWx1ZTogLSB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSByb3VuZGVkIHRvIDIgZHBcbiAvLyBhbmQgY2FwOiB0aGUgd2Vla2x5IGNhcCBhcHBsaWVkIChpZiBhbnkpXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIHJvdW5kLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdC8vIDEuIElmIG5vIHdlZWtseSBjYXAgaXMgcGFzc2VkIGluXG5cdGNvbnN0IG5vQ2FwUmVzdWx0ID0ge1xuXHRcdCdub0NhcCc6IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBmYWxzZSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9O1xuXHQvLyAyLiBGb3IgZWFjaCBwb3NzaWJsZSB3ZWVrbHkgY2FwXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHdlZWtUb3RsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cdFx0Ly8gUmV0dXJucyBhbiBvYmplY3Q6IHRoZSB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSB3ZWVrIHRvdGFsICh3aXRoIHdlZWtseSBjYXAgYWRkZWQpXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkod2Vla0NhcCldOiB3ZWVrVG90bCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gQWRkcyBub0NhcCBhbmQgZWFjaCB3ZWVrbHkgY2FwIG9iamVjdCBpbnRvIG9uZSBvYmplY3Qgb2YgYWxsIHBvc3NpYmxlIHdlZWtseSB0b3RhbCBmYXJlc1xuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHQvLyBMb29wcyB0aGlzIG9iamVjdCB0byBmaW5kIHRoZSBjaGVhcGVzdCB3ZWVrIHRvdGFsXG5cdGNvbnN0IGNoZWFwZXN0ID0gT2JqZWN0LmtleXMoYWxsQ2FwcykucmVkdWNlKChhLCBiKSA9PiBhbGxDYXBzW2FdIDwgYWxsQ2Fwc1tiXSA/IGEgOiBiKTtcblx0XG5cdC8vIFJldHVybnMgb2JqZWN0OiB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNhcCBhc3NvY2lhdGVkIGFuZCB0aGUgY2hlYXBlc3Qgd2Vla2x5IHRvdGFsIChyb3VuZGVkIHRvIDIgZHApXG5cdHJldHVybiB7XG5cdFx0Y2FwOiBjaGVhcGVzdCxcblx0XHR2YWx1ZTogcm91bmQoKGFsbENhcHNbY2hlYXBlc3RdKSwgMilcblx0fTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29udGFjdGxlc3MgdG90YWwgZmFyZSBmb3IgdGhlIHdlZWtcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSByb3VuZGVkIHRvIDIgZHBcbiAqIEBkZXNjcmlwdGlvbiBjYWxjdWxhdGVzIHdoZXRoZXIgaXQgaXMgY2hlYXBlc3QgdG8gaGF2ZSBhIHdlZWtseSB0cmF2ZWxjYXJkIG9yIG5vbmVcbiAqL1xuXG4gaW1wb3J0IHtcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIHJvdW5kLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpIHtcblx0Y29uc3Qgd2Vla2x5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGF0YS53ZWVrbHlDYXBzKTtcblxuICAvLyAxLiBGb3IgZWFjaCBwb3NzaWJsZSB3ZWVrbHkgY2FwXG4gIC8vIHJldHVybnMgdGhlIGFycmF5IG9mIGVhY2ggd2Vla2x5IGNhcCB0b3RhbCB3ZWVrIGZhcmVcbiBcdGNvbnN0IGZpbmFsID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdG90YWwgKyBnZXRGYXJlKHdlZWtDYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpO1xuICAgIH0pO1xuXG4gIC8vIDIuIElmIG5vIHdlZWtseSBjYXAgaXMgcGFzc2VkIGluXG4gIC8vIEdldHMgdGhlIGZhcmUgZm9yIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcCkgd2hlbiBubyB3ZWVrbHkgdHJhdmVsY2FyZHMgYXJlIHBhc3NlZCBpblxuICAvLyByZXR1cm5zIGEgbnVtYmVyXG4gIGNvbnN0IG5vV2Vla2x5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBmYWxzZSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcbiAgICAgICAgfSxcblx0ICBcdGRhdGEsXG5cdCAgfSk7XG5cbiAgLy8gUmV0dXJucyBhIG51bWJlcjogY2hlYXBlc3QgdG90YWwgd2Vla2x5IGZhcmUgb24gY29udGFjdGxlc3MgKHJvdW5kZWQgdG8gMiBkcClcbiAgLy8gLS0gYnkgYXBwZW5kaW5nIHRoZSBub1dlZWtseSBudW1iZXIgdG8gdGhlIGZpbmFsIGFycmF5IGFuZCBmaW5kaW5nIHRoZSBzbWFsbGVzdCBudW1iZXJcbiAgcmV0dXJuIHJvdW5kKFxuICBcdFx0KG1pbk51bShmaW5hbC5jb25jYXQoW25vV2Vla2x5XSkpKSwgMik7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgd2VlayB3aXRoIHdlZWsgY2FwIGZyb20gYSBtb250aGx5IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0fSBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5cbi8vIFNIT1VMRCBUSElTIEJFIE1FUkdFRCBXSVRIIE9ZU1RFUj9cbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9fb3lzdGVyJztcbmltcG9ydCB7IGdldEZhcmUsXG5cdFx0XHRyb3VuZCxcblx0XHRcdGdldERpZmZlcmVuY2UsXG5cdFx0IH0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyTW9udGhseShkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IG95c3RlckNhcCA9IG95c3RlcihkYXlzLCBkYXRhKS5jYXA7XG5cdGlmIChveXN0ZXJDYXAgIT09IFwibm9DYXBcIikge1xuXG5cdFx0Ly8gTW9udGhseSBpcyBiYXNlZCBvbiBlYWNoIGNhbGVuZGFyIG1vbnRoOiAqMTIgbW9udGhzIC8gNTIgd2Vla3Ncblx0XHQvLyBDYWxjdWxhdGVzIHRoZSBjb3N0IG9mIHRoZSB3ZWVrIGNhcCBiYXNlZCBvbiB0aGUgbW9udGhseSBjYXBcblx0XHRjb25zdCB3ZWVrRnJvbU1vbnRobHkgPSAoKGdldEZhcmUoW295c3RlckNhcF0sIGZhbHNlLCBkYXRhLm1vbnRobHlDYXBzKSkgKiAxMiApIC8gNTI7XG5cblx0XHQvLyBHZXRzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHdlZWsgY2FwIGZyb20gd2Vla2x5IGNhcHMgb3Igd2VlayBjYXAgZnJvbSBtb250aGx5IGNhcFxuXHRcdGNvbnN0IGRpc2NvdW50ID0gZ2V0RGlmZmVyZW5jZShcblx0XHRcdFx0XHRcdFx0d2Vla0Zyb21Nb250aGx5LFxuXHRcdFx0XHRcdFx0XHQoZ2V0RmFyZShbb3lzdGVyQ2FwXSwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcykpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0Ly8gQXBwbGllcyB0aGUgZGlzY291bnQgdG8gdGhlIG95c3RlciB3ZWVrIHRvdGFsXG5cdFx0cmV0dXJuIHJvdW5kKChveXN0ZXIoZGF5cywgZGF0YSkudmFsdWUgLSBkaXNjb3VudCksIDIpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlck1vbnRobHkuanMiLCIvKipcbiAqSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkXG4gKEkuZS4gQSBqb3VybmV5IG9mIGUuZy4gMS02IGJ1dCBhIHRyYXZlbCBjYXJkIG9mIDMtNClcbiAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6IGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyAoMS0yICsgNS02KVxuIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmQgKDEtNikuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHQvLyBUaGUgZnVsbCBmYXJlIChkaXNyZWdhcmRpbmcgYW55IHRyYXZlbGNhcmRzKVxuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cblx0XHQvLyBUaGUgZmFyZSBiZXR3ZWVuIG1pbkNoYXJnZWQgWm9uZSBhbmQgbWluVHJhdmVsY2FyZCArIDEgLSBjaGFyZ2VzIHRoZSBmcm9udFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKVxuXHRcdC8vIFRoZSBmYXJlIGJldHdlZW4gbWF4VHJhdmVsY2FyZCArIDEgYW5kIG1heFNpbmdsZSAtIGNoYXJnZXMgdGhlIGJhY2tcblx0XHRcdCsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpXG5cdFx0KVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuXHRtZXQsXG4gIGtleXNUb0pvdXJuZXksXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IG95c3RlciBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXInO1xuaW1wb3J0IGNvbnRhY3RsZXNzIGZyb20gJy4vcGFydGlhbHMvX2NvbnRhY3RsZXNzJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fd2Vla1RvdGFsJztcbmltcG9ydCBveXN0ZXJNb250aGx5IGZyb20gJy4vcGFydGlhbHMvX295c3Rlck1vbnRobHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuXG4vLyBUTyBET1xuLy8gQWRkIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXJcbi8vIENBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIEFQSSBIQU5ETElOR1xuLy8gZ2V0RGF0YS5zdGF0aW9ucygpLnRoZW4oZnVuY3Rpb24gKHN0YXRpb25zKSB7XG4vLyBcdGdldFNpbmdsZUpvdXJuZXlab25lcygnMTAwMDAyOScsICcxMDAwMTM4Jywgc3RhdGlvbnMpLnRoZW4oKHJlc3ApID0+IHtcbi8vIFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwKTtcbi8vIFx0fSk7XG4vLyB9KTtcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgc2luZ2xlRmFyZXMgPSBkYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZGF0YS5kYWlseUNhcHM7XG5cbmNvbnN0IGRheXMgPSBbXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICAgICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICAgIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiBcbl07XG5cbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgXCJjb250YWN0bGVzcyA9IFwiICsgY29udGFjdGxlc3MoZGF5cywgZGF0YSlcbiAgLy8gKTtcblxuICAvLyAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIG95c3RlclxuICBjb25zb2xlLmxvZyhcbiAgICBveXN0ZXIoZGF5cywgZGF0YSlcbiAgKTtcbiAgY29uc29sZS5sb2coXG4gICAgb3lzdGVyTW9udGhseShkYXlzLCBkYXRhKVxuICApO1xuXG5cbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gIC8vICAgICBmYWxzZSxcbiAgLy8gICAgIGRhdGEsXG4gIC8vICAgfSlcbiAgLy8gKTtcblxuICAvLyBjb25zb2xlLmxvZyhveXN0ZXJNb250aGx5KGRheXMsIGRhdGEpKTsgXG5cbi8vIGNvbnN0IGpvdXJuZXkgPSBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gXTtcbiAgLy8gY29uc3Qgam91cm5leSA9IFtcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDJdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAvLyAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDJdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAvLyAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gIC8vICAgfSxcbiAgLy8gXTtcblxuICAvLyAgIGNvbnNvbGUubG9nKFxuICAvLyAgIGNvbkRheVRvdGFsKFxuICAvLyAgICAgam91cm5leSxcbiAgLy8gICAgIHtcblxuICAvLyAgICAgfSwge1xuICAvLyAgICAgICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gIC8vICAgICAgICAgc2luZ2xlRmFyZXNcbiAgLy8gICAgICAgfSlcbiAgLy8gKTtcbi8vIGNvbnNvbGUubG9nKFxuLy8gICAgICAgICAgICAgICB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcbi8vICAgICAgICAgb3B0aW9uczoge1xuLy8gICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IDEsXG4vLyAgICAgICAgICAgbWF4VHJhdmVsY2FyZDogMixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgZGF0YSxcbi8vICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICk7XG5cbiAgLy8gICAgIGNvbnNvbGUubG9nKFxuICAvLyAgICAgICBveXN0ZXJEYXlUb3RhbChcbiAgLy8gICAgICAgICBqb3VybmV5LFxuICAvLyAgICAgICB7XG4gIC8vICAgICAgIG1pblRyYXZlbGNhcmQ6IDQsXG4gIC8vICAgICAgIG1heFRyYXZlbGNhcmQ6IDUsXG4gIC8vICAgICAgfSwge1xuICAgICAgICAgIFxuICAvLyAgICAgICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gIC8vICAgICAgICAgc2luZ2xlRmFyZXNcbiAgLy8gICAgICAgfSlcbiAgLy8gKTtcblxuLy8gY29uc29sZS5sb2coZXh0ZW5zaW9uRmFyZXMoe1xuLy8gICAgICAgICB6b25lczogWzEsIDRdLFxuLy8gICAgICAgICBtaW5UcmF2ZWxjYXJkOiBmYWxzZSxcbi8vICAgICAgICAgbWF4VHJhdmVsY2FyZDogZmFsc2UsXG4vLyAgICAgICAgIG1heERhaWx5OiAxLFxuLy8gICAgICAgICB0eXBlOiAnYW55dGltZScsXG4vLyAgICAgICB9LCBzaW5nbGVGYXJlcykpO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==