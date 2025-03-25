document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const itemsLeft = document.getElementById("itemsLeft");
    const filterAll = document.getElementById("filterAll");
    const filterActive = document.getElementById("filterActive");
    const filterCompleted = document.getElementById("filterCompleted");
    const clearCompleted = document.getElementById("clearCompleted");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function updateItemsLeft() {
      const activeTasks = tasks.filter(task => !task.completed).length;
      itemsLeft.textContent = `${activeTasks} items left`;
    }
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
  
      let filteredTasks = tasks;
      if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
      } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
      }
  
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) li.classList.add("completed");
  
        li.innerHTML = `
          <label>
            <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
            <span>${task.text}</span>
          </label>
          <button class="delete-btn" data-index="${index}">&times;</button>
        `;
  
        taskList.appendChild(li);
      });
  
      updateItemsLeft();
    }
  
    addTaskBtn.addEventListener("click", () => {
      if (taskInput.value.trim() !== "") {
        tasks.unshift({ text: taskInput.value.trim(), completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
      }
    });
  
    taskList.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT") {
        const index = e.target.dataset.index;
        tasks[index].completed = e.target.checked;
        saveTasks();
        renderTasks();
      }
  
      if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    });
  
    clearCompleted.addEventListener("click", () => {
      tasks = tasks.filter(task => !task.completed);
      saveTasks();
      renderTasks();
    });
  
    [filterAll, filterActive, filterCompleted].forEach(filter => {
      filter.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(el => el.classList.remove("active"));
        filter.classList.add("active");
        renderTasks(filter.id.replace("filter", "").toLowerCase());
      });
    });
  
    renderTasks();
  });
  
  
  