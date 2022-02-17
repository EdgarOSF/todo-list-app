import { Todo } from '../clases';
import '../css/componentes.css';
import { todoList } from '../index.js'; //  unifica las instancias de las demas clases

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const btnSeleccionado = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const tareaHtml = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${Date.now()}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? 'checked' : ''
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement('div');
  div.innerHTML = tareaHtml;
  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

// Eventos
txtInput.addEventListener('keyup', (event) => {
  if (event.keyCode == 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    txtInput.value = '';
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
  }
});

divTodoList.addEventListener('click', (event) => {
  const nombreElemento = event.target.localName; // label, button, input
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  if (nombreElemento.includes('input')) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains('completed'))
      divTodoList.removeChild(elemento);
  }
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;
  if (!event.target.text) {
    return;
  }

  btnSeleccionado.forEach((elemento) => elemento.classList.remove('selected'));
  event.target.classList.add('selected');

  for (let elemento of divTodoList.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch (filtro) {
      case 'Pendientes':
        if (completado) elemento.classList.add('hidden');
        break;

      case 'Completados':
        if (!completado) elemento.classList.add('hidden');
        break;
    }
  }
});
