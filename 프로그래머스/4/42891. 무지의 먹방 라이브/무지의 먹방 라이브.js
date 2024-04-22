class Food {
    constructor(index, time) {
        this.index = index;
        this.time = time;
    }
}

function solution(food_times, k) {
    let answer = 0;
    let max = 0;
    let size = food_times.length;
    let index = 1;

    const queue = new PriorityQueue((a, b) => a.time - b.time);

    food_times.forEach(time => {
        max += time;
        queue.enqueue(new Food(index++, time));
    });

    if (max <= k) return -1;

    let total = 0;
    let prev = 0;

    while (total + (queue.peek().time - prev) * size <= k) {
        const pick = queue.dequeue().time;
        total += (pick - prev) * size;
        size--;
        prev = pick;
    }

    const list = [];

    while (!queue.isEmpty()) {
        list.push(queue.dequeue());
    }

    list.sort((a, b) => a.index - b.index);

    answer = list[(k - total) % size].index;

    return answer;
}

class PriorityQueue {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
    }

    enqueue(item) {
        this.heap.push(item);
        this.bubbleUp();
    }

    dequeue() {
        const max = this.peek();
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return max;
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let topPriorityIndex = index;
            if (leftChildIndex < length && this.comparator(this.heap[leftChildIndex], this.heap[topPriorityIndex]) < 0) {
                topPriorityIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.comparator(this.heap[rightChildIndex], this.heap[topPriorityIndex]) < 0) {
                topPriorityIndex = rightChildIndex;
            }
            if (topPriorityIndex === index) break;
            [this.heap[topPriorityIndex], this.heap[index]] = [this.heap[index], this.heap[topPriorityIndex]];
            index = topPriorityIndex;
        }
    }
}
