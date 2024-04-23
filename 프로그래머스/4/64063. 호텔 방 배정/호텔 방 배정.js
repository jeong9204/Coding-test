function solution(k, room_number) {
    const answer = [];
    const room = new Map(); // 빠른 검색을 위해 Map 사용

    // 다음 사용 가능한 방을 찾는 함수
    function findNext(roomNumber) {
        // 방이 사용 가능하면 반환
        if (!room.has(roomNumber)) {
            return roomNumber;
        }
        // 재귀적으로 다음 사용 가능한 방 찾기
        return room.set(roomNumber, findNext(room.get(roomNumber))).get(roomNumber);
    }

    room_number.forEach(i => {
        const next = findNext(i); // 다음 사용 가능한 방 찾기
        answer.push(next); // 다음 사용 가능한 방을 답에 추가
        room.set(next, next + 1); // 다음 방을 사용 중으로 표시
    });

    return answer;
}