import prisma from './prisma';

export async function getAllDatas() {
  return await prisma.reviews.findMany({
    orderBy: {
      id: 'desc'
    }
  });
}