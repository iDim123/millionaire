import styles from './page.module.css';
import MobileHeader from '@/src/components/Header';
import ActiveQuestion from '@/src/components/ActiveQuestion/ActiveQuestion';
import QuestionsList from '@/src/components/QuestionsList/QuestionsList';
import { fetchQuestions } from '@/src/api/api';

interface Props {
  searchParams: {
    questionId: string | undefined;
    showQuestion: string | undefined;
  };
}

export default async function Game(props: Props) {
  const { searchParams } = props;
  const questions = await fetchQuestions();

  return (
    <main className={styles.container}>
      <MobileHeader showQuestion={searchParams.showQuestion} />
      <ActiveQuestion questions={questions} />
      <QuestionsList questions={questions} searchParams={searchParams} />
    </main>
  );
}
