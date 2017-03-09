// old

/**
 * Calculates the contactless total fare for the day
 * @function
  * @param { day object} day object containing all the journey objects (that in turn has zones array, dualzones and type (offpeak or anytime))
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description Works out if it is cheapest to have no daily caps, an off peak daily cap + peak fares or an anytime cap (taking into account weekly travelcards passed in)
 */

 import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  flatten,
  round,
  types,
  dualZone,
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

	const cheapestAnytime = allDailyCaps.map((cap) => {

		const total = day.map(journey => {

		    //types function deals with early  /afternoon peak/offpeak handling
		    let journeyType = types(journey.type);

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
			}
			return extensionFares({
		 		minTravelcard: minTravelcard,
		 		maxTravelcard: maxTravelcard,
		 		maxDaily: conDaily,
		 		zones: journey.zones,
		 		type: journeyType,
		 	}, singleFares);

		}).reduce((a, b) => a + b);

		return total + getFare(cap, 'anytime', dailyCaps);
	});

	// for cheapest mix peak journeys + each daily off peak cap
	const cheapestOffPeak = allDailyCaps.map((cap) => {
		const offPeakMaxZone = maxNum(cap);
		
		const offPeakDayTotal = day.map(journey => {

		    //types function deals with early  /afternoon peak/offpeak handling
		    let journeyType = types(journey.type);

			if (maxTravelcard) {
				if (journey.dualZoneOverlap === true &&
					(((minNum(journey.zones)) + 1) >= minTravelcard) &&
					(((maxNum(journey.zones)) + 1) <= maxTravelcard)
					) {
					return 0;
				}

			}

			if (journey.type === 'offPeak' || journey.type === 'afternoon') {
				return extensionFares({
			 		minTravelcard: minTravelcard,// false if nothing passed in
			 		maxTravelcard: maxTravelcard,// false if nothing passed in
			 		maxDaily: maxNum(cap),
			 		zones: journey.zones,
			 		type: journeyType,
			 	}, singleFares);
			} else {
				return extensionFares({
			 		minTravelcard: minTravelcard,// false if nothing passed in
			 		maxTravelcard: maxTravelcard,// false if nothing passed in
			 		zones: journey.zones,
			 		type: journeyType,
				}, singleFares);
			}
		}).reduce((a, b) => a + b);

		return {
			offPeakMaxZone,
			value: offPeakDayTotal + getFare(cap, 'offPeak', dailyCaps),
		};
	});

		// for no daily caps
	const cheapestNoCap = day.map(journey => {
		//weird off peak
	    //types function deals with early  /afternoon peak/offpeak handling
   		let journeyType = types(journey.type);

		// fixes dual overlap 
		if (maxTravelcard) {
			if (journey.dualZoneOverlap === true &&
				(((minNum(journey.zones)) + 1) >= minTravelcard) &&
				(((maxNum(journey.zones)) + 1) <= maxTravelcard)
				) {
				return 0;
			}
		}
		return extensionFares({
	 		minTravelcard: minTravelcard,
	 		maxTravelcard: maxTravelcard,
			zones: journey.zones,
			type: journeyType,
		}, singleFares);

	}).reduce((a, b) => a + b);

	// creates an array of the cheapestOffPeak values (out of the object)
	const lToValues = cheapestOffPeak.map((lVal) => lVal.value);

	// cheapest value
	const minAll = minNum(cheapestAnytime.concat([cheapestNoCap], lToValues));

	// evaluates if any of the cheapestOffPeak values is equal to the cheapest value
	const isEq = cheapestOffPeak.some(entry => {
		return entry.value == minAll;
	});

	// if above is met, then find the max cap within the object that matches with the cheapest value
	var capVal;
	if (isEq) {
		capVal = cheapestOffPeak.filter((lVal) => lVal.value === minAll);
	}
	// returns an object: the cheapest value, whether off peak cap is met (if so will be the max off peak zone)
	return {
		value: round(minAll, 2),
		capIsMet: isEq ? capVal[0].offPeakMaxZone : false,
	};

	//finally selects cheapest cheapest daily cap option for each day (in a 7 day array)
}	