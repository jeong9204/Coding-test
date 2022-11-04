function solution(arr) {
    let answer = [...arr].sort((a,b) => a-b).shift();
    for(let i=0; i<=arr.length; i++) {
        if(arr[i] === answer) {
            arr.splice(i,1)
            i--;
        }
    }
    
    return arr.length > 0 ? arr : [-1];
}