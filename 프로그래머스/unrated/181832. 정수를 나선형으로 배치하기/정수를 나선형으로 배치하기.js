function solution(n) {
    const Arr =  Array.from(Array(n), () => Array(n).fill(null))
    let rowIdx=0,colIdx=0,searchLength=n-1,i = 1
    while(i<=n*n){
        if(rowIdx === (n-1)/2 && colIdx === (n-1)/2){
            Arr[rowIdx][colIdx] = i++
        }
        for(let j=0;j<searchLength;j++){
            Arr[rowIdx][colIdx] = i++
            colIdx++
        }
        for(let j=0;j<searchLength;j++){
            Arr[rowIdx][colIdx] = i++
            rowIdx++
        }
        for(let j=0;j<searchLength;j++){
            Arr[rowIdx][colIdx] = i++
            colIdx--
        }
        for(let j=0;j<searchLength;j++){
            Arr[rowIdx][colIdx] = i++
            rowIdx--
        }
        searchLength -= 2
        colIdx++
        rowIdx++
    }
    return Arr
}