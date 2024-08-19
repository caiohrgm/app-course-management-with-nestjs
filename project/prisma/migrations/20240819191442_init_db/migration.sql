/*
  Warnings:

  - You are about to drop the column `courseName` on the `class_group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classGroupId]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classGroupId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_group" DROP CONSTRAINT "class_group_courseName_fkey";

-- AlterTable
ALTER TABLE "class_group" DROP COLUMN "courseName";

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "classGroupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "course_classGroupId_key" ON "course"("classGroupId");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_classGroupId_fkey" FOREIGN KEY ("classGroupId") REFERENCES "class_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
