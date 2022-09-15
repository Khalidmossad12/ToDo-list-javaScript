/*
more tasls
[1] use sweet alert if input is empty
[2] check this task is exist
[3] create delete all tasks button
[4] create finish all tasks button
[5] add tasks to the local storage
*/

// setting up variables
let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus")
let tasksContainer = document.querySelector(".task-content")
let tasksCount = document.querySelector(".tasks-count span")
let tasksCompleted = document.querySelector(".tasks-completed span")

//focus on input field
window.onload = function () {
    theInput.focus();  
}

//adding the task
addButton.onclick = function () {
    
    // if input is empty
    if (theInput.value == "") {
        
        console.log("no value");

    } else {

        let noTasksMessage = document.querySelector(".no-tasks-message")

        //check if noTasksMessage span message is exist
        if (document.body.contains(noTasksMessage)) {
         
            // remove no tasks message
            noTasksMessage.remove(); 
        }

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

        //clear input
        theInput.value = ''

        //focus on field
        theInput.focus()

        //calculate tasks
        calcTasks()
    }
}

document.addEventListener('click' , function(e) {
    // Delete task
    if (e.target.className == "delete") {
        
        // remove current task
        e.target.parentNode.remove()

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