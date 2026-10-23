const screen = document.getElementById('screen');

// Adds clicked characters onto the calculator screen
function press(value) {
  screen.value += value;
}

// Clears everything out completely
function clearScreen() {
  screen.value = '';
}

// Backspace function to remove just the last character
function deleteLast() {
  screen.value = screen.value.slice(0, -1);
}

// Mathematical calculation matching strict BEDMAS rules
function calculateBEDMAS() {
  let expression = screen.value;

  if (!expression) return;

  try {
    // 1. Sanitize to prevent malicious inputs
    const sanitized = expression.replace(/[^0-9+\-*/().\s^]/g, '');

    // 2. Turn the exponent symbol (^) into JavaScript's system code (**)
    const jsExpression = sanitized.replace(/\^/g, '**');
    
    // 3. Complete calculation
    const finalResult = Function('"use strict"; return (' + jsExpression + ')')();
    
    if (finalResult === Infinity || isNaN(finalResult)) {
      screen.value = "Error";
    } else {
      // Round to 4 decimal places maximum so numbers don't break the layout
      screen.value = Number(Math.round(finalResult + 'e4') + 'e-4');
    }
  } catch (error) {
    screen.value = "Syntax Error";
  }
}

