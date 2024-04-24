'use client';

import cls from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Question } from '@/src/models';
import styles from './ActiveQuestion.module.css';
import { getCorrectAnswerIndexes, getNextQuestionId } from './utils';
import { delay } from '@/src/utils/common.utils';

const ABC = ['A', 'B', 'C', 'D'];
const DELAY = 200;

interface Props {
  questions: Question[];
  questionId: number | undefined;
  setActiveQuestionId: (id: number) => void;
  setFinalScore: (score: number) => void;
}

export default function ActiveQuestion(props: Props) {
  const {
    questions, questionId, setActiveQuestionId, setFinalScore,
  } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [correctIndex, setCorrectIndex] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [wrongIndex, setWrongIndex] = useState<number | undefined>();

  const activeQuestionId = questionId || questions[0].id;
  const activeQuestion = questions.find((q) => q.id === activeQuestionId);

  useEffect(() => {
    setCorrectIndex([]);
    setSelectedIndex(undefined);
    setWrongIndex(undefined);
  }, [activeQuestionId]);

  const gameOver = () => {
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
      setFinalScore(score);

      await delay(DELAY);
      if (nextQuestionId === null) {
        gameOver();
      } else {
        setActiveQuestionId(nextQuestionId);
        router.push('/game');
      }
    } else {
      setWrongIndex(index);
      await delay(DELAY);
      gameOver();
    }
  };

  if (activeQuestion === undefined) {
    return (
      <div className={styles['not-found']}>
        <h2>Question not found</h2>
        <Link href="/game">reset game</Link>
      </div>
    );
  }

  const { options, question } = activeQuestion;
  return (
    <div
      className={cls(styles.container, {
        [styles.hide]: searchParams.get('showQuestion') === 'false',
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
