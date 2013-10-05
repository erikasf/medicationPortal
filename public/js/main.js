/*
 * The main.js which define our application main logic
 */

define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',

        ], function($, _, Backbone){
	var initialize = function(){
		console.log("Success!");
	}


	return {
		initialize: initialize
	};

});