const colors = require("colors");
const handleData = require("./handleData");

const handleCommand = ({ add, remove, list }) => {
  console.log(add, remove, list);

  if (add) {
    if (typeof add !== "string") {
      return console.log("Name must be a string".red);
    } else if (add.length < 5) {
      return console.log("Name must be at least 5 chars long".red);
    }
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log("Type name; must be at least 5 chars long".red);
    }
    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
  } else {
    return console.log(
      "Use --add to add a task, --remove to remove a task, --list to list all tasks"
    );
  }
};

module.exports = handleCommand;
