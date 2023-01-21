function solution(chicken) {
    // 치킨의 초기 값은 1081장
    let result = 0;
    let temp = chicken % 10; // 108개를 주문하면 쿠폰은 1개가 남는다.
    let answer = Math.floor(chicken / 10); // 108개의 닭 주문, 108 쿠폰 발급
    result += answer;
     console.log("temp-1", answer);
    answer += temp;
     console.log("temp", answer);

    while(1) {
        temp = answer % 10;
        answer = Math.floor(answer / 10); // 10
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