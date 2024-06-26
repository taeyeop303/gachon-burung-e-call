## Home

### 프로젝트 개요

이 프로젝트는 React와 Node.js를 사용하여 구현된 위치 기반 애플리케이션입니다. 사용자는 지도를 통해 자신의 위치를 공유하고, 다른 사용자들의 위치를 확인할 수 있습니다. '뚜벅이'와 '부릉이'의 핀을 사용하여 서로 다른 사용자 유형을 시각화합니다.

## Installation

### 프로젝트 설치 방법

1. **프로젝트 클론**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **서버 종속성 설치**

    ```bash
    cd server
    npm install
    ```

3. **클라이언트 종속성 설치**

    ```bash
    cd ../client
    npm install
    ```

4. **환경 변수 설정**

    프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음과 같이 설정합니다:

    ```bash
    MONGO_URI=mongodb://localhost:27017/burung
    REACT_APP_SOCKET_SERVER=http://localhost:5001
    PORT=5001
    ```

## Running the Project

### 프로젝트 실행 방법

1. **MongoDB 실행**

    MongoDB가 로컬에서 실행 중인지 확인합니다. MongoDB가 설치되어 있지 않다면 공식 문서를 참고하여 설치하세요.

2. **서버 실행**

    ```bash
    cd server
    node server.js
    ```

3. **클라이언트 실행**

    ```bash
    cd ../client
    npm start
    ```

4. **애플리케이션 접근**

    브라우저를 열고 `http://localhost:3000`에 접속합니다.

## Usage

### 애플리케이션 사용 방법

1. **위치 권한 허용**

    브라우저에서 위치 권한을 허용합니다. 모바일 기기에서는 HTTPS를 사용해야 위치 권한 요청이 정상적으로 작동합니다.

2. **사용자 유형 변경**

    페이지 하단의 "접속 모드 변경" 버튼을 클릭하여 '뚜벅이'와 '부릉이'를 변경할 수 있습니다.

3. **상태 메시지 설정**

    입력 필드에 상태 메시지를 입력하고, "내 위치 공유" 버튼을 클릭하여 현재 위치와 메시지를 공유할 수 있습니다.

4. **다른 사용자 확인**

    지도에 표시된 다른 사용자의 핀을 확인할 수 있습니다. 핀을 클릭하면 해당 사용자의 메시지를 확인할 수 있습니다.

## Components

### 주요 컴포넌트 설명

- **MapPage:** 지도와 사용자 인터페이스를 구성하는 주요 컴포넌트입니다.
  - react-leaflet를 사용하여 지도를 표시합니다.
  - 현재 위치를 찾는 LocateButton 컴포넌트를 포함합니다.
- **useMapFunctions:** 사용자 위치와 상태를 관리하는 훅입니다.
  - 사용자 위치를 서버에 전송하고, 다른 사용자의 위치를 업데이트합니다.
  - '뚜벅이'와 '부릉이' 핀을 고정된 위치에 추가합니다.
- **LocateButton:** 현재 위치로 지도를 이동시키는 버튼 컴포넌트입니다.
- **markerIcons:** 지도에서 사용되는 마커 아이콘을 정의합니다.
  - 기본 아이콘, 빨간색 아이콘, 파란색 아이콘을 포함합니다.

## Troubleshooting

### 문제 해결

- **서버 실행 오류**
  - dotenv 모듈이 설치되지 않은 경우 `npm install dotenv` 명령어를 실행합니다.
  - 포트가 이미 사용 중인 경우 다른 포트를 사용하도록 `.env` 파일을 수정합니다.
- **위치 권한 요청 문제**
  - HTTPS를 사용하여 애플리케이션을 실행합니다.
  - 모바일 브라우저의 위치 권한 설정을 확인합니다.
- **MongoDB 연결 오류**
  - `.env` 파일의 `MONGO_URI` 값이 올바른지 확인합니다.
  - MongoDB가 로컬에서 실행 중인지 확인합니다.
