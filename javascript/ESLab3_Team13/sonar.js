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
var a = pin[0];
var b = pin[1];
var c = pin[2];
var d = pin[3];
var e = pin[4];
var f = pin[5];
var g = pin[6];
var dp = pin[7];
var array =
[
	    [f0to0, f0to1, f0to2, f0to3, f0to4, f0to5, f0to6, f0to7, f0to8, f0to9],
        [f1to0, f1to1, f1to2, f1to3, f1to4, f1to5, f1to6, f1to7, f1to8, f1to9],
        [f2to0, f2to1, f2to2, f2to3, f2to4, f2to5, f2to6, f2to7, f2to8, f2to9],
        [f3to0, f3to1, f3to2, f3to3, f3to4, f3to5, f3to6, f3to7, f3to8, f3to9],
        [f4to0, f4to1, f4to2, f4to3, f4to4, f4to5, f4to6, f4to7, f4to8, f4to9],
        [f5to0, f5to1, f5to2, f5to3, f5to4, f5to5, f5to6, f5to7, f5to8, f5to9],
        [f6to0, f6to1, f6to2, f6to3, f6to4, f6to5, f6to6, f6to7, f6to8, f6to9],
        [f7to0, f7to1, f7to2, f7to3, f7to4, f7to5, f7to6, f7to7, f7to8, f7to9],
        [f8to0, f8to1, f8to2, f8to3, f8to4, f8to5, f8to6, f8to7, f8to8, f8to9],
        [f9to0, f9to1, f9to2, f9to3, f9to4, f9to5, f9to6, f9to7, f9to8, f9to9],
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
        array[0][digit1]();
		digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
       digits[0].output(0);
		array[digit1][digit2]();
		digits[0].output(1);
		delay(3);
		digits[0].output(0);
		array[digit2][digit3]();
		pin[7].output(0);
		digits[1].output(1);
		delay(3);
		digits[1].output(0);
		pin[7].output(1);
		array[digit3][digit1];
		digits[2].output(1);
		delay(3);
		digits[2].output(0);
		array[digit2][0]();
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
            lightup(0);
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

function f0to0(){}
function f1to1(){}
function f2to2(){}
function f3to3(){}
function f4to4(){}
function f5to5(){}
function f6to6(){}
function f7to7(){}
function f8to8(){}
function f9to9(){}

function f0to1(){
    a.output(1);
    f.output(1);
    e.output(1);
    d.output(1);
}
function f0to2(){
    f.output(1);
    g.output(0);
    c.output(1);
}
function f0to3(){
    f.output(1);
    g.output(0);
    e.output(1);
}
function f0to4(){
    a.output(1);
	e.output(1);
	d.output(1);
	g.output(0);
}
function f0to5(){
	b.output(1);
	e.output(1);
	g.output(0);
}
function f0to6(){
	b.output(1);
	g.output(0);
}
function f0to7(){
	f.output(1);
	e.output(1);
	d.output(1);
}
function f0to8(){
	g.output(0);
}
function f0to9(){
	e.output(1);
	g.output(0);
	d.output(1);	
}
function f1to0(){
	a.output(0);
	f.output(0);
	e.output(0);
	d.output(0);
}
function f1to2(){
	c.output(1);
	a.output(0);
	g.output(0);
	e.output(0);
	d.output(0);
}
function f1to3(){
	a.output(0);
	g.output(0);
	d.output(0);
}
function f1to4(){
	f.output(0);
	g.output(0);
}
function f1to5(){
	b.output(1);
	a.output(0);
	f.output(0);
	g.output(0);
	d.output(0);
}
function f1to6(){
	b.output(1);
	a.output(0);
	f.output(0);
	g.output(0);
	d.output(0);
	e.output(0);
}
function f1to7(){
	a.output(0);
}
function f1to8(){
	a.output(0);
	f.output(0);
	g.output(0);
	d.output(0);
	e.output(0);
}
function f1to9(){
	a.output(0);
	f.output(0);
	g.output(0);
}
function f2to0(){
	g.output(1);
	f.output(0);
	c.output(0);
}
function f2to1(){
	a.output(1);
	g.output(1);
	e.output(1);
	d.output(1);
	c.output(0);
}
function f2to3(){
	e.output(1);
	c.output(0);
}
function f2to4(){
	a.output(1);
	e.output(1);
	d.output(1);
	f.output(0);
	c.output(0);
}
function f2to5(){
	b.output(1);
	e.output(1);
	f.output(0);
	c.output(0);
}
function f2to6(){
	b.output(1);
	f.output(0);
	c.output(0);
}
function f2to7(){
	g.output(1);
	e.output(1);
	d.output(1);
	c.output(0);
}
function f2to8(){
	f.output(0);
	c.output(0);
}
function f2to9(){
	e.output(1);
	f.output(0);
	c.output(0);
	d.output(1);
}
function f3to0(){
	g.output(1);
	f.output(0);
	e.output(0);
}
function f3to1(){
	a.output(1);
	g.output(1);
	d.output(1);
}
function f3to2(){
	c.output(1);
	e.output(0);
}
function f3to4(){
	a.output(1);
	d.output(1);
	f.output(0);
}
function f3to5(){
	b.output(1);
	f.output(0);
}
function f3to6(){
	b.output(1);
	f.output(0);
	e.output(0);
}
function f3to7(){
	g.output(1);
	d.output(1);
}
function f3to8(){
	f.output(0);
	e.output(0);
}
function f3to9(){
	d.output(1);
	f.output(0);
}
function f4to0(){
	g.output(1);
	f.output(0);
	e.output(0);
	d.output(0);
}
function f4to1(){
	f.output(1);
	g.output(1);
}
function f4to2(){
	f.output(1);
	c.output(1);
	a.output(0);
	e.output(0);
	d.output(0);
}
function f4to3(){
	f.output(1);
	a.output(0);
	d.output(0);	
}
function f4to5(){
	b.output(1);
	a.output(0);
	d.output(0);
}
function f4to6(){
	b.output(1);
	a.output(0);
	e.output(0);
	d.output(0);
}
function f4to7(){
	f.output(1);
	g.output(1);
	a.output(0);
}
function f4to8(){
	a.output(0);
	f.output(0);
	d.output(0);
}
function f4to9(){
	a.output(0);
}
function f8to0(){
	g.output(1);
}
function f8to1(){
	a.output(1);
	f.output(1);
	g.output(1);
	e.output(1);
	d.output(1);
}
function f8to2(){
	f.output(1);
	c.output(1);
}
function f8to3(){
	f.output(1);
	e.output(1);
}
function f8to4(){
	a.output(1);
	e.output(1);
	d.output(1);
}
function f8to5(){
	b.output(1);
	e.output(1);
}
function f8to6(){
	b.output(1);
}
function f8to7(){
	f.output(1);
	g.output(1);
	e.output(1);
	d.output(1);
}
function f8to9(){
	e.output(1);
	d.output(1);
}
function f9to0(){
	g.output(1);
	e.output(0);
	d.output(0);
}
function f9to1(){
	a.output(1);
	f.output(1);
	g.output(1);
}
function f9to2(){
	f.output(1);
	c.output(1);
	e.output(0);
	d.output(0);
}
function f9to3(){
	f.output(1);
	d.output(0);
}
function f9to4(){
	a.output(1);
}
function f9to5(){
	b.output(1);
	d.output(0);
}
function f9to6(){
	b.output(1);
	e.output(0);
	d.output(0);
}
function f9to7(){
	f.output(1);
	g.output(1);
}
function f9to8(){
	e.output(0);
	d.output(0);
}
function f5to0 () {
   b.output(0);
   e.output(0);
   g.output(1);
}
function f5to1 () {

   a.output(1);
   b.output(0);
   d.output(1);
   f.output(1);
   g.output(1);
}
function f5to2 () {

   b.output(0);
   c.output(1);
   e.output(0);
   f.output(1);
}
function f5to3 () {

   b.output(0);
   f.output(1);
}
function f5to4 () {

   a.output( 1);
   b.output( 0);
   d.output( 1);
}
function f5to6 () {

   e.output( 0);
}
function f5to7 () {

   b.output( 0);
   d.output( 1);
   f.output( 1);
   g.output( 1);
}
function f5to8 () {

   b.output( 0);
   e.output( 0);
}
function f5to9 () {

   b.output( 0);
   d.output( 1);
}
function f6to1 () {

   a.output( 1);
   b.output( 0);
   d.output( 1);
   e.output( 1);
   f.output( 1);
   g.output( 1);
}
function f6to2 () {

   b.output( 0);
   f.output( 1);
   c.output( 1);
}
function f6to3 () {

   b.output( 0);
   e.output( 1);
   f.output( 1);
}
function f6to4 () {

   a.output( 1);
   b.output( 0);
   d.output( 1);
   e.output( 1);
}
function f6to5 () {

   e.output( 1);
}
function f6to7 () {
   b.output( 0);
d.output( 1);
e.output( 1);
f.output( 1);
g.output( 1);

}
function f6to8 () {
b.output( 0);
}
function f6to9 () {
b.output( 0);
d.output( 1);
e.output( 1);

}
function f6to0 () {
b.output( 0);
g.output( 1);
}
function f7to0 () {
d.output( 0);
e.output( 0);
f.output( 0);

}
function f7to1 () {
a.output( 1);
}
function f7to2 () {
c.output( 1);
d.output( 0);
e.output( 0);
g.output( 0);

}
function f7to3 () {
g.output( 0);
d.output( 0);

}
function f7to9 () {
f.output( 1);
g.output( 1);

}
function f7to4 () {
a.output( 1);
f.output( 0);
g.output( 0);

}
function f7to5 () {
b.output( 1);
d.output( 0);
f.output( 0);
g.output( 0);
}
function f7to6 () {
b.output( 1);
d.output( 0);
e.output( 0);
f.output( 0);
g.output( 0);
}
function f7to8 () {
d.output( 0);
e.output( 0);
f.output( 0);
g.output( 0);
}
