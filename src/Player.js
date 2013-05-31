pp.Player = function(world, tank)
{
	this.ai = new pp.AI(this);
	this.world = world;
	this.tank = tank;
	this.world.on("update", this.receiveData, this);
}

pp.Player.prototype.receiveData = function( data )
{
	this.ai.receiveData( data );
}
pp.Player.prototype.receiveInstruction = function( instructions )
{
	this.tank.setInstructions(instructions.tank);
}