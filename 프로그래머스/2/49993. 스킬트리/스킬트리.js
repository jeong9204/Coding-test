function solution(skill, skill_trees) {
    var answer = 0;
    skill_trees.forEach((skill_tree) => {
        let idx = 0;
        let isPossibleSkillTree = true;
        skill_tree.split('').forEach(skillset => {
            if(skill.indexOf(skillset) > idx) {
                skill_tree = false;
            }
            if(skill[idx] === skillset) {
                idx++
            }
        })
        if(skill_tree) {
            answer++
        }
    })
    return answer;
}

// function solution(skill, skill_trees) {
//     let answer = 0;
//     skill_trees.forEach((skill_tree)=>{
//         let idx = 0,isPossibleSkillTree = true
//         skill_tree.split('').forEach(skillSet=>{
//             if(skill.indexOf(skillSet) > idx){
//                 skill_tree = false
//             }

//             if(skill[idx] === skillSet){
//                 idx++
//             }
//         })
//         if(skill_tree){
//             answer++
//         }
//     })
//     return answer;
// }