function solution(phone_number) {
    var answer = '';
    let num = phone_number.split('').reverse().slice(0,4).reverse().join('');
    let str = '';
    for(let i=0; i<phone_number.length - 4; i++) {
        str += "*"
    }
    answer = str+num
    
    return answer;
}