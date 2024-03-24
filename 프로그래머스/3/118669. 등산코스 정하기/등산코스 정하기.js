class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(val) {
        this.queue[this.rear++] = val;
    }

    dequeue() {
        const val = this.queue[this.front];
        delete this.queue[this.front++];
        return val;
    }

    isEmpty() {
        return this.front === this.rear;
    }
}
function solution(n, paths, gates, summits) {
    summits.sort((a, b) => a - b);
    const heap = new Queue();
    const pathMap = new Map();
    const summitMap = new Map();
    const gateMap = new Map();
    const intensity = Array.from({length: n + 1}, () => 10000001);
    intensity[0] = 0;

    for (const summit of summits) {
        summitMap.set(summit, true);
    }

    // gate 시작점 intensity 0으로 초기화 후 최소힙에 넣어줌.
    for (const gate of gates) {
        gateMap.set(gate, true);
        heap.enqueue({ node: gate, intensity: 0 });
        intensity[gate] = 0;
    }

    // path 순회 방지를 위한 해시맵 생성.
    for (const [node1, node2, intensity] of paths) {
        if (pathMap.has(node1)) {
            const next = pathMap.get(node1);
            next[next.length] = [node2, intensity];
            pathMap.set(node1, next);
        } else {
            pathMap.set(node1, [[node2, intensity]]);
        }

        if (pathMap.has(node2)) {
            const next = pathMap.get(node2);
            next[next.length] = [node1, intensity];
            pathMap.set(node2, next);
        } else {
            pathMap.set(node2, [[node1, intensity]]);
        }
    }

    while (!heap.isEmpty()) {
        const { node: current, intensity: currIntensity } = heap.dequeue();
        if (summitMap.has(current)) continue;

        const nexts = pathMap.get(current);
        for (const [next, nextIntensity] of nexts) {
            const maxIntensity = Math.max(currIntensity, nextIntensity);

            if (maxIntensity < intensity[next]) {
                intensity[next] = maxIntensity;
                heap.enqueue({ node: next, intensity: maxIntensity });
            } 
        }
    }

    // intensity 최솟값 기준 선정렬, node 기준 후정렬
    return intensity
        .filter((v, i) => (summitMap.has(i)))
        .map((v, i) => [summits[i], v])
        .sort((a, b) => a[1] - b[1])
        .filter((v, _, arr) => v[1] === arr[0][1])
        .sort((a, b) => a[0] - b[0])[0];
}
