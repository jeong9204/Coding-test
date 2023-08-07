function solution(arr) {
    let answer = [...arr]
    let length = arr.length;
    let num = 1
    while(num<length) num *= 2;
    for(let i=0; i<(num-length); i++) {
        answer.push(0)
    };
    return answer;
}

// const answer = [...arr];
//     let minLength = 1;    
//     while(minLength < arr.length) minLength *= 2;

//     for(let i = 0; i < (minLength - arr.length); i++){
//         answer.push(0);
//     };

//     return answer;