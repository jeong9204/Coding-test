const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (N) => {
    rl.question('', (directionInput) => {
        const directions = directionInput.split(' ').map(Number);

        let result = 0;
        directions.forEach(direction => {
            if (direction === 1) {
                result += 1;
            } else if (direction === -1) {
                result -= 1;
            }
        });

        if (result < 0) {
            console.log("Left");
        } else if (result === 0) {
            console.log("Stay");
        } else {
            console.log("Right");
        }

        rl.close();
    });
});
