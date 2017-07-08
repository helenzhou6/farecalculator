require('isomorphic-fetch');
import glue from './../../src/js/partials/_glue';


test('simple journeys', () => {

	const fData = {"oysterCard":{"label":"Adult","val":"adult"},"discountCard":{"label":"None","val":"none"},
	"journeys":[[{"from":"1000146","to":"1000029","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"}],
	[{"from":"1000146","to":"1000029","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"}],
	[{"from":"1000029","to":"1000146","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"}],
	[{"from":"1000029","to":"1000146","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"},{"from":"1000146","to":"1000029","touchin":"early"}],
	[{"from":"1000029","to":"1000146","touchin":"early"},{"from":"1000146","to":"1002019","touchin":"early"}],[{"from":"1000146","to":"1000029"},{"from":"1000146","to":"1000029"}],
	[{"from":"1000146","to":"1000029"}]]};

	const expectedResult = {
		"oyster":
		{"weeklyCap":{"cap":"noCap","weeklyValue":24},
		"monthlyCap":{"cap":"2-3","weeklyValue":21.9}
	},
		"contactless":24,"oysterCard":"Adult","discountCard":"None","errors":[]
	};

	 expect.assertions(1);

	 return glue(fData, 'http://localhost:3000').then(r => expect(r).toEqual(expectedResult));
});
