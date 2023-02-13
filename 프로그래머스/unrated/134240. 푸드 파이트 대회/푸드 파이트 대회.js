function solution(food) {
    let answer = '';
    const answerfoods = []
    const eachFood = food.map(i => parseInt(i / 2))

    const foods = eachFood.reduce((acc, cur, ind, arr) => {
        const tempFoods = []
        for (let i = 1; i <= cur; i++) {
            tempFoods.push(ind)
        }
        acc.push(...tempFoods)
        return acc
    }, [])

    answerfoods.push(...foods, 0, ...foods.reverse())
    answer = answerfoods.join("")

    return answer;
}