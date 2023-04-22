function solution(n)
{
    if(n===1) {return 1}
    let ans = 0;
    while (n !== 0) {
    if (Number.isInteger(n / 2)) {
      n = n / 2;
    } else {
      n = (n - 1) / 2;
        ans++;
      
    }
  }

    return ans;
}