function solution(numbers) {
   let num = numbers.sort((a,b) => a-b);
   let answer = 0
   for(let i=0; i<=9; i++) {
       answer += (num.includes(i) ? 0 : i)
   }
   return answer
}