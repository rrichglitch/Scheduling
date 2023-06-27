let submit_button = document.getElementById("gen_btn");

submit_button.addEventListener("click", function(e) {
  let prevs = document.querySelectorAll(".prev");
  
  prevs.forEach(element => {
    if(element.innerHTML == "")
        element.innerHTML = "REQUIRED FIELD";
  });
});