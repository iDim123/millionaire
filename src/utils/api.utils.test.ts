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
  test('should filter out items with empty options and answers', () => {
    const input = [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'Tate', 'London', 'Berlin'],
        answers: ['Paris'],
        score: 500,
      },
      {
        id: 2,
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: [],
        answers: ['Harper Lee', 'J.K. Rowling'],
        score: 1000,
      },
      {
        id: 3,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        answers: [],
        score: 2000,
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

  test('should return an empty array if all items have empty options and answers', () => {
    const input = [
      {
        id: 1,
        question: 'Who?',
        options: [],
        answers: [],
        score: 500,
      },
      {
        id: 2,
        question: 'What?',
        options: [],
        answers: [],
        score: 1000,
      },
    ];
    expect(transformData(input)).toEqual([]);
  });

  test('should return the same array if no items have empty options and answers', () => {
    const input = [
      {
        id: 1,
        question: 'Who?',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        score: 500,
      },
      {
        id: 2,
        question: 'What?',
        options: ['X', 'Y', 'Z'],
        answers: ['X', 'Y'],
        score: 1000,
      },
    ];
    expect(transformData(input)).toEqual(input);
  });
});
