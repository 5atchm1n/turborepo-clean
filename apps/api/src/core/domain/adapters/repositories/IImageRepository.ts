export interface IImageRepository<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  insert(image: Partial<T>): Promise<T>;
  deleteImage(id: string): Promise<T>;
  findByProjectId(projectId: string): Promise<T[]>;
}
