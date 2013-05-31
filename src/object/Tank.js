pp.ns( "pp.object" );

pp.object.Tank = function()
{
	this._oGeometry =  new THREE.CubeGeometry(5,5,5);
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );
	this._oWorld = null;

	this.long = 0;
	this.lat = 0;
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

pp.object.Tank.prototype.update = function( nTime )
{
	var gps = new pp.GPS(20);
	var coords = gps.getCartesian(lat, long);
	var rotation = gps.getRotation({ "lat":this.lat,"long":this.long },{ "lat":lat,"long":long })
	this._oMesh.position.x = coords.x;
	this._oMesh.position.y = coords.y;
	this._oMesh.position.z = coords.z;
	this._oMesh.rotation.x += rotation.x;
	this._oMesh.rotation.y += rotation.y;
	this._oMesh.rotation.z += rotation.z;

	//console.log(rotation.x, rotation.y, rotation.z);
	this.long = long;
	this.lat = lat;

};