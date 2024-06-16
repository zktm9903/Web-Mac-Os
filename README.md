## mac-os

- mac-os랑 최대한 비슷하게 구현해보자
- react-app 배포 : https://mac-os-three.vercel.app/?profile=show
- storybook 배포 : https://mac-327a70dwz-zktm9903s-projects.vercel.app/?path=/story/app-memo--primary

## 사용한 기술

- 코어 : React, Typescript
- 상태관리 : Zustand
- 스타일링 : Emotion
- 패키지 매니저 : Yarn
- 빌드 : Vite, Rollup
- 테스트 : Vitest, React-Testing-Library, Storybook
- etc : React-Framer-Motion

## 개발환경

- nodejs : 20.12.2
- react : 18.3.1
- yarn : 18.3.1

## todo

- [x] git action 사용하여 pull request 전 자동 테스팅
- [x] App lazy loading & chunk
- [x] App 추상화 (왼쪽 상단 버튼, drag & drop, resize)
- [ ] 배경 이미지 로딩 최적화
- [x] Profile app 추가
- [x] Memo app 추가
- [ ] Weather app 추가
- [ ] Photo booth app 추가
- [ ] Phato app 추가

## 비고

- 앱 추가 방법
  1. 디렉토리, 파일 생성 (원하는 파일 이름으로 통일)
  ```bash
  // ex) ./src/apps/appName/appName.tsx
    .
  ├── ...
  ├── memo
  │   ├── Icon.tsx
  │   ├── Memo.tsx
  │   ├── components
  │   │   ├── ...
  │   ├── hooks
  │   │   ├── ...
  │   ├── constant.ts
  │   └── types.ts
  └── profile
      ├── Icon.tsx
      ├── Profile.test.tsx
      └── Profile.tsx
  ```
  2. apps.tsx 수정
  ```js
  export const APPS: APP[] = [
    {
      name: 'app-name',
      icon: <app-name />,
      content: lazy(() => import('./app-name/App-name')),
      minWidth: 300,
      minHeight: 550,
      maxWidth: 300,
      maxHeight: 550,
      resizable: true,
    },
  ];
  ```
