import { transformData } from '@/src/utils/api';

export async function fetchResetGame() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-game`);
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchQuestions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`);
    const data = await res.json();
    return transformData(data);
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchGetActiveQuestionId() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/active-question`, {
      next: { tags: ['activeQuestionId'] },
    });
    const data = await res.json();
    return Number(data.id);
  } catch (err) {
    throw new Error('Failed to fetch question.');
  }
}

export async function fetchGetFinalScore() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-score`);
    const data = await res.json();
    return data.score;
  } catch (err) {
    throw new Error('Error');
  }
}

export async function fetchSetFinalScore(score: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score }),
    });
    return res;
  } catch (err) {
    throw new Error('Error');
  }
}

export async function fetchSetActiveQuestionId(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/active-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    return res;
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}
