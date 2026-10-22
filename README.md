# BEDMAS-calulator
A calculator that calculates BEDMAS
function calculateBEDMAS() {
  const expressionInput = document.getElementById('expression').value;
  const resultDisplay = document.getElementById('output');

  try {
    // 1. Sanitize the string to strictly allow only valid math characters 
    // (Numbers, +, -, *, /, brackets, decimals, and spaces)
    const sanitized = expressionInput.replace(/[^0-9+\-*/().\s^]/g, '');

    // 2. Convert the BEDMAS exponent symbol (^) into JavaScript's exponent operator (**)
    const jsFormattedExpression = sanitized.replace(/\^/g, '**');
    
    // 3. Evaluate using the strict mathematical order of operations
    const finalResult = Function('"use strict"; return (' + jsFormattedExpression + ')')();
    
    // 4. Handle Edge Cases like dividing by zero resulting in Infinity
    if (finalResult === Infinity || isNaN(finalResult)) {
      resultDisplay.innerText = "Error: Invalid Operation";
    } else {
      resultDisplay.innerText = `Result: ${finalResult}`;
    }
  } catch (error) {
    resultDisplay.innerText = `Error: Syntax Error`;
  }
}
