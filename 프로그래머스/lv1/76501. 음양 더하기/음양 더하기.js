function solution(absolutes, signs) {
    // let arr = [];
    // for(let i =0; i<absolutes.length; i++) {
    //     if(signs[i] === true) {
    //         arr.push(absolutes[i])
    //     } else {
    //          arr.push(absolutes[i] * -1)
    //     }
    // }
    // return arr.reduce((a,b) => a+b)
    
   return absolutes.reduce((a,b,i) => {
       if(signs[i] === false) {b= -b}
        return a + b
    },0)
}