import { Question } from '@/src/models';

export function transformData(input: Question[]): Question[] {
  return input
    .filter((data) => data.options.length > 0 || data.answers.length > 0)
    .map((data) => {
      const uniqueOptions = Array.from(new Set(data.options));
      const uniqueAnswers = Array.from(new Set(data.answers));
      return {
        ...data,
        answers: uniqueAnswers,
        options: uniqueOptions,
      };
    });
}
