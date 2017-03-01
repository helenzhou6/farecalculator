import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  flatten,
} from './../utility/_utility';

import extensionFares from './_extensionFares';

export default function conDayTotal(day, data) {
	const {
		singleFares,
	} = data;

	const weeklyCaps = keysToJourney(data.weeklyCaps);
	const dailyCaps = keysToJourney(data.dailyCaps);

	// return days.map((day) => { 

// gets cheapest daily anytime cap
	const t = dailyCaps.map((cap) => {
		const total = day.map(journey => {
			return extensionFares({
		 		minTravelcard: minNum(cap),
		 		maxTravelcard: maxNum(cap),
		 		zones: journey.zones,
		 		type: journey.type,
		 	}, singleFares);
		}).reduce((a, b) => a + b);

		return total + getFare(cap, 'anytime', data.dailyCaps);
	});
	// console.log(t);

// for no caps
	const x = day.map(journey => {
		return getFare(journey.zones, journey.type, data.singleFares)
	}).reduce((a, b) => a + b);
	// console.log(x);

// for cheapest mix peak journeys + each daily off peak cap
	const l = dailyCaps.map((cap) => {
		const c = day.map(journey => {
			if(journey.type === 'offPeak') {
				return extensionFares({
			 		minTravelcard: minNum(cap),
			 		maxTravelcard: maxNum(cap),
			 		zones: journey.zones,
			 		type: 'offPeak',
			 	}, singleFares);
			} else {
				return getFare(journey.zones, 'anytime', data.singleFares);
			}
		}).reduce((a, b) => a + b);
		return c + getFare(cap, 'offPeak', data.dailyCaps);
	});

	// console.log(l);

	return minNum(t.concat([x], l));
	// });
}	

// FOR EACH WEEKLY: loop over possibility -

// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps // --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)



// import {
//   journeyToKey,
//   keysToJourney,
//   maxNum,
//   minNum,
//   getFare,
// } from './../utility/_utility';

// import extensionFares from './_extensionFares';


// export default function contactless(days, data) {
// 	const {
// 		singleFares,
// 	} = data;

// 	// const weeklyCaps = keysToJourney(data.weeklyCaps);
// 	const dailyCaps = keysToJourney(data.dailyCaps);

// 	//FOR EACH DAY -- 

// 	return days.map((day) => {
// 		const t = dailyCaps.map((cap) => {
// 			// debugger;
// 			const total = day.map(journey => {
				
// 				return extensionFares({
// 			 		minTravelcard: minNum(cap),
// 			 		maxTravelcard: maxNum(cap),
// 			 		zones: journey.zones,
// 			 		type: journey.type,
// 			 	}, singleFares);

				
// 			}).reduce((a, b) => a + b);

// 			return total + getFare(cap, 'anytime', data.dailyCaps);
// 		});
// 		return minNum(t);
// 	});
// }
