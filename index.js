import { getTasks, addTask, removeTask, clearTasks } from './tasks.js';

const form = document.getElementById('form-task');
const tasksList = document.getElementById('tasks');
const totalAmount = document.getElementById('total-el');
const totalResult = document.getElementById('total-result');
const sendInvoiceBtn = document.getElementById('send-btn');

render();

// EVENT LISTENER
form.addEventListener('submit', handleAddTask);
tasksList.addEventListener('click', handleRemoveTask);
sendInvoiceBtn.addEventListener('click', sendInvoice);

function render() {
  let htmlTasks = '';
  let total = 0;
  const tasks = getTasks();

  for (let task of tasks) {
    htmlTasks += `<div class="task">
                <p class="task-name">${task.task}</p>
                <button class="remove-btn" data-task="${task.id}">Remove</button>
                <p class="task-price">$<span>${task.price}</span></p>
              </div>`;

    total += task.price;
  }

  totalAmount.classList.toggle('total-amount-notNull', total > 0);
  sendInvoiceBtn.disabled = tasks.length > 0 ? false : true;

  totalResult.textContent = total;
  tasksList.innerHTML = htmlTasks;
}

function handleAddTask(e) {
  e.preventDefault();

  // get data form
  const formData = new FormData(form);
  const taskName = formData.get('task-name');
  const taskPrice = Number(formData.get('task-price'));
  const taskId = taskName + '-' + self.crypto.randomUUID();

  if (!taskName || isNaN(taskPrice) || !taskPrice) {
    return;
  }

  addTask({
    id: taskId,
    task: taskName,
    price: taskPrice,
  });

  form.reset();
  render();
}

function handleRemoveTask(event) {
  if (event.target.classList.contains('remove-btn')) {
    // remove the task
    const data = event.target.dataset;
    const taskId = data.task;

    removeTask(taskId);
  }

  render();
}

function sendInvoice() {
  const btn = document.getElementById('send-btn');

  btn.classList.add('sent');
  clearTasks();

  setTimeout(() => {
    btn.classList.remove('sent');
    render();
  }, 1500);
}
