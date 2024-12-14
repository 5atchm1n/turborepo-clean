/*
  Warnings:

  - You are about to drop the column `project_id` on the `Image` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ImagesProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImagesProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImagesProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Image_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("created_at", "description", "file_id", "id", "name", "updated_at") SELECT "created_at", "description", "file_id", "id", "name", "updated_at" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_file_id_key" ON "Image"("file_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ImagesProjects_AB_unique" ON "_ImagesProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_ImagesProjects_B_index" ON "_ImagesProjects"("B");
