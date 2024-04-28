class Trie {
    constructor() {
        this.root = {}; // chr|visited
    }

    insert(s) {
        let cur = this.root;
        while (s) {
            if (!cur[s[0]]) {
                cur[s[0]] = [{}, 0];
            }
            cur[s[0]][1]++;
            cur = cur[s[0]][0];
            s = s.slice(1);
        }
    }

    find(s) {
        let cur = this.root;
        let preV = 0;
        while (s) {
            if (s[0] === '?') return preV;
            else {
                if (!cur[s[0]]) return 0;
                preV = cur[s[0]][1];
                cur = cur[s[0]][0];
            }
            s = s.slice(1);
        }
        return preV;
    }
}

function solution(words, queries) {
    const prefixDict = {};
    const suffixDict = {};
    const lenDict = {};

    const result = [];

    words.forEach(word => {
        const len = word.length;
        if (!prefixDict[len]) prefixDict[len] = new Trie();
        if (!suffixDict[len]) suffixDict[len] = new Trie();

        prefixDict[len].insert(word);
        suffixDict[len].insert(word.split('').reverse().join(''));
        lenDict[len] = (lenDict[len] || 0) + 1;
    });

    queries.forEach(query => {
        if (query[0] === '?' && query[query.length - 1] === '?') {
            result.push(lenDict[query.length] || 0);
        } else if (query[query.length - 1] === '?') { // prefix_query
            result.push(prefixDict[query.length] ? prefixDict[query.length].find(query) : 0);
        } else if (query[0] === '?') { // suffix_query
            result.push(suffixDict[query.length] ? suffixDict[query.length].find(query.split('').reverse().join('')) : 0);
        } else {
            console.log("IMPOSSIBLE", query);
        }
    });

    return result;
}
