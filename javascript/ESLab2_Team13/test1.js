var http = require('http');
var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['C']);
var camera = require('camera-vc0706').use(tessel.port['A']);
var relay = require('relay-mono').use(tessel.port['B']);
var amb_data={Sound:'',Time:''};
var client_time="";
var appLed = tessel.led[3];
var cameraLed = tessel.led[1];

var timestamp_str = function () {
  var ensure_two_digits = function (num) {
    return (num < 10) ? '0' + num : '' + num; };
  var date   = new Date();
  var month  = ensure_two_digits(date.getMonth() + 1);
  var day    = ensure_two_digits(date.getDate());
  var hour   = ensure_two_digits(date.getHours());
  var minute = ensure_two_digits(date.getMinutes());
  var second = ensure_two_digits(date.getSeconds());
  return month + '_' + day + '_' + hour + ':' + minute + ':' + second;
};

var amb_options = { 
hostname: '192.168.1.146',
          port: 2015,
          path: '/ambient',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length':  amb_data.length
          }
};

relay.on('ready',function() {
camera.on('ready', function() {
    camera.setResolution('vga', function(err) {
        if (err) {
        return console.log('Error setting resolution', err);
    }});
    appLed.high();
    ambient.on('ready', function () {
        client_time=timestamp_str();
        amb_data.Time=client_time;  
        setInterval( function () { 
            ambient.getSoundLevel( function(err, sdata) {
                if (err) throw err;
                console.log("Sound Level:", sdata.toFixed(8));
                //console.log(client_time);
                amb_data.Sound=sdata.toFixed(8);


                var req=http.request(amb_options, function(res) {
                    });

                req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                    });

                req.write(JSON.stringify(amb_data));
                req.end();
    
            })}, 2000); // The readings will happen every .5 seconds unless the trigger is hit

        ambient.setSoundTrigger(0.1);

        ambient.on('sound-trigger', function(data) {
            console.log("Something happened with sound: ", data);

            amb_data.Sound=data.toFixed(8);
            
            relay.toggle(1,function (err) {
               if (err) throw err;
            });
            shoot();
            relay.toggle(2,function (err) {
               if (err) throw err;
            });

            var req=http.request(amb_options, function(res) {
                /*res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
                res.on('end', function() {
                    console.log('No more data in response.')
                });*/
            });

            req.on('error', function(e) {
                console.log('problem with request: ' + e.message);
                });

            req.write(JSON.stringify(amb_data));
            req.end();

            // Clear it
            ambient.clearSoundTrigger();

            //After 1.5 seconds reset sound trigger
            setTimeout(function () {

                ambient.setSoundTrigger(0.1);

                },1500);

        });

    });
    
});});

camera.on('error', function(err){
    console.log('Error:', err);
});



var shoot = function() {
      cameraLed.high();
      camera.takePicture(function(err, image){
          cameraLed.low();
          if (err) {
              console.log('takepicture: error in taking picture!', err);
              return;
          }

          var buf = new Buffer(image);
          var cam_options = {
              hostname: '192.168.1.146',
              port: 2015,
              path: '/camera',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': buf.toString().length 
              }
          };
          var req = http.request(cam_options, function(res) {
              /*res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
              });
              res.on('end', function() {
                  console.log('No more data in response.')
              });*/
          });

          req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
          });

          req.write(buf);
          req.end();
      });
};




