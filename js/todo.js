const todoForm = document.querySelector('.js-todo'),
    todoInput = todoForm.querySelector('.todo-input'),
    todoList = todoForm.querySelector('.todo-list');
const todoTotal = document.querySelector('.todo-total');
const addBtn = document.querySelector('.add-todo');

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
            paintTodo(todo.text, todo.isDone, todo.date);
        });
    }
}

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value;
    let today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const strMonth = month < 10 ? `0${month}` : month;
    const strDate = date < 10 ? `0${date}` : date;

    today = `${year}.${strMonth}.${strDate}`;

    paintTodo(todoText, false, today);
    todoInput.value = '';
    addBtn.classList.remove('hide');
    todoInput.classList.add('hide');
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

function deleteTodo(event) {
    const li = event.target.parentNode;

    todoList.removeChild(li);
    const cleanList = todos.filter(function (todo) {
        return todo.id !== li.id;
    });

    todos = cleanList;
    todoTotal.innerHTML = todos.length;
    saveTodo();
}

function paintTodo(text, isDone, date) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const input = document.createElement('input');
    const newId = Math.random().toString(36).slice(2);
    const delBtn = document.createElement('span');
    const dateText = document.createElement('span');

    input.setAttribute('type', 'checkbox');
    span.innerHTML = `${text}`;
    dateText.innerHTML = date;
    dateText.classList.add('date-todo');
    delBtn.innerHTML = '❌';
    delBtn.classList.add('del-todo');

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(dateText);
    li.id = newId;

    if (isDone) {
        console.log(input);
        input.checked = true;
        li.classList.add('check-todo');
    }

    input.addEventListener('change', completeTodo);
    delBtn.addEventListener('click', deleteTodo);
    const newTodo = {
        id: newId,
        text,
        isDone: isDone,
        date,
    };

    todoList.appendChild(li);
    todos.push(newTodo);
    todoTotal.innerHTML = todos.length;
    saveTodo();
}

function showInput() {
    addBtn.classList.add('hide');
    todoInput.classList.remove('hide');
}

function init() {
    loadTodo();
}

addBtn.addEventListener('click', showInput);
todoForm.addEventListener('submit', addTodo);
init();
