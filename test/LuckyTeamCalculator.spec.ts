import {expect} from 'chai';
import { calculateLuckyTeamPoints } from '../src/LuckyTeamCalculator';
import { PredictionPoints } from '../src/Entities/PredictionPoints';

describe('LuckyTeamCalculator', () => {
    it('should award points for goals scored by a lucky team in an otherwise incorrect prediction', () => {
        const goals = 2;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.None, false);
        expect(points).to.equal(goals);
    })

    it('should award points for goals scored by a lucky team with a correctly predicted outcome', () => {
        const goals = 1;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.Minstrel, false);
        expect(points).to.equal(goals);
    })

    it('should award points for goals scored by a lucky team with a correctly predicted score', () => {
        const goals = 3;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.DoubleTurtus, false);
        expect(points).to.equal(goals);
    })

    it('should award zero points for goals scored by a lucky team in incorrect prediction with a turtus on it', () => {
        const goals = 2;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.None, true);
        expect(points).to.equal(0);
    })

    it('should award points for goals scored by a lucky team with a correctly predicted outcome with a turtus on it', () => {
        const goals = 1;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.Minstrel, true);
        expect(points).to.equal(0);
    })

    it('should award double points for goals scored by a lucky team with a correctly predicted score with a turtus on it', () => {
        const goals = 3;
        const points = calculateLuckyTeamPoints(goals, PredictionPoints.DoubleTurtus, true);
        expect(points).to.equal(goals * 2);
    })
})
