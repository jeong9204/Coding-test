function solution(dirs) {
    const visited = {};
    let [x, y] = [0, 0];

    const [xLeftLimit, xRightLimit] = [-5, 5];
    const [yDownLimit, yUpLimit] = [-5, 5];

    for(const dir of dirs){
        let start;
        let end;
        if(dir === "U"){
            const yUp = y + 1;
            if(yUp > yUpLimit)
                continue;
            start = x.toString()+y.toString();
            end = x.toString()+yUp.toString();
            y = yUp;
        }else if(dir === "D"){
            const yDown = y - 1;
            if(yDown < yDownLimit)
                continue;
            start = x.toString()+y.toString();
            end = x.toString()+yDown.toString();
            y = yDown;
        }else if(dir === "R"){
            const xRight = x + 1;
            if(xRight > xRightLimit)
                continue;
            start = x.toString()+y.toString();
            end = xRight.toString()+y.toString();
            x = xRight;

        }else if(dir === "L"){
            const xLeft = x - 1;
            if(xLeft < xLeftLimit)
                continue;
            start = x.toString()+y.toString();
            end = xLeft.toString()+y.toString();
            x = xLeft;
        }
        if(visited[start+end] === undefined && visited[end + start] === undefined){
                visited[start + end] = true;
                visited[end + start] = true;
            }
    }
    return Object.keys(visited).length / 2;
}