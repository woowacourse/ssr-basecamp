# NEXT 간단 실습 예제 사용설명서

#### 1. 현재 디렉터리에 README.md와 같은 레벨에 `.env.local` 파일을 생성 후 다음의 내용 작성

```
NEXT_PUBLIC_TMDB_TOKEN=자신의토큰
```

#### 2. 다음의 명령어를 실행

```
npm run build
npm run start
```

#### 3. 다음의 경로 접근

각 렌더링 방식별로 특징을 확인한다.

```
localhost:3000/csr
localhost:3000/ssr
localhost:3000/ssg
localhost:3000/isr
```
