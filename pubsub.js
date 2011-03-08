/*	

	jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

	Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

	Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
	http://dojofoundation.org/license for more information.

*/	

;(function(d){

	// the topic/subscription hash
	var cache = {};

	d.publish = function(/* String */topic, /* Array */...args){
		// summary: 
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		// args: ...rest Array
		//		The data to publish. Each array item is converted into an ordered
		//		arguments on the subscribed functions. Does not require the caller
		//		to construct a new array.
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//		$.publish("/some/topic", "a", "b", "c");
		
		args = args || [];
		var observers = cache[topic] ? cache[topic].slice() || [];
		
		d.each(observers, function(){
			this.apply(d, args);
		});
	};

	d.subscribe = function(/* String */topic, /* Function */callback){
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The event handler. Anytime something is $.publish()'ed on a 
		//		subscribed channel, the callback will be called with the
		//		published arguments as its arguments.
		//
		// example:
		//	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		//
		cache[topic] = cache[topic] || [];
		cache[topic].push(callback);
		return true;
	};

	d.unsubscribe = function(/* string */ topic, /* function */ callback){
		// summary:
		//		Disconnect a subscribed function for a topic.
		// topic: String
		//		The topic name passed to the $.subscribe call.
		// callback: Function
		//		The callback passed to the $.subscribe call.
		// example:
		//	var callback = function(){/* do something */};
		//	$.subscribe("topic", callback); //registered for messages
		//	$.unsubscribe("topic", callback); //removed from observers list
		
		cache[topic] && d.each(cache[topic], function(idx){
			if(this == callback){
				cache[t].splice(idx, 1);
			}
		});
	};

})(jQuery);

