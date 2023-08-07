import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
    const user = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            first_name: "John",
            last_name: "Dog",
            name: "jdog",
            email: "jdog@example.com"
        }
    });

    const todo = await prisma.todo.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "Hello",
            description: "World",
            authorId: user.id
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