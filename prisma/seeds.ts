import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
config();


async function main() {
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      profile: {
        create: {}
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })
    await prisma.wallet.upsert({
        where: {
            id: 1,
        },
        create: {
            userId: 1,
            amount: 0,
        },
        update: {
            userId: 1,
            amount: 0,
        },
    })
    await prisma.collection.upsert({
        where: {
            id: 1,
        },
        create: {
            userId: 1,
        },
        update: {
            userId: 1,
        },
    })
  console.log(process.env);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })