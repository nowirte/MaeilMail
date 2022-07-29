## **📫 매일메일**

### **매일 다양한 국적, 다양한 관심사를 가진 사람들을 만나보세요!**

<br>

### **서비스 설명**

### 기획 의도 및 목적
---
<br/>

펜팔에 대해 알고 계시나요? 펜팔이란 손글씨로 쓴 편지를 주고받는 친구를 의미합니다. 

우리의 삶은 오프라인에서 온라인으로의 비대면 서비스 방식으로 전환되고 있습니다. 

전통적인 펜팔 방식과는 달리, 장소와 시간에 상관없이 온라인에서도 소통이 가능한 서비스를 만들고 싶었습니다. 

집에서도 전 세계를 여행하며 국적, 성별, 나이에 상관없이 편지를 주고받을 수 있는 서비스를 기획하게 되었습니다. 그렇지만 감성을 곁들여서요. 

빠른 세상 속에서 우리는 즉각적인 소통이 가능해졌지만, 이처럼 편리한 인터넷 세상이 가끔은 피곤하게 느껴지기도 합니다. 

우리가 편지를 주고받을 때에는 시간이 걸립니다. 내가 있는 곳에서 더 멀리 떨어진 친구일수록 더 오래 걸립니다. 

편지를 기다리면서 더 가치 있는 내용을 담게 되고, 편지 한 통으로 전 세계 친구들과 마음을 나눌 수 있는 서비스를 기획하고자 하였습니다. 

언어와 관심사를 기반으로 새로운 친구를 만나고, 외국어를 연습하며 소통할 수 있습니다.
<br/>



### 웹 서비스의 주제 및, 최종적인 메인 기능과 서브 기능 설명
---

- 주제: 아날로그 편지를 구현한 웹 서비스
- 메인 기능
  1. 편지처럼 주고받는 대화기능 (node-schedule을 이용해 시간에 따른 배송상태 업데이트)
  2. 위치 기반 편지 도착 시간 계산
  3. 친구 랜덤 추천 및 검색 기능
   
- 서브 기능
  1. Private Routing을 이용한 로그인, 로그아웃
  2. multer를 이용한 이미지 업로드 (마이페이지)

### 프로젝트만의 차별점, 기대 효과
---

자신의 이름이 아닌 익명으로 가입이 가능하며 신분과 이름이 알려져 있지 않아 자유롭습니다. 또한 매일메일의 컨셉이 국가간 거리에 따라 편지가 도착하는 시간이 다르다 보니 편지에 따라 소요시간이 다양합니다. 소요시간이 길다보니 한 번 편지를 보낼 때 많이 대화를 하고 싶어 길게 보내고, 연락을 소중하게 여기게 됩니다. 마지막으로 검색이나 친구 추천을 통해서 나와 공통된 관심사가 있는지 확인할 수 있고, 나와 맞는 친구들을 찾을 수 있다는 장점이 있습니다.

### 프로젝트 구성
---

<table align="center">
  <tr>
    <td><span>기술 스택</span></td>
    <td>
      <div>
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/>
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
        <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
        <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white"/>
        <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white">
        <img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white">
      </div>
    </td>
  </tr>
  <tr>
    <td>배포 페이지</td>
    <td>
      <a href="http://kdt-sw2-seoul-team13.elicecoding.com/">
        👉 배포 페이지 바로가기
      </a>
    </td>
  </tr>
<table>

<br>

### ✋ 역할
---

| 이름   | 역할       | 구현 기능 |
| ------ | ---------- | --------- |
| 박재현 | 프론트엔드 | 메인페이지 및 친구추천 상세페이지 |
| 위보람 | 프론트엔드 | 친구 페이지 , 편지 작성페이지 |
| 이주혁 | 프론트엔드 | 로그인, 회원가입 페이지 |
| 지재영 | 프론트엔드 | 사이드 바 및 마이페이지 |
| 김명균 | 백엔드     | db 연결, 편지 api, 배포 |
| 배장한 | 백엔드     | 사용자 api, 배포 |

### 💻 서비스 구조도
---
<br/>
<div><img src="https://user-images.githubusercontent.com/97136735/181684033-272246e2-e08e-4734-8dac-c48766cc80a1.png"></div>

<br/>

### 🔗 링크
---
<table align="center">
<thead>
  <tr>
    <th colspan=5>
      <a href="https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project_2/team13/project13">🏠 GitLab Wiki Home</a>
    </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center" colspan=2>
      <a href="https://www.figma.com/file/x6VNP5t97mEBBGZtwBxNiB/%EC%B5%9C%EA%B0%9513%ED%8C%80?node-id=367%3A232">🎨 WireFrame</a>
    </td>
    <td align="center">
      <a href="https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project_2/team13/project13/-/wikis/team-code-convention">📕 Code Convention</a>
    </td>
    <td align="center">
      <a href="https://amethyst-earl-96d.notion.site/new-edf193249ece4a6db3701b2b99fa1fc9">💾 기능 정의서</a>
    </td>

  </tr>
    <tr>
    <td align="center" colspan=2>
      <a href="https://team13-swagger.herokuapp.com/">🔑 API Specification (Swagger)</a>
    </td>
    <td align="center" colspan=2>
      <a href="https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project_2/team13/project13/-/wikis/%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0">📂 Directory Structure</a>
    </td>
  </tr>
</tbody>
<table>
