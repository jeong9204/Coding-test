function solution(enroll, referral, seller, amount) {
    const BOSS = '-';
    const profit = new Map();
    const parent = new Map();

    function updateProfit(person, earn) {
        do {
            const stolen = Math.floor(earn / 10);
            profit.set(person, (profit.get(person) || 0) + earn - stolen);
            person = parent.get(person);
            earn = stolen;
        } while (earn !== 0 && person !== BOSS);
    }

    function buildParent(enroll, ref) {
        for (let i = 0; i < enroll.length; i++) {
            parent.set(enroll[i], ref[i]);
        }
    }

    buildParent(enroll, referral);

    for (let i = 0; i < seller.length; i++) {
        updateProfit(seller[i], 100 * amount[i]);
    }

    const answer = enroll.map(person => profit.get(person) || 0);
    return answer;
}