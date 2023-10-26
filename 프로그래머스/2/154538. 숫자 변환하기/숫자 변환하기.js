function solution(x, y, n) {
    let answer = -1
    const stack = [{num:y,tried:0}]
    while(stack.length !== 0){
        const {num,tried} = stack.shift()

        if(num === x){
            answer = tried
            break;
        }

        if(num%2 === 0){
            stack.push({num:num/2, tried:tried+1})
        }
        if(num%3 === 0){
            stack.push({num:num/3, tried:tried+1})
        }
        if(num-n >= x){
            stack.push({num:num-n, tried:tried+1})
        }
    }
    return answer
}