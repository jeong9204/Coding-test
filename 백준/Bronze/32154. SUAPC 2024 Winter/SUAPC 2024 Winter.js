const answers = [
    [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13],
    [1, 3, 5, 6, 7, 8, 9, 12, 13],
    [1, 3, 5, 6, 7, 8, 9, 12, 13],
    [1, 2, 3, 5, 6, 7, 8, 12, 13],
    [1, 3, 5, 6, 7, 8, 12, 13],
    [1, 3, 5, 6, 7, 8, 12, 13],
    [1, 3, 5, 6, 7, 8, 12, 13],
    [1, 3, 5, 6, 7, 8, 12, 13],
    [1, 3, 5, 6, 7, 8, 12, 13],
    [1, 2, 3, 6, 7, 8, 12, 13]
];

const n = parseInt(require('fs').readFileSync('/dev/stdin').toString().trim(), 10);

console.log(answers[n - 1].length);
console.log(answers[n - 1].map(num => String.fromCharCode(num + 64)).join(" "));
