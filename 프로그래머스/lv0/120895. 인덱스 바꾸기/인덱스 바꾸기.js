function solution(my_string, num1, num2) {
//     let answer = [...my_string];
    
//     let str1 = answer[num1];
//     let str2 = answer[num2];
    
//     answer.splice(num1,1,str2);
//     answer.splice(num2,1,str1);
    
//     return answer.join('');
    
    my_string = my_string.split('');
    [my_string[num1], my_string[num2]] = [my_string[num2], my_string[num1]];
    return my_string.join('');
}