const NONIMPICON = "far fa-star";
const IMPICON = "fas fa-star";
let isImportant = false;
let formPanelShow = true;

function toggleImportant() {
    console.log("click");
    if (isImportant) {
        $("#txtImportant").removeClass(IMPICON).addClass(NONIMPICON);
        isImportant = false;
    } else {
        $("#txtImportant").removeClass(NONIMPICON).addClass(IMPICON);
        isImportant = true;
    }
}
function showHidePanel() {
    console.log("button click");
    if (formPanelShow) {
        $("#formTask").fadeOut(1500);
        $("#btnShowHide").text("Show Panel");
    } else {
        $("#formTask").fadeIn(1500);
        $("#btnShowHide").text("Hide Panel");
    }
    formPanelShow = !formPanelShow;
}
function saveTask() {
    console.log("saving");
    // let id=$("txtid");
    let title = $("#txtTitle").val();
    // let important = isImportant;
    let duration = $("#txtDuration").val();
    let deadline = $("#txtDeadline").val();
    let location = $("#txtLocation").val();
    let estatus = $("#txtStatus").val();

    let newTask = new Task(
        0,
        title,
        isImportant,
        duration,
        deadline,
        location,
        estatus
    );
    console.log(newTask);
    displayTasks(newTask);

}

function testTask()
{
    let newTask = new Task(
        0,
        "title of the task",
        "isImportant",
        3,
        "2022-4-4 13:40",
        "mexicali",
        "6"
    );   
    displayTasks(newTask);
}

function displayTasks(task) {
    let star = (task.important) ? IMPICON : NONIMPICON;
    let estatus="undefined"
    switch (task.estatus){
    case "0": estatus="New"; break;
    case "1": estatus="In progress";break;
    case "3": estatus="Blocked";break;
    case "6": estatus="Completed";break;
    case "9": estatus="Removed";
    }
    let sintax =
        // `<div class="${star}></div>
        `<div class="task">
        <h4>${task.title}</h4>
        <label>${task.location}</label>
        <div class="dates">
            <label>${task.duration} days </label>
            <label>${task.deadline}</label>
        </div>
        <div>${estatus}</div>
        <div class="isImportant ${star}"></div>
    </div>`;
    // let important = isImportant;
    // <label>${task.estatus}</label>
    console.log(sintax);
    $("#task-list").append(sintax);

}

function sendToServer() { }
function init() {
    // runTests();

    console.log("task manager");

    // load data

    $("#txtImportant").click(toggleImportant);
    $("#btnShowHide").click(showHidePanel);
    $("#btnSave").click(saveTask);

    testTask();
    testTask();
    initR();
}

window.onload = init;
