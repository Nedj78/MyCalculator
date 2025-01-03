  let display = document.querySelector('.display');
  let scratchPad = document.querySelector('.scratch-pad');
  const inputs = document.querySelectorAll("#minute1, #minute2");
  const btn = document.getElementById('convertBtn');
  const externalLink = document.querySelector('.external-link');

  scratchPad.style.display = 'none';
  externalLink.style.padding = '20px';
  
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
  
 
  function calculate() {
    let expression = display.innerHTML;

    // Percentages management
    if (expression.includes('%')) {
        // Replace "nombre+nombre%" types expressions by par their equivalent
        expression = expression.replace(/(\d+(\.\d+)?)\+(\d+)%/g, (match, base, _, percentage) => {
            return `${base} + (${base} * ${percentage} / 100)`;
        });

        // Replace "nombre-nombre%" types expressions by par their equivalent
        expression = expression.replace(/(\d+(\.\d+)?)\-(\d+)%/g, (match, base, _, percentage) => {
            return `${base} - (${base} * ${percentage} / 100)`;
        });
    }

    try {
        // Expression calcul
        let result = eval(expression);
        display.innerHTML = result;

        if (lastResult === null) {
            scratchPadText.push(expression + ' = ' + result);
            scratchPad.style.display = 'block';
        } else {
            scratchPadText.push(lastResult + ' ' + expression + ' = ' + result);
        }
        lastResult = result;
        updateScratchPad();
    } catch (error) {
        display.innerHTML = "Error";
    }
}
  
  // ------------ DRAFT BOARD
  
  // Update scratch pad display
  function updateScratchPad() {
    let scratchPadHTML = '';
    
    // Only display the introduction section if scratchPadText has items
    if (scratchPadText.length > 0) {
      scratchPadHTML += `
        <section id="scratchpad-content">
          <h2>Brouillon</h2>
          <button class="clear-results" onclick="deleteResults()">Tout effacer</button>
          <br>
        </section>`;
    }
  
    scratchPadText.forEach(function(item, index) {
      scratchPadHTML += `
        <br>
        <div>
          <p>${item}</p>
          <span class="delete-calcul" data-index="${index}">&#x2718;</span>
        </div>`;
    });
    
    scratchPad.innerHTML = scratchPadHTML;
    
    // Attach event listeners to each delete button
    document.querySelectorAll('.delete-calcul').forEach((button) => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        deleteItem(index);
        if (scratchPadText.length === 0) {
          scratchPad.style.display = 'none';
        }
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
    scratchPad.style.display = 'none';
    externalLink.style.padding = '20px';
    updateScratchPad();
  }
