import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';

export default async (component, options = {}) => {
  const { routerProps } = options;
  const user = userEvent.setup(); // 다양한 이벤트를 실제 브라우저에서의 동작과 유사하게 시뮬레이션 할 수 있는 라이브러리

  // https://tanstack.com/query/v4/docs/react/guides/testing
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console for tests
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
  });

  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter {...routerProps}>{component}</MemoryRouter>
        <Toaster />
      </QueryClientProvider>,
    ),
  };
};
