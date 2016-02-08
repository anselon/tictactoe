define([
    'jquery',
    'underscore',
    'backbone',
    ], function($,_,Backbone){
        var PlayerModel = Backbone.Model.extend({
            defaults: {
                letter: ''
            }, 
            initialize: function(letter){
                this.letter = letter

            }
        });
        return PlayerModel;
    });