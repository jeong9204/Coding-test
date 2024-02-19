function solution(gems) {
    let minGems = Number.MAX_SAFE_INTEGER;
    let lenGems = gems.length;
    let nGems = new Set(gems).size;
    let end = 0;
    let temp = new Map();
    let result = [];

    for (let start = 0; start < lenGems; start++) {
        while (temp.size < nGems && end < lenGems) {
            temp.set(gems[end], (temp.get(gems[end]) || 0) + 1);
            end += 1;
        }

        if (temp.size === nGems) {
            if (minGems > end - start) {
                minGems = end - start;
                result = [start + 1, end];
            }
        }

        temp.set(gems[start], temp.get(gems[start]) - 1);
        if (temp.get(gems[start]) === 0) {
            temp.delete(gems[start]);
        }
    }

    return result;
}