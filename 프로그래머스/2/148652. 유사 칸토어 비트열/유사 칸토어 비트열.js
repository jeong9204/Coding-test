function solution(n, l, r) {
    var answer = 0;

    for (var i = l - 1; i < r; i++) {
        if (check(i)) {
            answer += 1;
        }
    }

    return answer;
}

function check(i) {
    if (i % 5 === 2) {
        return false;
    }
    if (i < 5) {
        return true;
    }

    return check(Math.floor(i / 5));
}
