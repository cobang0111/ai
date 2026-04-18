# ICLR 2026 Paper Field Notes

GitHub Pages에 바로 올릴 수 있는 정적 웹페이지입니다. 빌드 과정 없이 `index.html`, `styles.css`, `papers.js`, `app.js`와 PDF 폴더를 그대로 호스팅하면 됩니다.

## 로컬 확인

`index.html`을 브라우저에서 열면 됩니다. 별도 서버나 패키지 설치가 필요 없습니다.

## 논문 데이터 수정

논문 제목, 요약, 태그, 질문, PDF 경로는 `papers.js`에서 수정합니다.

- `summary`: 카드에 보이는 한 줄 요약
- `takeaways`: 현장에서 볼 포인트
- `question`: 저자에게 물어볼 질문
- `priority`: `high`, `medium`, `low`
- `pdf`: 현재 저장된 PDF의 상대 경로
- `source`: OpenReview 또는 프로젝트 페이지 링크

브라우저에서 입력한 개인 메모와 상태값은 해당 브라우저의 localStorage에 저장됩니다. 다른 기기나 다른 브라우저로 옮기려면 화면 왼쪽의 `내보내기` 버튼으로 마크다운을 다운로드하세요.

## GitHub Pages 배포

1. GitHub에서 새 repository를 만듭니다.
2. 이 폴더의 모든 파일과 PDF 폴더를 repository 루트에 올립니다.
3. GitHub repository의 `Settings` -> `Pages`로 이동합니다.
4. `Source`를 `Deploy from a branch`로 선택합니다.
5. Branch는 `main`, 폴더는 `/root`를 선택하고 저장합니다.
6. 잠시 뒤 `https://<username>.github.io/<repository>/` 주소에서 확인합니다.

PDF 파일도 함께 올려야 카드의 `PDF` 버튼이 정상 동작합니다.
