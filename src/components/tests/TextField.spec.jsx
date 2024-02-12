import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 가진 TextField를 렌더링

  // render API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 웹 표준을 자바스크립트로 구현한 것
  await render(<TextField className="my-class" />);

  screen.debug();

  // Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이라서 생략
  // -> 클릭, 메서드 호출, prop 변경 등이 해당됨

  // Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 className이 적용되었는지 확인

  // screen 객체의 getByPlaceholderText 메서드를 사용하여 input 엘리먼트를 찾음
  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );

  // className이라는 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 검증 (O) -> 최종적으로 사용자가 보는 결과는 DOM
});
