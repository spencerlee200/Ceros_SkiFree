import * as Constants from '../../Constants';
import { randomInt } from '../../Core/Utils';
import { Obstacle } from "./Obstacle";
import { Difficulty } from "../../Core/Scoreboard";

const DISTANCE_BETWEEN_OBSTACLES = 50;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;
const MIN_OBSTACLE_CHANCE = 4;

export class ObstacleManager {
    obstacles = [];

    constructor() {
    }

    getObstacles() {
        return this.obstacles;
    }

    drawObstacles(canvas, assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(canvas, assetManager);
        });
    }

    placeInitialObstacles() {
        const numberObstacles = Math.ceil((Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) * (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER));

        const minX = -Constants.GAME_WIDTH / 2;
        const maxX = Constants.GAME_WIDTH / 2;
        const minY = STARTING_OBSTACLE_GAP;
        const maxY = Constants.GAME_HEIGHT / 2;

        for(let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    placeNewObstacle(gameWindow, previousGameWindow) {
        //Used to update the difficulty as the score increases. Caps out at MIN_OBSTACLE_CHANCE for the sake of performance
        var temp_new_obstacle_chance = NEW_OBSTACLE_CHANCE - Difficulty;
        if(temp_new_obstacle_chance > MIN_OBSTACLE_CHANCE){
          var shouldPlaceObstacle = randomInt(1, temp_new_obstacle_chance);
        }
        else {
          var temp_new_obstacle_chance = MIN_OBSTACLE_CHANCE;
          var shouldPlaceObstacle = randomInt(1, MIN_OBSTACLE_CHANCE);
        }
        
        if(shouldPlaceObstacle !== temp_new_obstacle_chance) {
            return;
        }
        
        //Check added to prevent run time error
        if(previousGameWindow != undefined){
          if(gameWindow.left < previousGameWindow.left) {
              this.placeObstacleLeft(gameWindow);
          }
          else if(gameWindow.left > previousGameWindow.left) {
              this.placeObstacleRight(gameWindow);
          }

          if(gameWindow.top < previousGameWindow.top) {
              this.placeObstacleTop(gameWindow);
          }
          else if(gameWindow.top > previousGameWindow.top) {
              this.placeObstacleBottom(gameWindow);
          }
        }

    };

    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
        const newObstacle = new Obstacle(position.x, position.y);

        this.obstacles.push(newObstacle);
    }

    calculateOpenPosition(minX, maxX, minY, maxY) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
            );
        });

        if(foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }
}