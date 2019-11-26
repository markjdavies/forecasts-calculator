import {expect} from 'chai';
import { Outcome } from '../src/Entities/Outcome';
import {determineOutcome} from '../src/OutcomeCalulator';

const goallessDraw = [0, 0];
const scoreDraw = [1, 1];
const homeWin = [2, 0]
const awayWin = [1, 3];

describe('Outcome calculator', () => {
    it('should recognise a goalless draw', () => {
        const result = determineOutcome.apply(this, goallessDraw);
        expect(result).to.equal(Outcome.Draw);
    });
  
    it('should recognise a score draw', () => {
        const result = determineOutcome.apply(this, scoreDraw);
        expect(result).to.equal(Outcome.Draw);
    });
      
    it('should recognise a home win', () => {
        const result = determineOutcome.apply(this, homeWin);
        expect(result).to.equal(Outcome.HomeWin);
    });
      
    it('should recognise an away win', () => {
        const result = determineOutcome.apply(this, awayWin);
        expect(result).to.equal(Outcome.AwayWin);
    });
  });
  