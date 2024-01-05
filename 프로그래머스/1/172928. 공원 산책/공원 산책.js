function solution(park, routes) {
    const maxRow = park.length, maxCol = park[0].length
    const Routes = routes.map(route=>{
        const [op,n] = route.split(' ')
        return {op,n:Number(n)}
    })

    let sRowIdx,sColIdx
    for(let rowIdx=0;rowIdx<park.length;rowIdx++){
        const sIndex = park[rowIdx].indexOf('S')
        if(sIndex > -1){
            sRowIdx = Number(rowIdx)
            sColIdx = Number(sIndex)
            break
        }
    }

    Routes.forEach(({op,n})=>{
        if(op === 'E'){
            if(sColIdx + n < maxCol){
                let isX = false
                for(let i=sColIdx+1;i<sColIdx+1+n;i++){
                  if(park[sRowIdx][i] === 'X'){
                      isX = true
                      break
                  }
                }
                if(!isX){
                    sColIdx += n
                }
            }
        }
        else if(op === 'W'){
            if(sColIdx - n >= 0){
                let isX = false
                for(let i=sColIdx-1;i>sColIdx-1-n;i--){
                  if(park[sRowIdx][i] === 'X'){
                      isX = true
                      break
                  }
                }
                if(!isX){
                    sColIdx -= n
                }
            }
        }
        else if(op === 'S'){
            if(sRowIdx + n < maxRow){
                let isX = false
                for(let i=sRowIdx+1; i<sRowIdx+1+n;i++){
                    if(park[i][sColIdx] === 'X'){
                        isX = true
                        break
                    }
                }
                if(!isX){
                    sRowIdx += n
                }
            }
        }
        else if(op === 'N'){
            if(sRowIdx - n >= 0){
                let isX = false
                for(let i=sRowIdx-1; i>sRowIdx-1-n;i--){
                    if(park[i][sColIdx] === 'X'){
                        isX = true
                        break
                    }
                }
                if(!isX){
                    sRowIdx -= n
                }
            }
        }
    })
    const answer = [sRowIdx,sColIdx]
    return answer
}