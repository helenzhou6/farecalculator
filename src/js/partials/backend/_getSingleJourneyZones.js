//The complete function in order to get the minimum and maximum zones of that journey (taking into consideration dual zones)
// stations is the .json file from fetchStationsData() function
// Need to make it so that it generates it after each journey

// Off-peak fares apply at all other times and if you travel from a station outside Zone 1 to a station in Zone 1 between 16:00 and 19:00, Mondays to Fridays
import getData from '../../utility/_getData';
import {
  flatten,
  getZones,
  filterZonesByNumber,
  minNum,
  maxNum,
  getDifference,
} from '../../utility/_utility';

export default function getSingleJourneyZones(from, to, stations) {
  return getData.journey(from, to).then((journeys) => {
    const errors = [];
    // selecting only the first journey from the API
    const journey = journeys.journeys[0];
    // To look at each leg of the journey
    const legs = journey.legs;

    if (legs.every(leg => leg.mode.id === 'walking')) {
      errors.push({
        desc: 'This journey is within walking distance. Please remove.',
      });
    }

    // The array of zones associated with all stations of that journey
    const allZones = flatten(legs.map((leg) => {
      const tempZones = [];

      // Gets the zones of the departurePoints and adds them to allZones array
      if (leg.departurePoint && leg.departurePoint.naptanId) {
        tempZones.push(getZones(leg.departurePoint.naptanId, stations));
      }

      // Gets the zones of the StopPoint and adds them to allZones array
      if (leg.path.stopPoints && leg.path.stopPoints.length > 0) {
        leg.path.stopPoints.forEach((stopPoint) => {
          if (stopPoint.id) {
            tempZones.push(getZones(stopPoint.id, stations));
          }
        });
      }

      return tempZones;
    }));

    // Filters all the stations and split them into zonesFromSingleStations and zonesFromDualStations
    let zonesFromSingleStations = filterZonesByNumber(1, allZones);
    // NB this is an array within an array
    const zonesFromDualStations = filterZonesByNumber(2, allZones);
    let finalMaxZone = null;
    let finalMinZone = null;
    let isDualZoneOverlap = false;

    // for dual zones to dual zones **ASSUMING CAN ONLY TRAVEL FROM THE SAME DUAL ZONES (2/3 to 2/3 and not 2/3 to 3/4)**
    if (zonesFromSingleStations.length === 0) {
      finalMaxZone = minNum(flatten(zonesFromDualStations));
      finalMinZone = minNum(flatten(zonesFromDualStations));
      isDualZoneOverlap = true;
      // **Flag done (to say that it is dual to dual zone & what zones (so that can manipulate and pick zones from closest to weekly capped zone rather than min zone))
    } else {
      zonesFromSingleStations = flatten(filterZonesByNumber(1, allZones));

      // Calculates the max and min Zones of all the zones that are from stations without any dual zones.
      const singleMax = maxNum(zonesFromSingleStations);
      const singleMin = minNum(zonesFromSingleStations);

      // For each zonesFromDualStations: picks the most appropriate zone and appends to dualZones array
      // --> Going from 2/3 to 2/3 —> charges same single 2, 3 or 2-3 (1.70) but should pick zone based on weekly (could be 3) or cap (always smallest: 2)
      const dualZones = zonesFromDualStations.map(z => (
        z.reduce((a, b) => {
          if (getDifference(a, singleMin) < getDifference(b, singleMin)) {
            return a;
          }
          return b;
        })
      ));

      // Adds dualZones to singleMax into an array and calculates the max and min zone of both
      finalMaxZone = maxNum([singleMax].concat(dualZones));
      finalMinZone = minNum([singleMin].concat(dualZones));
    }

    return {
      dualZoneOverlap: isDualZoneOverlap,
      zones: [finalMinZone, finalMaxZone],
      start: allZones[0],
      end: allZones[allZones.length - 1],
      errors,
    };
  });
}
