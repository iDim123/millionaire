import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/src/db';
import { transformData } from '@/src/utils/api.utils';

export async function getQuestions() {
  'use server';

  const draft = await prisma.question.findMany();
  const questions = draft.map((data) => ({
    ...data,
    options: JSON.parse(data.options),
    answers: JSON.parse(data.answers),
  }));
  return transformData(questions);
}

export async function getActiveQuestionId() {
  'use server';

  const result = await prisma.activeQuestionId.findFirst();

  return result?.questionId;
}

export async function setActiveQuestionId(id: number) {
  'use server';

  try {
    await prisma.activeQuestionId.upsert({
      where: { id: 1 },
      update: { questionId: id },
      create: { questionId: id },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(error.message);
      } else {
        throw new Error('Error updating or creating ActiveQuestionId:');
      }
    } else {
      throw new Error('error');
    }
  }
}

export async function getFinalScore() {
  'use server';

  const result = await prisma.finalScore.findFirst();

  return result?.score;
}

export async function setFinalScore(score: number) {
  'use server';

  try {
    await prisma.finalScore.upsert({
      where: { id: 1 },
      update: { score },
      create: { score },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(error.message);
      } else {
        throw new Error('Error updating or creating finalScore:');
      }
    } else {
      throw new Error('error');
    }
  }
}

export async function resetGame() {
  'use server';

  const questions = await getQuestions();
  await setActiveQuestionId(questions[0].id);
  await setFinalScore(0);
}
