pp.ns( "pp.tools" );

pp.tools.EventEmitter = function(){
	/**
	 * @param {MAP} _callbacks
	 */
	this._callbacks = {};
	/**
	 * Determines whether or not
	 * the event emitter is suspended
	 */
	this.suspended = false;
	/**
	* Every event name is assigned a counter
	* This allows to create unique keys which is necessary
	* to store the callbacks in maps instead of arrays.
	*
	* Why maps? If callbacks manipulate the callback array (e.g. unsubscribe in a callback )
	* the whole for loop gets out of sync...maps solve that
	*/
	this._counters = [];

	/**
	 * Prevents any events from being emitted
	 * while set to true
	 *
	 * @param BOOLEAN suspended
	 */
	this.setSuspended = function( suspended )
	{
		this.suspended = suspended;
	};
	/**
	 * @param {STRING} eventName
	 * @param {FUNCTION} callback
	 * @param {OBJECT} me
	 * @return void
	 */
	this.on = function( sEvent, fCallback, oScope, bCallOnce )
	{
		if( !this._callbacks[ sEvent ] )
		{
			this._callbacks[ sEvent ] = {};
			this._counters[ sEvent ] = 0;
		}

		var sKey = "_" + this._counters[ sEvent ];

		this._counters[ sEvent ]++;

		this._callbacks[ sEvent ][ sKey ] = {
			fn:fCallback,
			emitter: oScope,
			once: !!bCallOnce
		};

		return sKey;
	};


	/**
	 * @param {STRING} sEvent
	 * @param {FUNCTION} fCallback
	 */
	this.unbind = function( sEvent, fCallback_or_sKey )
	{
		var sKey = null;

        if( this._callbacks[ sEvent ] )
        {
			if( typeof fCallback_or_sKey === "string" && this._callbacks[ sEvent ][ fCallback_or_sKey ] )
			{
				sKey = fCallback_or_sKey;
			}
			else
			{
				for( sKey in this._callbacks[ sEvent ] )
				{
					if( this._callbacks[ sEvent ][ sKey ] === fCallback_or_sKey )
					{
						break;
					}
				}
			}
		}

		if( sKey !== null )
		{
			delete this._callbacks[ sEvent ][ sKey ];
		}

		return !!sKey;
	};
	/**
	 * @param {STRING} eventName
	 * @param {V} args
	 */
	this.emit = function( sEvent, vArguments )
	{
		if( !this._callbacks[ sEvent ] || this.suspended )
		{
			return false;
		}

		var pArgs = Array.prototype.slice.call( arguments, 1 );

		for ( var sKey in this._callbacks[ sEvent ] )
		{
			this._callbacks[ sEvent ][ sKey ].fn.apply( this._callbacks[ sEvent ][ sKey ].emitter, pArgs );

			/**
			* Additional check to make sure that the listener hasn't removed itself on
			* the last event
			*/
			if( this._callbacks[ sEvent ][ sKey ] && this._callbacks[ sEvent ][ sKey ].once )
			{
				delete this._callbacks[ sEvent ][ sKey ];
			}
		}
	};
};