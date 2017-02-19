import extensionFares from './../../src/js/partials/_extensionFares';
  const singleFares = {
    "1-1": 2.4,
    "1-2": 2.9,
    "1-3": 3.3,
    "1-4": 3.9,
    "1-5": 4.7,
    "1-6": 5.1,
    "2-2": 1.7,
    "3-3": 1.7,
    "4-4": 1.7,
    "5-5": 1.7,
    "6-6": 1.7,
    "2-3": 1.7,
    "3-4": 1.7,
    "4-5": 1.7,
    "5-6": 1.7,
    "2-4": 2.4,
    "3-5": 2.4,
    "4-6": 2.4,
    "2-5": 2.8,
    "3-6": 2.8,
    "2-6": 2.8
  };

  describe('Extension Fare group', () => {

    test('1', () => {
      //CONTACTLESS or OYSTER - daily capping or weekly without daily cap
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(4.6); //2 singles
    });

    test('2', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares)).toEqual(4.1); //2 singles
    });
    test('3', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 3,
      }, singleFares)).toEqual(3.9); //full fare
    });
    test('4', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 2,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(2.9); //charge front
    });
    test('5', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        minTravelcard: 1,
        maxTravelcard: 2,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('6', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 3,
        minTravelcard: 3,
        maxTravelcard: 5,
      }, singleFares)).toEqual(2.9); //charge front
    });
    test('7', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 5,
        minTravelcard: 4,
        maxTravelcard: 6,
      }, singleFares)).toEqual(3.3); //charge front
    });
    test('8', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        minTravelcard: 3,
        maxTravelcard: 5,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('9', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('10', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares)).toEqual(0); //charge nothing
    });
    test('11', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares)).toEqual(0); //charge nothing
    });
    test('12', () => {
      expect(extensionFares({
        minSingle: 2,
        maxSingle: 4,
        minTravelcard: 2,
        maxTravelcard: 5,
      }, singleFares)).toEqual(0); //charge nothing
    });
    test('13', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 4,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(0); //charge nothing

      // CONTACTLESS - combination daily and weekly
    });
    test('14', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('15', () => {
      expect(extensionFares({
        minSingle: 3,
        maxSingle: 5,
        maxDaily: 3,
        minTravelcard: 3,
        maxTravelcard: 4,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('16', () => {
      expect(extensionFares({
        minSingle: 4,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares)).toEqual(1.7); //charge end
    });
    test('17', () => {
      expect(extensionFares({
        minSingle: 4,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 2,
        maxTravelcard: 3,
      }, singleFares)).toEqual(2.4); //charge end
    });
    test('18', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares)).toEqual(2.8); //charge gap 3 and 6 or 3-6
    });
    test('19', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares)).toEqual(1.7); //gap 3-4
    });
    test('20', () => {
      expect(extensionFares({
        minSingle: 2,
        maxSingle: 6,
        maxDaily: 3,
        minTravelcard: 4,
        maxTravelcard: 5,
      }, singleFares)).toEqual(1.7); // charge end
    });
    test('21', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 3,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares)).toEqual(1.7); //gap 3
    });
    test('22', () => {
      expect(extensionFares({
        minSingle: 1,
        maxSingle: 2,
        maxDaily: 2,
        minTravelcard: 5,
        maxTravelcard: 6,
      }, singleFares)).toEqual(0);
    });
    test('23', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        maxDaily: 2,
        minTravelcard: 4,
        maxTravelcard: 6,
      }, singleFares)).toEqual(0);
    });
    test('24', () => {
      expect(extensionFares({
        minSingle: 5,
        maxSingle: 6,
        maxDaily: 3,
        minTravelcard: 3,
        maxTravelcard: 6,
      }, singleFares)).toEqual(0);
    });

  });