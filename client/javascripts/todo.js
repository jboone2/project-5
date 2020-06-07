//jshint esversion: 6

let controller = function() {
  //load todos from db when page loads
  //if (localStorage.getItem("todosList")) {
  //  $(".todos").html(localStorage.getItem("todosList"));
  //}

  $.ajax({
    url: "http://localhost:8888/todos",
    method: "GET"
  }).done((res) => {
    let pElem;
    //console.log(res.todos[0]._id + " " + res.todos[0].data)
    res.todos.forEach((todo) => {
      pElem = $("<p>").html(todo.data);
      $(".todos").append(pElem);
    });
  });

  let addTodoFromInputBox = function() {
    //Semmy uses "$" to name variables that will contain jQuery objects
    let $new_todo, content;

    if ($(".todo-input input").val() !== "") {
      content = $(".todo-input input").val();
      $new_todo = $("<p>").text(content);
      //$new_todo.hide();
      $(".todos").append($new_todo);
      //$new_todo.fadeIn();
      $(".todo-input input").val("");

      //add todo to db
      $.ajax({
          method: "POST",
          url: "http://localhost:8888/addtodo",
          data: {
            data: content
          }
        })
        .done(function(msg) {
          console.log("Data Saved: " + msg);
        });
    }
  };

  $(".todo-input button").on("click", function(event) {
    addTodoFromInputBox();
  });

  $(".todo-input input").on("keypress", function(event) {
    if (event.keyCode === 13) {
      addTodoFromInputBox();
    }
  });
};

let deleteTodo = () => {
  //delete a todo from db
  let content = $("#deleteOne").val();
  $.ajax({
      method: "POST",
      url: "http://localhost:8888/deletetodo/" + content
    })
    .done(function(msg) {
      console.log("Todo deleted: " + msg);
    });

  window.location.reload();
};

let getTodo = () => {
  //clear outDiv
  $("#outDiv").html("");
  let pElem;
  //retrieve a todo from db
  let content = $("#getOne").val();
  $.ajax({
      method: "GET",
      url: "http://localhost:8888/gettodo/" + content
    })
    .done(function(msg) {
      console.log("Todo retrieved: " + msg.message.data);
      pElem = $("<p>").html("Todo Retrieved: " + msg.message.data);
      $("#outDiv").append(pElem);
    });

  //window.location.reload();
};

let deleteAll = () => {
  //delete all todos from db
  localStorage.removeItem("todosList");
  window.location.reload();
};

$(document).ready(() => {
  let btn01, btn02, btn03;
  //console.log("ready")
  //select the delete button
  btn03 = document.querySelectorAll('button')[3];
  btn03.addEventListener('click', deleteAll);
  btn02 = document.querySelectorAll('button')[2];
  btn02.addEventListener('click', deleteTodo);
  btn01 = document.querySelectorAll('button')[1];
  btn01.addEventListener('click', getTodo);
  controller();
});
