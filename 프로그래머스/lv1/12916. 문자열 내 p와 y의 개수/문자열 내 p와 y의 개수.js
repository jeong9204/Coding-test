function solution(s){
    // let arr = [...s]
    // let p = arr.filter(el => el === 'p' || el === 'P');
    // let y = arr.filter(el => el === 'y' || el === 'Y');
    // return p.length === y.length ? true : false;
    
   return s.replace(/p/ig,'').length === s.replace(/y/ig,'').length ? true : false
}