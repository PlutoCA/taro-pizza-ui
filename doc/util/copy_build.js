const path = require("path");
const toolkit = require("./toolkit");

// NOTE: heroku will ignore build directory, so wo use $build
toolkit.copyDir(
  path.join(__dirname, "../build"),
  path.join(__dirname, "../$build"),
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);
