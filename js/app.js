// Gets station.json - listing what zones each station is
function getStations() {
	return fetch('/js/stations.json').then(function(e) {
		return e.json();
	});
}

//Fetches the json file from TFL API
function getJourney(from, to) {
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
 * Compares the Zones
 * @function
 * @param {array} zones - the array of zone(s)
 * @param {object} operator - what javascript operator passing through (e.g. Math.max)
 * @returns {number} - the single zone after all calculations (reduces to one number)
 * @description Associated with minZone and maxZone: where arrayZones refers to zonesFromSingleStations.
 	 Loops through the array of zones and applies the operator
 */
function compareZones(arrayZones, operator) {
	return arrayZones.reduce(function(a, b) {
		return operator(a, b);
	});
}

function maxZone(arrayZones) {	
	return compareZones(arrayZones, Math.max);
}

function minZone(arrayZones) {
	return compareZones(arrayZones, Math.min);
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
 * Get difference between 2 numbers
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
// stations is the .json file from getStations() function
getStations().then(function(stations) {

	getJourney('1000029', '1000138').then(function(journey) {
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

		//Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
		// Calls 
		var zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));  
		var zonesFromDualStations = filterZonesByNumber(2, allZones); //NB this is an array within an array

		//Calculates the max and min Zones of all the zones that are from stations without any dual zones.
		var singleMax = maxZone(zonesFromSingleStations);
		var singleMin = minZone(zonesFromSingleStations);

		//For each zonesFromDualStations: picks the most appropriate zone and appends to dualZones array 
		var dualZones = zonesFromDualStations.map(function(z) {
			return z.reduce(function(a, b) {
				if (getDifference(a, singleMin) < getDifference(b, singleMin)) {
					return a;
				}
				return b;
			});
		});

		//Adds dualZones to singleMax into an array and calculates the max and min zone of both
		var finalMaxZone = maxZone([singleMax].concat(dualZones));
		var finalMinZone = minZone([singleMin].concat(dualZones));

		console.log(finalMaxZone);
		console.log(finalMinZone);
	});
});