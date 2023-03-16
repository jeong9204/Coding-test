function solution(s, skip, index) {
//     let skipChar = [...skip].reduce((a,b) => {
//         a.push(b.charCodeAt())
//         return a
//     },[]);
    
//     return [...s].reduce((a,b) => {
//         let numChar = b.charCodeAt()
        
//         if(65 <= num && num <= 90) {
//             if(num+index > 90) {
//                 a= a+String.fromCharCode(64+((num+index) - 90))
//             } else {
//                 a= a+String.fromCharCode(num+index)
//             }
           
//         } else if(97 <= num && num <= 122) {
//             if(num+index > 122) {
//                 a= a+String.fromCharCode(96+((num+index) - 122))
//             } else {
//                 a= a+String.fromCharCode(num+index)
//             }
//         }
//         return a
//     }
//     ,'');
    
    var answer = '';
    const skipCode = skip.split('').map(c => c.charCodeAt(0))
    const converted = s.split('').map(c => {
        let convert = c.charCodeAt(0)
        for (let i = 0; i < index; i++) {
            convert++;
            while (skipCode.includes(convert)) convert++;

            if (convert == 'z'.charCodeAt(0) + 1) convert = 'a'.charCodeAt(0)
            while (skipCode.includes(convert)) convert++;
        }
        return convert
    })
    answer = String.fromCharCode(...converted)
    return answer;
}