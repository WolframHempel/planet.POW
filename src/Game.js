pp.Game = function( eContainer )
{
	this._eContainer = eContainer;
	this._oWorld = new pp.World();

	this._oPlanet = new pp.object.Planet();
	this._oWorld.add( this._oPlanet );

	this._oTank = new pp.object.Tank();
	this._oWorld.add( this._oTank );

	this._oMainView = new pp.view.MainView( this._eContainer );
	this._oWorld.add( this._oMainView );
};