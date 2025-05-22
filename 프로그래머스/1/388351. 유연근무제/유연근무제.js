function solution(schedules, timelogs, startday) {
  const n = schedules.length;
  let count = 0;

  const addTenMinutes = (time) => {
    let hour = Math.floor(time / 100);
    let minute = time % 100;
    minute += 10;
    if (minute >= 60) {
      hour += 1;
      minute -= 60;
    }
    return hour * 100 + minute;
  };

  for (let i = 0; i < n; i++) {
    const target = addTenMinutes(schedules[i]);
    let allOnTime = true;

    for (let j = 0; j < 7; j++) {
      const day = (startday + j - 1) % 7 + 1; // 1~7 (월~일)

      if (day === 6 || day === 7) continue; // 토요일(6), 일요일(7) 제외

      if (timelogs[i][j] > target) {
        allOnTime = false;
        break;
      }
    }

    if (allOnTime) count++;
  }

  return count;
}
