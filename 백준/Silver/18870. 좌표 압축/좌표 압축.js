const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const N = Number(input[0]);
    const coords = input[1].split(" ").map(Number);

    // 1️⃣ 좌표 정렬 후 중복 제거
    const sortedUnique = [...new Set(coords)].sort((a, b) => a - b);

    // 2️⃣ 좌표 → 압축 인덱스 매핑 생성
    const indexMap = new Map();
    sortedUnique.forEach((value, index) => {
        indexMap.set(value, index);
    });

    // 3️⃣ 원래 배열을 좌표 압축된 값으로 변환
    const compressedCoords = coords.map(value => indexMap.get(value));

    console.log(compressedCoords.join(" "));
});
