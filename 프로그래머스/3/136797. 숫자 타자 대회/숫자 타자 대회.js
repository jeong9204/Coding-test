function getWeight(target) {
    if (target === 0) return { r: 3, c: 1 };
    else return { r: Math.floor((target - 1) / 3), c: (target - 1) % 3 };
}

function solution(numbers) {
    const distMap = Array.from({ length: 10 }, (_, i) => {
        const { r: iR, c: iC } = getWeight(i);
        return Array.from({ length: 10 }, (_, j) => {
            const { r: jR, c: jC } = getWeight(j);
            const [diffR, diffC] = [Math.abs(iR - jR), Math.abs(iC - jC)];
            return 3 * Math.min(diffR, diffC) + 2 * Math.abs(diffR - diffC) || 1;
        })
    });

    let weights = distMap.map(v => v.map(_ => Infinity));
    weights[4][6] = 0;
    weights[6][4] = 0;

    for (let number of numbers) {
        number = Number(number);
        const temp = weights.map(v => v.map(_ => Infinity));

        weights.forEach((row, iR) => {
            row.forEach((weight, iC) => {
                // 이전에 눌렀던 지점에서 실행. ex) loop-1: [4][6] || [6][4]
                if (weight !== Infinity) {
                    if (iR === number || iC === number) {
                        temp[iR][iC] = Math.min(temp[iR][iC], weight + 1);
                        temp[iC][iR] = Math.min(temp[iC][iR], weight + 1);
                        return;
                    }
                    const leftW = distMap[iR][number];
                    const rightW = distMap[iC][number];
                    const leftVal = Math.min(temp[iR][number], weight + rightW);
                    const rightVal = Math.min(temp[iC][number], weight + leftW);

                    temp[iR][number] = leftVal;
                    temp[iC][number] = rightVal;
                    temp[number][iR] = leftVal;
                    temp[number][iC] = rightVal;
                }
            });
        });
        weights = temp;
    }

    return Math.min(...weights.flat(1));
}