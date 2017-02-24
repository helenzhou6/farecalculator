import extensionFares from './../../src/js/partials/_extensionFares';
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

  describe('Extension Fare group', () => {

    test('1', () => {
      //CONTACTLESS or OYSTER - daily capping or weekly without daily cap
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(4.6); //2 singles
    });

    test('2', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(4.1); //2 singles
    });
    test('3', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 3,
      }, singleFares, 'anytime')).toEqual(3.9); //full fare
    });
    test('4', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 2,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(2.9); //charge front
    });
    test('5', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        minTravelcard: 1,
        maxTravelcard: 2,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('6', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 3,
        minTravelcard: 3,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(2.9); //charge front
    });
    test('7', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 5,
        minTravelcard: 4,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(3.3); //charge front
    });
    test('8', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        minTravelcard: 3,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('9', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('10', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(0); //charge nothing
    });
    test('11', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(0); //charge nothing
    });
    test('12', () => {
      expect(extensionFares({
        minSingle: 2,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(0); //charge nothing
    });
    test('13', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 4,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(0); //charge nothing

      // CONTACTLESS - combination daily and weekly
    });
    test('14', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('15', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        maxDaily: 3,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('16', () => {
      expect(extensionFares({
        minSingle: 4,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(1.7); //charge end
    });
    test('17', () => {
      expect(extensionFares({
        minSingle: 4,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 2,
        maxTravelcard: 3,
      }, singleFares, 'anytime')).toEqual(2.4); //charge end
    });
    test('18', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(2.8); //charge gap 3 and 6 or 3-6
    });
    test('19', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(1.7); //gap 3-4
    });
    test('20', () => {
      expect(extensionFares({
        minSingle: 2,
        maxSingle: 6,
        maxDaily: 3,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares, 'anytime')).toEqual(1.7); // charge end
    });
    test('21', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 3,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(1.7); //gap 3
    });
    test('22', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 2,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(0);
    });
    test('23', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(0);
    });
    test('24', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        maxDaily: 3,
        minTravelcard: 3,
        maxTravelcard: 6,
      }, singleFares, 'anytime')).toEqual(0);
    });

  });