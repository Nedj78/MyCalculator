  let display = document.querySelector('.display');
  let scratchPad = document.querySelector('.scratch-pad');
  const inputs = document.querySelectorAll("#minute1, #minute2");
  const btn = document.getElementById('convertBtn');
  
  let scratchPadText = [];
  let lastResult = null;
  let scratchPadHTML;
  
  // ----------- CALCUL OPERATIONS
  
  // Append a value to the calculator display
  function appendToDisplay(value) {
    if (lastResult !== null) {
      display.innerHTML = '';
      lastResult = null;
    }
    display.innerHTML += value;
    updateScratchPad();
  }
  
  // Clear the calculator display
  function clearDisplay() {
    display.innerHTML = '';
  }
  
  // Delete the last character in the calculator display
  function backspace() {
    display.innerHTML = display.innerHTML.slice(0, -1);
    updateScratchPad();
  }
  
  // Calculate percentage
  function percentage() {
    let expression = display.innerHTML;
    let result = eval(expression) / 100;
    display.innerHTML = result;
    scratchPadText.push(expression + '% = ' + result); 
    updateScratchPad();
  }
  
  // Perform calculation
  function calculate() {
    let expression = display.innerHTML;
    let result = eval(expression);
    display.innerHTML = result;
    if (lastResult === null) {
      scratchPadText.push(expression + ' = ' + result);
    } else {
      scratchPadText.push(lastResult + ' ' + expression + ' = ' + result);
    }
    lastResult = result;
    updateScratchPad();
  }
  
  // ------------ DRAFT BOARD
  
  // Update scratch pad display
  function updateScratchPad() {
    let scratchPadHTML = '';
    
    // Only display the introduction section if scratchPadText has items
    if (scratchPadText.length > 0) {
      scratchPadHTML += `
        <section id="scratchpad-content">
          <h2>Draft Board</h2>
          <button class="clear-results" onclick="deleteResults()">Clear all</button>
          <br><br>
        </section>`;
    }
  
    scratchPadText.forEach(function(item, index) {
      scratchPadHTML += `
        <br>
        <div>
          <p>${item}</p>
          <span class="delete-calcul" data-index="${index}">&#x2718;</span>
        </div><br>`;
    });
    
    scratchPad.innerHTML = scratchPadHTML;
  
    // Attach event listeners to each delete button
    document.querySelectorAll('.delete-calcul').forEach((button) => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        deleteItem(index);
      });
    });
  }
  
  // Function to delete an item from scratchPadText by index
  function deleteItem(index) {
    scratchPadText.splice(index, 1); // Remove the item from the array
    updateScratchPad(); 
  }
  
  // Clear all results in scratch pad
  function deleteResults() {
    scratchPadText = [];
    updateScratchPad();
  }
  
  
  // Add keydown event to inputs for conversion
  inputs.forEach(input => {
    input.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        convert1();
      }
    });
  });
  