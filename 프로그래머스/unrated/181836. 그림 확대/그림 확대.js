function solution(picture, k) {
    var answer = [];
    for(let i=0; i<picture.length; i++) {
        let str = ''
        for(let j=0; j<picture[i].length; j++) {
           str += picture[i][j].repeat(k)
        }
        for(let n=0; n<k; n++) {
            answer.push(str)
        }
        
    }
    return answer;
}