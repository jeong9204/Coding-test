function solution(distance, rocks, n) {
    if (rocks.length === n) return distance;
    rocks.sort((a, b) => a - b);
    const rockCount = rocks.length;

    let l = Math.min(rocks[0], distance - rocks[rockCount - n - 1]); // 적어도 이 이상이어야 함
    let res = l;
    for (let i = 1; i < rockCount - n; i++) l = Math.min(rocks[i] - rocks[i - 1], l);

    // in case of even distribution, remaining rocks = rockCount-n+2
    const remainingRocks = rockCount - n + 2;
    let r = distance % (remainingRocks - 1) === 0 ? Math.floor(distance / (remainingRocks - 1)) : Math.floor(distance / (remainingRocks - 1)) + 1;

    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (possible(m, rocks, rockCount - n, distance)) l = m + 1;
        else r = m - 1;
    }
    return r;
}

function possible(minDist, rocks, count, distance) {
    let prevRock = 0;
    for (let i = 0; i < rocks.length; i++) {
        if (rocks[i] - prevRock >= minDist) {
            count--;
            if (count === 0) {
                if (distance - rocks[i] >= minDist) return true;
                return false;
            }
            prevRock = rocks[i];
        }
    }
    return false;
}
