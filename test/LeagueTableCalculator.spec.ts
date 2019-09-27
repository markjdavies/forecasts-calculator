import {expect} from 'chai';
import { LeagueHistoryEvent } from "../src/Entities/LeagueHistoryEvent";
import { buildTeamRow, buildTeamFormRow, sortLeagueTable, groupByTeam } from '../src/LeagueTableCalulator';

const bigWin: LeagueHistoryEvent = {
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    pointsFor: 13,
    pointsAgainst: 2,
    correctScores: 2,
    turtuses: 1,
    leaguePoints: 3
}

const narrowWin: LeagueHistoryEvent = {
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    pointsFor: 6,
    pointsAgainst: 5,
    correctScores: 1,
    turtuses: 0,
    leaguePoints: 3
}

const draw: LeagueHistoryEvent = {
    played: 1,
    won: 0,
    drawn: 1,
    lost: 0,
    pointsFor: 7,
    pointsAgainst: 7,
    correctScores: 2,
    turtuses: 0,
    leaguePoints: 1
}

const narrowDefeat: LeagueHistoryEvent = {
    played: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    pointsFor: 3,
    pointsAgainst: 8,
    correctScores: 0,
    turtuses: 0,
    leaguePoints: 0
}

const buildMockLeagueRow = (teamId: number, teamName: string, leaguePoints: number, pointsFor: number, correctScores: number, pointsAgainst: number, turtuses: number,
    played?: number, won?: number, drawn?: number, lost?: number) => {
    return {
        teamId,
        teamName,
        leaguePoints,
        pointsFor,
        correctScores,
        pointsAgainst,
        turtuses,
        played,
        won,
        drawn,
        lost
    }
}

describe('LeagueTableCalculator', () => {
    describe('Build team row', () => {
        it('should aggregate totals by team number and name', () => {
            const teamId = 1;
            const teamName = 'teamName';

            const row = buildTeamRow(
                teamId,
                teamName,
                [bigWin, narrowWin, draw, narrowDefeat]
                );

            expect(row.teamId).to.eq(teamId);
            expect(row.teamName).to.equal(teamName);
            expect(row.played).to.equal(4);
            expect(row.won).to.equal(2);
            expect(row.drawn).to.equal(1);
            expect(row.lost).to.equal(1);
            expect(row.pointsFor).to.equal(29);
            expect(row.pointsAgainst).to.equal(22);
            expect(row.correctScores).to.equal(5);
            expect(row.turtuses).to.equal(1);
            expect(row.leaguePoints).to.equal(7);
        })
    })

    describe('Build team form row', () => {
        it('should aggregate last n totals by team number and name', () => {
            const teamId = 1;
            const teamName = 'teamName';

            const row = buildTeamFormRow(
                teamId,
                teamName,
                [bigWin, narrowWin, draw, narrowDefeat],
                3
            );

            expect(row.teamId).to.eq(teamId);
            expect(row.teamName).to.equal(teamName);
            expect(row.played).to.equal(3);
            expect(row.won).to.equal(1);
            expect(row.drawn).to.equal(1);
            expect(row.lost).to.equal(1);
            expect(row.pointsFor).to.equal(16);
            expect(row.pointsAgainst).to.equal(20);
            expect(row.correctScores).to.equal(3);
            expect(row.turtuses).to.equal(0);
            expect(row.leaguePoints).to.equal(4);
        })
    })

    describe('Group by team', () => {
        it('should aggregate a team\'s history rows', () => {
            const rows = groupByTeam([
                buildMockLeagueRow(1, 'Team1', 1, 2, 3, 4, 5, 6, 7, 8, 9),
                buildMockLeagueRow(2, 'Team2', 10, 20, 30, 40, 50, 60, 70, 80, 90),
                buildMockLeagueRow(1, 'Team1', 5, 5, 5, 5, 5, 5, 5, 5, 5),
                buildMockLeagueRow(2, 'Team2', 6, 6, 6, 6, 6, 6, 6, 6, 6)
            ]);

            expect(rows.length).to.equal(2);

            expect(rows[0].teamId).to.equal(1);
            expect(rows[0].teamName).to.equal('Team1');
            expect(rows[0].leaguePoints).to.equal(6);
            expect(rows[0].pointsFor).to.equal(7);
            expect(rows[0].correctScores).to.equal(8);
            expect(rows[0].pointsAgainst).to.equal(9);
            expect(rows[0].turtuses).to.equal(10);
            expect(rows[0].played).to.equal(11);
            expect(rows[0].won).to.equal(12);
            expect(rows[0].drawn).to.equal(13);
            expect(rows[0].lost).to.equal(14);

            expect(rows[1].teamId).to.equal(2);
            expect(rows[1].teamName).to.equal('Team2');
            expect(rows[1].leaguePoints).to.equal(16);
            expect(rows[1].pointsFor).to.equal(26);
            expect(rows[1].correctScores).to.equal(36);
            expect(rows[1].pointsAgainst).to.equal(46);
            expect(rows[1].turtuses).to.equal(56);
            expect(rows[1].played).to.equal(66);
            expect(rows[1].won).to.equal(76);
            expect(rows[1].drawn).to.equal(86);
            expect(rows[1].lost).to.equal(96);
        })
    })

    describe('Sort League Table', () => {

        it('should order by Pts, F, CS, GD, turtus', () => {

            const table = sortLeagueTable([
                buildMockLeagueRow(1, 'Sixth', 10, 65, 8, 2, 2),
                buildMockLeagueRow(2, 'Fifth', 10, 65, 8, 2, 3),
                buildMockLeagueRow(3, 'First', 11, 65, 8, 2, 2),
                buildMockLeagueRow(4, 'Fourth', 10, 65, 8, 1, 2),
                buildMockLeagueRow(5, 'Seventh', 10, 65, 8, 2, 1),
                buildMockLeagueRow(6, 'Third', 10, 65, 9, 2, 2),
                buildMockLeagueRow(7, 'Second', 10, 66, 8, 2, 2),
            ]);

            expect(table[0].teamName).to.equal('First');
            expect(table[1].teamName).to.equal('Second');
            expect(table[2].teamName).to.equal('Third');
            expect(table[3].teamName).to.equal('Fourth');
            expect(table[4].teamName).to.equal('Fifth');
            expect(table[5].teamName).to.equal('Sixth');
            expect(table[6].teamName).to.equal('Seventh');

        })
    })
})
