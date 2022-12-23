function solution(my_string) {
    var answer = [...my_string].reduce((a,b) => {
        console.log(b.charCodeAt())
        if (b.charCodeAt() >= 65 && b.charCodeAt() <= 90) {
            a += b.toLowerCase()
        } else if(b.charCodeAt() >= 97 && b.charCodeAt() <= 122) {
            a += b.toUpperCase()
        } 
        return a
    }, '');
    
    return answer;
}