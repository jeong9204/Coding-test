function solution(scores) {
    const wanHo = scores[0];
    // 근무태도점수 내림차순정렬. 근무태도 동점인 경우 동료평가점수 오름차순
    scores.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

    let answer = 1;
    let maxScore = 0;
    const wanHoSum = wanHo[0] + wanHo[1];

    for (const score of scores) {
        // 내 앞에 동료평가점수가 나보다 높은 사람이 한 명이라도 있으면 탈락
        // 근무태도 동점자의 경우 동료평가 오름차순 하였으므로 고려하지 않아도 됨
        if (score[1] < maxScore) {
            // 탈락대상
            if (score.every((value, index) => value === wanHo[index])) {
                return -1;
            }
        } else {
            // 인센대상
            maxScore = Math.max(maxScore, score[1]);
            if (score[0] + score[1] > wanHoSum) {
                answer++;
            }
        }
    }

    return answer;
}
