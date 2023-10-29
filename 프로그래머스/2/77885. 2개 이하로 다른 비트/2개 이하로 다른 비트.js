function solution(numbers) {
    return numbers.map((v,i) => {    
        let toStr = v.toString(2).split('').reverse().indexOf('0')
        if(toStr === -1) return v + 2 ** (v.toString(2).length - 1)
        return v + Math.ceil(2 ** (toStr -1))
    });
}

// function solution(numbers) {
//     var answer = [];
//     for(let i in numbers) {
//         let num = i;
//         let cnt = 0;
//         while(i%2 === 1) {
//             cnt +=1
//             i /= 2;
//             answer.push(cnt !== 0 ? num + Math.pow(2, cnt - 1) : num + 1);
//         }
        
//     }
//     return answer;
// }

// def solution(numbers):
//     answer = []
//     for i in numbers:
//         num = i
//         cnt = 0
//         while i % 2 == 1:
//             cnt += 1
//             i //= 2
//         answer.append(num + 2**(cnt - 1) if cnt != 0 else num + 1)

//     return answer