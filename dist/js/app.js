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
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return met; });
/* harmony export (immutable) */ __webpack_exports__["e"] = round;
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
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares);

		//if min single within travelcard zones but max single isnt - charge end
	} else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
		// debugger;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares);

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

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, maxSingle], type, singleFares);
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

    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(b.zones, b.type, singleFares);

    // takes the numbers from the previous loop
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;

    //the maximum zone travelled in so far is updated with current zones
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])([].concat(a.maxZone, b.zones));

    //in preparation for whether off peak daily cap is met or not (to be passed out within capIsMet)
    var offPeakReachedPre = false;
    var offPeakReached = false;
    var offPeakMaxZone = a.offPeakMaxZone;
    var anytimeReached = false;

    // FOR WEEKLY travelcards - ie if the max travelcard has been passed in, so uses extension fares function to calculate single fare
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({
        zones: b.zones,
        type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(b.zones) + 1 >= minTravelcard && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(b.zones) + 1 <= maxTravelcard) {
        singleFare = 0;
      }
      //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1;
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // if the current journey made was OFFPEAK
    if (b.type === 'offPeak') {
      //off peak total gets updated and if needed overridden with offpeak daily cap
      if (offPeakTotal + singleFare >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'offPeak', dailyCaps);
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
    if (currentTotal > __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'anytime', dailyCaps)) {
      //if anytime daily cap reached, off peak reached will then be set to false via anytimereached (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(maxZone, 'anytime', dailyCaps);
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
    value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* round */])(dayTotal.currentTotal, 2),
    capIsMet: dayTotal.offPeakReached ? dayTotal.offPeakMaxZone : false
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contactlessDayTotal__ = __webpack_require__(5);
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
		weekTotalFare -= numOffPeakCapZ4 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([1, 4], false, info.data.autoOffPeakRefund) + numOffPeakCapZ6 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([1, 6], false, info.data.autoOffPeakRefund) + numOffPeakCapZ5 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([1, 5], false, info.data.autoOffPeakRefund);
		debugger;
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


	var allDailyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(dailyCaps);
	// gets cheapest daily anytime cap

	var conMin = minTravelcard;
	var conMax = maxTravelcard;

	var cheapestAnytime = allDailyCaps.map(function (cap) {

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

		return total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	// need a flag for off peak cap between 1-4, 1-5 or 1-6
	var cheapestOffPeak = allDailyCaps.map(function (cap) {
		var offPeakMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(cap);

		var offPeakDayTotal = day.map(function (journey) {
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
			offPeakMaxZone: offPeakMaxZone,
			value: offPeakDayTotal + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(cap, 'offPeak', dailyCaps)
		};
	});

	// for no daily caps
	var cheapestNoCap = day.map(function (journey) {

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
		value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* round */])(minAll, 2),
		capIsMet: isEq ? capVal[0].offPeakMaxZone : false
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
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
  var final = weeklyCaps.map(function (weekCap) {
    var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
      options: {
        minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
        maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(weekCap)
      },
      data: data
    });
    //adds the weekly cap to the week total
    return weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(weekCap, false, data.weeklyCaps);
  });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  var noWeekly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__contactlessDayTotal__["a" /* default */], days, {
    false: false,
    data: data
  });

  // returns the cheapest weekly charge on contactless (rounded to 2 dp)
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* round */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(final.concat([noWeekly])), 2);
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

/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */






function oyster(days, data) {
	var weeklyCaps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

	// if no weekly cap
	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			false: false,
			data: data
		})
	};
	// for each weeky cap
	var capsResultPre = weeklyCaps.map(function (weekCap) {
		var weekTotl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__oysterDayTotal__["a" /* default */], days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])(weekCap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* maxNum */])(weekCap)
			},
			data: data
		});
		//returns object: the weekly cap associated and the week total (with weekly cap added)
		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["g" /* journeyToKey */])(weekCap), weekTotl + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])(weekCap, false, data.weeklyCaps));
	});

	// returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	return _defineProperty({}, cheapest, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* round */])(allCaps[cheapest], 2));
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, maxSingle], type, singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([minChargedZone, minTravelcard - 1], type, singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* getFare */])([maxTravelcard + 1, maxSingle], type, singleFares)]);
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

//MONTHLY - is calendar month - so do (x * 12 )/52?

// daily offpeak/anytime capping changes:
// time of travel to be applied as an arugment: early, morning, afternoon, late
//Travel weekday early  doesnt count towards off peak cap, only anytime but is off peak single fares
// travel weekday (peak time) afternoon counts towards and is covered by the off peak/anytime cap, but is peak single fares
// morning is peak & anytime daily cap / late is off peak & off peak/anytime daily cap

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


  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__partials_weekTotal__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_8__partials_contactlessDayTotal__["a" /* default */], days, {
    false: false,
    data: data
  }));

  // const journey = [
  //     {
  //       zones: [2, 4],
  //       dualZoneOverlap: true,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 2],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 4],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 4],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 4],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  //     {
  //       zones: [2, 4],
  //       dualZoneOverlap: false,
  //       type: "offPeak",
  //     },
  // //also tests for all offpeak, all anytime, most anytime 1 offpeak & vice versa, 2-4 zone first and last
  //   ];

  //     console.log(
  //     conDayTotal(
  //       journey,
  //       {

  //       }, {
  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

  //       console.log(
  // oysterDayTotal(
  //           journey,
  //         {

  //        }, {

  //           dailyCaps, //JSON
  //           singleFares
  //         })
  //   );

});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDU4MzZiYTQ3M2Q0MTQwZjc3YzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2NvbnRhY3RsZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0Iiwicm91bmQiLCJkZWNpbWFscyIsIk51bWJlciIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsInNpbmdsZUZhcmVzIiwibWF4RGFpbHkiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImZpbmFsQ29uZGl0aW9uIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluQ2hhcmdlZFpvbmUiLCJzcGxpdE9yRnVsbEZhcmUiLCJveXN0ZXJEYXlUb3RhbCIsImRheSIsImRhdGEiLCJkYWlseUNhcHMiLCJkYXlUb3RhbCIsImN1cnJlbnRUb3RhbCIsInNpbmdsZUZhcmUiLCJvZmZQZWFrVG90YWwiLCJwZWFrVG90YWwiLCJtYXhab25lIiwib2ZmUGVha1JlYWNoZWRQcmUiLCJvZmZQZWFrUmVhY2hlZCIsIm9mZlBlYWtNYXhab25lIiwiYW55dGltZVJlYWNoZWQiLCJkdWFsWm9uZU92ZXJsYXAiLCJjYXBJc01ldCIsIndlZWtUb3RhbCIsInBheW1lbnRGdW5jdGlvbiIsImRheXMiLCJpbmZvIiwibnVtT2ZmUGVha0NhcFo0IiwibnVtT2ZmUGVha0NhcFo2IiwibnVtT2ZmUGVha0NhcFo1Iiwid2Vla1RvdGFsRmFyZSIsInVuZGVmaW5lZCIsImRheU9iamVjdCIsImRheUNhcE1ldCIsImF1dG9PZmZQZWFrUmVmdW5kIiwiZmV0Y2hGYXJlRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiY29uRGF5VG90YWwiLCJhbGxEYWlseUNhcHMiLCJjb25NaW4iLCJjb25NYXgiLCJjaGVhcGVzdEFueXRpbWUiLCJ0b3RhbCIsImNvbkRhaWx5IiwiY2hlYXBlc3RPZmZQZWFrIiwib2ZmUGVha0RheVRvdGFsIiwiY2hlYXBlc3ROb0NhcCIsImxUb1ZhbHVlcyIsImxWYWwiLCJtaW5BbGwiLCJpc0VxIiwic29tZSIsImVudHJ5IiwiY2FwVmFsIiwiY29udGFjdGxlc3MiLCJmaW5hbCIsIndlZWtDYXAiLCJ3ZWVrVG90bCIsIm5vV2Vla2x5IiwiZmFsc2UiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6Iiwib3lzdGVyIiwibm9DYXBSZXN1bHQiLCJjYXBzUmVzdWx0UHJlIiwiYWxsQ2FwcyIsImFzc2lnbiIsImNoZWFwZXN0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7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QUFHQW1ELFVBQVFDLEdBQVIsQ0FDRSwyRkFBQWQsQ0FBVSw4RUFBVixFQUF1QkUsSUFBdkIsRUFBNkI7QUFDM0IrQyxnQkFEMkI7QUFFM0IvRDtBQUYyQixHQUE3QixDQURGOztBQU9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQyxDQXBZRCxFIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDU4MzZiYTQ3M2Q0MTQwZjc3YzUiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogUHJlbG9hZHMgc3RhcnQgem9uZSBhcyAxIGFuZCBjaGFuZ2VzIHRvIDEteCBmb3IgSlNPTiBmaWxlIHJlYWRpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gem9uZSB4XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICcxLXgnXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6b25lVG9Kb3VybmV5KHpvbmUpIHtcbiAgcmV0dXJuIGpvdXJuZXlUb0tleShbMSwgem9uZV0pO1xufVxuXG4vKipcbiAqIFR1cm5zIFwiMS0yXCIgaW50byBbMSwgMl1cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IC0ga2V5OiBcIjEtMlwiXG4gKiBAcmV0dXJucyB7YXJyYXl9IC0gWzEsIDJdXG4gKiBAZGVzY3JpcHRpb24gLSBPcHBvc2l0ZSBvZiBqb3VybmV5VG9LZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleVRvSm91cm5leShrZXkpIHtcbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLnNvcnQoKS5tYXAobnVtID0+IHBhcnNlSW50KG51bSkpO1xufVxuXG4vKipcbiAqIEdldHMga2V5cyBmcm9tIHdlZWtseUNhcHMsIG1hcHMgb3ZlciB0aGVtIHRvIGdlbmVyYXRlIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7d2Vla2x5Q2Fwc30gLSB0aGUgd2Vla2x5Q2FwcyBkYXRhIGZyb20gZmFyZXMuanNvblxuICogQHJldHVybnMge2FycmF5fSAtIHJldHVybnMgYXJyYXkgb2YgYXJyYXlzIFtbMSwgMl0sIFsxLCAzXSBldGNdXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvSm91cm5leSh3ZWVrbHlDYXBzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3ZWVrbHlDYXBzKS5tYXAoKGNhcCkgPT4ga2V5VG9Kb3VybmV5KGNhcCkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gLSBrZXkgaXMgYW4gYXJyYXkgb2YgdHdvIHpvbmVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBpcyBvZmZQZWFrIG9yIGFueXRpbWUsIG9yIG5vdGhpbmcgaWYgbm90IG5lZWRlZCAoZS5nLiBmb3Igd2Vla2x5IGNhcHMpXG4gKiBAcGFyYW0ge2RhdGF9IHRoZSBKU09OIGRhdGEgZmlsZSB3aXRoIGZhcmUgb2JqZWN0c1xuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSAvIHdlZWtseSBjYXAgLyBkYWlseSBjYXAgZnJvbSBmYXJlcy5qc29uXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmFyZSA9IChrZXksIHR5cGUsIGNhcHMpID0+IHtcbiAgY29uc3QgZmFyZSA9IGNhcHNba2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGpvdXJuZXlUb0tleShrZXkpIDogem9uZVRvSm91cm5leShrZXkpXTtcblxuICByZXR1cm4gdHlwZSA/IGZhcmVbdHlwZV0gOiBmYXJlO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbnVtZXJpYyB0YXJnZXQgaGFzIGJlZW4gbWV0IG9yIHN1cnBhc3NlZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gdGFyZ2V0IHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGFyZ2V0XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1ldCA9ICh2YWx1ZSwgdGFyZ2V0KSA9PiB2YWx1ZSA+PSB0YXJnZXQ7XG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGhvd2V2ZXIgbWFueSBkZWNpbWFsIHBsYWNlcyBzcGVjaWZpZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGFyZ2V0IHZhbHVlIHRvIHJvdW5kXG4gKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbHMgLSB0aGUgbnVtYmVyIG9mIGRlY2ltYWxzIHJlc3VsdCBzaG91bGQgaGF2ZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgZGVjaW1hbHMpIHtcbsKgwqDCoHJldHVybiBOdW1iZXIoYCR7TWF0aC5yb3VuZChgJHt2YWx1ZX1lJHtkZWNpbWFsc31gKX1lLSR7ZGVjaW1hbHN9YCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdEZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Rk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcCkgLS0gdW5sZXNzIHlvdSBhZGQgaW4gTWF4RGFpbHlcbi8vICAvLyB0aGlzIGlzIG92ZXJseSBjb21wbGljYXRlZCBmb3IgZGFpbHkgY2FwcyAoYXMgb25seSBkZWFscyB3aXRoIHpvbmUgMSB0byB4KSBidXQgc3RpbGwgd29ya3MuIFJFTElFUyBPTiBUSEUgRkFDVCBEQUlMWSBBTFdBWVMgU1RBUlRTIEFUIDFcbi8vICAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuLy8gYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbi8vIGRlYnVnZ2VyO1xuICBsZXQgZmluYWxDb25kaXRpb24gPSBudWxsO1xuICBsZXQgbWluU2luZ2xlID0gem9uZXNbMF07XG4gIGxldCBtYXhTaW5nbGUgPSB6b25lc1sxXTtcbiAgbGV0IG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXG5cdGlmIChtYXhEYWlseSkgeyAvLyBJZiBjb250YWN0bGVzcywgZGFpbHkgYW5kIHdlZWtseSBjb21ibyAoaGVuY2UgYWRkaW5nIGluIG1heERhaWx5IGFzIGFyZ3VtZW50X1xuXHQgXHRpZiAobWF4RGFpbHkgPj0gKG1pblRyYXZlbGNhcmQgLSAxKSkgeyAvLyBpZiBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG5cdCAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy8gc2luY2UgYW55dGltZSBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDFcblx0ICAgXHRtYXhUcmF2ZWxjYXJkID0gbWF4TnVtKFttYXhEYWlseSwgbWF4VHJhdmVsY2FyZF0pOyAvLyBtYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcbi8vIGVsc2UgaWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8sIGFuZCB0aGVyZSBhcmUgZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZCwgaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyAvLyBJRiBkaWZmZXJlbmNlIGJ3IG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FU1xuXHRcdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRcdGZpbmFsQ29uZGl0aW9uID0gKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGlmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdCAvLyBkZWJ1Z2dlcjtcblx0XHRyZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gc3BsaXRPckZ1bGxGYXJlKFxuICAgICAgbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzLCB0eXBlKTtcblxuXHQvLyBib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0IC8vIGRlYnVnZ2VyO1xuIFx0XHRyZXR1cm4gMDtcbiBcdC8vIGJvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH1cblxuXG4gIHJldHVybiBnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuLy8gRUxTRSBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gb2JqZWN0IGNvbnRhaW5pbmcge3ZhbHVlOiByZXR1cm5zIHRoZSB0b3RhbCBmYXJlICYgY2FwSXNNZXQ6IGlmIG9mZlBlYWsgY2FwIHdhcyBtZXQsIHRoZW4gZGlzcGxheXMgdGhlIG1heCB6b25lIGZvciB0aGUgb2ZmUGVhayBkYWlseSBjYXAsIGVsc2UgZmFsc2UufVxuICogQGRlc2NyaXB0aW9uIGlzIGNhcHBlZCBieSBvZmYgcGVhayBkYWlseSBjYXAgb3IgcGVhayBjYXAgKGN1bXVsYXRpdmVseSkgd2hlcmUgbmVjZXNzYXJ5XG4gKi9cblxuaW1wb3J0IHtcbiAgbWluTnVtLFxuICBtYXhOdW0sXG4gIGdldEZhcmUsXG4gIG1ldCxcbiAgem9uZVRvSm91cm5leSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBleHRlbnNpb25GYXJlcyBmcm9tICcuL19leHRlbnNpb25GYXJlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlckRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcbiAgICBcbiAgY29uc3QgZGF5VG90YWwgPSBkYXkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGV0IGN1cnJlbnRUb3RhbDtcblxuICAgIGxldCBzaW5nbGVGYXJlID0gZ2V0RmFyZShiLnpvbmVzLCBiLnR5cGUsIHNpbmdsZUZhcmVzKTtcblxuICAgIC8vIHRha2VzIHRoZSBudW1iZXJzIGZyb20gdGhlIHByZXZpb3VzIGxvb3BcbiAgICBsZXQgb2ZmUGVha1RvdGFsID0gYS5vZmZQZWFrVG90YWw7XG4gICAgbGV0IHBlYWtUb3RhbCA9IGEucGVha1RvdGFsO1xuXG4gICAgLy90aGUgbWF4aW11bSB6b25lIHRyYXZlbGxlZCBpbiBzbyBmYXIgaXMgdXBkYXRlZCB3aXRoIGN1cnJlbnQgem9uZXNcbiAgICBsZXQgbWF4Wm9uZSA9IG1heE51bShbXS5jb25jYXQoYS5tYXhab25lLCBiLnpvbmVzKSk7XG5cbiAgICAvL2luIHByZXBhcmF0aW9uIGZvciB3aGV0aGVyIG9mZiBwZWFrIGRhaWx5IGNhcCBpcyBtZXQgb3Igbm90ICh0byBiZSBwYXNzZWQgb3V0IHdpdGhpbiBjYXBJc01ldClcbiAgICBsZXQgb2ZmUGVha1JlYWNoZWRQcmUgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha1JlYWNoZWQgPSBmYWxzZTtcbiAgICBsZXQgb2ZmUGVha01heFpvbmUgPSBhLm9mZlBlYWtNYXhab25lO1xuICAgIGxldCBhbnl0aW1lUmVhY2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gRk9SIFdFRUtMWSB0cmF2ZWxjYXJkcyAtIGllIGlmIHRoZSBtYXggdHJhdmVsY2FyZCBoYXMgYmVlbiBwYXNzZWQgaW4sIHNvIHVzZXMgZXh0ZW5zaW9uIGZhcmVzIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBzaW5nbGUgZmFyZVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe1xuICAgICAgICB6b25lczogYi56b25lcyxcbiAgICAgICAgdHlwZTogYi50eXBlLCBtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkfSxcbiAgICAgICAgc2luZ2xlRmFyZXMpO1xuICAgICAgXG4gICAgICAvLyBkdWFsIHRvIGR1YWwgc3RhdGlvbnM6IGlmIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lID08IG1heCBkdWFsIHpvbmUgem9uZVxuICAgICAgLy8gPSA+IHRoZW4gY2hhbmdlcyBkdWFsIHRvIGR1YWwgIHN0YXRpb25zIHRvIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lXG4gICAgICBpZiAoYi5kdWFsWm9uZU92ZXJsYXAgPT09IHRydWUgJiZcbiAgICAgICAgKCgobWluTnVtKGIuem9uZXMpKSArIDEpID49IG1pblRyYXZlbGNhcmQpICYmXG4gICAgICAgICgoKG1heE51bShiLnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKVxuICAgICAgICApIHtcbiAgICAgICAgc2luZ2xlRmFyZSA9IDA7XG4gICAgICB9XG4gICAgICAgIC8vKGllIG9ubHkgY29tcGFyZXMgYWdhaW5zdCBkYWlseSBjYXAgb2YgbWluU2luZ2xlIHRvIG1heFpvbmUgLSByZW1vdmVzIG92ZXJsYXAgd2l0aCB3ZWVrbHkpXG4gICAgICBpZiAobWluVHJhdmVsY2FyZCA+IDEgJiYgbWV0KG1heFRyYXZlbGNhcmQsIG1heFpvbmUpICYmIG1ldChtYXhab25lLCBtaW5UcmF2ZWxjYXJkIC0gMSkpIHtcbiAgICAgICAgbWF4Wm9uZSA9IG1pblRyYXZlbGNhcmQgLSAxOyBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJyZW50VG90YWwgPSBhLmN1cnJlbnRUb3RhbCArIHNpbmdsZUZhcmU7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudCBqb3VybmV5IG1hZGUgd2FzIE9GRlBFQUtcbiAgICBpZiAoYi50eXBlID09PSAnb2ZmUGVhaycpIHtcbiAgICAgIC8vb2ZmIHBlYWsgdG90YWwgZ2V0cyB1cGRhdGVkIGFuZCBpZiBuZWVkZWQgb3ZlcnJpZGRlbiB3aXRoIG9mZnBlYWsgZGFpbHkgY2FwXG4gICAgICBpZiAoKG9mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUpID49IGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpKSB7XG4gICAgICAgIG9mZlBlYWtSZWFjaGVkUHJlID0gdHJ1ZTtcbiAgICAgICAgb2ZmUGVha1RvdGFsID0gZ2V0RmFyZShtYXhab25lLCAnb2ZmUGVhaycsIGRhaWx5Q2Fwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZQZWFrVG90YWwgKz0gc2luZ2xlRmFyZTtcbiAgICAgIH1cblxuICAgICAgLy9vZmZQZWFrVG90YWwgPSBtaW5OdW0oW29mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUsIGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpXSk7XG5cbiAgICAgIC8vIGN1cnJlbnQgdG90YWwgaXMgdXBkYXRlZCBpZiBuZWVkZWQgdG8gYmUgb2ZmIHBlYWsgdG90YWwgKyBwcmV2aW91cyBwZWFrIHRvdGFsIGZvciBvZmYgcGVhayB0cmF2ZWxcbiAgICAgIGlmICgob2ZmUGVha1RvdGFsICsgcGVha1RvdGFsKSA8PSBjdXJyZW50VG90YWwpIHtcbiAgICAgICAgLy9pZiB0aGlzIGNvbmRpdGlvbiBhbmQgdGhlIGFib3ZlIGNvbmRpdGlvbnMgYXJlIGJvdGggbWV0IChpZSBhIGN1cnJlbnQgb3IgcHJldmlvdXNvZmZwZWFrIGRhaWx5IGNhcCBhcHBsaWVkIHRvIGN1cnJlbnR0b3RhbCksIHNldCB0cnVlXG4gICAgICAgIGlmIChvZmZQZWFrUmVhY2hlZFByZSkge1xuICAgICAgICAgIG9mZlBlYWtSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICBvZmZQZWFrTWF4Wm9uZSA9IG1heFpvbmU7XG4gICAgICAgICAgLy8gcmV0dXJuIHRoZSBtYXggem9uZSBmb3Igb2ZmIHBlYWsgY2FwXG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFRvdGFsID0gb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsO1xuICAgICAgfVxuXG4gICAgICAvL2N1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBvZmZQZWFrVG90YWwgKyBwZWFrVG90YWxdKTtcblxuICAgIC8vb3RoZXJ3aXNlIGZvciBQRUFLIHRyYXZlbCB0aGUgcGVhayB0b3RhbCBpcyB1cGRhdGVkIGluIHByZXBhcmF0aW9uIGZvciBuZXh0IHJvdW5kXG4gICAgfSBlbHNlIHtcbiAgICAgIHBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgIH1cblxuICAgIC8vaWYgbmVlZGVkIGN1cnJlbnQgdG90YWwgaXMgdG90YWxseSBvdmVycmlkZGVuIGJ5IGFueXRpbWUgZGFpbHkgY2FwXG4gICAgaWYgKGN1cnJlbnRUb3RhbCA+IChnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKSkpIHtcbiAgICAgIC8vaWYgYW55dGltZSBkYWlseSBjYXAgcmVhY2hlZCwgb2ZmIHBlYWsgcmVhY2hlZCB3aWxsIHRoZW4gYmUgc2V0IHRvIGZhbHNlIHZpYSBhbnl0aW1lcmVhY2hlZCAoYXMgYW55dGltZSBhcHBsaWVkIG5vdCBvZmYgcGVhayBjYXApXG4gICAgICBhbnl0aW1lUmVhY2hlZCA9IHRydWU7XG4gICAgICBjdXJyZW50VG90YWwgPSBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKTtcbiAgICB9XG5cbiAgICAvL2N1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKV0pO1xuICAgIHJldHVybiB7XG4gICAgICAvLyBvYmplY3QgaXMgcmV0dXJuZWQgdG8gYmUgY29tcGFyZWQgXG4gICAgICBjdXJyZW50VG90YWwsXG4gICAgICBvZmZQZWFrVG90YWwsXG4gICAgICBwZWFrVG90YWwsXG4gICAgICBtYXhab25lLFxuICAgICAgb2ZmUGVha01heFpvbmUsXG4gICAgICAvL2Vuc3VyZXMgdGhhdCBwcmV2aW91cyBvZmYgcGVhayBjYXBzIGFwcGxpZWQgcHJldmlvdXMgdG8gZnV0dXJlIGxvb3BzIC0gaWYgdHJ1ZSwgc3RheXMgdHJ1ZVxuICAgICAgb2ZmUGVha1JlYWNoZWQ6IChhLm9mZlBlYWtSZWFjaGVkICYmICFhbnl0aW1lUmVhY2hlZCkgPyB0cnVlIDogb2ZmUGVha1JlYWNoZWQsXG4gICAgfTtcblxuICB9LCB7XG4gICAgY3VycmVudFRvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBwZWFrVG90YWw6IDAsXG4gICAgbWF4Wm9uZTogbnVsbCxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyByb3VuZHMgdG8gMiBkcFxuICAgIHZhbHVlOiByb3VuZChkYXlUb3RhbC5jdXJyZW50VG90YWwsIDIpLFxuICAgIGNhcElzTWV0OiBkYXlUb3RhbC5vZmZQZWFrUmVhY2hlZCA/IGRheVRvdGFsLm9mZlBlYWtNYXhab25lIDogZmFsc2UsXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSB3ZWVrIHRvdGFsIChiYXNlZCBvbiBwYXJhbWV0ZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzIHBhc3NlZCBhcyBhcmd1bWVudClcbiAqIEBmdW5jdGlvblxuICAqIEBwYXJhbSB7ZnVuY3Rpb24gLSBzdHJpbmd9IGNvbkRheVRvdGFsIG9yIG95c3RlckRheVRvdGFsIC0gdG8gY2FsY3VsYXRlIHVzaW5nIG95c3RlciBvciBjb250YWN0bGVzcyBcbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtvYmplY3R9IGluZm8gLSBpcyBhbiBvYmplY3Qgd2l0aCB7XG4gXHRcdFx0b3B0aW9uczoge29iamVjdCB0aGF0IGhhcyBtaW5UcmF2ZWxjYXJkOiBudW0gYW5kIG1heFRyYXZlbGNhcmQ6IG51bX0sIFxuIFx0XHRcdGRhdGEgfVxuICogQHJldHVybnMge251bWJlcn0gLSB0b3RhbCBjaGVhcGVzdCBveXN0ZXIgb3IgY29udGFjdGxlc3MgZmFyZSBmb3IgdGhhdCB3ZWVrXG4gKiBAZGVzY3JpcHRpb24gSXQgYWxzbyBkZWR1Y3RzIHRoZSBhdXRvbWF0aWMgb2ZmcGVhayByZWZ1bmRzIGZvciB6b25lcyA0LTYgaWYgb2ZmIHBlYWsgZGFpbHkgY2FwIGlzIG1ldCBtb3JlIHRoYW4gb25jZSBlYWNoIHdlZWtcbiBcdFx0ZS5nLjogXG4gICAgICAgY29uc3QgeSA9IHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluVHJhdmVsY2FyZDogbWluTnVtKHdlZWtDYXApLFxuICAgICAgICAgIG1heFRyYXZlbGNhcmQ6IG1heE51bSh3ZWVrQ2FwKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICovXG4gaW1wb3J0IHtcbiAgZ2V0RmFyZSxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcblxuLy93b3JrcyBvdXQgdGhlIGVxdWl2YWxlbnQgb2Ygbm8gY2FwXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3ZWVrVG90YWwocGF5bWVudEZ1bmN0aW9uLCBkYXlzLCBpbmZvKSB7XG5cdGxldCBudW1PZmZQZWFrQ2FwWjQgPSAwO1xuXHRsZXQgbnVtT2ZmUGVha0NhcFo2ID0gMDtcblx0bGV0IG51bU9mZlBlYWtDYXBaNSA9IDA7XG5cblx0bGV0IHdlZWtUb3RhbEZhcmUgPSBkYXlzLm1hcChmdW5jdGlvbiAoZGF5KSB7IFxuXHRcdC8vaWYgZGF5IGlzIGVtcHR5IHdpdGggbm8gam91cm5leXNcblx0XHRpZiAoZGF5ID09PSB1bmRlZmluZWQgfHwgZGF5Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHQgIFx0Ly9mb3IgZWFjaCBkYXkgYWRkIHRvZ2V0aGVyIHRoZSB0b3RhbCBkYXkgdG90YWxcblx0ICBcdGNvbnN0IGRheU9iamVjdCA9IHBheW1lbnRGdW5jdGlvbihkYXksIGluZm8ub3B0aW9ucywgaW5mby5kYXRhKTtcblx0ICBcdGNvbnN0IGRheUNhcE1ldCA9IGRheU9iamVjdC5jYXBJc01ldDtcblxuXHQgIFx0aWYgKGRheUNhcE1ldCA9PT0gNCkge1xuXHQgIFx0XHRudW1PZmZQZWFrQ2FwWjQgKz0gMTtcblx0ICBcdC8vIFdoYXQgYWJvdXQgcmVmdW5kcyBpZiB0aGUgY2FwIGlzIGJldHdlZW4gem9uZXMgMS01Pz8gYW5kIGlmIGRvZXMgbm90IGFwcGx5IC0gdGhlbiBjaGVhcGVyIHRvIGRvIGRpc2NvdW50ZWQgem9uZSAxLTQgcGx1cyBleHRlbnNpb24gZmFyZXMgdG8gNT9cblx0ICBcdH0gZWxzZSBpZiAoZGF5Q2FwTWV0ID09PSA2KSB7XG5cdCAgXHRcdG51bU9mZlBlYWtDYXBaNiArPSAxO1xuXHQgIFx0fSBlbHNlIGlmIChkYXlDYXBNZXQgPT09IDUpIHtcblx0ICBcdFx0bnVtT2ZmUGVha0NhcFo1ICs9IDE7XG5cdCAgXHR9XG5cblxuXHQgXHRyZXR1cm4gZGF5T2JqZWN0LnZhbHVlO1xuXHQgLy9yZXR1cm5zIHRoZSBjdXJyZW50IHdlZWsgdG90YWxcblx0fSkucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cdGRlYnVnZ2VyO1xuICAvLyB3ZWVrIGZ1bmN0aW9uIHRvIHNlZSBpZiBvZmYgcGVhayBjYXAgbWV0IGFuZCBtYXggem9uZSBiZXR3ZWVuIDQtNjogaWYgdHJ1ZSBmb3IgMisgYSB3ZWVrLCBhcHBseSBhIGRpc2NvdW50XG5cdGlmICgobnVtT2ZmUGVha0NhcFo0ICsgbnVtT2ZmUGVha0NhcFo2ICsgbnVtT2ZmUGVha0NhcFo1KSA+PSAyKSB7XG5cdCAgd2Vla1RvdGFsRmFyZSAtPVxuXHQgIFx0KFxuXHQgIFx0XHQobnVtT2ZmUGVha0NhcFo0ICogKFxuXHQgIFx0XHRcdGdldEZhcmUoWzEsIDRdLCBmYWxzZSwgaW5mby5kYXRhLmF1dG9PZmZQZWFrUmVmdW5kKVxuXHQgIFx0XHQpKVxuXHRcdCAgXHQrIChudW1PZmZQZWFrQ2FwWjYgKiAoXG5cdFx0ICBcdFx0Z2V0RmFyZShbMSwgNl0sIGZhbHNlLCBpbmZvLmRhdGEuYXV0b09mZlBlYWtSZWZ1bmQpXG5cdFx0ICBcdCkpXG5cdFx0ICBcdCsgKG51bU9mZlBlYWtDYXBaNSAqIChcblx0XHQgIFx0XHRnZXRGYXJlKFsxLCA1XSwgZmFsc2UsIGluZm8uZGF0YS5hdXRvT2ZmUGVha1JlZnVuZClcblx0XHQgIFx0KSlcblx0ICBcdCk7XG5cdCAgXHRkZWJ1Z2dlcjtcblx0fVxuXG5cdHJldHVybiB3ZWVrVG90YWxGYXJlO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fd2Vla1RvdGFsLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0geyBkYXkgb2JqZWN0fSBkYXkgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBqb3VybmV5IG9iamVjdHMgKHRoYXQgaW4gdHVybiBoYXMgem9uZXMgYXJyYXksIGR1YWx6b25lcyBhbmQgdHlwZSAob2ZmcGVhayBvciBhbnl0aW1lKSlcbiAqIEBwYXJhbSB7b3B0aW9ucyBvYmplY3Qgb2YgbWluVHJhdmVsY2FyZDogbnVtLCBtYXhUcmF2ZWxjYXJkOiBudW19IGNvbnN0IG9iamVjdCAtIG1pblRyYXZlbGNhcmQgYW5kIG1heFRyYXZlbGNhcmQgXG4gKiBAcGFyYW0ge2RhdGEgb2JqZWN0IG9mIGRhaWx5Q2FwcyAoSlNPTiBmaWxlKSwgc2luZ2xlRmFyZXMgKEpTT04gZmlsZSBsaW5rKVxuICogQHJldHVybnMge29iamVjdH0gLSBvYmplY3QgY29udGFpbmluZyB7dmFsdWU6IHJldHVybnMgdGhlIHRvdGFsIGZhcmUgJiBjYXBJc01ldDogaWYgb2ZmUGVhayBjYXAgd2FzIG1ldCwgdGhlbiBkaXNwbGF5cyB0aGUgbWF4IHpvbmUgZm9yIHRoZSBvZmZQZWFrIGRhaWx5IGNhcCwgZWxzZSBmYWxzZS59XG4gKiBAZGVzY3JpcHRpb24gV29ya3Mgb3V0IGlmIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgbm8gZGFpbHkgY2FwcywgYW4gb2ZmIHBlYWsgZGFpbHkgY2FwICsgcGVhayBmYXJlcyBvciBhbiBhbnl0aW1lIGNhcCAodGFraW5nIGludG8gYWNjb3VudCB3ZWVrbHkgdHJhdmVsY2FyZHMgcGFzc2VkIGluKVxuICovXG5cbiBpbXBvcnQge1xuICBqb3VybmV5VG9LZXksXG4gIGtleXNUb0pvdXJuZXksXG4gIG1heE51bSxcbiAgbWluTnVtLFxuICBnZXRGYXJlLFxuICBmbGF0dGVuLFxuICByb3VuZCxcbn0gZnJvbSAnLi8uLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vX2V4dGVuc2lvbkZhcmVzJztcblxuLy8gSWYgdGhlIG9mZnBlYWsgY2FwIGlzIG1ldCwgcmV0dXJuIGEgdmFyaWFibGUgJ2NhcElzTWV0JyArIG1heFpvbmUgb2YgdGhhdCBjYXBcblxuLy8gVGhpcyBjYWxjdWxhdGVzIHRoZSBjaGVhcGVzdCBkYWlseSBjYXAgb3Igbm8gZGFpbHkgY2FwIGZvciBlYWNoIGRheSB0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGFueSB3ZWVrbHkgY2FwcyBwYXNzZWQgaW5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbkRheVRvdGFsKGRheSwgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblx0ICBjb25zdCB7XG5cdCAgICBtaW5UcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgICBtYXhUcmF2ZWxjYXJkLCAvL2lmIG5lZWRlZCBmb3Igd2Vla2x5XG5cdCAgfSA9IG9wdGlvbnM7XG5cblx0ICBjb25zdCB7XG5cdCAgICBkYWlseUNhcHMsIC8vSlNPTlxuXHQgICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuXHQgIH0gPSBkYXRhO1xuXG5cdGNvbnN0IGFsbERhaWx5Q2FwcyA9IGtleXNUb0pvdXJuZXkoZGFpbHlDYXBzKTtcblx0Ly8gZ2V0cyBjaGVhcGVzdCBkYWlseSBhbnl0aW1lIGNhcFxuXG5cdGxldCBjb25NaW4gPSBtaW5UcmF2ZWxjYXJkO1xuXHRsZXQgY29uTWF4ID0gbWF4VHJhdmVsY2FyZDtcblxuXHRjb25zdCBjaGVhcGVzdEFueXRpbWUgPSBhbGxEYWlseUNhcHMubWFwKChjYXApID0+IHtcblxuXHRcdGNvbnN0IHRvdGFsID0gZGF5Lm1hcChqb3VybmV5ID0+IHtcblxuXHRcdFx0bGV0IGNvbkRhaWx5ID0gbWF4TnVtKGNhcCk7XG5cdFx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0XHQvLyBkdWFsIHRvIGR1YWwgc3RhdGlvbnM6IGlmIG1pbiB3ZWVrbHkgdHJhdmVsY2FyZCB6b25lID08IG1heCBkdWFsIHpvbmUgem9uZVxuXHRcdFx0XHQvLyA9ID4gdGhlbiBjaGFuZ2VzIGR1YWwgdG8gZHVhbCAgc3RhdGlvbnMgdG8gbWluIHdlZWtseSB0cmF2ZWxjYXJkIHpvbmVcblx0XHRcdFx0Ly8gVEhJUyBJUyBEVVBMSUNBVEVEIHgzIC0tIHJlZmFjdG9yXG5cdFx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHRcdCgoKG1heE51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgY29uTWluID0gbWluTnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25NYXggPSBtYXhOdW0oY2FwKTtcblx0XHRcdFx0bGV0IGNvbkRhaWx5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBjb25NaW4sXG5cdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0IFx0XHRtYXhEYWlseTogY29uRGFpbHksXG5cdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHQgXHRcdHR5cGU6IGpvdXJuZXkudHlwZSxcblx0XHQgXHR9LCBzaW5nbGVGYXJlcyk7XG5cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB0b3RhbCArIGdldEZhcmUoY2FwLCAnYW55dGltZScsIGRhaWx5Q2Fwcyk7XG5cdH0pO1xuXG5cdC8vIGZvciBjaGVhcGVzdCBtaXggcGVhayBqb3VybmV5cyArIGVhY2ggZGFpbHkgb2ZmIHBlYWsgY2FwXG5cdC8vIG5lZWQgYSBmbGFnIGZvciBvZmYgcGVhayBjYXAgYmV0d2VlbiAxLTQsIDEtNSBvciAxLTZcblx0Y29uc3QgY2hlYXBlc3RPZmZQZWFrID0gYWxsRGFpbHlDYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0Y29uc3Qgb2ZmUGVha01heFpvbmUgPSBtYXhOdW0oY2FwKTtcblx0XHRcblx0XHRjb25zdCBvZmZQZWFrRGF5VG90YWwgPSBkYXkubWFwKGpvdXJuZXkgPT4ge1xuXHRcdFx0bGV0IGNvbkRhaWx5ID0gbWF4TnVtKGNhcCk7XG5cblx0XHRcdGlmIChtYXhUcmF2ZWxjYXJkKSB7XG5cdFx0XHRcdGlmIChqb3VybmV5LmR1YWxab25lT3ZlcmxhcCA9PT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHRcdCgoKG1heE51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA8PSBtYXhUcmF2ZWxjYXJkKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgY29uTWluID0gbWluTnVtKGNhcCk7XG5cdFx0XHRcdGxldCBjb25NYXggPSBtYXhOdW0oY2FwKTtcblx0XHRcdFx0bGV0IGNvbkRhaWx5ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihqb3VybmV5LnR5cGUgPT09ICdvZmZQZWFrJykge1xuXHRcdFx0XHRyZXR1cm4gZXh0ZW5zaW9uRmFyZXMoe1xuXHRcdFx0IFx0XHRtaW5UcmF2ZWxjYXJkOiBjb25NaW4sXG5cdFx0XHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdCBcdFx0bWF4RGFpbHk6IGNvbkRhaWx5LFxuXHRcdFx0IFx0XHR6b25lczogam91cm5leS56b25lcyxcblx0XHRcdCBcdFx0dHlwZTogJ29mZlBlYWsnLFxuXHRcdFx0IFx0fSwgc2luZ2xlRmFyZXMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGV4dGVuc2lvbkZhcmVzKHtcblx0XHRcdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHRcdFx0IFx0XHRtYXhUcmF2ZWxjYXJkOiBjb25NYXgsXG5cdFx0XHQgXHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0IFx0XHR0eXBlOiAnYW55dGltZScsXG5cdFx0XHRcdH0sIHNpbmdsZUZhcmVzKTtcblx0XHRcdH1cblx0XHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvZmZQZWFrTWF4Wm9uZSxcblx0XHRcdHZhbHVlOiBvZmZQZWFrRGF5VG90YWwgKyBnZXRGYXJlKGNhcCwgJ29mZlBlYWsnLCBkYWlseUNhcHMpLFxuXHRcdH07XG5cdH0pO1xuXG5cdFx0Ly8gZm9yIG5vIGRhaWx5IGNhcHNcblx0Y29uc3QgY2hlYXBlc3ROb0NhcCA9IGRheS5tYXAoam91cm5leSA9PiB7XG5cblx0XHRpZiAobWF4VHJhdmVsY2FyZCkge1xuXHRcdFx0aWYgKGpvdXJuZXkuZHVhbFpvbmVPdmVybGFwID09PSB0cnVlICYmXG5cdFx0XHRcdCgoKG1pbk51bShqb3VybmV5LnpvbmVzKSkgKyAxKSA+PSBtaW5UcmF2ZWxjYXJkKSAmJlxuXHRcdFx0XHQoKChtYXhOdW0oam91cm5leS56b25lcykpICsgMSkgPD0gbWF4VHJhdmVsY2FyZClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29uTWluID0gZmFsc2U7XG5cdFx0XHRsZXQgY29uTWF4ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbnNpb25GYXJlcyh7XG5cdCBcdFx0bWluVHJhdmVsY2FyZDogY29uTWluLFxuXHQgXHRcdG1heFRyYXZlbGNhcmQ6IGNvbk1heCxcblx0XHRcdHpvbmVzOiBqb3VybmV5LnpvbmVzLFxuXHRcdFx0dHlwZTogam91cm5leS50eXBlLFxuXHRcdH0sIHNpbmdsZUZhcmVzKTtcblxuXHR9KS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcblxuXHQvLyBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIChvdXQgb2YgdGhlIG9iamVjdClcblx0Y29uc3QgbFRvVmFsdWVzID0gY2hlYXBlc3RPZmZQZWFrLm1hcCgobFZhbCkgPT4gbFZhbC52YWx1ZSk7XG5cblx0Ly8gY2hlYXBlc3QgdmFsdWVcblx0Y29uc3QgbWluQWxsID0gbWluTnVtKGNoZWFwZXN0QW55dGltZS5jb25jYXQoW2NoZWFwZXN0Tm9DYXBdLCBsVG9WYWx1ZXMpKTtcblxuXHQvLyBldmFsdWF0ZXMgaWYgYW55IG9mIHRoZSBjaGVhcGVzdE9mZlBlYWsgdmFsdWVzIGlzIGVxdWFsIHRvIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHRjb25zdCBpc0VxID0gY2hlYXBlc3RPZmZQZWFrLnNvbWUoZW50cnkgPT4ge1xuXHRcdHJldHVybiBlbnRyeS52YWx1ZSA9PSBtaW5BbGw7XG5cdH0pO1xuXG5cdC8vIGlmIGFib3ZlIGlzIG1ldCwgdGhlbiBmaW5kIHRoZSBtYXggY2FwIHdpdGhpbiB0aGUgb2JqZWN0IHRoYXQgbWF0Y2hlcyB3aXRoIHRoZSBjaGVhcGVzdCB2YWx1ZVxuXHR2YXIgY2FwVmFsO1xuXHRpZiAoaXNFcSkge1xuXHRcdGNhcFZhbCA9IGNoZWFwZXN0T2ZmUGVhay5maWx0ZXIoKGxWYWwpID0+IGxWYWwudmFsdWUgPT09IG1pbkFsbCk7XG5cdH1cblx0Ly8gcmV0dXJucyBhbiBvYmplY3Q6IHRoZSBjaGVhcGVzdCB2YWx1ZSwgd2hldGhlciBvZmYgcGVhayBjYXAgaXMgbWV0IChpZiBzbyB3aWxsIGJlIHRoZSBtYXggb2ZmIHBlYWsgem9uZSlcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogcm91bmQobWluQWxsLCAyKSxcblx0XHRjYXBJc01ldDogaXNFcSA/IGNhcFZhbFswXS5vZmZQZWFrTWF4Wm9uZSA6IGZhbHNlLFxuXHR9O1xuXG5cdC8vZmluYWxseSBzZWxlY3RzIGNoZWFwZXN0IGNoZWFwZXN0IGRhaWx5IGNhcCBvcHRpb24gZm9yIGVhY2ggZGF5IChpbiBhIDcgZGF5IGFycmF5KVxufVx0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19jb250YWN0bGVzc0RheVRvdGFsLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb250YWN0bGVzcyB0b3RhbCBmYXJlIGZvciB0aGUgd2Vla1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdCBkYXlzfSBjb21wbGV4IG9iamVjdCBjb250YWluaW5nIGFycmF5IG9mIGRheXMsIGFuZCB3aXRoaW4gZWFjaCBkYXkgYW4gb2JqZWN0IGZvciBlYWNoIGpvdXJuZXlcbiAqIEBwYXJhbSB7ZGF0YSBvYmplY3Qgb2YgZGFpbHlDYXBzIChKU09OIGZpbGUpLCBzaW5nbGVGYXJlcyAoSlNPTiBmaWxlIGxpbmspXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIHJvdW5kZWQgdG8gMiBkcFxuICogQGRlc2NyaXB0aW9uIGNhbGN1bGF0ZXMgd2hldGhlciBpdCBpcyBjaGVhcGVzdCB0byBoYXZlIGEgd2Vla2x5IHRyYXZlbGNhcmQgb3Igbm9uZVxuICovXG5cbiBpbXBvcnQge1xuICBrZXlzVG9Kb3VybmV5LFxuICBtYXhOdW0sXG4gIG1pbk51bSxcbiAgZ2V0RmFyZSxcbiAgcm91bmQsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBjb25EYXlUb3RhbCBmcm9tICcuL19jb250YWN0bGVzc0RheVRvdGFsJztcbmltcG9ydCB3ZWVrVG90YWwgZnJvbSAnLi9fd2Vla1RvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFjdGxlc3MoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuICAvLyBtYXBzIG92ZXIgYWxsIHRoZSBwb3NzaWJsZSB3ZWVrbHkgY2FwcyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2Ygd2Vla2x5IGNhcCArIGNoZWFwZXN0IGRhaWx5IGNhcCAob3Igbm8gZGFpbHkgY2FwKVxuIFx0Y29uc3QgZmluYWwgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuICAgICAgY29uc3Qgd2Vla1RvdGwgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcbiAgICAgICAgICBtYXhUcmF2ZWxjYXJkOiBtYXhOdW0od2Vla0NhcCksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEsXG4gICAgICB9KTtcbiAgICAgIC8vYWRkcyB0aGUgd2Vla2x5IGNhcCB0byB0aGUgd2VlayB0b3RhbFxuICAgICAgcmV0dXJuIHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKTtcbiAgICB9KTtcblxuICAvLyBnZXRzIHRoZSBmYXJlIGZvciB0aGUgY2hlYXBlc3QgZGFpbHkgY2FwIChvciBubyBkYWlseSBjYXApIHdpdGggbm8gd2Vla2x5IHRyYXZlbGNhcnNcbiAgY29uc3Qgbm9XZWVrbHkgPSB3ZWVrVG90YWwoY29uRGF5VG90YWwsIGRheXMsIHtcblx0ICBcdGZhbHNlLFxuXHQgIFx0ZGF0YSxcblx0ICB9KTtcblxuICAvLyByZXR1cm5zIHRoZSBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIGNvbnRhY3RsZXNzIChyb3VuZGVkIHRvIDIgZHApXG4gIHJldHVybiByb3VuZChcbiAgXHRcdChtaW5OdW0oZmluYWwuY29uY2F0KFtub1dlZWtseV0pKSksIDIpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fY29udGFjdGxlc3MuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZmluYWxNaW5ab25lLCBmaW5hbE1heFpvbmVdO1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3lzdGVyIHRvdGFsIGZhcmUgZm9yIHRoZSB3ZWVrXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0IGRheXN9IGNvbXBsZXggb2JqZWN0IGNvbnRhaW5pbmcgYXJyYXkgb2YgZGF5cywgYW5kIHdpdGhpbiBlYWNoIGRheSBhbiBvYmplY3QgZm9yIGVhY2ggam91cm5leVxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGNoZWFwZXN0IHdlZWtseSBjaGFyZ2Ugcm91bmRlZCB0byAyIGRwXG4gKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlcyB3aGV0aGVyIGl0IGlzIGNoZWFwZXN0IHRvIGhhdmUgYSB3ZWVrbHkgdHJhdmVsY2FyZCBvciBub25lXG4gKi9cblxuIGltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG4gIHJvdW5kLFxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgb3lzdGVyRGF5VG90YWwgZnJvbSAnLi9fb3lzdGVyRGF5VG90YWwnO1xuaW1wb3J0IHdlZWtUb3RhbCBmcm9tICcuL193ZWVrVG90YWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXIoZGF5cywgZGF0YSkge1xuXHRjb25zdCB3ZWVrbHlDYXBzID0ga2V5c1RvSm91cm5leShkYXRhLndlZWtseUNhcHMpO1xuXG5cdC8vIGlmIG5vIHdlZWtseSBjYXBcblx0Y29uc3Qgbm9DYXBSZXN1bHQgPSB7XG5cdFx0J25vQ2FwJzogd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRmYWxzZSxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fTtcblx0Ly8gZm9yIGVhY2ggd2Vla3kgY2FwXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSB3ZWVrbHlDYXBzLm1hcCgod2Vla0NhcCkgPT4ge1xuXHRcdGNvbnN0IHdlZWtUb3RsID0gd2Vla1RvdGFsKG95c3RlckRheVRvdGFsLCBkYXlzLCB7XG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdG1pblRyYXZlbGNhcmQ6IG1pbk51bSh3ZWVrQ2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKHdlZWtDYXApLFxuXHRcdFx0fSxcblx0XHRcdGRhdGEsXG5cdFx0fSk7XG5cdFx0Ly9yZXR1cm5zIG9iamVjdDogdGhlIHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIHdlZWsgdG90YWwgKHdpdGggd2Vla2x5IGNhcCBhZGRlZClcblx0XHRyZXR1cm4ge1xuXHRcdFx0W2pvdXJuZXlUb0tleSh3ZWVrQ2FwKV06IHdlZWtUb3RsICsgZ2V0RmFyZSh3ZWVrQ2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHQvLyByZXR1cm5zIG9iamVjdDogdGhlIGNoZWFwZXN0IHdlZWtseSBjYXAgYXNzb2NpYXRlZCBhbmQgdGhlIGNoZWFwZXN0IHdlZWtseSB0b3RhbCAocm91bmRlZCB0byAyIGRwKVxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdFtjaGVhcGVzdF06IHJvdW5kKChhbGxDYXBzW2NoZWFwZXN0XSksIDIpXG5cdH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcywgdHlwZSkge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHR5cGUsIHNpbmdsZUZhcmVzKSArIGdldEZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0ZmxhdHRlbixcbiAgZ2V0RmFyZSxcblx0bWV0LFxuICBrZXlzVG9Kb3VybmV5LFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcbmltcG9ydCBjb250YWN0bGVzcyBmcm9tICcuL3BhcnRpYWxzL19jb250YWN0bGVzcyc7XG5pbXBvcnQgd2Vla1RvdGFsIGZyb20gJy4vcGFydGlhbHMvX3dlZWtUb3RhbCc7XG5cbmltcG9ydCBveXN0ZXJEYXlUb3RhbCBmcm9tICcuL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbCc7XG5pbXBvcnQgY29uRGF5VG90YWwgZnJvbSAnLi9wYXJ0aWFscy9fY29udGFjdGxlc3NEYXlUb3RhbCc7XG5cbi8vIFRPIERPXG5cbi8vTU9OVEhMWSAtIGlzIGNhbGVuZGFyIG1vbnRoIC0gc28gZG8gKHggKiAxMiApLzUyP1xuXG4vLyBkYWlseSBvZmZwZWFrL2FueXRpbWUgY2FwcGluZyBjaGFuZ2VzOlxuLy8gdGltZSBvZiB0cmF2ZWwgdG8gYmUgYXBwbGllZCBhcyBhbiBhcnVnbWVudDogZWFybHksIG1vcm5pbmcsIGFmdGVybm9vbiwgbGF0ZVxuLy9UcmF2ZWwgd2Vla2RheSBlYXJseSAgZG9lc250IGNvdW50IHRvd2FyZHMgb2ZmIHBlYWsgY2FwLCBvbmx5IGFueXRpbWUgYnV0IGlzIG9mZiBwZWFrIHNpbmdsZSBmYXJlc1xuLy8gdHJhdmVsIHdlZWtkYXkgKHBlYWsgdGltZSkgYWZ0ZXJub29uIGNvdW50cyB0b3dhcmRzIGFuZCBpcyBjb3ZlcmVkIGJ5IHRoZSBvZmYgcGVhay9hbnl0aW1lIGNhcCwgYnV0IGlzIHBlYWsgc2luZ2xlIGZhcmVzXG4vLyBtb3JuaW5nIGlzIHBlYWsgJiBhbnl0aW1lIGRhaWx5IGNhcCAvIGxhdGUgaXMgb2ZmIHBlYWsgJiBvZmYgcGVhay9hbnl0aW1lIGRhaWx5IGNhcFxuXG4vLyBBZGQgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlclxuLy8gQ0FOIERPIEFQUFJFTlRJQ0UsIDE4KyBTVFVERU5ULCAxNisgWklQLCBKT0IgQ0VOVFJFIE9OIE9ZU1RFUiAtIGFzIG5vIGRpZmYgYncgb2ZmIHBlYWsgLyBvbiBwZWFrIGRhaWx5IGNhcHNcblxuLy8gQVBJIEhBTkRMSU5HXG4vLyBnZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbiAoc3RhdGlvbnMpIHtcbi8vIFx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuLy8gXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGRhdGEuc2luZ2xlRmFyZXM7XG4gIGxldCBkYWlseUNhcHMgPSBkYXRhLmRhaWx5Q2FwcztcblxuIGNvbnN0IGRheXMgPSBbXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDZdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICAgICAge1xuICAgICAgem9uZXM6IFsyLCA2XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IHRydWUsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICBdLFxuICAgIFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiB0cnVlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDRdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCA0XSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgNF0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgXSxcbiBcbl07XG5cbiAgLy8gY29uc29sZS5sb2coXG4gIC8vICAgXCJjb250YWN0bGVzcyA9IFwiICsgY29udGFjdGxlc3MoZGF5cywgZGF0YSlcbiAgLy8gKTtcblxuICAvLyAvLyBmaW5hbCBjaGVhcGVzdCB3ZWVrbHkgY2hhcmdlIG9uIG95c3RlclxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBveXN0ZXIoZGF5cywgZGF0YSlcbiAgLy8gKTtcblxuXG4gIGNvbnNvbGUubG9nKFxuICAgIHdlZWtUb3RhbChjb25EYXlUb3RhbCwgZGF5cywge1xuICAgICAgZmFsc2UsXG4gICAgICBkYXRhLFxuICAgIH0pXG4gICk7XG5cbi8vIGNvbnN0IGpvdXJuZXkgPSBbXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsyLCA0XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogdHJ1ZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsyLCAyXSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMiwgMl0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzIsIDRdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgem9uZXM6IFsyLCA0XSxcbi8vICAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4vLyAgICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIHpvbmVzOiBbMiwgNF0sXG4vLyAgICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuLy8gICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB6b25lczogWzIsIDRdLFxuLy8gICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbi8vICAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuLy8gICAgIH0sXG4vLyAvL2Fsc28gdGVzdHMgZm9yIGFsbCBvZmZwZWFrLCBhbGwgYW55dGltZSwgbW9zdCBhbnl0aW1lIDEgb2ZmcGVhayAmIHZpY2UgdmVyc2EsIDItNCB6b25lIGZpcnN0IGFuZCBsYXN0XG4vLyAgIF07XG5cbi8vICAgICBjb25zb2xlLmxvZyhcbi8vICAgICBjb25EYXlUb3RhbChcbi8vICAgICAgIGpvdXJuZXksXG4vLyAgICAgICB7XG5cbi8vICAgICAgIH0sIHtcbi8vICAgICAgICAgICBkYWlseUNhcHMsIC8vSlNPTlxuLy8gICAgICAgICAgIHNpbmdsZUZhcmVzXG4vLyAgICAgICAgIH0pXG4vLyAgICk7XG5cbi8vICAgICAgIGNvbnNvbGUubG9nKFxuLy8gb3lzdGVyRGF5VG90YWwoXG4vLyAgICAgICAgICAgam91cm5leSxcbi8vICAgICAgICAge1xuXG4vLyAgICAgICAgfSwge1xuICAgICAgICAgXG4vLyAgICAgICAgICAgZGFpbHlDYXBzLCAvL0pTT05cbi8vICAgICAgICAgICBzaW5nbGVGYXJlc1xuLy8gICAgICAgICB9KVxuLy8gICApO1xuXG5cblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=