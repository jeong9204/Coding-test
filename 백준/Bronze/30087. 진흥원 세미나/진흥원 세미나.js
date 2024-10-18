const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (n) => {
  const questions = [];
  let count = 0;

  rl.on('line', (line) => {
    questions.push(line.trim());
    count++;
    if (count >= n) {
      rl.close();
    }
  });

  rl.on('close', () => {
    questions.forEach(a => {
      switch (a) {
        case 'Algorithm':
          console.log('204');
          break;
        case 'DataAnalysis':
          console.log('207');
          break;
        case 'ArtificialIntelligence':
          console.log('302');
          break;
        case 'CyberSecurity':
          console.log('B101');
          break;
        case 'Network':
          console.log('303');
          break;
        case 'Startup':
          console.log('501');
          break;
        case 'TestStrategy':
          console.log('105');
          break;
        default:
          break;
      }
    });
  });
});
