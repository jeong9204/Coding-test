function solution(rectangle, characterX, characterY, itemX, itemY) {

    /* 1. (1,1)로 시작점을 유지하면서 좌표값들을 2배로 만들자
       characterX, characterY, itemX, itemY 로 이에 맞게 2배로 만들자 */
    const [start_y, start_x] = [1, 1];
    const rectangle2x = [];
    for(let rect of rectangle){
        let [xmin, ymin, xmax, ymax] = rect;
        xmin = 2*xmin-start_x;
        ymin = 2*ymin-start_y;
        xmax = 2*xmax-start_x;
        ymax = 2*ymax-start_y;
        rectangle2x.push([xmin, ymin, xmax, ymax]);
    }
    characterX = 2*characterX - start_x;
    characterY = 2*characterY - start_y;
    itemX = 2*itemX - start_x;
    itemY = 2*itemY - start_y;

    // 2. 방문 여부를 체크할 좌표공간을 만들자
    let max = 0;
    for(let rect2x of rectangle2x){
        let temp = Math.max(...rect2x);
        if(temp > max)
            max = temp;
    }
    const visited = Array.from(Array(max+1).fill(false), () => new Array(max+1).fill(false));

    //3.직사각형의 변들을 true(지나 갈 수있는 경로)로 만들자
    for(let rect2x of rectangle2x){
        let [xmin, ymin, xmax, ymax] = rect2x;
        for(let i = ymin; i <= ymax; i++){
            visited[i][xmin] = true;
            visited[i][xmax] = true;
        }
        for(let i = xmin; i <= xmax; i++){
            visited[ymin][i] = true;
            visited[ymax][i] = true;
        }
    }
    // 4. 겹치는 부분은 false(지나갈수 없는 경로)으로 만들자
    for(let rect2x of rectangle2x){
        let [xmin, ymin, xmax, ymax] = rect2x;
        for(let i = ymin; i <= ymax; i++)
            for(let j = xmin; j <= xmax; j++)
                if(i > ymin && i < ymax && j > xmin && j < xmax)
                    visited[i][j] = false;
    }

    // 4. BFS 사용해서 최단 경로 찾기
    const queue = [[characterY, characterX, 0]];
    while(queue.length > 0){
        let [y, x, distance] = queue.shift();

        if(y < 0 | x < 0 | y > max | x > max)
            continue;

        if(y === itemY && x === itemX)
            return distance/2;

        // 상
        if(y + 1 <= max && visited[y + 1][x] === true){
            visited[y + 1][x] = false;
            queue.push([y + 1, x, distance+1]);
        }
        // 하
        if(y > 0 && visited[y - 1][x] === true){
            visited[y - 1][x] = false;
            queue.push([y - 1, x, distance+1]);
        }
        // 좌
        if(x > 0 && visited[y][x - 1] === true){
            visited[y][x - 1] = false;
            queue.push([y, x - 1, distance+1]);
        }
        // 우
        if(x + 1 <= max && visited[y][x + 1] === true){
            visited[y][x + 1] = false;
            queue.push([y, x + 1, distance+1]);
        }
    }
}