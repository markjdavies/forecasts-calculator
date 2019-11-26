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

export const sortLeagueTable = (teamHistories: TeamLeagueHistoryEvent[]): TeamLeagueHistoryEvent[] => {
    return teamHistories
        .sort((team1, team2) => team2.turtuses - team1.turtuses)
        .sort((team1, team2) => team1.pointsAgainst - team2.pointsAgainst)
        .sort((team1, team2) => team2.correctScores - team1.correctScores)
        .sort((team1, team2) => team2.pointsFor - team1.pointsFor)
        .sort((team1, team2) => team2.leaguePoints - team1.leaguePoints);
}

export const groupByTeam = (teamHistories: TeamLeagueHistoryEvent[]): TeamLeagueHistoryEvent[] => {
    return teamHistories.reduce((groupedHistories: TeamLeagueHistoryEvent[], teamHistoryEvent: TeamLeagueHistoryEvent) => {
        const team = groupedHistories.find(t=> t.teamId === teamHistoryEvent.teamId);
        if (team) {
            team.correctScores += teamHistoryEvent.correctScores;
            team.drawn += teamHistoryEvent.drawn;
            team.leaguePoints += teamHistoryEvent.leaguePoints;
            team.lost += teamHistoryEvent.lost;
            team.played += teamHistoryEvent.played;
            team.pointsAgainst += teamHistoryEvent.pointsAgainst;
            team.pointsFor += teamHistoryEvent.pointsFor;
            team.turtuses += teamHistoryEvent.turtuses;
            team.won += teamHistoryEvent.won;
        } else {
            groupedHistories.push(teamHistoryEvent);
        }
        return groupedHistories;
    }, []);

}
