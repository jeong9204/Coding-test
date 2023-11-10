function solution(book_time) {
    const rooms = [];
    const new_book_time = book_time.map(([start, end]) => {
        const [start_hour, start_minute] = start.split(':').map(str => Number(str));
        const [end_hour, end_minute] = end.split(':').map(str => Number(str));
        return [start_hour * 60 + start_minute, end_hour * 60 + end_minute + 10]
    })
    new_book_time.sort((a,b) => a[0] - b[0]);
    new_book_time.forEach(([start_time, end_time]) => {
        if(Math.min(...rooms) > start_time) {
            rooms.push(end_time)
        } else {
            const minIdx = rooms.indexOf(Math.min(...rooms))
            rooms.splice(minIdx, 1, end_time)
        }
    })
    
    return rooms.length
}

// function solution(book_time) {
//     const rooms = []
//     const new_book_time = book_time.map(([start,end])=>{
//         const [start_hour,start_minute] = start.split(':').map(str=>Number(str))
//         const [end_hour,end_minute] = end.split(':').map(str=>Number(str))

//         return [start_hour * 60 + start_minute , end_hour * 60 + end_minute + 10]
//     })

//     new_book_time.sort((a,b)=>a[0] - b[0])

//     new_book_time.forEach(([start_time,end_time])=>{
//         if(Math.min(...rooms) > start_time){
//             rooms.push(end_time)
//         }
//         else{
//             const minIdx = rooms.indexOf(Math.min(...rooms))
//             rooms.splice(minIdx,1,end_time)
//         }
//     })

//     return rooms.length
// }