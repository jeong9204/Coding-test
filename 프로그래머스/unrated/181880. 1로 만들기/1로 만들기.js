function solution(num_list) {
    return num_list.reduce((a,b) => {
        while(b !== 1) {
            b = b % 2 ? (b-1)/2 : b/2
            a++
        }
        return a
    },0)
}

// return num_list.reduce((a,b,i) => {
//         if(b % 2 === 0) {
//             b = b/2
//             a+=1
//         } else if(b % 2 !== 0) {
//             b = (b-1)/2
//             a+=1
//         } else if (b===1) {
//             a+=0
//             continue;
//         }
//         return a
//     },0)