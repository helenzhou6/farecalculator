/**
 * Calculates the week total (based on parameter oyster or contactless passed as argument)
 * @function
  * @param {function - string} conDayTotal or oysterDayTotal - to calculate using oyster or contactless 
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {object} info - is an object with {
 			options: {object that has minTravelcard: num and maxTravelcard: num}, 
 			data }
 * @returns {number} - total cheapest oyster or contactless fare for that week
 * @description It also deducts the automatic offpeak refunds for zones 4-6 if off peak daily cap is met more than once each week
 		e.g.: 
       const y = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: minNum(weekCap),
          maxTravelcard: maxNum(weekCap),
        },
        data,
      });
 */
 import {
  getFare,
} from './../utility/_utility';

import oysterDayTotal from './_oysterDayTotal';
import conDayTotal from './_contactlessDayTotal';

//works out the equivalent of no cap
export default function weekTotal(paymentFunction, days, info) {
	const offPeakCaps = {
		'zone-4': 0,
		'zone-5': 0,
		'zone-6': 0,
	};

	function incrementCap(zone) {
		if (offPeakCaps.hasOwnProperty(`zone-${zone}`)) {
			offPeakCaps[`zone-${zone}`] += 1;
		}
	}

	const validDays = days.filter(day => day.length > -1);

	let weekTotalFare = validDays.map((day) => { 
	  	//for each day add together the total day total
	  	const dayObject = paymentFunction(day, info.options, info.data);
	  	const dayCapMet = dayObject.capIsMet;

	  	// offPeakCaps[`zone-${dayCapMet}`] += 1;

	  	// console.log(dayCapMet);

	  	incrementCap(dayCapMet);
	  	// console.log(offPeakCaps);
	  	// debugger;


	  	// if (dayCapMet === 4) {
	  	// 	numOffPeakCapZ4 += 1;
	  	// // What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
	  	// } else if (dayCapMet === 6) {
	  	// 	numOffPeakCapZ6 += 1;
	  	// } else if (dayCapMet === 5) {
	  	// 	numOffPeakCapZ5 += 1;
	  	// }

	  	// numOffPeakCap

	 	return dayObject.value;
	 //returns the current week total
	}).reduce((a, b) => a + b);

  // week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if ((offPeakCaps['zone-4'] + offPeakCaps['zone-5'] + offPeakCaps['zone-6']) >= 2) {
	  weekTotalFare -=
	  	(
	  		(offPeakCaps['zone-4'] * (
	  			getFare([1, 4], false, info.data.autoOffPeakRefund)
	  		))
		  	+ (offPeakCaps['zone-6'] * (
		  		getFare([1, 6], false, info.data.autoOffPeakRefund)
		  	))
		  	+ (offPeakCaps['zone-5'] * (
		  		getFare([1, 5], false, info.data.autoOffPeakRefund)
		  	))
	  	);
	}

	return weekTotalFare;
}