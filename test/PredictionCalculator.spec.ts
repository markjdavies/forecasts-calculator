import {expect} from 'chai';
import { PredictionPoints } from "../src/Entities/PredictionPoints";
import { PlayerPrediction } from "../src/Entities/PlayerPrediction";
import { FootballScore } from "../src/Entities/FootballScore";
import {calculatePredictionPoints} from '../src/PredictionCalculator';

const goallessDrawResult = {
    matchId: 0,
    homeGoals: 0,
    awayGoals: 0
};

const predictCorrectScore = (home: number, away: number, turtus: boolean) => {
    const score = {
        matchId: 0,
        homeGoals: home,
        awayGoals: away
    };
    return {
        prediction: Object.assign({}, score, {
            turtus
        }),
        result: Object.assign({}, score)
    }
};

const predictCorrectOutcome = (home: number, away: number, turtus: boolean) => {

    const match = predictCorrectScore(home, away, turtus);

    match.prediction.homeGoals += 1;
    match.prediction.awayGoals += 1;
    
    return match;
};

const predictIncorrectResult = (home: number, away: number, turtus: boolean) => {
    
    const match = predictCorrectScore(home, away, turtus);
    
    match.prediction.homeGoals += 2;
    match.prediction.awayGoals += 1;
    
    return match;
};

describe('Prediction calculator', () => {
    describe('when a match is drawn', () => {

        const score = [0, 0, false];

        it('should reward a correct prediction', () => {
            const match = predictCorrectScore.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.CorrectScore);
        });
        
        it('should award double points for a correct prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectScore.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.DoubleTurtus);
        });

        it('should award a minstrel for a correct outcome', () => {
            const match = predictCorrectOutcome.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.Minstrel);
        });
        
        it('should award nothing for a correct outcome with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectOutcome.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


        it('should award nothing for an incorrect prediction', () => {
            const match = predictIncorrectResult.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });
        
        it('should award nothing for an incorrect prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictIncorrectResult.apply(this, turtusScore);
            
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


    });
    
    describe('when a there is a home win', () => {

        const score = [1, 0, false];

        it('should reward a correct prediction', () => {
            const match = predictCorrectScore.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.CorrectScore);
        });
        
        it('should award double points for a correct prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectScore.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.DoubleTurtus);
        });

        it('should award a minstrel for a correct outcome', () => {
            const match = predictCorrectOutcome.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.Minstrel);
        });
        
        it('should award nothing for a correct outcome with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectOutcome.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


        it('should award nothing for an incorrect prediction', () => {
            const match = predictCorrectOutcome.apply(this, score);
            match.prediction.homeGoals = 0;
            
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });
        
        it('should award nothing for an incorrect prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictIncorrectResult.apply(this, turtusScore);
            
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


    });

    describe('when there is an away win', () => {

        const score = [2, 3, false];

        it('should reward a correct prediction', () => {
            const match = predictCorrectScore.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.CorrectScore);
        });
        
        it('should award double points for a correct prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectScore.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.DoubleTurtus);
        });

        it('should award a minstrel for a correct outcome', () => {
            const match = predictCorrectOutcome.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.Minstrel);
        });
        
        it('should award nothing for a correct outcome with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictCorrectOutcome.apply(this, turtusScore);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


        it('should award nothing for an incorrect prediction', () => {
            const match = predictIncorrectResult.apply(this, score);
    
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });
        
        it('should award nothing for an incorrect prediction with turtus', () => {
            const turtusScore = score.slice();
            turtusScore[2] = true;

            const match = predictIncorrectResult.apply(this, turtusScore);
            
            const points = calculatePredictionPoints(match.prediction, match.result);
            expect(points).to.equal(PredictionPoints.None);
        });


    });

  });
  