/*
 * The main.js which define our application main logic
 */

define([
// These are path alias that we configured in our bootstrap
'jquery', 'underscore', 'backbone', 'view/dosageView',

], function($, _, Backbone, DosageView) {
	//	var initialize = function(){
	//		console.log("Success!");	// for debugging
	//	}

	var initializeIndex = function() {
		console.log("Initializing index page");
		new DosageView();	// To create the view of the entire application
	}

	return {
//		initialize : initialize, for debugging
		initializeIndex : initializeIndex
	};

});