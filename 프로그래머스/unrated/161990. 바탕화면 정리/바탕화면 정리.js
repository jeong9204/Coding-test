function solution(wallpaper) {
    var answer = [];
    const files = [];
    let lux, luy, rdx, rdy;

    const wall = wallpaper.map(line => { return line.split("") })
    for (let x = 0; x < wall.length; x++) {
        for (let y = 0; y < wall[0].length; y++) {
            if (wall[x][y] == '#') {
                files.push([x, y])
            }
        }
    }

    files.forEach((file) => {
        rdx = rdx >= 0 ? Math.max(rdx, file[0]) : file[0]
        lux = lux >= 0 ? Math.min(lux, file[0]) : file[0]
        rdy = rdy >= 0 ? Math.max(rdy, file[1]) : file[1]
        luy = luy >= 0 ? Math.min(luy, file[1]) : file[1]
    })

    answer = [lux, luy, rdx + 1, rdy + 1];
    return answer;
}