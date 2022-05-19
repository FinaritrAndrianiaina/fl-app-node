import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function seedTodo() {
    await prisma.todo.createMany({
        data: [
            {
                tasks: "Faire les courses"
            }, {
                tasks: "Faire le ménage"
            }
        ]
    })
}

async function seed() {
    prisma.$connect();
    await seedTodo();
    prisma.$disconnect();
}

seed().then(()=>{
    console.log("Seed successfully!!")
}).catch((err)=>{
    console.log("Error when seed!!")
    console.error(err);
})
