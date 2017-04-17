var fs = require('fs');
var fetch = require('node-fetch');
var lines = [
	// "bakerloo",
	// "central",
	// "circle",
	// "district",
	// "hammersmith-city",
	// "jubilee",
	// "metropolitan",
	// "northern",
	// "piccadilly",
	// "victoria",
	// "waterloo-city",
	"london-overground",
	// "dlr",
];

function findZone(arr) {
	return arr.find(function(property){
		if (property.category === "Geo" && property.key === "Zone") {
			return true;
		}
	});
}

var errorStations = [];

function processResultSet(resultSet, lineName) {
	return resultSet.map(function(result) {
		var properties = result.additionalProperties;
		var zonesProp = findZone(properties);

		if (zonesProp == undefined) {
			errorStations.push({
				napTan: result.id,
				name: result.commonName,
			});

			return {};
		}

		var zones = zonesProp.value.split('/').map(function(zone){
			return parseInt(zone);
		});

		return {
			napTan: result.id,
			name: result.commonName,
			zones: zones
		};
	});
}

function toObj(stations) {
	return stations.reduce(function(obj, result) {
		var resultClone = Object.assign({}, result);
		delete resultClone.napTan;
		obj[result.napTan] = resultClone;
		return obj;
	}, {});
}

function writeData(data) {
	fs.writeFile("./data/tmp/stationResults.json", JSON.stringify(data), function(err) {
		if(err) {
		    return console.log(err);
		}

		console.log("The file was saved!");
		console.log(errorStations);
	}); 
}

var lineResponses = lines.map((line) => {
	return fetch(`https://api.tfl.gov.uk/Line/${line}/stoppoints`)
		.then(resp => resp.json())
		.then(results => processResultSet(results, line))
		.then(ready => toObj(ready));
}); 

Promise.all(lineResponses).then((x) => {
	writeData(Object.assign({}, ...x));
});



// var fs = require('fs');
// var fetch = require('node-fetch');
// var lines = [
// 	"bakerloo",
// 	"central",
// 	"circle",
// 	"district",
// 	"hammersmith-city",
// 	"jubilee",
// 	"metropolitan",
// 	"northern",
// 	"piccadilly",
// 	"victoria",
// 	"waterloo-city",
// 	"london-overground",
// 	"dlr",
// ];

// function findZone(arr) {
// 	return arr.find(function(property){
// 		if (property.category === "Geo" && property.key === "Zone") {
// 			return true;
// 		}
// 	});
// }

// function processResultSet(resultSet, lineName) {
// 	return resultSet.map(function(result) {
// 		var properties = result.additionalProperties;

// 		var zonesProp = findZone(properties);

// 		if (zonesProp == undefined) {
// 			if (zonesProp.children.length > -1) {
// 				zonesProp = findZone(zonesProp.children[0].additionalProperties);

// 				if (zonesProp == undefined) {
// 					return {
// 						name: result.commonName,
// 					};
// 				}
// 			} else {
// 				return;
// 			}
// 		}

// 		var zones = zonesProp.value.split('/').map(function(zone){
// 			return parseInt(zone);
// 		});

// 		return {
// 			napTan: result.id,
// 			name: result.commonName,
// 			zones: zones
// 		};
// 	});
// }

// function toObj(stations) {
// 	return stations.reduce(function(obj, result) {
// 		var resultClone = Object.assign({}, result);
// 		delete resultClone.napTan;
// 		obj[result.napTan] = resultClone;
// 		return obj;
// 	}, {})
// }

// function writeData(data) {
// 	fs.writeFile("/Users/helenzhou/Desktop/stationResults.json", JSON.stringify(data), function(err) {
// 		if(err) {
// 		    return console.log(err);
// 		}

// 		console.log("The file was saved!");
// 	}); 
// }

// var lineResponses = lines.map((line) => {
// 	return fetch(`https://api.tfl.gov.uk/Line/${line}/stoppoints`)
// 		.then(resp => resp.json())
// 		.then(results => processResultSet(results, line))
// 		.then(ready => toObj(ready));
// }); 

// Promise.all(lineResponses).then((x) => {
// 	writeData(Object.assign({}, ...x));
// });