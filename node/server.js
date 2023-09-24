var express = require("express");
var fs = require("fs");
var app = express();

app.set("view engine", "ejs"); // EJS 설정

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

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

  // res.render("list");

});


app.get("/write", function (req, res) {
  // const data = readData();

  // const newItemId = Date.now();

  // const newItem = "집에 가기....";

  // const newItemObject = { id: newItemId, title: newItem };

  // data.push(newItemObject);

  // writeData(data);

  // res.send("저장에 성공했습니다.");
  // res.redirect("/")

  res.render("write");
});

//데이터 작성하기
app.post("/write", function (req, res) {
  const data = readData();

  const newItemId = Date.now();

  const newItem = req.body.title;

  const newItemObject = { id: newItemId, title: newItem };

  data.push(newItemObject);

  writeData(data);

  // res.send("저장에 성공했습니다.");

  res.redirect("/todoList")
})


//데이터 수정하기
app.post("/edit", function (req, res) {
  const editedItemId = req.body.id; // 수정 대상 아이템의 ID
  const editedItemText = req.body.editedItem;
  const data = readData();

  // 수정 대상 아이템을 찾습니다.
  const editedItem = data.find(item => item.id === parseInt(editedItemId));

  if (!editedItem) {
    // 수정 대상 아이템이 없으면 오류 처리합니다.
    return res.status(404).send("수정 대상 아이템을 찾을 수 없습니다.");
  }

  // 아이템의 텍스트를 수정합니다.
  editedItem.title = editedItemText;

  // 수정된 데이터를 저장합니다.
  writeData(data);

  // 수정 후에는 다시 목록 페이지로 리다이렉트합니다.
  res.redirect("/todoList");
});

// 데이터 삭제하기
app.post("/delete", function(req, res) {
  const itemId = req.body.id;

  const data = readData();

  const targetData = data.findIndex(
    (item) => item.id === Number(itemId)
  );

  if(targetData !== -1) {
    data.splice(targetData, 1);
    writeData(data);
    res.redirect("/todoList");
  } else {
    res.status(404).send("Item not found!")
  }
})


app.listen(3000, () => {
  console.log(`Server is running on port 3000...`);
});