let allTasks = [];
let taskIndexNext=1;

const tasksInput = /**@type{HTMLInputElement} */(
    document.getElementById("taskInput")
);
const addTaskBtn = /**@type{HTMLButtonElement} */(
    document.getElementById("addBtn")
);
const tasksList = /**@type{HTMLUListElement} */(
    document.getElementById("taskList")
);

const filteredAll = /**@type{HTMLButtonElement} */(document.getElementById("allTasks"));
const filteredActive = /**@type{HTMLButtonElement} */(document.getElementById("activeTasks"));
const filteredDone = /**@type{HTMLButtonElement} */(document.getElementById("doneTasks"));

const filters = [
    {element: filteredAll, value: 0},
    {element: filteredActive, value: 1},
    {element: filteredDone, value: 2},
];

let currentFilter = 0;

filters.forEach(filter =>{
    filter.element.addEventListener("click", () =>{
        currentFilter = filter.value;
        renderTasks();
    })
})

function renderTasks(){
    let tasks = allTasks;

    switch (currentFilter) {
        case 1:
            tasks = allTasks.filter(task => !task.done);
            break;
        case 2:
            tasks = allTasks.filter(task => task.done);
            break;
        default:
            tasks = allTasks;
            break;
    }
    
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        const text = document.createElement('span')
        text.classList.add('task-text');
        text.textContent = tasks[i].text;
        const taskId = tasks[i].id;

        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.classList.add('delete-btn');
        deleteTaskBtn.innerHTML=
        `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.875 11.25C1.53125 11.25 1.23708 11.1277 0.9925 10.8831C0.7475 10.6381 0.625 10.3438 0.625 10V1.875C0.447917 1.875 0.299375 1.81521 0.179375 1.69562C0.0597918 1.57562 0 1.42708 0 1.25C0 1.07292 0.0597918 0.924375 0.179375 0.804375C0.299375 0.684792 0.447917 0.625 0.625 0.625H3.125C3.125 0.447917 3.185 0.299375 3.305 0.179375C3.42458 0.0597916 3.57292 0 3.75 0H6.25C6.42708 0 6.57563 0.0597916 6.69563 0.179375C6.81521 0.299375 6.875 0.447917 6.875 0.625H9.375C9.55208 0.625 9.70042 0.684792 9.82 0.804375C9.94 0.924375 10 1.07292 10 1.25C10 1.42708 9.94 1.57562 9.82 1.69562C9.70042 1.81521 9.55208 1.875 9.375 1.875V10C9.375 10.3438 9.25271 10.6381 9.00813 10.8831C8.76313 11.1277 8.46875 11.25 8.125 11.25H1.875ZM1.875 1.875V10H8.125V1.875H1.875ZM3.125 8.125C3.125 8.30208 3.185 8.45042 3.305 8.57C3.42458 8.69 3.57292 8.75 3.75 8.75C3.92708 8.75 4.07563 8.69 4.19563 8.57C4.31521 8.45042 4.375 8.30208 4.375 8.125V3.75C4.375 3.57292 4.31521 3.42437 4.19563 3.30437C4.07563 3.18479 3.92708 3.125 3.75 3.125C3.57292 3.125 3.42458 3.18479 3.305 3.30437C3.185 3.42437 3.125 3.57292 3.125 3.75V8.125ZM5.625 8.125C5.625 8.30208 5.685 8.45042 5.805 8.57C5.92458 8.69 6.07292 8.75 6.25 8.75C6.42708 8.75 6.57563 8.69 6.69563 8.57C6.81521 8.45042 6.875 8.30208 6.875 8.125V3.75C6.875 3.57292 6.81521 3.42437 6.69563 3.30437C6.57563 3.18479 6.42708 3.125 6.25 3.125C6.07292 3.125 5.92458 3.18479 5.805 3.30437C5.685 3.42437 5.625 3.57292 5.625 3.75V8.125Z" fill="#4F4F4F"/>
            </svg>`

        deleteTaskBtn.addEventListener("click",()=>{
            deleteTask(taskId);
        })
        li.classList.add('task');
        if(tasks[i].done){li.classList.add('task-done');}

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].done;
        checkbox.addEventListener('change', () => {
            changeTaskState(taskId, checkbox.checked);
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteTaskBtn);
        tasksList.appendChild(li);
    }
}

function changeTaskState(index, state){
    const task = allTasks.find(task => task.id === index);
    if(!task) return;
    task.done = state;
    renderTasks();
}

function deleteTask(index){
    allTasks = allTasks.filter(task => task.id !== index);
    renderTasks();
}

tasksInput.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addTaskBtn.click();
    }
});

addTaskBtn.addEventListener("click",() => {
    const text = tasksInput.value.trim();
    if (text==="") return;
    allTasks.push({
        id: taskIndexNext++,
        text: text,
        done: false
    });
    //tasks.push(text);
    tasksInput.value="";
    tasksInput.focus();
    renderTasks();
});