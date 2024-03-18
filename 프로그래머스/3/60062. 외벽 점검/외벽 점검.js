function permutation(candidates, Prepermuation, res) {
    if (candidates.length === 0) {
        res.push(Prepermuation);
        return;
    } else {
        for (let i = 0; i < candidates.length; i++) {
            permutation(candidates.slice(0, i).concat(candidates.slice(i + 1)), Prepermuation.concat(candidates[i]), res);
        }
        return;
    }
}

function solution(n, weak, dist) {
    dist.sort((a, b) => b - a);

    for (let i = 1; i <= dist.length; i++) {
        let permutations = [];
        permutation(dist.slice(0, i), [], permutations);
        for (let p of permutations) {
            for (let start = 0; start < weak.length; start++) {
                let _left = weak.slice(0, start);
                let _right = weak.slice(start);
                let traverse_list = _right.concat(_left.map(x => x + n));
                let candidate = [...p];
                while (traverse_list.length > 0 && candidate.length > 0) {
                    let cur = traverse_list.shift();
                    let d = candidate.shift();
                    let Cover = cur + d;
                    while (traverse_list.length > 0 && traverse_list[0] <= Cover) {
                        traverse_list.shift();
                    }
                }
                if (traverse_list.length === 0) {
                    return i;
                }
            }
        }
    }
    return -1;
}
