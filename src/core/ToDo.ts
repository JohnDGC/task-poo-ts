export abstract class ToDo<T> {
  abstract create(task: T): boolean;
  abstract read(): Array<T>;
  abstract update(id: number, task: T): boolean;
  abstract delete(id: number): boolean;
}
