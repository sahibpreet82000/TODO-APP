showNotes();

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="todo-box" onmouseover="hover()"> 
      <div class="image-circle  id="${index}" onclick="tick(this.id)"">
        <img src="./images/icon-check.svg" alt="" />
      </div>
      <p>${element}</p>
      <a href="#"> <span  id="${index}" onclick="deleting(this.id)" class="cross"></span> </a>
    </div>
      `;
  });
  let noteElm = document.getElementById("todo-set");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  }
  else{
    noteElm.innerHTML = ``;
  }
}
// forEach(function hover(){
//   document.querySelector(".todo-box").addEventListener("mouseover", function () {
//     let hover = document.querySelector(".cross");
  
//     hover.style.display = "block";
//   });
  
//   document.querySelector(".todo-box").addEventListener("mouseout", function () {
//     let hover = document.querySelector(".cross");
  
//     hover.style.display = "none";
//   }); 
// });

function deleting(index) { 
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  
  }
   else {
    notesObj = JSON.parse(notes);
  }
 notesObj.splice(index,1);
  localStorage.setItem('notes',JSON.stringify(notesObj));
  showNotes();
}
// function tick(index){
//   let notes = localStorage.getItem("notes");
//   if (notes == null) {
//     notesObj = [];
//   } else {
//     notesObj = JSON.parse(notes);
//   }

//   localStorage.setItem('notes',JSON.stringify(notesObj));

// }
function change() {
  let set = document.querySelector(".img-light");
  let background = document.querySelector(".background-image");
  let body = document.getElementsByTagName("body")[0];
  let box = document.querySelector(".taskpane");
  let box2 = document.querySelector(".todo-box");
  let box3 = document.querySelector(".todo-content");
  let text = document.querySelector(".task-text");
  let text2 = document.querySelector(".todo-box p");
  let tickBg = document.querySelector(".image-circle");
  if (set.style.zIndex != -2) {
    set.style.zIndex = "-2";
    background.style.background =
      "url('/images/bg-desktop-light.jpg') no-repeat";
    body.style.background = "white";
    box.style.background = "white";
    box2.style.background = "white";
    box3.style.background = "white";
    text.style.color = "black";
    text2.style.color = "grey";
  } else {
    set.style.zIndex = "2";
    background.style.background =
      "url('/images/bg-desktop-dark.jpg') no-repeat";
    body.style.background = "#171823";
    box.style.background = "#25273d";
    box2.style.background = "#25273d";
    box3.style.background = "#25273d";
    text.style.color = "white";
    text2.style.color = "#c8cbe7";
  }
  let dark = document.querySelector(".img-dark");
  if (dark.style.zIndex != 2) {
    dark.style.zIndex = "2";
    tickBg.style.background =
      "linear-gradient(to right, rgb(129 0 248), #f89999)";
  } else {
    dark.style.zIndex = "-2";
    tickBg.style.background = "linear-gradient(45deg, #de06bc,#1f3e5b)";
  }
}

let backgorundImg = document
  .querySelector(".image-circle")
  .addEventListener("change", function () {
    document.style.classList.toggle("image-circle2");
  });
$(document).ready(function () {
  $(".image-circle").click(function () {
    $(".image-circle img").toggle();
  });
});
const toggle = document.querySelector(".image-circle");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("image-circle2");
  console.log("toggled");
});

// main js

// function enter(key){

//   else{
//     return false;
//   }
// }
function clearAll(){
  localStorage.clear();
  location.reload();
}
     