function solution(numbers, hand) {
    var answer = '';
    let left = [3, 0]
    let right = [3, 2]
    const nums = [[3, 1],
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2]]

    function clickByLeft(n) {
        left[0] = nums[n][0]
        left[1] = nums[n][1]
        return 'L'
    }

    function clickByRight(n) {
        right[0] = nums[n][0]
        right[1] = nums[n][1]
        return 'R'
    }

    const answerArr = numbers.map(n => {
        if (n == 1 || n == 4 || n == 7) return clickByLeft(n);
        else if (n == 3 || n == 6 || n == 9) return clickByRight(n);
        else {
            const diffL = Math.abs(nums[n][0] - left[0]) + Math.abs(nums[n][1] - left[1])
            const diffR = Math.abs(nums[n][0] - right[0]) + Math.abs(nums[n][1] - right[1])

            if (diffL < diffR) return clickByLeft(n)
            else if (diffL > diffR) return clickByRight(n)
            else {
                if (hand == 'left') return clickByLeft(n)
                else return clickByRight(n)
            }
        }
    })
    answer = answerArr.join("");
    return answer;
}