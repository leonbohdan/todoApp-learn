'use strict';

const todosFromServer = [
  {
    id: 1, title: 'HTML', completed: true,
  },
  {
    id: 2, title: 'CSS', completed: true,
  },
  {
    id: 3, title: 'JavaScript', completed: false,
  },
];

const root = document.querySelector('.todoapp');

const newTodoField = document.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

initTodos(todosFromServer);

function initTodos(todos) {
  for (const todo of todos) {
    itemsList.insertAdjacentHTML(
      'beforeend', `
      <li class="todo-item ${todo.completed ? 'completed' : ''}">
        <input
          id="todo-${todo.id}"
          class="toggle"
          type="checkbox"
          ${todo.completed ? 'checked' : ''}
        >
        <label for="todo-${todo.id}">${todo.title}</label>
        <button class="destroy"></button>
      </li>
    `);
  }

  updateInfo();
}

function updateInfo() {
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const footer = root.querySelector('.footer');
  const toggleAllContainer = root.querySelector('.toggle-all-container');

  counter.innerHTML = `${activeTogglers.length} item left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  const hasTodos = completedTogglers.length > 0 || activeTogglers.length > 0;

  footer.hidden = !hasTodos;
  toggleAllContainer.hidden = !hasTodos;
}

filter.addEventListener('click', (event) => {
  if (!event.target.dataset.filter) {
    return;
  }

  const filterButtons = root.querySelectorAll('[data-filter]');

  for (const button of filterButtons) {
    button.classList.toggle('selected', event.target === button);
  }

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    const item = toggler.closest('.todo-item');

    switch (event.target.dataset.filter) {
      case 'all':
        item.hidden = false;
        break;

      case 'active':
        item.hidden = toggler.checked;
        break;

      case 'completed':
        item.hidden = !toggler.checked;
    }
  }
});

clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggler of completedTogglers) {
    toggler.closest('.todo-item').remove();
  }

  updateInfo();
});

allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

  // if (allToggler.checked) {
  //   for (const toggler of togglers) {
  //     toggler.checked = true;
  //     toggler.closest('.todo-item').classList.add('completed');
  //   }
  // } else {
  //   for (const toggler of togglers) {
  //     toggler.checked = false;
  //     toggler.closest('.todo-item').classList.remove('completed');
  //   }
  // }

  for (const toggler of togglers) {
    toggler.checked = allToggler.checked;

    toggler.closest('.todo-item')
      .classList.toggle('completed', allToggler.checked);
  }

  updateInfo();
});

newTodoField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();

  itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo-item">
      <input
        id="todo-${id}"
        class="toggle"
        type="checkbox"
      >
      <label for="todo-${id}">${newTodoField.value}</label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';
  updateInfo();
});

itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo-item').remove();
  updateInfo();
});

itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target.closest('.todo-item')
    .classList.toggle('completed', event.target.checked);
  updateInfo();
});
