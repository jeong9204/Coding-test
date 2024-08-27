const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let caseNumber = 1;

rl.on('line', (input) => {
    if (input === "0") {
        rl.close();
    } else {
        console.log(`Case ${caseNumber}: Sorting... done!`);
        caseNumber++;
    }
});
