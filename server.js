const http = require("http");
const express = require("express");
const path = require("path");

const fetch = require("node-fetch");

const hostname = "127.0.0.1";
const port = 80;
const app = express();

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  const con = "this is content";
  const param = { title: "this is title", content: con };
  res.render("index", param);
});
app.post("/test", (req, res) => {
  console.log("test\n");
  console.log(req.body);
  var res1 = req.body.title.split(",");
  console.log(res1);
  var ans = [];
  for(var i=0;i<res1.length;i++){
    fetch('https://terriblytinytales.com/testapi?rollnumber='+res1[i])
    .then(res=>res.body.read().toString())
    .then(a=>ans.push(a));
  }
  function fun(){
    console.log(ans);
    var param={'roll':res1,'result':ans};
    res.render('test',param);
  }
  setTimeout(fun,res1.length*1000+3000);
});
app.listen(process.env.PORT || port, '0.0.0.0');


