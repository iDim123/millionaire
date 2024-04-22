import Image from 'next/image';
import Link from 'next/link';
import cls from 'clsx';
import styles from './page.module.css';
import { fetchGetFinalScore } from '@/src/api/api';

export default async function GameOver() {
  const score = await fetchGetFinalScore();

  return (
    <main className={styles['page-container']}>
      <div className={styles.container}>
        <Image
          className={styles.img}
          src="/hand.svg"
          alt="Hand"
          width={624}
          height={367}
          priority
        />
        <div className={styles.content}>
          <div>
            <p>Total score:</p>
            <h1>
              $
              {`${score} earned`}
            </h1>
          </div>
          <Link className={cls('btn', styles.btn)} href="/start">
            Try again
          </Link>
        </div>
      </div>
    </main>
  );
}
