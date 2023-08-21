function solution(arr, queries) {
    for(let query of queries) {
        for(let i=query[0]; i<=query[1]; i++) {
            arr[i] += 1;
        }
    }
    return arr;
}