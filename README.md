## 📝 개요
### 1. 프로젝트명
Writon Admin (라이톤 관리자 서비스)
    
### 2. 소개
회의록 관리 서비스 Writon에서 참여자들을 효율적으로 관리할 수 있도록 만든 관리자 서비스
    
### 3. 페이지 링크
⭐️ [www.admin.writon.co.kr](https://www.admin.writon.co.kr/) ⭐️
    
### 4. 사용 방법
아래의 예시 ID, PW를 입력하면 모든 기능을 사용해볼 수 있습니다.
```
ID: login-test  
PW: 1234
```

<br />
<br />

## 💁‍♂️ 팀원
|김승훈|
|:---:|
| <img src="https://github.com/user-attachments/assets/84b1f1a7-803f-4d14-85fb-f7e611db2a04" width="120"/> |
|Frontend|

<br />
<br />

## 🖥️ 화면 구성
| 로그인 페이지 | 온보딩 페이지 |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/ad191f13-c4e1-4c1c-805e-40a89186c442" width="450"> | <img src="https://github.com/user-attachments/assets/2cdc8a6b-4f40-4921-a160-3092c4451c36" width="450"/> |
| 이메일로 전달받은 아이디와 비밀번호로 로그인을 할 수 있습니다. | 첫 로그인시 조직을 생성하고 유저에게 초대 메일을 보낼 수 있습니다. |

| 챌린지 참여 현황 페이지(표) | 챌린지 참여현황 페이지(달력) |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/9c6d1785-8495-466b-9fb7-f46c80017957" width="450"/> | <img src="https://github.com/user-attachments/assets/28a24ff6-8381-4e7a-88ea-2266deaf240f" width="450"/> |
| 유저들이 챌린지에 참여했는지의 여부를 표로 확인할 수 있습니다. | 유저들의 챌린지 참여도를 달력으로 날짜별로 확인할 수 있습니다. |

| 챌린지 정보 페이지 | 챌린지 질문관리 페이지 |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/11db18a6-331e-4dd6-a65e-c36696168df4" width="450"/> | <img src="https://github.com/user-attachments/assets/9efa1708-b34e-4ddf-9eac-ba249806f006" width="450"/> |
| 챌린지의 모든 정보를 확인하고 기본 정보를 수정할 수 있습니다. | 챌린지의 질문들을 확인 및 수정할 수 있습니다. |

| 참여자 정보 페이지 | 참여자 초대 페이지 |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/0ae8a709-d05e-46fb-9275-d6aeebb37eb4" width="450"/> | <img src="https://github.com/user-attachments/assets/016048ca-34ff-4e5e-9705-19dbae7ec9e1" width="450"/> |
| 유저들의 정보를 표로 확인하며 검색이 가능합니다. <br/> 유저들의 정보를 엑셀 파일로 추출하거나 유저 강퇴 기능을 제공합니다. | 유저들에게 챌린지 초대 메일을 보낼 수 있습니다. <br/> 이미 발송한 메일 내역을 확인할 수 있습니다. |

| 조직 정보관리 페이지 | 조직 온보딩 관리 페이지 |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/fbdbdaaa-b7d8-4c17-ad54-f020e6f07084" width="450"/> | <img src="https://github.com/user-attachments/assets/60e96b4b-84e3-47fa-a79a-e37dd5e4bd4b" width="450"/> |
| 조직의 정보를 확인 및 수정이 가능합니다. | 새로운 유저의 온보딩 화면을 미리보며 수정이 가능합니다. |

<br />
<br />

## 🛠️ 주요 기능
### ⭐️ 유저 인증 기능
> JWT 인증 방식과 axiosInterceptors 기능을 사용해서 제작
#### 1. 로그인
&ensp; - JWT 인증 방식을 사용해서 토큰을 전달받고 관리자의 조직 정보와 함께 localStorage에 등록  
&ensp; - 아이디나 비밀번호가 일치하지 않을 경우 에러 메세지를 화면에 띄움
#### 2. 토큰 재발급
&ensp; - accessToken이 만료될 경우 재발급이 자동적으로 이루어지고 refreshToken이 Redis에 남아있다면 새로운 accessToken을 전달받음  
&ensp; - axiosInteceptors 기능을 사용해서 전역에서 일관적으로 통신 관리
#### 3. 로그아웃
&ensp; - localStorage의 정보를 삭제하고 Redis에 refreshToken을 제거

<br />

### ⭐️ 엑셀 기능
> xlsx 라이브러리를 사용해서 제작
#### 1. 엑셀 파일 추출  
&ensp; - ```참여자 정보 페이지```에서 유저와 항목을 선택한 뒤 엑셀 파일로 추출 가능
#### 2. 엑셀 데이터 입력  
&ensp; - ```참여자 초대 페이지```에서 파일 양식을 다운받은 뒤 이메일 목록을 입력한 후 파일을 첨부하면 메일 내역 업로드가 가능

<br />

### ⭐️ 표 기능
> 전부 직접 제작
#### 1. 검색 기능
&ensp; - ```챌린지 참여 현황 페이지```와 ```참여자 정보 페이지```에서 닉네임 등으로 원하는 유저 검색 가능
#### 2. 정렬 기능
&ensp; - ```챌린지 참여 현황 페이지```에서 이름순, 참여순, 미참여순으로 정렬할 수 있음
#### 3. 필터 기능
&ensp; - ```챌린지 참여 현황 페이지```에서 원하는 날짜 기간을 설정해서 데이터를 필터링할 수 있음  
&ensp; - ```참여자 정보 페이지```에서 원하는 정보 항목을 선택해서 데이터를 필터링할 수 있음
#### 4. 복사 기능
&ensp; - ```참여자 정보 페이지```에서 유저의 계좌번호와 이메일을 클립보드에 복사할 수 있음
#### 5. 강퇴 기능
&ensp; - ```참여자 정보 페이지```에서 원하는 유저를 다중 선택해 강퇴할 수 있음

<br />

### ⭐️ 달력 기능
> 일자 관련 작업은 date-fns 라이브러리를 사용하고 작은 달력은 react-calendar 라이브러리를 커스텀하여 사용
#### 1. 펼치기 기능
&ensp; - ```챌린지 참여 현황 페이지```에서 달력이 크기 때문에 접었다 폈다 할 수 있는 기능을 제공  
&ensp; - 기본적으로는 달력이 닫혀있고, 닫혀있을 경우에는 오늘 날짜가 속해있는 주만 달력에 보여줌
#### 2. 요일, 일자 선택 기능
&ensp; - ```챌린지 정보 페이지```에서 챌린지 진행 날짜를 선택할 때 개별적으로 원하는 일자를 선택할 수 있음  
&ensp; - 달력 상단에 있는 요일 버튼을 누르면 챌린지 진행 기간에 속해있는 일자 중 특정 요일을 일괄적으로 선택할 수 있음  
&ensp; - 선택한 모든 일자를 초기화하는 기능 제공
#### 3. 모달 기능
&ensp; - ```챌린지 정보 페이지```에서 챌린지 진행 기간을 설정할 때 달력 모달을 띄워서 날짜를 선택할 수 있음  
&ensp; - ```챌린지 참여 현황 페이지```에서 필터링하고자 하는 기간을 선택할 때 달력 모달을 띄워서 두 개의 날짜를 선택할 수 있음

<br />

### ⭐️ 이메일 기능
> Gmail의 official 메일과 연동하여 발송
#### 1. 전송 기능
&ensp; - ```참여자 초대 페이지```와 ```온보딩 페이지```에서 입력된 이메일을 기반으로 일괄적으로 메일을 전송할 수 있음

<br />
<br />

## ⚙️ 기술 스택
### Language / Framework
| React | Typescript |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/aa0be061-9a3c-4c06-81c3-1d1e8243e4a0" width="100"/> | <img src="https://github.com/user-attachments/assets/7e2ae257-e3e5-41f6-b5b3-0d418a4e5e85" width="100"/> |

### Library
| Axios | Zustand | Styled-Component | React-Query |
|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/06de3812-5aae-431b-a816-1e504d4fe254" width="100"/> | <img src="https://github.com/user-attachments/assets/9ff22699-7182-48e0-9c09-cbfd0a25e71a" width="100"/> | <img src="https://github.com/user-attachments/assets/b04102d1-006f-4fcf-b63a-6292d640573c" width="100"/> | <img src="https://github.com/user-attachments/assets/13f76b9a-231d-44a5-b2c2-2a58ed3b49b5" width="100"/> |

### Infra
| Vite | Vercel |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/fbb09a14-7b81-4caf-83fc-bed24418d0eb" width="100"/> | <img src="https://github.com/user-attachments/assets/88592a83-d955-44dd-b1f4-e236419d5545" width="100"/> |

### Tools
| Notion | Github | Figma |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/1c0093d6-b319-4b91-af7c-f93a6cacbe84" width="100"/> | <img src="https://github.com/user-attachments/assets/dd7c1bec-2a6c-4f4f-b2b9-05db68903f5a" width="100"/> | <img src="https://github.com/user-attachments/assets/3fe71031-9030-4773-a15b-71f0934c08cf" width="100"/> |


<br />
<br />
<br />

