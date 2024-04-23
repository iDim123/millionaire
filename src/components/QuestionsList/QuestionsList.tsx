import cls from 'clsx';
import styles from './ScoreList.module.css';
import ListItem from '@/src/components/QuestionsList/ListItem';
import { Question } from '@/src/models';

interface Props {
  activeQuestionId: number;
  questions: Question[];
  isShowQuestion: boolean;
}

export default function QuestionsList(props: Props) {
  const { activeQuestionId, questions, isShowQuestion } = props;

  const activeQuestionIdIndex = activeQuestionId === undefined
    ? 0
    : questions.findIndex((q) => q.id === activeQuestionId);

  return (
    <div className={cls(styles.container, { [styles.show]: !isShowQuestion })}>
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
