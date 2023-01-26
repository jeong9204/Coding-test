function solution(s) {
    let arr = s.split(" ")
    let answer = [];
    for(let i = 0; i<arr.length; i++) {
        if(arr[i] !== 'Z') {
          // console.log(arr[i])
          answer.push(parseInt(arr[i]))
      } else {
          answer.pop(parseInt(arr[i-1]))
      }
    }
    
    let sum = answer.reduce((a,b) => a+b,0)
    
    return sum;
}