import { setupServer } from 'msw/node';

import '@testing-library/jest-dom';
// vitest에서는 dom 검증을 위한 matchers를 제공하지 않음. 그래서 jest-dom을 사용하여 확장
import { handlers } from '@/__mocks__/handlers';

/* msw */
export const server = setupServer(...handlers);
// msw 설정 적용
// -> 테스트 환경에서 API 호출은 msw의 핸들러에 설정한 응답으로 모킹
beforeAll(() => {
  // 서버 구동
  server.listen();
});
// 모킹한 모듈의 히스토리를 초기화
afterEach(() => {
  server.resetHandlers();
  // 모킹된 모의 객체 호출에 대한 히스토리를 초기화
  // 모킹된 모듈의 구현을 초기화하지는 않는다. -> 모킹된 상태로 유지됨
  // -> 모킹 모듈 기반으로 작성한 테스트가 올바르게 실행
  // 반면, 모킹 히스토리가 계속 쌓임(호출 횟수나 인자가 계속 변경) -> 다른 테스트에 영향을 줄 수 있음
  vi.clearAllMocks();
});

afterAll(() => {
  // 모킹 모듈에 대한 모든 구현을 초기화
  vi.resetAllMocks();
  // 서버 종료
  server.close();
});

vi.mock('zustand');

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
