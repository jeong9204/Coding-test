'use strict';
const fs = require('fs');

const MOD = 1000000007n;

const lines = fs.readFileSync(0, 'utf8').trim().split('\n').map(s => s.trim());
let ptr = 0;

const dna = lines[ptr++];
const L = dna.length;

const M = Number(lines[ptr++]);

// 문자 -> 0..3
function nucId(ch) {
  if (ch === 'A') return 0;
  if (ch === 'C') return 1;
  if (ch === 'G') return 2;
  return 3; // 'T'
}

// 코돈표 파싱: codon(3) + amino(string)
const aminoToId = new Map();
const codons = []; // {a,b,c, aminoId}
let aminoCnt = 0;

for (let i = 0; i < M; i++) {
  const [codon, amino] = lines[ptr++].split(/\s+/);
  let aid = aminoToId.get(amino);
  if (aid === undefined) {
    aid = aminoCnt++;
    aminoToId.set(amino, aid);
  }
  codons.push({
    x: nucId(codon[0]),
    y: nucId(codon[1]),
    z: nucId(codon[2]),
    aid
  });
}

// nextPos[i][ch] : i 이상에서 ch(0..3)의 다음 위치, 없으면 -1
const nextPos = Array.from({ length: L + 2 }, () => new Int32Array(4));
for (let ch = 0; ch < 4; ch++) nextPos[L][ch] = -1, nextPos[L + 1][ch] = -1;

// 뒤에서부터 채우기
for (let i = L - 1; i >= 0; i--) {
  // 기본은 nextPos[i+1] 복사
  nextPos[i][0] = nextPos[i + 1][0];
  nextPos[i][1] = nextPos[i + 1][1];
  nextPos[i][2] = nextPos[i + 1][2];
  nextPos[i][3] = nextPos[i + 1][3];
  // 현재 글자 업데이트
  nextPos[i][nucId(dna[i])] = i;
}

// pos에서 codon(x,y,z) 매칭하면 끝난 다음 위치(k+1) 반환, 불가능이면 -1
function matchCodon(pos, x, y, z) {
  const i = nextPos[pos][x];
  if (i === -1) return -1;
  const j = (i + 1 <= L) ? nextPos[i + 1][y] : -1;
  if (j === -1) return -1;
  const k = (j + 1 <= L) ? nextPos[j + 1][z] : -1;
  if (k === -1) return -1;
  return k + 1; // 다음 검색 시작 위치
}

// 언어(가능한 단백질 시퀀스 집합)가 같은 pos들을 “클래스”로 합치기(아래로부터 구축)
const classOfPos = new Int32Array(L + 1);

// 클래스별 cnt(빈 시퀀스 포함) 저장
const classCount = []; // BigInt mod
const intern = new Map(); // key -> classId

// pos = L (끝) 은 아무 코돈도 못 만듦 => Lang = {empty} => count = 1
intern.set('', 0);
classCount.push(1n);
classOfPos[L] = 0;

for (let pos = L - 1; pos >= 0; pos--) {
  // 아미노산별로 “가장 작은 nextPos”만 유지
  const bestNext = new Int32Array(aminoCnt);
  for (let i = 0; i < aminoCnt; i++) bestNext[i] = -1;

  for (const c of codons) {
    const np = matchCodon(pos, c.x, c.y, c.z);
    if (np === -1) continue;
    const a = c.aid;
    if (bestNext[a] === -1 || np < bestNext[a]) bestNext[a] = np;
  }

  // (aid, targetClass) 쌍을 만들고 정렬해 key 생성
  const pairs = [];
  for (let a = 0; a < aminoCnt; a++) {
    const np = bestNext[a];
    if (np !== -1) {
      pairs.push([a, classOfPos[np]]);
    }
  }
  pairs.sort((p1, p2) => p1[0] - p2[0]);

  let key = '';
  for (const [a, tc] of pairs) key += a + ':' + tc + '|';

  let cid = intern.get(key);
  if (cid === undefined) {
    // 새 클래스: count = 1(빈) + sum(targetCount)
    let cnt = 1n;
    for (const [, tc] of pairs) {
      cnt += classCount[tc];
      if (cnt >= MOD) cnt %= MOD;
    }
    cid = classCount.length;
    intern.set(key, cid);
    classCount.push(cnt % MOD);
  }

  classOfPos[pos] = cid;
}

// 답: start(0)에서 가능한 시퀀스 개수 - 빈 시퀀스 1개
let ans = classCount[classOfPos[0]] - 1n;
if (ans < 0n) ans += MOD;
console.log(String(ans % MOD));
