'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const M = Number(input[idx++]);

let packMin = Infinity;
let singleMin = Infinity;

for (let i = 0; i < M; i++) {
  const pack = Number(input[idx++]);
  const single = Number(input[idx++]);
  if (pack < packMin) packMin = pack;
  if (single < singleMin) singleMin = single;
}

const packs = Math.floor(N / 6);
const rem = N % 6;

const costAllSingle = N * singleMin;
const costMix = packs * packMin + rem * singleMin;
const costAllPack = (packs + 1) * packMin; // ceil(N/6) * packMin, rem>0일 때만 사실상 의미 있지만 비교용으로 OK
const costExactPack = (rem === 0) ? packs * packMin : costAllPack;

const answer = Math.min(costAllSingle, costMix, costExactPack);
console.log(String(answer));
