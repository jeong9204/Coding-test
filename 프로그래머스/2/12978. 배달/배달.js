function findShortest(distance, visit) {
    let min = 1000000000000000;
    let index = -1;

    for (let i in distance) {
        if (distance[i] <= min && !visit[i]) {
            min = distance[i];
            index = i;
        }
    }

    return index;
}

function solution(N, road, K) {
    let answer = 0;
    let distance = {};
    let visit = {};

    for (let i = 1; i <= N; i++) {
        distance[i] = 1000000000000000;
        visit[i] = false;
    }

    distance[1] = 0;
    visit[1] = true;

    let graph = {};
    for (let i = 1; i <= N; i++) {
        graph[i] = [];
    }

    for (let r of road) {
        graph[r[0]].push(r);
        graph[r[1]].push([r[1], r[0], r[2]]);
    }

    for (let u of graph[1]) {
        if (distance[u[1]] > u[2]) {
            distance[u[1]] = u[2];
        }
    }

    distance[1] = 0;

    for (let _ = 0; _ < N - 1; _++) {
        let now = findShortest(distance, visit);
        visit[now] = true;

        for (let u of graph[now]) {
            let update = distance[now] + u[2];

            if (distance[u[1]] > update) {
                distance[u[1]] = update;
            }
        }
    }

    for (let i in distance) {
        if (distance[i] <= K) {
            answer += 1;
        }
    }

    return answer;
}