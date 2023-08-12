const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = line.split(' ');
}).on('close', function () {
    str1 = input[0].replace(/ /g,"")
    str2 = input[1].replace(/ /g,"")
    let str = str1+str2
    console.log(str.replace(/ /g,""))
});