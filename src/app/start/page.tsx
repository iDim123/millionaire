import Image from 'next/image';
import Link from 'next/link';
import cls from 'clsx';
import styles from './page.module.css';

export default async function Start() {
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
          <h1>
            Who wants to be
            <br />
            {' '}
            a millionaire?
          </h1>
          <Link className={cls('btn', styles.btn)} href="/game">
            Start
          </Link>
        </div>
      </div>
    </main>
  );
}
