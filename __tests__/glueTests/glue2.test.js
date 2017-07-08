require('isomorphic-fetch');
import glue from './../../src/js/partials/_glue';


test('simple journeys', () => {

	const fData = {"oysterCard":{"label":"Adult","val":"adult"},"discountCard":{"label":"16-25 Railcard","val":"railcard"},"journeys":[[{"from":"1000029","to":"1000157","touchin":"anytime"},{"from":"1000157","to":"1000029","touchin":"afternoon"}],[{"from":"1000157","to":"1000029","touchin":"anytime"},{"from":"1000029","to":"1000157","touchin":"afternoon"}],[{"from":"1000029","to":"1000157","touchin":"anytime"},{"from":"1000029","to":"1000157","touchin":"afternoon"}],[{"from":"1000157","to":"1000029","touchin":"anytime"},{"from":"1000029","to":"1000157","touchin":"afternoon"}],[{"from":"1000029","to":"1000157","touchin":"anytime"},{"from":"1000157","to":"1000029","touchin":"afternoon"}],[{"from":"1000029","to":"1000112"},{"from":"1000112","to":"1000029"}],[]]};

	const expectedResult = 	{
	   "oyster":{
			 'weeklyCap' : {
				 "cap":"noCap",
				 "weeklyValue":32.2,
			 },
		   "monthlyCap":{
						"cap":"1-2",
						"weeklyValue":29.26,
				},
		},
	   "contactless":33,
	   "oysterCard":"Adult",
	   "discountCard":"16-25 Railcard",
	   "errors":[]
	 };

	 expect.assertions(1);

	 return glue(fData, 'http://localhost:3000').then(r => expect(r).toEqual(expectedResult));

});
