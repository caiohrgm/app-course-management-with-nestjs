/*
  Warnings:

  - A unique constraint covering the columns `[courseName]` on the table `course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "course_courseName_key" ON "course"("courseName");
