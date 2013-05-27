pp.ns( "pp.object" );

pp.object.Planet = function()
{
	this._oGeometry = new THREE.SphereGeometry( 20, 30, 30 );
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );

	this._oWorld = null;
};

pp.object.Planet.prototype.setWorld = function( oWorld )
{
	this._oWorld = oWorld;
};

pp.object.Planet.prototype.getThreeObject = function()
{
	return this._oMesh;
};