function solution(arr, k) {
    let result = [];
    if(k % 2 === 0) {
        return arr.reduce((a,b) => {
            a.push(b+k)
            return a
        },[])  
    } else {
        return arr.reduce((a,b) => {
            a.push(b*k)
            return a
        },[])  
    }
}