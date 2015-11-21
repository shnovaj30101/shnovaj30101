var http = require('http');
require("tesselate")({
   modules: {
      A: [ 'camera-vc0706', 'camera' ],
      C: [ 'accel-mma84', 'accel' ]
   }
},
function(tessel, modules) {

    var camera = modules.camera;
    var accel = modules.accel;
    var data = {"x":0,"y":0,"z":0};
    var change= true;
    var LED = tessel.led[0];
    var count = 0;
    accel.setOutputRate( 1.5, function(){
        accel.on('data', function (xyz) {
           if( change ){
               data.x = Number(xyz[0].toFixed(2));
               data.y = Number(xyz[1].toFixed(2));
               data.z = Number(xyz[2].toFixed(2));
               change = false;
           }
           else{
              change = check( data, Number(xyz[0].toFixed(2)), Number(xyz[1].toFixed(2)), Number(xyz[2].toFixed(2)) );
       
                  if( change ){
                    LED.high();
                    camera.takePicture( function(err,image){
                        if(err)
                            console.log('Error: ', err);
                        else{
                                                        
                            LED.low();
                            var name = count++ + '.jpg';
                            process.sendfile( name, image );
                            var buf = new Buffer( image );

                            var options = {
                              method : 'POST',
                              host : '192.168.1.176',
                              port : 2015,
                              path : '/echo',  
                              headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded',
                                  'Content-Length': buf.toString().length
                                  }
                              };
                             // Create the request
                             var request = http.request(options, function(res) {
                                // Print out data from server when we get it
                                    res.on('data', function(data) {
                                        console.log('response data', data);
                                    });
                                    res.on('error', function() {
                                        console.log('No more data in response.');
                                    });
                                }); 
                            request.write( buf );
                            request.end();
                            console.log('Done');
                            
                        } // end else
                        change = false;
                    }); // end takePicture
                  }  // end if ( change )
       //       });  // end resolution
           } // end setOutput 
        });// end accel.on
    });
}); // end function

function check ( data, x, y, z ){
    if( Math.abs( data.x - x ) > 0.5 ||  Math.abs( data.y - y ) > 0.5 || Math.abs( data.z - z ) > 0.5 ){
        console.log('Change: Take Picture');
        data.x = x;
        data.y = y;
        data.z = z;
        return true;
      }
    else return false;
}
