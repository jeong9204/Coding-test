function solution(bandage, health, attacks) {
    // 끝나는 시간
    var endTime = attacks[attacks.length - 1][0];
    // 최대 체력
    var maxHealth = health;
    // 공격 시간을 나타내는 맵
    var attackMap = new Map(attacks);

    // 연속 시간
    var successTime = 1;

    for (var time = 1; time <= endTime; time++) {
        // 공격을 당할 경우
        if (attackMap.has(time)) {
            successTime = 1;
            health -= attackMap.get(time);
            if (health <= 0) {
                return -1;
            }
        }
        // 공격 안당하는 경우
        else {
            health = Math.min(maxHealth, health + bandage[1]);
            if (successTime === bandage[0]) {
                health = Math.min(maxHealth, health + bandage[2]);
                successTime = 1;
            } else {
                successTime += 1;
            }
        }
    }

    return health;
}