function solution(topping) {
    const length = topping.length;
    if (length === 1) return 0;

    const leftDict = {}; 
    const rightDict = {};
    let leftTopping = 0; 
    let rightTopping = 0;
    let answer = 0;

    if (length === 1) return 0;
    for (let i = 0; i < length; i++) {
        if (leftDict[topping[i]] === undefined) {
            leftDict[topping[i]] = 1;
            leftTopping += 1;
        } else leftDict[topping[i]] += 1;
    }
    
    for (let i = length - 1; i >= 0; i--) {
        if (rightDict[topping[i]] === undefined) {
            rightDict[topping[i]] = 1;
            leftDict[topping[i]] -= 1;
            rightTopping += 1;
            if (leftDict[topping[i]] === 0) {
                leftTopping -= 1;
            }
        } else {
            rightDict[topping[i]] += 1;
            leftDict[topping[i]] -= 1;
            if (leftDict[topping[i]] === 0) {
                leftTopping -= 1;
            }
        }
        if (leftTopping === rightTopping) answer += 1;
    }
    return answer;
}