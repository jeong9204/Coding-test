function solution(s, n) {
    return [...s].reduce((a,b) => {
        let num = b.charCodeAt()
        if(65 <= num && num <= 90) {
            if(num+n > 90) {
                a= a+String.fromCharCode(64+((num+n) - 90))
            } else {
                a= a+String.fromCharCode(num+n)
            }
           
        } else if(97 <= num && num <= 122) {
            if(num+n > 122) {
                a= a+String.fromCharCode(96+((num+n) - 122))
            } else {
                a= a+String.fromCharCode(num+n)
            }
        } else if(b === ' ') {
           a= a+' '
        }
        return a
    }
    ,'');
}