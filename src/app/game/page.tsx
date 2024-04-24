import MobileHeader from '@/src/components/Header';
import styles from './page.module.css';
import { fetchActiveQuestionId, fetchQuestions } from '@/src/lib/data';
import ActiveQuestion from '@/src/components/ActiveQuestion/ActiveQuestion';
import QuestionsList from '@/src/components/QuestionsList/QuestionsList';
import { setActiveQuestionId, setFinalScore } from '@/src/lib/actions';

interface Props {
  searchParams: {
    showQuestion: string | undefined;
  };
}

export default async function Game(props: Props) {
  const { searchParams } = props;
  const questions = await fetchQuestions();
  const questionId = await fetchActiveQuestionId();

  return (
    <main className={styles.container}>
      <MobileHeader showQuestion={searchParams.showQuestion} />
      <ActiveQuestion
        questionId={questionId}
        questions={questions}
        setFinalScore={setFinalScore}
        setActiveQuestionId={setActiveQuestionId}
      />
      <QuestionsList
        searchParams={searchParams}
        questionId={questionId}
        questions={questions}
      />
    </main>
  );
}
