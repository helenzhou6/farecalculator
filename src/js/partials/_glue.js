import getData from './../utility/_getData';
import getSingleJourneyZones from './backend/_getSingleJourneyZones';
import oyster from './backend/_oyster';
import contactless from './backend/_contactless';

/**
 * THIS IS THE FUNCTION THAT GLUES IT ALL TOGETHER
 */
export default function glue(form) {
  return getData.stations().then((stations) => {
    const daysWithJourneys = form.journeys.filter(j => j.length > 0);

    const dayPromises = daysWithJourneys.map((day, x) => {

      const journeyPromises = day.map(j => {
        return getSingleJourneyZones(j.from, j.to, stations);
      });

      return Promise.all(journeyPromises).then((journeys) => {
        return journeys.map((j, i) => {
          // Off-peak fares apply at all other times and if you travel from a station outside Zone 1
          //-- to a station in Zone 1 between 16:00 and 19:00, Mondays to Fridays
          // if afternoon selected && start zone != 1 && end zone = 1 -> change type from afternoon to OffPeak
          // OR if unselected journeyType (i.e. weekend where offPeak by default) -- set to OffPeak

          let journeyType = day[i].touchin;

          if (!journeyType || ((journeyType === "afternoon") && (j.start !== 1) && (j.end === 1))) {
            journeyType = 'offPeak';
          }

          return {
            zones: j.zones,
            dualZoneOverlap: j.dualZoneOverlap,
            type: journeyType,
            errors: j.errors.map(er => Object.assign({}, er, {
              journeyNum: i,
              dayNum: x,
            })),
          };
        });
      });
    });

    return Promise.all(dayPromises).then(days => {
      const allErrors = days.reduce((ar, day) => (
        ar.concat(day)
      ), []).reduce((ar, journey) => (
        ar.concat(journey.errors)
      ), []);

      // TO DO: Should this happen way ahead of time? Probably not now...
      return getData.fares().then((fareData) => {
        let dataOyster = fareData.adult;
        const oysterCardVal = form.oysterCard.val;
        const discountCardVal = form.discountCard.val;

        if ((oysterCardVal === 'adult' && discountCardVal === 'child-jobless') ||
          (oysterCardVal === 'child-jobless' && discountCardVal === 'none')) {
          dataOyster = fareData.halfOff;
        } else if (oysterCardVal === 'adult' && discountCardVal === 'railcard') {
          dataOyster = Object.assign({}, fareData.adult, fareData.thirdOffPeakPAYG);
        } else if (oysterCardVal === 'adult' && discountCardVal === 'disabled') {
          dataOyster = Object.assign({}, fareData.adult, fareData.thirdAnytimePAYG);
        } else if (oysterCardVal === 'student' && discountCardVal === 'none') {
          dataOyster = Object.assign({}, fareData.adult, fareData.thirdTravelcards);
        } else if (oysterCardVal === 'student' && discountCardVal === 'railcard') {
          dataOyster = Object.assign({}, fareData.thirdOffPeakPAYG, fareData.thirdTravelcards);
        } else if (oysterCardVal === 'student' && discountCardVal === 'disabled') {
          dataOyster = Object.assign({}, fareData.thirdAnytimePAYG, fareData.thirdTravelcards);
        }

        return {
          oyster: oyster(days, dataOyster),
          contactless: contactless(days, fareData.adult),
          oysterCard: form.oysterCard.label,
          discountCard: form.discountCard.label,
          errors: allErrors,
        };
      });
    });
  });
}


// TO DO: SHOULD MAP OVER JSON TO FIND THE ZONES WITH OFF PEAK DISCOUNT rather than add 4, 5 and 6 for weekTotal
