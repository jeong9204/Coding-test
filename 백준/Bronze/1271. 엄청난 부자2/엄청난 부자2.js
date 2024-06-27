const fs = require('fs')
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim()
                .split(' ').map(BigInt)

const solution = (a, b) => {
    return a/b + '\n' + a%b
}

console.log(solution(a, b))