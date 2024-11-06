const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

// 초기 바구니 상태
const baskets = Array.from({ length: N }, (_, i) => i + 1);

// M번의 교환 작업 수행
for (let k = 1; k <= M; k++) {
    const [i, j] = input[k].split(' ').map(Number);
    
    // 공 교환
    const temp = baskets[i - 1];
    baskets[i - 1] = baskets[j - 1];
    baskets[j - 1] = temp;
}

// 결과 출력
console.log(baskets.join(' '));
