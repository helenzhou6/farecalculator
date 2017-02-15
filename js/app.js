// Gets station.json - listing what zones each station is
function fetchStationsData() {
	return fetch('/js/stations.json').then(function(e) {
		return e.json();
	});
}

//Fetches the json file from TFL API
function fetchJourneyData(from, to) {
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to + '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b').then(function(e) {
		return e.json();
	});
}

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
 * Filters the Zones by the number of zones it has (dual zone or single zone)
 * @function
 * @param {number} num - either 1 (for single zone) or 2 (dual zone)
 * @param {array} zones - the array of numbers
 * @returns {array} - array of all the zones from stations that only have one zone associated with it (if num = 1) or...
 * @description - zones refers to global allZones
 */
function filterZonesByNumber(num, zones) {
	return zones.filter(function(zone) {
		return zone.length === num;
	});
}

/**
 * Compares Numbers
 * @function
 * @param {array} numbers - the array of number(s)
 * @param {object} operator - what javascript operator passing through (e.g. Math.max)
 * @returns {number} - the single number after all calculations (reduces to one number)
 * @description Associated with minZone and maxZone: where arrayZones refers to zonesFromSingleStations.
 	 Loops through the array of zones and applies the operator
 */
function compareNumbers(arrayNumbers, operator) {
	return arrayNumbers.reduce(function(a, b) {
		return operator(a, b);
	});
}

function maxZone(arrayZones) {	
	return compareNumbers(arrayZones, Math.max);
}

function minZone(arrayZones) {
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
	return arr.reduce(function(a, b) {
		return a.concat(b);
	});
}

//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey
fetchStationsData().then(function(stations) {

	fetchJourneyData('1000029', '1000138').then(function(journey) {
		var journey = journey.journeys[0]; // selecting only the first journey from the API
		var legs = journey.legs; //To look at each leg of the journey

		// The array of zones associated with all stations of that journey
		var allZones = flatten(legs.map(function(leg) {
			var tempZones = [];

			//Gets the zones of the departurePoints and adds them to allZones array
			if (leg.departurePoint && leg.departurePoint.naptanId) { 
				tempZones.push(getZones(leg.departurePoint.naptanId, stations));
			}

			//Gets the zones of the StopPoint and adds them to allZones array
			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) { 
				leg.path.stopPoints.forEach(function(stopPoint) {
					if (stopPoint.id) {
						tempZones.push(getZones(stopPoint.id, stations));
					}
				});
			}

			return tempZones;
		}));

		// console.log(filterZonesByNumber(1, allZones));
		// debugger;

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));


		var zonesFromSingleStations = filterZonesByNumber(1, allZones);
		var zonesFromDualStations = filterZonesByNumber(2, allZones); //NB this is an array within an array
		var finalMaxZone = null;
		var finalMinZone = null;

		if (zonesFromSingleStations.length === 0) { //for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
			finalMaxZone = minZone(flatten(zonesFromDualStations));
			finalMinZone = minZone(flatten(zonesFromDualStations));
		//**NEED TO ADD A FLAG HERE to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone)
		} else {
			zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));
			

			//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
			var singleMax = maxZone(zonesFromSingleStations);
			var singleMin = minZone(zonesFromSingleStations);

			//For each zonesFromDualStations: picks the most appropriate zone and appends to dualZones array 
			// --> Going from 2/3 to 2/3 —> charges same single 2, 3 or 2-3 (1.70) but should pick zone based on weekly (could be 3) or cap (always smallest: 2)
			var dualZones = zonesFromDualStations.map(function(z) {
				return z.reduce(function(a, b) {
					if (getDifference(a, singleMin) < getDifference(b, singleMin)) {
						return a;
					}
					return b;
				});
			});

			//Adds dualZones to singleMax into an array and calculates the max and min zone of both
			finalMaxZone = maxZone([singleMax].concat(dualZones));
			finalMinZone = minZone([singleMin].concat(dualZones));
		}

		// console.log(finalMaxZone);
		// console.log(finalMinZone);
	});
});

// Formulate array? Journey 1 object: with zones travelled (array: min and max), time, off-peak or on-peak, single price, flag for dual to dual (and what zones).

//--------------------------------------------
// Global functions > compareNumbers (can reduce to the maxZone and minZone of an array) & getDifference bw 2 numbers

/**
 * Gets fares.json file
 */
var fetchFareData = (function () {
	var data = null;

	return function() {
		if (data) {
			console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('/js/fares.json').then(function(resp) {
			data = resp.json();
			return data;
		});
	}
}());

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


//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
// what about zone 1 to zone 1 exception for off peak>?

// - OYSTER Cheapest Fare
fetchFareData().then(function(fareData) {
	var dailyCaps = fareData.dailyCaps;
	var singleFares = fareData.singleFares;

//An array of all the journeys with their max and min zones travelled
	var journeys = [
		[2, 1],
		[1, 2],
		[1, 2],
		[2, 1],
		[1, 6]
	];

//cumTotal = the total that updates and becomes the final oyster fare
	var oyCumTotal = null;
//maxZonessofar for each journey updates and is the array of all the zones travelled in so far
	var maxZonesofar = journeys[0];

	journeys.forEach(function(journey) {
		//Gets the maximum zones of all the zones travelled in so far
		maxZonesofar = maxZone(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = getDailyCap(maxZonesofar, dailyCaps);
		var single = getSingleFare(journey, singleFares);
	
		//adds the single fare to the cumulative total
		oyCumTotal += single;

		//if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
		if (oyCumTotal >= maxZoneDailyCap) {
			oyCumTotal = maxZoneDailyCap;
		}
	});
	//This is the final oyster daily fare calculated:
	console.log(oyCumTotal);


// - CONTACTLESS Cheapest Fare = 
// 		Extension fares for anything out of those zones (since all daily cap start at zone 1, just latter)
// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
// 	---> Compare all the possibilities and select the cheapest (including total single). 

	var conFares = null;
	var conFinalFare = null;
	var conMaxZone = maxZone(flatten(journeys));

	journeys.forEach(function(journey) {
		conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});

	if (conFares > getDailyCap(2, dailyCaps)){

		var conAllComboFares = [];
		for (i = 2; i <= conMaxZone; i++) {
			var conCumTotal = getDailyCap(i, dailyCaps);
			journeys.forEach(function(journey) {
				//somehow look at all journeys, remove section covered by the daily cap, and charge for that single
			});
			conAllComboFares.push(conCumTotal);
		}
		conFinalFare = minZone(conAllComboFares, Math.min);

	} else {
		conFinalFare = conFares;
	}
});


fetchFareData().then(function(fareData) {
	var singleFares = fareData.singleFares;	

	/**
	 * Calculates the extension fare (or none) of a journey
	 * @function
	 * @param {array} minmaxTravelcard - the min and max zone of the travelcard covered zones, in an array
	 * @param {array} minmaxJourney - the min and max zone of the single journey, in an array
	 * @returns {number} - returns the fare
	 * @description
	 */
	
	var minmaxTravelcard = [3, 4];
	var minmaxJourney = [1, 4];
	
	function extensionFares(minmaxTravelcard, minmaxJourney) {
		var minTravelcard = minmaxTravelcard[0];
		var maxTravelcard = minmaxTravelcard[1];
		var minSingle = minmaxJourney[0];
		var maxSingle = minmaxJourney[1];
		var journeyFare = null;
	
		if (!(minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
			var y = getDifference(maxSingle, minTravelcard);
			var journey = [minSingle, maxSingle - (y+1)];
			journeyFare = getSingleFare(journey, singleFares);
			console.log(journeyFare);
	 	} 
	};
	
	extensionFares(minmaxTravelcard, minmaxJourney);
});






