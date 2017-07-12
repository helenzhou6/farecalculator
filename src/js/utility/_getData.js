import moize from 'moize';
import dateGen from './_dateGen';

// We need an absolute URL when we run tests
const url = (process && process.env.NODE_ENV === 'test') ? 'http://localhost:3000' : '';

/**
 * Gets fares.json file
 */
const fetchFareData = (() => {
  let data = null;

  return () => {
    if (data) {
      // console.log('oh! we are getting the cached data!');
      return Promise.resolve(data);
    }

    return fetch(`${url}/data/fares.json`).then((resp) => {
      data = resp.json();
      return data;
    });
  };
})();

// Gets station.json - listing what zones each station is
const fetchStationsData = (() => {
  let data = null;

  return () => {
    if (data) {
      // console.log('oh! we are getting the cached data!');
      return Promise.resolve(data);
    }

    return fetch(`${url}/data/tmp/stationResults.json`)
      .then((resp) => {
        data = resp.json();
        return data;
      });
  };
})();

const fetchStationsDataByNaptan = (() => {
  let data = null;

  return () => {
    if (data) {
      // console.log('oh! we are getting the cached data!');
      return Promise.resolve(data);
    }

    return fetchStationsData()
      .then((resp) => {
        data = Object.keys(resp).map(naptan => resp[naptan]);
        return data;
      });
  };
})();

// Fetches the json file from TFL API
const fetchJourneyData = moize((from, to) => (
  // —> time is especially important (need to be very far in future)
  // since when tube improvement works everything breaks.
  // zones are based on travel on a friday about a month in advance.
  fetch(`https://api.tfl.gov.uk/journey/journeyresults/${from}/to/${to}?app_id=8acd79a9&app_key=d433a2d6d9a9c8e8b1b4a6dd4371c69b&date=${dateGen()}&time=1300&mode=overground%2Ctube%2Cdlr`)
    .then(e => e.json())
), {
  serialize: true,
  serializer(args) {
    return Array.from(args).sort((a, b) => (a - b)).join('-');
  },
});

export default {
  fares: fetchFareData,
  stations: fetchStationsData,
  stationsByNaptan: fetchStationsDataByNaptan,
  journey: fetchJourneyData,
};
