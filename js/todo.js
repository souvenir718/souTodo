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
            paintTodo(todo.text, todo.isDone);
        });
    }
}

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value;
    paintTodo(todoText, false);
    todoInput.value = '';
}

function completeTodo(event) {
    const li = event.target.parentNode;
    li.classList.toggle('check-todo');
    // console.log(event.target.checked);
    console.log(li.id);
    console.log(todos);
    const modifyList = todos.map((todo) => (todo.id === li.id ? { ...todo, isDone: event.target.checked } : todo));
    console.log(modifyList);

    todos = modifyList;
    saveTodo();
}

function paintTodo(text, isDone) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const input = document.createElement('input');
    const newId = Math.random().toString(36).slice(2);

    input.setAttribute('type', 'checkbox');
    span.innerHTML = `${text} `;

    li.appendChild(input);
    li.appendChild(span);
    li.id = newId;

    if (isDone) {
        console.log(input);
        input.checked = true;
        li.classList.add('check-todo');
    }

    input.addEventListener('change', completeTodo);

    const newTodo = {
        id: newId,
        text,
        isDone: isDone,
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
