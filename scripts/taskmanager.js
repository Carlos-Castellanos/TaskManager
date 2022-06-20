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
    console.log(JSON.stringify(newTask));
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        type: "POST",
        data: JSON.stringify(newTask),
        contentType: "application/json",
        success: function (res) {
            let savedTask = JSON.parse(res);
            // console.log("Server says:", res);
            console.log(savedTask);
            displayTasks(savedTask);
        },
        error: function (detail) {
            console.log("Error saving:", detail);
        }
    });


}

function testTask() {
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
function getStatus(s) {
    switch (s) {
        case "0": return "New";
        case "1": return "In progress";
        case "3": return "Blocked";
        case "6": return "Completed";
        case "9": return "Removed";
        default: return "undefined";
    }
}
function displayTasks(task) {
    let star = (task.important) ? IMPICON : NONIMPICON;
    let estatus = getStatus (task.estatus);
    let sintax =
        `<div class="task status-${task.estatus}">
        <h4>${task.title}</h4>
        <label>${task.location}</label>
        <div class="dates">
            <label>${task.duration} days </label>
            <label>${task.deadline}</label>
        </div>
        <div>${estatus}</div>
        <div class="isImportant ${star}"></div>
    </div>`;
    $("#task-list").append(sintax);

}



function testAjax() {
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        type: "GET",
        success: function (res) {
            console.log(res);
        },
        error: function (errorDet) {
            console.log("error on request", errorDet);
        }
    });

}
function fetchTask() {
    /**
     * send a get req to "https://fsdiapi.azurewebsites.net/api/tasks
     * https://fsdiapi.azurewebsites.net/api/tasks/Carlos
     * response => json string
     * parse the responde 0> array
     * console log to the array
     */
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        type: "GET",
        // data: JSON.stringify(newTask),
        // contentType: "application/json",
        success: function (res) {
            let list_tasks = [];
            let savedTask = JSON.parse(res);
            for (let i = 1; i < savedTask.length; i++) {
                if (savedTask[i].name == "Carlos") {
                    let id = savedTask[i].id;
                    let title = savedTask[i].title;
                    let important = savedTask[i].isImportant;
                    let duration = savedTask[i].duration;
                    let deadline = savedTask[i].deadline;
                    let location = savedTask[i].location;
                    let estatus = savedTask[i].estatus;
                    newTask = new Task(
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

            }

        },
        error: function (detail) {
            console.log("Error saving:", detail);
        }
    });
}
function deleteAllTask() {
    //Delete all your task
    //Delete request to https://fsdiapi.azurewebsites.net/api/tasks/clear/Carlos
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Carlos",
        type: "DELETE",
        success: function () {
            console.log("sucess delete");
            // $("#task-list").empty();
            $("#task-list").html("");
        },
        error: function (err) {
            console.log("Error deleting:", err);
        }
    });

}
function init() {
    // runTests();

    console.log("task manager");

    // load data
    fetchTask();

    $("#txtImportant").click(toggleImportant);
    $("#btnShowHide").click(showHidePanel);
    $("#btnClear").click(deleteAllTask);

    $("#btnSave").click(saveTask);

    testTask();
    testTask();
    initR();
}

window.onload = init;
