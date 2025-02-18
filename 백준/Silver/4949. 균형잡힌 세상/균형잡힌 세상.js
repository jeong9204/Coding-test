const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const results = [];

rl.on('line', (line) => {
    if (line === '.') {
        console.log(results.join('\n'));  // 모든 결과 출력 후 종료
        rl.close();
        return;
    }
    results.push(isBalanced(line) ? "yes" : "no");
});

function isBalanced(str) {
    const stack = [];
    
    for (const char of str) {
        if (char === '(' || char === '[') {
            stack.push(char); // 여는 괄호면 스택에 추가
        } else if (char === ')') {
            if (stack.pop() !== '(') return false; // 올바른 짝이 아니면 false
        } else if (char === ']') {
            if (stack.pop() !== '[') return false;
        }
    }
    
    return stack.length === 0; // 스택이 비어있으면 균형 잡힘
}
