function solution(arr, delete_list) {
    // var answer = [...arr];
    // for(let i=0; i<arr.length; i++) {
    //     if(arr.includes(delete_list[i])) {
    //         console.log(delete_list[i])
    //        answer.splice(delete_list[i]) 
    //     }
    // }
    // return answer;
    
    return arr.filter(x => !delete_list.includes(x))
}