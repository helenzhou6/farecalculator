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

// SHOULD MAP OVER JSON TO FIND THE ZONES WITH OFF PEAK DISCOUNT rather than add 4, 5 and 6
import {
  getFare,
} from './../../utility/_utility';

export default function weekTotal(paymentFunction, days, info) {
  // Filters the days by those with journeys
  const validDays = days.filter(day => day.length > -1);

  // Uses the paymentFunction passed in (oyster or contactless) to generate an array
  // -- Array is an object per day (with day total fare and isCapMet)
  const weekAllCaps = validDays.map((day) => paymentFunction(day, info.options, info.data));

  // Loops over the object per day to accumulate the number of off peak zone 1-4, 1-5 and 1-6 daily caps met
  const offPeakCaps = weekAllCaps.reduce((a, b) => {
    if (b.hasOwnProperty('capIsMet') && b.capIsMet !== false) {
      a[b.capIsMet] += 1;
    }
    return a;
  }, { 4: 0, 5: 0, 6: 0 });

  // Adds together the day total fares to = current week total fare
  let weekTotalFare = weekAllCaps.reduce((a, b) => a + b.value, 0);

  // If off peak daily cap between 4-6 met for 2+ a week, applies the discount(s)
  if ((offPeakCaps['4'] + offPeakCaps['5'] + offPeakCaps['6']) >= 2) {
    weekTotalFare -=
      (
        (offPeakCaps['4'] * (
          getFare([1, 4], false, info.data.autoOffPeakRefund)
        ))
        + (offPeakCaps['6'] * (
          getFare([1, 6], false, info.data.autoOffPeakRefund)
        ))
        + (offPeakCaps['5'] * (
          getFare([1, 5], false, info.data.autoOffPeakRefund)
        ))
      );
  }

  // Returns the final week total
  return weekTotalFare;
}
