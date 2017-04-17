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
  return arr.find(function (property) {
    if (property.category === "Geo" && property.key === "Zone") {
      return true;
    }
  });
}

var unfixable = [];
var errorStations = [];

function processResultSet(resultSet) {
  return resultSet.map(function (result) {
    var properties = result.additionalProperties;
    var zonesProp = findZone(properties);
    // var zones = zonesProp == undefined ? null : zonesProp.value.split('/').map(function (zone) {
    //   return parseInt(zone);
    // });
    if (zonesProp == undefined) {
      errorStations.push({
        napTan: result.id,
        name: result.commonName,
        ics: result.icsCode,
      });

      return {};
    }

    var zones = zonesProp.value.split('/').map(function (zone) {
      return parseInt(zone);
    });

    return {
      napTan: result.id,
      name: result.commonName,
      ics: result.icsCode,
      zones: zones,
    };
  });
}

function toObj(stations) {
  return stations.reduce(function (obj, result) {
    var resultClone = Object.assign({}, result);
    delete resultClone.napTan;
    obj[result.napTan] = resultClone;
    return obj;
  }, {});
}

function writeData(data) {
  fs.writeFile(__dirname + "/data/tmp/stationResults.json", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
    // console.log(errorStations);
  });
}

// function errorFind(results) {
//   return results.filter(result => result.zones === null);
// }

// function errorCorrect(results) {
//   var unFixable = [];
//
//   var corrected = errorFind(results).map((error) => {
//     return fetch(`https://api.tfl.gov.uk/Stoppoint/${error.napTan}`)
//       .then(resp => resp.json)
//       .then((resp) => {
//         if (resp.children.length > -1) {
//           var match = resp.children.find((child) => {
//             return child.additionalProperties.find((prop) => {
//               return prop.category === 'Geo' && prop.key === 'Zone' && prop.value !== '';
//             });
//           });
//
//           return Object.assign({}, error, { zone: match.value });
//         }
//
//         unFixable.push(error);
//
//         return {};
//       });
//   });
// }

function errorCorrect(results) {
  var requests = errorStations.map((error) => {
    return fetch(`https://api.tfl.gov.uk/Stoppoint/${error.napTan}`)
      .then(resp => resp.json())
      .then((resp) => {
        if (resp.children.length > -1) {
          var zone = null;

          for (var i = 0; i < resp.children.length; i++) {
            var zoneProp = resp.children[i].additionalProperties.find((prop) => {
              return prop.category === 'Geo' && prop.key === 'Zone' && prop.value !== '';
            });

            if (zoneProp) {
              zone = zoneProp.value;
              break;
            }
          }

          if (zone) {
            return Object.assign({}, error, { zone });
          }

          unfixable.push(error);
          return {};
        }
        return {};
      });
  });

  return Promise.all(requests).then(fixed => [].concat(results, fixed));
}

//   errorStations.forEach((error) => {
//     requests.push(fetch(`https://api.tfl.gov.uk/Stoppoint/${error.napTan}`));
//
//     Promise.all(requests).then((responses) => {
//       responses.forEach((resp) => {
//         if (resp.children.length > -1) {
//           var match = resp.children.find((child) => {
//             return child.additionalProperties.find((prop) => {
//               return prop.category === 'Geo' && prop.key === 'Zone' && prop.value !== '';
//             });
//           });
//
//           // results.indexOf();
//           // fixedResults.push(Object.assign({}, error, { zone: match.value }));
//         } else {
//           unFixable.push(error);
//         }
//       });
//     });
// }

  // var fixedResults = [];
  // var unFixable = [];

  // var requests = errorFind(results).map((error) => {
  //   return fetch(`https://api.tfl.gov.uk/Stoppoint/${error.napTan}`).then(resp => resp.json());
  // });
  //
  // Promise.all(requests).then((responses) => {
  //
  //
  //
  //   });

    // unFixable.push(error);

    // return {};
  // }


  //     .then((resp) => {
  //       if (resp.children.length > -1) {
  //         var match = resp.children.find((child) => {
  //           return child.additionalProperties.find((prop) => {
  //             return prop.category === 'Geo' && prop.key === 'Zone' && prop.value !== '';
  //           });
  //         });
  //
  //         return Object.assign({}, error, { zone: match.value });
  //       }
  //
  //       unFixable.push(error);
  //
  //       return {};
  //     });
  // });
// }

// function notifyErrors(results) {
//   console.log(errorFind(results));
// }

var lineResponses = lines.map((line) => {
  return fetch(`https://api.tfl.gov.uk/Line/${line}/stoppoints`)
    .then(resp => resp.json())
    .then(results => processResultSet(results, line))
    .then(results => errorCorrect(results))
    .then(ready => toObj(ready));
});

Promise.all(lineResponses).then((x) => {
  writeData(Object.assign({}, ...x));
  console.log('These were unfixable:');
  console.log(unfixable);
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