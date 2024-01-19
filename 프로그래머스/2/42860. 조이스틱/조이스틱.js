function solution(name) {

    // https://devbirdfeet.tistory.com/185
    const alphabet = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));
    // let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let dictObject = {};
    let length = name.length;
    let updown = 0;
    let leftright = length-1;
    let Aindex = 0;

    for(let i = 0; i < alphabet.length; i++){
        dictObject[alphabet[i]] = i; // 0 ~ 25
    }

    for(let i = 0; i < length; i++){

         // 상하
        if(dictObject[name.at(i)] <= 12){ // M보다 작거나 같을때
            updown+=dictObject[name.at(i)];
        }
        else{ // M보다 클때
            updown+=(alphabet.length-dictObject[name.at(i)]);
        }

        // A_index 기억하기
        Aindex = i;
        while(name.at(Aindex) == "A"){
            Aindex+=1;
        }

        // 앞으로 가는 경우
        if(i == 0)
            leftright = Math.min(length-Aindex, leftright);
        else
            leftright = Math.min(2*(i-1) + length-Aindex, leftright);

        // 처음부터 뒤로 가는 경우
        if(i == 0)
            leftright = Math.min(leftright, length-Aindex);
        else
            leftright = Math.min(leftright, i-1 + (length-Aindex)*2);
    }
    return updown + leftright
}
