import { Question, QuestionDraft } from '@/src/models';

export function transformData(input: QuestionDraft[]): Question[] {
  let prevScore = 0;
  const questions = [...input].reverse().map((data) => {
    const score = data.score ? data.score : prevScore / 2;
    prevScore = score;
    const uniqueOptions = Array.from(new Set(data.options));
    const uniqueAnswers = Array.from(new Set(data.answers));
    return {
      ...data,
      answers: uniqueAnswers,
      options: uniqueOptions,
      score,
    };
  });
  return questions.reverse();
}
