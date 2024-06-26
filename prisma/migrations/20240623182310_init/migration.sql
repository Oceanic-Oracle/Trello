/*
  Warnings:

  - You are about to drop the column `number` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `order` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "number",
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
