require.config({
	paths: {
		jquery: 'libs/jquery/jquery-2.2.0',
		underscore: 'libs/underscore/underscore-1.8.3',
		backbone: 'libs/backbone/backbone',
        templates: '../templates'
	}
});

require([
	'app',
], function(App) {
		App.initialize();
});