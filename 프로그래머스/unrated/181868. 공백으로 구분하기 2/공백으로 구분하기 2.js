function solution(my_string) {
    let answer = ''
    my_string = my_string.trim();
    my_string = my_string.replaceAll(/\s+/g," ");
    answer = my_string.split(" ");
    return answer
}