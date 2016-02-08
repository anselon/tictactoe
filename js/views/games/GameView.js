define([
    'jquery',
    'underscore',
    'backbone',
    'models/game/GameModel',
    'text!templates/games/gameboard.html'

    ], function ($,_,Backbone,GameModel,GameboardTemplate) {
        var GameView = Backbone.View.extend({
            
            el: '#game-container',
            model: GameModel,
            template: _.template(GameboardTemplate),

            render: function(){
 
                this.$el.html(this.template());

            },

            events: {
                "click .board-square": "playTurn"
            },

            playTurn: function(evt){ 
                this.model.takeTurn(evt);
                this.model.checkForWinnerOrTie(evt);
                this.model.switchPlayers();
            }
        });
        return GameView;
    });