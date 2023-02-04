function solution(dots) {
    let x_dot = dots.map(dot => dot[0]);
    let y_dot = dots.map(dot => dot[1]);
    let answer = (Math.max(...x_dot) - Math.min(...x_dot)) * (Math.max(...y_dot) - Math.min(...y_dot));

    return answer;
}