// 현재 페이지 주소 따기
function getMySite(html) {
    const temp = html.match('<meta property="og:url" content="\\S*')[0].slice(33);
    return temp.split(/"\/>|"/)[0];
}

// 외부 링크 주소 따기
function getSite(html) {
    const aTags = html.match(/<a href="\S*">/g);
    if (!aTags) return []; // 링크가 없을 때는 빈 배열 반환

    return aTags.map(aTag => aTag.slice(9, aTag.length - 2));
}

// 현재 페이지 기본 점수
function getDefaultPoint(html, word) {
    return html.split(/[^A-Za-z]/).filter(htmlWord => htmlWord.toLowerCase() === word.toLowerCase()).length;
}

function solution(word, pages) {
    const map = new Map();
    const sites = pages.map((html, index) => {
        const name = getMySite(html);
        const outSites = getSite(html);
        const point = getDefaultPoint(html, word);

        map.set(name, (map.get(name) || 0) + point);

        outSites.forEach(site => {
            map.set(site, (map.get(site) || 0) + (point / outSites.length));
        });

        return [name, index];
    });

    sites.sort((a, b) => {
        return map.get(b[0]) - map.get(a[0]);
    });

    return sites[0][1];
}
