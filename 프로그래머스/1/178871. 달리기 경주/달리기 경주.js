function solution(players, callings) {
    const keyPlayers = {}
    const keyRanks = {}
    players.forEach((player,idx)=>{
        const rank = idx+1
        keyPlayers[player] = rank
        keyRanks[rank] = player
    })

    callings.forEach((calling)=>{
        const losePlayer = keyRanks[keyPlayers[calling]-1]

        keyRanks[keyPlayers[calling]] = losePlayer
        keyRanks[keyPlayers[losePlayer]] = calling
        keyPlayers[calling] -= 1
        keyPlayers[losePlayer] += 1
    })


    return Object.values(keyRanks)
}