define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($,_,Backbone, Router){
// pass in jQuery, underscore, backbone and router
	var initialize = function(){
		Router.initialize();

	};
	//return function to be used by other modules (export)
	return {
		initialize: initialize
	};

});