import { screen } from '@testing-library/react';
import { vi } from 'node_modules/vitest/dist/index';
import React from 'react';

import ProductFilter from '@/pages/home/components/ProductFilter';
import { mockUseFilterStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const setMinPriceFn = vi.fn();
const setMaxPriceFn = vi.fn();
const setTitleFn = vi.fn();

beforeEach(() => {
  mockUseFilterStore({
    // 얘네들은 UI에서 바로 확인할 수 없는 액션들이라서 모킹
    setMinPrice: setMinPriceFn,
    setMaxPrice: setMaxPriceFn,
    setTitle: setTitleFn,
  });
});

it('카테고리 목록을 가져온 후 카테고리 필드의 정보들이 올바르게 렌더링된다.', async () => {
  await render(<ProductFilter />);

  // expect(screen.getByLabelText('category1')).toBeInTheDocument();
  // expect(screen.getByLabelText('category3')).toBeInTheDocument();
  // expect(screen.getByLabelText('category2')).toBeInTheDocument();

  // 비동기로 가져오는 경우는 findBy로 확인해야함
  expect(await screen.findByLabelText('category1')).toBeInTheDocument();
  expect(await screen.findByLabelText('category2')).toBeInTheDocument();
  expect(await screen.findByLabelText('category3')).toBeInTheDocument();
});

it('상품명을 수정하는 경우 setTitle 액션이 호출된다.', async () => {
  const { user } = await render(<ProductFilter />);

  const textInput = screen.getByLabelText('상품명');
  await user.type(textInput, 'test');

  expect(setTitleFn).toHaveBeenCalledWith('test');
});

it('카테고리를 클릭 할 경우의 클릭한 카테고리가 체크된다.', async () => {
  // 라디오 클릭 ->  setCategoryId -> categoryId state 변경 -> 선택된 라디오 값 변경
  const { user } = await render(<ProductFilter />);

  const category3 = await screen.findByLabelText('category3');
  await user.click(category3);

  expect(category3).toBeChecked();
});

it('최소 가격 또는 최대 가격을 수정하면 setMinPrice과 setMaxPrice 액션이 호출된다.', async () => {
  const { user } = await render(<ProductFilter />);

  const minPriceTextInput = screen.getByPlaceholderText('최소 금액');
  await user.type(minPriceTextInput, '1');

  expect(setMinPriceFn).toHaveBeenCalledWith('1');

  const maxPriceTextInput = screen.getByPlaceholderText('최대 금액');
  await user.type(maxPriceTextInput, '2');

  expect(setMaxPriceFn).toHaveBeenCalledWith('2');
});
