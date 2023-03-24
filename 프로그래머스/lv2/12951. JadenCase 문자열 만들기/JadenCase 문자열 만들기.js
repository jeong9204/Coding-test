function solution(s) {
    const txt = s.split('')
    let nextUpper = true;
    const converted = txt.map(c => {
        if (c == " ") { 
            nextUpper = true; 
            return c 
        }else if (nextUpper) {
            nextUpper = false; 
            return c.toUpperCase(); 
        }else {
            return c.toLowerCase(); 
        }
    })
    return converted.join("")
}