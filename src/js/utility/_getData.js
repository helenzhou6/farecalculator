import moize from 'moize';
import dateGen from './_dateGen';

/**
 * Gets fares.json file
 */
var fetchFareData = (function () {
	var data = null;

	return function() {
		if (data) {
			// console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('http://localhost:3000/data/fares.json').then(function(resp) {
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
			// console.log('oh! we are getting the cached data!');
			return Promise.resolve(data);
		}

		return fetch('http://localhost:3000/data/tmp/stationResults.json')
			.then(function(resp) {
        data = resp.json();
        return data;
      });
	}
}());


//Fetches the json file from TFL API
var fetchJourneyData = moize(function(from, to) {
// —> time is especially important (need to be very far in future) since when tube improvement works everything breaks.
//  zones are based on travel on a friday about a month in advance.
	return fetch('https://api.tfl.gov.uk/journey/journeyresults/' + from + '/to/' + to
	+ '?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b'
	+ '?date=' + dateGen() + '&time=1300&mode=overground%2Ctube%2Cdlr'
	).then(function(e) {
		return e.json();
	});
}, {
  serialize: true,
  serializer: function(args) {
    return Array.from(args).sort(function (a, b) { return a - b; }).join('-');
	}
});

export default {
	fares: fetchFareData,
	stations: fetchStationsData,
	journey: fetchJourneyData,
};
