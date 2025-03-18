import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'util';

const prisma = new PrismaClient();
const options = {
  environment: { type: 'string' },
};

async function main() {
  const {
    values: { environment },
  } = parseArgs<object>({ options });

  switch (environment) {
    case 'development':
      /** data for your development */
      break;
    case 'test':
      /** data for your test environment */
      break;
    default:
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
