//Contains the function to update the score as well as all the variales tracked on the scoreboard
import * as Constants from "../Constants";

export var Score = 0;
export var Speed = 0;
export var Lives = 5; 
export var Distance = 0;
export var Difficulty = 0;

export function updateScore(_points) {
  //Used to make sure nothing funky getting passed in could cause errors
  if(_points < 0){
    return 0;
  }
  //Used when skier turns left or right, prevents score from updating and displays updated speed
  else if(_points == 0){
    Speed = 0;
    return 1;
  }
  //Used to update the score when player is not travelling is a straight line, prevents score from adding anything < 1 
  else if(_points < Constants.SKIER_STARTING_SPEED && _points > 0){
    Speed = _points;
    Score += 1;
    Difficulty = Math.floor(Math.abs(Score)/1000);
    return 2;
  }
  //Used in all other situations, default update
  else {
    Speed = _points;
    Score += ((_points - Constants.SKIER_STARTING_SPEED) + 1);
    Difficulty = Math.floor(Math.abs(Score)/1000);
    return 3;
  }
}

//updateLives() is used to remove one life on crash, gameOver() is used when the rhino catches the skier
//Both of these updates are immediately caught in the game loop and resolved
export function updateLives() {
  Lives--;
}

export function gameOver() {
  Lives = 0;
}