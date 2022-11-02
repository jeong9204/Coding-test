function solution(s){
    let p = [...s].filter(el => el === 'p' || el === 'P');
    let y = [...s].filter(el => el === 'y' || el === 'Y');

    return p.length === y.length ? true : false;
}