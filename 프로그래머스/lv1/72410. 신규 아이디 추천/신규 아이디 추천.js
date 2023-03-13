function solution(new_id) {
    let answer1 = new_id.toLowerCase();
    let answer2 = answer1.replace(/[^a-z0-9-_.]/g, '');
    let answer3 = answer2.replace(/\.+/g, '.');
    let answer4 = answer3.replace(/^\.|\.$/g, '');
    let answer5 = answer4.length === 0 ? 'a' : answer4
    let answer6 = answer5.length >= 16 ? answer5.slice(0, 15).replace(/\.$/, '') : answer5
   
    if (answer6.length < 3) {
        while (answer6.length < 3) {
          answer6 += answer6[answer6.length - 1];
        }
      }
    
    return answer6;
}