function solution(arr) {
    return arr.reduce((a,b) => {
        if(b % 2 === 0 && b>=50) {
            a.push(b/2)
        } else if (b % 2 !== 0 && b<=50) {
            a.push(b*2)
        } else {
            a.push(b)
        }
      return a  
    },[]);
}