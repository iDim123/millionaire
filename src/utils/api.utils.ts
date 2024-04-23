import { Question } from '@/src/models';

export function transformData(input: Question[]): Question[] {
  return input.map((data) => {
    const uniqueOptions = Array.from(new Set(data.options));
    const uniqueAnswers = Array.from(new Set(data.answers));
    return {
      ...data,
      answers: uniqueAnswers,
      options: uniqueOptions,
    };
  });
}
