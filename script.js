const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Load data dari localStorage saat halaman dibuka
let todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.forEach(todo => addTask(todo.text, todo.completed));

// Event untuk tombol "Tambah"
addButton.addEventListener('click', () => {
  const value = input.value;
  if (value !== "") {
    addTask(value);
    input.value = "";
    updateLocalStorage();
  }
});

// Event untuk tekan tombol Enter di input
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const value = input.value;
    if (value !== "") {
      addTask(value);
      input.value = "";
      updateLocalStorage();
    }
  }
});


// fungsi tambah task
function addTask(taskText, completed = false) {
    const li = document.createElement('li');

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateLocalStorage ()
    });

// Teks task
const span = document.createElement('span');
span.textContent = taskText;

//hapus button
const deleteBtn = document.createElement('button');
deleteBtn.textContent = "Hapus";
deleteBtn.classList.add('delete-Btn');
deleteBtn.addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
});

if(completed) li.classList.add('completed');

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);
todoList.appendChild(li);

}

//s] simpan task baru ke localStorage
function savetask(taskText, completed) {
    todos.push({text: taskText, completed: completed});
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Update seluruh localStorage saat anda perubahan
function updateLocalStorage() {
    const items = document.querySelectorAll('#todo-list li');
    todos = [];
    items.forEach(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.classList.contains('completed');
        todos.push({text, completed});
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}