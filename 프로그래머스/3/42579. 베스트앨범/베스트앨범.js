function solution(genres, plays) {
    const infos = genres.reduce((obj, genre, index) => ( 
        obj = { ...obj, [genre]: {
            totalPlay: (obj[genre]?.totalPlay || 0) + plays[index],
            songs: (obj[genre]?.songs || []).concat([{index, play: plays[index]}])
        }
    }, obj), {});

    const answer = [];
    new Set(genres).forEach(genre => {
        answer.push(infos[genre]);
    });

   return answer
       .sort((a, b) => b.totalPlay - a.totalPlay)
       .map(info => info.songs
            .sort((a, b) => {
                if(a.play === b.play) {
                    return a.index - b.index
                }
                return b.play - a.play
             })
            .map(song => song.index)
            .slice(0, 2))
       .flat();
}
