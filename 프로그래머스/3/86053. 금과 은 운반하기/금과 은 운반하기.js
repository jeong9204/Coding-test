function isPossible(time, a, b, g, s, w, t) {
    const n = g.length;
    let total = 0;
    let totalG = 0;
    let totalS = 0;

    for (let i = 0; i < n; i++) {
        // 해당 시간에 옮길 수 있는 횟수
        let cnt = Math.floor(time / (2 * t[i]));
        if (time % (2 * t[i]) >= t[i]) cnt++;

        // 해당 시간에 옮길 수 있는 무게
        let tmp = Math.min(cnt * w[i], g[i] + s[i]);
        // 각 도시의 총합 최대 무게 누적
        total += tmp;
        // 각 도시의 금 최대 무게 누적
        totalG += Math.min(tmp, g[i]);
        // 각 도시의 은 최대 무게 누적
        totalS += Math.min(tmp, s[i]);
    }

    return total >= a + b && totalG >= a && totalS >= b;
}

function solution(a, b, g, s, w, t) {
    let hi = 400000000000000;
    let lo = 0;

    // 이분 탐색
    while (lo + 1 < hi) {
        let mid = Math.floor((lo + hi) / 2);

        if (isPossible(mid, a, b, g, s, w, t)) hi = mid;
        else lo = mid;
    }
    return hi;
}
