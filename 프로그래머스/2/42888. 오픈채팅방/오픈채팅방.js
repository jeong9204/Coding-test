function solution(record) {
    var answer = [];
    const idPerUserName = {};
    record.forEach((data) => {
        const [status, uid, target] = data.split(' ');
        if(status === 'Enter' || status === 'Change') {
            idPerUserName[uid] = target
        }
    })
    
    record.forEach((data) => {
        const [status, uid, target] = data.split(' ');
        if(status === 'Enter') {
            answer.push(`${idPerUserName[uid]}님이 들어왔습니다.`);
        }
        if(status === 'Leave') {
            answer.push(`${idPerUserName[uid]}님이 나갔습니다.`);
        }
    })
    return answer;
}

// function solution(record) {
//     const answer = [];
//     const idPerUserName = {}
//     record.forEach((data)=>{
//         const [status,uid,target] = data.split(' ')
//         if(status === 'Enter' || status === 'Change')
//             idPerUserName[uid] = target
//     })

//     record.forEach((data)=>{
//         const [status,uid,target] = data.split(' ')
//         if(status === 'Enter'){
//             answer.push(`${idPerUserName[uid]}님이 들어왔습니다.`)
//         }
//         if(status === 'Leave'){
//             answer.push(`${idPerUserName[uid]}님이 나갔습니다.`)
//         }
//     })

//     return answer;
// }