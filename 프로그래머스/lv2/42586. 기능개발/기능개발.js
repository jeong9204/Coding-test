function solution(progresses, speeds) {
    const restday = [];
    const length = progresses.length;
    
    for(let i=0; i<length; i++) {
        restday.push(Math.ceil((100-progresses[i])/speeds[i]));
    }
    // console.log(restday);
    
    let distribution_number = 1;
    var answer = [];
    let firstwork = restday[0];
    for(let i=1; i<length; i++) {
        if(firstwork >= restday[i]) {
            distribution_number+=1;
        } else {
            answer.push(distribution_number);
            distribution_number = 1;
            firstwork = restday[i];
        }
    }
    answer.push(distribution_number);
    return answer;
}

// function solution(progresses, speeds) {
//     let restday = []
//     let length = progresses.length;

//     // 1. 남은날 구하기
//     for(let i = 0; i < length; i++)
//         restday.push(Math.ceil((100-progresses[i])/speeds[i]));

//     console.log(restday);
//     // 2. 답구하기 
//     let distribution_number = 1;
//     let answer = []
//     let firstwork = restday[0];
//     for(let i = 1 ; i < length; i++){
//         if(firstwork >= restday[i]){
//             distribution_number+=1;
//         }else{ // firstwork < restday[i] -> 작다가 커지는 경우 
//             answer.push(distribution_number); 
//             distribution_number=1;
//             firstwork = restday[i];
//         }
//     }
//     // 맨 마지막에 포함되지 않은 것들 or [5,4,3,2,1] 같은 것들  
//     answer.push(distribution_number);
//     return answer;
// }