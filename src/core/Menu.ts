let scanf = require('scanf');

export const menuApp = (): void => {
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

export const enter = (): void => {
  console.log('[Enter]');
  const op = scanf('%s');
  console.clear();
};
