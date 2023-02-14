function solution(n) {
    // var answer = 0;
    // let arr = [];
    // for(let i=2; i<n; i++) {
    //     if(n%i === 0) continue;
    //     answer +=1
    //     arr.push(i)
    // }
    // console.log(arr)
    // return answer;
    
    const prime = new Array(n+1).fill(1);
    let count = n-1;
    for (let i=2; i<Math.sqrt(n); i++)
        if (prime[i])
            for (let j=i**2; j<=n; j+=i)
                if (prime[j]) count--, prime[j]=0;
    return count;
}