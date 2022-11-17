function solution(a, b) {
    let answer = new Date(2016,a-1,b);
    const weekday = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    return weekday[answer.getDay()];
}