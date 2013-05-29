pp.ns( "pp.object" );

pp.object.Tank = function()
{
	this._oGeometry =  new THREE.CubeGeometry(5,5,5);
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );
	this._oWorld = null;

	long = 0;
	lat = 0;
};

pp.object.Tank.prototype.setWorld = function( oWorld )
{
	this._oWorld = oWorld;
	this._oWorld.on("update", this.update, this);
};

pp.object.Tank.prototype.getThreeObject = function()
{
	return this._oMesh;
};

pp.object.Tank.prototype.update = function( nTime )
{
	var gps = new pp.GPS(20);
	var coords = gps.getCartesian(lat, long);
	this._oMesh.position.x = coords.x;
	this._oMesh.position.y = coords.y;
	this._oMesh.position.z = coords.z;
};