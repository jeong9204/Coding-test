function solution(m, musicinfos) {
    m = m.replace(/(C|D|F|G|A)#/g, (_, a) => a.toLowerCase());
    musicinfos = musicinfos
        .map((music) => {
            let [start, end, title, melody] = music.split(',');
            let h = end.slice(0, 2) - start.slice(0, 2);
            let m = end.slice(3) - start.slice(3);
            const time = h * 60 + m;
            melody = melody.replace(/(C|D|F|G|A)#/g, (_, a) => a.toLowerCase());
            return [time, title, melody.padEnd(time, melody).slice(0, time)];
        })
        .filter(([_, $, melody]) => melody.indexOf(m) >= 0)
        .sort(([a], [b]) => b - a);
    return musicinfos[0]?.[1] || '(None)';
}