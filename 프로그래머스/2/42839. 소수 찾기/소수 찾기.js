function solution(numbers) {
    let answer = 0;
    const numArr = numbers.split("");
    const n = numArr.length;
    const ch = Array.from({ length: n }, () => 0);
    let temp = Array.from({ length: n }, () => 0);
    const tempSet = new Set();

    function isPrime(number) {
        if (number <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

    function DFS(depth, length) {
        if (depth === length) {
            const num = parseInt(temp.slice(0, length).join(""));
            if (num !== 0 && !tempSet.has(num) && isPrime(num)) {
                tempSet.add(num);
                answer++
            }
        } else {
            for (let i = 0 ; i < n ; i++) {
                if (ch[i] === 0) {    
                    ch[i] = 1;
                    temp[depth] = numArr[i]
                    DFS(depth + 1, length);
                    ch[i] = 0;
                }
            }
        }
    }

    for (let length = 1; length <= n ; length++) {        
        DFS(0, length);
    }

    return answer;
}