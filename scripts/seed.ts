const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.Category.createMany({
      data: [
        { name: 'Famous People' },
        { name: 'Movies & TV' },
        { name: 'Musicians' },
        { name: 'Games' },
        { name: 'Animals' },
        { name: 'Philosophy' },
        { name: 'Scientists' },
      ],
    });
  } catch (error) {
    console.log(error, 'error seeding default categories');
  } finally {
    await db.$disconnect();
  }

  console.log('Default categories seeded');
}

main();
