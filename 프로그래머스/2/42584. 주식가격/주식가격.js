function solution(prices) {
    const stack = [];
    const dp = Array.from({length : prices.length}, (_, i) => prices.length - i - 1);
    
    prices.forEach((price, index) => {
        while(stack.length && prices[stack[stack.length - 1]] > price) {
            const tempIndex = stack[stack.length - 1];
            dp[tempIndex] = index - tempIndex;
            stack.pop();
        }
        stack.push(index);
    });
    
    return dp;
}

// function solution(prices) {
//     const stack = [];
//     const dp = Array.from({length : prices.length}, (_, i) => prices.length - i - 1);

//     prices.forEach((price,index) => {
//         while(stack.length && prices[stack[stack.length - 1]] > price){
//             const tempIndex = stack[stack.length - 1];
//             dp[tempIndex] = index - tempIndex; 
//             stack.pop();
//         };
//         stack.push(index); 
//     });

//     return dp;
// }