'use client';

import cls from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/src/models';
import styles from './ActiveQuestion.module.css';
import { delay } from '@/src/utils/common';
import { fetchSetActiveQuestionId, fetchSetFinalScore } from '@/src/api/api';
import { customRevalidatePath, customRevalidateTag } from '@/src/api/actions';
import {
  getCorrectAnswerIndexes,
  getNextQuestionId,
} from '@/src/components/ActiveQuestions/utils';

const ABC = ['A', 'B', 'C', 'D'];
const DELAY = 200;

interface Props {
  activeQuestionId: number;
  questions: Question[];
  isShowQuestion: boolean;
  setActiveQuestion: (id: number) => void;
}

export default function ActiveQuestion(props: Props) {
  const {
    activeQuestionId,
    questions,
    isShowQuestion,
    setActiveQuestion: setActiveQuestionId,
  } = props;
  const router = useRouter();
  const [correctIndex, setCorrectIndex] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [wrongIndex, setWrongIndex] = useState<number | undefined>();
  const activeQuestion = questions.find((q) => q.id === activeQuestionId);

  useEffect(() => {
    setCorrectIndex([]);
    setSelectedIndex(undefined);
    setWrongIndex(undefined);
  }, [activeQuestionId]);

  const gameOver = () => {
    customRevalidatePath('/game-over');
    customRevalidateTag('activeQuestionId');
    router.push('/game-over');
  };

  const handleClick = async (answer: string, index: number) => {
    if (selectedIndex !== undefined || activeQuestion === undefined) return;

    const { answers, score, options } = activeQuestion;

    setSelectedIndex(index);
    await delay(DELAY);

    if (answers.includes(answer)) {
      const correctIndexes = getCorrectAnswerIndexes(options, answers);
      const nextQuestionId = getNextQuestionId(questions, activeQuestionId);
      setCorrectIndex(correctIndexes);

      await fetchSetFinalScore(score);

      if (nextQuestionId === null) {
        await delay(DELAY);
        gameOver();
      } else {
        await fetchSetActiveQuestionId(nextQuestionId);
        await delay(DELAY);
        setActiveQuestionId(nextQuestionId);
      }
    } else {
      setWrongIndex(index);
      await delay(DELAY);
      gameOver();
    }
  };

  if (activeQuestion === undefined) {
    return <div>No question</div>;
  }

  const { options, question } = activeQuestion;
  return (
    <div
      className={cls(styles.container, {
        [styles.hide]: !isShowQuestion,
      })}
    >
      <div className={styles.question}>{question}</div>
      <div className={styles.answers}>
        {options.map((answer, index) => (
          <div
            key={answer}
            role="button"
            tabIndex={index}
            className={cls(styles.answer, {
              [styles.selected]: index === selectedIndex,
              [styles.correct]: correctIndex.includes(index),
              [styles.wrong]: index === wrongIndex,
            })}
            onClick={() => handleClick(answer, index)}
            onKeyDown={() => handleClick(answer, index)}
          >
            <div className={styles['answer-content']}>
              <span className={styles.order}>{ABC[index]}</span>
              <span className={styles.text}>{answer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
