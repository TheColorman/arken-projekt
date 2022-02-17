/*
  Warnings:

  - You are about to drop the `_ARTWORK_TAGS` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artworkId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ARTWORK_TAGS_B_index";

-- DropIndex
DROP INDEX "_ARTWORK_TAGS_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ARTWORK_TAGS";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ArtworkToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Artwork" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artworkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    FOREIGN KEY ("artworkId") REFERENCES "Artwork" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ArtworkToTag_AB_unique" ON "_ArtworkToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtworkToTag_B_index" ON "_ArtworkToTag"("B");
