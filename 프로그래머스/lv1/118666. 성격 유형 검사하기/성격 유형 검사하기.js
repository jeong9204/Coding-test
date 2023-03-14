function solution(survey, choices) {
    var answer = [];
    const element = {
        R: 0, T: 0,
        C: 0, F: 0,
        J: 0, M: 0,
        A: 0, N: 0
    }
    for (let i = 0; i < survey.length; i++) {
        const score = choices[i] - 4
        if (score > 0) { element[survey[i][1]] = element[survey[i][1]] + Math.abs(score) }
        else { element[survey[i][0]] = element[survey[i][0]] + Math.abs(score) }
    }

    if (element["R"] >= element["T"]) answer.push("R")
    else { answer.push("T") }

    if (element["C"] >= element["F"]) answer.push("C")
    else { answer.push("F") }

    if (element["J"] >= element["M"]) answer.push("J")
    else { answer.push("M") }

    if (element["A"] >= element["N"]) answer.push("A")
    else { answer.push("N") }

    return answer.join('');
}