document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("add-task");
  
    addTaskButton.addEventListener("click", function () {
      const taskInput = document.getElementById("task");
      const selectedTimeStart = document.getElementById("time-start").value;
      const selectedTimeEnd = document.getElementById("time-end").value;
      const selectedDay = document.getElementById("day").value;
      const taskColor = document.getElementById("color").value;
  
      const dayElement = document.querySelector(".day[data-day='" + selectedDay + "']");
      if (dayElement) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = taskInput.value;
        taskElement.style.backgroundColor = taskColor;
  
        const timeSlots = document.querySelectorAll(".time-slot");
        let startColumn, endColumn;
  
        timeSlots.forEach(function (timeSlot, index) {
          if (timeSlot.getAttribute("data-time") === selectedTimeStart) {
            startColumn = index + 2; // +2 för att kompensera för de första två kolumnerna
          }
          if (timeSlot.getAttribute("data-time") === selectedTimeEnd) {
            endColumn = index + 2;
          }
        });
  
        if (startColumn && endColumn) {
          taskElement.style.gridColumn = startColumn + " / span " + (endColumn - startColumn);
          dayElement.appendChild(taskElement);
        } else {
          alert("Vald tid hittades inte.");
        }
      } else {
        alert("Vald dag hittades inte.");
      }
  
      taskInput.value = "";
    });
  });
  