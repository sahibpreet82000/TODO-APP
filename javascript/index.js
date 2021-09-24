showNotes();

//--------------------------------------------------for adding a note--------------------------------------------------

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = [];
  notesObj.forEach(function (element, index) {
    html += `
      <div class="todo-box"> 
      <div class="image-circle  id="${index}">
        <img src="./images/icon-check.svg" alt="" />
      </div>
      <p>${element}</p>
       <span  id="${index}" onclick="deleting(this.id)" class="cross"></span> 
    </div>
      `;
  });
  let noteElm = document.getElementById("todo-set");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = ``;
  }
  let noteEl = document.querySelector(".todo-manage p");
  noteEl.innerHTML = notesObj.length + " item(s) left";
  hover();
}

//--------------------------------------------------for deletion a note--------------------------------------------------

function deleting(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// --------------------------------------------------for background and text change (switching light to dark)--------------------------------------------------

function change() {
  let set = document.querySelector(".img-light");
  let background = document.querySelector(".background-image");
  let body = document.getElementsByTagName("body")[0];
  let box = document.querySelector(".taskpane");
  let box2 = document.querySelector(".todo-box");
  let box3 = document.querySelector(".todo-content");
  let text = document.querySelector(".task-text");
  let text2 = document.querySelector(".todo-box p");
  let tickBg = document.querySelector(".image-circle2");
  if (set.style.zIndex != -2) {
    set.style.zIndex = "-2";
    background.style.background =
      "url('/images/bg-desktop-light.jpg') no-repeat";
    body.style.background = "white";
    box.style.background = "white";
    box3.style.background = "white";
    text.style.color = "black";
  } else {
    set.style.zIndex = "2";
    background.style.background =
      "url('/images/bg-desktop-dark.jpg') no-repeat";
    body.style.background = "#171823";
    box.style.background = "#25273d";
    box3.style.background = "#25273d";
    text.style.color = "rgb(200, 203, 231)";
  }
  let dark = document.querySelector(".img-dark");
  if (dark.style.zIndex != 2) {
    dark.style.zIndex = "2";
    box2.style.background = "white";
    text2.style.color = "grey";
    tickBg.style.background =
      "linear-gradient(to right, rgb(129 0 248), #f89999)";
  } else {
    dark.style.zIndex = "-2";
    box2.style.background = "#25273d";
    text2.style.color = "#c8cbe7";
    tickBg.style.background = "linear-gradient(45deg, #de06bc,#1f3e5b)";
  }
}
//--------------------------------------------------for tick selection--------------------------------------------------

$(document).ready(function () {
  $(".image-circle").click(function () {
    $(".image-circle img").toggle();
  });
});
const toggle = document.querySelector(".image-circle");
const toggleP = document.querySelector(".todo-box p");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("image-circle2");
  toggleP.classList.toggle("line-through");
});
//--------------------------------------------------for clear all --------------------------------------------------

function clearAll() {
  localStorage.clear();
  location.reload();
}

//--------------------------------------------------for corss hover--------------------------------------------------
function hover() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.forEach(function () {
    document.querySelectorAll(".todo-box").forEach((el) => {
      el.addEventListener("mouseover", function (e) {
        if (e.target.children[2]) {
          e.target.children[2].style.display = "block";
        }
      });
    });
    document.querySelectorAll(".todo-box").forEach((el) => {
      el.addEventListener("mouseleave", function (e) {
        if (e.target.children[2]) {
          e.target.children[2].style.display = "none";
        }
      });
    });
  });
  localStorage.setItem("notes", JSON.stringify(notesObj));
}

//--------------------------------------------------for corss hover--------------------------------------------------
