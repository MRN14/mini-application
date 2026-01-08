import { prisma } from "../lib/prisma"
import { faker } from '@faker-js/faker';

async function seed() {

    // supprime toutes données existantes
    // await prisma.product.deleteMany();

    // Génère 5 fabricant
    const productFixtures = await Promise.all(
        Array.from({ length: 48 }).map(() => {
            return prisma.product.create({
                data: {
                    ref: faker.string.alphanumeric({ length: 12 }),
                    name: faker.commerce.productName(),
                    manufacturer: faker.company.name(),
                    quantity: faker.number.int({ min: 0, max: 100 })
                }
            })
        })
    );

    // Récupère tout les fabricants et leurs produits
    const allProducts = await prisma.product.findMany();
    console.log('All products:', JSON.stringify(allProducts, null, 2));
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })