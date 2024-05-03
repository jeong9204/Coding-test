function solution (n, edges) {
  const tree = new Array(n).fill().map(_ => []);
  for(const [e1, e2] of edges) {
    tree[e1-1].push(e2-1);
    tree[e2-1].push(e1-1);
  }
  
  let [leafDist, leafIdx, leafCount] = findLeafnodeWithBFS(tree, 0);
  
  [leafDist, leafIdx, leafCount] = findLeafnodeWithBFS(tree, leafIdx);
  
  let answer = 0;
  
  if (leafCount > 1) answer = leafDist;
  else {
    [leafDist, leafIdx, leafCount] = findLeafnodeWithBFS(tree, leafIdx);
    
    if (leafCount > 1) answer= leafDist;
    else answer = leafDist - 1;
  }
  
  return answer;
}

const findLeafnodeWithBFS = (tree, node) => {
  const queue = new Queue();
  const dist = new Array(tree.length).fill(Infinity);
  const visited = new Array(tree.length).fill(false);
  
  dist[node] = 0;
  visited[node] = true;
  queue.add(node);
  
  let maxLength = 0;
  let maxIdx = 0;
  let count = 0;
  
  while(queue.size()) {
    const cur = queue.popleft();
    const distance = dist[cur];
    
    for(const next of tree[cur]) {
      if(!visited[next]) {
        const newDistance = distance + 1;
        visited[next] = true;
        dist[next] = newDistance;
        queue.add(next);
        
        if(maxLength < newDistance) {
          maxLength = newDistance;
          maxIdx = next;
          count = 1;
        }
        else if(maxLength === newDistance) {
          count++;
        }
      }
    }
  }
  
  return [maxLength, maxIdx, count];
}

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }
  
  size() {
    if (this.storage[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }
  
  add(value) {
    if (this.size() === 0) {
      this.storage['0'] = value;
    } else {
      this.rear += 1;
      this.storage[this.rear] = value;
    }
  }
  
  popleft() {
    let temp;
    if (this.front === this.rear) {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
      return temp;
    } else {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front += 1;
      return temp;
    }
  }
}