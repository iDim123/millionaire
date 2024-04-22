import cls from 'clsx';
import { memo } from 'react';
import { formatNumberWithCommas } from '@/src/utils/common';
import styles from './ScoreList.module.css';

interface Props {
  active: boolean;
  complete: boolean;
  score: number;
}

function ListItem({ active, score, complete }: Props) {
  return (
    <div
      className={cls(styles.item, {
        [styles.complete]: complete,
        [styles.active]: active,
      })}
    >
      {`$${formatNumberWithCommas(score)}`}
    </div>
  );
}

export default memo(ListItem);
