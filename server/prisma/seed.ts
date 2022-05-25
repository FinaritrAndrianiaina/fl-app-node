import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUser() {
  await prisma.user.create({
    data: {
      sub: 'google-oauth2|110374894591726267232',
      nickname: 'finaritrandrianiaina',
      name: 'Finaritra Andrianiaina',
      picture:
        'https://lh3.googleusercontent.com/a/AATXAJz-NjEolzW05A6D9FmR38uSpcHfbn9rkx_xsBr_=s96-c',
      updated_at: '2022-05-24T10:47:26.839Z',
      email: 'finaritrandrianiaina@gmail.com',
      email_verified: true,
    },
  });
}

async function seedTodo() {
  await prisma.todo.createMany({
    data: [
      {
        task: 'Faire les courses',
        userEmail: 'finaritrandrianiaina@gmail.com',
      },
      {
        task: 'Faire le ménage',
        userEmail: 'finaritrandrianiaina@gmail.com',
      },
    ],
  });
}

async function seed() {
  prisma.$connect();
  await seedUser();
  await seedTodo();
  prisma.$disconnect();
}

seed()
  .then(() => {
    console.log('Seed successfully!!');
  })
  .catch((err) => {
    console.log('Error when seed!!');
    console.error(err);
  });
