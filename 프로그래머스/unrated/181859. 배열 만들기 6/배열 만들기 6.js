function solution(arr) {
    let str = [];
    for(let i=0; i<arr.length; i++) {
        if(str.length === 0) {
            str.push(arr[i])
            continue;
        } else if(str.length > 0) {
            if(str[str.length-1] === arr[i]) {
                str.pop();
                continue;
            } else if(str[str.length-1] !== arr[i]) {
               str.push(arr[i])
                continue;
            }
        }
    }
    return str.length === 0 ? [-1] : str;
}