function solution(s) {
    const notNew = [];
    const answer = [];

    for(let i = 0; i < s.length; i++){
        let count = 0;

        if(!notNew.includes(s[i])){
            notNew.push(s[i]);
            answer.push(-1);
            continue;
        }

        for(let j = i - 1; j >= 0; j--){
            count++;
            if(s[i] == s[j]) {
                answer.push(count);
                break;
            }
        }
    }

    return answer;
}