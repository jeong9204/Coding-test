function solution(str_list) {
    var answer = [];
    if(str_list.indexOf('l') === -1 && str_list.indexOf('r') === -1) {
        return []
    }
    
    for(let i=0; i<str_list.length; i++) {
        if(str_list[i] === 'l') {
            return answer = str_list.slice(0, i);
        } else if(str_list[i] === 'r') {
            return answer = str_list.slice(i+1);
        }
    }
}