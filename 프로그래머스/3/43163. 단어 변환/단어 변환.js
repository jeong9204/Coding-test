function solution(begin, target, words) {
    if(words.filter((el) => el === target).length === 0)
        return 0;

    const check = (original, compare) => {

        let cnt = 0;
        let result = false;
        let len = original.length;
        for(let i = 0; i < len; i++) {
            if(original[i] === compare[i])
                cnt++;
        }

        if(cnt === len - 1) 
            result = true;

        return result;
    }

    const DFS = (isVisited, presentBegin, cnt) => {
        if(presentBegin === target) {
            answer.push(cnt);
            return;
        }

        let list = isVisited.map((el, idx) => {
            if(el === false) return idx;
        }).filter((el) => el !== undefined);

        if(list.length === 0) return;

        for(let i = 0; i < list.length; i++) {
            let copy = isVisited.slice();
            let index = list[i];
            let nextWord = words[index];

            let isValid = check(presentBegin, nextWord);

            if(isValid === true) {
                let nextBegin = nextWord;
                let copyCnt = cnt + 1;
                let copy = isVisited.slice();

                copy[index] = true;

                DFS(copy, nextBegin, copyCnt);
            }
        }

        return;
    }

    let answer = [];

    for(let i = 0; i < words.length; i++) {

        let cnt = 0;
        let nextWord = words[i];

        let isValid = check(begin, nextWord);

        if(isValid === true) {
            let nextBegin = nextWord;
            cnt++;
            let isVisited = new Array(words.length).fill(false);

            isVisited[i] = true;

            DFS(isVisited, nextBegin, cnt);
        }
    }

    if(answer.length === 0) 
        return 0;
    else 
        return Math.min(...answer);
}