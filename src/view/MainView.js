pp.ns( "pp.view" );

pp.view.MainView = function( eContainer )
{
	this._oWorld = null;

	this._eContainer = eContainer;
	this._nWidth = eContainer.offsetWidth;
	this._nHeight = eContainer.offsetHeight;

	this._oCamera = new THREE.PerspectiveCamera( 75, this._nWidth / this._nHeight, 0.1, 1000 );
	this._oCamera.position.z = 50;

	this._oRenderer = new THREE.WebGLRenderer({antialias: true});
	this._oRenderer.setSize( this._nWidth, this._nHeight );
	eContainer.appendChild( this._oRenderer.domElement );
};

pp.view.MainView.prototype.setWorld = function( oWorld )
{
	this._oWorld = oWorld;
	this._oWorld.on( "render", this.render, this );
	this._oWorld.getScene().add( this._oCamera );

	var oPlanet = this._oWorld.getObjectsByClass( pp.object.Planet )[ 0 ];
	//this._oCamera.lookAt( oPlanet.getMesh() );
};

pp.view.MainView.prototype.render = function()
{
	this._oRenderer.render( this._oWorld.getScene(), this._oCamera );
};