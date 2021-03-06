pp.GPS = function(vector, facingVector, mesh)
{
    this._oVector = vector;
    this._oFacingVector = facingVector;
    this._oMesh = mesh;
}

/**
 * Converts lattitude and longitude into cartesian coordinates
 * @param lattitude in Radians. 0 (North Pole) to PI (South Pole)
 * @param longitude in Radians. 0 (Greenwich) to PI (Opposite Greenwich) to 2PI (Greenwhich again)
 * @return {Object}
 */
//pp.GPS.prototype.getCartesian = function( lattitude, longitude )
//{
//	var x = Math.sin(longitude) * Math.cos(lattitude);
//	var y = Math.sin(lattitude);// * Math.cos(longitude);
//	var z = Math.cos(lattitude) * Math.cos(longitude);
//	return { x: this._nPlanetRadius * x, y: this._nPlanetRadius * y, z:this._nPlanetRadius * z };
//}
//
//pp.GPS.prototype.getRotation = function( startPosition, endPosition )
//{
//	var dLat = endPosition.lat - startPosition.lat;
//	var dLong = endPosition.long - startPosition.long
//	var x = - dLat * Math.cos(dLong);
//	var y = dLong * Math.cos(dLat);
//	var z = dLat * Math.sin(dLong);
//	return { x: x, y: y, z: z };
//}
//
//pp.GPS.prototype.getDistance = function( startPosition, endPosition )
//{
//	var dLat = Math.abs(endPosition.lat - startPosition.lat);
//	var dLong = endPosition.long - startPosition.long
//	return dLat;
//}

pp.GPS.prototype.setFacing = function( facing )
{
	this._oFacingVector = facing;
}

pp.GPS.prototype.move = function( forward, turn )
{
    var position = this._oVector;
    var facing = this._oFacingVector;
    var mesh = this._oMesh;
    var quaternion = pp.MathUtilities.calculateRotationBetweenPlaneAndVector(position, facing, forward);

    //Calculate Tanks new position
    position.applyQuaternion( quaternion );
    facing.applyQuaternion( quaternion );

    //Update the meshes position
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;

    // Rotate Tank Appropriately in forward and backwards
    var vectorNorm = pp.MathUtilities.duplicateVectorNorm(position);
    var facingVectorNorm = pp.MathUtilities.duplicateVectorNorm(facing);
    var perp = pp.MathUtilities.getPerpendicular(vectorNorm, facingVectorNorm);
    pp.MathUtilities.rotateAroundWorldAxis(mesh, perp, forward);

    // Rotate Tank Appropriately in left and right
    var currentPositionNorm = pp.MathUtilities.duplicateVectorNorm(position);
    pp.MathUtilities.rotateAroundWorldAxis(mesh, currentPositionNorm, turn);
    pp.MathUtilities.rotateVectorAroundAxis(facing, currentPositionNorm, turn);
}

