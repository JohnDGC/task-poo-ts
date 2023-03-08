import { ToDo } from "./ToDo";
import { ITask } from "./ITask";

export class Task extends ToDo<ITask> {

  public taskList: Array<ITask> = []

  create(task: ITask): boolean {
    this.taskList.push(task);
    return true;
  }

  read(): Array<ITask> {
    return this.taskList;
  }

  update(id: number, task: ITask): boolean {
    this.taskList.splice(id, 1, task);
    return true;
  }

  delete(id: number): boolean {
    this.taskList.splice(id, 1);
    return true;
  }
}
