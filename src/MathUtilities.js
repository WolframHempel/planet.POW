pp.MathUtilities = function()
{

}

pp.MathUtilities.rotateAroundWorldAxis =function(object, axis, radians) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;

    object.rotation.setEulerFromRotationMatrix(object.matrix);
}

pp.MathUtilities.duplicateVectorNorm = function(vector) {
    var currentPositionNorm = new THREE.Vector3();
    currentPositionNorm.copy(vector);
    currentPositionNorm.normalize();
    return currentPositionNorm;
}

pp.MathUtilities.rotateVectorAroundAxis = function(vector, axis, angle) {
    var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
    vector.applyMatrix4( matrix );
}

pp.MathUtilities.calculateRotationBetweenTwoNormals = function(currentPosition, directionVector, lat) {
    var tempVector = new THREE.Vector3(0,0,0);

    var currentPositionNorm = pp.MathUtilities.duplicateVectorNorm(currentPosition)
    var directionVectorNorm = pp.MathUtilities.duplicateVectorNorm(directionVector)

    //Axis that is perpendicular to yourLocation and your direction
    var axis = pp.MathUtilities.getPerpendicular(currentPositionNorm, directionVectorNorm);
    var angle = lat; //Math.acos(tempVector.dot(originalVector, targetVector));;

    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis,angle);

    return quaternion;
}

pp.MathUtilities.getPerpendicular = function(vector1, vector2) {
    var tempVector = new THREE.Vector3(0,0,0);
    var axis = tempVector.crossVectors(vector1, vector2);

    axis.normalize();
    return axis;
}