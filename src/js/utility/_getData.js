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

		return fetch('/data/fares.json').then(function(resp) {
			data = resp.json();
			return data;
		});
	}
}());

// Gets station.json - listing what zones each station is
var fetchStationsData = (function() {
	var data = null;

	return function() {
		if (data) {
			console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('/data/stations.json').then(function(resp) {
			data = resp.json();
			return data;
		});
	}
}());

//Fetches the json file from TFL API
var fetchJourneyData = function(from, to) {
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to + '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b').then(function(e) {
		return e.json();
	});
};

export default {
	fares: fetchFareData,
	stations: fetchStationsData,
	journey: fetchJourneyData,
};