function solution(id_list, report, k) {
    var answer = [];
    const users = [];

    // 유저의 정보요소 설정
    for (const id of id_list) {
        users[id] = { reportedBy: [], reportTo: [], ban: false, success: 0 }
    }

    // 신고내역 정리
    for (const re of report) {
        const [reporter, reported] = re.split(" ")
        if (!users[reporter].reportTo.includes(reported)) users[reporter].reportTo.push(reported)
        if (!users[reported].reportedBy.includes(reporter)) users[reported].reportedBy.push(reporter)
        if (users[reported].reportedBy.length >= k) {
            users[reported].ban = true
        }
    }

    // 정지먹은 사람들을 신고한 유저에게 메일 발송
    for (const user in users) {
        if (users[user].ban) {
            for (const reporter of users[user].reportedBy) {
                users[reporter].success++;
            }
        }
    }

    //정지 성공횟수 모음
    for (const user in users) {
        answer.push(users[user].success)
    }

    return answer;
}