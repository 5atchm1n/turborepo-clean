export interface IUserRepository<T> {
  updateRefreshToken(id: string, refreshToken: string): Promise<void>;
  insert(user: Partial<T>): Promise<T>;
  findByEmail(email: string): Promise<T>;
  findById(id: string): Promise<T>;
  updateById(id: string, user: Partial<T>): Promise<T>;
}
