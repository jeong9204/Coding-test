function solution(money) {
    var answer = 0;
    let num = money;
    if(money < 5500) return [0, money];
    
    while(true) {
        if (num < 5500){
            break;
        }
        num = num - 5500
        answer++
    }
    return [answer, num];
}