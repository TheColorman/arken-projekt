-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collection" TEXT NOT NULL DEFAULT 'Unknown collection',
    "title" TEXT NOT NULL DEFAULT 'Unknown title',
    "artist" TEXT NOT NULL DEFAULT 'Unknown artist',
    "imagePath" TEXT NOT NULL
);
INSERT INTO "new_Artwork" ("artist", "id", "imagePath", "title") SELECT "artist", "id", "imagePath", "title" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
