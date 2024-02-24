let time = 0;

function calcTime(process) {
  const [requestTime, takeTime] = process;
  return takeTime;
}

function solution(jobs) {
  if (Array.isArray(jobs) && jobs.length > 0) {
    let length = jobs.length;
    let avg = 0;

    while (jobs.length > 0) {
      const requested = jobs.filter((item) => item[0] <= time);

      if (requested.length <= 0) {
        jobs.sort((a, b) => a[0] - b[0]);
        time = jobs[0][0];
      } else {
        requested.sort((a, b) => calcTime(a) - calcTime(b));
        const selected = requested[0];
        time += selected[1];
        avg += time - selected[0];

        const selectedIdx = jobs.findIndex(
          (item) => item[0] === selected[0] && item[1] === selected[1]
        );
        if (selectedIdx > -1) jobs.splice(selectedIdx, 1);
      }
    }

    return Math.floor(avg / length);
  }

  return 0;
}