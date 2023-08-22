function solution(myString, pat) {
    var answer = 0;
    for (let i=0; i<myString.length; i++) {
        const str = myString.slice(i, i + pat.length);

        if (str.length !== pat.length) break;
        if (str === pat) answer += 1;
    }
    return answer;
}