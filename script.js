function calculateBEDMAS() {
  const expressionInput = document.getElementById('expression').value;
  const resultDisplay = document.getElementById('output');

  try {
    // Clean string: Only allow numbers, math operators, decimals, spaces, and ^
    const sanitized = expressionInput.replace(/[^0-9+\-*/().\s^]/g, '');

    // Convert BEDMAS exponent symbol (^) to JavaScript's operator (**)
    const jsFormattedExpression = sanitized.replace(/\^/g, '**');
    
    // Evaluate safely adhering to mathematical hierarchy 
    const finalResult = Function('"use strict"; return (' + jsFormattedExpression + ')')();
    
    if (finalResult === Infinity || isNaN(finalResult)) {
      resultDisplay.innerText = "Error: Cannot divide by zero";
    } else {
      resultDisplay.innerText = `Result: ${finalResult}`;
    }
  } catch (error) {
    resultDisplay.innerText = `Error: Invalid Syntax`;
  }
}
