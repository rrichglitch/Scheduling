let submit_button = document.getElementById("gen_btn");
let sched_div = document.getElementById("schedule-div");
let prevs = document.querySelectorAll(".prev");
let fields = document.querySelectorAll("input[required]");

submit_button.addEventListener("click", function(e) {
    let ready = true;

    prevs.forEach(element => {
    if(element.innerHTML == ""){
        ready = false;
        element.innerHTML = "REQUIRED FIELD";
    }

    if(ready){
        sched_div.innerHTML = "Generating Scedule..."
        electronAPI.getSched();
    }
    });
});

function load_preview(index, e){
    e.preventDefault();
    prevs[index].innerHTML = "preview working";
    window.electronAPI.setField(index, e.target.files[0].path);
}

for(let i=0; i<fields.length; i++){
    fields[i].addEventListener('change', e => load_preview(i,e));
}