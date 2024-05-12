function solution(arrows) {
    const op = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]; // 이동 방향에 대한 배열
    let n = 0; // 노드의 수
    let e = 0; // 엣지의 수
    let x = 0, y = 0; // 시작 좌표
    const node = new Map(); // 방문한 좌표를 저장할 맵
    const edge = new Map(); // 최초의 엣지를 출발 좌표와 방향으로 저장할 맵

    node.set([0, 0].toString(), 0); // 시작 좌표를 노드 맵에 추가

    for (const i of arrows) {
        const nx = x + op[i][0]; // 다음 x(세로) 좌표
        const ny = y + op[i][1]; // 다음 y(가로) 좌표
        const ni = (i + 4) % 8; // 반대 방향

        if (!edge.has([nx, ny, ni].toString()) && !edge.has([x, y, i].toString())) {
            // 도착할 좌표에서 현재 좌표로 온 적이 있거나 현재 좌표에서 도착할 좌표로 이동한 적이 있는지 확인
            if (i % 2 === 1) {
                // 대각선으로 이동하는 경우
                // 교차하게 되면 점이 1개, 변이 2개 늘어남
                // 대각선으로 이동하는 경우 교차할 때마다 엣지와 노드가 2개씩 증가
                const i1 = (i - 1) % 8;
                const i2 = (i + 1) % 8;
                const i3 = (i1 + 3) % 8;
                const i4 = (i2 + 5) % 8;

                if (edge.has([x + op[i1][0], y + op[i1][1], i3].toString()) || edge.has([x + op[i2][0], y + op[i2][1], i4].toString())) {
                    e += 2;
                    n += 1;
                }
            }

            node.set([nx, ny].toString(), 0); // 도착할 좌표를 노드 맵에 추가
            edge.set([x, y, i].toString(), 0); // 출발 좌표와 방향을 엣지 맵에 추가
        }

        x += op[i][0]; // x 좌표 갱신
        y += op[i][1]; // y 좌표 갱신
    }

    e += edge.size; // 엣지의 개수는 엣지 맵의 크기
    n += node.size; // 노드의 개수는 노드 맵의 크기

    return 1 - n + e; // 오일러 공식에 따른 결과 반환
}
