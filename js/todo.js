const todoForm = document.querySelector('.js-todo'),
    todoInput = todoForm.querySelector('.todo-input'),
    todoList = todoForm.querySelector('.todo-list');
const todoTotal = document.querySelector('.todo-total');
const TODOS_LS = 'TODO_LIST';

let todos = [];

function saveTodo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function loadTodo() {
    const strTodo = localStorage.getItem(TODOS_LS);

    if (strTodo !== null) {
        const parsedTodos = JSON.parse(strTodo);

        parsedTodos.forEach(function (todo) {
            paintTodo(todo.text);
        });
    }
}

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value;
    paintTodo(todoText);
    todoInput.value = '';
}

function completeTodo(event) {
    const li = event.target.parentNode;
    li.classList.toggle('check-todo');
}

function paintTodo(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const input = document.createElement('input');
    const newId = Math.random().toString(36).slice(2);

    input.setAttribute('type', 'checkbox');
    span.innerHTML = `${text} `;

    li.appendChild(input);
    li.appendChild(span);
    li.id = newId;

    input.addEventListener('change', completeTodo);

    const newTodo = {
        id: newId,
        text,
    };

    todoList.appendChild(li);
    todos.push(newTodo);
    todoTotal.innerHTML = todos.length;
    saveTodo();
}

function init() {
    loadTodo();
}
todoForm.addEventListener('submit', addTodo);
init();
