var fs = require('fs');
var n = fs. readFileSync('/dev/stdin').toString().trim();
var ans1 = parseInt(n * 0.78) ;
var ans2 = parseInt(n * 0.8 + n * 0.2 * 0.78) ;
console. log(ans1 + ' ' + ans2);