function minCheck(target, leftMin, rightMin) {
    return [target > leftMin, target > rightMin];
}

function solution(a) {
    const aL = a.length;
    if(aL <= 3) return aL;

    let notSelect = 0;

    let leftI  = 0;
    let leftMin   = a[leftI];

    let rightI = aL - 1;
    let rightMin  = a[rightI];
    while((rightI - leftI) > 1) {
        const leftMinBig = leftMin > rightMin;
        if(leftMinBig) leftI++;
        else          rightI--;

        const target = a[leftMinBig ? leftI : rightI];
        const [leftBig, rightBig] = minCheck(target, leftMin, rightMin);
        if(leftBig && rightBig) notSelect++;

        if(leftMinBig && !leftBig)    leftMin = target;
        if(!leftMinBig && !rightBig) rightMin = target;
    }
    return aL - notSelect;
}