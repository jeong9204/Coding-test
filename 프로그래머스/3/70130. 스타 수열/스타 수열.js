function solution(a) {
    let answer = 0;
    let n = a.length;
    let chk = Array(n + 2).fill(-1);
    let cnt = {};

    a = [a[0], ...a, a[a.length - 1]];

    for (let i = 1; i <= n; i++) {
        if (!cnt[a[i]]) {
            cnt[a[i]] = 0;
        }

        if (a[i - 1] !== a[i] && chk[i - 1] !== a[i]) {
            chk[i - 1] = a[i];
            cnt[a[i]] += 1;
        } else if (a[i + 1] !== a[i] && chk[i + 1] !== a[i]) {
            chk[i + 1] = a[i];
            cnt[a[i]] += 1;
        }

        answer = Math.max(answer, 2 * cnt[a[i]]);
    }

    return answer;
}
