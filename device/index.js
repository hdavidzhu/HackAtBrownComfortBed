// The `tessel` module built-in to the Tessel firmware for access to hardware
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var ambientlib = require('ambient-attx4');

// Initialize the accelerometer.
accel.on('ready', function () {
	accel.setOutputRate(200, function (err) {
		// Stream accelerometer data
	  accel.on('data', function (xyz) {
	  	// Send information back to the host computer.
	  	process.send({'accel': xyz[0] + xyz[1] + xyz[2]});
	  });
	});
});

accel.on('error', function(err){
  console.log('Error:', err);
});

var ambient = ambientlib.use(tessel.port['B']);

ambient.on('ready', function () {
  // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;
        process.send({'light':ldata, 'sound': sdata});
    });
  })}, 500); // The readings will happen every .5 seconds unless the trigger is hit
});

ambient.on('error', function (err) {
  console.log(err)
});

// Keep the event loop alive 
process.ref();