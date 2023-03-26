function solution(s){
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if(s[i] === '('){
           stack.push(s[i])
         } else {
             const lastChar = stack.pop()
             if(s[i] === ')' && lastChar !== '('){
                 return false;
             }
         }
    }
    
    return stack.length === 0;
}