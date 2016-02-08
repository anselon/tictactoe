define([
    'jquery',
    'underscore',
    'backbone',
    'models/game/GameModel',
    'views/games/GameView'
    ], function($,_,Backbone, GameModel, GameView){
        var AppRouter = Backbone.Router.extend({
            routes: {

                //default
                '*actions': 'defaultAction'
            }
        });

        var initialize = function(){

            var app_router = new AppRouter();

   
            app_router.on('route:defaultAction', function(actions){
                var myGame = new GameModel();
                var gameView = new GameView({model: myGame});
                gameView.render();
               
            });

            Backbone.history.start();
        };
        return {
            initialize: initialize
        };
       

    });