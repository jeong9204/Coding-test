function stot(tm) {
    let hr = parseInt(tm.substr(0, 2));
    let mn = parseInt(tm.substr(3, 2));
    let sc = parseInt(tm.substr(6, 2));
    return hr * 3600 + mn * 60 + sc;
}

function ttos(tm) {
    let hr = String(Math.floor(tm / 3600)).padStart(2, '0');
    tm %= 3600;
    let mn = String(Math.floor(tm / 60)).padStart(2, '0');
    tm %= 60;
    let sc = String(tm).padStart(2, '0');
    return hr + ':' + mn + ':' + sc;
}

function solution(play_time, adv_time, logs) {
    let mx = stot(play_time);
    let v = new Array(mx + 1).fill(0);
    for (let log of logs) {
        let st = stot(log.substr(0, 8));
        let en = stot(log.substr(9, 8));
        v[st]++;
        v[en]--;
    }
    for (let i = 1; i <= mx; i++) {
        v[i] += v[i - 1];
    }
    for (let i = 1; i <= mx; i++) {
        v[i] += v[i - 1];
    }
    let at = stot(adv_time);
    let res = -1;
    let j = -1;
    for (let i = 0; i + at - 1 <= mx; i++) {
        let cnt = v[i + at - 1] - (i ? v[i - 1] : 0);
        if (cnt <= res) continue;
        res = cnt;
        j = i;
    }
    console.assert(res > 0 && j >= 0);
    return ttos(j);
}