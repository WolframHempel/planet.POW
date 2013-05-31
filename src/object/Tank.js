pp.ns( "pp.object" );

pp.object.Tank = function()
{
	this._oGeometry =  new THREE.CubeGeometry(5,5,5);
	this._oMaterial = new THREE.MeshBasicMaterial({color: 0x000000, alpha: 0.1,  wireframe: true});
	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );
	this._oWorld = null;

    this.vector = new THREE.Vector3( 0, 0, 20 );
    this.facingVector =  new THREE.Vector3(0,-1,0);

	this.instructions = {forward: 0, turn: 0};

    long = 0;
    lat = 0;

    this.lat = 0;
    this.long = 0;

	this._oMesh.position.z = 20;

    this.gps = new pp.GPS(20, this.vector, this.facingVector,this._oMesh);
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


    var forward = this.instructions.forward;
    this.lat = lat;
    var turn = this.instructions.turn;
    this.long = long;

    this.gps.move(forward, turn);
};

pp.object.Tank.prototype.setInstructions = function( instructions )
{
	this.instructions = instructions;
}





