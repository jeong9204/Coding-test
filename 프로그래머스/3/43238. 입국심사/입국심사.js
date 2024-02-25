function solution(n, times) {
    let min = Math.floor(n / times.reduce((acc, time) => acc + 1 / time, 0));
    let max = Math.max(...times) * Math.ceil(n / times.length);
    while (max > min) {
        const mid = Math.floor((min + max) / 2);
        let left = n;
        for (const time of times) {
            if ((left -= Math.floor(mid / time)) <= 0) break;
        }
        if (left <= 0) max = mid;
        else min = mid + 1;
    }

    return min;
}