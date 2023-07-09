function solution(my_string, index_list) {
    let arr = [...my_string]
    
    return index_list.reduce((a,b) => {
        return a += arr[b]
    },'');
}