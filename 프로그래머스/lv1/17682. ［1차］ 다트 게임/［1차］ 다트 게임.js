function solution(dartResult) {
    // * 해당, 직전 점수 2배, 중첩가능
    // # 해당점수는 마이너스
    var answer = 0;
    var semiScore = [0, 0, 0]
    var semiBonus = [1, 1, 1]
    var semiOption = [1, 1, 1]
    var roundScore = [0, 0, 0]

    for (let i = 0; i < 3; i++) {
        // 숫자 거르기
        semiScore[i] = parseInt(dartResult)
        dartResult = dartResult.slice(String(semiScore[i]).length)

        // 보너스 거르기
        if (dartResult[0] == 'S' || dartResult[0] == 'D' || dartResult[0] == 'T') {
            switch (dartResult[0]) {
                case 'S':
                    semiBonus[i] = 1; break;
                case 'D':
                    semiBonus[i] = 2; break;
                case 'T':
                    semiBonus[i] = 3; break;
            }
            dartResult = dartResult.slice(1)
        }

        // 옵션 거르기
        if (dartResult[0] == '*' || dartResult[0] == '#') {
            switch (dartResult[0]) {
                case '*':
                    semiOption[i] = 2; break;
                case '#':
                    semiOption[i] = -1; break;
            }
            dartResult = dartResult.slice(1)
        }
    }

    // 보너스 및 옵션 반영 점수 계산
    for (let i = 0; i < 3; i++) {
        roundScore[i] = semiScore[i] ** semiBonus[i];
        roundScore[i] = roundScore[i] * semiOption[i];
        if (i > 0 && semiOption[i] == 2) {
            roundScore[i - 1] = roundScore[i - 1] * semiOption[i];
        }
    }

    // 점수 최종 합산
    answer = roundScore.reduce((acc, score) => { return acc + score }, 0)
    return answer;
}