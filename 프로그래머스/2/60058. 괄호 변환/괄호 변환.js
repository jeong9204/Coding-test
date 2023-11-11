const balancedString = (string)=>{
    const stack = []
    let leftWrapCount=0,rightWrapCount=0
    for(let i=0;i<string.length;i++){
        if(string[i] === '('){
            stack.push('(')
            leftWrapCount++
        }
        else{
            stack.push(')')
            rightWrapCount++
        }

        if(leftWrapCount === rightWrapCount){
            break
        }
    }

    return [stack.join(''),string.slice(stack.length)]
}

const isCorrectString = (string)=>{
    const stack = []
    for(let i=0;i<string.length;i++){
        if(stack[stack.length-1]==='(' && string[i] === ')'){
            stack.pop()
        }
        else{
            stack.push(string[i])
        }
    }
    return stack.length === 0
}

const process = (string)=>{
    // 1.
    if(string === ''){
        return ''
    }

    // 2.
    const [u,v] = balancedString(string)

    // 3.
    if(isCorrectString(u)){
        // 3-1
        const result = u + process(v)
        return result
    }
    // 4.
    else{
        // 4-4
        const convertU = (u)=>{
            return u.substr(1,u.length-2).split('').map(v=>v===')' ? '(' :')').join('')
        }
        // 4-1 ~ 4-3
        const result = '('.concat(process(v)).concat(')') + convertU(u)
        // 4-5
        return result
    }
}

function solution(p) {
    const answer = process(p)
    return answer
}