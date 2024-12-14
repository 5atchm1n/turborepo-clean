export interface IService<D, E> {
  toEntity(model: D): Partial<E>;
  toModel(entity: E): D;
}
