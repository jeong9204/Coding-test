function solution(fees, records) {
    const carObj = {};
    const deadLine = 23 * 60 + 59;
    const [baseTime, baseFee, overTime, overFee] = fees;
    const calcPrice = (time) => {
        if(time <= baseTime) {
            return baseFee;
        }
        const calcTime = time - baseTime;
        return baseFee + Math.ceil(calcTime / overTime) * overFee;
    };
    const calcTime = (times) => {
        const [HH, MM] = times.split(':');
        return HH * 60 + +MM;
    }
    
    records.forEach((record) => {
        const [times, id, type] = record.split(' ');
        const time = calcTime(times);
        carObj[id] = carObj[id] || {times:0, remain:null};
        if(type === 'IN') {
            carObj[id].remain = time;
        } else {
            carObj[id].times += time - carObj[id].remain;
            carObj[id].remain = null;
        }
    });
    
    const ids = Object.keys(carObj).sort((a,b) => +a - b);
    return ids.map((id) => {
        if(carObj[id].remain !== null) {
            carObj[id].times += deadLine - carObj[id].remain;
        }
        return calcPrice(carObj[id].times);
    })
}