pp.ns( "pp.object" );

pp.object.Tank = function()
{
	this._oGeometry =  new THREE.CubeGeometry(5,5,5);
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );
	this._oWorld = null;

    this.vector = new THREE.Vector3( 0, 0, 20 );
    this.facingVector =  new THREE.Vector3(0,-1,0);

    long = 0;
    lat = 0;

    this.lat = 0;
    this.long = 0;

	this._oMesh.position.z = 20;
};

pp.object.Tank.prototype.setWorld = function( oWorld )
{
	this._oWorld = oWorld;
	this._oWorld.getScene().add( this._oMesh );
	this._oWorld.on("update", this.update, this);
};

pp.object.Tank.prototype.destroy = function()
{
	this._oWorld.unbind( "update", this.update );
	this._oWorld.getScene().remove( this._oMesh );
};

function getPerpendicular(vector1, vector2) {
    var tempVector = new THREE.Vector3(0,0,0);
    var axis = tempVector.crossVectors(vector1, vector2);

    axis.normalize();
    return axis;
}

function calculateRotationBetweenTwoNormals(currentPosition, directionVector, lat) {
    var tempVector = new THREE.Vector3(0,0,0);

    var currentPositionNorm = duplicateVectorNorm(currentPosition)
    var directionVectorNorm = duplicateVectorNorm(directionVector)

    //Axis that is perpendicular to yourLocation and your direction
    var axis = getPerpendicular(currentPositionNorm, directionVectorNorm);
    var angle = lat; //Math.acos(tempVector.dot(originalVector, targetVector));;

    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis,angle);

    return quaternion;
}

pp.object.Tank.prototype.update = function( nTime )
{
	var gps = new pp.GPS(20);

    var dLat = lat - this.lat;
    this.lat = lat;

    var dLong = long - this.long;
    this.long = long;
    var quaternion = calculateRotationBetweenTwoNormals(this.vector, this.facingVector, dLat);

    this.vector.applyQuaternion( quaternion );
    this.facingVector.applyQuaternion( quaternion );

    var vectorNorm = duplicateVectorNorm(this.vector);
    var facingVectorNorm = duplicateVectorNorm(this.facingVector);
    var perp = getPerpendicular(vectorNorm, facingVectorNorm);

    this._oMesh.position.x = this.vector.x;
    this._oMesh.position.y = this.vector.y;
    this._oMesh.position.z = this.vector.z;

    var xAxis = new THREE.Vector3(1,0,0);
    var zAxis = new THREE.Vector3(0,0,20);
    //console.log(this.vector);
    rotateAroundWorldAxis(this._oMesh, perp, dLat);

    //console.log(this.vector);
    var currentPositionNorm = duplicateVectorNorm(this.vector);

    rotateAroundWorldAxis(this._oMesh, currentPositionNorm, dLong);
    rotateVectorAroundAxis(this.facingVector, currentPositionNorm, dLong);
//    rotateAroundWorldAxis(this._oMesh, currentPositionNorm, dLong);

};

function rotateVectorAroundAxis(vector, axis, angle) {
    var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
    vector.applyMatrix4( matrix );
}

function duplicateVectorNorm(vector) {
    var currentPositionNorm = new THREE.Vector3();
    currentPositionNorm.copy(vector);
    currentPositionNorm.normalize();
    return currentPositionNorm;
}


function rotateAroundWorldAxis(object, axis, radians) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;

    // new code for Three.js v50+
    object.rotation.setEulerFromRotationMatrix(object.matrix);

    // old code for Three.js v49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
}
