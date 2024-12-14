export interface IUseCase<T, K> {
  execute(request?: T, identity?: never): Promise<K> | K;
  canExecute?(identity?: never, request?: T): Promise<boolean> | boolean;
}
