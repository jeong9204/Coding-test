function solution(routes) {
    let answer = 0;

    routes.sort(function compare(a, b) {
    return a[0] - b[0];
    });
    let min = 0;
    let max = 0;

    for(let i = 0; i < routes.length; i++){
        if(i == 0){
            answer+=1;
            min = routes[i][0];
            max = routes[i][1];
            continue;
        }
        else{ 
            if(min<=routes[i][0] && routes[i][1]<=max){
                min = routes[i][0];
                max = routes[i][1];
                continue;
            }

            if(min<=routes[i][0] && routes[i][0]<=max){
                continue;
            }
            else{ 
                answer+=1;
                min = routes[i][0];
                max = routes[i][1];
            }
        }
    }
    return answer;
}
