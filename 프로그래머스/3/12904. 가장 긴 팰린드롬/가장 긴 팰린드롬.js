function solution(s) {
    let result = 1;
    if (s.length === 1) return 1;

    for (let i = 0; i <= s.length-2; i++) {
        const curr = s[i];
        const next = s[i+1];
        const nextnext = s[i+2];

        if (curr === next) {
            const currPalinLen = getPalinLen(i, i+1, s);
            result = Math.max(result, currPalinLen); 
        }

        if (curr === nextnext) {
            const currPalinLen = 1 + getPalinLen(i, i+2, s);
            result = Math.max(result, currPalinLen);
        }
    }
    return result;
}

function getPalinLen(left, right, s) {
    let match = 0;
    while(left >= 0 && right < s.length && s[left] === s[right]) {
        match++;
        left--;
        right++;
    }
    return match*2;
}