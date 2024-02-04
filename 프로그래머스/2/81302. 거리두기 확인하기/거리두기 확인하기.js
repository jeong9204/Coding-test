function solution(places) {
    const answer = [];

    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];

    for (const place of places) {
        const newPlace = [];
        const checker = Array.from({ length: 5 }, () => Array(5).fill(0));

        for (let i = 0; i < 5; i++) {
            newPlace.push(place[i].split(''));
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (newPlace[i][j] === 'P') {
                    checker[i][j] -= 1;

                    for (let k = 0; k < 4; k++) {
                        const nx = i + dx[k];
                        const ny = j + dy[k];

                        if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
                            checker[i + dx[k]][j + dy[k]] -= 1;
                        }
                    }
                } else if (newPlace[i][j] === 'X') {
                    checker[i][j] = 100;
                }
            }
        }

        let flag = true;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (checker[i][j] <= -2) {
                    flag = false;
                }
            }
        }

        answer.push(flag ? 1 : 0);
    }

    return answer;
}
