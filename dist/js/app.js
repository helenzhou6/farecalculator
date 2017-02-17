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





// import splitOrFullFare from './partials/_splitOrFullFare';

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
	console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])(minmaxTravelcard, minmaxJourney, singleFares));

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
		//console.log('for daily cap 1 to ' + i);
		var conCumTotal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["b" /* getDailyCap */])(i, dailyCaps);
		for (var x = 0; x < journeys.length; x++) {
			//adding extension fares to cumTotal
			conCumTotal += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__partials_extensionFares__["a" /* default */])([1, i], journeys[x], singleFares);
		};
		//console.log(conCumTotal);

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
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare (splitOrFullFare but min single zone would be min gap zone)
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__ = __webpack_require__(5);
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
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, maxSingle - (y + 1)], singleFares);

    //if min single within travelcard zones but max single isnt.
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
    var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["f" /* getDifference */])(minSingle, maxTravelcard);
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle + (y + 1), maxSingle], singleFares);

    //if min single less than min travelcard and max single more than max travelcard
  } else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__splitOrFullFare__["a" /* default */])(minSingle, maxSingle, minTravelcard, maxTravelcard, singleFares);
    //both single zones within travelcard zones
  } else if (minTravelcard <= minSingle && minSingle <= maxTravelcard && minTravelcard <= maxSingle && maxSingle <= maxTravelcard) {
    journeyFare = 0;
    //both single zones are outside travelcard zones
  } else {
    journeyFare = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minSingle, maxSingle], singleFares);
  }

  return journeyFare;
};

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



function splitOrFullFare(minChargedZone, maxChargedZone, minTravelcard, maxTravelcard, singleFares) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["e" /* minNum */])([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, maxChargedZone], singleFares), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([minChargedZone, minTravelcard - 1], singleFares) + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utility_utility__["c" /* getSingleFare */])([maxTravelcard + 1, maxChargedZone], singleFares)]);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTMzZTA4ZmE0MjMzMDBjM2I2NzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxpdHkvX3V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbGl0eS9fZ2V0RGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydGlhbHMvX2V4dGVuc2lvbkZhcmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0aWFscy9fc3BsaXRPckZ1bGxGYXJlLmpzIl0sIm5hbWVzIjpbImdldFpvbmVzIiwibmFwVGFuIiwic3RhdGlvbnMiLCJ6b25lcyIsImZpbHRlclpvbmVzQnlOdW1iZXIiLCJudW0iLCJmaWx0ZXIiLCJ6b25lIiwibGVuZ3RoIiwiY29tcGFyZU51bWJlcnMiLCJhcnJheU51bWJlcnMiLCJvcGVyYXRvciIsInJlZHVjZSIsImEiLCJiIiwibWF4TnVtIiwiYXJyYXlab25lcyIsIk1hdGgiLCJtYXgiLCJtaW5OdW0iLCJtaW4iLCJnZXREaWZmZXJlbmNlIiwiYWJzIiwiZmxhdHRlbiIsImFyciIsImNvbmNhdCIsImpvdXJuZXlUb0tleSIsImpvdXJuZXkiLCJzb3J0Iiwiam9pbiIsImdldERhaWx5Q2FwIiwibWF4Wm9uZXNvZmFyIiwiZGFpbHlDYXBzIiwiZ2V0U2luZ2xlRmFyZSIsInNpbmdsZUZhcmVzIiwiZ2V0RGF0YSIsInRoZW4iLCJnZXRTaW5nbGVKb3VybmV5Wm9uZXMiLCJyZXNwIiwiY29uc29sZSIsImxvZyIsImZhcmVzIiwiZmFyZURhdGEiLCJtaW5tYXhUcmF2ZWxjYXJkIiwibWlubWF4Sm91cm5leSIsImV4dGVuc2lvbkZhcmVzIiwiam91cm5leXMiLCJveUN1bVRvdGFsIiwiZm9yRWFjaCIsIm1heFpvbmVEYWlseUNhcCIsInNpbmdsZSIsImNvbkFsbEZhcmVzIiwiY29uRmFyZXMiLCJjb25TaW5nbGUiLCJwdXNoIiwiY29uTWF4Wm9uZSIsImkiLCJjb25DdW1Ub3RhbCIsIngiLCJjb25GaW5hbEZhcmUiLCJmZXRjaEZhcmVEYXRhIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmV0Y2giLCJqc29uIiwiZmV0Y2hTdGF0aW9uc0RhdGEiLCJmZXRjaEpvdXJuZXlEYXRhIiwiZnJvbSIsInRvIiwiZSIsImxlZ3MiLCJhbGxab25lcyIsIm1hcCIsImxlZyIsInRlbXBab25lcyIsImRlcGFydHVyZVBvaW50IiwibmFwdGFuSWQiLCJwYXRoIiwic3RvcFBvaW50cyIsInN0b3BQb2ludCIsImlkIiwiem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMiLCJ6b25lc0Zyb21EdWFsU3RhdGlvbnMiLCJmaW5hbE1heFpvbmUiLCJmaW5hbE1pblpvbmUiLCJzaW5nbGVNYXgiLCJzaW5nbGVNaW4iLCJkdWFsWm9uZXMiLCJ6IiwibWluVHJhdmVsY2FyZCIsIm1heFRyYXZlbGNhcmQiLCJtaW5TaW5nbGUiLCJtYXhTaW5nbGUiLCJqb3VybmV5RmFyZSIsInkiLCJzcGxpdE9yRnVsbEZhcmUiLCJtaW5DaGFyZ2VkWm9uZSIsIm1heENoYXJnZWRab25lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJI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QUE1QyxJQUErREQsaUJBQWlCRyxTQUFqQixJQUE4QkEsYUFBYUYsYUFBOUcsRUFBOEg7QUFDcElHLGtCQUFjLENBQWQ7QUFDRDtBQUNDLEdBSE0sTUFHQTtBQUNOQSxrQkFBYyw4RkFBQTdELENBQWMsQ0FBQzJELFNBQUQsRUFBWUMsU0FBWixDQUFkLEVBQXNDM0QsV0FBdEMsQ0FBZDtBQUNBOztBQUVELFNBQU80RCxXQUFQO0FBQ0QsRTs7Ozs7Ozs7QUNsREQ7QUFBQTs7Ozs7Ozs7O0FBU0E7O0FBS2UsU0FBU0UsZUFBVCxDQUF5QkMsY0FBekIsRUFBeUNDLGNBQXpDLEVBQXlEUixhQUF6RCxFQUF3RUMsYUFBeEUsRUFBdUZ6RCxXQUF2RixFQUFvRztBQUNsSCxTQUFPLHVGQUFBZixDQUFPLENBQ2IsOEZBQUFjLENBQWMsQ0FBQ2dFLGNBQUQsRUFBaUJDLGNBQWpCLENBQWQsRUFBZ0RoRSxXQUFoRCxDQURhLEVBRWIsOEZBQUFELENBQWMsQ0FBQ2dFLGNBQUQsRUFBa0JQLGdCQUFnQixDQUFsQyxDQUFkLEVBQXFEeEQsV0FBckQsSUFBb0UsOEZBQUFELENBQWMsQ0FBRTBELGdCQUFnQixDQUFsQixFQUFzQk8sY0FBdEIsQ0FBZCxFQUFxRGhFLFdBQXJELENBRnZELENBQVAsQ0FBUDtBQUlBLEMiLCJmaWxlIjoiLi9kaXN0L2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGEzM2UwOGZhNDIzMzAwYzNiNjczIiwiLyoqXG4gKiBHZXRzIFpvbmVzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYXBUYW4gLSBUaGUgbmFwdGFuIG9mIHRoZSBzdGF0aW9uIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3RhdGlvbnMgd2l0aCBuYXBUYW5zIGFzIGtleXMuXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKiBAZGVzY3JpcHRpb24gVXNlcyB0aGUgbmFwVGFuIElEIHRvIGZpZ3VyZSBvdXQgd2hhdCB6b25lIHRoYXQgc3RhdGlvbiBpcyBpbiB2aWEgc3RhdGlvbi5qc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRab25lcyhuYXBUYW4sIHN0YXRpb25zKSB7XG4gIHJldHVybiBzdGF0aW9uc1tuYXBUYW5dLnpvbmVzO1xufVxuXG4vKipcbiAqIGZpbHRlcnMgYSBuZXN0ZWQgYXJyYXkgYmFzZWQgb24gaXRzIGxlbmd0aCBcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIGVpdGhlciAxIChmb3Igc2luZ2xlIHpvbmUpIG9yIDIgKGR1YWwgem9uZSlcbiAqIEBwYXJhbSB7bmVzdGVkIGFycmF5fSB6b25lcyAtIHRoZSBuZXN0ZWQgYXJyYXkgb2YgYXJyYXlzIChvZiB6b25lcylcbiAqIEByZXR1cm5zIHtuZXN0ZWQgYXJyYXl9IC0gbmVzdGVkIGFycmF5IG9mIGFsbCBhcnJheSBvZiB6b25lcyBmcm9tIHN0YXRpb25zIHRoYXQgb25seSBoYXZlIG9uZSB6b25lIGFzc29jaWF0ZWQgd2l0aCBpdCAoaWYgbnVtID0gMSkgb3IuLi5cbiAqIEBkZXNjcmlwdGlvbiAtIHpvbmVzIHJlZmVycyB0byBnbG9iYWwgYWxsWm9uZXMgLyB1c2VkIHRvIGZpbHRlciB0aGUgc3RhdGlvbiB6b25lcyBieSB0aGUgbnVtYmVyIG9mIHpvbmVzIGl0IGhhcyAoZHVhbCB6b25lIG9yIHNpbmdsZSB6b25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyWm9uZXNCeU51bWJlcihudW0sIHpvbmVzKSB7XG4gIHJldHVybiB6b25lcy5maWx0ZXIoZnVuY3Rpb24oem9uZSkge1xuICAgIHJldHVybiB6b25lLmxlbmd0aCA9PT0gbnVtO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBOdW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IG51bWJlcnMgLSB0aGUgYXJyYXkgb2YgbnVtYmVyKHMpXG4gKiBAcGFyYW0ge29iamVjdH0gb3BlcmF0b3IgLSB3aGF0IGphdmFzY3JpcHQgb3BlcmF0b3IgcGFzc2luZyB0aHJvdWdoIChlLmcuIE1hdGgubWF4KVxuICogQHJldHVybnMge251bWJlcn0gLSB0aGUgc2luZ2xlIG51bWJlciBhZnRlciBhbGwgY2FsY3VsYXRpb25zIChyZWR1Y2VzIHRvIG9uZSBudW1iZXIpXG4gKiBAZGVzY3JpcHRpb24gQXNzb2NpYXRlZCB3aXRoIG1pbk51bSBhbmQgbWF4TnVtOiB3aGVyZSBhcnJheVpvbmVzIHJlZmVycyB0byB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucy5cbiBMb29wcyB0aHJvdWdoIHRoZSBhcnJheSBvZiB6b25lcyBhbmQgYXBwbGllcyB0aGUgb3BlcmF0b3JcbiAqL1xuZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYXJyYXlOdW1iZXJzLCBvcGVyYXRvcikge1xuICByZXR1cm4gYXJyYXlOdW1iZXJzLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKGEsIGIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bShhcnJheVpvbmVzKSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyhhcnJheVpvbmVzLCBNYXRoLm1heCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5OdW0oYXJyYXlab25lcykge1xuICByZXR1cm4gY29tcGFyZU51bWJlcnMoYXJyYXlab25lcywgTWF0aC5taW4pO1xufVxuXG4vKipcbiAqIEdldCBkaWZmZXJlbmNlIGJldHdlZW4gMiBudW1iZXJzXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gYSxiIC0gdGhlIHR3byBudW1iZXJzIGNvbXBhcmluZyBhZ2FpbnN0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgbnVtYmVycyAoZGlzY2FyZGluZyBuZWdhdGl2ZSBudW1iZXJzKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaWZmZXJlbmNlKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbiAgLy8gcmV0dXJuIGEgLSBiO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgbmVzdGVkIGFycmF5XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IHRoYXQgaXMgYW4gYXJyYXkgd2l0aGluIGFub3RoZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZmxhdHRlbnMgdGhlIGFycmF5IHNvIGp1c3Qgb25lIGFycmF5XG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgb2YgMiB6b25lcyBjaHJvbm9sb2dpY2FsbHkgYW5kIGFkZHMgJy0nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgb2YgdGhhdCBqb3VybmV5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICd4LXknXG4gKiBAZGVzY3JpcHRpb24gLSB1c2VkIHRvIGdldCB0aGUgZmFyZXMgZnJvbSB0aGUganNvbiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb3VybmV5VG9LZXkoam91cm5leSkge1xuICByZXR1cm4gam91cm5leS5zb3J0KCkuam9pbignLScpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhaWx5IGNhcCBjb3N0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSAtIHRoZSAobWF4aW11bSkgem9uZVxuICogQHBhcmFtIHtvYmplY3R9IGRhaWx5Q2FwcyAtIGxvb2tzIGF0IHRoZSBkYWlseUNhcHMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgZGFpbHkgY2FwIGJldHdlZW4gem9uZXMgMSBhbmQgdGhlIHpvbmUgcGFyYW1ldGVyIChhcyBkYWlseSBjYXBzIGFsd2F5cyBzdGFydHMgYXQgem9uZSAxKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYWlseUNhcChtYXhab25lc29mYXIsIGRhaWx5Q2Fwcykge1xuICByZXR1cm4gZGFpbHlDYXBzW2pvdXJuZXlUb0tleShbMSwgbWF4Wm9uZXNvZmFyXSldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHNpbmdsZSBmYXJlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGpvdXJuZXkgLSB0aGUgYXJyYXkgb2YgdGhlIDIgem9uZXMgdHJhdmVsbGluZyBiZXR3ZWVuXG4gKiBAcGFyYW0ge29iamVjdH0gc2luZ2xlRmFyZXMgLSBsb29rcyBhdCB0aGUgc2luZ2xlRmFyZXMgb2JqZWN0IGluIHRoZSBmYXJlcy5qc29uIGZpbGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gZ2V0cyB0aGUgc2luZ2xlIGZhcmUgYmV0d2VlbiB0aG9zZSB0d28gem9uZXNcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlRmFyZShqb3VybmV5LCBzaW5nbGVGYXJlcykge1xuICByZXR1cm4gc2luZ2xlRmFyZXNbam91cm5leVRvS2V5KGpvdXJuZXkpXTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdXRpbGl0eS9fdXRpbGl0eS5qcyIsImltcG9ydCB7XG5cdGdldFpvbmVzLCBcblx0ZmlsdGVyWm9uZXNCeU51bWJlcixcblx0bWF4TnVtLFxuXHRtaW5OdW0sXG5cdGdldERpZmZlcmVuY2UsXG5cdGZsYXR0ZW4sXG5cdGpvdXJuZXlUb0tleSxcblx0Z2V0RGFpbHlDYXAsXG5cdGdldFNpbmdsZUZhcmUsXG59IGZyb20gJy4vdXRpbGl0eS9fdXRpbGl0eSc7XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4vdXRpbGl0eS9fZ2V0RGF0YSc7XG5pbXBvcnQgZ2V0U2luZ2xlSm91cm5leVpvbmVzIGZyb20gJy4vcGFydGlhbHMvX2dldFNpbmdsZUpvdXJuZXlab25lcyc7XG5pbXBvcnQgZXh0ZW5zaW9uRmFyZXMgZnJvbSAnLi9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMnO1xuLy8gaW1wb3J0IHNwbGl0T3JGdWxsRmFyZSBmcm9tICcuL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUnO1xuXG4vL1RPIERPXG4vL09mZiBwZWFrIHZzIG9uIHBlYWsgc2luZ2xlcyAoZXNwIGluY2x1ZGluZyBvdXQgb2Ygem9uZSAxIHRvIHpvbmUgMSBpbiBldmVuaW5nIGlzIG9mZnBlYWsgZXhjZXB0aW9uKVxuLy9PZmZwZWFrIGRhaWx5IGNhcCBkaXNjb3VudHMgLSBrZWVwIHRyYWNrIHdoZW4gZGFpbHkgY2FwIHJlYWNoZWQgYnV0IG9ubHkgdHJhdmVsbGVkIG9mZiBwZWFrIChpZiBnb2luZyB0byBkbyBvZmYgcGVhayBveXN0ZXIgY3VtIHRvdGFscyB0aGVuIHdvdWxkIGtub3cgdGhpcylcbi8vcG9zc2liaWxpdHkgb2YgYWx0ZXJpbmcgb3lzdGVyIHNvIHJlZmxlY3RzIG9mZiBwZWFrIC0tIHRoZW4gY291bGQgYWRkICB0aGUgUmFpbGNhcmQgb3IgR29sZCBjYXJkIGRpc2NvdW50IHRvIHlvdXIgT3lzdGVyIGFuZCAxLTggIHpvbmVzIG9yIHRvIDkgd2l0aG91dCB3YXRmb3JkXG4vL0NBTiBETyBBUFBSRU5USUNFLCAxOCsgU1RVREVOVCwgMTYrIFpJUCwgSk9CIENFTlRSRSBPTiBPWVNURVIgLSBhcyBubyBkaWZmIGJ3IG9mZiBwZWFrIC8gb24gcGVhayBkYWlseSBjYXBzXG5cbmdldERhdGEuc3RhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKHN0YXRpb25zKSB7XG5cdGdldFNpbmdsZUpvdXJuZXlab25lcygnMTAwMDAyOScsICcxMDAwMTM4Jywgc3RhdGlvbnMpLnRoZW4oKHJlc3ApID0+IHtcblx0XHRjb25zb2xlLmxvZyhyZXNwKTtcblx0fSk7XG59KTtcblxuLy8gRm9ybXVsYXRlIGFycmF5PyBKb3VybmV5IDEgb2JqZWN0OiB3aXRoIHpvbmVzIHRyYXZlbGxlZCAoYXJyYXk6IG1pbiBhbmQgbWF4KSwgdGltZSwgb2ZmLXBlYWsgb3Igb24tcGVhaywgc2luZ2xlIHByaWNlLCBmbGFnIGZvciBkdWFsIHRvIGR1YWwgKGFuZCB3aGF0IHpvbmVzKS5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gR2xvYmFsIGZ1bmN0aW9ucyA+IGNvbXBhcmVOdW1iZXJzIChjYW4gcmVkdWNlIHRvIHRoZSBtYXhOdW0gYW5kIG1pbk51bSBvZiBhbiBhcnJheSkgJiBnZXREaWZmZXJlbmNlIGJ3IDIgbnVtYmVyc1xuXG5nZXREYXRhLmZhcmVzKCkudGhlbihmdW5jdGlvbihmYXJlRGF0YSkge1xuXHR2YXIgc2luZ2xlRmFyZXMgPSBmYXJlRGF0YS5zaW5nbGVGYXJlcztcdFxuXG5cdC8vIEVYQU1QTEVcblx0dmFyIG1pbm1heFRyYXZlbGNhcmQgPSBbMywgNF07XG5cdHZhciBtaW5tYXhKb3VybmV5ID0gWzEsIDZdO1xuXHRjb25zb2xlLmxvZyhleHRlbnNpb25GYXJlcyhtaW5tYXhUcmF2ZWxjYXJkLCBtaW5tYXhKb3VybmV5LCBzaW5nbGVGYXJlcykpO1xuXG4vL1NJTkdMRSBGQVJFUyBORUVEIFRPIEJFIEFMVEVSRUQgVE8gT0ZGIFBFQUsgT1IgT04gUEVBSyAmIHByZWZlcmFibHkgYSBjb3VudGVyIG9uIHdoZXRoZXIgYSBjYXAgd2FzIHJlYWNoZWRcbi8vIHdoYXQgYWJvdXQgem9uZSAxIHRvIHpvbmUgMSBleGNlcHRpb24gZm9yIG9mZiBwZWFrPj9cblxuLy8gLSBPWVNURVIgQ2hlYXBlc3QgRmFyZVxuLy8gZmV0Y2hGYXJlRGF0YSgpLnRoZW4oZnVuY3Rpb24oZmFyZURhdGEpIHtcblx0dmFyIGRhaWx5Q2FwcyA9IGZhcmVEYXRhLmRhaWx5Q2Fwcztcblx0Ly8gdmFyIHNpbmdsZUZhcmVzID0gZmFyZURhdGEuc2luZ2xlRmFyZXM7XG5cbi8vQW4gYXJyYXkgb2YgYWxsIHRoZSBqb3VybmV5cyB3aXRoIHRoZWlyIG1heCBhbmQgbWluIHpvbmVzIHRyYXZlbGxlZFxuXHR2YXIgam91cm5leXMgPSBbXG5cdFx0WzIsIDFdLFxuXHRcdFsxLCAyXSxcblx0XHRbMiwgMV0sXG5cdFx0WzEsIDJdLFxuXHRcdFsyLCA0XSxcblx0XHRbMSwgM10sXG5cdF07XG5cbi8vY3VtVG90YWwgPSB0aGUgdG90YWwgdGhhdCB1cGRhdGVzIGFuZCBiZWNvbWVzIHRoZSBmaW5hbCBveXN0ZXIgZmFyZVxuXHR2YXIgb3lDdW1Ub3RhbCA9IG51bGw7XG4vL21heFpvbmVzc29mYXIgZm9yIGVhY2ggam91cm5leSB1cGRhdGVzIGFuZCBpcyB0aGUgYXJyYXkgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdHZhciBtYXhab25lc29mYXIgPSBqb3VybmV5c1swXTtcblxuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHQvL0dldHMgdGhlIG1heGltdW0gem9uZXMgb2YgYWxsIHRoZSB6b25lcyB0cmF2ZWxsZWQgaW4gc28gZmFyXG5cdFx0bWF4Wm9uZXNvZmFyID0gbWF4TnVtKGpvdXJuZXkuY29uY2F0KG1heFpvbmVzb2ZhcikpO1xuXG5cdFx0Ly9HZXRzIHRoZSByZWxldmFudCBkYWlseSBjYXAgdG8gdGhhdCBtYXggem9uZSAmIHNpbmdsZSBmYXJlIGZvciB0aGF0IGpvdXJuZXlcblx0XHR2YXIgbWF4Wm9uZURhaWx5Q2FwID0gZ2V0RGFpbHlDYXAobWF4Wm9uZXNvZmFyLCBkYWlseUNhcHMpO1xuXHRcdHZhciBzaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XG5cdFx0Ly9hZGRzIHRoZSBzaW5nbGUgZmFyZSB0byB0aGUgY3VtdWxhdGl2ZSB0b3RhbFxuXHRcdG95Q3VtVG90YWwgKz0gc2luZ2xlO1xuXG5cdFx0Ly9pZiB0aGUgZGFpbHkgY2FwIGZvciB0aGUgY3VycmVudCBtYXhpbXVtIHpvbmUgaXMgcmVhY2hlZCwgdGhlbiB0aGUgY3VtIHRvdGFsIGlzIG92ZXJyaWRlbiBieSB0aGUgcmVsZXZhbnQgbWF4aW11bSB6b25lIGRhaWx5IGNhcCBmYXJlXG5cdFx0aWYgKG95Q3VtVG90YWwgPj0gbWF4Wm9uZURhaWx5Q2FwKSB7XG5cdFx0XHRveUN1bVRvdGFsID0gbWF4Wm9uZURhaWx5Q2FwO1xuXHRcdH1cblx0fSk7XG5cdC8vVGhpcyBpcyB0aGUgZmluYWwgb3lzdGVyIGRhaWx5IGZhcmUgY2FsY3VsYXRlZDpcblx0Ly8gY29uc29sZS5sb2cob3lDdW1Ub3RhbCk7XG5cblxuLy8gLSBDT05UQUNUTEVTUyBDaGVhcGVzdCBGYXJlID0gXG5cdC8vVGhlIGFycmF5IG9mIGFsbCBjb21iaW5hdGlvbiBwcmljZXMgdG8gYmUgcmVkdWNlIHRvIGNoZWFwZXN0IG9uZVxuXHR2YXIgY29uQWxsRmFyZXMgPSBbXTtcblxuXHQvLyBmb3Igd2l0aG91dCBhbnkgZGFpbHkgY2Fwcywgb25seSBzaW5nbGVzIGFkZGVkIHRvZ2V0aGVyXG5cdHZhciBjb25GYXJlcyA9IG51bGw7XG5cdHZhciBjb25TaW5nbGUgPSBudWxsO1xuXHRqb3VybmV5cy5mb3JFYWNoKGZ1bmN0aW9uKGpvdXJuZXkpIHtcblx0XHRjb25TaW5nbGUgPSBnZXRTaW5nbGVGYXJlKGpvdXJuZXksIHNpbmdsZUZhcmVzKTtcblx0XHRjb25GYXJlcyArPSBjb25TaW5nbGU7XG5cdH0pO1xuXHRjb25BbGxGYXJlcy5wdXNoKGNvbkZhcmVzKTtcblxuXHQvLyBcdFRoZW4gZm9yIGVhY2ggWm9uZSByYW5nZSAoZnJvbSBab25lIDEtMyB1bnRpbCBab25lIDEgdG8gbWF4KSByZXBlYXQgc2FtZSBjYWxjdWxhdGlvbi5cblx0IHZhciBjb25NYXhab25lID0gbWF4TnVtKGZsYXR0ZW4oam91cm5leXMpKTtcblx0IGZvciAodmFyIGkgPSAyOyBpIDw9IGNvbk1heFpvbmU7IGkrKykge1xuXHQgXHQvL2NvbnNvbGUubG9nKCdmb3IgZGFpbHkgY2FwIDEgdG8gJyArIGkpO1xuXHQgXHR2YXIgY29uQ3VtVG90YWwgPSBnZXREYWlseUNhcChpLCBkYWlseUNhcHMpO1xuXHQgXHQgZm9yICh2YXIgeCA9IDA7IHggPCBqb3VybmV5cy5sZW5ndGg7IHgrKykge1xuXHQgXHQgXHQvL2FkZGluZyBleHRlbnNpb24gZmFyZXMgdG8gY3VtVG90YWxcblx0IFx0XHRjb25DdW1Ub3RhbCArPSBleHRlbnNpb25GYXJlcyhbMSwgaV0sIGpvdXJuZXlzW3hdLCBzaW5nbGVGYXJlcyk7XG5cdCBcdCB9O1xuXHQgXHQvL2NvbnNvbGUubG9nKGNvbkN1bVRvdGFsKTtcblxuXHQgXHRjb25BbGxGYXJlcy5wdXNoKGNvbkN1bVRvdGFsKTtcblx0IH1cblxuXHQvLyBcdC0tLT4gQ29tcGFyZSBhbGwgdGhlIHBvc3NpYmlsaXRpZXMgYW5kIHNlbGVjdCB0aGUgY2hlYXBlc3QgKGluY2x1ZGluZyB0b3RhbCBzaW5nbGUpLiBcblx0dmFyIGNvbkZpbmFsRmFyZSA9IG51bGw7XG5cdGNvbkZpbmFsRmFyZSA9IG1pbk51bShjb25BbGxGYXJlcyk7XG5cdC8vIGNvbnNvbGUubG9nKGNvbkZpbmFsRmFyZSk7XG59KTtcblxuLy9DT05UQUNUTEVTUyBXRUVLTFkgQ0FQIC0gbWl4dHVyZSAgb2Ygd2Vla2x5IGNhcCBhbmQgZGFpbHkgY2FwXG5cbi8vVEhJUyBNRVRIT0QgUkVMSUVTIE9OIFRIRSBGQUNUIFRIQVQ6XG4vLy0gem9uZSB4IHRvIHggZmFyZSBpcyB0aGUgc2FtZSBhcyB6b25lIHgtMSB0byB6b25lIHggZmFyZVxuLy8tIEFzc3VtZXMgZGFpbHkgY2FwcyBhbHdheXMgc3RhcnQgYXQgem9uZSAxIChlbHNlIG5lZWQgbWluIHNpbmdsZSA8IGNhcHBlZCB6b25lIElGcylcblxuLy8gTW9zdCBjb21ib3MgKHdpdGhvdXQgYSBnYXAgYmV0d2VlbiB0aGUgMiB0cmF2ZWxjYXJkcykgLSBleHRlbnNpb24gZmFyZSBhcyBqdXN0IGJldHdlZW46XG4vLy0tLS0+IENPVUxEIEpVU1QgVVBEQVRFIFRIRSBNQVggWk9ORSBBTkQgVVNFIFNBTUUgQ0FMVUxDQVRJT05TIEFTIERBSUxZPz8/IG1pbiB0cmF2ZWwgPSAxXG4vLyAtIG1heGltdW0gem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCArIDEgdG8gbWF4aW11bSBzaW5nbGUgem9uZSAoaWYgbWluIHNpbmdsZSA8PSBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcCAmIG1heCBzaW5nbGUgPiBtYXggem9uZSBvZiBkYWlseSBvciB0cmF2ZWxjYXJkIGNhcClcbi8vIC0gT1IgYm90aCB3aXRoaW4gbWluIGFuZCBtYXhjYXBwZWQgPSBmcmVlXG4vLyAtIEVMU0UganVzdCBib3RoIG91dHNpZGUgY2FwcGVkIHpvbmVzID0gZnVsbCBmYXJlXG5cblxuLy8gSE9XRVZFUiBmb3Igem9uZSA0LTUgd2Vla2x5IGFuZCAxLTIgZGFpbHk6IGhhdmUgZ2FwIG9mIHpvbmUgMyBhbmQgNiAvIGZvciB6b25lIDQtNiB3ZWVrbHkgYW5kIDEtMiBkYWlseTogZ2FwIG9mIHpvbmUgMyAvIGlmIHdlZWtseSA1LTYgYW5kIDEtMiBkYWlseTogZ2FwIDMgYW5kIDQgLyB3ZWVrbHkgNS02IGFuZCBkYWlseSAxLTM6IGdhcCB6b25lIDRcbi8vSUYgZGlmZmVyZW5jZSBiZXR3ZWVuIG1pbiB3ZWVrbHkgYW5kIG1heCBkYWlseSBjYXAgPiAxXG4vLyB0aGVuIG1pbiBnYXAgem9uZSA9IG1heCBkYWlseSBjYXAgKzEgJiBtYXggZ2FwIHpvbmUgPSBtaW4gd2Vla2x5IGdhcCAtIDFcblxuLy9JRiBtaW4gc2luZ2xlIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID49IG1heCBnYXAgem9uZSBidXQgbWF4IHNpbmdsZSA8PSBtYXggd2Vla2x5IHpvbmVcbi8vIHRoZW4gY2hhcmdlIG1pbiB0byBtYXggZ2FwIGZhcmVcbi8vSUYgbWluIHNpbmdsZSB6b25lIDw9IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlID4gbWF4IHdlZWtseSB6b25lXG4vLyB0aGVuIGNoYXJnZSBjaGVhcGVzdDogZnVsbCBmYXJlIG9yIG1heCB3ZWVrbHkgKyAxIHRvIG1heCBzaW5nbGUgem9uZSYgJiBnYXAgZmFyZSAoc3BsaXRPckZ1bGxGYXJlIGJ1dCBtaW4gc2luZ2xlIHpvbmUgd291bGQgYmUgbWluIGdhcCB6b25lKVxuLy9JRiBtaW4gc2luZ2xlIGFuZCBtYXggc2luZ2xlIGJvdGggPiBtYXggd2Vla2x5IHpvbmUgKG9yIGJvdGggPCBtaW4gZGFpbHkpIE9SIG1pbiBzaW5nbGUgem9uZSA+IG1pbiBnYXAgem9uZSAmJiBtYXggc2luZ2xlIHpvbmUgPCBtYXggZ2FwIHpvbmVcbi8vIHRoZW4gY2hhcmdlIHNpbmdsZSBtaW4gdG8gc2luZ2xlIG1heCBmYXJlXG4vL0VMU0UgKElGIGJvdGggbWluIGFuZCBtYXggc2luZ2xlcyB3aXRoaW4gbWluIGFuZCBtYXggZGFpbHkgLyBib3RoIG1pbiBhbmQgbWF4IHNpbmdsZXMgd2l0aGluIG1pbiBhbmQgbWF4IHdlZWtseSlcbi8vIHRoZW4gY2hhcmdlIDAgLSBzaG91bGQgc3dhcCB3aXRoIGFib3ZlXG5cbi8vIFJlbWVtYmVyIGNhbGN1bGF0ZSB3aXRob3V0IGFueSBkYWlseSBjYXBzIC0gc2hvdWxkIGJlIHNpbWlsYXIgdG8gZGFpbHkgY2FsY3VsYXRpb25zXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLyoqXG4gKiBHZXRzIGZhcmVzLmpzb24gZmlsZVxuICovXG52YXIgZmV0Y2hGYXJlRGF0YSA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBkYXRhID0gbnVsbDtcblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvaCEgd2UgYXJlIGdldHRpbmcgdGhlIGNhY2hlZCBkYXRhIScpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmV0Y2goJy9kYXRhL2ZhcmVzLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcblx0XHRcdGRhdGEgPSByZXNwLmpzb24oKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xuXHR9XG59KCkpO1xuXG4vLyBHZXRzIHN0YXRpb24uanNvbiAtIGxpc3Rpbmcgd2hhdCB6b25lcyBlYWNoIHN0YXRpb24gaXNcbnZhciBmZXRjaFN0YXRpb25zRGF0YSA9IChmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29oISB3ZSBhcmUgZ2V0dGluZyB0aGUgY2FjaGVkIGRhdGEhJyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaCgnL2RhdGEvc3RhdGlvbnMuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuXHRcdFx0ZGF0YSA9IHJlc3AuanNvbigpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG5cdH1cbn0oKSk7XG5cbi8vRmV0Y2hlcyB0aGUganNvbiBmaWxlIGZyb20gVEZMIEFQSVxudmFyIGZldGNoSm91cm5leURhdGEgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuXHRyZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZnJvbSArICcvdG8vJyArIHRvICsgJz9hcHBfaWQ9OGFjZDc5YTkmYXBwX2tleT1kNDMzYTJkNmQ5YTljOGU4YjFiNGE2ZGQ0MzcxYzY5YicpLnRoZW4oZnVuY3Rpb24oZSkge1xuXHRcdHJldHVybiBlLmpzb24oKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGZhcmVzOiBmZXRjaEZhcmVEYXRhLFxuXHRzdGF0aW9uczogZmV0Y2hTdGF0aW9uc0RhdGEsXG5cdGpvdXJuZXk6IGZldGNoSm91cm5leURhdGEsXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlsaXR5L19nZXREYXRhLmpzIiwiLy9UaGUgY29tcGxldGUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gZ2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHpvbmVzIG9mIHRoYXQgam91cm5leSAodGFraW5nIGludG8gY29uc2lkZXJhdGlvbiBkdWFsIHpvbmVzKVxuLy8gc3RhdGlvbnMgaXMgdGhlIC5qc29uIGZpbGUgZnJvbSBmZXRjaFN0YXRpb25zRGF0YSgpIGZ1bmN0aW9uXG4vLyBOZWVkIHRvIG1ha2UgaXQgc28gdGhhdCBpdCBnZW5lcmF0ZXMgaXQgYWZ0ZXIgZWFjaCBqb3VybmV5XG5cbmltcG9ydCBnZXREYXRhIGZyb20gJy4uL3V0aWxpdHkvX2dldERhdGEnO1xuaW1wb3J0IHtcblx0ZmxhdHRlbixcblx0Z2V0Wm9uZXMsXG5cdGZpbHRlclpvbmVzQnlOdW1iZXIsXG5cdG1pbk51bSxcblx0bWF4TnVtXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTaW5nbGVKb3VybmV5Wm9uZXMoZnJvbSwgdG8sIHN0YXRpb25zKSB7XG5cdHJldHVybiBnZXREYXRhLmpvdXJuZXkoZnJvbSwgdG8pLnRoZW4oZnVuY3Rpb24oam91cm5leSkge1xuXHRcdHZhciBqb3VybmV5ID0gam91cm5leS5qb3VybmV5c1swXTsgLy8gc2VsZWN0aW5nIG9ubHkgdGhlIGZpcnN0IGpvdXJuZXkgZnJvbSB0aGUgQVBJXG5cdFx0dmFyIGxlZ3MgPSBqb3VybmV5LmxlZ3M7IC8vVG8gbG9vayBhdCBlYWNoIGxlZyBvZiB0aGUgam91cm5leVxuXG5cdFx0Ly8gVGhlIGFycmF5IG9mIHpvbmVzIGFzc29jaWF0ZWQgd2l0aCBhbGwgc3RhdGlvbnMgb2YgdGhhdCBqb3VybmV5XG5cdFx0dmFyIGFsbFpvbmVzID0gZmxhdHRlbihsZWdzLm1hcChmdW5jdGlvbihsZWcpIHtcblx0XHRcdHZhciB0ZW1wWm9uZXMgPSBbXTtcblxuXHRcdFx0Ly9HZXRzIHRoZSB6b25lcyBvZiB0aGUgZGVwYXJ0dXJlUG9pbnRzIGFuZCBhZGRzIHRoZW0gdG8gYWxsWm9uZXMgYXJyYXlcblx0XHRcdGlmIChsZWcuZGVwYXJ0dXJlUG9pbnQgJiYgbGVnLmRlcGFydHVyZVBvaW50Lm5hcHRhbklkKSB7IFxuXHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhsZWcuZGVwYXJ0dXJlUG9pbnQubmFwdGFuSWQsIHN0YXRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vR2V0cyB0aGUgem9uZXMgb2YgdGhlIFN0b3BQb2ludCBhbmQgYWRkcyB0aGVtIHRvIGFsbFpvbmVzIGFycmF5XG5cdFx0XHRpZiAobGVnLnBhdGguc3RvcFBvaW50cyAmJiBsZWcucGF0aC5zdG9wUG9pbnRzLmxlbmd0aCA+IDApIHsgXG5cdFx0XHRcdGxlZy5wYXRoLnN0b3BQb2ludHMuZm9yRWFjaChmdW5jdGlvbihzdG9wUG9pbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RvcFBvaW50LmlkKSB7XG5cdFx0XHRcdFx0XHR0ZW1wWm9uZXMucHVzaChnZXRab25lcyhzdG9wUG9pbnQuaWQsIHN0YXRpb25zKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBab25lcztcblx0XHR9KSk7XG5cblxuXHRcdC8vRmlsdGVycyBhbGwgdGhlIHN0YXRpb25zIGFuZCBzcGxpdCB0aGVtIGludG8gem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMgYW5kIHpvbmVzRnJvbUR1YWxTdGF0aW9uc1xuXHRcdC8vIHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZsYXR0ZW4oZmlsdGVyWm9uZXNCeU51bWJlcigxLCBhbGxab25lcykpO1xuXHRcdHZhciB6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyA9IGZpbHRlclpvbmVzQnlOdW1iZXIoMSwgYWxsWm9uZXMpO1xuXHRcdHZhciB6b25lc0Zyb21EdWFsU3RhdGlvbnMgPSBmaWx0ZXJab25lc0J5TnVtYmVyKDIsIGFsbFpvbmVzKTsgLy9OQiB0aGlzIGlzIGFuIGFycmF5IHdpdGhpbiBhbiBhcnJheVxuXHRcdHZhciBmaW5hbE1heFpvbmUgPSBudWxsO1xuXHRcdHZhciBmaW5hbE1pblpvbmUgPSBudWxsO1xuXG5cdFx0aWYgKHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zLmxlbmd0aCA9PT0gMCkgeyAvL2ZvciBkdWFsIHpvbmVzIHRvIGR1YWwgem9uZXMgKipBU1NVTUlORyBDQU4gT05MWSBUUkFWRUwgRlJPTSBUSEUgU0FNRSBEVUFMIFpPTkVTICgyLzMgdG8gMi8zIGFuZCBub3QgMi8zIHRvIDMvNCkqKlxuXHRcdFx0ZmluYWxNYXhab25lID0gbWluTnVtKGZsYXR0ZW4oem9uZXNGcm9tRHVhbFN0YXRpb25zKSk7XG5cdFx0XHRmaW5hbE1pblpvbmUgPSBtaW5OdW0oZmxhdHRlbih6b25lc0Zyb21EdWFsU3RhdGlvbnMpKTtcblx0XHQvLyoqTkVFRCBUTyBBREQgQSBGTEFHIEhFUkUgdG8gc2F5IHRoYXQgaXQgaXMgZHVhbCB0byBkdWFsIHpvbmUgJiB3aGF0IHpvbmVzIChzbyB0aGF0IGNhbiBtYW5pcHVsYXRlIGFuZCBwaWNrIHpvbmVzIGZyb20gY2xvc2VzdCB0byB3ZWVrbHkgY2FwcGVkIHpvbmUgcmF0aGVyIHRoYW4gbWluIHpvbmUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHpvbmVzRnJvbVNpbmdsZVN0YXRpb25zID0gZmxhdHRlbihmaWx0ZXJab25lc0J5TnVtYmVyKDEsIGFsbFpvbmVzKSk7XG5cdFx0XHRcblxuXHRcdFx0Ly9DYWxjdWxhdGVzIHRoZSBtYXggYW5kIG1pbiBab25lcyBvZiBhbGwgdGhlIHpvbmVzIHRoYXQgYXJlIGZyb20gc3RhdGlvbnMgd2l0aG91dCBhbnkgZHVhbCB6b25lcy5cblx0XHRcdHZhciBzaW5nbGVNYXggPSBtYXhOdW0oem9uZXNGcm9tU2luZ2xlU3RhdGlvbnMpO1xuXHRcdFx0dmFyIHNpbmdsZU1pbiA9IG1pbk51bSh6b25lc0Zyb21TaW5nbGVTdGF0aW9ucyk7XG5cblx0XHRcdC8vRm9yIGVhY2ggem9uZXNGcm9tRHVhbFN0YXRpb25zOiBwaWNrcyB0aGUgbW9zdCBhcHByb3ByaWF0ZSB6b25lIGFuZCBhcHBlbmRzIHRvIGR1YWxab25lcyBhcnJheSBcblx0XHRcdC8vIC0tPiBHb2luZyBmcm9tIDIvMyB0byAyLzMg4oCUPiBjaGFyZ2VzIHNhbWUgc2luZ2xlIDIsIDMgb3IgMi0zICgxLjcwKSBidXQgc2hvdWxkIHBpY2sgem9uZSBiYXNlZCBvbiB3ZWVrbHkgKGNvdWxkIGJlIDMpIG9yIGNhcCAoYWx3YXlzIHNtYWxsZXN0OiAyKVxuXHRcdFx0dmFyIGR1YWxab25lcyA9IHpvbmVzRnJvbUR1YWxTdGF0aW9ucy5tYXAoZnVuY3Rpb24oeikge1xuXHRcdFx0XHRyZXR1cm4gei5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0XHRcdGlmIChnZXREaWZmZXJlbmNlKGEsIHNpbmdsZU1pbikgPCBnZXREaWZmZXJlbmNlKGIsIHNpbmdsZU1pbikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9BZGRzIGR1YWxab25lcyB0byBzaW5nbGVNYXggaW50byBhbiBhcnJheSBhbmQgY2FsY3VsYXRlcyB0aGUgbWF4IGFuZCBtaW4gem9uZSBvZiBib3RoXG5cdFx0XHRmaW5hbE1heFpvbmUgPSBtYXhOdW0oW3NpbmdsZU1heF0uY29uY2F0KGR1YWxab25lcykpO1xuXHRcdFx0ZmluYWxNaW5ab25lID0gbWluTnVtKFtzaW5nbGVNaW5dLmNvbmNhdChkdWFsWm9uZXMpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bWF4OiB7XG5cdFx0XHRcdHpvbmVzOiBmaW5hbE1heFpvbmUsXG5cdFx0XHR9LFxuXHRcdFx0bWluOiB7XG5cdFx0XHRcdHpvbmVzOiBmaW5hbE1pblpvbmUsXG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19nZXRTaW5nbGVKb3VybmV5Wm9uZXMuanMiLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV4dGVuc2lvbiBmYXJlIChvciBub25lKSBvZiBhIGpvdXJuZXlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHthcnJheX0gbWlubWF4VHJhdmVsY2FyZCAtIHRoZSBtaW4gYW5kIG1heCB6b25lIG9mIHRoZSB0cmF2ZWxjYXJkIGNvdmVyZWQgem9uZXMsIGluIGFuIGFycmF5XG4gKiBAcGFyYW0ge2FycmF5fSBtaW5tYXhKb3VybmV5IC0gdGhlIG1pbiBhbmQgbWF4IHpvbmUgb2YgdGhlIHNpbmdsZSBqb3VybmV5LCBpbiBhbiBhcnJheVxuICogQHJldHVybnMge251bWJlcn0gLSByZXR1cm5zIHRoZSBmYXJlXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuXG5pbXBvcnQge1xuXHRnZXREaWZmZXJlbmNlLFxuXHRnZXRTaW5nbGVGYXJlLFxuXHRtaW5OdW0sXG59IGZyb20gJy4uL3V0aWxpdHkvX3V0aWxpdHknO1xuXG5pbXBvcnQgc3BsaXRPckZ1bGxGYXJlIGZyb20gJy4vX3NwbGl0T3JGdWxsRmFyZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuc2lvbkZhcmVzKG1pbm1heFRyYXZlbGNhcmQsIG1pbm1heEpvdXJuZXksIHNpbmdsZUZhcmVzKSB7XG5cdHZhciBtaW5UcmF2ZWxjYXJkID0gbWlubWF4VHJhdmVsY2FyZFswXTtcblx0dmFyIG1heFRyYXZlbGNhcmQgPSBtaW5tYXhUcmF2ZWxjYXJkWzFdO1xuXHR2YXIgbWluU2luZ2xlID0gbWlubWF4Sm91cm5leVswXTtcblx0dmFyIG1heFNpbmdsZSA9IG1pbm1heEpvdXJuZXlbMV07XG5cdHZhciBqb3VybmV5RmFyZSA9IG51bGw7XG5cdFxuXHQvL0NPTlRBQ1RMRVNTIG9ubHkgdXNlcyBhZHVsdCBmYXJlc1xuXHQvL0ZPUiBEQUlMWSBDQVBTOiBBTFdBWVMgU1RBUlQgQVQgMSBTTyBNT1NUIE9GIFRISVMgQ09ERSBUT08gQ09NUExFWDogYnV0IHdvdWxkIHN0aWxsIHdvcmtcblx0Ly9GT1IgV0VFS0xZIENBUFM6IHRoaXMgd29ya3Mgb3V0IGZhcmUgd2l0aG91dCBhbnkgZGFpbHkgY2Fwc1xuXG5cdC8vaWYgbWF4IHNpbmdsZSB3aXRoaW4gdHJhdmVsY2FyZCB6b25lcyBidXQgbWluIHNpbmdsZSBpc250LlxuXHRpZiAoIShtaW5UcmF2ZWxjYXJkIDw9IG1pblNpbmdsZSAmJiBtaW5TaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkgJiYgKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuXHRcdHZhciB5ID0gZ2V0RGlmZmVyZW5jZShtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQpO1xuXHRcdGpvdXJuZXlGYXJlID0gZ2V0U2luZ2xlRmFyZShbbWluU2luZ2xlLCBtYXhTaW5nbGUgLSAoeSsxKV0sIHNpbmdsZUZhcmVzKTtcblxuXHQvL2lmIG1pbiBzaW5nbGUgd2l0aGluIHRyYXZlbGNhcmQgem9uZXMgYnV0IG1heCBzaW5nbGUgaXNudC5cbiBcdH0gZWxzZSBpZiAoKG1pblRyYXZlbGNhcmQgPD0gbWluU2luZ2xlICYmIG1pblNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSAmJiAhKG1pblRyYXZlbGNhcmQgPD0gbWF4U2luZ2xlICYmIG1heFNpbmdsZSA8PSBtYXhUcmF2ZWxjYXJkKSkge1xuIFx0XHR2YXIgeSA9IGdldERpZmZlcmVuY2UobWluU2luZ2xlLCBtYXhUcmF2ZWxjYXJkKTtcbiBcdFx0am91cm5leUZhcmUgPSBnZXRTaW5nbGVGYXJlKFttaW5TaW5nbGUgKyAoeSsxKSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuXG4gXHQvL2lmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZFxuIFx0fSBlbHNlIGlmIChtaW5TaW5nbGUgPCBtaW5UcmF2ZWxjYXJkICYmIG1heFNpbmdsZSA+IG1heFRyYXZlbGNhcmQpIHtcbiBcdFx0am91cm5leUZhcmUgPSBzcGxpdE9yRnVsbEZhcmUobWluU2luZ2xlLCBtYXhTaW5nbGUsIG1pblRyYXZlbGNhcmQsIG1heFRyYXZlbGNhcmQsIHNpbmdsZUZhcmVzKTtcblx0Ly9ib3RoIHNpbmdsZSB6b25lcyB3aXRoaW4gdHJhdmVsY2FyZCB6b25lc1xuIFx0fSBlbHNlIGlmICgobWluVHJhdmVsY2FyZCA8PSBtaW5TaW5nbGUgJiYgbWluU2luZ2xlIDw9IG1heFRyYXZlbGNhcmQpICYmIChtaW5UcmF2ZWxjYXJkIDw9IG1heFNpbmdsZSAmJiBtYXhTaW5nbGUgPD0gbWF4VHJhdmVsY2FyZCkpIHtcbiBcdFx0am91cm5leUZhcmUgPSAwO1xuIFx0Ly9ib3RoIHNpbmdsZSB6b25lcyBhcmUgb3V0c2lkZSB0cmF2ZWxjYXJkIHpvbmVzXG4gXHR9IGVsc2Uge1xuIFx0XHRqb3VybmV5RmFyZSA9IGdldFNpbmdsZUZhcmUoW21pblNpbmdsZSwgbWF4U2luZ2xlXSwgc2luZ2xlRmFyZXMpO1xuIFx0fVxuXG4gXHRyZXR1cm4gam91cm5leUZhcmU7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0aWFscy9fZXh0ZW5zaW9uRmFyZXMuanMiLCIvKipcbiAqIElmIG1pbiBzaW5nbGUgbGVzcyB0aGFuIG1pbiB0cmF2ZWxjYXJkIGFuZCBtYXggc2luZ2xlIG1vcmUgdGhhbiBtYXggdHJhdmVsY2FyZCAtIGNhbGN1bGF0ZXMgd2hpY2hldmVyIGlzIGNoZWFwZXI6XG4gKiBcdGVpdGhlciB0d28gc3BsaXQgc2luZ2xlcyBvciBmdWxsIGZhcmUgd2l0aG91dCB0cmF2ZWxjYXJkXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyc30gbWluQ2hhcmdlZFpvbmUgLSB0aGUgbWluIHpvbmUgdGhhdCB3aWxsIGNoYXJnZSBiZXR3ZWVuIHRoaXMgbWluIGNoYXJnYWJsZSB6b25lIHRvIG1pbiB0cmF2ZWxjYXJkIC0gMSAoYXMgc2luZ2xlKSBhbmQgIG1heCBjaGFyZ2VhYmxlIHpvbmUgKHRvIGNoYXJnZSBiZXdlZW4gbWF4IHRyYXZlbGNhcmQgKzEgdG8gbWF4IGNoYXJnZWFibGUgem9uZSlcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcmV0dXJucyB0aGUgY2hlYXBlc3QgZmFyZVxuICogQGRlc2NyaXB0aW9uXG4gKi9cblxuaW1wb3J0IHtcblx0Z2V0U2luZ2xlRmFyZSxcblx0bWluTnVtLFxufSBmcm9tICcuLi91dGlsaXR5L191dGlsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXRPckZ1bGxGYXJlKG1pbkNoYXJnZWRab25lLCBtYXhDaGFyZ2VkWm9uZSwgbWluVHJhdmVsY2FyZCwgbWF4VHJhdmVsY2FyZCwgc2luZ2xlRmFyZXMpIHtcblx0cmV0dXJuIG1pbk51bShbXG5cdFx0Z2V0U2luZ2xlRmFyZShbbWluQ2hhcmdlZFpvbmUsIG1heENoYXJnZWRab25lXSwgc2luZ2xlRmFyZXMpLFxuXHRcdGdldFNpbmdsZUZhcmUoW21pbkNoYXJnZWRab25lLCAobWluVHJhdmVsY2FyZCAtIDEpXSwgc2luZ2xlRmFyZXMpICsgZ2V0U2luZ2xlRmFyZShbKG1heFRyYXZlbGNhcmQgKyAxKSwgbWF4Q2hhcmdlZFpvbmVdLCBzaW5nbGVGYXJlcylcblx0XSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRpYWxzL19zcGxpdE9yRnVsbEZhcmUuanMiXSwic291cmNlUm9vdCI6IiJ9