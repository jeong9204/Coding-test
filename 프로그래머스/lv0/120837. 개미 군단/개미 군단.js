function solution(hp) {
    var answer = 0;
    let num = 0;
    if(hp>=5) {
        num = parseInt(hp/5)
        hp = hp-(num*5)
        answer += num
    }
    if(hp>=3) {
        num = parseInt(hp/3)
        hp = hp-(num*3)
        answer += num
    }
    if(hp<3) {
        answer += hp
    }
    console.log(hp)
    console.log(num)
    return answer
}