pp = {};

pp.ns = function( sNamespace )
{
	var oRoot = window;
	var pNamespace = sNamespace.split( "." );

	for( var i = 0; i < pNamespace.length; i++ )
	{
		if( !oRoot[ pNamespace[ i ] ] )
		{
			oRoot[ pNamespace[ i ] ] = {};
		}
		oRoot = oRoot[ pNamespace[ i ] ];
	}
};