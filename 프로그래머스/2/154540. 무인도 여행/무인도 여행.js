// 상 하 좌 우
dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

function solution(maps) {
    let answer = []
    let matrix = []

    maps.forEach(row => {
        matrix.push(row.split(''))
    })

    const [row, col] = [matrix.length - 1, matrix[0].length - 1]

    for (let i = 0; i <= row; i++) {
        for (let j = 0; j <= col; j++) {
            let value = matrix[i][j]
            if (value === 'X') continue
            matrix[i][j] = 'X'
            value = Number(value)
            
            const queue = [[i, j]]
            
            while(queue.length !== 0) {
                let [r, c] = queue.shift()
                for(let i = 0; i < 4; i++) {
                    const [nr, nc] = [r + dr[i], c + dc[i]]
                    if (0 > nr || nr > row || 0 > nc || nc > col) continue
                    let nv = matrix[nr][nc]
                    if (nv === 'X') continue
                    matrix[nr][nc] = 'X'
                    value += Number(nv)   
                    queue.push([nr, nc])
                }
            }
            answer.push(value)
        }
    }

    if (answer.length === 0) return [-1]
    answer.sort((a, b) => a - b)
    return answer
}