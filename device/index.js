// The `tessel` module built-in to the Tessel firmware for access to hardware
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {
	accel.setOutputRate(200, function (err) {
		// Stream accelerometer data
	  accel.on('data', function (xyz) {
	  	// Send information back to the host computer.
	  	process.send({
	  		x: xyz[0],
	  		y: xyz[1],
	  		z: xyz[2]
	  	});
	  });
	});
});

accel.on('error', function(err){
  console.log('Error:', err);
});

// Keep the event loop alive 
process.ref();