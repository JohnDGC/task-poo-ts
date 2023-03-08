let scanf = require('scanf');

export abstract class ToDo<T> {
  abstract create(arg: T): boolean;
  abstract read(): Array<T>;
  abstract update(id: number, task: any): boolean;
  abstract delete(id: number): boolean;
}

interface ITask {
  description: string;
}

class Task extends ToDo<ITask> {
  constructor(public taskList: Array<any> = []) {
    super();
  }

  create(task: any): boolean {
    this.taskList.push(task);
    return true;
  }

  read(): Array<any> {
    return this.taskList;
  }

  update(id: number, task: any): boolean {
    this.taskList.splice(id, 1, task);
    return true;
  }

  delete(id: number): boolean {
    this.taskList.splice(id, 1);
    return true;
  }
}

// export class ToDo {
//   constructor(public taskList: Array<any> = []) { }

//   create(task: any): boolean {
//     this.taskList.push(task);
//     return true;
//   }

//   read(): Array<any> {
//     return this.taskList;
//   }

//   update(id: number, task: any): boolean {
//     this.taskList.splice(id, 1, task);
//     return true;
//   }

//   delete(id: number): boolean {
//     this.taskList.splice(id, 1);
//     return true;
//   }
// }

// const task_1 = new ToDo();

// task_1.create({
//   description: 'lorem ipsum',
// });
// console.log('create ', task_1);
// task_1.read();
// console.log('read ', task_1);
// task_1.delete(0);
// console.log('delete ', task_1);

let user = new Task();

const menuApp = (): void => {
  console.log(
    `------------
    Menú de tareas:
    1. Crear tarea
    2. Ver tarea
    3. Actualizar tarea
    4. Eliminar tarea
    5. Cerrar
    ------------`
  );
};
const enter = (): void => {
  console.log('[Enter]');
  op = scanf('%s');
  console.clear();
};

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

    // if (task === '') {
    //   console.log('Espacio vacío','\n', 'Ingrese nuevamente:');
    //   task = scanf('%S');
    //   console.clear();
    // }

    if (!user.taskList.find((repeat) => repeat == task)) {
      user.create(task);
      console.log('\n', 'Tarea guardada', '\n');
    } else
      console.log('\n', 'Tarea repetida', '\n');

    enter();
  } else if (op == 2) {
    console.clear();
    user
      .read()
      .forEach((tarea, index) => console.log(`${index + 1}. ${tarea}`));
    enter();
  } else if (op == 3) {
    console.clear();
    console.table(user.taskList);
    index = scanf('%d');

    if (index <= user.taskList.length) {
      console.log('Actulice:');
      let newTask = scanf('%S');
      console.clear();

      if (newTask === '') {
        console.log('Espacio vacío', '\n', 'Ingrese nuevamente:');
        newTask = scanf('%S');
        console.clear();
      }

      if (!user.taskList.find((repeat) => repeat == newTask)) {
        user.taskList[index] = newTask;
        user.update(index, newTask);

        console.table(user.taskList);
        enter();
      } else {
        console.log('Tarea repetida');
        console.table(user.taskList);
        enter();
      }
    } else console.log('\n', 'Índice inválido', '\n');

  } else if (op == 4) {
    console.table(user.taskList);
    console.log('\n', 'Digite el indice de tarea a eliminar:');
    index = scanf('%d');
    user.delete(index);
    enter();
  } else if (op == 5) {
    console.clear();
    console.log('Finalizando...');
  }
} while (op != salir);

