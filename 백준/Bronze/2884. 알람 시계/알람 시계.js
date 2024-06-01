var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split(' ');
var H = parseInt(input[0]);
var M = parseInt(input[1]);
if(M < 45) {
			H--;		// 시(hour) 1 감소
			M= 60 - (45 - M); 	// 분(min) 감소
			if(H < 0) {
				H = 23;
			}
    console.log(H + " " + M)
		}
		else {
                console.log(H + " " + (M - 45))
		}