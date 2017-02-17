//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

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
	var minmaxJourney = [1, 6];
	
	function extensionFares(minmaxTravelcard, minmaxJourney) {
		var minTravelcard = minmaxTravelcard[0];
		var maxTravelcard = minmaxTravelcard[1];
		var minSingle = minmaxJourney[0];
		var maxSingle = minmaxJourney[1];
		var journeyFare = null;
		
		//CONTACTLESS only uses adult fares
		//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
		//FOR WEEKLY CAPS: this works out fare without any daily caps
		//if max single within travelcard zones but min single isnt.
		if (!(minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
			var y = getDifference(maxSingle, minTravelcard);
			var journey = [minSingle, maxSingle - (y+1)];
			journeyFare = getSingleFare(journey, singleFares);
		//if min single within travelcard zones but max single isnt.
	 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
	 		var y = getDifference(minSingle, maxTravelcard);
	 		var journey = [minSingle + (y+1), maxSingle];
	 		journeyFare = getSingleFare(journey, singleFares);
	 	//if min single less than min travelcard and max single more than max travelcard
	 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
	 		var fares = [];
	 		var y = getDifference(minSingle, minTravelcard);
	 		var x = getDifference(maxSingle, maxTravelcard);
	 		// picks the cheapest: split singles or the full fare without travelcard == should be a global function
	 		var cost = getSingleFare([minSingle, (minTravelcard - 1)], singleFares) + getSingleFare([(maxTravelcard + 1), maxSingle], singleFares);
	 		fares.push(cost);
			var journey = [minSingle, maxSingle];
			fares.push(getSingleFare(journey, singleFares));
			journeyFare = minZone(fares)
		//both single zones within travelcard zones
	 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
	 		journeyFare = 0;
	 	//both single zones are outside travelcard zones
	 	} else {
	 		var journey = [minSingle, maxSingle];
	 		journeyFare = getSingleFare(journey, singleFares);
	 	}
	 	return journeyFare;
	 	console.log(journeyFare);
	};
	extensionFares(minmaxTravelcard, minmaxJourney);
// });

//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
// what about zone 1 to zone 1 exception for off peak>?

// - OYSTER Cheapest Fare
// fetchFareData().then(function(fareData) {
	var dailyCaps = fareData.dailyCaps;
	// var singleFares = fareData.singleFares;

//An array of all the journeys with their max and min zones travelled
	var journeys = [
		[2, 1],
		[1, 2],
		[2, 1],
		[1, 2],
		[2, 4],
		[1, 3],
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
	// console.log(oyCumTotal);


// - CONTACTLESS Cheapest Fare = 
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	journeys.forEach(function(journey) {
		conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	 var conMaxZone = maxZone(flatten(journeys));
	 for (var i = 2; i <= conMaxZone; i++) {
	 	console.log('for daily cap 1 to ' + i);
	 	var conCumTotal = getDailyCap(i, dailyCaps);
	 	 for (var x = 0; x < journeys.length; x++) {
	 	 	//adding extension fares to cumTotal
	 		conCumTotal += extensionFares([1, i], journeys[x]);
	 	 };
	 	console.log(conCumTotal);

	 	conAllFares.push(conCumTotal);
	 }

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = minZone(conAllFares);
	// console.log(conFinalFare);
});

//CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap

//THIS METHOD RELIES ON THE FACT THAT:
//- zone x to x fare is the same as zone x-1 to zone x fare
//- If the difference between the min and max gap zones are > 1, breaks since assuming fare for x to x and x-1 to x are the same.
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
//IF min single zone <= min gap zone && max single > max weely zone
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare
//IF min single and max single both > max weekly zone (or both < min daily)
// then charge single min to single max fare
//ELSE (IF both min and max singles within min and max daily / both min and max singles within min and max weekly)
// then charge 0

// Remember calculate without any daily caps - should be similar to daily calculations



