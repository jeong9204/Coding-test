function solution(my_string, queries) {
    var answer = '';
    for(let i=0; i<queries.length; i++) {
        const s = queries[i][0];
        const e = queries[i][1];
        const target = my_string.slice(s, e + 1);
        
        my_string = my_string.slice(0, s) + target.split('').reverse().join('') + my_string.slice(e+1)
    }
    return my_string;
}

// function solution(my_string, queries) {
//     var answer = '';
//     for(let i=0; i<queries.length; i++) {
//         my_string = my_string.slice(0, queries[i][0]) + 
//             my_string.slice(queries[i][0], queries[i][1]+1).split(',').reverse().join() + 
//             my_string.slice(queries[i][1]+1)
//         console.log('0', my_string)
//         console.log('1', my_string.slice(0, queries[i][0]))
//         console.log('2', my_string.slice(queries[i][0], queries[i][1]+1).split(',').reverse().join())
//         console.log('3', my_string.slice(queries[i][1]+1))
//     }
//     return answer;
// }

// function solution(my_string, queries) {
//     return queries.reduce((acc, cur) => {
//         const [s, e] = cur;
//         const target = acc.slice(s, e + 1);

//         acc = acc.slice(0, s) + target.split('').reverse().join('') + acc.slice(e + 1);

//         return acc;
//     }, my_string);
// }