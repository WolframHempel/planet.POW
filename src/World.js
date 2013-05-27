pp.World = function()
{
	pp.EventEmitter.call( this );
	
	this.scene = new THREE.Scene();

	this._nTime = performance.now();

	this._pObjects = [];
AAA = this;
	this.update();
};

pp.World.prototype.update = function( nTime )
{
	this.emit( "update",  nTime - this._nTime );
	this.emit( "render" );

	this._nTime = nTime;
	requestAnimFrame( this.update.bind( this ) );
};

pp.World.prototype.add = function( oObject )
{
	this._pObjects.push( oObject );
	this.scene.add( oObject.getThreeObject() );
	oObject.setWorld( this );
};