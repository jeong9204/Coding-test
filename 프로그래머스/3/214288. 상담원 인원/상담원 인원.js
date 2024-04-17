// min-heap, 1-indexed
class PriorityQueue {
    constructor() {
        this.queue = [null];
    }
    enqueue(item) {
        this.queue.push(item);
        this.upHeap();
    }
    dequeue() {
        if (this.queue.length === 1) {
            return null;
        }
        this.#swap(1, this.queue.length-1);
        const item = this.queue.pop();
        this.downHeap();
        return item;
    }
    upHeap() {
        let cur = this.queue.length-1;

        while (1 < cur) {
            const p = Math.floor(cur / 2);

            const parent = this.queue[p],
                  current = this.queue[cur];

            if (current < parent) {
                this.#swap(cur, p);
                cur = p;
                continue;
            }

            // else
            break;
        }
    }
    downHeap() {
        let p = 1;

        while (p < this.queue.length) {
            const l = p*2,
                  r = p*2 + 1;

            let s = p;

            if (l < this.queue.length && this.queue[l] < this.queue[s]) {
                s = l;
            }
            if (r < this.queue.length && this.queue[r] < this.queue[s]) {
                s = r;
            }

            if (s === p) {
                break;
            }

            this.#swap(s, p);
            p = s;
        }
    }
    size() {
        return this.queue.length - 1;
    }
    top() {
        const t = 1;
        return this.queue[t];
    }
    #swap(i0, i1) {
        [this.queue[i0], this.queue[i1]] = [this.queue[i1], this.queue[i0]];
    }
}

function solution(k, n, reqs) {
    let answer = Infinity;

    // 기본적으로 k개의 타입에 1명씩 분배
    const mentos = Array.from({ length: k+1 }, () => 1);

    // k개의 타입에 n명을 분배한 후 callback 실행
    function makeMentos(rest, idx, callback) {
        if (rest === 0) {
            callback();
            return;
        }
        if (idx === k) {
            mentos[idx] += rest;
            makeMentos(0, idx+1, callback);
            mentos[idx] -= rest;
            return;
        }
        for (let i=0; i<=rest; i++) {
            mentos[idx] += i;
            makeMentos(rest-i, idx+1, callback);
            mentos[idx] -= i;
        }
        return;
    }

    // 분배된 mentos를 기준으로 시뮬레이션
    function simulate() {
        let current = 0;
        const queue = Array.from({ length: k+1 }, () => new PriorityQueue());

        reqs.forEach(([start, time, type]) => {
            const pq = queue[type];

            while (pq.top() <= start) {
                pq.dequeue();
            }
            if (pq.size() === mentos[type]) {
                const next = pq.dequeue();
                const diff = next - start;
                current += diff;
                pq.enqueue(next + time);
            } else {
                pq.enqueue(start + time);
            }

        })

        if (current < answer) {
            answer = current;
        }

        return;
    }

    makeMentos(n-k, 1, simulate);

    return answer;
}