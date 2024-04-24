import styles from './page.module.css';
import MobileHeader from '@/src/components/Header';
import ActiveQuestion from '@/src/components/ActiveQuestion/ActiveQuestion';
import QuestionsList from '@/src/components/QuestionsList/QuestionsList';
import {
  getActiveQuestionId,
  getQuestions,
  setActiveQuestionId,
  setFinalScore,
} from '@/src/actions/actions';

interface Props {
  searchParams: {
    showQuestion: string | undefined;
  };
}

export default async function Game(props: Props) {
  const { searchParams } = props;
  const questions = await getQuestions();
  const questionId = await getActiveQuestionId();

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
