import { Question } from '@/src/models';

export function getCorrectAnswerIndexes(
  options: string[],
  answers: string[],
): number[] {
  const correctIndexes: number[] = [];
  answers.forEach((answer) => {
    const index = options.indexOf(answer);
    if (index !== -1) {
      correctIndexes.push(index);
    }
  });
  return correctIndexes;
}

export function getNextQuestionId(
  questions: Question[],
  activeQuestionId: number,
): number | null {
  const index = questions.findIndex((q) => q.id === activeQuestionId);

  if (index === -1 || index === questions.length - 1) {
    return null;
  }
  return questions[index + 1].id;
}
