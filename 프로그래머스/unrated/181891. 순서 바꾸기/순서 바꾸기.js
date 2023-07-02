function solution(num_list, n) {
    let arr1 = num_list.slice(n);
    let arr2 = num_list.slice(0,n);
    return [...arr1,...arr2]
}