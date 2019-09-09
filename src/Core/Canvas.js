import * as Constants from "../Constants";
import * as Scoreboard from "./Scoreboard";

export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = "skiCanvas";
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        document.body.appendChild(canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
        
        //Draw and update scoreboard score + speed
        this.ctx.font = '30px VT323';
        this.ctx.fillText("Score: " + Scoreboard.Score, 15, 90);
        this.ctx.fillText("Speed: " + Scoreboard.Speed + "m/s", 15, 120);
    }
    
    drawLives(AssetManager){
      //Draw and update scoreboard number of lives
      this.ctx.font = '24px VT323';
      for(var i = 0; i < Scoreboard.Lives; i++){
        this.heart = AssetManager.getAsset("heart");
        this.ctx.drawImage(this.heart, (40*i) + 20, 25, (this.heart.width * 2), (this.heart.height * 2));
      }
    }
    
    drawEndFrame(AssetManager){
      //Initial state of endframe on first draw
      let self = this;
  
      //Find the center of the canvas to draw text
      this.centerX = (this.width / 2);
      this.centerY = (this.height / 2);
      
      //Set the fonts alignment to be centered
      this.ctx.textAlign = "center";
      
      //Draw initial scoreboard text
      this.ctx.font = '100px VT323';
      this.ctx.fillText("Game Over", self.centerX, 250);
    
      this.ctx.font = '24px VT323';
      this.ctx.fillText("Final Score: " + Scoreboard.Score, this.centerX, 290);
      
      //Check if the current score is higher than the score in storage and updates if true
      if(Scoreboard.Score > localStorage.getItem('highscore')){
        localStorage.setItem('highscore', Scoreboard.Score);
      }
      
      //Draw updated highscore
      self.ctx.fillText("High Score: " + localStorage.getItem('highscore'), self.centerX, 320); 
      
      //Set up rhino to be animated
      self.rhino = AssetManager.getAsset("rhino_eat_1");
      this.ctx.drawImage(self.rhino, (this.centerX - self.rhino.width), this.centerY, (self.rhino.width * 2), (self.rhino.height * 2));  
      self.frames = 10;
      self.currentFrame = 1;
      
      //While currentFrame < # of frames update the rhino to the next sprite
      var frameTimer = window.setInterval(function(){
        self.currentFrame++;
        
        //Once the animation is finished add restart button and clear interval
        if(self.currentFrame == self.frames){
          clearInterval(frameTimer);
          var btn = document.createElement('div');
          btn.id = "Restart";
          btn.innerHTML = 'Play Again'; 
          
          btn.addEventListener('click', function (e) {
          	e.preventDefault();
            var event = new CustomEvent('Restart');
            document.dispatchEvent(event);
          }, false);
          
          document.body.appendChild(btn);
        }
        
        else {
          //Update and redraw endframe
          self.rhino = AssetManager.getAsset("rhino_eat_" + self.currentFrame);
          self.clearCanvas();
          self.ctx.textAlign = "center";
          self.ctx.font = '100px VT323';
          self.ctx.fillText("Game Over", self.centerX, 250);
          self.ctx.font = '24px VT323';
          self.ctx.fillText("Final Score: " + Scoreboard.Score, self.centerX, 290); 
          self.ctx.fillText("High Score: " + localStorage.getItem('highscore'), self.centerX, 320); 
          self.ctx.drawImage(self.rhino, (self.centerX - self.rhino.width), self.centerY, (self.rhino.width * 2), (self.rhino.height * 2));
        }
      }, 300); 
    }
}