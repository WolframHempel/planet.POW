pp.TurnAI = function ( callback )
{
	this.callback = callback;
}

pp.TurnAI.prototype.receiveData = function( data )
{
	this.callback.receiveInstruction( {tank: {_nForward: 0.01 , _nTurn: 0.03}} );
}
