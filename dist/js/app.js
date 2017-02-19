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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(4);
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

function extensionFares(minSingle, maxSingle, //the min and max zones travelled in this single journey
minTravelcard, maxTravelcard, //min and max zones of the travelcard zones concerned
singleFares) {
  // to get from single fares json) 

  var journeyFare = null;

  //if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
  if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, minTravelcard - 1], singleFares);

    //if min single within travelcard zones but max single isnt - charge end
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);

    //if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minSingle, maxSingle, minTravelcard, maxTravelcard, singleFares);

    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    journeyFare = 0; //NEED TO ADD both min and max singles within min and max daily

    //both single zones are outside travelcard zones
  } else {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, maxSingle], singleFares);
  } //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone

  return journeyFare;
};

/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_extensionFaresGap__ = __webpack_require__(6);







//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
//NB Weekly capping is always anytime

__WEBPACK_IMPORTED_MODULE_1__utility_getData__["a" /* default */].stations().then(function (stations) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__["a" /* default */])('1000029', '1000138', stations).then(function (resp) {
				console.log(resp);
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
		console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(minmaxJourney[0], minmaxJourney[1], minmaxTravelcard[0], minmaxTravelcard[1], singleFares));

		console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__partials_extensionFaresGap__["a" /* default */])(minmaxJourney[0], minmaxJourney[1], 2, minmaxTravelcard[0], minmaxTravelcard[1], singleFares));
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

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFaresGap;




/**
 * Calculates ext fare: for CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap with gap zones
 * @function
 * @param {number} see below
 * @returns {number} - returns the extension fare
 * @description
 //THIS METHOD RELIES ON THE FACT THAT:
//- Assumes daily caps always start at zone 1 (else need min single < capped zone IFs)
 */

function extensionFaresGap(minSingle, maxSingle, //the min and max zones travelled in this single journey
maxDaily, //the max daily zone - used for calcs since with mixture weekly and daily cap, the single max zone and min charged zone is different
// (essentially cutting the start of the journey and only charging the gap zone onwards) SET AS 0 IF JUST WORKING OUT DAILY
minTravelcard, maxTravelcard, //min and max zones of the travelcard zones concerned
singleFares) {
  // to get from single fares json) 

  var journeyFare = null;

  if (minSingle <= maxDaily) {
    var minChargedZone = maxDaily + 1;
  } else {
    var minChargedZone = minSingle;
  }
  console.log('minChargedZone = ' + minChargedZone);
  //if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
  if (minSingle < minTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares);
    console.log('1');

    //if min single within travelcard zones but max single isnt - charge end
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && maxSingle > maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);
    console.log('2');
    //if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minChargedZone, maxSingle, minTravelcard, maxTravelcard, singleFares);
    console.log('3');
    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard || minSingle <= maxDaily && maxSingle <= maxDaily) {
    journeyFare = 0;
    console.log('4');
    //both single zones are outside travelcard zones
  } else {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares);
    console.log('5');
  } //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
  console.log(journeyFare);
  debugger;
  debugger;
  return journeyFare;
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQyNzU4YzU4ZjFkY2I1ZjM4N2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXNHYXAuanMiXSwibmFtZXMiOlsiZ2V0Wm9uZXMiLCJuYXBUYW4iLCJzdGF0aW9ucyIsInpvbmVzIiwiZmlsdGVyWm9uZXNCeU51bWJlciIsIm51bSIsImZpbHRlciIsInpvbmUiLCJsZW5ndGgiLCJjb21wYXJlTnVtYmVycyIsImFycmF5TnVtYmVycyIsIm9wZXJhdG9yIiwicmVkdWNlIiwiYSIsImIiLCJtYXhOdW0iLCJhcnJheVpvbmVzIiwiTWF0aCIsIm1heCIsIm1pbk51bSIsIm1pbiIsImdldERpZmZlcmVuY2UiLCJhYnMiLCJmbGF0dGVuIiwiYXJyIiwiY29uY2F0Iiwiam91cm5leVRvS2V5Iiwiam91cm5leSIsInNvcnQiLCJqb2luIiwiZ2V0RGFpbHlDYXAiLCJtYXhab25lc29mYXIiLCJkYWlseUNhcHMiLCJnZXRTaW5nbGVGYXJlIiwic2luZ2xlRmFyZXMiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImZhcmVzIiwiZXh0ZW5zaW9uRmFyZXMiLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJtaW5UcmF2ZWxjYXJkIiwibWF4VHJhdmVsY2FyZCIsImpvdXJuZXlGYXJlIiwic3BsaXRPckZ1bGxGYXJlIiwiZ2V0U2luZ2xlSm91cm5leVpvbmVzIiwiZ2V0RGF0YSIsImpvdXJuZXlzIiwibGVncyIsImFsbFpvbmVzIiwibWFwIiwibGVnIiwidGVtcFpvbmVzIiwiZGVwYXJ0dXJlUG9pbnQiLCJuYXB0YW5JZCIsInB1c2giLCJwYXRoIiwic3RvcFBvaW50cyIsImZvckVhY2giLCJzdG9wUG9pbnQiLCJpZCIsInpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIiwiem9uZXNGcm9tRHVhbFN0YXRpb25zIiwiZmluYWxNYXhab25lIiwiZmluYWxNaW5ab25lIiwic2luZ2xlTWF4Iiwic2luZ2xlTWluIiwiZHVhbFpvbmVzIiwieiIsIm1pbkNoYXJnZWRab25lIiwiZmFyZURhdGEiLCJtaW5tYXhUcmF2ZWxjYXJkIiwibWlubWF4Sm91cm5leSIsImV4dGVuc2lvbkZhcmVzR2FwIiwiZHVhbFpvbmVPdmVybGFwIiwicGVhayIsIm95Q3VtUGVha1RvdGFsIiwib3lDdW1PZmZUb3RhbCIsIm95Q3VtVG90YWwiLCJtYXhab25lU29GYXIiLCJtYXhab25lQW55RGFpbHlDYXAiLCJzaW5nbGUiLCJtYXhab25lT2ZmRGFpbHlDYXAiLCJjb25BbGxGYXJlcyIsImNvbkZhcmVzIiwiY29uU2luZ2xlIiwiY29uTWF4Wm9uZSIsImoiLCJpIiwiY29uQ3VtVG90YWwiLCJ4IiwiY29uRmluYWxGYXJlIiwibWF4RGFpbHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7Ozs7Ozs7O0FBUU8sU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQ3pDLFNBQU9BLFNBQVNELE1BQVQsRUFBaUJFLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0MsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQWtDRixLQUFsQyxFQUF5QztBQUM5QyxTQUFPQSxNQUFNRyxNQUFOLENBQWEsVUFBU0MsSUFBVCxFQUFlO0FBQ2pDLFdBQU9BLEtBQUtDLE1BQUwsS0FBZ0JILEdBQXZCO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7OztBQVNBLFNBQVNJLGNBQVQsQ0FBd0JDLFlBQXhCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUM5QyxTQUFPRCxhQUFhRSxNQUFiLENBQW9CLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3hDLFdBQU9ILFNBQVNFLENBQVQsRUFBWUMsQ0FBWixDQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRU0sU0FBU0MsTUFBVCxDQUFnQkMsVUFBaEIsRUFBNEI7QUFDakMsU0FBT1AsZUFBZU8sVUFBZixFQUEyQkMsS0FBS0MsR0FBaEMsQ0FBUDtBQUNEOztBQUVNLFNBQVNDLE1BQVQsQ0FBZ0JILFVBQWhCLEVBQTRCO0FBQ2pDLFNBQU9QLGVBQWVPLFVBQWYsRUFBMkJDLEtBQUtHLEdBQWhDLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNDLGFBQVQsQ0FBdUJSLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUNsQyxTQUFPRyxLQUFLSyxHQUFMLENBQVNULElBQUlDLENBQWIsQ0FBUDtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTUyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUMzQixTQUFPQSxJQUFJWixNQUFKLENBQVcsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDL0IsV0FBT0QsRUFBRVksTUFBRixDQUFTWCxDQUFULENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNZLFlBQVQsQ0FBc0JDLE9BQXRCLEVBQStCO0FBQ3BDLFNBQU9BLFFBQVFDLElBQVIsR0FBZUMsSUFBZixDQUFvQixHQUFwQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0MsV0FBVCxDQUFxQkMsWUFBckIsRUFBbUNDLFNBQW5DLEVBQThDO0FBQ25ELFNBQU9BLFVBQVVOLGFBQWEsQ0FBQyxDQUFELEVBQUlLLFlBQUosQ0FBYixDQUFWLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRTyxTQUFTRSxhQUFULENBQXVCTixPQUF2QixFQUFnQ08sV0FBaEMsRUFBNkM7QUFDbEQsU0FBT0EsWUFBWVIsYUFBYUMsT0FBYixDQUFaLENBQVA7QUFDRCxDOzs7Ozs7O0FDM0dEOzs7QUFHQSxJQUFJUSxnQkFBaUIsWUFBWTtBQUNoQyxLQUFJQyxPQUFPLElBQVg7O0FBRUEsUUFBTyxZQUFXO0FBQ2pCLE1BQUlBLElBQUosRUFBVTtBQUNUQyxXQUFRQyxHQUFSLENBQVkscUNBQVo7QUFDQSxVQUFPQyxRQUFRQyxPQUFSLENBQWdCSixJQUFoQixDQUFQO0FBQ0E7O0FBRUQsU0FBT0ssTUFBTSxrQkFBTixFQUEwQkMsSUFBMUIsQ0FBK0IsVUFBU0MsSUFBVCxFQUFlO0FBQ3BEUCxVQUFPTyxLQUFLQyxJQUFMLEVBQVA7QUFDQSxVQUFPUixJQUFQO0FBQ0EsR0FITSxDQUFQO0FBSUEsRUFWRDtBQVdBLENBZG9CLEVBQXJCOztBQWdCQTtBQUNBLElBQUlTLG9CQUFxQixZQUFXO0FBQ25DLEtBQUlULE9BQU8sSUFBWDs7QUFFQSxRQUFPLFlBQVc7QUFDakIsTUFBSUEsSUFBSixFQUFVO0FBQ1RDLFdBQVFDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBLFVBQU9DLFFBQVFDLE9BQVIsQ0FBZ0JKLElBQWhCLENBQVA7QUFDQTs7QUFFRCxTQUFPSyxNQUFNLHFCQUFOLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFTQyxJQUFULEVBQWU7QUFDdkRQLFVBQU9PLEtBQUtDLElBQUwsRUFBUDtBQUNBLFVBQU9SLElBQVA7QUFDQSxHQUhNLENBQVA7QUFJQSxFQVZEO0FBV0EsQ0Fkd0IsRUFBekI7O0FBZ0JBO0FBQ0EsSUFBSVUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsSUFBVCxFQUFlQyxFQUFmLEVBQW1CO0FBQ3pDLFFBQU9QLE1BQU0sbURBQW1ETSxJQUFuRCxHQUEwRCxNQUExRCxHQUFtRUMsRUFBbkUsR0FBd0UsMkRBQTlFLEVBQTJJTixJQUEzSSxDQUFnSixVQUFTTyxDQUFULEVBQVk7QUFDbEssU0FBT0EsRUFBRUwsSUFBRixFQUFQO0FBQ0EsRUFGTSxDQUFQO0FBR0EsQ0FKRDs7QUFNQSx3REFBZTtBQUNkTSxRQUFPZixhQURPO0FBRWRqQyxXQUFVMkMsaUJBRkk7QUFHZGxCLFVBQVNtQjtBQUhLLENBQWYsQzs7Ozs7Ozs7OztBQzNDQTs7QUFLQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFXZSxTQUFTSyxjQUFULENBQ2RDLFNBRGMsRUFDSEMsU0FERyxFQUNRO0FBQ3RCQyxhQUZjLEVBRUNDLGFBRkQsRUFFZ0I7QUFDOUJyQixXQUhjLEVBR0Q7QUFBRTs7QUFFZixNQUFJc0IsY0FBYyxJQUFsQjs7QUFFQTtBQUNBLE1BQUtKLFlBQVlFLGFBQWIsSUFBZ0NBLGlCQUFpQkQsU0FBakIsSUFBOEJBLGFBQWFFLGFBQS9FLEVBQStGO0FBQzlGQyxrQkFBYyw4RkFBQXZCLENBQWMsQ0FBQ21CLFNBQUQsRUFBYUUsZ0JBQWdCLENBQTdCLENBQWQsRUFBZ0RwQixXQUFoRCxDQUFkOztBQUVEO0FBQ0UsR0FKRixNQUlRLElBQUtvQixpQkFBaUJGLFNBQWpCLElBQThCQSxhQUFhRyxhQUE1QyxJQUErREYsWUFBWUUsYUFBL0UsRUFBK0Y7QUFDckdDLGtCQUFjLDhGQUFBdkIsQ0FBYyxDQUFFc0IsZ0JBQWdCLENBQWxCLEVBQXNCRixTQUF0QixDQUFkLEVBQWdEbkIsV0FBaEQsQ0FBZDs7QUFFRDtBQUNDLEdBSk0sTUFJQSxJQUFJa0IsWUFBWUUsYUFBWixJQUE2QkQsWUFBWUUsYUFBN0MsRUFBNEQ7QUFDbEVDLGtCQUFjLHdGQUFBQyxDQUNiTCxTQURhLEVBQ0ZDLFNBREUsRUFFYkMsYUFGYSxFQUVFQyxhQUZGLEVBR2JyQixXQUhhLENBQWQ7O0FBS0Y7QUFDRSxHQVBNLE1BT0EsSUFBS29CLGlCQUFpQkYsU0FBakIsSUFBOEJBLGFBQWFHLGFBQTVDLElBQStERCxpQkFBaUJELFNBQWpCLElBQThCQSxhQUFhRSxhQUE5RyxFQUE4SDtBQUNwSUMsa0JBQWMsQ0FBZCxDQURvSSxDQUNuSDs7QUFFbEI7QUFDQyxHQUpNLE1BSUE7QUFDTkEsa0JBQWMsOEZBQUF2QixDQUFjLENBQUNtQixTQUFELEVBQVlDLFNBQVosQ0FBZCxFQUFzQ25CLFdBQXRDLENBQWQ7QUFDQSxHQTFCVyxDQTBCVjs7QUFFRixTQUFPc0IsV0FBUDtBQUNELEU7Ozs7Ozs7OztBQ2xERDtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQVFlLFNBQVNFLHFCQUFULENBQStCWCxJQUEvQixFQUFxQ0MsRUFBckMsRUFBeUM5QyxRQUF6QyxFQUFtRDtBQUNqRSxRQUFPLGlFQUFBeUQsQ0FBUWhDLE9BQVIsQ0FBZ0JvQixJQUFoQixFQUFzQkMsRUFBdEIsRUFBMEJOLElBQTFCLENBQStCLFVBQVNmLE9BQVQsRUFBa0I7QUFDdkQsTUFBSUEsVUFBVUEsUUFBUWlDLFFBQVIsQ0FBaUIsQ0FBakIsQ0FBZCxDQUR1RCxDQUNwQjtBQUNuQyxNQUFJQyxPQUFPbEMsUUFBUWtDLElBQW5CLENBRnVELENBRTlCOztBQUV6QjtBQUNBLE1BQUlDLFdBQVcsd0ZBQUF2QyxDQUFRc0MsS0FBS0UsR0FBTCxDQUFTLFVBQVNDLEdBQVQsRUFBYztBQUM3QyxPQUFJQyxZQUFZLEVBQWhCOztBQUVBO0FBQ0EsT0FBSUQsSUFBSUUsY0FBSixJQUFzQkYsSUFBSUUsY0FBSixDQUFtQkMsUUFBN0MsRUFBdUQ7QUFDdERGLGNBQVVHLElBQVYsQ0FBZSx5RkFBQXBFLENBQVNnRSxJQUFJRSxjQUFKLENBQW1CQyxRQUE1QixFQUFzQ2pFLFFBQXRDLENBQWY7QUFDQTs7QUFFRDtBQUNBLE9BQUk4RCxJQUFJSyxJQUFKLENBQVNDLFVBQVQsSUFBdUJOLElBQUlLLElBQUosQ0FBU0MsVUFBVCxDQUFvQjlELE1BQXBCLEdBQTZCLENBQXhELEVBQTJEO0FBQzFEd0QsUUFBSUssSUFBSixDQUFTQyxVQUFULENBQW9CQyxPQUFwQixDQUE0QixVQUFTQyxTQUFULEVBQW9CO0FBQy9DLFNBQUlBLFVBQVVDLEVBQWQsRUFBa0I7QUFDakJSLGdCQUFVRyxJQUFWLENBQWUseUZBQUFwRSxDQUFTd0UsVUFBVUMsRUFBbkIsRUFBdUJ2RSxRQUF2QixDQUFmO0FBQ0E7QUFDRCxLQUpEO0FBS0E7O0FBRUQsVUFBTytELFNBQVA7QUFDQSxHQWxCc0IsQ0FBUixDQUFmOztBQXFCQTtBQUNBO0FBQ0EsTUFBSVMsMEJBQTBCLG9HQUFBdEUsQ0FBb0IsQ0FBcEIsRUFBdUIwRCxRQUF2QixDQUE5QjtBQUNBLE1BQUlhLHdCQUF3QixvR0FBQXZFLENBQW9CLENBQXBCLEVBQXVCMEQsUUFBdkIsQ0FBNUIsQ0E3QnVELENBNkJPO0FBQzlELE1BQUljLGVBQWUsSUFBbkI7QUFDQSxNQUFJQyxlQUFlLElBQW5COztBQUVBLE1BQUlILHdCQUF3QmxFLE1BQXhCLEtBQW1DLENBQXZDLEVBQTBDO0FBQUU7QUFDM0NvRSxrQkFBZSx1RkFBQXpELENBQU8sd0ZBQUFJLENBQVFvRCxxQkFBUixDQUFQLENBQWY7QUFDQUUsa0JBQWUsdUZBQUExRCxDQUFPLHdGQUFBSSxDQUFRb0QscUJBQVIsQ0FBUCxDQUFmO0FBQ0Q7QUFDQyxHQUpELE1BSU87QUFDTkQsNkJBQTBCLHdGQUFBbkQsQ0FBUSxvR0FBQW5CLENBQW9CLENBQXBCLEVBQXVCMEQsUUFBdkIsQ0FBUixDQUExQjs7QUFHQTtBQUNBLE9BQUlnQixZQUFZLHVGQUFBL0QsQ0FBTzJELHVCQUFQLENBQWhCO0FBQ0EsT0FBSUssWUFBWSx1RkFBQTVELENBQU91RCx1QkFBUCxDQUFoQjs7QUFFQTtBQUNBO0FBQ0EsT0FBSU0sWUFBWUwsc0JBQXNCWixHQUF0QixDQUEwQixVQUFTa0IsQ0FBVCxFQUFZO0FBQ3JELFdBQU9BLEVBQUVyRSxNQUFGLENBQVMsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDOUIsU0FBSU8sY0FBY1IsQ0FBZCxFQUFpQmtFLFNBQWpCLElBQThCMUQsY0FBY1AsQ0FBZCxFQUFpQmlFLFNBQWpCLENBQWxDLEVBQStEO0FBQzlELGFBQU9sRSxDQUFQO0FBQ0E7QUFDRCxZQUFPQyxDQUFQO0FBQ0EsS0FMTSxDQUFQO0FBTUEsSUFQZSxDQUFoQjs7QUFTQTtBQUNBOEQsa0JBQWUsdUZBQUE3RCxDQUFPLENBQUMrRCxTQUFELEVBQVlyRCxNQUFaLENBQW1CdUQsU0FBbkIsQ0FBUCxDQUFmO0FBQ0FILGtCQUFlLHVGQUFBMUQsQ0FBTyxDQUFDNEQsU0FBRCxFQUFZdEQsTUFBWixDQUFtQnVELFNBQW5CLENBQVAsQ0FBZjtBQUNBOztBQUVELFNBQU8sQ0FBQ0gsWUFBRCxFQUFlRCxZQUFmLENBQVA7QUFDQSxFQTlETSxDQUFQO0FBK0RBLEM7Ozs7Ozs7O0FDN0VEO0FBQUE7Ozs7Ozs7OztBQVNBOztBQUtlLFNBQVNuQixlQUFULENBQ2R5QixjQURjLEVBQ0U3QixTQURGLEVBRWRDLGFBRmMsRUFFQ0MsYUFGRCxFQUdkckIsV0FIYyxFQUdEO0FBQ2IsUUFBTyx1RkFBQWYsQ0FBTyxDQUNiLDhGQUFBYyxDQUFjLENBQUNpRCxjQUFELEVBQWlCN0IsU0FBakIsQ0FBZCxFQUEyQ25CLFdBQTNDLENBRGEsRUFFYiw4RkFBQUQsQ0FBYyxDQUFDaUQsY0FBRCxFQUFrQjVCLGdCQUFnQixDQUFsQyxDQUFkLEVBQXFEcEIsV0FBckQsSUFBb0UsOEZBQUFELENBQWMsQ0FBRXNCLGdCQUFnQixDQUFsQixFQUFzQkYsU0FBdEIsQ0FBZCxFQUFnRG5CLFdBQWhELENBRnZELENBQVAsQ0FBUDtBQUlBLEM7Ozs7Ozs7Ozs7Ozs7QUN0QkQ7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFBeUIsQ0FBUXpELFFBQVIsR0FBbUJ3QyxJQUFuQixDQUF3QixVQUFTeEMsUUFBVCxFQUFtQjtBQUMxQ3dELEVBQUEsdUdBQUFBLENBQXNCLFNBQXRCLEVBQWlDLFNBQWpDLEVBQTRDeEQsUUFBNUMsRUFBc0R3QyxJQUF0RCxDQUEyRCxVQUFDQyxJQUFELEVBQVU7QUFDcEVOLFlBQVFDLEdBQVIsQ0FBWUssSUFBWjtBQUNBLEdBRkQ7QUFHQSxDQUpEOztBQU1BOztBQUVBO0FBQ0E7O0FBRUEsaUVBQUFnQixDQUFRVCxLQUFSLEdBQWdCUixJQUFoQixDQUFxQixVQUFTeUMsUUFBVCxFQUFtQjtBQUN2QyxNQUFJakQsY0FBY2lELFNBQVNqRCxXQUEzQjs7QUFFQTtBQUNBLE1BQUlrRCxtQkFBbUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF2QjtBQUNBLE1BQUlDLGdCQUFnQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXBCO0FBQ0FoRCxVQUFRQyxHQUFSLENBQVksZ0dBQUFhLENBQWVrQyxjQUFjLENBQWQsQ0FBZixFQUFpQ0EsY0FBYyxDQUFkLENBQWpDLEVBQW1ERCxpQkFBaUIsQ0FBakIsQ0FBbkQsRUFBd0VBLGlCQUFpQixDQUFqQixDQUF4RSxFQUE2RmxELFdBQTdGLENBQVo7O0FBRUFHLFVBQVFDLEdBQVIsQ0FBWSxtR0FBQWdELENBQWtCRCxjQUFjLENBQWQsQ0FBbEIsRUFBb0NBLGNBQWMsQ0FBZCxDQUFwQyxFQUFzRCxDQUF0RCxFQUF5REQsaUJBQWlCLENBQWpCLENBQXpELEVBQThFQSxpQkFBaUIsQ0FBakIsQ0FBOUUsRUFBbUdsRCxXQUFuRyxDQUFaO0FBQ0Q7QUFDQyxNQUFJRixZQUFZbUQsU0FBU25ELFNBQXpCOztBQUVBLE1BQU00QixXQUFXLENBQ2hCO0FBQ0N6RCxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEUjtBQUVJb0YscUJBQWlCLEtBRnJCO0FBR0lDLFVBQU07QUFIVixHQURnQixFQU1kO0FBQ0VyRixXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0YscUJBQWlCLEtBRm5CO0FBR0VDLFVBQU07QUFIUixHQU5jLEVBV2Q7QUFDRXJGLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRixxQkFBaUIsS0FGbkI7QUFHRUMsVUFBTTtBQUhSLEdBWGMsRUFnQmQ7QUFDRXJGLFdBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQURUO0FBRUVvRixxQkFBaUIsS0FGbkI7QUFHRUMsVUFBTTtBQUhSLEdBaEJjLEVBcUJkO0FBQ0VyRixXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FEVDtBQUVFb0YscUJBQWlCLEtBRm5CO0FBR0VDLFVBQU07QUFIUixHQXJCYyxFQTBCZDtBQUNFckYsV0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBRFQ7QUFFRW9GLHFCQUFpQixLQUZuQjtBQUdFQyxVQUFNO0FBSFIsR0ExQmMsQ0FBakI7O0FBaUNBLE1BQUlDLGlCQUFpQixDQUFyQjtBQUNBLE1BQUlDLGdCQUFnQixDQUFwQjtBQUNBLE1BQUlDLGFBQWEsQ0FBakI7QUFDQSxNQUFJQyxlQUFlLElBQW5COztBQUVBaEMsV0FBU1csT0FBVCxDQUFpQixVQUFTNUMsT0FBVCxFQUFrQjs7QUFFaEM7QUFDQTtBQUNBaUUsbUJBQWUsdUZBQUE3RSxDQUFPLEdBQUdVLE1BQUgsQ0FBVUUsUUFBUXhCLEtBQWxCLEVBQXlCeUYsWUFBekIsQ0FBUCxDQUFmOztBQUVBLFFBQUlqRSxRQUFRNkQsSUFBWixFQUFrQjtBQUNoQjtBQUNBLFVBQUlLLHFCQUFxQiw0RkFBQS9ELENBQVk4RCxZQUFaLEVBQTBCNUQsU0FBMUIsQ0FBekI7QUFDQSxVQUFJOEQsU0FBUyw4RkFBQTdELENBQWNOLFFBQVF4QixLQUF0QixFQUE2QitCLFdBQTdCLENBQWIsQ0FIZ0IsQ0FHd0M7O0FBRXhEO0FBQ0F1RCx3QkFBa0JLLE1BQWxCO0FBQ0FKLHVCQUFpQkksTUFBakI7O0FBRUE7QUFDQSxVQUFJTCxrQkFBa0JJLGtCQUF0QixFQUEwQztBQUN4Q0oseUJBQWlCSSxrQkFBakI7QUFDRDtBQUNKRixvQkFBYyx1RkFBQXhFLENBQU8sQ0FBQ3NFLGNBQUQsRUFBaUJDLGFBQWpCLENBQVAsQ0FBZDtBQUNFLEtBZEQsTUFjTztBQUNMO0FBQ0EsVUFBSUsscUJBQXFCLDRGQUFBakUsQ0FBWThELFlBQVosRUFBMEI1RCxTQUExQixDQUF6QjtBQUNBLFVBQUk2RCxxQkFBcUIsNEZBQUEvRCxDQUFZOEQsWUFBWixFQUEwQjVELFNBQTFCLENBQXpCO0FBQ0EsVUFBSThELFNBQVMsOEZBQUE3RCxDQUFjTixRQUFReEIsS0FBdEIsRUFBNkIrQixXQUE3QixDQUFiLENBSkssQ0FJbUQ7O0FBRXhEO0FBQ0F1RCx3QkFBa0JLLE1BQWxCO0FBQ0FKLHVCQUFpQkksTUFBakI7O0FBRUE7QUFDQSxVQUFJTCxrQkFBa0JJLGtCQUF0QixFQUEwQztBQUN4Q0oseUJBQWlCSSxrQkFBakI7QUFDRDtBQUNELFVBQUlILGlCQUFpQkssa0JBQXJCLEVBQXlDO0FBQ3ZDTCx3QkFBZ0JLLGtCQUFoQixDQUR1QyxDQUNIO0FBQ3hDO0FBQ0VKLG9CQUFjLHVGQUFBeEUsQ0FBTyxDQUFDc0UsY0FBRCxFQUFpQkMsYUFBakIsQ0FBUCxDQUFkO0FBQ0g7QUFFRCxHQXhDRDtBQXlDQTs7QUFFRDtBQUNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0Y7QUFDQzs7QUFFRjtBQUNDO0FBQ0EsTUFBSU0sY0FBYyxFQUFsQjs7QUFFQTtBQUNBLE1BQUlDLFdBQVcsSUFBZjtBQUNBckMsV0FBU1csT0FBVCxDQUFpQixVQUFTNUMsT0FBVCxFQUFrQjtBQUNsQyxRQUFJdUUsWUFBWSw4RkFBQWpFLENBQWNOLFFBQVF4QixLQUF0QixFQUE2QitCLFdBQTdCLENBQWhCO0FBQ0ErRCxnQkFBWUMsU0FBWjtBQUNBLEdBSEQ7QUFJQUYsY0FBWTVCLElBQVosQ0FBaUI2QixRQUFqQjs7QUFFQTtBQUNDLE1BQUlFLGFBQWEsdUZBQUFwRixDQUFPLHdGQUFBUSxDQUFRcUMsU0FBU0csR0FBVCxDQUFhO0FBQUEsV0FBS3FDLEVBQUVqRyxLQUFQO0FBQUEsR0FBYixDQUFSLENBQVAsQ0FBakI7QUFDQSxPQUFLLElBQUlrRyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtGLFVBQXJCLEVBQWlDRSxHQUFqQyxFQUFzQztBQUNyQztBQUNBLFFBQUlDLGNBQWMsNEZBQUF4RSxDQUFZdUUsQ0FBWixFQUFlckUsU0FBZixDQUFsQjtBQUNDLFNBQUssSUFBSXVFLElBQUksQ0FBYixFQUFnQkEsSUFBSTNDLFNBQVNwRCxNQUE3QixFQUFxQytGLEdBQXJDLEVBQTBDO0FBQ3pDO0FBQ0RELHFCQUFlLGdHQUFBbkQsQ0FBZSxDQUFmLEVBQWtCa0QsQ0FBbEIsRUFBcUJ6QyxTQUFTMkMsQ0FBVCxFQUFZLENBQVosQ0FBckIsRUFBcUMzQyxTQUFTMkMsQ0FBVCxFQUFZLENBQVosQ0FBckMsRUFBcURyRSxXQUFyRCxDQUFmO0FBQ0M7QUFDRjhELGdCQUFZNUIsSUFBWixDQUFpQmtDLFdBQWpCO0FBQ0E7O0FBRUY7QUFDQSxNQUFJRSxlQUFlLHVGQUFBckYsQ0FBTzZFLFdBQVAsQ0FBbkI7QUFDQTtBQUNBLENBMUlEOztBQTRJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlJOzs7Ozs7Ozs7O0FDckxBOztBQUtBOztBQUVBOzs7Ozs7Ozs7O0FBV2UsU0FBU1YsaUJBQVQsQ0FDZGxDLFNBRGMsRUFDSEMsU0FERyxFQUNRO0FBQ3RCb0QsUUFGYyxFQUVMO0FBQ1Q7QUFDQW5ELGFBSmMsRUFJQ0MsYUFKRCxFQUlnQjtBQUM5QnJCLFdBTGMsRUFLRDtBQUFFOztBQUVmLE1BQUlzQixjQUFjLElBQWxCOztBQUVBLE1BQUlKLGFBQWFxRCxRQUFqQixFQUEyQjtBQUMxQixRQUFJdkIsaUJBQWlCdUIsV0FBVyxDQUFoQztBQUNBLEdBRkQsTUFFTztBQUNOLFFBQUl2QixpQkFBaUI5QixTQUFyQjtBQUNBO0FBQ0ZmLFVBQVFDLEdBQVIsQ0FBWSxzQkFBc0I0QyxjQUFsQztBQUNDO0FBQ0EsTUFBSzlCLFlBQVlFLGFBQWIsSUFBZ0NBLGlCQUFpQkQsU0FBakIsSUFBOEJBLGFBQWFFLGFBQS9FLEVBQStGO0FBQzlGQyxrQkFBYyw4RkFBQXZCLENBQWMsQ0FBQ2lELGNBQUQsRUFBa0I1QixnQkFBZ0IsQ0FBbEMsQ0FBZCxFQUFxRHBCLFdBQXJELENBQWQ7QUFDQUcsWUFBUUMsR0FBUixDQUFZLEdBQVo7O0FBRUQ7QUFDRSxHQUxGLE1BS1EsSUFBS2dCLGlCQUFpQkYsU0FBakIsSUFBOEJBLGFBQWFHLGFBQTVDLElBQStERixZQUFZRSxhQUEvRSxFQUErRjtBQUNyR0Msa0JBQWMsOEZBQUF2QixDQUFjLENBQUVzQixnQkFBZ0IsQ0FBbEIsRUFBc0JGLFNBQXRCLENBQWQsRUFBZ0RuQixXQUFoRCxDQUFkO0FBQ0NHLFlBQVFDLEdBQVIsQ0FBWSxHQUFaO0FBQ0Y7QUFDQyxHQUpNLE1BSUEsSUFBSWMsWUFBWUUsYUFBWixJQUE2QkQsWUFBWUUsYUFBN0MsRUFBNEQ7QUFDbEVDLGtCQUFjLHdGQUFBQyxDQUNieUIsY0FEYSxFQUNHN0IsU0FESCxFQUViQyxhQUZhLEVBRUVDLGFBRkYsRUFHYnJCLFdBSGEsQ0FBZDtBQUlDRyxZQUFRQyxHQUFSLENBQVksR0FBWjtBQUNIO0FBQ0UsR0FQTSxNQU9BLElBQUtnQixpQkFBaUJGLFNBQWpCLElBQThCQSxhQUFhRyxhQUE1QyxJQUErREQsaUJBQWlCRCxTQUFqQixJQUE4QkEsYUFBYUUsYUFBMUcsSUFDTkgsYUFBYXFELFFBQWIsSUFBeUJwRCxhQUFhb0QsUUFEcEMsRUFDK0M7QUFDckRqRCxrQkFBYyxDQUFkO0FBQ0NuQixZQUFRQyxHQUFSLENBQVksR0FBWjtBQUNGO0FBQ0MsR0FMTSxNQUtBO0FBQ05rQixrQkFBYyw4RkFBQXZCLENBQWMsQ0FBQ2lELGNBQUQsRUFBaUI3QixTQUFqQixDQUFkLEVBQTJDbkIsV0FBM0MsQ0FBZDtBQUNDRyxZQUFRQyxHQUFSLENBQVksR0FBWjtBQUNELEdBbkNXLENBbUNWO0FBQ0hELFVBQVFDLEdBQVIsQ0FBWWtCLFdBQVo7QUFDQTtBQUNBO0FBQ0MsU0FBT0EsV0FBUDtBQUNELEUiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRkMjc1OGM1OGYxZGNiNWYzODdjIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcykge1xuICByZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuICByZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsImltcG9ydCB7XG5cdGdldFNpbmdsZUZhcmUsXG5cdG1pbk51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBzcGxpdE9yRnVsbEZhcmUgZnJvbSAnLi9fc3BsaXRPckZ1bGxGYXJlJztcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWUgYmVsb3dcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gXHQvL0NPTlRBQ1RMRVNTIG9ubHkgdXNlcyBhZHVsdCBmYXJlc1xuXHQvL0ZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcblx0Ly9GT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyBvciBtaXggZGFpbHkgYW5kIHdlZWtseSB3aGVyZSB0aGVyZSBhcmUgbm8gZ2FwIHpvbmVzIChzbyBiZXR3ZWVuIDEgYW5kIG1heCB6b25lIG9mIGVpdGhlciBkYWlseSBvciB3ZWVrbHkgY2FwKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKFxuXHRtaW5TaW5nbGUsIG1heFNpbmdsZSwgLy90aGUgbWluIGFuZCBtYXggem9uZXMgdHJhdmVsbGVkIGluIHRoaXMgc2luZ2xlIGpvdXJuZXlcblx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCwgLy9taW4gYW5kIG1heCB6b25lcyBvZiB0aGUgdHJhdmVsY2FyZCB6b25lcyBjb25jZXJuZWRcblx0c2luZ2xlRmFyZXMpIHsgLy8gdG8gZ2V0IGZyb20gc2luZ2xlIGZhcmVzIGpzb24pIFxuXG5cdHZhciBqb3VybmV5RmFyZSA9IG51bGw7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIGlzbnQgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXMoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udFxuXHRpZiAoKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcblx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoW21pblNpbmdsZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG5cbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gc3BsaXRPckZ1bGxGYXJlKFxuIFx0XHRcdG1pblNpbmdsZSwgbWF4U2luZ2xlLFxuIFx0XHRcdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG4gXHRcdFx0c2luZ2xlRmFyZXMpO1xuXG5cdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gMDsgLy9ORUVEIFRPIEFERCBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IGRhaWx5XG5cbiBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIHtcbiBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKFttaW5TaW5nbGUsIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcbiBcdH0gLy9FTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxuXG4gXHRyZXR1cm4gam91cm5leUZhcmU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtmaW5hbE1pblpvbmUsIGZpbmFsTWF4Wm9uZV07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiLyoqXG4gKiBJZiBtaW4gc2luZ2xlIGxlc3MgdGhhbiBtaW4gdHJhdmVsY2FyZCBhbmQgbWF4IHNpbmdsZSBtb3JlIHRoYW4gbWF4IHRyYXZlbGNhcmQgLSBjYWxjdWxhdGVzIHdoaWNoZXZlciBpcyBjaGVhcGVyOlxuICogXHRlaXRoZXIgdHdvIHNwbGl0IHNpbmdsZXMgb3IgZnVsbCBmYXJlIHdpdGhvdXQgdHJhdmVsY2FyZFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IG1pbkNoYXJnZWRab25lIC0gdGhlIG1pbiB6b25lIHRoYXQgd2lsbCBjaGFyZ2UgYmV0d2VlbiB0aGlzIG1pbiBjaGFyZ2FibGUgem9uZSB0byBtaW4gdHJhdmVsY2FyZCAtIDEgKGFzIHNpbmdsZSkgYW5kICBtYXggY2hhcmdlYWJsZSB6b25lICh0byBjaGFyZ2UgYmV3ZWVuIG1heCB0cmF2ZWxjYXJkICsxIHRvIG1heCBjaGFyZ2VhYmxlIHpvbmUpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGNoZWFwZXN0IGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuICovXG5cbmltcG9ydCB7XG5cdGdldFNpbmdsZUZhcmUsXG5cdG1pbk51bSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0T3JGdWxsRmFyZShcblx0bWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZSxcblx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcblx0c2luZ2xlRmFyZXMpIHtcblx0cmV0dXJuIG1pbk51bShbXG5cdFx0Z2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKSxcblx0XHRnZXRTaW5nbGVGYXJlKFttaW5DaGFyZ2VkWm9uZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKVxuXHRdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsImltcG9ydCB7XG5cdGdldFpvbmVzLCBcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGdldERpZmZlcmVuY2UsXG5cdGZsYXR0ZW4sXG5cdGpvdXJuZXlUb0tleSxcblx0Z2V0RGFpbHlDYXAsXG5cdGdldFNpbmdsZUZhcmUsXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzR2FwIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzR2FwJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuLy9OQiBXZWVrbHkgY2FwcGluZyBpcyBhbHdheXMgYW55dGltZVxuXG5nZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG5cdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4TnVtIGFuZCBtaW5OdW0gb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cblx0Ly8gRVhBTVBMRVxuXHR2YXIgbWlubWF4VHJhdmVsY2FyZCA9IFszLCA0XTtcblx0dmFyIG1pbm1heEpvdXJuZXkgPSBbMSwgNl07XG5cdGNvbnNvbGUubG9nKGV4dGVuc2lvbkZhcmVzKG1pbm1heEpvdXJuZXlbMF0sIG1pbm1heEpvdXJuZXlbMV0sIG1pbm1heFRyYXZlbGNhcmRbMF0sIG1pbm1heFRyYXZlbGNhcmRbMV0sIHNpbmdsZUZhcmVzKSk7XG5cblx0Y29uc29sZS5sb2coZXh0ZW5zaW9uRmFyZXNHYXAobWlubWF4Sm91cm5leVswXSwgbWlubWF4Sm91cm5leVsxXSwgMiwgbWlubWF4VHJhdmVsY2FyZFswXSwgbWlubWF4VHJhdmVsY2FyZFsxXSwgc2luZ2xlRmFyZXMpKTtcbi8vIC0gT1lTVEVSIERhaWx5IENhcHNcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2FwcztcblxuXHRjb25zdCBqb3VybmV5cyA9IFtcblx0XHR7XG5cdFx0XHR6b25lczogWzIsIDFdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IHRydWUsXG5cdFx0fSxcbiAgICB7XG4gICAgICB6b25lczogWzMsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsyLCAxXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHpvbmVzOiBbMiwgMV0sXG4gICAgICBkdWFsWm9uZU92ZXJsYXA6IGZhbHNlLFxuICAgICAgcGVhazogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB6b25lczogWzQsIDJdLFxuICAgICAgZHVhbFpvbmVPdmVybGFwOiBmYWxzZSxcbiAgICAgIHBlYWs6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgem9uZXM6IFsxLCAzXSxcbiAgICAgIGR1YWxab25lT3ZlcmxhcDogZmFsc2UsXG4gICAgICBwZWFrOiB0cnVlLFxuICAgIH1cblx0XTtcblxuXHR2YXIgb3lDdW1QZWFrVG90YWwgPSAwO1xuXHR2YXIgb3lDdW1PZmZUb3RhbCA9IDA7XG5cdHZhciBveUN1bVRvdGFsID0gMDtcblx0dmFyIG1heFpvbmVTb0ZhciA9IG51bGw7XG5cblx0am91cm5leXMuZm9yRWFjaChmdW5jdGlvbihqb3VybmV5KSB7XG5cbiAgICAvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxscyB0aGUgem9uZXMgdHJhdmVsbGVkIGluIHNvIGZhclxuICAgIC8vIG1heFpvbmVTb0ZhciA9IChqb3VybmV5LnpvbmVzLm1heCA+IG1heFpvbmVTb0ZhciA/IGpvdXJuZXkuem9uZXMubWF4IDogbWF4Wm9uZVNvRmFyKTtcbiAgICBtYXhab25lU29GYXIgPSBtYXhOdW0oW10uY29uY2F0KGpvdXJuZXkuem9uZXMsIG1heFpvbmVTb0ZhcikpO1xuXG4gICAgaWYgKGpvdXJuZXkucGVhaykge1xuICAgICAgLy9HZXRzIHRoZSByZWxldmFudCBkYWlseSBjYXAgdG8gdGhhdCBtYXggem9uZSAmIHNpbmdsZSBmYXJlIGZvciB0aGF0IGpvdXJuZXlcbiAgICAgIHZhciBtYXhab25lQW55RGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lU29GYXIsIGRhaWx5Q2Fwcyk7XG4gICAgICB2YXIgc2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7IC8vRk9SIFBFQUsgUEFZRyBSQVRFU1xuXG4gICAgICAvL2FkZHMgdGhlIHNpbmdsZSBmYXJlIHRvIHRoZSBjdW11bGF0aXZlIHRvdGFsXG4gICAgICBveUN1bVBlYWtUb3RhbCArPSBzaW5nbGU7XG4gICAgICBveUN1bU9mZlRvdGFsICs9IHNpbmdsZTtcblxuICAgICAgLy9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG4gICAgICBpZiAob3lDdW1QZWFrVG90YWwgPj0gbWF4Wm9uZUFueURhaWx5Q2FwKSB7XG4gICAgICAgIG95Q3VtUGVha1RvdGFsID0gbWF4Wm9uZUFueURhaWx5Q2FwO1xuICAgICAgfVxuXHRcdFx0b3lDdW1Ub3RhbCArPSBtaW5OdW0oW295Q3VtUGVha1RvdGFsLCBveUN1bU9mZlRvdGFsXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vR2V0cyB0aGUgcmVsZXZhbnQgZGFpbHkgY2FwIHRvIHRoYXQgbWF4IHpvbmUgJiBzaW5nbGUgZmFyZSBmb3IgdGhhdCBqb3VybmV5XG4gICAgICB2YXIgbWF4Wm9uZU9mZkRhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZVNvRmFyLCBkYWlseUNhcHMpO1xuICAgICAgdmFyIG1heFpvbmVBbnlEYWlseUNhcCA9IGdldERhaWx5Q2FwKG1heFpvbmVTb0ZhciwgZGFpbHlDYXBzKTtcbiAgICAgIHZhciBzaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXkuem9uZXMsIHNpbmdsZUZhcmVzKTsgLy9GT1IgT0ZGIFBFQUsgUEFZRyByYXRlc1xuXG4gICAgICAvL2FkZHMgdGhlIHNpbmdsZSBmYXJlIHRvIHRoZSBjdW11bGF0aXZlIHRvdGFsXG4gICAgICBveUN1bVBlYWtUb3RhbCArPSBzaW5nbGU7XG4gICAgICBveUN1bU9mZlRvdGFsICs9IHNpbmdsZTtcblxuICAgICAgLy9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG4gICAgICBpZiAob3lDdW1QZWFrVG90YWwgPj0gbWF4Wm9uZUFueURhaWx5Q2FwKSB7XG4gICAgICAgIG95Q3VtUGVha1RvdGFsID0gbWF4Wm9uZUFueURhaWx5Q2FwO1xuICAgICAgfVxuICAgICAgaWYgKG95Q3VtT2ZmVG90YWwgPj0gbWF4Wm9uZU9mZkRhaWx5Q2FwKSB7XG4gICAgICAgIG95Q3VtT2ZmVG90YWwgPSBtYXhab25lT2ZmRGFpbHlDYXA7IC8vYW5kIHNldCBhbiBhbGVydCB0byBzYXkgb2ZmIGRhaWx5IGNhcCByZWFjaGVkPz8/PyEhISAoYnV0IGNvdWxkIGJlIG92ZXJyaWRkZW4gYWZ0ZXIpXG5cdFx0XHR9XG4gICAgICBveUN1bVRvdGFsICs9IG1pbk51bShbb3lDdW1QZWFrVG90YWwsIG95Q3VtT2ZmVG90YWxdKTtcblx0XHR9XG5cblx0fSk7XG5cdC8vb3lDdW1Ub3RhbCBpcyB0aGUgZmluYWwgb3lzdGVyIGRhaWx5IGZhcmUgY2FsY3VsYXRlZDpcblxuLy8gT1lTVEVSIFdFRUtMWSBDQVBcblx0Ly9BTEwgVEhFIERJRkZFUkVOVCBDT01CSU5BVElPTlMgT0YgV0VFS0xZIENBUFMgd2l0aCBleHRlbnNpb24gZmFyZXMgLS0gd2Vla2x5IGFsd2F5cyBhbnl0aW1lXG5cdC8vIE95c3RlciBkZWFscyB3aXRoIHdob2xlIGpvdXJuZXlzIHdoZW4gbWl4aW5nIGRhaWx5IGNhcCBhbmQgd2Vla2x5IC0gY3V0cyBvZmYgd2Vla2x5IHBhcnQgYnV0IG5vdCBkYWlseSAmIGN1bSB0b3RhbCBjYWxjXG5cblx0Ly8gRm9yIGVhY2ggcG9zc2libGUgd2Vla2x5IGNhcDpcblx0Ly8gZm9yIGVhY2ggam91cm5leSwgdXNlIGV4dGVuc2lvbiBmYXJlcyB0byBjYWxjdWxhdGUgdGhlIHNpbmdsZSBmYXJlIChvZmYgcGVhayBvciBvbiBwZWFrKS5cblx0Ly8gSWYgbWF4IHpvbmUgdHJhdmVsbGVkIHNvIGZhciA8PSBtYXggd2Vla2x5IGNhcCAmJiBtYXggem9uZSBzbyBmYXIgPT4gbWluIHdlZWtseSAtMSAsIHRoZW4gc2V0IHpvbmUgWCB0byBtaW4gd2Vla2x5IC0gMSAvIGVsc2UgaWYgbWF4IHpvbmUgc28gZmFyIDwgbWluIHdlZWtseSAtIDIgb3IgbWF4IHpvbmUgc28gZmFyZSA+IG1heCB3ZWVrbHksIHNldCB6b25lIFggYXMgbWF4IHpvbmUgc28gZmFyXG5cdC8vIFRoZW4gdXNlIHNpbWlsYXIgdG8gZGFpbHkgY2FwcGluZzogYWRkIHRoaXMgc2luZ2xlIGZhcmUgdG8gY3VtIHRvdGFsIHBlYWsgb3Igb2ZmIHBlYWssIGNvbXBhcmUgdG8gZGFpbHkgY2FwIG9mIG1heCB6b25lIFggYW5kIGNhcCB3aGVyZSBuZWVkZWRcblx0Ly9OZWVkIHNldCBhbiBhbGVydCBmb3Igd2hlbiByZWFjaCBhIFpvbmVzIDEtNCBvciBab25lcyAxLTYgZGFpbHkgY2FwLCBidXQgb25seSB0cmF2ZWwgYXQgb2ZmLXBlYWsgdGltZXMuXG5cblx0Ly8gVG8gZ2VuZXJhdGUgcG9zc2libGUgd2Vla2x5IGNhcHMgKCEgcmVtZW1iZXIgdG8gZG8gd2l0aG91dCBhbnkgd2Vla2x5IGNhcHMgdG9vKVxuXHQvLyB2YXIgcG9zc1dlZWtseUNvbWJvcyA9W107XG5cdC8vIGZvciAobSA9IDEsIG0gPCA3LCBtKyspIHtcblx0Ly8gXHRmb3IgKHggPSAyLCB4IDwgNywgeCsrKSB7XG4gICAvLyAgICBwb3NzV2Vla2x5Q29tYm9zLnB1c2goW20sIHhdKTtcblx0Ly8gXHR9XG4gIC8vIH07XG5cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IHdpdGggZGFpbHkgY2Fwc1xuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0dmFyIGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHR2YXIgY29uRmFyZXMgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgY29uU2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LnpvbmVzLCBzaW5nbGVGYXJlcyk7XG5cdFx0Y29uRmFyZXMgKz0gY29uU2luZ2xlO1xuXHR9KTtcblx0Y29uQWxsRmFyZXMucHVzaChjb25GYXJlcyk7XG5cblx0Ly8gXHRUaGVuIGZvciBlYWNoIFpvbmUgcmFuZ2UgKGZyb20gWm9uZSAxLTMgdW50aWwgWm9uZSAxIHRvIG1heCkgcmVwZWF0IHNhbWUgY2FsY3VsYXRpb24uXG5cdCB2YXIgY29uTWF4Wm9uZSA9IG1heE51bShmbGF0dGVuKGpvdXJuZXlzLm1hcChqID0+IGouem9uZXMpKSk7XG5cdCBmb3IgKHZhciBpID0gMjsgaSA8PSBjb25NYXhab25lOyBpKyspIHtcblx0IFx0Ly9jb25zb2xlLmxvZygnZm9yIGRhaWx5IGNhcCAxIHRvICcgKyBpKTtcblx0IFx0dmFyIGNvbkN1bVRvdGFsID0gZ2V0RGFpbHlDYXAoaSwgZGFpbHlDYXBzKTtcblx0IFx0IGZvciAodmFyIHggPSAwOyB4IDwgam91cm5leXMubGVuZ3RoOyB4KyspIHtcblx0IFx0IFx0Ly9hZGRpbmcgZXh0ZW5zaW9uIGZhcmVzIHRvIGN1bVRvdGFsXG5cdCBcdFx0Y29uQ3VtVG90YWwgKz0gZXh0ZW5zaW9uRmFyZXMoMSwgaSwgam91cm5leXNbeF1bMF0sIGpvdXJuZXlzW3hdWzFdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdCB9O1xuXHQgXHRjb25BbGxGYXJlcy5wdXNoKGNvbkN1bVRvdGFsKTtcblx0IH1cblxuXHQvLyBcdC0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLlxuXHR2YXIgY29uRmluYWxGYXJlID0gbWluTnVtKGNvbkFsbEZhcmVzKTtcblx0Ly9jb25GaW5hRmFyZSBpcyBmaW5hbCBjb250YWN0bGVzcyBkYWlseSBmYXJlXG59KTtcblxuLy9DT05UQUNUTEVTUyBXRUVLTFlcbi8vSUYgZGlmZmVyZW5jZSBiZXR3ZWVuIG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FUyBBTkQgU08gVVNFIGV4dGVuc2lvbkZhcmVzV2Vla2x5XG4vLyBvdGhlcndpc2UgdXNlIGV4dGVuc2lvbkZhcmVzIGFuZCBzZXQgbWluIHRyYXZlbGNhcmQgPSAxLCBtYXggdHJhdmVjYXJkID0gbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXAuXG5cbi8vIE9GRiBQRUFLIERBSUxZIGFuZCBXRUVLTFk6IEZvciBvZmYgcGVhayBkYWlseSBjYXAgY29tYm9zOiBpZiBvZmYgcGVhaywgdXNlIGV4dGVuc2lvbiBmYXJlcyB0byBjYWxjdWxhdGUgdXNpbmcgYm90aCBkYWlseSBhbmQgd2Vla2x5IGNhcHNcbi8vIC0tLSB3aGlsc3QgaWYgcGVhayB0cmF2ZWwgdGhlbiB1c2UgZXh0ZW5zaW9uIGZhcmVzIHdpdGggb25seSB3ZWVrbHkgdHJhdmVsIGNhcmQgY2FwcyBhbmQgYWRkIHRvIHRvdGFsXG4vLyBBTllUSU1FIERBSUxZIGFuZCBXRUVLTFk6IHVzZSB0aGUgZXh0ZW5zaW9uIGZhcmUgdG8gY2FsY3VsYXRlIGFsbCBmYXJlcyB3aXRoIGRhaWx5IGFueXRpbWUgY2FwIGFuZCB3ZWVrbHkgY2FwIChjdXJyZW50IHNldCB1cClcblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgZXh0IGZhcmU6IGZvciBDT05UQUNUTEVTUyBXRUVLTFkgQ0FQIC0gbWl4dHVyZSAgb2Ygd2Vla2x5IGNhcCBhbmQgZGFpbHkgY2FwIHdpdGggZ2FwIHpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWUgYmVsb3dcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZXh0ZW5zaW9uIGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuIC8vVEhJUyBNRVRIT0QgUkVMSUVTIE9OIFRIRSBGQUNUIFRIQVQ6XG4vLy0gQXNzdW1lcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydCBhdCB6b25lIDEgKGVsc2UgbmVlZCBtaW4gc2luZ2xlIDwgY2FwcGVkIHpvbmUgSUZzKVxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXNHYXAoXG5cdG1pblNpbmdsZSwgbWF4U2luZ2xlLCAvL3RoZSBtaW4gYW5kIG1heCB6b25lcyB0cmF2ZWxsZWQgaW4gdGhpcyBzaW5nbGUgam91cm5leVxuXHRtYXhEYWlseSwvL3RoZSBtYXggZGFpbHkgem9uZSAtIHVzZWQgZm9yIGNhbGNzIHNpbmNlIHdpdGggbWl4dHVyZSB3ZWVrbHkgYW5kIGRhaWx5IGNhcCwgdGhlIHNpbmdsZSBtYXggem9uZSBhbmQgbWluIGNoYXJnZWQgem9uZSBpcyBkaWZmZXJlbnRcblx0Ly8gKGVzc2VudGlhbGx5IGN1dHRpbmcgdGhlIHN0YXJ0IG9mIHRoZSBqb3VybmV5IGFuZCBvbmx5IGNoYXJnaW5nIHRoZSBnYXAgem9uZSBvbndhcmRzKSBTRVQgQVMgMCBJRiBKVVNUIFdPUktJTkcgT1VUIERBSUxZXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsIC8vbWluIGFuZCBtYXggem9uZXMgb2YgdGhlIHRyYXZlbGNhcmQgem9uZXMgY29uY2VybmVkXG5cdHNpbmdsZUZhcmVzKSB7IC8vIHRvIGdldCBmcm9tIHNpbmdsZSBmYXJlcyBqc29uKSBcblxuXHR2YXIgam91cm5leUZhcmUgPSBudWxsO1xuXG5cdGlmIChtaW5TaW5nbGUgPD0gbWF4RGFpbHkpIHtcblx0XHR2YXIgbWluQ2hhcmdlZFpvbmUgPSBtYXhEYWlseSArIDE7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1pbkNoYXJnZWRab25lID0gbWluU2luZ2xlO1xuXHR9XG5jb25zb2xlLmxvZygnbWluQ2hhcmdlZFpvbmUgPSAnICsgbWluQ2hhcmdlZFpvbmUpO1xuXHQvL2lmIG1pbiBzaW5nbGUgaXNudCB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWF4IHNpbmdsZSBpcyhOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250XG5cdGlmICgobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcyk7XG5cdFx0Y29uc29sZS5sb2coJzEnKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudCAtIGNoYXJnZSBlbmRcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG4gICAgY29uc29sZS5sb2coJzInKTtcbiBcdC8vaWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIChOQiBub3QgbmVlZGVkIGZvciBkYWlseSBjYXApIC0gY2hhcmdlIGZyb250IGFuZCBlbmRcbiBcdH0gZWxzZSBpZiAobWluU2luZ2xlIDwgbWluVHJhdmVsY2FyZCAmJiBtYXhTaW5nbGUgPiBtYXhUcmF2ZWxjYXJkKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gc3BsaXRPckZ1bGxGYXJlKFxuIFx0XHRcdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG4gXHRcdFx0bWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCxcbiBcdFx0XHRzaW5nbGVGYXJlcyk7XG4gICAgY29uc29sZS5sb2coJzMnKTtcblx0Ly9ib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZClcbiBcdFx0fHwgKG1pblNpbmdsZSA8PSBtYXhEYWlseSAmJiBtYXhTaW5nbGUgPD0gbWF4RGFpbHkpKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gMDtcbiAgICBjb25zb2xlLmxvZygnNCcpO1xuIFx0Ly9ib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2Uge1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG4gICAgY29uc29sZS5sb2coJzUnKTtcbiBcdH0gLy9FTFNFIG1pbiBzaW5nbGUgYW5kIG1heCBzaW5nbGUgYm90aCA+IG1heCB3ZWVrbHkgem9uZSAob3IgYm90aCA8IG1pbiBkYWlseSkgT1IgbWluIHNpbmdsZSB6b25lID4gbWluIGdhcCB6b25lICYmIG1heCBzaW5nbGUgem9uZSA8IG1heCBnYXAgem9uZVxuXHRjb25zb2xlLmxvZyhqb3VybmV5RmFyZSk7XG5cdGRlYnVnZ2VyO1xuXHRkZWJ1Z2dlcjtcbiBcdHJldHVybiBqb3VybmV5RmFyZTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlc0dhcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=