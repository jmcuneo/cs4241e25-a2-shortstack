// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const data = {
    taskName: document.querySelector("#taskName").value,
    taskDescription: document.querySelector("#taskDescription").value,
    taskDueDate: document.querySelector("#taskDueDate").value,
    taskPriority: document.querySelector("#taskPriority").value,
    taskDeadline: null,
  };

  const body = JSON.stringify(data);
  console.log("Task submission collected");

  const response = await fetch( "/submit", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  })

  const result = await response.json();
  console.log(result);
  // I used this library on a previous project for multiple notifications. I prefer it to using standard web alerts.
  swal("Task Submitted", "Your task has been successfully submitted!", "success")
  .then(() => {
    toTasks();
  });
  document.getElementById("taskForm").reset();
  console.log("Form reset");
}

function toTasks() {
  window.location.href = "/tasks";
}

const deadlineMap = {};
const loadTasks = async function() {
  const response = await fetch("/entries");
  const tasks = await response.json();

  const priorityValue = { High: 3, Medium: 2, Low: 1, past: 0 };
  tasks.sort((a, b) => {
    const prioA = priorityValue[(a.taskPriority || '').toLowerCase()] || 0;
    const prioB = priorityValue[(b.taskPriority || '').toLowerCase()] || 0;
    const prioDiff = prioA - prioB;
    if (prioDiff !== 0) return prioDiff;
    const aDue = new Date(a.taskDueDate).getTime();
    const bDue = new Date(b.taskDueDate).getTime();
    return aDue - bDue;
  })

  const taskList = document.querySelector("#taskTableBody");
  taskList.innerHTML = "";

  function formatDeadline(deadlineObj) {
    if (!deadlineObj) return "";

    const {days, hours, minutes, seconds } = deadlineObj;

    if (days > 0) return `${days} day${days !== 1 ? "s" : ""} left`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${minutes!== 1 ? "s" : ""} left`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} left`;
  }

  tasks.forEach(entry => {
    const row = document.createElement("tr");

    if (entry.taskDeadline && (entry.taskDeadline.days < 1) && !entry.completed) {
      row.classList.add("urgent");
    }

    let priorityText = entry.taskPriority;
    if (entry.completed || entry.taskPriority === "past") priorityText = "Completed";

    row.innerHTML = `
      <td>${entry.taskName}</td>
      <td>${entry.taskDescription}</td>
      <td>${entry.taskDueDate ? new Date(entry.taskDueDate).toLocaleString("en-GB") : ""}</td>
      <td>${priorityText}</td>
      <td class="deadline" data-id="${entry.id}"></td>
      <td>
        <input type="checkbox" class="complete-task" data-id="${entry.id}" ${entry.completed ? "checked" : ""}>
    `;

    taskList.appendChild(row);
  });

  document.querySelectorAll(".complete-task").forEach(checkbox => {
    checkbox.addEventListener("change", async function() {
      const id = Number(this.getAttribute("data-id"));
      const completed = this.checked;
      await fetch("/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, completed })
      });
      loadTasks().then(() => {
        if (completed) swal("Task Updated", "The task has been marked as completed!", "success");
      });
    })
  })

  tasks.forEach(entry => {
    deadlineMap[entry.id] = entry.taskDueDate;
  })

  updateDeadlines();
  if (window.countdownInterval) clearInterval(window.countdownInterval);
  window.countdownInterval = setInterval(updateDeadlines, 1000);
}

function updateDeadlines() {
  document.querySelectorAll(".deadline").forEach(cell => {
    const id = cell.getAttribute("data-id");
    const dueDate = deadlineMap[id];
    if (!dueDate) return;

    const now = new Date();
    const deadline = new Date(dueDate);
    let diff = deadline - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let text = "";
    if (days > 0) text = `${days} day${days !== 1 ? "s" : ""} left`;
    else if (hours > 0) text = `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${minutes !== 1 ? "s" : ""} left`;
    else if (minutes > 0) text = `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
    else text = `${seconds} second${seconds !== 1 ? "s" : ""} left`;

    cell.textContent = text;
  });
}

window.onload = function() {
  const today = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const localNow = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T${pad(today.getHours())}:${pad(today.getMinutes())}`;
  const dueDateInput = document.querySelector("#taskDueDate");
  if (dueDateInput) {
    dueDateInput.setAttribute("min", localNow);

    dueDateInput.addEventListener("invalid", function(event) {
      if (dueDateInput.validity.rangeUnderflow) {
        dueDateInput.setCustomValidity("Please select a date in the future.");
      } else {
        dueDateInput.setCustomValidity("Please");
      }
    });

    dueDateInput.addEventListener("input", function(event) {
      dueDateInput.setCustomValidity("");
    });
  }

  const form = document.querySelector("#taskForm");
  if (form) {
    form.addEventListener("submit", submit);
  }

  const taskPage = document.getElementById("taskList");
  if (taskPage) {
    loadTasks().then();
  }
}