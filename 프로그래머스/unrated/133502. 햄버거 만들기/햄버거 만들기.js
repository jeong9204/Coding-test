function solution(ingredient) {
    let process = true;
    let count = 0;
    let index = 0;

    while(process){
      if(ingredient[index] === 1 && ingredient[index+1] === 2 && ingredient[index+2] === 3 && ingredient[index+3] === 1){
        ingredient.splice(index,4)
        count++
        if(index !== 0) {
          index = index-3
        }
      } else if(index > ingredient.length-3){
        process = false
      } else {
        index++
      }
    }
    return count 
}