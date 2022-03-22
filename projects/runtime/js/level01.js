var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 50},
                { "type": "sawblade", "x": 800, "y": groundY - 50},
                { "type": "sawblade", "x": 950, "y": groundY - 50},

                { "type": "enemy", "x": 300, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 950, "y": groundY - 50},

                { "type": "reward", "x": 600, "y": groundY - 50},
                { "type": "reward", "x": 900, "y": groundY - 50},
                { "type": "reward", "x": 1000, "y": groundY - 50},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

    
        function createSawBlade(x, y){ //this function creates sawblades in the game
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 10; //how much damage the objext inflicts
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the obstacle
            sawBladeHitZone.x = x; //x value of the hitzone
            sawBladeHitZone.y = y; //y vaulue of the hitzone
            game.addGameItem(sawBladeHitZone);  //adds the hitzone to the game 
            
            var obstacleImage = draw.bitmap('img/sawblade.png'); //draws the image and stores it in the variable obstacleImage
            sawBladeHitZone.addChild(obstacleImage);  //adds the image to the hitzone so we can see it 
            obstacleImage.x = -25 //lines up the x of the image with the hitzone
            obstacleImage.y = -25 //lines up the y of the image with the hitzone
            sawBladeHitZone.rotationalVelocity = 10; //rotates the sawblade 10 pixels 
        }

        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25); //creates the enemy game item and stores it in the varibale enemy
            var redSquare = draw.bitmap("img/bat.png"); //draws a bat and stores it in varibale redSquare 
            redSquare.x = -118; //align square x position 
            redSquare.y = -65; //align square y position 
            enemy.addChild(redSquare);
            enemy.scaleX = 0.5 //changes the x scale of the enemy
            enemy.scaleY = 0.5; //changes the y scale of the enemy 

            enemy.x = x; //determines x position of the enemy
            enemy.y = y; //changes the y position of the enemy minus 50 pixels of groundY
            game.addGameItem(enemy); //adds enemy to the game 
            enemy.velocityX = -1; //move the enemy one pixel to the left
            enemy.rotationalVelocity = 0; //rotate the enemy image 0 pixels 

            //this function dectects if the enemy collides with hallie and executes health decrease
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-50) //decreases your health
                console.log('The enemy has hit Halle');
            };

            //this function detects if the projectile collides with the enemy and it will increase the score 
            enemy.onProjectileCollision = function(){
                game.increaseScore(10); //increases game score by 10 whenever enemy is shot
                enemy.shrink(); //enemy shrinks after being shot 
            };
        }
        function createReward (x,y){ //this function creates rewards that are used in the game
            var reward = game.createGameItem('reward',70); //creates the reward game item and stores it in the varibale reward
            var blueSquare = draw.bitmap('img/star.png'); //draws a red square and stores it in varibale blueSquare 
            blueSquare.x = -130; //align square x position 
            blueSquare.y = -130; //align square y position 
            reward.addChild(blueSquare);
            reward.scaleX = 0.2
            reward.scaleY = 0.2

            reward.x = x; //determines x position of the reward
            reward.y = y; //changes the y position of the reward minus 50 pixels of groundY
            game.addGameItem(reward); //adds reward to the game 
            reward.velocityX = -1; //move the reward one pixel to the left
            reward.rotationalVelocity = 0; //rotate the reward image 0 pixels 

            //this function dectects if the reward collides with hallie and executes health increase
            reward.onPlayerCollision = function() {
                game.changeIntegrity(30) //increases your health
                console.log('The reward has hit Halle'); //prints this statement to the console whenever Halle collides with the reward
            };

            //this function detects if the projectile collides with the reward and it will increase the score 
            reward.onProjectileCollision = function(){
                game.increaseScore(10); //increases game score
                reward.shrink(); //makes the reward shrink whenever shot
            };
        };      

            for(var i = 0; i < levelData.gameItems.length; i++){
               var gameItem = levelData.gameItems[i];

               if (gameItem.type === "sawblade"){ //detects if sawblade was called
                   createSawBlade(gameItem.x, gameItem.y) //creates sawblades whenever that gameItem.type is used
               }
               if (gameItem.type === "enemy"){ //detects if enemy was called
                   createEnemy(gameItem.x, gameItem.y) //creates enemies whenever that gameItem.type is used
               }
               if (gameItem.type === "reward"){ //detects if reward was called
                   createReward(gameItem.x, gameItem.y) //creates reward whenever that gameItem.type is used
                }
            }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
    }
        
