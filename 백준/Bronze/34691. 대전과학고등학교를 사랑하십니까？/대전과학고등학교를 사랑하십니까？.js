'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const answerMap = {
  animal: 'Panthera tigris',
  tree: 'Pinus densiflora',
  flower: 'Forsythia koreana',
};

const result = [];

for (const line of input) {
  const question = line.trim();

  if (question === 'end') break;
  result.push(answerMap[question]);
}

console.log(result.join('\n'));