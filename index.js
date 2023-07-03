let submit_button = document.getElementById("gen_btn");
let sched_div = document.getElementById("schedule-div");
let prevs = document.querySelectorAll(".prev");
let fields = document.querySelectorAll("input[required]");
let role_table = document.getElementById("role_table");

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
    // prevs[index].innerText = "preview working";
    electronAPI.setField(index, e.target.files[0].path);
}

for(let i=0; i<fields.length; i++){
    fields[i].addEventListener('change', e => load_preview(i,e));
}

electronAPI.showAvail((event, data) => {
    console.log("parsed availability is:");
    console.log(data);
});

electronAPI.showReqs((event, data)=>{
    console.log("parsed Reqs are:");
    console.log(data);

});

electronAPI.showRoles((event, data)=>{
    console.log("parsed roles are:");
    console.log(data);

    table_html ="<tr>\n<th></th>\n";
    data.names.forEach((name) => {
        table_html+="<th>"+name+"</th>\n"
    });
    table_html += "</tr>";

    Object.keys(data).forEach((key,index) => {
        if(key !== "names"){
            row_html ="<tr>\n";
            data[key].forEach((el) => {
                // row_html+="<td"+ (el? "style='background-color:Tomato;'":"") +"></td>\n";
                row_html+="<td>"+el+"</td>\n";
            });
            row_html += "</tr>";
            table_html += row_html
        }
    });
    role_table.innerHTML=table_html;
});