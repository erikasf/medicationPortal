/**
 * Bootstrap file for starting the front-end portion of the app. Using requireJs
 * to organize the code
 */
require.config({
	baseUrl : "/js",

	// Create alias
	paths : {
		jquery : "lib/jquery-min",
		underscore : "lib/underscore-min",
		backbone : "lib/backbone-min",
		bootstrapLib : "lib/bootstrap-min",
		d3 : "lib/d3-min", // d3js lib, which is originally planned to use it
							// to show patient data
		text : "lib/requirejs/plugin/text"
	},

	// MUST have, define the parameters alias
	shim : {
		'bootstrapLib' : {
			deps : [ "jquery" ]
		},

		'd3' : {
			deps : [ "jquery" ]
		},

		'backbone' : {
			deps : [ 'jquery', 'underscore' ],
			exports : 'Backbone'
		},

		'underscore' : {
			exports : '_'
		},

		'jquery' : {
			exports : '$'
		},
	}

});

// require something to start
require([
// load the main module and pass it to definition function
"app",

], function(App) {
	// The "main" dependency is passed in as "Main" and the initialization
	// function is called
	App.initialize();

});