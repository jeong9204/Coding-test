function get_piece(table, standard = 1, rotation = false){

    const length = table.length;
    const visited =  new Array(length).fill(false).map(() => new Array(length).fill(false));
    const piece_list = [];

    for(let i = 0; i < length; i++)
        for(let j = 0; j < length; j++) {
            const deque = [[i, j]];
            const piece = [];
            while (deque.length !== 0) {

                let [y, x] = deque.pop(); 

                if (y < 0 || x < 0 || y >= length || x >= length)
                    continue;

                if (table[y][x] === standard && visited[y][x] === false) {
                    piece.push([y, x]);
                    visited[y][x] = true;
                } else
                    continue;

                if (y - 1 >= 0) 
                    deque.push([y - 1, x]);
                if (y + 1 < length)  
                    deque.push([y + 1, x]);
                if (x - 1 >= 0) 
                    deque.push([y, x - 1]);
                if (x + 1 < length)  
                    deque.push([y, x + 1]);
            }
            if(piece.length > 0)
                piece_list.push(piece);
        }

    const piece_length = piece_list.length;
    const minmax_list = [];
    for(const piece of piece_list){
        let [ymin, xmin] = [piece[0][0], piece[0][1]];
        let [ymax, xmax] = [ymin, xmin];
        for(let [y,x] of piece){
            if(y < ymin)
                ymin = y;
            if(x < xmin)
                xmin = x;
            if(y > ymax)
                ymax = y;
            if(x > xmax)
                xmax = x;
        }
        minmax_list.push([ymin, xmin, ymax, xmax]);
    }
    
    const piece_index_list = []
    for(let i = 0; i < piece_length; i++) {
        let [ymin, xmin, _, __] = minmax_list[i];
        const temp = [];
        for (let [y, x] of piece_list[i]) {
            y = y - ymin;
            x = x - xmin;
            temp.push([y, x]);
        }
        piece_index_list.push(temp);
    }

    if(rotation) {

        const rotate_number = 4;
        const piece_rotate_rectangle_list = [];
        const length_for_rotation = [];
        for(let i = 0; i < piece_length; i++) {
            const temp = [];
            const [ymin, xmin, ymax, xmax] = minmax_list[i];
            const height = ymax - ymin + 1;
            const width = xmax - xmin + 1;
            const max_length = height > width ? height : width; 
            length_for_rotation.push(max_length);
            for(let i = 0; i < rotate_number; i++)
                if(i % 2 === 0) 
                    temp.push(new Array(height).fill(0).map(() => new Array(width).fill(0)));
                else 
                    temp.push(new Array(width).fill(0).map(() => new Array(height).fill(0)));
            piece_rotate_rectangle_list.push(temp);
        }
        
        const piece_rotate_index_list = [];
        for (let i = 0; i < piece_length; i++) {
            const [temp90, temp90_origin] = [[],[]]; 
            const [temp180, temp180_origin] = [[],[]]; 
            const [temp270, temp270_origin] = [[],[]]; 

            const length = length_for_rotation[i];
            for (const [y, x] of piece_index_list[i])
                temp90.push([x, length - y - 1]);
            for (const [y, x] of temp90)
                temp180.push([x, length - y - 1]);
            for (const [y, x] of temp180)
                temp270.push([x, length - y - 1]);

            let [ymin, xmin] = [length-1, length-1];
            for(let [y, x] of temp90){
                if(y < ymin)
                    ymin = y;
                if(x < xmin)
                    xmin = x;
            }
            for (let [y, x] of temp90) {
                y = y - ymin;
                x = x - xmin;
                temp90_origin.push([y, x]);
            }
            
            [ymin, xmin] = [length-1, length-1];
            for(let [y, x] of temp180){
                if(y < ymin)
                    ymin = y;
                if(x < xmin)
                    xmin = x;
            }
            for (let [y, x] of temp180) {
                y = y - ymin;
                x = x - xmin;
                temp180_origin.push([y, x]);
            }

            [ymin, xmin] = [length-1, length-1];
            for(let [y, x] of temp270){
                if(y < ymin)
                    ymin = y;
                if(x < xmin)
                    xmin = x;
            }
            for (let [y, x] of temp270) {
                y = y - ymin;
                x = x - xmin;
                temp270_origin.push([y, x]);
            }
            piece_rotate_index_list.push([piece_index_list[i], temp90_origin, temp180_origin, temp270_origin]);
        }

        for (let i = 0; i < piece_length; i++)
            for (let j = 0; j < rotate_number; j++)
                for (let piece_rotate_index of piece_rotate_index_list[i][j]) {
                    let [y, x] = piece_rotate_index;
                    piece_rotate_rectangle_list[i][j][y][x] = 1;
                }
        return piece_rotate_rectangle_list;
    }
    else{
        const piece_rectangle_list = [];
        for(const minmax of minmax_list){
            let [ymin, xmin, ymax, xmax] = minmax;
            let height = ymax - ymin + 1;
            let width = xmax - xmin + 1;
            piece_rectangle_list.push(new Array(height).fill(0).map(() => new Array(width).fill(0)));
        }
        
        for(let i = 0; i < piece_length; i++)
            for(const [y, x] of piece_index_list[i])
                piece_rectangle_list[i][y][x] = 1;
        return piece_rectangle_list;
    }
}
function solution(game_board, table) {

    let answer = 0;

    const space_rectangle_list = get_piece(game_board, standard = 0);
    const puzzle_rotate_rectangle_list = get_piece(table, standard = 1, rotation = true);

    for(let space_rectangle of space_rectangle_list) {
        const space_height = space_rectangle.length;
        const space_width = space_rectangle[0].length;
        let puzzle_delete = false;

        for (let i = 0; i < puzzle_rotate_rectangle_list.length; i++) {
            let rotate_escape = false;
            let count = 0;

            for (const puzzle_rectangle of puzzle_rotate_rectangle_list[i]) {
                const puzzle_height = puzzle_rectangle.length;
                const puzzle_width = puzzle_rectangle[0].length;
                if (space_height === puzzle_height && space_width === puzzle_width) {
                    for (let j = 0; j < puzzle_height; j++) {
                        if (puzzle_rectangle[j].every((value, idx) => value === space_rectangle[j][idx])) {
                            count += puzzle_rectangle[j].reduce((a, b) => a + b, 0);
                            rotate_escape = true; // 탈출 조건
                        } else {
                            count = 0;
                            rotate_escape = false;
                            break;
                        }
                    }
                }
                
                if(rotate_escape) {
                    answer+=count;
                    puzzle_delete = true;
                    break;
                }
            }
            if(puzzle_delete) {
                puzzle_rotate_rectangle_list.splice(i,1);
                break;
            }
        }
    }
    return answer;
}