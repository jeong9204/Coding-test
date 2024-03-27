function solution(n, cores) {
    if (n <= cores.length) return n; // 처리할 작업이 코어의 개수보다 적으면 그냥 작업을 처리할 수 있는 코어 수 반환

    let left = 0; // 이진 탐색의 시작점
    let right = 20000 * 10000; // 최악의 경우: 20000개의 코어에 각각 10000개의 작업을 분배한 경우
    let answer = 0;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2); // 중간 값
        let cnt = cores.length; // 현재까지 작업 처리한 코어의 수

        for (let core of cores) {
            cnt += Math.floor(mid / core); // 각 코어가 mid 시간동안 처리할 수 있는 작업 수를 더함
        }

        if (cnt >= n) {
            answer = mid;
            right = mid - 1; // 작업이 더 분배될 수 있으므로 시간을 줄여서 더 작은 값을 찾음
        } else {
            left = mid + 1; // 작업을 모두 분배하지 못했으므로 시간을 늘려서 더 큰 값을 찾음
        }
    }

    let totalCnt = cores.length;
    for (let core of cores) {
        totalCnt += Math.floor((answer - 1) / core); // 마지막 작업을 처리한 후 코어의 수 계산
    }

    for (let i = 0; i < cores.length; i++) {
        if (answer % cores[i] === 0) totalCnt++; // 마지막 작업을 처리한 후 추가적으로 작업을 처리할 수 있는 코어 수 계산
        if (totalCnt >= n) return i + 1; // 작업을 처리할 수 있는 코어의 인덱스 반환
    }
}
