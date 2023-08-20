function solution(my_string) {
    return [...my_string].reduce((a, b, i, arr) => {
        const original = arr.join('');

        a = [...a, original.slice(i)].sort();

        return a;
    }, []);
}