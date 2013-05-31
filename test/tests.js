var Deg15 = Math.sin(1*Math.PI/12);
var Deg30 = Math.sin(2*Math.PI/12);
var Deg45 = Math.sin(3*Math.PI/12);
var Deg60 = Math.sin(4*Math.PI/12);
var Deg75 = Math.sin(5*Math.PI/12);
var Deg90 = Math.sin(6*Math.PI/12);

test( "test position at North Pole", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( Math.PI/2,0 );
	assertCartesianCoords( cartesianCoords,0, 100, 0 );
});

test( "test position at 30 North", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( Math.PI/3 ,0 );
	assertCartesianCoords( cartesianCoords,0, Deg60 * 100, Deg30 * 100 );
});

//test( "test position at 30 North 30 East", function() {
//	var gps = new pp.GPS( 100 );
//	var cartesianCoords = gps.getCartesian( Math.PI/6 ,Math.PI/6 );
//	assertCartesianCoords( cartesianCoords,0, Deg60 * 100, Deg30 * 100 );
//});

test( "test position at 60 North", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( Math.PI/6 ,0 );
	assertCartesianCoords( cartesianCoords,0, Deg30 * 100, Deg60 * 100 );
});

test( "test position at Greenwich Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(0,0);
	assertCartesianCoords( cartesianCoords,0, 0, 100 );
});

test( "test position at South Pole", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( -Math.PI/2,0 );
	assertCartesianCoords( cartesianCoords,0, -100, 0 );
});

test( "test position at 90 East on Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(0,Math.PI/2);
	assertCartesianCoords( cartesianCoords, 100, 0, 0 );
});

test( "test position at 90 West on Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(0, -Math.PI/2);
	assertCartesianCoords( cartesianCoords, -100, 0, 0 );
});

test( "test position at 180 East on Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(0, Math.PI);
	assertCartesianCoords( cartesianCoords, 0, 0, -100 );
});

test( "test position at 180 West on Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(0, -Math.PI);
	assertCartesianCoords( cartesianCoords, 0, 0, -100 );
});
//
test( "test position at 60 North 90 West", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian(Math.PI/3, -Math.PI/2);
	assertCartesianCoords( cartesianCoords, -50, Deg60 * 100, 0 );
});

test( "test move from North to South Pole", function() {
	var gps = new pp.GPS( 100 );
	var rotation = gps.getRotation({ "lat":Math.PI/2,"long":0 },{ "lat":-Math.PI/2,"long":0 });
	assertRotation( rotation, Math.PI, 0, 0 );
})

test( "test move from North to 90 East", function() {
	var gps = new pp.GPS( 100 );
	var rotation = gps.getRotation({ "lat":Math.PI/2,"long":0 },{ "lat":0, "long":Math.PI/2 });
	assertRotation( rotation, 0, 0, -Math.PI/2 );
})

//test( "test rotate at North Pole", function() {
//	var gps = new pp.GPS( 100 );
//	var rotation = gps.getRotation({ "lat":Math.PI/2,"long":0 },{ "lat":Math.PI/2, "long":Math.PI/6 });
//	assertRotation( rotation, 0, 0, 0 );
//})

test( "test move from 0,0 to 90 East", function() {
	var gps = new pp.GPS( 100 );
	var rotation = gps.getRotation({ "lat":0,"long":0 },{ "lat":0, "long":Math.PI/2 });
	assertRotation( rotation, 0, Math.PI/2, 0 );
});

test( "test distance between poles", function() {
	var gps = new pp.GPS( 100 );
	var distance = gps.getDistance({ "lat":Math.PI/2,"long":0 },{ "lat":-Math.PI/2, "long":0 });
	assertDistance( Math.PI, distance );
});

test( "test distance from North pole to 0,0", function() {
	var gps = new pp.GPS( 100 );
	var distance = gps.getDistance({ "lat":Math.PI/2,"long":0 },{ "lat":0, "long":0 });
	assertDistance( Math.PI/2, distance );
});

test( "test distance from 0,0 pole to 0,90", function() {
	var gps = new pp.GPS( 100 );
	var distance = gps.getDistance({ "lat":Math.PI/2,"long":0 },{ "lat":0, "long":0 });
	assertDistance( Math.PI/2, distance );
});

function assertCartesianCoords( cartesianCoords, x, y, z ) {

	ok( (x-0.00001 < cartesianCoords.x) , "Expected x to be " + x + " but was " + cartesianCoords.x );
	ok( (x+0.00001 > cartesianCoords.x) , "Expected x to be  " + x + " but was " + cartesianCoords.x );
	ok( (y-0.00001 < cartesianCoords.y) , "Expected y to be  " + y + " but was " + cartesianCoords.y );
	ok( (y+0.00001 > cartesianCoords.y) , "Expected y to be  " + y + " but was " + cartesianCoords.y );
	ok( (z-0.00001 < cartesianCoords.z) , "Expected z to be  " + z + " but was " + cartesianCoords.z );
	ok( (z+0.00001 > cartesianCoords.z) , "Expected z to be  " + z + " but was " + cartesianCoords.z);
}

function assertRotation( rotation, x, y, z ) {

	ok( (x-0.00001 < rotation.x) , "Expected x to be " + x + " but was " + rotation.x );
	ok( (x+0.00001 > rotation.x) , "Expected x to be  " + x + " but was " + rotation.x );
	ok( (y-0.00001 < rotation.y) , "Expected y to be  " + y + " but was " + rotation.y );
	ok( (y+0.00001 > rotation.y) , "Expected y to be  " + y + " but was " + rotation.y );
	ok( (z-0.00001 < rotation.z) , "Expected z to be  " + z + " but was " + rotation.z );
	ok( (z+0.00001 > rotation.z) , "Expected z to be  " + z + " but was " + rotation.z);
}

function assertDistance( expectedDistance, distance ) {

	ok( (expectedDistance-0.00001 < distance) , "Expected x to be " + expectedDistance + " but was " + distance );
	ok( (expectedDistance+0.00001 > distance) , "Expected x to be  " + expectedDistance + " but was " + distance );
}