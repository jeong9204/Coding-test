function solution(name, yearning, photo) {
    return photo.map((names) => names.reduce((a,b) => {
        const yearnScore = yearning[name.indexOf(b)] || 0
        return a+yearnScore
    },0))
}