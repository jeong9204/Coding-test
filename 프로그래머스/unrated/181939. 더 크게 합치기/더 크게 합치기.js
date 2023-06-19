function solution(a, b) {
    let ab = a.toString() + b.toString()
    let ba = b.toString() + a.toString()
    if(+ab === +ba) {
        return +ab
    } else if(+ab > +ba) {
        return +ab
    } else {
        return +ba
    }
}