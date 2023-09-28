function solution(clothes) {
    const clothesObj = {}
    clothes.forEach(([cloth,type])=>{
        if(clothesObj[type] === undefined){
            clothesObj[type] = 1
        }
        else{
            clothesObj[type]++
        }
    })

    const clothesCount = Object.entries(clothesObj).reduce((acc,[_,clothesTypeCount])=>{
        return acc*(clothesTypeCount+1)
    },1)

    // delete no-wear
    const answer = clothesCount - 1
    return answer    
}