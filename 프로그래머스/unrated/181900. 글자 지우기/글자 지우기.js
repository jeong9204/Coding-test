function solution(my_string, indices) {
    let arr = [...my_string]
    let sort = indices.sort((a,b) => a-b)
    for(let i=0; i<indices.length; i++) {
        arr.splice(sort[i],1,' ')
    }
    let answer  = arr.filter(function(item) {
     return item !== ' ';
    });
    return answer.join('')
}