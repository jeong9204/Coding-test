function match(r, c, key, lock) {
    let tmpLock = JSON.parse(JSON.stringify(lock));
    for (let i=0; i<key.length; i++) {
        for (let j=0; j<key.length; j++) {
            if (r+i >= tmpLock.length || c+j >= tmpLock.length || c+j < 0 || r+i < 0)
                continue;
            else if(tmpLock[r+i][c+j] == 1 && key[i][j] == 1)
                return false;
            else if(key[i][j] == 1) 
                tmpLock[r+i][c+j] = 1;
        }
    }

    for (let i=0; i<tmpLock.length; i++) {
        for (let j=0; j<tmpLock.length; j++) {
            if(tmpLock[i][j] == 0)
                return false;
        }
    }

    return true;
}

function rotate(key) {
    let tmpKey = JSON.parse(JSON.stringify(key));

    for(let i=0; i<key.length; i++) {
        for (let j=0; j<key.length; j++) {
            key[i][j] = tmpKey[key.length-j-1][i]
        }
    }
}

function solution(key, lock) {
    let result = false;

    for (let cnt=0; cnt<4; cnt++) {
        rotate(key)
        for (let i=-key.length; i<lock.length; i++) {
            for (let j=-key.length; j<lock.length; j++) {
                result = result || match(i,j,key,lock);
            }
        }
    }

    return result;
}