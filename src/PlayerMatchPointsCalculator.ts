import { PlayerPrediction } from "./Entities/PlayerPrediction";
import { FootballScore } from "./Entities/FootballScore";
import { calculatePredictionPoints } from "./PredictionCalculator";
import { PlayerScorecard } from "./Entities/PlayerScorecard";
import { PredictionPoints } from "./Entities/PredictionPoints";

export const CalculatePlayerMatchPoints = (predictions: PlayerPrediction[], results: FootballScore[]): PlayerScorecard => {
    return predictions.reduce((scorecard: PlayerScorecard, prediction: PlayerPrediction) => {
        const predictionPoints = calculatePredictionPoints(prediction, results.find(r => r.matchId === prediction.matchId));
        scorecard.totalScore = scorecard.totalScore + predictionPoints;

        scorecard.correctScores =
            (predictionPoints === PredictionPoints.CorrectScore || predictionPoints === PredictionPoints.DoubleTurtus)
                ? scorecard.correctScores + 1
                : scorecard.correctScores;

        scorecard.turtus =
        (predictionPoints === PredictionPoints.DoubleTurtus)
            ? scorecard.turtus + 1
            : scorecard.turtus;

        return scorecard;
    },
    new PlayerScorecard()
    );
}
