function solution(cookie) {
    let answer = 0;
    const left = new Array(cookie.length + 1).fill(0); // 왼쪽 기준 누적합 배열 (시작은 0)
    const right = new Array(cookie.length + 1).fill(0); // 오른쪽 기준 누적합 배열 (끝은 0)

    // 누적합 배열 값 세팅
    for (let i = 1; i <= cookie.length; i++) {
        left[i] = cookie[i - 1] + left[i - 1];
        right[cookie.length - i] = cookie[cookie.length - i] + right[cookie.length - i + 1];
    }

    // 경계에 따라 나올 수 있는 경우의 수를 비교
    for (let i = 1; i < cookie.length; i++) {
        // 경계에서부터 해당 방향으로의 전체 누적합
        const leftTotal = left[i];
        const rightTotal = right[i];
        
        // 각 방향에 따른 잘라낼 범위
        let leftIndex = 0;
        let rightIndex = right.length - 1;

        while (true) {
            // 경계를 벗어남 (탈출조건)
            if (leftIndex > i || rightIndex < i)
                break;
            
            // 현재누적합 = 방향전체누적합 - 잘라낼범위누적합
            const currLeft = leftTotal - left[leftIndex];
            const currRight = rightTotal - right[rightIndex];

            // 조건에 맞는 경우를 찾음
            if (currLeft === currRight) {
                answer = Math.max(answer, currLeft);
                break; // 더 탐색해서 값을 찾아도 더 작을 것
            }
            
            // 더 큰 쪽의 끝을 잘라냄
            if (currLeft < currRight)
                rightIndex--;
            else // currLeft > currRight
                leftIndex++;
        }
    }

    return answer;
}
