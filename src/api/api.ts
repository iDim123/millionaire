import { transformData } from '@/src/utils/api.utils';
import questions from './questions.json';

export async function fetchQuestions() {
  try {
    return transformData(questions);
  } catch (err) {
    throw new Error('Failed to fetch questions.');
  }
}
