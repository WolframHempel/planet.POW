pp.World = function()
{
	pp.tools.EventEmitter.call( this );
	
	this._oScene = new THREE.Scene();

	this._nTime = performance.now();

	this._pObjects = [];
	this._pPlayers = [];

	this.update();
};

pp.World.prototype.getObjectsByClass = function( fClass )
{
	var pResult = [];

	for( var i = 0; i < this._pObjects.length; i++ )
	{
		if( this._pObjects[ i ] instanceof fClass )
		{
			pResult.push( this._pObjects[ i ] );
		}
	}

	return pResult;
};

pp.World.prototype.update = function( nTime )
{
	this.emit( "update",  nTime - this._nTime );
	this.emit( "render" );

	this._nTime = nTime;
	requestAnimFrame( this.update.bind( this ) );
	for (var i=0; i < this._pPlayers.length; i++)
	{
		var player = this._pPlayers[i];
		player.receiveData(null);
	}
};

pp.World.prototype.add = function( oObject )
{
	this._pObjects.push( oObject );
	oObject.setWorld( this );
};

pp.World.prototype.addPlayer = function( cAI )
{
	this._pPlayers.push(new pp.Player(this, cAI));
};

pp.World.prototype.getScene = function()
{
	return this._oScene;
};