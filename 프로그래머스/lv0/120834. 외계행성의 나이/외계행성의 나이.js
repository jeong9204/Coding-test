function solution(age) {
    var answer = [];
    let alphabet = ['a','b','c','d','e','f','g','h','i','j'];
    let arr = age.toString().split('');
    for(let i=0; i<arr.length; i++) {
        answer.push(alphabet[arr[i]])
    }
    return answer.join('');
}