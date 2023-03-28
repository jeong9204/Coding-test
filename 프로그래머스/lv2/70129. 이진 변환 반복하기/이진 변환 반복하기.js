function solution(s) {
    return converter(s, 0, 0);
}

function converter(s, repeatCnt, deletedZero) {
    const onlyOne = s.split("").filter((c) => {
        if (c == 1) return c
    })
    const converted = onlyOne.length.toString(2)

    deletedZero += s.length - onlyOne.length
    repeatCnt++

    if (converted == 1) return [repeatCnt, deletedZero]
    else return converter(converted, repeatCnt, deletedZero);
}