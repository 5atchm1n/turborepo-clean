export interface IMapper<T, K> {
  toDomain?(raw: K): T;
  toEntity?(t: T): K;
}
