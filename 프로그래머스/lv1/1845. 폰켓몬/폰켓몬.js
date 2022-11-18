function solution(nums) {
    /*
        - 폰켓몬은 n/2마리 가질수있다
        - 가장많은 종류의 폰켓몬을 선택하는 방법을 찾아라?
    */
    let answer = 0;
    const n = nums.length/2;
    const uniqueNums = [...new Set(nums)].length;
    return uniqueNums > n ? n : uniqueNums;
}