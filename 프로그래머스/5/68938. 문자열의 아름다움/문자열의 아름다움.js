function MaxBeauty(size) {
    if (size === 1) return 0;

    return ((size * size * (size - 1)) / 2) - ((size - 1) * size * ((2 * size) - 1) / 6);
}

function Calc(s_len, e_len) {
    let N, K;
    if (s_len > e_len) {
        N = e_len;
        K = s_len;
    } else {
        N = s_len;
        K = e_len;
    }

    if (N === 1) return N * K;

    return ((N + K + 1) * (N + 1) * N / 2) - ((N + 1) * N * (2 * N + 1) / 3);
}

function solution(s) {
    let answer = 0;

    answer = MaxBeauty(s.length);

    let stNode = [];
    let NodeCnt = 0;

    let stTable = Array.from({ length: 26 }, () => []);
    let EntryCnt = new Array(26).fill(0);

    let len = 1;
    stNode[NodeCnt] = { alpha: s[0] };

    for (let i = 1; i < s.length; i++) {
        if (stNode[NodeCnt].alpha === s[i]) {
            len++;
        } else {
            stNode[NodeCnt++].length = len;
            stNode[NodeCnt] = { alpha: s[i] };
            len = 1;
        }
    }
    stNode[NodeCnt++].length = len;

    if (NodeCnt === 1) return 0;

    for (let i = 0; i < NodeCnt; i++) {
        let idx = stNode[i].alpha.charCodeAt(0) - 'a'.charCodeAt(0);

        answer -= MaxBeauty(stNode[i].length);

        for (let j = 0; j < EntryCnt[idx]; j++) {
            if (!stTable[idx][j]) {
                stTable[idx][j] = { Length: 0, Count: 0 };
            }
            answer -= (stTable[idx][j].Count * Calc(stTable[idx][j].Length, stNode[i].length));
        }

        let cur = 0;
        while (true) {
            if (!stTable[idx][cur]) {
                stTable[idx][cur] = { Length: 0, Count: 0 };
            }
            if (stTable[idx][cur].Count === 0) {
                stTable[idx][cur].Length = stNode[i].length;
                stTable[idx][cur].Count++;
                EntryCnt[idx]++;
                break;
            }

            if (stTable[idx][cur].Length === stNode[i].length) {
                stTable[idx][cur].Count++;
                break;
            }

            cur++;
        }
    }

    return answer;
}
