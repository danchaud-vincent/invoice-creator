const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

const form = document.getElementById('form-task');
const tasksList = document.getElementById('tasks');
const totalAmount = document.getElementById('total-el');
const totalResult = document.getElementById('total-result');

render();

function render() {
  console.log(tasks);
  let htmlTasks = '';
  let total = 0;

  for (let task of tasks) {
    htmlTasks += `<div class="task">
                <p class="task-name">${task.task}</p>
                <button class="remove-btn" data-task="${task.id}" onClick="removeTask(event)">Remove</button>
                <p class="task-price">$<span>${task.price}</span></p>
              </div>`;

    total += task.price;
  }

  if (total > 0) {
    totalAmount.classList.add('total-amount-notNull');
  } else {
    totalAmount.classList.remove('total-amount-notNull');
  }

  totalResult.textContent = total;
  tasksList.innerHTML = htmlTasks;
}

function addTask(e) {
  e.preventDefault();

  // get data form
  const formData = new FormData(form);
  const taskName = formData.get('task-name');
  const taskPrice = formData.get('task-price');
  const taskId = taskName + '-' + self.crypto.randomUUID();
  console.log(taskId);

  if (taskName !== null || taskPrice !== null) {
    tasks.push({ id: taskId, task: taskName, price: Number(taskPrice) });
  }

  // reset form
  form.reset();

  // save in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  render();
}

function removeTask(event) {
  // remove the task
  const data = event.target.dataset;
  const taskId = data.task;
  const indexToRemove = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(indexToRemove, 1);

  // save in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  render();
}
