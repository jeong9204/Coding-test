function solution(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    const arr1 = [];
    const arr2 = [];
    for(let i=0; i<str1.length-1; i++) {
        if(/^[a-z]{2}$/g.test(str1[i]+str1[i+1])) {
            arr1.push(str1[i]+str1[i+1])
        }
    }
    for(let i=0; i<str2.length-1; i++) {
        if(/^[a-z]{2}$/g.test(str2[i]+str2[i+1])) {
            arr2.push(str2[i]+str2[i+1])
        }
    }
    
    const arr3 = [...arr2];
    let counter = 0;
    arr1.forEach((e, i) => {
        for(let j=0; j<arr2.length; j++) {
            if(e === arr2[j]) {
                arr2.splice(j,1);
                counter++;
                break;
            }
        }
    })
    const g = arr1.length + arr3.length - counter
    return g ? parseInt((counter / g) * 65536) : 65536
}

// function solution(str1, str2) {
//   str1 = str1.toLowerCase()
//   str2 = str2.toLowerCase()
//   // 다중집합 생성
//   const arr1 = [];
//   const arr2 = [];
//   for (let i = 0; i < str1.length - 1; i++) {
//     if (/^[a-z]{2}$/g.test(str1[i] + str1[i + 1])) arr1.push(str1[i] + str1[i + 1])
//   }
//   for (let i = 0; i < str2.length - 1; i++) {
//     if (/^[a-z]{2}$/g.test(str2[i] + str2[i + 1])) arr2.push(str2[i] + str2[i + 1])
//   }

//   const arr3 = [...arr2]
//   // 교집합 개수 세기
//   let counter = 0;
//   arr1.forEach((e, i) => {
//     for (let j = 0; j < arr2.length; j++) {
//       if (e === arr2[j]) {
//         arr2.splice(j, 1);
//         counter++
//         break;
//       }
//     }
//   })
//   const g = arr1.length + arr3.length - counter
//   return g ? parseInt((counter / g) * 65536) : 65536
// }