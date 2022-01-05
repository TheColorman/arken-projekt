const { PrismaClient } = require('@prisma/client');
const { readdirSync } = require('fs');

const prisma = new PrismaClient();

async function main() {

    const images = readdirSync("./public/images");
    for (const image of images) {
        await prisma.artwork.create({
            data: {
                imagePath: image,
            },
        });
    }

    const allArtwork = await prisma.artwork.findMany();

    console.log(allArtwork);
}

main();