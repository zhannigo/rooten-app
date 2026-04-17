let tasks = [];

const input = /**@type{HTMLInputElement} */(
    document.getElementById("taskInput")
);
const button = /**@type{HTMLButtonElement} */(
    document.getElementById("addBtn")
);
const list = /**@type{HTMLUListElement} */(
    document.getElementById("taskList")
);

function renderTasks(){
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.textContent = tasks[i];
        list.appendChild(li);
    }
}

button.addEventListener("click",() => {
    const text = input.value.trim();
    if (text==="") return;
    tasks.push(text);
    input.value="";
    renderTasks();
});