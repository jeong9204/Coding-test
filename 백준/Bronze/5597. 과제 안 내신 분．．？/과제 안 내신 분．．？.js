const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const students = Array(30).fill(false);

// 제출한 학생 번호에 해당하는 인덱스를 true로 변경
input.forEach(number => {
    students[number - 1] = true;
});

// 제출하지 않은 번호만 찾아서 배열에 저장
const result = [];
for (let i = 0; i < 30; i++) {
    if (!students[i]) result.push(i + 1);
}

// 작은 순서대로 출력
console.log(result[0]);
console.log(result[1]);
