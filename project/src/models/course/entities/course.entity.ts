export class CourseEntity {
  id: string;
  courseName: string;
  workload: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
  }
}
