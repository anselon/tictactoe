define([
    'jquery',
    'underscore',
    'backbone',
    'views/HomeView'
    ], function($,_,Backbone, HomeView){
        var AppRouter = Backbone.Router.extend({
            routes: {

                //default
                '*actions': 'defaultAction'
            }
        });

        var initialize = function(){

            var app_router = new AppRouter();

   
            app_router.on('route:defaultAction', function(actions){
                homeView = new HomeView({el: '#content' });
                homeView.render();
               
            });

            Backbone.history.start();
        };
        return {
            initialize: initialize
        };
       

    });