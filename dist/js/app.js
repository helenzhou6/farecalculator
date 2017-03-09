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
/* harmony export (immutable) */ __webpack_exports__["c"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["d"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["i"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["h"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["g"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return met; });
/* harmony export (immutable) */ __webpack_exports__["f"] = round;
/* harmony export (immutable) */ __webpack_exports__["a"] = types;
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


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* keysToJourney */])(dailyCaps);
	// gets cheapest daily anytime cap

	function dualZoneOverlap(journey) {
		return maxTravelcard && journey.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(journey.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(journey.zones) + 1 <= maxTravelcard;
	}

	var validDays = day.filter(function (j) {
		return !dualZoneOverlap(j);
	});

	var cheapestAnytime = allDailyCaps.map(function (cap) {
		var total = validDays.map(function (journey) {
			//types function deals with early  /afternoon peak/offpeak handling

			// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
			// = > then changes dual to dual  stations to min weekly travelcard zone
			// THIS IS DUPLICATED x3 -- refactor

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* types */])(journey.type)
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	var cheapestOffPeak = allDailyCaps.map(function (cap) {

		var offPeakDayTotal = validDays.map(function (journey) {
			//types function deals with early  /afternoon peak/offpeak handling
			// let journeyType = types(journey.type);
			var maxDaily = false;

			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				maxDaily = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap);
			}

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
				minTravelcard: minTravelcard,
				maxTravelcard: maxTravelcard,
				maxDaily: maxDaily,
				zones: journey.zones,
				type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* types */])(journey.type)
			}, singleFares);
		}).reduce(function (a, b) {
			return a + b;
		}, 0);

		return {
			offPeakMaxZone: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap),
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// for no daily caps
	var cheapestNoCap = validDays.map(function (journey) {
		//weird off peak
		//types function deals with early  /afternoon peak/offpeak handling

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
			minTravelcard: minTravelcard,
			maxTravelcard: maxTravelcard,
			zones: journey.zones,
			type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* types */])(journey.type)
		}, singleFares);
	}).reduce(function (a, b) {
		return a + b;
	}, 0);

	// creates an array of the cheapestOffPeak values (out of the object)
	var cheapestOffPeakValues = cheapestOffPeak.map(function (lVal) {
		return lVal.value;
	});

	// cheapest value
	var minAll = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(cheapestAnytime.concat([cheapestNoCap], cheapestOffPeakValues));

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
				maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([maxDaily, maxTravelcard]); // max travelcard is whichever is largest max daily or max travelcard
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
    var journeyType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* types */])(b.type);
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])(b.zones, journeyType, singleFares);

    // takes the numbers from the previous loop
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;

    //the maximum zone travelled in so far is updated with current zones
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([].concat(a.maxZone, b.zones));

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
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }
      //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* met */])(maxZone, minTravelcard - 1)) {
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
	var offPeakCaps = {
		'zone-4': 0,
		'zone-5': 0,
		'zone-6': 0
	};

	function incrementCap(zone) {
		if (offPeakCaps.hasOwnProperty('zone-' + zone)) {
			offPeakCaps['zone-' + zone] += 1;
		}
	}

	var validDays = days.filter(function (day) {
		return day.length > -1;
	});

	var weekTotalFare = validDays.map(function (day) {
		//for each day add together the total day total
		var dayObject = paymentFunction(day, info.options, info.data);
		var dayCapMet = dayObject.capIsMet;

		// offPeakCaps[`zone-${dayCapMet}`] += 1;

		// console.log(dayCapMet);

		incrementCap(dayCapMet);
		// console.log(offPeakCaps);
		// debugger;


		// if (dayCapMet === 4) {
		// 	numOffPeakCapZ4 += 1;
		// // What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
		// } else if (dayCapMet === 6) {
		// 	numOffPeakCapZ6 += 1;
		// } else if (dayCapMet === 5) {
		// 	numOffPeakCapZ5 += 1;
		// }

		// numOffPeakCap

		return dayObject.value;
		//returns the current week total
	}).reduce(function (a, b) {
		return a + b;
	});

	// week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if (offPeakCaps['zone-4'] + offPeakCaps['zone-5'] + offPeakCaps['zone-6'] >= 2) {
		weekTotalFare -= offPeakCaps['zone-4'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + offPeakCaps['zone-6'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + offPeakCaps['zone-5'] * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
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
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* keysToJourney */])(data.weeklyCaps);

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
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
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
  var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* keysToJourney */])(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(weekCap)
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
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(final.concat([noWeekly])), 2);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["k" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["c" /* maxNum */])(zonesFromSingleStations);
			var singleMin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])(zonesFromSingleStations);

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
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])([singleMin].concat(dualZones));
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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
  }],
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //    {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  [{
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
  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__partials_weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_8__partials_oysterDayTotal__["a" /* default */], days, {
    options: {
      minTravelcard: 1,
      maxTravelcard: 2
    },
    data: data
  }));

  //       console.log(
  // oysterDayTotal(
  //           journey,
  //         {

  //        }, {

  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzgzZmI0Y2FmNzUzYjdhMWFhMTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyTW9udGhseS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsInpvbmVUb0pvdXJuZXkiLCJrZXlUb0pvdXJuZXkiLCJrZXkiLCJzcGxpdCIsIm1hcCIsInBhcnNlSW50Iiwia2V5c1RvSm91cm5leSIsIndlZWtseUNhcHMiLCJPYmplY3QiLCJrZXlzIiwiY2FwIiwiZ2V0RmFyZSIsInR5cGUiLCJjYXBzIiwiZmFyZSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtZXQiLCJ2YWx1ZSIsInRhcmdldCIsInJvdW5kIiwiZGVjaW1hbHMiLCJOdW1iZXIiLCJ0eXBlcyIsImR1YWxab25lcyIsImR1YWxab25lT3ZlcmxhcCIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiY29uRGF5VG90YWwiLCJkYXkiLCJvcHRpb25zIiwiZGF0YSIsImRhaWx5Q2FwcyIsInNpbmdsZUZhcmVzIiwiYWxsRGFpbHlDYXBzIiwidmFsaWREYXlzIiwiaiIsImNoZWFwZXN0QW55dGltZSIsInRvdGFsIiwiZXh0ZW5zaW9uRmFyZXMiLCJtYXhEYWlseSIsImNoZWFwZXN0T2ZmUGVhayIsIm9mZlBlYWtEYXlUb3RhbCIsIm9mZlBlYWtNYXhab25lIiwiY2hlYXBlc3ROb0NhcCIsImNoZWFwZXN0T2ZmUGVha1ZhbHVlcyIsImxWYWwiLCJtaW5BbGwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY2FwSXNNZXQiLCJmaW5hbENvbmRpdGlvbiIsIm1pblNpbmdsZSIsIm1heFNpbmdsZSIsIm1pbkNoYXJnZWRab25lIiwic3BsaXRPckZ1bGxGYXJlIiwib3lzdGVyRGF5VG90YWwiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsImpvdXJuZXlUeXBlIiwic2luZ2xlRmFyZSIsIm9mZlBlYWtUb3RhbCIsInBlYWtUb3RhbCIsIm1heFpvbmUiLCJvZmZQZWFrUmVhY2hlZFByZSIsIm9mZlBlYWtSZWFjaGVkIiwiYW55dGltZVJlYWNoZWQiLCJ3ZWVrVG90YWwiLCJwYXltZW50RnVuY3Rpb24iLCJkYXlzIiwiaW5mbyIsIm9mZlBlYWtDYXBzIiwiaW5jcmVtZW50Q2FwIiwiaGFzT3duUHJvcGVydHkiLCJ3ZWVrVG90YWxGYXJlIiwiZGF5T2JqZWN0IiwiZGF5Q2FwTWV0IiwiYXV0b09mZlBlYWtSZWZ1bmQiLCJveXN0ZXIiLCJub0NhcFJlc3VsdCIsImNhcHNSZXN1bHRQcmUiLCJ3ZWVrQ2FwIiwid2Vla1RvdGwiLCJhbGxDYXBzIiwiYXNzaWduIiwiY2hlYXBlc3QiLCJmZXRjaEZhcmVEYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJjb250YWN0bGVzcyIsImZpbmFsIiwibm9XZWVrbHkiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJ6Iiwib3lzdGVyTW9udGhseSIsIm1vbnRobHkiLCJtb250aGx5Q2FwcyIsIndlZWtseSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQ0U7QUFDRXZDLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRCxxQkFBaUIsSUFGbkI7QUFHRWIsVUFBTTtBQUhSLEdBREYsRUFNRTtBQUNFdkMsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9ELHFCQUFp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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTWYsVUFBVSxDQUNaO0FBQ0V4QixXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0QscUJBQWlCLElBRm5CO0FBR0ViLFVBQU07QUFIUixHQURZLENBQWhCO0FBT0E7QUFDQTtBQUNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRjZFLFVBQVFDLEdBQVIsQ0FDYywyRkFBQXJCLENBQVUseUVBQVYsRUFBMEJFLElBQTFCLEVBQWdDO0FBQ3RDekMsYUFBUztBQUNQSixxQkFBZSxDQURSO0FBRVBDLHFCQUFlO0FBRlIsS0FENkI7QUFLdENJO0FBTHNDLEdBQWhDLENBRGQ7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQyxDQTVrQkQsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc4M2ZiNGNhZjc1M2I3YTFhYTEwIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIFByZWxvYWRzIHN0YXJ0IHpvbmUgYXMgMSBhbmQgY2hhbmdlcyB0byAxLXggZm9yIEpTT04gZmlsZSByZWFkaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHpvbmUgeFxuICogQHJldHVybnMge3N0cmluZ30gLSAnMS14J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVRvSm91cm5leSh6b25lKSB7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuLyoqXG4gKiBUdXJucyBcIjEtMlwiIGludG8gWzEsIDJdXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSAtIGtleTogXCIxLTJcIlxuICogQHJldHVybnMge2FycmF5fSAtIFsxLCAyXVxuICogQGRlc2NyaXB0aW9uIC0gT3Bwb3NpdGUgb2Ygam91cm5leVRvS2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlUb0pvdXJuZXkoa2V5KSB7XG4gIHJldHVybiBrZXkuc3BsaXQoJy0nKS5zb3J0KCkubWFwKG51bSA9PiBwYXJzZUludChudW0pKTtcbn1cblxuLyoqXG4gKiBHZXRzIGtleXMgZnJvbSB3ZWVrbHlDYXBzLCBtYXBzIG92ZXIgdGhlbSB0byBnZW5lcmF0ZSBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3dlZWtseUNhcHN9IC0gdGhlIHdlZWtseUNhcHMgZGF0YSBmcm9tIGZhcmVzLmpzb25cbiAqIEByZXR1cm5zIHthcnJheX0gLSByZXR1cm5zIGFycmF5IG9mIGFycmF5cyBbWzEsIDJdLCBbMSwgM10gZXRjXVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGtleXNUb0pvdXJuZXkod2Vla2x5Q2Fwcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMod2Vla2x5Q2FwcykubWFwKChjYXApID0+IGtleVRvSm91cm5leShjYXApKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IC0ga2V5IGlzIGFuIGFycmF5IG9mIHR3byB6b25lc1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgaXMgb2ZmUGVhayBvciBhbnl0aW1lLCBvciBub3RoaW5nIGlmIG5vdCBuZWVkZWQgKGUuZy4gZm9yIHdlZWtseSBjYXBzKVxuICogQHBhcmFtIHtkYXRhfSB0aGUgSlNPTiBkYXRhIGZpbGUgd2l0aCBmYXJlIG9iamVjdHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgLyB3ZWVrbHkgY2FwIC8gZGFpbHkgY2FwIGZyb20gZmFyZXMuanNvblxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEZhcmUgPSAoa2V5LCB0eXBlLCBjYXBzKSA9PiB7XG4gIGNvbnN0IGZhcmUgPSBjYXBzW2tleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBqb3VybmV5VG9LZXkoa2V5KSA6IHpvbmVUb0pvdXJuZXkoa2V5KV07XG5cbiAgcmV0dXJuIHR5cGUgPyBmYXJlW3R5cGVdIDogZmFyZTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSAodmFsdWUsIHRhcmdldCkgPT4gdmFsdWUgPj0gdGFyZ2V0O1xuXG4vKipcbiAqIFJvdW5kcyBhIG51bWJlciB0byBob3dldmVyIG1hbnkgZGVjaW1hbCBwbGFjZXMgc3BlY2lmaWVkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRhcmdldCB2YWx1ZSB0byByb3VuZFxuICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxzIC0gdGhlIG51bWJlciBvZiBkZWNpbWFscyByZXN1bHQgc2hvdWxkIGhhdmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIGRlY2ltYWxzKSB7XG7CoMKgwqByZXR1cm4gTnVtYmVyKGAke01hdGgucm91bmQoYCR7dmFsdWV9ZSR7ZGVjaW1hbHN9YCl9ZS0ke2RlY2ltYWxzfWApO1xufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0eXBlcyh0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnZWFybHknKSB7XG4gICAgcmV0dXJuICdvZmZQZWFrJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYWZ0ZXJub29uJykge1xuICAgIHJldHVybidhbnl0aW1lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxzIHdpdGggaGFuZGxuaWcgZWFybHkvYWZ0ZXJub29uIHR5cGUgam91cm5leXMgKHNlZSBiZWxvdykgLSBzbyBjYW4gYWRqdXN0IHRvIG9mZnBlYWsgb3IgYW55dGltZSB0byB3b3JrIG91dCBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3R5cGV9IC0gdGhlIGpvdXJuZXkgdHlwZSBmb3IgdGhhdDogZWl0aGVyIHRhcmdldGVkIGJ5IGIudHlwZSBpbiBveXN0ZXJEYXlUb3RhbCBvciBqb3VybmV5LnR5cGUgZm9yIGNvbnRhY3RsZXNzRGF5VG90YWxcbiAqIEBkZXNjcmlwdGlvblxuIC8vIGVhcmx5IHR5cGUgPSBzaW5nbGUgZmFyZSBpcyBvZmYgcGVhayBidXQgb25seSBsaW1pdGVkIGJ5L2NvdW50cyB0b3dhcmRzIGFueXRpbWUgZGFpbHkgY2FwXG4vLyBhZnRlcm5vb24gdHlwZSA9IHNpbmdsZSBmYXJlIGlzIHBlYWsgYnV0IGxpbWl0ZWQgYnkvY291bnRzIHRvd2FyZHMgb2ZmIHBlYWsgdG9vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdWFsWm9uZXMoZHVhbFpvbmVPdmVybGFwLCB6b25lcykge1xuICBpZiAoZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgKCgobWluTnVtKHpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICgoKG1heE51bSh6b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiLy8gb2xkXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29udGFjdGxlc3MgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHsgZGF5IG9iamVjdH0gZGF5IG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgam91cm5leSBvYmplY3RzICh0aGF0IGluIHR1cm4gaGFzIHpvbmVzIGFycmF5LCBkdWFsem9uZXMgYW5kIHR5cGUgKG9mZnBlYWsgb3IgYW55dGltZSkpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlICYgY2FwSXNNZXQ6IGlmIG9mZlBlYWsgY2FwIHdhcyBtZXQsIHRoZW4gZGlzcGxheXMgdGhlIG1heCB6b25lIGZvciB0aGUgb2ZmUGVhayBkYWlseSBjYXAsIGVsc2UgZmFsc2UufVxuICogQGRlc2NyaXB0aW9uIFdvcmtzIG91dCBpZiBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIG5vIGRhaWx5IGNhcHMsIGFuIG9mZiBwZWFrIGRhaWx5IGNhcCArIHBlYWsgZmFyZXMgb3IgYW4gYW55dGltZSBjYXAgKHRha2luZyBpbnRvIGFjY291bnQgd2Vla2x5IHRyYXZlbGNhcmRzIHBhc3NlZCBpbilcbiAqL1xuXG4gaW1wb3J0IHtcbiAgam91cm5leVRvS2V5LFxuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgZmxhdHRlbixcbiAgcm91bmQsXG4gIHR5cGVzLFxuICBkdWFsWm9uZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gSWYgdGhlIG9mZnBlYWsgY2FwIGlzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcbi8vIG1pbi9tYXggdHJhdmVsY2FyZCA9IGZhbHNlIGlmIG5vdGhpbmcgcGFzc2VkIGluXG4vLyBUaGlzIGNhbGN1bGF0ZXMgdGhlIGNoZWFwZXN0IGRhaWx5IGNhcCBvciBubyBkYWlseSBjYXAgZm9yIGVhY2ggZGF5IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gYW55IHdlZWtseSBjYXBzIHBhc3NlZCBpblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uRGF5VG90YWwoZGF5LCBvcHRpb25zID0ge30sIGRhdGEgPSB7fSkge1xuXHQgIGNvbnN0IHtcblx0ICAgIG1pblRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcblx0ICB9ID0gb3B0aW9ucztcblxuXHQgIGNvbnN0IHtcblx0ICAgIGRhaWx5Q2FwcywgLy9KU09OXG5cdCAgICBzaW5nbGVGYXJlcywgLy9KU09OXG5cdCAgfSA9IGRhdGE7XG5cblx0Y29uc3QgYWxsRGFpbHlDYXBzID0ga2V5c1RvSm91cm5leShkYWlseUNhcHMpO1xuXHQvLyBnZXRzIGNoZWFwZXN0IGRhaWx5IGFueXRpbWUgY2FwXG5cblx0ZnVuY3Rpb24gZHVhbFpvbmVPdmVybGFwKGpvdXJuZXkpIHtcblx0XHRyZXR1cm4gbWF4VHJhdmVsY2FyZCAmJiBqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHRcdCgoKG1heE51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKTtcblx0fVxuXG5cdGNvbnN0IHZhbGlkRGF5cyA9IGRheS5maWx0ZXIoaiA9PiAhZHVhbFpvbmVPdmVybGFwKGopKTtcblxuXHRjb25zdCBjaGVhcGVzdEFueXRpbWUgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblx0XHRjb25zdCB0b3RhbCA9IHZhbGlkRGF5cy5tYXAoam91cm5leSA9PiB7XG5cdFx0ICAgIC8vdHlwZXMgZnVuY3Rpb24gZGVhbHMgd2l0aCBlYXJseSAgL2FmdGVybm9vbiBwZWFrL29mZnBlYWsgaGFuZGxpbmdcblxuXHRcdFx0Ly8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcblx0XHRcdC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuXHRcdFx0Ly8gVEhJUyBJUyBEVVBMSUNBVEVEIHgzIC0tIHJlZmFjdG9yXG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHRcdCBcdFx0bWF4VHJhdmVsY2FyZCxcblx0XHQgXHRcdG1heERhaWx5OiBtYXhOdW0oY2FwKSxcblx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdCBcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblxuXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cblx0Ly8gZm9yIGNoZWFwZXN0IG1peCBwZWFrIGpvdXJuZXlzICsgZWFjaCBkYWlseSBvZmYgcGVhayBjYXBcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0XG5cdFx0Y29uc3Qgb2ZmUGVha0RheVRvdGFsID0gdmFsaWREYXlzLm1hcChqb3VybmV5ID0+IHtcblx0XHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXHRcdCAgICAvLyBsZXQgam91cm5leVR5cGUgPSB0eXBlcyhqb3VybmV5LnR5cGUpO1xuXHRcdCAgICBsZXQgbWF4RGFpbHkgPSBmYWxzZTtcblxuXHRcdFx0aWYgKGpvdXJuZXkudHlwZSA9PT0gJ29mZlBlYWsnIHx8IGpvdXJuZXkudHlwZSA9PT0gJ2FmdGVybm9vbicpIHtcblx0XHRcdFx0bWF4RGFpbHkgPSBtYXhOdW0oY2FwKTtcblx0XHRcdH0gXG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHRcdG1heERhaWx5LFxuXHRcdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdFx0dHlwZTogdHlwZXMoam91cm5leS50eXBlKSxcblx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdFxuXHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9mZlBlYWtNYXhab25lOiBtYXhOdW0oY2FwKSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IHZhbGlkRGF5cy5tYXAoam91cm5leSA9PiB7XG5cdFx0Ly93ZWlyZCBvZmYgcGVha1xuXHQgICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuXG5cdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0IFx0XHRtaW5UcmF2ZWxjYXJkLFxuXHQgXHRcdG1heFRyYXZlbGNhcmQsXG5cdFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdHR5cGU6IHR5cGVzKGpvdXJuZXkudHlwZSksXG5cdFx0fSwgc2luZ2xlRmFyZXMpO1xuXG5cdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXG5cdC8vIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGNoZWFwZXN0T2ZmUGVhayB2YWx1ZXMgKG91dCBvZiB0aGUgb2JqZWN0KVxuXHRjb25zdCBjaGVhcGVzdE9mZlBlYWtWYWx1ZXMgPSBjaGVhcGVzdE9mZlBlYWsubWFwKChsVmFsKSA9PiBsVmFsLnZhbHVlKTtcblxuXHQvLyBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBtaW5BbGwgPSBtaW5OdW0oY2hlYXBlc3RBbnl0aW1lLmNvbmNhdChbY2hlYXBlc3ROb0NhcF0sIGNoZWFwZXN0T2ZmUGVha1ZhbHVlcykpO1xuXG5cdC8vIGV2YWx1YXRlcyBpZiBhbnkgb2YgdGhlIGNoZWFwZXN0T2ZmUGVhayB2YWx1ZXMgaXMgZXF1YWwgdG8gdGhlIGNoZWFwZXN0IHZhbHVlXG5cdGNvbnN0IGlzRXEgPSBjaGVhcGVzdE9mZlBlYWsuc29tZShlbnRyeSA9PiBlbnRyeS52YWx1ZSA9PSBtaW5BbGwpO1xuXG5cdC8vIGlmIGFib3ZlIGlzIG1ldCwgdGhlbiBmaW5kIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBjYXBWYWwgPSBpc0VxID8gY2hlYXBlc3RPZmZQZWFrLmZpbHRlcigobFZhbCkgPT4gbFZhbC52YWx1ZSA9PT0gbWluQWxsKSA6IG51bGw7XG5cblx0Ly8gcmV0dXJucyBhbiBvYmplY3Q6IHRoZSBjaGVhcGVzdCB2YWx1ZSwgd2hldGhlciBvZmYgcGVhayBjYXAgaXMgbWV0IChpZiBzbyB3aWxsIGJlIHRoZSBtYXggb2ZmIHBlYWsgem9uZSlcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogcm91bmQobWluQWxsLCAyKSxcblx0XHRjYXBJc01ldDogY2FwVmFsID8gY2FwVmFsWzBdLm9mZlBlYWtNYXhab25lIDogZmFsc2UsXG5cdH07XG5cblx0Ly9maW5hbGx5IHNlbGVjdHMgY2hlYXBlc3QgY2hlYXBlc3QgZGFpbHkgY2FwIG9wdGlvbiBmb3IgZWFjaCBkYXkgKGluIGEgNyBkYXkgYXJyYXkpXG59XHRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzRGF5VG90YWwuanMiLCJpbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdEZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Rk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcCkgLS0gdW5sZXNzIHlvdSBhZGQgaW4gTWF4RGFpbHlcbi8vICAvLyB0aGlzIGlzIG92ZXJseSBjb21wbGljYXRlZCBmb3IgZGFpbHkgY2FwcyAoYXMgb25seSBkZWFscyB3aXRoIHpvbmUgMSB0byB4KSBidXQgc3RpbGwgd29ya3MuIFJFTElFUyBPTiBUSEUgRkFDVCBEQUlMWSBBTFdBWVMgU1RBUlRTIEFUIDFcbi8vICAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuLy8gYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbi8vIGRlYnVnZ2VyO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuICBsZXQgbWluU2luZ2xlID0gem9uZXNbMF07XG4gIGxldCBtYXhTaW5nbGUgPSB6b25lc1sxXTtcbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXG5cdGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuXHRcdGlmIChtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0IFx0aWYgKG1heERhaWx5ID49IChtaW5UcmF2ZWxjYXJkIC0gMSkpIHsgLy8gaWYgbm8gZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZFxuXHRcdCAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy8gc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0XHQgICBcdG1heFRyYXZlbGNhcmQgPSBtYXhOdW0oW21heERhaWx5LCBtYXhUcmF2ZWxjYXJkXSk7IC8vIG1heCB0cmF2ZWxjYXJkIGlzIHdoaWNoZXZlciBpcyBsYXJnZXN0IG1heCBkYWlseSBvciBtYXggdHJhdmVsY2FyZFxuXHQvLyBlbHNlIGlmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvLCBhbmQgdGhlcmUgYXJlIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmQsIGhhdmUgYSBtaW4gY2hhcmdlZCB6b25lIChub3QgY2hhcmdlIHRoZSBkYWlseSBjYXAgLSB0aGUgZnJvbnQpXG5cdFx0XHR9IGVsc2UgeyAvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRpZiAobWF4RGFpbHkgJiYgIW1heFRyYXZlbGNhcmQpIHtcblx0XHRtYXhUcmF2ZWxjYXJkID0gbWF4RGFpbHk7XG5cdFx0bWluVHJhdmVsY2FyZCA9IDE7XG5cdH1cblxuXG5cdC8vIGlmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdCAvLyBkZWJ1Z2dlcjtcblx0XHRyZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gc3BsaXRPckZ1bGxGYXJlKFxuICAgICAgbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvLyBib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gMDtcbiBcdC8vIGJvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH1cblxuICByZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcbi8vIEVMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBveXN0ZXIgdG90YWwgZmFyZSBmb3IgdGhlIGRheVxuICogQGZ1bmN0aW9uXG4gICogQHBhcmFtIHtjb21wbGV4IGpvdXJuZXlzIG9iamVjdH0gam91cm5leXMgLSBoYXMgem9uZXMgYXJyYXksIGR1YWx6b25lcyBhbmQgdHlwZSAob2ZmcGVhayBvciBhbnl0aW1lKVxuICogQHBhcmFtIHtvcHRpb25zIG9iamVjdCBvZiBtaW5UcmF2ZWxjYXJkOiBudW0sIG1heFRyYXZlbGNhcmQ6IG51bX0gY29uc3Qgb2JqZWN0IC0gbWluVHJhdmVsY2FyZCBhbmQgbWF4VHJhdmVsY2FyZCBcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7b2JqZWN0fSAtIG9iamVjdCBjb250YWluaW5nIHt2YWx1ZTogcmV0dXJucyB0aGUgdG90YWwgZmFyZSAmIGNhcElzTWV0OiBpZiBvZmZQZWFrIGNhcCB3YXMgbWV0LCB0aGVuIGRpc3BsYXlzIHRoZSBtYXggem9uZSBmb3IgdGhlIG9mZlBlYWsgZGFpbHkgY2FwLCBlbHNlIGZhbHNlLn1cbiAqIEBkZXNjcmlwdGlvbiBpcyBjYXBwZWQgYnkgb2ZmIHBlYWsgZGFpbHkgY2FwIG9yIHBlYWsgY2FwIChjdW11bGF0aXZlbHkpIHdoZXJlIG5lY2Vzc2FyeVxuICovXG5cbmltcG9ydCB7XG4gIG1pbk51bSxcbiAgbWF4TnVtLFxuICBnZXRGYXJlLFxuICBtZXQsXG4gIHpvbmVUb0pvdXJuZXksXG4gIHJvdW5kLFxuICB0eXBlcyxcbiAgZHVhbFpvbmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcblxuICBjb25zdCBkYXlUb3RhbCA9IGRheS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBsZXQgY3VycmVudFRvdGFsO1xuXG4gICAgLy90eXBlcyBmdW5jdGlvbiBkZWFscyB3aXRoIGVhcmx5ICAvYWZ0ZXJub29uIHBlYWsvb2ZmcGVhayBoYW5kbGluZ1xuICAgIGxldCBqb3VybmV5VHlwZSA9IHR5cGVzKGIudHlwZSk7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGpvdXJuZXlUeXBlLCBzaW5nbGVGYXJlcyk7XG5cbiAgICAvLyB0YWtlcyB0aGUgbnVtYmVycyBmcm9tIHRoZSBwcmV2aW91cyBsb29wXG4gICAgbGV0IG9mZlBlYWtUb3RhbCA9IGEub2ZmUGVha1RvdGFsO1xuICAgIGxldCBwZWFrVG90YWwgPSBhLnBlYWtUb3RhbDtcblxuICAgIC8vdGhlIG1heGltdW0gem9uZSB0cmF2ZWxsZWQgaW4gc28gZmFyIGlzIHVwZGF0ZWQgd2l0aCBjdXJyZW50IHpvbmVzXG4gICAgbGV0IG1heFpvbmUgPSBtYXhOdW0oW10uY29uY2F0KGEubWF4Wm9uZSwgYi56b25lcykpO1xuXG4gICAgLy9pbiBwcmVwYXJhdGlvbiBmb3Igd2hldGhlciBvZmYgcGVhayBkYWlseSBjYXAgaXMgbWV0IG9yIG5vdCAodG8gYmUgcGFzc2VkIG91dCB3aXRoaW4gY2FwSXNNZXQpXG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkUHJlID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtSZWFjaGVkID0gZmFsc2U7XG4gICAgbGV0IG9mZlBlYWtNYXhab25lID0gYS5vZmZQZWFrTWF4Wm9uZTtcbiAgICBsZXQgYW55dGltZVJlYWNoZWQgPSBmYWxzZTtcblxuICAgIC8vIEZPUiBXRUVLTFkgdHJhdmVsY2FyZHMgLSBpZSBpZiB0aGUgbWF4IHRyYXZlbGNhcmQgaGFzIGJlZW4gcGFzc2VkIGluLCBzbyB1c2VzIGV4dGVuc2lvbiBmYXJlcyBmdW5jdGlvbiB0byBjYWxjdWxhdGUgc2luZ2xlIGZhcmVcbiAgICBpZiAobWF4VHJhdmVsY2FyZCkge1xuICAgICAgc2luZ2xlRmFyZSA9IGV4dGVuc2lvbkZhcmVzKHtcbiAgICAgICAgem9uZXM6IGIuem9uZXMsXG4gICAgICAgIHR5cGU6IGIudHlwZSxcbiAgICAgICAgbWluVHJhdmVsY2FyZCxcbiAgICAgICAgbWF4VHJhdmVsY2FyZH0sXG4gICAgICAgIHNpbmdsZUZhcmVzKTtcbiAgICAgIFxuICAgICAgLy8gZHVhbCB0byBkdWFsIHN0YXRpb25zOiBpZiBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZSA9PCBtYXggZHVhbCB6b25lIHpvbmVcbiAgICAgIC8vID0gPiB0aGVuIGNoYW5nZXMgZHVhbCB0byBkdWFsICBzdGF0aW9ucyB0byBtaW4gd2Vla2x5IHRyYXZlbGNhcmQgem9uZVxuICAgICAgaWYgKGIuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG4gICAgICAgICgoKG1pbk51bShiLnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuICAgICAgICAoKChtYXhOdW0oYi56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcbiAgICAgICAgKSB7XG4gICAgICAgIHNpbmdsZUZhcmUgPSAwO1xuICAgICAgfVxuICAgICAgICAvLyhpZSBvbmx5IGNvbXBhcmVzIGFnYWluc3QgZGFpbHkgY2FwIG9mIG1pblNpbmdsZSB0byBtYXhab25lIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAgICAgaWYgKG1pblRyYXZlbGNhcmQgPiAxICYmIG1ldChtYXhUcmF2ZWxjYXJkLCBtYXhab25lKSAmJiBtZXQobWF4Wm9uZSwgbWluVHJhdmVsY2FyZCAtIDEpKSB7XG4gICAgICAgIG1heFpvbmUgPSBtaW5UcmF2ZWxjYXJkIC0gMTsgXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnQgam91cm5leSBtYWRlIHdhcyBPRkZQRUFLIChvciBhZnRlcm5vb24gd2hpY2ggaXMgY292ZXJlZCBieSBvZmZwZWFrKVxuICAgIGlmIChiLnR5cGUgPT09ICdvZmZQZWFrJyB8fCBiLnR5cGUgPT09ICdhZnRlcm5vb24nKSB7XG4gICAgICAvL29mZiBwZWFrIHRvdGFsIGdldHMgdXBkYXRlZCBhbmQgaWYgbmVlZGVkIG92ZXJyaWRkZW4gd2l0aCBvZmZwZWFrIGRhaWx5IGNhcFxuICAgICAgaWYgKChvZmZQZWFrVG90YWwgKyBzaW5nbGVGYXJlKSA+PSBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKSkge1xuICAgICAgICBvZmZQZWFrUmVhY2hlZFByZSA9IHRydWU7XG4gICAgICAgIG9mZlBlYWtUb3RhbCA9IGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2ZmUGVha1RvdGFsICs9IHNpbmdsZUZhcmU7XG4gICAgICB9XG5cbiAgICAgIC8vb2ZmUGVha1RvdGFsID0gbWluTnVtKFtvZmZQZWFrVG90YWwgKyBzaW5nbGVGYXJlLCBnZXRGYXJlKG1heFpvbmUsICdvZmZQZWFrJywgZGFpbHlDYXBzKV0pO1xuXG4gICAgICAvLyBjdXJyZW50IHRvdGFsIGlzIHVwZGF0ZWQgaWYgbmVlZGVkIHRvIGJlIG9mZiBwZWFrIHRvdGFsICsgcHJldmlvdXMgcGVhayB0b3RhbCBmb3Igb2ZmIHBlYWsgdHJhdmVsXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbCkgPD0gY3VycmVudFRvdGFsKSB7XG4gICAgICAgIC8vaWYgdGhpcyBjb25kaXRpb24gYW5kIHRoZSBhYm92ZSBjb25kaXRpb25zIGFyZSBib3RoIG1ldCAoaWUgYSBjdXJyZW50IG9yIHByZXZpb3Vzb2ZmcGVhayBkYWlseSBjYXAgYXBwbGllZCB0byBjdXJyZW50dG90YWwpLCBzZXQgdHJ1ZVxuICAgICAgICBpZiAob2ZmUGVha1JlYWNoZWRQcmUpIHtcbiAgICAgICAgICBvZmZQZWFrUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgb2ZmUGVha01heFpvbmUgPSBtYXhab25lO1xuICAgICAgICAgIC8vIHJldHVybiB0aGUgbWF4IHpvbmUgZm9yIG9mZiBwZWFrIGNhcFxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRUb3RhbCA9IG9mZlBlYWtUb3RhbCArIHBlYWtUb3RhbDtcbiAgICAgIH1cblxuICAgICAgLy9jdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsXSk7XG5cbiAgICAvL290aGVyd2lzZSBmb3IgUEVBSyB0cmF2ZWwgdGhlIHBlYWsgdG90YWwgaXMgdXBkYXRlZCBpbiBwcmVwYXJhdGlvbiBmb3IgbmV4dCByb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICBwZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICB9XG5cbiAgICAvL2lmIG5lZWRlZCBjdXJyZW50IHRvdGFsIGlzIHRvdGFsbHkgb3ZlcnJpZGRlbiBieSBhbnl0aW1lIGRhaWx5IGNhcFxuICAgIGlmIChjdXJyZW50VG90YWwgPiAoZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcykpKSB7XG4gICAgICAvL2lmIGFueXRpbWUgZGFpbHkgY2FwIHJlYWNoZWQsIG9mZiBwZWFrIHJlYWNoZWQgd2lsbCB0aGVuIGJlIHNldCB0byBmYWxzZSB2aWEgYW55dGltZXJlYWNoZWQgKGFzIGFueXRpbWUgYXBwbGllZCBub3Qgb2ZmIHBlYWsgY2FwKVxuICAgICAgYW55dGltZVJlYWNoZWQgPSB0cnVlO1xuICAgICAgY3VycmVudFRvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG4gICAgfVxuXG4gICAgLy9jdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgZ2V0RmFyZShtYXhab25lLCAnYW55dGltZScsIGRhaWx5Q2FwcyldKTtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gb2JqZWN0IGlzIHJldHVybmVkIHRvIGJlIGNvbXBhcmVkIFxuICAgICAgY3VycmVudFRvdGFsLFxuICAgICAgb2ZmUGVha1RvdGFsLFxuICAgICAgcGVha1RvdGFsLFxuICAgICAgbWF4Wm9uZSxcbiAgICAgIG9mZlBlYWtNYXhab25lLFxuICAgICAgLy9lbnN1cmVzIHRoYXQgcHJldmlvdXMgb2ZmIHBlYWsgY2FwcyBhcHBsaWVkIHByZXZpb3VzIHRvIGZ1dHVyZSBsb29wcyAtIGlmIHRydWUsIHN0YXlzIHRydWVcbiAgICAgIG9mZlBlYWtSZWFjaGVkOiAoYS5vZmZQZWFrUmVhY2hlZCAmJiAhYW55dGltZVJlYWNoZWQpID8gdHJ1ZSA6IG9mZlBlYWtSZWFjaGVkLFxuICAgIH07XG5cbiAgfSwge1xuICAgIGN1cnJlbnRUb3RhbDogMCxcbiAgICBvZmZQZWFrVG90YWw6IDAsXG4gICAgcGVha1RvdGFsOiAwLFxuICAgIG1heFpvbmU6IG51bGwsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLy8gcm91bmRzIHRvIDIgZHBcbiAgICB2YWx1ZTogcm91bmQoZGF5VG90YWwuY3VycmVudFRvdGFsLCAyKSxcbiAgICBjYXBJc01ldDogZGF5VG90YWwub2ZmUGVha1JlYWNoZWQgPyBkYXlUb3RhbC5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgd2VlayB0b3RhbCAoYmFzZWQgb24gcGFyYW1ldGVyIG95c3RlciBvciBjb250YWN0bGVzcyBwYXNzZWQgYXMgYXJndW1lbnQpXG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2Z1bmN0aW9uIC0gc3RyaW5nfSBjb25EYXlUb3RhbCBvciBveXN0ZXJEYXlUb3RhbCAtIHRvIGNhbGN1bGF0ZSB1c2luZyBveXN0ZXIgb3IgY29udGFjdGxlc3MgXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbmZvIC0gaXMgYW4gb2JqZWN0IHdpdGgge1xuIFx0XHRcdG9wdGlvbnM6IHtvYmplY3QgdGhhdCBoYXMgbWluVHJhdmVsY2FyZDogbnVtIGFuZCBtYXhUcmF2ZWxjYXJkOiBudW19LCBcbiBcdFx0XHRkYXRhIH1cbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdG90YWwgY2hlYXBlc3Qgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIGZhcmUgZm9yIHRoYXQgd2Vla1xuICogQGRlc2NyaXB0aW9uIEl0IGFsc28gZGVkdWN0cyB0aGUgYXV0b21hdGljIG9mZnBlYWsgcmVmdW5kcyBmb3Igem9uZXMgNC02IGlmIG9mZiBwZWFrIGRhaWx5IGNhcCBpcyBtZXQgbW9yZSB0aGFuIG9uY2UgZWFjaCB3ZWVrXG4gXHRcdGUuZy46IFxuICAgICAgIGNvbnN0IHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAqL1xuIGltcG9ydCB7XG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vd29ya3Mgb3V0IHRoZSBlcXVpdmFsZW50IG9mIG5vIGNhcFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Vla1RvdGFsKHBheW1lbnRGdW5jdGlvbiwgZGF5cywgaW5mbykge1xuXHRjb25zdCBvZmZQZWFrQ2FwcyA9IHtcblx0XHQnem9uZS00JzogMCxcblx0XHQnem9uZS01JzogMCxcblx0XHQnem9uZS02JzogMCxcblx0fTtcblxuXHRmdW5jdGlvbiBpbmNyZW1lbnRDYXAoem9uZSkge1xuXHRcdGlmIChvZmZQZWFrQ2Fwcy5oYXNPd25Qcm9wZXJ0eShgem9uZS0ke3pvbmV9YCkpIHtcblx0XHRcdG9mZlBlYWtDYXBzW2B6b25lLSR7em9uZX1gXSArPSAxO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHZhbGlkRGF5cyA9IGRheXMuZmlsdGVyKGRheSA9PiBkYXkubGVuZ3RoID4gLTEpO1xuXG5cdGxldCB3ZWVrVG90YWxGYXJlID0gdmFsaWREYXlzLm1hcCgoZGF5KSA9PiB7IFxuXHQgIFx0Ly9mb3IgZWFjaCBkYXkgYWRkIHRvZ2V0aGVyIHRoZSB0b3RhbCBkYXkgdG90YWxcblx0ICBcdGNvbnN0IGRheU9iamVjdCA9IHBheW1lbnRGdW5jdGlvbihkYXksIGluZm8ub3B0aW9ucywgaW5mby5kYXRhKTtcblx0ICBcdGNvbnN0IGRheUNhcE1ldCA9IGRheU9iamVjdC5jYXBJc01ldDtcblxuXHQgIFx0Ly8gb2ZmUGVha0NhcHNbYHpvbmUtJHtkYXlDYXBNZXR9YF0gKz0gMTtcblxuXHQgIFx0Ly8gY29uc29sZS5sb2coZGF5Q2FwTWV0KTtcblxuXHQgIFx0aW5jcmVtZW50Q2FwKGRheUNhcE1ldCk7XG5cdCAgXHQvLyBjb25zb2xlLmxvZyhvZmZQZWFrQ2Fwcyk7XG5cdCAgXHQvLyBkZWJ1Z2dlcjtcblxuXG5cdCAgXHQvLyBpZiAoZGF5Q2FwTWV0ID09PSA0KSB7XG5cdCAgXHQvLyBcdG51bU9mZlBlYWtDYXBaNCArPSAxO1xuXHQgIFx0Ly8gLy8gV2hhdCBhYm91dCByZWZ1bmRzIGlmIHRoZSBjYXAgaXMgYmV0d2VlbiB6b25lcyAxLTU/PyBhbmQgaWYgZG9lcyBub3QgYXBwbHkgLSB0aGVuIGNoZWFwZXIgdG8gZG8gZGlzY291bnRlZCB6b25lIDEtNCBwbHVzIGV4dGVuc2lvbiBmYXJlcyB0byA1P1xuXHQgIFx0Ly8gfSBlbHNlIGlmIChkYXlDYXBNZXQgPT09IDYpIHtcblx0ICBcdC8vIFx0bnVtT2ZmUGVha0NhcFo2ICs9IDE7XG5cdCAgXHQvLyB9IGVsc2UgaWYgKGRheUNhcE1ldCA9PT0gNSkge1xuXHQgIFx0Ly8gXHRudW1PZmZQZWFrQ2FwWjUgKz0gMTtcblx0ICBcdC8vIH1cblxuXHQgIFx0Ly8gbnVtT2ZmUGVha0NhcFxuXG5cdCBcdHJldHVybiBkYXlPYmplY3QudmFsdWU7XG5cdCAvL3JldHVybnMgdGhlIGN1cnJlbnQgd2VlayB0b3RhbFxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuICAvLyB3ZWVrIGZ1bmN0aW9uIHRvIHNlZSBpZiBvZmYgcGVhayBjYXAgbWV0IGFuZCBtYXggem9uZSBiZXR3ZWVuIDQtNjogaWYgdHJ1ZSBmb3IgMisgYSB3ZWVrLCBhcHBseSBhIGRpc2NvdW50XG5cdGlmICgob2ZmUGVha0NhcHNbJ3pvbmUtNCddICsgb2ZmUGVha0NhcHNbJ3pvbmUtNSddICsgb2ZmUGVha0NhcHNbJ3pvbmUtNiddKSA+PSAyKSB7XG5cdCAgd2Vla1RvdGFsRmFyZSAtPVxuXHQgIFx0KFxuXHQgIFx0XHQob2ZmUGVha0NhcHNbJ3pvbmUtNCddICogKFxuXHQgIFx0XHRcdGdldEZhcmUoWzEsIDRdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHQgIFx0XHQpKVxuXHRcdCAgXHQrIChvZmZQZWFrQ2Fwc1snem9uZS02J10gKiAoXG5cdFx0ICBcdFx0Z2V0RmFyZShbMSwgNl0sIGZhbHNlLCBpbmZvLmRhdGEuYXV0b09mZlBlYWtSZWZ1bmQpXG5cdFx0ICBcdCkpXG5cdFx0ICBcdCsgKG9mZlBlYWtDYXBzWyd6b25lLTUnXSAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA1XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0ICBcdCk7XG5cdH1cblxuXHRyZXR1cm4gd2Vla1RvdGFsRmFyZTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3dlZWtUb3RhbC5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIHJvdW5kLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdC8vIGlmIG5vIHdlZWtseSBjYXBcblx0Y29uc3Qgbm9DYXBSZXN1bHQgPSB7XG5cdFx0J25vQ2FwJzogd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuXHRcdFx0XHRtYXhUcmF2ZWxjYXJkOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pXG5cdH07XG5cdC8vIGZvciBlYWNoIHdlZWt5IGNhcFxuXHRjb25zdCBjYXBzUmVzdWx0UHJlID0gd2Vla2x5Q2Fwcy5tYXAoKHdlZWtDYXApID0+IHtcblx0XHRjb25zdCB3ZWVrVG90bCA9IHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5OdW0od2Vla0NhcCksXG5cdFx0XHRcdG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhLFxuXHRcdH0pO1xuXHRcdC8vcmV0dXJucyBvYmplY3Q6IHRoZSB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSB3ZWVrIHRvdGFsICh3aXRoIHdlZWtseSBjYXAgYWRkZWQpXG5cdFx0cmV0dXJuIHtcblx0XHRcdFtqb3VybmV5VG9LZXkod2Vla0NhcCldOiB3ZWVrVG90bCArIGdldEZhcmUod2Vla0NhcCwgZmFsc2UsIGRhdGEud2Vla2x5Q2FwcyksXG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gcmV0dXJucyBvYmplY3Q6IHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2FwIGFzc29jaWF0ZWQgYW5kIHRoZSBjaGVhcGVzdCB3ZWVrbHkgdG90YWwgKHJvdW5kZWQgdG8gMiBkcClcblx0Y29uc3QgYWxsQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIG5vQ2FwUmVzdWx0LCAuLi5jYXBzUmVzdWx0UHJlKTtcblx0Y29uc3QgY2hlYXBlc3QgPSBPYmplY3Qua2V5cyhhbGxDYXBzKS5yZWR1Y2UoKGEsIGIpID0+IGFsbENhcHNbYV0gPCBhbGxDYXBzW2JdID8gYSA6IGIpO1xuXHRcblx0cmV0dXJuIHtcblx0XHRjYXA6IGNoZWFwZXN0LFxuXHRcdHZhbHVlOiByb3VuZCgoYWxsQ2Fwc1tjaGVhcGVzdF0pLCAyKVxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgd2Vla1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIHJvdW5kZWQgdG8gMiBkcFxuICogQGRlc2NyaXB0aW9uIGNhbGN1bGF0ZXMgd2hldGhlciBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIGEgd2Vla2x5IHRyYXZlbGNhcmQgb3Igbm9uZVxuICovXG5cbiBpbXBvcnQge1xuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFjdGxlc3MoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuICAvLyBtYXBzIG92ZXIgYWxsIHRoZSBwb3NzaWJsZSB3ZWVrbHkgY2FwcyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2Ygd2Vla2x5IGNhcCArIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKVxuIFx0Y29uc3QgZmluYWwgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuICAgICAgY29uc3Qgd2Vla1RvdGwgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIC8vYWRkcyB0aGUgd2Vla2x5IGNhcCB0byB0aGUgd2VlayB0b3RhbFxuICAgICAgcmV0dXJuIHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKTtcbiAgICB9KTtcblxuICAvLyBnZXRzIHRoZSBmYXJlIGZvciB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApIHdpdGggbm8gd2Vla2x5IHRyYXZlbGNhcnNcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuICAgICAgICB9LFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyByZXR1cm5zIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIGNvbnRhY3RsZXNzIChyb3VuZGVkIHRvIDIgZHApXG4gIHJldHVybiByb3VuZChcbiAgXHRcdChtaW5OdW0oZmluYWwuY29uY2F0KFtub1dlZWtseV0pKSksIDIpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3MuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsImltcG9ydCBveXN0ZXIgZnJvbSAnLi9fb3lzdGVyJztcbiBpbXBvcnQgeyBnZXRGYXJlLFxuIFx0XHRcdHJvdW5kLCB9IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3Rlck1vbnRobHkoZGF5cywgZGF0YSkge1xuXHRpZiAob3lzdGVyKGRheXMsIGRhdGEpLmNhcCAhPT0gXCJub0NhcFwiKSB7XG5cdFx0Y29uc3QgbW9udGhseSA9IGdldEZhcmUoW295c3RlcihkYXlzLCBkYXRhKS5jYXBdLCBmYWxzZSwgZGF0YS5tb250aGx5Q2Fwcyk7XG5cdFx0Y29uc3Qgd2Vla2x5ID0gKG1vbnRobHkgKiAxMikvNTI7XG5cdFx0cmV0dXJuIHJvdW5kKHdlZWtseSwgMik7XG5cdH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJNb250aGx5LmpzIiwiLyoqXG4gKiBJZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgLSBjYWxjdWxhdGVzIHdoaWNoZXZlciBpcyBjaGVhcGVyOlxuICogXHRlaXRoZXIgdHdvIHNwbGl0IHNpbmdsZXMgb3IgZnVsbCBmYXJlIHdpdGhvdXQgdHJhdmVsY2FyZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IG1pbkNoYXJnZWRab25lIC0gdGhlIG1pbiB6b25lIHRoYXQgd2lsbCBjaGFyZ2UgYmV0d2VlbiB0aGlzIG1pbiBjaGFyZ2FibGUgem9uZSB0byBtaW4gdHJhdmVsY2FyZCAtIDEgKGFzIHNpbmdsZSkgYW5kICBtYXggY2hhcmdlYWJsZSB6b25lICh0byBjaGFyZ2UgYmV3ZWVuIG1heCB0cmF2ZWxjYXJkICsxIHRvIG1heCBjaGFyZ2VhYmxlIHpvbmUpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGNoZWFwZXN0IGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7XG5cdGdldEZhcmUsXG5cdG1pbk51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0T3JGdWxsRmFyZShcblx0bWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcblx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcblx0c2luZ2xlRmFyZXMsIHR5cGUpIHtcblx0cmV0dXJuIG1pbk51bShbXG5cdFx0Z2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSxcblx0XHQoZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcykgKyBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcykpXG5cdF0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwiaW1wb3J0IHtcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGZsYXR0ZW4sXG4gIGdldEZhcmUsXG5cdG1ldCxcbiAga2V5c1RvSm91cm5leSxcbn0gZnJvbSAnLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCBnZXRTaW5nbGVKb3VybmV5Wm9uZXMgZnJvbSAnLi9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzJztcbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcyc7XG5pbXBvcnQgb3lzdGVyIGZyb20gJy4vcGFydGlhbHMvX295c3Rlcic7XG5pbXBvcnQgY29udGFjdGxlc3MgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3MnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL3BhcnRpYWxzL193ZWVrVG90YWwnO1xuaW1wb3J0IG95c3Rlck1vbnRobHkgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyTW9udGhseSc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG4vLyBBZGQgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlclxuLy8gQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gQVBJIEhBTkRMSU5HXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGRhdGEuc2luZ2xlRmFyZXM7XG4gIGxldCBkYWlseUNhcHMgPSBkYXRhLmRhaWx5Q2FwcztcblxuY29uc3QgZGF5cyA9IFtcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgICAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICAvLyBbXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCAyXSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCAyXSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vIF0sXG4gIC8vIFtcbiAgLy8gICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCAyXSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vIF0sXG4gIC8vIFtcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDJdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCAyXSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gXSxcbiAgLy8gW1xuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgMl0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDJdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyAgIHtcbiAgLy8gICAgIHpvbmVzOiBbMiwgNF0sXG4gIC8vICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAvLyAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gIC8vICAgfSxcbiAgLy8gICB7XG4gIC8vICAgICB6b25lczogWzIsIDRdLFxuICAvLyAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgLy8gICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAvLyAgIH0sXG4gIC8vICAge1xuICAvLyAgICAgem9uZXM6IFsyLCA0XSxcbiAgLy8gICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gIC8vICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgLy8gICB9LFxuICAvLyBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gICAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuIFxuXTtcblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBcImNvbnRhY3RsZXNzID0gXCIgKyBjb250YWN0bGVzcyhkYXlzLCBkYXRhKVxuICAvLyApO1xuXG4gIC8vIC8vIGZpbmFsIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugb24gb3lzdGVyXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIG95c3RlcihkYXlzLCBkYXRhKVxuICAvLyApO1xuXG5cbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgd2Vla1RvdGFsKGNvbkRheVRvdGFsLCBkYXlzLCB7XG4gIC8vICAgICBmYWxzZSxcbiAgLy8gICAgIGRhdGEsXG4gIC8vICAgfSlcbiAgLy8gKTtcblxuICAvLyBjb25zb2xlLmxvZyhveXN0ZXJNb250aGx5KGRheXMsIGRhdGEpKTsgXG5cbi8vIGNvbnN0IGpvdXJuZXkgPSBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCAzXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcImFueXRpbWVcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgM10sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDNdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuICAgIFxuLy8gICAgICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4gICAgXG4vLyAgICAgICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbiAgICBcbi8vICAgICAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMywgNl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzMsIDZdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFszLCA2XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gXTtcbmNvbnN0IGpvdXJuZXkgPSBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAzXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG5dO1xuLy90ZXN0cyBmb3IgZmFsc2UgbmVnYXRpdmVzIGlmIGFueXRpbWUgaXMgbWV0IGZpcnN0IGFuZCB0aGVuIG9mZiBwZWFrIC0tIGFkZCB0byB0ZXN0XG4vL2J1dCBjaGVjayB0aGUgY2FsY3VsYXRpb25zIHdvcmsgb3V0XG4gIC8vICAgY29uc29sZS5sb2coXG4gIC8vICAgY29uRGF5VG90YWwoXG4gIC8vICAgICBqb3VybmV5LFxuICAvLyAgICAge1xuXG4gIC8vICAgICB9LCB7XG4gIC8vICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbiAgLy8gICAgICAgICBzaW5nbGVGYXJlc1xuICAvLyAgICAgICB9KVxuICAvLyApO1xuY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIHdlZWtUb3RhbChveXN0ZXJEYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogMSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiAyLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhLFxuICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcblxuLy8gICAgICAgY29uc29sZS5sb2coXG4vLyBveXN0ZXJEYXlUb3RhbChcbi8vICAgICAgICAgICBqb3VybmV5LFxuLy8gICAgICAgICB7XG5cbi8vICAgICAgICB9LCB7XG4gICAgICAgICBcbi8vICAgICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuLy8gICAgICAgICAgIHNpbmdsZUZhcmVzXG4vLyAgICAgICAgIH0pXG4vLyAgICk7XG5cbi8vIGNvbnNvbGUubG9nKGV4dGVuc2lvbkZhcmVzKHtcbi8vICAgICAgICAgem9uZXM6IFsxLCA0XSxcbi8vICAgICAgICAgbWluVHJhdmVsY2FyZDogZmFsc2UsXG4vLyAgICAgICAgIG1heFRyYXZlbGNhcmQ6IGZhbHNlLFxuLy8gICAgICAgICBtYXhEYWlseTogMSxcbi8vICAgICAgICAgdHlwZTogJ2FueXRpbWUnLFxuLy8gICAgICAgfSwgc2luZ2xlRmFyZXMpKTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=