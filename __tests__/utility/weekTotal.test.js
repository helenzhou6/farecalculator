import weekTotal from './../../src/js/partials/backend/_weekTotal';
import conDayTotal from './../../src/js/partials/backend/_contactlessDayTotal';
import oysterDayTotal from './../../src/js/partials/backend/_oysterDayTotal';

const data = {
	"dailyCaps": {
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
	},

	"weeklyCaps": {
		"1-2": 33,
		"1-3": 48.7,
		"1-4": 47.3,
		"1-5": 56.2,
		"1-6": 60.2,
		"1-7": 65.4,
		"1-8": 77.3,
		"2-3": 24.7,
		"2-4": 27.3,
		"2-5": 32.8,
		"2-6": 41.2,
		"2-7": 42.7,
		"2-8": 58.1,
		"3-4": 24.7,
		"3-5": 27.3,
		"3-6": 32.8,
		"3-7": 42.7,
		"3-8": 58.1,
		"4-5": 24.7,
		"4-6": 27.3,
		"4-7": 30.9,
		"4-8": 52,
		"5-6": 24.7,
		"5-7": 30.9,
		"5-8": 52,
		"6-7": 30.9,
		"6-8": 52,
		"7-8": 52
	},
  "autoOffPeakRefund": {
    "1-4": 0.4,
    "1-5": 1.3,
    "1-6": 2.1
  },

	"singleFares": {
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
	}
};

const days = [
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      time: "morning",
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
  ],
    [
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
  ],
  [
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
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
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
    ],
    [
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
  ],
  [
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
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],

];

const days2 = [
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
     {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
    [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  ];
 const days3 = [
  [
    {
      zones: [2, 6],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
        {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
     {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
    [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],

];

const none = [
    [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],

];

  describe('week Total', () => {
    test('1', () => {
	    expect(
	        weekTotal(oysterDayTotal, days, {
				options: {
					minTravelcard: 1,
					maxTravelcard: 2,
				},
				data,
			})
		).toEqual(0);
    });

    test('2', () => {
	    expect(
		    weekTotal(oysterDayTotal, days, {
		      options: false,
		      data,
		    })
		).toEqual(42.5);
    });

    test('3', () => {
	    expect(
		    weekTotal(oysterDayTotal, days2, {
		      options: false,
		      data,
		    })
		).toEqual(63.7);
    });

    test('4', () => {
      expect(
        weekTotal(oysterDayTotal, days3, {
          options: false,
          data,
        })
    ).toEqual(64.5);
    });

    test('5', () => {
      expect(
        weekTotal(oysterDayTotal, none, {
          options: false,
          data,
        })
    ).toEqual(9.5);
    });

    test('6', () => {
      expect(
        weekTotal(conDayTotal, none, {
          options: false,
          data,
        })
    ).toEqual(8.5);
    });

    test('7', () => {
      expect(
        weekTotal(conDayTotal, days3, {
          options: false,
          data,
        })
    ).toEqual(61.5);
    });

 });
