function solution(score) {
    const obj = {}
    const avarage = score.map((item)=>{
        return (item[0]+item[1]) // / item.length
    })
    const sort = [...avarage].sort((a,b)=>{return b-a})
    sort.map((item)=>{
        obj[item] = []
    })
    sort.map((item,i)=>{
        obj[item].push(i+1)
        if(obj[item].length>0){
            obj[item] = [obj[item][0]]
        }
    })
    const answer = avarage.map((item)=>{
        return Number(String(...obj[item]).replace(String(item),...obj[item]))
    })

    return answer;
}