export interface IProjectRepository<T> {
  insert(project: Partial<T>): Promise<T>;
  insertWithImages(project: Partial<T>, imageId: string[]): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
