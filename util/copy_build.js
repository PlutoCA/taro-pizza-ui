const path = require("path");
const toolkit = require("./toolkit");

toolkit.copyDir(
  path.join(__dirname, "../doc/build"),
  path.join(__dirname, "../doc/$build"),
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);
