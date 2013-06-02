pp.ns( "pp.object" );

pp.object.Tank = function()
{
	this._oGeometry =  new THREE.CubeGeometry(5,5,5);
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );

	this._oWorld = null;

    this._oVector = new THREE.Vector3( 0, 0, 22.5 );
    this._oFacingVector =  new THREE.Vector3(0,1,0);

	this.instructions = {_nForward: 0, _nTurn: 0};

    this.gps = new pp.GPS(20, this._oVector, this._oFacingVector,this._oMesh);
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


    var forward = this.instructions._nForward;
    var turn = this.instructions._nTurn;

    this.gps.move(forward, turn);
};

pp.object.Tank.prototype.setInstructions = function( instructions )
{
	this.instructions = instructions;
}





