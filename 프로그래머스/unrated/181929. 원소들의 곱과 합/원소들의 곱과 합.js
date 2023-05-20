function solution(num_list) {
    let sort = num_list.sort((a,b) => a-b)
    let sum = sort.reduce((a,b) => a+b);
    let multiplication = sort.reduce((a,b) => a*b);
    if((sum*sum) < multiplication) {
        return 0
    } else {
        return 1
    }
}