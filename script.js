let taskInput = document.querySelector("#taskinput");
let addtaskbtn = document.querySelector("#addtaskbtn");
let tasksUl = document.querySelector("#tasksul"); 
document.querySelector("#clearcompletedbtn");
let delbtn = document.querySelector("#delbtn");

// Load tasks when page loads
window.addEventListener('load', loadTasks);

// Save tasks to localStorage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('#tasksul li').forEach(li => {
        tasks.push({
            text: li.childNodes[1].textContent.trim(),
            completed: li.querySelector('.checkTask').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksUl.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="checkTask" ${task.completed ? 'checked' : ''}>${task.text} <button class="delbtn">Delete</button>`;
        tasksUl.appendChild(li);
    });
}

let addTask = () => {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML =  '<input type="checkbox" class="checkTask">'+ taskText + ' <button class="delbtn">Delete</button>';
    tasksUl.appendChild(li);
    taskInput.value = "";
    saveTasks(); // Save tasks after adding new one
}
taskInput.addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();}
        
});
addtaskbtn.addEventListener("click", addTask);

tasksUl.addEventListener("click", function(e) {
    if (e.target.classList.contains("delbtn")) {
        e.target.parentElement.remove();
        saveTasks(); // Save after deleting
    } else if (e.target.classList.contains("checkTask")) {
        saveTasks(); // Save when checkbox state changes
    }
});

