/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user-course" DROP CONSTRAINT "user-course_courseID_fkey";

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
