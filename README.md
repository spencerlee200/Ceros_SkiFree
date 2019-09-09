# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!

## Update

### Requirements

**Fix a bug:**	

This bug was being caused by an undefined width when moving the skier out of the crash position. I was able to trace that back to the turnLeft function and found out that it was trying to set the direction to -1. This causes an immediate crash. 

**Write unit tests:**

In order to make sure this bug didn't happen again I wrote a simple if check within the setDirection function that checks that the direction entered is actually a valid direction. Then to double check that I wrote a unit test that fires a few numbers (-1 and 0-6) into the function to make sure that the function is working as expected. This test can be found in `Skier.test.js`. This was my first time using Jest for unit testing so this was a great way to start learning something new! You will need to be on a node version > 10 to run these tests. 

**Extend existing functionality:** 

For this section I decided to take the ramp route so that I could mess around with the obstacle generator a bit. Whenever the skier hits the ramp it is considered in the air for ~2 seconds. During this time the skier will only collide with trees and tree clusters. It will soar clean over rocks and other ramps. However, the rhino is still very capable of snatching our poor skier out of the air. The skier also does a pretty cool flip.

**Build something new:**  

This part was a lot of fun for me. In order to have the rhino track the skier I calculated the angle from the rhino to the skier. Once I had that calculated I set the x increase value to the cosine of the absolute value of the rotation then multiplied that by the rhino's speed (whew). Essentially this just results in the value being speed or -speed. The y increase is calculated in the same way just using sine. Outside of that there are functions to update the sprite of the rhino similiar to the direction controls in `skier.js` as well as a function to check if the rhino has caught the skier which ends the game. 

**Documentation:** 

You are looking at it!

**Be original:**

Always!

## Bonus 

I was having a ton of fun making this so I've added quite a few things. The first additional functionality I added was a function that allows the skier to jump up and move out of the way of the obstacle. This just made the gameplay a bit smoother and also helped with my next implementation. 


### Lives

I've also given the player 5 lives at the start of the game. Each time the player crashes they will lose one life. Once they lose all 5 lives or the rhino catches them the game will end. 


### Scoring

Next I added in a score system. Rather than a flat score based on the y value of the skier I figured I'd make something a little more complex. The score increases by the current speed - the starting speed + 1. This will result in the player getting 1 point each time they move until the difficulty goes up. Then they will gain an additional point per 1000 points they have. Each time the player goes off a ramp they also gain an additional 300 points if they land the jump. 

### Scoreboard & additional tests

While playing the game the user can see their current score, speed (in a somewhat arbitrary measurement of meters per second), and number of remaining lives represented in the scoreboard in the top left corner of the screen. I also used this to write some more Jest unit tests to double check the logic in my updateScore function. You can check out those tests in `Scoreboard.test.js`.


### Difficulty 

As mentioned in the Scoring section there is now a difficulty level based on the players score. Every 1000 points the player has results in the difficulty being increased by 1. Every time the difficulty goes up the skiers base speed permanently increases by 1 and the chance of obstacles also goes up by 1. I noticed that their were some performance issues if I just let this increase forever so now there is a max speed of 15 and the maximum chance to spawn an obstacle is 25%. 

### Endframe and restart 

Finally there is an animated endframe with the rhino eating the skier. At the end of this animation a button appears which will allow you to restart the game. The endframe will also give the player their high score which is stored in their browsers local storage so that they can challenge themselves to do better each time they play. My current high score is 9609. Lets see if you can do better!

### Play it live at 


