pp.GPS = function( planetRadius )
{
	this._nPlanetRadius = planetRadius;
}

/**
 * Converts logitude and lattitude into cartesian coordinates
 * @param longitude in Radians. 0 (North Pole) to PI (South Pole)
 * @param lattitude in Radians. 0 (Greenwich) to PI (Opposite Greenwich) to 2PI (Greenwhich again)
 * @return {Object}
 */
pp.GPS.prototype.getCartesian = function( longitude, lattitude )
{
	var x = Math.sin(lattitude) * Math.sin(longitude);
	var y = Math.cos(longitude) * Math.cos(lattitude);
	var z = Math.sin(longitude) * Math.cos(lattitude);
	return { x: this._nPlanetRadius * x, y: this._nPlanetRadius * y, z:this._nPlanetRadius * z };
}