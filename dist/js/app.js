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
/* harmony export (immutable) */ __webpack_exports__["f"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["g"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["a"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["d"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["e"] = flatten;
/* unused harmony export journeyToKey */
/* harmony export (immutable) */ __webpack_exports__["b"] = getDailyCap;
/* harmony export (immutable) */ __webpack_exports__["c"] = getSingleFare;
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares)]);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFares;




/**
 * Calculates the extension fare (or none) of a journey
 * @function
 * @param {number} see below
 * @returns {number} - returns the fare
 * @description
 	//CONTACTLESS only uses adult fares
	//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
	//FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap)
 */

function extensionFares() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var singleFares = arguments[1];

  var maxDaily = options.maxDaily || null;
  var oyster = options.oyster || null;

  var minSingle = options.minSingle,
      maxSingle = options.maxSingle,
      minTravelcard = options.minTravelcard,
      maxTravelcard = options.maxTravelcard;


  var minChargedZone = !oyster || maxDaily && minSingle <= maxDaily ? maxDaily + 1 : minSingle;
  var finalCondition = maxDaily ? minSingle <= maxDaily && maxSingle <= maxDaily : null;

  // minSingle, maxSingle, //the min and max zones travelled in this single journey
  // minTravelcard, maxTravelcard, //min and max zones of the travelcard zones concerned
  // singleFares) { // to get from single fares json)

  //if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
  if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares);

    //if min single within travelcard zones but max single isnt - charge end
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);

    //if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares);

    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard || finalCondition) {
    return 0; //NEED TO ADD both min and max singles within min and max daily

    //both single zones are outside travelcard zones
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares);
  } //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
};

/***/ }),
/* 4 */,
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* flatten */])(legs.map(function (leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["f" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* minNum */])([singleMin].concat(dualZones));
		}

		return [finalMinZone, finalMaxZone];
	});
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(3);






//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
//NB Weekly capping is always anytime

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].stations().then(function (stations) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__["a" /* default */])('1000029', '1000138', stations).then(function (resp) {
    // console.log(resp);
  });
});

// Formulate array? Journey 1 object: with zones travelled (array: min and max), time, off-peak or on-peak, single price, flag for dual to dual (and what zones).

//--------------------------------------------
// Global functions > compareNumbers (can reduce to the maxNum and minNum of an array) & getDifference bw 2 numbers

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].fares().then(function (fareData) {
  var singleFares = fareData.singleFares;

  // EXAMPLE
  var minmaxTravelcard = [3, 4];
  var minmaxJourney = [1, 6];

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])({
    minSingle: minmaxJourney[0],
    maxSingle: minmaxJourney[1],
    maxDaily: 2,
    minTravelcard: minmaxTravelcard[0],
    maxTravelcard: minmaxTravelcard[1]
  }, singleFares));

  console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])({
    minSingle: minmaxJourney[0],
    maxSingle: minmaxJourney[1],
    // maxDaily: 2,
    minTravelcard: minmaxTravelcard[0],
    maxTravelcard: minmaxTravelcard[1]
  }, singleFares));

  // - OYSTER Daily Caps
  var dailyCaps = fareData.dailyCaps;

  var journeys = [{
    zones: [2, 1],
    dualZoneOverlap: false,
    peak: true
  }, {
    zones: [3, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [2, 1],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [2, 1],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [4, 2],
    dualZoneOverlap: false,
    peak: false
  }, {
    zones: [1, 3],
    dualZoneOverlap: false,
    peak: true
  }];

  var oyCumPeakTotal = 0;
  var oyCumOffTotal = 0;
  var oyCumTotal = 0;
  var maxZoneSoFar = null;

  journeys.forEach(function (journey) {

    //Gets the maximum zones of alls the zones travelled in so far
    // maxZoneSoFar = (journey.zones.max > maxZoneSoFar ? journey.zones.max : maxZoneSoFar);
    maxZoneSoFar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])([].concat(journey.zones, maxZoneSoFar));

    if (journey.peak) {
      //Gets the relevant daily cap to that max zone & single fare for that journey
      var maxZoneAnyDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(maxZoneSoFar, dailyCaps);
      var single = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey.zones, singleFares); //FOR PEAK PAYG RATES

      //adds the single fare to the cumulative total
      oyCumPeakTotal += single;
      oyCumOffTotal += single;

      //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
      if (oyCumPeakTotal >= maxZoneAnyDailyCap) {
        oyCumPeakTotal = maxZoneAnyDailyCap;
      }
      oyCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])([oyCumPeakTotal, oyCumOffTotal]);
    } else {
      //Gets the relevant daily cap to that max zone & single fare for that journey
      var maxZoneOffDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(maxZoneSoFar, dailyCaps);
      var maxZoneAnyDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(maxZoneSoFar, dailyCaps);
      var single = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey.zones, singleFares); //FOR OFF PEAK PAYG rates

      //adds the single fare to the cumulative total
      oyCumPeakTotal += single;
      oyCumOffTotal += single;

      //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
      if (oyCumPeakTotal >= maxZoneAnyDailyCap) {
        oyCumPeakTotal = maxZoneAnyDailyCap;
      }
      if (oyCumOffTotal >= maxZoneOffDailyCap) {
        oyCumOffTotal = maxZoneOffDailyCap; //and set an alert to say off daily cap reached????!!! (but could be overridden after)
      }
      oyCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])([oyCumPeakTotal, oyCumOffTotal]);
    }
  });
  //oyCumTotal is the final oyster daily fare calculated:

  // OYSTER WEEKLY CAP
  //ALL THE DIFFERENT COMBINATIONS OF WEEKLY CAPS with extension fares -- weekly always anytime
  // Oyster deals with whole journeys when mixing daily cap and weekly - cuts off weekly part but not daily & cum total calc

  // For each possible weekly cap:
  // for each journey, use extension fares to calculate the single fare (off peak or on peak).
  // If max zone travelled so far <= max weekly cap && max zone so far => min weekly -1 , then set zone X to min weekly - 1 / else if max zone so far < min weekly - 2 or max zone so fare > max weekly, set zone X as max zone so far
  // Then use similar to daily capping: add this single fare to cum total peak or off peak, compare to daily cap of max zone X and cap where needed
  //Need set an alert for when reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times.

  // To generate possible weekly caps (! remember to do without any weekly caps too)
  // var possWeeklyCombos =[];
  // for (m = 1, m < 7, m++) {
  // 	for (x = 2, x < 7, x++) {
  //    possWeeklyCombos.push([m, x]);
  // 	}
  // };

  // - CONTACTLESS Cheapest Fare = with daily caps
  //The array of all combination prices to be reduce to cheapest one
  var conAllFares = [];

  // for without any daily caps, only singles added together
  var conFares = null;
  journeys.forEach(function (journey) {
    var conSingle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey.zones, singleFares);
    conFares += conSingle;
  });
  conAllFares.push(conFares);

  // 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
  var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* flatten */])(journeys.map(function (j) {
    return j.zones;
  })));
  for (var i = 2; i <= conMaxZone; i++) {
    //console.log('for daily cap 1 to ' + i);
    var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(i, dailyCaps);
    for (var x = 0; x < journeys.length; x++) {
      //adding extension fares to cumTotal
      conCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(1, i, journeys[x][0], journeys[x][1], singleFares);
    };
    conAllFares.push(conCumTotal);
  }

  // 	---> Compare all the possibilities and select the cheapest (including total single).
  var conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* minNum */])(conAllFares);
  //conFinaFare is final contactless daily fare
});

//CONTACTLESS WEEKLY
//IF difference between min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES AND SO USE extensionFaresWeekly
// otherwise use extensionFares and set min travelcard = 1, max travecard = max zone of either daily or weekly cap.

// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQ3MTkyZGEyZmZkMDlhZGU4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsImdldERhaWx5Q2FwIiwibWF4Wm9uZXNvZmFyIiwiZGFpbHlDYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwiZmV0Y2hGYXJlRGF0YSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImUiLCJmYXJlcyIsInNwbGl0T3JGdWxsRmFyZSIsIm1pbkNoYXJnZWRab25lIiwibWF4U2luZ2xlIiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJleHRlbnNpb25GYXJlcyIsIm9wdGlvbnMiLCJtYXhEYWlseSIsIm95c3RlciIsIm1pblNpbmdsZSIsImZpbmFsQ29uZGl0aW9uIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibWFwIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsImZhcmVEYXRhIiwibWlubWF4VHJhdmVsY2FyZCIsIm1pbm1heEpvdXJuZXkiLCJkdWFsWm9uZU92ZXJsYXAiLCJwZWFrIiwib3lDdW1QZWFrVG90YWwiLCJveUN1bU9mZlRvdGFsIiwib3lDdW1Ub3RhbCIsIm1heFpvbmVTb0ZhciIsIm1heFpvbmVBbnlEYWlseUNhcCIsInNpbmdsZSIsIm1heFpvbmVPZmZEYWlseUNhcCIsImNvbkFsbEZhcmVzIiwiY29uRmFyZXMiLCJjb25TaW5nbGUiLCJjb25NYXhab25lIiwiaiIsImkiLCJjb25DdW1Ub3RhbCIsIngiLCJjb25GaW5hbEZhcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FB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QyxDQUFULEVBQVksQ0FBWixDQUFyQyxFQUFxRHZFLFdBQXJELENBQWY7QUFDQztBQUNGZ0UsZ0JBQVkxQixJQUFaLENBQWlCZ0MsV0FBakI7QUFDQTs7QUFFRjtBQUNBLE1BQUlFLGVBQWUsdUZBQUF2RixDQUFPK0UsV0FBUCxDQUFuQjtBQUNBO0FBQ0EsQ0E1SkQ7O0FBOEpBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUkiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ0NzE5MmRhMmZmZDA5YWRlOGMzIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcykge1xuICByZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuICByZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRTaW5nbGVGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldFNpbmdsZUZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyksXG5cdFx0Z2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcykgKyBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcylcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRnZXRTaW5nbGVGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlIGJlbG93XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuIFx0Ly9DT05UQUNUTEVTUyBvbmx5IHVzZXMgYWR1bHQgZmFyZXNcblx0Ly9GT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG5cdC8vRk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhvcHRpb25zID0ge30sIHNpbmdsZUZhcmVzKSB7XG4gIGNvbnN0IG1heERhaWx5ID0gb3B0aW9ucy5tYXhEYWlseSB8fCBudWxsO1xuICBjb25zdCBveXN0ZXIgPSBvcHRpb25zLm95c3RlciB8fCBudWxsO1xuXG5cdGNvbnN0IHtcblx0XHRtaW5TaW5nbGUsXG5cdFx0bWF4U2luZ2xlLFxuICAgIG1pblRyYXZlbGNhcmQsXG5cdFx0bWF4VHJhdmVsY2FyZCxcblx0fSA9IG9wdGlvbnM7XG5cblx0Y29uc3QgbWluQ2hhcmdlZFpvbmUgPSAoIW95c3RlciB8fCAobWF4RGFpbHkgJiYgbWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG4gIGNvbnN0IGZpbmFsQ29uZGl0aW9uID0gKG1heERhaWx5ID8gbWluU2luZ2xlIDw9IG1heERhaWx5ICYmIG1heFNpbmdsZSA8PSBtYXhEYWlseSA6IG51bGwpO1xuXG5cdC8vIG1pblNpbmdsZSwgbWF4U2luZ2xlLCAvL3RoZSBtaW4gYW5kIG1heCB6b25lcyB0cmF2ZWxsZWQgaW4gdGhpcyBzaW5nbGUgam91cm5leVxuXHQvLyBtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLCAvL21pbiBhbmQgbWF4IHpvbmVzIG9mIHRoZSB0cmF2ZWxjYXJkIHpvbmVzIGNvbmNlcm5lZFxuXHQvLyBzaW5nbGVGYXJlcykgeyAvLyB0byBnZXQgZnJvbSBzaW5nbGUgZmFyZXMganNvbilcblxuXHQvL2lmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHJldHVybiBnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0cmV0dXJuIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcyk7XG5cblx0Ly9ib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0cmV0dXJuIDA7IC8vTkVFRCBUTyBBREQgYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCBkYWlseVxuXG4gXHQvL2JvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSB7XG4gXHRcdHJldHVybiBnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuIFx0fSAvL0VMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IHtcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGZsYXR0ZW4sXG5cdGdldERhaWx5Q2FwLFxuXHRnZXRTaW5nbGVGYXJlLFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuLy9OQiBXZWVrbHkgY2FwcGluZyBpcyBhbHdheXMgYW55dGltZVxuXG5nZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG5cdFx0Ly8gY29uc29sZS5sb2cocmVzcCk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4TnVtIGFuZCBtaW5OdW0gb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cblx0Ly8gRVhBTVBMRVxuXHR2YXIgbWlubWF4VHJhdmVsY2FyZCA9IFszLCA0XTtcblx0dmFyIG1pbm1heEpvdXJuZXkgPSBbMSwgNl07XG5cbiAgY29uc29sZS5sb2coXG4gICAgZXh0ZW5zaW9uRmFyZXMoe1xuICAgICAgbWluU2luZ2xlOiBtaW5tYXhKb3VybmV5WzBdLFxuICAgICAgbWF4U2luZ2xlOiBtaW5tYXhKb3VybmV5WzFdLFxuICAgICAgbWF4RGFpbHk6IDIsXG4gICAgICBtaW5UcmF2ZWxjYXJkOiBtaW5tYXhUcmF2ZWxjYXJkWzBdLFxuICAgICAgbWF4VHJhdmVsY2FyZDogbWlubWF4VHJhdmVsY2FyZFsxXSxcbiAgICB9LCBzaW5nbGVGYXJlcylcbiAgKTtcblxuICBjb25zb2xlLmxvZyhcbiAgICBleHRlbnNpb25GYXJlcyh7XG4gICAgICBtaW5TaW5nbGU6IG1pbm1heEpvdXJuZXlbMF0sXG4gICAgICBtYXhTaW5nbGU6IG1pbm1heEpvdXJuZXlbMV0sXG4gICAgICAvLyBtYXhEYWlseTogMixcbiAgICAgIG1pblRyYXZlbGNhcmQ6IG1pbm1heFRyYXZlbGNhcmRbMF0sXG4gICAgICBtYXhUcmF2ZWxjYXJkOiBtaW5tYXhUcmF2ZWxjYXJkWzFdLFxuICAgIH0sIHNpbmdsZUZhcmVzKVxuICApO1xuXG4vLyAtIE9ZU1RFUiBEYWlseSBDYXBzXG5cdHZhciBkYWlseUNhcHMgPSBmYXJlRGF0YS5kYWlseUNhcHM7XG5cblx0Y29uc3Qgam91cm5leXMgPSBbXG5cdFx0e1xuXHRcdFx0em9uZXM6IFsyLCAxXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiB0cnVlLFxuXHRcdH0sXG4gICAge1xuICAgICAgem9uZXM6IFszLCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMV0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzIsIDFdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFs0LCAyXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMSwgM10sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogdHJ1ZSxcbiAgICB9XG5cdF07XG5cblx0dmFyIG95Q3VtUGVha1RvdGFsID0gMDtcblx0dmFyIG95Q3VtT2ZmVG90YWwgPSAwO1xuICB2YXIgb3lDdW1Ub3RhbCA9IDA7XG5cdHZhciBtYXhab25lU29GYXIgPSBudWxsO1xuXG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXG4gICAgLy9HZXRzIHRoZSBtYXhpbXVtIHpvbmVzIG9mIGFsbHMgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcbiAgICAvLyBtYXhab25lU29GYXIgPSAoam91cm5leS56b25lcy5tYXggPiBtYXhab25lU29GYXIgPyBqb3VybmV5LnpvbmVzLm1heCA6IG1heFpvbmVTb0Zhcik7XG4gICAgbWF4Wm9uZVNvRmFyID0gbWF4TnVtKFtdLmNvbmNhdChqb3VybmV5LnpvbmVzLCBtYXhab25lU29GYXIpKTtcblxuICAgIGlmIChqb3VybmV5LnBlYWspIHtcbiAgICAgIC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG4gICAgICB2YXIgbWF4Wm9uZUFueURhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpO1xuICAgICAgdmFyIHNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leS56b25lcywgc2luZ2xlRmFyZXMpOyAvL0ZPUiBQRUFLIFBBWUcgUkFURVNcblxuICAgICAgLy9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuICAgICAgb3lDdW1QZWFrVG90YWwgKz0gc2luZ2xlO1xuICAgICAgb3lDdW1PZmZUb3RhbCArPSBzaW5nbGU7XG5cbiAgICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgICAgaWYgKG95Q3VtUGVha1RvdGFsID49IG1heFpvbmVBbnlEYWlseUNhcCkge1xuICAgICAgICBveUN1bVBlYWtUb3RhbCA9IG1heFpvbmVBbnlEYWlseUNhcDtcbiAgICAgIH1cblx0XHRcdG95Q3VtVG90YWwgKz0gbWluTnVtKFtveUN1bVBlYWtUb3RhbCwgb3lDdW1PZmZUb3RhbF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL0dldHMgdGhlIHJlbGV2YW50IGRhaWx5IGNhcCB0byB0aGF0IG1heCB6b25lICYgc2luZ2xlIGZhcmUgZm9yIHRoYXQgam91cm5leVxuICAgICAgdmFyIG1heFpvbmVPZmZEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVTb0ZhciwgZGFpbHlDYXBzKTtcbiAgICAgIHZhciBtYXhab25lQW55RGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7XG4gICAgICB2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIE9GRiBQRUFLIFBBWUcgcmF0ZXNcblxuICAgICAgLy9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuICAgICAgb3lDdW1QZWFrVG90YWwgKz0gc2luZ2xlO1xuICAgICAgb3lDdW1PZmZUb3RhbCArPSBzaW5nbGU7XG5cbiAgICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgICAgaWYgKG95Q3VtUGVha1RvdGFsID49IG1heFpvbmVBbnlEYWlseUNhcCkge1xuICAgICAgICBveUN1bVBlYWtUb3RhbCA9IG1heFpvbmVBbnlEYWlseUNhcDtcbiAgICAgIH1cbiAgICAgIGlmIChveUN1bU9mZlRvdGFsID49IG1heFpvbmVPZmZEYWlseUNhcCkge1xuICAgICAgICBveUN1bU9mZlRvdGFsID0gbWF4Wm9uZU9mZkRhaWx5Q2FwOyAvL2FuZCBzZXQgYW4gYWxlcnQgdG8gc2F5IG9mZiBkYWlseSBjYXAgcmVhY2hlZD8/Pz8hISEgKGJ1dCBjb3VsZCBiZSBvdmVycmlkZGVuIGFmdGVyKVxuXHRcdFx0fVxuICAgICAgb3lDdW1Ub3RhbCArPSBtaW5OdW0oW295Q3VtUGVha1RvdGFsLCBveUN1bU9mZlRvdGFsXSk7XG5cdFx0fVxuXG5cdH0pO1xuXHQvL295Q3VtVG90YWwgaXMgdGhlIGZpbmFsIG95c3RlciBkYWlseSBmYXJlIGNhbGN1bGF0ZWQ6XG5cbi8vIE9ZU1RFUiBXRUVLTFkgQ0FQXG5cdC8vQUxMIFRIRSBESUZGRVJFTlQgQ09NQklOQVRJT05TIE9GIFdFRUtMWSBDQVBTIHdpdGggZXh0ZW5zaW9uIGZhcmVzIC0tIHdlZWtseSBhbHdheXMgYW55dGltZVxuXHQvLyBPeXN0ZXIgZGVhbHMgd2l0aCB3aG9sZSBqb3VybmV5cyB3aGVuIG1peGluZyBkYWlseSBjYXAgYW5kIHdlZWtseSAtIGN1dHMgb2ZmIHdlZWtseSBwYXJ0IGJ1dCBub3QgZGFpbHkgJiBjdW0gdG90YWwgY2FsY1xuXG5cdC8vIEZvciBlYWNoIHBvc3NpYmxlIHdlZWtseSBjYXA6XG5cdC8vIGZvciBlYWNoIGpvdXJuZXksIHVzZSBleHRlbnNpb24gZmFyZXMgdG8gY2FsY3VsYXRlIHRoZSBzaW5nbGUgZmFyZSAob2ZmIHBlYWsgb3Igb24gcGVhaykuXG5cdC8vIElmIG1heCB6b25lIHRyYXZlbGxlZCBzbyBmYXIgPD0gbWF4IHdlZWtseSBjYXAgJiYgbWF4IHpvbmUgc28gZmFyID0+IG1pbiB3ZWVrbHkgLTEgLCB0aGVuIHNldCB6b25lIFggdG8gbWluIHdlZWtseSAtIDEgLyBlbHNlIGlmIG1heCB6b25lIHNvIGZhciA8IG1pbiB3ZWVrbHkgLSAyIG9yIG1heCB6b25lIHNvIGZhcmUgPiBtYXggd2Vla2x5LCBzZXQgem9uZSBYIGFzIG1heCB6b25lIHNvIGZhclxuXHQvLyBUaGVuIHVzZSBzaW1pbGFyIHRvIGRhaWx5IGNhcHBpbmc6IGFkZCB0aGlzIHNpbmdsZSBmYXJlIHRvIGN1bSB0b3RhbCBwZWFrIG9yIG9mZiBwZWFrLCBjb21wYXJlIHRvIGRhaWx5IGNhcCBvZiBtYXggem9uZSBYIGFuZCBjYXAgd2hlcmUgbmVlZGVkXG5cdC8vTmVlZCBzZXQgYW4gYWxlcnQgZm9yIHdoZW4gcmVhY2ggYSBab25lcyAxLTQgb3IgWm9uZXMgMS02IGRhaWx5IGNhcCwgYnV0IG9ubHkgdHJhdmVsIGF0IG9mZi1wZWFrIHRpbWVzLlxuXG5cdC8vIFRvIGdlbmVyYXRlIHBvc3NpYmxlIHdlZWtseSBjYXBzICghIHJlbWVtYmVyIHRvIGRvIHdpdGhvdXQgYW55IHdlZWtseSBjYXBzIHRvbylcblx0Ly8gdmFyIHBvc3NXZWVrbHlDb21ib3MgPVtdO1xuXHQvLyBmb3IgKG0gPSAxLCBtIDwgNywgbSsrKSB7XG5cdC8vIFx0Zm9yICh4ID0gMiwgeCA8IDcsIHgrKykge1xuICAgLy8gICAgcG9zc1dlZWtseUNvbWJvcy5wdXNoKFttLCB4XSk7XG5cdC8vIFx0fVxuICAvLyB9O1xuXG4vLyAtIENPTlRBQ1RMRVNTIENoZWFwZXN0IEZhcmUgPSB3aXRoIGRhaWx5IGNhcHNcblx0Ly9UaGUgYXJyYXkgb2YgYWxsIGNvbWJpbmF0aW9uIHByaWNlcyB0byBiZSByZWR1Y2UgdG8gY2hlYXBlc3Qgb25lXG5cdHZhciBjb25BbGxGYXJlcyA9IFtdO1xuXG5cdC8vIGZvciB3aXRob3V0IGFueSBkYWlseSBjYXBzLCBvbmx5IHNpbmdsZXMgYWRkZWQgdG9nZXRoZXJcblx0dmFyIGNvbkZhcmVzID0gbnVsbDtcblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGNvblNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leS56b25lcywgc2luZ2xlRmFyZXMpO1xuXHRcdGNvbkZhcmVzICs9IGNvblNpbmdsZTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgdmFyIGNvbk1heFpvbmUgPSBtYXhOdW0oZmxhdHRlbihqb3VybmV5cy5tYXAoaiA9PiBqLnpvbmVzKSkpO1xuXHQgZm9yICh2YXIgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG5cdCBcdC8vY29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG5cdCBcdHZhciBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG5cdCBcdCBmb3IgKHZhciB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG5cdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKDEsIGksIGpvdXJuZXlzW3hdWzBdLCBqb3VybmV5c1t4XVsxXSwgc2luZ2xlRmFyZXMpO1xuXHQgXHQgfTtcblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS5cblx0dmFyIGNvbkZpbmFsRmFyZSA9IG1pbk51bShjb25BbGxGYXJlcyk7XG5cdC8vY29uRmluYUZhcmUgaXMgZmluYWwgY29udGFjdGxlc3MgZGFpbHkgZmFyZVxufSk7XG5cbi8vQ09OVEFDVExFU1MgV0VFS0xZXG4vL0lGIGRpZmZlcmVuY2UgYmV0d2VlbiBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMSAtLSBUSEVOIFRIRVJFIEFSRSBHQVAgWk9ORVMgQU5EIFNPIFVTRSBleHRlbnNpb25GYXJlc1dlZWtseVxuLy8gb3RoZXJ3aXNlIHVzZSBleHRlbnNpb25GYXJlcyBhbmQgc2V0IG1pbiB0cmF2ZWxjYXJkID0gMSwgbWF4IHRyYXZlY2FyZCA9IG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwLlxuXG4vLyBPRkYgUEVBSyBEQUlMWSBhbmQgV0VFS0xZOiBGb3Igb2ZmIHBlYWsgZGFpbHkgY2FwIGNvbWJvczogaWYgb2ZmIHBlYWssIHVzZSBleHRlbnNpb24gZmFyZXMgdG8gY2FsY3VsYXRlIHVzaW5nIGJvdGggZGFpbHkgYW5kIHdlZWtseSBjYXBzXG4vLyAtLS0gd2hpbHN0IGlmIHBlYWsgdHJhdmVsIHRoZW4gdXNlIGV4dGVuc2lvbiBmYXJlcyB3aXRoIG9ubHkgd2Vla2x5IHRyYXZlbCBjYXJkIGNhcHMgYW5kIGFkZCB0byB0b3RhbFxuLy8gQU5ZVElNRSBEQUlMWSBhbmQgV0VFS0xZOiB1c2UgdGhlIGV4dGVuc2lvbiBmYXJlIHRvIGNhbGN1bGF0ZSBhbGwgZmFyZXMgd2l0aCBkYWlseSBhbnl0aW1lIGNhcCBhbmQgd2Vla2x5IGNhcCAoY3VycmVudCBzZXQgdXApXG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=