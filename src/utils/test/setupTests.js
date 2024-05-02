import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';

/* msw */
// 초기에 구동을 위해 설정한 msw 서버 인스턴스와 동일한 인스턴스를 사용해야
// 기존에 모킹된 API의 응답을 변경할 수 있음
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
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
