function solution(citations) {
    let answer = 0;

    for(let h=0;h<=10000;h++){
        let moreThanHCount = 0, lessThanHCount = 0
        citations.forEach(citation=>{
            if(citation < h){
                lessThanHCount++
            }
            else{
                moreThanHCount++
            }
        })

        if(lessThanHCount < h && h <= moreThanHCount){
            answer = h
        }
    }

    return answer
}