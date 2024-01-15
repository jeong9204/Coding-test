function solution(n) {
    let answer = 0;
    const intArray = new Array(n).fill(0); // y좌표 : index, x좌표 : value
    backTracking(intArray, 0, n);

    return answer;

    // BackTracking DFS
    function backTracking(intArray, currIndex, n) {
        // 끝까지 값을 넣는 데 성공했다면 찾은 것
        if (currIndex >= n) {
            answer++;
            return;
        }

        for (let i = 0; i < n; i++) {
            intArray[currIndex] = i;

            // BackTracking 조건
            if (isCheck(intArray, currIndex)) {
                backTracking(intArray, currIndex + 1, n);
            }
        }
    }

    // 주어진 조건에 따라 0 ~ currIndex - 1의 값을 currIndex값과 비교하는 메서드
    function isCheck(intArray, currIndex) {
        for (let i = 0; i < currIndex; i++) {
            // y축 확인 ( 같은 값이 있다면 같은 y축 좌표에 있는 것 )
            if (intArray[i] == intArray[currIndex]) {
                return false;
            }

            // 대각선 확인 ( |x축 증가량| == |y축 증가량| )
            if (Math.abs(i - currIndex) === Math.abs(intArray[i] - intArray[currIndex])) {
                return false;
            }
        }

        return true;
    }
}