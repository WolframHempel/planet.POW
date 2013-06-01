pp.Player = function( world )
{
	this._oAI = new pp.KeyboardAI( this );
	this._oWorld = world;
	this._oWorld.on( "update", this.receiveData, this );

	this._oTank = new pp.object.Tank();
	this._oWorld.add( this._oTank );
}

pp.Player.prototype.receiveData = function( data )
{
	this._oAI.receiveData( data );
}
pp.Player.prototype.receiveInstruction = function( instructions )
{
	this._oTank.setInstructions( instructions.tank );
}