const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

let binary = input;

// 길이가 3의 배수가 되도록 앞에 0을 붙여준다.
while (binary.length % 3 !== 0) {
  binary = '0' + binary;
}

let result = '';

for (let i = 0; i < binary.length; i += 3) {
  const chunk = binary.slice(i, i + 3);
  const octalDigit = parseInt(chunk, 2);
  result += octalDigit.toString();
}

console.log(result);