const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gradeMap = {
  'A+': 4.5,
  'A0': 4.0,
  'B+': 3.5,
  'B0': 3.0,
  'C+': 2.5,
  'C0': 2.0,
  'D+': 1.5,
  'D0': 1.0,
  'F': 0.0
};

let totalScore = 0;
let totalCredits = 0;

let lineCount = 0;

rl.on('line', (line) => {
  const [subject, creditStr, grade] = line.trim().split(' ');
  const credit = parseFloat(creditStr);

  if (grade !== 'P') {
    totalScore += credit * gradeMap[grade];
    totalCredits += credit;
  }

  lineCount++;

  if (lineCount === 20) {
    const average = totalScore / totalCredits;
    console.log(average.toFixed(6));
    rl.close();
  }
});
