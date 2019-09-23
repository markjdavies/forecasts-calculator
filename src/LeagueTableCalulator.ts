import { LeagueHistoryEvent } from "./Entities/LeagueHistoryEvent";
import { TeamLeagueHistoryEvent } from "./Entities/TeamLeagueHistoryEvent";

export const buildTeamRow = (teamId: number, teamName: string, events: LeagueHistoryEvent[]): TeamLeagueHistoryEvent => {
    return events.reduce((tableRow: TeamLeagueHistoryEvent, event: LeagueHistoryEvent) => {
            tableRow.played += event.played;
            tableRow.won += event.won;
            tableRow.drawn += event.drawn;
            tableRow.lost += event.lost;
            tableRow.pointsFor += event.pointsFor;
            tableRow.pointsAgainst += event.pointsAgainst;
            tableRow.correctScores += event.correctScores;
            tableRow.turtuses += event.turtuses;
            tableRow.leaguePoints += event.leaguePoints;
            return tableRow;
        },
        {
            teamId,
            teamName,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            correctScores: 0,
            turtuses: 0,
            leaguePoints: 0
        }
    );
}

export const buildTeamFormRow = (teamId: number, teamName: string, events: LeagueHistoryEvent[], formLength: number) => {
    return buildTeamRow(teamId, teamName, events.slice(formLength * -1));
}

export const buildLeagueTable = (teamHistories: TeamLeagueHistoryEvent[]): TeamLeagueHistoryEvent[] => {
    return [];
}

const groupByTeam = (teamHistories: TeamLeagueHistoryEvent[]) => {
    const groupedTeamHistories = teamHistories.reduce((groupedHistories, teamHistoryEvent: TeamLeagueHistoryEvent) => {
        const team = teamHistoryEvent.teamId;
        if (!groupedHistories[team]) {
            groupedHistories[team] = [];
        }
        groupedHistories[team].push(teamHistoryEvent);
        return groupedHistories;
    }, {});

}
