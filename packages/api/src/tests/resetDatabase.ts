import prisma from '../prisma';

const resetDatabase = async () => {
  await prisma.user.deleteMany();
};

export default resetDatabase;
