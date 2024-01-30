function solution(m, n, startX, startY, balls) {
    const answer = [];
    for(let [targetX, targetY] of balls){
        const candidate_x_down = (targetX - startX)**2 + (targetY + startY)**2;
        const candidate_x_up = (targetX - startX)**2 + (targetY - 2*n + startY)**2;
        const candidate_y_left = (targetX + startX)**2 + (targetY - startY)**2;
        const candidate_y_right = (targetX - 2*m + startX)**2 + (targetY-startY)**2;

        if(targetX === startX) // 같은 X축에 있는 경우, 3방향만 고려 필요
            if(targetY > startY) // 위에 빼고 다가능
                answer.push(Math.min(candidate_x_down, candidate_y_left, candidate_y_right));
            else // 아래빼고 다가능
                answer.push(Math.min(candidate_x_up, candidate_y_left, candidate_y_right));
        else if(targetY === startY) // 같은 Y축에 있는 경우, 3방향만 고려 필요
            if(targetX > startX) // 오른쪽 뺴고 다가능
                answer.push(Math.min(candidate_x_down, candidate_x_up, candidate_y_left));
            else // 왼쪽 빼고 다가능
                answer.push(Math.min(candidate_x_down, candidate_x_up, candidate_y_right));
        else // 다가능
            answer.push(Math.min(candidate_x_down, candidate_x_up, candidate_y_left, candidate_y_right));
    }
    return answer;
}