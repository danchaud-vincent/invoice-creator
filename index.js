const tasks = [];

const form = document.getElementById('form-task');
const tasksList = document.getElementById('tasks');

function render() {
  let html = '';
  for (let task of tasks) {
    html += `<div class="task">
                <p class="task-name">${task.task}</p>
                <button class="remove-btn" data-task="${task.id}" onClick="removeTask(event)">Remove</button>
                <p class="task-price">$<span>${task.price}</span></p>
              </div>`;
  }
  tasksList.innerHTML = html;
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

  render();
}

function removeTask(event) {
  const data = event.target.dataset;
  const taskId = data.task;
  const indexToRemove = tasks.findIndex((task) => task.id === taskId);

  tasks.splice(indexToRemove, 1);

  render();
}
