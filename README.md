![AwA로고](/uploads/390a7dfd55f76033c7c2017f40cfca21/AwA로고.png)
<div align="center">
<br />
<h1>SNS형 예술작품 거래 플랫폼</h1>
<br />
</div>

## 목차

1. [**개발 멤버 소개**]
2. [**서비스 소개**]
3. [**기술 스택**]
4. [**시스템 아키텍처**]
5. [**주요기능 및 데모영상**]
6. [**UCC 보러가기**]
7. [**협업 관리**]
8. [**프로젝트 기간**]
9. [**프로젝트 관련 문서**]

<br/>

<div id="1"></div>

## 👪 개발 멤버 소개 
<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/Seonhyuk">
            <img src="" width="140px" /> <br><br> 🙂 안선혁 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/seniing">
            <img src="" width="140px" /> <br><br> 🙂 박세은 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/sangeun-lim">
            <img src="" width="140px" /> <br><br> 😆 임상은 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/kimsezin">
            <img src="" width="140px" /> <br><br> 😁 김세진 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/choiyounghyun">
            <img src="" width="140px" /> <br><br> 🙄 최영현 <br>(Back-End) </a> <br></td>
    </tr>
    <tr>
        <td align="center">UI/UX<br/>React<br/>socket.io<br/>
        <td align="center">UI/UX<br/>React
        <td align="center">UI/UX<br/>React<
        <td align="center">REST API<br/>CI/CD
        <td align="center">REST API<br/>CI/CD
    </tr>
</table>

<br />

<div id="2"></div>

## 💡 서비스 소개

### SNS형 예술작품 거래  플랫폼

> 한해 예술대학 졸업생 00 명, 수많은 졸업작품들은 어디로 가는걸까요?<br />
피와땀으로 만들어진 좋은 작품들이 대부분 방치되거나 버려진다고 합니다. <br />
주니어작가들의 작품을 많은 사람들에게 보여주고 구매자들은 보다 값싼 작품들을 접할 수 있는 기회.
>
#### 모두가 Win Win 하는 거래 플랫폼, AwA에서 수많은 작품들을 접해보는건 어떠신가요?

<br/>

<div id="3"></div>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=#007396" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Node.js-339939?style=for-the-badge&logo=Node.js&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br/>

<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분       | 기술스택                    | 상세내용                 | 버전          |
| -------- | ----------------------- | -------------------- | ----------- |
| 공통     | 형상관리                    | Gitlab               | \-          |
|          | 이슈관리                    | Jira                 | \-          |
|          | 커뮤니케이션                  | Mattermost, Notion   | \-          |
| BackEnd  | DB                      | MariaDB              | 10.6        |
|          |                         | JPA                  | \-          |
|          |                         | QueryDSL             | \-          |
|          | Java                    | JDK                  | 11.0.14     |
|          | Spring                  | Spring               | 5.3.21      |
|          |                         | Spring Boot          | 2.7.1       |
|          | IDE                     | Intellij(Ultimate)   | 22.1.3      |
|          | Cloud Storage           | Firebase             | \-          |
|          | Build                   | Gradle               | 7.4.1       |
|          | API Docs                | Swagger2             | 2.9.2       |
| FrontEnd | HTML5                   |                      | \-          |
|          | CSS3                    |                      | \-          |
|          | JavaScript(ES6)         |                      |\-           |
|          | React                   | React                | 17.0.2      |
|          | React                   | Redux                | 7.2.6       |
|          | React                   | Redux-thunk          | 2.4.1       |
|          |                         | styled-components    | 5.3.3       |
|          |                         | framer-motion        | 6.0.0       |
|          |                         | apexcharts           | 3.33.0      |
|          |                         | toast-ui/react-editor      | 3.1.2       |
|          |                         | toast-ui/react-calendar    | 1.0.6       |
|          | WebSocket               | @stomp/stompjs       | 6.1.2       |
|          | WebSocket               | stompjs              | 2.3.3       |
|          | WebSocket               | sockjs-client        | 1.5.2       |
|          | IDE                     | Visual Studio Code   | 1.63.2      |
| Server   | 서버                      | AWS EC2              | \-          |
|          | 플랫폼                     | Ubuntu               | 20.04.3 LTS |
|          | 배포                      | Docker               | 20.10.12    |
|          | 배포                      | Jenkins              | 2.319.2     |

</details>

<br />

<div id="4"></div>

## 🗂️ 시스템 아키텍처

|                              시스템 구성                           |
| :------------------------------------------------------------------------------: |
![image](/uploads/998e564f9bd45028c1c07d21d6f5d88e/image.png)

|                              디렉토리 구조                       |
| :------------------------------------------------------------------------------: |
| ![treeFront](/uploads/91374d1e87785a7ad776c7690907ed66/treeFront.png) |

<br />

<div id="4"></div>

## 🖥️ 주요기능

### 프로필기능
- 작가본인의 작품을 뽐낼 수 있는 작품 리스트
- 사용자간 팔로잉 팔로우 기능


### 피드
- 게시물을 무한스크롤을 통해 직관적으로 나타냄
- 작품별 (좋아요 수 x 0.5) + (조회 수 x 0.3) + (댓글 수 x 0.2)의 표준편차를 이용한 추천 시스템

### 채팅
- 사용자간 실시간 채팅을 이용한 의사소통 서비스
- 지난 채팅 기록확인

<br/>

<div id="5"></div>

## 🎥 [UCC 보러가기](https://youtu.be/Rg4kOlrdI78) 

<br />

<div id="6"></div>

## 👥 협업 관리 

|                            Jira BurnDown Chart                      |
| :---------------------------------------------------------------------------: |
|  <img src="./readme_assets/a607_Jira.png" alt="Jira BurnDown Chart" />  |

|                            Notion                      |
| :---------------------------------------------------------------------------: |
|  <img src="./readme_assets/a607_Notion.png" alt="Notion" />  |

<br />


<div id="8"></div>

## 📆 프로젝트 기간
### 22.7.11 ~ 22.8.19
- 기획 및 설계 : 22.7.11 ~ 22.8.18
- 프로젝트 구현 : 22.7.18 ~ 22.8.12
- 버그 수정 및 산출물 정리 : 22.8.12 ~ 22.8.19

<br />

<div id="9"></div>

## 📋 프로젝트 관련 문서
|  구분  |  링크  |
| :--------------- | :---------------: |
| 공통코드 | [공통코드 바로가기](/docs/공통코드.md) |
<!-- | 와이어프레임 | [와이어프레임 바로가기](/docs/와이어프레임.md) | -->
<!-- | 컨벤션목록 | [컨벤션목록 바로가기](/docs/컨벤션목록.md) | -->
| 시퀀스 다이어그램 | [시퀀스 다이어그램](/outputs/AWA_시퀀스_다이어그램.md) |
| ERD | [ERD 바로가기](/outputs/AwA_ERD.png) |
| 빌드/배포 | [빌드/배포 바로가기](/exec/01_서울_6반_A607_빌드및배포.pdf) |
| 외부서비스 정보 | [외부서비스 정보 바로가기](/exec/02_서울_6반_A607_외부서비스_정보.pdf) |
| 시연 시나리오 | [시연 시나리오 바로가기](/exec/04_서울_6반_A607_시연시나리오.pdf) |
| 발표자료 | [발표자료 바로가기](/docs/서울_6반_A607_발표자료.pdf) |


<!-- BackEnd
spring boot
spring-boot-jpa
Spring Security
Java 11
AWS EC2
mariadb

FrontEnd
Visual Studio Code
React.js
redux-toolkit
redux


CI/CD
aws ec2
nginx
jenkins

서비스 아키텍처

![image](/uploads/998e564f9bd45028c1c07d21d6f5d88e/image.png) -->
