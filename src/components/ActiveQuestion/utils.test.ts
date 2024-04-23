import { Question } from '@/src/models';
import { getCorrectAnswerIndexes, getNextQuestionId } from './utils';

describe('getCorrectAnswerIndexes function', () => {
  test('should return correct indexes for single correct answer', () => {
    const options = ['Paris', 'Tate', 'London', 'Berlin'];
    const answers = ['Paris'];
    const expectedOutput = [0];
    expect(getCorrectAnswerIndexes(options, answers)).toEqual(expectedOutput);
  });

  test('should return correct indexes for multiple correct answers', () => {
    const options = [
      'Harper Lee',
      'F. Scott Fitzgerald',
      'Mark Twain',
      'J.K. Rowling',
    ];
    const answers = ['Harper Lee', 'J.K. Rowling'];
    const expectedOutput = [0, 3];
    expect(getCorrectAnswerIndexes(options, answers)).toEqual(expectedOutput);
  });

  test('should return empty array if there are no correct answers', () => {
    const options = ['Paris', 'Tate', 'London', 'Berlin'];
    const answers = ['Madrid'];
    const expectedOutput: string[] = [];
    expect(getCorrectAnswerIndexes(options, answers)).toEqual(expectedOutput);
  });

  test('should return empty array if answers array is empty', () => {
    const options = ['Paris', 'Tate', 'London', 'Berlin'];
    const answers: string[] = [];
    const expectedOutput: string[] = [];
    expect(getCorrectAnswerIndexes(options, answers)).toEqual(expectedOutput);
  });

  test('should return empty array if options array is empty', () => {
    const options: string[] = [];
    const answers = ['Paris'];
    const expectedOutput: string[] = [];
    expect(getCorrectAnswerIndexes(options, answers)).toEqual(expectedOutput);
  });
});

describe('getNextQuestionId function', () => {
  const q: Question = {
    id: 1,
    question: 'Question 1',
    options: ['Paris', 'Tate', 'London', 'Berlin'],
    answers: ['Paris'],
    score: 500,
  };
  test('should return ID of the next question if it exists', () => {
    const questions: Question[] = [
      { ...q, id: 1, question: 'Question 1' },
      { ...q, id: 2, question: 'Question 2' },
      { ...q, id: 3, question: 'Question 3' },
    ];
    const activeQuestionId = 1;
    const expectedOutput = 2;
    expect(getNextQuestionId(questions, activeQuestionId)).toEqual(
      expectedOutput,
    );
  });

  test('should return null if active question ID is not found in the array', () => {
    const questions = [
      { ...q, id: 1, question: 'Question 1' },
      { ...q, id: 2, question: 'Question 2' },
      { ...q, id: 3, question: 'Question 3' },
    ];
    const activeQuestionId = 4;
    const expectedOutput = null;
    expect(getNextQuestionId(questions, activeQuestionId)).toEqual(
      expectedOutput,
    );
  });

  test('should return null if active question is the last one in the array', () => {
    const questions = [
      { ...q, id: 1, question: 'Question 1' },
      { ...q, id: 2, question: 'Question 2' },
      { ...q, id: 3, question: 'Question 3' },
    ];
    const activeQuestionId = 3;
    const expectedOutput = null;
    expect(getNextQuestionId(questions, activeQuestionId)).toEqual(
      expectedOutput,
    );
  });

  test('should return null if questions array is empty', () => {
    const questions: Question[] = [];
    const activeQuestionId = 1;
    const expectedOutput = null;
    expect(getNextQuestionId(questions, activeQuestionId)).toEqual(
      expectedOutput,
    );
  });
});
