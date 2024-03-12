// Node 클래스 정의
class Node {
    constructor(left = null, right = null) {
        this.remove = false; // 삭제 여부 플래그
        this.left = left;     // 이전 노드에 대한 참조
        this.right = right;   // 다음 노드에 대한 참조
    }
}

// 주어진 조건에 따라 노드를 삭제하고 복원하는 함수
function solution(n, k, cmd) {
    // 이중 연결 리스트 초기화
    const table = Array.from({ length: n }, (_, i) => new Node(i - 1, i + 1));
    table[0].left = null;
    table[n - 1].right = null;
    let cursor = k; // 커서 초기 위치
    const stack = []; // 삭제된 노드를 저장하는 스택

    // cmd 배열을 순회하면서 각 명령에 따라 노드 조작
    for (const command of cmd) {
        if (command[0] === 'U') {
            // 위로 이동
            const [, move] = command.split(' ');
            for (let i = 0; i < parseInt(move); i++) {
                cursor = table[cursor].left;
            }
        } else if (command[0] === 'D') {
            // 아래로 이동
            const [, move] = command.split(' ');
            for (let i = 0; i < parseInt(move); i++) {
                cursor = table[cursor].right;
            }
        } else if (command[0] === 'C') {
            // 노드 삭제
            stack.push(cursor);
            table[cursor].remove = true;

            const l = table[cursor].left;
            const r = table[cursor].right;

            if (l || l === 0) {
                table[l].right = r;
            }

            // 마지막 행이면
            if (r !== null) {
                table[r].left = l;
                cursor = r;
            } else {
                cursor = l;
            }
        } else {
            // 노드 복원
            const c = stack.pop();
            table[c].remove = false;

            const l = table[c].left;
            const r = table[c].right;

            // 복원된 행이 첫째 행이 아니라면
            if (l !== null) {
                table[l].right = c;
            }
            if (r !== null) {
                table[r].left = c;
            }
        }
    }

    // 결과 문자열 구성
    let result = '';
    for (let i = 0; i < n; i++) {
        result += table[i].remove ? 'X' : 'O';
    }
    return result;
}