function solution(num, k) {
    let arr = [...(num+'')]
    for(let i=0; i<arr.length; i++) {
        console.log(arr[i])
        if(arr[i] == k) {
            return i+1
        }
    }
     return -1
}