var express = require("express");
var fs = require("fs");
var app = express();

app.set("view engine", "ejs");

function readData() {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
}

function writeData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}


app.get("/", function (req, res) {
  // const data = readData();

  // res.send(data);
  res.render("index", {name: "서지호"})

});

app.get("/todoList", function (req, res) {
  const data = readData();
  console.log(data);

  res.render("list", {items : data})

});


app.get("/write", function (req, res) {
  const data = readData();

  const newItemId = Date.now();

  const newItem = "집에 가기....";

  const newItemObject = { id: newItemId, title: newItem };

  data.push(newItemObject);

  writeData(data);

  // res.send("저장에 성공했습니다.");
  res.redirect("/")
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000...`);
});