import {
  minNum,
  maxNum,
  getDailyCap,
  getSingleFare,
} from './../utility/_utility';

export default function oysterDayTotal(data) {
  let {
    journeys,
    singleFares,
    dailyCaps,
  } = data;

  let peakTotal = 0;
  let offPeakTotal = 0;
  let maxZoneSoFar = null;

  // journeys.forEach(function (journey) {
  //   //Gets the maximum zones of alls the zones travelled in so far
  //   maxZoneSoFar = maxNum([].concat(journey.zones, maxZoneSoFar));
  //
  //   //adds the single fare to the cumulative total
  //   peakTotal += getSingleFare(journey.zones, singleFares); //FOR PEAK PAYG RATES;
  //   offPeakTotal += getSingleFare(journey.zones, singleFares); //FOR PEAK PAYG RATES
  //
  //   //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (!journey.peak && offPeakTotal >= getDailyCap(maxZoneSoFar, dailyCaps)) {
  //     offPeakTotal = getDailyCap(maxZoneSoFar, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
  //   }
  //
  //   //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (peakTotal >= getDailyCap(maxZoneSoFar, dailyCaps)) {
  //     peakTotal = getDailyCap(maxZoneSoFar, dailyCaps);
  //   }
  // });

  // return minNum([peakTotal, offPeakTotal]);

  // const totals = journeys.reduce(function(a, b) {
  //   const singleFareA = getSingleFare(a.zones, singleFares);
  //   const singleFareB = getSingleFare(b.zones, singleFares);
  //
  //   const running = (a.running ? a : {
  //       peakTotal: singleFareA,
  //       offPeakTotal: singleFareA,
  //       maxZone: a.zones,
  //   });
  //
  //   const current = {
  //     running: true,
  //     peakTotal: running.peakTotal + singleFareB,
  //     offPeakTotal: running.peakTotal + singleFareB,
  //     maxZone: maxNum([].concat(running.maxZone, b.zones)),
  //     zones: b.zones,
  //   };
  //
  //   //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (!a.peak && current.offPeakTotal >= getDailyCap(current.maxZone, dailyCaps)) {
  //     current.offPeakTotal = getDailyCap(current.maxZone, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
  //   }
  //
  //   //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  //   if (current.peakTotal >= getDailyCap(current.maxZone, dailyCaps)) {
  //     current.peakTotal = getDailyCap(current.maxZone, dailyCaps);
  //   }
  //
  //   return current;
// }


  function met(cap) {
    return function(value) {
      return value >= cap;
    }
  }

  const totals = journeys.reduce(function (a, b) {
    const singleFare = getSingleFare(b.zones, singleFares);
    const maxZone = maxNum([].concat(a.maxZone, b.zones));
    const metDailyCap = met(getDailyCap(maxZone, dailyCaps));

    let peakTotal = a.peakTotal + singleFare;
    let offPeakTotal = a.offPeakTotal + singleFare;

    //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
    if (!a.peak && metDailyCap(offPeakTotal)) {
      offPeakTotal = getDailyCap(maxZone, dailyCaps); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
    }

    //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
    if (metDailyCap(peakTotal)) {
      peakTotal = getDailyCap(maxZone, dailyCaps);
    }

    return {
      peakTotal,
      offPeakTotal,
      maxZone,
      zones: b.zones
    };
  }, {
    peakTotal: 0,
    offPeakTotal: 0,
    maxZone: null,
  });

  return minNum([totals.peakTotal, totals.offPeakTotal]);
}
