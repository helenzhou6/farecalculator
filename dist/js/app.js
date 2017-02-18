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
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* unused harmony export getDifference */
/* harmony export (immutable) */ __webpack_exports__["d"] = flatten;
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
		var allZones = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(legs.map(function (leg) {
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* filterZonesByNumber */])(1, allZones));

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])(zonesFromSingleStations);
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
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["a" /* maxNum */])([singleMax].concat(dualZones));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])([singleMin].concat(dualZones));
		}

		return {
			max: {
				zones: finalMaxZone
			},
			min: {
				zones: finalMinZone
			}
		};
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
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxSingle], singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares)]);
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






//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

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

	//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
	// what about zone 1 to zone 1 exception for off peak>?

	// - OYSTER Cheapest Fare
	var dailyCaps = fareData.dailyCaps;

	//An array of all the journeys with their max and min zones travelled
	var journeys = [[2, 1], [1, 2], [2, 1], [1, 2], [2, 4], [1, 3]];

	//cumTotal = the total that updates and becomes the final oyster fare
	var oyCumTotal = null;
	//maxZonessofar for each journey updates and is the array of all the zones travelled in so far
	var maxZonesofar = journeys[0];

	journeys.forEach(function (journey) {
		//Gets the maximum zones of all the zones travelled in so far
		maxZonesofar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(maxZonesofar, dailyCaps);
		var single = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

		//adds the single fare to the cumulative total
		oyCumTotal += single;

		//if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
		if (oyCumTotal >= maxZoneDailyCap) {
			oyCumTotal = maxZoneDailyCap;
		}
	});
	//oyCumTotal is the final oyster daily fare calculated:


	// - CONTACTLESS Cheapest Fare = with daily caps
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	journeys.forEach(function (journey) {
		var conSingle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* flatten */])(journeys));
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
	var conFinalFare = null;
	conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(conAllFares);

	//conFinalFare is final contactless daily fare
});

//CONTACTLESS WEEKLY
//IF difference between min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES AND SO USE extensionFaresWeekly
// otherwise use extensionFares and set min travelcard = 1, max travecard = max zone of either daily or weekly cap.

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjJkYmI4MjA1MGM2MjMyZmFiNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRpYWxzL19leHRlbnNpb25GYXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX3NwbGl0T3JGdWxsRmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsImdldERhaWx5Q2FwIiwibWF4Wm9uZXNvZmFyIiwiZGFpbHlDYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwiZmV0Y2hGYXJlRGF0YSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImZldGNoU3RhdGlvbnNEYXRhIiwiZmV0Y2hKb3VybmV5RGF0YSIsImZyb20iLCJ0byIsImUiLCJmYXJlcyIsImV4dGVuc2lvbkZhcmVzIiwibWluU2luZ2xlIiwibWF4U2luZ2xlIiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJqb3VybmV5RmFyZSIsInNwbGl0T3JGdWxsRmFyZSIsImdldFNpbmdsZUpvdXJuZXlab25lcyIsImdldERhdGEiLCJqb3VybmV5cyIsImxlZ3MiLCJhbGxab25lcyIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwdXNoIiwicGF0aCIsInN0b3BQb2ludHMiLCJmb3JFYWNoIiwic3RvcFBvaW50IiwiaWQiLCJ6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyIsInpvbmVzRnJvbUR1YWxTdGF0aW9ucyIsImZpbmFsTWF4Wm9uZSIsImZpbmFsTWluWm9uZSIsInNpbmdsZU1heCIsInNpbmdsZU1pbiIsImR1YWxab25lcyIsInoiLCJtaW5DaGFyZ2VkWm9uZSIsImZhcmVEYXRhIiwibWlubWF4VHJhdmVsY2FyZCIsIm1pbm1heEpvdXJuZXkiLCJveUN1bVRvdGFsIiwibWF4Wm9uZURhaWx5Q2FwIiwic2luZ2xlIiwiY29uQWxsRmFyZXMiLCJjb25GYXJlcyIsImNvblNpbmdsZSIsImNvbk1heFpvbmUiLCJpIiwiY29uQ3VtVG90YWwiLCJ4IiwiY29uRmluYWxGYXJlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7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WixDQUFyQixFQUFxQ25DLFNBQVNtQyxDQUFULEVBQVksQ0FBWixDQUFyQyxFQUFxRDdELFdBQXJELENBQWY7QUFDQztBQUNGdUQsY0FBWXJCLElBQVosQ0FBaUIwQixXQUFqQjtBQUNBOztBQUVGO0FBQ0EsS0FBSUUsZUFBZSxJQUFuQjtBQUNBQSxnQkFBZSx1RkFBQTdFLENBQU9zRSxXQUFQLENBQWY7O0FBRUE7QUFDQSxDQTdFRDs7QUErRUE7QUFDQTtBQUNBLG1IIiwiZmlsZSI6Ii4vZGlzdC9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMmRiYjgyMDUwYzYyMzJmYWI2OCIsIi8qKlxuICogR2V0cyBab25lc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFwVGFuIC0gVGhlIG5hcHRhbiBvZiB0aGUgc3RhdGlvbiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHN0YXRpb25zIHdpdGggbmFwVGFucyBhcyBrZXlzLlxuICogQHJldHVybnMge2FycmF5fVxuICogQGRlc2NyaXB0aW9uIFVzZXMgdGhlIG5hcFRhbiBJRCB0byBmaWd1cmUgb3V0IHdoYXQgem9uZSB0aGF0IHN0YXRpb24gaXMgaW4gdmlhIHN0YXRpb24uanNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Wm9uZXMobmFwVGFuLCBzdGF0aW9ucykge1xuICByZXR1cm4gc3RhdGlvbnNbbmFwVGFuXS56b25lcztcbn1cblxuLyoqXG4gKiBmaWx0ZXJzIGEgbmVzdGVkIGFycmF5IGJhc2VkIG9uIGl0cyBsZW5ndGggXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBlaXRoZXIgMSAoZm9yIHNpbmdsZSB6b25lKSBvciAyIChkdWFsIHpvbmUpXG4gKiBAcGFyYW0ge25lc3RlZCBhcnJheX0gem9uZXMgLSB0aGUgbmVzdGVkIGFycmF5IG9mIGFycmF5cyAob2Ygem9uZXMpXG4gKiBAcmV0dXJucyB7bmVzdGVkIGFycmF5fSAtIG5lc3RlZCBhcnJheSBvZiBhbGwgYXJyYXkgb2Ygem9uZXMgZnJvbSBzdGF0aW9ucyB0aGF0IG9ubHkgaGF2ZSBvbmUgem9uZSBhc3NvY2lhdGVkIHdpdGggaXQgKGlmIG51bSA9IDEpIG9yLi4uXG4gKiBAZGVzY3JpcHRpb24gLSB6b25lcyByZWZlcnMgdG8gZ2xvYmFsIGFsbFpvbmVzIC8gdXNlZCB0byBmaWx0ZXIgdGhlIHN0YXRpb24gem9uZXMgYnkgdGhlIG51bWJlciBvZiB6b25lcyBpdCBoYXMgKGR1YWwgem9uZSBvciBzaW5nbGUgem9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclpvbmVzQnlOdW1iZXIobnVtLCB6b25lcykge1xuICByZXR1cm4gem9uZXMuZmlsdGVyKGZ1bmN0aW9uKHpvbmUpIHtcbiAgICByZXR1cm4gem9uZS5sZW5ndGggPT09IG51bTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgTnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBudW1iZXJzIC0gdGhlIGFycmF5IG9mIG51bWJlcihzKVxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdG9yIC0gd2hhdCBqYXZhc2NyaXB0IG9wZXJhdG9yIHBhc3NpbmcgdGhyb3VnaCAoZS5nLiBNYXRoLm1heClcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIHNpbmdsZSBudW1iZXIgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyAocmVkdWNlcyB0byBvbmUgbnVtYmVyKVxuICogQGRlc2NyaXB0aW9uIEFzc29jaWF0ZWQgd2l0aCBtaW5OdW0gYW5kIG1heE51bTogd2hlcmUgYXJyYXlab25lcyByZWZlcnMgdG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMuXG4gTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2Ygem9uZXMgYW5kIGFwcGxpZXMgdGhlIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGFycmF5TnVtYmVycywgb3BlcmF0b3IpIHtcbiAgcmV0dXJuIGFycmF5TnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvcGVyYXRvcihhLCBiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhOdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5tYXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluTnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWluKTtcbn1cblxuLyoqXG4gKiBHZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgbnVtYmVyc1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnN9IGEsYiAtIHRoZSB0d28gbnVtYmVycyBjb21wYXJpbmcgYWdhaW5zdFxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIG51bWJlcnMgKGRpc2NhcmRpbmcgbmVnYXRpdmUgbnVtYmVycylcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlmZmVyZW5jZShhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gIC8vIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0aGF0IGlzIGFuIGFycmF5IHdpdGhpbiBhbm90aGVyIGFycmF5XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGZsYXR0ZW5zIHRoZSBhcnJheSBzbyBqdXN0IG9uZSBhcnJheVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IG9mIDIgem9uZXMgY2hyb25vbG9naWNhbGx5IGFuZCBhZGRzICctJ1xuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIG9mIHRoYXQgam91cm5leVxuICogQHJldHVybnMge3N0cmluZ30gLSAneC15J1xuICogQGRlc2NyaXB0aW9uIC0gdXNlZCB0byBnZXQgdGhlIGZhcmVzIGZyb20gdGhlIGpzb24gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gam91cm5leVRvS2V5KGpvdXJuZXkpIHtcbiAgcmV0dXJuIGpvdXJuZXkuc29ydCgpLmpvaW4oJy0nKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYWlseSBjYXAgY29zdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gLSB0aGUgKG1heGltdW0pIHpvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYWlseUNhcHMgLSBsb29rcyBhdCB0aGUgZGFpbHlDYXBzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIGRhaWx5IGNhcCBiZXR3ZWVuIHpvbmVzIDEgYW5kIHRoZSB6b25lIHBhcmFtZXRlciAoYXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnRzIGF0IHpvbmUgMSlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpIHtcbiAgcmV0dXJuIGRhaWx5Q2Fwc1tqb3VybmV5VG9LZXkoWzEsIG1heFpvbmVzb2Zhcl0pXTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzaW5nbGUgZmFyZVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBqb3VybmV5IC0gdGhlIGFycmF5IG9mIHRoZSAyIHpvbmVzIHRyYXZlbGxpbmcgYmV0d2VlblxuICogQHBhcmFtIHtvYmplY3R9IHNpbmdsZUZhcmVzIC0gbG9va3MgYXQgdGhlIHNpbmdsZUZhcmVzIG9iamVjdCBpbiB0aGUgZmFyZXMuanNvbiBmaWxlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGdldHMgdGhlIHNpbmdsZSBmYXJlIGJldHdlZW4gdGhvc2UgdHdvIHpvbmVzXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpIHtcbiAgcmV0dXJuIHNpbmdsZUZhcmVzW2pvdXJuZXlUb0tleShqb3VybmV5KV07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCIvKipcbiAqIEdldHMgZmFyZXMuanNvbiBmaWxlXG4gKi9cbnZhciBmZXRjaEZhcmVEYXRhID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvZmFyZXMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vIEdldHMgc3RhdGlvbi5qc29uIC0gbGlzdGluZyB3aGF0IHpvbmVzIGVhY2ggc3RhdGlvbiBpc1xudmFyIGZldGNoU3RhdGlvbnNEYXRhID0gKGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9zdGF0aW9ucy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy9GZXRjaGVzIHRoZSBqc29uIGZpbGUgZnJvbSBURkwgQVBJXG52YXIgZmV0Y2hKb3VybmV5RGF0YSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG5cdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBmcm9tICsgJy90by8nICsgdG8gKyAnP2FwcF9pZD04YWNkNzlhOSZhcHBfa2V5PWQ0MzNhMmQ2ZDlhOWM4ZThiMWI0YTZkZDQzNzFjNjliJykudGhlbihmdW5jdGlvbihlKSB7XG5cdFx0cmV0dXJuIGUuanNvbigpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZmFyZXM6IGZldGNoRmFyZURhdGEsXG5cdHN0YXRpb25zOiBmZXRjaFN0YXRpb25zRGF0YSxcblx0am91cm5leTogZmV0Y2hKb3VybmV5RGF0YSxcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxpdHkvX2dldERhdGEuanMiLCJpbXBvcnQge1xuXHRnZXRTaW5nbGVGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXh0ZW5zaW9uIGZhcmUgKG9yIG5vbmUpIG9mIGEgam91cm5leVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlIGJlbG93XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHJldHVybnMgdGhlIGZhcmVcbiAqIEBkZXNjcmlwdGlvblxuIFx0Ly9DT05UQUNUTEVTUyBvbmx5IHVzZXMgYWR1bHQgZmFyZXNcblx0Ly9GT1IgREFJTFkgQ0FQUzogQUxXQVlTIFNUQVJUIEFUIDEgU08gTU9TVCBPRiBUSElTIENPREUgVE9PIENPTVBMRVg6IGJ1dCB3b3VsZCBzdGlsbCB3b3JrXG5cdC8vRk9SIFdFRUtMWSBDQVBTOiB0aGlzIHdvcmtzIG91dCBmYXJlIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMgb3IgbWl4IGRhaWx5IGFuZCB3ZWVrbHkgd2hlcmUgdGhlcmUgYXJlIG5vIGdhcCB6b25lcyAoc28gYmV0d2VlbiAxIGFuZCBtYXggem9uZSBvZiBlaXRoZXIgZGFpbHkgb3Igd2Vla2x5IGNhcClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbnNpb25GYXJlcyhcblx0bWluU2luZ2xlLCBtYXhTaW5nbGUsIC8vdGhlIG1pbiBhbmQgbWF4IHpvbmVzIHRyYXZlbGxlZCBpbiB0aGlzIHNpbmdsZSBqb3VybmV5XG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsIC8vbWluIGFuZCBtYXggem9uZXMgb2YgdGhlIHRyYXZlbGNhcmQgem9uZXMgY29uY2VybmVkXG5cdHNpbmdsZUZhcmVzKSB7IC8vIHRvIGdldCBmcm9tIHNpbmdsZSBmYXJlcyBqc29uKSBcblxuXHR2YXIgam91cm5leUZhcmUgPSBudWxsO1xuXG5cdC8vaWYgbWluIHNpbmdsZSBpc250IHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzKE5CIG5vdCBuZWVkZWQgZm9yIGRhaWx5IGNhcCkgLSBjaGFyZ2UgZnJvbnRcblx0aWYgKChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG5cdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKFttaW5TaW5nbGUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQgLSBjaGFyZ2UgZW5kXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAoTkIgbm90IG5lZWRlZCBmb3IgZGFpbHkgY2FwKSAtIGNoYXJnZSBmcm9udCBhbmQgZW5kXG4gXHR9IGVsc2UgaWYgKG1pblNpbmdsZSA8IG1pblRyYXZlbGNhcmQgJiYgbWF4U2luZ2xlID4gbWF4VHJhdmVsY2FyZCkge1xuIFx0XHRqb3VybmV5RmFyZSA9IHNwbGl0T3JGdWxsRmFyZShcbiBcdFx0XHRtaW5TaW5nbGUsIG1heFNpbmdsZSxcbiBcdFx0XHRtaW5UcmF2ZWxjYXJkLCBtYXhUcmF2ZWxjYXJkLFxuIFx0XHRcdHNpbmdsZUZhcmVzKTtcblxuXHQvL2JvdGggc2luZ2xlIHpvbmVzIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHRqb3VybmV5RmFyZSA9IDA7IC8vTkVFRCBUTyBBREQgYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCBkYWlseVxuXG4gXHQvL2JvdGggc2luZ2xlIHpvbmVzIGFyZSBvdXRzaWRlIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShbbWluU2luZ2xlLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyk7XG4gXHR9IC8vRUxTRSBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcblxuIFx0cmV0dXJuIGpvdXJuZXlGYXJlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvL1RoZSBjb21wbGV0ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBnZXQgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gem9uZXMgb2YgdGhhdCBqb3VybmV5ICh0YWtpbmcgaW50byBjb25zaWRlcmF0aW9uIGR1YWwgem9uZXMpXG4vLyBzdGF0aW9ucyBpcyB0aGUgLmpzb24gZmlsZSBmcm9tIGZldGNoU3RhdGlvbnNEYXRhKCkgZnVuY3Rpb25cbi8vIE5lZWQgdG8gbWFrZSBpdCBzbyB0aGF0IGl0IGdlbmVyYXRlcyBpdCBhZnRlciBlYWNoIGpvdXJuZXlcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQge1xuXHRmbGF0dGVuLFxuXHRnZXRab25lcyxcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWluTnVtLFxuXHRtYXhOdW1cbn0gZnJvbSAnLi4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbmdsZUpvdXJuZXlab25lcyhmcm9tLCB0bywgc3RhdGlvbnMpIHtcblx0cmV0dXJuIGdldERhdGEuam91cm5leShmcm9tLCB0bykudGhlbihmdW5jdGlvbihqb3VybmV5KSB7XG5cdFx0dmFyIGpvdXJuZXkgPSBqb3VybmV5LmpvdXJuZXlzWzBdOyAvLyBzZWxlY3Rpbmcgb25seSB0aGUgZmlyc3Qgam91cm5leSBmcm9tIHRoZSBBUElcblx0XHR2YXIgbGVncyA9IGpvdXJuZXkubGVnczsgLy9UbyBsb29rIGF0IGVhY2ggbGVnIG9mIHRoZSBqb3VybmV5XG5cblx0XHQvLyBUaGUgYXJyYXkgb2Ygem9uZXMgYXNzb2NpYXRlZCB3aXRoIGFsbCBzdGF0aW9ucyBvZiB0aGF0IGpvdXJuZXlcblx0XHR2YXIgYWxsWm9uZXMgPSBmbGF0dGVuKGxlZ3MubWFwKGZ1bmN0aW9uKGxlZykge1xuXHRcdFx0dmFyIHRlbXBab25lcyA9IFtdO1xuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBkZXBhcnR1cmVQb2ludHMgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5kZXBhcnR1cmVQb2ludCAmJiBsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQpIHsgXG5cdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCwgc3RhdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgU3RvcFBvaW50IGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcucGF0aC5zdG9wUG9pbnRzICYmIGxlZy5wYXRoLnN0b3BQb2ludHMubGVuZ3RoID4gMCkgeyBcblx0XHRcdFx0bGVnLnBhdGguc3RvcFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHN0b3BQb2ludCkge1xuXHRcdFx0XHRcdGlmIChzdG9wUG9pbnQuaWQpIHtcblx0XHRcdFx0XHRcdHRlbXBab25lcy5wdXNoKGdldFpvbmVzKHN0b3BQb2ludC5pZCwgc3RhdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGVtcFpvbmVzO1xuXHRcdH0pKTtcblxuXG5cdFx0Ly9GaWx0ZXJzIGFsbCB0aGUgc3RhdGlvbnMgYW5kIHNwbGl0IHRoZW0gaW50byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyBhbmQgem9uZXNGcm9tRHVhbFN0YXRpb25zXG5cdFx0Ly8gdmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0dmFyIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcyk7XG5cdFx0dmFyIHpvbmVzRnJvbUR1YWxTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMiwgYWxsWm9uZXMpOyAvL05CIHRoaXMgaXMgYW4gYXJyYXkgd2l0aGluIGFuIGFycmF5XG5cdFx0dmFyIGZpbmFsTWF4Wm9uZSA9IG51bGw7XG5cdFx0dmFyIGZpbmFsTWluWm9uZSA9IG51bGw7XG5cblx0XHRpZiAoem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMubGVuZ3RoID09PSAwKSB7IC8vZm9yIGR1YWwgem9uZXMgdG8gZHVhbCB6b25lcyAqKkFTU1VNSU5HIENBTiBPTkxZIFRSQVZFTCBGUk9NIFRIRSBTQU1FIERVQUwgWk9ORVMgKDIvMyB0byAyLzMgYW5kIG5vdCAyLzMgdG8gMy80KSoqXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdC8vKipORUVEIFRPIEFERCBBIEZMQUcgSEVSRSB0byBzYXkgdGhhdCBpdCBpcyBkdWFsIHRvIGR1YWwgem9uZSAmIHdoYXQgem9uZXMgKHNvIHRoYXQgY2FuIG1hbmlwdWxhdGUgYW5kIHBpY2sgem9uZXMgZnJvbSBjbG9zZXN0IHRvIHdlZWtseSBjYXBwZWQgem9uZSByYXRoZXIgdGhhbiBtaW4gem9uZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0em9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHRcdFxuXG5cdFx0XHQvL0NhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIFpvbmVzIG9mIGFsbCB0aGUgem9uZXMgdGhhdCBhcmUgZnJvbSBzdGF0aW9ucyB3aXRob3V0IGFueSBkdWFsIHpvbmVzLlxuXHRcdFx0dmFyIHNpbmdsZU1heCA9IG1heE51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cdFx0XHR2YXIgc2luZ2xlTWluID0gbWluTnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblxuXHRcdFx0Ly9Gb3IgZWFjaCB6b25lc0Zyb21EdWFsU3RhdGlvbnM6IHBpY2tzIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHpvbmUgYW5kIGFwcGVuZHMgdG8gZHVhbFpvbmVzIGFycmF5IFxuXHRcdFx0Ly8gLS0+IEdvaW5nIGZyb20gMi8zIHRvIDIvMyDigJQ+IGNoYXJnZXMgc2FtZSBzaW5nbGUgMiwgMyBvciAyLTMgKDEuNzApIGJ1dCBzaG91bGQgcGljayB6b25lIGJhc2VkIG9uIHdlZWtseSAoY291bGQgYmUgMykgb3IgY2FwIChhbHdheXMgc21hbGxlc3Q6IDIpXG5cdFx0XHR2YXIgZHVhbFpvbmVzID0gem9uZXNGcm9tRHVhbFN0YXRpb25zLm1hcChmdW5jdGlvbih6KSB7XG5cdFx0XHRcdHJldHVybiB6LnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRcdFx0aWYgKGdldERpZmZlcmVuY2UoYSwgc2luZ2xlTWluKSA8IGdldERpZmZlcmVuY2UoYiwgc2luZ2xlTWluKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvL0FkZHMgZHVhbFpvbmVzIHRvIHNpbmdsZU1heCBpbnRvIGFuIGFycmF5IGFuZCBjYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiB6b25lIG9mIGJvdGhcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1heE51bShbc2luZ2xlTWF4XS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oW3NpbmdsZU1pbl0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRtYXg6IHtcblx0XHRcdFx0em9uZXM6IGZpbmFsTWF4Wm9uZSxcblx0XHRcdH0sXG5cdFx0XHRtaW46IHtcblx0XHRcdFx0em9uZXM6IGZpbmFsTWluWm9uZSxcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIi8qKlxuICogSWYgbWluIHNpbmdsZSBsZXNzIHRoYW4gbWluIHRyYXZlbGNhcmQgYW5kIG1heCBzaW5nbGUgbW9yZSB0aGFuIG1heCB0cmF2ZWxjYXJkIC0gY2FsY3VsYXRlcyB3aGljaGV2ZXIgaXMgY2hlYXBlcjpcbiAqIFx0ZWl0aGVyIHR3byBzcGxpdCBzaW5nbGVzIG9yIGZ1bGwgZmFyZSB3aXRob3V0IHRyYXZlbGNhcmRcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBtaW5DaGFyZ2VkWm9uZSAtIHRoZSBtaW4gem9uZSB0aGF0IHdpbGwgY2hhcmdlIGJldHdlZW4gdGhpcyBtaW4gY2hhcmdhYmxlIHpvbmUgdG8gbWluIHRyYXZlbGNhcmQgLSAxIChhcyBzaW5nbGUpIGFuZCAgbWF4IGNoYXJnZWFibGUgem9uZSAodG8gY2hhcmdlIGJld2VlbiBtYXggdHJhdmVsY2FyZCArMSB0byBtYXggY2hhcmdlYWJsZSB6b25lKVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBjaGVhcGVzdCBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXRTaW5nbGVGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcGxpdE9yRnVsbEZhcmUoXG5cdG1pbkNoYXJnZWRab25lLCBtYXhTaW5nbGUsXG5cdG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsXG5cdHNpbmdsZUZhcmVzKSB7XG5cdHJldHVybiBtaW5OdW0oW1xuXHRcdGdldFNpbmdsZUZhcmUoW21pbkNoYXJnZWRab25lLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcyksXG5cdFx0Z2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIChtaW5UcmF2ZWxjYXJkIC0gMSldLCBzaW5nbGVGYXJlcykgKyBnZXRTaW5nbGVGYXJlKFsobWF4VHJhdmVsY2FyZCArIDEpLCBtYXhTaW5nbGVdLCBzaW5nbGVGYXJlcylcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiLCJpbXBvcnQge1xuXHRnZXRab25lcywgXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1heE51bSxcblx0bWluTnVtLFxuXHRnZXREaWZmZXJlbmNlLFxuXHRmbGF0dGVuLFxuXHRqb3VybmV5VG9LZXksXG5cdGdldERhaWx5Q2FwLFxuXHRnZXRTaW5nbGVGYXJlLFxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG5nZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG5cdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4TnVtIGFuZCBtaW5OdW0gb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XHRcblxuXHQvLyBFWEFNUExFXG5cdHZhciBtaW5tYXhUcmF2ZWxjYXJkID0gWzMsIDRdO1xuXHR2YXIgbWlubWF4Sm91cm5leSA9IFsxLCA2XTtcblx0Y29uc29sZS5sb2coZXh0ZW5zaW9uRmFyZXMobWlubWF4Sm91cm5leVswXSwgbWlubWF4Sm91cm5leVsxXSwgbWlubWF4VHJhdmVsY2FyZFswXSwgbWlubWF4VHJhdmVsY2FyZFsxXSwgc2luZ2xlRmFyZXMpKTtcblxuLy9TSU5HTEUgRkFSRVMgTkVFRCBUTyBCRSBBTFRFUkVEIFRPIE9GRiBQRUFLIE9SIE9OIFBFQUsgJiBwcmVmZXJhYmx5IGEgY291bnRlciBvbiB3aGV0aGVyIGEgY2FwIHdhcyByZWFjaGVkXG4vLyB3aGF0IGFib3V0IHpvbmUgMSB0byB6b25lIDEgZXhjZXB0aW9uIGZvciBvZmYgcGVhaz4/XG5cbi8vIC0gT1lTVEVSIENoZWFwZXN0IEZhcmVcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2FwcztcblxuLy9BbiBhcnJheSBvZiBhbGwgdGhlIGpvdXJuZXlzIHdpdGggdGhlaXIgbWF4IGFuZCBtaW4gem9uZXMgdHJhdmVsbGVkXG5cdHZhciBqb3VybmV5cyA9IFtcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCAxXSxcblx0XHRbMSwgMl0sXG5cdFx0WzIsIDRdLFxuXHRcdFsxLCAzXSxcblx0XTtcblxuLy9jdW1Ub3RhbCA9IHRoZSB0b3RhbCB0aGF0IHVwZGF0ZXMgYW5kIGJlY29tZXMgdGhlIGZpbmFsIG95c3RlciBmYXJlXG5cdHZhciBveUN1bVRvdGFsID0gbnVsbDtcbi8vbWF4Wm9uZXNzb2ZhciBmb3IgZWFjaCBqb3VybmV5IHVwZGF0ZXMgYW5kIGlzIHRoZSBhcnJheSBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0dmFyIG1heFpvbmVzb2ZhciA9IGpvdXJuZXlzWzBdO1xuXG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdC8vR2V0cyB0aGUgbWF4aW11bSB6b25lcyBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0XHRtYXhab25lc29mYXIgPSBtYXhOdW0oam91cm5leS5jb25jYXQobWF4Wm9uZXNvZmFyKSk7XG5cblx0XHQvL0dldHMgdGhlIHJlbGV2YW50IGRhaWx5IGNhcCB0byB0aGF0IG1heCB6b25lICYgc2luZ2xlIGZhcmUgZm9yIHRoYXQgam91cm5leVxuXHRcdHZhciBtYXhab25lRGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcyk7XG5cdFx0dmFyIHNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcblx0XHQvL2FkZHMgdGhlIHNpbmdsZSBmYXJlIHRvIHRoZSBjdW11bGF0aXZlIHRvdGFsXG5cdFx0b3lDdW1Ub3RhbCArPSBzaW5nbGU7XG5cblx0XHQvL2lmIHRoZSBkYWlseSBjYXAgZm9yIHRoZSBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcblx0XHRpZiAob3lDdW1Ub3RhbCA+PSBtYXhab25lRGFpbHlDYXApIHtcblx0XHRcdG95Q3VtVG90YWwgPSBtYXhab25lRGFpbHlDYXA7XG5cdFx0fVxuXHR9KTtcblx0Ly9veUN1bVRvdGFsIGlzIHRoZSBmaW5hbCBveXN0ZXIgZGFpbHkgZmFyZSBjYWxjdWxhdGVkOlxuXG5cbi8vIC0gQ09OVEFDVExFU1MgQ2hlYXBlc3QgRmFyZSA9IHdpdGggZGFpbHkgY2Fwc1xuXHQvL1RoZSBhcnJheSBvZiBhbGwgY29tYmluYXRpb24gcHJpY2VzIHRvIGJlIHJlZHVjZSB0byBjaGVhcGVzdCBvbmVcblx0dmFyIGNvbkFsbEZhcmVzID0gW107XG5cblx0Ly8gZm9yIHdpdGhvdXQgYW55IGRhaWx5IGNhcHMsIG9ubHkgc2luZ2xlcyBhZGRlZCB0b2dldGhlclxuXHR2YXIgY29uRmFyZXMgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgY29uU2luZ2xlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cdFx0Y29uRmFyZXMgKz0gY29uU2luZ2xlO1xuXHR9KTtcblx0Y29uQWxsRmFyZXMucHVzaChjb25GYXJlcyk7XG5cblx0Ly8gXHRUaGVuIGZvciBlYWNoIFpvbmUgcmFuZ2UgKGZyb20gWm9uZSAxLTMgdW50aWwgWm9uZSAxIHRvIG1heCkgcmVwZWF0IHNhbWUgY2FsY3VsYXRpb24uXG5cdCB2YXIgY29uTWF4Wm9uZSA9IG1heE51bShmbGF0dGVuKGpvdXJuZXlzKSk7XG5cdCBmb3IgKHZhciBpID0gMjsgaSA8PSBjb25NYXhab25lOyBpKyspIHtcblx0IFx0Ly9jb25zb2xlLmxvZygnZm9yIGRhaWx5IGNhcCAxIHRvICcgKyBpKTtcblx0IFx0dmFyIGNvbkN1bVRvdGFsID0gZ2V0RGFpbHlDYXAoaSwgZGFpbHlDYXBzKTtcblx0IFx0IGZvciAodmFyIHggPSAwOyB4IDwgam91cm5leXMubGVuZ3RoOyB4KyspIHtcblx0IFx0IFx0Ly9hZGRpbmcgZXh0ZW5zaW9uIGZhcmVzIHRvIGN1bVRvdGFsXG5cdCBcdFx0Y29uQ3VtVG90YWwgKz0gZXh0ZW5zaW9uRmFyZXMoMSwgaSwgam91cm5leXNbeF1bMF0sIGpvdXJuZXlzW3hdWzFdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdCB9O1xuXHQgXHRjb25BbGxGYXJlcy5wdXNoKGNvbkN1bVRvdGFsKTtcblx0IH1cblxuXHQvLyBcdC0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLiBcblx0dmFyIGNvbkZpbmFsRmFyZSA9IG51bGw7XG5cdGNvbkZpbmFsRmFyZSA9IG1pbk51bShjb25BbGxGYXJlcyk7XG5cdFxuXHQvL2NvbkZpbmFsRmFyZSBpcyBmaW5hbCBjb250YWN0bGVzcyBkYWlseSBmYXJlXG59KTtcblxuLy9DT05UQUNUTEVTUyBXRUVLTFlcbi8vSUYgZGlmZmVyZW5jZSBiZXR3ZWVuIG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxIC0tIFRIRU4gVEhFUkUgQVJFIEdBUCBaT05FUyBBTkQgU08gVVNFIGV4dGVuc2lvbkZhcmVzV2Vla2x5XG4vLyBvdGhlcndpc2UgdXNlIGV4dGVuc2lvbkZhcmVzIGFuZCBzZXQgbWluIHRyYXZlbGNhcmQgPSAxLCBtYXggdHJhdmVjYXJkID0gbWF4IHpvbmUgb2YgZWl0aGVyIGRhaWx5IG9yIHdlZWtseSBjYXAuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=