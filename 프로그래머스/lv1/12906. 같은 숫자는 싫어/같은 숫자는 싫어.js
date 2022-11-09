function solution(arr){
  let answer = arr.reduce((acc,cur) => {
       let length = acc.length;
         if(length === 0 || acc[length-1] !== cur) {
             acc.push(cur);
        }
       return acc
       
    },[])
    return answer;
}