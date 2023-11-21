function solution(weights) {

    const dict = {}
    for (let weight of weights) {
        if (dict[weight] === undefined) dict[weight] = 1; else dict[weight] += 1;
    }
    // 오름차순
    weights.sort((a, b) => (a - b));
    let answer = 0;
    for (let weight of weights) {
        // 비교
        // 1 : 1 - 자기과 같은 무게를 비교할때는 > 1
        if (dict[weight] > 1) answer += (dict[weight] - 1);
        // 3 : 2
        if (dict[weight * (3 / 2)] > 0) answer += dict[weight * (3 / 2)];
        // 4 : 2 -> 2 : 1
        if (dict[weight * 2] > 0) answer += dict[weight * 2];
        // 4 : 3
        if (dict[weight * (4 / 3)] > 0) answer += dict[weight * (4 / 3)];

        // 현재차례가 끝나면 dict[현재차례]에서 -1 해준다.
        // 다음차례에서 현재 weight를 비교대상에서 제외시키기 위해 하나 빼주는 것
        dict[weight] -= 1;
    }
    return answer;
}