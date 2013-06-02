pp.Player = function( _oWorld, cAI )
{
	this._oWorld = _oWorld;
	this._oWorld.on( "update", this.receiveData, this );

	this._oTank = new pp.object.Tank(this);
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

pp.Player.prototype.fire = function( position, facing ) {
	this._oWorld.add( new pp.object.Shell( pp.MathUtilities.duplicateVector( position ), pp.MathUtilities.duplicateVector( facing )) );
}