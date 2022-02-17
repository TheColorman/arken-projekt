/*
  Warnings:

  - You are about to drop the column `tags` on the `Artwork` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ARTWORK_TAGS" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Artwork" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collection" TEXT NOT NULL DEFAULT 'Unknown collection',
    "title" TEXT NOT NULL DEFAULT 'Unknown title',
    "artist" TEXT NOT NULL DEFAULT 'Unknown artist',
    "imagePath" TEXT NOT NULL
);
INSERT INTO "new_Artwork" ("artist", "collection", "id", "imagePath", "title") SELECT "artist", "collection", "id", "imagePath", "title" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ARTWORK_TAGS_AB_unique" ON "_ARTWORK_TAGS"("A", "B");

-- CreateIndex
CREATE INDEX "_ARTWORK_TAGS_B_index" ON "_ARTWORK_TAGS"("B");
