function solution(n, m, section) {
    // if(m===1) return section.length;
    let answer = 0;
    let max = 0;
    section.forEach((s) => {
    if (s > max) {
      answer++;
      max = s + m - 1;
    }
    });
    return answer;
}