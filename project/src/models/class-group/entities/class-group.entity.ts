export class ClassGroupEntity {
  id: string;
  courseName: string;
  className: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ClassGroupEntity>) {
    Object.assign(this, partial);
  }
}
