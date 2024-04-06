function solution(n, m, x, y, queries) {
    const az = {x1: x, y1: y, x2: x, y2: y};
    const dir = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}];
    while (queries.length) {
        const [d, dx] = queries.pop();
        const newaz = {...az};
        Object.keys(newaz).forEach(k => newaz[k] += dir[d][k[0]] * dx);
        if (az.x1 == 0 && newaz.x1 > az.x1) newaz.x1 = az.x1;
        if (az.y1 == 0 && newaz.y1 > az.y1) newaz.y1 = az.y1;
        if (az.x2 == n - 1 && newaz.x2 < az.x2) newaz.x2 = az.x2;
        if (az.y2 == m - 1 && newaz.y2 < az.y2) newaz.y2 = az.y2;
        if ((newaz.x1 < 0 && newaz.x2 < 0) || (newaz.x1 >= n && newaz.x2 >= n) || (newaz.y1 < 0 && newaz.y2 < 0) || (newaz.y1 >= m && newaz.y2 >= m)) return 0;
        Object.keys(newaz).forEach(k => az[k] = newaz[k] < 0 ? 0 : (newaz[k] >= (k[0] == 'x' ? n : m) ? (k[0] == 'x' ? n : m) - 1 : newaz[k]));
    }
    return BigInt(az.x2 - az.x1 + 1) * BigInt(az.y2 - az.y1 + 1);
}