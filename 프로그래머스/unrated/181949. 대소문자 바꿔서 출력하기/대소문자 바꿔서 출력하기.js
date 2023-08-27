const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = [line];
}).on('close',function(){
    str = input[0];
    str2 = ''
    for(let i=0; i<str.length; i++) {
        if(str[i].charCodeAt() >= 97 ) {
            str2 += str[i].toUpperCase()
        } else {
            str2 += str[i].toLowerCase()
        }
    }
    console.log(str2)
});