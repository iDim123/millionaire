const { db } = require('@vercel/postgres');
const questions = require('../src/lib/questions.json');

async function seedQuestions(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS questions;`;

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE questions (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      options TEXT[] NOT NULL,
      answers TEXT[] NOT NULL,
      score INTEGER NOT NULL
  );
`;

    const insertedQuestions = await Promise.all(
      questions.map(
        (question) => client.sql`
        INSERT INTO questions (question, options, answers, score) 
        VALUES (${question.question}, ${question.options}, ${question.answers}, ${question.score})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    return {
      createTable,
      questions: insertedQuestions,
    };
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
}

async function seedActiveQuestionId(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS active_question;`;

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
        CREATE TABLE active_question (
          id SERIAL PRIMARY KEY,
          active_question_id INTEGER NOT NULL
      );
    `;

    const insertedActiveQuestionId =
      await client.sql`INSERT INTO active_question (active_question_id) VALUES (1);`;

    return {
      createTable,
      activeQuestionId: insertedActiveQuestionId,
    };
  } catch (error) {
    console.error('Error seeding ActiveQuestionId:', error);
    throw error;
  }
}

async function seedFinalScore(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS score;`;

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
        CREATE TABLE score (
          id SERIAL PRIMARY KEY,
          final_score INTEGER NOT NULL
      );
    `;

    const insertedFinalScore =
      await client.sql`INSERT INTO score (final_score) VALUES (0);`;

    return {
      createTable,
      finalScore: insertedFinalScore,
    };
  } catch (error) {
    console.error('Error seeding FinalScore:', error);
    throw error;
  }
}

async function drop(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const dropTable = await client.sql`DROP TABLE questions`;

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error seeding FinalScore:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await drop(client);
  await seedQuestions(client);
  await seedActiveQuestionId(client);
  await seedFinalScore(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
