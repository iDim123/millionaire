'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './Header.module.css';

interface Props {
  isShowQuestion: boolean;
  setIsShowQuestion: Dispatch<SetStateAction<boolean>>;
}

export default function MobileHeader(props: Props) {
  const { isShowQuestion, setIsShowQuestion } = props;

  const handleClick = () => {
    setIsShowQuestion((value) => !value);
  };

  return (
    <header className={styles['mobile-header']}>
      <div
        role="button"
        tabIndex={0}
        className={isShowQuestion ? styles.burger : styles.close}
        onClick={handleClick}
        onKeyDown={handleClick}
      />
    </header>
  );
}
