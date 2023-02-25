
## **Application 실행 방법**

### 1. dependencies 설치

```bash
npm install
# or
yarn
```

### 2. 개발용 서버 구동

```bash
npm run start
# or
yarn start
```

### 3. 빌드 (배포용 파일 생성)

```bash
npm run build
# or
yarn build
```


---------


> 기술 스택 : vanilla.js, typescript, axios, eslint, babel, webpack, scss
>
> 이유:
>
> 1.  평소 프론트 프레임웍을 직접 van들lla.js를 사용하여 구현해보고 싶었어서 vanilla.js 를 사용
> 2.  typescript를 나중에 도입한 이유는 초기화한 state 같은 컴포넌트 내에 인스턴스, 메소드들의 타입 추론을 위해 도입
> 3.  개발 환경에서 수정된 부분을 바로 바로 적용하여 확인 할 수 있도록 하고 빌드를 하였을때 번들링된 빌드 파일을 생성하기 위해 웹팩 사용
> 4.  원래는 fetch api를 활용해서 데이터를 요청하고 처리하려고 하였으나 그냥 익숙한 axios를 활용
> 5.  중첩, 변수 선언, 스타일 소스의 가독성을 높이기 위해 scss 사용
> 6.  기본적인 code convention을 가져가고 개발 시 가독성을 위해 eslint 활용
