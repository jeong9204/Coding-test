function solution(phone_number) {
    var answer = '';
    let length = phone_number.length - 4;
    let num = phone_number.split('').reverse().slice(0,4).reverse().join('');
    let str = '';
    for(let i=0; i<length; i++) {
        str += "*"
    }
    answer = str+num
    
    return answer;
}