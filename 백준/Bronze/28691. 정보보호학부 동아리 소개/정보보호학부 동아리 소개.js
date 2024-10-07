const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    if (n === 'M') {
        console.log('MatKor');
    } else if (n === 'W') {
        console.log('WiCys');
    } else if (n === 'C') {
        console.log('CyKor');
    } else if (n === 'A') {
        console.log('AlKor');
    } else if (n === '$') {
        console.log('$clear');
    }
    rl.close();
});
