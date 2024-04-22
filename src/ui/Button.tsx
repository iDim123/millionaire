import styles from './Button.module.css';

interface Props {
  children: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  const { children, onClick } = props;
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
