const {xyz} = require("./test/a/b/test.js")

exports.add = function add(a, b) {
  return a + b;
}


exports.sub = function sub(a, b) {
  return a - b;
}

exports.mul = function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

// 1. Named exports

// 2. default exports

module.exports = function() {
    console.log("Hey, I am a default export");
    
}
