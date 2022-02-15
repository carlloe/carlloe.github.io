var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //undefined variable that will hold an individual circle
        var circles = []; //empty array that will later hold multiple circles

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2); //calls the randomCircle function, creates a circle, stores it in the circle variable
            physikz.addRandomVelocity(circle, canvas, 2, 2); //adds random velocity
            view.addChild(circle); //add circle to canvas
            circles.push(circle); //push method pushes individual cricles to circles array 

        }

        // TODO 3 / 8 : Call the drawCircle() function 
        
        /* manually, repetitively calling circles for each time the function was called

            drawCircle();
            drawCircle();
            drawCircle();
            drawCircle();
            drawCircle();
        */

        //this loop creates 100 circles by increasing the amount of times drawCircle is called until it reaches the specified number            
        for (var i = 0; i <= 100; i++){
             drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            
            //I deleted the function calls, because I can now use them inside of a loop instead of being repetitive
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
           
            //I deleted the function calls, because I can now use them inside of a loop instead of being repetitive

            // TODO 9 : Iterate over the array
           
            for (var k = 0; k < circles.length; k++) { //this iteration allows me to call 100 circles without having to call in each one individually, and it keeps them moving
                var eachCircle = circles[k];
                physikz.updatePosition(eachCircle);
                game.checkCirclePosition(eachCircle);
                // code to repeat using eachValue
             }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            //if the circle has gone past the left side of the screen then place it on the right
            if ( circle.x < 0 ){
                circle.x = canvas.width;
            }
            // if the circle has gone off the bottom of the screen then place it at the top 
            if (circle.y > canvas.height){
                circle.y = 0;
            }
            // if the circle has gone off the top of the screen then place it at the bottom 
            if (circle.y < 0 ){
                circle.y = canvas.height
            }
                
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
