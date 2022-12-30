function solution(s) {
    let arr = [...s].sort();
    
    let answer = [];
    
    while(arr.length > 0)
    {
        let count = 0;
        
        let target = arr[0];
        while(arr.indexOf(target) != -1)
        {
            count += 1;
            let idx = arr.indexOf(target);
            arr.splice(idx, 1);
        }
        
        if(count === 1)
        {
            answer.push(target);
        }
    }
    /*
    let answer = arr.filter((str, index, target) => {
        return target.indexOf(str) === index;
    });
    */
    return answer.join('');
}