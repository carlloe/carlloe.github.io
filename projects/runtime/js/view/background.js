var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width; //variable finding the width of the canvas
        var canvasHeight = app.canvas.height; //variable finding the height of the canvas 
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        var tree; //holds the variable tree
        var buildings = []; //holds an empty array called buildings
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.bitmap('img/back.jpg');//creates a variable callsed backgroundFill that will create a background color for the game
            background.addChild(backgroundFill);//adds background
            // TODO: 3 - Add a moon and starfield
            
            var moon = draw.bitmap('img/moon.png');//holds image of moon
            moon.x = 1700;//holds the x value (left to right)
            moon.y = 40;//hold the y value (up and down)
            moon.scaleX = 0.2;//changes x scale of the moon
            moon.scaleY = 0.2;//changes y scale of the moon 
            background.addChild(moon);//adds moon to the background

           /* for(var i = 0; i <= 100; i++){ //creates a loop that will make 100 circles
                var circle = draw.circle(4,'LightYellow','LightGray',2);//determines the color and size of the circles
                circle.x = canvasWidth*Math.random();//creates a random x position within the canvas width for the circle
                circle.y = groundY*Math.random();//creates a random y position within the canvas width for the circle
                background.addChild(circle);//add the circles to the background
            } */
            
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why? //so that the tree is in front of the buildings
            //everytime this loops runs it creates a building with an x and y value and pushes it to the buildings array
            /*for(var i=0;i<5;++i) {
                var buildingHeight = 300*Math.random(); //creates random building heights
                var building = draw.rect(75,buildingHeight,'lightBlue','Black',1);//declares a variable called building which will hold each building
                building.x = 600 + 200*i;//adds 200 pixels to the x value everytime loop runs 
                building.y = groundY-buildingHeight;//sets the buildings y position subtracting the height of the building from groundY
                background.addChild(building);//adds building to background
                buildings.push(building);//push the buildings data to the buildings array and store it as an index 
            } */
            
            // TODO 4: Part 1 - Add a tree
            
            tree = draw.bitmap('img/tree.png');//holds the image of the tree
            tree.x = 600;//changes the x position of the tree
            tree.y = 300;//changes the y position of the tree
            background.addChild(tree);//adds the tree to the background 
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            tree.x = tree.x - 1;//takes the current value of tree.x and subtracts 1 pixel/60 seconds

            if(tree.x < -200) { //creates an if statement making the tree go to the other side of the cnavas once it reaches a certain value
                tree.x = canvasWidth;
            }
            
            
            // TODO 5: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length; i++) { //loop that creates 5 buildings that will have random heights and move slowly to the left
                 buildings[i].x = buildings[i].x - 0.5;
            
                 if(buildings[i].x < -200) { 
                    buildings[i].x = canvasWidth;  //creates an if statement making the buildings go to the other side of the cnavas once it reaches a certain value
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
