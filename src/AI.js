pp.AI = function( callback )
{
	this.callback = callback;
}

pp.AI.prototype.receiveData = function( data )
{
	this.callback.receiveInstruction({tank: {forward: 0.01, turn: 0.01}});
}

