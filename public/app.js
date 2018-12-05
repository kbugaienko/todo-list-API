$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(addTodos)
});

function addTodos(todos){
  // add todos to the page here
  todos.forEach(function(todo){
    addTodo(todo);
  });
}

function addTodo(todo){
  var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}
