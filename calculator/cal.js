//konstanta variabler
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-clear]');
  const currentOperandTextElement = document.querySelector('[display-data]');
  let previousOperand = ''; //previous input
  let currentOperand = ''; //current input
  let currentOperation = null; //current operation

  //functions needed
  function clearText(){
    previousOperand = ''; //previous input
    currentOperand = ''; 
    Display();  
   
  }

  function del() {
    if (currentOperand === '' && currentOperation !== null) {
        // Om den aktuella operanden är tom och det finns en aktuell operation
        // tar bort den senaste operationen
        currentOperation = null;
      } else {
        // Annars tar bort det senaste tecknet i den aktuella operanden
        currentOperand = currentOperand.slice(0, -1);
      }
      Display();
  
  }

  function appendNumber(number){
    currentOperand=currentOperand+number;
    Display();
  }

   function Operation(operation){
   console.log(operation);
   if(currentOperand=== "")return;
   if(previousOperand !== "")
   {
    computeRes(); //count the results
   }
   currentOperation = operation;
   previousOperand = currentOperand;
   currentOperand = '';
   Display();
   }

   function computeRes() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    const expression = prev + ' ' + currentOperation + ' ' + current + ' = ' + result;
    currentOperand = result.toString();
    previousOperand = '';
    currentOperation = null;
    Display(expression);
   
  }
  

  function Display(result) {
    let displayText = previousOperand + ' ' + (currentOperation || '') + ' ';
    if (result !== undefined) {
      displayText += result;
    } else {
      displayText += currentOperand;
    }
    currentOperandTextElement.textContent = displayText;
  }

   
   
