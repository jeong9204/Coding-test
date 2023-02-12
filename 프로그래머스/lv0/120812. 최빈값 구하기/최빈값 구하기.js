function solution(array) {
    let answer = 0;
    let maxValue, preMaxIndex;
    let countMap = new Map();

    for (let i = 0; i < array.length; i++) {
        if (countMap.has(array[i])) {
            countMap.set(array[i], countMap.get(array[i]) + 1);
        } else {
            countMap.set(array[i], 1);
        }
    }

    maxValue = -1;
    preMaxIndex = -1;

    for (let [key, value] of countMap) {
        if (maxValue < value) {
            maxValue = value;
            answer = key;
        } else if (maxValue === value) {
            preMaxIndex = key;
        }
    }

    if (countMap.get(answer) === countMap.get(preMaxIndex)) {
        answer = -1;
        return answer;
    }

    return answer;
}


// function solution(array) {
//      if(array.length === 1) return array[0];
//     if(array.length === 2) {
//         if(array[0] !== array[1]){
//             return -1
//         }
//     }
    
//     let answer = [1, 1];
//     let v =0;
//     array.sort();

//     for(let i=0; i<array.length; i++){
//         if(array[i] === array[i+1]){
//             v++;
//             if(array[i+1] !== array[i+2]){
//                 v++;
//                 if(answer[1] < v){
//                     answer = [];
//                     answer.push(array[i], v);
//                 } else if (answer[1] === v){
//                     answer.push(array[i], v);
//                 }
//                 v = 0;
//             }
//         }
//     }
    
//     if(answer.length === 2){
//         return answer[0];
//     } else if(answer.length > 2){
//         return -1;
//     } else {
//         return array[0];
//     }
// }

// function solution(arr) {

//     if([...new Set(array)].length === 1) return [...new Set(array)].join()
//     let myMap = new Map();
    
//     for(let i of array) {
//         myMap.set(i, myMap.get(i) + 1 || 1)
//     }
//     // console.log(myMap)
//     let arr = [...myMap];
//     arr.sort((a, b) => b[1] - a[1])
//     // console.log(arr)

//     if(arr[0][1] === arr[1][1]) {
//         return -1;
//     } else return Number(arr[0][0])

//     var answer = [1, 1];
//     let v = 0;
//     arr.sort();

//     for(let i=0; i<arr.length; i++){
//         if(arr[i] == arr[i+1]){
//             v++;
//             if(arr[i+1] !== arr[i+2]){
//                 v++;
//                 if(answer[1] < v){
//                     answer = [];
//                     answer.push(arr[i], v);
//                 } else if (answer[1] == v){
//                     answer.push(arr[i], v);
//                 }
//                 v = 0;
//             }
//         }
//     }

//     if(answer.length == 2){
//         return answer[0];
//     } else if(answer.length > 2){
//         return -1;
//     } else {
//         return arr[0];
//     }

// }