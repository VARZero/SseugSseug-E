# 쓱쓱-이 SseugSseug-E
손글씨로 글을 작성할 수 있는 텍스트 에디터 입니다.

## 빌드 방법
### 웹에 직접 사용
직접 index.html을 열거나, 서버에 올려서 html를 실행 할 수 있게 하면 됩니다.

### Electron으로 빌드 (Windows, macOS, X11, Wayland 용)
gnu-make, Node.js가 설치되어 있는 환경에서 가능합니다.
```
makefile Electron_build
```

### PWA로 빌드 (안드로이드 및 iOS/iPadOS)
PWA가 지원되는 브라우저에서 https://varzero.github.io/SseugSseug-E/src 에 접근을 하면 가장 최신빌드로 PWA로 이루어진 쓱쓱-이를 설치 하실수 있습니다!

## 사용 방법
### 코드 둘러보기
일반적인 스크롤 제스처로 자유롭게 코드를 볼수 있습니다.

### 수정모드
> 원하는 라인의 텍스트를 클릭하면 ***수정모드***에 접근하실 수 있습니다.<br>
***수정모드***는 아래와 같은 기능을 가지고 있습니다.
#### 글자 선택 모드
> 글자 위에 커서를 올리면 글자를 선택할 수 있게 됩니다.
 
## 뭘 가져다 쓰셨나요?
글자 인식을 위해 Tesseract.js을 사용하였습니다.
> 

## 라이선스
이 프로젝트는 아파치 라이선스 2.0(Apache License 2.0)으로 배포되고 있습니다. 세부적인 사항은 라이선스 문서에 기입해 두었습니다.
<br><br>
이 프로젝트는 아래와 같은 라이브러리/프레임워크를 사용하였고, 해당 프로젝트의 라이선스는 아래를 참조하여 주십시오.
> Tesseract.js https://github.com/naptha/tesseract.js/blob/master/LICENSE.md Apache License 2.0


## 왜 만들었냐?
아니 서피스 프로8을 샀는데 손코딩 짤만한 텍스트 에디터가 없는거에요? 그래서 직접 만들었습니다 ^^