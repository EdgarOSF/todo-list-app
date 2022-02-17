export class Todo {
  static fromJson({ tarea, completado, id, creado }) {
    const tempTodo = new Todo(tarea);

    tempTodo.id = id;
    tempTodo.tarea = tarea;
    tempTodo.completado = completado;
    tempTodo.creado = creado;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.completado = false;
    this.id = new Date().getTime();
    this.creado = new Date();
  }

  imprimirClase() {
    console.log(`${this.tarea} - ${this.id}`);
  }
}
