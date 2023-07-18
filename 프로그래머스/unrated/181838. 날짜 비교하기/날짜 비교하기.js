function solution(date1, date2) {
    let day1 = new Date(date1[0], date1[1], date1[2])
    let day2 = new Date(date2[0], date2[1], date2[2])
    return day1 < day2 ? 1 : 0
}