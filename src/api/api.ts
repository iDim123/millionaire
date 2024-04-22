import { transformData } from '@/src/utils/api';
import questions from '@/questions.json';

let activeQuestionId = questions[0].id;
let finalScore = 0;

export async function fetchResetGame() {
  try {
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-game`);
    activeQuestionId = questions[0].id;
    finalScore = 0;
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchQuestions() {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`);
    // const data = await res.json();
    return transformData(questions);
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}

export async function fetchGetActiveQuestionId() {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/active-question`, {
    //   next: { tags: ['activeQuestionId'] },
    // });
    // const data = await res.json();
    // return Number(data.id);
    return activeQuestionId;
  } catch (err) {
    throw new Error('Failed to fetch question.');
  }
}

export async function fetchGetFinalScore() {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-score`);
    // const data = await res.json();
    // return data.score;
    return finalScore;
  } catch (err) {
    throw new Error('Error');
  }
}

export async function fetchSetFinalScore(score: number) {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/final-score`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ score }),
    // });
    // return res;
    finalScore = score;
  } catch (err) {
    throw new Error('Error');
  }
}

export async function fetchSetActiveQuestionId(id: number) {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/active-question`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id }),
    // });
    // return res;
    activeQuestionId = id;
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}
