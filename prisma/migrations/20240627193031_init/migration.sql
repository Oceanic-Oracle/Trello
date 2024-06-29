/*
  Warnings:

  - You are about to drop the column `order` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "order";
