/**
 * Route control for our app
 */

define([ 'jquery', 'underscore', 'backbone', 'main'

], function($, _, Backbone, Main) {
	var AppRouter = Backbone.Router.extend({
		routes : {
//			// Define some URL routes
//			'record' : 'showRecordView',	//for debugging

			// Default
			'*actions' : 'defaultAction',
		},

		defaultAction : function(actions) {
			Main.initializeIndex();	// to initialize our page
		},
	});

	var initialize = function() {
		var app_router = new AppRouter();
		Backbone.history.start({
			pushState : true
		}); //Backbone listen to hash changes since this statement; pushState has to be true in order to work.
	};
	return {
		initialize : initialize
	};
});