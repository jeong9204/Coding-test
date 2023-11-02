function solution(n) {
    const answer = Array(n).fill().map((_, i) => Array(i + 1).fill(0));
    const size = n * (n + 1) / 2;
    let [i, j, count] = [0, 0, 1];
    while (count <= size) {
        while (i < n && !answer[i][j]) {
            answer[i++][j] = count++;
        }
        i--, j++;
        while (j < n && !answer[i][j]) {
            answer[i][j++] = count++;
        }
        i--, j -= 2;
        while (i > 0 && j > 0 && !answer[i][j]) {
            answer[i--][j--] = count++;
        }
        i += 2, j++;
    }
    return answer.flat();
}

// function solution(n) {
//     /*
//     n = 4 일 때 다음 배열을 먼저 생성
//     [
//         [0],
//         [0, 0],
//         [0, 0, 0],
//         [0, 0, 0, 0],
//     ]
//     */
//     const answer = Array(n).fill().map((_, i) => Array(i + 1).fill(0));
//     // n = 4 => 1+2+3+4 = 10
//     const size = n * (n + 1) / 2;
//     // 초기값 설정
//     // i: 0, j: 0, count: 1
//     let [i, j, count] = [0, 0, 1];
//     // 배열을 모두 채울 때 까지 반복
//     while (count <= size) {
//         // 세로 채우기
//         while (i < n && !answer[i][j]) {
//             answer[i++][j] = count++;
//         }
//         // i === n 이 되면 위 반복문을 탈출하기 때문에 -1을 해서 배열길이-1 상태로 만듦
//         // j++ -> 오른쪽으로 이동
//         i--, j++;
//         // 가로 채우기
//         while (j < n && !answer[i][j]) {
//             answer[i][j++] = count++;
//         }
//         // i-- -> 위로 이동
//         // j === n 이 되면 위 반복문을 탈출, answer[i-1]은 answer[i]보다 길이가 1 짧기 때문에 -2를 적용
//         i--, j -= 2;
//         // i, j 모두 1씩 감소하며 좌 상단으로 이동하며 값을 채운다
//         while (i > 0 && j > 0 && !answer[i][j]) {
//             answer[i--][j--] = count++;
//         }
//         // 좌 상단으로 이동했기 때문에 다음 채울 칸은 i+2, j+1이다
//         i += 2, j++;
//     }
//     // 2차원 배열 -> 1차원 배열
//     return answer.flat();
// }