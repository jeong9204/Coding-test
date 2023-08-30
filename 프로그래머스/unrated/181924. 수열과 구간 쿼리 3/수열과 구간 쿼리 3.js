function solution(arr, queries) {
    let i = 0;
    let j = 0;
    let tempI = 0;
    let tempJ = 0;

    return queries.reduce((acc, cur, idx) => {
        i = cur[0];
        j = cur[1];

        tempI = arr[i];
        tempJ = arr[j];

        acc[i] = tempJ;
        acc[j] = tempI;

        return acc;
    }, arr);
}