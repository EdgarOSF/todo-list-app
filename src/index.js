import { Todo, TodoList } from './clases';
import { crearTodoHtml } from './js/componentes';
import './styles.css';

export const todoList = new TodoList();
// const tarea = new Todo("Hacer la limpieza");
// todoList.nuevoTodo(tarea);
// crearTodoHtml(tarea);

todoList.todos.forEach(crearTodoHtml);

// console.log(todoList.todos);
