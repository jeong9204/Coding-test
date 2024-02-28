function solution(n, t, m, timetable) {
    timetable = timetable.map(time => parseInt(time.substr(0, 2)) * 60 + parseInt(time.substr(3, 2)))
                      .sort((a, b) => b - a);

    let busTime = 9 * 60 - t;
    
    for (let i = 0; i < n - 1; i++) {
        busTime += t;

        for (let j = 0; j < m; j++) {
            if (timetable.length > 0 && timetable[timetable.length - 1] <= busTime) {
                timetable.pop();
            } else {
                break;
            }
        }
    }

    busTime += t;
    let myTime = timetable.length < m || timetable[timetable.length - m] > busTime
        ? busTime
        : timetable[timetable.length - m] - 1;

    return `${Math.floor(myTime / 60).toString().padStart(2, '0')}:${(myTime % 60).toString().padStart(2, '0')}`;
}