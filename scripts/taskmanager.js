const NONIMPICON = "far fa-star";
const IMPICON = "fas fa-star";
let isImportant = false;
let formPanelShow = true;

// function Tasks(id,title,important,duration,deadline,location,status){

// }

function toggleImportant() {
    console.log("click");
    if (isImportant) {
        $("#iImportant").removeClass(IMPICON).addClass(NONIMPICON);
        isImportant = false;
    }
    else {
        $("#iImportant").removeClass(NONIMPICON).addClass(IMPICON);
        isImportant = true;
    }
}
function showHidePanel()
{
    console.log("button click");
    if (formPanelShow){
        $("#formTask").fadeOut(1500);
        $("#btnShowHide").text("Show Panel");
    }
    else{
        $("#formTask").fadeIn(1500);
        $("#btnShowHide").text("Hide Panel");
    }
    formPanelShow=!formPanelShow;
}


function init() {
    console.log("task manager");
    $("#iImportant").click(toggleImportant);
    $("#btnShowHide").click(showHidePanel);
    initR();
}


window.onload = init;