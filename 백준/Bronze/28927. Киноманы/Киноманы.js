const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const processInput = (input) => input.split(' ').map(Number);

rl.question('', (maxTimesInput) => {
    rl.question('', (melTimesInput) => {
        const maxTimes = processInput(maxTimesInput);
        const melTimes = processInput(melTimesInput);

        const maxTime = 3 * maxTimes[0] + 20 * maxTimes[1] + 120 * maxTimes[2];
        const melTime = 3 * melTimes[0] + 20 * melTimes[1] + 120 * melTimes[2];

        if (maxTime > melTime) {
            console.log("Max");
        } else if (maxTime < melTime) {
            console.log("Mel");
        } else {
            console.log("Draw");
        }

        rl.close();
    });
});
