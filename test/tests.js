test( "test position at North Pole", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( 0,0 );
	equal( 0, cartesianCoords.x );
	equal( 100, cartesianCoords.y );
	equal( 0, cartesianCoords.z );
});

test( "test position at South Pole", function() {
	var gps = new pp.GPS( 100 );
	var cartesianCoords = gps.getCartesian( Math.PI,0 );
	assertCartesianCoords( cartesianCoords,0, -100, 0 );
});

test( "test position at Greenwich Equator", function() {
	var gps = new pp.GPS(100);
	var cartesianCoords = gps.getCartesian(Math.PI/2,0);
	assertCartesianCoords( cartesianCoords,0, 0, 100 );
});

function assertCartesianCoords( cartesianCoords, x, y, z ) {

	ok( x-0.00001 < cartesianCoords.x );
	ok( x+0.00001 > cartesianCoords.x );
	ok( y-0.00001 < cartesianCoords.y );
	ok( y+0.00001 > cartesianCoords.y );
	ok( z-0.00001 < cartesianCoords.z );
	ok( z+0.00001 > cartesianCoords.z );
}