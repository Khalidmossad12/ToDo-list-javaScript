/* 
more tasls
[1] use sweet alert if input is empty   =>*<=
[2] check this task is exist
[3] create delete all tasks button
[4] create finish all tasks button
[5] add tasks to the local storage
*/

// getDataFromLocalStorage()

// setting up variables
let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus")
let tasksContainer = document.querySelector(".task-content")
let tasksCount = document.querySelector(".tasks-count span")
let tasksCompleted = document.querySelector(".tasks-completed span")
let plusButton = document.querySelector(".plus")
let allDelete = document.querySelector(".finish-delete .delete-all")
let allFinish = document.querySelector(".finish-delete .finish-all")


// check if tasks in local storage
let arrayOfTasks = []

if (localStorage.getItem("tasks")!=null){

    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    display()
}

//focus on input field
window.onload = function () {
    theInput.focus();  
}

//adding the task
addButton.onclick = function () {
    
    // if input is empty
    if (theInput.value == "") {
        
        //sweet alert
        Swal.fire({
            title: 'No Value To Add!',
            text: 'Please Add a Valid Text',
            icon: 'error',
            confirmButtonText: 'OK'
        })

    } else {

        let noTasksMessage = document.querySelector(".no-tasks-message")

        //check if noTasksMessage span message is exist
        if (document.body.contains(noTasksMessage)) {
         
            // remove no tasks message
            noTasksMessage.remove(); 
        }

        isExist()

        //calculate tasks
        calcTasks()

        // add tasks to array
        // addTaskToArray(theInput.value)


        //clear input
        theInput.value = ''

        //focus on field
        theInput.focus()
        
    }
}

// function delete task
function deleteTask(index , count) {
    
    arrayOfTasks.splice(index , count)
    localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))
    display()
    calcTasks()
}

document.addEventListener('click' , function(e) {
    // Delete task
    if (e.target.className == "delete") {
        
        let taskIndex = e.target.getAttribute("id")

        // remove current task
        deleteTask(taskIndex , 1)

        //check number of tasks inside the container 
        if (tasksContainer.childElementCount == 0) {
            
            createNoTasks();
        }

        
    }

    // finish task    
    if (e.target.classList.contains('task-box')) {
        
        // Toggle class finished
        e.target.classList.toggle("finished")
    }  

    calcTasks()
})

// function to create no tasks message
function createNoTasks() {
    
    // create message span element 
    let msgSpan = document.createElement("span")

    // create the text message
    let msgText = document.createTextNode("No Tasks To Show")

    // add text to message span element
    msgSpan.appendChild(msgText)

    // add class to message span
    msgSpan.className = "no-tasks-message"

    // append the message span element to task container 
    tasksContainer.appendChild(msgSpan)
}

// function to calculate tasks
function calcTasks() {
    
    // calculate all tasks
    tasksCount.innerHTML = document.querySelectorAll(".task-content .task-box").length

    // calculate completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll(".task-content .finished").length

}

allDelete.addEventListener('click' , function(){

    for(let i=0 ; i<arrayOfTasks.length ; i++ ){

        deleteTask(i , arrayOfTasks.length);

        Swal.fire({
            icon: 'success',
            title: 'You Deleted All Tasks!'
        });
    }

    // Check Number Of Tasks Inside The Container
    if(arrayOfTasks.childElementCount == 0){
        createNoTasks();
    }

    // Calc All Tasks
    calcTasks();
    // Calc Finished Tasks
    calcTasks();
})

// Finish All Tasks
allFinish.addEventListener('click' , function(){

    let Tasks = document.querySelectorAll('.task-content .task-box');
    
    Tasks.forEach(task => {
        task.classList.add('finished');

        Swal.fire({
            icon: 'success',
            title: 'You Finished All Tasks!'
        })
    });
    calcTasks()
})

//add task to page
function display() {

    let task = ``
    for (let i = 0; i < arrayOfTasks.length; i++) {
        
        task += ` <span class="task-box">
            ${arrayOfTasks[i]}
            <span class="delete" id = "${i}" >Delete</span>
            </span>
        `   
    }
    
    if (task == "") {
        
        tasksContainer.innerHTML = `<span class="no-tasks-message">No Tasks To Show</span>`

    } else {
        
        tasksContainer.innerHTML = task
    }

    calcTasks()
}

function addTask() {
    
    //creat span element 
    let mainSpan = document.createElement("span")

    // create delete button
    let deleteSpan = document.createElement("span")

    // create the span text
    let text = document.createTextNode(theInput.value)

    // create the delete button text
    let deleteText = document.createTextNode("Delete")

    // add text to span
    mainSpan.appendChild(text)

    //add class to span
    mainSpan.className = 'task-box'

    // add text to delete button
    deleteSpan.appendChild(deleteText)

    //add class to delete button
    deleteSpan.className = 'delete'

    // add delete button to mainSpan
    mainSpan.appendChild(deleteSpan)

    //add the task to the container 
    tasksContainer.appendChild(mainSpan)
}

// function check is task exist
function isExist() {
    
    let term = theInput.value;

    arrayOfTasks.forEach(element => {
        
        if (element == term) {
            
            swal.fire({
                icon:'error',
                title:'Task Already Exist!',
                text:'Please, Enter Another Task.'
            });

            theInput.value = "";
            return;
        }
    });

    if (theInput.value != "") {
        
        addTask()

        arrayOfTasks.push(term)

        localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
        
        // Sweet Alert Express About Adding New Task
        Swal.fire({
            icon: 'success',
            title: 'You Added New Task!'
        })

        // Empty Field
        theInput.value = "";
    }
}