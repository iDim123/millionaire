import { transformData } from './api.utils';

describe('transformData function', () => {
  test('should return transformed data with unique options and answers', () => {
    const input = [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'Tate', 'London', 'Berlin'],
        answers: ['Paris'],
        score: 500,
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'Tate', 'London', 'Berlin'],
        answers: ['Paris'],
        score: 500,
      },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });

  test('should return transformed data with unique options and answers even if there are duplicates', () => {
    const input = [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'Paris', 'London', 'London'],
        answers: ['Paris'],
        score: 500,
      },
    ];

    const expectedOutput = [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'London'],
        answers: ['Paris'],
        score: 500,
      },
    ];

    expect(transformData(input)).toEqual(expectedOutput);
  });
});
