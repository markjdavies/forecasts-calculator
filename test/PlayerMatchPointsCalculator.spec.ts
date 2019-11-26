import {expect} from 'chai';
import { calculatePlayerMatchPoints } from "../src/PlayerMatchPointsCalculator";

const homeWin20 = { homeGoals: 2, awayGoals: 0 };
const homeWin21 = { homeGoals: 2, awayGoals: 1 };
const awayWin23 = { homeGoals: 2, awayGoals: 3 };
const scoreDraw11 = { homeGoals: 1, awayGoals: 1 };
const noScoreDraw = { homeGoals: 0, awayGoals: 0 };

describe('PlayerMatchPointsCalculator', () => {
    it('should correctly total a scorecard with an achieved turtus', () => {
        const predictions = [
            Object.assign({ turtus: true, matchId: 1 }, homeWin21),
            Object.assign({ turtus: false, matchId: 2 }, awayWin23),
            Object.assign({ turtus: false, matchId: 3 }, scoreDraw11),
            Object.assign({ turtus: false, matchId: 4} , noScoreDraw),
            Object.assign({ turtus: false, matchId: 5 }, noScoreDraw)
        ];

        const results = [
            Object.assign({ matchId: 1 }, homeWin21),
            Object.assign({ matchId: 2 }, awayWin23),
            Object.assign({ matchId: 3 }, scoreDraw11),
            Object.assign({ matchId: 4 }, noScoreDraw),
            Object.assign({ matchId: 5 }, homeWin21)
        ];

        const scorecard = calculatePlayerMatchPoints(predictions, results);
        
        expect(scorecard.totalScore).to.equal(15);
        expect(scorecard.turtus).to.equal(1);
        expect(scorecard.correctScores).to.equal(4);
    })

    it('should correctly total a scorecard with a failed turtus', () => {
        const predictions = [
            Object.assign({ turtus: true, matchId: 1}, homeWin20),
            Object.assign({ turtus: false, matchId: 2}, awayWin23),
            Object.assign({ turtus: false, matchId: 3}, scoreDraw11),
            Object.assign({ turtus: false, matchId: 4}, noScoreDraw),
            Object.assign({ turtus: false, matchId: 5 }, noScoreDraw)
        ];

        const results = [
            Object.assign({ matchId: 1}, homeWin21),
            Object.assign({ matchId: 2}, awayWin23),
            Object.assign({ matchId: 3}, scoreDraw11),
            Object.assign({ matchId: 4}, noScoreDraw),
            Object.assign({ matchId: 5 }, homeWin21)
        ];

        const scorecard = calculatePlayerMatchPoints(predictions, results);
        
        expect(scorecard.totalScore).to.equal(9);
        expect(scorecard.turtus).to.equal(0);
        expect(scorecard.correctScores).to.equal(3);
    })

    it('should correctly total a scorecard with no turtus', () => {
        const predictions = [
            Object.assign({ turtus: false, matchId: 1}, homeWin20),
            Object.assign({ turtus: false, matchId: 2}, awayWin23),
            Object.assign({ turtus: false, matchId: 3}, scoreDraw11),
            Object.assign({ turtus: false, matchId: 4}, noScoreDraw),
            Object.assign({ turtus: false, matchId: 5 }, noScoreDraw)
        ];

        const results = [
            Object.assign({ matchId: 1}, homeWin21),
            Object.assign({ matchId: 2}, awayWin23),
            Object.assign({ matchId: 3}, scoreDraw11),
            Object.assign({ matchId: 4}, noScoreDraw),
            Object.assign({ matchId: 5 }, homeWin21)
        ];

        const scorecard = calculatePlayerMatchPoints(predictions, results);
        
        expect(scorecard.totalScore).to.equal(10);
        expect(scorecard.turtus).to.equal(0);
        expect(scorecard.correctScores).to.equal(3);
    })

})
