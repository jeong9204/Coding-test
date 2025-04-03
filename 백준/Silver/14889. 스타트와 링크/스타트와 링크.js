const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = Number(input[0]);
  const S = input.slice(1).map((line) => line.split(' ').map(Number));
  const members = Array.from({ length: N }, (_, i) => i);
  let minDiff = Infinity;

  const getTeamScore = (team) => {
    let score = 0;
    for (let i = 0; i < team.length; i++) {
      for (let j = i + 1; j < team.length; j++) {
        score += S[team[i]][team[j]] + S[team[j]][team[i]];
      }
    }
    return score;
  };

  const combination = (arr, r) => {
    const result = [];
    const recur = (start, path) => {
      if (path.length === r) {
        result.push([...path]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        path.push(arr[i]);
        recur(i + 1, path);
        path.pop();
      }
    };
    recur(0, []);
    return result;
  };

  const teamCombinations = combination(members, N / 2);

  for (let i = 0; i < teamCombinations.length / 2; i++) {
    const teamStart = teamCombinations[i];
    const teamLink = members.filter((x) => !teamStart.includes(x));

    const startScore = getTeamScore(teamStart);
    const linkScore = getTeamScore(teamLink);

    minDiff = Math.min(minDiff, Math.abs(startScore - linkScore));
  }

  console.log(minDiff);
});
