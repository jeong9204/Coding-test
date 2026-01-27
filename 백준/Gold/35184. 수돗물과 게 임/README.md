# [Gold II] 수돗물과 게 임 - 35184 

[문제 링크](https://www.acmicpc.net/problem/35184) 

### 성능 요약

메모리: 38104 KB, 시간: 456 ms

### 분류

구현, 그래프 이론, 최단 경로, 데이크스트라, 격자 그래프

### 제출 일자

2026년 1월 27일 23:26:30

### 문제 설명

<p><mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"> <mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi><mjx-mo class="mjx-n" space="3"><mjx-c class="mjx-cD7"></mjx-c></mjx-mo><mjx-mi class="mjx-i" space="3"><mjx-c class="mjx-c1D440 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi><mo>×</mo><mi>M</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$N\times M$</span></mjx-container> 격자 위의 한 칸에 게가 살고 있다. 여기에는 노래가 없기 때문에, 게는 가장 가까운 바다로 가야 한다. 현재 격자의 각 칸은 게, 수돗물, 바다 중 정확히 하나가 놓여 있거나 비어 있다.</p>

<p>게는 격자의 축과 평행한 어떤 방향을 바라보고 있고, 게걸음으로 이동하거나 몸을 돌려 바라보는 방향을 바꿀 수 있다. 게걸음으로는 자신이 바라보는 방향에 수직한 방향으로 한 칸 이동할 수 있고, 이동하는 데 1의 시간이 걸린다. 몸을 한 번 돌리면 동일한 칸 위에서 자신이 원래 바라보던 방향에서 반시계방향으로 90도 돌아간 방향을 바라보게 되며, <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D447 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>T</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$T$</span></mjx-container>의 시간이 걸린다.</p>

<p>게는 바다 칸이나 빈 칸, 자신이 원래 있던 칸을 자유롭게 돌아다닐 수 있지만, 수돗물 칸에서는 스스로 이동할 수 없다. 대신 게가 수돗물 칸에 들어가는 순간, 추가 시간 없이 아래 과정이 즉시 일어난다.</p>

<ol>
<li>게의 몸이 반시계방향으로 90도 회전한다.</li>
<li>회전 직후 그 바라보는 방향으로 한 칸 이동한다.</li>
</ol>

<p>만약 이동한 칸도 수돗물 칸이라면, 수돗물이 아닌 칸에 도착하거나 격자 밖으로 나가기 전까지 위 과정을 추가 시간 없이 계속 반복한다.</p>

<p>성현이는 당장이라도 끊어질 듯한 게가 자신의 칸에서 바다까지 격자를 한 번도 벗어나지 않고 이동할 수 있는지 알고 싶어한다. 바다까지 가는데 걸리는 최단 시간을 구하여라.</p>

### 입력 

 <p>첫째 줄에는 격자의 크기를 나타내는 정수 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi><mjx-mo class="mjx-n"><mjx-c class="mjx-c2C"></mjx-c></mjx-mo><mjx-mi class="mjx-i" space="2"><mjx-c class="mjx-c1D440 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi><mo>,</mo><mi>M</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$N,M$</span></mjx-container>과, 게가 몸을 돌리는 데 드는 시간을 나타내는 정수 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D447 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>T</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$T$</span></mjx-container>가 공백을 사이에 두고 주어진다. 이후 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$N$</span></mjx-container>줄에 걸쳐 격자의 상태가 주어진다. 이중 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D456 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>i</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$i$</span></mjx-container>번째 줄에는 격자의 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D456 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>i</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">$i$</span></mjx-container>행이 주어지며, 각 문자가 의미하는 바는 아래와 같다.</p>

<ul>
<li><code>.</code>: 빈 칸</li>
<li><code>T</code>: 수돗물</li>
<li><code>S</code>: 바다 칸으로, 전체 격자에 최소 한 칸 이상 존재한다.</li>
<li><code>0-3</code>: 게가 존재하는 칸으로, 게가 바라보고 있는 방향을 의미한다. <code>0</code>일 경우 위쪽, <code>1</code>일 경우 왼쪽, <code>2</code>일 경우 아래쪽, <code>3</code>일 경우 오른쪽을 바라보고 있다. 게가 존재하는 칸은 격자에 정확히 한 칸 뿐이다.</li>
</ul>

### 출력 

 <p>만약 게가 격자를 벗어나지 않고 바다에 도착할 수 없다면 첫째 줄에 <code>-1</code>을 출력한다. 그렇지 않다면 바다에 도착하기까지 걸리는 최단 시간을 출력한다.</p>

