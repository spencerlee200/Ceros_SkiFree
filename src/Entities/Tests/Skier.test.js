import { Skier } from "../Skier";

describe('Skier', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('setDirection()', () => {
        describe('When the direction is valid', () => {
            [0,1,2,3,4,5].forEach(direction => {
                it('sets the direction and updates the asset', done => {
                    const skier = new Skier(0,0);
    
                    expect(skier.direction).toBe(1);
    
                    skier.updateAsset = jest.fn();
                    skier.setDirection(direction);
    
                    expect(skier.direction).toBe(direction);
                    expect(skier.updateAsset.mock.calls.length).toBe(1);
    
                    done();
                });
            });
        });

        describe('When the direction is invalid', () => {
            [-1,6].forEach(direction => {
                it('does not set the direction', done => {
                    const skier = new Skier(0,0);
    
                    expect(skier.direction).toBe(1);
    
                    skier.updateAsset = jest.fn();
                    skier.setDirection(direction);
    
                    expect(skier.direction).toBe(1);
                    expect(skier.updateAsset.mock.calls.length).toBe(0);
    
                    done();
                });
            });
        });
    });
});
