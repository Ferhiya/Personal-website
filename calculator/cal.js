//konstanta variabler
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-clear]');
  const previousOperandTextElement = document.querySelector('[previous-data]');
  const currentOperandTextElement = document.querySelector('[current-data]');
  //const calculator = new calculator(previousOperandTextElement, currentOperandTextElement);
 

  //functions needed
  function clear(){
    currentOperandTextElement.innerHTML="";
  }

  function del() {
  currentOperandTextElement.innerHTML="";
   
  }

  
  
  
  
  

  function appendNumber(){
    
  }

   function Operation(){

    
   }

   function compute(){

   }

   function Display(number){
    const currentOperandTextElement = document.querySelector('[current-data]');
    const currentOperand = currentOperandTextElement.textContent;
    currentOperandTextElement.textContent = currentOperand + number;
   }
