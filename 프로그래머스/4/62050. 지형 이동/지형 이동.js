function canGo(a, b, h) {
    return Math.abs(a-b) <= h
}


function solution(land, height) {
    var answer = 0;
    const area = [];
    const size = land.length;
    const check = Array.from(Array(size), () => Array(size).fill(-1))
    const mx = [0,0,1,-1]
    const my = [1,-1,0,0]
    var areaNum = 0;

    //이동 가능 지역으로 분할하기
    land.forEach((land_val, i) => {
        land_val.forEach((val, j) => {
            if(check[i][j] == -1) {
                const que = [[i,j]];
                check[i][j] = areaNum;
                var qi = 0;
                while(qi < que.length) {
                    const curx = que[qi][0];
                    const cury = que[qi][1];
                    for(var k = 0; k < 4; k++) {
                        const nextx = curx + mx[k];
                        const nexty = cury + my[k];
                        if(nextx < 0 || nextx >= size || nexty < 0 || nexty >= size || check[nextx][nexty] !=-1 || canGo(land[curx][cury], land[nextx][nexty], height) === false) continue;
                            check[nextx][nexty] = areaNum;
                            que.push([nextx,nexty])
                    }
                    qi++;
                }
                area.push(que)
                areaNum++;
            }
        })
    })

    //다른 지역으로 이동할 수 있는 비용 구하기
    const answer_candi = {};
    area.forEach((area_val, area_idx) => {
        answer_candi[area_idx] = {};
        area_val.forEach((val) => {
            const curx = val[0];
            const cury = val[1];
            for(var k = 0; k < 4; k++) {
                const nextx = curx + mx[k];
                const nexty = cury + my[k];
                if(nextx >= 0 && nextx < size && nexty >= 0 && nexty < size && check[nextx][nexty] != area_idx) {
                    var cost = land[curx][cury] - land[nextx][nexty];
                    if(cost < 0) cost *= -1;
                    const s = area_idx > check[nextx][nexty] ? area_idx : check[nextx][nexty];
                    const f = area_idx < check[nextx][nexty] ? area_idx : check[nextx][nexty];

                    if(answer_candi[f][s] == null ||answer_candi[f][s] > cost) {
                        answer_candi[f][s] =  cost
                    }
                }
            }
        })
    })

    // 이동 가능한 지역 중 비용이 적게드는 순서로 정렬하기
    const minarray = [];
    for( var key in answer_candi) {
        for( var k in answer_candi[key]) {
            minarray.push([parseInt(key),parseInt(k),answer_candi[key][k]])
        }
    }
    // minarray.sort((a,b) => a[2] > b[2])
    minarray.sort((a,b) => a[2] - b[2])

    //크루스칼 알고리즘
    let tree = new A(areaNum);

    minarray.forEach((val, index) => {
        if(tree.find(val[0]) == tree.find(val[1]) )  return true;
        answer += val[2];
        tree.merge(val[0], val[1]);
    })
    return answer;

}

//unionFind를 위한 클래스 선언
class A {
    constructor(n) {
        this.root = Array(n+1).fill(0);
        this.root.forEach((v,i) => {
            this.root[i] = i;
        })
    }
    find(n) {
        if(this.root[n] == n) return n;
        return this.root[n] = this.find(this.root[n], this.root)
    }
    merge(a, b) {
        this.root[this.find(a, this.root)] = this.root[b]
    }
}