import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  flatten,
  round,
} from './../utility/_utility';

import extensionFares from './_extensionFares';

// If the offpeak cap is met, return a variable 'capIsMet' + maxZone of that cap

// This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
export default function conDayTotal(day, options = {}, data = {}) {
	  const {
	    minTravelcard, //if needed for weekly
	    maxTravelcard, //if needed for weekly
	  } = options;

	  const {
	    dailyCaps, //JSON
	    singleFares, //JSON
	  } = data;

	const allDailyCaps = keysToJourney(dailyCaps);
	// gets cheapest daily anytime cap

	let conMin = minTravelcard;
	let conMax = maxTravelcard;

	const t = allDailyCaps.map((cap) => {

		const total = day.map(journey => {

			let conDaily = maxNum(cap);
			if (maxTravelcard) {
				// dual to dual stations: if min weekly travelcard zone =< max dual zone zone
				// = > then changes dual to dual  stations to min weekly travelcard zone
				// THIS IS DUPLICATED x3 -- refactor
				if (journey.dualZoneOverlap === true &&
					(((minNum(journey.zones)) + 1) >= minTravelcard) &&
					(((maxNum(journey.zones)) + 1) <= maxTravelcard)
					) {
					return 0;
				}
			} else {
				let conMin = minNum(cap);
				let conMax = maxNum(cap);
				let conDaily = false;
			}

			return extensionFares({
		 		minTravelcard: conMin,
		 		maxTravelcard: conMax,
		 		maxDaily: conDaily,
		 		zones: journey.zones,
		 		type: journey.type,
		 	}, singleFares);

		}).reduce((a, b) => a + b);

		return total + getFare(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	// need a flag for off peak cap between 1-4, 1-5 or 1-6
	const l = allDailyCaps.map((cap) => {
		const maxZoneInCap = maxNum(cap);
		
		const c = day.map(journey => {
			let conDaily = maxNum(cap);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true &&
					(((minNum(journey.zones)) + 1) >= minTravelcard) &&
					(((maxNum(journey.zones)) + 1) <= maxTravelcard)
					) {
					return 0;
				}
			} else {
				let conMin = minNum(cap);
				let conMax = maxNum(cap);
				let conDaily = false;
			}
			if(journey.type === 'offPeak') {
				return extensionFares({
			 		minTravelcard: conMin,
			 		maxTravelcard: conMax,
			 		maxDaily: conDaily,
			 		zones: journey.zones,
			 		type: 'offPeak',
			 	}, singleFares);
			} else {
				return extensionFares({
			 		minTravelcard: conMin,
			 		maxTravelcard: conMax,
			 		zones: journey.zones,
			 		type: 'anytime',
				}, singleFares);
			}
		}).reduce((a, b) => a + b);

		return {
			maxZoneInCap,
			value: c + getFare(cap, 'offPeak', dailyCaps),
		};
	});

		// for no daily caps
	const x = day.map(journey => {

		if (maxTravelcard) {
			if (journey.dualZoneOverlap === true &&
				(((minNum(journey.zones)) + 1) >= minTravelcard) &&
				(((maxNum(journey.zones)) + 1) <= maxTravelcard)
				) {
				return 0;
			}
		} else {
			let conMin = false;
			let conMax = false;
		}
		return extensionFares({
	 		minTravelcard: conMin,
	 		maxTravelcard: conMax,
			zones: journey.zones,
			type: journey.type,
		}, singleFares);

	}).reduce((a, b) => a + b);

	// creates an array of the l values (out of the object)
	const lToValues = l.map((lVal) => lVal.value);

	// cheapest value
	const minAll = minNum(t.concat([x], lToValues));

	// evaluates if any of the l values is equal to the cheapest value
	const isEq = l.some(entry => {
		return entry.value == minAll;
	});

	// if above is met, then find the max cap within the object that matches with the cheapest value
	var capVal;
	if (isEq) {
		capVal = l.filter((lVal) => lVal.value === minAll);
	}

	// returns an object: the cheapest value, whether off peak cap is met (if so will be the max off peak zone)
	return {
		value: round(minAll, 2),
		capIsMet: isEq ? capVal[0].maxZoneInCap : false,
	};

	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
}	