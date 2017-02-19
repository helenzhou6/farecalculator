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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(1);
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
      maxTravelcard = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])([maxDaily, maxTravelcard]); //max travelcard is whichever is largest max daily or max travelcard
      //else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
    } else {
      //IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
      minChargedZone = minSingle <= maxDaily ? maxDaily + 1 : minSingle;
      finalCondition = minSingle <= maxDaily && maxSingle <= maxDaily;
    }
  }

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
    return 0;

    //both single zones are outside travelcard zones
  }
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares);
  //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_getData__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_utility__ = __webpack_require__(1);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(2);






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

  //OYSTER DAILY CAPS
  var oyCumPeakTotal = 0;
  var oyCumOffTotal = 0;
  var oyCumTotal = 0;
  var maxZoneSoFar = null;

  journeys.forEach(function (journey) {

    //Gets the maximum zones of alls the zones travelled in so far
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

//CONTACTLESS
//For just daily caps OR weekly cap without daily cap: use extension fares without max daily
//For combo of daily cap and weekly cap: use extension fares with max daily cap
//
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(1);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzNjYjI2MmFjZjA2NDYwOTE0ZDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIl0sIm5hbWVzIjpbImZldGNoRmFyZURhdGEiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJmZXRjaFN0YXRpb25zRGF0YSIsImZldGNoSm91cm5leURhdGEiLCJmcm9tIiwidG8iLCJlIiwiZmFyZXMiLCJzdGF0aW9ucyIsImpvdXJuZXkiLCJnZXRab25lcyIsIm5hcFRhbiIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwic29ydCIsImpvaW4iLCJnZXREYWlseUNhcCIsIm1heFpvbmVzb2ZhciIsImRhaWx5Q2FwcyIsImdldFNpbmdsZUZhcmUiLCJzaW5nbGVGYXJlcyIsImV4dGVuc2lvbkZhcmVzIiwib3B0aW9ucyIsIm1heERhaWx5IiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJtaW5DaGFyZ2VkWm9uZSIsImZpbmFsQ29uZGl0aW9uIiwic3BsaXRPckZ1bGxGYXJlIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibWFwIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsImZhcmVEYXRhIiwiZHVhbFpvbmVPdmVybGFwIiwicGVhayIsIm95Q3VtUGVha1RvdGFsIiwib3lDdW1PZmZUb3RhbCIsIm95Q3VtVG90YWwiLCJtYXhab25lU29GYXIiLCJtYXhab25lQW55RGFpbHlDYXAiLCJzaW5nbGUiLCJtYXhab25lT2ZmRGFpbHlDYXAiLCJjb25BbGxGYXJlcyIsImNvbkZhcmVzIiwiY29uU2luZ2xlIiwiY29uTWF4Wm9uZSIsImoiLCJpIiwiY29uQ3VtVG90YWwiLCJ4IiwiY29uRmluYWxGYXJlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7OztBQUdBLElBQUlBLGdCQUFpQixZQUFZO0FBQ2hDLEtBQUlDLE9BQU8sSUFBWDs7QUFFQSxRQUFPLFlBQVc7QUFDakIsTUFBSUEsSUFBSixFQUFVO0FBQ1RDLFdBQVFDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBLFVBQU9DLFFBQVFDLE9BQVIsQ0FBZ0JKLElBQWhCLENBQVA7QUFDQTs7QUFFRCxTQUFPSyxNQUFNLGtCQUFOLEVBQTBCQyxJQUExQixDQUErQixVQUFTQyxJQUFULEVBQWU7QUFDcERQLFVBQU9PLEtBQUtDLElBQUwsRUFBUDtBQUNBLFVBQU9SLElBQVA7QUFDQSxHQUhNLENBQVA7QUFJQSxFQVZEO0FBV0EsQ0Fkb0IsRUFBckI7O0FBZ0JBO0FBQ0EsSUFBSVMsb0JBQXFCLFlBQVc7QUFDbkMsS0FBSVQsT0FBTyxJQUFYOztBQUVBLFFBQU8sWUFBVztBQUNqQixNQUFJQSxJQUFKLEVBQVU7QUFDVEMsV0FBUUMsR0FBUixDQUFZLHFDQUFaO0FBQ0EsVUFBT0MsUUFBUUMsT0FBUixDQUFnQkosSUFBaEIsQ0FBUDtBQUNBOztBQUVELFNBQU9LLE1BQU0scUJBQU4sRUFBNkJDLElBQTdCLENBQWtDLFVBQVNDLElBQVQsRUFBZTtBQUN2RFAsVUFBT08sS0FBS0MsSUFBTCxFQUFQO0FBQ0EsVUFBT1IsSUFBUDtBQUNBLEdBSE0sQ0FBUDtBQUlBLEVBVkQ7QUFXQSxDQWR3QixFQUF6Qjs7QUFnQkE7QUFDQSxJQUFJVSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFTQyxJQUFULEVBQWVDLEVBQWYsRUFBbUI7QUFDekMsUUFBT1AsTUFBTSxtREFBbURNLElBQW5ELEdBQTBELE1BQTFELEdBQW1FQyxFQUFuRSxHQUF3RSwyREFBOUUsRUFBMklOLElBQTNJLENBQWdKLFVBQVNPLENBQVQsRUFBWTtBQUNsSyxTQUFPQSxFQUFFTCxJQUFGLEVBQVA7QUFDQSxFQUZNLENBQVA7QUFHQSxDQUpEOztBQU1BLHdEQUFlO0FBQ2RNLFFBQU9mLGFBRE87QUFFZGdCLFdBQVVOLGlCQUZJO0FBR2RPLFVBQVNOO0FBSEssQ0FBZixDOzs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFBQTs7Ozs7Ozs7QUFRTyxTQUFTTyxRQUFULENBQWtCQyxNQUFsQixFQUEwQkgsUUFBMUIsRUFBb0M7QUFDekMsU0FBT0EsU0FBU0csTUFBVCxFQUFpQkMsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTQyxtQkFBVCxDQUE2QkMsR0FBN0IsRUFBa0NGLEtBQWxDLEVBQXlDO0FBQzlDLFNBQU9BLE1BQU1HLE1BQU4sQ0FBYSxVQUFTQyxJQUFULEVBQWU7QUFDakMsV0FBT0EsS0FBS0MsTUFBTCxLQUFnQkgsR0FBdkI7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU0ksY0FBVCxDQUF3QkMsWUFBeEIsRUFBc0NDLFFBQXRDLEVBQWdEO0FBQzlDLFNBQU9ELGFBQWFFLE1BQWIsQ0FBb0IsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDeEMsV0FBT0gsU0FBU0UsQ0FBVCxFQUFZQyxDQUFaLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFTSxTQUFTQyxNQUFULENBQWdCQyxVQUFoQixFQUE0QjtBQUNqQyxTQUFPUCxlQUFlTyxVQUFmLEVBQTJCQyxLQUFLQyxHQUFoQyxDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsTUFBVCxDQUFnQkgsVUFBaEIsRUFBNEI7QUFDakMsU0FBT1AsZUFBZU8sVUFBZixFQUEyQkMsS0FBS0csR0FBaEMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT08sU0FBU0MsYUFBVCxDQUF1QlIsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCO0FBQ2xDLFNBQU9HLEtBQUtLLEdBQUwsQ0FBU1QsSUFBSUMsQ0FBYixDQUFQO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNTLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQzNCLFNBQU9BLElBQUlaLE1BQUosQ0FBVyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUMvQixXQUFPRCxFQUFFWSxNQUFGLENBQVNYLENBQVQsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVEOzs7Ozs7O0FBT08sU0FBU1ksWUFBVCxDQUFzQjFCLE9BQXRCLEVBQStCO0FBQ3BDLFNBQU9BLFFBQVEyQixJQUFSLEdBQWVDLElBQWYsQ0FBb0IsR0FBcEIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFPLFNBQVNDLFdBQVQsQ0FBcUJDLFlBQXJCLEVBQW1DQyxTQUFuQyxFQUE4QztBQUNuRCxTQUFPQSxVQUFVTCxhQUFhLENBQUMsQ0FBRCxFQUFJSSxZQUFKLENBQWIsQ0FBVixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0UsYUFBVCxDQUF1QmhDLE9BQXZCLEVBQWdDaUMsV0FBaEMsRUFBNkM7QUFDbEQsU0FBT0EsWUFBWVAsYUFBYTFCLE9BQWIsQ0FBWixDQUFQO0FBQ0QsQzs7Ozs7Ozs7OztBQzNHRDs7QUFLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsU0FBU2tDLGNBQVQsR0FBbUQ7QUFBQSxNQUEzQkMsT0FBMkIsdUVBQWpCLEVBQWlCO0FBQUEsTUFBYkYsV0FBYTs7QUFDaEUsTUFBTUcsV0FBV0QsUUFBUUMsUUFBUixJQUFvQixJQUFyQztBQUNBOztBQUZnRSxNQUtoRUMsU0FMZ0UsR0FVN0RGLE9BVjZELENBS2hFRSxTQUxnRTtBQUFBLE1BTWhFQyxTQU5nRSxHQVU3REgsT0FWNkQsQ0FNaEVHLFNBTmdFO0FBQUEsTUFPOURDLGFBUDhELEdBVTdESixPQVY2RCxDQU85REksYUFQOEQ7QUFBQSxNQVFoRUMsYUFSZ0UsR0FVN0RMLE9BVjZELENBUWhFSyxhQVJnRTtBQVdqRTs7QUFFQyxNQUFJQyxpQkFBaUJKLFNBQXJCO0FBQ0EsTUFBSUssaUJBQWlCLElBQXJCOztBQUVBLE1BQUlOLFFBQUosRUFBYztBQUFFO0FBQ2YsUUFBSUEsWUFBYUcsZ0JBQWdCLENBQWpDLEVBQXFDO0FBQUU7QUFDckNBLHNCQUFnQixDQUFoQixDQURtQyxDQUNoQjtBQUNuQkMsc0JBQWdCLHVGQUFBekIsQ0FBTyxDQUFDcUIsUUFBRCxFQUFXSSxhQUFYLENBQVAsQ0FBaEIsQ0FGbUMsQ0FFZ0I7QUFDcEQ7QUFDRCxLQUpBLE1BSU07QUFBRTtBQUNSQyx1QkFBbUJKLGFBQWFELFFBQWQsR0FBMEJBLFdBQVcsQ0FBckMsR0FBeUNDLFNBQTNEO0FBQ0FLLHVCQUFrQkwsYUFBYUQsUUFBYixJQUF5QkUsYUFBYUYsUUFBeEQ7QUFDQTtBQUNEOztBQUVEO0FBQ0EsTUFBS0MsWUFBWUUsYUFBYixJQUFnQ0EsaUJBQWlCRCxTQUFqQixJQUE4QkEsYUFBYUUsYUFBL0UsRUFBK0Y7QUFDOUYsV0FBTyw4RkFBQVIsQ0FBYyxDQUFDUyxjQUFELEVBQWtCRixnQkFBZ0IsQ0FBbEMsQ0FBZCxFQUFxRE4sV0FBckQsQ0FBUDs7QUFFRDtBQUNFLEdBSkYsTUFJUSxJQUFLTSxpQkFBaUJGLFNBQWpCLElBQThCQSxhQUFhRyxhQUE1QyxJQUErREYsWUFBWUUsYUFBL0UsRUFBK0Y7QUFDckcsV0FBTyw4RkFBQVIsQ0FBYyxDQUFFUSxnQkFBZ0IsQ0FBbEIsRUFBc0JGLFNBQXRCLENBQWQsRUFBZ0RMLFdBQWhELENBQVA7O0FBRUQ7QUFDQyxHQUpNLE1BSUEsSUFBSUksWUFBWUUsYUFBWixJQUE2QkQsWUFBWUUsYUFBN0MsRUFBNEQ7QUFDbEUsV0FBTyx3RkFBQUcsQ0FDSkYsY0FESSxFQUNZSCxTQURaLEVBRU5DLGFBRk0sRUFFU0MsYUFGVCxFQUdOUCxXQUhNLENBQVA7O0FBS0Y7QUFDRSxHQVBNLE1BT0EsSUFBS00saUJBQWlCRixTQUFqQixJQUE4QkEsYUFBYUcsYUFBNUMsSUFBK0RELGlCQUFpQkQsU0FBakIsSUFBOEJBLGFBQWFFLGFBQTFHLElBQTRIRSxjQUFoSSxFQUFnSjtBQUN0SixXQUFPLENBQVA7O0FBRUQ7QUFDQztBQUNELFNBQU8sOEZBQUFWLENBQWMsQ0FBQ1MsY0FBRCxFQUFpQkgsU0FBakIsQ0FBZCxFQUEyQ0wsV0FBM0MsQ0FBUDtBQUNDO0FBQ0YsRTs7Ozs7Ozs7O0FDdEVEO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBUWUsU0FBU1cscUJBQVQsQ0FBK0JqRCxJQUEvQixFQUFxQ0MsRUFBckMsRUFBeUNHLFFBQXpDLEVBQW1EO0FBQ2pFLFFBQU8saUVBQUE4QyxDQUFRN0MsT0FBUixDQUFnQkwsSUFBaEIsRUFBc0JDLEVBQXRCLEVBQTBCTixJQUExQixDQUErQixVQUFTVSxPQUFULEVBQWtCO0FBQ3ZELE1BQUlBLFVBQVVBLFFBQVE4QyxRQUFSLENBQWlCLENBQWpCLENBQWQsQ0FEdUQsQ0FDcEI7QUFDbkMsTUFBSUMsT0FBTy9DLFFBQVErQyxJQUFuQixDQUZ1RCxDQUU5Qjs7QUFFekI7QUFDQSxNQUFJQyxXQUFXLHdGQUFBekIsQ0FBUXdCLEtBQUtFLEdBQUwsQ0FBUyxVQUFTQyxHQUFULEVBQWM7QUFDN0MsT0FBSUMsWUFBWSxFQUFoQjs7QUFFQTtBQUNBLE9BQUlELElBQUlFLGNBQUosSUFBc0JGLElBQUlFLGNBQUosQ0FBbUJDLFFBQTdDLEVBQXVEO0FBQ3RERixjQUFVRyxJQUFWLENBQWUseUZBQUFyRCxDQUFTaUQsSUFBSUUsY0FBSixDQUFtQkMsUUFBNUIsRUFBc0N0RCxRQUF0QyxDQUFmO0FBQ0E7O0FBRUQ7QUFDQSxPQUFJbUQsSUFBSUssSUFBSixDQUFTQyxVQUFULElBQXVCTixJQUFJSyxJQUFKLENBQVNDLFVBQVQsQ0FBb0JoRCxNQUFwQixHQUE2QixDQUF4RCxFQUEyRDtBQUMxRDBDLFFBQUlLLElBQUosQ0FBU0MsVUFBVCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBU0MsU0FBVCxFQUFvQjtBQUMvQyxTQUFJQSxVQUFVQyxFQUFkLEVBQWtCO0FBQ2pCUixnQkFBVUcsSUFBVixDQUFlLHlGQUFBckQsQ0FBU3lELFVBQVVDLEVBQW5CLEVBQXVCNUQsUUFBdkIsQ0FBZjtBQUNBO0FBQ0QsS0FKRDtBQUtBOztBQUVELFVBQU9vRCxTQUFQO0FBQ0EsR0FsQnNCLENBQVIsQ0FBZjs7QUFxQkE7QUFDQTtBQUNBLE1BQUlTLDBCQUEwQixvR0FBQXhELENBQW9CLENBQXBCLEVBQXVCNEMsUUFBdkIsQ0FBOUI7QUFDQSxNQUFJYSx3QkFBd0Isb0dBQUF6RCxDQUFvQixDQUFwQixFQUF1QjRDLFFBQXZCLENBQTVCLENBN0J1RCxDQTZCTztBQUM5RCxNQUFJYyxlQUFlLElBQW5CO0FBQ0EsTUFBSUMsZUFBZSxJQUFuQjs7QUFFQSxNQUFJSCx3QkFBd0JwRCxNQUF4QixLQUFtQyxDQUF2QyxFQUEwQztBQUFFO0FBQzNDc0Qsa0JBQWUsdUZBQUEzQyxDQUFPLHdGQUFBSSxDQUFRc0MscUJBQVIsQ0FBUCxDQUFmO0FBQ0FFLGtCQUFlLHVGQUFBNUMsQ0FBTyx3RkFBQUksQ0FBUXNDLHFCQUFSLENBQVAsQ0FBZjtBQUNEO0FBQ0MsR0FKRCxNQUlPO0FBQ05ELDZCQUEwQix3RkFBQXJDLENBQVEsb0dBQUFuQixDQUFvQixDQUFwQixFQUF1QjRDLFFBQXZCLENBQVIsQ0FBMUI7O0FBR0E7QUFDQSxPQUFJZ0IsWUFBWSx1RkFBQWpELENBQU82Qyx1QkFBUCxDQUFoQjtBQUNBLE9BQUlLLFlBQVksdUZBQUE5QyxDQUFPeUMsdUJBQVAsQ0FBaEI7O0FBRUE7QUFDQTtBQUNBLE9BQUlNLFlBQVlMLHNCQUFzQlosR0FBdEIsQ0FBMEIsVUFBU2tCLENBQVQsRUFBWTtBQUNyRCxXQUFPQSxFQUFFdkQsTUFBRixDQUFTLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQzlCLFNBQUlPLGNBQWNSLENBQWQsRUFBaUJvRCxTQUFqQixJQUE4QjVDLGNBQWNQLENBQWQsRUFBaUJtRCxTQUFqQixDQUFsQyxFQUErRDtBQUM5RCxhQUFPcEQsQ0FBUDtBQUNBO0FBQ0QsWUFBT0MsQ0FBUDtBQUNBLEtBTE0sQ0FBUDtBQU1BLElBUGUsQ0FBaEI7O0FBU0E7QUFDQWdELGtCQUFlLHVGQUFBL0MsQ0FBTyxDQUFDaUQsU0FBRCxFQUFZdkMsTUFBWixDQUFtQnlDLFNBQW5CLENBQVAsQ0FBZjtBQUNBSCxrQkFBZSx1RkFBQTVDLENBQU8sQ0FBQzhDLFNBQUQsRUFBWXhDLE1BQVosQ0FBbUJ5QyxTQUFuQixDQUFQLENBQWY7QUFDQTs7QUFFRCxTQUFPLENBQUNILFlBQUQsRUFBZUQsWUFBZixDQUFQO0FBQ0EsRUE5RE0sQ0FBUDtBQStEQSxDOzs7Ozs7Ozs7Ozs7QUM3RUQ7O0FBUUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBQWpCLENBQVE5QyxRQUFSLEdBQW1CVCxJQUFuQixDQUF3QixVQUFTUyxRQUFULEVBQW1CO0FBQzFDNkMsRUFBQSx1R0FBQUEsQ0FBc0IsU0FBdEIsRUFBaUMsU0FBakMsRUFBNEM3QyxRQUE1QyxFQUFzRFQsSUFBdEQsQ0FBMkQsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BFO0FBQ0EsR0FGRDtBQUdBLENBSkQ7O0FBTUEsaUVBQUFzRCxDQUFRL0MsS0FBUixHQUFnQlIsSUFBaEIsQ0FBcUIsVUFBUzhFLFFBQVQsRUFBbUI7QUFDdEMsTUFBSW5DLGNBQWNtQyxTQUFTbkMsV0FBM0I7QUFDQSxNQUFJRixZQUFZcUMsU0FBU3JDLFNBQXpCOztBQUVBLE1BQU1lLFdBQVcsQ0FDZjtBQUNFM0MsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRWtFLHFCQUFpQixLQUZuQjtBQUdFQyxVQUFNO0FBSFIsR0FEZSxFQU1mO0FBQ0VuRSxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFa0UscUJBQWlCLEtBRm5CO0FBR0VDLFVBQU07QUFIUixHQU5lLEVBV2Y7QUFDRW5FLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVrRSxxQkFBaUIsS0FGbkI7QUFHRUMsVUFBTTtBQUhSLEdBWGUsRUFnQmY7QUFDRW5FLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVrRSxxQkFBaUIsS0FGbkI7QUFHRUMsVUFBTTtBQUhSLEdBaEJlLEVBcUJmO0FBQ0VuRSxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFa0UscUJBQWlCLEtBRm5CO0FBR0VDLFVBQU07QUFIUixHQXJCZSxFQTBCZjtBQUNFbkUsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRWtFLHFCQUFpQixLQUZuQjtBQUdFQyxVQUFNO0FBSFIsR0ExQmUsQ0FBakI7O0FBaUNEO0FBQ0EsTUFBSUMsaUJBQWlCLENBQXJCO0FBQ0EsTUFBSUMsZ0JBQWdCLENBQXBCO0FBQ0MsTUFBSUMsYUFBYSxDQUFqQjtBQUNELE1BQUlDLGVBQWUsSUFBbkI7O0FBRUE1QixXQUFTVyxPQUFULENBQWlCLFVBQVN6RCxPQUFULEVBQWtCOztBQUVoQztBQUNBMEUsbUJBQWUsdUZBQUEzRCxDQUFPLEdBQUdVLE1BQUgsQ0FBVXpCLFFBQVFHLEtBQWxCLEVBQXlCdUUsWUFBekIsQ0FBUCxDQUFmOztBQUVBLFFBQUkxRSxRQUFRc0UsSUFBWixFQUFrQjtBQUNoQjtBQUNBLFVBQUlLLHFCQUFxQiw0RkFBQTlDLENBQVk2QyxZQUFaLEVBQTBCM0MsU0FBMUIsQ0FBekI7QUFDQSxVQUFJNkMsU0FBUyw4RkFBQTVDLENBQWNoQyxRQUFRRyxLQUF0QixFQUE2QjhCLFdBQTdCLENBQWIsQ0FIZ0IsQ0FHd0M7O0FBRXhEO0FBQ0FzQyx3QkFBa0JLLE1BQWxCO0FBQ0FKLHVCQUFpQkksTUFBakI7O0FBRUE7QUFDQSxVQUFJTCxrQkFBa0JJLGtCQUF0QixFQUEwQztBQUN4Q0oseUJBQWlCSSxrQkFBakI7QUFDRDtBQUNKRixvQkFBYyx1RkFBQXRELENBQU8sQ0FBQ29ELGNBQUQsRUFBaUJDLGFBQWpCLENBQVAsQ0FBZDtBQUNFLEtBZEQsTUFjTztBQUNMO0FBQ0EsVUFBSUsscUJBQXFCLDRGQUFBaEQsQ0FBWTZDLFlBQVosRUFBMEIzQyxTQUExQixDQUF6QjtBQUNBLFVBQUk0QyxxQkFBcUIsNEZBQUE5QyxDQUFZNkMsWUFBWixFQUEwQjNDLFNBQTFCLENBQXpCO0FBQ0EsVUFBSTZDLFNBQVMsOEZBQUE1QyxDQUFjaEMsUUFBUUcsS0FBdEIsRUFBNkI4QixXQUE3QixDQUFiLENBSkssQ0FJbUQ7O0FBRXhEO0FBQ0FzQyx3QkFBa0JLLE1BQWxCO0FBQ0FKLHVCQUFpQkksTUFBakI7O0FBRUE7QUFDQSxVQUFJTCxrQkFBa0JJLGtCQUF0QixFQUEwQztBQUN4Q0oseUJBQWlCSSxrQkFBakI7QUFDRDtBQUNELFVBQUlILGlCQUFpQkssa0JBQXJCLEVBQXlDO0FBQ3ZDTCx3QkFBZ0JLLGtCQUFoQixDQUR1QyxDQUNIO0FBQ3hDO0FBQ0VKLG9CQUFjLHVGQUFBdEQsQ0FBTyxDQUFDb0QsY0FBRCxFQUFpQkMsYUFBakIsQ0FBUCxDQUFkO0FBQ0g7QUFFRCxHQXZDRDtBQXdDQTs7QUFFRDtBQUNFO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0M7QUFDQTtBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNGO0FBQ0M7O0FBRUY7QUFDQztBQUNBLE1BQUlNLGNBQWMsRUFBbEI7O0FBRUE7QUFDQSxNQUFJQyxXQUFXLElBQWY7QUFDQWpDLFdBQVNXLE9BQVQsQ0FBaUIsVUFBU3pELE9BQVQsRUFBa0I7QUFDbEMsUUFBSWdGLFlBQVksOEZBQUFoRCxDQUFjaEMsUUFBUUcsS0FBdEIsRUFBNkI4QixXQUE3QixDQUFoQjtBQUNBOEMsZ0JBQVlDLFNBQVo7QUFDQSxHQUhEO0FBSUFGLGNBQVl4QixJQUFaLENBQWlCeUIsUUFBakI7O0FBRUE7QUFDQyxNQUFJRSxhQUFhLHVGQUFBbEUsQ0FBTyx3RkFBQVEsQ0FBUXVCLFNBQVNHLEdBQVQsQ0FBYTtBQUFBLFdBQUtpQyxFQUFFL0UsS0FBUDtBQUFBLEdBQWIsQ0FBUixDQUFQLENBQWpCO0FBQ0EsT0FBSyxJQUFJZ0YsSUFBSSxDQUFiLEVBQWdCQSxLQUFLRixVQUFyQixFQUFpQ0UsR0FBakMsRUFBc0M7QUFDckM7QUFDQSxRQUFJQyxjQUFjLDRGQUFBdkQsQ0FBWXNELENBQVosRUFBZXBELFNBQWYsQ0FBbEI7QUFDQyxTQUFLLElBQUlzRCxJQUFJLENBQWIsRUFBZ0JBLElBQUl2QyxTQUFTdEMsTUFBN0IsRUFBcUM2RSxHQUFyQyxFQUEwQztBQUN6QztBQUNERCxxQkFBZSxnR0FBQWxELENBQWUsQ0FBZixFQUFrQmlELENBQWxCLEVBQXFCckMsU0FBU3VDLENBQVQsRUFBWSxDQUFaLENBQXJCLEVBQXFDdkMsU0FBU3VDLENBQVQsRUFBWSxDQUFaLENBQXJDLEVBQXFEcEQsV0FBckQsQ0FBZjtBQUNDO0FBQ0Y2QyxnQkFBWXhCLElBQVosQ0FBaUI4QixXQUFqQjtBQUNBOztBQUVGO0FBQ0EsTUFBSUUsZUFBZSx1RkFBQW5FLENBQU8yRCxXQUFQLENBQW5CO0FBQ0E7QUFDQSxDQXBJRDs7QUFzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUk7Ozs7Ozs7O0FDcktBO0FBQUE7Ozs7Ozs7OztBQVNBOztBQUtlLFNBQVNuQyxlQUFULENBQ2RGLGNBRGMsRUFDRUgsU0FERixFQUVkQyxhQUZjLEVBRUNDLGFBRkQsRUFHZFAsV0FIYyxFQUdEO0FBQ2IsUUFBTyx1RkFBQWQsQ0FBTyxDQUNiLDhGQUFBYSxDQUFjLENBQUNTLGNBQUQsRUFBaUJILFNBQWpCLENBQWQsRUFBMkNMLFdBQTNDLENBRGEsRUFFWiw4RkFBQUQsQ0FBYyxDQUFDUyxjQUFELEVBQWtCRixnQkFBZ0IsQ0FBbEMsQ0FBZCxFQUFxRE4sV0FBckQsSUFBb0UsOEZBQUFELENBQWMsQ0FBRVEsZ0JBQWdCLENBQWxCLEVBQXNCRixTQUF0QixDQUFkLEVBQWdETCxXQUFoRCxDQUZ4RCxDQUFQLENBQVA7QUFJQSxDIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzM2NiMjYyYWNmMDY0NjA5MTRkNCIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYWlseSBjYXAgY29zdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB0aGUgKG1heGltdW0pIHpvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYWlseUNhcHMgLSBsb29rcyBhdCB0aGUgZGFpbHlDYXBzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIGRhaWx5IGNhcCBiZXR3ZWVuIHpvbmVzIDEgYW5kIHRoZSB6b25lIHBhcmFtZXRlciAoYXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnRzIGF0IHpvbmUgMSlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpIHtcbiAgcmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIHRyYXZlbGxpbmcgYmV0d2VlblxuICogQHBhcmFtIHtvYmplY3R9IHNpbmdsZUZhcmVzIC0gbG9va3MgYXQgdGhlIHNpbmdsZUZhcmVzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIGJldHdlZW4gdGhvc2UgdHdvIHpvbmVzXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpIHtcbiAgcmV0dXJuIHNpbmdsZUZhcmVzW2pvdXJuZXlUb0tleShqb3VybmV5KV07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJpbXBvcnQge1xuXHRnZXRTaW5nbGVGYXJlLFxuXHRtYXhOdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8vIC8qKlxuLy8gICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge29iamVjdH0gc2VlIGJlbG93XG4vLyAgKiBAcGFyYW0ge3NpbmdsZUZhcmVzfSB1c2VzIHRoZSBzaW5nbGVGYXJlcyBqc29uIGRhdGFcbi8vICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmUgZm9yIHRoZSBqb3VybmV5XG4vLyAgKiBAZGVzY3JpcHRpb25cbi8vXG4vLyBcdC8vRk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuLy8gXHQvL0ZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIG9yIG1peCBkYWlseSBhbmQgd2Vla2x5IHdoZXJlIHRoZXJlIGFyZSBubyBnYXAgem9uZXMgKHNvIGJldHdlZW4gMSBhbmQgbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXApIC0tIHVubGVzcyB5b3UgYWRkIGluIE1heERhaWx5XG4vLyAgLy8gdGhpcyBpcyBvdmVybHkgY29tcGxpY2F0ZWQgZm9yIGRhaWx5IGNhcHMgKGFzIG9ubHkgZGVhbHMgd2l0aCB6b25lIDEgdG8geCkgYnV0IHN0aWxsIHdvcmtzLiBSRUxJRVMgT04gVEhFIEZBQ1QgREFJTFkgQUxXQVlTIFNUQVJUUyBBVCAxXG4vLyAgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMob3B0aW9ucyA9IHt9LCBzaW5nbGVGYXJlcykge1xuICBjb25zdCBtYXhEYWlseSA9IG9wdGlvbnMubWF4RGFpbHkgfHwgbnVsbDtcbiAgLy9ieSBkZWZhdWx0OiBqdXN0IG9uZSB0cmF2ZWxjYXJkICh3ZWVrbHkgd2l0aG91dCBkYWlseSBvciBqdXN0IGRhaWx5IGNhcCkgZm9yIGVpdGhlciBveXN0ZXIgb3IgY29udGFjdGxlc3MsIG9yIG95c3RlciB3aXRoIHdlZWtseSBjYXAgKGRvZXNuJ3QgY3V0IG9mZiBkYWlseSBzZWN0aW9uIG9mIHRoZSBqb3VybmV5KVxuXG5cdGxldCB7XG5cdFx0bWluU2luZ2xlLCAvL21heGltdW0gem9uZSBvZiB0aGUgc2luZ2xlIGpvdXJuZXlcblx0XHRtYXhTaW5nbGUsIC8vbWluaW11bSBzaW5nbGUgem9uZSBvZiB0aGUgam91cm5leVxuICAgIG1pblRyYXZlbGNhcmQsIC8vbWluaW11bSB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGN1cnJlbnRseSB0ZXN0aW5nXG5cdFx0bWF4VHJhdmVsY2FyZCwgLy9tYXhpbXVtIHpvbmUgb2YgdGhlIHRyYXZlbGNhcmQgY3VycmVudGx5IHRlc3Rpbmdcblx0XHQvL2lmIG1heGRhaWx5IGFsc28gaW52b2x2ZWQgKGZvciBjb250YWN0bGVzcyB3ZWVrbHkgYW5kIGRhaWx5IGNvbWJvKTogc28gdGhhdCBpdCBvbmx5IGNoYXJnZXMgdGhlIGdhcCB6b25lc1xuXHR9ID0gb3B0aW9ucztcblx0Ly9zYW1lIGFzIHZhciBtaW5TaW5nbGUgPSBvcHRpb25zLm1pblNpbmdsZTtcblxuICBsZXQgbWluQ2hhcmdlZFpvbmUgPSBtaW5TaW5nbGU7XG4gIGxldCBmaW5hbENvbmRpdGlvbiA9IG51bGw7XG5cbiAgaWYgKG1heERhaWx5KSB7IC8vIElmIGNvbnRhY3RsZXNzLCBkYWlseSBhbmQgd2Vla2x5IGNvbWJvIChoZW5jZSBhZGRpbmcgaW4gbWF4RGFpbHkgYXMgYXJndW1lbnRfXG4gIFx0aWYgKG1heERhaWx5ID49IChtaW5UcmF2ZWxjYXJkIC0gMSkpIHsgLy9pZiBubyBnYXAgem9uZXMgYmV0d2VlbiBtYXggZGFpbHkgYW5kIG1pbiB0cmF2ZWxjYXJkXG4gICAgXHRtaW5UcmF2ZWxjYXJkID0gMTsgLy9zaW5jZSBhbnl0aW1lIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMVxuICAgIFx0bWF4VHJhdmVsY2FyZCA9IG1heE51bShbbWF4RGFpbHksIG1heFRyYXZlbGNhcmRdKTsgLy9tYXggdHJhdmVsY2FyZCBpcyB3aGljaGV2ZXIgaXMgbGFyZ2VzdCBtYXggZGFpbHkgb3IgbWF4IHRyYXZlbGNhcmRcbiAgICAvL2Vsc2UgaWYgY29udGFjdGxlc3MsIGRhaWx5IGFuZCB3ZWVrbHkgY29tYm8sIGFuZCB0aGVyZSBhcmUgZ2FwIHpvbmVzIGJldHdlZW4gbWF4IGRhaWx5IGFuZCBtaW4gdHJhdmVsY2FyZCwgaGF2ZSBhIG1pbiBjaGFyZ2VkIHpvbmUgKG5vdCBjaGFyZ2UgdGhlIGRhaWx5IGNhcCAtIHRoZSBmcm9udClcblx0XHR9IGVsc2UgeyAvL0lGIGRpZmZlcmVuY2UgYncgbWluIHdlZWtseSBhbmQgbWF4IGRhaWx5IGNhcCA+IDEgLS0gVEhFTiBUSEVSRSBBUkUgR0FQIFpPTkVTXG5cdFx0XHRtaW5DaGFyZ2VkWm9uZSA9ICgobWluU2luZ2xlIDw9IG1heERhaWx5KSA/IG1heERhaWx5ICsgMSA6IG1pblNpbmdsZSk7XG5cdFx0XHRmaW5hbENvbmRpdGlvbiA9IChtaW5TaW5nbGUgPD0gbWF4RGFpbHkgJiYgbWF4U2luZ2xlIDw9IG1heERhaWx5KTtcblx0XHR9XG5cdH1cblxuXHQvL2lmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHJldHVybiBnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0cmV0dXJuIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcblxuIFx0Ly9pZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnQgYW5kIGVuZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0cmV0dXJuIHNwbGl0T3JGdWxsRmFyZShcbiAgICAgIG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcyk7XG5cblx0Ly9ib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgfHwgZmluYWxDb25kaXRpb24pIHtcbiBcdFx0cmV0dXJuIDA7XG5cbiBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fVxuICByZXR1cm4gZ2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcbiBcdCAvL0VMU0UgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiaW1wb3J0IHtcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGZsYXR0ZW4sXG5cdGdldERhaWx5Q2FwLFxuXHRnZXRTaW5nbGVGYXJlLFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuLy9OQiBXZWVrbHkgY2FwcGluZyBpcyBhbHdheXMgYW55dGltZSAmIGRhaWx5IGNhcHBpbmcgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDFcblxuZ2V0RGF0YS5zdGF0aW9ucygpLnRoZW4oZnVuY3Rpb24oc3RhdGlvbnMpIHtcblx0Z2V0U2luZ2xlSm91cm5leVpvbmVzKCcxMDAwMDI5JywgJzEwMDAxMzgnLCBzdGF0aW9ucykudGhlbigocmVzcCkgPT4ge1xuXHRcdC8vIGNvbnNvbGUubG9nKHJlc3ApO1xuXHR9KTtcbn0pO1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuICB2YXIgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcbiAgdmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2FwcztcblxuICBjb25zdCBqb3VybmV5cyA9IFtcbiAgICB7XG4gICAgICB6b25lczogWzIsIDFdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzMsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAxXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMV0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzQsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAzXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiB0cnVlLFxuICAgIH1cbiAgXTtcblxuXHQvL09ZU1RFUiBEQUlMWSBDQVBTXG5cdHZhciBveUN1bVBlYWtUb3RhbCA9IDA7XG5cdHZhciBveUN1bU9mZlRvdGFsID0gMDtcbiAgdmFyIG95Q3VtVG90YWwgPSAwO1xuXHR2YXIgbWF4Wm9uZVNvRmFyID0gbnVsbDtcblxuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblxuICAgIC8vR2V0cyB0aGUgbWF4aW11bSB6b25lcyBvZiBhbGxzIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG4gICAgbWF4Wm9uZVNvRmFyID0gbWF4TnVtKFtdLmNvbmNhdChqb3VybmV5LnpvbmVzLCBtYXhab25lU29GYXIpKTtcblxuICAgIGlmIChqb3VybmV5LnBlYWspIHtcbiAgICAgIC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG4gICAgICB2YXIgbWF4Wm9uZUFueURhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpO1xuICAgICAgdmFyIHNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leS56b25lcywgc2luZ2xlRmFyZXMpOyAvL0ZPUiBQRUFLIFBBWUcgUkFURVNcblxuICAgICAgLy9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuICAgICAgb3lDdW1QZWFrVG90YWwgKz0gc2luZ2xlO1xuICAgICAgb3lDdW1PZmZUb3RhbCArPSBzaW5nbGU7XG5cbiAgICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgICAgaWYgKG95Q3VtUGVha1RvdGFsID49IG1heFpvbmVBbnlEYWlseUNhcCkge1xuICAgICAgICBveUN1bVBlYWtUb3RhbCA9IG1heFpvbmVBbnlEYWlseUNhcDtcbiAgICAgIH1cblx0XHRcdG95Q3VtVG90YWwgKz0gbWluTnVtKFtveUN1bVBlYWtUb3RhbCwgb3lDdW1PZmZUb3RhbF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL0dldHMgdGhlIHJlbGV2YW50IGRhaWx5IGNhcCB0byB0aGF0IG1heCB6b25lICYgc2luZ2xlIGZhcmUgZm9yIHRoYXQgam91cm5leVxuICAgICAgdmFyIG1heFpvbmVPZmZEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVTb0ZhciwgZGFpbHlDYXBzKTtcbiAgICAgIHZhciBtYXhab25lQW55RGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7XG4gICAgICB2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIE9GRiBQRUFLIFBBWUcgcmF0ZXNcblxuICAgICAgLy9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuICAgICAgb3lDdW1QZWFrVG90YWwgKz0gc2luZ2xlO1xuICAgICAgb3lDdW1PZmZUb3RhbCArPSBzaW5nbGU7XG5cbiAgICAgIC8vaWYgdGhlIGRhaWx5IGNhcCBmb3IgdGhlIGN1cnJlbnQgbWF4aW11bSB6b25lIGlzIHJlYWNoZWQsIHRoZW4gdGhlIGN1bSB0b3RhbCBpcyBvdmVycmlkZW4gYnkgdGhlIHJlbGV2YW50IG1heGltdW0gem9uZSBkYWlseSBjYXAgZmFyZVxuICAgICAgaWYgKG95Q3VtUGVha1RvdGFsID49IG1heFpvbmVBbnlEYWlseUNhcCkge1xuICAgICAgICBveUN1bVBlYWtUb3RhbCA9IG1heFpvbmVBbnlEYWlseUNhcDtcbiAgICAgIH1cbiAgICAgIGlmIChveUN1bU9mZlRvdGFsID49IG1heFpvbmVPZmZEYWlseUNhcCkge1xuICAgICAgICBveUN1bU9mZlRvdGFsID0gbWF4Wm9uZU9mZkRhaWx5Q2FwOyAvL2FuZCBzZXQgYW4gYWxlcnQgdG8gc2F5IG9mZiBkYWlseSBjYXAgcmVhY2hlZD8/Pz8hISEgKGJ1dCBjb3VsZCBiZSBvdmVycmlkZGVuIGFmdGVyKVxuXHRcdFx0fVxuICAgICAgb3lDdW1Ub3RhbCArPSBtaW5OdW0oW295Q3VtUGVha1RvdGFsLCBveUN1bU9mZlRvdGFsXSk7XG5cdFx0fVxuXG5cdH0pO1xuXHQvL295Q3VtVG90YWwgaXMgdGhlIGZpbmFsIG95c3RlciBkYWlseSBmYXJlIGNhbGN1bGF0ZWQ6XG5cbi8vIE9ZU1RFUlxuICAvLyBGb3IgZGFpbHkgY2FwcGluZzogdXNlIHRoZSBmb3JtdWxhIGFib3ZlIGZvciB0aGUgZGFpbHkgY2FwcGluZy5cblx0Ly8gT3lzdGVyIGRlYWxzIHdpdGggd2hvbGUgam91cm5leXMgd2hlbiBtaXhpbmcgZGFpbHkgY2FwIGFuZCB3ZWVrbHkgLSBjdXRzIG9mZiB3ZWVrbHkgcGFydCBidXQgbm90IGRhaWx5ICYgY3VtIHRvdGFsIGNhbGNcblxuXHQvLyBGb3IgZWFjaCBwb3NzaWJsZSB3ZWVrbHkgY2FwOlxuXHQvLyBmb3IgZWFjaCBqb3VybmV5LCB1c2UgZXh0ZW5zaW9uIGZhcmVzIHRvIGNhbGN1bGF0ZSB0aGUgc2luZ2xlIGZhcmUgKG9mZiBwZWFrIG9yIG9uIHBlYWspLlxuXHQvLyBJZiBtYXggem9uZSB0cmF2ZWxsZWQgc28gZmFyIDw9IG1heCB3ZWVrbHkgY2FwICYmIG1heCB6b25lIHNvIGZhciA9PiBtaW4gd2Vla2x5IC0xICwgdGhlbiBzZXQgem9uZSBYIHRvIG1pbiB3ZWVrbHkgLSAxXG4gIC8vIC0tPiAoaWUgb25seSBjb21wYXJlcyBhZ2FpbnN0IGRhaWx5IGNhcCBvZiBtaW5TaW5nbGUgdG8gem9uZSBYIC0gcmVtb3ZlcyBvdmVybGFwIHdpdGggd2Vla2x5KVxuICAvLyAgLS0tLS0+IEVMU0UgKElGIG1heCB6b25lIHNvIGZhciA8IG1pbiB3ZWVrbHkgLSAxIG9yIG1heCB6b25lIHNvIGZhcmUgPiBtYXggd2Vla2x5KSwgc2V0IHpvbmUgWCBhcyBtYXggem9uZSBzbyBmYXJcblx0Ly8gVGhlbiB1c2Ugc2ltaWxhciB0byBkYWlseSBjYXBwaW5nOiBhZGQgdGhpcyBzaW5nbGUgZmFyZSB0byBjdW0gdG90YWwgcGVhayBvciBvZmYgcGVhaywgY29tcGFyZSB0byBkYWlseSBhbnl0aW1lIG9yIG9mZiBwZWFrIGNhcCBvZiBtYXggem9uZSBYIGFuZCBjYXAgd2hlcmUgbmVlZGVkXG5cdC8vTmVlZCBzZXQgYW4gYWxlcnQgZm9yIHdoZW4gcmVhY2ggYSBab25lcyAxLTQgb3IgWm9uZXMgMS02IGRhaWx5IGNhcCwgYnV0IG9ubHkgdHJhdmVsIGF0IG9mZi1wZWFrIHRpbWVzLlxuXG5cdC8vIFRvIGdlbmVyYXRlIHBvc3NpYmxlIHdlZWtseSBjYXBzICghIHJlbWVtYmVyIHRvIGRvIHdpdGhvdXQgYW55IHdlZWtseSBjYXBzIHRvbylcblx0Ly8gdmFyIHBvc3NXZWVrbHlDb21ib3MgPVtdO1xuXHQvLyBmb3IgKG0gPSAxLCBtIDwgNywgbSsrKSB7XG5cdC8vIFx0Zm9yICh4ID0gMiwgeCA8IDcsIHgrKykge1xuICAgLy8gICAgcG9zc1dlZWtseUNvbWJvcy5wdXNoKFttLCB4XSk7XG5cdC8vIFx0fVxuICAvLyB9O1xuXG4vLyAtIENPTlRBQ1RMRVNTIENoZWFwZXN0IEZhcmUgPSB3aXRoIGRhaWx5IGNhcHNcblx0Ly9UaGUgYXJyYXkgb2YgYWxsIGNvbWJpbmF0aW9uIHByaWNlcyB0byBiZSByZWR1Y2UgdG8gY2hlYXBlc3Qgb25lXG5cdHZhciBjb25BbGxGYXJlcyA9IFtdO1xuXG5cdC8vIGZvciB3aXRob3V0IGFueSBkYWlseSBjYXBzLCBvbmx5IHNpbmdsZXMgYWRkZWQgdG9nZXRoZXJcblx0dmFyIGNvbkZhcmVzID0gbnVsbDtcblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGNvblNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leS56b25lcywgc2luZ2xlRmFyZXMpO1xuXHRcdGNvbkZhcmVzICs9IGNvblNpbmdsZTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgdmFyIGNvbk1heFpvbmUgPSBtYXhOdW0oZmxhdHRlbihqb3VybmV5cy5tYXAoaiA9PiBqLnpvbmVzKSkpO1xuXHQgZm9yICh2YXIgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG5cdCBcdC8vY29uc29sZS5sb2coJ2ZvciBkYWlseSBjYXAgMSB0byAnICsgaSk7XG5cdCBcdHZhciBjb25DdW1Ub3RhbCA9IGdldERhaWx5Q2FwKGksIGRhaWx5Q2Fwcyk7XG5cdCBcdCBmb3IgKHZhciB4ID0gMDsgeCA8IGpvdXJuZXlzLmxlbmd0aDsgeCsrKSB7XG5cdCBcdCBcdC8vYWRkaW5nIGV4dGVuc2lvbiBmYXJlcyB0byBjdW1Ub3RhbFxuXHQgXHRcdGNvbkN1bVRvdGFsICs9IGV4dGVuc2lvbkZhcmVzKDEsIGksIGpvdXJuZXlzW3hdWzBdLCBqb3VybmV5c1t4XVsxXSwgc2luZ2xlRmFyZXMpO1xuXHQgXHQgfTtcblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS5cblx0dmFyIGNvbkZpbmFsRmFyZSA9IG1pbk51bShjb25BbGxGYXJlcyk7XG5cdC8vY29uRmluYUZhcmUgaXMgZmluYWwgY29udGFjdGxlc3MgZGFpbHkgZmFyZVxufSk7XG5cbi8vQ09OVEFDVExFU1Ncbi8vRm9yIGp1c3QgZGFpbHkgY2FwcyBPUiB3ZWVrbHkgY2FwIHdpdGhvdXQgZGFpbHkgY2FwOiB1c2UgZXh0ZW5zaW9uIGZhcmVzIHdpdGhvdXQgbWF4IGRhaWx5XG4vL0ZvciBjb21ibyBvZiBkYWlseSBjYXAgYW5kIHdlZWtseSBjYXA6IHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aCBtYXggZGFpbHkgY2FwXG4vL1xuLy8gT0ZGIFBFQUsgREFJTFkgYW5kIFdFRUtMWTogRm9yIG9mZiBwZWFrIGRhaWx5IGNhcCBjb21ib3M6IGlmIG9mZiBwZWFrLCB1c2UgZXh0ZW5zaW9uIGZhcmVzIHRvIGNhbGN1bGF0ZSB1c2luZyBib3RoIGRhaWx5IGFuZCB3ZWVrbHkgY2Fwc1xuLy8gLS0tIHdoaWxzdCBpZiBwZWFrIHRyYXZlbCB0aGVuIHVzZSBleHRlbnNpb24gZmFyZXMgd2l0aCBvbmx5IHdlZWtseSB0cmF2ZWwgY2FyZCBjYXBzIGFuZCBhZGQgdG8gdG90YWxcbi8vIEFOWVRJTUUgREFJTFkgYW5kIFdFRUtMWTogdXNlIHRoZSBleHRlbnNpb24gZmFyZSB0byBjYWxjdWxhdGUgYWxsIGZhcmVzIHdpdGggZGFpbHkgYW55dGltZSBjYXAgYW5kIHdlZWtseSBjYXAgKGN1cnJlbnQgc2V0IHVwKVxuXG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hcHAuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKFxuXHRtaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlLFxuXHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuXHRzaW5nbGVGYXJlcykge1xuXHRyZXR1cm4gbWluTnVtKFtcblx0XHRnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpLFxuXHRcdChnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKSlcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiXSwic291cmNlUm9vdCI6IiJ9