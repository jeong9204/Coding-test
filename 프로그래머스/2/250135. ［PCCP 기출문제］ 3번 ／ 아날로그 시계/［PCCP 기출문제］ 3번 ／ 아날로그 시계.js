function solution(h1, m1, s1, h2, m2, s2) {
    const getCntFromMidNight = (h,m,s) => {
        const [hDegree,mDegree,sDegree] = [(h*30+m*0.5+s*0.5/60)%360,(m*6+s*0.1)%360,s*6]
        let ret = -1 
        if(sDegree>=mDegree) ret +=1
        if(sDegree>=hDegree) ret +=1

        ret += (h*60+m)*2
        ret -= h 
        if(h>=12) ret -= 2 
        return ret
    }

    let ret = getCntFromMidNight(h2,m2,s2) - getCntFromMidNight(h1,m1,s1)
    if((h1===0||h1===12)&&m1===0&&s1===0) ret +=1
    return ret

}