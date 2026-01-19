const STORAGE_KEY = 'tasks';

let tasks = loadTasks();

export function getTasks() {
  return tasks;
}

export function addTask(task) {
  tasks.push(task);
  saveTasks(tasks);
}

export function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(tasks);
}

export function clearTasks() {
  tasks = [];
  saveTasks(tasks);
}

function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
