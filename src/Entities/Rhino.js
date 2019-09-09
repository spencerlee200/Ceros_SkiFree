import * as Constants from "../Constants";
import { updateLives, gameOver, Difficulty } from "../Core/Scoreboard";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_DEFAULT;

    constructor(x, y) {
        super(x, y);
    }
    
    followSkier(_skier){
      // Rotate the enemy to face the player
      this.rotation = Math.atan2(_skier.y - this.y, _skier.x - this.x);
      this.speed = Constants.SKIER_STARTING_SPEED + (Difficulty - 1);
      
      //Calculate the direction and speed the rhino needs to move in based on angle
      var xIncrease = Math.floor(Math.cos(Math.abs(this.rotation)) * this.speed);
      var yIncrease = Math.floor(Math.sin(Math.abs(this.rotation)) * this.speed); 
      
      //If the rhino is directly above the skier increase the speed so it can catch up
      if(xIncrease <= 1 && xIncrease >= -1){
        yIncrease += 2.3;
      }
      
      //If the skier is above the rhino turn it around
      if(_skier.y < this.y){
        yIncrease = -yIncrease;
      }
      
      //If moving right toggle between the two rhino movement states
      if(xIncrease >= 0){
        var which = (this.direction == Constants.RHINO_DIRECTIONS.RIGHT) ? Constants.RHINO_DIRECTIONS.RIGHT_ALT : Constants.RHINO_DIRECTIONS.RIGHT;
        this.setDirection(which);
      }
      
      //If moving left toggle between the two rhino movement states
      else if(xIncrease <= 0){
        var which = (this.direction == Constants.RHINO_DIRECTIONS.LEFT) ? Constants.RHINO_DIRECTIONS.LEFT_ALT : Constants.RHINO_DIRECTIONS.LEFT;
        this.setDirection(which);
      }
      
      //Don't move the rhino unless the skier is moving as well
      if(_skier.direction != 0){
        this.x += xIncrease;
        this.y += yIncrease;  
      }
    }
    
    setDirection(direction) {
        let self = this;
        //Wait 250ms to update for smooth running animation
        setTimeout(function(){
          self.direction = direction;
          self.updateAsset();
        },250)
    }
    
    updateAsset() {
        this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
    }
    
    checkIfRhinoCaughtSkier(assetManager, skier) {
        let self = this; 
        const asset = assetManager.getAsset(this.assetName);
        
        self.rhino_width = asset.width;
        self.rhino_height = asset.height;
        const rhinoBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
        
        const skierAsset = assetManager.getAsset(skier.assetName);
        const skierBounds = new Rect(
            skier.x - skierAsset.width / 2,
            skier.y - skierAsset.height,    //makes sure the rhino can attack from the back of the asset before overlapping the skier
            skier.x + skierAsset.width / 2,
            skier.y - skierAsset.height / 2 //makes sure the rhino can attack from the front of the asset
        );
    
        const collision = intersectTwoRects(rhinoBounds, skierBounds);
        
        //Once the rhino has caught the skier end the game
        if(collision) {
            gameOver();
        }
    }; 
}