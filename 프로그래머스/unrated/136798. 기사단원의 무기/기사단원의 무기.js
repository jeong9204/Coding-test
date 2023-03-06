function solution(number, limit, power) {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
        let cnt = 0;
        const sqrt = Math.sqrt(i);
        for (let j = 1; j <= sqrt; j++) {
            if (i % j === 0) {
                cnt++;
                if (i / j !== j) {
                    cnt++;
                }
            }
        }
        if (cnt <= limit) {
            sum += cnt;
        } else {
            sum += power;
        }
    }
    return sum;
}