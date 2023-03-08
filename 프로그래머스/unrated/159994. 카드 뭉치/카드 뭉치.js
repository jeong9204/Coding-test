function solution(cards1, cards2, goal) {
    var answer = 'Yes';
    const c1 = goal.filter(c => cards1.includes(c))
    const c2 = goal.filter(c => cards2.includes(c))
    c1.forEach((c, i) => { if (c != cards1[i]) { answer = "No"; } })
    c2.forEach((c, i) => { if (c != cards2[i]) { answer = "No"; } })
    return answer;
}