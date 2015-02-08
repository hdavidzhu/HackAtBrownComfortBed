// values:    an array of numbers that will be modified in place
// smoothing: the strength of the smoothing filter; 1=no change, larger values smoothes more
function smoothArray( values, smoothing ){
  var value = values[0]; // start with the first input
  for (var i=1, len=values.length; i<len; ++i){
    var currentValue = values[i];
    value += (currentValue - value) / smoothing;
    values[i] = value;
  }
  return values;
}

var fs = require("fs");
var plotly = require('plotly')('hdavidzhu','zew17v6s6h');

// Read a test file and produce a graph of the movement at the end.
fs.readFile('./accel_file.json', 'utf8', function (err, data){
	if (err) throw err;
	var test_data = data.split(',');
	var chosen_values = [];

	test_data.forEach(function (currentValue, index, array){
		chosen_values.push(Number(currentValue));
	});

	chosen_values.pop();

	var smoothedPoints = smoothArray(chosen_values, 20);
	var trace1 = {
	  y: smoothedPoints, 
	  type: "scatter"
	};
	var data = [trace1];
	var graphOptions = {filename: "basic-line", fileopt: "overwrite"};
	plotly.plot(data, graphOptions, function (err, msg) {
	    console.log(msg);
	});
});