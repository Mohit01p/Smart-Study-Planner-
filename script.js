const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const timeline = document.getElementById("timeline");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();
renderTimeline();

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskName = document.getElementById("taskName").value;
  const taskDate = document.getElementById("taskDate").value;

  if(taskName && taskDate){
    const task = {name: taskName, date: taskDate};
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    renderTimeline();

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";

    // Optional reminder alert if task date is today
    const today = new Date().toISOString().split('T')[0];
    if(taskDate === today){
      alert(`Reminder: Task "${taskName}" is due today!`);
    }
  } else {
    alert("Please enter both task name and date.");
  }
});

// Render Tasks
function renderTasks(){
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.name} - ${task.date} 
      <button onclick="deleteTask(${index})">Delete</button>`;
    taskList.appendChild(li);
  });
}

// Delete Task
function deleteTask(index){
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderTimeline();
}

// Render Timeline
function renderTimeline(){
  timeline.innerHTML = "";
  if(tasks.length === 0){
    timeline.innerHTML = "<p>No tasks to show.</p>";
    return;
  }

  // Sort tasks by date
  const sortedTasks = tasks.slice().sort((a,b) => new Date(a.date) - new Date(b.date));

  const bar = document.createElement("div");
  bar.classList.add("timeline-bar");

  sortedTasks.forEach(task => {
    const div = document.createElement("div");
    div.classList.add("timeline-task");
    div.innerText = `${task.name}\n${task.date}`;
    bar.appendChild(div);
  });

  timeline.appendChild(bar);
}

