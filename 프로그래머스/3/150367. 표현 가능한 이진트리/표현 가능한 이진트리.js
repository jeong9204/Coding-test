function solution(numbers) {
    const answer = new Array(numbers.length).fill(1)
    const binary = numbers.map((v) => {
        const bin =  v.toString(2)
        return ('0'.repeat(2 ** (Math.ceil(Math.log2(bin.length))) - bin.length) + bin).substring(1)
    })
    binary.forEach((v, i)=>{
        const rootIndex = Math.floor(v.length / 2)
        const height = Math.log2(v.length + 1) - 1
        for(let j = 0; j < v.length; j++){
            if(v.charAt(j) === '1'){
                let index = rootIndex
                let times = 0
                while(index !== j){
                    if(v.charAt(index) === '0') {
                        answer[i] = 0
                        break;
                    }
                    const distance =  Math.floor(2 ** (height - 1 - times))
                    index = j > index ? index + distance : index - distance
                    times++
                }
            }
            if(answer[i] === 0) continue
        }

    })
    return answer;
}
