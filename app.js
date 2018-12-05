var express = require("express"),
    app = express();

var todoRoutes = require("./routes/todos");


app.get("/", function(req, res){
  res.send("Hello From Root Route!");
});

app.use("/api/todos/", todoRoutes);

app.listen(8000, function(){
  console.log("The Server was strated!");
});
