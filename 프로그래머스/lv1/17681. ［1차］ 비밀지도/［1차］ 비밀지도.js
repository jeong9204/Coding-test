function solution(n, arr1, arr2) {
    let answer1 = arr1.map(el => {
        return el.toString(2).padStart(n, '0')
    });
    let answer2 = arr2.map(el => {
        return el.toString(2).padStart(n, '0')
    });
    let arr = answer1.reduce((a,b,i) => {
        let arr3 = '';
        for(let j=0; j<b.length; j++) {
            const c = answer2[i]
            if(b[j] === '0' && c[j] === '0') {
                arr3 += ' '
            } else {
                arr3 += '#'
            }
        }
        a.push(arr3)
       return a; 
    },[])
    console.log(answer1)
    console.log(answer2)
    return arr;
}