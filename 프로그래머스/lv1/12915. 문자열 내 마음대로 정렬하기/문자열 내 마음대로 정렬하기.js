function solution(strings, n) {
    let sort = strings.sort()
    let mapped = sort.map((el,i) => {
        return {index:i, value:el[n]}
    })
    let answer = mapped.sort((a,b) => {
        return +(a.value > b.value) || +(a.value === b.value) - 1;
    })
    let result = mapped.map(el => {
      return sort[el.index];
    });
    return result;
}