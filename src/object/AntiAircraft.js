pp.ns( "pp.object" );

pp.object.AntiAircraft = function()
{
	this._oWorld = null;
	this._oChassisGeometry = new THREE.CylinderGeometry( 100, 100, 100 );
	this._oChassisMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	this._oChassisMesh = new THREE.Mesh( this._oChassisGeometry, this._oChassisMaterial );
};

pp.object.AntiAircraft.prototype.setWorld = function( oWorld )
{
	this._oWorld = oWorld;
	this._oWorld.getScene().add( this._oChassisMesh );
};