import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

beforeEach(() => {
  console.log('root - beforeEach');
});

beforeAll(() => {
  console.log('root - beforeAll');
});

afterEach(() => {
  console.log('root - afterEach');
});

afterAll(() => {
  console.log('root - afterAll');
});

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 가진 TextField를 렌더링

  await render(<TextField className="my-class" />);
  // render API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 웹 표준을 자바스크립트로 구현한 것

  // Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이라서 생략
  // -> 클릭, 메서드 호출, prop 변경 등이 해당됨

  // Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 className이 적용되었는지 확인

  // screen 객체의 getByPlaceholderText 메서드를 사용하여 input 엘리먼트를 찾음
  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  expect(textInput).toHaveClass('my-class');

  // className이라는 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 검증 (O) -> 최종적으로 사용자가 보는 결과는 DOM
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });

  // it: test의 alias
  it('기본 placeholder "텍스트를 입력해 주세요."가 렌더링된다.', async () => {
    // 기대 결과 === 실제 결과 -> 성공
    // 기대 결과 !== 실제 결과 -> 실패
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
    // expect 함수가 제공하는 matcher를 사용하여 실행
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    const placeholder = '상품명을 입력해주세요.';
    await render(<TextField placeholder={placeholder} />);

    const textInput = screen.getByPlaceholderText(placeholder);

    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지, 어떤 값을 반환하는지 등 다양한 값들을 저장
  // 보통 콜백함수나 이벤트 핸들러 함수가 호출되었는지, 호출되었을 때 어떤 인자를 받았는지 등을 검증할 때 사용
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  const typedText = 'test';

  await user.type(textInput, typedText);

  expect(spy).toHaveBeenCalledWith(typedText);
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  const typedText = 'test';

  await user.type(textInput, `${typedText}{Enter}`);

  expect(spy).toHaveBeenCalledWith(typedText);
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  // 포커스 활성화 방법
  // 1. 탭 키로 인풋 요소로 포커스 이동
  // 2. 인풋 요소를 클릭했을 때 -> 가장 보편적
  // 3. textInput.focus()로 직접 발생

  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);
  // click과 연관 -> 포커스, 마우스다운, 마우스업 등

  expect(spy).toHaveBeenCalled();
});
