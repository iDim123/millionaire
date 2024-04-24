const { PrismaClient } = require('@prisma/client');
const questions = require('./questions.json');

const prisma = new PrismaClient();

async function seedQuestions() {
  try {
    for (const question of questions) {
      const tmp = {
        ...question,
        options: JSON.stringify(question.options),
        answers: JSON.stringify(question.answers),
      };
      await prisma.question.create({ data: tmp });
    }
    console.log('Questions successfully added to database!');
  } catch (error) {
    console.error('Error seeding questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedQuestions();
