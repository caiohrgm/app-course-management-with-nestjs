/*
  Warnings:

  - You are about to drop the column `classGroupId` on the `course` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `class_group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_classGroupId_fkey";

-- DropIndex
DROP INDEX "course_classGroupId_key";

-- AlterTable
ALTER TABLE "class_group" ADD COLUMN     "courseName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "course" DROP COLUMN "classGroupId";

-- AddForeignKey
ALTER TABLE "class_group" ADD CONSTRAINT "class_group_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "course"("courseName") ON DELETE RESTRICT ON UPDATE CASCADE;
