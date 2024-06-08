const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
    input.push(line);
}).on('close', function () {
    let num1 = Number(input[0]);
    let num2 = Number(input[1]);

    console.log(num1 * (num2 % 10));
    console.log(num1 * Math.floor((num2 % 100) / 10));
    console.log(num1 * Math.floor(num2 / 100));
    console.log(num1 * num2);

    process.exit();
});