function solution(n)
{
    var answer = 0;
    var arr = n.toString().split('')
    
    answer = arr.reduce((a,b) => Number(a)+Number(b),0);

    return answer;
}