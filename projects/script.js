const showButton = document.getElementById('show1');
const hiddenDiv = document.getElementById('hidden1');

// Add event listener to the button
showButton.addEventListener('click', function() {
  // Toggle the hidden class to show/hide the div
  hiddenDiv.classList.toggle('hidden');
});

//learn more btn for project 2
const showButton2 = document.getElementById('show2');
const hiddenDiv2 = document.getElementById('hidden2');

showButton2.addEventListener('click', function() {
    // Toggle the hidden class to show/hide the div
    hiddenDiv2.classList.toggle('hidden2');
  });
  
//learn more for project 3
const showButton3 = document.getElementById('show3');
const hiddenDiv3 = document.getElementById('hidden3');
console.log(hiddenDiv3);
showButton3.addEventListener('click', function() {
    // Toggle the hidden class to show/hide the div
    hiddenDiv3.classList.toggle('hidden3');
  });
  