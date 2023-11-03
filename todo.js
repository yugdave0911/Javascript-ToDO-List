class Task {
    static counter = 1;

    constructor(text){
        this.id = Task.counter++;
        this.text = text;
        this.completed = false;
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }

    render(){
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
        <span>${this.id}</span>
      <span>${this.text}</span>
      <button onclick="toggleTask(${this.id})">Mark as ${this.completed ? "Incomplete" : "Complete"}</button>
    `;
    return taskItem;
    }
}

class SubTask extends Task{
    constructor(text, dueDate){
        super(text);
        this.dueDate =  dueDate;
    }
    render() {
        const taskItem = super.render();
        const dueDateSpan = document.createElement("span");
        dueDateSpan.textContent = `Due Date: ${this.dueDate}`;
        taskItem.appendChild(dueDateSpan);
        return taskItem;
      }
}

class ToDoList {
    
    constructor(){
        this.tasks=[];
    }
    addTask(task){
        if(task instanceof Task){
            this.tasks.push(task);
        }
        else{
            return alert("Invalid Task!");
        }
    }

    render(){
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        this.tasks.forEach((task) => {
        taskList.appendChild(task.render());
    });
    }
}
let taskList = new ToDoList();
let stask1 = new SubTask("Task 1", "Today");
taskList.addTask(stask1);
document.getElementById("addTaskButton").addEventListener("click", function(){
    const taskText = document.getElementById("taskInput").value;
    const taskDueDate = document.getElementById("dueDate").value; 
    
    if (taskDueDate.trim() === "") {
        const task = new Task(taskText);
        taskList.addTask(task);
      } else {
        const subTask = new SubTask(taskText, taskDueDate);
        taskList.addTask(subTask);
    }
    taskList.render();

    document.getElementById("taskInput").value="";
    document.getElementById("dueDate").value="";
    
})

function toggleTask(taskId) {
    const task = taskList.tasks.find((t) => t.id === taskId);
    if (task) {
      task.toggleCompleted();
      taskList.render();
    }
  }