import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
    const todo = await prisma.todo.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "Hello",
            description: "World"
        }
    });

    console.log({todo});
}

run()
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })