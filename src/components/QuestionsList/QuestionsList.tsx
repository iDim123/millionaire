'use client';

import cls from 'clsx';
import styles from './QuestionsList.module.css';
import ListItem from './ListItem';
import { Question } from '@/src/models';
import { useStore } from '@/src/store/store';

interface Props {
  questions: Question[];
  showQuestion: string | undefined;
}

export default function QuestionsList(props: Props) {
  const { activeQuestionId: id } = useStore();
  const { showQuestion, questions } = props;
  const activeQuestionId = id || questions[0].id;

  const activeQuestionIdIndex = activeQuestionId === null
    ? 0
    : questions.findIndex((q) => q.id === activeQuestionId);

  return (
    <div
      className={cls(styles.container, {
        [styles.show]: showQuestion === 'false',
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
