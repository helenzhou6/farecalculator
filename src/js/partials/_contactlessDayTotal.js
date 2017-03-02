import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  flatten,
} from './../utility/_utility';

import extensionFares from './_extensionFares';

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
// FOR WEEKLY TRAVELCARD
	if (maxTravelcard) {
	// gets cheapest daily anytime cap
		const t = allDailyCaps.map((cap) => {
			const total = day.map(journey => {
				return extensionFares({
			 		minTravelcard,
			 		maxTravelcard,
			 		maxDaily: maxNum(cap),
			 		zones: journey.zones,
			 		type: journey.type,
			 	}, singleFares);
			}).reduce((a, b) => a + b);

			return total + getFare(cap, 'anytime', dailyCaps);
		});
		// console.log(t);

	// for no daily caps
		const x = day.map(journey => {
			return extensionFares({
				minTravelcard,
				maxTravelcard,
				zones: journey.zones,
				type: journey.type,
			}, singleFares);
		}).reduce((a, b) => a + b);
		// console.log(x);

	// for cheapest mix peak journeys + each daily off peak cap
		const l = allDailyCaps.map((cap) => {
			const c = day.map(journey => {
				if(journey.type === 'offPeak') {
					return extensionFares({
				 		minTravelcard,
				 		maxTravelcard,
				 		maxDaily: maxNum(cap),
				 		zones: journey.zones,
				 		type: 'offPeak',
				 	}, singleFares);
				} else {
					return extensionFares({
				 		minTravelcard,
				 		maxTravelcard,
				 		zones: journey.zones,
				 		type: 'anytime',
					}, singleFares);
				}
			}).reduce((a, b) => a + b);
			return c + getFare(cap, 'offPeak', dailyCaps);
		});

	// console.log(l);

	//finally selects cheapest cheapest daily cap option
		return minNum(t.concat([x], l));

	} else { //FOR NO WEEKLY TRAVELCARD: need to split this function

	// gets cheapest daily anytime cap
		const t = allDailyCaps.map((cap) => {
			const total = day.map(journey => {
				return extensionFares({
			 		minTravelcard: minNum(cap),
			 		maxTravelcard: maxNum(cap),
			 		zones: journey.zones,
			 		type: journey.type,
			 	}, singleFares);
			}).reduce((a, b) => a + b);

			return total + getFare(cap, 'anytime', dailyCaps);
		});
		// console.log(t);

	// for no caps
		const x = day.map(journey => {
			return getFare(journey.zones, journey.type, singleFares)
		}).reduce((a, b) => a + b);
		// console.log(x);

	// for cheapest mix peak journeys + each daily off peak cap
		const l = allDailyCaps.map((cap) => {
			const c = day.map(journey => {
				if(journey.type === 'offPeak') {
					return extensionFares({
				 		minTravelcard: minNum(cap),
				 		maxTravelcard: maxNum(cap),
				 		zones: journey.zones,
				 		type: 'offPeak',
				 	}, singleFares);
				} else {
					return getFare(journey.zones, 'anytime', singleFares);
				}
			}).reduce((a, b) => a + b);
			return c + getFare(cap, 'offPeak', dailyCaps);
		});

	// console.log(l);
	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
		return minNum(t.concat([x], l));
	}
 	// adds up each day's cheapest fare to become cheapest week total fare
}	