document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("create");
    const taskList = document.querySelector(".to-do-task");
    const allFilter = document.querySelector("span:nth-child(2)");
    const activeFilter = document.querySelector("span:nth-child(3)");
    const completedFilter = document.querySelector("span:nth-child(4)");
    const clearCompleted = document.querySelector("span:nth-child(5)");
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
      let filteredTasks = tasks;
  
      if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
      } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
      }
  
      filteredTasks.forEach(task => {
        const taskItem = document.createElement("button");
        taskItem.classList.add("button-with-checkbox");
        taskItem.innerHTML = `
          <input type="checkbox" ${task.completed ? "checked" : ""}>
          <span class="${task.completed ? "completed-task" : "active-task"}">${task.text}</span>
          <button class="delete-btn">❌</button>
        `;
  
        // Toggle complete status
        taskItem.querySelector("input").addEventListener("change", function () {
          task.completed = !task.completed;
          saveTasks();
          renderTasks(filter);
        });
  
        // Delete task
        taskItem.querySelector(".delete-btn").addEventListener("click", function () {
          tasks = tasks.filter(t => t !== task);
          saveTasks();
          renderTasks(filter);
        });
  
        taskList.prepend(taskItem);
      });
    }
  
    // Add new task
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter" && taskInput.value.trim() !== "") {
        tasks.push({ text: taskInput.value, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    });
  
    // Filter tasks
    allFilter.addEventListener("click", () => renderTasks("all"));
    activeFilter.addEventListener("click", () => renderTasks("active"));
    completedFilter.addEventListener("click", () => renderTasks("completed"));
  
    // Clear completed tasks
    clearCompleted.addEventListener("click", function () {
      tasks = tasks.filter(task => !task.completed);
      saveTasks();
      renderTasks();
    });
  
    // Initial rendering of tasks
    renderTasks();
  });
  