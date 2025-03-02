export interface Repository<T> {
  getById(id: string): Promise<T | undefined>;
  save(entity: T): Promise<void>;
}
