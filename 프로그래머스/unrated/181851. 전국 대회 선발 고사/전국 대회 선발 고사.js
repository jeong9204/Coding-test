function solution(rank, attendance) {
    // var answer = 0;
    // let arrRank = []
    // for(let i=0; i<rank.length; i++) {
    //     if(attendance[i]) {
    //         arrRank.push(rank[i])
    //     }
    // }
    // let arrRankSort = arrRank.sort((a,b) => a - b)
    // return (10000 * arrRankSort[0]) + (100 * arrRankSort[1]) + arrRankSort[2]
    
    return [...attendance.reduce((acc, cur, idx) => {
        if (cur) {
            acc.set(idx, rank[idx]);
            console.log('acc.set(idx, rank[idx]);', acc.set(idx, rank[idx]))
        }

        return acc;
    }, new Map())]
    .sort((a, b) => a[1] - b[1])
    .reduce((acc, cur, idx) => {
        const [student, rank] = cur;

        if (idx === 0) acc += 10000 * student;
        if (idx === 1) acc += 100 * student;
        if (idx === 2) acc += student;

        return acc;
    }, 0);
}