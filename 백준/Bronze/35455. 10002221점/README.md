# [Bronze III] 10002221점 - 35455 

[문제 링크](https://www.acmicpc.net/problem/35455) 

### 성능 요약

메모리: 9360 KB, 시간: 88 ms

### 분류

수학, 사칙연산

### 제출 일자

2026년 4월 7일 23:22:11

### 문제 설명

<p>잇창명은 지금도 취미로 <a href="/problem/24394">리듬 게임</a>을 한다. 위에서 내려오는 노트를 정확한 타이밍에 처리하면 높은 점수를 얻을 수 있다. 플레이어는 노트가 내려올 때마다 다음 $4$가지 판정 중 하나를 받게 된다.</p>

<ul>
<li><strong>Perfect</strong></li>
<li><strong>Great</strong></li>
<li><strong>Good</strong></li>
<li><strong>Miss</strong></li>
</ul>

<p>$N$개의 노트가 주어지는 곡의 각 판정의 점수는 <strong>Good</strong> 판정의 점수인 $x=\frac{10^7}{2N}$을 기준으로 다음과 같이 계산한다.</p>

<ul>
<li><strong>Perfect</strong> = $2x+1$</li>
<li><strong>Great</strong> = $2x$</li>
<li><strong>Good</strong> = $x$</li>
<li><strong>Miss</strong> = $0$</li>
</ul>

<p>플레이어는 $N$개의 노트에 대해 받은 모든 판정의 점수 합의 <strong>정수 부분</strong>만큼 점수를 획득한다. 예를 들어 노트가 $1\, 000$개 있는 곡에서 <strong>Perfect</strong>를 $70$개, <strong>Great</strong>를 $500$개, <strong>Good</strong>을 $1$개 받으면 $5\, 705\, 070$점을 획득한다. 잇창명은 매번 달성할 수 있는 최고 점수를 획득해 사람들을 놀라게 하고 싶다. 잇창명이 플레이한 곡의 노트 수와 받은 점수가 주어질 때, 최고 점수를 받았는지 판정하시오.</p>

### 입력 

 <p>첫 번째 줄에 테스트 케이스의 개수 $T$가 주어진다. $(1 \le T \le 100)$</p>

<p>테스트 케이스의 첫 번째 줄에 노트의 개수 $N$과 잇창명이 받은 점수 $S$가 공백으로 구분되어 주어진다. $S$는 정수이다. $(1\le N\le 2\, 236$; $0\le S\le 10^7+N)$</p>

<p>지문에서 설명한 규칙대로 획득할 수 있는 점수만 주어진다.</p>

### 출력 

 <p>테스트 케이스의 첫 번째 줄에 잇창명이 최고 점수를 획득했다면 <span style="color:#e74c3c;"><code>Yes</code></span>, 그렇지 않다면 <span style="color:#e74c3c;"><code>No</code></span>를 출력한다.</p>

