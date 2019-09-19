export const CalculateLuckyTeamPoints = (luckyTeamGoals: number, turtus: boolean) => {
    const turtusFactor = turtus ? 2 : 1;
    return luckyTeamGoals * turtusFactor;
}
