function solution(arr, intervals) {
    let arr1 = arr.slice(intervals[0][0], intervals[0][1]+1)
    let arr2 = arr.slice(intervals[1][0], intervals[1][1]+1)
    return [...arr1, ...arr2]
}