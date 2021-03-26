# online-forum

게시판 
##from 21/03/22 to 21/03/25 (4일간)

## 폴더구조
<img width="538" alt="Screen Shot 2021-03-26 at 15 08 45" src="https://user-images.githubusercontent.com/66362967/112589914-44050780-8e45-11eb-94d9-c91f3d94797d.png">

## 프로그램 설명

### 사용 언어
<ul>
  <li>데이터베이스: MySQL</li>
  <li>프론트엔드: HTML(ejs), CSS, JavaScript</li>
  <li>백엔드: nodejs(express, sequelize)</li>
</ul>

### 주요 기능
<ul>
  <li>사용자 등록 기능: 이미 등록된 username등록 불가, 비밀번호 입력</li>
  <li>글 작성, 수정, 댓글달기: username, password입력 필요.</li>
  <li>페이징: 한 페이지 당 글 10개, 최근에 작성된 글이 가장 위에온다.
    <ol>
      <li>우선, 페이지 링크를 만들 때 '페이지 번호(=page)'를 '쿼리스트링의 page값'에 추가한다</li>
      <li>/ 경로로 들어오면 routes/home 폴더의 index.js로 라우팅 된다</li>
      <li>쿼리스트링이 없는 / 경로일 경우 page변수에 1을 부여한다</li>
      <li>Article 테이블의 길이를 조회한다(dataLength)</li>
      <li>limit(찾을 최대 데이터 수) = 10, offset(건너뛸 데이터 수)를 정의한다</li>
      <li>최신 데이터(데이터베이스의 가장 끝의 데이터)가 가장 앞의 페이지에 나와야하기때문에, 
        offset = dataLength - 10 * page가 된다.
      </li>
      <li>만약 offset < 0 이라면 글 수가 10개보다 작은 맨 끝의 페이지이므로,
           limit(찾을 데이터 수) = offset + 10, offset = 0의 값으로 데이터를 조회한다.</li>
    </ol>
  </li>
  
</ul>
