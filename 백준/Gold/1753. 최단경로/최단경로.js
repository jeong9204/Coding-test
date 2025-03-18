const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    const [V, E] = input[0].split(" ").map(Number);
    const K = Number(input[1]);

    const INF = Number.MAX_SAFE_INTEGER;
    const graph = Array.from({ length: V + 1 }, () => []);
    const dist = Array(V + 1).fill(INF);

    // 그래프 입력 저장
    for (let i = 2; i < input.length; i++) {
        const [u, v, w] = input[i].split(" ").map(Number);
        graph[u].push([v, w]);
    }

    // **MinHeap 구현**
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(value) {
            this.heap.push(value);
            this.heapifyUp();
        }

        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
            return top;
        }

        heapifyUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let parent = Math.floor((index - 1) / 2);
                if (this.heap[parent][1] <= this.heap[index][1]) break;
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            }
        }

        heapifyDown() {
            let index = 0;
            const length = this.heap.length;
            while (true) {
                let left = 2 * index + 1;
                let right = 2 * index + 2;
                let smallest = index;

                if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
                    smallest = left;
                }
                if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
                    smallest = right;
                }
                if (smallest === index) break;

                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }

        isEmpty() {
            return this.heap.length === 0;
        }
    }

    // **다익스트라 알고리즘**
    const dijkstra = (start) => {
        const pq = new MinHeap();
        pq.push([start, 0]);
        dist[start] = 0;

        while (!pq.isEmpty()) {
            const [current, cost] = pq.pop();

            if (dist[current] < cost) continue;

            for (const [next, weight] of graph[current]) {
                const newCost = cost + weight;

                if (newCost < dist[next]) {
                    dist[next] = newCost;
                    pq.push([next, newCost]);
                }
            }
        }
    };

    dijkstra(K);

    // **출력 처리**
    let result = "";
    for (let i = 1; i <= V; i++) {
        result += (dist[i] === INF ? "INF" : dist[i]) + "\n";
    }
    console.log(result.trim());
});
