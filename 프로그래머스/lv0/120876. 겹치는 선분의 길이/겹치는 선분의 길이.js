function solution(lines) {
  let answer = 0;

  const last_dot = Math.max(lines[0][1], lines[1][1], lines[2][1]);
  const first_dot = Math.min(lines[0][0], lines[1][0], lines[2][0]);

  const f_sector = Array.from({ length: lines[0][1] - lines[0][0] }, (_, i) => [    i + lines[0][0],
    i + lines[0][0] + 1,
  ]);
  const s_sector = Array.from({ length: lines[1][1] - lines[1][0] }, (_, i) => [    i + lines[1][0],
    i + lines[1][0] + 1,
  ]);
  const t_sector = Array.from({ length: lines[2][1] - lines[2][0] }, (_, i) => [    i + lines[2][0],
    i + lines[2][0] + 1,
  ]);
  const total_sector = Array.from({ length: last_dot - first_dot }, (_, i) => [    i + first_dot,    i + first_dot + 1,  ]);
  const count_dict = Object.fromEntries(
    total_sector.map((sec) => [sec[0], 0])
  );

  total_sector.forEach((sec) => {
    count_dict[sec[0]] += f_sector.filter((s) => s.toString() === sec.toString()).length;
    count_dict[sec[0]] += s_sector.filter((s) => s.toString() === sec.toString()).length;
    count_dict[sec[0]] += t_sector.filter((s) => s.toString() === sec.toString()).length;
  });

  Object.entries(count_dict).forEach(([k, v]) => {
    if (v >= 2) {
      answer += 1;
    }
  });

  return answer;
}
