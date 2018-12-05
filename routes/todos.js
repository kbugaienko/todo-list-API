var express = require('express');
var router = express.Router();
// connect to db via the folder "models" in file "index.js"
var db = require("../models");

// route to show all existing entries
router.get("/", function(req, res){
  // method 'find' mongoose is connect to our database and find all todos
  db.Todo.find()
  .then(function(todos){
    res.json(todos);
  })
  .catch(function(err){
    res.send(err);
  })
});

// route for create new entry
router.post("/", function(req, res){
  db.Todo.create(req.body)
  .then(function(newTodo){
    res.status(201).json(newTodo);
  })
  .catch(function(err){
    res.send(err);
  });
});

// route for show just one entry by ID
// "/api/todos/todoId"
router.get('/:todoId', function(req, res){
  db.Todo.findById(req.params.todoId)
  .then(function(foundTodo){
    res.json(foundTodo);
  })
  .catch(function(err){
    res.send(err);
  })
});

// route for update one entry by Id
router.put('/todoId', function(req, res){
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo){
    res.json(todo);
  })
  .catch(function(err){
    res. send(err);
  })
});

module.exports = router;
