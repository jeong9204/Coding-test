function solution(phone_book) {
    let sort = phone_book.sort()
    for(let i=0; i<phone_book.length -1; i++) {
        let nextString = sort[i+1].substring(0, sort[i].length);
        if(sort[i] === nextString) {
            return false;
        }
    }
    return true;
}