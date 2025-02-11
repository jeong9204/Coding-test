const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(x) {
    const node = new Node(x);
    if (this.length === 0) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
  }

  push_back(x) {
    const node = new Node(x);
    if (this.length === 0) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  pop_front() {
    if (this.length === 0) return -1;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.length--;
    return value;
  }

  pop_back() {
    if (this.length === 0) return -1;
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.length--;
    return value;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    return this.length === 0 ? -1 : this.head.value;
  }

  back() {
    return this.length === 0 ? -1 : this.tail.value;
  }
}

const deque = new Deque();
const output = [];

rl.on('line', (line) => {
  const [command, num] = line.split(' ');
  switch (command) {
    case 'push_front':
      deque.push_front(Number(num));
      break;
    case 'push_back':
      deque.push_back(Number(num));
      break;
    case 'pop_front':
      output.push(deque.pop_front());
      break;
    case 'pop_back':
      output.push(deque.pop_back());
      break;
    case 'size':
      output.push(deque.size());
      break;
    case 'empty':
      output.push(deque.empty());
      break;
    case 'front':
      output.push(deque.front());
      break;
    case 'back':
      output.push(deque.back());
      break;
  }
}).on('close', () => {
  console.log(output.join('\n'));
});
