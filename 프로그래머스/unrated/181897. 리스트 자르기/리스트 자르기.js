function solution(n, slicer, num_list) {
    var answer = [];
    if(n === 1) {
        answer = num_list.slice(0,slicer[1]+1)
    } else if(n === 2) {
        answer = num_list.slice(slicer[0])
    } else if(n === 3) {
        answer = num_list.slice(slicer[0],slicer[1]+1)
    } else if(n === 4) {
        answer = num_list.slice(slicer[0],slicer[1]+1).filter((element, idx) => idx % slicer[2] === 0);
    }
    return answer
}