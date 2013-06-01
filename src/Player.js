pp.Player = function(world)
{
	this.ai = new pp.KeyboardAI(this);
	this.world = world;
	this.world.on("update", this.receiveData, this);

	this._oTank = new pp.object.Tank();
	this.world.add( this._oTank );
}

pp.Player.prototype.receiveData = function( data )
{
	this.ai.receiveData( data );
}
pp.Player.prototype.receiveInstruction = function( instructions )
{
	this._oTank.setInstructions(instructions.tank);
}