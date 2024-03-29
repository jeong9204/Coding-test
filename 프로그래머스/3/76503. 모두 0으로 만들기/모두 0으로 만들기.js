function solution(arr, edges) {
  if (arr.reduce((a, b) => a + b) !== 0) return -1

  const tree = new Array(arr.length).fill(0).map(() => new Array())
  const nums = arr.slice()
  let result = BigInt(0)

  edges.forEach(([a, b]) => {
    tree[a].push(b)
    tree[b].push(a)
  })

  const visited = new Array(arr.length).fill(false)
  const stack = [[0, null]]

  while (stack.length) {
    const [curr, parent] = stack.pop()

    if (visited[curr]) {
      result += BigInt(Math.abs(nums[curr]))
      nums[parent] += nums[curr]
      nums[curr] = 0
      continue
    }

    visited[curr] = true
    stack.push([curr, parent])

    for (const next of tree[curr]) {
      if (!visited[next]) stack.push([next, curr])
    }
  }
  return result
}