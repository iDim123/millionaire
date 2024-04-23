'use client';

import { useEffect, useState } from 'react';
import QuestionsList from '@/src/components/QuestionsList/QuestionsList';
import ActiveQuestion from '@/src/components/ActiveQuestions/ActiveQuestion';
import styles from './page.module.css';
import { fetchGetActiveQuestionId, fetchQuestions } from '@/src/api/api';
import { Question } from '@/src/models';
import MobileHeader from '@/src/components/Header';

export default function Game() {
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState<
    number | undefined
  >();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchQuestions(), fetchGetActiveQuestionId()]).then(
      ([data, id]) => {
        setQuestions(data);
        setActiveQuestionId(id);
        setLoading(false);
      },
    );
  }, []);

  return (
    <main className={styles.container}>
      <MobileHeader
        isShowQuestion={isShowQuestion}
        setIsShowQuestion={setIsShowQuestion}
      />
      {isLoading && <div>Loading...</div>}
      {activeQuestionId !== undefined && (
        <>
          <ActiveQuestion
            isShowQuestion={isShowQuestion}
            activeQuestionId={activeQuestionId}
            questions={questions}
            setActiveQuestion={setActiveQuestionId}
          />
          <QuestionsList
            isShowQuestion={isShowQuestion}
            activeQuestionId={activeQuestionId}
            questions={questions}
          />
        </>
      )}
    </main>
  );
}
