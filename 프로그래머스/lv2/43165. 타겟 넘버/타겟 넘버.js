function solution(numbers, target) {
    const stack = []
    const addTarget = (tried,sum,stack)=>{
        if(numbers.length === tried){
            if(sum === target){
                stack.push(true)
            }
            return 
        }

        addTarget(tried+1,sum+numbers[tried],stack)
        addTarget(tried+1,sum-numbers[tried],stack)
    }

    addTarget(0,0,stack)

    return stack.length
}