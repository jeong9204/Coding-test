# [Bronze III] /gg - 34032 

[문제 링크](https://www.acmicpc.net/problem/34032) 

### 성능 요약

메모리: 29044 KB, 시간: 216 ms

### 분류

구현, 문자열

### 제출 일자

2025년 6월 27일 23:51:35

### 문제 설명

<h5 style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/1b146e65-dbb3-4dd4-b4de-a0425418f1e8/-/preview/"></h5>

<p><code>haru_101</code>이 플레이하는 게임에 <strong><code>/gg</code></strong> 명령어가 있다. 이 명령어는 항복 투표를 진행하기 위한 명령어로, 해당 팀의 각 팀원은 <strong><code>/gg</code></strong>를 입력함으로써 항복 의사를 밝힐 수 있다. 팀원 중 절반 이상이 <strong><code>/gg</code></strong> 명령어를 입력하면 팀은 항복하게 된다.</p>

<p>각 팀원의 명령어 입력 여부가 주어졌을 때, 해당 팀이 항복하게 되는지를 알아보자.</p>

### 입력 

 <p>첫째 줄에 팀원의 수를 나타내는 정수 $N$이 주어진다.</p>

<p>둘째 줄에 길이가 $N$인 알파벳 대문자 <code><span style="color:#e74c3c;">O</span></code>와 <code><span style="color:#e74c3c;">X</span></code>로만 이루어진 문자열 $S$가 주어진다.</p>

<p>$S$의 $i$번째 문자는 $i$번째 팀원이 <strong><code>/gg</code></strong> 명령어를 입력했다면 <code><span style="color:#e74c3c;">O</span></code>, <strong><code>/gg</code></strong> 명령어를 입력하지 않았다면 <code><span style="color:#e74c3c;">X</span></code>다.</p>

### 출력 

 <p>해당 팀이 항복하게 되면 <code><span style="color:#e74c3c;">Yes</span></code>, 그렇지 않다면 <code><span style="color:#e74c3c;">No</span></code>를 출력한다.</p>

