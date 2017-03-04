// NEED MORE
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

const journeysMix = [
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
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

const journeys = [
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
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
    type: "offPeak",
  },
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
  },
];


const journeysZ6 = [
  {
    zones: [1, 6],
    dualZoneOverlap: false,
    type: "anytime",
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
  {
    zones: [1, 2],
    dualZoneOverlap: false,
    type: "anytime",
  },
];


const journeysZ6last = [
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
  {
    zones: [1, 6],
    dualZoneOverlap: false,
    type: "anytime",
  },
];

const dualZone = [
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ];
  const dualZone2 = [
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
  ];

  const dualZone3 = [
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
  ];

  describe('Oyster Day Total', () => {
    test('1', () => {
      expect(
        oysterDayTotal(
          journeysMix,
      {
    	 	minTravelcard: 3,
    	 	maxTravelcard: 4,
    	 }, {
          dailyCaps, //JSON
          singleFares
        })).toEqual(6.6);
    });
    test('2', () => {
      expect(
        oysterDayTotal(
          journeys,
        {
        minTravelcard: 2,
        maxTravelcard: 4,
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(5.8);
   });

    test('3', () => {
      expect(
        oysterDayTotal(
journeysZ6,
        {
        minTravelcard: 4,
        maxTravelcard: 6,
       }, {
          dailyCaps, //JSON
          singleFares
        })).toEqual(7.7);
    });

    test('4', () => {
      expect(
        oysterDayTotal(
          journeysZ6,
        {
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(12);
    });

    test('5', () => {
      expect(
        oysterDayTotal(
          journeysMix,
        {
        minTravelcard: 1,
        maxTravelcard: 4,
       }, {
         
          dailyCaps, //JSON
          singleFares
        })).toEqual(0);
    });

    test('6', () => {
      expect(
        oysterDayTotal(
          journeysZ6last,
        {
       }, {
          dailyCaps, //JSON
          singleFares
        })).toEqual(11.7);
    });

    test('7', () => {
      expect(
        oysterDayTotal(
          journeys,
        {
        minTravelcard: 3,
        maxTravelcard: 4,
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(6.6);
   });
    test('8', () => {
      expect(
        oysterDayTotal(
          dualZone,
        {
        minTravelcard: 3,
        maxTravelcard: 4,
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(1.7);
   });

    test('9', () => {
      expect(
        oysterDayTotal(
          dualZone2,
        {
        minTravelcard: 3,
        maxTravelcard: 4,
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(0);
   });

    test('10', () => {
      expect(
        oysterDayTotal(
          dualZone3,
        {
        minTravelcard: 4,
        maxTravelcard: 5,
       }, {
          
          dailyCaps, //JSON
          singleFares
        })).toEqual(3.4);
   });
});
