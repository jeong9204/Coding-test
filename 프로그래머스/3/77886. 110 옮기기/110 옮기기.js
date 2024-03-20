function solution(s) {
    let answer = [];
    for (let i = 0; i < s.length; i++) {
        let ones = "";
        let oneCount = 0;
        let ooz = 0;
        for (let j = 0; j < s[i].length; j++) {
            if (s[i][j] === '1') {
                oneCount++;
            } else {
                if (oneCount >= 2) {
                    ooz++;
                    oneCount -= 2;
                } else {
                    for (let k = 0; k < oneCount; k++) {
                        ones += '1';
                    }
                    ones += '0';
                    oneCount = 0;
                }
            }
        }
        for (let k = 0; k < ooz; k++) {
            ones += '110';
        }
        for (let k = 0; k < oneCount; k++) {
            ones += '1';
        }
        answer.push(ones);
    }
    return answer;
}
