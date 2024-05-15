function combinations(level, combis) {
    if (level === 1) return combis.map(v => [v]);
    if (level === combis.length) return [combis];
    const result = [];
    combis.forEach((fixed, i, arr) => {
        const rest = arr.slice(i + 1);
        const newCombis = combinations(level - 1, rest);
        const item = newCombis.map(v => [...v, fixed]);
        result.push(...item);
    });
    return result;
}
function solution(orders, course) {
    const menus = Array.from({length: course.length}, () => new Map());
    for (const order of orders) {
        for (let i = 0; i < course.length; i++) {
            const combis = combinations(course[i], order.split(""));
            combis.forEach((v) => {
                const key = v.sort().join("");
                if (menus[i].has(key)) {
                    const val = menus[i].get(key);
                    menus[i].set(key, val + 1);
                } else menus[i].set(key, 1);
            });
        }
    }
    const sortedMenu = menus.map((v) => new Map([...v.entries()].sort((a, b) => b[1] - a[1])));
    const result = [];
    sortedMenu.forEach((courses) => {
        let max = 2;
        for (const [key, val] of courses) {
            if (max <= val) {
                max = val;
                result.push(key);
            }
            else if (max > val) break;
        }
    });
    return result.sort();
}