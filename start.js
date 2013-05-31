window.onload = function()
{
	var oPlanetPow = new pp.Game( document.body );
	lat = 0;
	long = 0;
	oGui = new dat.GUI();
	oGui.add( window, 'lat', -Math.PI / 2, Math.PI / 2 );
	oGui.add( window, 'long', -Math.PI, Math.PI );
};