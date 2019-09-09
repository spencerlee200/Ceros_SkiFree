import "babel-polyfill";
import * as Scoreboard from "../Scoreboard";

//Scoreboard Tests
describe('updateScore()', () => {
    describe('When _points < 0', () => {
      it('does not do anything and returns', done => {
          expect(Scoreboard.updateScore(-1)).toBe(0);
          done();
      });
    });

    describe('When _points == 0', () => {
      it('updates speed to 0 and returns', done => {
          expect(Scoreboard.updateScore(0)).toBe(1);
          done();
      });
    });

    describe('When _points < starting speed', () => {
      it('updates the score by 1', done => {
          expect(Scoreboard.updateScore(2)).toBe(2);
          done();
      });
    });

    describe('When _points > starting speed', () => {
      it('updates the score by points - start speed + 1', done => {
          expect(Scoreboard.updateScore(500)).toBe(3);
          done();
      });
    });    
});