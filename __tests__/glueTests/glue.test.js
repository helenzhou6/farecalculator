require('isomorphic-fetch');
import glue from './../../src/js/partials/_glue';


test('simple journeys', () => {

	const fData = {
   "oysterCard":{
      "label":"Adult",
      "val":"adult"
   },
   "discountCard":{
      "label":"None",
      "val":"none"
   },
   "journeys":[
      [
         {
            "from":"1000146",
            "to":"1000029",
            "touchin":"offPeak"
         }
      ],
      [
         {
            "from":"1000146",
            "to":"1000112",
            "touchin":"afternoon"
         }
      ],
      [
      ],
   ]
	};

	const expectedResult = 	{
	   "oyster":{
	      "cap":"noCap",
	      "weeklyValue":4.4,
	      "monthlyValue":false
	   	},
	   "contactless":4.4,
	   "oysterCard":"Adult",
	   "discountCard":"None",
	   "errors":[]
	 };

	 expect.assertions(1);

	 return glue(fData, 'http://localhost:3000').then(r => expect(r).toEqual(expectedResult));

});
