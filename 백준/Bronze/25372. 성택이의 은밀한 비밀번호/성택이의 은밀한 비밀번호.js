const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputCount = 0;
let totalInputs = 0;

rl.question('', (input) => {
    totalInputs = parseInt(input);
    inputCount++;
    checkPasswords();
});

function checkPasswords() {
    rl.on('line', (pw) => {
        if (inputCount <= totalInputs) {
            if (pw.length >= 6 && pw.length <= 9) {
                console.log('yes');
            } else {
                console.log('no');
            }
            inputCount++;
        }
        if (inputCount > totalInputs) {
            rl.close();
        }
    });
}
