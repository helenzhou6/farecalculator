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
	let numOffPeakCapZ4 = 0;
	let numOffPeakCapZ6 = 0;
	let numOffPeakCapZ5 = 0;

	let weekTotalFare = days.map(function (day) { 
		//if day is empty with no journeys
		if (day === undefined || day.length === 0) {
			return 0;
		}
	  	//for each day add together the total day total
	  	const dayObject = paymentFunction(day, info.options, info.data);
	  	const dayCapMet = dayObject.capIsMet;

	  	if (dayCapMet === 4) {
	  		numOffPeakCapZ4 += 1;
	  	// What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
	  	} else if (dayCapMet === 6) {
	  		numOffPeakCapZ6 += 1;
	  	} else if (dayCapMet === 5) {
	  		numOffPeakCapZ5 += 1;
	  	}

	 	return dayObject.value;
	 //returns the current week total
	}).reduce((a, b) => a + b);
  // week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if ((numOffPeakCapZ4 + numOffPeakCapZ6 + numOffPeakCapZ5) >= 2) {
	  weekTotalFare -=
	  	(
	  		(numOffPeakCapZ4 * (
	  			getFare([1, 4], false, info.data.autoOffPeakRefund)
	  		))
		  	+ (numOffPeakCapZ6 * (
		  		getFare([1, 6], false, info.data.autoOffPeakRefund)
		  	))
		  	+ (numOffPeakCapZ5 * (
		  		getFare([1, 5], false, info.data.autoOffPeakRefund)
		  	))
	  	);
	}

	return weekTotalFare;
}