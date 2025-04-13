import sys
input = sys.stdin.readline
write = sys.stdout.write

M = int(input())
S = 0  # 공집합을 0으로 표현 (비트마스킹)

for _ in range(M):
    cmd = input().strip().split()

    if cmd[0] == 'add':
        x = int(cmd[1])
        S |= (1 << x)
    elif cmd[0] == 'remove':
        x = int(cmd[1])
        S &= ~(1 << x)
    elif cmd[0] == 'check':
        x = int(cmd[1])
        write('1\n' if (S & (1 << x)) else '0\n')
    elif cmd[0] == 'toggle':
        x = int(cmd[1])
        S ^= (1 << x)
    elif cmd[0] == 'all':
        S = (1 << 21) - 1  # 1~20 비트 모두 1로 설정
    elif cmd[0] == 'empty':
        S = 0
