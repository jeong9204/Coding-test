function solution(babbling) {
    let answer = 0;
    let arr = ["aya", "ye", "woo", "ma"];
    for(let a of babbling) {
        let possibleWord = 0;
        for(let b of arr) {
            if(a.indexOf(b) !== -1) possibleWord += b.length;
        }
        if(possibleWord === a.length) answer++;
    }
    return answer;
}