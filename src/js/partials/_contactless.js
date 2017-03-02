import {
  keysToJourney,
  maxNum,
  minNum,
  getFare,
} from './../utility/_utility';

import conDayTotal from './_contactlessDayTotal';
import weekTotal from './_weekTotal';

export default function contactless(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
 	const final = weeklyCaps.map((weekCap) => {
      const y = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: minNum(weekCap),
          maxTravelcard: maxNum(weekCap),
        },
        data,
      });
      return y + getFare(weekCap, false, data.weeklyCaps);
    });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  const noWeekly = weekTotal(conDayTotal, days, {
	  	false,
	  	data,
	  });

  // final cheapest weekly charge on contactless
  return Math.round(
  		(minNum(final.concat([noWeekly])))
  	* 100 )/ 100;
}