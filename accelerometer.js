// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {

	accel.setOutputRate(400, function (err) {
		// Stream accelerometer data
	  accel.on('data', function (xyz) {
	    console.log(
	    	'x:', xyz[0].toFixed(6),
	      'y:', xyz[1].toFixed(6),
	      'z:', xyz[2].toFixed(6));
	  });
	});
});

accel.on('error', function(err){
  console.log('Error:', err);
});