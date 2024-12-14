export interface IFileRepository<T> {
  save(file: Partial<T>): Promise<T>;
  delete(url: string): Promise<T>;
}

export interface IDBFileRepository<T> extends IFileRepository<T> {
  findByIds(fileIds: string[]): Promise<T[]>;
  findById(fileIds: string): Promise<T>;
}
