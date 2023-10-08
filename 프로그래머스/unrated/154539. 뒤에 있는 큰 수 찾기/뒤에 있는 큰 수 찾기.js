function solution(numbers) {
    var answer = [];
    let maxnum = 0;
    let stack = [];
    
    for(let i=numbers.length-1; i>=0; i--) {
        if(maxnum <= numbers[i]) {
            maxnum = numbers[i];
            answer.push(-1);
            stack = [];
            stack.push(numbers[i])
        } else {
            let j=0;
            while(1) {
                if(numbers[i]<stack[j]) {
                    answer.push(stack[j]);
                    stack.unshift(numbers[i]);
                    break;
                } else {
                    stack.shift();
                }
            }
        }
    }
    answer.reverse();
    return answer;
}

// function solution(numbers) {
//     var answer = [];

//     //풀이
//     //numbers를 조회
//     //조회한 배열을 담을 변수 stack 생성
//     //배열을 뒤에서부터 조회하되, 가장 큰 숫자 변수를 생성하고 비교해서 가장 큰 정수가 나올 경우,stack 배열 초기화
//     //answer에는 -1을 push

//     //아닐 경우, stack을 앞에서부터 조회.
//     //stack[j]가 지금 num변수보다 작을 경우, stack[j]변수가 stack에 담겨있을 필요가 없으므로 shift(연산 최소화를 위해)
//     //클 경우 stack[j]를 answer에 push하고 stack에 numbers[i]를 unshift 

//     let maxnum = 0;
//     let stack = [];
//     for(let i=numbers.length-1; i>=0; i--){
//         if(maxnum<=numbers[i]){
//             maxnum = numbers[i];
//             answer.push(-1);
//             stack = [];
//             stack.push(numbers[i]);
//         }else{
//             let j=0;
//             while(1){
//               if(numbers[i]<stack[j]){
//                  answer.push(stack[j]);
//                  stack.unshift(numbers[i]); 
//                  break;
//                }else{
//                    stack.shift();
//                }
//             } 
//         }
//     }


//     answer.reverse();

//     return answer;
// }