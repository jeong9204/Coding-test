function solution(n, k) {
    let divideSum = 1, divideN = n-1, calculateK = k-1
    const result = []
    const numbers = Array(n).fill(0).map((_,idx)=>idx+1)

    for(let i=2;i<n;i++){
        divideSum *= i
    }

    while(divideSum !== 1){
        const divide = Math.floor(calculateK / divideSum)
        calculateK -= (divide * divideSum)
        result.push(numbers[divide])
        numbers.splice(divide,1)

        if(divideSum === 2){
            const restNumbers = calculateK === 1 ? numbers.reverse() : numbers
            result.push(...restNumbers)
        }

        divideSum /= divideN
        divideN--
    }

    return result
} 