function solution(s) {
    if(+s) return +s;
    let numbers = [
        {name:'zero', num:0},
        {name:'one', num:1},
        {name:'two', num:2},
        {name:'three', num:3},
        {name:'four', num:4},
        {name:'five', num:5},
        {name:'six', num:6},
        {name:'seven', num:7},
        {name:'eight', num:8},
        {name:'nine', num:9},
    ]
    for(let i=0; i<numbers.length; i++) {
        const length = numbers[i].name.length
        //console.log(length)
       if(s.includes(numbers[i].name)) {
           s = s.replace(new RegExp(numbers[i].name, "g"), numbers[i].num)
       } else {
           s
       }
           
    }
    console.log(s)
    return +s;
}