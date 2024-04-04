function count(timeTable, start, end) {
    const [startVal, endVal] = [start.getTime(), end.getTime()];
    let result = 0;
    for (const dealTime of timeTable) {
        const dealStart = dealTime[0].getTime();
        const dealEnd = dealTime[1].getTime();
        if (dealEnd < startVal || endVal < dealStart) continue;
        result++;
    }
    return result;
}
function solution(lines) {
    const timeTable = lines.map((row) => {
        const [date, time, period] = row.split(" ");
        const [s, ms] = time.split(".");
        let [deals, dealms] = period.slice(0, period.length - 1).split(".");
        const end = new Date(`${date} ${s}`);
        end.setMilliseconds(ms);
        const start = new Date(end);
        start.setSeconds(start.getSeconds() - Number(deals));
        if (dealms) {
            if (dealms.length < 3) dealms = dealms + '0'.repeat(3 - dealms.length);
            start.setMilliseconds(start.getMilliseconds() - Number(dealms) + 1);
        } else {
            start.setMilliseconds(1);
        }
        return [start, end];
    });

    let index = 0;
    let result = [];
    while (index < timeTable.length) {
        const [start, end] = timeTable[index];
        const [startend, endend] = [new Date(start), new Date(end)];
        startend.setSeconds(startend.getSeconds() + 1);
        startend.setMilliseconds(startend.getMilliseconds() - 1);
        endend.setSeconds(endend.getSeconds() + 1);
        endend.setMilliseconds(endend.getMilliseconds() - 1);
        result.push(count(timeTable, start, startend));
        result.push(count(timeTable, end, endend));
        index++;
    }

    return Math.max(...result);
}