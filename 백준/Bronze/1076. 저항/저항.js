const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

const colors = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];

// 색을 값(0~9)으로 매핑
const v1 = BigInt(colors.indexOf(lines[0]));
const v2 = BigInt(colors.indexOf(lines[1]));
const v3 = BigInt(colors.indexOf(lines[2]));

// 앞의 두 자리 수
const front = v1 * 10n + v2;

// 10^v3 (곱 배수)
const mul = 10n ** v3;

// 최종 저항값
const ans = front * mul;

console.log(ans.toString());
