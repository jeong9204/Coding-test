function solution(my_string) {
    var answer = my_string.replaceAll(/[a-z]/ig,' ').split(' ');
    return answer.reduce((a,b) => +a + +b, 0);
}