import cls from 'clsx';
import styles from './QuestionsList.module.css';
import ListItem from './ListItem';
import { Question } from '@/src/models';

interface Props {
  questions: Question[];
  searchParams: {
    questionId: string | undefined;
    showQuestion: string | undefined;
  };
}

export default function QuestionsList(props: Props) {
  const { searchParams, questions } = props;
  const activeQuestionId = Number(searchParams.questionId) || questions[0].id;

  const activeQuestionIdIndex = activeQuestionId === undefined
    ? 0
    : questions.findIndex((q) => q.id === activeQuestionId);

  return (
    <div
      className={cls(styles.container, {
        [styles.show]: searchParams.showQuestion === 'false',
      })}
    >
      {questions.map((q, i) => (
        <ListItem
          key={q.id}
          active={q.id === activeQuestionId}
          complete={activeQuestionIdIndex > i}
          score={q.score}
        />
      ))}
    </div>
  );
}
