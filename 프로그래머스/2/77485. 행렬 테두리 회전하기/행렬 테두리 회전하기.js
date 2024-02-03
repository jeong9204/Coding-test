function solution(rows, columns, queries) {
    const answer = [];
    const R = Array.from({ length: rows }, (_, i) => Array.from({ length: columns }, (_, j) => (i * columns) + (j + 1)));

    for (const i of queries) {
        const vt2 = R[i[0] - 1][i[3] - 1];
        const vt4 = R[i[2] - 1][i[1] - 1];
        let min = Math.min(vt2, vt4);

        let count = 0;
        while (count < i[3] - i[1]) {
            min = Math.min(min, R[i[0] - 1][i[3] - 1 - (count + 1)], R[i[2] - 1][i[1] + count]);

            R[i[0] - 1][i[3] - 1 - count] = R[i[0] - 1][i[3] - 1 - (count + 1)];
            R[i[2] - 1][i[1] - 1 + count] = R[i[2] - 1][i[1] + count];
            count++;
        }

        count = 0;
        while (count < i[2] - i[0]) {
            min = Math.min(min, R[i[0] - 1 + count + 1][i[1] - 1], R[i[2] - 1 - (count + 1)][i[3] - 1]);

            R[i[0] - 1 + count][i[1] - 1] = R[i[0] - 1 + count + 1][i[1] - 1];
            R[i[2] - 1 - count][i[3] - 1] = R[i[2] - 1 - (count + 1)][i[3] - 1];
            count++;
        }

        R[i[0]][i[3] - 1] = vt2;
        R[i[2] - 2][i[1] - 1] = vt4;
        answer.push(min);
    }

    return answer;
}