pp.GPS = function( planetRadius )
{
	this._nPlanetRadius = planetRadius;
}

/**
 * Converts lattitude and longitude into cartesian coordinates
 * @param lattitude in Radians. 0 (North Pole) to PI (South Pole)
 * @param longitude in Radians. 0 (Greenwich) to PI (Opposite Greenwich) to 2PI (Greenwhich again)
 * @return {Object}
 */
pp.GPS.prototype.getCartesian = function( lattitude, longitude )
{
	var x = Math.sin(longitude) * Math.cos(lattitude);
	var y = Math.sin(lattitude);// * Math.cos(longitude);
	var z = Math.cos(lattitude) * Math.cos(longitude);
	return { x: this._nPlanetRadius * x, y: this._nPlanetRadius * y, z:this._nPlanetRadius * z };
}

pp.GPS.prototype.getRotation = function( startPosition, endPosition )
{
	var dLat = endPosition.lat - startPosition.lat;
	var dLong = endPosition.long - startPosition.long
	var x = - dLat * Math.cos(dLong);
	var y = dLong * Math.cos(dLat);
	var z = dLat * Math.sin(dLong);
	return { x: x, y: y, z: z };
}

pp.GPS.prototype.getDistance = function( startPosition, endPosition )
{
	var dLat = Math.abs(endPosition.lat - startPosition.lat);
	var dLong = endPosition.long - startPosition.long
	return dLat;
}