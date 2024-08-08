document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;

    const task = {
        title,
        description,
        dueDate
    };

    addTask(task);
    document.getElementById('task-form').reset();
});

const tasks = [];

function addTask(task) {
    tasks.push(task);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <div class="task-actions">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}


function editTask(index) {
    const task = tasks[index];

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('due-date').value = task.dueDate;

    document.getElementById('task-form').onsubmit = function(event) {
        event.preventDefault();

        task.title = document.getElementById('title').value;
        task.description = document.getElementById('description').value;
        task.dueDate = document.getElementById('due-date').value;

        displayTasks();
        document.getElementById('task-form').reset();
        document.getElementById('task-form').onsubmit = addTaskSubmitHandler;
    };
}

function addTaskSubmitHandler(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;

    const task = {
        title,
        description,
        dueDate
    };

    addTask(task);
    document.getElementById('task-form').reset();
}

document.getElementById('task-form').onsubmit = addTaskSubmitHandler;


function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        displayTasks();
    }
}
