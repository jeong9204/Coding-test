function solution(chicken) {
    let result = 0;
    let temp = chicken % 10;
    let answer = Math.floor(chicken / 10);
    result += answer;
    console.log("temp-1", answer);
    console.log("temp-11", temp);
    answer += temp;
    console.log("temp", answer);

    while(1) {
        temp = answer % 10;
        answer = Math.floor(answer / 10);
        result += answer;
        console.log("temp-2", answer);
        if (answer === 0) {
            break;
        }
        answer += temp;
        console.log("temp", answer);
    }

    return (result);
}