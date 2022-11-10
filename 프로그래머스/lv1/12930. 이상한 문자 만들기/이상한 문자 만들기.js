function solution(s) {
    var answer = s.split(' ');
    let arr = [];
    for(let i=0; i<answer.length; i++) {
        arr.push( [...answer[i]].reduce((a,b,i) => {
           console.log('a:',a,"b:",b,"i:",i) 
            if(i % 2 === 0) {
               return a + b.toUpperCase()
            }
             return a + b.toLowerCase()
        }, ''))
    }
    console.log(arr.join(' '))
    return arr.join(' ');
}