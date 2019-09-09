import * as Constants from "../Constants";
import { updateScore, updateLives, updateDistance, Distance, Difficulty } from "../Core/Scoreboard";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_LEFT;
    direction = Constants.SKIER_DIRECTIONS.LEFT;
    speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        if (Object.values(Constants.SKIER_DIRECTIONS).indexOf(direction) > -1) {
           this.direction = direction;
           this.updateAsset();
           return 0;
        }
        else {
           return 1;
        }
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        //Increase speed with the score based difficulty from the scoreboard up to a max of SKIER_MAX_SPEED
        this.speed = Constants.SKIER_STARTING_SPEED + Difficulty < Constants.SKIER_MAX_SPEED ? Constants.SKIER_STARTING_SPEED + Difficulty : Constants.SKIER_MAX_SPEED;
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                return "leftDown";
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                return "down"
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                return "rightDown"
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        //Update score and speed with calculated reduced speed
        updateScore(Math.floor(this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER));
    }

    moveSkierDown() {
        this.y += this.speed;
        updateScore(this.speed);
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        //Update score and speed with calculated reduced speed
        updateScore(Math.floor(this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER));
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            //Update speed
            updateScore(0);
            this.moveSkierLeft();
        }
        else if(this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierOutOfObstacle();
        }
        else {
            this.setDirection(this.direction - 1);
            //Update speed
            updateScore(0);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            //Update speed
            updateScore(0);
            this.moveSkierRight();
        }
        else if(this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierOutOfObstacle();
        }
        else {
            this.setDirection(this.direction + 1);
            //Update speed
            updateScore(0);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        if(this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
            this.moveSkierOutOfObstacle();
        }
        else {
          this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }
    
    //New function added to move the skier out of an obstacle in one click 
    moveSkierOutOfObstacle() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT){
          this.x -= (Constants.SKIER_STARTING_SPEED + this.skier_width + this.lastObstacleHit.width);
        }
        else if(this.direction === Constants.SKIER_DIRECTIONS.DOWN){
          this.y += (Constants.SKIER_STARTING_SPEED + this.skier_height + this.lastObstacleHit.height);
        }
        else if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT){
          this.x += (Constants.SKIER_STARTING_SPEED + this.skier_width + this.lastObstacleHit.width);
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        let self = this; 
        const asset = assetManager.getAsset(this.assetName);
        self.skier_width = asset.width;
        self.skier_height = asset.height;
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
        
        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
        
            //Variable used to store the last obstacle the skier collided with 
            self.lastObstacleHit = obstacleAsset;
        
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
        
            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        
        if(collision) {
            if(self.air){
              //If a tree is hit while in the air it will still cause a collision
              if(self.lastObstacleHit.id == "tree" || self.lastObstacleHit.id == "treeCluster"){
                clearInterval(self.frameTimer);
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
                updateLives();
                self.air = false;
              }
            }
            //Otherwise the collision will be evaluated to see if a ramp was hit or a proper obstacle 
            else {
              if(self.lastObstacleHit.id == "ramp"){
                var canJump = true;
                if(canJump) {
                  //Set timeout to make sure that jump is only called once per collision
                  window.setTimeout(function(){
                    canJump = false
                  }, 200);
                  this.jump();
                }
              }
              else {
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
                updateLives();
              }
            }
        }
    };
    
    jump() {
        let self = this;
        //Variable is set to true for the duration of time the skier is in the air
        self.air = true;
        self.speed = self.speed + 2;
        self.currentFrame = 0;
        self.frames = 7;
    
        //Used to quickly animate between the jump frames while in the air
        self.frameTimer = window.setInterval(function(){
          self.currentFrame++;
    
          if(self.currentFrame == self.frames){
            clearInterval(self.frameTimer);
            //Increase score by the RAMP_BONUS each time a player hits a ramp
            updateScore(Constants.RAMP_BONUS);
            self.assetName = "skierDown";
            self.air = false;
            self.speed = self.speed + self.difficulty;
            self.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
          }
          else {
            self.assetName = "skier_jump_" + self.currentFrame;
          }
        }, 300);                                    
    }
}