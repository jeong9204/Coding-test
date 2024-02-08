function solution(n, works) {
  let total = works.reduce((acc, cur) => acc + cur, 0)

  if (total <= n) return 0

  const pq = new MaxHeap()
  works.forEach(work => pq.insert(work))

  while (n > 0) {
    const maxWork = pq.extract()
    pq.insert(maxWork - 1)
    n--
  }

  let fatigue = pq.container.reduce((acc, cur) => acc + cur ** 2, 0)
  return fatigue
}

class MaxHeap {
  constructor() {
    this.container = []
  }

  insert(data) {
    this.container.push(data);
    let idx = this.container.length - 1

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2)
      if (this.container[idx] <= this.container[parentIdx]) break

      const temp = this.container[idx]
      this.container[idx] = this.container[parentIdx]
      this.container[parentIdx] = temp
      idx = parentIdx
    }
  }

  extract() {
    const max = this.container[0]
    if (this.container.length === 1) {
      return this.container.pop()
    }

    this.container[0] = this.container.pop()
    let idx = 0
    const length = this.container.length

    while (true) {
      const leftChildIdx = idx * 2 + 1
      const rightChildIdx = idx * 2 + 2
      let swapIdx = idx

      if (leftChildIdx < length && this.container[leftChildIdx] > this.container[swapIdx]) {
        swapIdx = leftChildIdx
      }

      if (rightChildIdx < length && this.container[rightChildIdx] > this.container[swapIdx]) {
        swapIdx = rightChildIdx
      }

      if (swapIdx === idx) break

      const temp = this.container[idx]
      this.container[idx] = this.container[swapIdx]
      this.container[swapIdx] = temp
      idx = swapIdx
    }

    return max
  }
}