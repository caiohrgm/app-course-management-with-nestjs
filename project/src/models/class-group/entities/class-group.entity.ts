export class ClassGroupEntity {
  id: string;
  className: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ClassGroupEntity>) {
    Object.assign(this, partial);
  }
}
