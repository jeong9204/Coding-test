function solution(s) {
    var answer = 0;
    let arr = [...s]
    let slength = s.length;
    for(let i=0; i<slength; i++){
        let first = arr.shift()
        arr.push(first)
        
        const stack = []
        for(const char of arr){
            if(char === '{' || char === '[' || char === '('){
                stack.push(char)
            } else {
                const lastChar = stack.pop()
                if( char === '}' && lastChar !== '{' ||
                     char === ']' && lastChar !== '[' ||
                     char === ')' && lastChar !== '('
                ) {
                    break;
                } else {
                    answer+=1
                }
                console.log(stack)
            }
        }
       
    }
    return answer;
}

function solution(s) {
    const getIsCorrectString = (stringsArr)=>{
        const correctSet = {
            ']' : '[',
            ')' : '(',
            '}' : '{',
        }
        const stack = []
        let isCorrectString = true
        stringsArr.forEach(str=>{
            if(str === '(' || str === '{' || str === '[' ){
                stack.push(str)
            }
            else{
                if(correctSet[str] === stack.at(-1)){
                    stack.pop()
                }
                else{
                    isCorrectString = false
                }
            }
        })
        return stack.length === 0 && isCorrectString
    }

    let answer = 0
    for(let i=0;i<s.length;i++){
        const changedS = [...s.slice(i,s.length), ...s.slice(0,i)]
        const isCorrectString = getIsCorrectString(changedS)
        answer += (isCorrectString)
    }

    return answer
}