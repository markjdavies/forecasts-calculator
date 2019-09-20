import { PredictionPoints } from './Entities/PredictionPoints';

export const calculateLuckyTeamPoints = (luckyTeamGoals: number, predictionOutcome: PredictionPoints, turtus: boolean) => {
    return luckyTeamGoals * getTurtusFactor(predictionOutcome, turtus);
}

const getTurtusFactor = (predictionOutcome: PredictionPoints, turtus: boolean): number => {
    if (!turtus) {
        return 1;
    }
    return predictionOutcome === PredictionPoints.DoubleTurtus ? 2 : 0;
}
