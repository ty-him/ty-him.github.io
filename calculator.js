/*
 * Assignment 3: Simple JavaScript Calculator
 * Author: Ty
 *
 * Prompts the user for two numbers and an operator, repeats until the user
 * clicks Cancel, then prints a results table and a summary table.
 */

// Arrays that hold every row we collect, plus the results that were valid
var rows = [];
var validResults = [];

var keepGoing = true;

while (keepGoing) {

  // ---------- 1. Ask for the two numbers and the operator ----------
  var xInput = prompt("Enter the first number (x):");
  if (xInput === null) {          // user clicked Cancel
    break;
  }

  var yInput = prompt("Enter the second number (y):");
  if (yInput === null) {
    break;
  }

  var operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) {
    break;
  }

  // Clean up whitespace around whatever was typed
  xInput = xInput.trim();
  yInput = yInput.trim();
  operator = operator.trim();

  // ---------- 2. Validate and compute ----------
  var result;
  var isError = false;

  if (xInput === "" || yInput === "" || isNaN(xInput) || isNaN(yInput)) {
    // Non-numeric (or empty) input for x or y
    result = "wrong input number";
    isError = true;
  } else {
    var x = parseFloat(xInput);
    var y = parseFloat(yInput);

    if (operator === "+") {
      result = x + y;
    } else if (operator === "-") {
      result = x - y;
    } else if (operator === "*") {
      result = x * y;
    } else if (operator === "/") {
      if (y === 0) {
        result = "computation error";   // cannot divide by zero
        isError = true;
      } else {
        result = x / y;
      }
    } else if (operator === "%") {
      if (y === 0) {
        result = "computation error";   // cannot take modulus of zero
        isError = true;
      } else {
        result = x % y;
      }
    } else {
      // Operator was not one of + - * / %
      result = "computation error";
      isError = true;
    }
  }

  // Round long decimals so the table stays readable
  if (!isError) {
    result = roundNumber(result);
    validResults.push(result);
  }

  // Save the row so we can print it after the loop finishes
  rows.push({
    x: xInput === "" ? "(blank)" : xInput,
    operator: operator === "" ? "(blank)" : operator,
    y: yInput === "" ? "(blank)" : yInput,
    result: result,
    isError: isError
  });

  // ---------- 3. Keep looping until Cancel ----------
  // The next pass of the loop re-prompts automatically; Cancel breaks out above.
}

// ---------- 4. Results table ----------
if (rows.length === 0) {
  document.write("<p>No calculations were entered.</p>");
} else {
  document.write("<table>");
  document.write("<caption>Calculations</caption>");
  document.write("<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var resultClass = row.isError ? ' class="error"' : "";

    document.write("<tr><td>" + row.x + "</td>" +
                   '<td class="operator">' + row.operator + "</td>" +
                   "<td>" + row.y + "</td>" +
                   "<td" + resultClass + ">" + row.result + "</td></tr>");
  }

  document.write("</table>");

  // ---------- 5. Summary table (valid results only) ----------
  if (validResults.length === 0) {
    document.write("<p>No valid results to summarize.</p>");
  } else {
    var min = validResults[0];
    var max = validResults[0];
    var total = 0;

    for (var j = 0; j < validResults.length; j++) {
      if (validResults[j] < min) {
        min = validResults[j];
      }
      if (validResults[j] > max) {
        max = validResults[j];
      }
      total = total + validResults[j];
    }

    var avg = roundNumber(total / validResults.length);
    total = roundNumber(total);

    document.write("<table>");
    document.write("<caption>Summary</caption>");
    document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");
    document.write("<tr><td>" + min + "</td><td>" + max + "</td><td>" +
                   avg + "</td><td>" + total + "</td></tr>");
    document.write("</table>");
  }
}

// Helper: trim a number to two decimal places without leaving trailing zeros
function roundNumber(n) {
  return parseFloat(n.toFixed(2));
}
