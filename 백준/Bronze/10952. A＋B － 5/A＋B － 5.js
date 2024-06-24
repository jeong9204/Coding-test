var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split('\n');


for(let i=0;i<input.length;i++){
    let A = parseInt(input[i].split(' ')[0]);
    let B = parseInt(input[i].split(' ')[1]);
    let result = A + B;
  
    if(result===0){
        break;
    } else {console.log(result)
        };
};