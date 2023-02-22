function solution(numer1, denom1, numer2, denom2) {
    let numer = numer1*denom2 + numer2*denom1;
    let denom = denom1*denom2;
    let num = 0;

    for(let i=1;i<=denom;i++){
        if(numer%i===0 && denom%i===0) num = i
    }

    return [numer/num,denom/num];
}