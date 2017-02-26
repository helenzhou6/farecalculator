import oysterDayTotal from './../../src/js/partials/_oysterDayTotal';
  
  const singleFares = {
    "1-1": {
      "anytime": 2.4,
      "offPeak": 2.4
    },
    "1-2": {
      "anytime": 2.9,
      "offPeak": 2.4
    },
    "1-3": {
      "anytime": 3.3,
      "offPeak": 2.8
    },
    "1-4": {
      "anytime": 3.9,
      "offPeak": 2.8
    },
    "1-5": {
      "anytime": 4.7,
      "offPeak": 3.1
    },
    "1-6": {
      "anytime": 5.1,
      "offPeak": 3.1
    },
    "1-7": {
      "anytime": 5.6,
      "offPeak": 4
    },
    "1-8": {
      "anytime": 6.9,
      "offPeak": 4
    },
    "2-2": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "3-3": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "4-4": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "5-5": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "6-6": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "2-3": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "3-4": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "4-5": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "5-6": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "2-4": {
      "anytime": 2.4,
      "offPeak": 1.5
    },
    "3-5": {
      "anytime": 2.4,
      "offPeak": 1.5
    },
    "4-6": {
      "anytime": 2.4,
      "offPeak": 1.5
    },
    "2-5": {
      "anytime": 2.8,
      "offPeak": 1.5
    },
    "3-6": {
      "anytime": 2.8,
      "offPeak": 1.5
    },
    "2-6": {
      "anytime": 2.8,
      "offPeak": 1.5
    },
    "2-7": {
      "anytime": 4,
      "offPeak": 2.8
    },
    "2-8": {
      "anytime": 4.7,
      "offPeak": 2.9
    },
    "3-7": {
      "anytime": 3.4,
      "offPeak": 1.8
    },
    "3-8": {
      "anytime": 4,
      "offPeak": 1.8
    },
    "4-7": {
      "anytime": 2.8,
      "offPeak": 1.8
    },
    "4-8": {
      "anytime": 3.4,
      "offPeak": 1.8
    },
    "5-7": {
      "anytime": 2.4,
      "offPeak": 1.9
    },
    "5-8": {
      "anytime": 2.8,
      "offPeak": 1.8
    },
    "6-7": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "6-8": {
      "anytime": 2.4,
      "offPeak": 1.7
    },
    "7-7": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "8-8": {
      "anytime": 1.7,
      "offPeak": 1.5
    },
    "7-8": {
      "anytime": 1.7,
      "offPeak": 1.5
    }
  };


  const dailyCaps = {
    "1-1": {
      "anytime": 6.6,
      "offPeak": 1
    },
    "1-2": {
      "anytime": 6.6,
      "offPeak": 1
    },
    "1-3": {
      "anytime": 7.7,
      "offPeak": 7.7
    },
    "1-4": {
      "anytime": 9.5,
      "offPeak": 9.5
    },
    "1-5": {
      "anytime": 11.2,
      "offPeak": 11.2
    },
    "1-6": {
      "anytime": 12,
      "offPeak": 12
    },
    "1-7": {
      "anytime": 13,
      "offPeak": 12.1
    },
    "1-8": {
      "anytime": 15.5,
      "offPeak": 12.1
    }
  };

const journeys = [
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "offPeak",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
  },
];

  describe('Oyster Day Total', () => {
    test('1', () => {
      expect(
        oysterDayTotal({
    		journeys,
    		dailyCaps, //JSON
    		minTravelcard: 3,
    		maxTravelcard: 4,
    	}, singleFares)).toEqual(6.6);
  });
});
