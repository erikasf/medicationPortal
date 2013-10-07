/*
 * The backbonejs application main module; should be light weight
 */

define([
// These are path alias that we configured in our bootstrap
'jquery', 'underscore', 'backbone', 'router',

], function($, _, Backbone, Router) {
	var initialize = function() {
		Router.initialize(); // initial the router which is handled by the
								// backbonejs (do not mix with the node.js
								// route). Basically, the idea is the express
								// server render the page for a url and then
								// backbonejs will control the rest.
	};

	return {
		initialize : initialize
	};

});