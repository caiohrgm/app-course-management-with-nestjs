-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_group" (
    "id" TEXT NOT NULL,
    "courseName" TEXT,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-class" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "classID" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-course" (
    "id" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "courseID" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_hashedPassword_key" ON "user"("hashedPassword");

-- CreateIndex
CREATE UNIQUE INDEX "class_group_className_key" ON "class_group"("className");

-- CreateIndex
CREATE UNIQUE INDEX "course_courseName_key" ON "course"("courseName");

-- AddForeignKey
ALTER TABLE "class_group" ADD CONSTRAINT "class_group_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "course"("courseName") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-class" ADD CONSTRAINT "user-class_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-class" ADD CONSTRAINT "user-class_classID_fkey" FOREIGN KEY ("classID") REFERENCES "class_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-course" ADD CONSTRAINT "user-course_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
