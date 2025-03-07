const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 각 월의 일 수
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // 요일 배열

rl.on('line', (line) => {
  const [month, day] = line.split(' ').map(Number);
  
  let totalDays = day; // 해당 월의 날짜부터 시작

  // 1월부터 (month-1)월까지의 모든 일수를 합산
  for (let i = 1; i < month; i++) {
    totalDays += daysInMonth[i];
  }

  // 1월 1일(월요일)에서 totalDays만큼 지나간 후의 요일 구하기
  console.log(weekDays[totalDays % 7]); 

  rl.close();
});
