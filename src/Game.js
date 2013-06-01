pp.Game = function( eContainer )
{
	this._eContainer = eContainer;
	this._oWorld = new pp.World();

	this._oPlanet = new pp.object.Planet();
	this._oWorld.add( this._oPlanet );

	this._oWorld.addPlayer(pp.KeyboardAI);

	// this._oAntiAircraft = new pp.object.AntiAircraft();
	// this._oWorld.add( this._oAntiAircraft );

	this._oMainView = new pp.view.MainView( this._eContainer );
	this._oWorld.add( this._oMainView );
};