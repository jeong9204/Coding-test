function solution(friends, gifts) {
  let answer = {}
  let statistic = {}
  let idxStatistic = {}
  for (const name of friends) {
    answer[name] = 0
    statistic[name] = 0
    idxStatistic[name] = {}
    for (const sub of friends) {
      if(name !== sub){
        idxStatistic[name][sub] = 0
      }
    }
  }
  for (const cur of gifts) {
    let [from,to] = cur.split(' ')
    statistic[from] = statistic[from]+1
    statistic[to] = statistic[to]-1
    idxStatistic[from][to] = idxStatistic[from][to]+1
  }
  for (const from in idxStatistic) {
    for (const to in idxStatistic[from]) {
      if(idxStatistic[from][to] === 0 && idxStatistic[to][from] === 0 || idxStatistic[from][to] === idxStatistic[to][from]){
        if(statistic[from] > statistic[to]){
          answer[from] = answer[from]+1
        }
      }else{
        if(idxStatistic[from][to] < idxStatistic[to][from]){
          answer[to] = answer[to]+1
        }else if(idxStatistic[to][from] > idxStatistic[from][to]){
          answer[from] = answer[from]+1
        }
      }
    }
  }
  answer = Math.max(...Object.values(answer))
  return answer
}