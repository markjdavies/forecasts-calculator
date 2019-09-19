import { LeagueHistoryEvent } from "./Entities/LeagueHistoryEvent";
import { TeamLeagueHistoryEvent } from "./Entities/TeamLeagueHistoryEvent";

export const buildTeamRow = (teamId: number, teamName: string, events: LeagueHistoryEvent[]) => {
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
        new TeamLeagueHistoryEvent(teamId, teamName)
    );
}

export const buildTeamForm = (teamId: number, teamName: string, events: LeagueHistoryEvent[], formLength: number) => {
    return buildTeamRow(teamId, teamName, events.slice(formLength * -1));
}

export const buildLeagueTable = (teamHistories: TeamLeagueHistoryEvent[]) => {
    const unorderedTeamRows = teamHistories.map(history => {

    })
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
