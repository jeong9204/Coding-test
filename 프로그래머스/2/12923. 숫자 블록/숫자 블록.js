function solution(begin, end) {
    const answer = [];

    for (let i = begin, idx = 0; i <= end; i++) {
        answer[idx++] = getMaxDivisorExceptMe(i);
    }

    return answer;
}

function getMaxDivisorExceptMe(x) {
    if (x === 1) {
        return 0;
    }

    const l = [];

    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) {
            l.push(i);
            if (x / i <= 10000000) {
                return x / i;
            }
        }
    }

    if (l.length !== 0) {
        return l[l.length - 1];
    }

    return 1;
}