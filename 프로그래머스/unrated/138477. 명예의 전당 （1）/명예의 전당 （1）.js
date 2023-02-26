function solution(k, score) {
    const result = score.reduce((result, score) => {
        result.honors.push(score)
        if (result.honors.length > k) {
            result.honors = result.honors.sort((a, b) => b - a)
            result.honors.pop()
        }
        result.losers.push(Math.min(...result.honors))
        return result
    }, { honors: [], losers: [] })

    return result.losers
}