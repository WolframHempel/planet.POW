pp.Player = function( world, aiClass )
{
	this._oWorld = world;
	this._oWorld.on( "update", this.receiveData, this );

	this._oTank = new pp.object.Tank();
	this._oWorld.add( this._oTank );
	this._oAI = new aiClass(this);
}

pp.Player.prototype.receiveData = function( data )
{
	this._oAI.receiveData( data );
}
pp.Player.prototype.receiveInstruction = function( instructions )
{
	this._oTank.setInstructions( instructions.tank );
}