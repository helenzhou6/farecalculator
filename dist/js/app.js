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
// min/max travelcard = false if nothing passed in
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

	function dualZoneOverlap(journey) {
		return maxTravelcard && journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.zones) + 1 <= maxTravelcard;
	}

	var cheapestAnytime = allDailyCaps.map(function (cap) {
		var total = day.map(function (journey) {
			//types function deals with early  /afternoon peak/offpeak handling

			// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
			// = > then changes dual to dual  stations to min weekly travelcard zone
			// THIS IS DUPLICATED x3 -- refactor
			if (dualZoneOverlap(journey)) {
				return 0;
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap),
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type)
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	var cheapestOffPeak = allDailyCaps.map(function (cap) {

		var offPeakDayTotal = day.map(function (journey) {
			//types function deals with early  /afternoon peak/offpeak handling
			// let journeyType = types(journey.type);
			var maxDaily = false;

			if (dualZoneOverlap(journey)) {
				return 0;
			}

			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				maxDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap);
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: maxDaily,
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type)
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		});

		return {
			offPeakMaxZone: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(cap),
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// for no daily caps
	var cheapestNoCap = day.map(function (journey) {
		//weird off peak
		//types function deals with early  /afternoon peak/offpeak handling

		// fixes dual overlap 
		if (dualZoneOverlap(journey)) {
			return 0;
		}

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: minTravelcard,
			maxTravelcard: maxTravelcard,
			zones: journey.zones,
			type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* types */])(journey.type)
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	});

	// creates an array of the cheapestOffPeak values (out of the object)
	var cheapestOffPeakValues = cheapestOffPeak.map(function (lVal) {
		return lVal.value;
	});

	// cheapest value
	var minAll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(cheapestAnytime.concat([cheapestNoCap], cheapestOffPeakValues));

	// evaluates if any of the cheapestOffPeak values is equal to the cheapest value
	var isEq = cheapestOffPeak.some(function (entry) {
		return entry.value == minAll;
	});

	// if above is met, then find the max cap within the object that matches with the cheapest value
	var capVal = isEq ? cheapestOffPeak.filter(function (lVal) {
		return lVal.value === minAll;
	}) : null;

	// returns an object: the cheapest value, whether off peak cap is met (if so will be the max off peak zone)
	return {
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(minAll, 2),
		capIsMet: capVal ? capVal[0].offPeakMaxZone : false
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGU0ZTUzMDFkY2EyYjk4OGQ2ZDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsInJvdW5kIiwiZGVjaW1hbHMiLCJOdW1iZXIiLCJ0eXBlcyIsImR1YWxab25lcyIsImR1YWxab25lT3ZlcmxhcCIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiY29uRGF5VG90YWwiLCJkYXkiLCJvcHRpb25zIiwiZGF0YSIsImRhaWx5Q2FwcyIsInNpbmdsZUZhcmVzIiwiYWxsRGFpbHlDYXBzIiwiY2hlYXBlc3RBbnl0aW1lIiwidG90YWwiLCJleHRlbnNpb25GYXJlcyIsIm1heERhaWx5IiwiY2hlYXBlc3RPZmZQZWFrIiwib2ZmUGVha0RheVRvdGFsIiwib2ZmUGVha01heFpvbmUiLCJjaGVhcGVzdE5vQ2FwIiwiY2hlYXBlc3RPZmZQZWFrVmFsdWVzIiwibFZhbCIsIm1pbkFsbCIsImlzRXEiLCJzb21lIiwiZW50cnkiLCJjYXBWYWwiLCJjYXBJc01ldCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJveXN0ZXJEYXlUb3RhbCIsImRheVRvdGFsIiwiY3VycmVudFRvdGFsIiwiam91cm5leVR5cGUiLCJzaW5nbGVGYXJlIiwib2ZmUGVha1RvdGFsIiwicGVha1RvdGFsIiwibWF4Wm9uZSIsIm9mZlBlYWtSZWFjaGVkUHJlIiwib2ZmUGVha1JlYWNoZWQiLCJhbnl0aW1lUmVhY2hlZCIsIndlZWtUb3RhbCIsInBheW1lbnRGdW5jdGlvbiIsImRheXMiLCJpbmZvIiwibnVtT2ZmUGVha0NhcFo0IiwibnVtT2ZmUGVha0NhcFo2IiwibnVtT2ZmUGVha0NhcFo1Iiwid2Vla1RvdGFsRmFyZSIsInVuZGVmaW5lZCIsImRheU9iamVjdCIsImRheUNhcE1ldCIsImF1dG9PZmZQZWFrUmVmdW5kIiwib3lzdGVyIiwibm9DYXBSZXN1bHQiLCJjYXBzUmVzdWx0UHJlIiwid2Vla0NhcCIsIndlZWtUb3RsIiwiYWxsQ2FwcyIsImFzc2lnbiIsImNoZWFwZXN0IiwiZmV0Y2hGYXJlRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiY29udGFjdGxlc3MiLCJmaW5hbCIsIm5vV2Vla2x5IiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwieiIsIm95c3Rlck1vbnRobHkiLCJtb250aGx5IiwibW9udGhseUNhcHMiLCJ3ZWVrbHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFJbkJXLGNBQVUsQ0FKUztBQUtuQjFCLFVBQU07QUFMYSxHQUFmLEVBTUhxQixXQU5HLENBQVo7QUFRQyxDQW5rQkQsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhlNGU1MzAxZGNhMmI5ODhkNmQ5IiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIFByZWxvYWRzIHN0YXJ0IHpvbmUgYXMgMSBhbmQgY2hhbmdlcyB0byAxLXggZm9yIEpTT04gZmlsZSByZWFkaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHpvbmUgeFxuICogQHJldHVybnMge3N0cmluZ30gLSAnMS14J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuLyoqXG4gKiBUdXJucyBcIjEtMlwiIGludG8gWzEsIDJdXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSAtIGtleTogXCIxLTJcIlxuICogQHJldHVybnMge2FycmF5fSAtIFsxLCAyXVxuICogQGRlc2NyaXB0aW9uIC0gT3Bwb3NpdGUgb2Ygam91cm5leVRvS2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlUb0pvdXJuZXkoa2V5KSB7XG4gIHJldHVybiBrZXkuc3BsaXQoJy0nKS5zb3J0KCkubWFwKG51bSA9PiBwYXJzZUludChudW0pKTtcbn1cblxuLyoqXG4gKiBHZXRzIGtleXMgZnJvbSB3ZWVrbHlDYXBzLCBtYXBzIG92ZXIgdGhlbSB0byBnZW5lcmF0ZSBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3dlZWtseUNhcHN9IC0gdGhlIHdlZWtseUNhcHMgZGF0YSBmcm9tIGZhcmVzLmpzb25cbiAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFycmF5IG9mIGFycmF5cyBbWzEsIDJdLCBbMSwgM10gZXRjXVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0pvdXJuZXkod2Vla2x5Q2Fwcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMod2Vla2x5Q2FwcykubWFwKChjYXApID0+IGtleVRvSm91cm5leShjYXApKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IC0ga2V5IGlzIGFuIGFycmF5IG9mIHR3byB6b25lc1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgaXMgb2ZmUGVhayBvciBhbnl0aW1lLCBvciBub3RoaW5nIGlmIG5vdCBuZWVkZWQgKGUuZy4gZm9yIHdlZWtseSBjYXBzKVxuICogQHBhcmFtIHtkYXRhfSB0aGUgSlNPTiBkYXRhIGZpbGUgd2l0aCBmYXJlIG9iamVjdHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgLyB3ZWVrbHkgY2FwIC8gZGFpbHkgY2FwIGZyb20gZmFyZXMuanNvblxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEZhcmUgPSAoa2V5LCB0eXBlLCBjYXBzKSA9PiB7XG4gIGNvbnN0IGZhcmUgPSBjYXBzW2tleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBqb3VybmV5VG9LZXkoa2V5KSA6IHpvbmVUb0pvdXJuZXkoa2V5KV07XG5cbiAgcmV0dXJuIHR5cGUgPyBmYXJlW3R5cGVdIDogZmFyZTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSAodmFsdWUsIHRhcmdldCkgPT4gdmFsdWUgPj0gdGFyZ2V0O1xuXG4vKipcbiAqIFJvdW5kcyBhIG51bWJlciB0byBob3dldmVyIG1hbnkgZGVjaW1hbCBwbGFjZXMgc3BlY2lmaWVkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRhcmdldCB2YWx1ZSB0byByb3VuZFxuICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxzIC0gdGhlIG51bWJlciBvZiBkZWNpbWFscyByZXN1bHQgc2hvdWxkIGhhdmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIGRlY2ltYWxzKSB7XG7CoMKgwqByZXR1cm4gTnVtYmVyKGAke01hdGgucm91bmQoYCR7dmFsdWV9ZSR7ZGVjaW1hbHN9YCl9ZS0ke2RlY2ltYWxzfWApO1xufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0eXBlcyh0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnZWFybHknKSB7XG4gICAgcmV0dXJuICdvZmZQZWFrJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgIHJldHVybidhbnl0aW1lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdWFsWm9uZXMoZHVhbFpvbmVPdmVybGFwLCB6b25lcykge1xuICBpZiAoZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgKCgobWluTnVtKHpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICgoKG1heE51bSh6b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiLy8gb2xkXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29udGFjdGxlc3MgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHsgZGF5IG9iamVjdH0gZGF5IG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgam91cm5leSBvYmplY3RzICh0aGF0IGluIHR1cm4gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSkpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlICYgY2FwSXNNZXQ6IGlmIG9mZlBlYWsgY2FwIHdhcyBtZXQsIHRoZW4gZGlzcGxheXMgdGhlIG1heCB6b25lIGZvciB0aGUgb2ZmUGVhayBkYWlseSBjYXAsIGVsc2UgZmFsc2UufVxuICogQGRlc2NyaXB0aW9uIFdvcmtzIG91dCBpZiBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIG5vIGRhaWx5IGNhcHMsIGFuIG9mZiBwZWFrIGRhaWx5IGNhcCArIHBlYWsgZmFyZXMgb3IgYW4gYW55dGltZSBjYXAgKHRha2luZyBpbnRvIGFjY291bnQgd2Vla2x5IHRyYXZlbGNhcmRzIHBhc3NlZCBpbilcbiAqL1xuXG4gaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgZmxhdHRlbixcbiAgcm91bmQsXG4gIHR5cGVzLFxuICBkdWFsWm9uZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gSWYgdGhlIG9mZnBlYWsgY2FwIGlzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcbi8vIG1pbi9tYXggdHJhdmVsY2FyZCA9IGZhbHNlIGlmIG5vdGhpbmcgcGFzc2VkIGluXG4vLyBUaGlzIGNhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCBvciBubyBkYWlseSBjYXAgZm9yIGVhY2ggZGF5IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gYW55IHdlZWtseSBjYXBzIHBhc3NlZCBpblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXHQgIGNvbnN0IHtcblx0ICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICB9ID0gb3B0aW9ucztcblxuXHQgIGNvbnN0IHtcblx0ICAgIGRhaWx5Q2FwcywgLy9KU09OXG5cdCAgICBzaW5nbGVGYXJlcywgLy9KU09OXG5cdCAgfSA9IGRhdGE7XG5cblx0Y29uc3QgYWxsRGFpbHlDYXBzID0ga2V5c1RvSm91cm5leShkYWlseUNhcHMpO1xuXHQvLyBnZXRzIGNoZWFwZXN0IGRhaWx5IGFueXRpbWUgY2FwXG5cblx0ZnVuY3Rpb24gZHVhbFpvbmVPdmVybGFwKGpvdXJuZXkpIHtcblx0XHRyZXR1cm4gbWF4VHJhdmVsY2FyZCAmJiBqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHRcdCgoKG1heE51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKTtcblx0fVxuXG5cdGNvbnN0IGNoZWFwZXN0QW55dGltZSA9IGFsbERhaWx5Q2Fwcy5tYXAoKGNhcCkgPT4ge1xuXHRcdGNvbnN0IHRvdGFsID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXG5cdFx0XHQvLyBkdWFsIHRvIGR1YWwgc3RhdGlvbnM6IGlmIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lID08IG1heCBkdWFsIHpvbmUgem9uZVxuXHRcdFx0Ly8gPSA+IHRoZW4gY2hhbmdlcyBkdWFsIHRvIGR1YWwgIHN0YXRpb25zIHRvIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lXG5cdFx0XHQvLyBUSElTIElTIERVUExJQ0FURUQgeDMgLS0gcmVmYWN0b3Jcblx0XHRcdGlmIChkdWFsWm9uZU92ZXJsYXAoam91cm5leSkpIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHQgXHRcdG1heERhaWx5OiBtYXhOdW0oY2FwKSxcblx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdCBcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cblx0Ly8gZm9yIGNoZWFwZXN0IG1peCBwZWFrIGpvdXJuZXlzICsgZWFjaCBkYWlseSBvZmYgcGVhayBjYXBcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XG5cdFx0Y29uc3Qgb2ZmUGVha0RheVRvdGFsID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXHRcdCAgICAvLyBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhqb3VybmV5LnR5cGUpO1xuXHRcdCAgICBsZXQgbWF4RGFpbHkgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0aWYgKGR1YWxab25lT3ZlcmxhcChqb3VybmV5KSkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnIHx8IGpvdXJuZXkudHlwZSA9PT0gJ2FmdGVybm9vbicpIHtcblx0XHRcdFx0bWF4RGFpbHkgPSBtYXhOdW0oY2FwKTtcblx0XHRcdH0gXG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heERhaWx5LFxuXHRcdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdFxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9mZlBlYWtNYXhab25lOiBtYXhOdW0oY2FwKSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cdFx0Ly93ZWlyZCBvZmYgcGVha1xuXHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXG5cdFx0Ly8gZml4ZXMgZHVhbCBvdmVybGFwIFxuXHRcdGlmIChkdWFsWm9uZU92ZXJsYXAoam91cm5leSkpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdCBcdFx0bWluVHJhdmVsY2FyZCxcblx0IFx0XHRtYXhUcmF2ZWxjYXJkLFxuXHRcdFx0em9uZXM6IGpvdXJuZXkuem9uZXMsXG5cdFx0XHR0eXBlOiB0eXBlcyhqb3VybmV5LnR5cGUpLFxuXHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHQvLyBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIChvdXQgb2YgdGhlIG9iamVjdClcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrVmFsdWVzID0gY2hlYXBlc3RPZmZQZWFrLm1hcCgobFZhbCkgPT4gbFZhbC52YWx1ZSk7XG5cblx0Ly8gY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgbWluQWxsID0gbWluTnVtKGNoZWFwZXN0QW55dGltZS5jb25jYXQoW2NoZWFwZXN0Tm9DYXBdLCBjaGVhcGVzdE9mZlBlYWtWYWx1ZXMpKTtcblxuXHQvLyBldmFsdWF0ZXMgaWYgYW55IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIGlzIGVxdWFsIHRvIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBpc0VxID0gY2hlYXBlc3RPZmZQZWFrLnNvbWUoZW50cnkgPT4gZW50cnkudmFsdWUgPT0gbWluQWxsKTtcblxuXHQvLyBpZiBhYm92ZSBpcyBtZXQsIHRoZW4gZmluZCB0aGUgbWF4IGNhcCB3aXRoaW4gdGhlIG9iamVjdCB0aGF0IG1hdGNoZXMgd2l0aCB0aGUgY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgY2FwVmFsID0gaXNFcSA/IGNoZWFwZXN0T2ZmUGVhay5maWx0ZXIoKGxWYWwpID0+IGxWYWwudmFsdWUgPT09IG1pbkFsbCkgOiBudWxsO1xuXG5cdC8vIHJldHVybnMgYW4gb2JqZWN0OiB0aGUgY2hlYXBlc3QgdmFsdWUsIHdoZXRoZXIgb2ZmIHBlYWsgY2FwIGlzIG1ldCAoaWYgc28gd2lsbCBiZSB0aGUgbWF4IG9mZiBwZWFrIHpvbmUpXG5cdHJldHVybiB7XG5cdFx0dmFsdWU6IHJvdW5kKG1pbkFsbCwgMiksXG5cdFx0Y2FwSXNNZXQ6IGNhcFZhbCA/IGNhcFZhbFswXS5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuXHR9O1xuXG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWF4TnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vLyAvKipcbi8vICAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtvYmplY3R9IHNlZSBiZWxvd1xuLy8gICogQHBhcmFtIHtzaW5nbGVGYXJlc30gdXNlcyB0aGUgc2luZ2xlRmFyZXMganNvbiBkYXRhXG4vLyAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGV4dGVuc2lvbiBmYXJlIGZvciB0aGUgam91cm5leVxuLy8gICogQGRlc2NyaXB0aW9uXG4vL1xuLy8gXHRGT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG4vLyBcdEZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMob3B0aW9ucyA9IHt9LCBzaW5nbGVGYXJlcykge1xuICBjb25zdCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcbi8vIGJ5IGRlZmF1bHQ6IGp1c3Qgb25lIHRyYXZlbGNhcmQgKHdlZWtseSB3aXRob3V0IGRhaWx5IG9yIGp1c3QgZGFpbHkgY2FwKSBmb3IgZWl0aGVyIG95c3RlciBvciBjb250YWN0bGVzcywgb3Igb3lzdGVyIHdpdGggd2Vla2x5IGNhcCAoZG9lc24ndCBjdXQgb2ZmIGRhaWx5IHNlY3Rpb24gb2YgdGhlIGpvdXJuZXkpXG5cblx0bGV0IHtcblx0XHR6b25lcyxcblx0XHR0eXBlLFxuICAgIFx0bWluVHJhdmVsY2FyZCwgLy8gbWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHQvLyBpZiBtYXhkYWlseSBhbHNvIGludm9sdmVkIChmb3IgY29udGFjdGxlc3Mgd2Vla2x5IGFuZCBkYWlseSBjb21ibyk6IHNvIHRoYXQgaXQgb25seSBjaGFyZ2VzIHRoZSBnYXAgem9uZXNcblx0fSA9IG9wdGlvbnM7XG5cdC8vIHNhbWUgYXMgdmFyIG1pblNpbmdsZSA9IG9wdGlvbnMubWluU2luZ2xlO1xuXG4vLyBkZWJ1Z2dlcjtcbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHRpZiAobWF4RGFpbHkpIHsgLy8gSWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8gKGhlbmNlIGFkZGluZyBpbiBtYXhEYWlseSBhcyBhcmd1bWVudF9cblx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdCBcdGlmIChtYXhEYWlseSA+PSAobWluVHJhdmVsY2FyZCAtIDEpKSB7IC8vIGlmIG5vIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmRcblx0XHQgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdFx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcblx0Ly8gZWxzZSBpZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibywgYW5kIHRoZXJlIGFyZSBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkLCBoYXZlIGEgbWluIGNoYXJnZWQgem9uZSAobm90IGNoYXJnZSB0aGUgZGFpbHkgY2FwIC0gdGhlIGZyb250KVxuXHRcdFx0fSBlbHNlIHsgLy8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVNcblx0XHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKG1heERhaWx5ICYmICFtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0bWF4VHJhdmVsY2FyZCA9IG1heERhaWx5O1xuXHRcdG1pblRyYXZlbGNhcmQgPSAxO1xuXHR9XG5cblxuXHQvLyBpZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHQgLy8gZGVidWdnZXI7XG5cdFx0cmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG5cdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIDA7XG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG5cbiAgcmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG4vLyBFTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSBkYXlcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7Y29tcGxleCBqb3VybmV5cyBvYmplY3R9IGpvdXJuZXlzIC0gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gLSBvYmplY3QgY29udGFpbmluZyB7dmFsdWU6IHJldHVybnMgdGhlIHRvdGFsIGZhcmUgJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gaXMgY2FwcGVkIGJ5IG9mZiBwZWFrIGRhaWx5IGNhcCBvciBwZWFrIGNhcCAoY3VtdWxhdGl2ZWx5KSB3aGVyZSBuZWNlc3NhcnlcbiAqL1xuXG5pbXBvcnQge1xuICBtaW5OdW0sXG4gIG1heE51bSxcbiAgZ2V0RmFyZSxcbiAgbWV0LFxuICB6b25lVG9Kb3VybmV5LFxuICByb3VuZCxcbiAgdHlwZXMsXG4gIGR1YWxab25lLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChkYXksIG9wdGlvbnMgPSB7fSwgZGF0YSA9IHt9KSB7XG5cbiAgY29uc3Qge1xuICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHtcbiAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAgIHNpbmdsZUZhcmVzLCAvL0pTT05cbiAgfSA9IGRhdGE7XG5cbiAgY29uc3QgZGF5VG90YWwgPSBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcblxuICAgIC8vdHlwZXMgZnVuY3Rpb24gZGVhbHMgd2l0aCBlYXJseSAgL2FmdGVybm9vbiBwZWFrL29mZnBlYWsgaGFuZGxpbmdcbiAgICBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhiLnR5cGUpO1xuICAgIGxldCBzaW5nbGVGYXJlID0gZ2V0RmFyZShiLnpvbmVzLCBqb3VybmV5VHlwZSwgc2luZ2xlRmFyZXMpO1xuXG4gICAgLy8gdGFrZXMgdGhlIG51bWJlcnMgZnJvbSB0aGUgcHJldmlvdXMgbG9vcFxuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG5cbiAgICAvL3RoZSBtYXhpbXVtIHpvbmUgdHJhdmVsbGVkIGluIHNvIGZhciBpcyB1cGRhdGVkIHdpdGggY3VycmVudCB6b25lc1xuICAgIGxldCBtYXhab25lID0gbWF4TnVtKFtdLmNvbmNhdChhLm1heFpvbmUsIGIuem9uZXMpKTtcblxuICAgIC8vaW4gcHJlcGFyYXRpb24gZm9yIHdoZXRoZXIgb2ZmIHBlYWsgZGFpbHkgY2FwIGlzIG1ldCBvciBub3QgKHRvIGJlIHBhc3NlZCBvdXQgd2l0aGluIGNhcElzTWV0KVxuICAgIGxldCBvZmZQZWFrUmVhY2hlZFByZSA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrUmVhY2hlZCA9IGZhbHNlO1xuICAgIGxldCBvZmZQZWFrTWF4Wm9uZSA9IGEub2ZmUGVha01heFpvbmU7XG4gICAgbGV0IGFueXRpbWVSZWFjaGVkID0gZmFsc2U7XG5cbiAgICAvLyBGT1IgV0VFS0xZIHRyYXZlbGNhcmRzIC0gaWUgaWYgdGhlIG1heCB0cmF2ZWxjYXJkIGhhcyBiZWVuIHBhc3NlZCBpbiwgc28gdXNlcyBleHRlbnNpb24gZmFyZXMgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHNpbmdsZSBmYXJlXG4gICAgaWYgKG1heFRyYXZlbGNhcmQpIHtcbiAgICAgIHNpbmdsZUZhcmUgPSBleHRlbnNpb25GYXJlcyh7XG4gICAgICAgIHpvbmVzOiBiLnpvbmVzLFxuICAgICAgICB0eXBlOiBiLnR5cGUsXG4gICAgICAgIG1pblRyYXZlbGNhcmQsXG4gICAgICAgIG1heFRyYXZlbGNhcmR9LFxuICAgICAgICBzaW5nbGVGYXJlcyk7XG4gICAgICBcbiAgICAgIC8vIGR1YWwgdG8gZHVhbCBzdGF0aW9uczogaWYgbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmUgPTwgbWF4IGR1YWwgem9uZSB6b25lXG4gICAgICAvLyA9ID4gdGhlbiBjaGFuZ2VzIGR1YWwgdG8gZHVhbCAgc3RhdGlvbnMgdG8gbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmVcbiAgICAgIGlmIChiLmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAoKChtaW5OdW0oYi56b25lcykpICsgMSkgPj0gbWluVHJhdmVsY2FyZCkgJiZcbiAgICAgICAgKCgobWF4TnVtKGIuem9uZXMpKSArIDEpIDw9IG1heFRyYXZlbGNhcmQpXG4gICAgICAgICkge1xuICAgICAgICBzaW5nbGVGYXJlID0gMDtcbiAgICAgIH1cbiAgICAgICAgLy8oaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gbWF4Wm9uZSAtIHJlbW92ZXMgb3ZlcmxhcCB3aXRoIHdlZWtseSlcbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiBtZXQobWF4VHJhdmVsY2FyZCwgbWF4Wm9uZSkgJiYgbWV0KG1heFpvbmUsIG1pblRyYXZlbGNhcmQgLSAxKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IFxuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnRUb3RhbCA9IGEuY3VycmVudFRvdGFsICsgc2luZ2xlRmFyZTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50IGpvdXJuZXkgbWFkZSB3YXMgT0ZGUEVBSyAob3IgYWZ0ZXJub29uIHdoaWNoIGlzIGNvdmVyZWQgYnkgb2ZmcGVhaylcbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycgfHwgYi50eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgICAgLy9vZmYgcGVhayB0b3RhbCBnZXRzIHVwZGF0ZWQgYW5kIGlmIG5lZWRlZCBvdmVycmlkZGVuIHdpdGggb2ZmcGVhayBkYWlseSBjYXBcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSkgPj0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcykpIHtcbiAgICAgICAgb2ZmUGVha1JlYWNoZWRQcmUgPSB0cnVlO1xuICAgICAgICBvZmZQZWFrVG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZlBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgICAgfVxuXG4gICAgICAvL29mZlBlYWtUb3RhbCA9IG1pbk51bShbb2ZmUGVha1RvdGFsICsgc2luZ2xlRmFyZSwgZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2FwcyldKTtcblxuICAgICAgLy8gY3VycmVudCB0b3RhbCBpcyB1cGRhdGVkIGlmIG5lZWRlZCB0byBiZSBvZmYgcGVhayB0b3RhbCArIHByZXZpb3VzIHBlYWsgdG90YWwgZm9yIG9mZiBwZWFrIHRyYXZlbFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBwZWFrVG90YWwpIDw9IGN1cnJlbnRUb3RhbCkge1xuICAgICAgICAvL2lmIHRoaXMgY29uZGl0aW9uIGFuZCB0aGUgYWJvdmUgY29uZGl0aW9ucyBhcmUgYm90aCBtZXQgKGllIGEgY3VycmVudCBvciBwcmV2aW91c29mZnBlYWsgZGFpbHkgY2FwIGFwcGxpZWQgdG8gY3VycmVudHRvdGFsKSwgc2V0IHRydWVcbiAgICAgICAgaWYgKG9mZlBlYWtSZWFjaGVkUHJlKSB7XG4gICAgICAgICAgb2ZmUGVha1JlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgIG9mZlBlYWtNYXhab25lID0gbWF4Wm9uZTtcbiAgICAgICAgICAvLyByZXR1cm4gdGhlIG1heCB6b25lIGZvciBvZmYgcGVhayBjYXBcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VG90YWwgPSBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWw7XG4gICAgICB9XG5cbiAgICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbF0pO1xuXG4gICAgLy9vdGhlcndpc2UgZm9yIFBFQUsgdHJhdmVsIHRoZSBwZWFrIHRvdGFsIGlzIHVwZGF0ZWQgaW4gcHJlcGFyYXRpb24gZm9yIG5leHQgcm91bmRcbiAgICB9IGVsc2Uge1xuICAgICAgcGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgfVxuXG4gICAgLy9pZiBuZWVkZWQgY3VycmVudCB0b3RhbCBpcyB0b3RhbGx5IG92ZXJyaWRkZW4gYnkgYW55dGltZSBkYWlseSBjYXBcbiAgICBpZiAoY3VycmVudFRvdGFsID4gKGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpKSkge1xuICAgICAgLy9pZiBhbnl0aW1lIGRhaWx5IGNhcCByZWFjaGVkLCBvZmYgcGVhayByZWFjaGVkIHdpbGwgdGhlbiBiZSBzZXQgdG8gZmFsc2UgdmlhIGFueXRpbWVyZWFjaGVkIChhcyBhbnl0aW1lIGFwcGxpZWQgbm90IG9mZiBwZWFrIGNhcClcbiAgICAgIGFueXRpbWVSZWFjaGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpO1xuICAgIH1cblxuICAgIC8vY3VycmVudFRvdGFsID0gbWluTnVtKFtjdXJyZW50VG90YWwsIGdldEZhcmUobWF4Wm9uZSwgJ2FueXRpbWUnLCBkYWlseUNhcHMpXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIG9iamVjdCBpcyByZXR1cm5lZCB0byBiZSBjb21wYXJlZCBcbiAgICAgIGN1cnJlbnRUb3RhbCxcbiAgICAgIG9mZlBlYWtUb3RhbCxcbiAgICAgIHBlYWtUb3RhbCxcbiAgICAgIG1heFpvbmUsXG4gICAgICBvZmZQZWFrTWF4Wm9uZSxcbiAgICAgIC8vZW5zdXJlcyB0aGF0IHByZXZpb3VzIG9mZiBwZWFrIGNhcHMgYXBwbGllZCBwcmV2aW91cyB0byBmdXR1cmUgbG9vcHMgLSBpZiB0cnVlLCBzdGF5cyB0cnVlXG4gICAgICBvZmZQZWFrUmVhY2hlZDogKGEub2ZmUGVha1JlYWNoZWQgJiYgIWFueXRpbWVSZWFjaGVkKSA/IHRydWUgOiBvZmZQZWFrUmVhY2hlZCxcbiAgICB9O1xuXG4gIH0sIHtcbiAgICBjdXJyZW50VG90YWw6IDAsXG4gICAgb2ZmUGVha1RvdGFsOiAwLFxuICAgIHBlYWtUb3RhbDogMCxcbiAgICBtYXhab25lOiBudWxsLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC8vIHJvdW5kcyB0byAyIGRwXG4gICAgdmFsdWU6IHJvdW5kKGRheVRvdGFsLmN1cnJlbnRUb3RhbCwgMiksXG4gICAgY2FwSXNNZXQ6IGRheVRvdGFsLm9mZlBlYWtSZWFjaGVkID8gZGF5VG90YWwub2ZmUGVha01heFpvbmUgOiBmYWxzZSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyRGF5VG90YWwuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHdlZWsgdG90YWwgKGJhc2VkIG9uIHBhcmFtZXRlciBveXN0ZXIgb3IgY29udGFjdGxlc3MgcGFzc2VkIGFzIGFyZ3VtZW50KVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtmdW5jdGlvbiAtIHN0cmluZ30gY29uRGF5VG90YWwgb3Igb3lzdGVyRGF5VG90YWwgLSB0byBjYWxjdWxhdGUgdXNpbmcgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIFxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge29iamVjdH0gaW5mbyAtIGlzIGFuIG9iamVjdCB3aXRoIHtcbiBcdFx0XHRvcHRpb25zOiB7b2JqZWN0IHRoYXQgaGFzIG1pblRyYXZlbGNhcmQ6IG51bSBhbmQgbWF4VHJhdmVsY2FyZDogbnVtfSwgXG4gXHRcdFx0ZGF0YSB9XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRvdGFsIGNoZWFwZXN0IG95c3RlciBvciBjb250YWN0bGVzcyBmYXJlIGZvciB0aGF0IHdlZWtcbiAqIEBkZXNjcmlwdGlvbiBJdCBhbHNvIGRlZHVjdHMgdGhlIGF1dG9tYXRpYyBvZmZwZWFrIHJlZnVuZHMgZm9yIHpvbmVzIDQtNiBpZiBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG1vcmUgdGhhbiBvbmNlIGVhY2ggd2Vla1xuIFx0XHRlLmcuOiBcbiAgICAgICBjb25zdCB5ID0gd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSk7XG4gKi9cbiBpbXBvcnQge1xuICBnZXRGYXJlLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuXG4vL3dvcmtzIG91dCB0aGUgZXF1aXZhbGVudCBvZiBubyBjYXBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlZWtUb3RhbChwYXltZW50RnVuY3Rpb24sIGRheXMsIGluZm8pIHtcblx0bGV0IG51bU9mZlBlYWtDYXBaNCA9IDA7XG5cdGxldCBudW1PZmZQZWFrQ2FwWjYgPSAwO1xuXHRsZXQgbnVtT2ZmUGVha0NhcFo1ID0gMDtcblxuXHRsZXQgd2Vla1RvdGFsRmFyZSA9IGRheXMubWFwKGZ1bmN0aW9uIChkYXkpIHsgXG5cdFx0Ly9pZiBkYXkgaXMgZW1wdHkgd2l0aCBubyBqb3VybmV5c1xuXHRcdGlmIChkYXkgPT09IHVuZGVmaW5lZCB8fCBkYXkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdCAgXHQvL2ZvciBlYWNoIGRheSBhZGQgdG9nZXRoZXIgdGhlIHRvdGFsIGRheSB0b3RhbFxuXHQgIFx0Y29uc3QgZGF5T2JqZWN0ID0gcGF5bWVudEZ1bmN0aW9uKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpO1xuXHQgIFx0Y29uc3QgZGF5Q2FwTWV0ID0gZGF5T2JqZWN0LmNhcElzTWV0O1xuXG5cdCAgXHRpZiAoZGF5Q2FwTWV0ID09PSA0KSB7XG5cdCAgXHRcdG51bU9mZlBlYWtDYXBaNCArPSAxO1xuXHQgIFx0Ly8gV2hhdCBhYm91dCByZWZ1bmRzIGlmIHRoZSBjYXAgaXMgYmV0d2VlbiB6b25lcyAxLTU/PyBhbmQgaWYgZG9lcyBub3QgYXBwbHkgLSB0aGVuIGNoZWFwZXIgdG8gZG8gZGlzY291bnRlZCB6b25lIDEtNCBwbHVzIGV4dGVuc2lvbiBmYXJlcyB0byA1P1xuXHQgIFx0fSBlbHNlIGlmIChkYXlDYXBNZXQgPT09IDYpIHtcblx0ICBcdFx0bnVtT2ZmUGVha0NhcFo2ICs9IDE7XG5cdCAgXHR9IGVsc2UgaWYgKGRheUNhcE1ldCA9PT0gNSkge1xuXHQgIFx0XHRudW1PZmZQZWFrQ2FwWjUgKz0gMTtcblx0ICBcdH1cblxuXHQgXHRyZXR1cm4gZGF5T2JqZWN0LnZhbHVlO1xuXHQgLy9yZXR1cm5zIHRoZSBjdXJyZW50IHdlZWsgdG90YWxcblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG4gIC8vIHdlZWsgZnVuY3Rpb24gdG8gc2VlIGlmIG9mZiBwZWFrIGNhcCBtZXQgYW5kIG1heCB6b25lIGJldHdlZW4gNC02OiBpZiB0cnVlIGZvciAyKyBhIHdlZWssIGFwcGx5IGEgZGlzY291bnRcblx0aWYgKChudW1PZmZQZWFrQ2FwWjQgKyBudW1PZmZQZWFrQ2FwWjYgKyBudW1PZmZQZWFrQ2FwWjUpID49IDIpIHtcblx0ICB3ZWVrVG90YWxGYXJlIC09XG5cdCAgXHQoXG5cdCAgXHRcdChudW1PZmZQZWFrQ2FwWjQgKiAoXG5cdCAgXHRcdFx0Z2V0RmFyZShbMSwgNF0sIGZhbHNlLCBpbmZvLmRhdGEuYXV0b09mZlBlYWtSZWZ1bmQpXG5cdCAgXHRcdCkpXG5cdFx0ICBcdCsgKG51bU9mZlBlYWtDYXBaNiAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA2XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0XHQgIFx0KyAobnVtT2ZmUGVha0NhcFo1ICogKFxuXHRcdCAgXHRcdGdldEZhcmUoWzEsIDVdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHRcdCAgXHQpKVxuXHQgIFx0KTtcblx0fVxuXG5cdHJldHVybiB3ZWVrVG90YWxGYXJlO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIHdlZWtcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtvYmplY3QgZGF5c30gY29tcGxleCBvYmplY3QgY29udGFpbmluZyBhcnJheSBvZiBkYXlzLCBhbmQgd2l0aGluIGVhY2ggZGF5IGFuIG9iamVjdCBmb3IgZWFjaCBqb3VybmV5XG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSByb3VuZGVkIHRvIDIgZHBcbiAqIEBkZXNjcmlwdGlvbiBjYWxjdWxhdGVzIHdoZXRoZXIgaXQgaXMgY2hlYXBlc3QgdG8gaGF2ZSBhIHdlZWtseSB0cmF2ZWxjYXJkIG9yIG5vbmVcbiAqL1xuXG4gaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vX3dlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlcihkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG5cblx0Ly8gaWYgbm8gd2Vla2x5IGNhcFxuXHRjb25zdCBub0NhcFJlc3VsdCA9IHtcblx0XHQnbm9DYXAnOiB3ZWVrVG90YWwob3lzdGVyRGF5VG90YWwsIGRheXMsIHtcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0bWluVHJhdmVsY2FyZDogZmFsc2UsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fTtcblx0Ly8gZm9yIGVhY2ggd2Vla3kgY2FwXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHdlZWtUb3RsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cdFx0Ly9yZXR1cm5zIG9iamVjdDogdGhlIHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIHdlZWsgdG90YWwgKHdpdGggd2Vla2x5IGNhcCBhZGRlZClcblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleSh3ZWVrQ2FwKV06IHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHQvLyByZXR1cm5zIG9iamVjdDogdGhlIGNoZWFwZXN0IHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIGNoZWFwZXN0IHdlZWtseSB0b3RhbCAocm91bmRlZCB0byAyIGRwKVxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdGNhcDogY2hlYXBlc3QsXG5cdFx0dmFsdWU6IHJvdW5kKChhbGxDYXBzW2NoZWFwZXN0XSksIDIpXG5cdH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiLCIvKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xudmFyIGZldGNoU3RhdGlvbnNEYXRhID0gKGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG52YXIgZmV0Y2hKb3VybmV5RGF0YSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZmFyZXM6IGZldGNoRmFyZURhdGEsXG5cdHN0YXRpb25zOiBmZXRjaFN0YXRpb25zRGF0YSxcblx0am91cm5leTogZmV0Y2hKb3VybmV5RGF0YSxcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbnRhY3RsZXNzIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICByb3VuZCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGNvbkRheVRvdGFsIGZyb20gJy4vX2NvbnRhY3RsZXNzRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWN0bGVzcyhkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IHdlZWtseUNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG4gIC8vIG1hcHMgb3ZlciBhbGwgdGhlIHBvc3NpYmxlIHdlZWtseSBjYXBzIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB3ZWVrbHkgY2FwICsgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApXG4gXHRjb25zdCBmaW5hbCA9IHdlZWtseUNhcHMubWFwKCh3ZWVrQ2FwKSA9PiB7XG4gICAgICBjb25zdCB3ZWVrVG90bCA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICAgICAgLy9hZGRzIHRoZSB3ZWVrbHkgY2FwIHRvIHRoZSB3ZWVrIHRvdGFsXG4gICAgICByZXR1cm4gd2Vla1RvdGwgKyBnZXRGYXJlKHdlZWtDYXAsIGZhbHNlLCBkYXRhLndlZWtseUNhcHMpO1xuICAgIH0pO1xuXG4gIC8vIGdldHMgdGhlIGZhcmUgZm9yIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgKG9yIG5vIGRhaWx5IGNhcCkgd2l0aCBubyB3ZWVrbHkgdHJhdmVsY2Fyc1xuICBjb25zdCBub1dlZWtseSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogZmFsc2UsXG4gICAgICAgICAgbWF4VHJhdmVsY2FyZDogZmFsc2UsXG4gICAgICAgIH0sXG5cdCAgXHRkYXRhLFxuXHQgIH0pO1xuXG4gIC8vIHJldHVybnMgdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gY29udGFjdGxlc3MgKHJvdW5kZWQgdG8gMiBkcClcbiAgcmV0dXJuIHJvdW5kKFxuICBcdFx0KG1pbk51bShmaW5hbC5jb25jYXQoW25vV2Vla2x5XSkpKSwgMik7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IG95c3RlciBmcm9tICcuL19veXN0ZXInO1xuIGltcG9ydCB7IGdldEZhcmUsXG4gXHRcdFx0cm91bmQsIH0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyTW9udGhseShkYXlzLCBkYXRhKSB7XG5cdGlmIChveXN0ZXIoZGF5cywgZGF0YSkuY2FwICE9PSBcIm5vQ2FwXCIpIHtcblx0XHRjb25zdCBtb250aGx5ID0gZ2V0RmFyZShbb3lzdGVyKGRheXMsIGRhdGEpLmNhcF0sIGZhbHNlLCBkYXRhLm1vbnRobHlDYXBzKTtcblx0XHRjb25zdCB3ZWVrbHkgPSAobW9udGhseSAqIDEyKS81Mjtcblx0XHRyZXR1cm4gcm91bmQod2Vla2x5LCAyKTtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3Rlck1vbnRobHkuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKSArIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcbiAgZ2V0RmFyZSxcblx0bWV0LFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb250YWN0bGVzcyBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzcyc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vcGFydGlhbHMvX3dlZWtUb3RhbCc7XG5pbXBvcnQgb3lzdGVyTW9udGhseSBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJNb250aGx5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vcGFydGlhbHMvX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy8gVE8gRE9cbi8vIEFkZCB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyXG4vLyBDQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG4vLyBBUEkgSEFORExJTkdcbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgbGV0IHNpbmdsZUZhcmVzID0gZGF0YS5zaW5nbGVGYXJlcztcbiAgbGV0IGRhaWx5Q2FwcyA9IGRhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAgICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gXG5dO1xuXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIFwiY29udGFjdGxlc3MgPSBcIiArIGNvbnRhY3RsZXNzKGRheXMsIGRhdGEpXG4gIC8vICk7XG5cbiAgLy8gLy8gZmluYWwgY2hlYXBlc3Qgd2Vla2x5IGNoYXJnZSBvbiBveXN0ZXJcbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgb3lzdGVyKGRheXMsIGRhdGEpXG4gIC8vICk7XG5cblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgLy8gICAgIGZhbHNlLFxuICAvLyAgICAgZGF0YSxcbiAgLy8gICB9KVxuICAvLyApO1xuXG4gIC8vIGNvbnNvbGUubG9nKG95c3Rlck1vbnRobHkoZGF5cywgZGF0YSkpOyBcblxuLy8gY29uc3Qgam91cm5leSA9IFtcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyBdO1xuY29uc3Qgam91cm5leSA9IFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDNdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbl07XG4vL3Rlc3RzIGZvciBmYWxzZSBuZWdhdGl2ZXMgaWYgYW55dGltZSBpcyBtZXQgZmlyc3QgYW5kIHRoZW4gb2ZmIHBlYWsgLS0gYWRkIHRvIHRlc3Rcbi8vYnV0IGNoZWNrIHRoZSBjYWxjdWxhdGlvbnMgd29yayBvdXRcbiAgLy8gICBjb25zb2xlLmxvZyhcbiAgLy8gICBjb25EYXlUb3RhbChcbiAgLy8gICAgIGpvdXJuZXksXG4gIC8vICAgICB7XG5cbiAgLy8gICAgIH0sIHtcbiAgLy8gICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuICAvLyAgICAgICAgIHNpbmdsZUZhcmVzXG4gIC8vICAgICAgIH0pXG4gIC8vICk7XG5cbi8vICAgICAgIGNvbnNvbGUubG9nKFxuLy8gb3lzdGVyRGF5VG90YWwoXG4vLyAgICAgICAgICAgam91cm5leSxcbi8vICAgICAgICAge1xuXG4vLyAgICAgICAgfSwge1xuICAgICAgICAgXG4vLyAgICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbi8vICAgICAgICAgICBzaW5nbGVGYXJlc1xuLy8gICAgICAgICB9KVxuLy8gICApO1xuXG5jb25zb2xlLmxvZyhleHRlbnNpb25GYXJlcyh7XG4gICAgICAgIHpvbmVzOiBbMSwgNF0sXG4gICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICBtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcbiAgICAgICAgbWF4RGFpbHk6IDEsXG4gICAgICAgIHR5cGU6ICdhbnl0aW1lJyxcbiAgICAgIH0sIHNpbmdsZUZhcmVzKSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9