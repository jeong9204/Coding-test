function solution(plans) {
    const newPlans = plans.map(([name,start,playtime])=>{
        const [hour,minute] = start.split(':').map(str=>Number(str))
        const time = hour * 60 + minute
        const N_playTime = Number(playtime)
        return {name,start:time,playtime:N_playTime}
    })
    
    newPlans.sort((a,b)=>a.start - b.start)

    let idx = 0
    const stack = [], finishedNames = []

    for(let time=0;time<1440;time++){
        if(stack.length !== 0){
            const lastPlan = stack[stack.length-1]
            lastPlan.playtime--
            if(lastPlan.playtime === 0){
                stack.pop()
                finishedNames.push(lastPlan.name)
            }
        }

        if(time === newPlans[idx]?.start){
            stack.push(newPlans[idx])
            idx++
        }
    }

    const unfinishedNames = stack.reverse().map(({name})=>name)
    const answer = [...finishedNames,...unfinishedNames]
    return answer
}