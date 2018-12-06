$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(function(event){
    // event '13' - when user press enter
    if(event.which == 13) {
      createTodo();
    }
  });

  $(".list").on("click", "li", function(){
    updateTodo($(this));
  });

  // add event for when we clicked on span for delete, not reacting on li element
  $(".list").on("click", "span", function(ev){
    ev.stopPropagation();
    removeTodo($(this).parent());
  });
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

function createTodo(){
  //send request to create new todo
  var userInput = $('#todoInput').val();
  $.post('/api/todos',{name: userInput})
  .then(function(newTodo){
    console.log(newTodo);
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
}

function removeTodo(todo){
  var clickedId = todo.data("id");
  var deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
  .then(function(data){
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateTodo(todo){
  // console.log(todo.data("completed"));
  var updateUrl = "/api/todos/" + todo.data("id");
  var isDone = !todo.data("completed");
  var updateData = {completed: isDone};
  // send a put request
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  })
  .then(function(updateTodo){
    // Add or remove one class for element
    todo.toggleClass("done");
    todo.data("completed", isDone);
  })
  .catch(function(err){
    console.log(err);
  })
}
