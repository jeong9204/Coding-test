'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);

// gcd for BigInt
function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

// lcm for BigInt
function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

// graph: from -> (to, mulNum, mulDen) meaning mass[to] = mass[from] * mulNum / mulDen
const g = Array.from({ length: N }, () => []);

for (let e = 0; e < N - 1; e++) {
  const a = Number(input[idx++]);
  const b = Number(input[idx++]);
  const p = BigInt(input[idx++]);
  const q = BigInt(input[idx++]);

  // a/b = p/q
  // so b = a * q/p
  g[a].push([b, q, p]);
  // a = b * p/q
  g[b].push([a, p, q]);
}

const visited = Array(N).fill(false);
const num = Array(N).fill(0n);
const den = Array(N).fill(1n);

// root 0 as 1/1
num[0] = 1n;
den[0] = 1n;

function dfs(u) {
  visited[u] = true;
  for (const [v, mulNum, mulDen] of g[u]) {
    if (visited[v]) continue;
    let nn = num[u] * mulNum;
    let dd = den[u] * mulDen;
    const gg = gcd(nn, dd);
    nn /= gg;
    dd /= gg;
    num[v] = nn;
    den[v] = dd;
    dfs(v);
  }
}

dfs(0);

// L = lcm of all den[i]
let L = 1n;
for (let i = 0; i < N; i++) {
  L = lcm(L, den[i]);
}

// masses[i] = num[i] * (L/den[i])
const mass = Array(N).fill(0n);
for (let i = 0; i < N; i++) {
  mass[i] = num[i] * (L / den[i]);
}

// reduce by gcd of all masses to make minimal integers
let G = mass[0];
for (let i = 1; i < N; i++) G = gcd(G, mass[i]);
for (let i = 0; i < N; i++) mass[i] /= G;

console.log(mass.map(x => x.toString()).join(' '));
