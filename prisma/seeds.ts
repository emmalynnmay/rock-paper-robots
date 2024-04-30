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

    await createItem(1, 'Cactus', 5);
    await createItem(2, 'Rubber Duck', 7);
    await createItem(3, 'Strawberry', 3);
    await createItem(4, 'Duck', 4);
    await createItem(5, 'Penguin', 6);
    await createItem(6, 'Lightning', 2);
    await createItem(7, 'Apple', 3);
    await createItem(8, 'Candy', 4);
    await createItem(9, 'Target', 5);

  console.log(process.env);
}

async function createItem(id: number, name: string, price: number) {
    await prisma.item.upsert({
        where: {
            id: id,
        },
        create: {
            name: name,
            price: price,
        },
        update: {
            name: name,
            price: price,
        },
    })
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