function solution(order) {
    let answer = 0;
    let americano = ['iceamericano', 'americanoice', 'hotamericano', 'americanohot', 'americano', 'anything']
    let cafelatte = ['icecafelatte', 'cafelatteice', 'hotcafelatte', 'cafelattehot', 'cafelatte']
    for(let i=0; i<order.length; i++) {
        if(americano.includes(order[i])) {
            answer += 4500
        } else if (cafelatte.includes(order[i])) {
            answer += 5000
        }
    }
    return answer;
}