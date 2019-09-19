import { Outcome } from "./Entities/Outcome";

export const determineOutcome = (home: number, away: number): Outcome => {
    if (home == away) {
        return Outcome.Draw;
    }
    else if (home > away) {
        return Outcome.HomeWin;
    }
    else if (away > home) {
        return Outcome.HomeWin;
    }
    throw Error(`Could not determine outcome of ${home} v ${away}`);
}
