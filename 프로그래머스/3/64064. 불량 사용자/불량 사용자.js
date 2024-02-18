function solution(user_id, banned_id) {
    let ids = [];

    function dfs(visited, start, count) {
        if (count === banned_id.length) {
            let list = [];
            for (let i = 0; i < visited.length; i++) {
                if (visited[i]) {
                    list.push(user_id[i]);
                }
            }
            if (!ids.some((existingList) => compareArrays(existingList, list))) {
                ids.push(list);
            }
            return;
        }

        for (let i = start; i < banned_id.length; i++) {
            for (let j = 0; j < user_id.length; j++) {
                let banned = banned_id[i];
                let user = user_id[j];

                let checked = true;
                if (banned.length !== user.length) checked = false;
                else {
                    for (let k = 0; k < banned.length; k++) {
                        if (banned[k] === '*') continue;
                        if (banned[k] !== user[k]) {
                            checked = false;
                            break;
                        }
                    }
                }

                if (checked && !visited[j]) {
                    visited[j] = true;
                    dfs(visited, i + 1, count + 1);
                    visited[j] = false;
                }
            }
        }
    }

    function compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    let visited = new Array(user_id.length).fill(false);
    dfs(visited, 0, 0);

    return ids.length;
}