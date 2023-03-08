import { Task } from '../core/Task';
import { ITask } from '../core/ITask';
import { menuApp, enter } from '../core/Menu';
let scanf = require('scanf');

const taskManager = new Task();

let op: number | string;
let salir: number = 5;
let index: number;
let task: string;

do {
  menuApp();
  console.log('Digite opción: ');
  op = scanf('%d');

  if (op == 1) {
    console.clear();
    console.log('Ingrese tarea: ');
    task = scanf('%S');

    if (task === '') {
      console.log('Espacio vacío', '\n', 'Ingrese nuevamente:');
      task = scanf('%S');
      console.clear();
    }

    if (!taskManager.taskList.find((repeat) => repeat.description == task)) {
      let myTask: ITask = { description: task };
      taskManager.create(myTask);
      console.log('\n', 'Tarea guardada', '\n');
    } else
      console.log('\n', 'Tarea repetida', '\n');

    enter();
  } else if (op == 2) {
    console.clear();
    taskManager.read().forEach((task, index) => console.log(`${index + 1}. ${task.description}`));;
    console.table(taskManager.taskList);
    enter();
  } else if (op == 3) {
    console.clear();
    console.table(taskManager.taskList);
    console.log(`Digite el indice de tarea a actualizar (0 - ${taskManager.taskList.length - 1}):`);
    index = scanf('%d');

    if (index <= taskManager.taskList.length) {
      console.log('Actulice:');
      let newTask = scanf('%S');

      if (newTask === '') {
        console.log('Espacio vacío', '\n', 'Ingrese nuevamente:');
        newTask = scanf('%S');
        console.clear();
      }

      if (!taskManager.taskList.find((repeat) => repeat.description == newTask)) {
        let myNewTask: ITask = { description: newTask };
        taskManager.taskList[index] = myNewTask;
        taskManager.update(index, myNewTask);
        console.table(taskManager.taskList);
        enter();
      } else {
        console.log('Tarea repetida');
        console.table(taskManager.taskList);
        enter();
      }
    } else
      console.log('\n', 'Índice inválido', '\n');

  } else if (op == 4) {
    console.clear();
    console.table(taskManager.taskList);
    console.log('\n', 'Digite el indice de tarea a eliminar:');
    index = scanf('%d');

    if (index <= taskManager.taskList.length - 1) {
      console.log('¿Seguro que quiere elimnar la tarea seleccionada? (y/n)');
      op = scanf('%S');

      if (op == 'n') {
        console.clear();
        console.table(taskManager.taskList);
        console.log('Regresando');
        enter();
      } else if (op == 'y') {
        console.clear();
        taskManager.delete(index);
        console.table(taskManager.taskList);
        console.log('Eliminado');
        enter();
      }
    } else console.log('\n', 'Índice inválido', '\n');

  } else if (op == 5) {
    console.clear();
    console.log('Finalizando...');
  }
} while (op != salir);

