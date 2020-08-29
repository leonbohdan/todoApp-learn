'use strict';

const root = document.querySelector('.todoapp');

const newTodoField = document.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');

function updateInfo() {
  const notCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');

  counter.innerHTML = `${notCompletedTogglers.length} item left`;

  allToggler.checked = notCompletedTogglers.length === 0;
}

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
