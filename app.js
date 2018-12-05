var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

// this two lines allow us to accsess the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// say app where to search file "index.html"
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res){
  res.sendFile("index.html");
});

app.use("/api/todos/", todoRoutes);

app.listen(8000, function(){
  console.log("The Server was strated!");
});
