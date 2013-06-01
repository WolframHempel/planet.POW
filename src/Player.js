pp.Player = function( _oWorld, cAI )
{
	this._oWorld = _oWorld;
	this._oWorld.on( "update", this.receiveData, this );

	this._oTank = new pp.object.Tank();
	this._oWorld.add( this._oTank );
	this._oAI = new cAI(this);
}

pp.Player.prototype.receiveData = function( _mData )
{
	this._oAI.receiveData( _mData );
}

pp.Player.prototype.receiveInstruction = function( _mInstructions )
{
	this._oTank.setInstructions( _mInstructions.tank );
}