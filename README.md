## **📫 매일메일**

<br>

### 📖개요
---

<table align="center">
  <tr>
    <td><span> 주제 </span></td>
    <td><span> 온라인 펜팔 서비스 </span></td>
  </tr>
  
  <tr>
    <td><span> 목표 </span></td>
    <td><span> 편지를 기다리는 감성을 온라인에서 구현 </span></td>
  </tr>
  
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
    <td align="center" colspan=2>
      <a href="https://jaeyeong815.notion.site/88b29312cff34763884feef11109b340"> 👉 프로젝트 소개서 </a>
    </td>
  </tr>
  <tr>
    <td align="center" colspan=2>
      <a href="https://bit.ly/3wTU9Te"> 👉 배포 페이지 </a>
    </td>
  </tr>
  <tr>
    <td align="center" colspan=2>
      <a href="https://www.figma.com/file/x6VNP5t97mEBBGZtwBxNiB/%EC%B5%9C%EA%B0%9513%ED%8C%80?node-id=367%3A232">🎨 WireFrame</a>
    </td>
  </tr>
  </tr>
    <td align="center" colspan=2>
      <a href="https://team13-swagger.herokuapp.com/">🔑 API Specification (Swagger)</a>
    </td>
  </tr>
  
<table>


<br>

### 🎯 핵심 기능
---

  1. 사용자의 위치에 기반하여 편지의 도착 시간이 결정됩니다.
  2. node-schedule을 이용하여 도착 시간이 지나면 편지를 확인할 수 있습니다.


<br>

### 💻 서비스 구조도
---
<br/>
<div align="center"><img src="https://user-images.githubusercontent.com/102276240/188565575-657a388a-2d19-44a6-bf34-0808daf89c09.png"></div>
<br/>

<br>

  
### 👉 기능 명세
---

  - **사이드바(nav 바)**
    - 로고 클릭 시 메인 화면으로 이동
    - 유저 본인 클릭 시 마이페이지로 이동
    - 친구 클릭 시 친구 상세 프로필 페이지로 이동
    - 안읽은 편지 수 확인 가능
    - 로그아웃 기능
        - 로그인 화면으로 이동
- **메인 페이지** `/`
    - 유저 추천 및 친구 검색 기능
        - 친구 상세 페이지
            - 편지 작성 기능
            - 친구 정보 확인
    - 배달 중인 편지들 확인하기
    - 최근 도착한 편지 확인 및 읽음 처리 기능
- **편지 리스트 페이지 `/friend/:userId`**
    - 친구 상세 프로필 제공
    - 친구와 나눈 편지 리스트 정보 제공
    - 편지 작성 기능
- **편지 상세 페이지 `/friend/:userId/:postId`**
    - 편지 상세 정보 제공
    - 편지 작성 기능
- **마이페이지 `/mypage`**
    - 유저 정보 수정 기능
        - 프로필 이미지 / 닉네임 / 한 줄 소개 / 생일 / 위치 / 관심사 / 사용 언어 / 비밀번호 수정
        - 회원 정보 수정 시 현재 비밀번호가 일치해야 가능
    - 회원 탈퇴 기능
- **로그인 `/login`**
    - 일반 로그인
        - 로그인 성공 후 메인 페이지로 이동
    - 구글 로그인 **(추가)**
        - 로그인 성공 후 유저가 임시가입 상태일시 추가 정보 페이지로 이동
        - 임시가입 실패시 추가정보 기입 페이지로 이동
- **구글 회원가입 `/googleSignup` (추가)**
    - 구글 회원가입
        - 구글 회원가입 성공시 임시가입 상태로 저장 후 추가 정보 입력 페이지 이동
        - 추가정보 기입 성공시 메인페이지로 이동
- **회원가입 `/signup`**
    - 회원가입
        - 가입 성공시로그인 페이지로 이동
  
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

<br>
