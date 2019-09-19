import { LeagueHistoryEvent } from "./LeagueHistoryEvent";

export class TeamLeagueHistoryEvent extends LeagueHistoryEvent {
    teamId: number;
    teamName: string;

    constructor(teamId: number, teamName: string) {
        super();
        this.teamId = teamId;
        this.teamName = teamName;
    }
}
