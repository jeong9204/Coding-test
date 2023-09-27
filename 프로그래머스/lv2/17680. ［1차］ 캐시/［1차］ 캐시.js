function solution(cacheSize, cities) {
    var answer = 0;
    const cache = [];
    if(cacheSize === 0) return cities.length * 5
    
    cities.forEach(city => {
        const upperCity = city.toUpperCase();
        answer += cache.includes(upperCity) ? 1 : 5
        
        if(cache.length < cacheSize) {
            cache.push(upperCity)
        } else {
            if(cache.includes(upperCity)) {
                cache.splice(cache.indexOf(upperCity), 1)
            } else {
                cache.shift()
            }
            cache.push(upperCity)
        }
    })
    return answer;
}

// function solution(cacheSize, cities) {
//     var answer = 0;
//     const cache = []
//     if(cacheSize===0){
//         return cities.length * 5
//     }

//     cities.forEach(city=>{
//         const upperCity = city.toUpperCase()
//         answer += cache.includes(upperCity) ? 1 : 5

//         if(cache.length < cacheSize){
//             cache.push(upperCity)
//         }
//         else{
//             if(cache.includes(upperCity)){
//                 cache.splice(cache.indexOf(upperCity),1)
//             }
//             else{
//                 cache.shift()
//             }
//             cache.push(upperCity)
//         }
//     })
//     return answer;
// }