/**
 * Gets Zones
 * @function
 * @param {string} napTan - The naptan of the station we're looking for.
 * @param {object} stations - An object containing stations with napTans as keys.
 * @returns {array}
 * @description Uses the napTan ID to figure out what zone that station is in via station.json
 */
export function getZones(napTan, stations) {
  return stations[napTan].zones;
}

/**
 * filters a nested array based on its length 
 * @function
 * @param {number} num - either 1 (for single zone) or 2 (dual zone)
 * @param {nested array} zones - the nested array of arrays (of zones)
 * @returns {nested array} - nested array of all array of zones from stations that only have one zone associated with it (if num = 1) or...
 * @description - zones refers to global allZones / used to filter the station zones by the number of zones it has (dual zone or single zone)
 */
export function filterZonesByNumber(num, zones) {
  return zones.filter(function(zone) {
    return zone.length === num;
  });
}

/**
 * Compares Numbers
 * @function
 * @param {array} numbers - the array of number(s)
 * @param {object} operator - what javascript operator passing through (e.g. Math.max)
 * @returns {number} - the single number after all calculations (reduces to one number)
 * @description Associated with minNum and maxNum: where arrayZones refers to zonesFromSingleStations.
 Loops through the array of zones and applies the operator
 */
function compareNumbers(arrayNumbers, operator) {
  return arrayNumbers.reduce(function(a, b) {
    return operator(a, b);
  });
}

export function maxNum(arrayZones) {
  return compareNumbers(arrayZones, Math.max);
}

export function minNum(arrayZones) {
  return compareNumbers(arrayZones, Math.min);
}

/**
 * Get difference between 2 numbers
 * @function
 * @param {numbers} a,b - the two numbers comparing against
 * @returns {number} - the difference between the 2 numbers (discarding negative numbers)
 * @description
 */
export function getDifference(a, b) {
  return Math.abs(a - b);
  // return a - b;
}

/**
 * Flattens a nested array
 * @function
 * @param {array} array that is an array within another array
 * @returns {number} - flattens the array so just one array
 * @description
 */
export function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  });
}

/**
 * Sort an array of 2 zones chronologically and adds '-'
 * @function
 * @param {array} journey - the array of the 2 zones of that journey
 * @returns {string} - 'x-y'
 * @description - used to get the fares from the json file
 */
export function journeyToKey(journey) {
  return journey.sort().join('-');
}

/**
 * Preloads start zone as 1 and changes to 1-x for JSON file reading
 * @function
 * @param {number} - zone x
 * @returns {string} - '1-x'
 * @description - used to get the fares from the json file
 */
export function zoneToJourney(zone) {
  return journeyToKey([1, zone]);
}

/**
 * Turns "1-2" into [1, 2]
 * @function
 * @param {string} - key: "1-2"
 * @returns {array} - [1, 2]
 * @description - Opposite of journeyToKey
 */
export function keyToJourney(key) {
  return key.split('-').sort().map(num => parseInt(num));
}

/**
 * Gets keys from weeklyCaps, maps over them to generate array
 * @function
 * @param {weeklyCaps} - the weeklyCaps data from fares.json
 * @returns {array} - returns array of arrays [[1, 2], [1, 3] etc]
 * @description
 */

export function keysToJourney(weeklyCaps) {
  return Object.keys(weeklyCaps).map((cap) => keyToJourney(cap));
}

/**
 * Gets the fare
 * @function
 * @param {array} - key is an array of two zones
 * @param {string} type is offPeak or anytime, or nothing if not needed (e.g. for weekly caps)
 * @param {data} the JSON data file with fare objects
 * @returns {number} - gets the single fare / weekly cap / daily cap from fares.json
 * @description
 */

export const getFare = (key, type, caps) => {
  const fare = caps[key.constructor === Array ? journeyToKey(key) : zoneToJourney(key)];

  return type ? fare[type] : fare;
};

/**
 * Determines if a numeric target has been met or surpassed
 * @function
 * @param {number} target - target value to compare against
 * @param {number} value - the value to compare against the target
 * @description
 */
export const met = (value, target) => value >= target;

/**
 * Rounds a number to however many decimal places specified
 * @function
 * @param {number} value - target value to round
 * @param {number} decimals - the number of decimals result should have
 * @description
 */
export function round(value, decimals) {
   return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}