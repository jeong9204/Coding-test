function solution(word) {
    const stack1 = ['A','E','I','O','U'],stack2=[],stack3 = [],stack4 = [],stack5 = []

    stack1.forEach(str=>{
        for(let i=0;i<=4;i++){
            stack2.push(str.concat(stack1[i]))
        }
    })

    stack2.forEach(str=>{
        for(let i=0;i<=4;i++){
            stack3.push(str.concat(stack1[i]))
        }
    })

    stack3.forEach(str=>{
        for(let i=0;i<=4;i++){
            stack4.push(str.concat(stack1[i]))
        }
    })

    stack4.forEach(str=>{
        for(let i=0;i<=4;i++){
            stack5.push(str.concat(stack1[i]))
        }
    })

    const words = [...stack1,...stack2,...stack3,...stack4,...stack5]

    words.sort()
    const answer = words.indexOf(word) + 1
    return answer
}