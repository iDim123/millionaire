import { sql } from '@vercel/postgres';

export async function setFinalScore(score: number) {
  try {
    await sql`
      INSERT INTO score (final_score) 
      VALUES (${score});
    `;
  } catch (error) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function setActiveQuestionId(id: number) {
  try {
    await sql`
      INSERT INTO active_question (active_question_id) 
      VALUES (${id});
    `;
  } catch (error) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function resetGame() {
  try {
    await setFinalScore(0);
    await setActiveQuestionId(0);
  } catch (error) {
    throw new Error('Failed to fetch questions.');
  }
}
