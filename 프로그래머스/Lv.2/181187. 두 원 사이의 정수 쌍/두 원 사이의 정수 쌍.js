const getDotCount = (r,isIncludeBorderCount)=>{
    let dotCount = 0

    for(let i=1;i<=r;i++){
        const range = Math.sqrt(Math.pow(r,2)-Math.pow(i,2))
        const floorRange = Math.floor(range)

        // 테두리를 체크 분기 처리 
        if(isIncludeBorderCount){
            dotCount += floorRange
        }
        else{
            // 테두리를 Count 하지 않을 때 테두리가 정수 좌표가 가능할 때 테두리 정수 좌표 제거 (-1) 
            if(range === floorRange){
                dotCount += (floorRange-1)
            }
            // 테두리를 Count 하지 않을 때 테두리가 정수 좌표가 불가능할 때 
            else{
                dotCount += floorRange
            }
        }
    }

    dotCount = dotCount * 4 + r * 4 + 1
    return dotCount
}

function solution(r1, r2) {
    const r22 = getDotCount(r2,true)
    const r11 = getDotCount(r1,false)
    return r22 - r11
}