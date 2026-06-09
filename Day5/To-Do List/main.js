import { Task } from "./task.js";
import { PriorityTask } from "./priorityTask.js";

const tasks = [];
const taskListEl = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date-input");
const errorEl = document.getElementById("error-msg");

function render() {
  taskListEl.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item`;
    li.dataset.index = index;
    if (task.status === "completed") {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.5";
    }

    const titleSpan = document.createElement("span");
    titleSpan.className = "task-title";
    titleSpan.textContent = task.title;

    const descSpan = document.createElement("span");
    descSpan.className = "task-desc";
    descSpan.textContent = task.description;

    const priorityBadge = document.createElement("span");
    priorityBadge.className = `badge badge-${task.priority}`;
    priorityBadge.textContent = task.priority;

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";
    infoDiv.appendChild(titleSpan);
    if (task.description) infoDiv.appendChild(descSpan);
    infoDiv.appendChild(priorityBadge);

    if (task instanceof PriorityTask) {
      const dueSpan = document.createElement("span");
      dueSpan.className = "task-due";
      dueSpan.textContent = task.formattedDueDate;
      infoDiv.appendChild(dueSpan);
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn-toggle";
    toggleBtn.textContent = task.status === "completed" ? "Undo" : "Done";
    toggleBtn.style.padding = "0.3rem 0.6rem";
    toggleBtn.style.border = "none";
    toggleBtn.style.borderRadius = "4px";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.addEventListener("click", () => {
      try {
        if (task.status === "pending") {
          task.complete();
        } else {
          task.undo();
        }
        render();
      } catch (e) {
        showError(e.message);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.style.padding = "0.3rem 0.6rem";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      render();
    });

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";
    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    taskListEl.appendChild(li);
  });
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.style.display = "block";
  setTimeout(() => {
    errorEl.style.display = "none";
  }, 3000);
}

addBtn.addEventListener("click", () => {
  try {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value || null;

    if (!title) {
      throw new Error("Task title cannot be empty");
    }

    let task;
    if (dueDate) {
      task = new PriorityTask(title, description, priority, dueDate);
    } else {
      task = new Task(title, description, priority);
    }

    tasks.push(task);
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    prioritySelect.value = "low";
    render();
  } catch (e) {
    showError(e.message);
  }
});

titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

render();
