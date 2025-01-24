document.addEventListener('DOMContentLoaded', () => {
    const historyDisplay = document.getElementById('history');
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.button');
  
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let memory = 0;
  
    function updateDisplay() {
      resultDisplay.textContent = currentInput || '0';
      historyDisplay.textContent = previousInput + ' ' + operator;
    }
  
    function handleNumber(number) {
      if (currentInput.length < 15) {
        currentInput += number;
        updateDisplay();
      }
    }
  
    function handleOperator(op) {
      if (currentInput === '' && previousInput === '') return;
  
      if (currentInput !== '' && previousInput !== '') {
        calculate();
      }
  
      operator = op;
      previousInput = currentInput || previousInput;
      currentInput = '';
      updateDisplay();
    }
  
    function calculate() {
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);
  
      if (isNaN(prev) || isNaN(curr)) return;
  
      switch (operator) {
        case '+':
          currentInput = (prev + curr).toString();
          break;
        case '-':
          currentInput = (prev - curr).toString();
          break;
        case '*':
          currentInput = (prev * curr).toString();
          break;
        case '/':
          currentInput = curr === 0 ? 'Error' : (prev / curr).toString();
          break;
        case '%':
          currentInput = (prev % curr).toString();
          break;
      }
  
      operator = '';
      previousInput = '';
      updateDisplay();
    }
  
    function handleAdvancedFunction(func) {
      const curr = parseFloat(currentInput);
  
      if (isNaN(curr)) return;
  
      switch (func) {
        case 'sqrt':
          currentInput = curr < 0 ? 'Error' : Math.sqrt(curr).toString();
          break;
        case '%':
          currentInput = (curr / 100).toString();
          break;
      }
  
      updateDisplay();
    }
  
    function handleMemory(action) {
      const curr = parseFloat(currentInput) || 0;
  
      switch (action) {
        case 'memory-clear':
          memory = 0;
          break;
        case 'memory-recall':
          currentInput = memory.toString();
          break;
        case 'memory-add':
          memory += curr;
          break;
        case 'memory-subtract':
          memory -= curr;
          break;
      }
  
      updateDisplay();
    }
  
    function clearAll() {
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay();
    }
  
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
  
        if (!isNaN(action)) {
          handleNumber(action);
        } else if (['+', '-', '*', '/'].includes(action)) {
          handleOperator(action);
        } else if (action === '=') {
          calculate();
        } else if (action === 'clear') {
          clearAll();
        } else if (['sqrt', '%'].includes(action)) {
          handleAdvancedFunction(action);
        } else if (
          ['memory-clear', 'memory-recall', 'memory-add', 'memory-subtract'].includes(action)
        ) {
          handleMemory(action);
        } else if (action === '.') {
          if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
          }
        }
      });
    });
  
    // Initialize display
    updateDisplay();
  });
  