import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h2>404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href="/start">Go Back</Link>
    </main>
  );
}
