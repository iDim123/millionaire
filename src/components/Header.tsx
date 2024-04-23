import Link from 'next/link';
import styles from './Header.module.css';

interface Props {
  showQuestion: string | undefined;
}

export default function MobileHeader(props: Props) {
  const { showQuestion = 'true' } = props;
  return (
    <header className={styles['mobile-header']}>
      <Link
        href={{
          pathname: '/game',
          query: { showQuestion: showQuestion === 'true' ? 'false' : 'true' },
        }}
        className={showQuestion === 'true' ? styles.burger : styles.close}
      />
    </header>
  );
}
