function solution(box, n) {
    var answer = 0;
    let size = parseInt(box[0]/n) * parseInt(box[1]/n) * parseInt(box[2]/n)
    return size;
}