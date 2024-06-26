class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.rear = null;
  }

  unshift(value) {
    const node = new Node(value);

    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      const cachedPrevFront = this.front;
      cachedPrevFront.prev = node;

      this.front = node;

      node.next = cachedPrevFront;
    }

    this.count += 1;
    return this.count;
  }

  shift() {
    if (this.count === 0) return null;

    const value = this.front.value;

    if (this.count === 1) {
      this.init();
    } else {
      this.front = this.front.next;
      this.front.prev = null;
      this.count -= 1;
    }

    return value;
  }

  push(value) {
    const node = new Node(value);

    if (this.count === 0) {
      this.front = node;
      this.rear = node;
    } else {
      const cachedPrevRear = this.rear;
      cachedPrevRear.next = node;

      node.prev = cachedPrevRear;

      this.rear = node;
    }

    this.count += 1;

    return this.count;
  }

  pop() {
    if (this.count === 0) return;

    const value = this.rear.value;

    if (this.count === 1) {
      this.init();
    } else {
      this.rear = this.rear.prev;
      this.rear.next = null;
      this.count -= 1;
    }

    return value;
  }

  getValue(idx) {
    if (idx >= this.count) return;
    let node = this.front;

    for (let i = 0; i < idx; i += 1) {
      node = node.next;
    }

    return node.value;
  }

  get rawArray() {
    let arr = [];
    let node = this.front;

    for (let i = 0; i < this.count; i += 1) {
      arr.push(node.value);
      node = node.next;
    }

    return arr;
  }

  get length() {
    return this.count;
  }
}

class Queue {
  constructor(queue) {
    this.queue = Array.isArray(queue) ? queue : [];
    this.rear = this.queue.length;
    this.front = 0;
  }

  enqueue(val) {
    this.queue.push(val);
    this.rear += 1;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];

    this.front += 1;
    return value;
  }

  get length() {
    return this.rear - this.front;
  }
}

class MatrixCommandar {
  constructor({ commands }) {
    this.taskQueue = new Queue();
    this._init(commands);
  }

  get TYPE_SHIFT_ROW() {
    return 'ShiftRow';
  }

  get TYPE_ROTATE() {
    return 'Rotate';
  }

  _init(commands) {
    let prev = null;
    let count = 0;

    for (let i = 0; i < commands.length; i += 1) {
      const nowCommands = commands[i];

      if (prev === null || prev === nowCommands) {
        count += 1;
      } else {
        this.taskQueue.enqueue([prev, count]);

        count = 1;
      }

      prev = nowCommands;

      if (i === commands.length - 1) {
        this.taskQueue.enqueue([prev, count]);
      }
    }
  }

  command() {
    if (!this.taskQueue.length) return;

    // [command, runCount]
    return this.taskQueue.dequeue();
  }

  get commandLength() {
    return this.taskQueue.length;
  }
}

class Matrix {
  constructor(matrix) {
    this.left = new Deque();
    this.right = new Deque();
    this.main = new Deque();

    this._init(matrix);
  }

  _init(matrix) {
    for (let i = 0; i < matrix.length; i += 1) {
      const row = matrix[i];
      const deque = new Deque();

      row.forEach((val) => {
        deque.push(val);
      });

      this.left.push(deque.shift());
      this.right.push(deque.pop());
      this.main.push(deque);
    }
  }

  rotate(count) {
    let remainCount = count % (this.main.front.value.length * 2 + this.left.length + this.right.length);

    while (remainCount) {
      remainCount -= 1;

      this.main.front.value.unshift(this.left.shift());
      this.right.unshift(this.main.front.value.pop());
      this.main.rear.value.push(this.right.pop());
      this.left.push(this.main.rear.value.shift());
    }
  }

  shiftRow(count) {
    let remainCount = count % this.main.length;

    while (remainCount) {
      remainCount -= 1;

      this.main.unshift(this.main.pop());

      this.left.unshift(this.left.pop());
      this.right.unshift(this.right.pop());
    }
  }
}

class RotateMatrixArrayPrinterStrategy {
  constructor(matrix) {
    this.matrix = matrix;
  }

  print() {
    let result = [];

    const leftArr = this.matrix.left.rawArray;
    const mainArr = this.matrix.main.rawArray;
    const rightArr = this.matrix.right.rawArray;

    for (let i = 0; i < mainArr.length; i += 1) {
      const row = [];

      row.push(leftArr[i]);
      row.push(...mainArr[i].rawArray);
      row.push(rightArr[i]);

      result.push(row);
    }

    return result;
  }
}

class MatrixCalculator {
  constructor({ commands, matrix, printerStrategy }) {
    this.commandar = commands;
    this.matrix = matrix;
    this.printerStrategy = printerStrategy;
  }

  run() {
    while (this.commandar.commandLength) {
      const [command, count] = this.commandar.command();

      if (command === this.commandar.TYPE_SHIFT_ROW) {
        this.matrix.shiftRow(count);
      }

      if (command === this.commandar.TYPE_ROTATE) {
        this.matrix.rotate(count);
      }
    }
  }

  getResult() {
    return this.printerStrategy.print();
  }
}

const solution = (rc, operations) => {
  const matrix = new Matrix(rc);

  const matrixCalculator = new MatrixCalculator({
    commands: new MatrixCommandar({ commands: operations }),
    matrix,
    printerStrategy: new RotateMatrixArrayPrinterStrategy(matrix),
  });

  matrixCalculator.run();

  return matrixCalculator.getResult();
};