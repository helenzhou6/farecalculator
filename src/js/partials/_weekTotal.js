import oysterDayTotal from './_oysterDayTotal';
import conDayTotal from './_contactlessDayTotal';

export default function weekTotal(paymentFunction, days, info) {
	let numOffPeakCapZ4 = 0;
	let numOffPeakCapZ6 = 0;

	let weekTotalFare = days.map(function (day) { 

	  	//for each day add together the total day total
	  	const dayObject = paymentFunction(day, info.options, info.data);

	  	if (dayObject.capIsMet == 4) {
	  		numOffPeakCapZ4 += 1;
	  	// What about refunds if the cap is between zones 1-5?? and if does not apply - then cheaper to do discounted zone 1-4 plus extension fares to 5?
	  	} else if (dayObject.capIsMet == 6) {
	  		numOffPeakCapZ6 += 1;
	  	}
	 	return dayObject.value;

	 //returns the current week total
	}).reduce((a, b) => a + b);


  // week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount
	if ((numOffPeakCapZ4 + numOffPeakCapZ6) >= 2) {
	  weekTotalFare -= ((numOffPeakCapZ4 * 0.4) + (numOffPeakCapZ6 * 2.1));
	}

	return weekTotalFare;
}