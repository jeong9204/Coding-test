function solution(n, stations, w) {
    const M = stations.length;
    const func = [];

    let answer = 0, 
        j = 0, 
        ptr = 1;

    const check = (x) => {
        if (M <= j) {
            return [false];
        }

        const t = stations[j];

        if (t-w <= x && x <= t+w) {
            j++;
            return [true, t+w+1];
        }

        return [false];
    }

    while (ptr <= n) {
        const [inRange, next] = check(ptr);

        if (!inRange) {
            ptr = ptr + 2*w + 1;
            answer++;
            continue;
        }

        ptr = next;
    }

    return answer;
}
