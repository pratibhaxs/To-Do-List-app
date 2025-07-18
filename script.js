document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTasks(task));
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') {
            return;
        }
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        renderTasks(newTask);
        saveTasks();
        todoInput.value = '';

    });

    function renderTasks(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) {
            li.classList.add('completed');

        }
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
        li.innerHTML = `
            <span>${task.completed ? '<span style="color:#22c55e;font-size:1.2em;margin-right:0.5em;vertical-align:middle;">&#10003;</span>' : ''}${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Toggle completed state only when clicking the span (not the delete button)
        li.querySelector('span').addEventListener('click', (e) => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            // Update the checkmark
            if (task.completed) {
                li.querySelector('span').innerHTML = `<span style=\"color:#22c55e;font-size:1.2em;margin-right:0.5em;vertical-align:middle;\">&#10003;</span>${task.text}`;
            } else {
                li.querySelector('span').innerHTML = task.text;
            }
            saveTasks();
        });

        // Delete button handler
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });
        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})