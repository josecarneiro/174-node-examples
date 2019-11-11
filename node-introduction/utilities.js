function multiply(a, b) {
  return a * b;
}

exports.multiply = multiply;

function exponentiate(a, b) {
  return a ** b;
}

exports.exponentiate = exponentiate;

function divide(a, b) {
  return a / b;
}

exports.divide = divide;

// module.exports = '';

exports.modulate = function(a, b) {
  return a % b;
};
