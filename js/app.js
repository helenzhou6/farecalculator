// Gets a list of tube stations
function getStations() {
	return fetch('/js/stations.json').then(function(e) {
		return e.json();
	});
}

function getJourney(from, to) {
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to + '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b').then(function(e) {
		return e.json();
	});
}

function getZones(napTan, stations) {
	return stations[napTan].zones;
}

function compareZones(zones, operator) {
	return zones.reduce(function(a, b) {
		return operator(a, b);
	});
}

function maxZone(zones) {
	return compareZones(zones, Math.max);
}

function minZone(zones) {
	return compareZones(zones, Math.min);
}

function filterZonesByNumber(num, zones) {
	return zones.filter(function(zone) {
		return zone.length === num;
	});
}
  
getStations().then(function(stations) {
	var stations = stations;

	getJourney('1000029', '1000138').then(function(journey) {
		var journey = journey.journeys[0];
		var legs = journey.legs;
		
		var zones = [];

		legs.forEach(function(leg) {
			if (leg.departurePoint && leg.departurePoint.naptanId) {
				zones.push(getZones(leg.departurePoint.naptanId, stations));
			}

			if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
				leg.path.stopPoints.forEach(function(stopPoint) {
					if (stopPoint.id) {
						zones.push(getZones(stopPoint.id, stations));
					}
				});
			}
		});

		var singleZoneStations = filterZonesByNumber(1, zones);

		var max = maxZone(singleZoneStations);
		var min = minZone(singleZoneStations);

		var dualZoneStations = filterZonesByNumber(2, zones);

		if (dualZoneStations.length) {
			dualZoneStations.forEach(function(zones) {

				var selectedZone = 1;
				if ((zones[0] - max) < (zones[1] - max)){
					selectedZone = zones[0];
				} else {
					selectedZone = zones[1];
				};

				if (max >= selectedZone && selectedZone >= min) {
					console.log('hi');
				} else {
					if (selectedZone > max) {
						max = selectedZone;
					} else {
						min = selectedZone;
					}
				}

			});
		}
		console.log(min);
		console.log(max);

		// 	console.log(dualZoneStations);
		// 	dualZoneStations.forEach(function(zones) {
		// 		// console.log(zones);
		// 		// dualZoneStations.zones[0] - maxZone 
		// 		// dualZoneStations.zones[1] - maxZone 	
		// 		// });
		// 	});
		// }
	});
});