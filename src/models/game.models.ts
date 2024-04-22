export type QuestionDraft = {
  id: number;
  question: string;
  options: string[];
  answers: string[];
  score?: number;
};

export type Question = Omit<QuestionDraft, 'score'> & {
  score: number;
};
