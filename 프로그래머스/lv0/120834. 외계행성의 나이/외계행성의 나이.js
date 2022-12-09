function solution(age) {
    var answer = [];
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let arr = age.toString().split('');
    for(let i=0; i<arr.length; i++) {
        answer.push(alphabet[arr[i]])
    }
    return answer.join('');
}