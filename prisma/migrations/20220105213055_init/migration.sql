-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "artist" TEXT NOT NULL DEFAULT 'Unknown',
    "imagePath" TEXT NOT NULL
);
