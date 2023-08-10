function solution(myStr) {
    var answer = [];
    let test = myStr.replace(/a/g,"_");
    test = test.replace(/b/g,"_");
    test = test.replace(/c/g,"_");
    answer = test.split("_");
    let filtered  = answer.filter((item) => {
     return item !== '';
    });
    return filtered.length !== 0 ? filtered : ["EMPTY"];
}