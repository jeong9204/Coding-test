function solution(n, info) {
    const aScore = info.map((el, i) => el ? 10 - i : el).reduce((a, b) => a + b, 0);
    let [max, result] = [0, []];

    const getScore = (arr, count, idx) => {
        if (count === n) {
            let a = aScore;
            let l = 0;

            arr.forEach((el, i) => {
                if (info[i] !== 0 && el > info[i]) {
                    a -= (10 - i);
                    l += (10 - i);
                };
                if (info[i] === 0 && el > info[i]) {
                    l += (10 - i);
                };
             });

            if (l - a > max) {
                max = l - a;
                result = [arr];
            } else if(l - a === max){
                result.push(arr);
            };
            return;
        };

        for (let i = idx; i < arr.length; i++) {
            if (arr[i] > info[i]) continue;

            const tempArr = arr.slice();
            tempArr[i] += 1;

            getScore(tempArr, count + 1, i);  
        };
    };

    getScore(Array(11).fill(0), 0, 0);
    if (result.length === 0 || max === 0) return [-1];

    result.sort((a,b) => {
        for(let i = a.length - 1; i >= 0; i -= 1){
            if(a[i] !== b[i]){
              return b[i] - a[i];  
            };
        };
    });

    return result[0];
};