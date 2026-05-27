# 제작 보고서

## 1. 프로젝트 주제

React Router를 이용한 간단한 쇼핑몰 `Route Market`을 제작했다. 상품 목록, 상품 상세 페이지, 장바구니, 로그인, 제작 보고서 페이지를 여러 URL로 나누어 SPA 방식으로 이동하도록 구성했다.

## 2. 실습 요구사항 반영

- React Router를 이용한 다중 페이지 이동을 구현했다.
- 상품 상세 페이지에서 `/products/:productId` 형태의 URL 매개변수를 사용했다.
- 로그인 성공 시 `useNavigate`를 이용해 홈 화면으로 이동하도록 했다.
- 제작 보고서를 `REPORT.md` 파일과 앱 내부 `/report` 페이지에 포함했다.
- Vercel 배포를 위한 프로덕션 빌드 명령어 `npm run build`를 사용할 수 있게 구성했다.

## 3. 페이지 구성

- 홈: 쇼핑몰 소개와 추천 상품 표시
- 상품 목록: 전체 상품 카드 표시
- 상품 상세: URL 매개변수로 선택한 상품 정보 표시
- 장바구니: 담은 상품 목록, 삭제, 총 금액 계산
- 로그인: 로그인 버튼 클릭 후 홈으로 자동 이동
- 보고서: 프로젝트 개요와 라우팅 적용 내용 표시

## 4. 사용 기술

- React
- React Router
- Vite
- CSS Grid/Flexbox

## 5. 실행 및 빌드

```bash
npm install
npm run dev
npm run build
```

## 6. 느낀 점

React Router를 사용하면 하나의 React 앱 안에서도 여러 페이지처럼 URL을 나누어 화면을 구성할 수 있었다. 특히 `useParams`와 `useNavigate`를 사용하면서 상품 상세 페이지와 로그인 후 이동 같은 실제 서비스 흐름을 연습할 수 있었다.
