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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["i"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["c"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["b"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["g"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["d"] = journeyToKey;
/* unused harmony export zoneToJourney */
/* unused harmony export keyToJourney */
/* harmony export (immutable) */ __webpack_exports__["a"] = keysToJourney;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getFare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return met; });
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
  debugger;
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
  // debugger;
  return journeyToKey([1, zone]);
}

function keyToJourney(key) {
  return key.split('-').sort().map(function (num) {
    return parseInt(num);
  });
}

function keysToJourney(weeklyCaps) {
  return Object.keys(weeklyCaps).map(function (cap) {
    return keyToJourney(cap);
  });
}

/**
 * Gets the daily cap cost
 * @function
 * @param {number} - the (maximum) zone
 * @param {object} dailyCaps - looks at the dailyCaps object in the fares.json file
 * @returns {number} - gets the daily cap between zones 1 and the zone parameter (as daily caps always starts at zone 1)
 * @description
 */
// export function getDailyCap(maxZonesofar, dailyCaps, type) {
//   return dailyCaps[journeyToKey([1, maxZonesofar])][type];
// }

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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(5);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(2);
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(legs.map(function (leg) {
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["b" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["i" /* filterZonesByNumber */])(1, allZones));

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
/* 4 */
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





function oysterDayTotal(journeys) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;
  var dailyCaps = data.dailyCaps,
      singleFares = data.singleFares;


  return journeys.reduce(function (a, b) {
    var currentTotal = void 0;
    var singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(b.zones, b.type, singleFares);
    var offPeakTotal = a.offPeakTotal;
    var peakTotal = a.peakTotal;
    var maxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])([].concat(a.maxZone, b.zones));

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__extensionFares__["a" /* default */])({ zones: b.zones, type: b.type, minTravelcard: minTravelcard, maxTravelcard: maxTravelcard }, singleFares);

      if (minTravelcard > 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxTravelcard, maxZone) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* met */])(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      offPeakTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([offPeakTotal + singleFare, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'offPeak', dailyCaps)]);
      currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, offPeakTotal + peakTotal]);
    } else {
      peakTotal += singleFare;
    }

    currentTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])([currentTotal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(maxZone, 'anytime', dailyCaps)]);

    return {
      currentTotal: currentTotal,
      offPeakTotal: offPeakTotal,
      peakTotal: peakTotal,
      maxZone: maxZone
    };
  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null
  }).currentTotal;
}

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_oyster__ = __webpack_require__(8);







// TO DO
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

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
  }]];

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_oyster__["a" /* default */])(days, fareData));
});

//---------------------------------
// - CONTACTLESS Cheapest Fare = with daily caps
//The array of all combination prices to be reduce to cheapest one

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

//For just daily caps OR weekly cap without daily cap: use extension fares without max daily
//For combo of daily cap and weekly cap: use extension fares with max daily cap
//
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = oysterWeekTotal;


function oysterWeekTotal(days, info) {
  return days.map(function (day) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__oysterDayTotal__["a" /* default */])(day, info.options, info.data);
  }).reduce(function (a, b) {
    return a + b;
  });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["a"] = oyster;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// NEED TO:
// Add off peak discount if reached anytime cap twice each week btween 1-4 or 1-6
// DUAL TO DUAL STATION ZONING ALTERATIONS



function oyster(days, data) {
	var caps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* keysToJourney */])(data.weeklyCaps);

	var noCapResult = {
		'noCap': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__["a" /* default */])(days, {
			false: false,
			data: data
		})
	};

	var capsResultPre = caps.map(function (cap) {
		var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__oysterWeekTotal__["a" /* default */])(days, {
			options: {
				minTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* minNum */])(cap),
				maxTravelcard: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* maxNum */])(cap)
			},
			data: data
		});

		return _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* journeyToKey */])(cap), total + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* getFare */])(cap, false, data.weeklyCaps));
	});

	var allCaps = Object.assign.apply(Object, [{}, noCapResult].concat(_toConsumableArray(capsResultPre)));
	var cheapest = Object.keys(allCaps).reduce(function (a, b) {
		return allCaps[a] < allCaps[b] ? a : b;
	});

	return _defineProperty({}, cheapest, allCaps[cheapest]);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWVlMDAxNDNjYmNmYzI1ODA3M2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX295c3RlckRheVRvdGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJXZWVrVG90YWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXIuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiem9uZVRvSm91cm5leSIsImtleVRvSm91cm5leSIsImtleSIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJrZXlzVG9Kb3VybmV5Iiwid2Vla2x5Q2FwcyIsIk9iamVjdCIsImtleXMiLCJjYXAiLCJnZXRGYXJlIiwidHlwZSIsImNhcHMiLCJmYXJlIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1ldCIsInZhbHVlIiwidGFyZ2V0IiwiZXh0ZW5zaW9uRmFyZXMiLCJvcHRpb25zIiwic2luZ2xlRmFyZXMiLCJtYXhEYWlseSIsIm1pblRyYXZlbGNhcmQiLCJtYXhUcmF2ZWxjYXJkIiwiZmluYWxDb25kaXRpb24iLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJtaW5DaGFyZ2VkWm9uZSIsInNwbGl0T3JGdWxsRmFyZSIsImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJnZXREYXRhIiwiam91cm5leXMiLCJsZWdzIiwiYWxsWm9uZXMiLCJsZWciLCJ0ZW1wWm9uZXMiLCJkZXBhcnR1cmVQb2ludCIsIm5hcHRhbklkIiwicHVzaCIsInBhdGgiLCJzdG9wUG9pbnRzIiwiZm9yRWFjaCIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6Iiwib3lzdGVyRGF5VG90YWwiLCJkYWlseUNhcHMiLCJjdXJyZW50VG90YWwiLCJzaW5nbGVGYXJlIiwib2ZmUGVha1RvdGFsIiwicGVha1RvdGFsIiwibWF4Wm9uZSIsImZhcmVEYXRhIiwiZGF5cyIsImR1YWxab25lT3ZlcmxhcCIsIm95c3RlciIsIm95c3RlcldlZWtUb3RhbCIsImluZm8iLCJkYXkiLCJub0NhcFJlc3VsdCIsImZhbHNlIiwiY2Fwc1Jlc3VsdFByZSIsInRvdGFsIiwiYWxsQ2FwcyIsImFz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QUFsQiw0QkFBa0NFLGFBQWxDLEdBQWhCO0FBQ0EsS0FBTUksV0FBV2xGLE9BQU9DLElBQVAsQ0FBWStFLE9BQVosRUFBcUIxRyxNQUFyQixDQUE0QixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxTQUFVd0csUUFBUXpHLENBQVIsSUFBYXlHLFFBQVF4RyxDQUFSLENBQWIsR0FBMEJELENBQTFCLEdBQThCQyxDQUF4QztBQUFBLEVBQTVCLENBQWpCOztBQUVBLDRCQUNFMEcsUUFERixFQUNhRixRQUFRRSxRQUFSLENBRGI7QUFHQSxDIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZWUwMDE0M2NiY2ZjMjU4MDczYSIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbiAgZGVidWdnZXI7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogUHJlbG9hZHMgc3RhcnQgem9uZSBhcyAxIGFuZCBjaGFuZ2VzIHRvIDEteCBmb3IgSlNPTiBmaWxlIHJlYWRpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gem9uZSB4XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICcxLXgnXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6b25lVG9Kb3VybmV5KHpvbmUpIHtcbiAgLy8gZGVidWdnZXI7XG4gIHJldHVybiBqb3VybmV5VG9LZXkoWzEsIHpvbmVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtleVRvSm91cm5leShrZXkpIHtcbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLnNvcnQoKS5tYXAobnVtID0+IHBhcnNlSW50KG51bSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2V5c1RvSm91cm5leSh3ZWVrbHlDYXBzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3ZWVrbHlDYXBzKS5tYXAoKGNhcCkgPT4ga2V5VG9Kb3VybmV5KGNhcCkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2FwcywgdHlwZSkge1xuLy8gICByZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldW3R5cGVdO1xuLy8gfVxuXG5leHBvcnQgY29uc3QgZ2V0RmFyZSA9IChrZXksIHR5cGUsIGNhcHMpID0+IHtcbiAgY29uc3QgZmFyZSA9IGNhcHNba2V5LmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGpvdXJuZXlUb0tleShrZXkpIDogem9uZVRvSm91cm5leShrZXkpXTtcbiAgcmV0dXJuIHR5cGUgPyBmYXJlW3R5cGVdIDogZmFyZTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG51bWVyaWMgdGFyZ2V0IGhhcyBiZWVuIG1ldCBvciBzdXJwYXNzZWRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIHRhcmdldCB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3QgdGhlIHRhcmdldFxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZXQgPSAodmFsdWUsIHRhcmdldCkgPT4gdmFsdWUgPj0gdGFyZ2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdEZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcbi8vIFx0Rk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcCkgLS0gdW5sZXNzIHlvdSBhZGQgaW4gTWF4RGFpbHlcbi8vICAvLyB0aGlzIGlzIG92ZXJseSBjb21wbGljYXRlZCBmb3IgZGFpbHkgY2FwcyAoYXMgb25seSBkZWFscyB3aXRoIHpvbmUgMSB0byB4KSBidXQgc3RpbGwgd29ya3MuIFJFTElFUyBPTiBUSEUgRkFDVCBEQUlMWSBBTFdBWVMgU1RBUlRTIEFUIDFcbi8vICAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuLy8gYnkgZGVmYXVsdDoganVzdCBvbmUgdHJhdmVsY2FyZCAod2Vla2x5IHdpdGhvdXQgZGFpbHkgb3IganVzdCBkYWlseSBjYXApIGZvciBlaXRoZXIgb3lzdGVyIG9yIGNvbnRhY3RsZXNzLCBvciBveXN0ZXIgd2l0aCB3ZWVrbHkgY2FwIChkb2Vzbid0IGN1dCBvZmYgZGFpbHkgc2VjdGlvbiBvZiB0aGUgam91cm5leSlcblxuXHRsZXQge1xuXHRcdHpvbmVzLFxuXHRcdHR5cGUsXG4gICAgXHRtaW5UcmF2ZWxjYXJkLCAvLyBtaW5pbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHRtYXhUcmF2ZWxjYXJkLCAvL21heGltdW0gem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjdXJyZW50bHkgdGVzdGluZ1xuXHRcdC8vIGlmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly8gc2FtZSBhcyB2YXIgbWluU2luZ2xlID0gb3B0aW9ucy5taW5TaW5nbGU7XG5cbiAgbGV0IGZpbmFsQ29uZGl0aW9uID0gbnVsbDtcbiAgbGV0IG1pblNpbmdsZSA9IHpvbmVzWzBdO1xuICBsZXQgbWF4U2luZ2xlID0gem9uZXNbMV07XG4gIGxldCBtaW5DaGFyZ2VkWm9uZSA9IG1pblNpbmdsZTtcblxuXHRpZiAobWF4RGFpbHkpIHsgLy8gSWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8gKGhlbmNlIGFkZGluZyBpbiBtYXhEYWlseSBhcyBhcmd1bWVudF9cblx0IFx0aWYgKG1heERhaWx5ID49IChtaW5UcmF2ZWxjYXJkIC0gMSkpIHsgLy8gaWYgbm8gZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZFxuXHQgIFx0bWluVHJhdmVsY2FyZCA9IDE7IC8vIHNpbmNlIGFueXRpbWUgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxXG5cdCAgIFx0bWF4VHJhdmVsY2FyZCA9IG1heE51bShbbWF4RGFpbHksIG1heFRyYXZlbGNhcmRdKTsgLy8gbWF4IHRyYXZlbGNhcmQgaXMgd2hpY2hldmVyIGlzIGxhcmdlc3QgbWF4IGRhaWx5IG9yIG1heCB0cmF2ZWxjYXJkXG4vLyBlbHNlIGlmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvLCBhbmQgdGhlcmUgYXJlIGdhcCB6b25lcyBiZXR3ZWVuIG1heCBkYWlseSBhbmQgbWluIHRyYXZlbGNhcmQsIGhhdmUgYSBtaW4gY2hhcmdlZCB6b25lIChub3QgY2hhcmdlIHRoZSBkYWlseSBjYXAgLSB0aGUgZnJvbnQpXG5cdFx0fSBlbHNlIHsgLy8gSUYgZGlmZmVyZW5jZSBidyBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVNcblx0XHRcdFx0bWluQ2hhcmdlZFpvbmUgPSAoKG1pblNpbmdsZSA8PSBtYXhEYWlseSkgPyBtYXhEYWlseSArIDEgOiBtaW5TaW5nbGUpO1xuXHRcdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHR9XG5cdH1cblxuXHQvLyBpZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHQgLy8gZGVidWdnZXI7XG5cdFx0cmV0dXJuIGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpO1xuXG5cdC8vaWYgbWluIHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpc250IC0gY2hhcmdlIGVuZFxuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHQgLy8gZGVidWdnZXI7XG4gXHRcdHJldHVybiBnZXRGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcywgdHlwZSk7XG5cblx0Ly8gYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpIHx8IGZpbmFsQ29uZGl0aW9uKSB7XG4gXHRcdCAvLyBkZWJ1Z2dlcjtcbiBcdFx0cmV0dXJuIDA7XG4gXHQvLyBib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9XG5cblxuICByZXR1cm4gZ2V0RmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHR5cGUsIHNpbmdsZUZhcmVzKTtcbi8vIEVMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2ZpbmFsTWluWm9uZSwgZmluYWxNYXhab25lXTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG95c3RlciB0b3RhbCBmYXJlIGZvciB0aGUgZGF5XG4gKiBAZnVuY3Rpb25cbiAgKiBAcGFyYW0ge2NvbXBsZXggam91cm5leXMgb2JqZWN0fSBqb3VybmV5cyAtIGhhcyB6b25lcyBhcnJheSwgZHVhbHpvbmVzIGFuZCB0eXBlIChvZmZwZWFrIG9yIGFueXRpbWUpXG4gKiBAcGFyYW0ge29wdGlvbnMgb2JqZWN0IG9mIG1pblRyYXZlbGNhcmQ6IG51bSwgbWF4VHJhdmVsY2FyZDogbnVtfSBjb25zdCBvYmplY3QgLSBtaW5UcmF2ZWxjYXJkIGFuZCBtYXhUcmF2ZWxjYXJkIFxuICogQHBhcmFtIHtkYXRhIG9iamVjdCBvZiBkYWlseUNhcHMgKEpTT04gZmlsZSksIHNpbmdsZUZhcmVzIChKU09OIGZpbGUgbGluaylcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgdG90YWwgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcbiAgbWluTnVtLFxuICBtYXhOdW0sXG4gIGdldEZhcmUsXG4gIG1ldCxcbiAgem9uZVRvSm91cm5leVxufSBmcm9tICcuLy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9fZXh0ZW5zaW9uRmFyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBveXN0ZXJEYXlUb3RhbChqb3VybmV5cywgb3B0aW9ucyA9IHt9LCBkYXRhID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgbWluVHJhdmVsY2FyZCwgLy9pZiBuZWVkZWQgZm9yIHdlZWtseVxuICAgIG1heFRyYXZlbGNhcmQsIC8vaWYgbmVlZGVkIGZvciB3ZWVrbHlcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qge1xuICAgIGRhaWx5Q2FwcywgLy9KU09OXG4gICAgc2luZ2xlRmFyZXMsIC8vSlNPTlxuICB9ID0gZGF0YTtcbiAgICBcbiAgcmV0dXJuIGpvdXJuZXlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIGxldCBjdXJyZW50VG90YWw7XG4gICAgbGV0IHNpbmdsZUZhcmUgPSBnZXRGYXJlKGIuem9uZXMsIGIudHlwZSwgc2luZ2xlRmFyZXMpO1xuICAgIGxldCBvZmZQZWFrVG90YWwgPSBhLm9mZlBlYWtUb3RhbDtcbiAgICBsZXQgcGVha1RvdGFsID0gYS5wZWFrVG90YWw7XG4gICAgbGV0IG1heFpvbmUgPSBtYXhOdW0oW10uY29uY2F0KGEubWF4Wm9uZSwgYi56b25lcykpO1xuXG4gICAgLy8gRk9SIFdFRUtMWVxuICAgIGlmIChtYXhUcmF2ZWxjYXJkKSB7XG4gICAgICBzaW5nbGVGYXJlID0gZXh0ZW5zaW9uRmFyZXMoe3pvbmVzOiBiLnpvbmVzLCB0eXBlOiBiLnR5cGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmR9LCBzaW5nbGVGYXJlcyk7XG5cbiAgICAgIGlmIChtaW5UcmF2ZWxjYXJkID4gMSAmJiBtZXQobWF4VHJhdmVsY2FyZCwgbWF4Wm9uZSkgJiYgbWV0KG1heFpvbmUsIG1pblRyYXZlbGNhcmQgLSAxKSkge1xuICAgICAgICBtYXhab25lID0gbWluVHJhdmVsY2FyZCAtIDE7IC8vKGllIG9ubHkgY29tcGFyZXMgYWdhaW5zdCBkYWlseSBjYXAgb2YgbWluU2luZ2xlIHRvIG1heFpvbmUgLSByZW1vdmVzIG92ZXJsYXAgd2l0aCB3ZWVrbHkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudFRvdGFsID0gYS5jdXJyZW50VG90YWwgKyBzaW5nbGVGYXJlO1xuXG4gICAgaWYgKGIudHlwZSA9PT0gJ29mZlBlYWsnKSB7XG4gICAgICBvZmZQZWFrVG90YWwgPSBtaW5OdW0oW29mZlBlYWtUb3RhbCArIHNpbmdsZUZhcmUsIGdldEZhcmUobWF4Wm9uZSwgJ29mZlBlYWsnLCBkYWlseUNhcHMpXSk7XG4gICAgICBjdXJyZW50VG90YWwgPSBtaW5OdW0oW2N1cnJlbnRUb3RhbCwgb2ZmUGVha1RvdGFsICsgcGVha1RvdGFsXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlYWtUb3RhbCArPSBzaW5nbGVGYXJlO1xuICAgIH1cbiAgICAgIFxuICAgIGN1cnJlbnRUb3RhbCA9IG1pbk51bShbY3VycmVudFRvdGFsLCBnZXRGYXJlKG1heFpvbmUsICdhbnl0aW1lJywgZGFpbHlDYXBzKV0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRUb3RhbCxcbiAgICAgIG9mZlBlYWtUb3RhbCxcbiAgICAgIHBlYWtUb3RhbCxcbiAgICAgIG1heFpvbmUsXG4gICAgfTtcblxuICB9LCB7XG4gICAgY3VycmVudFRvdGFsOiAwLFxuICAgIG9mZlBlYWtUb3RhbDogMCxcbiAgICBwZWFrVG90YWw6IDAsXG4gICAgbWF4Wm9uZTogbnVsbCxcbiAgfSkuY3VycmVudFRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19veXN0ZXJEYXlUb3RhbC5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzLCB0eXBlKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldEZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCB0eXBlLCBzaW5nbGVGYXJlcyksXG5cdFx0KGdldEZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgdHlwZSwgc2luZ2xlRmFyZXMpICsgZ2V0RmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgdHlwZSwgc2luZ2xlRmFyZXMpKVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRmbGF0dGVuLFxuICBnZXRGYXJlLFxuXHRtZXQsXG4gIGtleVRvSm91cm5leVxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcbmltcG9ydCBveXN0ZXIgZnJvbSAnLi9wYXJ0aWFscy9fb3lzdGVyJztcblxuLy8gVE8gRE9cbi8vIE9mZnBlYWsgZGFpbHkgY2FwIGRpc2NvdW50cyAtIGtlZXAgdHJhY2sgd2hlbiBkYWlseSBjYXAgcmVhY2hlZCBidXQgb25seSB0cmF2ZWxsZWQgb2ZmIHBlYWsgKGlmIGdvaW5nIHRvIGRvIG9mZiBwZWFrIG95c3RlciBjdW0gdG90YWxzIHRoZW4gd291bGQga25vdyB0aGlzKVxuLy8gQWRkIHRoZSBSYWlsY2FyZCBvciBHb2xkIGNhcmQgZGlzY291bnQgdG8geW91ciBPeXN0ZXJcbi8vIENBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbi8vIGdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uIChzdGF0aW9ucykge1xuLy8gXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG4vLyBcdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cbmdldERhdGEuZmFyZXMoKS50aGVuKGZ1bmN0aW9uKGZhcmVEYXRhKSB7XG4gIGxldCBzaW5nbGVGYXJlcyA9IGZhcmVEYXRhLnNpbmdsZUZhcmVzO1xuICBsZXQgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXG5jb25zdCBkYXlzID0gW1xuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJhbnl0aW1lXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcImFueXRpbWVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwib2ZmUGVha1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICB0eXBlOiBcIm9mZlBlYWtcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgMl0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgdHlwZTogXCJvZmZQZWFrXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzEsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHR5cGU6IFwiYW55dGltZVwiLFxuICAgIH0sXG4gIF0sXG5dO1xuXG4gIGNvbnNvbGUubG9nKFxuICAgIG95c3RlcihkYXlzLCBmYXJlRGF0YSlcbiAgKTtcbn0pO1xuXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gLSBDT05UQUNUTEVTUyBDaGVhcGVzdCBGYXJlID0gd2l0aCBkYWlseSBjYXBzXG5cdC8vVGhlIGFycmF5IG9mIGFsbCBjb21iaW5hdGlvbiBwcmljZXMgdG8gYmUgcmVkdWNlIHRvIGNoZWFwZXN0IG9uZVxuXG4vLyBcdC8vIGZvciB3aXRob3V0IGFueSBkYWlseSBjYXBzLCBvbmx5IHNpbmdsZXMgYWRkZWQgdG9nZXRoZXJcbi8vIFx0bGV0IGNvbkZhcmVzID0gbnVsbDtcbi8vIFx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG4vLyBcdFx0Y29uRmFyZXMgKz0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7XG4vLyBcdH0pO1xuLy8gXHRjb25BbGxGYXJlcy5wdXNoKGNvbkZhcmVzKTtcblxuLy8gXHQvLyBcdFRoZW4gZm9yIGVhY2ggWm9uZSByYW5nZSAoZnJvbSBab25lIDEtMyB1bnRpbCBab25lIDEgdG8gbWF4KSByZXBlYXQgc2FtZSBjYWxjdWxhdGlvbi5cbi8vIFx0IGxldCBjb25NYXhab25lID0gbWF4TnVtKGZsYXR0ZW4oam91cm5leXMubWFwKGogPT4gai56b25lcykpKTtcbi8vIFx0IGZvciAobGV0IGkgPSAyOyBpIDw9IGNvbk1heFpvbmU7IGkrKykge1xuLy8gXHQgXHQvL2NvbnNvbGUubG9nKCdmb3IgZGFpbHkgY2FwIDEgdG8gJyArIGkpO1xuLy8gXHQgXHRsZXQgY29uQ3VtVG90YWwgPSBnZXREYWlseUNhcChpLCBkYWlseUNhcHMpO1xuLy8gXHQgXHQgZm9yIChsZXQgeCA9IDA7IHggPCBqb3VybmV5cy5sZW5ndGg7IHgrKykge1xuLy8gXHQgXHQgXHQvL2FkZGluZyBleHRlbnNpb24gZmFyZXMgdG8gY3VtVG90YWxcbi8vIFx0IFx0XHRjb25DdW1Ub3RhbCArPSBleHRlbnNpb25GYXJlcygxLCBpLCBqb3VybmV5c1t4XVswXSwgam91cm5leXNbeF1bMV0sIHNpbmdsZUZhcmVzKTtcbi8vIFx0IFx0IH07XG4vLyBcdCBcdGNvbkFsbEZhcmVzLnB1c2goY29uQ3VtVG90YWwpO1xuLy8gXHQgfVxuXG4vLyBcdC8vIFx0LS0tPiBDb21wYXJlIGFsbCB0aGUgcG9zc2liaWxpdGllcyBhbmQgc2VsZWN0IHRoZSBjaGVhcGVzdCAoaW5jbHVkaW5nIHRvdGFsIHNpbmdsZSkuXG4vLyBcdHJldHVybiBtaW5OdW0oY29uQWxsRmFyZXMpO1xuLy8gXHQvL3RoaXMgcmV0dXJucyB0aGUgZmluYWwgY29udGFjdGxlc3MgZGFpbHkgZmFyZVxuLy8gfSk7XG5cbi8vRm9yIGp1c3QgZGFpbHkgY2FwcyBPUiB3ZWVrbHkgY2FwIHdpdGhvdXQgZGFpbHkgY2FwOiB1c2UgZXh0ZW5zaW9uIGZhcmVzIHdpdGhvdXQgbWF4IGRhaWx5XG4vL0ZvciBjb21ibyBvZiBkYWlseSBjYXAgYW5kIHdlZWtseSBjYXA6IHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aCBtYXggZGFpbHkgY2FwXG4vL1xuLy8gT0ZGIFBFQUsgREFJTFkgYW5kIFdFRUtMWTogRm9yIG9mZiBwZWFrIGRhaWx5IGNhcCBjb21ib3M6IGlmIG9mZiBwZWFrLCB1c2UgZXh0ZW5zaW9uIGZhcmVzIHRvIGNhbGN1bGF0ZSB1c2luZyBib3RoIGRhaWx5IGFuZCB3ZWVrbHkgY2Fwc1xuLy8gLS0tIHdoaWxzdCBpZiBwZWFrIHRyYXZlbCB0aGVuIHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aCBvbmx5IHdlZWtseSB0cmF2ZWwgY2FyZCBjYXBzIGFuZCBhZGQgdG8gdG90YWxcbi8vIEFOWVRJTUUgREFJTFkgYW5kIFdFRUtMWTogdXNlIHRoZSBleHRlbnNpb24gZmFyZSB0byBjYWxjdWxhdGUgYWxsIGZhcmVzIHdpdGggZGFpbHkgYW55dGltZSBjYXAgYW5kIHdlZWtseSBjYXAgKGN1cnJlbnQgc2V0IHVwKVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IG95c3RlckRheVRvdGFsIGZyb20gJy4vX295c3RlckRheVRvdGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3lzdGVyV2Vla1RvdGFsKGRheXMsIGluZm8pIHtcbiAgcmV0dXJuIGRheXMubWFwKChkYXkpID0+IG95c3RlckRheVRvdGFsKGRheSwgaW5mby5vcHRpb25zLCBpbmZvLmRhdGEpKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX295c3RlcldlZWtUb3RhbC5qcyIsImltcG9ydCB7XG4gIGpvdXJuZXlUb0tleSxcbiAga2V5c1RvSm91cm5leSxcbiAgbWF4TnVtLFxuICBtaW5OdW0sXG4gIGdldEZhcmUsXG59IGZyb20gJy4vLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbi8vIE5FRUQgVE86XG4vLyBBZGQgb2ZmIHBlYWsgZGlzY291bnQgaWYgcmVhY2hlZCBhbnl0aW1lIGNhcCB0d2ljZSBlYWNoIHdlZWsgYnR3ZWVuIDEtNCBvciAxLTZcbi8vIERVQUwgVE8gRFVBTCBTVEFUSU9OIFpPTklORyBBTFRFUkFUSU9OU1xuXG5pbXBvcnQgb3lzdGVyV2Vla1RvdGFsIGZyb20gJy4vX295c3RlcldlZWtUb3RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG95c3RlcihkYXlzLCBkYXRhKSB7XG5cdGNvbnN0IGNhcHMgPSBrZXlzVG9Kb3VybmV5KGRhdGEud2Vla2x5Q2Fwcyk7XG5cblx0Y29uc3Qgbm9DYXBSZXN1bHQgPSB7XG5cdFx0J25vQ2FwJzogb3lzdGVyV2Vla1RvdGFsKGRheXMsIHtcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9O1xuXG5cdGNvbnN0IGNhcHNSZXN1bHRQcmUgPSBjYXBzLm1hcCgoY2FwKSA9PiB7XG5cdFx0Y29uc3QgdG90YWwgPSBveXN0ZXJXZWVrVG90YWwoZGF5cywge1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRtaW5UcmF2ZWxjYXJkOiBtaW5OdW0oY2FwKSxcblx0XHRcdFx0bWF4VHJhdmVsY2FyZDogbWF4TnVtKGNhcCksXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YSxcblx0XHR9KTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRbam91cm5leVRvS2V5KGNhcCldOiB0b3RhbCArIGdldEZhcmUoY2FwLCBmYWxzZSwgZGF0YS53ZWVrbHlDYXBzKSxcblx0XHR9O1xuXHR9KTtcblxuXHRjb25zdCBhbGxDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgbm9DYXBSZXN1bHQsIC4uLmNhcHNSZXN1bHRQcmUpO1xuXHRjb25zdCBjaGVhcGVzdCA9IE9iamVjdC5rZXlzKGFsbENhcHMpLnJlZHVjZSgoYSwgYikgPT4gYWxsQ2Fwc1thXSA8IGFsbENhcHNbYl0gPyBhIDogYik7XG5cblx0cmV0dXJuIHtcblx0XHRbY2hlYXBlc3RdOiBhbGxDYXBzW2NoZWFwZXN0XVxuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fb3lzdGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==