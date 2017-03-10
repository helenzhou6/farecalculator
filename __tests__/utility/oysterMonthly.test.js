import oysterMonthly from './../../src/js/partials/_oysterMonthly';

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

	"monthlyCaps": {
		"1-2": 126.8,
		"1-3": 148.7,
		"1-4": 181.7,
		"1-5": 215.9,
		"1-6": 231.2,
		"1-7": 251.2,
		"1-8": 296.9,
		"2-3": 94.9,
		"2-4": 104.9,
		"2-5": 126,
		"2-6": 158.3,
		"2-7": 164,
		"2-8": 223.2,
		"3-4": 94.9,
		"3-5": 104.9,
		"3-6": 126,
		"3-7": 164,
		"3-8": 223.2,
		"4-5": 94.9,
		"4-6": 104.9,
		"4-7": 104.9,
		"4-8": 118.7,
		"5-6": 94.9,
		"5-7": 118.7,
		"5-8": 199.7,
		"6-7": 118.7,
		"6-8": 199.7,
		"7-8": 199.7
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
}

describe('oysterMonthly', () => {
    test('1', () => {
	    expect(
	        oysterMonthly('2-4', 39.3, data)
		  ).toEqual(36.21);
    });
    test('2', () => {
      expect(
          oysterMonthly("noCap", 12, data)
      ).toEqual(false);
    });

});