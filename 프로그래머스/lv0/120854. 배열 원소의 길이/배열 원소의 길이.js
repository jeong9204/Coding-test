function solution(strlist) {
    var answer = strlist.reduce((a,b) => {
        a.push(b.length)
        return a
    }, []);
    
    return answer;
}