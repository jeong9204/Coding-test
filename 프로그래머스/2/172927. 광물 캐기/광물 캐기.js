const diamondPiro = (target) => 1

const ironPiro = (target)=>{
    if(target === 'diamond')
        return 5
    return 1
} 

const stonePiro = (target)=>{
    if(target === 'diamond')
        return 25
    if(target === 'iron')
        return 5
    return 1
}

function solution(picks, minerals) {
    const mineralGroups = []
    let piroSum = 0

    let mineralGroup = {diamond:0,iron:0,stone:0}
    let maxPicks = picks.reduce((acc,val)=>acc+val,0) * 5

    minerals.slice(0,maxPicks).forEach((mineral,idx)=>{
        mineralGroup[mineral]++

        if((idx+1)%5 === 0){
            mineralGroups.push(mineralGroup)
            mineralGroup = {diamond:0,iron:0,stone:0}
        }
        else if(idx === minerals.length - 1){
            mineralGroups.push(mineralGroup)
            mineralGroup = {diamond:0,iron:0,stone:0}
        }
    })

    mineralGroups.sort((a,b)=>{
        if(a.diamond !== b.diamond){
            return b.diamond - a.diamond
        }
        else if(a.iron !== b.iron){
            return b.iron - a.iron
        }
        return b.stone - a.stone
    })

    const calculate = (picksIdx,mineralGroup) => {
        let sum = 0
        Object.entries(mineralGroup).map(([name,count])=>{
            for(let i=0;i<count;i++){
                if(picksIdx === 0){
                    sum += diamondPiro(name)
                }
                else if(picksIdx === 1){
                    sum += ironPiro(name)
                }
                else if(picksIdx === 2){
                    sum += stonePiro(name)
                }
            }
        })
        return sum
    }

    let mineralGroupsIdx = 0
    picks.forEach((pick,picksIdx)=>{
        for(let pickCount=0;pickCount<pick;pickCount++){
            if(mineralGroups[mineralGroupsIdx]){
                piroSum += calculate(picksIdx,mineralGroups[mineralGroupsIdx++])
            }
        }
    })

    return piroSum
}