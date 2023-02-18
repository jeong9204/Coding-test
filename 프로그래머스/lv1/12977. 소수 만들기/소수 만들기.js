let sieve = new Array(3001).fill(true);
for (let i = 2; i * i < sieve.length; i += 1) {
  if (!sieve[i]) continue;
  for (let j = i + i; j < sieve.length; j += i) {
    sieve[j] = false;
  }
}
function solution(nums) {
  var answer = 0;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const index = nums[i] + nums[j] + nums[k];
        if (sieve[index]) {
          answer += 1;
        }
      }
    }
  }

  return answer;
}
