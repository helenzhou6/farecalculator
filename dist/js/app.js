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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = getZones;
/* harmony export (immutable) */ __webpack_exports__["h"] = filterZonesByNumber;
/* harmony export (immutable) */ __webpack_exports__["a"] = maxNum;
/* harmony export (immutable) */ __webpack_exports__["e"] = minNum;
/* harmony export (immutable) */ __webpack_exports__["f"] = getDifference;
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_getData__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_getSingleJourneyZones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__ = __webpack_require__(4);






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
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(minmaxTravelcard, minmaxJourney, singleFares);

	//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
	// what about zone 1 to zone 1 exception for off peak>?

	// - OYSTER Cheapest Fare
	// fetchFareData().then(function(fareData) {
	var dailyCaps = fareData.dailyCaps;
	// var singleFares = fareData.singleFares;

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
	//This is the final oyster daily fare calculated:
	// console.log(oyCumTotal);


	// - CONTACTLESS Cheapest Fare = 
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	var conSingle = null;
	journeys.forEach(function (journey) {
		conSingle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	var conMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["a" /* maxNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["d" /* flatten */])(journeys));
	for (var i = 2; i <= conMaxZone; i++) {
		console.log('for daily cap 1 to ' + i);
		var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(i, dailyCaps);
		for (var x = 0; x < journeys.length; x++) {
			//adding extension fares to cumTotal
			conCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])([1, i], journeys[x], singleFares);
		};
		console.log(conCumTotal);

		conAllFares.push(conCumTotal);
	}

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(conAllFares);
	// console.log(conFinalFare);
});

//CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap

//THIS METHOD RELIES ON THE FACT THAT:
//- zone x to x fare is the same as zone x-1 to zone x fare
//- Assumes daily caps always start at zone 1 (else need min single < capped zone IFs)

// Most combos (without a gap between the 2 travelcards) - extension fare as just between:
//----> COULD JUST UPDATE THE MAX ZONE AND USE SAME CALULCATIONS AS DAILY??? min travel = 1
// - maximum zone of daily or travelcard cap + 1 to maximum single zone (if min single <= max zone of daily or travelcard cap & max single > max zone of daily or travelcard cap)
// - OR both within min and maxcapped = free
// - ELSE just both outside capped zones = full fare


// HOWEVER for zone 4-5 weekly and 1-2 daily: have gap of zone 3 and 6 / for zone 4-6 weekly and 1-2 daily: gap of zone 3 / if weekly 5-6 and 1-2 daily: gap 3 and 4 / weekly 5-6 and daily 1-3: gap zone 4
//IF difference between min weekly and max daily cap > 1
// then min gap zone = max daily cap +1 & max gap zone = min weekly gap - 1

//IF min single <= min gap zone && max single >= max gap zone but max single <= max weekly zone
// then charge min to max gap fare
//IF min single zone <= min gap zone && max single > max weekly zone
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare
//IF min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
// then charge single min to single max fare
//ELSE (IF both min and max singles within min and max daily / both min and max singles within min and max weekly)
// then charge 0 - should swap with above

// Remember calculate without any daily caps - should be similar to daily calculations

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
				tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* getZones */])(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function (stopPoint) {
					if (stopPoint.id) {
						tempZones.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["g" /* getZones */])(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
		var zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(1, allZones);
		var zonesFromDualStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) {
			//for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			finalMinZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["e" /* minNum */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(zonesFromDualStations));
			//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["d" /* flatten */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utility_utility__["h" /* filterZonesByNumber */])(1, allZones));

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
/* harmony export (immutable) */ __webpack_exports__["a"] = extensionFares;
/**
 * Calculates the extension fare (or none) of a journey
 * @function
 * @param {array} minmaxTravelcard - the min and max zone of the travelcard covered zones, in an array
 * @param {array} minmaxJourney - the min and max zone of the single journey, in an array
 * @returns {number} - returns the fare
 * @description
 */



function extensionFares(minmaxTravelcard, minmaxJourney, singleFares) {
  var minTravelcard = minmaxTravelcard[0];
  var maxTravelcard = minmaxTravelcard[1];
  var minSingle = minmaxJourney[0];
  var maxSingle = minmaxJourney[1];
  var journeyFare = null;

  //CONTACTLESS only uses adult fares
  //FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
  //FOR WEEKLY CAPS: this works out fare without any daily caps
  //if max single within travelcard zones but min single isnt.
  if (!(minTravelcard <= minSingle && minSingle <= maxTravelcard) && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, minTravelcard);
    var journey = [minSingle, maxSingle - (y + 1)];
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

    //if min single within travelcard zones but max single isnt.
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, maxTravelcard);
    var journey = [minSingle + (y + 1), maxSingle];
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);

    //if min single less than min travelcard and max single more than max travelcard
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    var fares = [];
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, minTravelcard);
    var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(maxSingle, maxTravelcard);
    // picks the cheapest: split singles or the full fare without travelcard == should be a global function
    var cost = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxSingle], singleFares);
    fares.push(cost);
    var journey = [minSingle, maxSingle];
    fares.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares));
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])(fares);
    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    journeyFare = 0;
    //both single zones are outside travelcard zones
  } else {
    var journey = [minSingle, maxSingle];
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])(journey, singleFares);
  }
  return journeyFare;
  //console.log(journeyFare);
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzJhMDkxMzZjNDdhY2RkMTFmMGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsImdldERhaWx5Q2FwIiwibWF4Wm9uZXNvZmFyIiwiZGFpbHlDYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwiZ2V0RGF0YSIsInRoZW4iLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJyZXNwIiwiY29uc29sZSIsImxvZyIsImZhcmVzIiwiZmFyZURhdGEiLCJtaW5tYXhUcmF2ZWxjYXJkIiwibWlubWF4Sm91cm5leSIsImV4dGVuc2lvbkZhcmVzIiwiam91cm5leXMiLCJveUN1bVRvdGFsIiwiZm9yRWFjaCIsIm1heFpvbmVEYWlseUNhcCIsInNpbmdsZSIsImNvbkFsbEZhcmVzIiwiY29uRmFyZXMiLCJjb25TaW5nbGUiLCJwdXNoIiwiY29uTWF4Wm9uZSIsImkiLCJjb25DdW1Ub3RhbCIsIngiLCJjb25GaW5hbEZhcmUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImxlZ3MiLCJhbGxab25lcyIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwYXRoIiwic3RvcFBvaW50cyIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6IiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJqb3VybmV5RmFyZSIsInkiLCJjb3N0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUFBOzs7Ozs7OztBQVFPLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFv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MkQsU0FBRCxFQUFhRixnQkFBZ0IsQ0FBN0IsQ0FBZCxFQUFnRHhELFdBQWhELElBQStELDhGQUFBRCxDQUFjLENBQUUwRCxnQkFBZ0IsQ0FBbEIsRUFBc0JFLFNBQXRCLENBQWQsRUFBZ0QzRCxXQUFoRCxDQUExRTtBQUNBTyxVQUFNYSxJQUFOLENBQVcwQyxJQUFYO0FBQ0QsUUFBSXJFLFVBQVUsQ0FBQ2lFLFNBQUQsRUFBWUMsU0FBWixDQUFkO0FBQ0FwRCxVQUFNYSxJQUFOLENBQVcsOEZBQUFyQixDQUFjTixPQUFkLEVBQXVCTyxXQUF2QixDQUFYO0FBQ0E0RCxrQkFBYyx1RkFBQTNFLENBQU9zQixLQUFQLENBQWQ7QUFDRDtBQUNFLEdBWE0sTUFXQSxJQUFLaUQsaUJBQWlCRSxTQUFqQixJQUE4QkEsYUFBYUQsYUFBNUMsSUFBK0RELGlCQUFpQkcsU0FBakIsSUFBOEJBLGFBQWFGLGFBQTlHLEVBQThIO0FBQ3BJRyxrQkFBYyxDQUFkO0FBQ0Q7QUFDQyxHQUhNLE1BR0E7QUFDTixRQUFJbkUsVUFBVSxDQUFDaUUsU0FBRCxFQUFZQyxTQUFaLENBQWQ7QUFDQUMsa0JBQWMsOEZBQUE3RCxDQUFjTixPQUFkLEVBQXVCTyxXQUF2QixDQUFkO0FBQ0E7QUFDRCxTQUFPNEQsV0FBUDtBQUNBO0FBQ0QsRSIsImZpbGUiOiIuL2Rpc3QvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzJhMDkxMzZjNDdhY2RkMTFmMGMiLCIvKipcbiAqIEdldHMgWm9uZXNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hcFRhbiAtIFRoZSBuYXB0YW4gb2YgdGhlIHN0YXRpb24gd2UncmUgbG9va2luZyBmb3IuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyBzdGF0aW9ucyB3aXRoIG5hcFRhbnMgYXMga2V5cy5cbiAqIEByZXR1cm5zIHthcnJheX1cbiAqIEBkZXNjcmlwdGlvbiBVc2VzIHRoZSBuYXBUYW4gSUQgdG8gZmlndXJlIG91dCB3aGF0IHpvbmUgdGhhdCBzdGF0aW9uIGlzIGluIHZpYSBzdGF0aW9uLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFpvbmVzKG5hcFRhbiwgc3RhdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXRpb25zW25hcFRhbl0uem9uZXM7XG59XG5cbi8qKlxuICogZmlsdGVycyBhIG5lc3RlZCBhcnJheSBiYXNlZCBvbiBpdHMgbGVuZ3RoIFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gZWl0aGVyIDEgKGZvciBzaW5nbGUgem9uZSkgb3IgMiAoZHVhbCB6b25lKVxuICogQHBhcmFtIHtuZXN0ZWQgYXJyYXl9IHpvbmVzIC0gdGhlIG5lc3RlZCBhcnJheSBvZiBhcnJheXMgKG9mIHpvbmVzKVxuICogQHJldHVybnMge25lc3RlZCBhcnJheX0gLSBuZXN0ZWQgYXJyYXkgb2YgYWxsIGFycmF5IG9mIHpvbmVzIGZyb20gc3RhdGlvbnMgdGhhdCBvbmx5IGhhdmUgb25lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIGl0IChpZiBudW0gPSAxKSBvci4uLlxuICogQGRlc2NyaXB0aW9uIC0gem9uZXMgcmVmZXJzIHRvIGdsb2JhbCBhbGxab25lcyAvIHVzZWQgdG8gZmlsdGVyIHRoZSBzdGF0aW9uIHpvbmVzIGJ5IHRoZSBudW1iZXIgb2Ygem9uZXMgaXQgaGFzIChkdWFsIHpvbmUgb3Igc2luZ2xlIHpvbmUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJab25lc0J5TnVtYmVyKG51bSwgem9uZXMpIHtcbiAgcmV0dXJuIHpvbmVzLmZpbHRlcihmdW5jdGlvbih6b25lKSB7XG4gICAgcmV0dXJuIHpvbmUubGVuZ3RoID09PSBudW07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIE51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbnVtYmVycyAtIHRoZSBhcnJheSBvZiBudW1iZXIocylcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcGVyYXRvciAtIHdoYXQgamF2YXNjcmlwdCBvcGVyYXRvciBwYXNzaW5nIHRocm91Z2ggKGUuZy4gTWF0aC5tYXgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBzaW5nbGUgbnVtYmVyIGFmdGVyIGFsbCBjYWxjdWxhdGlvbnMgKHJlZHVjZXMgdG8gb25lIG51bWJlcilcbiAqIEBkZXNjcmlwdGlvbiBBc3NvY2lhdGVkIHdpdGggbWluTnVtIGFuZCBtYXhOdW06IHdoZXJlIGFycmF5Wm9uZXMgcmVmZXJzIHRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLlxuIExvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIHpvbmVzIGFuZCBhcHBsaWVzIHRoZSBvcGVyYXRvclxuICovXG5mdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhcnJheU51bWJlcnMsIG9wZXJhdG9yKSB7XG4gIHJldHVybiBhcnJheU51bWJlcnMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gb3BlcmF0b3IoYSwgYik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtKGFycmF5Wm9uZXMpIHtcbiAgcmV0dXJuIGNvbXBhcmVOdW1iZXJzKGFycmF5Wm9uZXMsIE1hdGgubWF4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1pbik7XG59XG5cbi8qKlxuICogR2V0IGRpZmZlcmVuY2UgYmV0d2VlbiAyIG51bWJlcnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJzfSBhLGIgLSB0aGUgdHdvIG51bWJlcnMgY29tcGFyaW5nIGFnYWluc3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgMiBudW1iZXJzIChkaXNjYXJkaW5nIG5lZ2F0aXZlIG51bWJlcnMpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpZmZlcmVuY2UoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpO1xuICAvLyByZXR1cm4gYSAtIGI7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgdGhhdCBpcyBhbiBhcnJheSB3aXRoaW4gYW5vdGhlciBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSBmbGF0dGVucyB0aGUgYXJyYXkgc28ganVzdCBvbmUgYXJyYXlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgfSk7XG59XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBvZiAyIHpvbmVzIGNocm9ub2xvZ2ljYWxseSBhbmQgYWRkcyAnLSdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyBvZiB0aGF0IGpvdXJuZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3gteSdcbiAqIEBkZXNjcmlwdGlvbiAtIHVzZWQgdG8gZ2V0IHRoZSBmYXJlcyBmcm9tIHRoZSBqc29uIGZpbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvdXJuZXlUb0tleShqb3VybmV5KSB7XG4gIHJldHVybiBqb3VybmV5LnNvcnQoKS5qb2luKCctJyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGFpbHkgY2FwIGNvc3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IC0gdGhlIChtYXhpbXVtKSB6b25lXG4gKiBAcGFyYW0ge29iamVjdH0gZGFpbHlDYXBzIC0gbG9va3MgYXQgdGhlIGRhaWx5Q2FwcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBkYWlseSBjYXAgYmV0d2VlbiB6b25lcyAxIGFuZCB0aGUgem9uZSBwYXJhbWV0ZXIgKGFzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0cyBhdCB6b25lIDEpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Q2FwKG1heFpvbmVzb2ZhciwgZGFpbHlDYXBzKSB7XG4gIHJldHVybiBkYWlseUNhcHNbam91cm5leVRvS2V5KFsxLCBtYXhab25lc29mYXJdKV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2luZ2xlIGZhcmVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gam91cm5leSAtIHRoZSBhcnJheSBvZiB0aGUgMiB6b25lcyB0cmF2ZWxsaW5nIGJldHdlZW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzaW5nbGVGYXJlcyAtIGxvb2tzIGF0IHRoZSBzaW5nbGVGYXJlcyBvYmplY3QgaW4gdGhlIGZhcmVzLmpzb24gZmlsZVxuICogQHJldHVybnMge251bWJlcn0gLSBnZXRzIHRoZSBzaW5nbGUgZmFyZSBiZXR3ZWVuIHRob3NlIHR3byB6b25lc1xuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSB7XG4gIHJldHVybiBzaW5nbGVGYXJlc1tqb3VybmV5VG9LZXkoam91cm5leSldO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L191dGlsaXR5LmpzIiwiaW1wb3J0IHtcblx0Z2V0Wm9uZXMsIFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtYXhOdW0sXG5cdG1pbk51bSxcblx0Z2V0RGlmZmVyZW5jZSxcblx0ZmxhdHRlbixcblx0am91cm5leVRvS2V5LFxuXHRnZXREYWlseUNhcCxcblx0Z2V0U2luZ2xlRmFyZVxufSBmcm9tICcuL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IGdldFNpbmdsZUpvdXJuZXlab25lcyBmcm9tICcuL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMnO1xuaW1wb3J0IGV4dGVuc2lvbkZhcmVzIGZyb20gJy4vcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzJztcblxuLy9UTyBET1xuLy9PZmYgcGVhayB2cyBvbiBwZWFrIHNpbmdsZXMgKGVzcCBpbmNsdWRpbmcgb3V0IG9mIHpvbmUgMSB0byB6b25lIDEgaW4gZXZlbmluZyBpcyBvZmZwZWFrIGV4Y2VwdGlvbilcbi8vT2ZmcGVhayBkYWlseSBjYXAgZGlzY291bnRzIC0ga2VlcCB0cmFjayB3aGVuIGRhaWx5IGNhcCByZWFjaGVkIGJ1dCBvbmx5IHRyYXZlbGxlZCBvZmYgcGVhayAoaWYgZ29pbmcgdG8gZG8gb2ZmIHBlYWsgb3lzdGVyIGN1bSB0b3RhbHMgdGhlbiB3b3VsZCBrbm93IHRoaXMpXG4vL3Bvc3NpYmlsaXR5IG9mIGFsdGVyaW5nIG95c3RlciBzbyByZWZsZWN0cyBvZmYgcGVhayAtLSB0aGVuIGNvdWxkIGFkZCAgdGhlIFJhaWxjYXJkIG9yIEdvbGQgY2FyZCBkaXNjb3VudCB0byB5b3VyIE95c3RlciBhbmQgMS04ICB6b25lcyBvciB0byA5IHdpdGhvdXQgd2F0Zm9yZFxuLy9DQU4gRE8gQVBQUkVOVElDRSwgMTgrIFNUVURFTlQsIDE2KyBaSVAsIEpPQiBDRU5UUkUgT04gT1lTVEVSIC0gYXMgbm8gZGlmZiBidyBvZmYgcGVhayAvIG9uIHBlYWsgZGFpbHkgY2Fwc1xuXG5nZXREYXRhLnN0YXRpb25zKCkudGhlbihmdW5jdGlvbihzdGF0aW9ucykge1xuXHRnZXRTaW5nbGVKb3VybmV5Wm9uZXMoJzEwMDAwMjknLCAnMTAwMDEzOCcsIHN0YXRpb25zKS50aGVuKChyZXNwKSA9PiB7XG5cdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdH0pO1xufSk7XG5cbi8vIEZvcm11bGF0ZSBhcnJheT8gSm91cm5leSAxIG9iamVjdDogd2l0aCB6b25lcyB0cmF2ZWxsZWQgKGFycmF5OiBtaW4gYW5kIG1heCksIHRpbWUsIG9mZi1wZWFrIG9yIG9uLXBlYWssIHNpbmdsZSBwcmljZSwgZmxhZyBmb3IgZHVhbCB0byBkdWFsIChhbmQgd2hhdCB6b25lcykuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdsb2JhbCBmdW5jdGlvbnMgPiBjb21wYXJlTnVtYmVycyAoY2FuIHJlZHVjZSB0byB0aGUgbWF4TnVtIGFuZCBtaW5OdW0gb2YgYW4gYXJyYXkpICYgZ2V0RGlmZmVyZW5jZSBidyAyIG51bWJlcnNcblxuZ2V0RGF0YS5mYXJlcygpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XHRcblxuXG5cblxuXHQvLyBFWEFNUExFXG5cdHZhciBtaW5tYXhUcmF2ZWxjYXJkID0gWzMsIDRdO1xuXHR2YXIgbWlubWF4Sm91cm5leSA9IFsxLCA2XTtcblx0ZXh0ZW5zaW9uRmFyZXMobWlubWF4VHJhdmVsY2FyZCwgbWlubWF4Sm91cm5leSwgc2luZ2xlRmFyZXMpO1xuXG5cblxuXG5cbi8vU0lOR0xFIEZBUkVTIE5FRUQgVE8gQkUgQUxURVJFRCBUTyBPRkYgUEVBSyBPUiBPTiBQRUFLICYgcHJlZmVyYWJseSBhIGNvdW50ZXIgb24gd2hldGhlciBhIGNhcCB3YXMgcmVhY2hlZFxuLy8gd2hhdCBhYm91dCB6b25lIDEgdG8gem9uZSAxIGV4Y2VwdGlvbiBmb3Igb2ZmIHBlYWs+P1xuXG4vLyAtIE9ZU1RFUiBDaGVhcGVzdCBGYXJlXG4vLyBmZXRjaEZhcmVEYXRhKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuXHR2YXIgZGFpbHlDYXBzID0gZmFyZURhdGEuZGFpbHlDYXBzO1xuXHQvLyB2YXIgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcblxuLy9BbiBhcnJheSBvZiBhbGwgdGhlIGpvdXJuZXlzIHdpdGggdGhlaXIgbWF4IGFuZCBtaW4gem9uZXMgdHJhdmVsbGVkXG5cdHZhciBqb3VybmV5cyA9IFtcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCAxXSxcblx0XHRbMSwgMl0sXG5cdFx0WzIsIDRdLFxuXHRcdFsxLCAzXSxcblx0XTtcblxuLy9jdW1Ub3RhbCA9IHRoZSB0b3RhbCB0aGF0IHVwZGF0ZXMgYW5kIGJlY29tZXMgdGhlIGZpbmFsIG95c3RlciBmYXJlXG5cdHZhciBveUN1bVRvdGFsID0gbnVsbDtcbi8vbWF4Wm9uZXNzb2ZhciBmb3IgZWFjaCBqb3VybmV5IHVwZGF0ZXMgYW5kIGlzIHRoZSBhcnJheSBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0dmFyIG1heFpvbmVzb2ZhciA9IGpvdXJuZXlzWzBdO1xuXG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdC8vR2V0cyB0aGUgbWF4aW11bSB6b25lcyBvZiBhbGwgdGhlIHpvbmVzIHRyYXZlbGxlZCBpbiBzbyBmYXJcblx0XHRtYXhab25lc29mYXIgPSBtYXhOdW0oam91cm5leS5jb25jYXQobWF4Wm9uZXNvZmFyKSk7XG5cblx0XHQvL0dldHMgdGhlIHJlbGV2YW50IGRhaWx5IGNhcCB0byB0aGF0IG1heCB6b25lICYgc2luZ2xlIGZhcmUgZm9yIHRoYXQgam91cm5leVxuXHRcdHZhciBtYXhab25lRGFpbHlDYXAgPSBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcyk7XG5cdFx0dmFyIHNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcblx0XHQvL2FkZHMgdGhlIHNpbmdsZSBmYXJlIHRvIHRoZSBjdW11bGF0aXZlIHRvdGFsXG5cdFx0b3lDdW1Ub3RhbCArPSBzaW5nbGU7XG5cblx0XHQvL2lmIHRoZSBkYWlseSBjYXAgZm9yIHRoZSBjdXJyZW50IG1heGltdW0gem9uZSBpcyByZWFjaGVkLCB0aGVuIHRoZSBjdW0gdG90YWwgaXMgb3ZlcnJpZGVuIGJ5IHRoZSByZWxldmFudCBtYXhpbXVtIHpvbmUgZGFpbHkgY2FwIGZhcmVcblx0XHRpZiAob3lDdW1Ub3RhbCA+PSBtYXhab25lRGFpbHlDYXApIHtcblx0XHRcdG95Q3VtVG90YWwgPSBtYXhab25lRGFpbHlDYXA7XG5cdFx0fVxuXHR9KTtcblx0Ly9UaGlzIGlzIHRoZSBmaW5hbCBveXN0ZXIgZGFpbHkgZmFyZSBjYWxjdWxhdGVkOlxuXHQvLyBjb25zb2xlLmxvZyhveUN1bVRvdGFsKTtcblxuXG4vLyAtIENPTlRBQ1RMRVNTIENoZWFwZXN0IEZhcmUgPSBcblx0Ly9UaGUgYXJyYXkgb2YgYWxsIGNvbWJpbmF0aW9uIHByaWNlcyB0byBiZSByZWR1Y2UgdG8gY2hlYXBlc3Qgb25lXG5cdHZhciBjb25BbGxGYXJlcyA9IFtdO1xuXG5cdC8vIGZvciB3aXRob3V0IGFueSBkYWlseSBjYXBzLCBvbmx5IHNpbmdsZXMgYWRkZWQgdG9nZXRoZXJcblx0dmFyIGNvbkZhcmVzID0gbnVsbDtcblx0dmFyIGNvblNpbmdsZSA9IG51bGw7XG5cdGpvdXJuZXlzLmZvckVhY2goZnVuY3Rpb24oam91cm5leSkge1xuXHRcdGNvblNpbmdsZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXHRcdGNvbkZhcmVzICs9IGNvblNpbmdsZTtcblx0fSk7XG5cdGNvbkFsbEZhcmVzLnB1c2goY29uRmFyZXMpO1xuXG5cdC8vIFx0VGhlbiBmb3IgZWFjaCBab25lIHJhbmdlIChmcm9tIFpvbmUgMS0zIHVudGlsIFpvbmUgMSB0byBtYXgpIHJlcGVhdCBzYW1lIGNhbGN1bGF0aW9uLlxuXHQgdmFyIGNvbk1heFpvbmUgPSBtYXhOdW0oZmxhdHRlbihqb3VybmV5cykpO1xuXHQgZm9yICh2YXIgaSA9IDI7IGkgPD0gY29uTWF4Wm9uZTsgaSsrKSB7XG5cdCBcdGNvbnNvbGUubG9nKCdmb3IgZGFpbHkgY2FwIDEgdG8gJyArIGkpO1xuXHQgXHR2YXIgY29uQ3VtVG90YWwgPSBnZXREYWlseUNhcChpLCBkYWlseUNhcHMpO1xuXHQgXHQgZm9yICh2YXIgeCA9IDA7IHggPCBqb3VybmV5cy5sZW5ndGg7IHgrKykge1xuXHQgXHQgXHQvL2FkZGluZyBleHRlbnNpb24gZmFyZXMgdG8gY3VtVG90YWxcblx0IFx0XHRjb25DdW1Ub3RhbCArPSBleHRlbnNpb25GYXJlcyhbMSwgaV0sIGpvdXJuZXlzW3hdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdCB9O1xuXHQgXHRjb25zb2xlLmxvZyhjb25DdW1Ub3RhbCk7XG5cblx0IFx0Y29uQWxsRmFyZXMucHVzaChjb25DdW1Ub3RhbCk7XG5cdCB9XG5cblx0Ly8gXHQtLS0+IENvbXBhcmUgYWxsIHRoZSBwb3NzaWJpbGl0aWVzIGFuZCBzZWxlY3QgdGhlIGNoZWFwZXN0IChpbmNsdWRpbmcgdG90YWwgc2luZ2xlKS4gXG5cdHZhciBjb25GaW5hbEZhcmUgPSBudWxsO1xuXHRjb25GaW5hbEZhcmUgPSBtaW5OdW0oY29uQWxsRmFyZXMpO1xuXHQvLyBjb25zb2xlLmxvZyhjb25GaW5hbEZhcmUpO1xufSk7XG5cbi8vQ09OVEFDVExFU1MgV0VFS0xZIENBUCAtIG1peHR1cmUgIG9mIHdlZWtseSBjYXAgYW5kIGRhaWx5IGNhcFxuXG4vL1RISVMgTUVUSE9EIFJFTElFUyBPTiBUSEUgRkFDVCBUSEFUOlxuLy8tIHpvbmUgeCB0byB4IGZhcmUgaXMgdGhlIHNhbWUgYXMgem9uZSB4LTEgdG8gem9uZSB4IGZhcmVcbi8vLSBBc3N1bWVzIGRhaWx5IGNhcHMgYWx3YXlzIHN0YXJ0IGF0IHpvbmUgMSAoZWxzZSBuZWVkIG1pbiBzaW5nbGUgPCBjYXBwZWQgem9uZSBJRnMpXG5cbi8vIE1vc3QgY29tYm9zICh3aXRob3V0IGEgZ2FwIGJldHdlZW4gdGhlIDIgdHJhdmVsY2FyZHMpIC0gZXh0ZW5zaW9uIGZhcmUgYXMganVzdCBiZXR3ZWVuOlxuLy8tLS0tPiBDT1VMRCBKVVNUIFVQREFURSBUSEUgTUFYIFpPTkUgQU5EIFVTRSBTQU1FIENBTFVMQ0FUSU9OUyBBUyBEQUlMWT8/PyBtaW4gdHJhdmVsID0gMVxuLy8gLSBtYXhpbXVtIHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgKyAxIHRvIG1heGltdW0gc2luZ2xlIHpvbmUgKGlmIG1pbiBzaW5nbGUgPD0gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXAgJiBtYXggc2luZ2xlID4gbWF4IHpvbmUgb2YgZGFpbHkgb3IgdHJhdmVsY2FyZCBjYXApXG4vLyAtIE9SIGJvdGggd2l0aGluIG1pbiBhbmQgbWF4Y2FwcGVkID0gZnJlZVxuLy8gLSBFTFNFIGp1c3QgYm90aCBvdXRzaWRlIGNhcHBlZCB6b25lcyA9IGZ1bGwgZmFyZVxuXG5cbi8vIEhPV0VWRVIgZm9yIHpvbmUgNC01IHdlZWtseSBhbmQgMS0yIGRhaWx5OiBoYXZlIGdhcCBvZiB6b25lIDMgYW5kIDYgLyBmb3Igem9uZSA0LTYgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGdhcCBvZiB6b25lIDMgLyBpZiB3ZWVrbHkgNS02IGFuZCAxLTIgZGFpbHk6IGdhcCAzIGFuZCA0IC8gd2Vla2x5IDUtNiBhbmQgZGFpbHkgMS0zOiBnYXAgem9uZSA0XG4vL0lGIGRpZmZlcmVuY2UgYmV0d2VlbiBtaW4gd2Vla2x5IGFuZCBtYXggZGFpbHkgY2FwID4gMVxuLy8gdGhlbiBtaW4gZ2FwIHpvbmUgPSBtYXggZGFpbHkgY2FwICsxICYgbWF4IGdhcCB6b25lID0gbWluIHdlZWtseSBnYXAgLSAxXG5cbi8vSUYgbWluIHNpbmdsZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+PSBtYXggZ2FwIHpvbmUgYnV0IG1heCBzaW5nbGUgPD0gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBtaW4gdG8gbWF4IGdhcCBmYXJlXG4vL0lGIG1pbiBzaW5nbGUgem9uZSA8PSBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSA+IG1heCB3ZWVrbHkgem9uZVxuLy8gdGhlbiBjaGFyZ2UgY2hlYXBlc3Q6IGZ1bGwgZmFyZSBvciBtYXggd2Vla2x5ICsgMSB0byBtYXggc2luZ2xlIHpvbmUmICYgZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSBhbmQgbWF4IHNpbmdsZSBib3RoID4gbWF4IHdlZWtseSB6b25lIChvciBib3RoIDwgbWluIGRhaWx5KSBPUiBtaW4gc2luZ2xlIHpvbmUgPiBtaW4gZ2FwIHpvbmUgJiYgbWF4IHNpbmdsZSB6b25lIDwgbWF4IGdhcCB6b25lXG4vLyB0aGVuIGNoYXJnZSBzaW5nbGUgbWluIHRvIHNpbmdsZSBtYXggZmFyZVxuLy9FTFNFIChJRiBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IGRhaWx5IC8gYm90aCBtaW4gYW5kIG1heCBzaW5nbGVzIHdpdGhpbiBtaW4gYW5kIG1heCB3ZWVrbHkpXG4vLyB0aGVuIGNoYXJnZSAwIC0gc2hvdWxkIHN3YXAgd2l0aCBhYm92ZVxuXG4vLyBSZW1lbWJlciBjYWxjdWxhdGUgd2l0aG91dCBhbnkgZGFpbHkgY2FwcyAtIHNob3VsZCBiZSBzaW1pbGFyIHRvIGRhaWx5IGNhbGN1bGF0aW9uc1xuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsIi8qKlxuICogR2V0cyBmYXJlcy5qc29uIGZpbGVcbiAqL1xudmFyIGZldGNoRmFyZURhdGEgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgZGF0YSA9IG51bGw7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb2ghIHdlIGFyZSBnZXR0aW5nIHRoZSBjYWNoZWQgZGF0YSEnKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKCcvZGF0YS9mYXJlcy5qc29uJykudGhlbihmdW5jdGlvbihyZXNwKSB7XG5cdFx0XHRkYXRhID0gcmVzcC5qc29uKCk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcblx0fVxufSgpKTtcblxuLy8gR2V0cyBzdGF0aW9uLmpzb24gLSBsaXN0aW5nIHdoYXQgem9uZXMgZWFjaCBzdGF0aW9uIGlzXG52YXIgZmV0Y2hTdGF0aW9uc0RhdGEgPSAoZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL3N0YXRpb25zLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vL0ZldGNoZXMgdGhlIGpzb24gZmlsZSBmcm9tIFRGTCBBUElcbnZhciBmZXRjaEpvdXJuZXlEYXRhID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcblx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGZyb20gKyAnL3RvLycgKyB0byArICc/YXBwX2lkPThhY2Q3OWE5JmFwcF9rZXk9ZDQzM2EyZDZkOWE5YzhlOGIxYjRhNmRkNDM3MWM2OWInKS50aGVuKGZ1bmN0aW9uKGUpIHtcblx0XHRyZXR1cm4gZS5qc29uKCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRmYXJlczogZmV0Y2hGYXJlRGF0YSxcblx0c3RhdGlvbnM6IGZldGNoU3RhdGlvbnNEYXRhLFxuXHRqb3VybmV5OiBmZXRjaEpvdXJuZXlEYXRhLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIi8vVGhlIGNvbXBsZXRlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIGdldCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB6b25lcyBvZiB0aGF0IGpvdXJuZXkgKHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gZHVhbCB6b25lcylcbi8vIHN0YXRpb25zIGlzIHRoZSAuanNvbiBmaWxlIGZyb20gZmV0Y2hTdGF0aW9uc0RhdGEoKSBmdW5jdGlvblxuLy8gTmVlZCB0byBtYWtlIGl0IHNvIHRoYXQgaXQgZ2VuZXJhdGVzIGl0IGFmdGVyIGVhY2ggam91cm5leVxuXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuLi91dGlsaXR5L19nZXREYXRhJztcbmltcG9ydCB7XG5cdGZsYXR0ZW4sXG5cdGdldFpvbmVzLFxuXHRmaWx0ZXJab25lc0J5TnVtYmVyLFxuXHRtaW5OdW0sXG5cdG1heE51bVxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2luZ2xlSm91cm5leVpvbmVzKGZyb20sIHRvLCBzdGF0aW9ucykge1xuXHRyZXR1cm4gZ2V0RGF0YS5qb3VybmV5KGZyb20sIHRvKS50aGVuKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHR2YXIgam91cm5leSA9IGpvdXJuZXkuam91cm5leXNbMF07IC8vIHNlbGVjdGluZyBvbmx5IHRoZSBmaXJzdCBqb3VybmV5IGZyb20gdGhlIEFQSVxuXHRcdHZhciBsZWdzID0gam91cm5leS5sZWdzOyAvL1RvIGxvb2sgYXQgZWFjaCBsZWcgb2YgdGhlIGpvdXJuZXlcblxuXHRcdC8vIFRoZSBhcnJheSBvZiB6b25lcyBhc3NvY2lhdGVkIHdpdGggYWxsIHN0YXRpb25zIG9mIHRoYXQgam91cm5leVxuXHRcdHZhciBhbGxab25lcyA9IGZsYXR0ZW4obGVncy5tYXAoZnVuY3Rpb24obGVnKSB7XG5cdFx0XHR2YXIgdGVtcFpvbmVzID0gW107XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIGRlcGFydHVyZVBvaW50cyBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLmRlcGFydHVyZVBvaW50ICYmIGxlZy5kZXBhcnR1cmVQb2ludC5uYXB0YW5JZCkgeyBcblx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMobGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkLCBzdGF0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0dldHMgdGhlIHpvbmVzIG9mIHRoZSBTdG9wUG9pbnQgYW5kIGFkZHMgdGhlbSB0byBhbGxab25lcyBhcnJheVxuXHRcdFx0aWYgKGxlZy5wYXRoLnN0b3BQb2ludHMgJiYgbGVnLnBhdGguc3RvcFBvaW50cy5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRsZWcucGF0aC5zdG9wUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oc3RvcFBvaW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0b3BQb2ludC5pZCkge1xuXHRcdFx0XHRcdFx0dGVtcFpvbmVzLnB1c2goZ2V0Wm9uZXMoc3RvcFBvaW50LmlkLCBzdGF0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0ZW1wWm9uZXM7XG5cdFx0fSkpO1xuXG5cblx0XHQvL0ZpbHRlcnMgYWxsIHRoZSBzdGF0aW9ucyBhbmQgc3BsaXQgdGhlbSBpbnRvIHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zIGFuZCB6b25lc0Zyb21EdWFsU3RhdGlvbnNcblx0XHQvLyB2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmbGF0dGVuKGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpKTtcblx0XHR2YXIgem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKTtcblx0XHR2YXIgem9uZXNGcm9tRHVhbFN0YXRpb25zID0gZmlsdGVyWm9uZXNCeU51bWJlcigyLCBhbGxab25lcyk7IC8vTkIgdGhpcyBpcyBhbiBhcnJheSB3aXRoaW4gYW4gYXJyYXlcblx0XHR2YXIgZmluYWxNYXhab25lID0gbnVsbDtcblx0XHR2YXIgZmluYWxNaW5ab25lID0gbnVsbDtcblxuXHRcdGlmICh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5sZW5ndGggPT09IDApIHsgLy9mb3IgZHVhbCB6b25lcyB0byBkdWFsIHpvbmVzICoqQVNTVU1JTkcgQ0FOIE9OTFkgVFJBVkVMIEZST00gVEhFIFNBTUUgRFVBTCBaT05FUyAoMi8zIHRvIDIvMyBhbmQgbm90IDIvMyB0byAzLzQpKipcblx0XHRcdGZpbmFsTWF4Wm9uZSA9IG1pbk51bShmbGF0dGVuKHpvbmVzRnJvbUR1YWxTdGF0aW9ucykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0Ly8qKk5FRUQgVE8gQUREIEEgRkxBRyBIRVJFIHRvIHNheSB0aGF0IGl0IGlzIGR1YWwgdG8gZHVhbCB6b25lICYgd2hhdCB6b25lcyAoc28gdGhhdCBjYW4gbWFuaXB1bGF0ZSBhbmQgcGljayB6b25lcyBmcm9tIGNsb3Nlc3QgdG8gd2Vla2x5IGNhcHBlZCB6b25lIHJhdGhlciB0aGFuIG1pbiB6b25lKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdFx0XG5cblx0XHRcdC8vQ2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gWm9uZXMgb2YgYWxsIHRoZSB6b25lcyB0aGF0IGFyZSBmcm9tIHN0YXRpb25zIHdpdGhvdXQgYW55IGR1YWwgem9uZXMuXG5cdFx0XHR2YXIgc2luZ2xlTWF4ID0gbWF4TnVtKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zKTtcblx0XHRcdHZhciBzaW5nbGVNaW4gPSBtaW5OdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXG5cdFx0XHQvL0ZvciBlYWNoIHpvbmVzRnJvbUR1YWxTdGF0aW9uczogcGlja3MgdGhlIG1vc3QgYXBwcm9wcmlhdGUgem9uZSBhbmQgYXBwZW5kcyB0byBkdWFsWm9uZXMgYXJyYXkgXG5cdFx0XHQvLyAtLT4gR29pbmcgZnJvbSAyLzMgdG8gMi8zIOKAlD4gY2hhcmdlcyBzYW1lIHNpbmdsZSAyLCAzIG9yIDItMyAoMS43MCkgYnV0IHNob3VsZCBwaWNrIHpvbmUgYmFzZWQgb24gd2Vla2x5IChjb3VsZCBiZSAzKSBvciBjYXAgKGFsd2F5cyBzbWFsbGVzdDogMilcblx0XHRcdHZhciBkdWFsWm9uZXMgPSB6b25lc0Zyb21EdWFsU3RhdGlvbnMubWFwKGZ1bmN0aW9uKHopIHtcblx0XHRcdFx0cmV0dXJuIHoucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdFx0XHRpZiAoZ2V0RGlmZmVyZW5jZShhLCBzaW5nbGVNaW4pIDwgZ2V0RGlmZmVyZW5jZShiLCBzaW5nbGVNaW4pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vQWRkcyBkdWFsWm9uZXMgdG8gc2luZ2xlTWF4IGludG8gYW4gYXJyYXkgYW5kIGNhbGN1bGF0ZXMgdGhlIG1heCBhbmQgbWluIHpvbmUgb2YgYm90aFxuXHRcdFx0ZmluYWxNYXhab25lID0gbWF4TnVtKFtzaW5nbGVNYXhdLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHRcdGZpbmFsTWluWm9uZSA9IG1pbk51bShbc2luZ2xlTWluXS5jb25jYXQoZHVhbFpvbmVzKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG1heDoge1xuXHRcdFx0XHR6b25lczogZmluYWxNYXhab25lLFxuXHRcdFx0fSxcblx0XHRcdG1pbjoge1xuXHRcdFx0XHR6b25lczogZmluYWxNaW5ab25lLFxuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZ2V0U2luZ2xlSm91cm5leVpvbmVzLmpzIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHRlbnNpb24gZmFyZSAob3Igbm9uZSkgb2YgYSBqb3VybmV5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG1pbm1heFRyYXZlbGNhcmQgLSB0aGUgbWluIGFuZCBtYXggem9uZSBvZiB0aGUgdHJhdmVsY2FyZCBjb3ZlcmVkIHpvbmVzLCBpbiBhbiBhcnJheVxuICogQHBhcmFtIHthcnJheX0gbWlubWF4Sm91cm5leSAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSBzaW5nbGUgam91cm5leSwgaW4gYW4gYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0RGlmZmVyZW5jZSxcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5zaW9uRmFyZXMobWlubWF4VHJhdmVsY2FyZCwgbWlubWF4Sm91cm5leSwgc2luZ2xlRmFyZXMpIHtcblx0dmFyIG1pblRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzBdO1xuXHR2YXIgbWF4VHJhdmVsY2FyZCA9IG1pbm1heFRyYXZlbGNhcmRbMV07XG5cdHZhciBtaW5TaW5nbGUgPSBtaW5tYXhKb3VybmV5WzBdO1xuXHR2YXIgbWF4U2luZ2xlID0gbWlubWF4Sm91cm5leVsxXTtcblx0dmFyIGpvdXJuZXlGYXJlID0gbnVsbDtcblx0XG5cdC8vQ09OVEFDVExFU1Mgb25seSB1c2VzIGFkdWx0IGZhcmVzXG5cdC8vRk9SIERBSUxZIENBUFM6IEFMV0FZUyBTVEFSVCBBVCAxIFNPIE1PU1QgT0YgVEhJUyBDT0RFIFRPTyBDT01QTEVYOiBidXQgd291bGQgc3RpbGwgd29ya1xuXHQvL0ZPUiBXRUVLTFkgQ0FQUzogdGhpcyB3b3JrcyBvdXQgZmFyZSB3aXRob3V0IGFueSBkYWlseSBjYXBzXG5cdC8vaWYgbWF4IHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWluIHNpbmdsZSBpc250LlxuXHRpZiAoIShtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSwgbWF4U2luZ2xlIC0gKHkrMSldO1xuXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcyk7XG5cblx0Ly9pZiBtaW4gc2luZ2xlIHdpdGhpbiB0cmF2ZWxjYXJkIHpvbmVzIGJ1dCBtYXggc2luZ2xlIGlzbnQuXG4gXHR9IGVsc2UgaWYgKChtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgIShtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0dmFyIHkgPSBnZXREaWZmZXJlbmNlKG1pblNpbmdsZSwgbWF4VHJhdmVsY2FyZCk7XG4gXHRcdHZhciBqb3VybmV5ID0gW21pblNpbmdsZSArICh5KzEpLCBtYXhTaW5nbGVdO1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0dmFyIGZhcmVzID0gW107XG4gXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtaW5TaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuIFx0XHR2YXIgeCA9IGdldERpZmZlcmVuY2UobWF4U2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcbiBcdFx0Ly8gcGlja3MgdGhlIGNoZWFwZXN0OiBzcGxpdCBzaW5nbGVzIG9yIHRoZSBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkID09IHNob3VsZCBiZSBhIGdsb2JhbCBmdW5jdGlvblxuIFx0XHR2YXIgY29zdCA9IGdldFNpbmdsZUZhcmUoW21pblNpbmdsZSwgKG1pblRyYXZlbGNhcmQgLSAxKV0sIHNpbmdsZUZhcmVzKSArIGdldFNpbmdsZUZhcmUoWyhtYXhUcmF2ZWxjYXJkICsgMSksIG1heFNpbmdsZV0sIHNpbmdsZUZhcmVzKTtcbiBcdFx0ZmFyZXMucHVzaChjb3N0KTtcblx0XHR2YXIgam91cm5leSA9IFttaW5TaW5nbGUsIG1heFNpbmdsZV07XG5cdFx0ZmFyZXMucHVzaChnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKSk7XG5cdFx0am91cm5leUZhcmUgPSBtaW5OdW0oZmFyZXMpXG5cdC8vYm90aCBzaW5nbGUgem9uZXMgd2l0aGluIHRyYXZlbGNhcmQgem9uZXNcbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAobWluVHJhdmVsY2FyZCA8PSBtYXhTaW5nbGUgJiYgbWF4U2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpKSB7XG4gXHRcdGpvdXJuZXlGYXJlID0gMDtcbiBcdC8vYm90aCBzaW5nbGUgem9uZXMgYXJlIG91dHNpZGUgdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIHtcbiBcdFx0dmFyIGpvdXJuZXkgPSBbbWluU2luZ2xlLCBtYXhTaW5nbGVdO1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoam91cm5leSwgc2luZ2xlRmFyZXMpO1xuIFx0fVxuIFx0cmV0dXJuIGpvdXJuZXlGYXJlO1xuIFx0Ly9jb25zb2xlLmxvZyhqb3VybmV5RmFyZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiXSwic291cmNlUm9vdCI6IiJ9