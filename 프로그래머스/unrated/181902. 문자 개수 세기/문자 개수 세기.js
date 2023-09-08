function solution(my_string) {
    let answer = new Array(52).fill(0);
    let str = [...my_string]
    for(let i=0; i<str.length; i++) {
        let num = str[i].charCodeAt()
        if(num >= 65 && num <= 90) {
            answer[num - 65] += 1
        }
        if(num >= 97 && num <= 122) {
            answer[num - 97 + 26] += 1
        }
    }
    return answer;
}