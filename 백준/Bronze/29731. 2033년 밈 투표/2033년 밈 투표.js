const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const check = [
    "Never gonna give you up",
    "Never gonna let you down",
    "Never gonna run around and desert you",
    "Never gonna make you cry",
    "Never gonna say goodbye",
    "Never gonna tell a lie and hurt you",
    "Never gonna stop"
];

let T;
const input = [];

rl.on('line', (line) => {
    if (!T) {
        T = parseInt(line.trim());
    } else {
        input.push(line.trim());
        if (input.length === T) {
            rl.close();
        }
    }
}).on('close', () => {
    for (let s of input) {
        if (!check.includes(s)) {
            console.log("Yes");
            return;
        }
    }
    console.log("No");
});
