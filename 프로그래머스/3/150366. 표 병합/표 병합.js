function solution(commands) {
    const result = []
    const makeArray = (x) => {
        const doubleArray = []
     for (let i = 0; i < 51; i++) {
        const row = Array(51).fill(x)
        doubleArray.push(row);
}
        return doubleArray
    }
    const table = makeArray(0)
    const [row,col] = [51,51]
    const link = []
    for(let i=0;i<row;i++){
        const arr = Array.from(Array(51),() => [])
        link.push(arr)
    }
   for(const command of commands){
       let arr = command.split(' ')
       if(arr[0] === 'UPDATE'){
           arr.shift()
         arr.length === 2 ? updateWord(arr) : updateNumber(arr)
       }
       if(arr[0] === 'MERGE'){
           arr.shift()
           arr = arr.map((v) => +v)
           merge(arr)
       }
       if(arr[0] === 'UNMERGE'){
           arr.shift()
           arr = arr.map((v) => +v)
           unmerge(arr)
       }
       if(arr[0] === 'PRINT'){
           arr.shift()
           arr = arr.map((v) => +v-1)
           const [a,b] = arr
           result.push(table[a][b] ? table[a][b] : "EMPTY")
       }
   }
   function merge(arr){
       const [r1,c1,r2,c2] = arr
       if(r1 === r2 && c1 === c2){return}
       const first = table[r1-1][c1-1]
       const second = table[r2-1][c2-1]
       link[r1-1][c1-1].push([r2-1,c2-1])
       link[r2-1][c2-1].push([r1-1,c1-1])
      let el = 0;
    if (first) {
    el = first;
    } else if (second) {
    el = second;
    } else {
    return;
    }
       const isVisited = makeArray(0)  
       const queue = [[r1-1,c1-1]]
       isVisited[r1-1][c1-1] = 1
       while(queue.length){
           const [r,c] = queue.shift()
           isVisited[r][c] = 1
           table[r][c] = el
           for(let [x,y] of link[r][c]){
               if(!isVisited[x][y]){
                   queue.push([x,y])
               }
                }
       }
       }
    function unmerge(arr) {
      const [r,c] = arr
      const el = table[r-1][c-1]
      //link[r][c]의 모든 원소들을 제거
       const isVisited = makeArray(0)  
       //link[r][c]의 모든 애들을 다 제거
       const queue = [...link[r-1][c-1]]
        link[r-1][c-1] = []
        isVisited[r-1][c-1] = 1
        while(queue.length){
           const [r,c] = queue.shift()
           table[r][c] = 0
           isVisited[r][c] = 1
            queue.push(...link[r][c])
            link[r][c] = []
                }
         table[r-1][c-1] = el
       }

    function updateNumber(arr){
        const [r,c,value] = [+arr[0],+arr[1],arr.at(-1)]
        const isVisited = makeArray(0)   
        const queue = [[r-1,c-1]]
        isVisited[r-1][c-1] = 1
        while(queue.length){
            const [r,c] = queue.shift()
            isVisited[r][c] = 1
            table[r][c] = value
            for(const [x,y] of link[r][c]){
                if(!isVisited[x][y]){
                    queue.push([x,y])
                }
            }
        }
    }
    function updateWord(arr){
        const [value1,value2] = arr
        //value1을 가지고 있는 셀 찾아서 -> 연결된 모든 곳을 다 바꿔줘야함
        const isVisited = makeArray(0)
        for(let r=0;r<row;r++){
            for(let c=0;c<col;c++){
                if(table[r][c] === value1){
                    table[r][c] = value2
                   const queue = [[r,c]]
                    isVisited[r][c] = 1
                     while(queue.length){
                     const [n,m] = queue.shift()
                        isVisited[n][m] = 1
                         table[n][m] = value2
                            for(let [x,y] of link[n][m]){
                         if(!isVisited[x][y]){
                                queue.push([x,y])
                                 }
                }
       } 
                }
            }
        }
    }
return result
   }