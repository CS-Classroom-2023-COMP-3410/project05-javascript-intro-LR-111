document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
  
    // Render tasks based on filter
    function renderTasks() {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
      });
  
      filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.setAttribute('draggable', true);
        taskItem.dataset.index = index;
  
        const taskContent = document.createElement('span');
        taskContent.textContent = task.name;
        taskItem.appendChild(taskContent);
  
        const actions = document.createElement('div');
        actions.className = 'actions';
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => editTask(index));
        actions.appendChild(editButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        actions.appendChild(deleteButton);
  
        taskItem.appendChild(actions);
  
        taskItem.addEventListener('click', (e) => {
          if (e.target.tagName !== 'BUTTON') toggleTaskCompletion(index);
        });
  
        // Drag-and-drop events
        taskItem.addEventListener('dragstart', dragStart);
        taskItem.addEventListener('dragover', dragOver);
        taskItem.addEventListener('drop', dropTask);
        taskItem.addEventListener('dragend', dragEnd);
  
        taskList.appendChild(taskItem);
      });
  
      saveTasks();
    }
  
    function addTask() {
      const taskName = taskInput.value.trim();
      if (taskName === '') return;
      tasks.push({ name: taskName, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }
  
    function editTask(index) {
      const newName = prompt('Edit task name:', tasks[index].name);
      if (newName !== null) {
        tasks[index].name = newName.trim();
        renderTasks();
      }
    }
  
    function toggleTaskCompletion(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Drag-and-drop functionality
    let draggedIndex = null;
  
    function dragStart(e) {
      draggedIndex = e.target.dataset.index;
      e.target.style.opacity = '0.5';
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dropTask(e) {
      const targetIndex = e.target.closest('.task-item').dataset.index;
      [tasks[draggedIndex], tasks[targetIndex]] = [tasks[targetIndex], tasks[draggedIndex]];
      renderTasks();
    }
  
    function dragEnd(e) {
      e.target.style.opacity = '1';
    }
  
    // Filter tasks
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        renderTasks();
      });
    });
  
    // Event Listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
  
    // Initial Render
    renderTasks();
  });
  