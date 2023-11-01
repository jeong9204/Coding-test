function solution(bridge_length, weight, truck_weights) {
    let sec = 0;
    let sum = 0;
    const passing = [];
    while (truck_weights.length || passing.length) {
        if(weight >= sum + truck_weights[0] && passing.length <= bridge_length) {
            const truck = truck_weights.shift();
            sum += truck;
            passing.push([truck, sec + bridge_length]);
            sec++
        } else {
            const [truck, passedSec] = passing.shift();
            if(sec < passedSec) {
                sec = passedSec;
            }
            sum -= truck;
        }
    }
    return sec + 1;
}

// const solution = (bridge_length, weight, truck_weights) => {
//         let sec = 0; // 경과시간
//         let sum = 0; // 다리에 있는 트럭의 무게합
//         const passing = []; // 건너는 중인 트럭 배열
//         while (truck_weights.length || passing.length) { 
//         // 대기트럭과 건너는 트럭이 모두 없어질 때까지 반복
//           if (weight >= sum + truck_weights[0] && passing.length <= bridge_length) { 
//             // 다리에 올라갈 수 있는 트럭의 최대수이하이며, weight보다 작다면 다리에 트럭을 올림 
//             const truck = truck_weights.shift(); 
//             sum += truck; // 현재 다리에 있는 트럭 무게의 합
//             passing.push([truck, sec + bridge_length]); // 트럭의 무게, 나갈 시간
//             sec++; // 초 증가
//           } else { 
//              // 더 이상 다리에 트럭을 올릴 수 없을 경우. 
//             const [truck, passedSec] = passing.shift(); // 트럭을 한대 pass.
//             if (sec < passedSec) { 
//                 // 다리에 트럭이 들어갈때만 초가 증가하기 때문에 계속 들어간다면 이전에 들어갔던 트럭의 나갈 시간보다 커질 경우가 생겨서 조건문이 필요. (testcase 4,5,6,9)
//               sec = passedSec; 
//               // 앞에 트럭이 나갈 떄 까지 못 들어가기 때문에 나간 트럭의 초로 변경.
//             }
//             sum -= truck; // 나간 트럭의 무게를 제외.
//           }
//         }

//         return sec + 1; 
//       };