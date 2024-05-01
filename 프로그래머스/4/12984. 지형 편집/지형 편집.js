function solution(land, P, Q) {
    const heights = new Map();

    const n = land.length;
    const m = land[0].length;

    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const height = land[i][j];
            mapAdd(height);
            sum += height;
        }
    }

    const allHeights = Array.from(heights.entries())
        .sort((a, b) => a[0] - b[0]);

    let smallerCount = 0;
    let smallerSum = 0;
    let res = Infinity;

    for (let i = 0; i < allHeights.length; i++) {
        const [h, count] = allHeights[i];
        const largerSum = sum - h * count - smallerSum;
        const largerCount = n * m - smallerCount - count;
        const cost = (h * smallerCount - smallerSum) * P + (largerSum - h * largerCount) * Q;

        if (res <= cost) {
            return res;
        }

        res = cost;
        smallerSum += h * count;
        smallerCount += count;
    }

    return res;

    function mapAdd(height) {
        if (!heights.has(height)) {
            heights.set(height, 1);
        } else {
            heights.set(height, heights.get(height) + 1);
        }
    }
}
