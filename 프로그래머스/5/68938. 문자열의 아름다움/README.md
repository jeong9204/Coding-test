# [level 5] 문자열의 아름다움 - 68938 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/68938) 

### 성능 요약

메모리: 38.9 MB, 시간: 35.82 ms

### 구분

코딩테스트 연습 > 월간 코드 챌린지 시즌1

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2024년 05월 14일 23:11:58

### 문제 설명

<p>어떤 문자열 x의 "아름다움"을 다음과 같이 정의합니다.</p>

<ul>
<li>만약 x의 모든 글자가 전부 같다면, <code>0</code>입니다.</li>
<li>그렇지 않다면, 서로 다른 글자가 위치해 있는 두 인덱스 <code>i</code>, <code>j</code>를 골랐을 때의 <code>j-i</code> 값들 중 최대값입니다.</li>
</ul>

<p>예를 들어, 문자열 "abbca"의 아름다움은 3입니다. 인덱스 <code>1(b)</code>과 <code>4(a)</code>를 고르거나, 또는 <code>0(a)</code>과 <code>3(c)</code>를 고를 때 최대값이기 때문입니다.</p>

<p>영어 소문자로 이루어진 문자열 s가 매개변수로 주어집니다. s의 모든 부분문자열의 아름다움의 합을 return 하도록 solution 함수를 완성해주세요.</p>

<hr>

<h5>제한 사항</h5>

<ul>
<li>s의 길이는 1 이상 300,000 이하입니다.</li>
</ul>

<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>s</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td><code>"baby"</code></td>
<td>9</td>
</tr>
<tr>
<td><code>"oo"</code></td>
<td>0</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p>입출력 예 #1</p>

<ul>
<li>다음 표는 "baby"의 각 부분문자열과 그 아름다움을 나타낸 것입니다.</li>
</ul>
<table class="table">
        <thead><tr>
<th>인덱스 범위</th>
<th>부분문자열</th>
<th>아름다움</th>
</tr>
</thead>
        <tbody><tr>
<td>0 ~ 0</td>
<td>"b"</td>
<td>0</td>
</tr>
<tr>
<td>0 ~ 1</td>
<td>"ba"</td>
<td>1 ("b", "a" 선택)</td>
</tr>
<tr>
<td>0 ~ 2</td>
<td>"bab"</td>
<td>1 (앞 "b", "a" 선택 또는 "a", 뒤 "b" 선택)</td>
</tr>
<tr>
<td>0 ~ 3</td>
<td>"baby"</td>
<td>3 (앞 "b", "y" 선택)</td>
</tr>
<tr>
<td>1 ~ 1</td>
<td>"a"</td>
<td>0</td>
</tr>
<tr>
<td>1 ~ 2</td>
<td>"ab"</td>
<td>1 ("a", "b" 선택)</td>
</tr>
<tr>
<td>1 ~ 3</td>
<td>"aby"</td>
<td>2 ("a", "y" 선택)</td>
</tr>
<tr>
<td>2 ~ 2</td>
<td>"b"</td>
<td>0</td>
</tr>
<tr>
<td>2 ~ 3</td>
<td>"by"</td>
<td>1 ("b", "y" 선택)</td>
</tr>
<tr>
<td>3 ~ 3</td>
<td>"y"</td>
<td>0</td>
</tr>
</tbody>
      </table>
<ul>
<li>따라서, 각 부분문자열의 아름다움을 모두 더한 9를 return 해야 합니다.</li>
</ul>

<p>입출력 예 #2</p>

<ul>
<li>"oo"는 모든 글자가 동일하므로, "oo"의 임의의 부분문자열도 모두 동일한 글자를 가지고 있습니다. </li>
<li>따라서, "oo"의 임의의 부분문자열의 아름다움은 전부 0이므로, 0을 return 해야 합니다.</li>
</ul>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges