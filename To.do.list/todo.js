document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("timeTable");
  
    table.addEventListener("click", function(event) {
      if (event.target.tagName === "TD") {
        const cell = event.target;
        cell.style.backgroundColor = "lightblue";
        console.log("hi");
      }
    });
  });
  