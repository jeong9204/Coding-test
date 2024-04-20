const OFFSET = 10 + 1;
const MIN_TEMP = -10 + OFFSET;
const MAX_TEMP = 40 + OFFSET + Math.floor(1000 / 2);
const INF = Number.POSITIVE_INFINITY;

function solution(temperature, t1, t2, a, b, onboard) {
    const outsideTemp = temperature + OFFSET;
    const passengerMinTemp = t1 + OFFSET;
    const passengerMaxTemp = t2 + OFFSET;
    const changePower = a;
    const keepPower = b;
    const MAX_TIME = onboard.length;
    const dp = new Array(MAX_TIME + 1).fill(null).map(() => new Array(MAX_TEMP + 2).fill(INF));
    dp[0][outsideTemp] = 0;

    for (let currTime = 0; currTime < MAX_TIME; currTime++) {
        const postTime = currTime + 1;
        const insideTempRange = isPassenger(postTime, onboard) ? Array.from({ length: passengerMaxTemp - passengerMinTemp + 1 }, (_, i) => i + passengerMinTemp) : Array.from({ length: MAX_TEMP }, (_, i) => i + 1);
        for (let postInsideTemp of insideTempRange) {
            dp[postTime][postInsideTemp] = Math.min(
                postInsideTemp - 1 < outsideTemp ? dp[currTime][postInsideTemp - 1] : INF,
                postInsideTemp === outsideTemp ? dp[currTime][postInsideTemp] : INF,
                postInsideTemp + 1 > outsideTemp ? dp[currTime][postInsideTemp + 1] : INF,
                dp[currTime][postInsideTemp] + keepPower,
                dp[currTime][postInsideTemp - 1] + changePower,
                dp[currTime][postInsideTemp + 1] + changePower
            );
        }
    }

    return Math.min(...dp[MAX_TIME]);
}

function isPassenger(time, onboard) {
    return onboard[time - 1] === 1;
}
