document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskName = taskInput.value.trim();
  if (taskName === "") return;

  const task = {
    name: taskName,
    completed: false,
    priority: false,
  };

  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
}

function addTaskToDOM(task) {
  const taskList = document.getElementById("task-list");

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  if (task.completed) {
    taskItem.classList.add("completed");
  }
  if (task.priority) {
    taskItem.style.backgroundColor = "#fff3cd";
  }

  const taskName = document.createElement("span");
  taskName.className = "task-name";
  taskName.textContent = task.name;

  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerHTML = "Edit";
  editButton.onclick = () => editTask(taskName, task);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = () => deleteTask(taskItem, task);

  const priorityButton = document.createElement("button");
  priorityButton.className = "priority-btn";
  priorityButton.innerHTML = "Priority";
  priorityButton.onclick = () => togglePriority(taskItem, task);

  const completeButton = document.createElement("button");
  completeButton.className = "complete-btn";
  completeButton.innerHTML = "Complete";
  completeButton.onclick = () => toggleComplete(taskItem, task);

  taskActions.append(editButton, deleteButton, priorityButton, completeButton);
  taskItem.append(taskName, taskActions);
  taskList.appendChild(taskItem);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskItem, task) {
  taskItem.remove();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.name !== task.name);
  updateTasks(tasks);
}

function togglePriority(taskItem, task) {
  task.priority = !task.priority;
  if (task.priority) {
    taskItem.style.backgroundColor = "#fff3cd";
  } else {
    taskItem.style.backgroundColor = "";
  }
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t.name === task.name ? task : t));
  updateTasks(tasks);
}

function toggleComplete(taskItem, task) {
  task.completed = !task.completed;
  if (task.completed) {
    taskItem.classList.add("completed");
  } else {
    taskItem.classList.remove("completed");
  }
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t.name === task.name ? task : t));
  updateTasks(tasks);
}

function editTask(taskName, task) {
  const newName = prompt("Edit Task:", task.name);
  if (newName === null || newName.trim() === "") return;
  taskName.textContent = newName.trim();
  task.name = newName.trim();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t.name === task.name ? task : t));
  updateTasks(tasks);
}
