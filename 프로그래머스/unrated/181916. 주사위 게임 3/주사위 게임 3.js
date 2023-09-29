function solution(a, b, c, d) {
    const maxValue = Math.max(a,b,c,d) , minValue = Math.min(a,b,c,d)
    let maxCount=0,minCount=0
    const arr = [a,b,c,d]
    arr.forEach((diceCount)=>{
        if(diceCount === maxValue){
            maxCount++
        }
        else if(diceCount === minValue){
            minCount++
        }
    })
    // 네 주사위 같은 경우
    if(maxCount === 4){
        return 1111 * maxValue
    }
    // 세 주사위 같은 경우
    if(maxCount === 3){
        return Math.pow(10*maxValue+minValue,2)
    }
    if(minCount === 3){
        return Math.pow(10*minValue+maxValue,2)
    }
    // 두 주사위가 두 그룹이 같은 경우
    if(maxCount === 2 && minCount === 2){
        return (maxValue+minValue) * Math.abs(maxValue-minValue)
    }
    // 두 주사위가 한 그룹만 같은 경우
    if(a===b){
        return c*d
    }
    if(a===c){
        return b*d
    }
    if(a===d){
        return b*c
    }
    if(b===c){
        return a*d
    }
    if(b===d){
        return a*c
    }
    if(c===d){
        return a*b
    }
    // 그외 
    return minValue
}