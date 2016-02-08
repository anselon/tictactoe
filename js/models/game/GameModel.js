define([
    'jquery',
    'underscore',
    'backbone',
    'models/player/PlayerModel'
    ], function($,_,Backbone, PlayerModel){


        var playerX = new PlayerModel('X');
        var playerO = new PlayerModel('O');

        var GameModel = Backbone.Model.extend({
            
            defaults: {
                players: [playerX, playerO],
                currentPlayerIndex: 0,
                turnCount: 0,
            },


            switchPlayers: function(){
                this.set({currentPlayerIndex: ((this.get('currentPlayerIndex') === 0) ? 1 : 0)});
              
            },

            getCurrentPlayer: function(){

                return this.get('players')[ this.get('currentPlayerIndex') ];
            },


            takeTurn: function (event) {

                if ($(event.target).html().length !== 0){
                    $(event.target).css({"background-color":"red"});
                    window.setTimeout(function(){
                        $(event.target).css({"background-color":"transparent"});
                    }, 300);
                    
                }else {
                    $(event.target).html(this.getCurrentPlayer().letter);
           
                    this.set({turnCount: this.turnCount++});

                }
                
                    
            },



            checkForWinnerOrTie: function(event){
                var location = $(event.target).attr('id').split("-");
                var xPos = parseInt(location[0]);
                var yPos = parseInt(location[1]);
                var isWinner = (this.checkRow(xPos) || this.checkCol(yPos) || this.checkDiags());
                var isCatsGame = (!isWinner && (this.turnCount === 9));
                if (isWinner){

                    alert("Player " + this.getCurrentPlayer().letter + " won!");
                    this.restart();
                }
                if (isCatsGame){
                    alert("No one wins!");
                    this.restart();
                }
            },

            restart: function() {
                for (var x=0;x<=2;x++){
                    for (var y=0; y<=2; y++){
                        var squareId =  y+ "-" + x.toString();
                        $("#"+squareId).empty();
                    }
                }
                this.set({turnCount: 0, currentPlayerIndex: 0});

            },

            checkRow: function(rowIndex) {

                for (var i=0; i<=2; i++){
                    var squareId = rowIndex + "-" + i.toString();

                    var letter = $("#"+squareId).html();

                    if ((letter === undefined)||(letter != this.getCurrentPlayer().letter)){

                        return false;
                    }
                }

                return true;

            },

            checkCol: function(colIndex){

                for (var i=0; i<=2; i++){
                    var squareId =  i.toString() + "-" + colIndex;
                    var letter = $("#"+squareId).html();
                    
                    if ((letter === undefined)||(letter != this.getCurrentPlayer().letter)){
                        return false;
                    }
                    
                }
                return true;

            },

            checkDiags: function(){
                
                var firstDiagHasWinner = true;
                var secondDiagHasWinner = true;
                var squareId;
                var letter;

                //top left to bottom right diagonal
                for (var i=0; i<=2; i++){
                    squareId =  i.toString() + "-" + i.toString();
                    letter = $("#"+squareId).html();
                    if ((letter === undefined)||(letter != this.getCurrentPlayer().letter)){
                        firstDiagHasWinner = false;
                    }
                }



                //top right to bottom left diagonal
                for (var j=0; j<=2; j++){
                    squareId =  j.toString() + "-" + (2-j).toString();
                    letter =  $("#"+squareId).html();

                    if ((letter === undefined)||(letter != this.getCurrentPlayer().letter)){
                        secondDiagHasWinner = false;
                    }
                    
                }

                return (firstDiagHasWinner || secondDiagHasWinner);
            }


        });

        return GameModel;
    });