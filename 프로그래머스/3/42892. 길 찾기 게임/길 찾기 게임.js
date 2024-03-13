class Tree {
    constructor() {
        this.left = null;
        this.right = null;
        this.index = null;
    }
}

function makeTree(nodeinfo, start, end) {
    if (start > end)
        return null;
    let max = nodeinfo[start][1]; // y좌표의 최대값
    let cur = start; // y좌표가 최대인 곳의 인덱스
    for (let i = start + 1; i <= end; ++i) {
        if (max < nodeinfo[i][1]) {
            cur = i;
            max = nodeinfo[i][1];
        }
    }
    let result = new Tree();
    result.index = nodeinfo[cur][2];
    result.left = makeTree(nodeinfo, start, cur - 1);
    result.right = makeTree(nodeinfo, cur + 1, end);
    return result;
}

function preorder(tree, answer) {
    if (tree === null)
        return;
    answer.push(tree.index);
    preorder(tree.left, answer);
    preorder(tree.right, answer);
}

function postorder(tree, answer) {
    if (tree === null)
        return;
    postorder(tree.left, answer);
    postorder(tree.right, answer);
    answer.push(tree.index);
}

function solution(nodeinfo) {
    let answer = [];
    let data = [];
    let size = nodeinfo.length;
    for (let i = 0; i < size; ++i)
        nodeinfo[i].push(i + 1);
    nodeinfo.sort((a, b) => a[0] - b[0]); // x좌표 기준으로 오름차순 정렬
    let tree = makeTree(nodeinfo, 0, size - 1);
    let pre = [];
    let post = [];
    preorder(tree, pre);
    postorder(tree, post);
    answer.push(pre);
    answer.push(post);
    return answer;
}