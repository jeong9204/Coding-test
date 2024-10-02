const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    if (n === 'NLCS') {
        console.log('North London Collegiate School');
    } else if (n === 'BHA') {
        console.log('Branksome Hall Asia');
    } else if (n === 'KIS') {
        console.log('Korea International School');
    } else if (n === 'SJA') {
        console.log('St. Johnsbury Academy');
    }
    rl.close();
});
