'use server';

import { sql } from '@vercel/postgres';
import { fetchQuestions } from '@/src/lib/data';

export async function setFinalScore(score: number) {
  try {
    await sql`
      UPDATE score
      SET final_score = ${score}
      WHERE id = 1;
    `;
  } catch (error) {
    throw new Error('Failed to set score.');
  }
}

export async function setActiveQuestionId(id: number) {
  try {
    await sql`
      UPDATE active_question
      SET active_question_id = ${id}
      WHERE id = 1;
    `;
  } catch (error) {
    throw new Error('Failed to set active question.');
  }
}

export async function resetGame() {
  try {
    const questions = await fetchQuestions();
    await setFinalScore(0);
    await setActiveQuestionId(questions[0].id);
  } catch (error) {
    throw new Error('Failed to fetch questions.');
  }
}
