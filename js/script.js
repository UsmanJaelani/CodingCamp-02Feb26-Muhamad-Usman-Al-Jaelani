// Mengambil elemen dari HTML
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const emptyMsg = document.getElementById("emptyMsg");
const filterBtn = document.getElementById("filterBtn");

let isFilterOn = false;

// Fungsi: Tambah Tugas Baru
function addTodo() {
  const taskValue = taskInput.value;
  const dateValue = dateInput.value;

  if (taskValue === "" || dateValue === "") {
    alert("Please fill in both Task and Date!");
    return;
  }

  // Buat baris tabel baru
  const row = document.createElement("tr");

  row.innerHTML = `
        <td class="task-text">${taskValue}</td>
        <td>${dateValue}</td>
        <td class="status">Pending</td>
        <td>
            <button class="btn-action btn-check" onclick="toggleComplete(this)">✔</button>
            <button class="btn-action btn-delete" onclick="deleteTask(this)">🗑</button>
        </td>
    `;

  // Masukkan ke dalam tabel
  todoList.appendChild(row);

  // Reset Input
  taskInput.value = "";
  dateInput.value = "";

  checkEmpty();
}

// Fungsi: Hapus Satu Tugas
function deleteTask(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  checkEmpty();
}

// Fungsi: Hapus Semua
function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todoList.innerHTML = "";
    checkEmpty();
  }
}

// Fungsi: Tandai Selesai
function toggleComplete(button) {
  const row = button.parentElement.parentElement;
  const taskText = row.querySelector(".task-text");
  const statusText = row.querySelector(".status");

  if (statusText.innerText === "Pending") {
    statusText.innerText = "Completed";
    statusText.classList.add("status-completed");
    statusText.classList.remove("status-pending");
    taskText.classList.add("status-completed");
  } else {
    statusText.innerText = "Pending";
    statusText.classList.remove("status-completed");
    statusText.classList.add("status-pending");
    taskText.classList.remove("status-completed");
  }
}

// Fungsi: Filter
function filterTasks() {
  isFilterOn = !isFilterOn;
  const rows = todoList.querySelectorAll("tr");

  if (isFilterOn) {
    filterBtn.innerText = "FILTER: PENDING ONLY";
    rows.forEach((row) => {
      const status = row.querySelector(".status").innerText;
      if (status === "Completed") {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  } else {
    filterBtn.innerText = "FILTER: ALL";
    rows.forEach((row) => {
      row.style.display = "";
    });
  }
}

// Fungsi Utilitas
function checkEmpty() {
  if (todoList.children.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}
