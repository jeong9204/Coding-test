function solution(s1, s2) {
    var answer = 0;
    for(let i=0; i<s1.length; i++) {
        if(s2.find(el => el === s1[i]) !== undefined) {
            answer += 1
        }
    }
    return answer;
}