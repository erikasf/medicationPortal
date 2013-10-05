define([
        'jquery',
        'underscore',
        'backbone',
        'main'
        
        ], function($, _, Backbone,Main){
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			'record': 'showRecordView',

			// Default
			'*actions': 'defaultAction',
		},

		showRecordView: function(){
			Main.initialize();
		},

		// No matching route, do nothing
		defaultAction: function(actions){
			console.log('There is no route:', actions);
		},
	});

	var initialize = function(){
		var app_router = new AppRouter();
		Backbone.history.start({pushState: true});	//Backbone listen to hash changes since this statement; pushState has to be true in order to work
	};
	return {
		initialize: initialize
	};
});