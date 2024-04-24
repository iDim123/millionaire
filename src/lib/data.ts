import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Question } from '@/src/models';
import { transformData } from '@/src/utils/api.utils';

export async function fetchQuestions() {
  noStore();
  try {
    const data = await sql<Question>`SELECT * FROM questions`;
    return transformData(data.rows);
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
}

export async function fetchActiveQuestionId() {
  noStore();
  try {
    const data = await sql<{ active_question_id: number }>`
    SELECT active_question_id 
    FROM active_question 
    WHERE id = 1
    `;

    return data.rows[0].active_question_id;
  } catch (error) {
    throw new Error('Failed to fetch id');
  }
}

export async function fetchFinalScore() {
  noStore();
  try {
    const data = await sql<{ final_score: number }>`
    SELECT final_score 
    FROM score 
    WHERE id = 1
    `;

    return data.rows[0].final_score;
  } catch (error) {
    throw new Error('Failed to fetch final score');
  }
}
