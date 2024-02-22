const getParent = (parent, c) => {
  if (parent[c] === c) return c;
  return (parent[c] = getParent(parent, parent[c]));
};

const unionParent = (parent, c1, c2) => {
  const [n1, n2] = [getParent(parent, c1), getParent(parent, c2)];
  if (n1 < n2) return (parent[n2] = n1);
  else return (parent[n1] = n2);
};

const findParent = (parent, c1, c2) => {
  const [n1, n2] = [getParent(parent, c1), getParent(parent, c2)];
  return n1 === n2;
};

const solution = (n, costs) => {
  let answer = 0;
  const parent = new Array(n).fill(null).map((_, i) => i);
  costs.sort((a, b) => a[2] - b[2]);

  for (const cost of costs) {
    if (!findParent(parent, cost[0], cost[1])) {
      answer += cost[2]; 
      unionParent(parent, cost[0], cost[1]); 
    }
  }
  return answer;
};