const colors = require("colors");
const fs = require("fs");

const handleData = (type, title) => {
  // type - number (1 - add; 2 - remove; 3 - list)
  // title (string || null)

  const data = fs.readFileSync("data.json");

  // const data = fs.readFileSync("data.json", "utf8");
  // let data = fs.readFileSync("data.json");
  // data = data.toString();

  let tasks = JSON.parse(data);
  console.log(tasks);

  if (type === 1 || type === 2) {
    isExisted = tasks.find(task => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log("This task exists".bgRed);
    } else if (type === 2 && !isExisted) {
      return console.log("This task doesn't exist".bgRed);
    }
  }

  let dataJSON = "";
  switch (type) {
    case 1:
      //console.log("dodaje");
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title
      }));
      const id = tasks.length + 1;
      tasks.push({ id: id, title: title });
      //console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      fs.writeFileSync("data.json", dataJSON);

      console.log(`Dodaje zadajnie id: ${id}, title: ${title}`.white.bgGreen);

      break;
    case 2:
      const index = tasks.findIndex(task => task.title === title);
      //console.log("usuwam");
      tasks.splice(index, 1);
      //rebuild
      tasks = tasks.map((task, index) => ({
        id: index + 1,
        title: task.title
      }));
      dataJSON = JSON.stringify(tasks);
      fs.writeFile("data.json", dataJSON, "utf8", err => {
        if (err) throw err;
        console.log(`Usuwam zadanie title: ${title}`.white.bgGreen);
      });
      break;
    case 3:
      console.log(
        `Lista zadan obejmuje ${tasks.length} pozycji. Do zrobienia masz:`
      );
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2 != 0) {
            return console.log(task.title.green);
          } else {
            return console.log(task.title.yellow);
          }
        });
      }
      break;
  }
};

module.exports = handleData;
