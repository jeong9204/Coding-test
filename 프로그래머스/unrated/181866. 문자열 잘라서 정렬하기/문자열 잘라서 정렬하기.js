function solution(myString) {
    let arr = myString.split('x').sort();
    let filtered  = arr.filter(function(item) {
     return item !== null && item !== undefined && item !== '';
    });
    return filtered
}