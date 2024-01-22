function sq2Keys_(sq) {
    if(sq[0] == '-') {
        return [['java',sq[1],sq[2],sq[3]],['cpp',sq[1],sq[2],sq[3]],['python',sq[1],sq[2],sq[3]]]
    }
    else if(sq[1] == '-') {
        return [[sq[0],'backend',sq[2],sq[3]],[sq[0],'frontend',sq[2],sq[3]]]
    }
    else if(sq[2] == '-') {
        return [[sq[0],sq[1],'junior',sq[3]],[sq[0],sq[1],'senior',sq[3]]]
    }
    else if(sq[3] == '-') {
        return [[sq[0],sq[1],sq[2],'chicken'],[sq[0],sq[1],sq[2],'pizza']]
    }
    return [sq]
}

function sq2Keys(sq) {
    let result = [sq];
    for (let i=0; i<4; i++) {
        let tmp = []
        for (let j of result) {
            tmp = tmp.concat(sq2Keys_(j));
        }
        result = tmp;
    }

    return result.map(e => JSON.stringify(e));
}

function findAbove(list, num) {

    let start = 0;
    let end = list.length-1;
    while (start<end) {
        let mid = start + Math.floor((end-start)/2)
        if (list[mid] == num) {
            start = mid;
            break;
        }
        else if (list[mid] > num)
            end = mid - 1;
        else {
            start = mid + 1;
        }
    }

    while (list[start] >= num || start >= list.length) {
        start--;
    }

    return list.length - start -1;
}

function solution(info, query) {
    let result = [];

    let data_base = {};

    for (let i of info) {
        let key = JSON.stringify(i.split(" ").slice(0,4))
        if (data_base[key] == undefined) 
            data_base[key] = [parseInt(i.split(" ")[4])];
        else
            data_base[key].push(parseInt(i.split(" ")[4]))
    }

    for (let key in data_base) 
        data_base[key].sort((a,b)=>a-b)

    for (let q of query) {
        let sq = q.split(" ")
        let score = parseInt(sq[7])
        sq = [sq[0],sq[2],sq[4],sq[6]];
        let keys = sq2Keys(sq)

        let tmp = 0;
        for (let key of keys) {
            if (data_base[key] == undefined)
                continue
            tmp += findAbove(data_base[key], score)
        }
        result.push(tmp)
    }

    return result;
}