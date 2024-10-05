const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    if (n === 'SONGDO') {
        console.log('HIGHSCHOOL');
    } else if (n === 'CODE') {
        console.log('MASTER');
    } else if (n === '2023') {
        console.log('0611');
    } else if (n === 'ALGORITHM') {
        console.log('CONTEST');
    }
    rl.close();
});
