import { PredictionPoints } from "./Entities/PredictionPoints";
import { determineOutcome } from "./OutcomeCalulator";
import { PlayerPrediction } from "./Entities/PlayerPrediction";
import { FootballScore } from "./Entities/FootballScore";

export const calculatePredictionPoints = (prediction: PlayerPrediction, result: FootballScore): PredictionPoints => {
    if (!result) {
        return 0;
    }

    if (prediction.homeGoals === result.homeGoals && prediction.awayGoals === result.awayGoals) {
        if (prediction.turtus) {
            return PredictionPoints.DoubleTurtus;
        }
        else {
            return PredictionPoints.CorrectScore;
        }
    }
    else if (prediction.turtus) {
        return PredictionPoints.None;
    }
    else if (determineOutcome(prediction.homeGoals, prediction.awayGoals) === determineOutcome(result.homeGoals, result.awayGoals)) {
        return PredictionPoints.Minstrel;
    }
    else {
        return PredictionPoints.None;
    }
}
