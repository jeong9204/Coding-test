function solution(arr, idx) {
   const answer = arr.reduce((acc, cur, index) => {
        if (index >= idx) {
            if (cur === 1) {
                acc = [...acc, index];
            }
        }

        return acc;
    }, []);

    return answer.length ? Math.min(...answer) : -1;
}