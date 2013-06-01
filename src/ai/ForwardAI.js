pp.ForwardAI = function ( callback )
{
	this.callback = callback;
}

pp.ForwardAI.prototype.receiveData = function( data )
{
	this.callback.receiveInstruction( {tank: {_nForward: 0.01 , _nTurn: 0}} );
}
