/*
 * The main.js which define our application main logic
 */

define([
        // These are path alias that we configured in our bootstrap
        'jquery',     
        'underscore', 
        'backbone',
        'view/dosageView',

        ], function($, _, Backbone,DosageView){
	var initialize = function(){
		console.log("Success!");

	}
	
	var initializeIndex = function(){
		console.log("Initializing index page");
		new DosageView();
	}


	return {
		initialize: initialize,
		initializeIndex: initializeIndex
	};

});