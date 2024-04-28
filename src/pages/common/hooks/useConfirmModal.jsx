import { useState } from 'react';

// - 호출 시 initialValue 인자를 지정하지 않은 경우 isModalOpened 상태가 false로 설정
// - 호출 시 initialValue 인자를 boolean 값으로 지정한 경우 isModalOpened 상태가 해당 값으로 설정
// - 훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle됨
const useConfirmModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  return {
    toggleIsModalOpened,
    isModalOpened,
  };
};

export default useConfirmModal;
