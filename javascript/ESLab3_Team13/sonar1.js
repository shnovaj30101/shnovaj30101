var tessel = require('tessel');
var pin = 
[
    tessel.port['C'].pin['G2'],
    tessel.port['D'].pin['G3'],
    tessel.port['A'].pin['G1'],
    tessel.port['B'].pin['G2'],
    tessel.port['B'].pin['G1'],
    tessel.port['C'].pin['G3'],
    tessel.port['A'].pin['G2'],
    tessel.port['B'].pin['G3'],
] 

var numbers =
[
  // 0 ON, 1 OFF
  // a,b,c,d,e,f,g,dp
    [0,0,0,0,0,0,1,1], // 0
    [1,0,0,1,1,1,1,1], // 1
    [0,0,1,0,0,1,0,1], // 2
    [0,0,0,0,1,1,0,1], // 3
    [1,0,0,1,1,0,0,1], // 4
    [0,1,0,0,1,0,0,1], // 5
    [0,1,0,0,0,0,0,1], // 6
    [0,0,0,1,1,1,1,1], // 7
    [0,0,0,0,0,0,0,1], // 8
    [0,0,0,1,1,0,0,1], // 9
    [1,1,1,1,1,1,1,1], // 10 empty
]

var digits = 
[
    tessel.port['C'].pin['G1'], // hundred
    tessel.port['D'].pin['G1'], // ten
    tessel.port['D'].pin['G2'], // one
]
var motor = 
[
   // right
   tessel.port['A'].pin['G3'],
   tessel.port['GPIO'].pin['G4'],
   // left
   tessel.port['GPIO'].pin['G1'],
   tessel.port['GPIO'].pin['G6'],
]   

var writePin = tessel.port['GPIO'].pin['G2'];
var readPin  = tessel.port['GPIO'].pin['G3'];

var digit1=0;
var digit2=0;
var digit3=0;
var distance;
// 1: straight, 2: left, 3:right
var state = 1; 

writePin.output(0);

setInterval( function(){
    read();
}, 500 );

setInterval( function() {
    if( distance > 40 ){
        for( i = 0; i < 4; ++i ){
            motor[i].output(1);
        } 
        state = 1;
    }  
    else{
        if( distance < 20 ){
            state = 4;
        }    
        switch( state ){
            case 1: // straight
                left();
                state = 2;
                break;
            // lefting
            case 2:  
                left();
                state = 2.3;
                break;
            case 2.3:
                left();
                state = 2.6;
                break;
            case 2.6:
                right();
                state = 3;
                break;
            case 3:
                right();
                state = 3.3;
                break;
            case 3.3:
                right();
                state = 3.6;
                break;
            case 3.6:
                right();
                state = 3.9;
                break;
            case 3.9:
                right();
                state = 4;
                break;
            case 4: // determining state
                for( i = 0; i < 4; ++i ){
                    motor[i].output(0);
                }
                break;
            default:
                state = 1;
                break;
        }
    }
}, 500 );

setInterval( function(){

        digits[0].output(0);
        digits[1].output(0);
        digits[2].output(0);

        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit3][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit2][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit3][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit2][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit2][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit3][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);
        pin[0].output( numbers[digit1][0] );
        pin[1].output( numbers[digit1][1] );
        pin[2].output( numbers[digit1][2] );
        pin[3].output( numbers[digit1][3] );
        pin[4].output( numbers[digit1][4] );
        pin[5].output( numbers[digit1][5] );
        pin[6].output( numbers[digit1][6] );
        pin[7].output( numbers[digit1][7] );
        digits[0].output(1);            
        delay(3);
        digits[0].output(0);
        pin[0].output( numbers[digit2][0] );
        pin[1].output( numbers[digit2][1] );
        pin[2].output( numbers[digit2][2] );
        pin[3].output( numbers[digit2][3] );
        pin[4].output( numbers[digit2][4] );
        pin[5].output( numbers[digit2][5] );
        pin[6].output( numbers[digit2][6] );
        pin[7].output( 0 );
        digits[1].output(1);
        delay(3);
        digits[1].output(0);            
        pin[0].output( numbers[digit3][0] );
        pin[1].output( numbers[digit3][1] );
        pin[2].output( numbers[digit3][2] );
        pin[3].output( numbers[digit3][3] );
        pin[4].output( numbers[digit3][4] );
        pin[5].output( numbers[digit3][5] );
        pin[6].output( numbers[digit3][6] );
        pin[7].output( numbers[digit3][7] );
        digits[2].output(1);
        delay(3);
        digits[2].output(0);

        digits[0].output(0);
        digits[1].output(0);
        digits[2].output(0);

}, 500 );

/****************
  Functions
 ****************/

function delay(ms){ var e = new Date().getTime() + (ms); while (new Date().getTime() <= e){ ; } ; }

function left(){
   	 motor[0].output(1);
         motor[1].output(1);
         motor[2].output(0);
         motor[3].output(0);
}

function right(){
	motor[0].output(0);
        motor[1].output(0);
        motor[2].output(1);
        motor[3].output(1);
}

function read(){
    readPin.readPulse('high', 9000, function (err,pulse_len) {
            // if there's an err object it means the SCT timed out or was already in use

            if (err) {
            console.log(err.message);
            return;
            }

            distance=pulse_len*340/20;
            // Log the pulse length
            console.log('Pulse read length:',distance+' cm');
            digit1=Math.floor((distance%100)/10);
            digit2=Math.floor(distance%10);
            digit3=Math.floor((distance*10)%10);
            //console.log(digit1,digit2,digit3);
            });
    writePin.output(1);
    writePin.output(0);
}

function pickDigit( num ,num2 ){
    //  for( it = 0; it < 8; ++it ) {  pin[it].output(1);   } // 清空pin
    digits[(num+2)%3].output(0);
    lightup( num2 );
    if( num == 1 ){
        pin[7].output(0);
    }
    digits[num].output(1);
}

function empty(){
    for( i = 0; i < 3; ++i ){
        pickDigit( i, 10 );
    } 
}

function lightup( num ){
    for( it = 0; it < 8; ++it ) {  pin[it].output( numbers[num][it] );   }
}
